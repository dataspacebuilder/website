# Dataspace Builder

This **repository** serves as a central point of reference for the Dataspace Builder ecosystem. It is designed to enable: 
*   **Cloud Providers** looking to offer dataspace capabilities.
*   **Customers** of these Cloud Providers to understand what services and value they receive.
*   **EDC as a Service Providers** aiming to host and manage thousands of connectors.
*   **Consulting Teams** building dataspaces with EDC (Eclipse Dataspace Components) and DSP (Dataspace Protocol). 
Below is a curated list of relevant repositories and sources, categorized by their role in the architecture.


## 1. Core Eclipse Dataspace Components
These repositories contain the fundamental software for the control and data planes, including the specific implementations tracked for the February demo. 

*   **Classic EDC Connector (Control & Data Plane):**
    https://github.com/eclipse-edc/Connector
*   **EDC Virtual Connector (Virtualized Control Plane):**
    https://github.com/eclipse-edc/Virtual-Connector
*   **Identity Hub (Wallet & DCP Implementation):**
    https://github.com/eclipse-edc/IdentityHub
*   **Data Plane Signaling (DPS Specification & Prototype):**
    https://github.com/eclipse-dataplane-signaling/dataplane-signaling
*   **Data Plane Core / SDKs:**
    https://github.com/eclipse-dataplane-core
*  **Dataspace Protocol Base (DSP Specification & Reference):** 

## 2. Demo Infrastructure & Onboarding
These repositories manage the "Connector-as-a-Service" environment, tenant lifecycle, and the specific proof-of-concept scenarios for the Madrid event.

*   **Connector Fabric Manager (Tenant & Lifecycle Management):**
    https://github.com/Metaform/connector-fabric-manager
*   **Aruba Cloud Accelerator PoC (Demo Logic & Seeding):**
    https://github.com/Metaform/aruba-poc
*   **Aruba Provisioner (Infrastructure Deployment Agent):**
    https://github.com/Metaform/aruba-provisioner
*   **Redline (Backend for Frontend / CSP UI):**
    https://github.com/Metaform/redline
*   **End-User API (Onboarding GUI for SMEs):**
    https://github.com/FraunhoferISST/End-User-API
*   ** Minimum Viable Dataspace Demo Environment for developers:**
    https://github.com/eclipse-edc/MinimumViableDataspace
*   ** Newest Demo Environment:**
    https://github.com/Metaform/jad

## 3. Industrial Integration
*   **OPC UA Cloud Library (Industrial Data Plane):**
    https://github.com/OPCFoundation/UA-CloudLibrary

## 4. Testing & Compliance
*   **Dataspace Protocol TCK (Technology Compatibility Kit):**
    https://github.com/eclipse-dataspacetck/dsp-tck

## 5. Specifications & Reference Documentation
These links point to the technical standards and architectural documents governing the demo.

*   **Eclipse Dataspace Components (EDC) Documentation:**
    https://eclipse-edc.github.io/documentation/
*   **EDC Status:**
    https://metaform.github.io/dcsa/documentation/overview/_status/
*   **Decentralized Claims Protocol (DCP):**
    https://eclipse-dataspace-dcp.github.io/decentralized-claims-protocol
*   **Dataspace Protocol (DSP):**
    https://eclipse-dataspace-protocol-base.github.io/DataspaceProtocol
*   **Virtual Connector Architecture:**
    https://github.com/Metaform/dcsa/blob/main/content/en/technical/virtual.connector.architecture.md
*   **CFM Architecture Notes:**
    https://github.com/Metaform/connector-fabric-manager/blob/main/docs/developer/architecture/system.architecture.md
*   **W3C Decentralized Identifiers (DID) Core:**
    https://www.w3.org/TR/did-1.0/
*   **W3C DID Web Method:**
    https://w3c-ccg.github.io/did-method-web/
*   **W3C Verifiable Credentials Data Model:**
    https://www.w3.org/TR/vc-data-model/

## 6. Eclipse Dataspace Working Group
*   **Official Working Group Page:**
    https://projects.eclipse.org/working-group/eclipse-dataspace
*   **Eclipse Dataspace Website:**
    https://dataspace.eclipse.org/

## Other documents
*  [Architecting Dataspaces](./ArchitectingDataspaces.md) Draft
*  [Minimum Dataspace Use Case](./MVD-usecase.md) Andy's Draft
