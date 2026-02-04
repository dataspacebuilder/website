---
slug: dsaas-implementation-guide
title: "Operating Multi-Tenant Dataspace Environments with EDC-V and CFM"
authors: [ndkrimbacher]
tags: [implementation, architecture, cloud-providers]
description: "An operator’s guide to running EDC-V with CFM: service virtualization, VPAs, cells, and production operations for multi-tenant dataspace environments."
keywords: [EDC-V, EDC, Eclipse Dataspace Components, CFM, Connector Fabric Manager, service virtualization, multi-tenant, VPA, Virtual Participant Agent, cell]
image: /img/guides/dsaas-implementation/dsaas-impl-cover.jpeg
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Image from '@site/src/components/Image';

Operating multi-tenant dataspace environments requires an architectural model that is both scalable and predictable. `EDC-V`, combined with the `Connector Fabric Manager (CFM)`, provides exactly that: a way to deliver dataspace capabilities as a managed platform rather than a collection of individual connector deployments. Instead of treating each participant as a separate infrastructure footprint, service virtualization turns participant contexts into lightweight, repeatable units that the platform can provision and operate at scale.

This guide explains how to run that platform effectively. It brings the core pieces of the `EDC-V` ecosystem—identity, policy evaluation, negotiation, and data transfer—into a coherent operational model that cloud providers and enterprise platform teams can adopt with confidence. Whether you're onboarding participants, automating `VPA` provisioning, or scaling runtime capacity, the goal is to give you a blueprint for reliable operations across multiple dataspaces.

The guide is structured around three perspectives that together form the foundation for operating `EDC-V` in production:

- **What you operate** — the cloud-native foundation, `CFM` management plane, and the shared runtime cells that host `VPA`s.
- **What participants experience** — onboarding, credential handling, catalog publication, and sharing workflows surfaced through your deployment’s end-user UI.
- **How data is shared across boundaries** — the protocol choreography, trust evaluation, and separation of control-plane and data-plane responsibilities that enable trusted data sharing.

These perspectives help establish the operational boundaries that matter most: where trust is evaluated, where configuration lives, and where runtime work is executed. Once those boundaries are clear, the system becomes significantly easier to scale, secure, and automate.

This guide is written for teams responsible for running `EDC-V` as a service—those who need to understand not only how the components work individually, but how they behave as a platform. The aim is to provide a practical, implementation-oriented view of multi-tenant operation: one that turns dataspaces from conceptual architecture into a dependable, production-ready environment.

{/* truncate */}

## TL;DR

At a high level, operating `EDC-V` at scale means running a **management plane** (`CFM`) plus a **shared runtime** that hosts isolated `VPA` contexts. The goal is to keep that runtime predictable to operate and straightforward to scale.

- **You run**: a management plane (`CFM`) plus shared runtime cells hosting **Virtual Participant Agents (VPAs)**.
- **Your customers use**: a deployment-specific `End-User UI` to onboard, manage `DID`s/credentials, publish catalogs, and configure sharing.
- **Data moves**: peer-to-peer between participants using open protocols (`DCP`/`DSP`/`DPS`) across a strict security boundary.

Operationally, onboarding and lifecycle are centralized, while trust and transfer decisions remain decentralized between participants.

## Benefits Summary

This operating model is worth implementing when you’re trying to make `EDC`-based data sharing repeatable and supportable. The goal is to turn “deploy a connector project” into “provision a participant context.”

- **Reduced operations cost**: operate shared `cells` and automate provisioning instead of running per-tenant stacks.
- **Faster onboarding**: move onboarding from hand-crafted infrastructure to `CFM` workflows and templates.
- **Better scalability**: add capacity by scaling `cells`, not by multiplying bespoke deployments.
- **Interoperability with any dataspace**: `DCP`/`DSP`/`DPS` keep you compatible with external and self-hosted participants.
- **Sovereignty-friendly runtime**: policy decisions stay peer-to-peer; `Data Plane`s run close to the data.

If you need the strategic framing and business outcomes, read the [Decision Maker Guide](/guides/decision-maker-guide). This guide stays focused on what you have to build and operate.

## How to Read This Guide

This architecture becomes clearer once you can answer three questions without hand-waving: what you operate, what your participants touch, and what actually happens on the wire. We’ll build that mental model in one pass, then reuse it for deployment and operations decisions.

