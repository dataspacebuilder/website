---
sidebar_position: 2
title: Understanding the Stack
description: The evolution from traditional single-tenant EDC deployments to CFM-managed, multi-tenant EDC-V architecture.
---

# Understanding the Stack

The Eclipse Dataspace Components ecosystem has evolved significantly with the introduction of the **Connector Fabric Manager (CFM)**. Understanding this evolution helps you choose the right deployment model and understand why the architecture is designed the way it is.

---

## The Evolution: Why CFM?

### The Original Model (Traditional EDC)

In the original model, each organization deploys its own connector as a complete stack:

```
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│  Tenant A   │ │  Tenant B   │ │  Tenant C   │
│   Process   │ │   Process   │ │   Process   │
├─────────────┤ ├─────────────┤ ├─────────────┤
│ Control     │ │ Control     │ │ Control     │
│ Plane       │ │ Plane       │ │ Plane       │
├─────────────┤ ├─────────────┤ ├─────────────┤
│ Data        │ │ Data        │ │ Data        │
│ Plane       │ │ Plane       │ │ Plane       │
├─────────────┤ ├─────────────┤ ├─────────────┤
│ Identity    │ │ Identity    │ │ Identity    │
│ Hub         │ │ Hub         │ │ Hub         │
└─────────────┘ └─────────────┘ └─────────────┘
```

**Characteristics:**
- Simple, self-contained deployments
- Each organization has full control
- Works well for early adopters and pilots
- Each deployment is operationally isolated

**Limitations:**
- Doesn't scale for service providers hosting many tenants
- Resource inefficient (each tenant = full infrastructure)
- No centralized management or lifecycle control
- Migration requires redeployment

---

### The Scaling Problem

What happens when a cloud provider wants to offer **"Dataspace-as-a-Service"**?

| Challenge | Impact |
|-----------|--------|
| **Spinning up separate processes per tenant** | Doesn't scale to hundreds/thousands of tenants |
| **No centralized management** | Operational nightmare |
| **Resource overhead** | Each tenant needs full infrastructure |
| **Migration complexity** | Moving tenants requires redeployment |
| **Inconsistent operations** | Each tenant is operationally isolated |

The traditional model works for self-hosted deployments but breaks down when you need to operate dataspace infrastructure at scale.

---

### The Solution: Service Virtualization

The CFM introduces **service virtualization**—sharing infrastructure while isolating contexts:

```
┌───────────────────────────────────────────────────────────────┐
│                    Shared Runtime (EDC-V)                      │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│ │   VPA A     │ │   VPA B     │ │   VPA C     │  ...          │
│ │ (Tenant A)  │ │ (Tenant B)  │ │ (Tenant C)  │               │
│ └─────────────┘ └─────────────┘ └─────────────┘               │
│                  Context Isolation                             │
└───────────────────────────────────────────────────────────────┘
```

**Key insight:** Isolation is **configuration-based**, not **process-based**.

- A single Control Plane runtime can serve hundreds of participants
- Each request carries context; the runtime loads the correct VPA configuration
- VPA metadata is stored in persistent stores, not in separate processes

---

## The Mental Model Shift

| Traditional | CFM-Managed |
|-------------|-------------|
| 1 Connector = 1 Process | 1 Runtime = Many VPAs |
| Deploy for each tenant | Provision VPA metadata |
| Scale by adding containers | Scale by adding cells |
| Migration = redeploy | Migration = move metadata |
| Per-tenant operations | Centralized operations |

---

## Traditional Architecture (Single-Tenant)

### When to Use

The traditional single-tenant model is appropriate for:

