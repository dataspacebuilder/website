# Find a Dataspace Provider

> Choose a partner to host your dataspace connectivity

---

## Overview

To participate in a dataspace, you need a **Dataspace Service Provider** (DSP) to host and manage your connector and identity components. These providers offer "Dataspace-as-a-Service," allowing you to focus on your data rather than infrastructure.

---

## Cloud Service Providers

Ask your cloud provider if they offer fully managed dataspace environments on their cloud infrastructure.

| Provider | Focus | Region |
| :--- | :--- | :--- |
| **Aruba** | Enterprise Cloud & Dataspaces | Europe (Italy) |
| **OVHcloud** | Sovereign Cloud | Global / Europe |
| **StackIT** / **DataHub Europe** | Sovereign Cloud | Europe (Germany) |
| **T-Systems** | Automotive & Public Sector | Europe (World-Wide)  (Germany) |
| **Cloud Temple** | SecNumCloud / Sovereign | Europe (France) |

---

## How to Find the Perfect Provider

Choosing the right provider is critical for compliance and interoperability. Use these official resources to evaluate certified and compliant dataspace providers.

### 1. IDSA Certified Connectors

The **International Data Spaces Association (IDSA)** maintains the official registry of certified connectors that meet strict security and interoperability standards.

*   **Official List:** [IDSA Certification Page](https://internationaldataspaces.org/offers/certification/)
*   **Certified Connectors:** (As of Jan 2026)
    *   **T-Systems Data Intelligence Hub (DIH)** — First certified (Jan 2024)
    *   **VTT DSIL Connector**
    *   **TNO TSG (Security Gateway)**
    *   **Engineering TRUE Connector**
    *   **GATE Dataspace Connector** — First Assurance Level 1
    *   **Huawei Exchange Data Space Connector**

*   **EDC-based Implementations (Not yet certified):**
    The following providers utilize Eclipse Dataspace Components (EDC) but have not yet achieved formal IDSA certification:
    *   **Soverty**
    *   **Cofinity-X**
    *   **Nexyo**

### 2. Verified Protocol Compliance (TCK)

The **Technology Compliance Kit (TCK)** automates testing for the Dataspace Protocol (DSP), ensuring that a provider's software can technically communicate with others.

*   **Repository:** [DSP-TCK on GitHub](https://github.com/eclipse-dataspacetck/dsp-tck)
*   **Scope:** Over 140 test cases covering catalog, contract negotiation, and transfer.
*   **Compliant Implementations:**
    *   **Eclipse Dataspace Components (EDC)**
    *   **TNO Security Gateway (TSG)**
    *   *Note: IDSA plans to integrate TCK results directly into the certification process.*

### 3. Detailed Connector Reports

For in-depth technical specifications and deployment options, consult the **IDSA Data Space Connector Report**.

*   **Website:** [IDSA Connector Report](https://internationaldataspaces.org/idsa-data-space-connector-report/)
*   **Content:** Inventory of 30+ connectors, certification status, and maintainer details.
*   **Latest Edition:** Report No. 1 (October 2025)

### 4. European Data Space Ecosystem

The **Data Spaces Support Centre (DSSC)** provides a broader view of the ecosystem across Europe.

*   **DSSC Toolbox:** [dssc.eu](https://dssc.eu/) — A curated catalogue of components, identity services, and policy tools.
*   **Data Spaces Radar:** Overview of 28+ initiatives across sectors like Energy, Health, and Mobility.

---

> **Still building?**
> If you are a developer looking to test locally, use the [MVD Demo](../getting-started/mvd-demo.md) or [JAD](../getting-started/mvd-demo.md#alternative-demo-jad) instead of a commercial provider.
