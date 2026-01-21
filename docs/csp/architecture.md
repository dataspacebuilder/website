# CSP Architecture Guide

> Understanding the Trusted Data Sharing Stack for multi-tenant deployments

---

## Architecture Overview

The Trusted Data Sharing Stack is designed for Cloud Service Providers to operate dataspace services efficiently at scale. The architecture separates concerns into distinct layers, each optimized for its purpose.

![Stack Architecture](../../image/README/stack.png)

---

## Component Deep Dive

### Connector Fabric Manager (CFM)

The CFM is the backbone of your dataspace platform, responsible for:

- **Tenant Lifecycle Management** — Create, configure, suspend, and terminate tenant environments
- **Workflow Orchestration** — Coordinate multi-step provisioning processes
- **Infrastructure Abstraction** — Interface with your underlying Kubernetes/cloud infrastructure
- **Configuration Management** — Maintain tenant-specific settings and credentials

```
┌─────────────────────────────────────────────────────┐
│                         CFM                          │
├──────────────┬──────────────┬───────────────────────┤
│ Tenant API   │ Workflow     │ Infrastructure        │
│              │ Engine       │ Provisioner           │
├──────────────┴──────────────┴───────────────────────┤
│                 State Store (PostgreSQL)            │
└─────────────────────────────────────────────────────┘
```

[→ Detailed CFM Documentation](cfm.md)

---

### EDC-V (Virtualized EDC)

EDC-V enables multi-tenant control plane operations, allowing thousands of logical connectors to share infrastructure.

**Key Features:**
- Tenant isolation with shared compute
- Efficient resource utilization
- Centralized policy enforcement
- Unified catalog aggregation

**Architecture Comparison:**

| Aspect | Classic EDC (Level 1) | EDC-V (Level 2) |
|--------|----------------------|-----------------|
| Deployment | One instance per tenant | Shared instance, multiple tenants |
| Resource usage | High (dedicated pods) | Low (shared pods) |
| Isolation | Process-level | Logical (namespace/context) |
| Scaling | Linear with tenants | Sub-linear (efficient) |

[→ Detailed EDC-V Documentation](edc-v.md)

---

### Identity Hub

Manages decentralized identity for all participants in your dataspace:

- **DID Management** — Create and maintain Decentralized Identifiers
- **Credential Storage** — Secure wallet for Verifiable Credentials
- **Presentation Exchange** — Handle credential requests and presentations
- **Trust Verification** — Validate credentials against trusted issuers

```
┌─────────────────────────────────────────────────────┐
│                    Identity Hub                      │
├─────────────────┬─────────────────┬─────────────────┤
│ DID Service     │ Credential      │ Presentation    │
│                 │ Store           │ Service         │
├─────────────────┴─────────────────┴─────────────────┤
│              Cryptographic Engine (Vault)           │
└─────────────────────────────────────────────────────┘
```

---

### Data Planes

The stack supports multiple data plane types for different use cases:

| Data Plane | Use Case | Protocol |
|------------|----------|----------|
| HTTP Data Plane | REST APIs, file transfers | HTTP/S |
| S3 Data Plane | Object storage | S3-compatible |
| Industrial Data Plane | Manufacturing systems | OPC UA |
| Kafka Data Plane | Event streaming | Kafka |
| Custom Data Planes | Specialized needs | SDK-based |

[→ Data Planes Documentation](../reference/data-planes.md)

---

## Deployment Patterns

### Single-Region Deployment

Simplest pattern for getting started:

```
┌─────────────────────────────────────────┐
│           Single Kubernetes Cluster      │
│  ┌─────────────────────────────────────┐│
│  │              CFM                     ││
│  ├─────────────────────────────────────┤│
│  │             EDC-V                    ││
│  ├─────────────────────────────────────┤│
│  │         Identity Hub                 ││
│  ├─────────────────────────────────────┤│
│  │          Data Planes                 ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

### Multi-Region / Federated Deployment

For resilience and data residency requirements:

```
┌─────────────────────┐   ┌─────────────────────┐
│     Region EU       │   │     Region US       │
│  ┌───────────────┐  │   │  ┌───────────────┐  │
│  │    CFM        │◄─┼───┼──│    CFM        │  │
│  │    EDC-V      │  │   │  │    EDC-V      │  │
│  │    Data Plane │  │   │  │    Data Plane │  │
│  └───────────────┘  │   │  └───────────────┘  │
└─────────────────────┘   └─────────────────────┘
         │                         │
         └────────────┬────────────┘
                      │
              ┌───────────────┐
              │ Federated     │
              │ Catalog       │
              └───────────────┘
```

---

## Security Architecture

### Network Security

- All external traffic through ingress with TLS termination
- Internal traffic optionally encrypted with mTLS (service mesh)
- Tenant isolation via network policies

### Identity & Access

- Operator access via OIDC (Keycloak recommended)
- Tenant authentication via DID/VC
- API access with scoped tokens

### Secrets Management

- All secrets in Vault (or equivalent)
- Automatic rotation supported
- Tenant keys isolated

---

## Integration Points

### Your Existing Infrastructure

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Kubernetes API | Provisioning | REST/gRPC |
| PostgreSQL | State persistence | SQL |
| Vault | Secrets management | REST |
| Keycloak | Operator authentication | OIDC |
| Prometheus/Grafana | Monitoring | Metrics |

### Customer Systems

| Integration | Purpose | Protocol |
|-------------|---------|----------|
| Customer Identity Provider | SSO for tenant users | OIDC |
| Customer Data Sources | Data plane connectivity | Various |
| Customer ERP/MES | Asset catalog sync | REST API |

---

## Capacity Planning

### Sizing Guidelines

<!-- TODO: Add specific resource requirements -->

| Tenants | CFM Resources | EDC-V Resources | Database |
|---------|--------------|-----------------|----------|
| 1-100 | 2 replicas, 2 vCPU, 4GB | 3 replicas, 4 vCPU, 8GB | db.m5.large |
| 100-1000 | 3 replicas, 4 vCPU, 8GB | 5 replicas, 8 vCPU, 16GB | db.m5.xlarge |
| 1000+ | Horizontal scaling | Horizontal scaling | Clustered |

---

## Next Steps

- **[Multi-Tenancy with EDC-V](edc-v.md)** — Deep dive on virtualized connectors
- **[Connector Fabric Manager](cfm.md)** — Understand lifecycle management
- **[Operations Guide](operations.md)** — Running in production
