# Onboarding and Registration

## Why Onboarding Matters

Before a participant can share data, they must join the dataspace. Joining means proving they meet the membership requirements and receiving the credentials that enable trust.

Onboarding is where governance becomes operational. The rules a dataspace defines — who can join, what attributes they need, what agreements they must sign — are enforced during onboarding. The output is a credential. That credential is what unlocks every subsequent interaction: catalog discovery, contract negotiation, data transfer.

Get onboarding wrong and everything downstream fails. Make it too complex and adoption stalls. Make it too loose and the trust model collapses.

## Two Phases

Onboarding has two distinct phases. They serve different purposes, involve different actors, and happen on different timescales.

### Legal Onboarding

This is the business and legislative process. The applicant demonstrates that they meet membership policies:

1. **Application** — the company applies to join, providing organizational data
2. **Evidence** — the company submits proof: commercial register excerpts, certifications, signed agreements
3. **Verification** — the DSGA (or its delegate) verifies the evidence against membership policies
4. **Approval** — the company is approved and receives an organizational identifier

The complexity varies enormously. A lightweight dataspace might automate this in minutes. A regulated industry consortium might require weeks of legal review and signed contracts.

What's consistent: legal onboarding produces a verified organizational identity and a governance commitment. The applicant is now approved to participate — but they can't do anything yet.

### Technical Onboarding

This is the infrastructure step. The approved applicant gets a running participant context:

1. **Provisioning** — a tenant and participant profile are created (via CFM or equivalent)
2. **Identity setup** — a DID is created and associated with the organizational identifier
3. **Credential issuance** — the Issuer Service issues a Membership Credential (and potentially other credentials)
4. **Credential delivery** — the credential is delivered to the participant's Identity Hub via DCP
5. **Activation** — the participant context is active and ready for dataspace interactions

In a DSaaS deployment, this phase is automated by CFM and completes in minutes. The CSP operates the infrastructure; the participant receives endpoints and credentials.

## The Actors

Four functional roles are involved in onboarding. The same organization can fill multiple roles.

| Role | What they do | Examples |
|---|---|---|
| **Applicant** | The company wanting to join | Any SME or enterprise |
| **Registration Service** | Facilitates the application, verifies compliance with membership policies | DSGA portal, onboarding service provider, managed service provider |
| **Credential Issuer** | Issues verifiable credentials to approved participants | DSGA issuer, external DTF issuer, CSP-operated Issuer Service |
| **CSP** | Operates the technical infrastructure, provisions participant contexts | Cloud provider running EDC + CFM |

These roles map to the IDSA Rulebook's participant, DSGA, and service provider concepts — they aren't new roles, they're functions within the existing model.

## Registration Service

The Registration Service is a DSGA function. It implements the workflow for evaluating membership applications. The IDSA Rulebook identifies it as a mandatory functional element of every dataspace.

What the Registration Service does:
- Accepts applications from prospective participants
- Collects required evidence (company data, documents, consents)
- Validates compliance with membership policies
- Triggers credential issuance upon approval
- Notifies the applicant of the outcome

What it does **not** do:
- It does not make runtime trust decisions — those happen peer-to-peer between Connectors
- It does not operate continuously — it's needed for onboarding, not for ongoing data sharing

The Registration Service can be operated by the DSGA itself, by a CSP on behalf of the DSGA, or by a dedicated onboarding service provider. The DSGA defines the rules; the operator implements the workflow.

## Issuer Service

The Issuer Service produces the verifiable credentials that make trust work. Without credentials, participants have no way to prove their attributes to each other.

In a running dataspace, the Issuer Service:
- Defines credential schemas (what types of credentials exist, what claims they contain)
- Issues signed Verifiable Credentials to approved participants
- Maintains status lists for revocation and suspension
- Delivers credentials to the participant's Identity Hub

The Issuer Service is not a runtime dependency. Once a credential is issued and stored in the participant's Identity Hub, the Issuer Service is no longer in the critical path. Participants present credentials peer-to-peer via DCP. The only ongoing role is revocation checks — and those are asynchronous.

For details on the Eclipse EDC Issuer Service component, see [Component: Issuer Service](../components/issuer-service.md).

## Onboarding Models

How onboarding is organized depends on the dataspace's governance model.

### Centralized Onboarding

A single Registration Service handles all applications. The DSGA or its operating company runs it.

- **Advantage**: simple, consistent enforcement of membership policies
- **Disadvantage**: single point of control, potential bottleneck
- **Example**: Cofinity-X operating the Onboarding API for Catena-X

### Decentralized Onboarding

No central onboarding entity. A prospective participant proves eligibility directly to existing participants by presenting credentials from trusted DTF issuers.

- **Advantage**: no central dependency, maximum autonomy
- **Disadvantage**: requires existing credentials from accepted issuers
- **Example**: a participant already holding a Gaia-X label and an industry certification joins a dataspace that accepts both

### Delegated Onboarding

The DSGA delegates onboarding to one or more service providers (managed service providers, onboarding service providers). Multiple providers can offer the same onboarding function.

- **Advantage**: scalability, competition between providers
- **Disadvantage**: coordination complexity, need for consistent policy enforcement
- **Example**: multiple MSPs offering onboarding to SMEs for the same dataspace

## Credential Acquisition

A participant may need credentials from multiple issuers to fully participate. The membership credential alone often isn't sufficient — dataspace policies may require industry certifications, jurisdictional attestations, or role credentials.

The IDSA Rulebook is clear on this: **the ultimate responsibility for maintaining credentials lies with the participant**. The onboarding service may coordinate with external DTF issuers, but the credential is issued to the participant. The participant's Identity Hub stores and presents it.

A participant may also already hold credentials from other dataspaces. If the DSGA accepts those issuers as trust anchors, the participant can reuse them — no re-issuance needed.

## What Varies by Dataspace

| Aspect | What varies |
|---|---|
| Who operates registration | DSGA, CSP, dedicated onboarding service provider |
| Who operates credential issuance | DSGA, CSP, external DTF issuer |
| What credentials are required | Membership, certifications, roles — defined by DSGA |
| What evidence is required | Company data, documents, signed contracts — defined by membership policies |
| Automation level | Fully automated (minutes) to manual (weeks) |
| Organizational identifier | BPN (Catena-X), LEI, DUNS, or DSGA-defined |

The onboarding design is a governance decision, not a technology decision. The technology (EDC, CFM, Issuer Service) supports all of these models. The DSGA chooses which model to use.

---

**Go deeper**: [IDSA Rulebook — Dataspace Membership](../reference/community.md) | [IDSA Rulebook — Data Space Participation](../reference/community.md) | [IDSA Rulebook — Onboarding Patterns](../reference/community.md)

**Related concepts**: [Roles and Participation](./roles-and-participation.md) | [Decentralized Identity](./decentralized-identity.md) | [Trust and Governance](./trust-and-governance.md) | [Data Sharing Lifecycle](./data-sharing-lifecycle.md)
