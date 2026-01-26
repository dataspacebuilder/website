---
sidebar_position: 6
title: Deployment Topologies
description: Cloud, edge, on-premises, and multi-tenant deployment options for dataspace infrastructure.
---

# Deployment Topologies

The dataspace architecture is infrastructure-agnostic. Whether you run in the cloud, on-premises, or at the edge, the components adapt to your requirements. This flexibility is essential for data sovereignty and regulatory compliance.

---

## Deployment Flexibility

One of the key benefits of the EDC-based architecture:

| Benefit | Description |
|---------|-------------|
| **No vendor lock-in** | Run on any infrastructure provider |
| **Data sovereignty** | Keep data where regulations require |
| **Performance** | Deploy close to data sources |
| **Hybrid** | Mix deployment models as needed |

---

## Common Deployment Patterns

### Cloud-Native Deployment

Run connectors as containerized services in Kubernetes:

```mermaid
flowchart TB
    subgraph k8s["Kubernetes Cluster"]
        subgraph pods["Workloads"]
            cp["Control Plane<br/>Pod"]
            dp["Data Plane<br/>Pods (replicas)"]
            ih["Identity Hub<br/>Pod"]
        end
        
        subgraph data["Data Services"]
            db["PostgreSQL"]
            vault["HashiCorp Vault"]
        end
    end
    
    cp <--> db
    cp <--> vault
    ih <--> db
    cp <--> dp
    
    style k8s fill:#f0fdfa,stroke:#0d9488
```

**Characteristics:**
- Horizontal scaling for data plane
- Managed database services
- Kubernetes-native observability
- GitOps deployment patterns

**Best for:**
- Scalable multi-tenant deployments
- Dynamic workloads
- Organizations with Kubernetes expertise

### On-Premises Deployment

Run connectors within corporate infrastructure:

```mermaid
flowchart TB
    subgraph dc["Corporate Data Center"]
        subgraph connector["EDC Connector"]
            cp["Control Plane"]
            dp["Data Plane"]
        end
        
        subgraph sources["Internal Systems"]
            erp["ERP"]
            mes["MES"]
            files["File Storage"]
        end
        
        db["Database"]
    end
    
    dp <--> erp
    dp <--> mes
    dp <--> files
    connector <--> db
    
    style dc fill:#f1f5f9,stroke:#64748b
```

**Characteristics:**
- Data never leaves the corporate network
- Integration with existing systems
- Use existing security infrastructure
- Full control over deployment

**Best for:**
- Regulated industries (finance, healthcare)
- Sensitive data that cannot leave premises
- Organizations with existing data center investments

### Edge Deployment

Run data planes close to data sources:

```mermaid
flowchart LR
    subgraph cloud["Cloud / Headquarters"]
        cp["Control Plane"]
    end
    
    subgraph edge1["Factory Site A"]
        dp1["Data Plane"]
        plc1["PLCs & Sensors"]
    end
    
    subgraph edge2["Factory Site B"]
        dp2["Data Plane"]
        plc2["PLCs & Sensors"]
    end
    
    cp <-->|"DPS"| dp1
    cp <-->|"DPS"| dp2
    dp1 <--> plc1
    dp2 <--> plc2
    
    style edge1 fill:#fef3c7,stroke:#f59e0b
    style edge2 fill:#fef3c7,stroke:#f59e0b
```

**Characteristics:**
- Centralized control, distributed data access
- Minimize data movement over WAN
- Low-latency access to operational data
- Works with limited connectivity

**Best for:**
- Industrial IoT scenarios
- Manufacturing plants
- Remote locations with limited bandwidth
- Real-time data requirements

### Hybrid Multi-Cloud

Span multiple cloud providers and on-premises:

```mermaid
flowchart TB
    subgraph aws["AWS"]
        edc1["EDC Connector"]
    end
    
    subgraph azure["Azure"]
        edc2["EDC Connector"]
    end
    
    subgraph onprem["On-Premises"]
        edc3["EDC Connector"]
    end
    
    edc1 <-->|"DSP"| edc2
    edc2 <-->|"DSP"| edc3
    edc1 <-->|"DSP"| edc3
    
    style aws fill:#fff7ed,stroke:#ea580c
    style azure fill:#eff6ff,stroke:#2563eb
    style onprem fill:#f1f5f9,stroke:#64748b
```

**Characteristics:**
- Interoperable across providers
- Avoid single-cloud dependency
- Meet data residency requirements
- Disaster recovery across regions

