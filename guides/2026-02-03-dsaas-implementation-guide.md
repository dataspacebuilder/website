---
slug: dsaas-implementation-guide
title: "Implementing DSaaS"
authors: [ndkrimbacher]
tags: [implementation, architecture, cloud-providers]
description: "A comprehensive guide for cloud platform teams on deploying the EDC stack as Dataspace-as-a-Service. Learn the architecture from operations and user perspectives, plus data plane deployment scenarios."
keywords: [DSaaS, Dataspace-as-a-Service, EDC, Eclipse Dataspace Components, CFM, Connector Fabric Manager, cloud provider, multi-tenant, VPA, Virtual Participant Agent]
image: /img/guides/dsaas-implementation/dsaas-impl-cover.jpeg
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Cloud providers looking to offer trusted data sharing as a managed service face a significant challenge: the dataspace stack is sophisticated, with multiple components handling identity, policy, negotiation, and transfer. This guide transforms that complexity into a clear implementation path.

{/* truncate */}

We'll explore the stack through three perspectives:

1. **Operations Perspective** — what you're actually running: components, relationships, and how they work together
2. **User Perspective** — how organizations onboard and interact with your platform
3. **Data Plane Perspective** — how data flows while maintaining sovereignty and security

**Who This Guide Is For:**
- Enterprise architects who need a clear picture of running the EDC stack in their infrastructure
- Platform teams who will deploy and operate DSaaS
- Solutions architects evaluating deployment patterns for different customer scenarios

By the end, your team should be able to deploy the EDC stack independently and understand the operational model for running DSaaS at scale.


---

## Part 1: The Operations Perspective

Before you can run something, you need to understand what you're running. Let's examine the DSaaS stack from an operator's viewpoint—the components you deploy, manage, and monitor.

![Dataspace-as-a-Service Stack — Operations View](/img/guides/dsaas-implementation/dsaas-impl-1.png)

The DSaaS stack consists of three layers working together:

- **Cloud-native infrastructure** forms the foundation
- **Connector Fabric Manager** provides orchestration in the middle
- **Virtual Participant Agents** serve your tenants at the top

Two user types interact with the system: Participants who use the Customer Portal to manage their data sharing, and Admins who use the Operations UI to manage the platform itself.

### The Infrastructure Foundation

The infrastructure layer relies on standard cloud-native components that every platform team already knows:

- **Kubernetes** — container orchestration and scaling
- **PostgreSQL** — state persistence across all components
- **Vault** — secrets and credential storage
- **DNS** — request routing and DID resolution
- **Observability stack** — metrics, logging, and tracing (Prometheus, Grafana, ELK, or your existing tools)
- **IAM/IDP** — authentication

This deliberate choice of boring, proven technology matters. The DSaaS stack doesn't require exotic infrastructure or specialized knowledge. It runs on the same foundation you already operate, using patterns your team already understands. Your operations team won't need to learn new orchestration paradigms or adopt unfamiliar database technologies. The skills they've developed managing other cloud-native applications transfer directly.

This design philosophy reflects a broader principle in dataspace architecture: complexity should exist only where it adds value. The value of dataspaces lies in enabling trusted data sharing across organizational boundaries—not in reinventing container orchestration or database management. By building on proven foundations, the architecture lets your team focus their attention on the genuinely novel aspects of multi-tenant trust infrastructure.

> **Key Insight:** The innovation happens in the layers above, not in reinventing infrastructure.

### The Connector Fabric Manager

The Connector Fabric Manager sits between your infrastructure and the runtime. It's your management plane—the orchestration layer that makes multi-tenant operation possible. Understanding its role is essential because it fundamentally changes how you think about deploying dataspace infrastructure.

The CFM comprises two primary subsystems:

- **Provision Manager** — handles stateful orchestration workflows, coordinating the multi-step processes required to bring new participants online. When a new tenant signs up, it orchestrates creation of their VPAs, Vault namespaces, DNS entries, and credentials.
- **Tenant Manager** — provides the REST API for CRUD operations on tenants, participants, and VPAs. This is what the Operations UI calls to manage the platform.

