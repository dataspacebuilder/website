---
sidebar_position: 3
title: Cells & Infrastructure
description: Cells are homogeneous deployment zones that host VPAs—enabling scalability, fault isolation, and geographic distribution.
---

# Cells & Infrastructure

Cells are the infrastructure abstraction that enables scalable, flexible dataspace deployments. Understanding cells is essential for planning production deployments.

---

## What is a Cell?

A **Cell** is a homogeneous deployment zone—typically a Kubernetes cluster—that hosts multiple VPAs from different participants.

```
┌─────────────────────────────────────────────────────────────────┐
│                           Cell                                   │
│                    (Kubernetes Cluster)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Shared EDC-V Deployments:                                      │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ Control Plane Runtime (serves all CP VPAs in this cell) │   │
│   └─────────────────────────────────────────────────────────┘   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ Credential Service Runtime (serves all CS VPAs)         │   │
│   └─────────────────────────────────────────────────────────┘   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ Data Plane Runtime (serves all DP VPAs)                 │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│   VPA Contexts:                                                  │
│   ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐        │
│   │VPA A  │  │VPA B  │  │VPA C  │  │VPA D  │  │VPA E  │  ...   │
│   └───────┘  └───────┘  └───────┘  └───────┘  └───────┘        │
│                                                                  │
│   Local Persistent Store (VPA metadata)                         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Cell Characteristics

| Characteristic | Description |
|---------------|-------------|
| **Homogeneous** | All nodes in a cell have similar capabilities |
| **Self-contained** | Contains all runtime components needed |
| **Independently scalable** | Each cell manages its own scaling |
| **Fault-isolated** | Cell failure doesn't affect other cells |

---

## Why Cells Matter

### 1. Horizontal Scaling

Add more cells for more capacity:

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Cell 1     │  │   Cell 2     │  │   Cell 3     │
│  (EU-West)   │  │  (EU-North)  │  │  (US-East)   │
│              │  │              │  │              │
│  100 VPAs    │  │  100 VPAs    │  │  100 VPAs    │
└──────────────┘  └──────────────┘  └──────────────┘

Total capacity: 300 VPAs across 3 cells
```

### 2. Fault Isolation

If Cell 1 fails, Cells 2 and 3 continue operating:

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Cell 1     │  │   Cell 2     │  │   Cell 3     │
│   ✗ FAILED   │  │   ✓ OK       │  │   ✓ OK       │
│              │  │              │  │              │
│  VPAs        │  │  VPAs        │  │  VPAs        │
│  unavailable │  │  operational │  │  operational │
└──────────────┘  └──────────────┘  └──────────────┘
```

VPAs in Cell 1 can be migrated to other cells if needed.

### 3. Geographic Distribution

Place cells in different regions for:
- **Latency optimization** — Cells close to data sources
- **Data residency** — Cells in specific jurisdictions
- **Disaster recovery** — Cells in different failure domains

```
┌─────────────────────────────────────────────────────────────────┐
│                    Global Cell Deployment                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Europe:                Americas:              Asia-Pacific:    │
│   ┌──────────────┐      ┌──────────────┐      ┌──────────────┐  │
│   │  Cell EU-1   │      │  Cell US-1   │      │  Cell AP-1   │  │
│   │  (Frankfurt) │      │  (Virginia)  │      │  (Singapore) │  │
│   └──────────────┘      └──────────────┘      └──────────────┘  │
│   ┌──────────────┐      ┌──────────────┐      ┌──────────────┐  │
│   │  Cell EU-2   │      │  Cell US-2   │      │  Cell AP-2   │  │
│   │  (Dublin)    │      │  (Oregon)    │      │  (Sydney)    │  │
│   └──────────────┘      └──────────────┘      └──────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 4. Regulatory Compliance

Cells in specific jurisdictions for data sovereignty:

