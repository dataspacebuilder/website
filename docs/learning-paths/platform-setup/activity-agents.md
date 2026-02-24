---
sidebar_label: Activity Agents
sidebar_position: 5
title: Activity Agents
---

# Chapter 4: Activity Agents

Agents are the workers the Provision Manager dispatches to. Each agent handles one
provisioning concern and runs as a stateless NATS consumer.

| Agent | What it does |
|-------|-------------|
| **IDP Agent** | Creates OAuth2 clients for the participant, registers claim mappings |
| **EDC Agent** | Creates participant contexts in Control Plane and Identity Hub |
| **Registration Agent** | Registers the participant as a holder at the credential issuer |
| **Onboarding Agent** | Requests verifiable credentials and stores them in the Identity Hub |

Agents execute in dependency order — for example, the EDC Agent needs the IDP Agent
to finish first so OAuth2 clients exist before participant contexts are created.

---

**Next:** [Identity Provider Setup](./identity-provider-setup.md)
