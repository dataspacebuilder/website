---
slug: decision-maker-guide
title: "Trusted Data Sharing as Infrastructure"
authors: [a20h]
tags: [strategy, business, dsaas, decision-maker]
description: "A strategic guide for decision makers exploring Dataspace-as-a-Service. Understand how trusted data sharing creates business value, the four strategic dimensions driving adoption, and why DSaaS is the fastest path to participation."
keywords: [DSaaS, Dataspace-as-a-Service, trusted data sharing, data ecosystem, Eclipse Dataspace Components, EDC, business strategy, cloud provider]
image: /img/guides/decision-maker/dec-maker-cover.svg
---

Data has become the primary raw material of digital business. Most organizations have learned how to collect, store, and analyze data internally. What they have not solved—at least not sustainably—is how to share data across organizational boundaries without losing control, sovereignty, or legal clarity.

This gap is no longer theoretical. The EU Data Act, the Digital Product Passport, and sector-specific regulations increasingly assume that organizations can exchange data in a controlled, auditable way. Meanwhile, AI-driven value creation and ecosystem business models depend on cross-company data access. The demand is structural. The infrastructure to meet it has been missing.

Dataspaces address this problem at the architectural level. Dataspace-as-a-Service (`DSaaS`) turns that architecture into something organizations can actually adopt—and something cloud providers can productize. This guide explains why trusted data sharing is becoming unavoidable, how the Eclipse Dataspace Components (`EDC`) stack solves the problem, and where DSaaS creates a concrete strategic opportunity.

{/* truncate */}

:::tip What You'll Learn
This guide provides a business-level understanding of trusted data sharing: why it matters now, how it works, what's driving adoption, and how DSaaS enables you to participate or provide this capability to others. Whether you're a cloud service provider exploring new offerings or an organization evaluating dataspace participation, this guide maps the opportunity across four strategic dimensions that structure the decision.
:::

## Four Strategic Dimensions

Trusted data sharing is not a single-axis decision. It touches regulatory positioning, risk posture, revenue strategy, and operational design simultaneously. Before exploring the technology, it helps to see the complete decision landscape.

<!-- ───────────────────────────────────────────────────────────────── -->
<!-- INFOGRAPHIC 1: "Four Strategic Dimensions of DSaaS"             -->
<!-- Position: Here, directly after the introduction.                -->
<!-- Structure: A 2×2 grid of four colored cards/quadrants.          -->
<!--   Top-left:    "The License to Operate" (purple/violet accent)  -->
<!--                Subtitle: Regulatory Compliance & Market Access   -->
<!--                Icon: shield-with-checkmark                       -->
<!--   Top-right:   "The Shield" (blue accent)                       -->
<!--                Subtitle: Risk Minimization & IP Protection       -->
<!--                Icon: lock/shield                                 -->
<!--   Bottom-left: "The Upside" (green accent)                      -->
<!--                Subtitle: Business Value & New Revenue Models     -->
<!--                Icon: trending-up arrow                           -->
<!--   Bottom-right:"The Execution" (amber/orange accent)            -->
<!--                Subtitle: Operational Excellence & Governance     -->
<!--                Icon: gear/cog                                    -->
<!-- Each card contains a 1-sentence summary.                        -->
<!-- The grid has a center label: "DSaaS Decision Framework"         -->
<!-- File: /img/guides/decision-maker/dec-maker-four-dimensions.svg  -->
<!-- ───────────────────────────────────────────────────────────────── -->

![Four Strategic Dimensions of DSaaS](/img/guides/decision-maker/dec-maker-four-dimensions.svg)

These four clusters are not sequential phases. A cloud provider evaluating DSaaS will weigh all four simultaneously—some as market requirements, others as competitive differentiation. The sections that follow explore each in context, after establishing how the technology actually works.

---

## How Trusted Data Sharing Works

Before discussing services or revenue models, decision makers need a clear mental model. Trusted data sharing is not a single product or platform. It is an ecosystem composed of protocols, infrastructure, and governance—each solving a different class of problem.

The ecosystem has three tightly coupled layers that together enable sovereign, peer-to-peer data exchange between independent organizations.

