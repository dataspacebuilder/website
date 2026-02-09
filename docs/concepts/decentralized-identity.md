# Decentralized Identity

## Why Identity Is the First Decision

The design of the identity system is the most fundamental architectural decision for a dataspace. If a central identity provider is chosen, every other service depends on that central verification, and truly decentralized designs become infeasible.

Identity determines:
- Whether participants have autonomy and sovereignty over their own representation
- Whether there are single points of failure or control in the dataspace
- Which trust models and policy architectures are possible

## Decentralized Identifiers (DIDs)

Dataspaces achieve participant autonomy by using **Decentralized Identifiers (DIDs)** — self-owned identifiers that don't depend on a central registry or identity provider.

A DID is:
- **Self-created** — the participant generates and controls it
- **Cryptographically verifiable** — it's linked to key material that the participant controls
- **Resolvable** — other participants can resolve the DID to discover public keys and service endpoints
- **Not dependent on any central authority** — no single entity can revoke or modify it without the participant's consent

The most common DID method in dataspace deployments is [`did:web`](https://w3c-ccg.github.io/did-method-web/), which uses existing web infrastructure (DNS, HTTPS) for resolution while maintaining decentralized control.

> **Relevant standards**: [W3C DID Core](https://www.w3.org/TR/did-1.0/) | [did:web method](https://w3c-ccg.github.io/did-method-web/)

## Verifiable Credentials (VCs)

Attributes about a participant are expressed as **Verifiable Credentials** — digitally signed attestations that can be cryptographically verified by any party.

A Verifiable Credential contains:
- **Claims** — statements about the credential holder (e.g., "this organization is a member of Catena-X")
- **Issuer identity** — who issued the credential (e.g., a governance-recognized onboarding service)
- **Proof** — a cryptographic signature that proves the credential was issued by the stated issuer and has not been tampered with
- **Validity period** — when the credential is valid

### Trust Anchors

The value of a credential depends on who issued it. A **trust anchor** is an entity whose credentials are accepted as evidence. Just as a passport is trusted because a government issued it, a membership credential is trusted because a governance-recognized issuer produced it.

Dataspace Trust Frameworks (DTFs) define which issuers are accepted as trust anchors. Different DTFs may accept different issuers, enabling flexible and composable trust models.

> **Relevant standard**: [W3C Verifiable Credentials Data Model](https://www.w3.org/TR/vc-data-model/)

## How Identity Enables Trust

The flow from identity to trust follows a clear sequence:

1. **DID creation** — A participant creates a DID and publishes the associated DID Document (containing public keys and service endpoints)
2. **Credential acquisition** — The participant obtains Verifiable Credentials from trusted issuers (e.g., dataspace membership credential, industry certification)
3. **Credential storage** — Credentials are stored in the participant's Identity Hub (Credential Service)
4. **Proof presentation** — When interacting with another participant, the Identity Hub assembles and presents the relevant credentials
5. **Verification** — The receiving participant verifies the credentials cryptographically: checking the issuer signature, validity period, and revocation status
6. **Policy evaluation** — The verified credentials are matched against the receiving participant's policies to determine trust for the specific interaction

This entire flow happens peer-to-peer, without contacting a central authority. The only external dependency is credential revocation checks, which can be done asynchronously.

## Centralized vs. Decentralized: The Trade-Off

| Aspect | Centralized Identity | Decentralized Identity |
|---|---|---|
| Participant autonomy | Low — depends on central provider | Full — self-managed |
| DSGA control | High — can manage all identities | Lower — defines policies, not identities |
| Single point of failure | Yes | No |
| Single point of attack | Yes | No |
| Technology stack | Traditional, well-known | Newer, partially unfamiliar |
| Participant management | Harder for participants (must integrate with external IdP) | Easier for participants (self-managed) |
| DSGA management | Simpler (centralized operations) | More complex (decentralized protocols) |

The dataspace community strongly recommends decentralized identity to maximize participant autonomy and eliminate single points of failure and control. However, the choice is a governance decision — the DSGA and its DTFs define which identity model is required.

## Self-Descriptions

Participants need to be discoverable and understandable by other participants. A **self-description** provides structured, machine-readable information about a participant:

- Identity (DID, public keys, service endpoints)
- Organizational attributes (industry, jurisdiction, certifications)
- Technical capabilities (supported protocols, encryption methods)
- Dataspace memberships

The format and required content of self-descriptions are typically defined by the DSGA and the DTFs. Participants in multiple dataspaces must manage their self-descriptions to keep attributes current and filter which attributes are shared in which context.

## The Credential Lifecycle

In a production dataspace, credentials follow a lifecycle:

1. **Issuance** — An authorized issuer creates and signs the credential after verifying the holder's attributes
2. **Storage** — The holder stores the credential in their Identity Hub
3. **Presentation** — When needed, the holder presents the credential (or a derived proof) to a verifier
4. **Verification** — The verifier checks the signature, validity, and optionally the revocation status
5. **Renewal** — Credentials have validity periods and must be renewed
6. **Revocation** — Issuers can revoke credentials if the holder no longer meets the requirements

The participant is responsible for managing their own credential lifecycle. The Identity Hub automates the storage, presentation, and proof composition. Issuance and revocation typically involve governance-defined processes outside the participant's direct control.

---

**Go deeper**: [IDSA Rulebook — Achieving Autonomy and Agency](../reference/community.md) | [IDSA Rulebook — Identity](../reference/community.md) | [IDSA Rulebook — Attributes and Claims](../reference/community.md)

**Related concepts**: [Trust and Governance](./trust-and-governance.md) | [Protocols](./protocols.md) | [Component: Identity Hub](../components/identity-hub.md)
