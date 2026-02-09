# Guide: Operating Multi-Tenant Dataspace Environments

*For platform teams, SREs, and operations engineers*

---

## What This Guide Covers

This guide is for teams responsible for running a multi-tenant dataspace environment in production. It covers what you deploy, how you scale it, how you observe it, and how you respond to incidents.

**Prerequisites**: Read the [Get Started](../get-started.md) page to understand the components. Read the [Architect Guide](./architects.md) if you need to understand the deployment design decisions.

This guide focuses on **operations** — the day-to-day work of running the platform. It does not cover component internals, protocol specifications, or governance design. For those, see [Components](../components/connector.md) and [Concepts](../concepts/what-is-a-dataspace.md).

---

## What You Run

Operating a multi-tenant dataspace environment means running two planes:

### Management Plane (CFM)
Provisions participant contexts and automates lifecycle management. Consists of:
- **Tenant Manager** — metadata control point; REST API for tenant and participant operations
- **Provision Manager** — workflow execution engine for onboarding and lifecycle
- **Activity Agents** — async workers that perform infrastructure operations (K8s deploy, Vault config, DNS setup)
- **NATS JetStream** — messaging middleware for reliable, decoupled workflow coordination
- **PostgreSQL** — persistent metadata storage

### Runtime Plane (Cells)
Hosts the actual dataspace components where participants interact. Each cell contains:
- **Connectors (Control Plane)** — trust decisions, catalog, negotiation, policy evaluation
- **Identity Hubs (Credential Service)** — DID management, credential storage, proof composition
- **Data Planes** — data transfer execution
- **PostgreSQL** — state persistence
- **Vault / STS** — secrets, key material, token infrastructure

**Critical operational insight**: CFM can be down without affecting live data sharing. Trust decisions happen between participants' Connectors in the runtime plane, not through CFM. CFM downtime blocks onboarding and provisioning — not negotiation and transfer.

---

## Infrastructure Foundation

Run the platform on standard cloud-native infrastructure. Keep the foundation intentionally simple — predictable failure modes, repeatable deployment patterns, and runbooks your teams already know.

| Component | Purpose | Recommendation |
|---|---|---|
| **Kubernetes** | Container orchestration | Managed K8s; standard HA patterns |
| **PostgreSQL** | State persistence | Primary + synchronous replica with automatic failover |
| **Vault / STS** | Secrets, key material | HA mode with auto-unseal; per-participant access boundaries |
| **DNS** | Request routing, DID resolution | Cloud-managed; programmatic management |
| **Observability** | Metrics, logging, tracing | Standard stack (Prometheus, Grafana, OpenTelemetry) |
| **IAM / IDP** | Admin and participant auth | Keycloak or equivalent |
| **NATS JetStream** | CFM messaging | Minimum 3 nodes for quorum |

**Principle**: Put complexity where it pays — trust, policy, interoperability. Use managed offerings for everything else.

---

## Tenant Onboarding

Onboarding a new tenant involves both governance and platform operations:

### The Workflow

1. **Application** — Organization applies through a governance-recognized onboarding process
2. **Verification** — Legal, compliance, and business checks (governance responsibility)
3. **Tenant creation** — CFM creates the tenant record and metadata
4. **Participant context provisioning** — CFM provisions Connector, Identity Hub, and Data Plane contexts in the target cell
5. **Credential delivery** — Governance-recognized issuer delivers credentials to the participant's Identity Hub
6. **Configuration** — Participant configures assets, policies, and applications through the portal
7. **Active participation** — Participant begins catalog discovery, negotiation, and data sharing

Steps 1-2 are governance responsibilities outside your platform. Steps 3-4 are CFM automation. Step 5 involves coordination between your platform and the credential issuer. Steps 6-7 are participant self-service.

### Provisioning What CFM Creates

When CFM provisions a participant context, it:
- Creates tenant and participant metadata in the Tenant Manager
- Runs a provisioning workflow through the Provision Manager
- Activity Agents execute infrastructure operations:
  - Deploy/configure resources in the target Kubernetes cell
  - Configure Vault namespaces and secrets for the participant
  - Set up DNS entries for participant-specific endpoints
  - Deliver initial configuration

The entire workflow is asynchronous and resilient to restarts via NATS JetStream persistence.

---

## Authentication and Access Control

### Roles

| Role | Access | Typical Client |
|---|---|---|
| **Operator** | Infrastructure (K8s, DNS, Vault, IAM) | Platform tooling, shell access |
| **Admin** | Full access to all resources | Emergency and initial setup only |
| **Provisioner** | Creates and manages participant contexts | CFM automation |
| **Participant** | Manages own resources (catalogs, policies, contracts) | Portal UI backend (Redline) |

### Key Boundaries