1. **What you run** (platform architecture)
2. **What your customers do** (tenant experience)
3. **How data actually moves** (sharing runtime)

Use this as a map. Each part introduces a boundary (operational, product, network) that the later parts assume—so if something feels unclear, it’s usually because a boundary hasn’t been made explicit yet.

**Who This Guide Is For:**

This guide is written for people who will be on-call for the stack or have to defend its trust boundaries in architecture reviews.

- **Platform teams** deploying and operating `EDC-V` with `CFM`
- **Enterprise architects** who need the runtime model and trust boundaries
- **Solutions architects** mapping customer constraints to deployment patterns

If you’re building business apps on top of `EDC-V`, you’ll still benefit from the “how data moves” section—but you’ll want the integration guide for concrete app and connector configuration.

---

## Part 1: What You Run — The EDC-V Platform Architecture (with CFM)

Start with the operator’s view: what you deploy, monitor, and scale. Keep user workflows and transfer choreography out of your head for now. We’ll add those once the platform model is stable.

<Image src="/img/guides/dsaas-implementation/dsaas-impl-1.png" alt="EDC-V Platform Architecture — Operations View" style={{ maxWidth: '70%', margin: '2rem auto', display: 'block' }} />

The platform is intentionally layered so you can reason about responsibility and failure modes. Think in three planes: a cloud-native foundation, a management plane that provisions participant contexts, and a runtime plane where the dataspace protocols execute.

In the operations view, runtime isolation is configuration-based: `VPA` metadata defines the context, and cells provide the underlying capacity. This is what enables the same shared services to host many participants while keeping contexts separated.

| Layer | What it is | What it’s responsible for |
| --- | --- | --- |
| Cloud-native infrastructure | `Kubernetes`, storage, secrets, DNS, IAM, observability | Reliability primitives, persistence, identity, operational tooling |
| `Connector Fabric Manager (CFM)` | Management plane | Provisioning workflows, tenant metadata, and `VPA` lifecycle automation |
| `Virtual Participant Agents (VPAs)` | Runtime plane | Protocol endpoints, policy decisions, transfer execution |

Two user types interact with the system:

| Role | UI | Responsibilities |
| --- | --- | --- |
| Participant | Customer Portal | Publish catalogs, define policies, negotiate contracts |
| Operator | Operations UI | Provision contexts, monitor health, scale cells |

### The Infrastructure Foundation

Run `EDC-V` on standard cloud-native infrastructure. You want predictable failure modes and well-known runbooks.

| Component | Purpose |
| --- | --- |
| `Kubernetes` | Container orchestration and scaling |
| `PostgreSQL` | State persistence across components |
| `Vault` / `STS` | Secrets, key material, and token-related infrastructure |
| `DNS` | Request routing and `DID` resolution |
| Observability stack | Metrics, logging, and tracing |
| `IAM`/`IDP` | Authentication for admins and participants |

:::tip
Keep the platform “cloud-native by default.” If you need bespoke infra to run `EDC-V`, you’re adding cost without improving trust.
:::

Put complexity where it pays: trust, policy, and interoperability. Where possible, rely on well-understood primitives for orchestration, persistence, and IAM.

### The Connector Fabric Manager

The Connector Fabric Manager (CFM) is your management plane. It provisions participant contexts and automates the lifecycle of `VPA`s. You can think of it as an orchestration layer for service virtualization: it creates runtime, but it is not the runtime.

At a minimum, `CFM` is designed to run as a reliable message-based system backed by a `PostgreSQL` database and a messaging middleware (by default, `NATS JetStream`). That bias toward asynchronous coordination is what lets provisioning workflows span multiple steps without tight coupling between subsystems.

The CFM comprises three subsystems:

| Subsystem | Role |
| --- | --- |
| Tenant Manager (TM) | Persists tenancy and virtualization metadata; exposes a REST API; initiates deployments |
| Provision Manager (PM) | Executes stateful orchestrations (workflows) for onboarding and `VPA` lifecycle |
| Activity Agents | Execute the infrastructure tasks of orchestration steps in isolated security contexts |

In an `EDC-V` environment, treat the `Tenant Manager` as the **metadata control point** and the `Provision Manager` as the **execution engine**. The `Tenant Manager` modifies virtualization entities (e.g., tenant, participant profile, `VPA` targeting) and sends message-based requests to the `Provision Manager`, which runs an orchestration until completion and reports status back asynchronously.