**Activity Agents** execute the actual infrastructure tasks:
- Deploy to Kubernetes
- Configure Vault namespaces
- Set up DNS entries

Communication happens through **NATS Jetstream**, providing reliable, decoupled messaging between components. This separation means the system remains resilient even when individual components are being updated or experience issues.

> **Critical Architectural Insight:** The CFM provisions trust infrastructure but is **not** in the runtime trust path.

This decision has profound operational implications:

- The CFM can be completely unavailable—undergoing maintenance, experiencing an outage, being upgraded—and **live data sharing continues uninterrupted**
- Trust decisions happen directly between participant VPAs with no dependency on the CFM
- You're not creating a single point of failure in the trust model

### Virtual Participant Agents

Virtual Participant Agents are the components that actually serve your tenants. Rather than deploying separate infrastructure for each organization, VPAs provide isolated contexts within shared infrastructure.

> **Why This Matters:** VPAs are the innovation that makes DSaaS economically viable at scale.

Three VPA types exist, each with a distinct trust role. This separation of concerns is fundamental to the architecture's security model and operational flexibility.

**Data Plane VPA** — Contains the Data Engine that executes actual data transfers
- Deliberately trust-agnostic: moves data but doesn't decide whether data should move
- Can be optimized purely for throughput
- Enables flexible deployment patterns including edge scenarios

**Credential Service VPA** — Serves as the trust store for each participant
- *DID Manager* — handles Decentralized Identifiers
- *Credential Store* — stores verifiable credentials
- *Claim Management* — creates presentations when participants need to prove their identity or attributes

**Control Plane VPA** — Where trust decisions actually happen
- *Catalog* — publishes data offerings
- *Contract Manager* — handles negotiations
- *Policy Engine* — evaluates access requests against defined policies
- *Sharing Orchestrator* — coordinates the entire data sharing workflow

When a consumer requests access to data, the Control Plane evaluates their credentials against the provider's policies and decides whether to grant access. This evaluation happens in real-time, using the credentials the consumer presents and the policies the provider has defined. The decision is binary—access is either granted with a contract, or denied—and the entire negotiation happens through standardized protocols that work identically regardless of where each party's infrastructure is deployed.

**Context Isolation** ensures that while VPAs share infrastructure, they're logically isolated. Tenant A's VPAs cannot see or access Tenant B's data, credentials, or configuration. Isolation happens through configuration, not through separate processes or infrastructure. This approach is similar to how modern databases isolate schemas or how Kubernetes isolates namespaces—the boundary is enforced through access controls and configuration rather than physical separation. The result is strong isolation with efficient resource utilization.

### The Mental Model Shift

If you're coming from traditional single-tenant connector deployments, the operational model changes fundamentally. Traditional deployments follow a simple equation: one connector equals one process. You deploy separate infrastructure for each tenant, scale by adding containers, migrate by redeploying, and manage operations on a per-tenant basis.

CFM-managed deployments invert this model. One runtime serves many VPAs. You provision VPA metadata rather than deploying infrastructure. You scale by adding cells—logical groupings of shared resources—rather than individual containers. You migrate by moving metadata, and you manage operations centrally rather than per-tenant.

| Traditional Deployment | CFM-Managed Deployment |
|----------------------|----------------------|
| One connector = one process | One runtime serves many VPAs |
| Deploy infrastructure per tenant | Provision VPA metadata |
| Scale by adding containers | Scale by adding cells |
| Manage operations per-tenant | Manage operations centrally |

This shift has profound implications for cost and operations. Resource scaling becomes sub-linear rather than linear with tenant count because tenants share infrastructure. Instead of managing hundreds of separate deployments—each with their own monitoring, updates, and troubleshooting—you manage a smaller number of cells with centralized tooling.

---

## Part 2: The User Perspective

Now that you understand what you're operating, let's look at the platform from your users' perspective. How do organizations onboard? What do they interact with? How does the trust infrastructure connect to the broader dataspace ecosystem?

![Dataspace-as-a-Service Stack — User View](/img/guides/dsaas-implementation/dsaas-impl-2.png)

The user-facing architecture consists of three layers:

