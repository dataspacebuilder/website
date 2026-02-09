---
sidebar_position: 1
title: Overview
description: Dataspaces exist because organizations need to share data with parties they don't inherently trust. Trust isn't assumed—it's established, verified, and can be revoked.
---

# Overview

> "Establishing trust is the fundamental reason for data spaces to exist!" — IDSA Rulebook

**Dataspaces exist because organizations need to share data with parties they don't inherently trust.** Trust isn't assumed—it's established, verified, and can be revoked. This is the fundamental value proposition of dataspaces.

A **dataspace** is a *context* between one or more *participants* that share data. Participants are typically organizations, but can be any entity such as a service or machine. Dataspaces are **distributed, industry-wide zero-trust architectures** for trusted, policy-controlled data sharing—built on open standards and open-source components, enabling sovereign data exchange without central platforms or vendor lock-in.

> "There is no such thing as a 'centralized dataspace' or 'decentralized dataspace'—there is only **distributed data sharing infrastructure** with centralized, federated, or decentralized **use case patterns**."

---

## Why Dataspaces Exist: The Trust Problem

Organizations have valuable data they could share—with suppliers, customers, regulators, and partners. But sharing requires trusting the recipient. Traditional trust models don't scale:

| Traditional Approach | Problem |
|---------------------|---------|
| **Contracts and lawyers** | Slow, expensive, don't enforce compliance |
| **Personal relationships** | Don't scale, key-person dependencies |
| **Centralized platforms** | Create vendor lock-in, concentrate control |
| **Point-to-point integrations** | Expensive, brittle, no standardization |

### The Dataspace Solution

Dataspaces solve the trust problem through **cryptographically verifiable credentials**:

1. **Trust is established** by matching claims (credentials issued by trusted authorities) against policies (your rules for acceptable partners)
2. **Trust is verified** automatically—no manual checks, no phone calls, no paperwork
3. **Trust can be revoked** at any time—credentials expire, get revoked, policies change
4. **Infrastructure ensures** trust is maintained throughout the data exchange

### The Distributed Zero-Trust Fabric

Every participant runs their own infrastructure (or delegates to a DSaaS provider). Trust is established per-interaction through verifiable credentials. There's no single point of control, failure, or trust.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DISTRIBUTED ZERO-TRUST FABRIC                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Every participant runs their own infrastructure (or delegated to DSaaS)   │
│   Trust is established per-interaction through verifiable credentials       │
│   No single point of control, failure, or trust                             │
│                                                                              │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│   │Participant A│  │Participant B│  │Participant C│  │Participant N│       │
│   │             │  │             │  │             │  │             │       │
│   │ ┌─────────┐ │  │ ┌─────────┐ │  │ ┌─────────┐ │  │ ┌─────────┐ │       │
│   │ │  Stack  │ │  │ │  Stack  │ │  │ │  Stack  │ │  │ │  Stack  │ │       │
│   │ └─────────┘ │  │ └─────────┘ │  │ └─────────┘ │  │ └─────────┘ │       │
│   └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘       │
│          ↕                ↕                ↕                ↕               │
│   ═══════════════════════════════════════════════════════════════════════  │
│                     Peer-to-Peer Trusted Data Exchange                      │
│                     (DSP, DCP, DPS, Wire Protocols)                         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## The Three Layers of Dataspaces

```
┌─────────────────────────────────────────────────────────────────┐
│                    LEGISLATIVE LAYER                            │
│         Governance • Compliance • Legal Contracts               │
│    (DSGA rules, regulatory requirements, jurisdiction)          │
├─────────────────────────────────────────────────────────────────┤
│                     ECONOMIC LAYER                              │
│          Business Roles • Value Creation • Processes            │
│    (Provider, Consumer, Marketplace, Intermediary)              │
├─────────────────────────────────────────────────────────────────┤
│                    TECHNICAL LAYER                              │
│          Protocols • Components • Infrastructure                │
│    (DSP, DCP, Connectors, Identity Hub, VPAs, Cells)           │
└─────────────────────────────────────────────────────────────────┘
```

**Critical Insight:** At the technical layer, there is only **one role: Participant**. All business roles (provider, consumer, auditor, marketplace) are specializations implemented through the participant role.

---

## Core Functions

Dataspace infrastructure provides seven core functions. Each function maps to specific components and enables specific capabilities:

| Function | Purpose | Component | Protocol |
|----------|---------|-----------|----------|
| **Credential Issuance** | Issue and manage verifiable credentials | Credential Service | DCP |
| **Discovery** | Find participants, assets, and contract offers | Control Plane | DSP |
| **Contract Negotiation** | Establish agreements with credential verification | Control Plane | DSP |
| **Push Transfer** | Provider-initiated data delivery | Data Plane | DPS + Wire |
| **Pull Transfer** | Consumer-initiated data access | Data Plane | DPS + Wire |
| **Stream Transfer** | Continuous, non-finite data flows | Data Plane | DPS + Wire |
| **Service Access** | Expose backend services (APIs, resources) with controlled access | Data Plane | DPS + Wire |

