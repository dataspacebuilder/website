---
sidebar_position: 1
title: Overview
description: Dataspaces are decentralized architectures for trusted, policy-controlled data sharing between organizations.
---

# Overview

A **dataspace** is a *context* between one or more *participants* that share data. A participant is typically an organization, but it could be any entity such as a service or machine. Dataspaces are decentralized architectures for trusted, policy-controlled data sharing—built on open standards and open-source components, they enable sovereign data exchange without central platforms or vendor lock-in.

This page is an overview of dataspaces and the Eclipse Dataspace Components (EDC) architecture.

---

## Why You Need Dataspaces and What They Can Do

Organizations increasingly need to share data across company boundaries—with suppliers, customers, regulators, and partners. Traditional approaches create problems:

- **Centralized platforms** create single points of control and vendor lock-in
- **Point-to-point integrations** don't scale and lack standardization
- **Manual processes** are slow, error-prone, and don't enforce policies

Dataspaces solve these problems by providing a **decentralized, standards-based architecture** where data flows directly between participants under policy control.

### What Dataspaces Provide

- **Data Sovereignty**  
  Data providers maintain control over their data. They define who can access it, under what conditions, and for what purposes. Data doesn't flow through intermediaries—it flows peer-to-peer.

- **Automated Trust**  
  Trust between parties is established through verifiable credentials—machine-readable proofs of identity, certifications, and roles. No manual verification, no phone calls, no paperwork.

- **Policy Enforcement**  
  Access rules are defined as machine-readable policies and enforced automatically. Before any data moves, contracts are negotiated and terms are agreed.

- **Interoperability**  
  Standard protocols (DSP, DCP) ensure that different implementations can work together. A connector from one vendor can negotiate with a connector from another.

- **Decentralization**  
  No central authority controls all data. Governance is defined by the community, and participants retain autonomy over their infrastructure.

---

## What Dataspaces Are Not

Dataspaces are not a traditional, all-inclusive platform. They operate at the data exchange level rather than providing complete applications. Understanding what dataspaces don't do helps set appropriate expectations.

Dataspaces:

- **Do not store your data centrally.** Data remains where it is—in your systems, your cloud, your data centers. Dataspaces enable access, not centralization.

- **Do not replace your existing systems.** ERP, MES, databases—these continue to operate. Connectors integrate with them to enable sharing.

- **Do not provide business applications.** Dataspaces are infrastructure. Applications that use shared data are built on top.

- **Do not dictate governance.** Each dataspace defines its own rules through trust frameworks. The technology enables governance; it doesn't prescribe it.

- **Do not require specific infrastructure.** Run connectors in the cloud, on-premises, or at the edge. The architecture is infrastructure-agnostic.

- **Do not eliminate the need for agreements.** Technical contracts complement, but don't replace, legal agreements between organizations.

---

## Common Misconceptions

### "Data transfers are only about sending files"

Data can be in a variety of forms. While connectors can share static files, they also support open-ended transfers such as **streaming** and **API access**. Many use cases involve providing automated access to event streams or API endpoints—including pausing or terminating access based on continual evaluation of data use policies.

### "Dataspace software needs to be installed"

There is no "dataspace software" or "dataspace application." A dataspace is a decentralized context. Participants deploy connectors and communicate with other participant systems using DSP and DCP. The dataspace itself is the network of participants, not a piece of software.

### "EDC adds overhead to data transfers"

EDC is designed as a lightweight, non-resource-intensive engine. EDC adds **no overhead** to data transmission since specialized wire protocols handle the actual data movement. For example, EDC can grant access to an API endpoint or data stream. Once access is obtained, the consumer invokes the API directly without requests being proxied through EDC components.

### "Cross-dataspace communication"

There is no such thing as cross-dataspace communication. All data sharing takes place **within** a dataspace. However, dataspace *interoperability* is possible. Two dataspaces are interoperable if they have:

- Compatible identity systems (e.g., both use DCP and Web DIDs)
- A common set of verifiable credentials and credential issuers
- An agreed set of data sharing policies

If these conditions are met, a single connector deployment can participate in multiple dataspaces.

---

## Historical Context

### The Problem with Traditional Data Sharing

Early approaches to B2B data sharing relied on:

- **EDI and proprietary formats** — Worked for established relationships but brittle and expensive to change
- **API integrations** — Better, but each integration is custom and policies are hardcoded
- **Data platforms** — Convenient but create lock-in and concentrate control

These approaches served their purpose but don't meet modern requirements for sovereignty, automation, and scale.

### The Rise of Data Sovereignty

European regulation—GDPR, the Data Act, Digital Product Passport requirements—established that organizations must control how their data is used. This created demand for architectures that enforce sovereignty technically, not just contractually.