**Best for:**
- Multi-cloud strategies
- Organizations with global presence
- Regulatory requirements for data location
- Business continuity requirements

---

## Management Domains

A **management domain** is a *realm of control over a set of EDC components*. Management domains enable operational responsibility to be delegated throughout an organization.

### Type 1: Single Management Domain

A single management domain deploys EDC components under one unified operations setup:

```mermaid
flowchart TB
    subgraph md1["Management Domain"]
        cs["Catalog Server"]
        cp["Control Plane"]
        dp["Data Plane"]
        ih["Identity Hub"]
    end
    
    style md1 fill:#f0fdfa,stroke:#0d9488
```

**Variants:**
- **Collocated** — All components in a single process (development/edge)
- **Clustered** — Separate ReplicaSets in one Kubernetes cluster (production)

### Type 2: Distributed Management Domains

For organizations with independent subdivisions, components are deployed across multiple management domains.

#### Type 2A: Separate EDC Stacks

Each division deploys a complete EDC stack. A root catalog fronts all divisions:

```mermaid
flowchart TB
    root["Root Catalog"]
    
    subgraph md1["Division A"]
        cp1["Control Plane"]
        dp1["Data Plane"]
    end
    
    subgraph md2["Division B"]
        cp2["Control Plane"]
        dp2["Data Plane"]
    end
    
    root --> md1
    root --> md2
    
    style md1 fill:#dbeafe,stroke:#2563eb
    style md2 fill:#fef3c7,stroke:#f59e0b
```

#### Type 2B: Central Catalog, Distributed Control/Data Planes

A central catalog server fronts distributed control/data plane runtimes:

```mermaid
flowchart TB
    subgraph central["Central"]
        cs["Catalog Server"]
    end
    
    subgraph md1["Division A"]
        cp1["Control Plane"]
        dp1["Data Plane"]
    end
    
    subgraph md2["Division B"]
        cp2["Control Plane"]
        dp2["Data Plane"]
    end
    
    cs --> md1
    cs --> md2
    
    style central fill:#f3e8ff,stroke:#7c3aed
    style md1 fill:#dbeafe,stroke:#2563eb
    style md2 fill:#fef3c7,stroke:#f59e0b
```

#### Type 2C: Central Catalog/Control Plane, Distributed Data Planes

A centralized catalog/control plane with distributed data planes:

```mermaid
flowchart TB
    subgraph central["Central"]
        cs["Catalog Server"]
        cp["Control Plane"]
    end
    
    subgraph md1["Site A"]
        dp1["Data Plane"]
    end
    
    subgraph md2["Site B"]
        dp2["Data Plane"]
    end
    
    cp --> dp1
    cp --> dp2
    
    style central fill:#f3e8ff,stroke:#7c3aed
    style md1 fill:#fef3c7,stroke:#f59e0b
    style md2 fill:#fef3c7,stroke:#f59e0b
```

### Linked Catalogs

Management domains are configured using **linked catalogs**. A root catalog contains sub-catalog entries that reference other catalog endpoints:

```json
{
  "@type": "dcat:Catalog",
  "dcat:catalog": {
    "@type": "dcat:Catalog",
    "dcat:distribution": {
      "dcat:accessService": {
        "dcat:endpointURL": "https://division-a.foo.com/catalog"
      }
    }
  }
}
```

Sub-catalogs are created by adding **CatalogAsset** entries that point to other catalog endpoints, combined with contract definitions that control access.

---

## Multi-Tenant Deployment with CFM

For cloud service providers hosting multiple organizations, the **Connector Fabric Manager (CFM)** orchestrates efficient multi-tenant deployments using the **Virtual Connector (EDC-V)** architecture.

### System Architecture

```mermaid
flowchart TB
    subgraph cfm["Connector Fabric Manager"]
        tm["Tenant Manager"]
        pm["Provision Manager"]
        agents["Activity Agents"]
    end
    
    subgraph services["Virtualized Services"]
        cp["Control Plane (EDC-V)"]
        cs["Credential Service"]
        dp["Data Planes"]
        is["Issuer Service"]
    end
    
    subgraph cloud["Cloud Infrastructure"]
        k8s["Kubernetes"]
        vault["Vault"]
        db["Database"]
        nats["NATS"]
    end
    
    tm <-->|"State"| db
    tm -->|"Workflows"| pm
    pm -->|"Tasks"| agents
    agents -->|"Configure"| services
    agents -->|"Provision"| cloud
    pm <-->|"Messages"| nats
    
    style cfm fill:#dbeafe,stroke:#2563eb
    style services fill:#f0fdfa,stroke:#0d9488
    style cloud fill:#f1f5f9,stroke:#64748b
```

