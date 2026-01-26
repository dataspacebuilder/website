---
slug: your-first-steps-as-dataspace-builder
title: "Your First Steps as a Dataspace Builder"
authors: [jvanderberg]
tags: [getting-started, onboarding, architecture, developers]
description: "Ready to build with dataspaces? Here's your personalized roadmap based on whether you're a cloud provider, developer, or organization looking to join the ecosystem."
image: /img/blog/first-steps-builder.jpeg
---

You've heard about dataspaces. You understand why they matter. Now you're ready to actually build something. But where do you start?

The answer depends on who you are and what you're trying to achieve. This guide gives you a clear, actionable path forward—whether you're a cloud provider exploring new services, a developer building integrations, or an organization looking to participate in data ecosystems.

<!-- truncate -->

## The Three Paths to Becoming a Dataspace Builder

Not everyone enters the dataspace world from the same direction. Let's break down the most effective starting points for each role.

### Path 1: Cloud Providers — Offer Dataspace-as-a-Service

If you're a cloud provider looking to add dataspace capabilities to your portfolio, you're in a strong position. You already have the infrastructure, the customer relationships, and the operational expertise. What you need is the architecture knowledge and a clear business case.

**Your roadmap:**

1. **Understand the opportunity.** Read [Why Dataspaces Matter for Cloud Providers](/blog/why-dataspaces-matter-cloud-providers) to see why this is a strategic play, not just a technical one.

2. **Learn the architecture.** The [architecture overview](/docs/architecture/overview) explains what dataspaces are and why they matter. The [components guide](/docs/architecture/components) shows how Identity Hub, Control Plane, and Data Plane work together. Pay special attention to [deployment topologies](/docs/architecture/deployment-topologies)—this is where your infrastructure advantage becomes real.

3. **Study the economics.** Multi-tenant EDC-V (Virtual Connector) is the key to margin at scale. One control plane serving thousands of tenants changes the unit economics entirely.

4. **See it running.** The [JAD Demonstrator](/blog/jad-demonstrator-dataspace-as-a-service) shows the complete Dataspace-as-a-Service experience—tenant onboarding, credential issuance, catalog publishing, contract negotiation, and data transfer.

**Key insight:** You don't need to build everything from scratch. The open-source components are production-ready. Your value-add is the managed service layer, SLAs, and integration with your existing cloud offerings.

---

### Path 2: Developers — Build with Open Components

If you're a developer or technical architect, you'll want to get hands-on quickly. Good news: the learning curve is shorter than you think. If you understand REST APIs, OAuth flows, and event-driven architectures, you already know most of the patterns.

**Your roadmap:**

1. **Get the mental model.** Start with [What Are Dataspaces?](/blog/what-are-dataspaces-plain-language) to understand the concepts without drowning in specifications.

2. **Understand the flow.** [From Zero to Dataspace](/blog/zero-to-dataspace-rapid-adoption) walks through what actually happens when two organizations negotiate a data sharing agreement.