- **Dataspace Governance Authority** — establishes the trust framework (the rules of the game)
- **DSaaS Stack** — provides the runtime capabilities
- **Customer Portal** — where organizations interact with your platform

### The Governance Layer

The Dataspace Governance Authority isn't your platform—it's the governing body that defines who can participate in the dataspace and what credentials they need. For industry dataspaces like Catena-X or Manufacturing-X, this is the consortium or foundation that establishes the rules. For private dataspaces, it might be a lead organization or industry group.

Understanding this separation is crucial for positioning your DSaaS offering correctly. You're not the gatekeeper deciding who can join a dataspace—that responsibility belongs to the governance body. Your role is to provide the technical infrastructure that enables organizations, once approved, to participate effectively. This separation of concerns protects you from governance disputes while letting you focus on what you do best: running reliable infrastructure.

The Governance Authority operates two key services that interact with your DSaaS platform:

**Onboarding Service**
- Where organizations apply to join the dataspace
- Handles business verification, legal agreements, and compliance checks
- Typically operated by the Governance Authority, not by you as the DSaaS provider
- You're providing infrastructure, not making governance decisions

**Issuer Service**
- Creates verifiable credentials once an organization is approved
- Receives authorization from the Onboarding Service when an organization passes verification
- Issues credentials that flow into your DSaaS Stack's Credential Service

> **Important Separation:** Authorization vs. issuance keeps governance decisions with the governance body while your platform handles technical execution.

### The Customer Portal

Participants authenticate through your IAM/IDP integration to access the Customer Portal—your platform's user interface and what your customers actually see and use day-to-day. The portal experience you provide significantly impacts customer satisfaction and adoption. Organizations joining a dataspace are often navigating unfamiliar concepts, and your portal should make their journey intuitive.

The Customer Portal manages a clear hierarchy of concepts. This hierarchy reflects how organizations actually think about their dataspace participation—starting with their identity as an organization, then their specific configurations for different dataspaces, and finally the applications that use these capabilities.

| Concept | Description |
|---------|-------------|
| **Tenant** | Top-level container representing the organization—your customer, billing entity, support relationship |
| **Participant Profiles** | Links a Decentralized Identifier to the organization. Most have one DID; enterprises might need multiple for different business units |
| **Dataspace Profiles** | Configuration specific to each dataspace the organization participates in |
| **Sharing Apps** | Business applications that discover catalogs, negotiate contracts, and transfer data |

**Real-world example:** An automotive supplier might have:
- One Dataspace Profile for Catena-X with its credential requirements and policies
- Another Dataspace Profile for Manufacturing-X with different settings
- A single infrastructure instance serving both

This flexibility lets organizations participate across multiple dataspaces without managing separate infrastructure.

The connection flows:
- **Organisation Onboarding** — new organizations flow from the Governance Authority's approval process into your Customer Portal
- **Multi-Tenant Access** — the Customer Portal connects to the DSaaS Stack's Control Plane, giving each tenant access to their own VPAs

### The DSaaS Stack from the User's View

**Credential Service VPA**
- Receives credentials from the Issuer Service and stores them securely
- Creates verifiable presentations—cryptographic proofs that can be verified without contacting any central authority
- Enables participants to prove their identity to other dataspace participants

**Control Plane VPA** — What participants interact with most frequently
- Publish data offerings to the Catalog
- Define policies that control who can access their data
- Manage contracts with partners
- Handles the complexity of the Dataspace Protocol while presenting a manageable interface

**Data Plane VPA** — Connects to the Data Management and Governance layer where actual data lives:
- Storage systems
- Streams for real-time data
- Applications that generate or consume data

Data Plane deployment patterns are explored in detail in Part 3.

### The Onboarding Journey

Understanding the complete onboarding flow helps you see how all the pieces connect in practice.

**Step 1: Application**
- Organization submits application to the Governance Authority's Onboarding Service
- Provides required documentation per dataspace requirements
- This happens entirely outside your platform

**Step 2: Verification**
- Legal agreements signed
- Compliance checked
- Business relationships validated
- Timeline: days to weeks depending on dataspace requirements

**Step 3: Credential Issuance**
- Governance Authority approves the organization
- Issuer Service generates verifiable credentials
- Credentials attest to membership, compliance status, or other defined attributes

