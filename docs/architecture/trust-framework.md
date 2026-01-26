---
sidebar_position: 4
title: Trust Framework
description: Trust is not a feature—it's the reason dataspaces exist. This section explains how trust works, from policies to credentials to DTFs.
---

# Trust Framework

> "Establishing trust is the fundamental reason for data spaces to exist!" — IDSA Rulebook

Trust is not a feature added to dataspaces—it's the fundamental reason they exist. Organizations need to share data with parties they don't inherently trust. Dataspaces provide the infrastructure to establish, verify, and maintain trust throughout data exchange.

---

## What is Trust in Dataspaces?

Trust in dataspaces is fundamentally different from everyday notions of trust.

### What Trust is NOT

| NOT | Explanation |
|-----|-------------|
| **Global** | Each trust decision is local to one specific data sharing contract |
| **Transitive** | Trust between A→B doesn't mean B→C trusts A |
| **Reciprocal** | A trusting B doesn't require B to trust A |
| **Permanent** | Trust can be revoked at any time |
| **Equivalent to identity** | Identity is just one input to trust decisions |

### What Trust IS

Trust is a **situational, time-bound, purpose-specific assessment** derived from multiple inputs:

```
┌─────────────────────────────────────────────────────────────────┐
│                    TRUST INPUTS                                  │
├─────────────────────────────────────────────────────────────────┤
│  • Verifiable Claims (credentials with cryptographic proof)     │
│  • Declared Policies (what the participant promises)            │
│  • Observed Behavior (from prior interactions)                  │
│  • Third-party Assertions (from trust anchors/DTFs)             │
│  • Contextual Factors (purpose, jurisdiction, data category)    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ POLICY ENGINE   │  ← Runs in Control Plane
                    │ (Reconciliation)│
                    └────────┬────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ TRUST DECISION  │  Local, explicit, auditable
                    │ (Accept/Reject) │
                    └─────────────────┘
```

### The Trust Equation

```
TRUST = f(Claims, Policies, Context)

Where:
  Claims    = Verifiable credentials presented by the counterparty
  Policies  = Your rules for what's acceptable
  Context   = Purpose, jurisdiction, data sensitivity
```

---

## Trust Invariants

These principles must be upheld in all implementations (from IDSA Rulebook):

| Invariant | Description |
|-----------|-------------|
| **Local autonomy** | Each participant decides who to trust |
| **Explicit scope** | Trust is for specific contracts, not blanket |
| **Continuous re-evaluation** | Trust can be revoked at any time |
| **No mandatory central services** | Decentralized by design |
| **Membership ≠ trusted** | Being in a dataspace doesn't automatically mean trusted |

---

## The Trust Decision Process

