# Glossary

## Core Concepts

| Term | Definition |
|---|---|
| **Dataspace** | An environment enabling trusted data sharing between participating parties, based on an agreed governance framework, policies, semantic models, standardized protocols, processes, and facilitating services (ISO/IEC 20151). |
| **Participant** | An organization represented by a software agent (Connector) that actively engages in data sharing within a dataspace. The only technical role in a dataspace. |
| **Connector** | The software agent that represents a participant in a dataspace. Implements DSP and provides APIs for catalog, negotiation, and transfer management. |
| **Trust** | A situational, time-bound, purpose-specific assessment of whether another participant can be relied upon for a specific interaction. Established at runtime through claim verification and policy evaluation. |

## Identity and Trust

| Term | Definition |
|---|---|
| **DID (Decentralized Identifier)** | A self-owned, cryptographically verifiable identifier that doesn't depend on a central registry. Defined by W3C DID Core. |
| **Verifiable Credential (VC)** | A digitally signed attestation about a credential holder's attributes, issued by a trusted authority. Defined by W3C VC Data Model. |
| **Claim** | A verifiable assertion about a participant's attributes (identity, capabilities, certifications), expressed as a credential. |
| **Trust Anchor** | An entity whose credentials are accepted as evidence of attributes. Defined within DTFs. Analogous to a certificate authority. |
| **Verifiable Presentation (VP)** | A cryptographically signed package of one or more VCs, composed by the Identity Hub for presentation to a verifier. |

## Governance

| Term | Definition |
|---|---|
| **DSGA (Dataspace Governance Authority)** | A functional role responsible for defining and maintaining the governance framework of a dataspace. Defines rules, DTFs, and onboarding requirements. Not a runtime enforcement layer. |
| **DTF (Dataspace Trust Framework)** | A set of policies, reconciliation mechanisms, and business processes that enable participants to establish trust. Defines accepted trust anchors and credential semantics. |
| **Governance Framework** | The complete set of technical policies, business rules, and regulations that participants must adhere to. Maintained by the DSGA. |
| **Membership Credential** | A VC attesting that an organization is a member of a specific dataspace. Issued after the onboarding process. |
| **Issuer Service** | An Eclipse EDC component that issues verifiable credentials to participants. Defines credential schemas, manages holders, and maintains revocation/status lists. Operated by DSGAs, CSPs, or external DTF credential issuers. |
| **Registration Service** | A DSGA function that implements the membership application workflow — validating compliance with membership policies and triggering credential issuance upon approval. May be operated by the DSGA, a CSP, or a dedicated onboarding service provider. |
| **Legal Onboarding** | The business/legislative phase of joining a dataspace: providing company data, documents, consents, and having membership policies verified by the DSGA or its delegate. Produces an organizational identifier. |
| **Technical Onboarding** | The technical phase of joining a dataspace: provisioning infrastructure (connector, identity hub, DID), requesting credentials from the Issuer Service, and activating the participant context. |

## Protocols

| Term | Definition |
|---|---|
| **DSP (Dataspace Protocol)** | The protocol for catalog discovery, contract negotiation, and transfer coordination between Connectors. |
| **DCP (Decentralized Claims Protocol)** | The protocol for exchanging and verifying identity material and verifiable credentials between participants. |
| **DPS (Data Plane Signaling)** | The protocol between Control Plane and Data Plane for managing transfer lifecycle (START, SUSPEND, TERMINATE). |
| **TCK (Technology Compatibility Kit)** | Automated conformance test suites that verify implementation compliance with DSP and DCP. |

## Data Sharing

| Term | Definition |
|---|---|
| **Asset** | A data resource that can be shared, described by metadata in the catalog. |
| **Contract Offer** | An asset paired with access and contract policies — what a consumer sees in the catalog. |
| **Contract Negotiation** | The process where two Connectors evaluate policies against credentials to reach an agreement. |
| **Contract Agreement** | The result of a successful negotiation — the machine-enforceable authorization to share data. |
| **Transfer Process** | The lifecycle of a data transfer, from initiation through execution to completion. |
| **EDR (Endpoint Data Reference)** | Endpoint coordinates plus an access token, returned by the Data Plane for pull transfers. |

## Policies

| Term | Definition |
|---|---|
| **Access Policy** | Controls which participants can discover a catalog item based on their attributes. |
| **Contract Policy** | Defines what attributes are required to establish a data sharing agreement. |
| **Usage Policy** | Controls how data can be used after sharing (enforcement varies by data sensitivity). |
| **Membership Policy** | Defines the attributes required to join a dataspace. |

## Architecture

| Term | Definition |
|---|---|
| **Control Plane** | The component responsible for trust decisions: catalog publication, contract negotiation, policy evaluation, and transfer coordination. Never touches data. |
| **Data Plane** | The execution layer for data sharing. Moves data using wire protocols after authorization from the Control Plane. |
| **Identity Hub** | The component managing DIDs, credential storage, and proof composition. Also referred to as the Credential Service. |
| **Redline** | A Backend-for-Frontend (BFF) service providing the web portal for participants and operators. |
| **CFM (Connector Fabric Manager)** | The management plane that provisions participant contexts and automates lifecycle management for multi-tenant deployments. |

## Multi-Tenant Operations

| Term | Definition |
|---|---|
| **Participant Context** | A logically isolated runtime context for a participant on shared infrastructure, defined by metadata rather than a separate process. The unit of provisioning and lifecycle management. |
| **Cell** | A homogeneous deployment zone (typically a Kubernetes cluster) that hosts participant runtime contexts. |
| **Tenant** | An organization (customer) in a managed deployment — the billing entity and support boundary. |
| **Participant Profile** | A participant identity context (DID-backed) within a tenant. One tenant can have multiple profiles. |
| **Dataspace Profile** | Per-dataspace configuration within a participant: protocol versioning, trust requirements, policy alignment. |
| **Service Virtualization** | The architectural model where shared infrastructure serves many logically isolated participant contexts. |

## Terminology Mapping

Some terms have different names depending on context:

| Operational / API Term | IDSA / Standards Term | Notes |
|---|---|---|
| Credential Service | Identity Hub | Same component; different naming convention |
| Participant context | Participant / Software agent | EDC operational concept; maps to IDSA "participant" at runtime |
| Cell | Deployment zone / cluster | EDC-V operational concept |
| Connector | Software agent / Dataspace Connector | IDSA Rulebook uses "software agent" |
| Contract Offer | Data Contract Offer (DCO) | |
| Contract Agreement | Data Contract Agreement (DCA) | |
| Management API | Administration API | |

## Layers

| Term | Definition |
|---|---|
| **Technical Layer** | Protocols and architecture enabling interoperable data sharing. All participants are equal at this layer. |
| **Economic Layer** | Services, interactions, and business workflows enabling value generation. |
| **Legislative Layer** | Rights, obligations, and regulatory compliance. |
| **Control Plane (of dataspace)** | Where trust decisions and negotiations happen. Separate from data movement. |
| **Data Plane (of dataspace)** | Where actual data access and transfer happens. Agnostic to trust logic. |
| **Management Plane** | Where provisioning and lifecycle management happens (CFM). Not in the trust-decision path. |
