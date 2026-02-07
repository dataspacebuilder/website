---
sidebar_position: 2
title: Virtual Participant Agents
description: VPAs are the units of deployment and administrative control in CFM-managed dataspaces—enabling efficient multi-tenant operation.
---

# Virtual Participant Agents (VPAs)

Virtual Participant Agents (VPAs) are the fundamental units of deployment and administrative control in CFM-managed dataspace deployments. Understanding VPAs is essential for operating dataspaces at scale.

---

## What is a VPA?

A VPA is a **runtime context** for one component of one participant. Key characteristics:

| Characteristic | Description |
|---------------|-------------|
| **Configuration-based** | VPAs don't map to pods or processes—they map to configurations |
| **Isolated context** | Each VPA has its own credentials, policies, and data |
| **Managed lifecycle** | VPAs are provisioned, configured, updated, and decommissioned |
| **Migratable** | VPAs can be moved between cells without redeployment |

### VPAs Are NOT Containers

A common misconception is that VPAs are containers or processes. They're not.

```
┌─────────────────────────────────────────────────────────────────┐
│                    EDC-V Shared Runtime                          │
│                    (Single Process)                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌───────────────┐  ┌───────────────┐  ┌───────────────┐       │
│   │   VPA A       │  │   VPA B       │  │   VPA C       │  ...  │
│   │  (Config A)   │  │  (Config B)   │  │  (Config C)   │       │
│   └───────────────┘  └───────────────┘  └───────────────┘       │
│                                                                  │
│   Each request carries context → runtime loads correct config    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

A single runtime process can serve hundreds of VPAs. When a request arrives:
1. The request includes context identifying the VPA
2. The runtime loads the VPA's configuration from the persistent store
3. The request is processed with that VPA's credentials and policies
4. The response is returned

---

## VPA Types

Each VPA type corresponds to a dataspace component:

| VPA Type | Component | Purpose | Trust Role |
|----------|-----------|---------|------------|
| **Control Plane VPA** | Control Plane | Catalog, negotiation, policy | Trust decisions happen here |
| **Data Plane VPA** | Data Plane | Data transfer execution | Trust-agnostic execution |
| **Credential Service VPA** | Identity Hub | DIDs, credentials, presentations | Trust store |
| **Issuer Service VPA** | Issuer Service | Credential issuance | Becomes trust anchor |

### Control Plane VPA

The Control Plane VPA handles the business logic of data sharing:

- **Catalog Service** — Publishes and discovers data offerings
- **Contract Negotiation** — Negotiates terms between provider and consumer
- **Policy Engine** — Evaluates access policies against credentials
- **Transfer Process Manager** — Initiates and tracks data transfers

**Trust Role:** This is where trust decisions are made. The Control Plane evaluates policies against credentials and decides whether to grant access.

### Data Plane VPA

The Data Plane VPA executes data transfers:

- **Transfer Execution** — Moves data between provider and consumer
- **Protocol Support** — HTTP, S3, Azure Blob, industrial protocols
- **Access Enforcement** — Validates tokens before allowing access

**Trust Role:** The Data Plane is **trust-agnostic**. It executes what the Control Plane agreed—no trust logic here.

### Credential Service VPA

The Credential Service VPA (Identity Hub) manages identity:

- **DID Management** — Creates and manages Decentralized Identifiers
- **Credential Storage** — Stores verifiable credentials
- **Presentation Service** — Creates verifiable presentations

**Trust Role:** This is the **trust store**. It holds the credentials that enable trust decisions.

### Issuer Service VPA

The Issuer Service VPA issues credentials to other participants:

- **Credential Definitions** — Define the shape of credentials
- **Attestation Sources** — Gather claims from databases or presentations
- **Status Lists** — Track revoked/suspended credentials

**Trust Role:** Operating an Issuer Service VPA makes you a **trust anchor**.

---

## Multiple VPAs per Participant

A participant may have multiple VPAs of the same type:

```
┌─────────────────────────────────────────────────────────────────┐
│                    Acme Industries                               │
│                    (Participant)                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Control Plane VPAs:                                            │
│   ┌──────────────────┐                                          │
│   │ CP VPA (primary) │  → Main control plane                    │
│   └──────────────────┘                                          │
│                                                                  │
│   Data Plane VPAs:                                               │
│   ┌──────────────────┐  ┌──────────────────┐                    │
│   │ DP VPA (API)     │  │ DP VPA (Stream)  │                    │
│   │ → REST endpoints │  │ → Kafka streams  │                    │
│   └──────────────────┘  └──────────────────┘                    │
│                                                                  │
│   ┌──────────────────┐  ┌──────────────────┐                    │
│   │ DP VPA (Edge-1)  │  │ DP VPA (Edge-2)  │                    │
│   │ → Factory site A │  │ → Factory site B │                    │
│   └──────────────────┘  └──────────────────┘                    │
│                                                                  │
│   Credential Service VPAs:                                       │
│   ┌──────────────────┐                                          │
│   │ CS VPA (primary) │  → Identity management                   │
│   └──────────────────┘                                          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Why Multiple Data Plane VPAs?

