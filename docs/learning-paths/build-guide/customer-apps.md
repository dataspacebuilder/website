---
sidebar_label: Customer Applications
sidebar_position: 5
title: "Chapter 4: Customer Applications"
---

# Chapter 4: Customer Applications

Some customers don't just need a portal — they need an application deployed on their behalf that automates data sharing workflows. The application uses the Management APIs and integrates via DPS — which makes it the data plane. No separate data plane needed.

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
│  │  Customer Application (CSP deploys)        │  │
│  │  Business logic + Management API + DPS     │  │
│  │  ← this IS the data plane                  │  │
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
- Serve data from the customer's backend systems to other dataspace participants

The application uses the **Management API** to manage assets, policies, contracts, and transfers. It integrates with the Control Plane via **Data Plane Signaling** — registering as a data plane, receiving transfer signals, and serving or consuming data directly. The Data Plane SDK handles signaling and token validation; the application handles the business logic and the actual data.

This is the key point: **the application is the data plane.** By integrating via DPS, it takes on that role. There is no separate data plane running alongside it. The application receives start/suspend/terminate signals from the Control Plane, serves data to consumers (or fetches data from providers), and reports status back — all through the SDK. The business logic and the data transfer are one thing, not two.

A real-world example is the **CCM (Company Certificate Management)** app in Catena-X. CCM manages company certificates and compliance documents. It uses the Management API to publish and negotiate, and integrates via DPS to serve and consume the actual data. CCM is the data plane for its use case. A CSP would deploy CCM on behalf of customers participating in that use case. The same pattern applies to any domain-specific application built on top of the dataspace infrastructure.

## Multi-Tenancy and Authentication

A customer application like CCM doesn't serve a single customer — it serves many. The application itself is multi-tenant, deployed once by the CSP and shared across customers participating in the same use case.

Authentication works through the CSP's existing IDP. The application authenticates each tenant against the same identity provider that the portal and the Management APIs already use. The IDP issues tokens with the `participant_context_id` claim that scopes every API call to the correct participant:

```
┌──────────────┐     ┌─────────┐     ┌──────────────────┐
│  Customer    │────►│   IDP   │────►│  JWT with         │
│  Application │     │  (CSP)  │     │  participant_     │
│  (per tenant)│     │         │     │  context_id +     │
│              │     │         │     │  role + scope     │
└──────────────┘     └─────────┘     └────────┬─────────┘
                                              │
                          ┌───────────────────┼──────────────┐
                          ▼                   ▼              │
                   Management API      Identity API          │
                   (scoped to tenant)  (scoped to tenant)    │
                                                             │
                   The application itself handles DPS        │
                   (it IS the data plane for this tenant)    │
```

The application requests a token for a specific participant context, then calls the Management API and Identity API on behalf of that tenant. Every call is scoped — the application can only see and manage resources belonging to that participant. No separate auth infrastructure needed per application. The same IDP, the same token format, the same role model (`participant` role with `management-api:read`, `management-api:write` scopes) that the portal uses.

This means the CSP deploys one instance of the application, configures tenant mappings in the IDP, and the application operates across all its customers using the same auth chain that every other component on the platform already uses.

## What Eclipse Gives You

- The Management API surface is unchanged — the application calls the same APIs as the portal or a human with curl.
- The Data Plane SDKs handle DPS integration — the application becomes the data plane by using the SDK.
- CFM provisions the participant context the application operates under.
- The IDP and token model are shared across the entire platform — no separate auth for applications.

## What You Build

The application itself — its business logic, its tenant management, its integration with the customer's backend systems, and its deployment lifecycle. The dataspace integration layer (APIs + DPS + auth) is provided by the platform. The application replaces the standalone data plane from the baseline — it does both jobs.

---

**Next:** [Multiple Data Planes and Credential Issuance](./full-build-out.md)