```
┌─────────────────────────────────────────────────────────────────┐
│                    Regulatory Cell Placement                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Cell: EU-GDPR-Compliant                                        │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ • Located in EU jurisdiction                             │   │
│   │ • Hosts VPAs requiring GDPR compliance                   │   │
│   │ • Data never leaves EU                                   │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│   Cell: US-ITAR-Compliant                                        │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ • Located in US jurisdiction                             │   │
│   │ • Hosts VPAs with ITAR requirements                      │   │
│   │ • US-only access                                         │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Cell Placement Strategy

### By Component Type

| Component | Typical Placement | Reason |
|-----------|-------------------|--------|
| **CFM** | Central cloud (HA) | Management control, high availability |
| **Control Plane** | Cloud or central DC | Business logic, high availability |
| **Identity Hub** | Co-located with CP | Tight integration, low latency |
| **Data Plane** | Close to data sources | Minimize data transfer latency |

### Edge Cells

For industrial and IoT scenarios, deploy data plane cells at the edge:

```
┌─────────────────────────────────────────────────────────────────┐
│                    Hybrid Cell Deployment                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Cloud (Headquarters)                                           │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  Cell: Central                                           │   │
│   │  • CFM                                                   │   │
│   │  • Control Plane VPAs                                    │   │
│   │  • Credential Service VPAs                               │   │
│   └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                         DPS Signaling                            │
│              ┌───────────────┼───────────────┐                  │
│              │               │               │                  │
│              ▼               ▼               ▼                  │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│   │ Cell: Edge-1 │  │ Cell: Edge-2 │  │ Cell: Edge-3 │          │
│   │ Factory A    │  │ Factory B    │  │ Factory C    │          │
│   │              │  │              │  │              │          │
│   │ DP VPAs only │  │ DP VPAs only │  │ DP VPAs only │          │
│   │              │  │              │  │              │          │
│   │ ┌─────────┐  │  │ ┌─────────┐  │  │ ┌─────────┐  │          │
│   │ │ Sensors │  │  │ │ PLCs    │  │  │ │ Machines│  │          │
│   │ └─────────┘  │  │ └─────────┘  │  │ └─────────┘  │          │
│   └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Cell Architecture

### Internal Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                    Cell (Kubernetes Cluster)                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Ingress / Load Balancer                                        │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ Routes requests to correct runtime based on VPA context  │   │
│   └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│              ┌───────────────┼───────────────┐                  │
│              │               │               │                  │
│              ▼               ▼               ▼                  │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│   │ CP Runtime   │  │ DP Runtime   │  │ CS Runtime   │          │
│   │ (Deployment) │  │ (Deployment) │  │ (Deployment) │          │
│   │              │  │              │  │              │          │
│   │ Replicas:    │  │ Replicas:    │  │ Replicas:    │          │
│   │ 2-10 (HPA)   │  │ 2-20 (HPA)   │  │ 2-5 (HPA)    │          │
│   └──────────────┘  └──────────────┘  └──────────────┘          │
│              │               │               │                  │
│              └───────────────┼───────────────┘                  │
│                              ▼                                   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                   Shared Services                        │   │
│   │  • PostgreSQL (VPA metadata, state)                      │   │
│   │  • Vault (credentials, secrets)                          │   │
│   │  • NATS (messaging with CFM)                             │   │
│   │  • Observability (Prometheus, Jaeger)                    │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Scaling Within a Cell

Cells manage their own scaling, typically using Kubernetes HPA or Keda:

| Component | Scaling Trigger | Typical Range |
|-----------|-----------------|---------------|
| **Control Plane** | CPU, Request rate | 2-10 replicas |
| **Data Plane** | CPU, Transfer volume | 2-20 replicas |
| **Credential Service** | CPU, Request rate | 2-5 replicas |

---

## Cell Provisioning

CFM provisions cells through Activity Agents:

```
┌─────────────────────────────────────────────────────────────────┐
│                    CFM Cell Provisioning                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Tenant Manager                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ 1. Create Cell record                                    │   │
│   │ 2. Initiate provisioning workflow                        │   │
│   └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│   Provision Manager                                              │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ 3. Orchestrate provisioning steps                        │   │
│   │ 4. Coordinate Activity Agents                            │   │
│   └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│              ┌───────────────┼───────────────┐                  │
│              ▼               ▼               ▼                  │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│   │ K8s Agent    │  │ Vault Agent  │  │ DNS Agent    │          │
│   │              │  │              │  │              │          │
│   │ Deploy       │  │ Create       │  │ Configure    │          │
│   │ runtimes     │  │ namespaces   │  │ routes       │          │
│   └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Multi-Cell Architecture

### CFM Manages Multiple Cells

```
┌─────────────────────────────────────────────────────────────────┐
│                    Connector Fabric Manager                      │
│                         (Centralized)                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Tenant Manager    Provision Manager    Activity Agents         │
│                                                                  │
└───────────┬─────────────────┬─────────────────┬─────────────────┘
            │                 │                 │
            │      NATS Jetstream (Messaging)   │
            │                 │                 │
            ▼                 ▼                 ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│    Cell 1     │   │    Cell 2     │   │    Cell 3     │
