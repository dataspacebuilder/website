# What Is a Dataspace

## Definition

The ISO/IEC 20151 standard defines a dataspace as:

> *"An environment enabling trusted data sharing between participating parties, based on an agreed governance framework, along with an agreed set of policies, semantic models, standardized protocols, processes, and facilitating services."*

This definition is precise and each term carries weight. Let's unpack it.

## Key Elements

### Environment, Not Platform

A dataspace is not a product, a database, or a central service. It is an *environment* — a combination of technical and non-technical elements that come together to enable trusted data sharing. The environment includes protocols, governance rules, identity mechanisms, and the software agents that implement them.

This distinction matters: no single vendor, operator, or platform "is" the dataspace. The dataspace emerges from the interaction of its participants following shared rules.

### Trusted Data Sharing

Trust between two organizations reduces business risk in the process of sharing data. Trust in a dataspace is not assumed — it is established at interaction time through verifiable evidence.

This can include:
- Knowing who the other party is (verified identity)
- Understanding how they manage data (certified attributes)
- Getting guarantees on how data was created or will be used (enforced policies)

Higher trust reduces risk. Reduced risk lowers the barrier to sharing. Lower barriers create more value.

**Establishing trust is the fundamental reason for dataspaces to exist.**

### Participating Parties

A dataspace consists of a community of participants that follow a common set of rules and have provided a minimum set of assurance about themselves. Typically, two participants operate directly, peer-to-peer, without intermediaries.

Organizations — not individuals — are technical participants. Each organization is represented by a software agent (commonly called a Connector) that acts on its behalf.

### Agreed Governance Framework

The governance framework is the core agreement between all parties. It defines the technical policies, business rules, and regulations that participants must adhere to. The **Dataspace Governance Authority (DSGA)** is the functional role responsible for maintaining and enforcing this framework.

The DSGA defines the rules. Enforcement happens at the participant level, at interaction time — not through a central authority.

### Standardized Protocols

Interoperability between participants is guaranteed by standardized protocols:

- **[DSP (Dataspace Protocol)](https://eclipse-dataspace-protocol-base.github.io/DataspaceProtocol/)** — for catalog discovery, contract negotiation, and transfer coordination
- **[DCP (Decentralized Claims Protocol)](https://eclipse-dataspace-dcp.github.io/decentralized-claims-protocol/)** — for exchanging and verifying identity and attribute claims

These protocols are what make dataspaces interoperable across vendors, cloud providers, and deployment models. Any conformant implementation can participate.

### Policies and Semantic Models

Policies express the rules governing data access, usage, and sharing. Semantic models ensure that everyone means the same thing when using a specific term. Together, they make governance machine-enforceable rather than purely contractual.

### Facilitating Services

Many dataspaces use external services to make participation easier: onboarding services, credential issuers, marketplaces, auditors. These are optional. They serve the participants — they don't control the dataspace.

## What a Dataspace Is Not

- **Not a data lake or data warehouse** — data is not stored centrally; it remains with the participants
- **Not a platform** — there is no single operator that controls access or mediates all interactions
- **Not an API gateway** — the protocols go beyond transport to include trust, governance, and contracts
- **Not a blockchain** — decentralization is achieved through protocols and credentials, not distributed ledgers
- **Not an identity provider** — participants manage their own identities through decentralized identifiers

## Autonomy and Agency

The most important property of a dataspace is the **autonomy and agency** of participants — commonly referred to as "digital sovereignty."

- **Autonomy** — the capability to decide when to share which data, with whom, and under what conditions
- **Agency** — the capability to technically perform the data sharing, without dependency on external services that could restrict or control it

Full autonomy requires that the participant controls all technical elements required for participation. Any mandatory central service — a central catalog, a required marketplace, a single identity provider — reduces autonomy.

For organizations that lack the resources for full autonomy, intermediaries and service providers can operate infrastructure on their behalf. This is a deliberate trade-off: digital sovereignty for ease of access. DSaaS (Dataspace-as-a-Service) exists on this spectrum.

## Communities

Dataspaces are built on communities of trusted participants. A community can be:

- **Jurisdictional** — all participants from the same country or region
- **Industry-based** — all participants in a specific sector (automotive, healthcare, energy)
- **Supply-chain-based** — one company and its suppliers
- **Purpose-driven** — organizations joining forces for a specific use case

Dataspaces can overlap and be organized hierarchically. A participant can belong to multiple dataspaces simultaneously, using the same technical infrastructure but different governance contexts.

## Technology

Every participant is represented by a software agent — a **Connector** — that implements the standardized protocols. The Connector provides API endpoints for data discovery, contract negotiation, data sharing orchestration, and identity management.

Based on DSP and DCP, any variety of Connectors can be built: standalone single-server deployments, Connectors-as-a-Service at a cloud provider, connectors embedded in enterprise software, or AI agents with dataspace capabilities. The concept is open to future innovation; interoperability is guaranteed through the protocol specifications.

---

**Go deeper**: [IDSA Rulebook — What Is a Data Space](../reference/community.md) | [ISO/IEC 20151](https://www.iso.org/standard/86589.html)

**Related concepts**: [Trust and Governance](./trust-and-governance.md) | [Protocols](./protocols.md) | [Roles and Participation](./roles-and-participation.md)
