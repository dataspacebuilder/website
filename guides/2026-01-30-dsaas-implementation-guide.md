---
slug: dsaas-implementation-guide
title: "From Complexity to Commodity: Turning Data Sharing Capabilities into a Managed Service"
authors: [ndkrimbacher]
tags: [implementation, architecture, cloud-providers]
description: "A comprehensive guide for cloud platform teams on deploying the EDC stack as Dataspace-as-a-Service. Learn the architecture, onboarding workflows, usage patterns, and production operations."
keywords: [DSaaS, Dataspace-as-a-Service, EDC, Eclipse Dataspace Components, CFM, Connector Fabric Manager, cloud provider, multi-tenant, VPA, Virtual Participant Agent]
image: /img/guides/dsaas-implementation/dsaas-impl-cover.jpeg
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Cloud providers looking to offer trusted data sharing as a managed service face a significant challenge: the dataspace stack is sophisticated, with multiple components handling identity, policy, negotiation, and transfer. This guide transforms that complexity into a clear implementation path.

{/* truncate */}

:::tip What You'll Learn
This guide covers four essential areas for CSP platform teams: understanding the EDC stack and how its components relate; how organisation onboarding works and what tenants need; the primary usage patterns for DSaaS in practice; and the production operations considerations including high availability, observability, and SLA targets.
:::

## Intended Audience

This guide is designed for enterprise architects who need a clear picture of what it means to run the EDC stack in their infrastructure. Platform teams will find the technical details necessary to deploy and operate DSaaS effectively, while solutions architects will gain an understanding of deployment patterns suited to different customer scenarios. By the end, your platform team should be able to deploy the EDC stack independently and understand the operational model for running DSaaS at scale.

---

## Part 1: Understanding the EDC Stack

Before you can run something, you need to understand what you're running. The EDC stack for Dataspace-as-a-Service consists of four distinct layers, each with a specific responsibility. These layers work together to provide a complete trusted data sharing infrastructure.

![Dataspace-as-a-Service Stack for Cloud Operators](/img/guides/dsaas-implementation/dsaas-impl-1.jpeg)

### The Protocol Foundation

At the foundation of the stack are three standard protocols that enable interoperability across the dataspace ecosystem. The Dataspace Protocol (DSP) handles catalog discovery, contract negotiation, and transfer initiation—it is the primary protocol through which connectors communicate about what data is available and under what terms it can be shared. The Decentralized Claims Protocol (DCP) manages identity assertion, credential presentation, and verification, enabling participants to prove their attributes without relying on centralized identity providers. Finally, Data Plane Signaling (DPS) coordinates communication between the control plane and data plane, ensuring that once agreements are reached, the actual data transfer is executed correctly.

These protocols are what make EDC connectors interoperable with other implementations. A connector from one vendor can negotiate with a connector from another because they speak the same protocol. This standardization is crucial for the dataspace ecosystem's growth and for your customers' ability to participate in multiple dataspaces.

### The Connector Fabric Manager

The Connector Fabric Manager (CFM) serves as your management plane—the orchestration layer that makes multi-tenant operation possible. Understanding its role is essential because it fundamentally changes how you think about deploying and managing dataspace infrastructure.

:::warning Critical Insight
The CFM provisions trust infrastructure but is NOT in the runtime trust path. This architectural decision has significant operational implications: the CFM can be unavailable without affecting live data sharing, trust decisions happen directly between participant VPAs, and there is no single point of trust failure in the architecture.
:::

The CFM comprises three subsystems working together. The Tenant Manager provides the REST API for CRUD operations on tenants, participants, and VPAs, while also managing state across the platform. The Provision Manager handles stateful orchestration workflows, coordinating the multi-step processes required to bring new participants online. Activity Agents execute the actual infrastructure tasks—deploying to Kubernetes, configuring Vault namespaces, setting up DNS—and are deliberately isolated from the provisioner for security purposes.

The message-based architecture, built on NATS Jetstream, ensures reliable and decoupled communication between these subsystems. When the Tenant Manager triggers a provisioning workflow, the Provision Manager orchestrates it, and Activity Agents execute the actual infrastructure changes. This separation of concerns makes the system more resilient and easier to scale.

### The EDC-V Shared Runtime

The EDC-V (Virtual) runtime is where the dataspace operations actually happen. Rather than running separate processes for each tenant, EDC-V hosts multiple Virtual Participant Agents (VPAs)—isolated contexts within shared infrastructure. This is a fundamental shift from traditional deployments and is what makes DSaaS economically viable at scale.

There are three types of VPAs, each with a distinct trust role in the architecture.

