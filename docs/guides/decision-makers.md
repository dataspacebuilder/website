# Guide: Trusted Data Sharing as Infrastructure

*For technical decision-makers, cloud provider leadership, and business strategists*

---

## What This Guide Covers

This guide provides a business-level understanding of trusted data sharing: why it matters now, how it works, what's driving adoption, and how Dataspace-as-a-Service (DSaaS) enables you to participate — or provide this capability to others.

If you haven't already, read the [Get Started](../get-started.md) page first to see the technology in action. This guide provides the strategic framing around that experience.

---

## Four Strategic Dimensions

Trusted data sharing is not a single-axis decision. It touches regulatory positioning, risk posture, revenue strategy, and operational design simultaneously.

### 1. The License to Operate — Regulatory Compliance & Market Access

European regulation is no longer neutral on data sharing. The [Data Act](https://digital-strategy.ec.europa.eu/en/policies/data-act), the [Data Governance Act](https://digital-strategy.ec.europa.eu/en/policies/data-governance-act), sector-specific mandates like [CSDDD](https://commission.europa.eu/business-economy-euro/doing-business-eu/sustainability-due-diligence-responsible-business/corporate-sustainability-due-diligence_en), and the Digital Product Passport (DPP) framework increasingly assume the existence of controlled, auditable data exchange.

The compliance timeline is not distant. The DPP alone will require manufacturers to provide lifecycle data for batteries (2027), textiles, and other product categories in structured, machine-readable form across organizational boundaries.

Organizations that cannot participate in compliant data exchange risk being excluded from value chains entirely. This is not a fine — it is market exclusion.

For cloud providers, compliance-driven demand does not depend on voluntary adoption. Some organizations will build. Many will buy.

### 2. The Shield — Risk Minimization & IP Protection

Sharing data without sovereignty safeguards is a risk most organizations will not accept. Dataspaces invert the traditional model: instead of moving data to a trusted third party, they move trust to where the data already resides.

- Organizations keep data in their own systems
- Access decisions are made cryptographically, based on verifiable credentials
- Policies are enforced by software at the moment of interaction
- Every data exchange is bounded by machine-enforceable terms

For cloud providers offering DSaaS, this changes the procurement conversation: DSaaS becomes infrastructure for trust, not a request for trust.

### 3. The Upside — Business Value & New Revenue Models

The infrastructure built for compliance can be turned into a commercial offering. Cloud providers who deploy the EDC stack for internal requirements can offer the same capability as a managed service — converting a cost center into a revenue stream.

For organizations, DSaaS provides the fastest path from zero to value. Onboard in days, participate in existing dataspaces, and begin discovering and negotiating data access immediately. The economic model is subscription-based and predictable.

DSaaS creates recurring revenue, increases customer stickiness as data sharing becomes embedded in business processes, and positions the provider at the center of emerging data ecosystems.

### 4. The Execution — Operational Excellence & Governance

Scalable implementation requires:
- Plug-and-play onboarding for SME partners who lack resources for their own stack
- Automated governance that doesn't depend on manual policy enforcement
- Infrastructure that scales sub-linearly with participant count

The EDC stack addresses each of these. CFM compresses onboarding from months to days. Multi-tenant architecture means adding the hundredth participant costs a fraction of the first. Governance is decentralized by design — the DSGA defines rules, enforcement happens between participants.

---

## How Trusted Data Sharing Works

The ecosystem has three tightly coupled layers:

### Protocols: The Trust Foundation
Open, community-driven protocols define how organizations identify each other (DCP), how they agree on usage terms (DSP), and how data is exchanged (DPS). Built on standards from ISO, W3C, CEN-CENELEC, and the Eclipse Foundation. This is infrastructure aligned with open standards — a prerequisite for credibility in regulated markets.

### Infrastructure: From Protocols to Scale
The multi-tenant architecture provides logically isolated participant contexts on shared infrastructure. Each participant behaves like a sovereign peer; operational cost is shared across the platform. Multi-tenant operation is orchestrated by CFM, which automates provisioning and lifecycle management.

All of this runs on standard cloud-native components: Kubernetes, PostgreSQL, Vault, DNS, NATS. No exotic infrastructure required.

### Interaction: Organizations as Equals
Dataspaces are peer-to-peer. No central data lake, no mandatory aggregator, no platform owner that controls access. The DSGA defines participation rules but does not mediate data flows. Governance defines the rules; enforcement happens between participants.

---

## Market Momentum

### Regulation as Market Catalyst
European regulation is creating structurally enforced demand. The Data Act, Data Governance Act, CSDDD, DPP, and EHDS all assume or mandate data sharing capabilities. The demand curve is regulatory, not voluntary.

### Industry Adoption

| Initiative | Sector | Scale |
|---|---|---|
| [Catena-X](https://catenax-ev.github.io/) / [Eclipse Tractus-X](https://eclipse-tractusx.github.io/) | Automotive | Hundreds of organizations; largest Eclipse initiative |
| [Manufacturing-X](https://factory-x.org/manufacturing-x/) / Factory-X | Industrial production | Cross-sector manufacturing ecosystem |
| [Mobility Data Space](https://mobility-dataspace.eu/) / [EONA-X](https://eona-x.eu/) | Transportation | Pan-European mobility data exchange |
| [European Health Data Space](https://health.ec.europa.eu/ehealth-digital-health-and-care/european-health-data-space-regulation-ehds_en) | Healthcare | Multi-country regulation |

The pattern is consistent: infrastructure is needed once, participation is needed many times.

### Why Timing Matters
Cloud markets mature by abstraction. Dataspaces are reaching the threshold where complexity exceeds what customers want to operate themselves. Organizations pioneering DSaaS today establish operational learning, ecosystem credibility, and customer proximity that late entrants will struggle to replicate.

---

## What Makes EDC Different

- **Protocol-first, not platform-first** — Implements open specifications (DSP, DCP, DPS) ratified by international standards bodies. The TCK ensures interoperability. Not a closed platform play — infrastructure aligned with vendor-neutral specs.
- **Multi-tenant by design** — CFM and the virtual isolation model were built specifically for DSaaS. Sub-linear cost scaling.
- **Separation of Control Plane and Data Plane** — Edge data planes in factories, managed control planes in the cloud, data planes co-located with OT systems. Deployment patterns that monolithic architectures cannot support.
- **Active industrial ecosystem** — Backed by major industry players, powering Catena-X and other large-scale initiatives. Production software at scale.

---

## Deployment Options

### For Cloud Service Providers: Offering DSaaS
DSaaS is a logical extension of existing cloud capabilities. The EDC stack runs on familiar primitives (Kubernetes, PostgreSQL, Vault). CFM handles provisioning and lifecycle. The protocol layer guarantees interoperability beyond your platform. Recurring revenue from a regulation-driven market.

### For Organizations: Consuming DSaaS
For most organizations, operating dataspace infrastructure is not a core competency. DSaaS allows participation without upfront investment, with predictable cost and professional managed operations. Self-hosting remains an option — but starting with DSaaS and evaluating later is the lower-risk path.

### Hybrid Scenarios
Start with fully managed DSaaS. Move specific Data Planes on-premise as needs evolve. Maintain a managed Control Plane while running edge Data Planes. Migrate to fully self-hosted if requirements change. Protocol interoperability is preserved at every step.

---

## Getting Started

### If You're a Cloud Service Provider

1. **Evaluate the opportunity** — Identify customers for whom trusted data sharing is becoming a priority
2. **Deploy a reference setup** — [JAD (Just Another Demonstrator)](https://github.com/Metaform/jad) provides a complete reference implementation
3. **Study operational models** — Review the [Catena-X operating model](https://catenax-ev.github.io/docs/operating-model/why-introduction) for real-world reference
4. **Engage with the ecosystem** — Join the [Eclipse Dataspace Working Group](https://dataspace.eclipse.org/)

Then read the [Architect Guide](./architects.md) for deployment design and the [Operator Guide](./operators.md) for production operations.

### If You're an Organization

1. **Identify relevant dataspaces** — Which industry initiatives or partner ecosystems are building on trusted data sharing?
2. **Define your data assets and access needs** — What do you want to share? What do you need?
3. **Select a DSaaS provider** — Look for EDC protocol stack experience and sector familiarity
4. **Start with one use case** — Prove value before scaling

---

## Summary

Trusted data sharing is no longer a future concept. The protocols are stable, the software is proven, the demand is structural. DSaaS is the mechanism that turns this into an operational and commercial opportunity.

The four strategic dimensions — regulatory compliance, IP protection, new revenue, operational scalability — each provide independent justification. Together, they make trusted data sharing an emerging infrastructure category, not an optional enhancement.

The relevant question is not *if* this matters — but where you want to sit in the emerging value chain.

---

**Next steps**: [Get Started with JAD](../get-started.md) | [Guide: For Architects](./architects.md) | [Guide: For Operators](./operators.md)
