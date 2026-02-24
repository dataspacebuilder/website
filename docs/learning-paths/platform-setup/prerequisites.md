---
sidebar_label: Prerequisites
sidebar_position: 2
title: Infrastructure Prerequisites
---

# Chapter 1: Infrastructure Prerequisites

You need the following infrastructure in place before deploying the dataspace components:

| Component | Purpose | Requirements |
|-----------|---------|--------------|
| Kubernetes cluster | Runs all platform services | Standard k8s, any distribution |
| PostgreSQL | Persistent state for Control Plane, Identity Hub, CFM | Separate databases per component |
| OAuth2 / OIDC provider | Authentication for all APIs | Must support `client_credentials` grant, JWT access tokens, custom claims, JWKS endpoint |
| Secret store | Stores keys, client secrets, credentials | KV-style API (e.g., Vault, cloud-native alternatives) |
| NATS with JetStream | Messaging between CFM subsystems | Persistence and guaranteed delivery required |

Your platform has three layers: the EDC services your customers interact with, the
CFM that automates provisioning, and the agents that execute individual setup steps.
The next chapters walk through each layer.

---

**Next:** [EDC Services](./edc-services.md)
