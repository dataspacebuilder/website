---
sidebar_label: "CSP Build Guide"
sidebar_position: 5
title: "CSP Build Guide: What Eclipse Gives You vs. What You Build"
---

# CSP Build Guide: What Eclipse Gives You vs. What You Build

## Who This Is For

You are a cloud service provider helping organizations set up new dataspaces from scratch. You need to know exactly which components come ready-made from Eclipse projects and which parts you need to build yourself.

This guide gives you that map. It starts with the standard CSP baseline — provisioning participants and running a basic scenario for sharing files — and builds up to customer-facing applications and multi-protocol data planes.

## Running Systems vs. Governance Decisions

A functioning dataspace needs two things: **running software components** and **governance decisions** made by the Dataspace Authority. These are fundamentally different. Components are systems you deploy and operate. Governance decisions are rules and schemas you configure into those systems.

### Components You Deploy

| Component | Source | What it does |
|-----------|--------|-------------|
| **Control Plane** | Eclipse (EDC) | Contract negotiation, catalog, policy engine, transfer coordination |
| **Identity Hub** | Eclipse (EDC) | DID management, credential storage, verifiable presentations |
| **Connector Fabric Manager** | Eclipse (CFM) | Provisions and manages participant connectors at scale |
| **Data Plane** | CSP writes (minimal), community, or dataspace initiative | Serves and consumes data; uses Eclipse Data Plane SDKs for DPS integration |
| **Issuer Service** | Eclipse (EDC) | Issues verifiable credentials, maintains revocation lists |
| **Infrastructure** | CSP builds/operates | Kubernetes, PostgreSQL, secret store, NATS, identity provider |
| **User Portal** | CSP builds | Web interface for customers to manage assets and contracts |
| **Monitoring & Observability** | CSP builds | Health checks, metrics, logging, alerting for the connector fleet |

#### About Data Planes

The Eclipse Data Plane SDKs (available in Go, Java, Rust, and .NET) handle the **Data Plane Signaling (DPS)** protocol — the communication between the Control Plane and the Data Plane. They take care of signaling, state management, and token validation.

You write the data serving logic — the part that actually reads a file from storage and returns it over HTTP, or pushes a payload to a consumer endpoint. For simple HTTP file transfers, this is minimal code. The SDK handles everything else.

Not every data plane needs to be built by the CSP. The data plane ecosystem is growing: industry communities (e.g., OPC-UA) are building protocol-specific data planes, and dataspace initiatives produce use case applications that include their own data plane logic — such as the Catena-X CCM (Company Certificate Management) app. As a CSP, you can deploy community or initiative-provided data planes alongside your own.

### Governance Decisions (Configured, Not Built)

These are not running systems. They are rules, schemas, and trust anchors that the **Dataspace Authority** defines. A CSP supporting multiple dataspaces makes them configurable per dataspace:

- **Access and usage policies (ODRL)** — what rules govern data sharing (e.g., "holder must present a valid MembershipCredential")
- **Credential schemas** — what verifiable credentials participants need (e.g., a MembershipCredential, a DataProviderCredential)
- **Credential issuers + trust list** — which organizations can issue which credentials; the trust anchors for participant onboarding
- **Governance rules** — who can join the dataspace and under what conditions

These decisions get expressed as ODRL policies in the Control Plane, credential types in the Identity Hub, and trust anchors in the issuer configuration. The CSP deploys the systems; the Dataspace Authority fills in the rules.

### The key insight

**For file and JSON sharing over HTTP, the only custom code a CSP writes is a minimal data plane.** Everything else in the data path — discovery, negotiation, trust, policy, transfer coordination — comes from Eclipse. The rest of what CSPs build is infrastructure (standard cloud), a user interface, and operational tooling.

---

## Level 0: The CSP Baseline

This is the standard starting point. CFM provisions participants. The Control Plane and Identity Hub run in virtual (multi-tenant) mode. A minimal data plane serves files over HTTP.

