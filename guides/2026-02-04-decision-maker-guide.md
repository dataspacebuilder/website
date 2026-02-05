---
slug: decision-maker-guide
title: "Monitarization strategy for Dataspace-as-a-Service"
authors: [a20h]
tags: [strategy, business, decision-maker]
description: "A strategic guide for decision makers exploring Dataspace-as-a-Service. Understand how trusted data sharing creates business value, the market momentum behind dataspaces, and why DSaaS is the fastest path to participation."
keywords: [DSaaS, Dataspace-as-a-Service, trusted data sharing, data ecosystem, Eclipse Dataspace Components, EDC, business strategy, cloud provider]
image: /img/guides/decision-maker/dec-maker-cover.jpeg
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Data has become the currency of modern business. But while organizations have mastered internal data management, sharing data across organizational boundaries remains surprisingly difficult. Operators solve this problem with Dataspace-as-a-Service (DSaaS).

{/* truncate */}

:::tip What You'll Learn today
This guide provides a business-level understanding of trusted data sharing: why it matters, how it works, what's driving adoption, and how DSaaS enables you to participate or provide this capability to others. Whether you're a cloud service provider exploring new offerings or an organization evaluating dataspace participation, this guide will help you understand the opportunity.
:::

## The Trusted Data Sharing Ecosystem

The trusted data sharing ecosystem consists of three interconnected layers that work together to enable secure, sovereign data exchange between organizations.

![The Trusted Data Sharing Ecosystem](/img/guides/decision-maker/dec-maker-1.jpeg)

### Community & Protocols: The Foundation

The left panel represents the foundation that makes trusted data sharing possible with open standards developed by the open-source community.

Three protocols form the core:

