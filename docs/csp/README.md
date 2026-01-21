# Cloud Service Provider Guide

> Build and operate dataspace services at scale

---

## Why Offer Dataspace Services?

The digital economy is shifting from siloed cloud storage to **sovereign data sharing**. As a Cloud Service Provider, you have the infrastructure, the customer relationships, and the operational expertise to become an essential orchestrator of trusted industrial ecosystems.

### The Business Opportunity

| Opportunity | Impact |
|-------------|--------|
| **New Revenue Streams** | Move from commodity storage to high-value "Dataspace-as-a-Service" |
| **Customer Stickiness** | Become the trusted platform for your customers' entire partner ecosystem |
| **Competitive Differentiation** | Offer capabilities that hyperscalers don't prioritize for European sovereignty |
| **Compliance Leadership** | Position as the go-to provider for Data Act and industry compliance |

### Market Drivers

- **EU Data Act (2025)** requires data portability and B2B data sharing capabilities
- **Industry Initiatives** like Catena-X, Manufacturing-X, and DECADE-X create demand for hosted dataspace services
- **SME Adoption** requires low-barrier, managed solutions—your sweet spot

---

## What You'll Offer

As a CSP implementing the Trusted Data Sharing Stack, you provide:

### 1. Connector-as-a-Service
Managed EDC connectors for each tenant organization, handling:
- Data catalog management and publishing
- Contract negotiation and policy enforcement
- Secure data transfer coordination

### 2. Identity & Trust Infrastructure
Operated Identity Hub services providing:
- Decentralized Identifier (DID) management
- Verifiable Credential issuance and verification
- Automated trust establishment between participants

### 3. Multi-Tenant Platform
Efficient infrastructure serving thousands of tenants:
- Shared control plane (EDC-V) for cost efficiency
- Isolated data planes for security and compliance
- Automated provisioning and lifecycle management

---

## The Stack for CSPs

```
┌─────────────────────────────────────────────────────────────┐
│                    Your CSP Platform                        │
├─────────────────────┬───────────────────────────────────────┤
│  CSP Management UI  │        Tenant Portal (Redline)        │
├─────────────────────┴───────────────────────────────────────┤
│              EDC-V (Virtualized Control Plane)              │
├─────────────────────────────────────────────────────────────┤
│                Connector Fabric Manager (CFM)               │
├─────────────────────────────────────────────────────────────┤
│              Your Infrastructure (K8s, DBs, etc.)           │
└─────────────────────────────────────────────────────────────┘
```

---

## Getting Started

### Assessment Checklist

Before you begin, evaluate your readiness:

- [ ] Kubernetes infrastructure available (or planned)
- [ ] PostgreSQL or compatible database
- [ ] Secret management (Vault or equivalent)
- [ ] Ingress/load balancer capabilities
- [ ] Team capacity for integration project
- [ ] Initial pilot customers identified

### Quick Start Path

1. **[Read the Business Case](business-value.md)** — Understand the value proposition in detail
2. **[Architecture Overview](architecture.md)** — Learn how the components fit together
3. **[Quick Start Guide](quickstart.md)** — Deploy your first multi-tenant environment
4. **[Operations Guide](operations.md)** — Plan for production operations

---

## Maturity Levels

CSPs typically progress through three levels of sophistication:

### Level 1: Standalone Connectors
Deploy individual EDC instances per customer. Good for pilots and large enterprise customers with dedicated needs.

### Level 2: Multi-Tenant Platform (Target)
Use EDC-V and CFM for efficient multi-tenancy. Manage thousands of tenants on shared infrastructure. **This is where the business model scales.**

### Level 3: Industrial Fabric
Add specialized data planes (OPC UA, Industrial IoT), advanced identity verification, and deep compliance automation. Serve demanding industrial use cases.

---

## Key Sections

| Section | What You'll Learn |
|---------|-------------------|
| [Business Value](business-value.md) | ROI analysis, pricing models, go-to-market |
| [Quick Start](quickstart.md) | Step-by-step deployment guide |
| [Architecture](architecture.md) | Technical deep-dive on components |
| [Operations](operations.md) | Running the platform in production |
| [Case Studies](case-studies.md) | Real-world implementations |

---

## Next Steps

→ **[Business Value Deep Dive](business-value.md)** — Make the case internally

→ **[Quick Start Guide](quickstart.md)** — Get hands-on with a pilot deployment
