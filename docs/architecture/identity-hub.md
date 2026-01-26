---
sidebar_position: 3
title: Identity Hub
description: Managing decentralized identity and credentials in dataspaces
---

# Identity Hub

The Identity Hub manages an organization's digital identity in a dataspace. It stores credentials, handles identity verification requests, and enables trust at scale.

---

## What is an Identity Hub?

An Identity Hub is a component that:

- **Stores verifiable credentials** — The digital proofs of your organization's attributes
- **Manages Decentralized Identifiers (DIDs)** — Your organization's self-sovereign identity
- **Responds to verification requests** — When others need to verify who you are
- **Presents credentials** — When you need to prove attributes to access data

---

## Key Concepts

### Decentralized Identifiers (DIDs)

DIDs are globally unique identifiers that:

- Are controlled by the identity owner (not a central authority)
- Can be resolved to a DID Document containing public keys
- Enable cryptographic verification of identity
- Support multiple DID methods (did:web, did:key, etc.)

### Verifiable Credentials

Digital credentials that:

- Are issued by trusted authorities
- Can be cryptographically verified
- Cannot be forged or tampered with
- Include claims about the holder (membership, roles, certifications)

### Verifiable Presentations

When proving attributes to another party:

- Select relevant credentials from your wallet
- Create a presentation proving you hold them
- Include proof that you control your DID
- Share only what's needed (selective disclosure)

---

## How Identity Hub Works

### Provider Side

1. **Store credentials** — Load credentials issued by trusted parties
2. **Configure policies** — Define what credentials consumers must present
3. **Verify presentations** — Check consumer credentials during contract negotiation

### Consumer Side

1. **Store credentials** — Load your membership and role credentials
2. **Query catalog** — Discover what data is available
3. **Present credentials** — Prove you meet access requirements
4. **Negotiate access** — Complete contract negotiation with verified identity

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│                  Identity Hub                    │
├─────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────────────────┐   │
│  │   DID       │  │   Credential Store      │   │
│  │   Manager   │  │   (Verifiable Creds)    │   │
│  └─────────────┘  └─────────────────────────┘   │
│                                                  │
│  ┌─────────────────────────────────────────┐    │
│  │        Presentation Service              │    │
│  │   (Create & Verify Presentations)        │    │
│  └─────────────────────────────────────────┘    │
├─────────────────────────────────────────────────┤
│                External APIs                     │
│  • DID Resolution  • Credential Issuance        │
│  • Presentation Exchange  • Revocation Check    │
└─────────────────────────────────────────────────┘
```

---

## Key Features

- **Self-sovereign identity** — You control your credentials
- **Selective disclosure** — Share only what's needed
- **Offline verification** — Verify credentials without contacting issuer
- **Revocation checking** — Ensure credentials are still valid
- **Multiple credential formats** — Support for different standards

---

## Integration with EDC

The Identity Hub integrates with the EDC Connector:

- **During catalog queries** — Verify consumer has basic membership
- **During contract negotiation** — Check consumer meets policy requirements
- **During transfer initiation** — Re-verify identity before data flows

---

## Deployment Options

### Dedicated Identity Hub

- Separate service for identity management
- Recommended for production deployments
- Supports multiple connectors

### Embedded Identity

- Identity functions within the connector
- Simpler deployment for getting started
- Suitable for development and testing

---

## Standards Compliance

The Identity Hub implements:

- **Decentralized Claims Protocol (DCP)** — EDC's identity protocol
- **W3C DID Core** — Decentralized Identifier standard
- **W3C Verifiable Credentials** — Credential data model
- **Presentation Exchange** — Standard for credential requests

---

## Next Steps

- [Trust Framework](/docs/architecture/trust-framework) — Where credentials come from
- [Control Plane](/docs/architecture/control-plane) — How identity enables contracts
- [Use Cases](/use-cases) — See Identity Hub in action