### The Dataspace Movement

Industry consortia (Catena-X, Manufacturing-X, DECADE-X) and initiatives (Gaia-X, IDSA) converged on a common architectural pattern:

- **Decentralized identity** for establishing trust
- **Standard protocols** for catalog, negotiation, and transfer
- **Policy-based access** control enforced by technology

The Eclipse Dataspace Components (EDC) emerged as the leading open-source implementation of this pattern.

### Where We Are Today

Dataspaces are moving from pilots to production:

- **Catena-X** operates a live automotive supply chain dataspace
- **Manufacturing-X** is deploying industrial data sharing
- **European Cloud Accelerator** is enabling dataspace-as-a-service

The standards (DSP, DCP, ISO 20151) are maturing. The technology is production-ready. The ecosystem is growing.

---

## Core Concepts

### Participants and Identity

A **participant** has a single identity in a dataspace, which is a URI. EDC supports multiple identity systems, including OAuth2 and the Decentralized Claims Protocol (DCP). If DCP is used, the identity is typically a **Web DID**.

An EDC component (control plane, data plane) acts as a **participant agent**—a system that runs on behalf of a participant. All components operated by an organization use the same participant ID, regardless of where they are deployed.

| Scenario | Identity Setup |
|----------|----------------|
| Single deployment | One connector, one identity |
| Clustered deployment | Multiple instances, same identity |
| Distributed deployment | Multiple management domains, same identity |
| Multiple operating units | Each unit is a separate participant with distinct identity |

### Connectors

Every organization runs a **connector**—the software component that implements dataspace protocols:

- Publish data offerings to catalogs
- Negotiate contracts with other connectors
- Enforce policies during exchanges
- Transfer data to authorized parties

### Trust and Credentials

Trust is established through **verifiable credentials**—digital proofs issued by trusted authorities. When you request access to data, you present credentials that prove you meet the requirements.

Unlike centralized identity systems where a single identity provider can become a bottleneck or point of failure, DCP uses **self-issued tokens**. The requesting party signs their own token, and the receiving party verifies it using the sender's public key from their DID document. This preserves privacy and eliminates single points of failure.

### Policies and Contracts

**Policies** are machine-readable rules (expressed in ODRL) that govern access. Before data moves, connectors negotiate and agree on terms, creating a **contract agreement** that grants access to specific data under defined conditions.

### Protocols

Three standard protocols enable interoperability:

| Protocol | Purpose | Specification |
|----------|---------|---------------|
| **Dataspace Protocol (DSP)** | Catalog discovery, contract negotiation, transfer initiation | Defines asynchronous messaging for data access control |
| **Decentralized Claims Protocol (DCP)** | Credential presentation and verification | Layers on DSP to add trust via verifiable credentials |
| **Data Plane Signaling (DPS)** | Control plane to data plane communication | Coordinates transfer execution |

DSP focuses on the messaging layer for controlling data access but does not specify how trust is established. That's the role of DCP, which enables providers to verify consumer credentials before granting access.

### Managed Deployments

For organizations offering dataspace-as-a-service, management components orchestrate multi-tenant deployments:

- **Connector Fabric Manager (CFM)** — Platform for deploying and managing dataspace resources at scale
- **Service Virtualization** — Single deployments serve multiple participants through configuration-based isolation
- **Virtual Participant Agents** — Units of deployment that can be provisioned, managed, and migrated

---

## Architecture Variations

While the core components remain consistent, deployment models vary:

| Model | Description |
|-------|-------------|
| **Single-tenant** | One connector per organization, full control |
| **Multi-tenant (EDC-V)** | Shared control plane, isolated contexts |
| **Edge** | Data planes close to data sources |
| **Hybrid** | Mix of cloud, on-premises, and edge |

The **Connector Fabric Manager** enables efficient multi-tenant operation by:

- Managing tenant lifecycle through the Tenant Manager
- Orchestrating provisioning through workflows
- Isolating infrastructure access in Activity Agents
- Enabling configuration-based context migration

---

## What's Next

- **[Dataspace Components](/docs/architecture/components)** — Learn about the essential components including CFM
- **[Identity Hub](/docs/architecture/identity-hub)** — Deep dive into decentralized identity
- **[Control Plane](/docs/architecture/control-plane)** — Understand contract negotiation
- **[Data Plane](/docs/architecture/data-plane)** — See how data actually moves
- **[Protocols](/docs/architecture/protocols)** — DSP, DCP, and DPS specifications in detail
- **[Deployment Topologies](/docs/architecture/deployment-topologies)** — Cloud, edge, and multi-tenant options