**Step 4: Platform Registration**
- Organization registers through Customer Portal
- Creates tenant and configures participant profile
- CFM's Provision Manager orchestrates VPA creation (Credential Service, Control Plane, Data Plane contexts)
- Credentials flow into Credential Service and are stored securely

**Step 5: Configuration**
- Register data as assets
- Define access policies
- Connect applications

**Step 6: Active Participation**
- Discover other participants' catalogs
- Negotiate contracts for data access
- Transfer data according to agreed terms

> **Note on Credential Acquisition:** This step often involves processes outside your platform entirely—legal agreements, compliance audits, business relationship verification. Your DSaaS platform facilitates the technical flow, but the business process belongs to the dataspace governance. Automation levels vary significantly across dataspaces.

### Authentication and Access Control

Your platform implements centralized access control using OAuth2, with three distinct roles:

| Role | Access | Use Case |
|------|--------|----------|
| **Admin** | Full access to all resources | Emergency access, initial setup only |
| **Provisioner** | Create participant contexts, manage VPAs | CFM automation, onboarding workflows |
| **Participant** | Manage own resources | Business applications, daily operations |

**Token Architecture:**
- All APIs use OAuth2 `client_credentials` flow
- Same token works across Control Plane, Credential Service, and Management APIs
- Unified access model—customers don't need separate credentials for different components

---

## Part 3: The Data Plane Perspective

The first two perspectives showed you the stack and the user experience. Now we examine what makes trusted data sharing actually work: how data flows between organizations while maintaining sovereignty and security.

This perspective is where the rubber meets the road. Everything we've discussed—the VPAs, the credentials, the policies—exists to enable this: actual data moving between organizations in a way that's both secure and sovereign. Understanding the Data Plane perspective helps you explain to customers how their data stays protected while still being shareable.

![Data Plane Deployment for Trusted Data Sharing](/img/guides/dsaas-implementation/dsaas-impl-3.png)

> **Core Architectural Concept:** The separation between what you operate in your cloud and what other dataspace participants operate in theirs. Public networks connect them through standardized protocols that ensure interoperability regardless of deployment choices.

### Infrastructure Components

**Your CSP DSaaS Infrastructure:**
- **DSaaS Stack** — VPA Credential Service and VPA Control Plane (trust and decision-making components)
- **Data Infrastructure** — Data Plane with customer's actual data services (below the Security Boundary)
- **Customer Portal** — management interface
- **Supporting services** — IAM/IDP, Observability, Vault/STS, Database

**Partner Infrastructure:**
- Their own Credential Service, Control Plane, and Data Plane
- May use another DSaaS provider, self-hosted EDC, or hybrid setup
- Protocols ensure **complete interoperability** regardless of deployment choices

### The Three Protocols

These standardized protocols are what make dataspaces interoperable. Any implementation that speaks these protocols can participate, regardless of vendor or deployment model.

| Protocol | Connection | Purpose |
|----------|------------|---------|
| **DCP** (Decentralized Claims Protocol) | Between Credential Services | "Who are you?" — identity verification through cryptographic proofs |
| **DSP** (Dataspace Protocol) | Between Control Planes | "Let's agree" — catalog discovery and contract negotiation |
| **DPS** (Data Plane Signaling) | Control Plane → Data Plane | "Data flows" — coordinates when and how to execute transfers |

**Data Sharing** happens peer-to-peer directly between Data Planes—only after the protocols above have established trust and agreement. This peer-to-peer model means data never needs to route through a central hub, preserving both performance and sovereignty.

### The Security Boundary

The Security Boundary represents a critical architectural division that has far-reaching implications for how you deploy and operate DSaaS. This isn't just a logical distinction—it shapes deployment patterns, performance characteristics, and the flexibility you can offer customers.

**Above the boundary** — Trust infrastructure
- Control Plane and Credential Service
- Trust decisions happen here
- Credentials managed, policies enforced
- Dataspace protocols verify identities, negotiate contracts, make access decisions

**Below the boundary** — Data infrastructure
- Data Plane in the Data Infrastructure layer
- Doesn't evaluate policies or verify credentials
- Simply executes what the Control Plane has already authorized