```
┌─────────────────────────────────────────────────────────────────┐
│                    TRUST DECISION PROCESS                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Counterparty                      Your Connector               │
│   ┌─────────────┐                   ┌─────────────────────┐     │
│   │             │                   │                     │     │
│   │  Presents   │  ─── Claims ───▶  │  1. Verify claim    │     │
│   │  Credentials│                   │     signatures      │     │
│   │             │                   │                     │     │
│   └─────────────┘                   │  2. Check issuer    │     │
│                                     │     is trusted      │     │
│   ┌─────────────┐                   │                     │     │
│   │             │                   │  3. Match claims    │     │
│   │   Declares  │  ─── Offer ────▶  │     to policies     │     │
│   │   Policies  │                   │                     │     │
│   │             │                   │  4. Evaluate        │     │
│   └─────────────┘                   │     context         │     │
│                                     │                     │     │
│                                     │  5. Render          │     │
│                                     │     decision        │     │
│                                     │     ┌───────────┐   │     │
│                                     │     │ ACCEPT or │   │     │
│                                     │     │  REJECT   │   │     │
│                                     │     └───────────┘   │     │
│                                     └─────────────────────┘     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Decision Steps

1. **Verify claim signatures** — Cryptographically valid?
2. **Check issuer is trusted** — Is the issuer in our trust anchor list?
3. **Match claims to policies** — Do credentials satisfy our requirements?
4. **Evaluate context** — Purpose, jurisdiction, data sensitivity
5. **Render decision** — Accept or reject (logged for audit)

---

## Policies: The Language of Trust

Policies are machine-readable rules that encode trust requirements. There are four types, forming a hierarchy.

### The Policy Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                      POLICY HIERARCHY                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐     │
│  │              DATASPACE MEMBERSHIP POLICIES              │     │
│  │  "Who can join this dataspace?"                        │     │
│  │  • Industry association membership                     │     │
│  │  • Jurisdiction requirements                           │     │
│  │  • Technical capability proofs                         │     │
│  └────────────────────────────────────────────────────────┘     │
│                              │                                   │
│                              ▼                                   │
│  ┌────────────────────────────────────────────────────────┐     │
│  │                    ACCESS POLICIES                      │     │
│  │  "Who can see that this data exists?"                  │     │
│  │  • Catalog visibility rules                            │     │
│  │  • Segment-specific access                             │     │
│  └────────────────────────────────────────────────────────┘     │
│                              │                                   │
│                              ▼                                   │
│  ┌────────────────────────────────────────────────────────┐     │
│  │                   CONTRACT POLICIES                     │     │
│  │  "What terms must be agreed for sharing?"              │     │
│  │  • Data usage restrictions                             │     │
│  │  • Technical requirements (encryption, location)       │     │
│  │  • Commercial terms                                    │     │
│  └────────────────────────────────────────────────────────┘     │
│                              │                                   │
│                              ▼                                   │
│  ┌────────────────────────────────────────────────────────┐     │
│  │                    USAGE POLICIES                       │     │
│  │  "How can the data be used after sharing?"             │     │
│  │  • Retention limits                                    │     │
│  │  • Processing restrictions                             │     │
│  │  • Onward sharing rules                                │     │
│  └────────────────────────────────────────────────────────┘     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Policy Types Explained

#### Membership Policies

**Question:** Who can join this dataspace?

**Examples:**
- Must be a registered company in the EU
- Must have ISO 27001 certification
- Must be a member of industry association X

**Enforcement:** At onboarding time by DSGA/CFM

#### Access Policies

**Question:** Who can see that this data exists?

**Examples:**
- Only dataspace members can see catalog
- Only suppliers can see supply chain data
- Only emergency responders can see emergency data

**Enforcement:** At catalog query time by Control Plane

#### Contract Policies

**Question:** What terms must be agreed for sharing?

**Examples:**
- Data can only be used for quality assurance
- Data must be encrypted in transit and at rest
- Data processing must occur within EU

**Enforcement:** At negotiation time by Control Plane

#### Usage Policies

**Question:** How can the data be used after sharing?

**Examples:**
- Data must be deleted after 30 days
- Data cannot be used to train ML models
- Data cannot be shared with third parties

**Enforcement:** Post-transfer (monitoring, audit)

### Where Policies are Enforced

| Policy Type | Where Evaluated | When | Component |
|-------------|-----------------|------|-----------|
| Membership | Onboarding time | Provisioning | DSGA services / CFM |
| Access | Catalog query time | Discovery | Control Plane VPA |
| Contract | Negotiation time | Agreement | Control Plane VPA |
| Usage | Transfer/post-transfer | Execution | Data Plane VPA / Monitoring |

### Policy Examples (ODRL)

```json
{
  "@type": "PolicyDefinition",
  "@id": "policy-eu-members-only",
  "policy": {
    "permission": [{
      "action": "use",
      "constraint": [{
        "leftOperand": "MembershipCredential",
        "operator": "eq",
        "rightOperand": "active"
      }, {
        "leftOperand": "jurisdiction",
        "operator": "in",
        "rightOperand": ["EU", "EEA"]
      }]
    }],
    "prohibition": [{
      "action": "distribute"
    }]
  }
}
```

---

## Credentials & Claims

### Verifiable Credentials (VCs)

Digital equivalents of certificates and attestations:

| Property | Description |
|----------|-------------|
| **Cryptographically signed** | By issuers, cannot be forged |
| **Tamper-evident** | Any modification invalidates signature |
| **Machine-verifiable** | Automated verification without contacting issuer |
| **Revocable** | Issuers can revoke when needed |
| **Selective disclosure** | Show only what's needed |

### Trust Anchors

Organizations authorized to issue credentials for a dataspace:

| Type | Examples |
|------|----------|
| **Industry associations** | Catena-X, Manufacturing-X |
| **Certification bodies** | TÜV, ISO certification bodies |
| **Government agencies** | Regulatory bodies |
| **Dataspace operators** | DSGA entity |

Each dataspace/DTF defines which anchors it trusts.

### Credential Lifecycle

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

---

## Dataspace Trust Frameworks (DTFs)

A Dataspace Trust Framework is a complete specification for trust in a dataspace:

### What a DTF Contains

| Component | Description |
|-----------|-------------|
| **Policies** | What attributes are required for trust |
| **Credential schemas** | Structure of accepted credentials |
| **Issuer registry** | Accepted trust anchors |
| **Reconciliation mechanisms** | How claims are evaluated against policies |
| **Business processes** | Membership, disputes, governance |

### Common DTFs

| DTF | Domain |
|-----|--------|
| **Gaia-X Trust Framework** | European cloud and data infrastructure |
| **iSHARE** | Dutch logistics and data sharing |
| **Catena-X Trust Framework** | Automotive supply chain |
| **Manufacturing-X Trust Framework** | Industrial manufacturing |

### How DTFs Map to CFM Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    DATASPACE TRUST FRAMEWORK (DTF)                       │
│                      (External to Runtime)                               │
├─────────────────────────────────────────────────────────────────────────┤
│  • Gaia-X Trust Framework                                                │
│  • Catena-X Trust Framework                                              │
│  • Manufacturing-X Trust Framework                                       │
│  • Custom Industry DTFs                                                  │
└─────────────────────────────────────────────────────────────────────────┘
                              │
              Defines accepted credential types,
              issuers, and policy semantics
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    CFM: Tenant/Participant Configuration                 │
├─────────────────────────────────────────────────────────────────────────┤
│  ParticipantProfile                                                      │
│  ├── DID: did:web:tenant-a.example.com                                  │
│  ├── DataspaceProfiles[]                                                │
│  │   ├── catena-x:                                                      │
│  │   │   ├── membership_credential: vc:catena-x:membership:...          │
│  │   │   ├── accepted_policies: [catena-x-policy-v2.0]                  │
│  │   │   └── protocol_version: DSP 2024-1                               │
│  │   └── manufacturing-x:                                               │
│  │       ├── membership_credential: vc:manuf-x:membership:...           │
│  │       └── ...                                                         │
│  └── VPAs[]                                                              │
│      ├── cp-vpa-1 (Control Plane)                                       │
│      ├── dp-vpa-1 (Data Plane)                                          │
│      └── ih-vpa-1 (Identity Hub)                                        │
└─────────────────────────────────────────────────────────────────────────┘
                              │
              VPAs provisioned with DTF-specific configuration
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    Runtime: Trust Evaluation                             │
├─────────────────────────────────────────────────────────────────────────┤
│  Control Plane VPA evaluates:                                            │
│  1. Is incoming request from a valid dataspace participant?             │
│  2. Do their credentials match our access policies?                     │
│  3. Do contract terms align with our policies?                          │
│  4. Are credential issuers in our accepted trust anchor list?           │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Trust in Multi-Tenant Deployments

**The Key Question:** Does sharing infrastructure with other tenants compromise my trust relationships?

**Answer:** No. Trust isolation is configuration-based, not process-based.

```
┌─────────────────────────────────────────────────────────────────┐
│             TRUST ISOLATION IN CFM-MANAGED DEPLOYMENTS           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Tenant A (Company A)              Tenant B (Company B)         │
│   ┌─────────────────────┐          ┌─────────────────────┐      │
│   │                     │          │                     │      │
│   │  DID: did:web:a.com │          │  DID: did:web:b.com │      │
│   │                     │          │                     │      │
│   │  Credentials:       │          │  Credentials:       │      │
│   │  • Catena-X member  │          │  • Manuf-X member   │      │
│   │  • ISO 27001 cert   │          │  • Gaia-X compliant │      │
│   │                     │          │                     │      │
│   │  Policies:          │          │  Policies:          │      │
│   │  • Require supplier │          │  • Require EU       │      │
│   │    credential       │          │    jurisdiction     │      │
│   │                     │          │                     │      │
│   │  Vault Path:        │          │  Vault Path:        │      │
│   │  /tenants/a/creds   │          │  /tenants/b/creds   │      │
│   │                     │          │                     │      │
│   └─────────────────────┘          └─────────────────────┘      │
│            │                                │                    │
│            │      SHARED RUNTIME            │                    │
│            │   (EDC-V Control Plane)        │                    │
│            │   ┌───────────────────────┐    │                    │
│            └──▶│ Request comes in with │◀───┘                    │
│                │ context header        │                         │
│                │                       │                         │
│                │ Runtime loads:        │                         │
│                │ • Correct DID         │                         │
│                │ • Correct credentials │                         │
│                │ • Correct policies    │                         │
│                │                       │                         │
│                │ ISOLATED EVALUATION   │                         │
│                └───────────────────────┘                         │
│                                                                  │
│   ✓ A's credentials never visible to B's evaluation             │
│   ✓ B's policies never applied to A's negotiations              │
│   ✓ Shared compute, isolated trust contexts                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### What's Isolated Per VPA

