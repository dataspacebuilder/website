# Trust and Governance

## Why Trust Matters

Before sharing comes trust. Without trust, the risk of something going wrong seems too high and unmanageable. Creating trust reduces risk. Reduced risk lowers the barrier for sharing data. Lower barriers unlock value.

Dataspaces create context-specific trust where trust did not exist before — or where it is difficult to establish, for example between competitors. This is the fundamental reason dataspaces exist.

## What Trust Is in a Dataspace

Trust in a decentralized dataspace is a **situational, time-bound, and purpose-specific** assessment of whether another participant can be relied upon to act within declared constraints for a specific interaction.

Trust is:

- **Not global** — each decision to trust is local to one specific data sharing contract
- **Not transitive** — trust between A and B does not imply trust between B and C
- **Not reciprocal** — if A decides to trust B, it doesn't mean B must trust A
- **Not permanent** — trust decisions can change when prerequisites change
- **Not equivalent to identity** — identity, certification, and prior membership are *inputs* to trust, not trust itself

### Trust Is a Runtime Property

Trust exists only while its assumptions hold. There is no concept of "once trusted, always trusted."

- Trust can be continuously re-evaluated for long-running interactions
- Material changes in claims, policies, context, or behavior should trigger re-evaluation
- Cached trust decisions should have explicit validity bounds

## Attribute-Based Trust

Dataspaces use **attribute-based trust** — a model where trustworthiness is determined by evaluating specific attributes rather than relying on a fixed identity or platform account.

The mechanism is straightforward:

1. A participant holds a collection of **attributes** (expressed as verifiable credentials)
2. A data sharing contract contains a collection of **policies** (rules that must be satisfied)
3. When negotiating a contract, **attributes are matched to policies**

If a sufficient set of policies is satisfied by the presented attributes, trust is established for that specific interaction.

Attributes can represent:
- Membership in a dataspace or industry association
- Jurisdictional information (headquarter location, operating region)
- Certifications (ISO 27001, GDPR compliance attestations)
- Technical capabilities (supported encryption, protocols)
- Any custom attribute the governance framework defines

## Claims and Credentials

**Attributes** describe a participant. They are presented as **claims**. A claim is a **credential** that can be verified cryptographically — proving it was issued by a specific party (the trust anchor) and has not been tampered with.

> If a verified claim and its trust anchor are accepted, evidence about the attribute has been established.

**Trust anchors** are entities that issue credentials about attributes. They are trusted because of the processes and rules they enforce when issuing credentials — similar to how a government is trusted to issue passports because of the verification processes behind them.

Digital credentials have an advantage over analog equivalents: they can be cryptographically verified as authentic or fake, without contacting the issuer every time.

## Policies

Policies are the rules by which trust boundaries are established. They operate at multiple levels:

### Membership Policies
The first layer. They determine who can join a dataspace. Requirements might include: headquarter location, industry certification, membership in an association, signed legal agreements.

### Access Policies
They control which catalog items a participant can see. A participant should only discover data offerings they're authorized to negotiate for. Common filters include membership credentials, specific roles, geographic restrictions, or time-based availability.

### Contract Policies
They define what attributes are needed for a data sharing agreement. This can range from simple technical requirements (specific encryption) to complex workflows requiring human approval or external legal contracts.

### Usage Policies
They control how data can be used after sharing. Enforcement ranges from honor-based (low-value data) to technical enforcement (high-value or regulated data). The appropriate level depends on data classification and risk tolerance.

### Policies for Segmentation
Policies act as filters to create precise trust contexts. Adding a single policy that checks for a specific group credential restricts a contract to that group. This enables segmentation by: dataspace, business use case, individual participants, technologies, geography, industry associations, security certifications — and more.

## Dataspace Trust Frameworks (DTFs)

A **Dataspace Trust Framework** consists of:
- A set of policies and reconciliation mechanisms for claims
- Business process definitions that enable participants to establish trust
- Rules about accepted credential issuers (trust anchors)

DTFs treat trust as a dynamic runtime property, not a static certification. They define *what evidence is acceptable* and *how policies are evaluated*.

DTFs can be composed hierarchically — a DSGA can reference multiple DTFs, each addressing different aspects of trust (e.g., one for identity verification, another for industry certification, another for data handling standards).

### Trust Establishment Process

1. **Claim issuance and verification** — participants issue claims about themselves; verification occurs via cryptographic proofs without central authorities
2. **Policy alignment** — policies are expressed as logical constraints; reconciliation finds mutually acceptable terms through negotiation
3. **Runtime monitoring** — trust is maintained through continuous monitoring of invariants; violations trigger automatic revocation or escalation

### Failure Modes

DTFs must handle:
- **Policy incompatibility** — if reconciliation fails, interactions are aborted with clear error codes
- **Claim compromise** — detected via integrity checks; compromised claims invalidate trust chains
- **Stale trust** — long-lived processes must re-evaluate trust periodically

## Dataspace Governance Authority (DSGA)

The **DSGA** is a functional role responsible for:
- Defining the governance framework for the dataspace
- Specifying which DTFs are used
- Defining business processes, policies, and semantic models
- Ensuring interoperability through minimal shared semantics

### What the DSGA Is Not

- **Not a runtime enforcement layer** — it defines the model; enforcement is performed by participants
- **Not necessarily a legal entity** — it's a collection of information about the governance model
- **Not an operator** — service providers may operate services on behalf of the DSGA, but they are not the DSGA

### Core Principle: Decentralization

A DSGA should not prescribe mandatory central services or federations. It applies to all participants equally and defers enforcement to the participants themselves.

### Implementation Models

- **By the participants** — each participant has full knowledge of the DSGA and enforces rules locally
- **By service providers** — multiple providers operate services that support governance enforcement; participants choose which to use
- **By an operations company** — the most centralized model; a single entity provides mandatory services (least recommended, as it creates single points of failure)

## Separation of Concerns

Trust assessment is confined to the **control plane**. The data plane is agnostic to trust logic. Trust decisions influence *if, when, and how* data plane interactions are initiated — but the data plane itself does not evaluate trust.

This separation ensures that trust logic can evolve independently of data transfer mechanisms, and that data planes can be deployed, scaled, and swapped without affecting the trust model.

---

**Go deeper**: [IDSA Rulebook — Trust](../reference/community.md) | [IDSA Rulebook — Dataspace Trust Frameworks](../reference/community.md) | [IDSA Rulebook — DSGA](../reference/community.md)

**Related concepts**: [Decentralized Identity](./decentralized-identity.md) | [Protocols](./protocols.md) | [Data Sharing Lifecycle](./data-sharing-lifecycle.md)
