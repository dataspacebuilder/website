---
slug: what-are-dataspaces-plain-language
title: What Are Data Spaces? A Plain-Language Guide for Technical Leaders
authors: [jvanderberg]
tags: [getting-started]
description: A jargon-free explanation of dataspaces for CTOs, architects, and technical decision makers evaluating the technology.
image: /img/guides/what-are-dataspaces.jpeg
---

You've heard "dataspace" in meetings, seen it in EU policy documents, maybe noticed it in vendor pitches. But what actually is it? This guide explains dataspaces in practical terms — what problems they solve, how they work, and why they're different from what came before.

<!-- truncate -->

## The Problem in One Sentence

**Organizations need to share data with partners, but current approaches don't scale and don't enforce agreements.**

Let's unpack that.

## Why Traditional Data Sharing Fails

### Point-to-Point Integration

You want to share inventory data with a supplier. Today, you:

1. Sign a contract (lawyers, weeks)
2. Exchange API credentials (IT tickets, days)
3. Build a custom integration (developers, weeks)
4. Test and deploy (more weeks)
5. Repeat for every supplier

This works for 5 partners. It doesn't work for 500.

### The Trust Problem

When your supplier's system connects to your API, how do you verify:
- They are who they claim to be?
- They're using the data as agreed?
- Their employee accessing the data is authorized?

You don't. You trust. And hope.

### Paper Agreements, Digital Reality

You sign a contract saying "data may only be used for X purpose, for Y duration." But your API doesn't know about that contract. It can't enforce those terms. The agreement is legally binding but technically unenforceable.

## What a Dataspace Actually Is

A dataspace is **a way for organizations to share data where trust is automated and agreements are enforced**.

Three key ideas:

### 1. Decentralized, Not Centralized

Data doesn't go through a central platform. There's no "data lake in the cloud" that everyone uploads to. Instead:

- Your data stays in your systems
- When someone needs it, they negotiate access
- Data flows directly between parties (peer-to-peer)

You maintain control. Always.

### 2. Trust Through Verification

Instead of trusting that a partner is who they claim:

- Partners have **Decentralized Identifiers (DIDs)** — cryptographically verifiable identity
- Partners carry **Verifiable Credentials** — digital proofs of attributes (certifications, memberships, roles)
- Before any data flows, your system verifies these credentials automatically

No phone calls. No "can you send me your certificate?" emails. Math.

### 3. Agreements Are Executable

When you and a partner agree on terms:

- The agreement is captured in a **machine-readable format**
- Both systems record the agreement
- Access is granted (or denied) based on what was agreed
- Every interaction is logged for audit

The contract isn't just a PDF in a filing cabinet. It's active policy that governs behavior.

## The Technical Architecture

Dataspaces are built on a layered architecture:

### Trust Framework
Who defines the rules? Which credentials are accepted? Who can issue them?

This is governance — typically defined by an industry consortium (like Catena-X for automotive) or a regulatory body.

### Identity Layer
How do organizations prove who they are?

Using **Decentralized Identifiers (DIDs)** and **Verifiable Credentials (VCs)**, based on W3C standards. Each organization has a "wallet" (Identity Hub) storing their credentials.

### Control Plane
How do organizations discover data and agree on terms?

Through the **Dataspace Protocol (DSP)**:
- **Catalog** — Browse available data offerings
- **Contract Negotiation** — Agree on access terms
- **Transfer Coordination** — Initiate and track data transfers

### Data Plane
How does data actually move?

Via transfer protocols appropriate to the data type — HTTP APIs, cloud storage (S3), industrial protocols (OPC UA), streaming (MQTT/NATS). The control plane sets up the transfer; the data plane executes it.

## A Concrete Example

A wind turbine manufacturer needs real-time sensor data from a supplier's components.

**Without a dataspace:**
1. Legal teams negotiate a data sharing agreement (4 weeks)
2. IT teams exchange VPN credentials or API keys (1 week)
3. Developers build a custom integration (3 weeks)
4. Data flows — but the agreement terms aren't enforced
5. Repeat for every supplier

**With a dataspace:**
1. Supplier is already a dataspace member with verified credentials
2. Supplier publishes sensor data to the dataspace catalog with access policy: "Available to verified customers with active maintenance contract"
3. Manufacturer queries the catalog, sees the offering
4. Manufacturer's connector requests access, presenting credentials proving "verified customer" status
5. Systems negotiate automatically — if credentials match policy, agreement is recorded
6. Data flows via the data plane
7. Audit trail captures everything