The CFM provides:

| Capability | Description |
|------------|-------------|
| **Tenant lifecycle** | Create, update, delete participant contexts |
| **Resource orchestration** | Provision control planes, data planes, identity hubs |
| **DNS management** | Configure routing and endpoints |
| **Credential setup** | Initialize DID documents and credentials |
| **Infrastructure integration** | Coordinate with Kubernetes, vaults, databases |

### Service Virtualization Model

The CFM implements **service virtualization**—a single deployment serves multiple participants through **configuration-based isolation**, not process isolation:

```mermaid
flowchart LR
    subgraph proc["Process-Based (Inefficient)"]
        p1["Process 1"]
        p2["Process 2"]
        p3["Process 3"]
    end
    
    subgraph config["Configuration-Based (Efficient)"]
        runtime["Shared Runtime"]
        ctx1["Context 1"]
        ctx2["Context 2"]
        ctx3["Context 3"]
        runtime --- ctx1
        runtime --- ctx2
        runtime --- ctx3
    end
    
    style proc fill:#fef2f2,stroke:#ef4444
    style config fill:#f0fdf4,stroke:#22c55e
```

**Why configuration-based:**

| Aspect | Process-Based | Configuration-Based |
|--------|---------------|---------------------|
| **Resource usage** | High (separate processes per tenant) | Low (shared runtime) |
| **Scaling** | Linear with tenants | Sub-linear |
| **Migration** | Complex (move processes) | Simple (move metadata) |
| **Isolation** | Strong (OS-level) | Strong (context-level) |

### Virtualization Model Concepts

```mermaid
classDiagram
    class Tenant {
        +id: string
        +name: string
        +participantProfiles: ParticipantProfile[]
    }
    
    class ParticipantProfile {
        +identifier: DID
        +dataspaceProfiles: DataspaceProfile[]
        +vpas: VirtualParticipantAgent[]
    }
    
    class DataspaceProfile {
        +dataspaceId: string
        +policies: Policy[]
        +protocolVersion: string
    }
    
    class VirtualParticipantAgent {
        +type: "ControlPlane" | "DataPlane" | "CredentialService"
        +targetCell: Cell
        +config: object
    }
    
    class Cell {
        +id: string
        +type: "kubernetes" | "vm" | "edge"
        +capacity: ResourceLimits
    }
    
    class User {
        +id: string
        +roles: Role[]
        +rights: Right[]
    }
    
    Tenant "1" --> "*" ParticipantProfile
    ParticipantProfile "1" --> "1..*" DataspaceProfile
    ParticipantProfile "1" --> "1..*" VirtualParticipantAgent
    VirtualParticipantAgent "*" --> "1" Cell
    User --> "*" ParticipantProfile : manages
```

| Concept | Description |
|---------|-------------|
| **Tenant** | Organization that participates in dataspaces |
| **Participant Profile** | Links an identifier (DID) to dataspace memberships |
| **Dataspace Profile** | Configuration for a specific dataspace |
| **Virtual Participant Agent (VPA)** | Unit of deployment—control plane, data plane, or credential service |
| **Cell** | Homogenous deployment zone (Kubernetes cluster, VM pool) |
| **User** | Administrator who manages VPAs via RBAC |

### Virtual Participant Agents (VPAs)

A VPA is the unit of administrative control and deployment. When a participant is provisioned, multiple VPA types are created:

```mermaid
flowchart TB
    subgraph participant["Acme Industries"]
        subgraph vpas["Virtual Participant Agents"]
            cs_vpa["Credential Service VPA"]
            cp_vpa["Control Plane VPA"]
            dp_vpa1["Data Plane VPA (API)"]
            dp_vpa2["Data Plane VPA (Streaming)"]
        end
    end
    
    subgraph cell1["Cell: EU-West"]
        cs_runtime["Credential Service"]
        cp_runtime["Control Plane"]
    end
    
    subgraph cell2["Cell: Edge"]
        dp1_runtime["Data Plane 1"]
        dp2_runtime["Data Plane 2"]
    end
    
    cs_vpa --> cs_runtime
    cp_vpa --> cp_runtime
    dp_vpa1 --> dp1_runtime
    dp_vpa2 --> dp2_runtime
    
    style participant fill:#dbeafe,stroke:#2563eb
    style cell1 fill:#f0fdfa,stroke:#0d9488
    style cell2 fill:#fef3c7,stroke:#f59e0b
```