The `CFM` runtime is also designed to be modular: it can be composed from discrete modules (“service assemblies”) with explicit dependencies and lifecycle stages. This keeps the default architecture small while allowing you to adapt the runtime to different environments and operational requirements.

Activity Agents are where you integrate with your cloud platform and enforce consistency across tenants. They also isolate infrastructure secrets and access from the `Provision Manager`, creating bounded security contexts even within a single provisioning workflow.

- Deploy to Kubernetes
- Configure Vault namespaces
- Set up DNS entries

This separation keeps provisioning reliable under change: you can roll upgrades, restart workers, or throttle onboarding without rewriting the control flow logic that defines “what a participant context is.”

Communication happens through `NATS JetStream`, providing reliable, decoupled messaging between components. JetStream persistence and durable consumption is what makes long-running orchestrations resilient to restarts and transient failures.

:::tip Critical Architectural Insight
The CFM provisions trust infrastructure but is **not** in the runtime trust path. The CFM can be completely unavailable—undergoing maintenance, experiencing an outage, being upgraded—and live data sharing continues uninterrupted. Trust decisions happen directly between participant VPAs with no dependency on the CFM.
:::

Operationally, this split lets you plan downtime, upgrades, and incident response without turning every change into a full dataspace outage.

- Maintenance windows are possible without stopping transfers
- Outages block onboarding and provisioning, not runtime sharing
- Separate SLOs for management plane vs runtime

The practical consequence is that you can run “platform SRE” playbooks for `CFM` without touching the trust runtime. That’s exactly the separation you want when onboarding is degraded but existing participants are actively negotiating and transferring.

### Virtual Participant Agents

Virtual Participant Agents are the runtime components that serve participant profiles in a service-virtualized `EDC-V` deployment. Rather than deploying separate infrastructure for each organization, `VPA`s provide isolated contexts within shared infrastructure. This is the mechanism that makes multi-tenant operation economically viable at scale.

Three VPA types exist, each with a distinct trust role.

<Tabs>
  <TabItem value="data-plane" label="Data Plane VPA">

    A `Data Plane VPA` is the “data mover.” It executes transfers once a decision has been made, and it is optimized for throughput and proximity to data sources.

    Treat it as trust-agnostic by design: it focuses on transfer execution, not on authorization decisions.

  </TabItem>
  <TabItem value="credential-service" label="Credential Service VPA">

    A `Credential Service VPA` stores `verifiable credentials` and produces the cryptographic material needed to prove identity and claims. It’s where `DID` lifecycle (`DID Manager`) and proof/presentation composition (`Claim Management`) live.

    This keeps identity concerns out of your business apps and out of the transfer engine.

  </TabItem>
  <TabItem value="control-plane" label="Control Plane VPA">

    A `Control Plane VPA` is the policy and negotiation layer. It publishes catalogs, negotiates contracts, evaluates policies, and orchestrates the end-to-end sharing workflow.

    If you can explain one component to an architect, make it this one: it’s where trust decisions happen.

  </TabItem>
</Tabs>

When a consumer requests access, the `Control Plane VPA` asks for proofs, evaluates policies, and either establishes a contract or rejects the request. Only after that decision does the transfer get signaled and executed by data planes.

:::note
**Context Isolation** ensures that while `VPA`s share infrastructure, they are logically isolated. One participant context cannot see or access another participant’s data, credentials, or configuration.
:::

### The Mental Model Shift

If you're coming from traditional single-tenant connector deployments, the operational model changes fundamentally. Traditional deployments follow a simple equation: one connector equals one process. You deploy separate infrastructure for each tenant, scale by adding containers, and manage operations on a per-tenant basis.

CFM-managed deployments invert this model. One runtime serves many VPAs. You provision VPA metadata rather than deploying infrastructure. You scale by adding cells—logical groupings of shared resources—rather than individual containers. You manage operations centrally rather than per-tenant.

The table below captures the shift you’re making: from per-tenant deployments to shared runtimes, from “scale containers” to “scale cells,” and from manual operations to configuration-driven provisioning.

