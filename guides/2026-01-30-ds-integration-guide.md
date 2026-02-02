---
slug: ds-integration-guide
title: "Enterprise Data Sharing with Eclipse DSaaS?
authors: [ndkrimbacher]
tags: [integration, enterprise, data-plane, application-development]
description: "A comprehensive guide for enterprise architects and developers on integrating dataspace capabilities into existing IT infrastructure. Learn to use the managed stack, deploy custom data planes, and build applications on top of trusted data sharing."
keywords: [dataspace integration, enterprise architecture, EDC stack, data plane, DSaaS, management API, application development, trusted data sharing]
image: /img/guides/ds-integration/ds-int-cover.jpeg
---

Your organization has decided to join a dataspace. The business case is clear, the contracts are signed, and now it's your job to make it work. As an enterprise architect or developer, you're looking at specifications you are not familiar with [Datespace Protocol](https://eclipse-dataspace-protocol-base.github.io/DataspaceProtocol/2025-1-err1/) (DSP),[ Decentralized Claims Protocol](https://eclipse-dataspace-dcp.github.io/decentralized-claims-protocol/v1.0.1/) (DCP), [Data Plane Signaling](https://github.com/eclipse-dataplane-signaling/dataplane-signaling) (DPS) and wondering how to integrate these new concepts into your existing IT infrastructure.

With Dataspace-as-a-Service (DSaaS), it will take takes days, instead weeks. This guide shows you exactly how to integrate dataspace capabilities into your existing IT infrastructure, taking you from first principles through to production-ready applications.

<!-- truncate -->

## Who This Guide Is For

This guide is written primarily for enterprise architects who need to understand how the [EDC stack](https://eclipse-edc.github.io/documentation/for-adopters/) integrates with existing IT systems, and for enterprise developers who will build the integrations and applications. Dataspace project developers building custom solutions will also find this material valuable.

By the end of this guide, you will understand how the EDC stack works from a user's perspective, how to onboard your organization and connect your data services, how to deploy and customize Data Planes for your specific infrastructure needs, and how to build applications that leverage trusted data sharing.

---

## Part 1: Understanding the EDC Stack

Before integrating anything, you need a mental model of what you're working with. The EDC stack its a well-structured architecture designed specifically for trusted data sharing between organizations as part of the implementation of a modern the Zero Trust Security Architecture like [NIST SP 1800-35 Implementing a Zero Trust Architecture](https://www.nccoe.nist.gov/projects/implementing-zero-trust-architecture#project-promo) describes.

![The Trusted Data Sharing Stack from Developer's Perspective](/img/guides/ds-integration/ds-int-1.jpeg)

### The Three Core Components

The stack consists of three main components, each serving a distinct purpose in the data sharing process.

The **Identity Hub** functions as the trust store for your organization. Using the Decentralized Claims Protocol (DCP), it manages your organization's decentralized identifier ([W3C DID](https://www.w3.org/TR/did-1.1/)), stores the verifiable credentials you've received from trusted issuers, and creates presentations when you need to prove your attributes to other participants. When another organization asks "who are you?", the Identity Hub provides the cryptographic proof of a Self-Sovereign Identity (SSI) that underpins all trust in the dataspace.

The **Control Plane** is where trust decisions happen. Operating via the Dataspace Protocol (DSP), it publishes your data offerings in a catalog, negotiates contracts with potential consumers, enforces the [W3C ODRL](https://www.w3.org/TR/odrl-model/) policies you've defined, and manages the lifecycle of data transfers. Think of it as answering the question "what do you offer, and can we agree on terms?" Every access decision flows through the Control Plane's policy engine.

The **Data Plane** handles the actual movement of data. Coordinated through Data Plane Signaling (DPS), it executes transfers via HTTP, S3, or custom protocols. Crucially, the Data Plane is trust-agnostic—it simply executes what the Control Plane has already authorized. This separation is intentional and enables flexible deployment patterns. You can run Data Planes in the cloud, at the edge, or on-premise without compromising the trust model.

### The Trust Framework

Above the stack sits the Trust Framework, which represents the governance layer of your dataspace. This framework defines which organizations can issue credentials (such as membership certificates or compliance attestations), which issuers your organization chooses to trust, and the policies that all participants must follow.

[Digital Credentials](https://www.w3.org/TR/digital-credentials/) flow down from trusted issuers into your Identity Hub. When the Control Plane needs to make an access decision, it queries the Identity Hub for relevant credentials and evaluates them against your policies. This creates a complete chain of trust from governance rules through to data access.

### Your Entry Point: The Management API

As a developer, you interact with the stack primarily through the [EDC Management API](https://github.com/eclipse-tractusx/tractusx-edc/tree/main/docs/usage/management-api-walkthrough). This REST API abstracts away the complexity of the underlying protocols, giving you straightforward endpoints for common operations.

```
/v3/assets              → Register data you want to share
/v3/policydefinitions   → Define access rules
/v3/contractdefinitions → Link assets with policies
/v3/transferprocesses   → Initiate data transfers
```

You don't need to understand the internal details of DSP, DCP, or DPS to use the stack effectively. The Management API handles protocol negotiations, credential exchanges, and transfer coordination behind the scenes. Your code simply calls REST endpoints and handles the responses.

---

## Part 2: Onboarding Your Organization

With an understanding of the components in place, you can now connect your organization to the dataspace. The key insight here is that dataspace concepts map naturally to structures you already have in your IT environment.

![From Organisation to Dataspace: Connecting Users, Services & Assets](/img/guides/ds-integration/ds-int-2.jpeg)

### Mapping Your Existing Systems

Your company becomes a participant context, identified by a DID that serves as your unique identity in the dataspace. Your users and their roles map to API tokens with specific scopes that control what operations they can perform through the Management API. Your existing data services—whether REST APIs, databases, or file storage—become assets with associated data addresses that tell the Data Plane where to find the actual data. Finally, your internal access control rules translate into policy definitions that the Control Plane evaluates automatically.

Understanding these mappings is essential because it means you don't need to redesign your IT architecture to join a dataspace. Your existing systems continue to operate exactly as they do today; the dataspace stack provides a trust layer on top.

### Authentication with OAuth2

DSaaS uses standard OAuth2 authentication, which means your applications can use familiar patterns and libraries. Authentication happens through the `client_credentials` flow, where your application requests a token by providing its credentials and the scopes it needs:

```bash
curl -X POST https://idp.dsaas.example/oauth/token \
  -d "grant_type=client_credentials" \
  -d "client_id=your-app" \
  -d "client_secret=your-secret" \
  -d "scope=management-api:read management-api:write"
```

The token you receive grants access based on the role assigned to your application and the scopes you requested. Most business applications use the `participant` role, which provides access only to your own resources. This role works with scopes like `management-api:read` and `management-api:write` for asset and policy management, `identity-api:read` and `identity-api:write` for credential management, and `data-plane:read` and `data-plane:write` for transfer operations.

The `provisioner` role exists for onboarding systems that need to create new participant contexts, while the `admin` role provides full access and should be reserved for emergency or initial setup scenarios only.

### Registering Your Data Services as Assets

The most important integration task is registering your existing data services as assets. It's crucial to understand that an asset is not the data itself—it's a pointer to where the data lives. Your actual data remains in your systems, and the Data Plane acts as a proxy that enforces access control.

The registration process involves three steps that work together to make your data discoverable and accessible under the terms you define.

First, you create the asset itself, providing metadata and the data address that tells the Data Plane where to find the actual data:

```json
POST /v3/assets
{
  "@id": "product-catalog-api",
  "properties": {
    "name": "Product Catalog",
    "description": "Real-time product inventory and pricing",
    "contenttype": "application/json"
  },
  "dataAddress": {
    "type": "HttpData",
    "baseUrl": "https://api.yourcompany.com/catalog"
  }
}
```

In this example, the `dataAddress` points to your existing catalog API. When authorized consumers access this asset, the Data Plane will proxy their requests to this URL. Your API doesn't need to change at all—it continues serving requests exactly as before, with the Data Plane handling authentication and authorization on your behalf.

Second, you define access policies that control who can see your asset in the catalog. Policies are expressed as constraints that the Control Plane evaluates against the credentials presented by requesting participants:

```json
POST /v3/policydefinitions
{
  "@id": "members-only",
  "policy": {
    "permission": [{
      "action": "use",
      "constraint": [{
        "leftOperand": "MembershipCredential",
        "operator": "eq",
        "rightOperand": "active"
      }]
    }]
  }
}
```

This policy states that only participants holding a valid `MembershipCredential` with the value "active" can access the asset. When someone queries your catalog, the Control Plane will request their credentials via DCP and evaluate them against this policy. If the credentials don't satisfy the constraint, the asset simply won't appear in their catalog view.

Third, you create a contract definition that links your asset with your policies:

```json
POST /v3/contractdefinitions
{
  "@id": "catalog-access",
  "accessPolicyId": "members-only",
  "contractPolicyId": "standard-terms",
  "assetsSelector": {
    "operandLeft": "id",
    "operator": "=",
    "operandRight": "product-catalog-api"
  }
}
```

The contract definition specifies which access policy controls catalog visibility and which contract policy defines the terms that must be agreed upon before data can flow. The asset selector determines which assets this contract definition applies to—you can use queries to apply the same policies to multiple assets.

### Important Concepts

Several concepts are essential to keep in mind as you work with the dataspace.

One participant context equals one organization identity. Your entire organization shares a single DID, regardless of how many users, applications, or systems interact with the dataspace. Individual users don't appear in dataspace protocols—only your organization's identity does. This simplifies the trust model and aligns with how business-to-business data sharing actually works.

An asset is not the same as data. Assets are descriptors that point to where data lives, not containers for the data itself. Your data stays in your systems, under your control. The Data Plane proxies access when the Control Plane has authorized it, but nothing moves until authorization is granted.

Policies are evaluated automatically. When another participant requests your catalog or initiates a contract negotiation, the Control Plane handles everything. It retrieves their credentials, evaluates them against your policies, and either grants or denies access without any manual intervention on your part. This automation is what makes dataspaces practical at scale.

---

## Part 3: The Data Plane Ecosystem

The Data Plane is where your integration choices have the most significant impact on your architecture. Unlike the Control Plane and Identity Hub, which are typically managed by your DSaaS provider, the Data Plane is where you can customize the stack to fit your specific infrastructure requirements.

![The Data Plane Ecosystem: Transfer Types, Deployment Options & Custom Development](/img/guides/ds-integration/ds-int-3.jpeg)

### The Relationship Between Control Plane and Data Plane

The Control Plane and Data Plane communicate through a protocol called Data Plane Signaling (DPS). This separation of concerns is fundamental to the architecture. The Control Plane handles all business logic—contracts, policies, and agreements—while the Data Plane focuses exclusively on moving data efficiently.

When a transfer is initiated, the Data Plane maintains a state machine that tracks its progress. Transfers move through states from STARTING to STARTED, and eventually to either COMPLETED (for finite transfers like file downloads) or TERMINATED (when explicitly stopped). The critical insight is that all trust decisions happen in the Control Plane before the transfer ever reaches the Data Plane. The Data Plane simply executes what has already been authorized.

### Transfer Types

The dataspace supports three fundamental patterns for moving data, each suited to different use cases.

In a **pull transfer**, the consumer initiates the data request. After authorization, the provider's Data Plane exposes an endpoint, and the consumer's application (often through its own Data Plane) fetches data from that endpoint. This pattern works well for on-demand access, API-style interactions, and scenarios where you want consumers to retrieve data when they need it rather than pushing it to them proactively. Pull transfers are also the natural choice for non-finite transfers—ongoing access that doesn't have a defined end point.

In a **push transfer**, the provider initiates the data movement, sending data to an endpoint that the consumer has specified. This pattern suits file transfers, batch data delivery, and event-driven scenarios where the provider knows when new data is available and should be delivered. Push transfers put the provider in control of timing, which can be important for workflows where data must be delivered in a specific sequence or at specific times.

**Stream transfers** handle continuous, non-finite data flows. Sensor data, real-time monitoring feeds, and industrial telemetry all fit this pattern. Unlike finite transfers that complete when all data has been sent, stream transfers remain active indefinitely, with data flowing continuously until one party terminates the connection. This pattern is essential for IoT applications, real-time analytics, and industrial automation scenarios.

### Deployment Options

You have four main patterns for deploying Data Planes, each with different trade-offs.

The **embedded** pattern runs the Control Plane and Data Plane in the same process. This is the simplest setup and works well for development and testing. However, it limits your ability to scale the components independently and isn't recommended for production workloads with significant data volumes.

The **external** pattern deploys the Control Plane and Data Plane as separate services. This provides independent scaling—you can run more Data Plane instances to handle high throughput while keeping the Control Plane lightweight. The trade-off is additional infrastructure to manage, but for production deployments, this separation is usually worth the operational overhead.

The **edge** pattern places the Control Plane in the cloud while deploying Data Planes at the edge, close to your data sources. This is particularly valuable in manufacturing scenarios where PLCs and sensors generate data on the factory floor. By keeping Data Planes local, you reduce latency, keep data close to where it's generated, and optimize bandwidth usage. The Control Plane handles trust decisions centrally, but actual data doesn't need to traverse the network to the cloud unless explicitly shared with an external consumer. This pattern is ideal when bandwidth is limited or expensive, when data locality requirements exist, or when low latency is critical.

The **specialized** pattern involves purpose-built Data Planes for specific protocols. An OPC UA Data Plane can communicate directly with industrial equipment and PLCs. A Kafka Data Plane can participate in event streaming architectures. An S3 Data Plane can read from and write to cloud object storage efficiently. These specialized implementations optimize for their target protocol while still integrating with the standard Control Plane through DPS.

### Building a Custom Data Plane

If the standard Data Plane doesn't meet your requirements, you have two paths forward.

The first option is to extend the Data Plane Framework (DPF). The framework provides all the core infrastructure you need—the DPS Signaling API, the data flow state machine, token validation, and the registration protocol. You extend it by implementing custom `DataSource` classes that read data from your specific systems, custom `DataSink` classes that write data to your target destinations, and optionally custom wire protocols for how data moves over the network.

The extension architecture flows from your DataSource extension through the DPF transfer engine core to your DataSink extension. For example, you might create a `DatabaseDataSource` that reads from your SQL or NoSQL databases, a `KafkaDataSource` that subscribes to Kafka topics, or an `OpcUaDataSink` that writes to industrial equipment. The DPF handles all the protocol complexity while your extensions focus on the specifics of your data sources and sinks.

The second option is to build a Data Plane from scratch. This gives you complete control but requires implementing several interfaces. You must implement the registration protocol so your Data Plane can advertise its capabilities to the Control Plane at startup. You must implement the DPS Signaling API to handle signals like `/dataflows/start`, `/dataflows/suspend`, `/dataflows/complete`, and `/dataflows/terminate`. And you must implement your wire protocol—the actual mechanism for moving data, whether that's HTTP, gRPC, WebSocket, OPC UA, or something entirely custom.

Regardless of which path you choose, your Data Plane registers with the Control Plane at startup. The registration message advertises what transfer types your Data Plane supports, what data source types it can read from, and any labels that help the Control Plane select the right Data Plane for a given transfer:

```json
{
  "dataplaneId": "factory-munich-dp",
  "endpoint": "https://dp.factory-munich.internal/signaling",
  "transferTypes": ["HttpData-PULL", "OpcUa-PUSH"],
  "labels": ["europe", "manufacturing"]
}
```

The Control Plane uses this registration information to generate appropriate catalog distributions that tell consumers how they can access data, and to select the correct Data Plane when a transfer is initiated.

---

## Part 4: Building Applications on the Dataspace

With the infrastructure understood and your organization onboarded, you can now build applications that leverage trusted data sharing. The EDC stack exposes clear interfaces that your applications consume, whether you're building a data consumer that discovers and accesses external datasets or a data provider that shares your organization's resources with partners.

![Interface of Stack to Application: Building on the Dataspace](/img/guides/ds-integration/ds-int-4.jpeg)

### Integration Patterns

Three main patterns exist for integrating your applications with the EDC stack.

**Direct API integration** has your application calling the Management API directly via REST. This approach gives you full control over every interaction and is well-suited for custom workflows or specialized applications. You make HTTP requests to the Management API endpoints and handle the JSON responses directly in your code.

**SDK-based integration** uses an EDC client library to provide type-safe, higher-level operations. Rather than constructing HTTP requests manually, you call methods on SDK objects that handle the details for you. This accelerates development and reduces the chance of errors, making it a good choice when you want to move quickly and can work within the patterns the SDK provides.

**Event-driven integration** subscribes to EDC events and reacts asynchronously. The EDC stack emits events like `ContractNegotiationFinalized`, `TransferProcessStarted`, and `TransferProcessCompleted` that your application can consume. This pattern works well for reactive workflows, asynchronous processing, and complex multi-step flows where you need to coordinate multiple operations.

### Building a Data Consumer Application

When your application needs to discover and access data from other participants, it follows a four-step flow.

First, your application discovers available data by requesting a catalog from a provider. You specify the provider's DSP endpoint, and your Control Plane queries them on your behalf:

```bash
GET /v3/catalog/request
{
  "counterPartyAddress": "https://provider.dataspace.example/api/dsp",
  "protocol": "dataspace-protocol-http"
}
```

The provider's Control Plane evaluates your credentials against their access policies and returns a catalog containing only the datasets you're authorized to see. Different consumers may see different catalog contents based on their credentials.

Second, your application requests access by initiating a contract negotiation. You reference the offer from the catalog and ask your Control Plane to negotiate an agreement:

```bash
POST /v3/contractnegotiations
{
  "counterPartyAddress": "https://provider.dataspace.example/api/dsp",
  "protocol": "dataspace-protocol-http",
  "policy": { "@id": "offer-123", ... }
}
```

This call returns immediately—contract negotiations are asynchronous by design. Do not block your application waiting for the negotiation to complete. Instead, subscribe to events or poll for status. When the negotiation succeeds, you'll receive a `ContractNegotiationFinalized` event containing the agreement ID.

Third, with an agreement in hand, your application initiates a transfer. You specify the agreement, the asset, and the transfer type you want:

```bash
POST /v3/transferprocesses
{
  "connectorAddress": "https://provider.dataspace.example/api/dsp",
  "contractId": "agreement-456",
  "assetId": "product-catalog-api",
  "transferType": "HttpData-PULL"
}
```

For a pull transfer, the response includes a `DataAddress` containing an endpoint URL and an access token. This is your ticket to actually retrieve the data.

Fourth, with the DataAddress in hand, your application accesses the data directly:

```bash
curl https://provider-dataplane.example/public/data \
  -H "Authorization: Bearer <token-from-dataaddress>"
```

An important point to understand is that your application communicates with your own connector, not with the provider's systems directly. Your connector handles all the protocol complexity—the DSP negotiations, the DCP credential exchanges, the DPS signaling. From your application's perspective, you're just making REST calls to local endpoints.

### Building a Data Provider Application

When your application provides data to other participants, the flow is simpler because much of it happens automatically based on your configuration.

You begin by registering your data services as assets, defining policies, and creating contract definitions as described in Part 2. Once this configuration is in place, the Control Plane handles incoming catalog requests and contract negotiations automatically. When a consumer's credentials satisfy your policies, agreements are created without any intervention from your application.

If you need custom logic—perhaps a human approval step for certain types of access, or integration with an external authorization system—you can subscribe to negotiation events. When a `NegotiationRequested` event arrives, your application can perform whatever custom logic is needed and then signal whether to proceed.

For monitoring, you can query the transfer processes endpoint to see the status of all transfers involving your assets:

```bash
GET /v3/transferprocesses
```

This returns a list of transfers, their current states, and metadata about the assets and consumers involved.

For audit and billing purposes, you can subscribe to transfer events. A `TransferStarted` event tells you when a consumer began accessing data, while a `TransferCompleted` event tells you when a finite transfer finished. By logging these events, you maintain a complete audit trail of data access that can support compliance requirements and usage-based billing models.

### Architectural Best Practices

When designing your application architecture, layer your system clearly. Your application layer contains your business logic, user authentication, and workflow orchestration—the things that make your application unique. Below that, an EDC integration layer encapsulates all interactions with the Management API and event system. This layer handles catalog operations, negotiation lifecycle, and transfer management. At the bottom sits the EDC stack itself, whether managed by DSaaS or self-hosted.

Several principles should guide your design. Never block your application waiting for a contract negotiation to complete. Negotiations involve back-and-forth communication between Control Planes and can take time, especially if complex policy evaluation is required. Use events or polling to detect when negotiations complete.

Keep trust handling in the EDC stack where it belongs. Don't reimplement credential verification or policy evaluation in your application code. The stack is designed to handle these concerns correctly; duplicating that logic creates maintenance burden and potential security gaps.

Understand that a DataAddress is simply the endpoint your application calls to retrieve data. Once you have a DataAddress with its associated token, you can make standard HTTP calls. There's no special protocol or library required at this stage—it's just HTTP with bearer token authentication.

Finally, understand how non-finite transfers work. When you're accessing an API (as opposed to downloading a file), the transfer doesn't "complete" in the traditional sense. The transfer process remains in the STARTED state indefinitely, with your application making requests against the DataAddress as needed. This continues until you or the provider explicitly terminates the transfer. This is by design—it allows ongoing API access under a single contract agreement.

---

## Putting It All Together

To illustrate how all these concepts work in practice, let's trace through a complete integration scenario.

### Scenario: Sharing Product Data with a Supplier

Imagine you're a manufacturer with a product catalog API running in your infrastructure. One of your suppliers needs access to part specifications—detailed information about the components they provide to you. Both organizations are members of the same industry dataspace and hold appropriate credentials.

Your first step is to register your API as an asset. You create an asset record that points to your internal parts API:

```json
POST /v3/assets
{
  "@id": "part-specifications",
  "properties": { "name": "Part Specifications API" },
  "dataAddress": {
    "type": "HttpData",
    "baseUrl": "https://internal-api.yourcompany.com/parts"
  }
}
```

Next, you create a policy that restricts access to verified suppliers. This policy requires that any consumer hold a credential proving their supplier status:

```json
POST /v3/policydefinitions
{
  "@id": "verified-suppliers",
  "policy": {
    "permission": [{
      "action": "use",
      "constraint": [{
        "leftOperand": "SupplierCredential",
        "operator": "eq",
        "rightOperand": "verified"
      }]
    }]
  }
}
```

Finally, you link the asset and policy with a contract definition:

```json
POST /v3/contractdefinitions
{
  "@id": "parts-for-suppliers",
  "accessPolicyId": "verified-suppliers",
  "contractPolicyId": "read-only-terms",
  "assetsSelector": { "operandLeft": "id", "operator": "=", "operandRight": "part-specifications" }
}
```

With this configuration in place, here's what happens when the supplier wants access. Their application queries your catalog, and your Control Plane checks their credentials via DCP. Because they hold a valid `SupplierCredential`, your parts API appears in their catalog view. They initiate a contract negotiation, and since their credentials satisfy your policy, the agreement is created automatically.

The supplier's application then initiates a transfer, receiving a DataAddress with a token. Their application uses that token to call your Data Plane, which proxies requests to your internal parts API. The supplier gets the specifications they need, and you maintain a complete audit trail of the access.

Throughout this entire process, your internal API never changes. It continues serving requests exactly as it always has. The Data Plane handles token validation and proxies authorized requests. From your API's perspective, the requests look like any other traffic.

---

## Next Steps

You now have a complete picture of dataspace integration. The path forward involves several concrete steps.

Begin by obtaining your credentials. Work with your dataspace authority to acquire the membership credentials and any industry-specific certifications you need. These credentials are what enable other participants to trust you.

Set up your participant context through your DSaaS provider, who will provision your Control Plane, Identity Hub, and a managed Data Plane. This gives you the infrastructure needed to participate in data sharing.

Register your first asset, starting with a simple, low-risk API to learn the flow. This lets you experience the full lifecycle—asset registration, policy definition, contract negotiation, and transfer—before applying it to more sensitive data.

Build a simple consumer application to practice the catalog, negotiate, transfer, and access flow from the other side. Understanding both provider and consumer perspectives makes you more effective at designing integrations.

Evaluate your Data Plane needs by considering whether the managed Data Plane meets your requirements or whether you need edge deployment for manufacturing scenarios or custom implementations for specialized protocols.

Finally, scale your integration by adding more assets, refining your policies based on real-world experience, and building the production applications that unlock value from trusted data exchange.

---

## Summary

The EDC stack provides three components—Identity Hub, Control Plane, and Data Plane—with clear separation of concerns. The Identity Hub stores credentials, the Control Plane makes trust decisions, and the Data Plane moves data. The Management API is your primary integration point.

Onboarding maps naturally to concepts you already have. Your company becomes a participant context. Your data services become assets. Your access rules become policies. Authentication uses standard OAuth2, making integration straightforward.

The Data Plane ecosystem offers flexibility where you need it. You can deploy Data Planes embedded for development, external for production scaling, at the edge for industrial scenarios, or specialized for specific protocols. If standard options don't fit, you can extend the Data Plane Framework or build custom implementations from scratch.

Application development follows clear patterns. Use events rather than blocking. Layer your architecture to separate business logic from EDC integration. Let the stack handle trust while you focus on the business value your application provides.

The dataspace isn't a replacement for your existing infrastructure—it's a trust layer that enables secure data sharing without centralizing control. With DSaaS managing the complexity, you can focus on what matters: building applications that unlock the value of trusted data exchange.