| Aspect | Isolation Method |
|--------|------------------|
| **DID** | Each VPA has its own DID |
| **Credentials** | Separate Vault paths/namespaces |
| **Policies** | Per-VPA policy definitions |
| **Catalog** | Per-VPA catalog entries |
| **Contracts** | Per-VPA contract agreements |

---

## Trust Flow in Data Sharing

The complete trust flow from discovery to transfer:

```
┌─────────────────────────────────────────────────────────────────┐
│                    TRUST FLOW: DATA SHARING                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. DISCOVERY                                                    │
│     Consumer queries Provider's catalog                          │
│     └─▶ Access Policy evaluated against Consumer's credentials  │
│                                                                  │
│  2. CREDENTIAL EXCHANGE (DCP)                                    │
│     Parties exchange verifiable presentations                    │
│     └─▶ Each side verifies issuer signatures                    │
│     └─▶ Each side checks issuer is in trusted list              │
│                                                                  │
│  3. CONTRACT NEGOTIATION (DSP)                                   │
│     Provider offers, Consumer counter-offers                     │
│     └─▶ Contract Policy matching                                │
│     └─▶ Agreement on terms                                      │
│                                                                  │
│  4. CONTRACT AGREEMENT                                           │
│     Both parties sign agreement                                  │
│     └─▶ Trust established for THIS contract                     │
│     └─▶ Not permanent, not transferable                         │
│                                                                  │
│  5. DATA TRANSFER                                                │
│     Data Plane executes transfer                                 │
│     └─▶ No trust logic in data plane                            │
│     └─▶ Just executes what Control Plane agreed                 │
│                                                                  │
│  6. USAGE MONITORING (Optional)                                  │
│     Post-transfer policy enforcement                             │
│     └─▶ Logging for audit                                       │
│     └─▶ Usage policy compliance                                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Control Plane vs Data Plane: Trust Separation

A core architectural principle:

| Aspect | Control Plane | Data Plane |
|--------|---------------|------------|
| **Trust logic** | YES | NO |
| **Policy evaluation** | YES | NO |
| **Credential verification** | YES | NO |
| **Contract negotiation** | YES | NO |
| **Data transfer** | NO | YES |
| **Transfer monitoring** | Orchestration | Execution |

This separation enables the Data Plane to be highly optimized for throughput without trust overhead.

---

## Implementing a Governance Authority (DSGA)

For DSaaS providers who want to implement governance authority functions:

### DSGA Functions in CFM Architecture

| Function | Where Implemented |
|----------|-------------------|
| Membership policy definition | DTF configuration |
| Trust anchor registry | CFM Tenant Manager / external service |
| Credential issuance | Issuer Service VPA |
| Policy enforcement | Control Plane VPAs |
| Dispute resolution | External process (out of scope) |

### Adding New Trust Frameworks

1. **Define credential schemas** — What credentials are accepted
2. **Register trust anchors** — Who can issue those credentials
3. **Configure policy evaluation** — How claims map to access decisions
4. **Provision DTF-specific dataspace profiles** — Per-participant configuration

---

## What's Next

- **[Overview](/docs/architecture/overview)** — Why dataspaces exist
- **[Participants & Identity](/docs/architecture/core-concepts/participants-identity)** — DIDs, VCs, Trust Anchors
- **[Components Deep Dive](/docs/architecture/components)** — Where trust is implemented
- **[Protocols](/docs/architecture/protocols)** — DSP and DCP specifications
