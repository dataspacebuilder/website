# Guide: Designing Dataspace Deployments

*For enterprise architects, solutions architects, and technical leadership*

---

## What This Guide Covers

This guide helps you design a dataspace deployment architecture. It covers the maturity path from standalone connectors to industrial-scale multi-tenant environments, the key architectural decisions, and the deployment patterns available.

**Prerequisites**: Read the [Get Started](../get-started.md) page to understand the components and how they interact. Read the [Concepts](../concepts/what-is-a-dataspace.md) pages if you need the conceptual foundation.

This guide does **not** cover day-to-day operations, runbooks, or monitoring configuration — that's the [Operator Guide](./operators.md).

---

## The Maturity Path

Building a dataspace deployment is a journey. Cloud providers and enterprises typically progress through three levels:

### Level 1: Standalone Connector (Classic EDC)

The entry point. A single Classic EDC connector combines Control Plane and Data Plane in one runtime, deployed per organization.

**When to use**:
- Evaluating dataspace technology
- Single-organization deployment
- Participating in a dataspace as an individual organization

**Characteristics**:
- One connector per organization
- Simple to deploy and understand
- Proven in production (e.g., Catena-X)
- Operationally expensive at scale — each tenant requires separate infrastructure

### Level 2: Cloud-Native Multi-Tenancy (EDC-V + CFM)

The scale play. EDC-V (Virtual Connector) enables multiple participant contexts on shared infrastructure. CFM automates provisioning and lifecycle management.

**When to use**:
- Hosting multiple tenants
- Building a DSaaS offering
- Reducing per-tenant operational cost

**Characteristics**:
- Shared runtime, isolated participant contexts
- Automated provisioning through CFM
- Sub-linear cost scaling with tenant count
- Centralized operations, decentralized trust

### Level 3: Industrial Trust Fabric (DCP + DPS + Specialized Data Planes)

The full production model. Automated trust verification through DCP, specialized Data Planes for industrial protocols, dynamic policy evaluation, and multi-dataspace participation.

**When to use**:
- Industrial production environments with OT/edge requirements
- Complex trust models with multiple DTFs
- Multi-dataspace participation with cross-domain data sharing

**Characteristics**:
- Automated credential verification (ISO certificates, industry attestations)
- Specialized Data Planes (OPC-UA, industrial IoT, high-throughput)
- Dynamic policy evaluation via CEL
- Full separation of Control Plane and Data Plane across geographic and security boundaries

### Maturity Comparison

| Aspect | Level 1: Standalone | Level 2: Multi-Tenant | Level 3: Industrial Fabric |
|---|---|---|---|
| Primary value | Stable data sharing | Operational efficiency | Trust automation at scale |
| Identity model | Per-tenant configuration | Multi-tenant management | Automated DCP/DTF verification |
| Data movement | Single data plane | Managed infrastructure | Specialized industrial planes |
| Operational effort | High (per tenant) | Low (centralized) | Near-zero (automated) |
| Cost model | Linear with tenants | Sub-linear | Sub-linear with automation savings |

---

## Key Architectural Decisions

### 1. Identity System Design

The most fundamental decision. It determines the trust model and the degree of participant autonomy.

**Recommendation**: Decentralized identity (DIDs + VCs). This is the dataspace-native model, maximizing participant autonomy and eliminating single points of failure.

If regulatory or organizational constraints require a centralized identity component, design it as an *additional* trust anchor rather than a replacement for decentralized identity.

See [Concepts: Decentralized Identity](../concepts/decentralized-identity.md) for the conceptual foundation.

### 2. Trust Framework Selection

Which Dataspace Trust Frameworks (DTFs) will your deployment support? This determines:
- Which credential issuers are recognized
- What policies can be evaluated
- What semantic models are required
- How interoperable you are with other dataspaces

DTFs can be composed hierarchically. Start with the minimum required for your target dataspace(s) and add more as use cases expand.

See [Concepts: Trust and Governance](../concepts/trust-and-governance.md) for DTF details.

### 3. Deployment Topology

#### Control Plane Placement
The Control Plane handles trust decisions and must be highly available. In most deployments, it runs in the cloud (managed Kubernetes) with standard HA patterns.

For multi-tenant deployments, the Control Plane serves many participant contexts from shared infrastructure, with isolation enforced at the configuration and data model level.

#### Data Plane Placement
Data Planes should be deployed **where the data lives**. Common patterns:

| Pattern | Description | When to Use |
|---|---|---|
| **Co-located** | Data Plane next to Control Plane | Simple deployments, cloud-native data |
| **Edge / On-Prem** | Data Plane at factory, hospital, or regional DC | Data sovereignty, latency, OT connectivity |
| **Multi-Protocol** | Separate Data Planes per wire protocol | Diverse data sources (APIs, storage, streams, OT) |
| **Geographic** | Data Planes in required regions | Jurisdictional data residency requirements |

