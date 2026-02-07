---
sidebar_position: 4
title: Service Virtualization
description: How configuration-based isolation enables efficient multi-tenant operation without compromising trust boundaries.
---

# Service Virtualization

Service virtualization is the architectural pattern that enables efficient multi-tenant dataspace operation. Instead of running separate processes for each participant, a single runtime serves multiple participants through **configuration-based isolation**.

---

## The Problem with Process-Based Isolation

Traditional multi-tenant architectures spin up separate processes or containers for each tenant:

```
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│  Tenant A   │ │  Tenant B   │ │  Tenant C   │ │  Tenant D   │
│   Process   │ │   Process   │ │   Process   │ │   Process   │
├─────────────┤ ├─────────────┤ ├─────────────┤ ├─────────────┤
│ CP + DP + IH│ │ CP + DP + IH│ │ CP + DP + IH│ │ CP + DP + IH│
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘
      ↑               ↑               ↑               ↑
   Resources       Resources       Resources       Resources
   per tenant      per tenant      per tenant      per tenant
```

**Problems:**
| Issue | Impact |
|-------|--------|
| **Resource overhead** | Each tenant requires full infrastructure |
| **Scaling complexity** | Linear scaling with tenant count |
| **Operational burden** | Separate deployments to manage |
| **Migration difficulty** | Moving tenants requires redeployment |
| **Cost inefficiency** | Paying for idle capacity per tenant |

---

## The Service Virtualization Solution

Service virtualization shares infrastructure while maintaining strict isolation through configuration:

```
┌─────────────────────────────────────────────────────────────────┐
│                    Shared Runtime (EDC-V)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐           │
│   │ VPA A   │  │ VPA B   │  │ VPA C   │  │ VPA D   │   ...     │
│   │ (config)│  │ (config)│  │ (config)│  │ (config)│           │
│   └─────────┘  └─────────┘  └─────────┘  └─────────┘           │
│                                                                  │
│            Request → Load Config → Process → Response            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                    Shared Infrastructure
```

**How it works:**
1. Each request includes a **context identifier** (VPA ID)
2. Runtime loads the **VPA configuration** from persistent store
3. Request is processed with that VPA's credentials and policies
4. **Isolation is enforced through configuration**, not process boundaries

---

## Configuration-Based vs Process-Based

| Aspect | Process-Based | Configuration-Based |
|--------|---------------|---------------------|
| **Isolation method** | OS process boundaries | Context switching |
| **Resource usage** | High (per-tenant overhead) | Low (shared runtime) |
| **Scaling** | Linear with tenants | Sub-linear |
| **Migration** | Complex (move containers) | Simple (move config) |
| **Cold start** | Slow (container startup) | Fast (config load) |
| **Trust isolation** | Strong | Equally strong |

---

## How Context Isolation Works

### Request Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    Request Processing                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   1. Request arrives with context header                         │
│      ┌────────────────────────────────────────────┐             │
│      │ X-Participant-Context: tenant-a-vpa-001    │             │
│      └────────────────────────────────────────────┘             │
│                              │                                   │
│   2. Runtime loads VPA configuration                             │
│      ┌────────────────────────────────────────────┐             │
│      │ DID: did:web:tenant-a.com                  │             │
│      │ Policies: [policy-1, policy-2]             │             │
│      │ Credentials: vault://tenants/a/creds       │             │
│      │ Catalog: [asset-1, asset-2, ...]           │             │
│      └────────────────────────────────────────────┘             │
│                              │                                   │
│   3. Request processed in VPA context                            │
│      ┌────────────────────────────────────────────┐             │
│      │ • Load credentials from Vault              │             │
│      │ • Apply tenant-specific policies           │             │
│      │ • Access tenant-specific catalog           │             │
│      │ • Log to tenant-specific audit trail       │             │
│      └────────────────────────────────────────────┘             │
│                              │                                   │
│   4. Response returned                                           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### What's Isolated

| Resource | Isolation Method |
|----------|------------------|
| **Identity (DID)** | Per-VPA configuration |
| **Credentials** | Separate Vault paths/namespaces |
| **Policies** | Per-VPA policy definitions |
| **Catalog** | Per-VPA asset and contract definitions |
| **Contracts** | Per-VPA contract agreements |
| **State** | Per-VPA database schemas or row-level security |
| **API paths** | `/participants/{participantId}/...` |

---

## The Virtualization Model

The data model that enables service virtualization:

```
┌─────────────────────────────────────────────────────────────────┐
│                         Tenant                                   │
│                    (Organization)                                │
└───────────────────────────┬─────────────────────────────────────┘
                            │ 1..N
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Participant Profile                           │
│                    (DID-bound identity)                          │
└───────────────────────────┬─────────────────────────────────────┘
                            │
              ┌─────────────┴─────────────┐
              │ 1..N                      │ 1..N
              ▼                           ▼
┌─────────────────────────┐   ┌─────────────────────────┐
│    Dataspace Profile    │   │  Virtual Participant    │
│    (per-dataspace       │   │       Agent (VPA)       │
│     configuration)      │   │                         │
│                         │   │  • Type: CP/DP/IH/IS    │
│  • Policies             │   │  • Target Cell          │
│  • Credentials          │   │  • Configuration        │
│  • Protocol version     │   │                         │
└─────────────────────────┘   └───────────┬─────────────┘
                                          │ targets
                                          ▼
                              ┌─────────────────────────┐
                              │          Cell           │
                              │   (Deployment Zone)     │
                              │                         │
                              │  • Kubernetes cluster   │
                              │  • Shared runtimes      │
                              │  • Local state store    │
                              └─────────────────────────┘
```

