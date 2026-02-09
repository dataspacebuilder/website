---
sidebar_position: 1
title: Participants & Identity
description: Decentralized identity is the foundation for trust in dataspaces—DIDs, Verifiable Credentials, and Trust Anchors.
---

# Participants & Identity

Identity is the foundation for trust in dataspaces. Without reliable identity, there can be no trust decisions. This section explains how decentralized identity works and why it matters for data sharing.

---

## Participants in Dataspaces

A **participant** is any entity that participates in data sharing within a dataspace—typically an organization, but can also be a service, machine, or any identifiable entity.

### The Single Identity Rule

> **A participant has one and only one identifier within a dataspace.**

This is a fundamental dataspace constraint. All components operated by an organization use the same participant ID.

| Scenario | Result |
|----------|--------|
| Single deployment | One connector, one identity |
| Clustered deployment | Multiple instances, same identity |
| Distributed deployment | Multiple management domains, same identity |
| Multiple dataspaces | Can use same DID or different DIDs per dataspace |
| Multiple business units | Each unit can be a separate participant with distinct identity |

### Participant Agents

An EDC component (control plane, data plane, identity hub) acts as a **participant agent**—a system that runs on behalf of a participant. The participant agent:

- Holds credentials for the participant
- Makes trust decisions based on participant policies
- Acts with the authority of the participant

---

## Decentralized Identifiers (DIDs)

DIDs are globally unique identifiers controlled by the identity owner, not by a central authority.

### Example DID

```
did:web:example.com:participant:acme-corp
```

### DID Properties

| Property | Description |
|----------|-------------|
| **Self-sovereign** | Controlled by the owner, not a central authority |
| **Resolvable** | Can be resolved to a DID Document containing public keys |
| **Cryptographically verifiable** | Enables proof of identity control |
| **Method-agnostic** | Supports multiple DID methods (did:web, did:key) |

### DID Resolution

When a connector needs to verify identity, it resolves the DID to get the DID Document:

```
┌─────────────────┐                    ┌─────────────────┐
│    Provider     │                    │    Consumer     │
│   Control Plane │                    │   Identity Hub  │
└────────┬────────┘                    └────────┬────────┘
         │                                      │
         │  1. Resolve did:web:acme-corp.com    │
         │────────────────────────────────────► │
         │                                      │
         │  2. Return DID Document              │
         │ ◄────────────────────────────────────│
         │     (contains public keys,           │
         │      service endpoints)              │
         │                                      │
         │  3. Verify signature using           │
         │     public key from DID Document     │
         │                                      │
```

### DID Document

The DID Document contains:

```json
{
  "@context": ["https://www.w3.org/ns/did/v1"],
  "id": "did:web:acme-corp.com",
  "verificationMethod": [{
    "id": "did:web:acme-corp.com#key-1",
    "type": "JsonWebKey2020",
    "controller": "did:web:acme-corp.com",
    "publicKeyJwk": { ... }
  }],
  "service": [{
    "id": "did:web:acme-corp.com#credential-service",
    "type": "CredentialService",
    "serviceEndpoint": "https://acme-corp.com/identity-hub"
  }]
}
```

---

## Verifiable Credentials (VCs)

Verifiable Credentials are digital equivalents of physical credentials—proofs of attributes about the holder.

### Credential Example

```json
{
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  "type": ["VerifiableCredential", "MembershipCredential"],
  "issuer": "did:web:catena-x.net:issuer",
  "issuanceDate": "2024-01-15T00:00:00Z",
  "expirationDate": "2025-01-15T00:00:00Z",
  "credentialSubject": {
    "id": "did:web:acme-corp.com",
    "memberOf": "Catena-X",
    "membershipLevel": "full"
  },
  "proof": {
    "type": "JsonWebSignature2020",
    "created": "2024-01-15T00:00:00Z",
    "verificationMethod": "did:web:catena-x.net:issuer#key-1",
    "proofValue": "..."
  }
}
```

### Credential Properties

| Property | Description |
|----------|-------------|
| **Issued by trusted authorities** | Only Trust Anchors can issue certain credentials |
| **Cryptographically signed** | Cannot be forged or tampered with |
| **Machine-verifiable** | Automated verification without contacting issuer |
| **Revocable** | Issuers can revoke credentials when needed |
| **Time-bound** | Credentials have expiration dates |

### Common Credential Types

#### Membership Credentials

Prove participation in a dataspace or consortium:

```json
{
  "type": ["VerifiableCredential", "DataspaceMembership"],
  "credentialSubject": {
    "memberOf": "Manufacturing-X",
    "membershipLevel": "full",
    "validUntil": "2025-12-31"
  }
}
```

#### Role Credentials

Prove specific roles or capabilities:

```json
{
  "type": ["VerifiableCredential", "RoleCredential"],
  "credentialSubject": {
    "role": "emergency-responder",
    "scope": "wind-energy-sector",
    "authorizedBy": "did:web:grid-operator.eu"
  }
}
```

#### Certification Credentials

Prove certifications or compliance:

```json
{
  "type": ["VerifiableCredential", "ISO27001Certification"],
  "credentialSubject": {
    "certificationBody": "TÜV SÜD",
    "scope": "Information Security Management",
    "validUntil": "2026-06-30"
  }
}
```

---

## Trust Anchors

Trust Anchors are organizations authorized to issue credentials for a dataspace.

### Examples of Trust Anchors

| Type | Examples |
|------|----------|
| **Industry associations** | Catena-X, Manufacturing-X |
| **Certification bodies** | TÜV, ISO certification bodies |
| **Government agencies** | Regulatory bodies, tax authorities |
| **Dataspace operators** | The entity running the dataspace |

