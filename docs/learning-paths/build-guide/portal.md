---
sidebar_label: Portal and Observability
sidebar_position: 4
title: "Chapter 3: Portal and Observability"
---

# Chapter 3: Portal and Observability

Your customers are not API-first developers. They need a web interface. And you need to know when something breaks.

```
┌──────────────────────────────────────────────────┐
│  Your Platform (CSP)                             │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  User Portal (CSP)                         │  │
│  │  Calls Management API + Identity API       │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  Monitoring & Observability (CSP)          │  │
│  │  Metrics · Logs · Alerts · Health checks   │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  CFM + EDC-V + Data Plane                  │  │
│  │  (same as baseline)                        │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  Infrastructure (CSP)                      │  │
│  │  (same as baseline)                        │  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

## What You Build at This Level

| Component | What it takes |
|-----------|--------------|
| **User Portal** | A web application for your customers. Catalog browsing, contract management, credential viewing, transfer status. The portal calls the Management API and Identity API on behalf of the logged-in user. Authentication via your IDP. |
| **Monitoring & Observability** | Health checks against component endpoints, metrics collection (Prometheus or equivalent), log aggregation, alerting. Standard cloud-native observability — nothing dataspace-specific. |

The Observability API on each EDC component exposes health and readiness endpoints — you just need to scrape and alert on them.

---

**Next:** [Customer Applications](./customer-apps.md)