**VPA characteristics:**

- **Type-specific:** Control Plane VPA, Data Plane VPA, Credential Service VPA
- **Cell-targeted:** Each VPA runs in a specific cell
- **Independently scalable:** Cells manage their own scaling (e.g., via Keda)
- **Migratable:** Move VPA metadata to migrate between cells

### Identity Scenarios

A dataspace constraint: **A participant has one and only one identifier.**

| Scenario | Result |
|----------|--------|
| **One DID per dataspace** | Multiple participant profiles (one per dataspace) |
| **One DID across dataspaces** | Single participant profile for all dataspaces |
| **Multiple DIDs** | Multiple participants (or mapped to single identity) |

### CFM Subsystems

The CFM is built as a reliable message-based system:

```mermaid
flowchart LR
    subgraph tm["Tenant Manager"]
        api["REST API"]
        state["State Store"]
    end
    
    subgraph pm["Provision Manager"]
        orch["Orchestrator"]
        workflows["Workflows"]
    end
    
    subgraph agents["Activity Agents"]
        k8s_agent["K8s Agent"]
        vault_agent["Vault Agent"]
        dns_agent["DNS Agent"]
    end
    
    nats[("NATS Jetstream")]
    
    api --> state
    api -->|"Request"| nats
    nats -->|"Orchestrate"| pm
    pm -->|"Tasks"| nats
    nats -->|"Execute"| agents
    agents -->|"Status"| nats
    nats -->|"Complete"| tm
    
    style nats fill:#fef3c7,stroke:#f59e0b
```

| Subsystem | Responsibility |
|-----------|----------------|
| **Tenant Manager** | REST API, state management, initiates workflows |
| **Provision Manager** | Executes stateful orchestration workflows |
| **Activity Agents** | Execute tasks, isolated from provisioner |
| **NATS Jetstream** | Reliable messaging with persistence |

**Architectural benefits:**

- **Temporal decoupling:** Components operate independently
- **Spatial decoupling:** Agents can run in different locations
- **Reliability:** NATS persistence ensures no message loss
- **Security:** Agents isolate infrastructure secrets from provisioner

---

## EDC-V Runtime Architecture

The Virtual Connector provides the runtime for multi-tenant control planes:

```mermaid
flowchart TB
    subgraph edcv["EDC-V Runtime"]
        subgraph contexts["Participant Contexts"]
            ctx_a["Context A<br/>(Tenant A VPA)"]
            ctx_b["Context B<br/>(Tenant B VPA)"]
            ctx_c["Context C<br/>(Tenant C VPA)"]
        end
        
        shared["Shared Services<br/>(Catalog, Negotiation, Policy)"]
    end
    
    subgraph storage["Isolated Storage"]
        db_a["Schema A"]
        db_b["Schema B"]
        db_c["Schema C"]
    end
    
    ctx_a --> shared
    ctx_b --> shared
    ctx_c --> shared
    ctx_a --> db_a
    ctx_b --> db_b
    ctx_c --> db_c
    
    style edcv fill:#f0fdfa,stroke:#0d9488
```

### Context Isolation

Each VPA operates in an isolated context with:

| Isolation | Implementation |
|-----------|----------------|
| **API paths** | `/participants/{participantId}/...` |
| **Data storage** | Tenant-specific schemas or row-level security |
| **Credentials** | Separate credential stores |
| **Data planes** | Dedicated per tenant |

### Context Migration

Moving a VPA between cells requires only moving metadata:

```mermaid
flowchart LR
    subgraph cell1["Cell 1"]
        vpa1["VPA"]
    end
    
    metadata[("VPA Metadata")]
    
    subgraph cell2["Cell 2"]
        vpa1_new["VPA (migrated)"]
    end
    
    vpa1 -.->|"Export"| metadata
    metadata -.->|"Import"| vpa1_new
    
    style vpa1_new fill:#2563eb,stroke:#2563eb,color:#fff
```

---

## Component Placement

### Recommendations by Component

| Component | Recommended Placement |
|-----------|----------------------|
| **CFM** | Central cloud (HA) |
| **Control Plane** | Cloud or central data center (HA) |
| **Identity Hub** | Co-located with Control Plane |
| **Data Plane** | Close to data sources |
| **Database** | Managed service or HA cluster |

### High Availability Considerations

