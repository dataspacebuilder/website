---
sidebar_label: Get Started
sidebar_position: 2
title: Get Started with JAD
---

# Get Started with JAD

JAD (Just Another Demonstrator) is the fastest way to understand how trusted data sharing works with Eclipse Dataspace Components. It deploys a fully-fledged dataspace as a Software-as-a-Service (SaaS) solution in Kubernetes — illustrating how Cloud Service Providers can deploy and manage dataspace components in their own cloud infrastructure.

This document is the **one thing to read first**. It introduces every major component in the context of a running scenario, so you understand *why* each piece exists before diving into how it works.

**Repository**: [Metaform/jad](https://github.com/Metaform/jad)

---

## What JAD Demonstrates

JAD deploys a complete dataspace environment with:

- **Shared infrastructure** — PostgreSQL, HashiCorp Vault, Keycloak (IdP), NATS (messaging), all running in a single Kubernetes cluster
- **The full EDC-V stack** — Control Plane, Identity Hub, IssuerService, Data Plane — operating as a multi-tenant Virtual Connector
- **A management plane** — the Connector Fabric Manager (CFM) with its Tenant Manager, Provision Manager, and Activity Agents
- **A governance context** — membership credentials, trust framework, CEL-based policy evaluation
- **Two participants** — a data provider and a data consumer, provisioned through CFM and interacting through standardized protocols

By walking through this scenario, you'll see how decentralized identity, policy-driven trust, and protocol-based negotiation come together in a real system.

---

## The Scenario

A **Provider** organization has data it wants to share under controlled terms — in JAD's case, a simple HTTP data source and certificate assets.

A **Consumer** organization needs access to that data. Today, they'd solve this with a custom API integration, a signed PDF contract, and a shared credential. That works for one partner. It breaks at ten. It's unmanageable at a hundred.

With a dataspace, the interaction follows a standardized, repeatable pattern:

1. Both organizations are onboarded and receive verifiable credentials
2. The Provider publishes what data is available and under which terms
3. The Consumer discovers the offering and requests access
4. The system evaluates the Consumer's credentials against the Provider's policies
5. If the policies are satisfied, a contract agreement is established
6. Data flows between the organizations under the agreed terms

This is the scenario JAD implements. Let's walk through it — and along the way, understand which component handles each step.

---

## Components in Context

Rather than introducing components as an abstract architecture diagram, we'll meet each one as the scenario needs it.

### Step 1: Proving Identity — Identity Hub and IssuerService

Before any data can be discovered or shared, both organizations need to prove who they are. Not with platform accounts or shared passwords — with cryptographic, verifiable credentials that can be checked without a central authority.

**Identity Hub** (also called the Credential Service) is where this happens. Each participant's Identity Hub:

- Manages their **Decentralized Identifiers (DIDs)** — self-owned identifiers that don't depend on a central registry
- Stores **Verifiable Credentials (VCs)** — digitally signed attestations about the organization (e.g., "this organization is a member of dataspace X")
- Composes **proofs** — when another participant requests evidence of an attribute, the Identity Hub assembles and presents the relevant credentials

The **IssuerService** is the component that issues Verifiable Credentials to participants' Identity Hubs. When a participant is onboarded, the IssuerService verifies their attributes and issues signed credentials that the participant can then present during dataspace interactions.

In JAD, when the Consumer requests access to the Provider's data, both Identity Hubs participate in a **DCP (Decentralized Claims Protocol)** exchange. The Provider's system requests proof of the Consumer's attributes; the Consumer's Identity Hub presents the relevant credentials; the Provider's system verifies them cryptographically.

No central identity provider for trust decisions. No shared user database. Each organization controls their own identity.

> **Key concept**: Identity is the foundation of trust. Without verifiable identity, there's no basis for policy evaluation, contract negotiation, or authorized data access.

### Step 2: Discovering and Negotiating — Connector (Control Plane)

Once identity is established, the next question is: what data is available, and under what terms?

The **Connector** (specifically its Control Plane) handles discovery and negotiation. It is the core component that implements the **DSP (Dataspace Protocol)**:

- **Catalog publication** — the Provider's Connector publishes a catalog of available data offerings. Each offering includes metadata about the data, access policies (who can see it), and contract policies (under what terms it can be accessed).
- **Catalog discovery** — the Consumer's Connector queries the Provider's catalog. Access policies are evaluated: the Consumer only sees offerings it's authorized to discover, based on its credentials.
- **Contract negotiation** — the Consumer selects an offering and initiates negotiation. The Connector evaluates the Consumer's credentials against the Provider's contract policies. If all policies are satisfied, a **contract agreement** is established.
- **Transfer coordination** — Once a contract agreement exists, the Control Plane coordinates the data transfer by signaling the Data Plane.

The Connector is where **trust decisions are made**. It evaluates policies against credentials, determines whether access should be granted, and produces the authorization that unlocks data flow.

For dynamic policy evaluation, the Control Plane uses **CEL (Common Expression Language)** expressions. JAD seeds a CEL expression that allows data access only to participants possessing a valid Membership Credential.

> **Key concept**: The Control Plane decides. It never touches the data itself — it produces authorizations that the Data Plane executes.

### Step 3: Sharing Data — Data Plane

After the contract agreement is established, data needs to actually move between organizations. This is the Data Plane's job.

The **Data Plane** executes the authorized data transfer:

- It receives a **start signal** from the Control Plane via the **DPS (Data Plane Signaling)** protocol
- It executes the transfer using the appropriate wire protocol (HTTP in JAD's case)
- It enforces runtime access constraints derived from the contract agreement

The critical architectural insight is the **separation between decision and execution**: the Control Plane decides whether data can be shared; the Data Plane executes the transfer. This separation allows Data Planes to be deployed wherever data lives — in the cloud, at the edge, in a factory — without affecting the trust model.

JAD demonstrates two data transfer use cases:
- **HTTP proxy** — the Consumer fetches data from an HTTP endpoint through the Provider's Data Plane (using demo data from jsonplaceholder.typicode.com)
- **Certificate sharing** — the Provider uploads a certificate file, and the Consumer retrieves it through a negotiated data transfer

> **Key concept**: Data Planes are the execution layer. They can be swapped, scaled, and deployed independently. The protocol boundary (DPS) is what makes this possible.

### Step 4: Onboarding Participants — Connector Fabric Manager (CFM)

JAD demonstrates a multi-tenant deployment where multiple participants share infrastructure. Managing each one as a separate deployment would be operationally unsustainable.

The **Connector Fabric Manager (CFM)** is the management plane that makes this possible. In JAD, you actively interact with CFM via its REST API to provision participants:

- It **creates access credentials** for both Vault and the Administration APIs
- It **creates ParticipantContexts** in the Control Plane and Identity Hub
- It **registers participants** with the IssuerService
- It **requests Verifiable Credentials** from the IssuerService on behalf of new participants

CFM is composed of three subsystems:
- **Tenant Manager** — persists tenant and participant metadata, exposes the REST API
- **Provision Manager** — executes stateful orchestration workflows for onboarding
- **Activity Agents** — asynchronously process individual orchestration steps

The critical insight about CFM: **it is not in the trust-decision path**. CFM provisions participant contexts, but trust decisions — policy evaluation, credential verification, contract negotiation — happen between participants' Connectors, peer-to-peer. CFM can be completely unavailable and live data sharing continues uninterrupted.

> **Key concept**: CFM centralizes operations (provisioning, lifecycle, scaling) while trust remains decentralized (peer-to-peer, per interaction). This separation is what makes managed dataspaces viable.

### Infrastructure Foundation

Behind the application components, JAD deploys shared infrastructure that the stack depends on:

| Component | Role |
|---|---|
| **PostgreSQL** | Persistent data storage for all components |
| **HashiCorp Vault** | Secure storage for private keys and sensitive configuration |
| **Keycloak** | Identity provider for API authentication (management API access, not dataspace trust) |
| **NATS** | Asynchronous messaging between CFM subsystems |

> **Important distinction**: Keycloak handles API authentication (who can call the management APIs). It is **not** involved in dataspace trust decisions — those use DCP and Verifiable Credentials. These are separate trust domains.

---

## Running JAD

### Prerequisites

- **Docker** — for running KinD
- **KinD** — Kubernetes in Docker, provides a local Kubernetes cluster
- **kubectl** — Kubernetes CLI
- **Helm** — for installing the Traefik gateway controller
- **Java 17+** — for building from source (optional if using pre-built images)
- **[Bruno](https://www.usebruno.com)** — API client for executing the REST request collections (GUI recommended for automatic token refresh)
- **macOS or Linux** — Windows is not natively supported
- A POSIX-compliant shell (bash, zsh)
- Optional: a Kubernetes monitoring tool (K9S, Lens, Headlamp)

### Step 1: Create a KinD Cluster

```bash
cp ~/.kube/config ~/.kube/config.bak
kind create cluster -n edcv --kubeconfig ~/.kube/edcv-kind.conf
ln -sf ~/.kube/edcv-kind.conf ~/.kube/config
```

Then deploy the Traefik gateway controller for network access:

```bash
helm repo add traefik https://traefik.github.io/charts
helm repo update
helm upgrade --install --namespace traefik traefik traefik/traefik --create-namespace -f values.yaml
```

Install the Gateway API CRDs:

```bash
kubectl apply --server-side --force-conflicts -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.4.1/experimental-install.yaml
```

Set up port-forwarding to access services from your host:

```bash
kubectl -n traefik port-forward svc/traefik 80
```

### Step 2: Deploy Services

JAD uses plain Kubernetes manifests. Deploy infrastructure first, then applications:

```bash
# Deploy infrastructure (PostgreSQL, Vault, Keycloak, NATS)
kubectl apply -f k8s/base/

# Wait for infrastructure to be ready
kubectl wait --namespace edc-v \
  --for=condition=ready pod \
  --selector=type=edcv-infra \
  --timeout=90s

# Deploy applications (Control Plane, Identity Hub, IssuerService, Data Plane, CFM)
kubectl apply -f k8s/apps/

# Wait for seed jobs to complete
kubectl wait --namespace edc-v \
  --for=condition=complete job --all \
  --timeout=90s
```

Verify the deployment:

```bash
kubectl get deployments -n edcv
```

You should see all components running: `controlplane`, `dataplane`, `identityhub`, `issuerservice`, `cfm-tenant-manager`, `cfm-provision-manager`, `cfm-agents`, `keycloak`, `nats`, `postgres`, `vault`.

### Step 3: Provision Participants

Open the [Bruno collection](https://github.com/Metaform/jad/tree/main/requests/EDC-V%20Onboarding) included in the JAD repository and select the **"KinD Local"** environment.

**Provision the Consumer and Provider** by running the requests in the `CFM - Provision Consumer` and `CFM - Provision Provider` folders. These call the CFM REST API, which:

1. Creates access credentials for Vault and the Administration APIs
2. Creates a `ParticipantContext` in the Control Plane and Identity Hub
3. Registers the new participant with the IssuerService
4. Requests Verifiable Credentials from the IssuerService

You can verify the onboarding status by running the `Get Participant Profile` request — wait until all entries in the `vpas` array show `"state": "active"`.

### Step 4: Prepare the Dataspace

**Seed CEL expressions** — run the requests in the `Create CEL expression` folder to configure policy evaluation rules. JAD seeds a CEL expression that allows data access only to participants with a valid Membership Credential.

**Seed the Provider** — run the requests in the `EDC-V Management/Provider` folder to create:
- An **asset** (the data offering)
- A **policy** (the access and usage rules)
- A **contract definition** (binding the asset to the policy)

### Step 5: Transfer Data

JAD supports two data transfer use cases:

**HTTP Proxy** — run the requests in the `Data Transfer/Http Todo` folder:
1. `Get Catalog` fetches the Provider's catalog (containing one dataset)
2. `Get Data` initiates contract negotiation, waits for completion, starts the transfer, and returns the data

If successful, you'll see demo output from `https://jsonplaceholder.typicode.com/todos`:

```json
[
  {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  }
]
```

**Certificate Sharing** — upload a certificate to the Provider, then run the Consumer requests to negotiate access and download it.

### What You Just Did

That walk-through exercised the complete trusted data sharing lifecycle:

- **When you provisioned participants via CFM**, the management plane created participant contexts across the Control Plane, Identity Hub, and IssuerService. Verifiable Credentials were issued and delivered — all through orchestrated workflows, without manual configuration per participant.

- **When the Consumer's credentials were checked**, the Identity Hubs exchanged verifiable presentations over **DCP**. No central identity provider was involved — the Provider verified the Consumer's claims cryptographically.

- **When the Consumer fetched the catalog**, the Connectors used **DSP** to exchange catalog information. Access policies filtered what the Consumer could see based on their verified attributes.

- **When the contract was negotiated**, the Connectors used **DSP** to evaluate policies (CEL expressions) against credentials and establish a machine-enforceable agreement. No PDF. No email. No manual legal review.

- **When data was transferred**, the Control Plane signaled the Data Plane via **DPS**, and the Data Plane executed the transfer using HTTP. The decision and the execution were separated.

- **When you used the Bruno API collection**, you were calling the same Management APIs that a production application (such as an ERP system, web portal, or automation tool) would use. The API surface is the same — only the client changes.

---

## A Note on User Interfaces

JAD is deliberately API-first. All interactions use Bruno API collections to call the Management APIs directly. This is intentional — it shows you exactly what happens at the protocol level without UI abstraction.

For production deployments that need a web portal experience, **[Redline](./components/redline.md)** is a separate Backend-for-Frontend (BFF) service that provides participant and operator portals on top of the same APIs. Another reference implementation is the **[FraunhoferISST End-User API](https://github.com/FraunhoferISST/End-User-API)** for SME onboarding.

---

## Where to Go Next

Depending on your role and interest, here's where to continue:

| If you want to... | Go to... |
|---|---|
| Understand what dataspaces are conceptually | [Concepts: What Is a Dataspace](./concepts/what-is-a-dataspace.md) |
| Understand how trust and governance work | [Concepts: Trust and Governance](./concepts/trust-and-governance.md) |
| Learn about the Connector in depth | [Components: Connector](./components/connector.md) |
| Learn about Identity Hub and credentials | [Components: Identity Hub](./components/identity-hub.md) |
| Understand how CFM manages multi-tenant operations | [Components: CFM](./components/cfm.md) |
| Evaluate dataspaces as a strategic opportunity | [Guide: For Decision Makers](./guides/decision-makers.md) |
| Design a dataspace deployment architecture | [Guide: For Architects](./guides/architects.md) |
| Operate a multi-tenant dataspace environment | [Guide: For Operators](./guides/operators.md) |
| Build applications on top of EDC | [Guide: For Developers](./guides/developers.md) |
| Look up a specific protocol or API | [Reference: Protocols](./reference/protocols.md) |
| Look up terminology | [Reference: Glossary](./reference/glossary.md) |
