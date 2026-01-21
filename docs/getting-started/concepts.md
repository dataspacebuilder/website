# Key Concepts

> Essential terminology and concepts for understanding dataspaces

---

## Dataspaces

A **dataspace** is a federated network where organizations can share data under controlled conditions. Unlike traditional data sharing:

- **Decentralized**: No central authority controls the data
- **Sovereign**: Data owners maintain control over their data
- **Interoperable**: Standard protocols enable any participant to connect

---

## Core Concepts

### Connector

The software component that enables an organization to participate in a dataspace. A connector:

- Publishes data offerings to the catalog
- Discovers data from other participants
- Negotiates contracts for data access
- Coordinates secure data transfers

In the Trusted Data Sharing Stack, connectors are managed by the **EDC-V** control plane.

---

### Asset

A **data asset** is something an organization offers to share:

- A dataset (files, database tables)
- An API endpoint
- A data stream
- Any other data resource

Each asset has:
- **Metadata**: Description, format, schema
- **Data address**: How to access the actual data
- **Policies**: Rules governing access

---

### Policy

**Policies** define the rules for data access:

```
Example Policy:
  - ALLOW if requester has ISO 27001 certification
  - ALLOW if purpose is "research"
  - DENY if requester is a competitor
```

Policies are machine-readable and automatically enforced by the connector.

---

### Contract

A **contract** is an agreement between a data provider and consumer:

- Based on the provider's policies and consumer's credentials
- Negotiated automatically (or with manual approval)
- Defines the terms of data access
- Enforceable and auditable

---

### Catalog

The **catalog** lists all data offerings from a participant:

- Discovered via the Dataspace Protocol
- Contains asset metadata and access requirements
- Can be aggregated across multiple participants (Federated Catalog)

---

## Identity Concepts

### Decentralized Identifier (DID)

A **DID** is a globally unique identifier that:

- Is controlled by the organization (not a central authority)
- Can be resolved to a DID Document with public keys
- Enables cryptographic verification of identity

Example: `did:web:example.com`

---

### Verifiable Credential (VC)

A **Verifiable Credential** is a cryptographically signed claim:

- Issued by a trusted authority
- Held by the subject (in their wallet)
- Presented to verifiers when requested
- Tamper-evident and machine-verifiable

Examples:
- Membership credential (proves membership in an organization)
- Certification credential (proves ISO certification)
- Role credential (proves job function)

---

### Identity Hub (Wallet)

The **Identity Hub** manages an organization's identity:

- Stores and manages DIDs
- Holds Verifiable Credentials
- Handles presentation requests
- Signs and verifies claims

---

## Protocol Concepts

### Dataspace Protocol (DSP)

The standard protocol for dataspace interactions:

1. **Catalog Protocol**: Discover available data
2. **Contract Negotiation Protocol**: Agree on terms
3. **Transfer Process Protocol**: Execute data movement

---

### Data Plane Signaling (DPS)

Separates the **control plane** (negotiation, policy) from the **data plane** (actual data movement):

- Control plane handles the "what" and "who"
- Data plane handles the "how"
- Enables specialized, high-performance data planes

---

## Architecture Concepts

### Control Plane

The **control plane** handles:

- Asset management
- Policy evaluation
- Contract negotiation
- Transfer coordination

In EDC-V, this is a multi-tenant service.

---

### Data Plane

The **data plane** handles actual data movement:

- HTTP transfers
- Object storage (S3)
- Streaming (Kafka)
- Industrial protocols (OPC UA)

Multiple data planes can serve different use cases.

---

### Connector Fabric Manager (CFM)

The **CFM** orchestrates multi-tenant operations:

- Tenant provisioning
- Lifecycle management
- Infrastructure automation
- Configuration management

---

## Common Terms

| Term | Definition |
|------|------------|
| **Provider** | Organization offering data |
| **Consumer** | Organization accessing data |
| **Participant** | Any organization in the dataspace |
| **Tenant** | A customer organization in a multi-tenant deployment |
| **Offer** | A data asset with its associated policy |
| **Agreement** | An accepted contract |
| **Transfer** | The actual data exchange |
| **Issuer** | Authority that issues credentials |

---

## Next Steps

- [MVD Demo](mvd-demo.md) — See these concepts in action
- [FAQ](faq.md) — Common questions answered
- [Architecture Reference](../reference/architecture.md) — Technical deep-dive