The Control Plane VPA is where trust decisions happen. It runs the Catalog Service that publishes and discovers data offerings, handles Contract Negotiation between providers and consumers, operates the Policy Engine that evaluates access policies against credentials, and manages the Transfer Manager that initiates and coordinates data transfers. When a consumer requests access to data, the Control Plane evaluates whether the request should be granted based on the credentials presented and the policies defined by the provider.

The Identity Hub VPA serves as the trust store for each participant. It manages Decentralized Identifiers (DIDs) through its DID Manager, stores verifiable credentials securely, and creates verifiable presentations when participants need to prove their attributes to others. This component is essential for the decentralized trust model that dataspaces employ.

The Data Plane VPA is deliberately trust-agnostic—it executes transfers but does not make trust decisions. It handles the actual movement of data between parties, supports multiple protocols including HTTP, S3, Azure Blob, and industrial protocols, and validates access tokens without evaluating the underlying policies. This separation is important because it allows the Data Plane to be optimized for performance without the overhead of trust evaluation.

The trust-agnostic nature of the Data Plane deserves emphasis. Because the Data Plane doesn't evaluate policies or credentials, it can be highly optimized for throughput. It simply executes what the Control Plane agreed. This enables protocol-specific implementations, performance optimization without trust overhead, and edge deployment scenarios where a full Control Plane might not be practical.

### Infrastructure Requirements

The stack runs on standard cloud-native infrastructure. Kubernetes provides container orchestration and scaling, and should be configured with multiple nodes and auto-scaling for production deployments. PostgreSQL handles state persistence for all components and should be deployed with primary-replica replication for high availability. Vault manages secrets and credential storage, and should be configured in HA mode with auto-unseal capabilities. DNS routes requests to the appropriate endpoints and enables DID resolution, requiring managed DNS with health checks. NATS Jetstream provides reliable messaging for CFM communication and should be deployed as a three-node cluster minimum for production.

### The Fundamental Mental Model Shift

If you're coming from traditional single-tenant deployments, the key insight is how the operational model changes. In traditional deployments, one connector equals one process—you deploy separate infrastructure for each tenant, scale by adding containers, migrate by redeploying, and manage operations per-tenant. In CFM-managed deployments, one runtime serves many VPAs—you provision VPA metadata rather than deploying infrastructure, scale by adding cells, migrate by moving metadata, and manage operations centrally.

This shift has profound implications for cost, operations, and scalability. Instead of linear resource scaling with tenant count, you achieve sub-linear scaling because tenants share infrastructure. Instead of managing hundreds of separate deployments, you manage a smaller number of cells with centralized tooling.

---

## Part 2: Organisation Onboarding

When an organisation wants to use your DSaaS platform, a structured onboarding process transforms them from an unknown entity into a trusted participant capable of sharing data across dataspaces. This section walks through the complete onboarding flow.

![Organisation Onboarding to Dataspace-as-a-Service](/img/guides/dsaas-implementation/dsaas-impl-2.jpeg)

### Understanding the Data Model

Before diving into the onboarding phases, it's essential to understand the data model hierarchy that underlies the platform. A Tenant represents the organisation using your DSaaS platform—this is your customer. Under each Tenant, you have ParticipantProfiles, which link a Decentralized Identifier (DID) to the tenant. Each ParticipantProfile can have one or more DataspaceProfiles, representing configuration for specific dataspaces like Catena-X or Manufacturing-X. Finally, VPAs (Virtual Participant Agents) provide the runtime contexts for each component—the Control Plane, Identity Hub, and Data Plane instances that actually serve the participant.

This hierarchy allows a single organisation to maintain multiple identities if needed (though most will have just one), participate in multiple dataspaces with different configurations, and have their infrastructure distributed across multiple cells for geographic or compliance reasons.

### Phase 1: Tenant Registration

The onboarding journey begins when an organisation signs up for your platform. At this stage, you create a tenant record in the CFM's state store, capturing basic information about the organisation. You then issue OAuth2 client credentials via your identity provider—whether that's Keycloak, Azure AD, or another provider. Finally, you configure a DNS subdomain for the tenant, such as `acme.dsaas.yourplatform.com`.

Upon completion of this phase, the organisation receives their API credentials for interacting with their DSaaS instance. These credentials, consisting of a client ID, client secret, and API endpoint, become the organisation's primary means of managing their dataspace presence.

### Phase 2: Creating the Participant Profile