<!-- ───────────────────────────────────────────────────────────────── -->
<!-- INFOGRAPHIC 2: "The Trusted Data Sharing Ecosystem"             -->
<!-- Position: Here, introducing the three-layer model.              -->
<!-- Structure: A horizontal triptych (three connected panels).      -->
<!--   Left panel:   "Protocols" — DCP, DSP, DPS with short labels  -->
<!--                  ("Who are you?", "Let's agree", "Data flows")  -->
<!--                  Foundation bar: ISO, W3C, CEN-CENELEC, Eclipse -->
<!--   Center panel: "Hosting & Scale" — VPA architecture            -->
<!--                  Three stacked boxes: Credential Service,       -->
<!--                  Control Plane, Data Plane inside a "VPA" frame -->
<!--                  CFM orchestrator arrow above                   -->
<!--                  Cloud-native icons below: K8s, PG, Vault, DNS -->
<!--   Right panel:  "Peer-to-Peer Interaction" — Mesh diagram      -->
<!--                  DSGA at top (governance, not control)          -->
<!--                  P-A (DSaaS), P-B (Self-hosted), P-C (Hybrid)  -->
<!--                  Bidirectional arrows between all three         -->
<!-- Connecting arrows between panels show the flow:                 -->
<!--   Protocols → enable → Hosting → enables → Peer-to-Peer        -->
<!-- File: /img/guides/decision-maker/dec-maker-ecosystem.svg       -->
<!-- (This matches the existing dec-maker-1.svg layout)             -->
<!-- ───────────────────────────────────────────────────────────────── -->

![The Trusted Data Sharing Ecosystem](/img/guides/decision-maker/dec-maker-ecosystem.svg)

### Protocols: The Trust Foundation

At the foundation sit open, community-driven protocols. These protocols define how organizations identify each other, how they agree on usage terms, and how data is exchanged—without introducing a central operator that controls the ecosystem.