| Traditional Deployment | CFM-Managed Deployment |
|----------------------|----------------------|
| One connector = one process | One runtime serves many VPAs |
| Deploy infrastructure per tenant | Provision VPA metadata |
| Scale by adding containers | Scale by adding cells |
| Manage operations per-tenant | Manage operations centrally |

:::tip
This shift makes scaling sub-linear rather than linear with tenant count. You manage fewer cells with centralized tooling instead of hundreds of per-tenant deployments.
:::

---

## Part 2: What Your Customers Do — Tenant Experience & Dataspace Workflows

Now that you understand what you're operating, let's look at the platform from your users' perspective. How do organizations onboard? What do they interact with? How does the trust infrastructure connect to the broader dataspace ecosystem?

<Image src="/img/guides/dsaas-implementation/dsaas-impl-2.png" alt="EDC-V User Experience — Tenant View" style={{ maxWidth: '70%', margin: '2rem auto', display: 'block' }} />

From the tenant’s point of view, your platform is a thin “product surface” on top of a governance-defined trust framework and a protocol-driven runtime. The separation is deliberate: governance decides who is allowed to participate, while your `EDC-V` + `CFM` deployment makes participation operationally easy.

| Layer | What the tenant experiences | What it means for your product |
| --- | --- | --- |
| Dataspace Governance Authority | Rules, onboarding, issuers, compliance gates | You integrate; you don’t arbitrate membership |
| `EDC-V` runtime | Catalog, negotiation, identity proofs, transfer execution | You provide runtime primitives with service virtualization |
| Customer Portal | Self-service workflows and configuration | In practice: a deployment-specific `End-User UI` that calls Administration APIs |

> **Key Message:** Customers don't need to understand EDC internals. Your platform abstracts them.

### The Governance Layer

The Dataspace Governance Authority isn't your platform—it's the governing body that defines who can participate in the dataspace and what credentials they need. For industry dataspaces like Catena-X or Manufacturing-X, this is the consortium or foundation that establishes the rules. For private dataspaces, it might be a lead organization or industry group.

Understanding this separation is crucial for positioning your platform correctly. The governance body decides who can join; your platform turns approved organizations into runnable participants by provisioning `VPA`s and wiring identity and policy flows.

:::tip Principle
Your platform handles the technical layer; the Governance Authority handles the legal and trust layer.
:::

The Governance Authority operates two key services that interact with your platform:

| Service | Purpose | Operated by |
| --- | --- | --- |
| Onboarding Service | Business verification, legal agreements, compliance checks | Governance Authority |
| Credential Issuer | Creates `verifiable credentials` after approval | Governance Authority |

Depending on the dataspace, the issuer may be a governance-operated external service or a hosted issuer service integrated into your environment. The operational interface to your runtime stays the same: issued credentials are stored and presented via the `Credential Service VPA`.

If you need one diagram for “who does what,” use this flow. It makes clear where governance ends and where your runtime begins.

```text
(1) Apply & verify        (2) Issue credential                (3) Store & use in runtime
Onboarding Service  --->  Credential Issuer  --->  Credential Service VPA  --->  Control Plane VPA
```

This eliminates a common misconception: your `EDC-V` deployment is not the onboarding authority. It’s the infrastructure that makes approved participants usable and interoperable.

:::tip
Authorization and issuance are separate on purpose. Governance decides who can join; your platform executes the technical flow.
:::

### The Customer Portal

The Customer Portal is what your customers see and use day-to-day. For this guide, treat it as a deployment-specific `End-User UI` that models participant workflows on top of `EDC-V` Administration APIs. Only the UI backend is typically internet-facing; it holds machine credentials and calls APIs on behalf of logged-in users.

The portal manages a clear hierarchy of concepts that reflects how organizations actually think about their dataspace participation:

| Concept | Description |
| --- | --- |
| Tenant | Organization itself: customer, billing entity, support relationship |
| Participant Profiles | Links DIDs to the organization; may be multiple for business units |
| Dataspace Profiles | Configuration per dataspace (requirements, policies) |
| Sharing Apps | Apps that discover catalogs, negotiate contracts, and transfer data |

:::note Example
An automotive supplier might have one Dataspace Profile for Catena-X and another for Manufacturing-X, both served by a single infrastructure instance.
:::

### The EDC-V Runtime from the Customer's View

From the customer's perspective, the runtime presents three main touchpoints. The important detail is isolation: the same shared services handle many participants, but each `VPA` represents a distinct administrative and runtime context.

