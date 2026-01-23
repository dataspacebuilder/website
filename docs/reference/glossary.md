# Glossary

> Key terms and definitions for the EDC Trusted Data Sharing Stack

---

## A

### Agreement
A confirmed contract between a data provider and consumer, representing the terms under which data access is granted.

### Asset
A data resource that an organization offers to share, including its metadata, data address, and associated policies.

### ABAC (Attribute-Based Access Control)
An authorization model where access decisions are based on attributes of the subject, resource, action, and environment.

---

## C

### Catalog
A collection of data offerings from a participant, discoverable via the Dataspace Protocol.

### CFM (Connector Fabric Manager)
The component responsible for tenant lifecycle management, workflow orchestration, and infrastructure provisioning in a multi-tenant deployment.

### Connector
The software component that enables an organization to participate in a dataspace by managing assets, negotiating contracts, and coordinating transfers.

### Contract
A legally binding agreement between provider and consumer defining the terms of data access, represented as a machine-readable policy.

### Control Plane
The component handling negotiation, policy enforcement, and transfer coordination—as opposed to the Data Plane which moves actual data.

### Credential
See Verifiable Credential.

### CSP (Cloud Service Provider)
An organization operating cloud infrastructure that offers dataspace services to customers.

---

## D

### Data Plane
The component responsible for actual data movement between provider and consumer systems.

### Data Plane Signaling (DPS)
A protocol that decouples control plane operations from data plane execution, enabling specialized and high-performance data planes.

### Dataspace
A federated network enabling sovereign, interoperable data sharing between organizations based on common standards and trust frameworks.

### Dataspace Protocol (DSP)
The open standard defining how participants discover data (catalog), negotiate access (contracts), and coordinate transfers.

### DCP (Decentralized Claims Protocol)
The protocol for identity verification using Decentralized Identifiers (DIDs) and Verifiable Credentials (VCs).

### DID (Decentralized Identifier)
A globally unique identifier controlled by the subject (not a central authority), enabling cryptographic verification of identity.

---

## E

### EDC (Eclipse Dataspace Components)
The open-source project providing the core building blocks for dataspace implementations.

### EDC-V (Virtualized EDC)
A multi-tenant version of the EDC control plane, enabling efficient operation of many logical connectors on shared infrastructure.

---

## F

### Federated Catalog
An aggregated view of catalogs from multiple participants, enabling discovery across a dataspace.

---

## I

### Identity Hub
The component managing an organization's decentralized identity, including DIDs, credentials, and presentation exchanges. Also known as a "wallet."

### Issuer
An authority that creates and signs Verifiable Credentials, attesting to facts about subjects.

---

## M

### Multi-tenancy
An architecture where a single instance of software serves multiple independent customers (tenants) while maintaining isolation.

---

## N

### Negotiation
The process of agreeing on contract terms between a data provider and consumer, potentially involving multiple rounds of offers and counter-offers.

---

## O

### Offer
A data asset combined with its access policy, presented to potential consumers in the catalog.

---

## P

### Participant
Any organization participating in a dataspace, either as a provider, consumer, or both.

### Policy
A machine-readable set of rules defining the conditions under which data access is permitted or denied.

### Policy Engine
The component that evaluates access requests against defined policies to make authorization decisions.

### Presentation
The act of sharing Verifiable Credentials with a verifier to prove claims.

### Provider
An organization offering data assets to the dataspace.

---

## S

### Sovereign / Sovereignty
The principle that data owners maintain control over their data, even when shared, including the ability to define and enforce usage policies.

---

## T

### Tenant
A customer organization in a multi-tenant deployment, with isolated resources and configuration.

### Transfer
The process of moving data from provider to consumer after a contract agreement is established.

### Trust Framework
The set of rules, credentials, and verification mechanisms that establish trust between participants in a dataspace.

---

## V

### VC (Verifiable Credential)
A cryptographically signed claim issued by a trusted authority, which can be verified without contacting the issuer.

### Verifier
An entity that receives and validates Verifiable Credentials presented by a subject.

---

## W

### Wallet
See Identity Hub. A component that stores and manages an organization's DIDs and Verifiable Credentials.
