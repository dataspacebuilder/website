# System Integration - Connecting Customers via EDCaaS

## Who This Is For

You are a solution engineer at a system integrator. Your customer has signed up for
an EDCaaS offering from a cloud service provider. The CSP has provisioned your
customer and handed you a set of endpoints and credentials (see the
[EDCaaS Platform Setup](01-edcaas-platform-setup.md) for what that process looks like).

Your job is to help the customer participate in a dataspace - publish data, consume
data from others, and if needed, deploy a data plane. You work with the management
APIs and the Dataspace Protocol. You do not need access to the platform infrastructure.

## What You Get from the CSP

After the CSP provisions your customer, you receive:

| What | Purpose |
|------|---------|
| Participant Context ID | Identifies the customer across all APIs |
| OAuth2 client credentials | `client_id` + `client_secret` to authenticate |
| Token endpoint | Obtain access tokens (`client_credentials` grant) |
| Management API base URL | Manage assets, policies, contracts, catalog, negotiations, transfers |
| Identity Hub API URL | Manage credentials and DIDs |
| DSP protocol endpoint | The address other participants use to reach your customer |
| DID | Your customer's decentralized identifier |

All API calls require a Bearer token obtained from the token endpoint. Tokens are
short-lived - refresh as needed.

## What You Can Do for the Customer

As a system integrator, you bridge the gap between the managed EDCaaS platform and
the customer's business needs. This typically involves three areas:

### Publishing Data (Provider Side)

To make your customer's data available in a dataspace, you:

1. **Create an asset** - describes what the customer offers (e.g., product passports,
   sensor data, API access). The asset includes a data address pointing to where
   the data is actually served.
2. **Define a policy** - controls who can access the asset, using ODRL. Policies
   are typically aligned with the dataspace's governance rules (e.g., requiring
   specific credentials such as a membership credential, a compliance
   certification, or a role-based credential).
3. **Create a contract definition** - binds an asset to a policy, making it
   discoverable in the catalog.

Once published, any participant in the dataspace with valid credentials can discover
the offering and negotiate access.

### Consuming Data (Consumer Side)

To access data from another participant, the flow follows the Dataspace Protocol:

1. **Query the catalog** - ask the provider's Control Plane (via the DSP endpoint)
   what data is available and under what terms.
2. **Negotiate a contract** - agree to the provider's terms. The negotiation is
   asynchronous and results in a contract agreement.
3. **Initiate a transfer** - request access to the data. In the simplest form,
   you get back an endpoint and a token to fetch it. Other transfer patterns
   like push and streaming are also supported.

### Deploying a Data Plane

If your customer needs to serve data (not just consume), they need a data plane.
The data plane is the component that actually handles data transfer - it runs
outside the EDCaaS platform, under your customer's control (or as a separate
CSP service).

This is covered in detail in the [Data Plane](#the-data-plane) section below.

## Working with the Management API

The management API is your primary interface for all provider and consumer operations.
All endpoints live under:

```
{management-api-base}/participants/{participantContextId}/
```

For the full API reference, working samples, and detailed walkthroughs, see:

- [EDC Samples](https://github.com/eclipse-edc/Samples) - end-to-end examples
  covering assets, policies, negotiations, and transfers
- [EDC Documentation](https://eclipse-edc.github.io/documentation/) - complete
  API reference and concept explanations

Key things to know:

- All request and response bodies use **JSON-LD**. Every request must include
  `"@context": ["https://w3id.org/edc/connector/management/v2"]`.
- Policies use the **ODRL** vocabulary.
- Negotiations and transfers are **asynchronous** - you create them and poll for
  state changes.
- Contract negotiation policies must **exactly match** the offer from the catalog.

## Working with the Identity Hub

The Identity Hub manages your customer's decentralized identity - their DID,
key pairs, and verifiable credentials. In most cases, credentials are set up
during provisioning and you will not need to interact with the Identity Hub
directly.

However, you may need it when:

- **Checking credential status** - verify that your customer's credentials
  are valid and have not expired or been revoked.
- **Requesting additional credentials** - some dataspaces require multiple
  credentials (e.g., a membership credential plus a domain-specific
  certification). You can request these through the Identity Hub API.
- **Managing key pairs** - rotate keys or inspect the DID document.

The Identity Hub API is available at the URL provided by the CSP. For the
full API reference, see the
[EDC Documentation](https://eclipse-edc.github.io/documentation/).

## The Data Plane

### Why It Exists Separately

The EDC architecture separates the Control Plane (which handles protocol
communication, catalog, contracts, and trust) from the Data Plane (which handles
actual data transfer). The two communicate through the **Data Plane Signaling** protocol. The Control
Plane handles trust, contracts, and protocol negotiation. The Data Plane handles
the actual data transfer using the wire protocol appropriate for the use case -
HTTP, streaming, file transfer, or others.

For the rationale behind this architecture and how it works, see the
[Data Plane Signaling blog post](https://eclipse-edc.github.io/blog/2026/01/19/data-plane-signaling/).

### Registering a Data Plane

Once your customer's data plane is running, register it with the Control Plane so
transfers can be routed to it:

```
POST /dataplanes
{
  "url": "https://customer-dp.example.com/api/control/v1/dataflows",
  "allowedSourceTypes": ["HttpData"],
  "allowedTransferTypes": ["HttpData-PULL"]
}
```

This tells the Control Plane where to send signaling messages for this participant.

### Building a Data Plane

A data plane needs to do two things:

1. **Handle signaling** - receive messages from the Control Plane when transfers
   start, suspend, or terminate.
2. **Serve data** - transfer data to or from the consumer using the wire
   protocol defined for the use case (e.g., HTTP, streaming, file transfer).

You do not need to implement the signaling protocol from scratch. SDKs are available
that handle protocol boilerplate, state management, and token validation:

| Language | Repository |
|----------|-----------|
| Go | [dataplane-sdk-go](https://github.com/eclipse-dataplane-core/dataplane-sdk-go) |
| Java | [dataplane-sdk-java](https://github.com/eclipse-dataplane-core/dataplane-sdk-java) |
| Rust | [dataplane-sdk-rust](https://github.com/eclipse-dataplane-core/dataplane-sdk-rust) |
| .NET | [dataplane-sdk-net](https://github.com/eclipse-dataplane-core/dataplane-sdk-net) |

With these SDKs, you implement your data serving logic - the SDK handles everything
else. The data plane can run anywhere: on-premises, in a VM, in the cloud, or as
a managed service. It just needs to be reachable from the Control Plane (for
signaling) and from consumers (for data fetching).

For a deeper technical reference on the signaling protocol, see the
[Data Plane Signaling specification](https://github.com/eclipse-dataplane-signaling).

## Summary

Your customer's CSP handles infrastructure, provisioning, and identity. You work
with the endpoints they provide to create value for the customer - publishing their
data into dataspaces, connecting them to other participants, and deploying data
planes where needed. The management API and Dataspace Protocols are your primary
tools. For implementation details, the EDC documentation and samples are your
reference.