| Scenario | Reason |
|----------|--------|
| **Different protocols** | One for REST APIs, one for streaming |
| **Geographic distribution** | Data planes at each site |
| **Performance isolation** | Separate VPAs for different workloads |
| **Regulatory compliance** | Data planes in specific jurisdictions |

---

## VPA Lifecycle

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  PROVISION  │ →  │  CONFIGURE  │ →  │  ACTIVATE   │
│             │    │             │    │             │
│  Create VPA │    │  Set up     │    │  Make       │
│  metadata   │    │  policies,  │    │  available  │
│             │    │  credentials│    │             │
└─────────────┘    └─────────────┘    └─────────────┘
                                             │
┌─────────────┐    ┌─────────────┐    ┌──────▼──────┐
│ DECOMMISSION│ ←  │   MIGRATE   │ ←  │   UPDATE    │
│             │    │             │    │             │
│  Remove VPA │    │  Move to    │    │  Change     │
│             │    │  new cell   │    │  config     │
└─────────────┘    └─────────────┘    └─────────────┘
```

### Lifecycle Stages

| Stage | Description | CFM Action |
|-------|-------------|------------|
| **Provision** | Create VPA metadata in persistent store | Tenant Manager creates record |
| **Configure** | Set up credentials, policies, endpoints | Activity Agents configure infrastructure |
| **Activate** | Make VPA available for requests | VPA starts serving traffic |
| **Update** | Change configuration, policies, or credentials | Rolling update without downtime |
| **Migrate** | Move VPA to a different cell | Move metadata, update routing |
| **Decommission** | Remove VPA from service | Clean up resources |

---

## VPA Configuration

Each VPA has configuration that defines its behavior:

```json
{
  "vpaId": "cp-vpa-acme-001",
  "type": "ControlPlane",
  "participantProfile": "did:web:acme-corp.com",
  "targetCell": "cell-eu-west-1",
  "config": {
    "catalog": {
      "accessPolicy": "policy-membership-required"
    },
    "negotiation": {
      "defaultContractPolicy": "policy-standard-terms"
    },
    "policies": {
      "definitions": ["policy-1", "policy-2"]
    }
  },
  "credentials": {
    "vaultPath": "/tenants/acme/creds"
  },
  "endpoints": {
    "dsp": "https://acme-corp.dataspace.example/dsp",
    "management": "https://acme-corp.dataspace.example/management"
  }
}
```

---

## VPA Migration

One of the key benefits of configuration-based isolation: **migration without redeployment**.

```
┌─────────────────────┐              ┌─────────────────────┐
│     Cell 1          │              │     Cell 2          │
│     (Source)        │              │     (Target)        │
├─────────────────────┤              ├─────────────────────┤
│                     │              │                     │
│  ┌─────────────┐    │              │                     │
│  │   VPA A     │────┼──────────────┼─►                   │
│  └─────────────┘    │              │                     │
│                     │              │                     │
│  ┌─────────────┐    │              │  ┌─────────────┐    │
│  │   VPA B     │    │              │  │   VPA A     │    │
│  └─────────────┘    │              │  │  (migrated) │    │
│                     │              │  └─────────────┘    │
└─────────────────────┘              │                     │
                                     │  ┌─────────────┐    │
                                     │  │   VPA C     │    │
                                     │  └─────────────┘    │
                                     └─────────────────────┘