Under the hood, the `End-User UI` and its backend talk to a small set of Administration APIs. These APIs are for machine clients (automation and UI backends), not direct human use.

| Administration API | Exposed by | Purpose | Auth (typical) |
| --- | --- | --- | --- |
| Management API | Control Plane | Manage assets, policies, contract definitions, negotiations, transfers | `OAuth2` (`role=participant` or `role=provisioner`) |
| Identity API | Credential Service | Manage `DID` artifacts and `verifiable credentials` in the participant context | `OAuth2` (`role=participant` or `role=provisioner`) |
| Observability API | Every component | Readiness and health checks | none (monitoring) |
| Federated Catalog API (optional) | Control Plane | Query consolidated catalog of offerings | `OAuth2` (`role=participant`) |

<Tabs>
  <TabItem value="credential-service" label="Credential Service VPA">

    This is where issued `verifiable credentials` land and where proofs get assembled for verification. Tenants shouldn’t be thinking about key material and cryptographic formats—only about “do I have the credential, and can I prove it?”

  </TabItem>
  <TabItem value="control-plane" label="Control Plane VPA">

    This is where tenants publish offerings, define policies, and negotiate contracts. The value of service virtualization here is DX: tenants work with manageable concepts while the platform handles the `DSP` choreography behind the scenes.

  </TabItem>
  <TabItem value="data-plane" label="Data Plane VPA">

    This is where data actually connects to systems: object stores, APIs, streams, OT gateways, and line-of-business apps. It executes transfers only after authorization is established, which is why it can be optimized and deployed close to the data.

  </TabItem>
</Tabs>

### The Onboarding Journey

Understanding the complete onboarding flow reveals how all the pieces connect in practice. The journey has six stages:

1. Application to the Governance Authority's Onboarding Service
2. Verification: legal, compliance, and business checks
3. Credential issuance by the Governance Authority’s credential issuer
4. Participant context registration and `VPA` provisioning in your platform
5. Configuration: assets, policies, and applications
6. Active participation: catalog discovery, contracts, and transfers

The boundary to internalize is step 3 vs step 4: governance produces credentials, and your platform turns those credentials into runnable contexts (`VPAs`) with safe defaults. That’s how you avoid becoming the dataspace gatekeeper while still delivering a complete onboarding experience.

```text
Apply -> Verify -> Issue Credentials -> Provision -> Configure -> Participate
```

:::note 
Credential acquisition often involves processes outside your platform entirely—legal agreements, compliance audits, business relationship verification. Your platform facilitates the technical flow, but the business process belongs to the dataspace governance.
:::

### Authentication and Access Control

`EDC-V` Administration APIs are designed for machine clients and use centralized access control with `OAuth2`. In practice, you’ll see four logical roles in a deployment: `operator` (infrastructure), `admin` (emergency), `provisioner` (automation), and `participant` (tenant-scoped operations).

| Role | Access | Use case |
| --- | --- | --- |
| Operator | Infrastructure only (Kubernetes, DNS, Vault, IAM) | Initial deployment and ongoing platform operations |
| Admin | Full access to all resources | Emergency access and initial setup |
| Provisioner | Creates participant contexts and manages `VPA`s | `CFM` automation and onboarding |
| Participant | Manages own resources | Business apps and day-to-day operations |

Administration APIs use the `client_credentials` flow. The same token can be used across `Control Plane` and `Credential Service` Administration APIs if it carries the correct claims and scopes.

Two claims matter for correctness:

- `role`: one of `admin`, `provisioner`, `participant` (and deployment-defined operator access outside Admin APIs)
- `participant_context_id`: identifies the participant context the client acts for

Participant-scoped endpoints are typically rooted under `"/participants/{participant_context_id}/..."`, which is how the platform enforces isolation at the API surface.

For participant-scoped tokens, scopes are a key part of least privilege: the `role=participant` token should carry a `scope` claim that limits what the client can do. Keep `role=admin` for emergencies only, and use `role=provisioner` for automation that creates and manages contexts without mutating participant-owned data.

In practice, this is the simplest model for platform automation: service accounts and CI/CD pipelines can call provisioning and runtime APIs without user sessions, while you still enforce least privilege via role-separated clients.