The beauty of this separation is that trust and data movement are decoupled. Once the Control Plane authorizes a transfer, the Data Plane can execute it without any further policy evaluation. This means you can place Data Planes wherever data needs to flow—at the edge, in customer environments, across geographic boundaries—without replicating the entire trust infrastructure at each location.

This trust-agnostic design enables several important capabilities:

| Capability | Benefit |
|------------|---------|
| **Performance optimization** | No policy evaluation overhead during data transfer—Data Plane focuses entirely on moving bytes efficiently |
| **Edge deployment** | Data Planes can run close to data sources without needing the full trust infrastructure |
| **Protocol flexibility** | Different Data Planes can handle different data types (HTTP for APIs, S3 for files, OPC-UA for industrial equipment)—all governed by the same Control Plane policies |

### How the Protocols Work Together

When a partner wants to access data from one of your DSaaS customers, the protocols execute in sequence. This choreography happens automatically once both participants have their infrastructure in place—your customers don't need to understand the protocol details, but you should understand them to troubleshoot issues and explain the system's security properties.

**1. DCP — Identity**

The interaction begins with identity verification. The partner's Credential Service presents verifiable credentials to your customer's Credential Service. These credentials are cryptographic proofs that can be verified without contacting any central authority—a fundamental property that enables dataspaces to operate without depending on a single trusted party.

- Credentials may include: dataspace membership, compliance attestations, business relationship proofs
- Verification happens cryptographically—no central authority contacted

**2. DSP — Agreement**

With identity established, the partner can request the catalog. The catalog your customer exposes is filtered based on the partner's verified credentials—they see only what they're eligible to access. This isn't security through obscurity; it's a usability feature that prevents partners from seeing offerings they can't actually use.

- Partner's Control Plane requests catalog from your customer's Control Plane
- Catalog shows only offerings the partner is eligible to see (based on verified credentials)
- Contract negotiation: terms proposed, evaluated, accepted or rejected
- Both sides agree → contract established

**3. DPS — Coordination**

Once a contract exists, the Control Planes coordinate the actual transfer. Your customer's Control Plane signals their Data Plane with the details needed to execute the transfer—tokens, endpoints, and protocol parameters. This signaling happens over a separate channel from the data transfer itself.

- Transfer parameters communicated: access tokens, endpoints, protocol details

**4. Data Sharing — Execution**

Finally, data moves. The transfer happens directly between Data Planes, peer-to-peer, without routing through either Control Plane. This direct path optimizes for performance and ensures that data volumes don't create bottlenecks in the trust infrastructure.

- Actual data flows directly between Data Planes
- Provider's Data Plane either:
  - Exposes an endpoint for the partner to pull from, or
  - Pushes data to an endpoint the partner specified

### Deployment Scenarios

The architecture supports multiple deployment patterns, each suited to different customer needs. Understanding these patterns helps you position your DSaaS offering for different market segments.

**Fully Managed Deployment**

In a fully managed deployment, everything runs in your infrastructure: Control Plane, Credential Service, and Data Plane. This is the simplest option from the customer's perspective—they sign up, configure their data offerings, and start sharing. There's no infrastructure for them to manage, no operations burden, and no specialized expertise required.

- **Best for:** SaaS providers adding dataspace capabilities, small organizations without platform teams, anyone prioritizing speed over control
- **Tradeoff:** You carry highest operational responsibility

This model works particularly well for customers whose data already lives in cloud services. If they're sharing API access or cloud-hosted datasets, having the Data Plane in your infrastructure adds no additional data movement compared to what they'd do anyway.

**Hybrid Deployment**

The hybrid model addresses a fundamental tension: customers want the convenience of managed trust infrastructure, but they need their data to stay in their environment. By running Control Plane and Credential Service in your cloud while deploying Data Planes in the customer's infrastructure, you solve both requirements.

- Control Plane and Credential Service run in your cloud
- Data Planes deploy in customer's infrastructure (on-premise or their cloud accounts)
- Customer maintains data sovereignty—data never leaves their environment
- You provide trust infrastructure and management capabilities
- **Best for:** Manufacturing companies, regulated industries, data residency requirements

