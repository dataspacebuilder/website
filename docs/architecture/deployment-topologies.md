---
sidebar_position: 6
title: Deployment Topologies
description: Cloud, edge, and on-premises deployment options for dataspaces
---

# Deployment Topologies

The trusted data sharing stack is infrastructure-agnostic. Whether you run in the cloud, on-premises, or at the edge, the architecture adapts to your needs.

---

## Deployment Flexibility

One of the key benefits of the EDC-based stack:

- **No vendor lock-in** — Run on any infrastructure
- **Data sovereignty** — Keep data where regulations require
- **Performance optimization** — Deploy close to data sources
- **Hybrid architectures** — Mix deployment models as needed

---

## Common Topologies

### Cloud-Native Deployment

Run connectors as containerized services in Kubernetes:

```
┌─────────────────────────────────────────────────┐
│                 Kubernetes Cluster               │
├─────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────────────────┐   │
│  │   Control   │  │      Data Plane         │   │
│  │   Plane     │  │   (multiple replicas)   │   │
│  │   Pod       │  │                         │   │
│  └─────────────┘  └─────────────────────────┘   │
│                                                  │
│  ┌─────────────┐  ┌─────────────────────────┐   │
│  │   Identity  │  │   PostgreSQL /          │   │
│  │   Hub       │  │   Cloud Database        │   │
│  └─────────────┘  └─────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

**Best for:**
- Scalable multi-tenant deployments
- Dynamic workloads
- Managed infrastructure

---

### On-Premises Deployment

Run connectors within corporate infrastructure:

```
┌─────────────────────────────────────────────────┐
│              Corporate Data Center               │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌─────────────────────────────────────────┐    │
│  │           EDC Connector                  │    │
│  │   ┌─────────┐  ┌─────────────────────┐  │    │
│  │   │ Control │  │     Data Plane      │  │    │
│  │   │ Plane   │  │                     │  │    │
│  │   └─────────┘  └─────────────────────┘  │    │
│  └─────────────────────────────────────────┘    │
│                      │                           │
│  ┌───────────────────┼───────────────────────┐  │
│  │    Internal Data  │  Sources              │  │
│  │  ┌─────────┐  ┌───┴─────┐  ┌──────────┐  │  │
│  │  │   ERP   │  │   MES   │  │   Files  │  │  │
│  │  └─────────┘  └─────────┘  └──────────┘  │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

**Best for:**
- Regulated industries
- Sensitive data
- Existing infrastructure

---

### Edge Deployment

Run data planes close to data sources:

```
┌─────────────────┐                    ┌─────────────────┐
│   Cloud/HQ      │                    │   Edge Site     │
├─────────────────┤                    ├─────────────────┤
│                 │                    │                 │
│  ┌───────────┐  │                    │  ┌───────────┐  │
│  │  Control  │  │    DPS Signaling   │  │   Data    │  │
│  │  Plane    │<─┼────────────────────┼─>│   Plane   │  │
│  └───────────┘  │                    │  └───────────┘  │
│                 │                    │       │         │
└─────────────────┘                    │  ┌────┴────┐    │
                                       │  │ Sensors │    │
                                       │  │ PLCs    │    │
                                       │  └─────────┘    │
                                       └─────────────────┘
```

**Best for:**
- Industrial IoT
- Low-latency requirements
- Bandwidth optimization

---

### Hybrid Multi-Cloud

Span multiple cloud providers and on-premises:

```
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│    AWS        │   │    Azure      │   │  On-Premises  │
├───────────────┤   ├───────────────┤   ├───────────────┤
│  ┌─────────┐  │   │  ┌─────────┐  │   │  ┌─────────┐  │
│  │   EDC   │  │   │  │   EDC   │  │   │  │   EDC   │  │
│  │Connector│<─┼───┼─>│Connector│<─┼───┼─>│Connector│  │
│  └─────────┘  │   │  └─────────┘  │   │  └─────────┘  │
└───────────────┘   └───────────────┘   └───────────────┘
          Dataspace Protocol (DSP) over HTTPS
```

**Best for:**
- Multi-provider ecosystems
- Disaster recovery
- Regulatory compliance

---

## Multi-Tenant Deployment (EDC-V)

For cloud service providers hosting many organizations:

```
┌─────────────────────────────────────────────────┐
│          Virtualized Control Plane (EDC-V)       │
├─────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐         │
│  │Tenant A │  │Tenant B │  │Tenant C │  ...    │
│  │ Context │  │ Context │  │ Context │         │
│  └────┬────┘  └────┬────┘  └────┬────┘         │
│       │            │            │               │
│  ┌────┴────────────┴────────────┴────┐         │
│  │     Shared Control Plane Runtime   │         │
│  └────────────────────────────────────┘         │
└─────────────────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
   ┌────┴───┐    ┌────┴───┐    ┌────┴───┐
   │Data    │    │Data    │    │Data    │
   │Plane A │    │Plane B │    │Plane C │
   └────────┘    └────────┘    └────────┘
```

**Benefits:**
- Efficient resource utilization
- Lower per-tenant costs
- Centralized management
- Isolated data planes

---

## Infrastructure Requirements

### Control Plane

- **Compute:** 2-4 vCPUs, 4-8 GB RAM
- **Storage:** Database for state (PostgreSQL, CosmosDB)
- **Network:** HTTPS endpoints, outbound connectivity

### Data Plane

- **Compute:** Varies by throughput requirements
- **Storage:** Temp space for data buffering
- **Network:** High bandwidth for data transfer

### Identity Hub

- **Compute:** 1-2 vCPUs, 2-4 GB RAM
- **Storage:** Credential store
- **Network:** HTTPS for DID resolution

---

## Deployment Considerations

### Security

- TLS everywhere
- Network segmentation
- Access control to management APIs
- Secrets management for credentials

### High Availability

- Multiple replicas for control plane
- Load balancing for data plane
- Database replication
- Cross-zone deployment

### Monitoring

- Metrics export (Prometheus, etc.)
- Structured logging
- Distributed tracing
- Alert on state machine failures

---

## Next Steps

- [The Pyramid](/docs/architecture/pyramid) — Architecture overview
- [Architecture Overview](/docs/architecture/pyramid) — The five-layer stack
- [Community](/community) — Get help from others
