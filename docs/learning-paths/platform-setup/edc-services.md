---
sidebar_label: EDC Services
sidebar_position: 3
title: EDC Services
---

# Chapter 2: EDC Services

These are the core services your customers use. You deploy them in virtual
(multi-tenant) mode — a single deployment serves all participants through isolated
contexts.

| Component | What it does |
|-----------|-------------|
| **Control Plane** | Manages assets, policies, contracts, catalog, and DSP protocol endpoints. Each participant gets an isolated context. |
| **Identity Hub** | Manages DIDs, verifiable credentials, verifiable presentations, and token exchange (STS). Each participant gets an isolated context. |

Both services share the same IDP for authentication and use the secret store for
key material. Participant isolation is configuration-based — not process-based. No
new containers are spawned per customer.

---

**Next:** [Connector Fabric Manager](./connector-fabric-manager.md)
