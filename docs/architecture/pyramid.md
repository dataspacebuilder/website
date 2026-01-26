---
sidebar_position: 1
title: The Trusted Data Sharing Pyramid
description: Understanding the five layers of a dataspace architecture
---

# The Trusted Data Sharing Pyramid

The trusted data sharing architecture is built on five distinct layers, each serving a specific purpose. Together, they enable sovereign, policy-controlled data exchange between organizations.

![Trusted Data Sharing Stack Architecture](/img/stack.jpeg)

*A layered architecture with a clear and interoperable shape.*

---

## The Five Layers

### Trust Frameworks (Purple)

At the apex of the pyramid, **Trust Frameworks** define the rules of the game:

- **Issuers** — Who can issue credentials that are accepted in this dataspace
- **Governance** — Rules and policies that all participants must follow
- **Credential Schemas** — Standard formats for verifiable credentials
- **Membership criteria** — What it takes to join and participate

Trust frameworks are typically defined by industry consortia, regulatory bodies, or dataspace operators.

---

### Trust Plane (Green)

The **Trust Plane** establishes identity and builds confidence between parties:

- **Identity Hubs** — Manage Decentralized Identifiers (DIDs) and store credentials
- **Verifiable Credentials** — Machine-readable proofs of attributes (roles, certifications, memberships)
- **Trust Verification** — Cryptographic validation that credentials are authentic and current
- **Provider and Consumer Identity** — Each party proves who they are before any data flows

Without trust, there's no data sharing. This layer makes trust automated and scalable.

---

### Control Plane (Teal)

The **Control Plane** handles the business logic of data sharing:

- **Catalog Discovery** — Browse what data is available across the dataspace
- **Contract Negotiation** — Agree on terms before any data moves
- **Policy Enforcement** — Ensure access rules are respected
- **Contract Agreements** — Binding records of what was agreed

This is where the Dataspace Protocol (DSP) operates, providing standardized APIs for all these interactions.

---

### Data Plane (Orange)

The **Data Plane** is where data actually moves:

- **Data Transfer** — Secure movement from provider to consumer
- **Protocol Support** — HTTP, S3, industrial protocols, and more
- **Access Tokens** — Time-limited credentials for data access
- **Transfer Types** — Push, pull, streaming as needed

The data plane is deliberately separated from the control plane, allowing specialized transfer mechanisms for different use cases.

---

### Infrastructure (Navy)

The **Infrastructure** layer provides the foundation:

- **Deployment Options** — Cloud, on-premises, edge, or hybrid
- **Compute and Storage** — Where connectors and data planes run
- **Network Connectivity** — Secure communication between parties
- **Operational Tooling** — Monitoring, logging, and management

This layer is flexible — dataspaces work across any infrastructure that supports the upper layers.

---

## How the Layers Work Together

1. **Governance first** — Trust frameworks establish the rules
2. **Identity next** — Participants prove who they are via the trust plane
3. **Negotiate terms** — Control planes handle catalog and contracts
4. **Transfer data** — Data planes move information according to agreements
5. **Run anywhere** — Infrastructure supports it all

This separation of concerns means each layer can evolve independently while maintaining interoperability.

---

## Key Principles

- **Decentralization** — No central authority controls all data
- **Data Sovereignty** — Providers maintain control over their data
- **Policy Enforcement** — Rules are machine-enforced, not just documented
- **Interoperability** — Standard protocols ensure different implementations work together
- **Scalability** — Trust through automation, not manual processes

---

## Next Steps

- [Trust Framework & Credentials](/docs/architecture/trust-framework) — Deep dive into governance
- [Identity Hub](/docs/architecture/identity-hub) — How identity works
- [Control Plane](/docs/architecture/control-plane) — Contract negotiation explained
- [Data Plane](/docs/architecture/data-plane) — How data moves
- [Deployment Topologies](/docs/architecture/deployment-topologies) — Where to run it all