- **Self-hosted enterprise deployments** — Full control, dedicated resources
- **Development and testing** — Simple setup, rapid iteration
- **Edge deployments** — Isolated locations, limited connectivity
- **Regulatory requirements** — Dedicated infrastructure mandates

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    EDC Connector (Single-Tenant)                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐     │
│  │  Identity Hub  │  │ Control Plane  │  │   Data Plane   │     │
│  │                │  │                │  │                │     │
│  │  • DID Manager │  │  • Catalog     │  │  • Transfer    │     │
│  │  • VC Store    │  │  • Negotiation │  │  • Protocols   │     │
│  │  • Presentation│  │  • Policy      │  │  • Access      │     │
│  └────────────────┘  └────────────────┘  └────────────────┘     │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                       Infrastructure                             │
│       Database • Vault • Network • Observability                │
└─────────────────────────────────────────────────────────────────┘
```

### Deployment Options

| Option | Description | Best For |
|--------|-------------|----------|
| **Embedded** | All components in one process | Development, small deployments |
| **Separate** | Each component as separate service | Production, scaling |
| **Clustered** | Multiple instances behind load balancer | High availability |

---

## Modern Architecture (EDC-V + CFM)

### When to Use

The CFM-managed multi-tenant model is appropriate for:

- **Cloud service providers** — Offering Dataspace-as-a-Service
- **Large enterprises** — Multiple business units sharing infrastructure
- **Consortia** — Industry groups providing shared dataspace infrastructure
- **Managed service offerings** — Turnkey dataspace solutions

### Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    Connector Fabric Manager (CFM)                        │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐  │
│  │ Tenant Manager  │  │ Provision Mgr   │  │    Activity Agents      │  │
│  │ • REST API      │  │ • Orchestrations│  │    • K8s Agent          │  │
│  │ • State Store   │  │ • Workflows     │  │    • Vault Agent        │  │
│  │ • Participant   │  │ • NATS comms    │  │    • DNS Agent          │  │
│  │   profiles      │  │                 │  │                         │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────────────┘  │
│                                                                          │
│  CFM provisions trust infrastructure but is NOT in the trust path        │
└────────┬─────────────────────┬─────────────────────────┬────────────────┘
         │                     │                         │
         ▼                     ▼                         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           CELL (Runtime)                                 │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                    EDC-V Shared Runtime                          │    │
│  │  ┌───────────────────────────────────────────────────────────┐  │    │
│  │  │                   VPA Context: Tenant A                    │  │    │
│  │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │  │    │
│  │  │  │ Control     │  │ Identity    │  │ Data        │        │  │    │
│  │  │  │ Plane VPA   │  │ Hub VPA     │  │ Plane VPA   │        │  │    │
│  │  │  └─────────────┘  └─────────────┘  └─────────────┘        │  │    │
│  │  └───────────────────────────────────────────────────────────┘  │    │
│  │                                                                  │    │
│  │  ┌───────────────────────────────────────────────────────────┐  │    │
│  │  │                   VPA Context: Tenant B                    │  │    │
│  │  │  (same structure, different configuration & credentials)   │  │    │
│  │  └───────────────────────────────────────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  Trust decisions happen PER-VPA, isolated by configuration               │
└─────────────────────────────────────────────────────────────────────────┘
```

### Key Components

#### Connector Fabric Manager (CFM)

The orchestration layer for multi-tenant deployments:

| Subsystem | Purpose |
|-----------|---------|
| **Tenant Manager** | REST API, state management, participant profiles |
| **Provision Manager** | Stateful orchestrations, workflows |
| **Activity Agents** | Execute tasks (K8s, Vault, DNS), isolated from provisioner |

**Critical insight:** CFM provisions and configures. Catalog queries, negotiations, and transfers happen directly in EDC services—no live dependency on CFM during data sharing.

#### Virtual Participant Agents (VPAs)

The unit of deployment and administrative control:

| VPA Type | Component | Purpose |
|----------|-----------|---------|
| Control Plane VPA | Control Plane | Catalog, negotiation, policy |
| Data Plane VPA | Data Plane | Data transfer execution |
| Credential Service VPA | Identity Hub | DIDs, credentials, presentations |
| Issuer Service VPA | Issuer Service | Credential issuance |

#### Cells

Homogeneous deployment zones (typically Kubernetes clusters):

| Property | Description |
|----------|-------------|
| **Contains** | Shared deployments serving multiple VPAs |
| **Isolation** | Configuration-based, not process-based |
| **Scaling** | Managed independently (e.g., via Keda) |
| **Placement** | Geographic, regulatory, or capacity-based |

---

## Comparison: Traditional vs. CFM-Managed