[`DCP`](https://eclipse-dataspace-dcp.github.io/decentralized-claims-protocol/) (Decentralized Claims Protocol) establishes verifiable identity and attributes. Organizations prove who they are, and which roles or certifications they hold, using cryptographic credentials rather than platform accounts. This removes dependency on a single trust anchor.

[`DSP`](https://eclipse-dataspace-protocol-base.github.io/DataspaceProtocol/) (Data Space Protocol) governs discovery and agreement. It defines how data offers are found, how contracts are negotiated, and how policies are agreed upon—machine-to-machine, not via PDFs and emails.

[`DPS`](https://projects.eclipse.org/projects/technology.dataplane-signaling) (Data Plane Signaling) coordinates authorized data movement. Once terms are agreed, it ensures that data flows only under those terms and only between the agreed parties.

These protocols are not proprietary inventions. They build on international standards from ISO, W3C, CEN-CENELEC, and the Eclipse Foundation. The strategic implication is straightforward: organizations adopting this stack are choosing interoperability over lock-in. For cloud providers, this means DSaaS is not a closed platform play but an infrastructure service aligned with open standards—a prerequisite for credibility in regulated and industrial markets.

### Infrastructure: From Protocols to Scale

Protocols alone do not create a market. What turns standards into adoption is operational feasibility at scale. This is where the [Eclipse Dataspace Components](https://eclipse-edc.github.io/documentation/for-adopters/) (`EDC`) stack becomes decisive.

The core architectural idea is the `Virtual Participant Agent` (`VPA`). Instead of deploying a full dataspace stack per organization, VPAs provide logically isolated participant contexts on shared infrastructure. Each participant behaves like a sovereign peer, but the operational cost is shared across the platform.

Each VPA encapsulates three capabilities: a `Credential Service` that manages verifiable credentials and claims, a `Control Plane` that evaluates trust, policies, and contracts, and a `Data Plane` that executes the actual data transfer according to agreed rules.

Multi-tenant operation is orchestrated by the `Connector Fabric Manager` (`CFM`), which automates provisioning, lifecycle management, and isolation. This is what turns dataspaces from bespoke projects into repeatable services. Costs scale sub-linearly with participant count, onboarding becomes automated, and dataspace participation shifts from a capital-intensive project to an operational service offering.

All of this runs on standard cloud-native components—`Kubernetes`, `PostgreSQL`, `Vault`, `DNS`, `NATS`. There is no exotic infrastructure requirement. Any serious cloud provider already operates these primitives.

### Interaction: Organizations as Equals

What the protocol and hosting layers enable is a fundamentally different interaction model between organizations. Dataspaces are peer-to-peer by design. There is no central data lake, no mandatory aggregator, and no platform owner that technically controls access.

A `Dataspace Governance Authority` (`DSGA`) defines participation rules and operates credential issuance and onboarding services. Crucially, it does not mediate data flows or host participant data. Governance defines the rules of the game; enforcement happens between participants at interaction time through identity proofs and policy evaluation.

<!-- ───────────────────────────────────────────────────────────────── -->
<!-- INFOGRAPHIC 3: "Deployment Flexibility"                         -->
<!-- Position: Here, illustrating interoperability across models.    -->
<!-- Structure: Simple horizontal diagram with three deployment      -->
<!--   boxes connected by protocol arrows:                           -->
<!--   [P-A: Fully Managed DSaaS] ←→ [P-B: Self-Hosted] ←→         -->
<!--   [P-C: Hybrid (managed CP + on-prem DP)]                      -->
<!--   Below: single bar labeled "DSP / DCP / DPS — full            -->
<!--   interoperability regardless of deployment model"              -->
<!--   Key message: "Your architecture choice. Their architecture    -->
<!--   choice. Same protocol. Full interoperability."                -->
<!-- File: /img/guides/decision-maker/dec-maker-deployment-flex.svg  -->
<!-- ───────────────────────────────────────────────────────────────── -->

![Deployment Flexibility](/img/guides/decision-maker/dec-maker-deployment-flex.svg)

Participants then interact as equals. One organization may use a fully managed DSaaS offering. Another may run its own stack. A third may combine managed control components with on-premise data planes. From the protocol perspective, these choices are irrelevant—all deployment models are fully interoperable.

For customers, this removes fear of lock-in. For cloud providers, it removes a major sales obstacle: adopting DSaaS does not foreclose future architectural choices.

---

## Why Trusted Data Sharing Matters Now

Most organizations already know they want to share data. The problem is not demand—it is feasibility. Point-to-point integrations accumulate technical debt. Central platforms demand surrendered control. Data aggregators introduce dependency and misaligned incentives. Manual processes cannot support ecosystem-level collaboration. At the same time, supply chains demand transparency, regulators demand traceability, and AI use cases demand access to distributed datasets.

The gap between ambition and infrastructure is widening. Dataspaces close it. The four strategic dimensions explain why different types of organizations are converging on the same conclusion.

### The License to Operate — Regulatory Compliance & Market Access

European regulation is no longer neutral on data sharing. The [Data Act](https://digital-strategy.ec.europa.eu/en/policies/data-act), the [Data Governance Act](https://digital-strategy.ec.europa.eu/en/policies/data-governance-act), sector-specific mandates like [CSDDD](https://commission.europa.eu/business-economy-euro/doing-business-eu/sustainability-due-diligence-responsible-business/corporate-sustainability-due-diligence_en), and the Digital Product Passport (`DPP`) framework increasingly assume the existence of controlled, auditable data exchange. Organizations will need to demonstrate data sharing capabilities—not as a competitive advantage, but as a basic condition of market participation.

The compliance timeline is not distant. The DPP alone will require manufacturers to provide lifecycle data for batteries (2027), textiles, and other product categories in structured, machine-readable form across organizational boundaries. Organizations that cannot participate in compliant data exchange risk being excluded from value chains entirely. This is not a fine—it is market exclusion.

For cloud providers, this creates a structurally enforced market. Compliance-driven demand does not depend on voluntary adoption curves. Some organizations will build the required infrastructure themselves. Many will buy it. Those who can provide compliant data sharing as a managed service will find customers whose regulatory deadlines make the purchase decision urgent rather than exploratory.

### The Shield — Risk Minimization & IP Protection

Sharing data without sovereignty safeguards is a risk most organizations will not accept—especially in manufacturing, healthcare, and defense. Dataspaces invert the traditional model. Instead of moving data to a trusted third party, they move trust to where the data already resides.

Organizations keep data in their own systems. Access decisions are made cryptographically, based on `verifiable credentials`, not on contractual promises alone. Policies are enforced by software at the moment of interaction—not by after-the-fact audits. A manufacturer can share production metrics without exposing intellectual property. A hospital can enable research access without centralizing patient databases. Every data exchange is bounded by machine-enforceable terms, and every participant retains sovereign control over what they share, with whom, and under which conditions.

:::info The Mental Model Shift
Traditional data sharing requires you to trust the platform. Dataspaces require you to trust the protocol. The difference is architectural: trust is verified cryptographically at every interaction, not assumed from an access grant.
:::

For cloud providers offering DSaaS, the risk story is also a sales argument. Customers do not need to trust your platform with their data—the protocol enforces the boundaries. This changes the procurement conversation fundamentally: DSaaS becomes infrastructure for trust, not a request for trust.

### The Upside — Business Value & New Revenue Models

Compliance investment does not have to be sunk cost. The infrastructure built to satisfy regulatory requirements can be turned into a commercial offering. Cloud providers who deploy the `EDC` stack for internal compliance can offer the same capability as a managed service—converting a cost center into a revenue stream.

For organizations, DSaaS provides the fastest path from zero to value. Instead of months of infrastructure buildout, legal negotiation, and operations hiring, organizations can onboard in days, participate in existing dataspaces, and begin discovering and negotiating data access immediately. The economic model is subscription-based and predictable, with no upfront capital expenditure.

The path from "we need to comply" to "we are exchanging data" collapses from quarters to weeks. For cloud providers, DSaaS creates recurring revenue, increases customer stickiness as data sharing becomes embedded in business processes, and positions the provider at the center of emerging data ecosystems where network effects compound over time.

### The Execution — Operational Excellence & Governance

Scalable implementation requires more than good architecture. It requires plug-and-play onboarding for SME partners who lack the resources to operate their own dataspace stack, automated governance that does not depend on manual policy enforcement, and infrastructure that grows sub-linearly with participant count.

The `EDC` stack addresses each of these. The `CFM` compresses onboarding from months to days through automated provisioning workflows. `VPA`-based multi-tenancy means adding the hundredth participant costs a fraction of what adding the first one did. And governance is decentralized by design—the `DSGA` defines rules, but enforcement is performed by participants at interaction time, eliminating the operational bottleneck of centralized approval.

<!-- ───────────────────────────────────────────────────────────────── -->
<!-- INFOGRAPHIC 4: "From Problem to Approach to Result"             -->
<!-- Position: Here, after the four clusters, as a synthesis.        -->
<!-- Structure: A horizontal flow diagram with three stages:         -->
<!--   PROBLEM → APPROACH → RESULT                                   -->
<!--   Stage 1 "Problem" (red/dark):                                 -->
<!--     - Regulatory deadlines approaching                          -->
<!--     - IP exposure risk in sharing                               -->
<!--     - No infrastructure for ecosystem-scale exchange            -->
<!--     - SME partners cannot self-host                             -->
<!--   Stage 2 "Approach" (blue/neutral):                            -->
<!--     - Open protocols (DCP, DSP, DPS)                            -->
<!--     - Multi-tenant EDC stack (VPA + CFM)                        -->
<!--     - Decentralized governance (DSGA)                           -->
<!--     - Cloud-native deployment                                   -->
<!--   Stage 3 "Result" (green):                                     -->
<!--     - Compliance without market exclusion                       -->
<!--     - Sovereign data sharing at scale                           -->
<!--     - DSaaS as new revenue category                             -->
<!--     - Plug-and-play partner onboarding                          -->
<!--   Arrows connect each problem to its approach and result.       -->
<!-- File: /img/guides/decision-maker/dec-maker-problem-approach-result.svg -->
<!-- ───────────────────────────────────────────────────────────────── -->

![From Problem to Approach to Result](/img/guides/decision-maker/dec-maker-problem-approach-result.svg)

For most participants—and especially for SMEs joining larger ecosystem initiatives—DSaaS is not a convenience layer. It is the scaling mechanism that turns dataspaces from pilot projects into operating ecosystems.

---

## Market Momentum

The strategic argument for DSaaS is not speculative. The market is forming along two axes: regulatory mandates that create demand, and industry initiatives that prove the model works at scale.

### Regulation as Market Catalyst

European regulation is creating a structurally enforced market for trusted data sharing. The Data Act establishes obligations for data access and sharing. The Data Governance Act creates frameworks for trusted data intermediaries. The CSDDD introduces due diligence requirements across supply chains. And sector-specific instruments—DPP for manufacturing, EHDS for healthcare—define concrete data exchange obligations with concrete timelines.

Organizations will need to demonstrate compliant data sharing capabilities. Some will build them. Many will buy them. The demand curve is not voluntary—it is regulatory.

### Industry Adoption Is Already Underway

Large-scale dataspace initiatives are no longer experimental. They are operational environments with active participants and live data exchange.

<!-- ───────────────────────────────────────────────────────────────── -->
<!-- INFOGRAPHIC 5: "Industry Dataspaces in Production"              -->
<!-- Position: Here, illustrating the breadth of adoption.           -->
<!-- Structure: A horizontal timeline or sector map showing:         -->
<!--   Four sector columns with initiative logos/names:              -->
<!--   Automotive: Catena-X / Eclipse Tractus-X                      -->
<!--   Manufacturing: Manufacturing-X / Factory-X                    -->
<!--   Mobility: Mobility Data Space / EONA-X                        -->
<!--   Healthcare: European Health Data Space / Sphin-X              -->
<!--   Below each: "Hundreds/thousands of participants"              -->
<!--   Bottom bar: "Common pattern: Infrastructure needed once,      -->
<!--   participation needed many times."                             -->
<!-- File: /img/guides/decision-maker/dec-maker-industry-map.svg     -->
<!-- ───────────────────────────────────────────────────────────────── -->

![Industry Dataspaces in Production](/img/guides/decision-maker/dec-maker-industry-map.svg)

| Initiative | Sector | Scale |
|---|---|---|
| [Catena-X](https://catenax-ev.github.io/) / [Eclipse Tractus-X](https://eclipse-tractusx.github.io/) | Automotive manufacturing | Hundreds of organizations; largest Eclipse initiative |
| [Manufacturing-X](https://factory-x.org/manufacturing-x/) / Factory-X | Industrial production | Cross-sector manufacturing ecosystem |
| [Mobility Data Space](https://mobility-dataspace.eu/) / [EONA-X](https://eona-x.eu/) | Transportation & tourism | Pan-European mobility data exchange |
| [European Health Data Space](https://health.ec.europa.eu/ehealth-digital-health-and-care/european-health-data-space-regulation-ehds_en) / [Sphin-X](https://sphin-x.de/) | Healthcare | Multi-country regulation |

The pattern across these initiatives is consistent: infrastructure is needed once, participation is needed many times. Managed offerings naturally emerge as the efficient deployment model.

### Why This Matters for Cloud Providers

Cloud markets mature by abstraction. Compute, storage, databases, Kubernetes, identity—each became a managed service once complexity exceeded what customers wanted to operate themselves. Dataspaces are reaching that threshold now.

The organizations pioneering DSaaS offerings today are establishing operational learning, ecosystem credibility, and customer proximity that late entrants will struggle to replicate. DSaaS is a new service category, not a feature addition. Timing matters.

---

## What Makes EDC Different

Many approaches to data sharing exist—integration middleware, central data platforms, API gateways. The `EDC` stack has characteristics that set it apart.

**Protocol-first, not platform-first.** `EDC` implements open specifications (`DSP`, `DCP`, `DPS`) ratified by international standards bodies. Any compliant implementation can interoperate, preventing ecosystem fragmentation. The Technology Compatibility Kit (`TCK`) ensures that all implementations meet the same interoperability standards. This is not a closed platform play—it is infrastructure aligned with vendor-neutral specifications.

**Multi-tenant by design.** The `Connector Fabric Manager` and virtual isolation model were built specifically for DSaaS scenarios. This is not traditional software retrofitted for multi-tenancy—it is engineered for it. Costs grow sub-linearly with participant count because infrastructure is shared, making the economics of managed dataspace hosting viable from the start.

**Separation of `Control Plane` and `Data Plane`.** Trust decisions happen in the `Control Plane`; data movement happens in the `Data Plane`. This separation enables deployment patterns that monolithic architectures cannot support: edge data planes in factories, managed control planes in the cloud, data planes co-located with OT systems. The `Control Plane` can be fully managed while `Data Planes` run wherever data proximity or regulatory requirements demand.

**Active industrial ecosystem.** `EDC` has backing from major industry players, ongoing development, and a growing community. It powers the infrastructure behind Catena-X and other large-scale initiatives. This is production software deployed at scale, not a research project.

:::note Choosing EDC Is Choosing an Ecosystem
When you adopt `EDC`, you are not choosing a tool. You are choosing an ecosystem architecture—one backed by open governance, international standards, and a community of operators who share operational knowledge and contribute improvements.
:::

---

## Deployment Options

The dataspace protocol layer guarantees interoperability across deployment models. This means the initial deployment decision carries low switching cost—organizations can change their minds without breaking compatibility.

### For Cloud Service Providers: Offering DSaaS

For providers operating cloud infrastructure, DSaaS is a logical extension of existing capabilities. It builds on familiar primitives (`Kubernetes`, `PostgreSQL`, `Vault`) while addressing a new class of customer problem: inter-organizational trust and data exchange.

The `EDC` stack is explicitly designed for multi-tenant operation. The `CFM` handles provisioning and lifecycle automation. `EDC-V` provides runtime isolation. The protocol layer guarantees interoperability beyond your own platform—meaning your customers can share data with participants hosted anywhere.

DSaaS creates recurring revenue from a growing, regulation-driven market. It increases customer stickiness as data sharing becomes embedded in business processes. And it positions the provider at the center of emerging data ecosystems where each new participant increases the value for all others.

### For Organizations: Consuming DSaaS

For most organizations, operating dataspace infrastructure is not a core competency and should not become one. DSaaS allows participation without upfront investment, with predictable operational cost and professional managed operations.

Self-hosting remains an option—but typically only makes sense once participation is proven and requirements clearly exceed what managed offerings provide. Starting with DSaaS and evaluating self-hosting later is the lower-risk path. The protocol guarantees that migration is technically feasible at any point.

### Hybrid Scenarios: Designing for Change

One of the strongest properties of the dataspace approach is architectural freedom. Organizations can start with fully managed DSaaS, move specific `Data Planes` on-premise as data proximity or regulatory needs evolve, maintain a managed `Control Plane` while running edge `Data Planes` in factories, or migrate to fully self-hosted infrastructure if strategic requirements change.

This optionality reduces strategic risk and simplifies the initial decision. You are choosing a protocol ecosystem, not a vendor lock-in.

<!-- ───────────────────────────────────────────────────────────────── -->
<!-- INFOGRAPHIC 6: "Deployment Evolution Path"                      -->
<!-- Position: Here, after the hybrid section.                       -->
<!-- Structure: A stepped timeline showing deployment evolution:     -->
<!--   Step 1: "Start Managed" — Full DSaaS (all components hosted) -->
<!--   Step 2: "Go Hybrid" — Managed CP + on-prem DP                -->
<!--   Step 3: "Full Control" — Self-hosted (optional)               -->
<!--   Below: "Protocol interoperability preserved at every step"    -->
<!--   Each step has a small icon and 1 sentence.                    -->
<!--   Arrow at bottom: "No vendor lock-in at any stage"             -->
<!-- File: /img/guides/decision-maker/dec-maker-deployment-path.svg  -->
<!-- ───────────────────────────────────────────────────────────────── -->

![Deployment Evolution Path](/img/guides/decision-maker/dec-maker-deployment-path.svg)

---

## Getting Started

Early engagement reduces uncertainty and builds internal competence before scale pressure hits. The steps differ depending on whether you intend to provide or consume DSaaS—but both paths converge on the same ecosystem.

### If You're a Cloud Service Provider

The following steps move from evaluation to operational readiness. They are designed to be executed in sequence, with each step informing the next.

- **Evaluate the opportunity.** Identify customers for whom trusted data sharing is becoming a priority—whether driven by regulation, ecosystem participation, or supply chain requirements.
- **Deploy a reference setup.** The [Just Another Demonstrator (JAD)](https://github.com/Metaform/jad/blob/main/README.md) provides a complete reference implementation for hands-on exploration of the `EDC` stack in a multi-tenant configuration.
- **Study DSaaS operational models.** Understand cost structures, onboarding workflows, and tenant lifecycle management. Review existing operating models like the [Catena-X operating model](https://catenax-ev.github.io/docs/operating-model/why-introduction) for real-world reference.
- **Engage with the ecosystem.** Join the [Eclipse Dataspace Working Group](https://dataspace.eclipse.org/) to connect with others building DSaaS offerings, contribute to protocol evolution, and access shared operational knowledge.

The [Operating Multi-Tenant Dataspace Environments](/guides/ops-multi-tenant-ds-env-guide) guide provides the technical depth for teams ready to build. It covers platform architecture, tenant onboarding workflows, the sharing runtime, and production operations considerations.

### If You're an Organization

- **Identify relevant dataspaces.** Which industry initiatives or partner ecosystems are building on trusted data sharing? Where are your regulatory obligations heading?
- **Define your data assets and access needs.** What data do you want to share? Which data do you need to drive your business? What policies must be enforced?
- **Select a DSaaS provider.** Look for providers with experience in your sector, familiarity with the `EDC` protocol stack, and the operational maturity to support your compliance requirements.
- **Start with one use case.** Begin with a bounded scenario to learn the model, prove value, and build internal competence before scaling across the organization.

---

## Summary

Trusted data sharing is no longer a future concept. The protocols are stable, the software is proven, and the demand is structural. `DSaaS` is the mechanism that turns this reality into an operational and commercial opportunity.

The four strategic dimensions—regulatory compliance, IP protection, new revenue models, and operational scalability—each provide independent justification for action. Together, they make the case that trusted data sharing is not an optional enhancement but an emerging infrastructure category.

For decision makers, the relevant question is not *if* this matters—but where you want to sit in the emerging value chain.

:::tip Ready to Go Deeper?
The **[Operating Multi-Tenant Dataspace Environments](/guides/ops-multi-tenant-ds-env-guide)** guide provides the technical foundation for understanding and deploying the `EDC` stack. Whether you're building a DSaaS offering or evaluating the technology, it's your next step.
:::

---

<!-- ═══════════════════════════════════════════════════════════════ -->
<!-- APPENDIX: INFOGRAPHIC SPECIFICATIONS                          -->
<!-- This section is for the design team. Remove before publishing.-->
<!-- ═══════════════════════════════════════════════════════════════ -->

## Appendix: Infographic Specifications (Design Brief)

This appendix describes six proposed infographics, their placement in the guide, and their intended structure. All infographics should follow the visual language of the [Operating Multi-Tenant Dataspace Environments](/guides/ops-multi-tenant-ds-env-guide) guide: clean lines, muted professional palette, clear labels, no decorative elements.

### Infographic 1 — Four Strategic Dimensions of DSaaS

**Position:** After the "Four Strategic Dimensions" introduction, before the ecosystem section.

**Purpose:** Provide an at-a-glance decision framework that anchors the entire guide.

**Structure:** A 2×2 grid with four quadrants, each representing one strategic cluster.

| Quadrant | Title | Subtitle | Color | Icon |
|---|---|---|---|---|
| Top-left | The License to Operate | Regulatory Compliance & Market Access | Violet (#7c3aed) | Shield with checkmark |
| Top-right | The Shield | Risk Minimization & IP Protection | Blue (#0369a1) | Lock |
| Bottom-left | The Upside | Business Value & New Revenue Models | Green (#047857) | Trending-up arrow |
| Bottom-right | The Execution | Operational Excellence & Governance | Amber (#b45309) | Gear/cog |

Each quadrant contains a 1-sentence summary (the same text as in the cluster cards in the guide). Center label: "DSaaS Decision Framework". Dimensions: ~920×520px.

**File path:** `/img/guides/decision-maker/dec-maker-four-dimensions.svg`

---

### Infographic 2 — The Trusted Data Sharing Ecosystem

**Position:** At the start of "How Trusted Data Sharing Works."

**Purpose:** Establish the three-layer mental model that the rest of the guide builds on.

**Structure:** Horizontal triptych with three connected panels.

| Panel | Title | Content |
|---|---|---|
| Left | Protocols | `DCP` ("Who are you?"), `DSP` ("Let's agree"), `DPS` ("Data flows"). Foundation bar showing: ISO, W3C, CEN-CENELEC, Eclipse |
| Center | Hosting & Scale | VPA architecture: three stacked boxes (Credential Service, Control Plane, Data Plane) inside a "VPA" frame. `CFM` orchestrator arrow. Cloud-native icons: K8s, PostgreSQL, Vault, DNS, NATS |
| Right | Peer-to-Peer | `DSGA` at top (governance role). Three participants: P-A (DSaaS), P-B (Self-hosted), P-C (Hybrid). Bidirectional arrows between all |

Connecting flow: Protocols → enable → Hosting → enables → Peer-to-Peer. Dimensions: ~920×480px.

**File path:** `/img/guides/decision-maker/dec-maker-ecosystem.svg`

:::note
This is the existing `dec-maker-1.svg` layout. Reuse or refine the current version.
:::

---

### Infographic 3 — Deployment Flexibility

**Position:** End of the "Interaction: Organizations as Equals" subsection.

**Purpose:** Reinforce the core message that deployment model does not affect interoperability.

**Structure:** Three deployment boxes arranged horizontally, connected by bidirectional protocol arrows.

```
[P-A: Fully Managed DSaaS] ←——→ [P-B: Self-Hosted] ←——→ [P-C: Hybrid]
          └──────── DSP / DCP / DPS ─── Full Interoperability ────────┘
```

Key message below: *"Your architecture choice. Their architecture choice. Same protocol. Full interoperability."* Dimensions: ~760×220px.

**File path:** `/img/guides/decision-maker/dec-maker-deployment-flex.svg`

---

### Infographic 4 — From Problem to Approach to Result

**Position:** After the four strategic dimension sections, as a synthesis before "Market Momentum."

**Purpose:** Tie the four clusters together by showing the causal chain from business problem through technical approach to strategic result.

**Structure:** Three-column flow diagram.

| Column | Label | Content |
|---|---|---|
| Left (red/dark) | Problem | Regulatory deadlines approaching · IP exposure risk · No ecosystem-scale infrastructure · SME partners cannot self-host |
| Center (blue) | Approach | Open protocols (DCP, DSP, DPS) · Multi-tenant EDC (VPA + CFM) · Decentralized governance (DSGA) · Cloud-native deployment |
| Right (green) | Result | Compliance without market exclusion · Sovereign data sharing at scale · DSaaS as new revenue category · Plug-and-play partner onboarding |

Arrows connecting each problem item to its corresponding approach and result. Dimensions: ~920×400px.

**File path:** `/img/guides/decision-maker/dec-maker-problem-approach-result.svg`

---

### Infographic 5 — Industry Dataspaces in Production

**Position:** Within the "Market Momentum" section, after the adoption narrative.

**Purpose:** Show the breadth and maturity of real-world dataspace adoption.

**Structure:** Four sector columns arranged horizontally.

| Column | Sector | Initiatives | Note |
|---|---|---|---|
| 1 | Automotive | Catena-X, Eclipse Tractus-X | Largest Eclipse initiative |
| 2 | Manufacturing | Manufacturing-X, Factory-X | Cross-sector ecosystem |
| 3 | Mobility | Mobility Data Space, EONA-X | Pan-European |
| 4 | Healthcare | EHDS, Sphin-X | Multi-country regulation |

Bottom bar spanning all columns: *"Common pattern: Infrastructure needed once, participation needed many times."* Each column includes a sector icon and brief scale indicator (e.g., "hundreds of participants"). Dimensions: ~920×320px.

**File path:** `/img/guides/decision-maker/dec-maker-industry-map.svg`

---

### Infographic 6 — Deployment Evolution Path

**Position:** After the "Hybrid Scenarios" subsection in Deployment Options.

**Purpose:** Visualize the migration path from fully managed to self-hosted, emphasizing that switching cost is low.

**Structure:** Stepped timeline with three stages.

```
Step 1                    Step 2                     Step 3
┌─────────────────┐      ┌──────────────────┐       ┌──────────────────┐
│  Start Managed  │ ───→ │   Go Hybrid      │ ───→  │  Full Control    │
│  Full DSaaS     │      │  Managed CP +    │       │  Self-Hosted     │
│                 │      │  On-prem DP      │       │  (optional)      │
└─────────────────┘      └──────────────────┘       └──────────────────┘
     ══════════ Protocol interoperability preserved at every step ══════════
                        ▼ No vendor lock-in at any stage ▼
```

Dimensions: ~760×260px.

**File path:** `/img/guides/decision-maker/dec-maker-deployment-path.svg`
