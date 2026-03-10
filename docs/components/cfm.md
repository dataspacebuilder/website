# Connector Fabric Manager (CFM)

## What It Is

The Connector Fabric Manager (CFM) is the **management plane** for multi-tenant dataspace operations. It provisions participant contexts, automates lifecycle management, and orchestrates the infrastructure needed to run many participants on shared infrastructure.

Think of CFM as the orchestration layer for service virtualization: it creates and manages participant runtimes, but **it is not the runtime**. The runtime is the Connector, Identity Hub, and Data Plane stack. CFM provisions and manages that stack.

## What Problem It Solves

Without CFM, hosting multiple participants means deploying and managing separate infrastructure for each one — separate Connectors, separate Identity Hubs, separate configuration. This works for a handful of tenants. It becomes operationally unsustainable at hundreds or thousands.

CFM solves this by turning "deploy infrastructure per tenant" into "provision a participant context." The infrastructure is shared; the participant contexts are isolated by configuration and metadata.

## The Critical Insight

**CFM is not in the trust-decision path.**

CFM provisions participant contexts and manages runtime configuration. But trust decisions — policy evaluation, credential verification, contract negotiation — happen between participants' Connectors, peer-to-peer.

CFM can be completely unavailable — undergoing maintenance, experiencing an outage, being upgraded — and live data sharing continues uninterrupted. Existing participants continue to negotiate and transfer data without any dependency on CFM.

This separation means:
- Maintenance windows are possible without stopping data flow
- CFM outages block onboarding and provisioning, not runtime sharing
- Separate SLOs can be set for the management plane vs. the runtime
- Upgrades and incident response on CFM don't affect live trust decisions

## How It Fits in the Architecture

```
┌──────────────────────────────┐
│    Connector Fabric Manager  │  ← Management Plane
│  ┌────────┐  ┌────────────┐  │
│  │ Tenant │  │ Provision  │  │
│  │ Mgr    │  │ Manager    │  │
│  └────────┘  └────────────┘  │
│       ↓           ↓          │
│    Activity     Activity     │
│     Agents       Agents      │
└──────────────────────────────┘
            │
            ↓ provisions
┌──────────────────────────────┐
│     Shared Runtime Cells     │  ← Runtime Plane
│  ┌─────────┐ ┌────────────┐ │
│  │Connector│ │Identity Hub│ │
│  │ (CP)    │ │   (CS)     │ │
│  └─────────┘ └────────────┘ │
│  ┌──────────────────────┐   │
│  │    Data Planes        │   │
│  └──────────────────────┘   │
└──────────────────────────────┘
```

CFM sits above the runtime. It provisions participant contexts into shared runtime cells, but once provisioned, the runtime operates independently.

## Key Subsystems

| Subsystem | Role |
|---|---|
| **Tenant Manager** | Persists tenant and participant metadata; exposes a REST API; initiates provisioning |
| **Provision Manager** | Executes stateful orchestration workflows for onboarding and lifecycle management |
| **Activity Agents** | Asynchronously process individual orchestration steps in isolated security contexts |

The **Tenant Manager** is the metadata control point — it knows what tenants exist, what participant contexts they have, and where those contexts are targeted. The **Provision Manager** is the execution engine — it runs workflows that create, configure, and manage participant contexts. **Activity Agents** are where infrastructure integration happens: deploying to Kubernetes, configuring Vault namespaces, setting up DNS entries.

## What CFM Manages

### Tenant Lifecycle
- Creating tenant organizations
- Setting up participant profiles (with associated DIDs)
- Configuring dataspace profiles (per-dataspace settings)
- Decommissioning tenants

### Participant Context Provisioning
- Provisioning Connector, Identity Hub, and Data Plane contexts
- Configuring routing and network access
- Delivering initial credentials — CFM integrates with the [Issuer Service](./issuer-service.md) to request verifiable credentials for new participants
- Targeting participant contexts to runtime cells

### Operations
- Rebalancing capacity across cells
- Migrating participant contexts between cells
- Managing lifecycle events (upgrades, scaling, recovery)

## When You Need CFM

CFM is essential when:
- You're hosting **multiple tenants** on shared infrastructure
- You need **automated onboarding** (provisioning in minutes, not days)
- You want **sub-linear cost scaling** (adding participants doesn't linearly increase infrastructure)
- You're operating a **DSaaS (Dataspace-as-a-Service)** offering

CFM is not needed when:
- You're running a single-tenant, standalone Connector deployment
- You're building a single-organization proof-of-concept without multi-tenant requirements

## Infrastructure

CFM runs on standard cloud-native infrastructure:
- **PostgreSQL** — for persistent metadata storage
- **NATS JetStream** — for reliable, decoupled messaging between subsystems
- **Kubernetes** — for container orchestration of both CFM and the runtime cells

The messaging architecture (NATS JetStream) enables long-running provisioning workflows that are resilient to restarts and transient failures.

## In JAD

In the [JAD](https://github.com/Metaform/jad) scenario, CFM is how you onboard participants. Using the Bruno API collection, you call CFM's REST API to provision a Consumer and a Provider. For each participant, CFM orchestrates the full onboarding workflow:

1. Creates access credentials for Vault and the Administration APIs
2. Creates a `ParticipantContext` in the Control Plane and Identity Hub
3. Registers the participant with the IssuerService
4. Requests Verifiable Credentials from the IssuerService

You can watch the provisioning progress by polling the `Get Participant Profile` endpoint — each entry transitions to `"state": "active"` as the asynchronous agents complete their work. Once active, the participants are ready to discover, negotiate, and transfer data.

## Scope of This Documentation

This page provides an overview of CFM's role and operational model. For detailed internals — service virtualization architecture, cell topology, NATS configuration, participant context targeting — refer to the [CFM system architecture documentation](https://github.com/Metaform/connector-fabric-manager/blob/main/docs/developer/architecture/system.architecture.md).

---

**Learn more**: [CFM system architecture](https://github.com/Metaform/connector-fabric-manager/blob/main/docs/developer/architecture/system.architecture.md)

**Related**: [Connector](./connector.md) | [Identity Hub](./identity-hub.md) | [Issuer Service](./issuer-service.md) | [Redline](./redline.md) | [Learning Path: Platform Setup](../learning-paths/platform-setup/)