```bash
curl -X POST "$TOKEN_URL" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials&client_id=...&client_secret=..."
```

Once you have the token, you send it as `Authorization: Bearer <token>` to the `CFM` APIs and the tenant-facing runtime APIs. This keeps auth consistent across the stack and reduces “which token goes where?” confusion during onboarding.

---

## Part 3: How Data Actually Moves — Data Planes & Deployment Patterns

The first two perspectives showed you the platform and the user experience. Now we examine what makes trusted data sharing actually work: how data flows between organizations while maintaining sovereignty and security.

<Image src="/img/guides/dsaas-implementation/dsaas-impl-3.png" alt="EDC-V Runtime — Data Plane Perspective" style={{ maxWidth: '70%', margin: '2rem auto', display: 'block' }} />

> **Key Message:** Trust is decentralized, but operations are centralized—this is what makes service virtualization scale.

The diagram reveals the critical separation between what you operate in your cloud and what other dataspace participants operate in theirs. Public networks connect them through standardized protocols that ensure interoperability regardless of deployment choices.

If you find it useful to think in analogies: the `Control Plane` is the coordination and authorization layer, while the `Data Plane` is the execution layer. One decides and signals; the other performs the transfer.

### The Security Boundary

The Security Boundary represents a critical architectural division with far-reaching implications for deployment and operations.

| Above the boundary | Below the boundary |
| --- | --- |
| Trust infrastructure: Control Plane and Credential Service | Data infrastructure: Data Plane and data sources |
| Policies evaluated and credentials verified | Transfers executed after authorization |

Benefits of this separation:

You want this boundary because it turns trust evaluation into control-plane work and keeps transfers fast and deployable near the data.

- Performance optimization: no policy evaluation during transfer
- Edge deployment: Data Planes run close to data sources
- Protocol flexibility: HTTP, S3, OPC-UA, and more under one policy model

Once this boundary is clear, deployment patterns become easier to reason about. You can place `Data Plane`s where the data and constraints are, while keeping policy and identity flows consistent across the dataspace.

### The Three Protocols

Three standardized protocols make dataspaces interoperable:

| Protocol | Connects | Purpose |
| --- | --- | --- |
| `DCP` | Credential Service to Credential Service | Identity verification and claims exchange |
| `DSP` | Control Plane to Control Plane | Catalog discovery and contract negotiation |
| `DPS` | Control Plane to Data Plane | Transfer signaling and execution |

Each protocol is a single hop between two roles. When you debug interoperability, identify which hop you’re in before you look at payloads and policy details.

```text
DCP (identity proofs)
Consumer Credential Service  <-->  Provider Credential Service
```

```text
DSP (catalog + contract)
Consumer Control Plane  <-->  Provider Control Plane
```

```text
DPS (transfer signaling)
Provider Control Plane  --->  Provider Data Plane
```

This is also a fast triage heuristic: `DCP` failures are usually credential/identity issues, `DSP` failures are negotiation/policy issues, and `DPS` failures are transfer wiring/execution issues.

Data sharing happens peer-to-peer directly between `Data Plane`s after trust and agreement are established.

### Protocol Choreography

When a partner wants to access data from one of your customers, the protocols execute in sequence:

1. `DCP` identity verification between Credential Services
2. `DSP` catalog discovery and contract negotiation
3. `DPS` signaling from Control Plane to Data Plane
4. Data sharing execution between `Data Plane`s

The key is that protocol order mirrors responsibility: `DCP` establishes who is asking, `DSP` establishes what was agreed, and `DPS` triggers the runtime that moves data. After that, data flows peer-to-peer between `Data Planes` with no dependency on your management plane.

```text
Partner CS --DCP--> Provider CS
Partner CP --DSP--> Provider CP
Provider CP --DPS--> Provider DP
Provider DP <----data----> Partner DP
```

### Deployment Patterns

The architecture supports multiple deployment patterns, each suited to different customer needs.