With tenant credentials in hand, the organisation creates their participant profile—their identity in the dataspace ecosystem. This phase involves DID assignment, where either you auto-generate a DID like `did:web:acme.dsaas.yourplatform.com` or the organisation brings their own existing DID. A Vault namespace is created at a path like `/tenants/acme/creds` to provide isolated credential storage. API endpoints are configured for the Management API, DSP endpoints, and DID resolution.

The DID becomes the organisation's identity in the dataspace—a globally unique, cryptographically verifiable identifier that any other participant can resolve and verify. This is fundamentally different from traditional identity models where a central authority must be contacted; with DIDs, verification happens through cryptographic proof.

### Phase 3: Configuring Dataspace Profiles

Each dataspace has its own rules, credential requirements, and protocol versions. The organisation configures their dataspace profile to specify the target dataspace they want to participate in, whether Catena-X, Manufacturing-X, or a custom dataspace. They select the appropriate protocol version, as there may be differences between DSP 2024-1 and DSP 2025-1. They configure the accepted policies—dataspace-specific policy templates that govern how negotiations work. And they specify credential requirements—what credentials they need to hold to participate in that dataspace.

A powerful aspect of this model is that a single participant can belong to multiple dataspaces with different configurations. An automotive supplier might participate in Catena-X for supply chain data sharing while also participating in a custom industry dataspace for quality data exchange, each with its own policies and credential requirements.

### Phase 4: Provisioning Virtual Participant Agents

With the profile configured, the Provision Manager orchestrates VPA creation. The Tenant Manager initiates the provisioning workflow, then Activity Agents execute their respective tasks: the K8s Agent deploys the necessary Kubernetes resources, the Vault Agent creates credential namespaces, and the DNS Agent configures routing. When complete, the VPAs become active—Control Plane, Identity Hub, and Data Plane contexts are ready to serve requests.

At this point, the organisation has running infrastructure, but they're not yet a trusted participant in their target dataspace. The final step bridges this gap.

### Phase 5: Acquiring Dataspace Credentials

The final step transforms the organisation from having infrastructure to being a valid dataspace participant. The Identity Hub requests the appropriate membership credential from the dataspace's Issuer Service. The Issuer verifies the organisation's eligibility, which may involve external approval processes, legal agreements, or compliance checks. Once approved, the credential is issued and stored in the organisation's Identity Hub.

:::info Credential Acquisition is Separate
The credential acquisition step often involves processes outside the technical platform—legal agreements, membership verification, compliance checks. Your DSaaS platform facilitates the technical flow, but the business process is dataspace-specific. Some dataspaces may have automated issuance, while others require manual review and approval.
:::

With the credential stored, the organisation is now a valid participant. They can discover other participants' catalogs, negotiate contracts for data access, and share data according to agreed terms.

### The Authentication Model

EDC-V implements centralized access control using OAuth2 with three distinct roles. The Admin role has full access to all resources and should be used only for emergency or initial setup—never for automated systems. The Provisioner role can create participant contexts and manage VPAs, making it appropriate for CFM automation and onboarding workflows. The Participant role allows organisations to manage their own resources including assets, policies, and contracts, and is used by business applications interacting with the platform.

All APIs use the OAuth2 client_credentials flow, and the same token works across Control Plane, Identity Hub, and Issuer Service, providing a unified access model across the platform.

---

## Part 3: How Organisations Use DSaaS

Once onboarded, organisations use the platform in two primary patterns, each suited to different business needs. Understanding these patterns helps you position your DSaaS offering correctly and design appropriate service tiers.

![DSaaS Usage Patterns](/img/guides/dsaas-implementation/dsaas-impl-3.jpeg)

### Pattern A: Simple API Sharing

The first pattern suits SaaS companies that want to share their existing APIs through a dataspace, adding policy-controlled access and trusted data sharing capabilities to existing services.

In this architecture, the organisation keeps their existing backend API and database entirely unchanged. Your DSaaS provides a Control Plane VPA for handling catalog publication and contract negotiation, a Data Plane VPA that acts as a trusted proxy to the backend API, and an Identity Hub VPA for managing the organisation's credentials.

The flow works as follows: the organisation registers their API as an asset in the Control Plane, specifying where the data lives and what policies govern access. A consumer discovers this asset in the catalog, seeing what's available based on their credentials and the provider's access policies. The consumer negotiates a contract with the Control Plane, agreeing to terms through the DSP protocol. Upon agreement, the Control Plane issues an access token. The consumer then calls the Data Plane with this token, and the Data Plane validates the token and proxies the request to the backend API.

A typical asset configuration for this pattern might specify an HTTP data address pointing to the organisation's existing API, along with authentication details stored securely in Vault. The actual configuration would include the asset ID, human-readable properties, and a data address specifying the backend URL and authentication method.

