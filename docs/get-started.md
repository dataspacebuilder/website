---
sidebar_label: Get Started
sidebar_position: 2
title: Get Started with JAD
---

# Get Started with JAD

JAD (Just Another Demonstrator) is the fastest way to understand how trusted data sharing works with Eclipse Dataspace Components. It deploys a complete dataspace environment where two organizations discover data, negotiate terms, establish trust, and share data — all through standardized protocols.

This document is the **one thing to read first**. It introduces every major component in the context of a running scenario, so you understand *why* each piece exists before diving into how it works.

---

## What JAD Demonstrates

JAD creates a minimal but complete dataspace with:

- **Two participant organizations** — a data provider and a data consumer
- **A governance context** — membership credentials, trust framework, policies
- **The full data sharing lifecycle** — identity verification, catalog discovery, contract negotiation, and data transfer

By walking through this scenario, you'll see how decentralized identity, policy-driven trust, and protocol-based negotiation come together in a real system.

---

## The Scenario

**Company A** is a manufacturer that produces machine telemetry data — temperature readings, vibration metrics, operational logs.

**Company B** is a service provider that offers predictive maintenance. They need access to Company A's telemetry to deliver their service.

Today, they'd solve this with a custom API integration, a signed PDF contract, and a shared credential. That works for one partner. It breaks at ten. It's unmanageable at a hundred.

With a dataspace, the interaction follows a standardized, repeatable pattern:

1. Both organizations prove their identity and attributes
2. Company A publishes what data is available and under which terms
3. Company B discovers the offering and requests access
4. The system evaluates Company B's credentials against Company A's policies
5. If the policies are satisfied, a contract agreement is established
6. Data flows between the organizations under the agreed terms

This is the scenario JAD implements. Let's walk through it — and along the way, understand which component handles each step.

---

## Components in Context

Rather than introducing components as an abstract architecture diagram, we'll meet each one as the scenario needs it.

### Step 1: Proving Identity — Identity Hub

Before any data can be discovered or shared, both organizations need to prove who they are. Not with platform accounts or shared passwords — with cryptographic, verifiable credentials that can be checked without a central authority.

**Identity Hub** (also called the Credential Service) is where this happens. Each participant's Identity Hub:

- Manages their **Decentralized Identifiers (DIDs)** — self-owned identifiers that don't depend on a central registry
- Stores **Verifiable Credentials (VCs)** — digitally signed attestations about the organization (e.g., "this organization is a member of dataspace X", "this organization holds ISO 27001 certification")
- Composes **proofs** — when another participant requests evidence of an attribute, the Identity Hub assembles and presents the relevant credentials

In JAD, when Company B requests access to Company A's data, both Identity Hubs participate in a **DCP (Decentralized Claims Protocol)** exchange. Company A's system requests proof of Company B's attributes; Company B's Identity Hub presents the relevant credentials; Company A's system verifies them cryptographically.

No central identity provider. No shared user database. Each organization controls their own identity.

> **Key concept**: Identity is the foundation of trust. Without verifiable identity, there's no basis for policy evaluation, contract negotiation, or authorized data access.

### Step 2: Discovering and Negotiating — Connector (Control Plane)

Once identity is established, the next question is: what data is available, and under what terms?

The **Connector** (specifically its Control Plane) handles discovery and negotiation. It is the core component that implements the **DSP (Dataspace Protocol)**:

- **Catalog publication** — Company A's Connector publishes a catalog of available data offerings. Each offering includes metadata about the data, access policies (who can see it), and contract policies (under what terms it can be accessed).
- **Catalog discovery** — Company B's Connector queries Company A's catalog. Access policies are evaluated: Company B only sees offerings it's authorized to discover, based on its credentials.
- **Contract negotiation** — Company B selects an offering and initiates negotiation. The Connector evaluates Company B's credentials against Company A's contract policies. If all policies are satisfied, a **contract agreement** is established.
- **Transfer coordination** — Once a contract agreement exists, the Control Plane coordinates the data transfer by signaling the Data Plane.

The Connector is where **trust decisions are made**. It evaluates policies against credentials, determines whether access should be granted, and produces the authorization that unlocks data flow.

In JAD, you'll see this as a sequence: Company B browses Company A's catalog through the UI, selects a data offering, and requests a contract. Behind the scenes, the Connectors execute the DSP protocol — exchanging messages, evaluating policies, and recording the agreement.

> **Key concept**: The Control Plane decides. It never touches the data itself — it produces authorizations that the Data Plane executes.

### Step 3: Sharing Data — Data Planes

After the contract agreement is established, data needs to actually move between organizations. This is the Data Plane's job.

**Data Planes** execute the authorized data transfer:

- They receive a **start signal** from the Control Plane via the **DPS (Data Plane Signaling)** protocol
- They execute the transfer using the appropriate wire protocol (HTTP, S3, MQTT, or others depending on the data type)
- They enforce runtime access constraints derived from the contract agreement
- They support **pull** (consumer fetches), **push** (provider sends), and **streaming** patterns

The critical architectural insight is the **separation between decision and execution**: the Control Plane decides whether data can be shared; the Data Plane executes the transfer. This separation allows Data Planes to be deployed wherever data lives — in the cloud, at the edge, in a factory — without affecting the trust model.

In JAD, after the contract is negotiated, the Data Plane makes the data available. Company B retrieves the telemetry data through the authorized endpoint. The transfer is logged, the policies are enforced, and both organizations have an auditable record of what was shared.