<Tabs>
  <TabItem value="managed" label="Fully Managed">

    Choose this when tenants want speed over control. You operate `Control Plane`, `Credential Service`, and `Data Plane`, which gives the best onboarding DX but also makes you responsible for the full runtime footprint.

  </TabItem>
  <TabItem value="hybrid" label="Hybrid">

    Choose this when tenants need data residency, sovereign boundaries, or on-prem connectivity. You operate `Control Plane` and `Credential Service`, while the tenant operates their `Data Plane` in the environment that’s closest to the data.

  </TabItem>
  <TabItem value="self-hosted" label="Partner / Self-Hosted">

    Choose this when the counterparty runs their own stack. Protocol interoperability is the point: as long as they speak `DCP`/`DSP`/`DPS`, your tenants can negotiate and transfer without caring where the other side is hosted.

  </TabItem>
</Tabs>

### Transfer Types and Edge Patterns

The Data Sharing connection supports three fundamental transfer patterns:

| Type | Direction | Use cases |
| --- | --- | --- |
| Pull | Consumer fetches from provider | API access, on-demand queries, real-time data |
| Push | Provider sends to consumer | Batch exports, event-driven delivery, file transfers |
| Stream | Continuous flow until terminated | IoT sensors, telemetry, real-time monitoring |

For customers with data sovereignty requirements or edge deployments, several patterns address common scenarios:

- **Factory/Site Edge Pattern:** Data Planes at each site connect to local systems while the Control Plane manages a unified catalog.
- **Multi-Protocol Edge Pattern:** Separate Data Planes handle OPC-UA, S3, HTTP, and other protocols under one policy model.
- **Geographic Distribution Pattern:** Data Planes deploy in required regions to keep transfers within jurisdiction.

These patterns are common in practice: they help keep the trust model stable while letting data stay where it must. Service virtualization lets participants mix these patterns without rewriting policy logic for each transport.

---

## Part 4: Production Operations

Running `EDC-V` in production requires attention to high availability, observability, and clear service level targets. This section covers the operational aspects that differentiate a proof-of-concept from a production-grade service.

The transition from development to production is where many dataspace initiatives stumble. The technology works in the lab, but operating it reliably for paying customers demands a different level of rigor. The good news: the `EDC-V` + `CFM` architecture was designed with production operations in mind.

### Building High Availability

High availability must be addressed at both the CFM layer and the cell layer, with different considerations for each.

For the **CFM layer**:

Treat the `CFM` like any other control plane: replicate stateless services, make the message bus resilient, and keep stateful components (`PostgreSQL`, `Vault`) in HA configurations you already know how to run.

- CFM pods: minimum 2 replicas behind a load balancer
- `NATS`: minimum 3 nodes for quorum
- `PostgreSQL`: primary + synchronous replica with automatic failover
- `Vault`: HA mode with auto-unseal; consider cross-region replication
- Deployment: primary region plus warm standby in DR region

The goal is not “never down,” it’s controlled failure modes. `CFM` downtime should degrade onboarding and provisioning, not break live negotiation and transfers.

:::note
CFM unavailability does not affect live data sharing, but prolonged outages block onboarding and VPA provisioning.
:::

For the **cell layer**, scale based on component characteristics:

| Component | Replicas | Scaling trigger |
| --- | --- | --- |
| Control Plane | 3-5 | HPA on CPU and request rate |
| Data Plane | 2-10+ | HPA or KEDA on transfer volume |
| Credential Service | 2-3 | Verification load |

Multiple cells provide geographic distribution, fault isolation, and regulatory compliance.

### Implementing Observability

A production observability stack requires metrics, logging, and tracing working together.

**Metrics (Prometheus/Grafana):**

| Category | Key metrics |
| --- | --- |
| Business | Active tenants and VPAs, contracts negotiated, transfers completed, data volume shared, credential issuances |
| Technical | API latency (P50/P95/P99), request rates, error rates, NATS queue depth, resource utilization |

**Logging (ELK/Loki or similar):**

Treat logs as both debugging output and an audit trail. Your logging strategy should make it easy to answer “what happened for this tenant/`VPA`/counterparty?” without digging across a dozen pods.

- Required fields: severity, component name, VPA identifier, tenant identifier
- Common context: action, counterparty `DID`s, contract IDs
- Categories: application events, security/audit, `DSP` messages, `DCP` flows

If you standardize these fields early, you can build tenant-scoped dashboards and incident playbooks that scale with customer count instead of collapsing under noise.

**Tracing (Jaeger or similar):**

Tracing is how you debug “it’s slow” complaints without guessing. The goal is to follow a single request across `DSP` negotiation, `DCP` verification, and `DPS` signaling with one correlation context.

