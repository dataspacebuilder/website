# Architecting Dataspaces with Eclipse Dataspace Components

## 1. The Strategic Imperative of Dataspaces for Cloud Providers

The digital economy is shifting from a paradigm of siloed cloud storage—where data is locked within proprietary environments—to one of sovereign data sharing. For Cloud Service Providers (CSPs) like Aruba, OVH, and StackIT, "Dataspaces" represent the next critical evolution of cloud value. By offering a technical and legal framework for secure data exchange, CSPs move from being passive infrastructure hosts to becoming the essential orchestrators of trusted industrial ecosystems.

The foundation for this shift is the Dataspace Protocol (DSP) 2025-1. This specification has reached a milestone of absolute stability; its release marks the transition from experimental prototypes to production-ready foundations. Because further changes to the protocol will not affect conformity, CSPs can now build upon it with long-term architectural certainty.

For CSPs, the strategic adoption of dataspaces provides three primary business advantages:

* Enabling High-Trust Ecosystems: Providers facilitate cryptographically secure exchanges where participant identity and compliance are verified automatically, moving beyond the limitations of manual trust.
* Reducing Vendor Lock-in: By adhering to stable open standards like DSP 2025-1, CSPs ensure their clients can interact across disparate technical systems and federations, increasing the attractiveness of the provider's sovereign offering.
* Automating Compliance via Usage Control: Integrated usage policies allow for the automated enforcement of complex legal and organizational requirements, reducing the administrative burden on both the provider and the customer.

This guide outlines how the Eclipse Dataspace (EDC) community has modularized these capabilities into a scalable "Fabric" designed for industrial deployment.

---

## 2. Deciphering the EDC Component Landscape

Modern dataspaces have moved away from monolithic "connectors" toward modular ecosystems. By utilizing specialized components from the Eclipse Foundation, Fraunhofer, and Metaform, CSPs can deploy a "Connector Fabric" tailored to the specific needs of multi-tenant cloud environments.

The core technical building blocks include:

* Connector Fabric Manager (CFM): Developed by Metaform, the CFM acts as the tenant and workflow backbone. It enables "Connector-as-a-Service" by managing the entire lifecycle of thousands of organizations, from DNS setup to infrastructure provisioning.
* EDC Virtual Connector (EDC-V): A virtualized control plane that enables multi-tenant behavior. While the "Classic EDC" requires individual deployments per organization, EDC-V allows a CSP to scale without the prohibitive overhead of isolated instances.
* Identity Hub (The Wallet Service): This component implements the Decentralized Claims Protocol (DCP) to manage Decentralized Identifiers (DIDs) and Verifiable Credentials (VCs). It transforms trust from a manual check into an automated, cryptographic certainty.
* Data Plane Signaling (DPS): DPS is the future-proofing layer that decouples the control plane (negotiation and legal logic) from the data plane (the physical movement of data). This allows for high-performance, independent data planes designed for specific industrial workloads.

Madrid Development Dashboard (February 2026 Snapshot)

The following maturity status reflects the readiness for the February 2026 Madrid Demo, emphasizing production-stable protocols alongside experimental performance enhancements.

Component	Primary Contributor	Role in Ecosystem	Maturity Status
Connector Fabric Manager (CFM)	Metaform	Tenant & Workflow Backbone	GREEN
EDC Virtual Connector (EDC-V)	Eclipse	Multi-tenant Control Plane	GREEN*
Identity Hub (Wallet)	Eclipse	DID & Credential Management	GREEN
Classic EDC Connector	Eclipse	Combined Control/Data Plane	GREEN
Data Plane Signaling (DPS)	Eclipse	Inter-plane Communication	GREEN**
Participant & CSP Portals (UI)	Aruba / Metaform	Onboarding & Catalog Interface	GREEN
Industrial Data Plane	OPC Foundation	OPC UA Cloud Library Integration	GREEN**

* Note: For the February 2026 demo, EDC-V demonstrates multi-tenant control logic while utilizing the stable Classic Data Plane for actual transfers to minimize operational risk. * Note: DPS and Industrial Data Planes are available in prototype/experimental form as of February 2026.*


--------------------------------------------------------------------------------


## 3. The Maturity Path: A 3-Level Architecture Strategy

Building a dataspace is a journey toward increased automation and industrial-scale trust. Cloud providers generally progress through three strategic levels.

### Level 1: The Standalone Connector (Classic EDC)

The entry point utilizes the Classic EDC, which combines the control and data planes in a single runtime. While this is the stable workhorse of existing deployments like Catena-X, it is typically deployed for individual organizations and lacks the efficiency required for CSP-scale multi-tenancy.

### Level 2: Cloud-Native Multi-Tenancy (EDC-V & CFM)

At this level, CSPs focus on Infrastructure Efficiency. By utilizing the Connector Fabric Manager and EDC-V, providers can manage infrastructure for many tenants simultaneously on a shared control plane. The CFM automates the provisioning of namespaces and instances, drastically reducing the marginal cost per tenant.

