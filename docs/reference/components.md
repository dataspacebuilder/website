# Components Overview

> Technical reference for stack components

---

## Component Map

```
┌─────────────────────────────────────────────────────────────────┐
│                 EDC Trusted Data Sharing Stack                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    User Interfaces                       │  │
│  │   ┌─────────────────┐    ┌─────────────────┐            │  │
│  │   │ CSP Mgmt UI     │    │ Tenant Portal   │            │  │
│  │   └─────────────────┘    └─────────────────┘            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Control Plane                         │  │
│  │   ┌─────────────────┐    ┌─────────────────┐            │  │
│  │   │     EDC-V       │    │  Identity Hub   │            │  │
│  │   └─────────────────┘    └─────────────────┘            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Fabric Layer                          │  │
│  │   ┌─────────────────┐    ┌─────────────────┐            │  │
│  │   │      CFM        │    │  Issuer Service │            │  │
│  │   └─────────────────┘    └─────────────────┘            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Data Planes                           │  │
│  │   ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐           │  │
│  │   │  HTTP  │ │   S3   │ │ Kafka  │ │ OPC UA │           │  │
│  │   └────────┘ └────────┘ └────────┘ └────────┘           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Core Components

### EDC-V (Virtualized EDC)

Multi-tenant control plane for connector operations.

| Aspect | Details |
|--------|---------|
| **Purpose** | Manage assets, negotiate contracts, coordinate transfers |
| **Scaling** | Horizontal (shared state) |
| **Dependencies** | PostgreSQL, CFM, Identity Hub |
| **Protocol** | DSP 2025-1 |

[→ Detailed Documentation](edc-v.md)

---

### Connector Fabric Manager (CFM)

Tenant lifecycle and orchestration backbone.

| Aspect | Details |
|--------|---------|
| **Purpose** | Provision tenants, manage workflows, configure infrastructure |
| **Scaling** | Horizontal (replicas) |
| **Dependencies** | PostgreSQL, Vault, Kubernetes |
| **API** | REST (OpenAPI) |

[→ Detailed Documentation](cfm.md)

---

### Identity Hub

Decentralized identity and credential management.

| Aspect | Details |
|--------|---------|
| **Purpose** | DID management, credential storage, presentation exchange |
| **Scaling** | Horizontal with cache |
| **Dependencies** | Vault (keys), PostgreSQL (state) |
| **Protocol** | DCP, W3C DID/VC |

[→ Detailed Documentation](identity-hub.md)

---

### Issuer Service

Credential issuance authority.

| Aspect | Details |
|--------|---------|
| **Purpose** | Issue Verifiable Credentials to participants |
| **Scaling** | Low volume, single/few replicas |
| **Dependencies** | Vault (signing keys) |
| **Protocol** | W3C VC |

---

## Data Planes

### HTTP Data Plane

General-purpose HTTP transfers.

| Aspect | Details |
|--------|---------|
| **Use Cases** | REST APIs, file downloads |
| **Protocols** | HTTP/1.1, HTTP/2, HTTPS |
| **Features** | Chunked transfer, resumable, proxy mode |

---

### S3 Data Plane

Object storage transfers.

| Aspect | Details |
|--------|---------|
| **Use Cases** | Large files, datasets, backups |
| **Protocols** | S3 API compatible |
| **Providers** | AWS S3, MinIO, Azure Blob, GCS |

---

### Kafka Data Plane

Event streaming transfers.

| Aspect | Details |
|--------|---------|
| **Use Cases** | Real-time events, IoT data, logs |
| **Protocols** | Kafka protocol |
| **Features** | Consumer groups, partitioning |

---

### Industrial Data Plane (OPC UA)

Manufacturing system integration.

| Aspect | Details |
|--------|---------|
| **Use Cases** | Machine data, sensors, PLCs |
| **Protocols** | OPC UA |
| **Standards** | OPC UA Cloud Library |

[→ Detailed Documentation](data-planes.md)

---

## User Interfaces

### CSP Management UI

Administrative portal for platform operators.

| Feature | Description |
|---------|-------------|
| Tenant management | Create, configure, suspend tenants |
| Monitoring | Platform health, metrics |
| Credential issuance | Issue base credentials |
| Configuration | Platform settings |

---

### Tenant Portal (Redline)

End-user portal for participant organizations.

| Feature | Description |
|---------|-------------|
| Asset management | Publish and manage data assets |
| Catalog browsing | Discover partner offerings |
| Contract management | Negotiate and view agreements |
| Transfer monitoring | Track data exchanges |

---

## Infrastructure Dependencies

| Component | Purpose | Recommended |
|-----------|---------|-------------|
| **Kubernetes** | Container orchestration | 1.28+ |
| **PostgreSQL** | State persistence | 15+ |
| **Vault** | Secrets/keys | HashiCorp |
| **Keycloak** | User authentication | Latest |
| **Ingress** | Traffic management | NGINX |

---

## Component Maturity

| Component | Status | Notes |
|-----------|--------|-------|
| EDC-V | Production | Multi-tenant ready |
| CFM | Production | Stable |
| Identity Hub | Production | DCP compliant |
| HTTP Data Plane | Production | Stable |
| S3 Data Plane | Production | Stable |
| Kafka Data Plane | Beta | Feature complete |
| Industrial Data Plane | Beta | OPC UA integration |

---

## Further Reading

- [Architecture Reference](architecture.md)
- [Protocol Specifications](protocols.md)
- [API Reference](api.md)
