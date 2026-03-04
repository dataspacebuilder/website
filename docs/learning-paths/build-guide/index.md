---
sidebar_label: Overview
sidebar_position: 1
title: "CSP Build Guide: What Eclipse Gives You vs. What You Build"
---

# CSP Build Guide: What Eclipse Gives You vs. What You Build

## Who This Is For

You are a cloud service provider helping organizations set up new dataspaces from scratch. You need to know exactly which components come ready-made from Eclipse projects and which parts you need to build yourself.

This guide gives you that map. It starts with the standard CSP baseline — provisioning participants and running a basic scenario for sharing files — and builds up to customer-facing applications and multi-protocol data planes.

## Chapters

| # | Chapter | What you'll learn |
|---|---------|-------------------|
| 1 | [The Component Map](./components.md) | Every component in a functioning dataspace — tagged by who provides it |
| 2 | [The CSP Baseline](./baseline.md) | The standard starting point: CFM, EDC-V, and a minimal data plane |
| 3 | [Portal and Observability](./portal.md) | Adding a web interface and monitoring for your customers |
| 4 | [Customer Applications](./customer-apps.md) | Deploying use case applications on behalf of customers |
| 5 | [Multiple Data Planes and Credential Issuance](./full-build-out.md) | Multi-protocol, multi-dataspace, and trust infrastructure |

## Summary: What You Build at Each Level

| Level | Eclipse provides | CSP builds/operates |
|-------|-----------------|---------------------|
| **Baseline** | Control Plane, Identity Hub, CFM, EDC-V, Data Plane SDKs | Infrastructure (K8s, PostgreSQL, Vault, NATS, IDP), minimal data plane |
| **Portal** | (same as baseline) | + User Portal, Monitoring & Observability |
| **Customer apps** | (same — Management API + DPS) | + Customer applications (business logic, backend integration) |
| **Full build-out** | + Issuer Service | + Additional data planes (CSP-built or community), multi-dataspace configuration |

## Prerequisites

Read [Platform Setup](../platform-setup/) for how the EDCaaS platform is deployed, and [System Integration](../system-integration/) for how participants use it.
