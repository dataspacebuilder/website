# Data Sharing Lifecycle

## Overview

Data sharing in a dataspace follows a structured lifecycle — from membership to discovery to negotiation to execution. Understanding this lifecycle is essential for designing governance frameworks, building applications, and operating dataspace infrastructure.

Every data sharing interaction is fundamentally **peer-to-peer** between two participants. All complex business scenarios involving multiple actors are composed from bilateral data contracts between pairs of participants.

## The Lifecycle Stages

```
Membership → Discovery → Negotiation → Agreement → Execution → Monitoring
```

### 1. Membership

Before any data sharing can happen, an organization must become a participant in the dataspace. Membership is technically expressed as a **credential** — a verifiable attestation that the organization has met the membership requirements.

The process to obtain this credential varies by dataspace:
- **Simple**: automated verification of a few attributes, credential issued in minutes
- **Complex**: legal agreements, compliance audits, human review, credential issued after weeks or months

What's consistent: the membership credential is what enables the participant to interact with others. It's the first policy check in almost every interaction.

On the business and legal layers, membership can involve signing contracts, joining associations, and agreeing to governance rules. The technical credential is the machine-readable representation of this commitment. For the full onboarding process that produces this credential, see [Onboarding and Registration](./onboarding-and-registration.md).

### 2. Discovery

Once a participant has joined, the next step is finding available data. This is the **catalog** function.

A data provider publishes **data contract offers (DCOs)** — metadata describing available data assets along with the terms under which they can be accessed. Each DCO includes:
- Metadata about the data asset (type, format, description)
- **Access policies** — who is allowed to see this offering
- **Contract policies** — what attributes are required to negotiate access

Discovery can happen through:
- **Decentralized catalogs** — each participant operates their own catalog; consumers query providers directly
- **Federated catalogs** — multiple participants synchronize catalog data
- **Centralized catalogs** — a single service aggregates offerings (simplest but introduces a central dependency)

Access policies are evaluated during discovery: a participant only sees offerings they're authorized to negotiate for. This follows the principle of minimal disclosure — you shouldn't know something exists if you can't possibly access it.

### 3. Negotiation

When a consumer finds a relevant offering, they initiate a **contract negotiation**. This is the core trust-establishing interaction in a dataspace.

During negotiation:
1. The consumer's Connector sends a negotiation request to the provider's Connector
2. The provider requests proof of the consumer's attributes (via DCP)
3. The consumer's Identity Hub assembles and presents the relevant credentials
4. The provider verifies the credentials cryptographically
5. The provider evaluates the verified attributes against the contract policies
6. If all policies are satisfied, a **contract agreement** is established

The contract agreement is a machine-enforceable record of what was agreed: which data, under what policies, between which parties.

**Important**: The negotiation does not automatically lead to an immediate data transfer. The agreement and the execution are separate — the agreement may be executed immediately, later, or multiple times.

Negotiation can range from fully automated (all policies are machine-evaluable) to human-involved (requiring legal review, manual approval, or external workflows). The protocol supports both.

### 4. Agreement

The **data contract agreement (DCA)** is the output of a successful negotiation. It records:
- The parties involved (provider and consumer)
- The data asset being shared
- The policies that were evaluated and satisfied
- Usage policies that apply after sharing
- Terms for the data transfer mechanism

The agreement is the authorization artifact that unlocks data flow. Without an agreement, no data moves.

### 5. Execution

When it's time to share data, the **data transfer** is initiated based on the contract agreement. This involves:

1. The Control Plane signals the Data Plane via DPS
2. The Data Plane sets up the transfer according to the agreed parameters
3. Data moves between the participants using the appropriate wire protocol

Transfer patterns include:
- **Pull** — the consumer fetches data from the provider (API access, on-demand queries)
- **Push** — the provider sends data to the consumer (batch exports, file transfers)
- **Stream** — continuous data flow until terminated (IoT, telemetry, real-time monitoring)

Before execution, policies may be re-evaluated — especially if significant time has passed since negotiation. For high-value or regulated data, re-verification of credentials and policy compliance is recommended.

### 6. Monitoring and Observability

Throughout the lifecycle, both participants maintain records of interactions:
- Negotiation history and outcomes
- Transfer execution logs
- Policy compliance evidence

This information supports:
- **Auditing** — proving that data was shared only with authorized parties under agreed terms
- **Billing** — tracking data sharing volume and frequency for commercial agreements
- **Compliance** — demonstrating adherence to regulatory requirements
- **Troubleshooting** — diagnosing failures in negotiation or transfer

In decentralized dataspaces, each participant keeps their own records. Observer participants (auditors) can request access to these records through standard data sharing contracts — applying the same trust model to observability data as to any other data.

## Policies at Each Stage

| Stage | Policy Type | Purpose |
|---|---|---|
| Membership | Membership policies | Who can join the dataspace |
| Discovery | Access policies | Who can see which offerings |
| Negotiation | Contract policies | What attributes are required for an agreement |
| Execution | Usage policies | How data can be used after sharing |
| Monitoring | Observability policies | Who can access audit data |

Each layer of policies builds on the previous one. The total set of policies (dataspace, participant, asset) forms the **trust context** governing a specific data sharing contract.

## Data Sharing Is Broad

"Data sharing" encompasses more than simple file transfer:
- One-time file transfers
- API access and on-demand queries
- Event subscriptions and notification streams
- Continuous data streaming
- Code-to-data scenarios (algorithms moved to data, not data moved to algorithms)

The dataspace protocols handle the trust, negotiation, and coordination regardless of the transfer mechanism. The wire protocol is determined by the data type and the agreed contract terms.

---

**Go deeper**: [IDSA Rulebook — Data Sharing](../reference/community.md) | [IDSA Rulebook — Membership](../reference/community.md) | [IDSA Rulebook — Creating a Data Space](../reference/community.md)

**Related concepts**: [Trust and Governance](./trust-and-governance.md) | [Protocols](./protocols.md) | [Roles and Participation](./roles-and-participation.md)
