---
slug: registry-modernization-dataspace-protocols-eu-middleware
title: "Registry Modernization with Dataspace Protocols and EU Middleware"
authors: [mbuchhorn]
tags: [government, integration]
description: "How dataspace protocols and EU middleware like SIMPL enable secure, sovereign registry interconnection across 95,825 European public sector bodies — implementing the Once-Only principle with Eclipse Dataspace Components and the new EU BusinessWallet framework."
image: /img/guides/registry-modernization-cover.jpeg
keywords: [registry modernization, dataspace protocol, SIMPL, NOOTS, Once-Only principle, EU interoperability, government digitalization, decentralized identity, verifiable credentials, Zero Trust, GDPR compliance, BusinessWallet, Eclipse Dataspace Components, public sector bodies, COM(2025)838]
---

> The European Data Strategy is forcing a paradigm shift: away from monolithic data silos, toward a decentralized data architecture.

<!-- truncate -->

:::tip What You'll Learn
This article explores how the **Dataspace** concept can support registry modernization as a decentralized infrastructure for data exchange through standardized protocols and trust anchors. You'll understand the connection between NOOTS, SIMPL, and dataspace protocols for interconnecting government registries across Europe.
:::

## The Vision of a Connected European Administration

The **"Once-Only" principle** is the operational consequence of the sovereign data economy in registry modernization. This article examines how the **Dataspace** concept can support practical implementation as a decentralized infrastructure for data exchange through standardized protocols and trust anchors.