- Administration APIs use **OAuth2 `client_credentials`** flow
- Two claims matter: `role` (admin/provisioner/participant) and `participant_context_id` (the security unit)
- Participant-scoped API endpoints are rooted under `/participants/{participant_context_id}/...`
- Keep `client_id` separate from `participant_context_id` — rotate client credentials independently
- Vault access should use a **separate client identity** from API access, still bound to the same participant context

### Least Privilege

- `role=admin` for emergencies only
- `role=provisioner` for CFM automation — must not manipulate participant business data
- `role=participant` for day-2 operations — scoped to own resources
- Avoid wildcard scopes for tenant-facing clients

---

## Scaling

### CFM Layer

The CFM layer is a standard control plane. Scale it like one:
- CFM pods: minimum 2 replicas behind a load balancer
- NATS: minimum 3 nodes for quorum
- PostgreSQL: primary + synchronous replica
- Vault: HA mode

CFM downtime degrades onboarding — not live data sharing.

### Cell Layer

Scale cells based on component characteristics:

| Component | Replicas | Scaling Trigger |
|---|---|---|
| **Control Plane** | 3-5 | HPA on CPU and request rate |
| **Data Plane** | 2-10+ | HPA or KEDA on transfer volume |
| **Credential Service** | 2-3 | Verification load |

### Adding Capacity

- Add capacity by **scaling cells** or **adding cells**, not by multiplying per-tenant deployments
- Multiple cells provide geographic distribution, fault isolation, and regulatory compliance
- CFM can re-target participant contexts to different cells by updating metadata and routing

---

## High Availability

### CFM Layer HA

| Component | HA Configuration |
|---|---|
| CFM pods | Minimum 2 replicas, load-balanced |
| NATS | Minimum 3 nodes, quorum-based |
| PostgreSQL | Primary + sync replica, automatic failover |
| Vault | HA mode with auto-unseal |

Target: primary region plus warm standby in DR region.

### Runtime Layer HA

The runtime plane handles live data sharing and needs higher availability:
- Control Plane replicas: 3-5 per cell
- Credential Service replicas: 2-3 per cell
- Data Plane replicas: scale with transfer volume
- Cross-cell redundancy for geographic fault isolation

### Failure Mode Design

| Failure | Impact | Mitigation |
|---|---|---|
| CFM outage | Onboarding and provisioning blocked; live sharing unaffected | Redundancy + clear SLO separation |
| Cell outage | Participants in that cell affected | Multi-cell deployment; CFM can re-target contexts |
| PostgreSQL failure | State loss risk | Synchronous replication + automated failover |
| Vault failure | Credential access blocked | HA mode + auto-unseal |
| NATS failure | Provisioning workflows stalled | Quorum-based deployment; JetStream persistence |

---

## Observability

### Metrics

| Category | Key Metrics |
|---|---|
| **Business** | Active tenants, contracts negotiated, transfers completed, data volume shared, credential issuances |
| **Technical** | API latency (P50/P95/P99), request rates, error rates, NATS queue depth, resource utilization |

### Logging

Required fields for every log entry:
- Severity, component name, participant context ID, tenant ID

Common context fields:
- Action, counterparty DIDs, contract IDs

Categories:
- Application events, security/audit, DSP/DPS messages, DCP flows

Standardize fields early. This enables tenant-scoped dashboards and incident playbooks that scale with customer count.

### Tracing

Follow a single request across the full protocol stack:
- DSP flows: catalog → negotiation → transfer
- DCP credential presentation and verification
- DPS signaling between control and data planes
- End-to-end data sharing paths

Use distributed tracing (OpenTelemetry) with correlation IDs that span protocol boundaries.

### Policy Change as Operational Concern

If your deployment uses dynamic policy evaluation (e.g., via CEL), treat policy updates like production configuration changes:
- Validate before deployment
- Version all policy changes
- Make changes auditable
- Test policy changes against known scenarios before rollout

---

## Operational Boundaries

| Concern | Who Owns It |
|---|---|
| Infrastructure deployment, scaling, monitoring | **Operator** |
| Tenant provisioning, lifecycle automation | **CFM (Provisioner)** |
| Identity, credentials, policies, catalogs, contracts | **Participant** |
| Governance framework, membership rules, DTFs | **DSGA** |
| Trust decisions in data sharing | **Participants (peer-to-peer)** |

The platform succeeds because these boundaries are explicit and enforced. Operators run cells, orchestration, and observability. Participants control identities, policies, and integrations.

**Centralize operations. Decentralize trust. Keep the protocol surface stable.**

---

**Next steps**: [Components](../components/connector.md) (deep dive on each component) | [Guide: For Architects](./architects.md) (deployment design) | [Reference](../reference/glossary.md) (APIs and specs)