| Aspect | Traditional | CFM-Managed |
|--------|-------------|-------------|
| **Isolation** | Process-based | Configuration-based |
| **Resource usage** | High (separate per tenant) | Efficient (shared runtime) |
| **Scaling** | Linear with tenants | Sub-linear |
| **Migration** | Complex (redeployment) | Simple (move metadata) |
| **Operations** | Per-tenant | Centralized |
| **Trust isolation** | Strong (separate processes) | Strong (separate contexts) |
| **Best for** | Self-hosted, edge | Service providers, large enterprises |

### Trust Isolation in Multi-Tenant

A common concern: *Does sharing infrastructure with other tenants compromise my trust relationships?*

**Answer: No.** Trust isolation is configuration-based, not process-based.

```
┌─────────────────────────────────────────────────────────────────┐
│             TRUST ISOLATION IN CFM-MANAGED DEPLOYMENTS           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Tenant A (Company A)              Tenant B (Company B)         │
│   ┌─────────────────────┐          ┌─────────────────────┐      │
│   │  DID: did:web:a.com │          │  DID: did:web:b.com │      │
│   │                     │          │                     │      │
│   │  Credentials:       │          │  Credentials:       │      │
│   │  • Catena-X member  │          │  • Manuf-X member   │      │
│   │  • ISO 27001 cert   │          │  • Gaia-X compliant │      │
│   │                     │          │                     │      │
│   │  Vault Path:        │          │  Vault Path:        │      │
│   │  /tenants/a/creds   │          │  /tenants/b/creds   │      │
│   └─────────────────────┘          └─────────────────────┘      │
│                                                                  │
│   ✓ A's credentials never visible to B's evaluation             │
│   ✓ B's policies never applied to A's negotiations              │
│   ✓ Shared compute, isolated trust contexts                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

Each VPA has:
- Its own DID (decentralized identifier)
- Its own credential store (in Vault, isolated by path/namespace)
- Its own policy configuration
- Its own catalog with access-controlled entries

---

## Service Virtualization Model

The data model that enables multi-tenancy:

```
                    ┌─────────────────────┐
                    │       Tenant        │
                    │   (Organization)    │
                    └──────────┬──────────┘
                               │ 0..N
                    ┌──────────▼──────────┐
                    │  ParticipantProfile │
                    │    (DID-bound)      │ ← Trust identity
                    └───┬─────────────┬───┘
                        │ 1..N       │ 1..N
           ┌────────────▼───┐   ┌────▼────────────┐
           │ DataspaceProfile│   │ VirtualPartici- │
           │   (policies,    │   │   pantAgent     │
           │   credentials,  │   │ (CP/DP/IH/IS)   │
           │   protocol ver) │   └────────┬────────┘
           └─────────────────┘            │ 1..N
                                   ┌──────▼──────┐
                                   │    Cell     │
                                   │ (K8s cluster│
                                   │  or infra)  │
                                   └─────────────┘
```

| Concept | Description |
|---------|-------------|
| **Tenant** | Organization participating in one or more dataspaces |
| **Participant Profile** | Links an identifier (DID) to dataspace memberships |
| **Dataspace Profile** | Configuration for a specific dataspace (policies, protocol version) |
| **Virtual Participant Agent** | Unit of deployment—control plane, data plane, or credential service |
| **Cell** | Homogeneous deployment zone |

---

## Choosing the Right Model

### Use Traditional When:

- You need full control over infrastructure
- Regulatory requirements mandate dedicated deployment
- You're deploying at the edge with limited connectivity
- You're in development or early pilot phase
- You have a small number of participants (< 10)

### Use CFM-Managed When:

- You're offering Dataspace-as-a-Service
- You have many tenants (10+) to manage
- You need centralized operations and monitoring
- You want efficient resource utilization
- You need easy tenant migration capabilities
- You're building a consortium or industry dataspace

---

## What's Next

- **[Core Concepts](/docs/architecture/core-concepts)** — Deep dive into VPAs, Cells, and Service Virtualization
- **[Trust Framework](/docs/architecture/trust-framework)** — How trust works in dataspaces
- **[Components Deep Dive](/docs/architecture/components)** — CFM, Identity Hub, Control Plane, Data Plane
- **[Deployment Models](/docs/architecture/deployment-topologies)** — Detailed deployment options
