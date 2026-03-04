---
sidebar_label: Customer Applications
sidebar_position: 5
title: "Chapter 4: Customer Applications"
---

# Chapter 4: Customer Applications

Some customers don't just need a portal — they need an application deployed on their behalf that automates data sharing workflows. This application uses the Management APIs and integrates with the data plane via DPS.

```
┌──────────────────────────────────────────────────┐
│  Your Platform (CSP)                             │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  Portal + Monitoring                       │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  CFM + EDC-V (multi-tenant)                │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  Data Plane (CSP writes, using SDK)        │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  Customer Application (CSP deploys)        │  │
│  │  Uses Management API · Integrates via DPS  │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  Infrastructure (CSP)                      │  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

## What This Looks Like

A customer application is a service you deploy for a specific customer (or class of customers) that acts on their behalf. It might:

- Automatically publish assets when new files arrive in a storage bucket
- Monitor incoming contract negotiations and auto-approve based on business rules
- Pull data from negotiated contracts and feed it into the customer's systems
- Serve data from the customer's backend systems as a data plane, integrated via DPS

The application uses the **Management API** to manage assets, policies, contracts, and transfers. If it also serves or consumes data directly, it integrates with the Control Plane via **Data Plane Signaling** — registering as a data plane and handling transfer signals through the SDK.

This is where the Data Plane SDK pays off. The same DPS integration pattern used for the baseline data plane applies here — the SDK handles signaling and token validation, the application handles the business logic.

A real-world example is the **CCM (Company Certificate Management)** app in Catena-X. CCM is a use case application that manages company certificates and compliance documents — it uses the Management API to publish and negotiate, and integrates via DPS to serve and consume data. A CSP would deploy CCM on behalf of customers participating in that use case. The same pattern applies to any domain-specific application built on top of the dataspace infrastructure.

## What Eclipse Gives You

- The Management API surface is unchanged — the application calls the same APIs as the portal or a human with curl.
- The Data Plane SDKs handle DPS integration for the application just as they do for a standalone data plane.
- CFM provisions the participant context the application operates under.

## What You Build

The application itself — its business logic, its integration with the customer's backend systems, and its deployment lifecycle. The dataspace integration layer (APIs + DPS) is provided by Eclipse.

---

**Next:** [Multiple Data Planes and Credential Issuance](./full-build-out.md)
