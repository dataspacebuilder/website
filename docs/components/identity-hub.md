# Identity Hub (Credential Service)

## What It Is

The Identity Hub is the component that manages a participant's decentralized identity and verifiable credentials. It stores credentials, manages DIDs and key material, and composes the cryptographic proofs needed to establish trust during dataspace interactions.

In the Eclipse ecosystem, the canonical implementation is [Identity Hub](https://eclipse-edc.github.io/documentation/for-adopters/identity-hub/). In operational contexts, it's often referred to as the **Credential Service** — because that's how operators and API surfaces frame its role.

## What Problem It Solves

In a decentralized dataspace, there is no central identity provider. Each participant must:
- Prove who they are to other participants
- Present evidence of their attributes (memberships, certifications, capabilities)
- Do so cryptographically, without relying on a shared authentication service

The Identity Hub makes this possible by managing the full credential lifecycle: storage, proof composition, and presentation.

## How It Fits in the Architecture

```
Credential Issuers ──→ Identity Hub ←─ DCP ─→ Identity Hub ←── Credential Issuers
                            ↕                       ↕
                       Connector              Connector
```

The Identity Hub sits alongside the Connector. During contract negotiation, the Connector delegates identity verification to the Identity Hub, which handles the DCP exchange:
1. The provider's Connector requests proof of the consumer's attributes
2. The consumer's Identity Hub assembles and presents the relevant credentials
3. The provider's Identity Hub (or Connector) verifies the proofs cryptographically

## Key Capabilities

### DID Management
The Identity Hub manages the participant's **Decentralized Identifiers (DIDs)**:
- Creates and manages DIDs (typically `did:web`)
- Maintains the associated key material (signing keys, verification keys)
- Publishes DID Documents that other participants can resolve to discover public keys and service endpoints

### Credential Storage
Issued credentials are stored in the Identity Hub:
- **Membership credentials** — proving participation in specific dataspaces
- **Attribute credentials** — certifications, jurisdictional information, capabilities
- **Role credentials** — specific roles within a dataspace or use case

The participant controls which credentials are stored and which are presented in which context.

### Proof Composition
When another participant requests proof of attributes, the Identity Hub:
- Selects the relevant credentials from its store
- Composes a **Verifiable Presentation** — a cryptographically signed package containing the required proofs
- Presents the proof to the requesting party

This happens over the **DCP (Decentralized Claims Protocol)** — peer-to-peer, without contacting a central authority.

### Credential Verification
When receiving credentials from another participant, the Identity Hub (or the Connector) verifies:
- The cryptographic signature — was the credential issued by the claimed issuer?
- The validity period — is the credential still current?
- The revocation status — has the credential been revoked?
- The trust anchor — is the issuer recognized by the applicable DTF?

## Administration API

| API | Purpose | Content Type | Intended Client |
|---|---|---|---|
| **Identity API** | Manage DIDs, key pairs, and verifiable credentials | JSON | Participant applications, provisioning automation |

The Identity API is used by:
- **Provisioning automation** (CFM) to set up participant identity contexts
- **UI backends** (Redline) to display and manage credentials on behalf of users
- **Issuer services** to deliver newly issued credentials

## The Credential Flow

A typical credential lifecycle in a running dataspace:

```
1. ISSUANCE    Governance-recognized issuer verifies the participant's
               attributes and issues a signed Verifiable Credential

2. DELIVERY    The credential is delivered to the participant's
               Identity Hub (via the Identity API or issuer workflow)

3. STORAGE     The Identity Hub stores the credential securely,
               associated with the participant's DID

4. PRESENTATION  When another participant requests proof during
                 a DSP negotiation, the Identity Hub assembles
                 a Verifiable Presentation containing the relevant
                 credentials

5. VERIFICATION  The requesting participant verifies the presentation
                 cryptographically — checking signatures, validity,
                 and trust anchors

6. RENEWAL     Credentials have expiration dates and must be renewed
               through the issuer before they expire

7. REVOCATION  If the participant no longer meets requirements,
               the issuer can revoke the credential
```

## In JAD

In the [Get Started](../get-started.md) scenario, the Identity Hub is what makes trust verification possible. When Company B requests access to Company A's data, both Identity Hubs participate in the DCP exchange — Company B's hub presents credentials, Company A's system verifies them. This happens behind the scenes during contract negotiation.

## Relevant Standards

| Standard | Purpose |
|---|---|
| [W3C DID Core](https://www.w3.org/TR/did-1.0/) | Decentralized Identifier specification |
| [did:web method](https://w3c-ccg.github.io/did-method-web/) | DID method using web infrastructure |
| [W3C Verifiable Credentials](https://www.w3.org/TR/vc-data-model/) | Credential data model |
| [DCP](https://eclipse-dataspace-dcp.github.io/decentralized-claims-protocol/) | Protocol for exchanging and verifying claims |

---

**Learn more**: [EDC Identity Hub documentation](https://eclipse-edc.github.io/documentation/for-adopters/identity-hub/)

**Related**: [Connector](./connector.md) | [Concepts: Decentralized Identity](../concepts/decentralized-identity.md) | [Concepts: Trust and Governance](../concepts/trust-and-governance.md)