### Trust Anchor Registry

Each dataspace defines which anchors it trusts through a Trust Anchor Registry:

```
┌─────────────────────────────────────────────────────────────────┐
│                    Trust Anchor Registry                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Trusted Issuers for MembershipCredential:                      │
│    • did:web:catena-x.net:issuer                                │
│    • did:web:manufacturing-x.eu:issuer                          │
│                                                                  │
│  Trusted Issuers for ISO27001Certification:                     │
│    • did:web:tuv-sud.com:issuer                                 │
│    • did:web:iso-certification.org:issuer                       │
│                                                                  │
│  Trusted Issuers for RoleCredential:                            │
│    • did:web:dataspace-governance.eu:issuer                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## The Passport Analogy

Understanding credentials is easier with a real-world analogy:

| Real World | Dataspace |
|------------|-----------|
| **Passport** | Verifiable Credential |
| **Government issuing passport** | Trust Anchor / Credential Issuer |
| **Country's entry requirements** | Policies |
| **Border control checking passport** | Control Plane policy evaluation |
| **Passport validity dates** | Credential expiration |
| **Passport revocation** | Credential revocation |
| **You don't show passport to every person** | Access policies control visibility |

---

## Verifiable Presentations

When proving attributes to another party, credentials are bundled into a **Verifiable Presentation**:

```
┌─────────────────────────────────────────────────────────────────┐
│                    Verifiable Presentation                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Holder: did:web:acme-corp.com                                  │
│                                                                  │
│  Credentials:                                                    │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ MembershipCredential (from Catena-X)                    │    │
│  └─────────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ ISO27001Certification (from TÜV SÜD)                    │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Proof: Signed by did:web:acme-corp.com                         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Presentation Flow

1. **Select relevant credentials** from the credential store
2. **Create a presentation** proving you hold them
3. **Include proof** that you control your DID
4. **Share only what's needed** (selective disclosure)

---

## Credential Lifecycle

```
┌─────────┐    ┌──────────┐    ┌─────────┐    ┌─────────┐    ┌──────────┐
│ REQUEST │ → │  ISSUE   │ → │  STORE  │ → │ PRESENT │ → │  VERIFY  │
│         │    │          │    │         │    │         │    │          │
│ Org asks│    │ Issuer   │    │ Identity│    │ During  │    │ Counter- │
│ for VC  │    │ creates  │    │ Hub     │    │ negot.  │    │ party    │
│         │    │ & signs  │    │ stores  │    │         │    │ checks   │
└─────────┘    └──────────┘    └─────────┘    └─────────┘    └──────────┘
                    │                              │
                    ▼                              ▼
              ┌──────────┐                   ┌──────────┐
              │  REVOKE  │                   │  RENEW   │
              │ (when    │                   │ (before  │
              │ invalid) │                   │ expiry)  │
              └──────────┘                   └──────────┘
```

### Lifecycle Stages

| Stage | Description |
|-------|-------------|
| **Request** | Organization requests credential from issuer |
| **Issue** | Issuer verifies eligibility and creates signed credential |
| **Store** | Credential stored in Identity Hub |
| **Present** | Credential bundled into presentation for verification |
| **Verify** | Counterparty validates signature, issuer, and expiration |
| **Renew** | Organization requests new credential before expiration |
| **Revoke** | Issuer invalidates credential (e.g., membership ended) |

---

## Self-Issued Tokens

The Decentralized Claims Protocol (DCP) uses **self-issued tokens** instead of tokens from a central identity provider:

| Aspect | Centralized Identity | DCP (Decentralized) |
|--------|---------------------|---------------------|
| Token issuer | Central IdP | Requesting party (self-signed) |
| Verification | Contact IdP | Resolve DID, check signature |
| Privacy | IdP knows all communications | No third-party visibility |
| Availability | Single point of failure | No central dependency |

### Why Self-Issued?

1. **No single point of failure** — No central IdP to go down
2. **Privacy** — No third party sees all your communications
3. **Decentralized control** — You control your own tokens
4. **Offline capability** — Can verify without network calls to IdP

---

## Identity in Multi-Tenant Deployments

In CFM-managed deployments, each VPA maintains its own identity:

```
┌─────────────────────────────────────────────────────────────────┐
│                    Shared Runtime (EDC-V)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   VPA: Tenant A                    VPA: Tenant B                 │
│   ┌─────────────────┐             ┌─────────────────┐           │
│   │ DID: did:web:   │             │ DID: did:web:   │           │
│   │   tenant-a.com  │             │   tenant-b.com  │           │
│   │                 │             │                 │           │
│   │ Credential      │             │ Credential      │           │
│   │ Store: isolated │             │ Store: isolated │           │
│   │                 │             │                 │           │
│   │ Policies:       │             │ Policies:       │           │
│   │ tenant-specific │             │ tenant-specific │           │
│   └─────────────────┘             └─────────────────┘           │
│                                                                  │
│   ✓ Credentials isolated by Vault path/namespace                │
│   ✓ DIDs are tenant-specific                                    │
│   ✓ Policies are tenant-specific                                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## What's Next

- **[Virtual Participant Agents](/docs/architecture/core-concepts/virtual-participant-agents)** — The unit of deployment
- **[Cells & Infrastructure](/docs/architecture/core-concepts/cells-infrastructure)** — Deployment zones
- **[Trust Framework](/docs/architecture/trust-framework)** — How trust works in dataspaces
- **[Identity Hub](/docs/architecture/identity-hub)** — Implementation details
