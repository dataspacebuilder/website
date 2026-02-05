---
slug: cloud-provider-path-dataspace-service
title: The Cloud Provider's Path to Dataspace-as-a-Service
authors: [mhartmann]
tags: [implementation]
description: A practical guide for cloud providers building hosted dataspace services — from architecture to business model.
image: /img/guides/cloud-provider-path.jpeg
---

You've decided dataspaces are worth pursuing. Now what? This guide walks through the architecture, components, and decisions involved in building a hosted dataspace service on your cloud infrastructure.

<!-- truncate -->

## The Core Question

Your customers — manufacturers, logistics providers, healthcare organizations — need to participate in industry dataspaces. They don't want to:

- Deploy and operate connector infrastructure
- Manage cryptographic keys and credentials
- Understand the intricacies of the Dataspace Protocol
- Staff a team for something that's not their core business

They want to share data with trusted partners under clear terms. That's it.

Your job is to make that simple while running the complex parts efficiently.

## The Hosted Dataspace Services Architecture

The architecture developed through the [European Cloud Accelerator](https://metaform.github.io/dcsa/documentation/overview/) addresses three main challenges:

### 1. Tenant Management
How do you provision and manage hundreds or thousands of dataspace participants on shared infrastructure?

### 2. Onboarding
How do customers sign up, get legally onboarded into a dataspace, and receive their credentials?

### 3. Operational Experience
How do customers (who don't understand ODRL, policies, or connectors) actually share data?

## The Component Stack

Here's what a hosted dataspace service deployment looks like:

```
┌─────────────────────────────────────────────────────────────────┐
│                     Your Cloud Infrastructure                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              Connector Fabric Manager (CFM)              │    │
│  │     Tenant lifecycle, provisioning, orchestration        │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                   │
│       ┌──────────────────────┼──────────────────────┐           │
│       │                      │                      │           │
│  ┌────┴────┐           ┌─────┴─────┐          ┌─────┴─────┐    │
│  │  EDC-V  │           │ Identity  │          │  Issuer   │    │
│  │ Virtual │           │    Hub    │          │  Service  │    │
│  │Connector│           │ (Wallets) │          │           │    │
│  └─────────┘           └───────────┘          └───────────┘    │
│       │                      │                      │           │
│  ┌────┴────────────────────────────────────────────┴────┐      │
│  │                    Data Plane(s)                       │      │
│  │         HTTP, S3, Industrial protocols, etc.           │      │
│  └────────────────────────────────────────────────────────┘      │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐     │
│  │ Supporting Infrastructure: PostgreSQL, Vault, NATS,    │     │
│  │ Keycloak, DNS, Load Balancers                          │     │
│  └────────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

### EDC Virtual Connector (EDC-V)

The [Virtual Connector](https://github.com/eclipse-edc/Virtual-Connector) is the key to multi-tenant efficiency. Instead of deploying a separate connector per tenant (expensive), EDC-V virtualizes the control plane:

- **Shared runtime, isolated contexts** — Thousands of tenants share infrastructure
- **Per-tenant data planes** — Actual data transfers remain isolated
- **Centralized management** — Single deployment to operate

This is what makes the economics work. Without EDC-V, you'd need dedicated infrastructure per customer.

### Connector Fabric Manager (CFM)

The [Connector Fabric Manager](https://github.com/Metaform/connector-fabric-manager) handles tenant lifecycle:

- **Automated provisioning** — When a customer signs up, CFM creates their tenant context, provisions DNS, sets up the Identity Hub entry, and requests credentials
- **Stateful orchestration** — Uses NATS for reliable async messaging
- **Agent architecture** — Extensible agents execute provisioning actions

CFM is what enables self-service onboarding rather than manual setup per customer.

### Identity Hub

The [Identity Hub](https://github.com/eclipse-edc/IdentityHub) manages each tenant's decentralized identity:

- **DID management** — Each tenant gets a Decentralized Identifier
- **Credential storage** — Verifiable credentials proving membership, certifications, etc.
- **Presentation service** — Responds to verification requests from other dataspace participants

### Issuer Service

Credentials must come from somewhere. The Issuer Service:

- **Issues credentials** to participants after legal onboarding
- **Integrates with dataspace operators** — The operating company (e.g., Catena-X) authorizes issuance
- **Supports multiple credential types** — Membership, ISO certifications, role-based credentials

## The Onboarding Flow

When a customer signs up for your hosted dataspace service:

```
Customer              Your Platform             Dataspace Operator
    │                      │                          │
    │──── Sign up ────────>│                          │
    │                      │                          │
    │                      │──── Verify business ────>│
    │                      │<─── Approval ────────────│
    │                      │                          │
    │                      │ [CFM creates tenant]     │
    │                      │ - Tenant context in EDC-V│
    │                      │ - Identity Hub entry     │
    │                      │ - DNS configuration      │
    │                      │ - Issuer registration    │
    │                      │                          │
    │                      │──── Request credential ──│
    │                      │<─── Issue credential ────│
    │                      │                          │
    │<─── Ready ───────────│                          │
```

The key insight: **your platform handles technical onboarding; the dataspace operator handles legal onboarding**. You're not replacing the governance structure — you're making it operationally simple.

## Customer Experience: Data Sharing

Once onboarded, customers need to share data. They don't understand:
- ODRL (the policy language)
- Contract definitions
- Asset registration

Your UI abstracts this. A manufacturer sharing production data sees:

1. **"Upload data"** — They provide a file, API endpoint, or database connection
2. **"Set sharing rules"** — Simple options like "Only Catena-X members" or "Only verified suppliers"
3. **"Publish"** — Behind the scenes, you create the asset, policy, and contract definition

For consuming data:
1. **"Browse available data"** — They see a catalog of offerings
2. **"Request access"** — They click; you handle contract negotiation
3. **"Download"** — They get their data

The complexity is yours to manage. The simplicity is theirs to enjoy.

## Integration with Your Existing Services

Dataspaces don't exist in isolation. Customers will want:

- **Storage integration** — Data assets backed by your object storage
- **Analytics** — Run queries on shared data
- **Monitoring** — See transfer status, audit logs, compliance reports
- **Billing** — Metered usage tied to your billing system

This is where your platform expertise compounds. You're not just hosting connectors — you're providing an integrated data sharing platform.

## What You Need to Build vs. Buy

**Use open source (provided by Eclipse):**
- EDC Connector / EDC-V
- Identity Hub
- Connector Fabric Manager
- Protocol implementations (DSP, DCP)

**You build (or partner for):**
- Customer onboarding UI
- Data management UI (the "Manufacturer UI")
- CSP operations dashboard
- Billing integration
- Your-cloud-specific infrastructure adapters

The [JAD demonstrator](https://github.com/Metaform/jad) provides a reference deployment you can study. It deploys a complete dataspace-as-a-service in Kubernetes, demonstrating all the integration points.

## Deployment Considerations

### Infrastructure Requirements

Per the [JAD documentation](https://github.com/Metaform/jad):

- **Kubernetes** — The natural deployment target
- **PostgreSQL** — State storage for components
- **Vault** — Secrets management (Hashicorp Vault or equivalent)
- **NATS** — Async messaging for CFM
- **Keycloak** — API authentication (or your existing IdP)
- **DNS management** — Each tenant needs resolvable endpoints

### Scaling

- **Control plane (EDC-V)** — Scales horizontally; add replicas as tenant count grows
- **Data planes** — Scale based on transfer volume; can be tenant-specific or shared
- **CFM** — Lightweight; single instance handles significant tenant volume

### Security

- **Tenant isolation** — Critical. Ensure tenant contexts cannot access each other's data
- **Credential protection** — Private keys in vault, never exposed
- **Network segmentation** — Separate management APIs from protocol APIs
- **Audit logging** — Every operation logged for compliance

## Business Model Options

### Subscription Tiers

| Tier | Includes | Price Point |
|------|----------|-------------|
| **Starter** | 1 dataspace membership, basic transfers | Entry-level |
| **Business** | Multiple dataspaces, higher volume, analytics | Mid-market |
| **Enterprise** | Dedicated data plane, custom policies, SLA | Premium |

### Usage-Based

- Per contract negotiation
- Per GB transferred
- Per active credential

### Hybrid

Base subscription + usage overage — predictable costs with growth upside.

## Getting Started

1. **Deploy JAD locally** — Understand the architecture hands-on
2. **Identify your first dataspace** — Which industry ecosystem makes sense for your customer base?
3. **Engage the operator** — Connect with Catena-X, Manufacturing-X, or relevant consortium
4. **Build your onboarding UI** — Start with manual onboarding, automate incrementally
5. **Launch a pilot** — 5-10 customers to learn before scaling

## Resources

- [JAD Demonstrator](https://github.com/Metaform/jad) — Complete reference deployment
- [EDC-V Administration APIs](https://github.com/eclipse-edc/Virtual-Connector/blob/main/docs/administration_api.md) — API documentation
- [CFM Architecture](https://github.com/Metaform/connector-fabric-manager/blob/main/docs/developer/architecture/system.architecture.md) — Provisioning system design
- [Component Status Dashboard](https://metaform.github.io/dcsa/documentation/overview/_status/) — Current development status

---

**Coming next:** [What Are Data Spaces? A Plain-Language Guide](/guides/what-are-dataspaces-plain-language) — Share this with colleagues who need the fundamentals.
