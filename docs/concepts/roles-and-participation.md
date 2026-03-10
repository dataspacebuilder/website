# Roles and Participation

## Layers of a Dataspace

Dataspaces operate across three distinct layers, each serving different functions:

### Technical Layer
The architecture and protocols (DSP, DCP) that facilitate trusted and interoperable data sharing. Software agents representing participants form a decentralized mesh of autonomous nodes. At this layer, **all participants are equal**.

### Economic Layer
The services, interactions, and workflows that enable value generation. Business roles, marketplaces, and commercial agreements operate at this layer.

### Legislative Layer
Rights, obligations, and regulatory compliance across participants. Legal contracts, data protection requirements, and jurisdictional rules apply here.

These layers interact but must be conceptually separated. A role at the business level does not automatically correspond to a special role at the technical level. This clarity prevents architectural confusion and ensures that technical interoperability is not compromised by business complexity.

## The One Technical Role: Participant

At the technical level, there is exactly **one role**: the **participant**.

A participant acts as a **data provider**, a **data consumer**, or both within the Dataspace Protocol. Every interaction — whether it's a marketplace listing data, an auditor verifying compliance, or a manufacturer sharing telemetry — is technically a participant-to-participant interaction using the same protocols.

This simplicity is a feature, not a limitation. It means:
- No special protocol extensions are needed for new business scenarios
- No additional architectural components are required beyond the core stack
- Any business role can be composed from the participant primitives

## Business Roles

At the economic and legislative layers, participants take on roles relevant to their business context. These roles describe functions, not technical capabilities:

### Data Provider
The organization that makes data technically available for sharing. Publishes catalog items with associated policies. The closely related term "data holder" describes the legal entity with the right to grant access to or share the data.

### Data Consumer
The recipient of a data sharing activity. Discovers data offerings, negotiates contracts, and receives data. The closely related term "data user" describes the entity with lawful access to use the data.

### Service Provider
Optional participants that offer capabilities to facilitate data sharing or provide business services:

- **Intermediaries** — act on behalf of other participants (negotiating contracts, managing infrastructure, making decisions). May be regulated (e.g., under the EU Data Governance Act).
- **Value-added service providers** — offer services like data discovery, observability, marketplaces, or processing while conforming to dataspace governance.

### Common Value-Added Services

| Service | Function |
|---|---|
| Data Discovery (Catalogs) | Aggregated search across multiple participants' offerings |
| Marketplaces | Commercial platforms for trading data |
| Observability (Auditors) | Verification and reconciliation of data sharing activities |
| Processing Services | Computation on data without taking ownership |
| Data Escrow / Trustee | Secure environments for multi-party data analysis |

All of these are implemented as participants at the technical level. They join the dataspace, hold credentials, and interact through the same protocols.

## Dataspace Governance Authority (DSGA)

The DSGA is a special **functional role** — not a participant, but the "legislative" function of the dataspace. It:

- Defines the rules, policies, and processes of the dataspace
- Specifies which Dataspace Trust Frameworks (DTFs) are used
- Defines onboarding requirements and membership policies
- Ensures interoperability through minimal shared semantics

The DSGA can be implemented in multiple ways: by the participants themselves, by service providers, or by a dedicated organization. The implementation model affects the degree of centralization and the autonomy of participants.

**Important**: An operator of a value-added service is not a DSGA. They can operate a service that supports the governance model, but the DSGA is the governance model itself.

## Participation and Representation

### Organizations, Not Individuals
Organizations are the technical participants. They are represented by software agents (Connectors) capable of executing standardized protocols. Natural persons interact with dataspaces indirectly through applications operated by organizations.

### No Identity Providers
In a decentralized dataspace, there are no central identity providers. Participants provide proof of their identity through claims (verifiable credentials) rather than through a common identity service. Access to resources is managed through tokens issued directly by the participants sharing those resources.

### Governance Commitment and Technical Integration
Participation requires both:
1. **Governance commitment** — agreeing to the rules, policies, and processes of the dataspace
2. **Technical integration** — operating a Connector that implements the required protocols

## External Actors

Not everything that interacts with a dataspace is a participant:

- **Static resource providers** (ontology servers, schema registries) support the dataspace but are not participants unless they implement the standardized protocols
- **Trust anchors and regulators** may influence data transactions but participate only if they operate through governed protocol interfaces
- **Credential issuers** often operate as external services referenced by DTFs. When operated as part of a dataspace, credential issuance is a DSGA function — see [Onboarding and Registration](./onboarding-and-registration.md)

The line is clear: participation requires governance commitment and technical integration through standardized protocols.

## Joining a Dataspace

The process of becoming a participant typically includes:

1. **Discovery** — find the dataspace and its governance documentation
2. **Evaluation** — review policies, rules, and requirements
3. **Preparation** — collect the required credentials and set up technical infrastructure
4. **Application** — apply for membership through the governance-defined process
5. **Verification** — the DSGA (or its delegates) verifies compliance with membership policies
6. **Credential issuance** — membership credentials are issued to the new participant
7. **Activation** — the participant configures their system and begins interacting

The complexity of this process varies enormously: from automated, minutes-long flows for lightweight dataspaces to multi-month processes involving legal contracts and compliance audits for regulated environments.

For a detailed treatment of onboarding — including the Registration Service, Issuer Service, and the separation of legal and technical onboarding — see [Onboarding and Registration](./onboarding-and-registration.md).

---

**Go deeper**: [IDSA Rulebook — Layers](../reference/community.md) | [IDSA Rulebook — Roles](../reference/community.md) | [IDSA Rulebook — DSGA](../reference/community.md)

**Related concepts**: [What Is a Dataspace](./what-is-a-dataspace.md) | [Trust and Governance](./trust-and-governance.md) | [Onboarding and Registration](./onboarding-and-registration.md) | [Data Sharing Lifecycle](./data-sharing-lifecycle.md)
