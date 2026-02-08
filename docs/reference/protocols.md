# Reference: Protocol Specifications

## Core Protocols

### Dataspace Protocol (DSP)

The Dataspace Protocol specifies how participants discover data offerings, negotiate contracts, and coordinate data transfers.

| | |
|---|---|
| **Current version** | DSP 2025-1 |
| **Specification** | [DSP 2025-1 (with errata)](https://eclipse-dataspace-protocol-base.github.io/DataspaceProtocol/2025-1-err1/) |
| **Repository** | [eclipse-dataspace-protocol-base/DataspaceProtocol](https://github.com/eclipse-dataspace-protocol-base/DataspaceProtocol) |
| **Conformance testing** | [DSP TCK](https://github.com/eclipse-dataspacetck/dsp-tck) |
| **Governance** | Eclipse Dataspace Working Group |

**Scope**: Catalog discovery, contract negotiation (offer, request, agreement, termination), transfer process management (request, start, suspend, complete, terminate).

**Transport**: HTTPS with JSON-LD message bodies.

### Decentralized Claims Protocol (DCP)

The Decentralized Claims Protocol specifies how participants exchange and verify identity material and verifiable credentials.

| | |
|---|---|
| **Current version** | DCP v1.0.1 |
| **Specification** | [DCP v1.0.1](https://eclipse-dataspace-dcp.github.io/decentralized-claims-protocol/v1.0.1/) |
| **Repository** | [eclipse-dataspace-dcp/decentralized-claims-protocol](https://github.com/eclipse-dataspace-dcp/decentralized-claims-protocol) |
| **Conformance testing** | [DCP TCK](https://github.com/eclipse-dataspacetck/dcp-tck) |
| **Governance** | Eclipse Dataspace Working Group |

**Scope**: Credential presentation requests and responses, verifiable presentation exchange, self-issued token handling, credential resolution.

**Foundation**: Built on W3C DID Core and W3C Verifiable Credentials Data Model.

### Data Plane Signaling (DPS)

Data Plane Signaling defines the interface between the Control Plane and Data Plane for managing data transfer lifecycle.

| | |
|---|---|
| **Documentation** | [DPS interface](https://eclipse-edc.github.io/documentation/for-contributors/data-plane/data-plane-signaling/) |
| **Project** | [Eclipse Data Plane Signaling](https://projects.eclipse.org/projects/technology.dataplane-signaling) |

**Scope**: Transfer lifecycle signals (START, SUSPEND, TERMINATE), data plane registration, capability-based selection, Endpoint Data Reference (EDR) generation.

## Technology Compatibility Kits (TCKs)

TCKs provide automated conformance testing to verify protocol compliance:

| TCK | Tests | Repository |
|---|---|---|
| **DSP TCK** | Control Plane DSP conformance | [eclipse-dataspacetck/dsp-tck](https://github.com/eclipse-dataspacetck/dsp-tck) |
| **DCP TCK** | Credential Service DCP conformance | [eclipse-dataspacetck/dcp-tck](https://github.com/eclipse-dataspacetck/dcp-tck) |

Run the TCK against your implementation to obtain objective evidence of protocol compliance. Passing results are published openly.

## Foundational Standards

| Standard | Scope | Link |
|---|---|---|
| **ISO/IEC 20151** | Dataspace concepts and characteristics | [ISO catalog](https://www.iso.org/standard/86589.html) |
| **W3C DID Core** | Decentralized Identifier specification | [W3C DID Core](https://www.w3.org/TR/did-1.0/) |
| **did:web** | DID method using web infrastructure | [did:web method](https://w3c-ccg.github.io/did-method-web/) |
| **W3C VC Data Model** | Verifiable Credentials data model | [W3C VC](https://www.w3.org/TR/vc-data-model/) |

## Standardization Bodies

| Body | Role |
|---|---|
| **Eclipse Foundation** | Hosts DSP, DCP specifications and EDC implementation |
| **ISO/IEC JTC 1/SC 38** | International standardization of dataspace concepts |
| **CEN-CENELEC JTC 25** | European standardization for trusted data transactions |
| **W3C** | Web standards for decentralized identity and verifiable credentials |
| **IDSA** | Requirements aggregation and community governance for dataspaces |
