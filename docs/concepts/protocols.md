# Protocols

## Why Protocols Matter

The insanely fast growth and adoption of the World Wide Web would not have been possible without common protocols like TCP/IP and HTTP, which enable software from different vendors, servers at different providers, and browsers on different devices to seamlessly work together.

Dataspaces rely on the same principle: standardized protocols that form the foundation for all technical communication between participants. These protocols are what make dataspaces **interoperable** — any conformant implementation can participate, regardless of vendor, cloud provider, or deployment model.

## The Three Protocols

Interoperability is achieved by standardizing three distinct problem spaces. A practical way to remember the split:

> **DCP proves the parties. DSP proves the agreement. DPS drives the execution.**

After that, the actual bytes move over *wire protocols* (HTTP, S3, MQTT, industrial protocols) between data planes, based on what was negotiated.

### DCP — Decentralized Claims Protocol

**What it connects**: Credential Service ↔ Credential Service

**What it does**: Establishes *who you are* in a decentralized way. DCP enables the exchange and verification of identity material and claims (verifiable credentials) so that policy checks can be evaluated against participant attributes.

**When it runs**: Before and during contract negotiation. When a participant requests access to data, the provider's system requests proof of the consumer's attributes. DCP governs how those proofs are assembled, presented, and verified.

**Key characteristics**:
- Peer-to-peer credential exchange — no central identity broker
- Supports selective disclosure — present only the attributes needed
- Cryptographic verification — proofs can be checked without contacting the issuer

**Specification**: [DCP v1.0.1](https://eclipse-dataspace-dcp.github.io/decentralized-claims-protocol/v1.0.1/)

### DSP — Dataspace Protocol

**What it connects**: Control Plane ↔ Control Plane

**What it does**: Establishes *what is being shared* and *under which rules*. DSP covers three stages:

1. **Catalog discovery** — a consumer queries a provider's catalog to find available data offerings and their terms
2. **Contract negotiation** — the consumer and provider negotiate a contract agreement, with policies evaluated against credentials
3. **Transfer coordination** — once a contract agreement exists, DSP coordinates the initiation and management of data transfers

**When it runs**: DSP is the primary protocol for the business interaction between two participants. It governs everything from "what do you have?" to "I agree to your terms" to "start the transfer."

**Key characteristics**:
- Machine-to-machine negotiation — no manual contract drafting
- Policy-driven — access and contract decisions are based on verifiable attributes
- State machine — negotiations follow defined state transitions with clear outcomes
- Based on web technologies — uses HTTPS, JSON-LD

**Specification**: [DSP 2025-1](https://eclipse-dataspace-protocol-base.github.io/DataspaceProtocol/2025-1-err1/)

### DPS — Data Plane Signaling

**What it connects**: Control Plane ↔ Data Plane

**What it does**: Establishes *how the agreed sharing is executed at runtime*. DPS defines the signaling interface between the control plane (which decides) and the data plane (which executes):

- **Lifecycle signals**: `START`, `SUSPEND`, `TERMINATE` over a shared data flow state machine
- **Registration**: data planes register their capabilities (supported source types, transfer types) with the control plane
- **Capability-based selection**: the control plane selects the right data plane for each transfer based on capabilities, placement, and health
- **Endpoint Data References (EDRs)**: for pull transfers, the data plane returns endpoint coordinates plus an access token

**When it runs**: After a contract agreement is established and a transfer is initiated. The control plane signals the data plane to start, and the data plane executes the actual data movement.

**Key characteristics**:
- Decouples decision from execution — control plane and data plane can be deployed, scaled, and evolved independently
- Supports multiple data planes — different planes for different protocols, regions, or workloads
- Transport-agnostic — the actual data movement uses wire protocols appropriate for the data type

**Documentation**: [DPS interface](https://eclipse-edc.github.io/documentation/for-contributors/data-plane/data-plane-signaling/)

## How They Work Together

When two participants interact to share data, the protocols execute in sequence:

```
1. DCP  — Identity verification between Credential Services
         "Are you who you claim to be?"

2. DSP  — Catalog discovery and contract negotiation
         "What do you have? Under what terms? I agree."

3. DPS  — Control Plane signals Data Plane
         "Start the transfer. Here are the parameters."

4. Wire — Data moves between Data Planes
         (HTTP, S3, MQTT, OPC-UA, etc.)
```

The sequence is not always strictly linear — DCP exchanges can happen during DSP negotiation (when policies require additional credential checks), and multiple DPS-signaled transfers can execute under a single DSP contract agreement. But the logical flow is clear: **prove identity → agree on terms → execute the transfer**.

## Interoperability Validation: TCKs

To ensure that different connector implementations actually interoperate, the ecosystem provides **Technology Compatibility Kits (TCKs)**:

- [**DCP TCK**](https://github.com/eclipse-dataspacetck/dcp-tck) — validates Credential Service implementations against the DCP specification
- [**DSP TCK**](https://github.com/eclipse-dataspacetck/dsp-tck) — validates Control Plane implementations against the DSP specification

Running the TCK against your implementation is the fastest baseline check before debugging partner-specific configuration.

## Standardization

These protocols are not proprietary inventions. They are developed under Eclipse Foundation governance and build on international standards:

- **ISO/IEC 20151** — Dataspace concepts and characteristics
- **W3C DID Core** — Decentralized Identifiers
- **W3C Verifiable Credentials** — Credential data model
- **CEN-CENELEC JTC 25** — European standardization for dataspaces

The strategic implication: organizations adopting this stack are choosing interoperability over lock-in. The protocol surface is stable, vendor-neutral, and standards-backed.

---

**Go deeper**: [IDSA Rulebook — Decentralization Principles](../reference/community.md) | [IDSA Rulebook — Planes](../reference/community.md)

**Related concepts**: [Trust and Governance](./trust-and-governance.md) | [Decentralized Identity](./decentralized-identity.md) | [Data Sharing Lifecycle](./data-sharing-lifecycle.md)

**Components**: [Connector (Control Plane)](../components/connector.md) | [Identity Hub](../components/identity-hub.md) | [Data Planes](../components/data-planes.md)
