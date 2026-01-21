# Trusted Data Sharing Stack

> **Enable digital ecosystems at scale**

---

## The Challenge of Modern Data Sharing

Organizations across industries face a common challenge: sharing data with partners, suppliers, and customers while maintaining control, ensuring compliance, and building trust. Traditional approaches—proprietary EDI systems, point-to-point integrations, or manual data exchanges—don't scale and create friction in digital ecosystems.

**The EDC Trusted Data Sharing Stack** is a comprehensive set of components built on open standards that enables organizations to participate in secure, sovereign data exchanges without the complexity of building everything from scratch.

---

## The Stack at a Glance

![Trusted Data Sharing Stack Architecture](assets/stack.png)

### Core Components

| Component                                 | What it does                                                                                                |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **CFM** — Connector Fabric Manager | The backbone for managing tenant lifecycle, workflows, and infrastructure provisioning at scale             |
| **EDC-V** — Virtualized EDC        | Multi-tenant control plane enabling thousands of organizations to share a common infrastructure efficiently |
| **Manufacturer UI**                 | End-user interface for organizations to publish data, manage contracts, and monitor exchanges               |
| **CSP Management UI**               | Administrative console for cloud providers to manage tenants, credentials, and platform operations          |
| **Industrial Data Planes**          | Specialized data movement engines for industrial protocols (OPC UA, MQTT, etc.)                             |
| **Data Plane SDKs**                 | Development kits for building custom data planes tailored to specific use cases                             |

### How It Works

1. **On Boarding** — Operating companies and credential issuers manage organizational identity and trust
2. **Tenant Management** — Automated provisioning and lifecycle management for participating organizations
3. **Operational Experience** — User-friendly interfaces for both platform operators and end users
4. **Industrial Use Cases** — Pluggable data planes supporting diverse industrial data exchange scenarios

---

## Who Is This For?

<div class="audience-cards">

### 🏢 Cloud Service Providers

**Product Managers & Platform Teams**

Offer dataspace capabilities as a managed service. Turn data sharing into a revenue-generating product line while leveraging your existing infrastructure.

[**Get Started as a CSP →**](./csp/README.md)

---

### 🏭 Adopters

**CTOs, Product Managers & Innovation Leaders**

Participate in digital ecosystems without deploying complex infrastructure. Connect with suppliers, partners, and customers through trusted data exchanges.

[**Get Started as an Adopter →**](./adopters/README.md)

---

### 💼 Consultants

**System Integrators & Digital Transformation Teams**

Help organizations navigate the dataspace landscape. Build expertise in deploying and customizing the trusted data sharing stack.

[**Get Started as a Consultant →**](./consultants/README.md)

</div>

---

## Key Benefits

### For Cloud Providers

- **New Revenue Streams** — Offer "Dataspace-as-a-Service" with managed multi-tenant deployments
- **Operational Efficiency** — Host thousands of tenants on shared infrastructure using EDC-V
- **Compliance Automation** — Built-in support for verifiable credentials and usage policies

### For Adopters

- **Zero-Touch Participation** — Join dataspaces without managing complex local infrastructure
- **Automated Trust** — Cryptographic verification of partners and automated contract negotiation
- **Data Sovereignty** — Maintain full control over who accesses your data and how it's used

### For Consultants

- **Proven Architecture** — Battle-tested patterns from Catena-X, Manufacturing-X, and DECADE-X
- **Modular Approach** — Mix and match components to fit client requirements
- **Standards-Based** — Build on DSP 2025-1 and DCP specifications with long-term stability

---

## Built on Open Standards

The Trusted Data Sharing Stack implements industry-standard protocols:

| Standard                                      | Purpose                                                            |
| --------------------------------------------- | ------------------------------------------------------------------ |
| **Dataspace Protocol (DSP)**            | Catalog discovery, contract negotiation, and transfer coordination |
| **Decentralized Claims Protocol (DCP)** | Identity verification using DIDs and Verifiable Credentials        |
| **Data Plane Signaling (DPS)**          | Decoupled, high-performance data movement                          |

These standards are maintained by the [Eclipse Dataspace Working Group](https://dataspace.eclipse.org/) and have reached production stability with the DSP 2025-1 release.

---

## Real-World Deployments

Organizations across industries are already using these components:

- **Automotive** — Catena-X supply chain data exchange
- **Manufacturing** — Manufacturing-X industrial collaboration
- **Aerospace & Defence** — DECADE-X trusted supply chain ecosystem
- **European Cloud Providers** — Multi-provider dataspace federations

---

## Get Started

Choose your path based on your role:

| I want to...                                              | Start here                                                  |
| --------------------------------------------------------- | ----------------------------------------------------------- |
| Offer dataspace services to my customers                  | [CSP Quick Start](./csp/quickstart.md)                         |
| Participate in a dataspace as a data provider or consumer | [Adopter Quick Start](./adopters/quickstart.md)                |
| Help clients implement dataspace solutions                | [Consultant Guide](./consultants/overview.md)                  |
| Understand the technical architecture                     | [Architecture Reference](./reference/architecture.md)          |
| See a live demo                                           | [Minimum Viable Dataspace Demo](./getting-started/mvd-demo.md) |

---

## Resources

- [Eclipse Dataspace Components Documentation](https://eclipse-edc.github.io/documentation/)
- [Dataspace Protocol Specification](https://eclipse-dataspace-protocol-base.github.io/DataspaceProtocol)
- [Decentralized Claims Protocol](https://eclipse-dataspace-dcp.github.io/decentralized-claims-protocol)
- [GitHub Repositories](https://github.com/eclipse-edc)

---

<div class="footer-cta">

**Ready to enable trusted data sharing at scale?**

[Contact Us](mailto:contact@example.com) • [Join the Community](https://dataspace.eclipse.org/)

</div>
