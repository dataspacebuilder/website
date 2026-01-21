# Architecture Reference

> Technical overview of the EDC Trusted Data Sharing Stack

---

## System Overview

The EDC Trusted Data Sharing Stack is a modular architecture designed for multi-tenant dataspace operations. It separates concerns into distinct layers, enabling cloud providers to operate efficiently at scale.

![Stack Architecture](../assets/stack.png)

---

## Architectural Layers

### Layer 1: CSP Infrastructure

The foundation layer integrates with your existing cloud infrastructure:

- **Kubernetes** — Container orchestration
- **PostgreSQL** — Persistent state storage
- **Vault** — Secrets and key management
- **Ingress/Load Balancer** — Traffic management

### Layer 2: Fabric Management (CFM)

The Connector Fabric Manager orchestrates tenant operations:

```
┌─────────────────────────────────────────────────────────────────┐
│                   Connector Fabric Manager                      │
├──────────────────┬──────────────────┬───────────────────────────┤
│   Tenant API     │  Workflow Engine │  Infrastructure Adapter   │
├──────────────────┴──────────────────┴───────────────────────────┤
│                        State Store                              │
└─────────────────────────────────────────────────────────────────┘
```

**Responsibilities:**
- Tenant provisioning and lifecycle
- Workflow orchestration
- Configuration management
- Infrastructure abstraction

### Layer 3: Control Plane (EDC-V)

The virtualized EDC enables multi-tenant control plane operations:

```
┌─────────────────────────────────────────────────────────────────┐
│                        EDC-V Runtime                            │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Tenant A  │  │   Tenant B  │  │   Tenant N  │             │
│  │   Context   │  │   Context   │  │   Context   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
├─────────────────────────────────────────────────────────────────┤
│  Catalog │ Negotiation │ Transfer │ Policy Engine              │
└─────────────────────────────────────────────────────────────────┘
```

**Capabilities:**
- Multi-tenant isolation
- Catalog management
- Contract negotiation
- Transfer process coordination
- Policy evaluation

### Layer 4: Data Planes

Specialized engines for data movement:

| Data Plane | Use Case | Protocol |
|------------|----------|----------|
| HTTP | REST APIs, files | HTTP/S |
| S3 | Object storage | S3 API |
| Industrial | Manufacturing | OPC UA |
| Streaming | Events | Kafka |

### Layer 5: User Interfaces

Portals for different user types:

- **CSP Management UI** — Platform administration
- **Manufacturer/Tenant UI** — End-user operations

---

## Component Interactions

### Tenant Provisioning Flow

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│ CSP Admin│────▶│   CFM    │────▶│ K8s API  │────▶│  EDC-V   │
│          │     │          │     │          │     │  Context │
└──────────┘     └──────────┘     └──────────┘     └──────────┘
     │                │                                  │
     │                ▼                                  │
     │         ┌──────────┐                             │
     │         │ Identity │◀────────────────────────────┘
     │         │   Hub    │
     │         └──────────┘
     │                │
     ▼                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Tenant Ready                                │
└─────────────────────────────────────────────────────────────────┘
```

### Data Exchange Flow

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│ Consumer │────▶│ Control  │────▶│ Control  │────▶│ Provider │
│          │     │ Plane    │     │ Plane    │     │          │
└──────────┘     └──────────┘     └──────────┘     └──────────┘
                      │                │
                      ▼                ▼
                ┌──────────┐     ┌──────────┐
                │  Policy  │◀───▶│  Policy  │
                │  Engine  │     │  Engine  │
                └──────────┘     └──────────┘
                      │                │
                      ▼                ▼
                ┌──────────────────────────────────┐
                │         Data Plane               │
                │    (Direct Provider → Consumer)  │
                └──────────────────────────────────┘
```

---

## Protocol Implementation

### Dataspace Protocol (DSP)

The stack implements DSP 2025-1:

| Protocol | Endpoint Pattern | Purpose |
|----------|------------------|---------|
| Catalog | `/api/dsp/catalog/*` | Asset discovery |
| Negotiation | `/api/dsp/negotiations/*` | Contract negotiation |
| Transfer | `/api/dsp/transfers/*` | Transfer coordination |

### Decentralized Claims Protocol (DCP)

Identity verification via:

- **DID Resolution** — Resolve participant identifiers
- **Credential Verification** — Validate claims
- **Presentation Exchange** — Request and provide proofs

### Data Plane Signaling (DPS)

Decouples control and data planes:

```
Control Plane                    Data Plane
     │                               │
     │──── START signal ────────────▶│
     │                               │
     │◀─── STARTED ─────────────────│
     │                               │
     │        (Data flows)           │
     │                               │
     │◀─── COMPLETED ───────────────│
     │                               │
```

---

## Security Architecture

### Identity Layer

```
┌─────────────────────────────────────────────────────────────────┐
│                      Identity Architecture                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐      │
│   │    DID      │────▶│  Identity   │◀────│ Credential  │      │
│   │  Resolver   │     │    Hub      │     │   Issuer    │      │
│   └─────────────┘     └─────────────┘     └─────────────┘      │
│                              │                                  │
│                              ▼                                  │
│                       ┌─────────────┐                          │
│                       │   Vault     │                          │
│                       │   (Keys)    │                          │
│                       └─────────────┘                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Authorization Model

Policy-based access control (ABAC):

```
Access Request
     │
     ▼
┌─────────────┐
│   Policy    │
│   Engine    │
└─────────────┘
     │
     ├── Check credentials
     ├── Evaluate constraints
     ├── Verify purpose
     │
     ▼
┌─────────────┐
│  Decision:  │
│ ALLOW/DENY  │
└─────────────┘
```

---

## Deployment Topologies

### Single-Cluster Deployment

Simplest deployment for getting started:

- All components in one Kubernetes cluster
- Suitable for development, testing, small production
- Horizontal scaling within cluster

### Multi-Cluster / Regional

For high availability and data residency:

- CFM in primary region
- EDC-V instances per region
- Data planes localized
- Federated catalog

### Hybrid Cloud

Combining cloud and on-premise:

- Control plane in cloud
- Data planes on-premise (for data residency)
- Secure connectivity (VPN/private link)

---

## Scalability

### Horizontal Scaling

| Component | Scaling Strategy |
|-----------|------------------|
| CFM | Replicas behind load balancer |
| EDC-V | Replicas with shared state |
| Data Planes | Independent scaling per type |
| Identity Hub | Replicas with cache |

### Resource Guidelines

| Tenants | CFM | EDC-V | Database |
|---------|-----|-------|----------|
| < 100 | 2 replicas | 3 replicas | Small |
| 100-1000 | 3 replicas | 5 replicas | Medium |
| > 1000 | 5+ replicas | 10+ replicas | Large/Clustered |

---

## Integration Patterns

### Inbound (External → Stack)

- **DSP Protocol** — Standard dataspace interactions
- **Management API** — Administrative operations
- **Webhook** — Event notifications

### Outbound (Stack → External)

- **Data Sources** — Customer systems, APIs, databases
- **Identity Providers** — OIDC for user authentication
- **Monitoring** — Prometheus metrics, logs

---

## Further Reading

- [EDC-V Component Details](edc-v.md)
- [CFM Component Details](cfm.md)
- [Identity Hub Details](identity-hub.md)
- [Data Planes Details](data-planes.md)
- [Protocol Specifications](protocols.md)