- `DSP` flows: catalog -> negotiation -> transfer
- `DCP` credential presentation and verification
- `DPS` signaling between control and data planes
- End-to-end transfer paths

This is also where you validate the architecture’s separation of concerns: policy evaluation should show up in control-plane spans, not buried inside transfer execution.

### Configuring Alerts

Effective alerting balances signal and noise.

| Scenario | Severity | Condition |
| --- | --- | --- |
| VPA provisioning failures | High | Stuck longer than 5 minutes |
| Contract negotiation errors | Medium | Error rate > 5% over 5 minutes |
| Transfer failures | High | 3+ consecutive failures |
| Cell health degradation | Critical | < 50% ready pods |
| Credential expiry | Medium | Expires within 7 days |

### Defining SLAs

Your service level agreements should address both availability and performance.

**Availability targets:**

| Service | Target |
| --- | --- |
| `CFM` API | 99.9% |
| `DSP` APIs (catalog + negotiation) | 99.95% |
| Data Plane transfer execution | 99.9% |
| Credential Service verification | 99.9% |

**Performance targets:**

| Metric | Target |
| --- | --- |
| Catalog queries | < 500ms at P95 |
| Contract negotiation | < 2 seconds end-to-end |
| VPA provisioning | < 60 seconds |
| Transfer initiation | < 1 second |

### Pricing Dimensions

For usage-based pricing, track metrics that align with delivered value.

| Metric | Reflects |
| --- | --- |
| Active VPAs per month | Infrastructure footprint |
| Contracts negotiated | Business activity |
| Data volume shared | Actual sharing |
| API requests | Catalog queries and negotiations |
| Edge Data Plane instances | On-premise deployments |
| Credential issuances | Trust infrastructure usage |

---

## Getting Started

With the architectural understanding from this guide, you're ready to begin implementation. The path from documentation to production infrastructure has several stages, and rushing through them often creates problems expensive to fix later.

Implementation goes faster when you build intuition before you build automation. Use this path to get from concepts to a running stack:

1. Read the **Decision Maker Guide** for the strategic "why"
2. Deploy **JAD (Just Another Demonstrator)** for hands-on exploration
3. Study the architecture docs on VPAs, Cells, Service Virtualization, and trust model rationale

After this, you should be able to sketch your own “cells + `VPA`s + trust boundary” diagram and explain it to both SREs and architects. If not, revisit Part 1 and Part 3—those are the load-bearing models.

### Plan Your Deployment

Every deployment is shaped by its specific context. Before writing code, consider:

- Cloud regions and latency implications
- Compliance requirements you must meet
- Expected tenant count at launch and growth trajectory
- Whether customers need edge Data Plane capabilities
- Which deployment templates match your target customers

Document your answers. They'll inform decisions throughout implementation and help explain your architecture to stakeholders who join later.

### Engage with the Community

The dataspace ecosystem is collaborative by nature:

- Eclipse EDC GitHub repositories for source code and issues
- EDC Community Discussions for questions and knowledge sharing
- Dataspace Working Group for broader ecosystem engagement

Operationally, this matters because you’re building on evolving standards and reference implementations. Staying close to the upstream community is how you de-risk protocol changes, security fixes, and interoperability edge cases.

---

## Summary

This guide presented an operator’s view of `EDC-V` with `CFM` through three perspectives that together form a complete blueprint.

| Perspective | Core message |
| --- | --- |
| Operations | CFM provisions infrastructure but is not in the runtime trust path |
| User | Customers do not need to understand EDC internals; the platform abstracts them |
| Data Plane | Trust is decentralized while operations are centralized, enabling scale |

The architecture succeeds because it chooses the right abstractions for a managed service. You operate cells and provisioning workflows, while tenants operate policies and integrations. Interoperability holds because `DCP`/`DSP`/`DPS` keep deployment choices out of the protocol contract.

Use this checklist to turn the model into a roadmap:

- Deploy `JAD` locally for hands-on familiarity
- Walk through tenant onboarding to understand the customer journey
- Test deployment scenarios across fully managed, hybrid, and partner/self-hosted
- Design your production architecture around explicit constraints (regions, residency, scale)
- Start implementing incrementally: management plane first, then runtime cells, then onboarding automation

The goal is momentum without surprises: make one boundary “real” at a time, and keep the system observable as you add scale.