### Key Relationships

| Relationship | Meaning |
|--------------|---------|
| Tenant → Participant Profile | Organization can have multiple identities |
| Participant Profile → Dataspace Profile | One identity can participate in multiple dataspaces |
| Participant Profile → VPA | One identity is served by multiple VPAs (CP, DP, IH) |
| VPA → Cell | Each VPA is deployed to a specific cell |

---

## Benefits of Service Virtualization

### 1. Efficient Resource Utilization

```
Process-Based (100 tenants):
  100 × (CP + DP + IH) = 300 containers
  Each with memory overhead, idle CPU cycles

Configuration-Based (100 tenants):
  1 × (CP runtime + DP runtime + IH runtime) = 3 deployments
  Scaled horizontally based on actual load
```

### 2. Simple Migration

Moving a VPA between cells:

```
Step 1: Export VPA config from Cell A
Step 2: Update DNS/routing
Step 3: Import VPA config to Cell B

No container redeployment
No data migration (credentials stay in Vault)
Zero or minimal downtime
```

### 3. Fast Tenant Onboarding

```
Traditional:
  1. Provision infrastructure     (minutes to hours)
  2. Deploy containers            (minutes)
  3. Configure networking         (minutes)
  4. Set up credentials           (minutes)
  Total: 30+ minutes

Service Virtualization:
  1. Create VPA record            (milliseconds)
  2. Write credentials to Vault   (seconds)
  3. Configure DNS                (seconds)
  Total: < 1 minute
```

### 4. Consistent Operations

- Single runtime version across all tenants
- Centralized monitoring and alerting
- Unified update process
- Consistent security patching

---

## Trust Preservation

A critical requirement: **virtualization must not compromise trust isolation**.

### How Trust is Preserved

```
┌─────────────────────────────────────────────────────────────────┐
│             TRUST ISOLATION GUARANTEE                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   VPA A (Company A)                VPA B (Company B)             │
│   ┌─────────────────────┐         ┌─────────────────────┐       │
│   │                     │         │                     │       │
│   │  DID: did:web:a.com │         │  DID: did:web:b.com │       │
│   │                     │         │                     │       │
│   │  Vault: /a/creds    │ ← NO →  │  Vault: /b/creds    │       │
│   │                     │  ACCESS │                     │       │
│   │  Policies: A's      │ ← NO →  │  Policies: B's      │       │
│   │                     │  CROSS  │                     │       │
│   │  Catalog: A's       │ ← NO →  │  Catalog: B's       │       │
│   │                     │  LEAK   │                     │       │
│   └─────────────────────┘         └─────────────────────┘       │
│                                                                  │
│   The runtime NEVER:                                             │
│   • Loads A's credentials when processing B's request           │
│   • Applies A's policies to B's negotiations                    │
│   • Exposes A's catalog entries to B's queries                  │
│   • Mixes state between VPA contexts                            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Trust Isolation Mechanisms

| Mechanism | Implementation |
|-----------|----------------|
| **Credential isolation** | Separate Vault paths with strict ACLs |
| **Policy isolation** | VPA-scoped policy definitions |
| **Catalog isolation** | Per-VPA asset and contract definitions |
| **State isolation** | Database schemas or row-level security |
| **Request isolation** | Context loaded fresh per request |
| **Audit isolation** | Per-VPA audit trails |

---

## Implementation in CFM

The Connector Fabric Manager orchestrates service virtualization:

```
┌─────────────────────────────────────────────────────────────────┐
│                    CFM Provisioning Flow                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   1. Tenant Manager receives "Create VPA" request               │
│      └─▶ Validates tenant, creates VPA record                   │
│                                                                  │
│   2. Provision Manager orchestrates setup                        │
│      └─▶ Coordinates Activity Agents                            │
│                                                                  │
│   3. Vault Agent creates credential namespace                    │
│      └─▶ /tenants/{tenant}/vpas/{vpa}/creds                    │
│                                                                  │
│   4. K8s Agent updates ConfigMaps                                │
│      └─▶ VPA config available to runtimes                       │
│                                                                  │
│   5. DNS Agent configures routing                                │
│      └─▶ tenant.dataspace.example → Cell ingress                │
│                                                                  │
│   6. VPA is ACTIVE                                               │
│      └─▶ Requests can now be processed                          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## When to Use Service Virtualization

| Scenario | Recommendation |
|----------|----------------|
| **DSaaS provider** | ✓ Essential—this is the core value proposition |
| **Large enterprise (10+ BUs)** | ✓ Recommended for operational efficiency |
| **Consortium dataspace** | ✓ Recommended for shared infrastructure |
| **Small deployment (< 5 tenants)** | ○ Optional—traditional may be simpler |
| **Edge deployment** | ○ May use simplified virtualization |
| **Strict isolation requirements** | ✓ Works—trust isolation is preserved |

---

## What's Next

- **[Virtual Participant Agents](/docs/architecture/core-concepts/virtual-participant-agents)** — The unit of deployment
- **[Cells & Infrastructure](/docs/architecture/core-concepts/cells-infrastructure)** — Deployment zones
- **[Understanding the Stack](/docs/architecture/understanding-the-stack)** — Traditional vs. Modern
- **[Components Deep Dive](/docs/architecture/components)** — CFM implementation details