These functions map to the component architecture:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           FUNCTION → COMPONENT MAPPING                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   TRUST FRAMEWORK                        CREDENTIAL SERVICE                  │
│   ┌──────────────────────┐               ┌──────────────────────┐           │
│   │ • Governance rules   │ ────────────▶ │ • Credential issuance│           │
│   │ • Issuer registry    │               │ • Revocation lists   │           │
│   │ • Credential schemas │               │ • Status management  │           │
│   └──────────────────────┘               └──────────────────────┘           │
│                                                   │                          │
│                                                   ▼                          │
│   POLICY DECISIONS                         CONTROL PLANE                     │
│   ┌──────────────────────┐               ┌──────────────────────┐           │
│   │ • Access policies    │ ────────────▶ │ • Discovery (catalog)│           │
│   │ • Contract policies  │               │ • Contract negotiation│          │
│   │ • Usage constraints  │               │ • Credential verification│       │
│   └──────────────────────┘               └──────────────────────┘           │
│                                                   │                          │
│                                                   ▼                          │
│   DATA (SERVICE) ACCESS                       DATA PLANE                    │
│   ┌──────────────────────┐               ┌──────────────────────┐           │
│   │ • Push transfers     │ ────────────▶ │ • Transfer execution │           │
│   │ • Pull transfers     │               │ • Protocol adapters  │           │
│   │ • Stream transfers   │               │ • Service exposure   │           │
│   │ • Service access     │               │ • Sub-permissioning  │           │
│   └──────────────────────┘               └──────────────────────┘           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## What Dataspaces Provide

### Data Sovereignty
Data providers maintain control over their data. They define who can access it, under what conditions, and for what purposes. Data doesn't flow through intermediaries—it flows peer-to-peer.

### Automated Trust
Trust between parties is established through verifiable credentials—machine-readable proofs of identity, certifications, and roles. No manual verification, no phone calls, no paperwork.

### Policy Enforcement
Access rules are defined as machine-readable policies and enforced automatically. Before any data moves, contracts are negotiated and terms are agreed.

### Interoperability
Standard protocols (DSP, DCP) ensure that different implementations can work together. A connector from one vendor can negotiate with a connector from another.

### Decentralization
No central authority controls all data. Governance is defined by the community, and participants retain autonomy over their infrastructure.

---

## What Dataspaces Are Not

Dataspaces are not a traditional, all-inclusive platform. They operate at the data exchange level rather than providing complete applications.

| Misconception | Reality |
|--------------|---------|
| **Store your data centrally** | Data remains where it is—in your systems, your cloud, your data centers |
| **Replace your existing systems** | ERP, MES, databases continue to operate; connectors integrate with them |
| **Provide business applications** | Dataspaces are infrastructure; applications are built on top |
| **Dictate governance** | Each dataspace defines its own rules through trust frameworks |
| **Require specific infrastructure** | Run connectors in the cloud, on-premises, or at the edge |
| **Eliminate legal agreements** | Technical contracts complement, but don't replace, legal agreements |

---

## How Trust Works in Dataspaces

Trust in dataspaces is **situational, time-bound, and purpose-specific**. It's not global, not transitive, and not permanent.

