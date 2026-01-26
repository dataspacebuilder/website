---
sidebar_position: 2
title: Trust Framework & Credentials
description: How governance and credentials establish trust in dataspaces
---

# Trust Framework & Credentials

Trust frameworks define the rules that govern a dataspace. They determine who can participate, what credentials are accepted, and how trust is established between parties.

---

## What is a Trust Framework?

A trust framework is a set of agreements and technical specifications that:

- **Define membership criteria** — Who can join the dataspace
- **Establish credential schemas** — What attributes can be verified
- **Designate trusted issuers** — Who can issue accepted credentials
- **Set governance policies** — Rules all participants must follow
- **Specify compliance requirements** — Regulatory and operational standards

---

## Key Components

### Credential Issuers

Trusted organizations that issue verifiable credentials:

- Industry certification bodies
- Regulatory authorities
- Dataspace operators
- Authorized third parties

### Credential Schemas

Standardized formats that define what a credential contains:

- **Membership credentials** — Proof of dataspace participation
- **Role credentials** — Emergency responder, supplier, auditor
- **Certification credentials** — ISO certifications, compliance attestations
- **Attribute credentials** — Company size, industry sector, location

### Trust Registries

Lists of trusted issuers and valid credential types:

- Which issuers are authorized for which credential types
- Revocation status of credentials
- Validity periods and renewal requirements

---

## How Trust Works in Practice

### 1. Join the Dataspace

An organization applies to join and receives membership credentials from the dataspace operator.

### 2. Obtain Role Credentials

Based on their business function, organizations obtain additional credentials:
- A manufacturer gets "certified supplier" credentials
- An auditor gets "compliance verifier" credentials
- An emergency responder gets "urgent access" credentials

### 3. Present Credentials

When requesting data access, the consumer presents relevant credentials that prove they meet the provider's access requirements.

### 4. Verify Automatically

The provider's connector automatically verifies:
- The credential was issued by a trusted issuer
- The credential hasn't been revoked
- The credential attributes match the access policy

### 5. Proceed with Confidence

Once trust is established, contract negotiation and data transfer can proceed.

---

## Benefits of Trust Frameworks

- **Scalability** — Trust verification is automated, not manual
- **Interoperability** — Standard credential formats work across implementations
- **Auditability** — All trust decisions can be logged and reviewed
- **Flexibility** — Different dataspaces can have different rules
- **Decentralization** — No single point of control

---

## Real-World Examples

### Catena-X (Automotive)

- Membership requires proof of supply chain involvement
- Specific credentials for OEMs, suppliers, and service providers
- Certifications for compliance with industry standards

### Manufacturing-X

- Credentials for industrial equipment manufacturers
- Role-based access to production data
- Certifications for safety and quality standards

---

## Standards and Protocols

Trust frameworks in EDC-based dataspaces build on:

- **Decentralized Claims Protocol (DCP)** — Standard for credential presentation and verification
- **W3C Verifiable Credentials** — Data model for credentials
- **Decentralized Identifiers (DIDs)** — Self-sovereign identity standard

---

## Next Steps

- [Identity Hub](/docs/architecture/identity-hub) — Where credentials are stored and managed
- [Control Plane](/docs/architecture/control-plane) — How policies use credentials
- [Use Cases](/docs/use-cases/critical-spare-part) — Trust in action