The key characteristics of this pattern are that data never moves to your DSaaS platform, the existing API is reused without code changes, the Data Plane acts as a policy-enforcing gateway, and the Control Plane manages all access policies. This pattern is ideal for SaaS providers monetizing APIs, B2B API access scenarios requiring policy control, and organisations seeking quick dataspace integration without infrastructure changes.

### Pattern B: Enterprise Multi-Site

The second pattern suits manufacturing companies with multiple factories wanting to share sensor data while keeping data on-premise until authorized transfer occurs.

In this architecture, the Control Plane VPA is hosted in the cloud, providing a single management point for catalog and negotiations across all sites. The Identity Hub VPA is also in the cloud for centralized credential management. Crucially, Data Plane VPAs are deployed at each factory location, remaining close to the data sources.

The flow differs from Pattern A in important ways. The central Control Plane manages a unified catalog across all sites—consumers see one coherent view of available data regardless of where it physically resides. Each factory has a local Data Plane connected to local data sources, meaning the data stays on-premise until a transfer is authorized. DPS Signaling coordinates between the cloud Control Plane and edge Data Planes. When a transfer is authorized, data flows directly from the edge Data Plane to the consumer, never routing through the central cloud unless required.

This pattern supports three transfer types. Pull transfers allow the consumer to fetch from the provider endpoint, suitable for real-time API access and on-demand queries. Push transfers have the provider send data to a consumer-specified destination, appropriate for batch exports, event-driven scenarios, and large file transfers. Stream transfers provide continuous non-finite flows, ideal for IoT sensors and real-time monitoring scenarios.

The key characteristics here are control plane centralization in the cloud for unified management, data planes at the edge for data sovereignty, protocol flexibility with different protocols (OPC-UA, MQTT, S3, HTTP) at different sites, and low latency for local data access. This pattern is ideal for manufacturing with multiple production sites, industrial IoT scenarios, regulated industries requiring data residency, and hybrid cloud/on-premise architectures.

### Offering DSaaS Templates

Consider offering pre-configured templates for common patterns to accelerate customer onboarding. An API Sharing template would include one Control Plane VPA, one HTTP-capable Data Plane VPA, and one Credential Service VPA—perfect for SaaS providers and API monetization scenarios. An Industrial Edge template would include one cloud-hosted Control Plane VPA, multiple edge Data Plane VPAs, and one Credential Service VPA—suited for manufacturing, IoT, and OT network scenarios. A File Exchange template would include one Control Plane VPA, one S3-capable Data Plane VPA, and one Credential Service VPA—appropriate for B2B file sharing and batch data scenarios.

Templates accelerate onboarding by pre-configuring the right architecture for each use case, reducing time-to-value for your customers.

---

## Part 4: Production Operations

Running DSaaS in production requires careful attention to high availability, observability, and clear service level targets. This section covers the operational aspects that differentiate a proof-of-concept from a production-grade service.

![Production Operations for DSaaS](/img/guides/dsaas-implementation/dsaas-impl-4.jpeg)

### Building a High Availability Architecture

High availability must be addressed at both the CFM layer and the cell layer, with different considerations for each.

At the CFM layer, deploy CFM pods with at least two replicas behind a load balancer to ensure management plane availability. The NATS cluster should have a minimum of three nodes to maintain quorum—with fewer nodes, a single failure could disrupt messaging. PostgreSQL should be configured with a primary and synchronous replica with automatic failover to prevent data loss and minimize downtime. Vault should run in HA mode with auto-unseal capabilities and, ideally, cross-region replication for disaster recovery scenarios.

The CFM layer should be deployed in your primary region with a warm standby in a DR region. While CFM unavailability doesn't affect live data sharing (a critical architectural property), prolonged unavailability prevents new tenant onboarding and VPA provisioning.

At the cell layer, each Kubernetes cluster hosting EDC-V runtimes needs its own scaling strategy. Control Plane deployments should run three to five replicas with Horizontal Pod Autoscaling based on CPU and request rate. Data Plane deployments should scale more aggressively, from two to ten or more replicas, using HPA or Keda based on transfer volume. Credential Service deployments typically need two to three replicas, scaled based on verification load.

Multiple cells provide geographic distribution with cells in different regions, fault isolation where cell failure doesn't affect other cells, and regulatory compliance with cells deployed in specific jurisdictions to meet data residency requirements.

:::warning CFM Failure Independence
CFM failure does NOT affect live data sharing. Catalog queries, negotiations, and transfers happen directly between VPAs using DSP—there is no live dependency on CFM. This is a critical architectural property that enables high availability of the data sharing functionality even during management plane maintenance or outages.
:::