```
┌─────────────────────────────────────────────────────────────────┐
│                    TRUST INPUTS                                  │
├─────────────────────────────────────────────────────────────────┤
│  • Verifiable Claims (credentials with cryptographic proof)     │
│  • Declared Policies (what the participant promises)            │
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

### The Passport Analogy

| Real World | Dataspace |
|------------|-----------|
| Passport | Verifiable Credential |
| Government issuing passport | Trust Anchor / Credential Issuer |
| Country's entry requirements | Policies |
| Border control checking passport | Control Plane policy evaluation |
| You don't show your passport to every person you meet | Access policies control who sees your catalog |

---

## Core Concepts

### Participants and Identity

A **participant** has a single identity in a dataspace, typically a **Web DID** (Decentralized Identifier). All components operated by an organization use the same participant ID.

| Scenario | Identity Setup |
|----------|----------------|
| Single deployment | One connector, one identity |
| Clustered deployment | Multiple instances, same identity |
| Distributed deployment | Multiple management domains, same identity |
| Multiple operating units | Each unit is a separate participant with distinct identity |

### Connectors and Participant Agents

Every organization runs a **connector**—the software component that implements dataspace protocols. An EDC component (control plane, data plane) acts as a **participant agent**—a system that runs on behalf of a participant.

### Policies and Contracts

**Policies** are machine-readable rules (expressed in ODRL) that govern access:

| Policy Type | Question | When Evaluated |
|-------------|----------|----------------|
| **Membership** | Who can join this dataspace? | Onboarding |
| **Access** | Who can see that this data exists? | Catalog query |
| **Contract** | What terms must be agreed for sharing? | Negotiation |
| **Usage** | How can the data be used after sharing? | Post-transfer |

Before data moves, connectors negotiate and agree on terms, creating a **contract agreement** that grants access under defined conditions.

### Protocols

Three standard protocols enable interoperability:

| Protocol | Purpose |
|----------|---------|
| **Dataspace Protocol (DSP)** | Catalog discovery, contract negotiation, transfer initiation |
| **Decentralized Claims Protocol (DCP)** | Credential presentation and verification |
| **Data Plane Signaling (DPS)** | Control plane to data plane coordination |

---

## Architecture at a Glance

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           DATASPACE FABRIC                              │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                    Connector Fabric Manager                       │  │
│  │            Tenant Management • Provisioning • Orchestration       │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                    │                                    │
│                           ┌────────▼────────┐                          │
│                           │   EDC-V Runtime  │                          │
│                           │  (Virtualized)   │                          │
│                           └────────┬────────┘                          │
│            ┌───────────────────────┼───────────────────────┐           │
│            │                       │                       │           │
│     ┌──────▼──────┐        ┌───────▼───────┐       ┌───────▼───────┐   │
│     │   Identity  │        │    Control    │       │     Data      │   │
│     │     Hub     │        │     Plane     │       │     Plane     │   │
│     │  (DIDs, VCs)│        │ (Catalog,     │       │  (Transfer    │   │
│     │  TRUST      │        │  Negotiation) │       │   Execution)  │   │
│     │  STORE      │        │  TRUST        │       │  TRUST-       │   │
│     │             │        │  DECISIONS    │       │  AGNOSTIC     │   │
│     └─────────────┘        └───────────────┘       └───────────────┘   │
│                                                                        │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │                   Trust Framework Layer                         │   │
│  │     Dataspace Trust Frameworks • Credential Issuers • Policies  │   │
│  └────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

### Where Trust Lives

| Component | Trust Role | Protocols | Key Functions |
|-----------|------------|-----------|---------------|
| **Credential Service** | Trust Store | DCP | Credential storage, presentation, verification |
| **Control Plane** | Trust Decisions | DSP | Catalog, negotiation, policy enforcement |
| **Data Plane** | Trust-Agnostic | DPS + Wire | Transfer execution, service access |
| **Applications** | Trust-Aware | Management API | Business logic, user interfaces |
| **CFM** | Provisions trust infrastructure | N/A | NOT involved in runtime decisions |

---

## Architecture Variations

While the core components remain consistent, deployment models vary:

| Model | Description |
|-------|-------------|
| **Single-tenant** | One connector per organization, full control |
| **Multi-tenant (EDC-V)** | Shared control plane, isolated contexts via VPAs |
| **Edge** | Data planes close to data sources |
| **Hybrid** | Mix of cloud, on-premises, and edge |

The **Connector Fabric Manager (CFM)** enables efficient multi-tenant operation through:

- **Service Virtualization**—configuration-based isolation, not process-based
- **Virtual Participant Agents (VPAs)**—units of deployment that can be provisioned and migrated
- **Cells**—homogeneous deployment zones for scalability

---

## Historical Context

### The Rise of Data Sovereignty

European regulation—GDPR, the Data Act, Digital Product Passport requirements—established that organizations must control how their data is used. This created demand for architectures that enforce sovereignty technically, not just contractually.

### The Dataspace Movement

Industry consortia and initiatives converged on a common pattern:

- **Catena-X** operates a live automotive supply chain dataspace
- **Manufacturing-X** is deploying industrial data sharing
- **Gaia-X** established trust framework foundations
- **European Cloud Accelerator** is enabling dataspace-as-a-service

The Eclipse Dataspace Components (EDC) emerged as the leading open-source implementation.

---

## What's Next

- **[Understanding the Stack](/docs/architecture/understanding-the-stack)** — Traditional vs. Modern architecture and why CFM exists
- **[Trust Framework](/docs/architecture/trust-framework)** — Deep dive into how trust works in dataspaces
- **[Core Concepts](/docs/architecture/core-concepts)** — VPAs, Cells, and Service Virtualization
- **[Components Deep Dive](/docs/architecture/components)** — CFM, Identity Hub, Control Plane, Data Plane
- **[Protocols](/docs/architecture/protocols)** — DSP, DCP, and DPS specifications
- **[Deployment Models](/docs/architecture/deployment-topologies)** — Cloud, edge, and multi-tenant options