- [Decentralized Claims Protocol](https://eclipse-dataspace-dcp.github.io/decentralized-claims-protocol/) (DCP) answers "Who are you?" It enables organizations to prove their identity and attributes without relying on a central authority.
- [Data Space Protocol](https://eclipse-dataspace-protocol-base.github.io/DataspaceProtocol/) (DSP) handles "Let's agree." It manages catalog discovery, contract negotiation, and the terms under which data can be shared.
- [Data Plane Signaling](https://projects.eclipse.org/projects/technology.dataplane-signaling) (DPS) coordinates "Data flows." It ensures that once agreements are reached, data moves according to what was agreed.

These protocols are built on a trust foundation of international standards from ISO, W3C, CEN-CENELEC, and Eclipse. It's open specification turned into interoperable software that ensures organizations aren't locked into a single vendor or platform.

### Hosting Environment: Enabling Scale

The center panel shows how the [Eclipse Dataspace Components](https://eclipse-edc.github.io/documentation/for-adopters/) (EDC) stack transforms these protocols into a managed service capable of supporting thousands of participants on shared infrastructure.

**Virtual Participant Agents (VPAs)** are the key innovation. Rather than deploying separate infrastructure for each organization, VPAs provide isolated contexts within shared resources. Each organization gets:

- A **Credential Service** for storing and presenting verifiable credentials
- A **Control Plane** for making trust decisions and negotiating contracts
- A **Data Plane** for executing trusted data transfers

The **Connector Fabric Manager (CFM)** orchestrates multi-tenant operations, handling automated provisioning and lifecycle management. This is what makes DSaaS economically viable—instead of linear cost scaling with each new participant, costs grow sub-linearly because infrastructure is shared.

All of this runs on **cloud-native infrastructure**: Kubernetes for orchestration, PostgreSQL for persistence, Vault for secrets, DNS for routing, and NATS for messaging. Standard components that every cloud provider already operates.

### Dataspace: Organizations as Equals

The right panel shows what this enables: a decentralized mesh where organizations interact as equal peers, regardless of how they're deployed.

At the top sits the **Dataspace Governance Authority (DSGA)**, which establishes governance rules—not technical control. The DSGA operates credential issuers and onboarding services that verify organizations meet participation requirements.

Below that, participants (P-A, P-B, P-C in the diagram) connect peer-to-peer. Each has Credential Service, Control Plane, and Data Plane components, but notice the deployment flexibility:

- **P-A** uses DSaaS—fully managed, hosted infrastructure
- **P-B** is self-hosted—the organization runs their own stack
- **P-C** uses a hybrid approach—perhaps a managed Control Plane with on-premise Data Planes

The critical point: **any deployment model is fully interoperable**. An organization using DSaaS can negotiate contracts and share data with self-hosted participants seamlessly. The protocols don't care where the software runs.

---

## Why Trusted Data Sharing Matters

### The Business Problem

Every organization faces the same challenge: valuable data exists across organizational boundaries, but sharing it is hard. Traditional approaches create friction:

- **Point-to-point integrations** don't scale and create maintenance burden
- **Data aggregators** require giving up control and often ownership
- **Central platforms** create lock-in and single points of failure
- **Manual processes** are slow, error-prone, and don't scale

Meanwhile, the business cases for data sharing multiply: supply chain visibility, collaborative analytics, regulatory compliance, ecosystem innovation. The demand exists; the infrastructure has been missing.

### What Changes with Dataspaces

Dataspaces flip the model. Instead of centralizing data, they decentralize trust while keeping data sovereign:

- **Each organization keeps their data** where it is—in their own systems, under their control
- **Trust is established cryptographically** through verifiable credentials, not through a central authority
- **Policies are enforced automatically** by software, based on credentials presented
- **Data flows only when authorized** and only according to agreed terms

This means organizations can participate in data sharing without giving up control. A manufacturer can share production data with suppliers without that data ever leaving their infrastructure. A healthcare provider can enable research access without centralizing patient records. A retailer can collaborate with logistics partners without exposing competitive information.

### The Scale Imperative

Individual data sharing agreements are valuable but limited. The real power emerges at scale—when dozens, hundreds, or thousands of organizations can discover each other's data offerings and negotiate access programmatically.

This is where DSaaS becomes essential. Self-hosting dataspaces infrastructure is possible but expensive and operationally complex. DSaaS removes that barrier:

- **Days instead of months** to onboard new participants
- **Shared infrastructure costs** across all participants
- **Operational expertise** handled by specialists
- **Continuous updates** as protocols evolve

---

## Market Momentum

### Regulatory Drivers

The European [Data Act](https://digital-strategy.ec.europa.eu/en/policies/data-act), [Data Governance Act](https://digital-strategy.ec.europa.eu/en/policies/data-governance-act), and sector-specific regulations like [CSDDD](https://commission.europa.eu/business-economy-euro/doing-business-eu/sustainability-due-diligence-responsible-business/corporate-sustainability-due-diligence_en) are creating both requirement and opportunity for trusted data sharing. Organizations will need to demonstrate data sharing capabilities and those who can provide that capability as a service will find ready customers.

### Industry Initiatives

Major industry dataspaces are already operational or in advanced deployment:

- [Catena-X](https://catenax-ev.github.io/) in automotive manufacturing and the largest Eclipse initative [Eclipse Tractus-X](https://eclipse-tractusx.github.io/)
- [Manufacturing-X](https://factory-x.org/manufacturing-x/) for industrial production
- [Mobility Data Space](https://mobility-dataspace.eu/) in Germany and [EONA-X](https://eona-x.eu/) for transportation and tourism
- [European Health Data Space](https://health.ec.europa.eu/ehealth-digital-health-and-care/european-health-data-space-regulation-ehds_en) Regulation across multiple countries (e.g. [Sphin-X](https://sphin-x.de/) in Germany)

These initiatives represent thousands of organizations that establish data sharing infrastructure with value added services. DSaaS providers can target these initiatives with tailored offerings that meet their specific requirements.

### The Cloud Provider Opportunity

For cloud service providers, DSaaS represents a new service category. Just as managed databases, managed Kubernetes, and managed identity became standard offerings, managed dataspace infrastructure is emerging as the next wave.

The organizations pioneering DSaaS offerings today will establish market position, operational expertise, and customer relationships that late entrants will struggle to replicate.

---

## Deployment Options

### For Cloud Service Providers: Offer DSaaS

If you operate cloud infrastructure, adding DSaaS to your portfolio means:

- **New revenue stream** from a growing market
- **Customer stickiness** as data sharing becomes embedded in business processes
- **Ecosystem effects** as more participants increase value for all
- **Differentiation** in a competitive cloud market

The EDC stack is designed for multi-tenant operation. The Connector Fabric Manager handles provisioning, the EDC-V runtime supports virtual isolation, and standard cloud-native infrastructure provides a cost-effective and scalable foundation.

### For Organizations: Consume DSaaS

If your organization needs to participate in dataspaces, DSaaS offers:

- **Rapid onboarding** without infrastructure investment
- **Operational simplicity** with managed services
- **Cost predictability** through subscription models
- **Focus on business value** rather than platform operations

Most organizations should start with DSaaS and only consider self-hosting if specific requirements (data residency, custom protocols, regulatory constraints) demand it.

### For Hybrid Scenarios: Mix and Match

The interoperability of the protocol layer means you're never locked in:

- Start with fully managed DSaaS
- Move specific Data Planes on-premise as needs evolve
- Maintain managed Control Plane while running edge Data Planes in factories
- Even migrate to self-hosted entirely if strategic requirements change

This flexibility de-risks the initial decision. You're choosing a protocol ecosystem, not a vendor lock-in.

---

## What Makes EDC Different

### The Only Stack for Data Sharing at Scale

Many approaches to data sharing exist, but the Eclipse Dataspace Components stack has unique characteristics:

**Protocol-first architecture**: EDC implements open specifications (DSP, DCP, DPS) ratified by international standards bodies. Any compliant implementation can interoperate, preventing ecosystem fragmentation. The TCK ensures that all implementations meet the same standards for interoperability.

**Multi-tenant by design**: The Connector Fabric Manager and virtual isolation model were built specifically for DSaaS scenarios. This isn't traditional software retrofitted for multi-tenancy, it's engineered for it.

**Separation of control and data planes**: Trust decisions happen in the Control Plane; data movement happens in the Data Plane. This separation enables flexible deployment patterns and edge scenarios that monolithic architectures cannot support.

**Active ecosystem**: EDC has backing from major industry players, ongoing development, and a growing community. It's not a research project—it's production software deployed at scale.

### Proven at Scale

EDC powers the infrastructure behind major industry initiatives. Catena-X alone involves hundreds of organizations sharing data through EDC-based connectors. The technology has moved beyond proof-of-concept to production deployment.

---

## Getting Started

### If You're a Cloud Service Provider

1. **Evaluate the opportunity**: Identify customers for whom trusted data sharing is a priority. Look for industry initiatives, regulatory drivers, or strategic use cases that create demand.
2. **Deploy demonstrators**: The [Just Another Demonstrator ](https://github.com/Metaform/jad/blob/main/README.md)provides a complete reference implementation for hands-on exploration
3. **Read the DSaaS Implementation Guide**: Understand the operational model for running dataspaces infrastructure. Checkout existing operating models like [Catena-X](https://catenax-ev.github.io/docs/operating-model/why-introduction).
4. **Engage with the ecosystem**: Join the [Eclipse EDC community](https://dataspace.eclipse.org/) to connect with others building DSaaS offerings

### If You're an Organization

1. **Identify your dataspaces**: Which industry initiatives or partner ecosystems build on data monetization?
2. **Assess your requirements**: What data do you want to share? Which data do you need to drive your businesss? What policies must be enforced?
3. **Select a DSaaS provider**: Look for providers with experience in your industry and the technical capabilities you need
4. **Start small**: Begin with one use case to learn the model before scaling

### Next Steps

The DSaaS Implementation Guide provides technical depth for those ready to build or deeply evaluate dataspaces infrastructure. It covers:

- The EDC stack architecture in detail
- Organization onboarding workflows
- Usage patterns for different scenarios
- Production operations considerations

For technical teams evaluating DSaaS, that guide is the logical next step.

---

## Summary

Trusted data sharing is moving from concept to reality. The protocols are standardized, the software is mature, and the market demand is growing. Dataspace-as-a-Service makes this capability accessible—either as a service you consume or as a service you offer.

The organizations acting now are establishing position in what will become essential infrastructure. The question isn't whether trusted data sharing will matter—it's whether you'll be ready when it does.

:::tip Ready to Go Deeper?
The **DSaaS Implementation Guide** provides the technical foundation for understanding and deploying the EDC stack. Whether you're building a DSaaS offering or evaluating the technology, it's your next step.
:::