This pattern is especially valuable for manufacturing and industrial customers. Their operational data often can't leave the factory floor for regulatory, security, or practical reasons. The hybrid model lets them participate in dataspaces while keeping data exactly where it needs to be.

**Partner / Self-Hosted Deployment**

Not every dataspace participant will use your DSaaS platform. Some organizations—particularly large enterprises with existing platform teams—will run their own complete EDC stack. This is perfectly fine, and in fact, it's essential for a healthy dataspace ecosystem.

- Some participants run their own complete EDC stack
- Your DSaaS customers interact with them through standard protocols
- **Result:** Full interoperability regardless of deployment model

The standardized protocols guarantee that your DSaaS customers can interact with self-hosted participants exactly as they would with other DSaaS customers. From an API and data-sharing perspective, the deployment model is invisible.

### Transfer Types

The Data Sharing connection supports three fundamental transfer patterns:

| Transfer Type | Direction | Control | Use Cases |
|--------------|-----------|---------|-----------|
| **Pull** | Consumer fetches from provider | Consumer decides when to retrieve | API access, on-demand queries, real-time data |
| **Push** | Provider sends to consumer | Provider decides when to send | Batch exports, event-driven delivery, file transfers |
| **Stream** | Continuous flow | Active until terminated | IoT sensors, telemetry, real-time monitoring |

### Edge Data Plane Patterns

For customers with data sovereignty requirements or edge deployments, several patterns address common scenarios. These patterns leverage the security boundary separation—keeping trust decisions centralized while distributing data access close to the source.

**Factory / Site Edge Pattern**

Manufacturing customers often have data distributed across multiple sites, each with its own local systems. The factory edge pattern addresses this by deploying Data Planes at each location while maintaining centralized trust management. A customer's catalog can span all their factories, presenting a unified view to data consumers even though the underlying data is geographically distributed.

- Control Plane runs in your cloud, manages unified catalog across all sites
- Data Planes deploy at each factory, connecting to local PLCs, databases, sensors
- DPS coordinates authorization from the cloud
- Data flows directly from edge Data Plane to consumer—never routes through your infrastructure

**Multi-Protocol Edge Pattern**

Industrial environments rarely standardize on a single data protocol. OPC-UA for machine data, SQL for business systems, S3 for file storage—customers need to share data from all of these. The multi-protocol pattern deploys specialized Data Planes for each protocol while maintaining consistent governance through a single Control Plane.

- Different Data Planes handle different protocols:
  - OPC-UA Data Plane → industrial equipment
  - S3 Data Plane → file storage
  - HTTP Data Plane → REST APIs
- Same Control Plane governs all with consistent policies
- Each Data Plane optimizes for its specific protocol

**Geographic Distribution Pattern**

Regulatory requirements sometimes mandate that data stay within specific jurisdictions. The geographic distribution pattern meets these requirements while still enabling data sharing. Data Planes deploy in the required regions, ensuring data flows comply with residency requirements, while Control Planes can still be managed centrally.

- Data Planes deploy in specific regions (e.g., for GDPR compliance)
- Control Plane makes access decisions centrally
- Data flows stay within required geographic boundaries

### DSaaS Templates

Consider offering pre-configured templates for common scenarios. These accelerate onboarding by giving customers a starting point matched to their use case.

| Template | Components | Ideal For |
|----------|------------|-----------|
| API Sharing | 1 Control Plane, 1 HTTP Data Plane, 1 Credential Service | SaaS providers, API monetization |
| Industrial Edge | 1 Cloud Control Plane, N Edge Data Planes, 1 Credential Service | Manufacturing, IoT, OT networks |
| File Exchange | 1 Control Plane, 1 S3 Data Plane, 1 Credential Service | B2B file sharing, batch data |
| Hybrid Sovereign | 1 Control Plane, Customer-hosted Data Plane, 1 Credential Service | Regulated industries, data residency |

Templates reduce time-to-value by pre-configuring the right architecture. Customers can start from a template and customize as their needs evolve.

---

## Part 4: Production Operations