The technical foundation consists of the [Rulebook](https://docs.internationaldataspaces.org/ids-knowledgebase/idsa-rulebook/idsa-rulebook/1_introduction) from the **International Data Spaces Association (IDSA)** and the general [Trust Framework](https://gaia-x.eu/gaia-x-framework/) from **Gaia-X**.

Public municipalities, states, and ministries should retain sovereignty over their processes while simultaneously ensuring interoperability at the EU level. The Federal Administration Office and the Digitalization Ministry now face the major task of modernizing and interconnecting hundreds of different registries — theoretical concepts must now be translated into a production-ready architecture. GovTech Deutschland has already successfully completed the first three proof-of-concepts.

## The German Registry Landscape

The **National Once-Only Technical System** (NOOTS) strategically functions as an intermediary for registry communication. In the [architecture planning](https://gitlab.opencode.de/noots/public/ad-noots/Architektur/-/blob/main/README.md), NOOTS was primarily addressed as a "high-level concept for intermediary platforms." It structures the process by which authorities as consumers can automatically retrieve evidence from providers (the registries). A standardized mediation layer model is to be introduced.

![NOOTS architecture diagram showing how Data Consumer and Data Provider connect through NOOTS components for secure government registry data exchange](/img/guides/registry-noots-architecture.jpeg)
*Connection concept for Data Consumer and Data Provider through NOOTS components*

**Strategic Assessment:** As a technological backbone, NOOTS eliminates the need for citizens to act as "postmen between authorities." The efficiency gain lies in the machine-readable provision of evidence. However, to ensure scalability across national borders, this architecture must be integrated into European middleware solutions like SIMPL to achieve true protocol convergence.

## GovTech's POCs 

[GovTech Deutschland](https://www.egovernment.de/raas-grundlage-fuer-die-cloud-register-steht-a-13eef8eb45ca044d66577dc77679c89f/) is driving the modernization of **Identity Data Retrieval** (IDA). Currently, the **Tax Identification Number** is used to uniquely assign persons.

From an architectural perspective, identity retrieval via the tax ID should only be considered an intermediate step. The tax ID functions as a central correlation attribute. This carries significant risks for data protection and security in case of a central compromise. The transition to decentralized wallets and **Verifiable Credentials (VCs)** is imperative.

Self-Sovereign Identity (SSI) enables **Selective Disclosure** and eliminates the need for a central database storing all identity linkages. This minimizes centralization risks and strengthens citizen trust.

To solidify this trust, transparency instruments like the **Data Protection Cockpit** (DSC) have been firmly integrated into the architecture. Digital administration must be "experienceable" and controllable for citizens. With the DSC, citizens retain full control. The DSC shows which authority queried data at what time and for what purpose. It is the control center of data sovereignty for individuals.

To eliminate redundancies in German administration, work is being done on a common **Registry Landscape Map**, which provides an overview of approximately **375 relevant registries**. It serves as a planning instrument for interoperability:

- Identification and elimination of duplicate queries through discoverability of the "Source of Truth"
- The map is the foundation for harmonizing data models across all administrative levels
- Through this overview, the correct registry can now be addressed

## The European Middleware

[SIMPL](https://code.europa.eu/simpl/simpl-open/documentation/user-manual/-/blob/main/README.md) is the EU Commission's open-source answer to the fragmentation of European dataspaces. It is a modular software stack that serves as technical middleware enabling collaboration between providers, consumers, and infrastructure operators.

The SIMPL ecosystem is divided into:

- **Simpl-Open:** The open-source software stack for implementing dataspace logic
- **Simpl-Live:** The sector-specific instances operated by the Commission for productive workloads
- **Simpl-Labs:** The dedicated sandbox environment for testing interoperability scenarios

The first technological milestone was the integration of [eDelivery (AS4)](https://ec.europa.eu/digital-building-blocks/sites/spaces/DIGITAL/pages/845480153/eDelivery+AS4+-+2.0). This occurs at the **Data Plane** level to conduct highly secure and certified physical data transfer after contract negotiation is complete.

![SIMPL-Open agents architecture showing secure data exchange between dataspace participants using standardized protocols](/img/guides/registry-simpl-agents.jpeg)
*Simpl-Open agents enable secure data exchange between participants*

**Strategic Assessment:** The synergy between SIMPL and the **Dataspace Protocol** is exciting for registry modernization. Through SIMPL extensions for EDC, provisioning of cloud resources via a dedicated API is enabled. Particularly noteworthy is the **Infrastructure-PUSH** transfer type, which allows deployment scripts within the SIMPL context to be triggered directly from the Data Plane. This transforms registry communication from pure data exchange to dynamic resource orchestration. However, integration of modern digital identities is currently still missing, which would consistently implement Zero Trust principles.

## Technical Protocols and Standards

Interoperability in multi-cloud administration environments is only achievable through strict protocol adherence. In dataspaces, we therefore rely on clear and binding specifications being transferred into the standard **ISO/IEC 7498** [Open Systems Interconnection — Basic Reference](https://www.iso.org/standard/20269.html). An experienced group of standardization experts handles this.

- **[Dataspace Protocol (DSP)](https://eclipse-dataspace-protocol-base.github.io/DataspaceProtocol/):** In final version **1.0**, DSP forms the foundation for metadata catalogs based on [W3C DCAT](https://www.w3.org/TR/vocab-dcat-3/) and contractual assurance via access and usage policies through [W3C ODRL](https://www.w3.org/TR/odrl-model/).
- **[Decentralized Claims Protocol (DCP)](https://eclipse-dataspace-dcp.github.io/decentralized-claims-protocol/):** DCP governs trust establishment. It uses **JSON-LD** and decentralized identities ([W3C DIDs](https://www.w3.org/TR/did-1.1/)).

![Diagram showing the paradigm shift required for interoperable administration implementing the Once-Only principle through dataspace protocols](/img/guides/registry-protocols-standards.jpeg)
*The path to interoperable administration with the "Once-Only" principle requires a paradigm shift*

**Strategic Assessment:** Using standards like W3C DID, DCAT, and ODRL enables data to be found interoperably and shared with a legally binding contract. The separation of Control and Data Plane in DSP is the prerequisite for **Policy Enforcement**. It ensures that data only leaves the provider's jurisdiction when the Control Plane has validated a cryptographically signed contract against the ODRL policy. This guarantees high availability and sovereignty in registry communication.

## Secure Identity Management for Citizens, Businesses, and Authorities

Industry is moving away from central Identity Providers (IdP) toward **Self-Sovereign Identity (SSI)**. In this model, registries function as sovereign participants holding and managing identity attributes in digital **Wallets**.

![Architecture diagram showing how decentralized identities and verifiable credentials automate trust in government registry systems](/img/guides/registry-decentralized-identity.jpeg)
*Automating trust through decentralized identities and verifiable credentials*

The technical implementation of decentralized identities occurs through specific profiles:

- **[OID4VC](https://openid.net/sg/openid4vc/) (OpenID for Verifiable Credentials)** is a protocol family from the [OpenID Foundation](https://openid.net/sg/openid4vc/) that defines standards for issuing and exchanging digital, cryptographically secured identity credentials (Verifiable Credentials)
- **[OID4VP](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html) (OpenID for Verifiable Presentations):** The standard for securely proving attributes (Presentation Flow). A registry proves its authorization for data retrieval without disclosing unnecessary metadata
- **[OID4VI](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html) (OpenID for Verifiable Issuance):** The standard for automated issuance of authorizations (Issuance Flow)
- **[Verifiable Credential Data Model](https://www.w3.org/TR/vc-data-model-2.0/):** Defines a generic data model for identities

While development and test environments can rely on self-issued **did:web** identities, productive government operations could require a trust anchor such as a [Gaia-X Digital Clearing House (GXDCH)](https://gaia-x.eu/services-deliverables/digital-clearing-house/). It must still be examined whether an independent instance should verify compliance of digital credentials, or whether—as in the DCP specification—the DID Service [issues](https://eclipse-dataspace-dcp.github.io/decentralized-claims-protocol/v1.0.1/#issuance-flow), [presents](https://eclipse-dataspace-dcp.github.io/decentralized-claims-protocol/v1.0.1/#presentation-flow), and verifies the digital did:web identity.

![Illustration showing the necessity of Decentralized Identities (W3C DID) for secure government registry interconnection](/img/guides/registry-did-necessity.jpeg)
*The necessity of Decentralized Identities (W3C DID)*

**Strategic Assessment:** Using decentralized identities removes central instances from the role of "Single Point of Failure." Trust can thus be established through cryptographic proofs directly between registries, which massively increases the resilience of the overall system.

## The Trust Triangle: Issuer, Holder, Verifier

The Verifiable Credentials ecosystem operates through three fundamental roles that form the **Trust Triangle**:

- **Issuer** (Credential Issuer): Creates and cryptographically signs VCs. *Example: A ministry issues a mandate for a government official.*
- **Holder** (Credential Holder): Stores VCs in a wallet and presents them when needed. *Example: A municipal administration holds its identity and authorizations.*
- **Verifier** (Credential Verifier): Validates the authenticity and origin of a VC. *Example: A central procurement portal verifies the municipality's signature.*

This trust model is essential for the **95,825 public sector bodies** across the EU. Each organization can act in multiple roles simultaneously:

| Role | Government Example | BusinessWallet Application |
|------|-------------------|---------------------------|
| **Issuer** | Federal Ministry issuing operating licenses | Qualified Trust Service Provider issuing attestations |
| **Holder** | Municipal registry holding certifications | Business holding permits and authorizations |
| **Verifier** | Central procurement verifying supplier credentials | Registry verifying data requestor's authorization |

**Why This Matters for Registry Modernization:**

1. **No Central Authority Required:** Trust is established peer-to-peer through cryptographic verification
2. **Cross-Border Recognition:** A credential issued in Germany can be verified by an authority in France
3. **Automated Compliance:** Policy engines can verify credentials in milliseconds without human intervention
4. **Audit Trail:** Every issuance and verification is logged for regulatory compliance

The [Eclipse Identity Hub](https://github.com/eclipse-edc/IdentityHub) implements this Trust Triangle, providing the technical foundation for BusinessWallet integration in dataspace ecosystems.

## Why Public Administrations should use Dataspace Specifications?

Security in modern dataspaces follows the principle: "Trust provided they trust assertions." This marks the transition to a **Zero Trust Architecture** where trust is not generated through network membership but through dynamic identity assertions provided by cryptographic decentralized identities, access and usage policies, and legally binding data contracts.

The document [NIST SP 800-207](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-207.pdf) and the [NIST guidelines](https://www.nist.gov/news-events/news/2025/06/nist-offers-19-ways-build-zero-trust-architectures) are intended to support authorities in building modern security architectures. The goal is to give organizations practical guidance and facilitate entry into ZTA implementation. The BSI published an initial [position paper](https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/Publikationen/TechnischeLeitlinien/Zero-Trust/Zero-Trust_04072023.pdf) in 2023. However, it is only a first beginning. Dataspaces implement data compliance and identity management, breaking with the previous paradigm of security through network isolation.

**Benefits of Dataspace Specifications:**

- **Sovereignty:** Through machine-readable ODRL policies, the provider retains full control over data usage
- **Interoperability:** Use of the [Eclipse Conformity Assessment Policy and Credential Profile](https://projects.eclipse.org/projects/technology.dataspace-cap) and the [Technical Compliance KIT](https://projects.eclipse.org/projects/technology.dataspacetck) prevents proprietary lock-in effects. The [TCK Compatibility Reports](https://eclipse-edc.github.io/documentation/compatibility/) ensure all vendors have concretely implemented the standards
- **Transparency:** Complete audit trails via a Clearing House secure legal compliance

![Diagram showing legally compliant registry modernization through DIDs, policies, and data contracts](/img/guides/registry-legal-compliance.jpeg)
*Legally compliant registry modernization with DID, policies, and data contracts*

**Strategic Assessment:** Only through the combination of ODRL-based policies and cryptographically signed Verifiable Credentials is legally compliant registry modernization possible that simultaneously meets the requirements of GDPR and national security regulations.

## Opportunities for German Registry Modernization

The transformation of German administration requires consistent alignment with international standards.

**Benefits for public authorities:**

- **Technology neutrality:** Independence from cloud hyperscalers through open standards (Eclipse Dataspace / SIMPL)
- **EU-wide compatibility:** Seamless connection to the European single market
- **End of isolated solutions:** Harmonization through standardization initiatives like the [eIDAS 2.0](https://www.digitale-verwaltung.de/Webs/DV/DE/digitale-identitaeten/eidas-2-0/eidas-2-0-node.html) regulation and the German [EUDIWallet](https://www.sprind.org/eudi-wallet) for citizens and [BusinessWallet](https://digital-strategy.ec.europa.eu/de/policies/business-wallets) for businesses and authorities

**Challenges for public authorities:**

- **Implementation complexity:** High demand for experienced professionals for integrating eIDAS 2.0 compatible EUDIWallets
- **Legacy integration:** Connecting monolithic legacy systems to modern connector structures
- **Legal harmonization:** Adapting legal foundations to decentralized data exchange scenarios

Registry modernization is the fundamental prerequisite for the digital sovereignty of Germany and Europe. The success of this endeavor stands and falls with the consistent use of open-source components like the Eclipse Dataspace Initiative and SIMPL middleware. These components ensure that the public sector does not fall into new dependencies but builds an independent interoperability stack.

![Architecture diagram showing implementation of Zero Trust architecture, data sovereignty, and EU Data Act compliance](/img/guides/registry-zero-trust.jpeg)
*Implementing Zero Trust Architecture, Data Sovereignty, and the EU Data Act*

## The EU BusinessWallet Proposal: A New Foundation for Government-to-Business Trust

On January 21, 2025, the European Commission published the groundbreaking [BusinessWallet Proposal (COM(2025)838)](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:52025PC0838), establishing a framework for **Organisational Digital Identity Wallets**. This regulation directly impacts how **95,825 Public Sector Bodies** across the EU will interact with businesses and each other.

:::info Target Audience: 95,825 Public Sector Bodies
According to EU statistics, there are approximately **95,825 public sector bodies** across all 27 member states that will be affected by this regulation — from national ministries to local municipalities, regulatory agencies to public utilities. These organizations form the backbone of European administration and are the primary adopters for dataspace-based registry interconnection.
:::

**Key provisions of the BusinessWallet Proposal:**

- **Legal Entity Wallets:** Organizations (businesses, authorities, NGOs) can hold and present verifiable credentials proving their legal status, authorizations, and certifications
- **Cross-Border Recognition:** BusinessWallets issued in one member state must be recognized across all 27 EU countries
- **Interoperability with EUDIWallet:** Seamless integration between citizen wallets (EUDI) and organizational wallets (Business)
- **Qualified Electronic Attestations:** Legal certainty through qualified trust service providers
- **Machine-Readable Credentials:** Enabling automated verification in dataspace transactions

**Strategic Assessment:** The BusinessWallet Proposal is the missing puzzle piece for complete digital sovereignty in European administration. While the EUDIWallet addresses citizen identity, the BusinessWallet enables **machine-to-machine trust** between public sector bodies and businesses. This is exactly what dataspace protocols like DSP and DCP require for automated policy enforcement and contract negotiation.

### Eclipse Dataspace Components: The Reference Implementation

The [Eclipse Dataspace Components (EDC)](https://github.com/eclipse-edc) project provides the production-ready, open-source reference implementation for dataspace protocols. For the **95,825 public sector bodies** looking to modernize their registries, Eclipse EDC offers:

**Core Components:**

- **[EDC Connector](https://github.com/eclipse-edc/Connector):** The central runtime for dataspace participation, handling catalog publishing, contract negotiation, and data transfer
- **[Identity Hub](https://github.com/eclipse-edc/IdentityHub):** Secure storage and management of verifiable credentials compatible with BusinessWallet specifications
- **[Federated Catalog](https://github.com/eclipse-edc/FederatedCatalog):** Distributed discovery of data offerings across administrative boundaries
- **[Minimum Viable Dataspace (MVD)](https://github.com/eclipse-edc/MinimumViableDataspace):** Ready-to-deploy reference architecture for quick adoption

**Why Eclipse EDC for Government:**

| Requirement | Eclipse EDC Solution |
|-------------|---------------------|
| Vendor neutrality | Apache 2.0 licensed, no lock-in |
| EU compliance | DSP/DCP protocol compliant |
| GDPR conformance | Built-in policy enforcement |
| Scalability | Cloud-native, Kubernetes-ready |
| Interoperability | SIMPL-compatible extensions |
| Security | Zero Trust by design |

**Integration with BusinessWallet:**

Eclipse EDC's Identity Hub can serve as the technical backend for BusinessWallet implementations, enabling:

1. **Credential Issuance:** Public authorities issue verifiable credentials to businesses (permits, certifications, authorizations)
2. **Credential Presentation:** Businesses present credentials during dataspace contract negotiation
3. **Automated Verification:** Policy engines verify credential validity before data transfer
4. **Audit Trail:** Complete logging for regulatory compliance

## Five Pillars for Modern, Connected, Sovereign Administration

Our modern, networked, and sovereign administration — serving **95,825 public sector bodies** and millions of businesses — should be built on five pillars:

1. **eIDAS 2.0 Regulation** with the EUDIWallet (citizens) and BusinessWallet (organizations)
2. **NOOTS** as the structural high-level concept for national registry interconnection
3. **SIMPL** as scalable European middleware for cross-border data exchange
4. **Dataspace Protocols DSP and DCP** for standardized, sovereign communication
5. **Eclipse Dataspace Components** as the open-source reference implementation

---

## Resources

- **[EU BusinessWallet Proposal (COM(2025)838)](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:52025PC0838)** — Organisational Digital Identity Wallets framework
- **[Eclipse Dataspace Components](https://github.com/eclipse-edc)** — Production-ready reference implementation
- **[Eclipse Identity Hub](https://github.com/eclipse-edc/IdentityHub)** — Credential management for BusinessWallet integration
- **[NOOTS Architecture](https://gitlab.opencode.de/noots/public/ad-noots/Architektur)** — German National Once-Only Technical System
- **[SIMPL Documentation](https://code.europa.eu/simpl/simpl-open/documentation/user-manual)** — EU Middleware for Dataspaces
- **[Dataspace Protocol Specification](https://eclipse-dataspace-protocol-base.github.io/DataspaceProtocol/)** — DSP 1.0
- **[Decentralized Claims Protocol](https://eclipse-dataspace-dcp.github.io/decentralized-claims-protocol/)** — DCP for identity management
- **[Gaia-X Trust Framework](https://gaia-x.eu/gaia-x-framework/)** — European data sovereignty framework

---

**Related articles:**
- [What Are Dataspaces? A Plain-Language Explanation](/guides/what-are-dataspaces-plain-language) — Understanding the basics
- [The Cloud Provider's Path to Dataspace-as-a-Service](/guides/cloud-provider-path-dataspace-service) — Architecture for service providers
- [From Zero to Dataspace: Concrete Steps for Rapid Adoption](/guides/zero-to-dataspace-rapid-adoption) — Implementation guide