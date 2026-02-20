# EDCaaS - Setting Up a Managed Dataspace Platform

## Who This Is For

You are a developer at a cloud service provider and your job is to set up an Eclipse
Dataspace Components as-a-Service (EDCaaS) offering. You need to deploy a set of
components, provision dataspace participants for your customers, and hand them the
endpoints they need to operate.

You do not need to understand what a dataspace is in detail. You need to know what to
deploy, how to provision participants, and what to give your customers.

## What You Are Building

Your EDCaaS platform lets companies participate in dataspaces without running their own
control plane or identity infrastructure. You host the shared components. Your customers
get API endpoints to manage their assets, policies, and contracts.

```
┌─────────────────────────────────────────────────────┐
│  Your EDCaaS Platform                               │
│  ┌────────────────────────────────────────────┐     │
│  │  EDC Virtual Connector                     │     │
│  │  Control Plane · Identity Hub              │     │
│  └────────────────────────────────────────────┘     │
│                                                     │
│  ┌────────────────────────────────────────────┐     │
│  │  Connector Fabric Manager (CFM)            │     │
│  │  Tenant Mgr · Provision Mgr · Agents       │     │
│  └────────────────────────────────────────────┘     │
│                                                     │
│  ┌────────────────────────────────────────────┐     │
│  │  Infrastructure                            │     │
│  │  PostgreSQL · IDP · Secret Store · NATS    │     │
│  └────────────────────────────────────────────┘     │
└──────────────────────┬──────────────────────────────┘
                       │
              Data Plane Signaling
                       │
              ┌────────┴────────┐
              │  Customer       │
              │  Data Plane     │
              └─────────────────┘
```

The data plane runs outside the core stack. It can be hosted on the customer's own
infrastructure or offered as a separate service by the CSP. Either way, it connects
to the Control Plane via the Data Plane Signaling protocol. This separation is
intentional - data routing stays independent of the control plane. Data planes are
typically set up by system integrators (see the System Integrator Guide).

## Prerequisites

You need the following infrastructure in place before deploying the dataspace components:

| Component | Purpose | Requirements |
|-----------|---------|--------------|
| Kubernetes cluster | Runs all platform services | Standard k8s, any distribution |
| PostgreSQL | Persistent state for Control Plane, Identity Hub, CFM | Separate databases per component |
| OAuth2 / OIDC provider | Authentication for all APIs | Must support `client_credentials` grant, JWT access tokens, custom claims, JWKS endpoint |
| Secret store | Stores keys, client secrets, credentials | KV-style API (e.g., Vault, cloud-native alternatives) |
| NATS with JetStream | Messaging between CFM subsystems | Persistence and guaranteed delivery required |

## What You Deploy

Your platform has three layers: the EDC services your customers interact with, the
CFM that automates provisioning, and the agents that execute individual setup steps.

### Eclipse Dataspace Components (EDC)

These are the core services your customers use. You deploy them in virtual
(multi-tenant) mode - a single deployment serves all participants through isolated
contexts.

| Component | What it does |
|-----------|-------------|
| **Control Plane** | Manages assets, policies, contracts, catalog, and DSP protocol endpoints. Each participant gets an isolated context. |
| **Identity Hub** | Manages DIDs, verifiable credentials, verifiable presentations, and token exchange (STS). Each participant gets an isolated context. |

Both services share the same IDP for authentication and use the secret store for
key material. Participant isolation is configuration-based - not process-based. No
new containers are spawned per customer.

### Connector Fabric Manager (CFM)

The CFM automates participant provisioning. You interact with its APIs to onboard
customers - it handles the rest.

| Component | What it does |
|-----------|-------------|
| **Tenant Manager** | Manages tenants, participant profiles, cells, and dataspace profiles. Exposes the provisioning REST API. |
| **Provision Manager** | Executes orchestration workflows. Dispatches tasks to agents via NATS. |

Both need a PostgreSQL database and a NATS connection. When you create a participant
profile through the Tenant Manager API, it triggers an orchestration that the
Provision Manager executes by dispatching work to agents.

