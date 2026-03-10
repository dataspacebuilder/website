# Issuer Service

## What It Is

The Issuer Service is the component that issues verifiable credentials to dataspace participants. It defines credential schemas, manages the lifecycle of issued credentials, and maintains status lists for revocation and suspension.

In the Eclipse ecosystem, the Issuer Service is part of the [EDC](https://eclipse-edc.github.io/documentation/) project. It is deployed by organizations that need to act as credential issuers — typically dataspace operators, certification bodies, or CSPs operating on behalf of a DSGA.

## What Problem It Solves

For trust to work in a decentralized dataspace, participants need credentials — signed attestations that they meet membership requirements, hold certifications, or have specific roles. Someone must issue those credentials. The Issuer Service provides a structured, automatable way to do that.

Without it, credential issuance is manual and ad-hoc. With it, onboarding flows can request and deliver credentials programmatically, and revocation is managed through standard status lists.

## How It Fits in the Architecture

```
                CFM
                 │
                 │ registers holder,
                 │ requests credential
                 ▼
          Issuer Service ──── DCP Storage API ──→ Identity Hub
                 │                                     ↕
                 │ maintains                      Connector
           Status Lists                          (presents
                 │                                credentials
                 ▼                                via DCP)
          Revocation checks
          (by verifiers)
```

The Issuer Service sits alongside CFM and the Identity Hub. During onboarding, CFM registers a new participant as a holder with the Issuer Service, then requests credential issuance. The Issuer Service composes and signs the credential, then delivers it to the participant's Identity Hub. From there, the Identity Hub handles presentation during negotiations.

The Issuer Service is **not in the runtime trust path**. Once credentials are issued and stored, data sharing happens peer-to-peer between Connectors and Identity Hubs. The Issuer Service's only ongoing role is maintaining status lists that verifiers can check asynchronously.

## Key Capabilities

### Credential Definitions
A credential definition specifies the shape of a credential type:
- What claims it contains (e.g., `memberOf`, `membershipLevel`, `validUntil`)
- How claims are mapped to attestation sources
- The credential type identifier (e.g., `MembershipCredential`, `ISO27001Certification`)

Each dataspace defines which credential types are accepted. The Issuer Service is configured with the definitions relevant to its role.

### Attestation Sources
Claims inside a credential need values. Attestation sources are where those values come from:
- **Database lookups** — claim values retrieved from a backing store (e.g., membership records)
- **Presentation exchange** — claim values derived from credentials the holder already presents

This makes issuance flexible: a credential can combine information from multiple sources.

### Holder Management
The Issuer Service tracks which participants (holders) have been registered and which credentials have been issued to them:
- Register a new holder (typically triggered by CFM during provisioning)
- Track issuance requests and their status
- Associate holders with their Identity Hub endpoints for credential delivery

### Status Lists
Issued credentials can be revoked or suspended. The Issuer Service maintains **BitStringStatusList** entries that verifiers can check:
- **Revocation** — the credential is permanently invalidated
- **Suspension** — the credential is temporarily invalid, can be reinstated

Verifiers resolve status list entries without contacting the Issuer Service directly. The status list is a published resource, not a live API call.

### Asynchronous Issuance
Credential issuance is asynchronous:
1. A request is submitted (by CFM or another provisioning system)
2. The Issuer Service gathers claims from attestation sources
3. The Issuer Service composes and signs the credential
4. The credential is delivered to the holder's Identity Hub via the DCP Storage API

This decouples the request from delivery, making the flow resilient to transient failures.

## Administration API

| API | Purpose | Content Type | Intended Client |
|---|---|---|---|
| **Issuer Admin API** | Manage holders, attestations, and credential definitions | JSON-LD | CFM (provisioner role), DSGA tooling |

Key resources:

| Resource | Path | Operations |
|---|---|---|
| Holders | `/holders` | Register and manage credential holders |
| Attestations | `/attestations` | Define attestation types and sources |
| Credential Definitions | `/credentialdefinitions` | Configure credential schemas and claim mappings |

## Deployment Models

Who operates the Issuer Service depends on the dataspace's governance model:

| Model | Who operates | When to use |
|---|---|---|
| **CSP-operated** | The CSP deploys it as part of the platform | CSP issues credentials on behalf of the DSGA |
| **DSGA-operated** | The governance authority or its operating company runs it | The DSGA wants direct control over issuance |
| **External DTF issuer** | A DTF credential issuer operates it independently | Credentials come from an external trust framework (e.g., Gaia-X, iSHARE) |
| **Multiple issuers** | Different issuers for different credential types | Membership from DSGA, certifications from TÜV, compliance from regulator |

A single dataspace typically involves multiple issuers. The DSGA defines which issuers are accepted as trust anchors for which credential types.

## When You Need It

| Scenario | Deploy Issuer Service? |
|---|---|
| Standard participant joining a dataspace | No — receive credentials from an external issuer |
| CSP operating a DSaaS platform | Yes — if the DSGA delegates issuance to you |
| Dataspace operating company | Yes — issue membership credentials to participants |
| Certification body participating in a dataspace | Yes — issue compliance or certification credentials |
| Consortium or association | Yes — issue role or membership credentials |

## In JAD

In the [JAD](https://github.com/Metaform/jad) scenario, the Issuer Service is deployed alongside the Identity Hub. When CFM provisions a new participant:

1. The Registration Agent registers the participant as a holder with the Issuer Service
2. The Onboarding Agent requests a `MembershipCredential` for the holder
3. The Issuer Service issues the credential and delivers it to the participant's Identity Hub
4. The participant can now present the credential during contract negotiations

This flow is visible in the provisioning progress — the Registration Agent and Onboarding Agent activities transition to `"state": "active"` as credential issuance completes.

## Relevant Standards

| Standard | Purpose |
|---|---|
| [W3C Verifiable Credentials](https://www.w3.org/TR/vc-data-model/) | Credential data model |
| [DCP](https://eclipse-dataspace-dcp.github.io/decentralized-claims-protocol/) | Protocol for credential issuance and presentation |
| [BitStringStatusList](https://www.w3.org/TR/vc-bitstring-status-list/) | Credential revocation mechanism |

---

**Related**: [Identity Hub](./identity-hub.md) | [CFM](./cfm.md) | [Connector](./connector.md) | [Concepts: Onboarding and Registration](../concepts/onboarding-and-registration.md) | [Concepts: Decentralized Identity](../concepts/decentralized-identity.md)
