---
sidebar_label: The Component Map
sidebar_position: 2
title: "Chapter 1: The Component Map"
---

# Chapter 1: The Component Map

A functioning dataspace needs two things: **running software components** and **governance decisions** made by the Dataspace Authority. These are fundamentally different. Components are systems you deploy and operate. Governance decisions are rules and schemas you configure into those systems.

## Components You Deploy

| Component | Source | What it does |
|-----------|--------|-------------|
| **Control Plane** | Eclipse (EDC) | Contract negotiation, catalog, policy engine, transfer coordination |
| **Identity Hub** | Eclipse (EDC) | DID management, credential storage, verifiable presentations |
| **Connector Fabric Manager** | Eclipse (CFM) | Provisions and manages participant connectors at scale |
| **Data Plane** | CSP writes (minimal), community, or dataspace initiative | Anything that integrates via DPS — a standalone file server, a use case app, or a protocol adapter. Uses Eclipse Data Plane SDKs. |
| **Issuer Service** | Eclipse (EDC) | Issues verifiable credentials to participants during onboarding, defines credential schemas, maintains revocation lists. See [Issuer Service](../../components/issuer-service.md). |
| **Infrastructure** | CSP builds/operates | Kubernetes, PostgreSQL, secret store, NATS, identity provider |
| **User Portal** | CSP builds | Web interface for customers to manage assets and contracts |
| **Monitoring & Observability** | CSP builds | Health checks, metrics, logging, alerting for the connector fleet |

## About Data Planes

Anything that integrates via **Data Plane Signaling (DPS)** is a data plane. This can be a standalone service that serves files over HTTP, or it can be a full customer application that handles business logic and data transfer in one process.

The Eclipse Data Plane SDKs (available in Go, Java, Rust, and .NET) handle the DPS protocol — signaling, state management, and token validation. You write the data serving logic on top. For simple HTTP file transfers, this is minimal code. For a domain-specific application like the Catena-X CCM (Company Certificate Management) app, the same SDK integration makes the application itself the data plane — no separate data plane needed alongside it.

Not every data plane needs to be built by the CSP. The data plane ecosystem is growing: industry communities (e.g., OPC-UA) are building protocol-specific data planes, and dataspace initiatives produce use case applications that are data planes for their domain. As a CSP, you can deploy community or initiative-provided data planes alongside your own.

## Governance Decisions (Configured, Not Built)

These are not running systems. They are rules, schemas, and trust anchors that the **Dataspace Authority** defines. A CSP supporting multiple dataspaces makes them configurable per dataspace:

- **Access and usage policies (ODRL)** — what rules govern data sharing (e.g., "holder must present a valid MembershipCredential")
- **Credential schemas** — what verifiable credentials participants need (e.g., a MembershipCredential, a DataProviderCredential)
- **Credential issuers + trust list** — which organizations can issue which credentials; the trust anchors for participant onboarding
- **Governance rules** — who can join the dataspace and under what conditions

These decisions get expressed as ODRL policies in the Control Plane, credential types in the Identity Hub, and trust anchors in the issuer configuration. The CSP deploys the systems; the Dataspace Authority fills in the rules.

## The Key Insight

**For file and JSON sharing over HTTP, the only custom code a CSP writes is a minimal data plane.** Everything else in the data path — discovery, negotiation, trust, policy, transfer coordination — comes from Eclipse. The rest of what CSPs build is infrastructure (standard cloud), a user interface, and operational tooling.

---

**Next:** [The CSP Baseline](./baseline.md)
