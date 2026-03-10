---
sidebar_label: Customer Handoff
sidebar_position: 9
title: Customer Handoff
---

# Chapter 8: Customer Handoff

After provisioning, your customer (or their system integrator) needs the following
to operate:

| What | Example | Purpose |
|------|---------|---------|
| Participant Context ID | `acme-ctx-abc123` | Identifies the participant across all APIs |
| OAuth2 client credentials | `client_id` + `client_secret` | Authenticate against your IDP |
| Token endpoint | `https://auth.your-platform.io/oauth2/token` | Obtain access tokens |
| Control Plane management API | `https://cp.your-platform.io/api/mgmt/v4alpha/participants/{ctxId}/` | Manage assets, policies, contracts, catalog, negotiations, transfers |
| Identity Hub API | `https://ih.your-platform.io/api/identity/participants/{ctxId}/` | Manage credentials, DIDs |
| DSP protocol endpoint | `https://cp.your-platform.io/api/dsp/{ctxId}/2025-1` | Counter-party address for catalog requests and negotiations |
| DID | `did:web:ih.your-platform.io:acme` | The participant's decentralized identifier |

The customer does **not** need access to CFM APIs, NATS, your secret store, or any
infrastructure internals.

The customer's data plane is not part of your core platform. Once a data plane is running,
the customer or their system integrator registers it with the Control Plane via the
management API. For details on data plane registration and deployment, see the
[System Integration](../system-integration/) learning path.

## Try It Locally

To see the full stack running locally — including EDC, CFM, agents, and provisioning —
check out the [JAD sandbox](https://github.com/Metaform/jad). It provides a complete
dataspace environment on a local kind cluster, with pre-configured infrastructure, bootstrap jobs, and end-to-end provisioning scripts.

## Summary

Your EDCaaS platform provides the infrastructure and automation so that customers
can participate in dataspaces without running their own control plane or identity
services. You deploy EDC, CFM, and the agents. You provision participants through
the Tenant Manager API and hand customers their endpoints and credentials. From
there, customers and their system integrators take over — publishing data,
negotiating contracts, deploying data planes, and connecting to other participants
through the management API and the Dataspace Protocols.