Time from "I need this data" to "data is flowing": minutes, not months.

## What Makes This Different from APIs?

You might think: "We already have APIs. What's new?"

| APIs | Dataspaces |
|------|------------|
| You manage credentials per-partner | Universal identity via DIDs/VCs |
| Terms are in contracts (not systems) | Terms are machine-enforced policies |
| Trust is implicit | Trust is cryptographically verified |
| Each integration is custom | Standard protocol (DSP) for all |
| Scaling = more integrations | Scaling = more catalog entries |

APIs solve the technical problem of data transfer. Dataspaces solve the business problem of trusted data sharing at scale.

## The Standards Behind It

Dataspaces aren't proprietary. They're built on emerging international standards:

- **ISO/IEC 20151** — Dataspaces concepts and characteristics (in standardization)
- **Dataspace Protocol (DSP)** — Catalog, negotiation, transfer (Eclipse Foundation)
- **Decentralized Claims Protocol (DCP)** — Identity and credential verification (Eclipse Foundation)
- **W3C DIDs and VCs** — Decentralized identity foundation

These standards ensure you're not locked into a single vendor or implementation.

## Who's Using This?

Dataspaces are operational today in major industry initiatives:

- **Catena-X** — Automotive supply chain (BMW, Mercedes-Benz, Bosch, etc.)
- **Manufacturing-X** — Cross-industry manufacturing
- **DECADE-X** — Aerospace and defence (Airbus, etc.)
- **Mobility Data Space** — Transportation and logistics
- **Eona-X** — Energy sector

These aren't pilots. They're production systems with real data flows and real business impact.

## The Technology Stack

The reference implementation is open source under the Eclipse Foundation:

| Component | Purpose |
|-----------|---------|
| [Eclipse Dataspace Components (EDC)](https://github.com/eclipse-edc) | Connector implementation |
| [Identity Hub](https://github.com/eclipse-edc/IdentityHub) | Credential management |
| [Dataspace Protocol TCK](https://github.com/eclipse-dataspacetck/dsp-tck) | Conformance testing |

Cloud providers like Aruba, OVHcloud, and StackIT are building hosted services on this stack, so you don't have to run it yourself.

## Common Questions

### "Is this blockchain?"

No. Dataspaces use decentralized identity (DIDs), which has roots in blockchain thinking, but the dataspace itself doesn't require a blockchain. Data flows peer-to-peer using standard protocols. No consensus mechanisms, no mining, no tokens.

### "Does all my data have to be in the dataspace?"

No. Your data stays where it is — your databases, your APIs, your systems. The dataspace provides the trust and negotiation layer. When access is granted, data flows directly to the consumer. The "dataspace" isn't a place data lives; it's a way data moves.

### "What about privacy?"

Dataspaces enhance privacy, not reduce it. You control exactly what data is shared, with whom, for what purpose, and for how long. Policies are enforced, not just documented. You have audit trails of every access.

### "How is this different from Gaia-X?"

Gaia-X defines a broader European data infrastructure vision. Dataspaces (and specifically the Dataspace Protocol / Eclipse Dataspace Components) are the technical implementation. Think of Gaia-X as the policy framework and dataspaces as the technology that makes it real.

## What Should You Do?

If you're evaluating dataspaces for your organization:

1. **Identify a use case** — Where do you share data with partners today? Where is it painful?
2. **Look at your industry** — Is there an existing dataspace initiative (Catena-X, Manufacturing-X, etc.) you should join?
3. **Evaluate hosted services** — Do you need to run infrastructure, or can you use a cloud provider's dataspace service?
4. **Try the demos** — The [Minimum Viable Dataspace](https://github.com/eclipse-edc/MinimumViableDataspace) and [JAD](https://github.com/Metaform/jad) let you see it working

## Further Reading

- [Eclipse Dataspace Components Documentation](https://eclipse-edc.github.io/documentation/)
- [Dataspace Protocol Specification](https://eclipse-dataspace-protocol-base.github.io/DataspaceProtocol/)
- [European Cloud Accelerator Overview](https://metaform.github.io/dcsa/documentation/overview/)

---

**Coming next:** [From Zero to Dataspace: Concrete Steps for Rapid Adoption](/guides/zero-to-dataspace-rapid-adoption) — A practical guide for engineering teams.