```

### Migration Process

1. **Export VPA metadata** from source cell
2. **Update DNS/routing** to point to target cell
3. **Import VPA metadata** to target cell
4. **Verify VPA is operational** in target cell
5. **Clean up** source cell references

### Why Migration is Simple

Because VPAs are configuration-based:
- No container redeployment needed
- No data migration (credentials stay in Vault)
- Zero-downtime migrations are possible
- **Trust boundaries remain intact**

---

## Trust Isolation in VPAs

Each VPA maintains complete trust isolation:

```
┌─────────────────────────────────────────────────────────────────┐
│                    Shared Runtime                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   VPA: Tenant A                    VPA: Tenant B                 │
│   ┌─────────────────────┐         ┌─────────────────────┐       │
│   │                     │         │                     │       │
│   │  DID: did:web:a.com │         │  DID: did:web:b.com │       │
│   │                     │         │                     │       │
│   │  Credentials:       │         │  Credentials:       │       │
│   │  • Catena-X member  │         │  • Manuf-X member   │       │
│   │  • ISO 27001 cert   │         │  • Gaia-X compliant │       │
│   │                     │         │                     │       │
│   │  Policies:          │         │  Policies:          │       │
│   │  • Require supplier │         │  • Require EU       │       │
│   │    credential       │         │    jurisdiction     │       │
│   │                     │         │                     │       │
│   │  Vault Path:        │         │  Vault Path:        │       │
│   │  /tenants/a/creds   │         │  /tenants/b/creds   │       │
│   │                     │         │                     │       │
│   └─────────────────────┘         └─────────────────────┘       │
│                                                                  │
│   ✓ A's credentials never visible to B's evaluation             │
│   ✓ B's policies never applied to A's negotiations              │
│   ✓ Shared compute, isolated trust contexts                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### What's Isolated

| Aspect | How Isolated |
|--------|--------------|
| **DID** | Each VPA has its own DID |
| **Credentials** | Separate Vault paths/namespaces |
| **Policies** | Per-VPA policy definitions |
| **Catalog** | Per-VPA catalog entries |
| **Contracts** | Per-VPA contract agreements |
| **Transfer history** | Per-VPA state |

---

## VPA and Participant Profiles

VPAs are linked to Participant Profiles in the virtualization model:

```
┌─────────────────────────────────────────────────────────────────┐
│                         Tenant                                   │
│                    (Organization)                                │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Participant Profile                           │
│                    (DID-bound)                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   DID: did:web:acme-corp.com                                    │
│                                                                  │
│   Dataspace Profiles:                                            │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ Catena-X:                                                │   │
│   │   • Membership credential                                │   │
│   │   • Accepted policies                                    │   │
│   │   • Protocol version: DSP 2024-1                        │   │
│   └─────────────────────────────────────────────────────────┘   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ Manufacturing-X:                                         │   │
│   │   • Membership credential                                │   │
│   │   • Accepted policies                                    │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│   VPAs:                                                          │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│   │ CP VPA       │  │ DP VPA       │  │ CS VPA       │          │
│   │ → Cell EU    │  │ → Cell EU    │  │ → Cell EU    │          │
│   └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## VPA Scaling

VPAs themselves don't scale—the cells they run in do:

```
┌─────────────────────────────────────────────────────────────────┐
│                         Cell                                     │
│                    (Kubernetes Cluster)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   EDC-V Deployment (Horizontal Pod Autoscaler / Keda)           │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│   │ Pod 1    │  │ Pod 2    │  │ Pod 3    │  │ Pod N    │  ...   │
│   │          │  │          │  │          │  │          │        │
│   │ Serves   │  │ Serves   │  │ Serves   │  │ Serves   │        │
│   │ all VPAs │  │ all VPAs │  │ all VPAs │  │ all VPAs │        │
│   └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
│                                                                  │
│   VPA Context loaded on-demand per request                      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Scaling Strategy

| Dimension | How It Scales |
|-----------|---------------|
| **More VPAs** | Add VPA configurations (no infra change needed) |
| **More load** | Cell runtime scales horizontally (HPA/Keda) |
| **More regions** | Add more cells |
| **More capacity** | Add more nodes to cells |

---

## What's Next

- **[Cells & Infrastructure](/docs/architecture/core-concepts/cells-infrastructure)** — Deployment zones
- **[Understanding the Stack](/docs/architecture/understanding-the-stack)** — Traditional vs. Modern architecture
- **[Trust Framework](/docs/architecture/trust-framework)** — How trust works
- **[Deployment Models](/docs/architecture/deployment-topologies)** — Practical deployment options