Running DSaaS in production requires attention to high availability, observability, and clear service level targets. This section covers the operational aspects that differentiate a proof-of-concept from a production-grade service.

The transition from development to production is where many dataspace initiatives stumble. The technology works in the lab, but operating it reliably for paying customers demands a different level of rigor. The good news is that the DSaaS architecture was designed with production operations in mind—the patterns described here aren't afterthoughts bolted onto a research prototype.

### Building High Availability

High availability must be addressed at both the CFM layer and the cell layer, with different considerations for each. The CFM layer handles provisioning and management—it's critical for onboarding new customers and making configuration changes, but remember that it's not in the runtime trust path. The cell layer handles actual data sharing—this is where availability directly impacts your customers' business operations.

**CFM Layer Requirements:**
- CFM pods: minimum 2 replicas behind a load balancer
- NATS cluster: minimum 3 nodes for quorum (fewer = single failure disrupts messaging)
- PostgreSQL: primary + synchronous replica with automatic failover
- Vault: HA mode with auto-unseal; consider cross-region replication for DR
- Deploy in primary region with warm standby in DR region

> **Reminder:** CFM unavailability doesn't affect live data sharing—but prolonged unavailability prevents new tenant onboarding and VPA provisioning.

**Cell Layer Scaling Strategy:**

| Component | Replicas | Scaling Trigger |
|-----------|----------|-----------------|
| Control Plane | 3-5 | HPA on CPU and request rate |
| Data Plane | 2-10+ | HPA or KEDA on transfer volume |
| Credential Service | 2-3 | Verification load |