```
┌──────────────────────────────────────────────────┐
│  Your Platform (CSP)                             │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  Connector Fabric Manager (Eclipse CFM)    │  │
│  │  Tenant Mgr · Provision Mgr · Agents       │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  Control Plane (Eclipse EDC, virtual mode) │  │
│  │  Catalog · Negotiation · Policy · Transfers│  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  Identity Hub (Eclipse EDC, virtual mode)  │  │
│  │  DIDs · Credentials · Presentations        │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  Data Plane (CSP writes, using SDK)        │  │
│  │  Minimal — serves files over HTTP          │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  Infrastructure (CSP)                      │  │
│  │  K8s · PostgreSQL · Vault · NATS · IDP     │  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

### What Eclipse gives you

- **CFM** automates participant onboarding. You call its REST API to provision a participant — it creates the context, sets up the DID, configures the Identity Hub, and requests initial credentials.
- **Control Plane** handles catalog publication, contract negotiation, and policy evaluation. The provider describes a file as an asset, sets a policy, and publishes a contract definition. The consumer discovers it, negotiates access, and gets authorized — all through the Dataspace Protocol.
- **Identity Hub** manages each participant's DID and credentials. During negotiation, the consumer's Identity Hub presents credentials, the provider's side verifies them. This happens automatically via DCP.
- **Data Plane SDKs** handle DPS integration. You write the data serving logic on top.

### What you build

- **Infrastructure.** A Kubernetes cluster, a PostgreSQL database, a secret store (Vault or equivalent), NATS for CFM messaging, and an OAuth2 identity provider. Standard cloud provisioning — no dataspace-specific code.
- **A minimal data plane.** Using one of the Eclipse Data Plane SDKs, you write the code that reads files from storage and serves them over HTTP. The SDK handles signaling, state management, and token validation. For simple file transfers, this is a thin layer.
- **API access for participants.** At this level, participants interact via the Management API directly (or through tools like Bruno or curl). They query each other's catalogs directly over DSP.

### What the Dataspace Authority defines

Even at the baseline, a few governance decisions are needed:

| Decision | Example |
|----------|---------|
| What credential is required? | A `MembershipCredential` issued by the consortium |
| What policy governs access? | "Holder must present a valid MembershipCredential" |
| How are DIDs resolved? | `did:web` — published at a well-known URL |

These are configuration, not code. The policy is an ODRL expression evaluated by the Control Plane's policy engine. The credential is a VC stored in the Identity Hub. The DID method is a deployment choice.

### What you can share at this level

Anything that travels over HTTP:

- PDF files
- JSON documents
- CSV exports
- Any file served from an HTTP endpoint

---

## Level 1: Adding a Portal and Observability

Your customers are not API-first developers. They need a web interface. And you need to know when something breaks.

```
┌──────────────────────────────────────────────────┐
│  Your Platform (CSP)                             │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  User Portal (CSP)                         │  │
│  │  Calls Management API + Identity API       │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  Monitoring & Observability (CSP)          │  │
│  │  Metrics · Logs · Alerts · Health checks   │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  CFM + EDC-V + Data Plane                  │  │
│  │  (same as Level 0)                         │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  Infrastructure (CSP)                      │  │
│  │  (same as Level 0)                         │  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

### What you build at this level

| Component | What it takes |
|-----------|--------------|
| **User Portal** | A web application for your customers. Catalog browsing, contract management, credential viewing, transfer status. The portal calls the Management API and Identity API on behalf of the logged-in user. Authentication via your IDP. |
| **Monitoring & Observability** | Health checks against component endpoints, metrics collection (Prometheus or equivalent), log aggregation, alerting. Standard cloud-native observability — nothing dataspace-specific. |

The Observability API on each EDC component exposes health and readiness endpoints — you just need to scrape and alert on them.

---

## Level 2: Customer Applications

Some customers don't just need a portal — they need an application deployed on their behalf that automates data sharing workflows. This application uses the Management APIs and integrates with the data plane via DPS.

