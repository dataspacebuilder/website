---
sidebar_label: The CSP Baseline
sidebar_position: 3
title: "Chapter 2: The CSP Baseline"
---

# Chapter 2: The CSP Baseline

This is the standard starting point. CFM provisions participants. The Control Plane and Identity Hub run in virtual (multi-tenant) mode. A minimal data plane serves files over HTTP.

```
┌──────────────────────────────────────────────────┐
│  Your Platform (CSP)                             │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  Connector Fabric Manager (Eclipse CFM)    │  │
│  │  Tenant Mgr · Provision Mgr · Agents      │  │
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

## What Eclipse Gives You

- **CFM** automates participant onboarding. You call its REST API to provision a participant — it creates the context, sets up the DID, configures the Identity Hub, and requests initial credentials.
- **Control Plane** handles catalog publication, contract negotiation, and policy evaluation. The provider describes a file as an asset, sets a policy, and publishes a contract definition. The consumer discovers it, negotiates access, and gets authorized — all through the Dataspace Protocol.
- **Identity Hub** manages each participant's DID and credentials. During negotiation, the consumer's Identity Hub presents credentials, the provider's side verifies them. This happens automatically via DCP.
- **Data Plane SDKs** handle DPS integration. You write the data serving logic on top.

## What You Build

- **Infrastructure.** A Kubernetes cluster, a PostgreSQL database, a secret store (Vault or equivalent), NATS for CFM messaging, and an OAuth2 identity provider. Standard cloud provisioning — no dataspace-specific code.
- **A minimal data plane.** Using one of the Eclipse Data Plane SDKs, you write the code that reads files from storage and serves them over HTTP. The SDK handles signaling, state management, and token validation. For simple file transfers, this is a thin layer.
- **API access for participants.** At this level, participants interact via the Management API directly (or through tools like Bruno or curl). They query each other's catalogs directly over DSP.

## What the Dataspace Authority Defines

Even at the baseline, a few governance decisions are needed:

| Decision | Example |
|----------|---------|
| What credential is required? | A `MembershipCredential` issued by the consortium |
| What policy governs access? | "Holder must present a valid MembershipCredential" |
| How are DIDs resolved? | `did:web` — published at a well-known URL |

These are configuration, not code. The policy is an ODRL expression evaluated by the Control Plane's policy engine. The credential is a VC stored in the Identity Hub. The DID method is a deployment choice.

## What You Can Share at This Level

Anything that travels over HTTP:

- PDF files
- JSON documents
- CSV exports
- Any file served from an HTTP endpoint

---

**Next:** [Portal and Observability](./portal.md)