3. **Run the MVD.** The [Minimum Viable Dataspace](https://github.com/eclipse-edc/MinimumViableDataspace) is a complete, runnable demo you can spin up locally:

```bash
git clone https://github.com/eclipse-edc/MinimumViableDataspace.git
cd MinimumViableDataspace
./gradlew build
```

4. **Explore the official docs.** The [Eclipse EDC Documentation](https://eclipse-edc.github.io/documentation/) is comprehensive once you have the concepts down.

**Key insight:** The hardest part isn't the code—it's understanding why each component exists. Spend time on the architecture docs before diving into implementation. It will save you hours of confusion later.

---

### Path 3: Organizations — Join a Dataspace

If you're representing an organization that wants to participate in data sharing ecosystems, you don't necessarily need to build anything yourself. Your path is about understanding what's possible and finding the right partners.

**Your roadmap:**

1. **Understand the value proposition.** [What Are Dataspaces?](/blog/what-are-dataspaces-plain-language) explains why this is different from traditional B2B integrations.

2. **See real applications.** Browse our [use cases](/use-cases) to see how dataspaces solve actual business problems—from emergency spare parts to carbon credentials.

3. **Find a provider.** Several cloud providers and specialized vendors now offer managed dataspace services. You don't need to run the infrastructure yourself.

4. **Join an existing ecosystem.** Industry dataspaces are already operational:
   - **Catena-X** — Automotive supply chain
   - **Manufacturing-X** — Industrial production
   - **DECADE-X** — Aerospace and defense
   - **Mobility Data Space** — Transportation and logistics

**Key insight:** For many organizations, joining an existing dataspace is faster and more practical than building one. The infrastructure and governance are already in place—you just need to connect.

---

## Essential Resources at a Glance

Whatever your path, you'll want these bookmarked:

| Resource | What It's For |
|----------|---------------|
| [Eclipse EDC GitHub](https://github.com/eclipse-edc) | Core component source code |
| [EDC Documentation](https://eclipse-edc.github.io/documentation/) | Official technical reference |
| [Minimum Viable Dataspace](https://github.com/eclipse-edc/MinimumViableDataspace) | Hands-on local demo |
| [JAD Demonstrator](https://github.com/Metaform/jad) | Full DaaS experience demo |
| [Dataspace Protocol Spec](https://eclipse-dataspace-protocol-base.github.io/DataspaceProtocol/) | DSP technical specification |
| [DCP Specification](https://eclipse-dataspace-dcp.github.io/decentralized-claims-protocol/) | Identity and credentials spec |

---

## The Component Landscape

As you go deeper, you'll encounter these core components:

### Identity & Trust Layer

- **Identity Hub** — Manages decentralized identifiers (DIDs) and verifiable credentials
- **Trust Framework** — Defines which credentials are accepted and who can issue them

### Control Plane

- **EDC Connector** — Handles catalog publishing, contract negotiation, and policy enforcement
- **EDC-V (Virtual Connector)** — Multi-tenant control plane for service providers

### Data Plane

- **Data Plane Core** — Executes secure data transfers between parties
- **Data Plane Signaling (DPS)** — Coordinates between control and data planes

Each layer builds on the one below it. Understanding this stack is the foundation for everything else.

---

## Common Questions from New Builders

**"Do I need to understand all the specs before starting?"**

No. Start with the concepts, run a demo, and reference the specs when you need specific details. The specs are comprehensive but dense—they're better as reference material than learning material.

**"Can I use only parts of the stack?"**

Yes, but carefully. The components are designed to work together. You can customize and extend, but replacing core components requires deep understanding of the protocols.

**"How production-ready is this?"**

The core components are used in production dataspaces today (Catena-X, for example). The challenge is usually operational—deployment, monitoring, key management—not the code itself.

**"Where do I ask questions?"**

- [GitHub Discussions](https://github.com/eclipse-edc/Connector/discussions) for technical questions
- [Eclipse Dataspace Working Group](https://dataspace.eclipse.org/) for standards and governance
- Our [community page](/community) for contribution opportunities

---

## Your First Week

Here's a suggested schedule for your first week as a Dataspace Builder:

| Day | Activity |
|-----|----------|
| **Day 1** | Read the conceptual guides (What Are Dataspaces?, Zero to Dataspace) |
| **Day 2** | Study the [architecture overview](/docs/architecture/overview) and [component interactions](/docs/architecture/components) |
| **Day 3** | Clone and run the MVD locally |
| **Day 4** | Walk through a use case end-to-end |
| **Day 5** | Explore the EDC documentation for your specific use case |

By the end of the week, you'll have a working mental model and hands-on experience with the actual components.

---

## Next Steps

Ready to go deeper? Here's where to head next:

- **[Explore the Architecture](/docs/architecture/overview)** — Understand dataspace architecture in detail
- **[Read More Articles](/blog)** — Learn from real-world insights and implementation patterns
- **[Join the Community](/community)** — Connect with other builders, ask questions, and contribute

Welcome to the community. Let's build trusted data infrastructure—together.
