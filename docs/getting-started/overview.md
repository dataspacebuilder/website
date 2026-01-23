# Quick Overview

> Understand the Trusted Data Sharing Stack in 5 minutes

---

## What Is This?

The **Trusted Data Sharing Stack** is a set of open-source components that enable organizations to share data securely and at scale. It's built on industry standards and designed to be operated by Cloud Service Providers as a managed offering.

---

## The Problem We Solve

Organizations need to share data with partners, but today's approaches don't scale:

| Current Approach | Problem |
|-----------------|---------|
| **Email** | No control, no audit trail |
| **Custom APIs** | Expensive, per-partner integration |
| **EDI** | Rigid, expensive, enterprise-only |
| **Shared drives** | Security nightmare |

**Result:** Organizations either over-share (risk) or under-share (missed opportunities).

---

## Our Solution

A standardized infrastructure for controlled data sharing:

```
┌──────────────────────────────────────────────────────────────────┐
│                    Trusted Data Sharing Stack                    │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│   │ Organization │◀──▶│  Dataspace   │◀──▶│ Organization │      │
│   │      A       │    │  Platform    │    │      B       │      │
│   └──────────────┘    └──────────────┘    └──────────────┘      │
│                                                                  │
│   • Identity verified automatically                             │
│   • Contracts negotiated in seconds                             │
│   • Data flows securely                                         │
│   • Access auditable and revocable                             │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## How It Works

### 1. Publish
Organizations make data available with policies defining who can access and how.

### 2. Discover
Partners browse the catalog to find relevant data offerings.

### 3. Negotiate
Automated contract negotiation based on machine-readable policies.

### 4. Transfer
Secure data exchange with full audit trail.

---

## Key Components

| Component | What It Does |
|-----------|-------------|
| **EDC-V** | Multi-tenant control plane managing thousands of organizations |
| **CFM** | Connector Fabric Manager for tenant lifecycle and orchestration |
| **Identity Hub** | Decentralized identity and credential management |
| **Data Planes** | Specialized engines for different data transfer scenarios |

---

## Who Uses This?

### Cloud Service Providers
Operate the stack as a managed service, offering "Dataspace-as-a-Service" to customers.

### Adopters
Organizations participating in dataspaces as data providers and/or consumers.

### Consultants
Help organizations design, implement, and adopt dataspace solutions.

---

## Built on Open Standards

| Standard | Purpose |
|----------|---------|
| **Dataspace Protocol (DSP)** | Catalog, negotiation, transfer |
| **Decentralized Claims Protocol (DCP)** | Identity and credentials |
| **W3C DID/VC** | Decentralized identifiers |

---

## Next Steps

| Your Role | Start Here |
|-----------|------------|
| Cloud Provider | [CSP Guide](../csp/README.md) |
| Participant | [Adopter Guide](../adopters/README.md) |
| Consultant | [Consultant Guide](../consultants/README.md) |
| Want to see it working | [MVD Demo](mvd-demo.md) |
| Need background | [Key Concepts](concepts.md) |
