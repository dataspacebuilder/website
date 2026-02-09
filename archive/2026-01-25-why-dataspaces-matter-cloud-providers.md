---
slug: why-dataspaces-matter-cloud-providers
title: Why Data Spaces Matter Now — And Why Cloud Providers Should Care
authors: [sliu]
tags: [strategy]
description: The dataspace market is emerging rapidly. Here's why cloud providers are uniquely positioned to capture it.
image: /img/guides/why-dataspaces-matter.jpeg
---

Data sharing between organizations is nothing new. What's new is the regulatory mandate, the technology maturity, and the market timing. For cloud providers, dataspaces represent a significant new service category — one that plays directly to your existing strengths.

<!-- truncate -->

## The Market Signal

The EU Data Act entered into force in January 2024. By September 2025, its provisions become applicable. Organizations across Europe — and their global trading partners — must prepare for a new data sharing regime.

Meanwhile, industry dataspaces are moving from pilot to production:

- **Catena-X** connects automotive supply chains with over 1,000 participating organizations
- **Manufacturing-X** extends the model to broader industrial manufacturing
- **DECADE-X** brings trusted data sharing to aerospace and defence
- **Mobility Data Space**, **Eona-X**, **Sphin-X** — the list continues to grow

These aren't experiments. They're operational ecosystems with real data flows and real business value.

## Why This Matters for Cloud Providers

As a cloud provider, you already have:

- **Infrastructure at scale** — compute, storage, networking, security
- **Operational excellence** — automated provisioning, monitoring, SLAs
- **Customer relationships** — existing accounts that need this capability
- **Trust** — organizations already rely on you for critical workloads

Dataspaces need all of these. The organizations joining Catena-X or Manufacturing-X need somewhere to run their connectors. Most don't want to operate this infrastructure themselves.

## The Hosted Dataspace Services Opportunity

The architecture emerging from the [European Cloud Accelerator](https://metaform.github.io/dcsa/documentation/overview/) initiative enables cloud providers to offer **Dataspace-as-a-Service**:

**For your SME customers:**
- Participate in industry dataspaces without deploying infrastructure
- Simple onboarding — no deep technical expertise required
- Managed credentials and identity
- Pay-per-use economics

**For your business:**
- New recurring revenue stream
- Differentiated offering vs. hyperscalers
- Deeper customer relationships through business-critical services
- Upsell pathway for compute, storage, and analytics

## What's Different About Dataspaces?

Traditional B2B integration (EDI, APIs, file transfers) requires point-to-point agreements. Each connection is a project. Scaling means multiplying projects.

Dataspaces flip this model:

1. **Join once, connect to many** — A single membership enables data sharing across the ecosystem
2. **Automated trust** — Verifiable credentials prove who you're dealing with, automatically
3. **Policy enforcement** — Terms are machine-readable and machine-enforced
4. **Standard protocols** — The [Dataspace Protocol (DSP)](https://eclipse-dataspace-protocol-base.github.io/DataspaceProtocol/) ensures interoperability

The result: organizations can share data with new partners in minutes, not months.

## The Technology Stack is Ready

The components are production-grade and open source:

| Component | What It Does |
|-----------|--------------|
| [EDC Connector](https://github.com/eclipse-edc/Connector) | Control plane for contract negotiation + data plane for transfers |
| [EDC Virtual Connector (EDC-V)](https://github.com/eclipse-edc/Virtual-Connector) | Multi-tenant control plane for efficient hosting |
| [Identity Hub](https://github.com/eclipse-edc/IdentityHub) | Manages verifiable credentials and decentralized identity |
| [Connector Fabric Manager](https://github.com/Metaform/connector-fabric-manager) | Tenant lifecycle and automated provisioning |

The Virtual Connector is the key enabler for cloud providers. It virtualizes the control plane, allowing thousands of tenants to share infrastructure efficiently — exactly the economics cloud providers need.

## Real Deployments, Real Lessons

Cloud providers like [Aruba](https://www.aruba.it/), [OVHcloud](https://www.ovhcloud.com/), and [StackIT](https://www.stackit.de/) are already building hosted dataspace services. The February 2026 demo at the [Data Spaces Symposium in Madrid](https://www.data-spaces-symposium.eu/) will showcase:

- Automated tenant onboarding via the Connector Fabric Manager
- Wallet provisioning with membership and compliance credentials
- Publishing and discovering data offers
- Contract negotiation based on verified credentials
- Secure data transfer

This isn't theoretical. The [status dashboard](https://metaform.github.io/dcsa/documentation/overview/_status/) shows components tracking green for the demo.

## The Competitive Window

The market is forming now. Early movers will:

- **Shape customer expectations** — Define what "dataspace services" means
- **Build operational expertise** — Learn from real deployments before competitors
- **Establish partnerships** — Connect with dataspace consortia and enterprise customers
- **Influence standards** — Participate in the Eclipse Dataspace Working Group

Waiting means playing catch-up in a market others have defined.

## What's the Business Model?

Multiple revenue models are emerging:

- **Per-tenant subscription** — Monthly fee per hosted organization
- **Transaction-based** — Fee per contract negotiation or data transfer
- **Tiered offerings** — Basic connectivity to premium analytics and compliance
- **Professional services** — Onboarding, integration, customization

The economics improve with scale. The Virtual Connector's multi-tenant architecture means marginal cost per tenant decreases as your base grows.

## Next Steps for Product Managers

If you're evaluating dataspace services for your cloud platform:

1. **Understand the architecture** — Read [The Cloud Provider's Path to Dataspace-as-a-Service](/guides/cloud-provider-path-dataspace-service)
2. **See it running** — Try [JAD (Just Another Demonstrator)](https://github.com/Metaform/jad) to deploy a complete dataspace locally
3. **Engage the ecosystem** — Join the [Eclipse Dataspace Working Group](https://dataspace.eclipse.org/)
4. **Talk to early adopters** — Connect with providers already building these services

The infrastructure exists. The standards are stabilizing. The market demand is regulatory-driven. The question isn't whether dataspaces will matter — it's whether you'll be ready when your customers ask for them.

---

**Coming next:** [The Cloud Provider's Path to Dataspace-as-a-Service](/guides/cloud-provider-path-dataspace-service) — A technical and business guide to building your offering.