### Implementing Comprehensive Observability

A production observability stack requires metrics, logging, and tracing working together to provide complete visibility into platform operations.

For metrics, deploy Prometheus and Grafana to track both business and technical indicators. Business metrics should include active tenants and VPAs, contracts negotiated per period, transfers completed, total data volume shared, and credential issuances. Technical metrics should cover API latency at P50, P95, and P99, request rates by component, error rates, NATS queue depth, and resource utilization including CPU and memory.

For logging, implement structured logging using ELK Stack or Loki with per-VPA context. Each log entry should include the severity level, component name (control-plane, data-plane, etc.), VPA identifier, tenant identifier, action description, and relevant contextual data like counterparty DIDs or contract IDs. Key log categories to capture include application events, security and audit logs, DSP protocol messages, and DCP credential flows.

For tracing, deploy Jaeger or a similar distributed tracing solution to trace requests across DSP request flows from catalog through negotiation to transfer, DCP credential presentation and verification, DPS signaling between control plane and data plane, and end-to-end transfer paths.

### Configuring Critical Alerts

Configure alerts for scenarios that require operator attention. VPA provisioning failures where workflows remain stuck for more than five minutes warrant high-severity alerts. Contract negotiation error rates exceeding five percent within five minutes merit medium-severity attention. Three or more consecutive transfer failures should trigger high-severity alerts. Cell health degradation with fewer than fifty percent of pods ready requires critical-severity response. Credential expiry approaching within seven days justifies medium-severity proactive notification.

### Defining SLA Dimensions

Your service level agreements should address both availability and performance targets.

For availability, target 99.9% uptime for the CFM API handling management operations, 99.95% for DSP APIs handling catalog and negotiation, 99.9% for Data Plane transfer execution, and 99.9% for Identity and DCP credential verification.

For performance, target catalog queries completing within 500 milliseconds at P95, end-to-end contract negotiations completing within two seconds, VPA provisioning completing within 60 seconds, and transfer initiation completing within one second.

### Establishing Pricing Dimensions

For usage-based pricing models, track metrics that align with value delivered. Active VPAs per month reflects the infrastructure footprint. Contracts negotiated represents business activity and value creation. Data volume in gigabytes captures actual data sharing. API requests counts catalog queries and negotiations. Edge data plane instances reflects on-premise deployments requiring support. Credential issuances represents trust infrastructure usage for platforms offering issuer services.

---

## Getting Started

With the architectural understanding and operational knowledge from this guide, you're ready to begin implementation.

Start by deploying the JAD (Just Another Demonstrator), which provides a complete reference implementation. Deploy it locally to understand how all the pieces fit together before attempting production deployment. The JAD demonstrator guide provides step-by-step instructions for this initial exploration.

Next, study the architecture documentation in depth. The Understanding the Stack documentation explains the evolution from traditional to modern architecture and why CFM exists. The Core Concepts documentation covers VPAs, Cells, and Service Virtualization in detail. The Components Deep Dive examines CFM, Identity Hub, Control Plane, and Data Plane implementation specifics. The Trust Framework documentation explains how trust works in dataspaces and why the architecture makes the trust decisions it does.

Then plan your deployment by considering your specific requirements. Which cloud regions will you deploy to, and what are the latency implications? What compliance requirements must you meet—GDPR, data residency, industry-specific regulations? What is your expected tenant count at launch and over time? Do your customers need edge deployment capabilities?

Finally, engage with the community through the Eclipse EDC GitHub repositories, the EDC Community Discussions for questions and knowledge sharing, and the Dataspace Working Group for broader ecosystem engagement.

---

## Summary

Building Dataspace-as-a-Service is achievable with a clear understanding of the stack and its operational requirements. The protocol layer enables interoperability between different implementations and is your responsibility to implement correctly. The CFM layer orchestrates tenant lifecycle and is your responsibility to deploy and operate reliably. The EDC-V Runtime layer hosts participant VPAs and requires scaling and monitoring. The infrastructure layer provides the foundation and demands high availability maintenance.

The EDC stack is resource-efficient through shared runtimes and configuration-based isolation, and operationally manageable through centralized operations and automated provisioning. With the patterns and practices in this guide, you can transform the complexity of dataspace infrastructure into a managed service offering that delivers value to your customers.

:::tip Next Steps
Begin by deploying JAD locally to build hands-on familiarity. Walk through the tenant onboarding process to understand the experience your customers will have. Test both the API Sharing and Multi-Site usage patterns. Then design your production architecture based on your specific requirements and begin building your DSaaS offering.
:::