```mermaid
flowchart TB
    subgraph ha["High Availability Setup"]
        subgraph cfm_ha["CFM (HA)"]
            cfm1["Instance 1"]
            cfm2["Instance 2"]
        end
        
        subgraph cp_ha["Control Plane (HA)"]
            cp1["Instance 1"]
            cp2["Instance 2"]
        end
        
        lb["Load Balancer"]
        nats["NATS Cluster"]
        
        subgraph db_ha["Database (HA)"]
            primary["Primary"]
            replica["Replica"]
        end
    end
    
    lb --> cfm1 & cfm2
    lb --> cp1 & cp2
    cfm1 & cfm2 <--> nats
    cfm1 & cfm2 --> primary
    cp1 & cp2 --> primary
    primary --> replica
```

---

## Infrastructure Requirements

### Control Plane

| Resource | Specification |
|----------|---------------|
| CPU | 2-4 vCPUs |
| Memory | 4-8 GB RAM |
| Storage | Database connection |
| Network | HTTPS endpoints |

### Identity Hub

| Resource | Specification |
|----------|---------------|
| CPU | 1-2 vCPUs |
| Memory | 2-4 GB RAM |
| Storage | Credential store |
| Network | DID resolution endpoints |

### Data Plane

| Resource | Specification |
|----------|---------------|
| CPU | Scales with throughput |
| Memory | Scales with concurrency |
| Storage | Temp buffer space |
| Network | High bandwidth |

### Connector Fabric Manager

| Resource | Specification |
|----------|---------------|
| CPU | 2-4 vCPUs |
| Memory | 4-8 GB RAM |
| Storage | PostgreSQL |
| Messaging | NATS Jetstream |
| Network | Cloud API access |

---

## Security Considerations

### Network Security

| Requirement | Implementation |
|-------------|----------------|
| **TLS everywhere** | All endpoints use HTTPS/TLS 1.3 |
| **Network segmentation** | Separate management and data networks |
| **Firewall rules** | Restrict to required ports |
| **DDoS protection** | Edge protection for public endpoints |

### Access Control

| Component | Access Control |
|-----------|----------------|
| CFM API | OAuth2 with role claims (admin, provisioner, participant) |
| Management API | OAuth2 tokens with role claims |
| DSP endpoints | Mutual TLS or signed requests |
| Data Plane | Access tokens tied to agreements |

### CFM Roles

| Role | Capabilities |
|------|--------------|
| **Admin** | Full access to all APIs and data |
| **Provisioner** | Create/manage tenants and VPAs |
| **Participant** | Manage own VPA resources only |

### Secrets Management

| Secret Type | Recommendation |
|-------------|----------------|
| Private keys | HSM or secure vault |
| Database credentials | Vault with rotation |
| API tokens | Short-lived, scoped |

---

## Monitoring and Observability

### Metrics

| Metric Type | Examples |
|-------------|----------|
| Business | Contracts negotiated, transfers completed, tenants active |
| Technical | Request latency, error rates, queue depth |
| Infrastructure | CPU, memory, network |

### Logging

| Log Type | Purpose |
|----------|---------|
| Audit logs | Compliance, security review |
| Application logs | Debugging, troubleshooting |
| Access logs | Security monitoring |
| Provisioning logs | Workflow tracking |

### Recommended Stack

- **Metrics:** Prometheus + Grafana
- **Logging:** ELK Stack or cloud-native logging
- **Tracing:** Jaeger or cloud-native tracing
- **Alerting:** Based on state machine failures, error rates, provisioning failures

---

## Migration Considerations

### From Development to Production

1. **Externalize data plane** — Move from embedded to separate service
2. **Add high availability** — Multiple instances, load balancing
3. **Production database** — Managed service with backups
4. **Security hardening** — TLS, secrets management, network isolation

### From Single-Tenant to Multi-Tenant

1. **Deploy CFM** — Set up Tenant Manager, Provision Manager, Agents
2. **Deploy EDC-V** — Replace single connector with virtual connector
3. **Configure cells** — Define deployment zones
4. **Migrate tenants** — Create VPAs for existing participants
5. **Update integrations** — Use tenant-specific API paths
6. **Verify isolation** — Test VPA boundaries

---

## What's Next

- **[Components Overview](/docs/architecture/components)** — Understand each component including CFM
- **[Control Plane](/docs/architecture/control-plane)** — Business logic deployment
- **[Data Plane](/docs/architecture/data-plane)** — Data transfer deployment
- **[Overview](/docs/architecture/overview)** — Architecture fundamentals