**Benefits of Multiple Cells:**
- Geographic distribution
- Fault isolation (cell failure doesn't affect other cells)
- Regulatory compliance (cells in specific jurisdictions meet data residency requirements)

### Implementing Observability

A production observability stack requires metrics, logging, and tracing working together. The multi-tenant nature of DSaaS makes observability particularly important—you need visibility into both platform health and individual tenant activity.

**Metrics** (Prometheus + Grafana)

| Category | Metrics |
|----------|---------|
| Business | Active tenants/VPAs, contracts negotiated, transfers completed, data volume shared, credential issuances |
| Technical | API latency (P50, P95, P99), request rates by component, error rates, NATS queue depth, resource utilization |

**Logging** (ELK, Loki, or similar)

Implement structured logging with per-VPA context. Each log entry should include:
- Severity, component name, VPA identifier, tenant identifier
- Action and relevant context (counterparty DIDs, contract IDs)

Log categories:
- Application events
- Security and audit logs
- DSP protocol messages
- DCP credential flows

**Tracing** (Jaeger or similar)

Follow requests across:
- DSP flows (catalog → negotiation → transfer)
- DCP credential presentation and verification
- DPS signaling between control and data planes
- End-to-end transfer paths

### Configuring Alerts

Effective alerting balances signal and noise. Too few alerts and you miss critical issues; too many and your team becomes desensitized. The scenarios below represent a starting point based on operational experience—tune thresholds based on your specific traffic patterns and SLA commitments.

Configure alerts for scenarios requiring operator attention:

| Scenario | Severity | Condition |
|----------|----------|-----------|
| VPA provisioning failures | High | Stuck > 5 minutes |
| Contract negotiation errors | Medium | > 5% error rate in 5 minutes |
| Transfer failures | High | 3+ consecutive failures |
| Cell health degradation | Critical | < 50% ready pods |
| Credential expiry | Medium | Approaching within 7 days |

### Defining SLAs

Your service level agreements should address both availability and performance. These targets represent industry-standard expectations for production infrastructure services—adjust based on your operational maturity and customer requirements.

**Availability Targets:**
- CFM API: 99.9%
- DSP APIs (catalog, negotiation): 99.95%
- Data Plane transfer execution: 99.9%
- Credential Service verification: 99.9%

**Performance Targets:**
- Catalog queries: < 500ms (P95)
- End-to-end contract negotiation: < 2 seconds
- VPA provisioning: < 60 seconds
- Transfer initiation: < 1 second

### Pricing Dimensions

For usage-based pricing, track metrics that align with delivered value. The right pricing model depends on your market positioning—some customers prefer predictable flat fees, while others benefit from consumption-based models that scale with their usage.

| Metric | Reflects |
|--------|----------|
| Active VPAs per month | Infrastructure footprint |
| Contracts negotiated | Business activity |
| Data volume | Actual sharing |
| API requests | Catalog queries and negotiations |
| Edge Data Plane instances | On-premise deployments |
| Credential issuances | Trust infrastructure usage |

---

## Getting Started

With the architectural understanding and operational knowledge from this guide, you're ready to begin implementation. The path from reading documentation to running production infrastructure has several stages, and rushing through them often creates problems that are expensive to fix later. Take the time to build genuine understanding before committing to architectural decisions.

### Recommended Path

1. **Read the Decision Maker Guide** — Strategic context and business case for DSaaS. Provides the "why" that complements this guide's "how."

2. **Deploy JAD (Just Another Demonstrator)** — Complete reference implementation for hands-on exploration. Understand how all the pieces fit together before attempting production deployment.

3. **Deepen your understanding** through the architecture documentation:
   - Evolution from traditional to modern architecture and why CFM exists
   - VPAs, Cells, and Service Virtualization in detail
   - CFM, Credential Service, Control Plane, and Data Plane specifics
   - Trust model in dataspaces and the rationale behind architectural decisions

### Plan Your Deployment

Every DSaaS deployment is shaped by its specific context—your existing infrastructure, your target customers, and the dataspaces you intend to support. Taking time to think through these questions before writing code saves significant rework later. Consider your specific requirements:

- Which cloud regions? What are the latency implications?
- What compliance requirements must you meet?
- Expected tenant count at launch and over time?
- Do customers need edge Data Plane capabilities?
- Which deployment templates align with your target customers?

Document your answers to these questions. They'll inform decisions throughout implementation and help you explain your architecture to stakeholders who join the project later.

### Engage with the Community

The dataspace ecosystem is collaborative by nature. Engaging with the community accelerates your learning and helps you avoid common pitfalls.

- **Eclipse EDC GitHub repositories** — Source code and issues
- **EDC Community Discussions** — Questions and knowledge sharing
- **Dataspace Working Group** — Broader ecosystem engagement

---

## Summary

This guide has presented DSaaS through three essential perspectives that together give you a complete picture of what you're building. Each perspective reveals different aspects of the same architecture, and understanding all three is essential for successful implementation.

### Key Takeaways by Perspective

**Operations Perspective**
- Cloud-native infrastructure at the base
- Connector Fabric Manager for orchestration
- Virtual Participant Agents serving tenants
- **Key insight:** CFM provisions infrastructure but isn't in the runtime trust path—live data sharing continues even during management plane maintenance

**User Perspective**
- Customer Portal for tenant management
- Flow from Governance Authority through credential issuance
- Data model hierarchy: Tenants → Participant Profiles → Dataspace Profiles → VPAs

**Data Plane Perspective**
- Security boundary between trust infrastructure and data infrastructure
- Three protocols (DCP, DSP, DPS) connecting participants across public networks
- Deployment flexibility: fully managed, hybrid, or self-hosted

### Why This Architecture Works

The DSaaS architecture succeeds because it makes the right tradeoffs for operating dataspace infrastructure at scale. It prioritizes operational efficiency without compromising on security or sovereignty. It embraces standardization where interoperability matters while allowing flexibility where customers have unique requirements.

| Property | How It's Achieved |
|----------|-------------------|
| Resource-efficient | Shared runtimes and configuration-based isolation |
| Operationally manageable | Centralized operations and automated provisioning |
| Production-ready | Clear separation of concerns, protocol standardization |

The architecture also future-proofs your investment. As the dataspace ecosystem evolves—new protocols, new credential types, new deployment patterns—the modular design lets you adopt improvements without rebuilding from scratch. You're not locked into today's specific implementations; you're building on a foundation designed for continuous evolution.

### Next Steps

1. Deploy JAD locally to build hands-on familiarity
2. Walk through tenant onboarding to understand customer experience
3. Test deployment scenarios: fully managed, hybrid with edge Data Planes, partner connectivity
4. Design production architecture based on your specific requirements
5. Begin building your DSaaS offering