> **Key concept**: Data Planes are the execution layer. They can be swapped, scaled, and deployed independently. The protocol boundary (DPS) is what makes this possible.

### Step 4: The User Experience — Redline UI

All of the above — identity verification, catalog browsing, contract negotiation, data transfer — is complex protocol machinery. **Redline** makes it accessible.

Redline is a **Backend-for-Frontend (BFF)** service that provides the portal experience for both operators and participants:

- **For participants**: Browse catalogs, manage credentials, negotiate contracts, monitor data transfers — through a web interface instead of raw API calls
- **For operators**: Manage tenant lifecycle, monitor provisioned resources, oversee credential issuance

Redline integrates with Keycloak for authentication and translates user actions into the appropriate API calls to the Connector, Identity Hub, and management services.

In JAD, Redline is the interface you interact with. When you browse Company A's catalog as Company B, you're using Redline. When you click "request access," Redline translates that into a DSP contract negotiation behind the scenes.

> **Key concept**: Redline is the product surface. It hides protocol complexity from users while preserving the full power of the underlying dataspace infrastructure.

### Step 5: Managing at Scale — CFM

JAD demonstrates a scenario with two participants. In production, a cloud provider might host hundreds or thousands. Managing each one as a separate deployment would be operationally unsustainable.

The **Connector Fabric Manager (CFM)** is the management plane that makes multi-tenant operation possible:

- It **provisions participant contexts** — creating the runtime configuration for each organization without deploying separate infrastructure
- It **automates lifecycle management** — onboarding, configuration, credential delivery, and decommissioning
- It **orchestrates provisioning workflows** — coordinating across Kubernetes, Vault, DNS, and other infrastructure

The critical insight about CFM: **it is not in the trust-decision path**. CFM can be completely unavailable — undergoing maintenance, experiencing an outage — and live data sharing continues uninterrupted. Trust decisions are made by Connectors between participants, not by the management plane.

In JAD, CFM is what set up the participant environments you're using. You interact with the results of its provisioning, not with CFM directly.

> **Key concept**: CFM centralizes operations (provisioning, lifecycle, scaling) while trust remains decentralized (peer-to-peer, per interaction). This separation is what makes managed dataspaces viable.

---

## Running JAD

### Prerequisites

- Docker and Docker Compose
- Git
- A machine with at least 8 GB RAM available

### Deploy

```bash
git clone https://github.com/Metaform/jad.git
cd jad
docker compose up -d
```

Consult the [JAD README](https://github.com/Metaform/jad/blob/main/README.md) for the latest instructions, configuration options, and troubleshooting.

### Walk-Through

Once JAD is running, follow these steps to experience the full data sharing lifecycle:

1. **Open the participant portal** — Navigate to the Redline UI for Company A and Company B (URLs are provided in the JAD README)

2. **Explore Company A's catalog** — As Company A, observe the published data offerings, their metadata, and the access and contract policies attached to each

3. **Request access as Company B** — Switch to Company B's portal. Browse Company A's catalog (note: you only see what Company B's credentials authorize). Select a data offering and initiate a contract request

4. **Observe the negotiation** — Watch the contract negotiation proceed. Company B's credentials are verified against Company A's policies. If the policies are satisfied, a contract agreement is established

5. **Access the data** — With the agreement in place, initiate a data transfer. The Data Plane executes the transfer, and Company B receives the data

6. **Review the audit trail** — Both participants have a record of the negotiation and transfer

### What You Just Did

That walk-through exercised the complete trusted data sharing lifecycle:

- **When Company B's credentials were checked**, the Identity Hubs exchanged verifiable presentations over **DCP**. No central identity provider was involved — Company A verified Company B's claims cryptographically.

- **When Company B browsed the catalog**, the Connectors used **DSP** to exchange catalog information. Access policies filtered what Company B could see based on their verified attributes.

- **When the contract was negotiated**, the Connectors used **DSP** to evaluate policies against credentials and establish a machine-enforceable agreement. No PDF. No email. No manual legal review.

- **When data was transferred**, the Control Plane signaled the Data Plane via **DPS**, and the Data Plane executed the transfer using the appropriate wire protocol. The decision and the execution were separated.

- **When you used the portal**, Redline translated your clicks into the protocol interactions described above. The complexity was there — but it was invisible.

---

## Where to Go Next

Depending on your role and interest, here's where to continue:

| If you want to... | Go to... |
|---|---|
| Understand what dataspaces are conceptually | [Concepts: What Is a Dataspace](./concepts/what-is-a-dataspace.md) |
| Understand how trust and governance work | [Concepts: Trust and Governance](./concepts/trust-and-governance.md) |
| Learn about a specific component in depth | [Components: Connector](./components/connector.md) |
| Evaluate dataspaces as a strategic opportunity | [Guide: For Decision Makers](./guides/decision-makers.md) |
| Design a dataspace deployment architecture | [Guide: For Architects](./guides/architects.md) |
| Operate a multi-tenant dataspace environment | [Guide: For Operators](./guides/operators.md) |
| Build applications on top of EDC | [Guide: For Developers](./guides/developers.md) |
| Look up a specific protocol or API | [Reference: Protocols](./reference/protocols.md) |
| Look up terminology | [Reference: Glossary](./reference/glossary.md) |
