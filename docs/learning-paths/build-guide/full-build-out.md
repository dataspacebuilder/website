---
sidebar_label: Full Build-Out
sidebar_position: 6
title: "Chapter 5: Multiple Data Planes and Credential Issuance"
---

# Chapter 5: Multiple Data Planes and Credential Issuance

You now serve multiple dataspaces. Some participants need data planes beyond HTTP — S3, streaming, industrial protocols. Some dataspaces require their own credential issuers.

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
│  Data Planes (anything that integrates via DPS)  │
│  ┌──────────┬──────────┬──────────┬───────────┐  │
│  │ HTTP     │  S3      │ OPC-UA   │ CCM app   │  │
│  │ (SDK)    │  (SDK)   │(community)│(initiative)│  │
│  └──────────┴──────────┴──────────┴───────────┘  │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  Issuer Service (Eclipse EDC)              │  │
│  │  Issues VCs for dataspace onboarding       │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  Infrastructure (CSP)                      │  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

## Multiple Data Planes

Anything that integrates via DPS is a data plane. At this level you run several — a minimal HTTP data plane for simple file sharing, an S3 adapter, a community-provided OPC-UA data plane, and customer applications like CCM that are data planes for their use case.

Some you build yourself using the Eclipse Data Plane SDKs — adding the wire protocol adapter for the specific transport. Others come from the community or from dataspace initiatives. Customer applications that integrate via DPS (as described in [Chapter 4](./customer-apps.md)) are also data planes — they just happen to include business logic alongside the data transfer.

All data planes register with the Control Plane via Data Plane Signaling. The Control Plane selects the right one per transfer based on registered capabilities. No changes to the core platform needed.

## Credential Issuance

If the Dataspace Authority wants you (the CSP) to operate the credential issuance infrastructure, the **Issuer Service** is an Eclipse EDC component. It defines credential schemas, issues VCs to participants, and maintains revocation lists. You deploy and configure it — no need to build your own issuance stack.

The trust framework behind credential issuance varies by dataspace. Some dataspaces define their own; others adopt established frameworks like **iSHARE**, which provides a ready-made trust scheme for authorization, authentication, and identification of organizations. When a dataspace uses iSHARE, credential issuance and verification follow iSHARE's trust model — the CSP integrates with it rather than designing a trust framework from scratch.

## Multi-Dataspace Configuration

When serving multiple dataspaces, the governance decisions become per-dataspace configuration:

| Governance item | What varies per dataspace |
|-----------------|--------------------------|
| Policy definitions | Different ODRL rules per dataspace |
| Credential schemas | Different VC types required |
| Trust lists | Different issuers recognized |
| Onboarding criteria | Different compliance requirements |

CFM supports **dataspace profiles** — per-dataspace settings attached to a participant. This is configuration, not code. Supporting a new dataspace means defining a new profile, not building new components.

## Optional: Federated Catalog

At any level, participants can query each other's catalogs directly over DSP. This works well when participants know each other's identities.

As the dataspace grows, you may want to add the **Federated Catalog** — an Eclipse EDC component that crawls participant catalogs into a local queryable cache. This is useful when participants want to search across dozens of providers without knowing each one's endpoint up front.

The Federated Catalog is not required. It is a convenience for large dataspaces. You deploy it, configure which participants to crawl and how often, and it builds the index. No custom code needed.

---

**Related:** [Platform Setup](../platform-setup/) | [System Integration](../system-integration/) | [Components](/docs/components/)