```
┌──────────────────────────────────────────────────┐
│  Your Platform (CSP)                             │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  Portal + Monitoring                       │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  CFM + EDC-V (multi-tenant)                │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  Data Plane (CSP writes, using SDK)        │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  Customer Application (CSP deploys)        │  │
│  │  Uses Management API · Integrates via DPS  │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  Infrastructure (CSP)                      │  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

### What this looks like

A customer application is a service you deploy for a specific customer (or class of customers) that acts on their behalf. It might:

- Automatically publish assets when new files arrive in a storage bucket
- Monitor incoming contract negotiations and auto-approve based on business rules
- Pull data from negotiated contracts and feed it into the customer's systems
- Serve data from the customer's backend systems as a data plane, integrated via DPS

The application uses the **Management API** to manage assets, policies, contracts, and transfers. If it also serves or consumes data directly, it integrates with the Control Plane via **Data Plane Signaling** — registering as a data plane and handling transfer signals through the SDK.

This is where the Data Plane SDK pays off. The same DPS integration pattern used for the baseline data plane applies here — the SDK handles signaling and token validation, the application handles the business logic.

A real-world example is the **CCM (Company Certificate Management)** app in Catena-X. CCM is a use case application that manages company certificates and compliance documents — it uses the Management API to publish and negotiate, and integrates via DPS to serve and consume data. A CSP would deploy CCM on behalf of customers participating in that use case. The same pattern applies to any domain-specific application built on top of the dataspace infrastructure.

### What Eclipse gives you

- The Management API surface is unchanged — the application calls the same APIs as the portal or a human with curl.
- The Data Plane SDKs handle DPS integration for the application just as they do for a standalone data plane.
- CFM provisions the participant context the application operates under.

### What you build

The application itself — its business logic, its integration with the customer's backend systems, and its deployment lifecycle. The dataspace integration layer (APIs + DPS) is provided by Eclipse.

---

## Level 3: Multiple Data Planes and Credential Issuance

You now serve multiple dataspaces. Some participants need data planes beyond HTTP — S3, streaming, industrial protocols. Some dataspaces require their own credential issuers.

```
┌──────────────────────────────────────────────────┐
│  Your Platform (CSP)                             │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  Portal + Monitoring                       │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  CFM + EDC-V (multi-tenant)                │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌──────────┬──────────┬──────────┬───────────┐  │
│  │ HTTP DP  │  S3 DP   │ Kafka DP │ OPC-UA DP │  │
│  │ (SDK)    │  (SDK)   │  (SDK)   │(community)│  │
│  └──────────┴──────────┴──────────┴───────────┘  │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  Customer Applications (CSP deploys)       │  │
│  │  Per-customer business logic via API + DPS │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  Issuer Service (Eclipse EDC)              │  │
│  │  Issues VCs for dataspace onboarding       │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  Infrastructure (CSP)                      │  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

### Multiple Data Planes

When participants need to share data over protocols other than HTTP, you deploy additional data planes. Some you build yourself using the Eclipse Data Plane SDKs — adding the wire protocol adapter for the specific transport. Others come from the community — for example, an OPC-UA data plane maintained by the industrial automation community.

All data planes register with the Control Plane via Data Plane Signaling. The Control Plane selects the right one per transfer based on registered capabilities. No changes to the core platform needed.

### Credential Issuance

If the Dataspace Authority wants you (the CSP) to operate the credential issuance infrastructure, the **Issuer Service** is an Eclipse EDC component. It defines credential schemas, issues VCs to participants, and maintains revocation lists. You deploy and configure it — no need to build your own issuance stack.

The trust framework behind credential issuance varies by dataspace. Some dataspaces define their own; others adopt established frameworks like **iSHARE**, which provides a ready-made trust scheme for authorization, authentication, and identification of organizations. When a dataspace uses iSHARE, credential issuance and verification follow iSHARE's trust model — the CSP integrates with it rather than designing a trust framework from scratch.

### Multi-Dataspace Configuration

When serving multiple dataspaces, the governance decisions become per-dataspace configuration:

| Governance item | What varies per dataspace |
|-----------------|--------------------------|
| Policy definitions | Different ODRL rules per dataspace |
| Credential schemas | Different VC types required |
| Trust lists | Different issuers recognized |
| Onboarding criteria | Different compliance requirements |

CFM supports **dataspace profiles** — per-dataspace settings attached to a participant. This is configuration, not code. Supporting a new dataspace means defining a new profile, not building new components.

---

## Optional: Federated Catalog

At any level, participants can query each other's catalogs directly over DSP. This works well when participants know each other's identities.

As the dataspace grows, you may want to add the **Federated Catalog** — an Eclipse EDC component that crawls participant catalogs into a local queryable cache. This is useful when participants want to search across dozens of providers without knowing each one's endpoint up front.

The Federated Catalog is not required. It is a convenience for large dataspaces. You deploy it, configure which participants to crawl and how often, and it builds the index. No custom code needed.

---

## Summary: What You Build at Each Level

| Level | Eclipse provides | CSP builds/operates |
|-------|-----------------|---------------------|
| **0 — Baseline** | Control Plane, Identity Hub, CFM, EDC-V, Data Plane SDKs | Infrastructure (K8s, PostgreSQL, Vault, NATS, IDP), minimal data plane |
| **1 — Portal** | (same as Level 0) | + User Portal, Monitoring & Observability |
| **2 — Customer apps** | (same — Management API + DPS) | + Customer applications (business logic, backend integration) |
| **3 — Full build-out** | + Issuer Service | + Additional data planes (CSP-built or community), multi-dataspace configuration |

**Related:** [Platform Setup](./platform-setup/) | [System Integration](./system-integration/) | [Components](/docs/components/)