The DPS interface between Control Plane and Data Plane is the key enabler: it allows any deployment topology while maintaining a consistent trust model.

#### Cell Strategy (Level 2+)
In multi-tenant deployments, a **cell** is a homogeneous deployment zone (typically a Kubernetes cluster) that hosts participant contexts. Cell strategy decisions include:

- **Number and size of cells** — based on expected tenant count, geographic distribution, and regulatory requirements
- **Cell isolation level** — shared infrastructure with logical isolation vs. dedicated clusters for high-sensitivity tenants
- **Scaling approach** — add capacity by scaling cells, not by multiplying per-tenant deployments

### 4. Integration Points

| Dependency | Purpose | Recommendation |
|---|---|---|
| **Kubernetes** | Container orchestration | Use managed K8s; standard HA patterns |
| **PostgreSQL** | State persistence | Managed database with HA; one logical DB, tenant-scoped schemas |
| **Vault / STS** | Secrets and key material | Managed secrets service; per-participant access boundaries |
| **DNS** | Request routing and DID resolution | Cloud-managed DNS with programmatic management |
| **IAM / IDP** | Admin and participant authentication | Keycloak or equivalent; separate from dataspace identity (DIDs) |
| **Observability** | Metrics, logging, tracing | Standard telemetry stack (Prometheus, Grafana, OpenTelemetry) |

**Design principle**: Prefer managed offerings and proven platform primitives. Put complexity where it pays — trust, policy, and interoperability — not in infrastructure operations.

### 5. Credential Flow Design

Map the credential flow from issuance to verification:

1. **Governance definition** — The DSGA defines required credentials and recognized issuers
2. **Onboarding** — New participants go through the governance-defined process to obtain credentials
3. **Credential issuance** — Governance-recognized issuers verify attributes and issue credentials
4. **Credential delivery** — Credentials are delivered to the participant's Identity Hub
5. **Credential presentation** — During DSP negotiation, credentials are presented and verified via DCP
6. **Credential lifecycle** — Renewal, revocation, and rotation are managed by the participant and issuer

Design your deployment to support multiple credential issuers (avoiding single points of failure) and automated credential delivery workflows.

---

## Reference Architecture

### Single-Tenant (Level 1)

```
┌─────────────────────────────┐
│        Organization         │
│  ┌───────────┐              │
│  │ Connector │ (CP + DP)    │
│  └───────────┘              │
│  ┌───────────┐              │
│  │Identity   │              │
│  │Hub        │              │
│  └───────────┘              │
│  ┌───────────┐              │
│  │ Keycloak  │              │
│  └───────────┘              │
│  PostgreSQL, Vault          │
└─────────────────────────────┘
```

### Multi-Tenant (Level 2)

```
┌─────────────────────────────────────┐
│         Management Plane (CFM)      │
│  Tenant Mgr │ Provision Mgr │ Agents│
└──────────────────┬──────────────────┘
                   │ provisions
┌──────────────────┼──────────────────┐
│              Cell (Runtime)         │
│  ┌────────┐ ┌────────┐ ┌────────┐  │
│  │  CP    │ │  CS    │ │  DP    │  │
│  │ shared │ │ shared │ │ shared │  │
│  └────────┘ └────────┘ └────────┘  │
│  Participant contexts: A, B, C, ... │
│  PostgreSQL, Vault, NATS            │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│           Redline (UI/BFF)          │
│  Participant Portal │ Operator View │
│           Keycloak                  │
└─────────────────────────────────────┘
```

### Hybrid / Industrial (Level 3)

```
Cloud                              Edge / On-Prem
┌──────────────────────┐          ┌──────────────┐
│   Management Plane   │          │  Data Plane   │
│   (CFM)              │          │  (OPC-UA)     │
│                      │          │  Factory A    │
│   Cell (Runtime)     │          └──────────────┘
│   CP + CS (shared)   │          ┌──────────────┐
│   DP (HTTP, S3)      │←─ DPS ─→│  Data Plane   │
│                      │          │  (MQTT)       │
│   Redline (UI)       │          │  Sensors      │
└──────────────────────┘          └──────────────┘
```

---

## Design Checklist

Before implementation, ensure you've answered:

- [ ] Which maturity level are you targeting (and what's the evolution path)?
- [ ] What identity model will you use (decentralized recommended)?
- [ ] Which DTFs and credential issuers are required?
- [ ] Where will Control Planes and Data Planes be deployed?
- [ ] How many cells do you need, and what's the isolation model?
- [ ] What are the integration requirements for IAM, secrets, DNS, and observability?
- [ ] How will credentials flow from issuance to verification?
- [ ] What's your tenant onboarding workflow (manual vs. automated)?
- [ ] What are your interoperability requirements (single dataspace vs. multi-dataspace)?
- [ ] What SLOs will you target for management plane vs. runtime?

---

**Next steps**: [Guide: For Operators](./operators.md) (how to run this in production) | [Components](../components/connector.md) (deep dive on each component)
