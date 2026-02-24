---
sidebar_label: Deploying a Data Plane
sidebar_position: 7
title: Deploying a Data Plane
---

# Chapter 6: Deploying a Data Plane

## Registering a Data Plane

Once your customer's data plane is running, register it with the Control Plane so
transfers can be routed to it:

```json
POST /dataplanes
{
  "url": "https://customer-dp.example.com/api/control/v1/dataflows",
  "allowedSourceTypes": ["HttpData"],
  "allowedTransferTypes": ["HttpData-PULL"]
}
```

This tells the Control Plane where to send signaling messages for this participant.

## Building a Data Plane

A data plane needs to do two things:

1. **Handle signaling** — receive messages from the Control Plane when transfers
   start, suspend, or terminate.
2. **Serve data** — transfer data to or from the consumer using the wire
   protocol defined for the use case (e.g., HTTP, streaming, file transfer).

You do not need to implement the signaling protocol from scratch. SDKs are available
that handle protocol boilerplate, state management, and token validation:

| Language | Repository |
|----------|-----------|
| Go | [dataplane-sdk-go](https://github.com/eclipse-dataplane-core/dataplane-sdk-go) |
| Java | [dataplane-sdk-java](https://github.com/eclipse-dataplane-core/dataplane-sdk-java) |
| Rust | [dataplane-sdk-rust](https://github.com/eclipse-dataplane-core/dataplane-sdk-rust) |
| .NET | [dataplane-sdk-net](https://github.com/eclipse-dataplane-core/dataplane-sdk-net) |

With these SDKs, you implement your data serving logic — the SDK handles everything
else. The data plane can run anywhere: on-premises, in a VM, in the cloud, or as
a managed service. It just needs to be reachable from the Control Plane (for
signaling) and from consumers (for data fetching).

For a deeper technical reference on the signaling protocol, see the
[Data Plane Signaling specification](https://github.com/eclipse-dataplane-core/dataplane-signaling).

## Summary

Your customer's CSP handles infrastructure, provisioning, and identity. You work
with the endpoints they provide to create value for the customer — publishing their
data into dataspaces, connecting them to other participants, and deploying data
planes where needed. The management API and Dataspace Protocols are your primary
tools. For implementation details, the EDC documentation and samples are your
reference.