│   (EU-West)   │   │   (US-East)   │   │   (AP-South)  │
│               │   │               │   │               │
│  VPAs: 50     │   │  VPAs: 30     │   │  VPAs: 20     │
│  Status: OK   │   │  Status: OK   │   │  Status: OK   │
└───────────────┘   └───────────────┘   └───────────────┘
```

### VPA Distribution Across Cells

```
┌─────────────────────────────────────────────────────────────────┐
│                    VPA Distribution Example                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Participant: Acme Industries                                   │
│                                                                  │
│   Cell: EU-Central                                               │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ • Control Plane VPA (primary)                            │   │
│   │ • Credential Service VPA                                 │   │
│   │ • Data Plane VPA (API endpoints)                         │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│   Cell: Edge-Factory-Munich                                      │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ • Data Plane VPA (factory sensors)                       │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│   Cell: Edge-Factory-Stuttgart                                   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ • Data Plane VPA (factory sensors)                       │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Cell Configuration

### Cell Definition

```json
{
  "cellId": "cell-eu-west-1",
  "name": "EU West Production",
  "type": "kubernetes",
  "region": "eu-west-1",
  "provider": "aws",
  "capacity": {
    "maxVPAs": 100,
    "currentVPAs": 42
  },
  "infrastructure": {
    "kubernetes": {
      "cluster": "arn:aws:eks:eu-west-1:123456789:cluster/dataspace-prod",
      "namespace": "dataspace"
    },
    "vault": {
      "address": "https://vault.eu-west-1.example.com",
      "path": "dataspace/eu-west-1"
    },
    "database": {
      "host": "postgres.eu-west-1.example.com",
      "database": "dataspace_eu_west_1"
    }
  },
  "labels": {
    "environment": "production",
    "gdpr-compliant": "true",
    "tier": "standard"
  }
}
```

### Cell Selection

When provisioning a VPA, CFM selects an appropriate cell based on:

| Factor | Consideration |
|--------|---------------|
| **Capacity** | Does the cell have room for more VPAs? |
| **Location** | Is the cell in the required region? |
| **Compliance** | Does the cell meet regulatory requirements? |
| **Labels** | Does the cell match required labels? |
| **Affinity** | Should this VPA be co-located with others? |

---

## Infrastructure Requirements

### Per Cell

| Resource | Specification |
|----------|---------------|
| **Kubernetes** | 1.24+ with HPA/Keda support |
| **Nodes** | 3+ for HA (varies by load) |
| **Database** | PostgreSQL 14+ (managed or self-hosted) |
| **Vault** | HashiCorp Vault (managed or self-hosted) |
| **Network** | Ingress controller, TLS termination |

### For Edge Cells

| Resource | Specification |
|----------|---------------|
| **Compute** | Can be minimal (single node K3s) |
| **Network** | Must reach CFM and central cells |
| **Storage** | Local persistent storage |

---

## Monitoring Cells

### Key Metrics

| Metric | Description |
|--------|-------------|
| **VPA count** | Number of active VPAs in cell |
| **Request rate** | Requests per second by component |
| **Latency** | P50, P95, P99 latencies |
| **Error rate** | Failed requests percentage |
| **Resource utilization** | CPU, memory, network |

### Health Checks

CFM continuously monitors cell health:

```
┌─────────────────────────────────────────────────────────────────┐
│                    Cell Health Monitoring                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Cell: EU-West-1                                                │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ Status: HEALTHY                                          │   │
│   │                                                          │   │
│   │ Components:                                              │   │
│   │   Control Plane:     ✓ OK (5/5 replicas)                │   │
│   │   Data Plane:        ✓ OK (8/8 replicas)                │   │
│   │   Credential Service: ✓ OK (3/3 replicas)               │   │
│   │                                                          │   │
│   │ Infrastructure:                                          │   │
│   │   Database:          ✓ OK (latency: 2ms)                │   │
│   │   Vault:             ✓ OK (latency: 5ms)                │   │
│   │   NATS:              ✓ OK (connected)                   │   │
│   │                                                          │   │
│   │ Capacity:            42/100 VPAs (42%)                   │   │
│   │ Last heartbeat:      2 seconds ago                       │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## What's Next

- **[Virtual Participant Agents](/docs/architecture/core-concepts/virtual-participant-agents)** — The unit of deployment
- **[Understanding the Stack](/docs/architecture/understanding-the-stack)** — Traditional vs. Modern architecture
- **[Deployment Models](/docs/architecture/deployment-topologies)** — Practical deployment options
- **[Components Deep Dive](/docs/architecture/components)** — CFM details
