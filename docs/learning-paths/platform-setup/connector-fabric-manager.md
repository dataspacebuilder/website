---
sidebar_label: Connector Fabric Manager
sidebar_position: 4
title: Connector Fabric Manager
---

# Chapter 3: Connector Fabric Manager

The CFM automates participant provisioning. You interact with its APIs to onboard
customers — it handles the rest.

| Component | What it does |
|-----------|-------------|
| **Tenant Manager** | Manages tenants, participant profiles, cells, and dataspace profiles. Exposes the provisioning REST API. |
| **Provision Manager** | Executes orchestration workflows. Dispatches tasks to agents via NATS. |

Both need a PostgreSQL database and a NATS connection. When you create a participant
profile through the Tenant Manager API, it triggers an orchestration that the
Provision Manager executes by dispatching work to agents.

For full architecture details, see the
[CFM System Architecture](https://github.com/Metaform/connector-fabric-manager/blob/main/docs/developer/architecture/system.architecture.md).

---

**Next:** [Activity Agents](./activity-agents.md)