For full architecture details, see the
[CFM System Architecture](https://github.com/Metaform/connector-fabric-manager/blob/main/docs/developer/architecture/system.architecture.md).

### Activity Agents

Agents are the workers the Provision Manager dispatches to. Each agent handles one
provisioning concern and runs as a stateless NATS consumer.

| Agent | What it does |
|-------|-------------|
| **IDP Agent** | Creates OAuth2 clients for the participant, registers claim mappings |
| **EDC Agent** | Creates participant contexts in Control Plane and Identity Hub |
| **Registration Agent** | Registers the participant as a holder at the credential issuer |
| **Onboarding Agent** | Requests verifiable credentials and stores them in the Identity Hub |

Agents execute in dependency order - for example, the EDC Agent needs the IDP Agent
to finish first so OAuth2 clients exist before participant contexts are created.

### IDP Configuration

Your identity provider must issue JWT access tokens with these custom claims at the
top level (not nested):

```
{
  "role": "participant" | "provisioner" | "admin",
  "participant_context_id": "<context-id>",
  "scope": "management-api:read management-api:write ..."
}
```

Three logical roles exist:

| Role | Who | What they can do |
|------|-----|------------------|
| `admin` | Initial setup and emergency access | Full access to all APIs and all participants |
| `provisioner` | CFM and automation | Create/delete participant contexts, no access to participant data |
| `participant` | Customer's client app | Manage own assets, policies, contracts - scoped to their `participant_context_id` |

For details on scopes and access control, see the
[EDC-V Administration API documentation](https://github.com/eclipse-edc/Virtual-Connector/blob/main/docs/administration_api.md).

## How Provisioning Works

When a new customer signs up for your EDCaaS, you provision them with two API calls.

Before provisioning participants, your platform needs baseline configuration: at least
one **cell** (a deployment zone - typically your k8s cluster) and one or more
**dataspace profiles**.
These are set up once during platform bootstrap via the Tenant Manager API.

### Step 1 - Create a tenant

A tenant represents your customer's organization.

```
POST /api/v1alpha1/tenants
{
  "tenantId": "acme",
  "displayName": "ACME Corp",
  "description": "Manufacturing company"
}
```

### Step 2 - Deploy a participant profile

This triggers the full orchestration. A participant profile binds a tenant to a
cell, a DID identity, and one or more dataspace profiles. Dataspace profiles
are configured during platform bootstrap and define which dataspaces your
platform supports. A participant profile
can target a single dataspace or span multiple dataspaces with the same
identity.

```
POST /api/v1alpha1/tenants/{tenantId}/participant-profiles
{
  "identifier": "did:web:ih.your-platform.io:acme",
  "cellId": "<cell-id>"
}
```

The DID format follows `did:web:<your-identity-hub-host>:<participant-name>`.

After this call, the orchestration engine:

1. Creates OAuth2 clients in your IDP
2. Stores secrets in your secret store
3. Creates participant contexts in the Control Plane and Identity Hub
4. Registers the participant at the credential issuer
5. Requests and stores the verifiable credential (e.g., MembershipCredential)

The process is asynchronous. Poll the participant profile endpoint to track
progress - provisioning is complete when all activities reach `active` state.

```
GET /api/v1alpha1/tenants/{tenantId}/participant-profiles/{profileId}
```

## What You Hand to the Customer

After provisioning, your customer (or their system integrator) needs the following
to operate:

| What | Example | Purpose |
|------|---------|---------|
| Participant Context ID | `acme-ctx-abc123` | Identifies the participant across all APIs |
| OAuth2 client credentials | `client_id` + `client_secret` | Authenticate against your IDP |
| Token endpoint | `https://auth.your-platform.io/oauth2/token` | Obtain access tokens |
| Control Plane management API | `https://cp.your-platform.io/api/mgmt/v4alpha/participants/{ctxId}/` | Manage assets, policies, contracts, catalog, negotiations, transfers |
| Identity Hub API | `https://ih.your-platform.io/api/identity/participants/{ctxId}/` | Manage credentials, DIDs |
| DSP protocol endpoint | `https://cp.your-platform.io/api/dsp/{ctxId}/2025-1` | Counter-party address for catalog requests and negotiations |
| DID | `did:web:ih.your-platform.io:acme` | The participant's decentralized identifier |

The customer does **not** need access to CFM APIs, NATS, your secret store, or any
infrastructure internals.

The customer's data plane is not part of your core platform. Once a data plane is running,
the customer or their system integrator registers it with the Control Plane via the
management API. For details on data plane registration and deployment, see the
[System Integration](02-system-integration.md).

## Try It Locally

To see the full stack running locally - including EDC, CFM, agents, and provisioning -
check out the [JAD sandbox](https://github.com/Metaform/jad). It provides a complete
dataspace environment on a local kind cluster, with pre-configured infrastructure, bootstrap jobs, and end-to-end provisioning scripts.

## Summary

Your EDCaaS platform provides the infrastructure and automation so that customers
can participate in dataspaces without running their own control plane or identity
services. You deploy EDC, CFM, and the agents. You provision participants through
the Tenant Manager API and hand customers their endpoints and credentials. From
there, customers and their system integrators take over - publishing data,
negotiating contracts, deploying data planes, and connecting to other participants
through the management API and the Dataspace Protocols.