### Level 3: The Industrial Trust Fabric (DCP & DPS)

The final stage focuses on Trust Automation. By integrating the Decentralized Claims Protocol (DCP), CSPs automate the verification of complex ISO certificates. This allows participants to present "Membership" or "DataProcessor" credentials for instant, policy-driven authorization. Data Plane Signaling (DPS) is introduced here to enable specialized industrial performance.

Maturity Comparison Chart

Metric	Level 1: Classic	Level 2: Cloud-Native	Level 3: Industrial Fabric
Primary Value	Stable Transfer	Operational Efficiency	Trust Automation at Scale
Identity Logic	Manual/Static	Multi-tenant Management	Automated (DCP/ISO Checks)
Data Movement	Monolithic Pipe	Managed Infrastructure	Specialized Industrial Planes
Operational Effort	High (Manual per unit)	Low (Centralized)	Near-Zero (Automated)


---


## 4. Step-by-Step Implementation Guide for Cloud Providers

Based on the validated "Madrid Demo" architecture, providers can implement automated, certificate-driven onboarding for supply chain contexts using the following path.

### Step 1: Base Infrastructure Deployment

Provider Action: Deploy the IssuerService and Provisioner Agent onto a Kubernetes cluster using Terraform or OpenTofu. This stage requires setting up NGINX Ingress for routing and PostgreSQL/Vault for secure persistence. Customer Benefit: Immediate access to the governing trust infrastructure of the dataspace.

### Step 2: Automated Tenant Onboarding

Provider Action: The CFM orchestrates the creation of dedicated Kubernetes namespaces, provisions the EDC-V control plane, and initializes the tenant's Identity Hub (wallet) through an asynchronous workflow. Customer Benefit: "Zero-touch" setup; the environment is ready for use without local infrastructure management.

### Step 3: Trust Foundation (Identity Setup)

Provider Action: Issue Verifiable Credentials via the Identity API. In the Madrid scenario, this includes the MembershipCredential (attesting to active membership) and the DataProcessorCredential (attesting to access levels such as "processing" or "sensitive"). Customer Benefit: Instant, cryptographic proof of status that is recognized by all other dataspace participants.

### Step 4: Catalog & Contract Negotiation

Provider Action: Utilize the Dataspace Protocol (DSP) to enable the tenant to discover data offers. The system automatically matches the tenant's credentials (from Step 3) against data provider policies. Customer Benefit: Seamless discovery; the user only interacts with data they are authorized to access.

Step 5: Hybrid Execution via Signaling

Provider Action: Establish the handshake between the control plane and data plane. While using the new control logic of DPS, the February 2026 demo performs the actual movement via the Classic Data Plane to ensure maximum transfer stability. Customer Benefit: Secure, high-performance data movement with the stability of a proven transfer engine.


--------------------------------------------------------------------------------


## 5. The User Experience: Redline and Participant Portals

To lower the barrier to entry for Small and Medium Enterprises (SMEs), technical complexity must be hidden behind a simplified user interface. This is achieved through a "Backend for Frontend" (BFF) architecture.

The Redline service, a Spring Boot application, acts as this BFF. It integrates with Keycloak for robust authentication and provides the "Thin UI" necessary for both operators and participants.

* For CSP Operators: Redline provides a portal for managing tenant lifecycle, monitoring provisioned resources, and overseeing the issuance of base credentials.
* For Participants: The portal offers a streamlined interface for organization registration, catalog publishing, and managing data transfer agreements.
* Strategic UI: By simplifying DID management and credential presentation, the UI removes the need for participants to employ specialist engineers to join the dataspace.


--------------------------------------------------------------------------------


## 6. Summary: The Value Proposition for Dataspace Providers and Customers

The February 2026 readiness of the Eclipse Dataspace components—specifically the VConnector and the modular Fabric architecture—presents a definitive window for CSPs to capture the sovereign data market.

What Cloud Providers Gain:

* Managed Service Revenue: Shift from low-margin storage to high-value "Dataspace-as-a-Service" with recurring revenue.
* Multi-tenant Efficiency: Significant reduction in overhead by hosting thousands of tenants on a virtualized, cloud-native control plane.
* Compliance Automation: Automated handling of ISO certificates and usage policies via DCP reduces legal and operational risk.

What Customers Get from their Provider

* Zero-Touch Readiness: Customers can join industrial dataspaces immediately without managing complex local infrastructure.
* Automated Trust: ISO certificates and membership attestations are handled automatically, enabling instant participation in global supply chains.
* Sovereign Data Control: Standardized, cryptographically enforced policies ensure the customer retains absolute authority over their data assets.

The Eclipse Dataspace community has moved beyond prototypes. With the stable DSP 2025-1 foundation and the modular fabric architecture, the path to a scalable, interoperable, and sovereign data economy is now open.
