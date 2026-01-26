---
sidebar_position: 4
title: Control Plane
description: Contract negotiation and policy enforcement in dataspaces
---

# Control Plane

The Control Plane handles the business logic of data sharing. It manages catalogs, negotiates contracts, and enforces policies — all before any data moves.

---

## What Does the Control Plane Do?

The Control Plane is responsible for:

- **Catalog management** — Publishing and discovering data offerings
- **Contract negotiation** — Agreeing on terms between parties
- **Policy evaluation** — Checking if requests meet access requirements
- **Agreement management** — Tracking what was agreed

---

## Key Concepts

### Catalog

The catalog describes what data a provider offers:

- **Assets** — References to actual data (APIs, files, databases)
- **Policies** — Conditions for accessing each asset
- **Contract Definitions** — Combinations of assets and policies

Consumers query the catalog to discover available data and its terms.

### Contract Negotiation

A structured conversation between provider and consumer:

1. **Consumer requests** — "I want access to asset X under policy Y"
2. **Provider evaluates** — Check consumer credentials against policy
3. **Agreement or rejection** — Terms are accepted or denied
4. **Contract Agreement** — Binding record of what was agreed

### Policies

Machine-readable rules that govern access:

- **Who can access** — Based on credentials, roles, or attributes
- **What they can do** — Read, transform, redistribute
- **How long** — Time-limited access
- **For what purpose** — Purpose-bound usage constraints

---

## The Dataspace Protocol (DSP)

The Control Plane implements the Dataspace Protocol:

### Catalog Protocol

- `GET /catalog` — Query available offerings
- Request specific assets or browse all offerings
- Federated catalog support for multi-provider discovery

### Contract Negotiation Protocol

```
Consumer                    Provider
    |                           |
    |--- Contract Request ----->|
    |                           | (evaluate policy)
    |<-- Contract Offer --------|
    |                           |
    |--- Contract Agreement --->|
    |                           |
    |<-- Contract Agreement ----|
    |                           |
```

### Transfer Process Protocol

After agreement, initiate the actual data transfer:

- Request transfer of agreed asset
- Receive endpoint and credentials
- Data plane handles the rest

---

## Policy Types

### Access Policies

Control who can negotiate for an asset:

- Membership in a specific dataspace
- Specific credentials or certifications
- Organizational attributes (location, industry, size)

### Contract Policies

Terms that apply during the agreement:

- Usage purpose constraints
- Time-limited access windows
- Geographic restrictions
- Prohibition on redistribution

### Usage Policies (ODRL)

Express complex constraints using ODRL vocabulary:

```json
{
  "permission": [{
    "action": "use",
    "constraint": [{
      "leftOperand": "dateTime",
      "operator": "lt",
      "rightOperand": "2025-12-31"
    }]
  }]
}
```

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│                  Control Plane                   │
├─────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────────────────┐   │
│  │   Catalog   │  │   Contract Negotiation  │   │
│  │   Service   │  │   State Machine         │   │
│  └─────────────┘  └─────────────────────────┘   │
│                                                  │
│  ┌─────────────┐  ┌─────────────────────────┐   │
│  │   Policy    │  │   Transfer Process      │   │
│  │   Engine    │  │   Manager               │   │
│  └─────────────┘  └─────────────────────────┘   │
├─────────────────────────────────────────────────┤
│              External Interfaces                 │
│  • DSP API  • Management API  • Identity Hub    │
└─────────────────────────────────────────────────┘
```

---

## Control Plane States

### Contract Negotiation States

- `REQUESTED` — Consumer has requested negotiation
- `OFFERED` — Provider has made an offer
- `AGREED` — Both parties agree
- `VERIFIED` — Agreement is verified and valid
- `FINALIZED` — Negotiation complete
- `TERMINATED` — Negotiation failed or canceled

### Transfer Process States

- `REQUESTED` — Consumer has requested transfer
- `STARTED` — Data plane is transferring
- `COMPLETED` — Transfer finished successfully
- `TERMINATED` — Transfer failed or was stopped

---

## Key Benefits

- **Separation of concerns** — Business logic separate from data movement
- **Auditability** — All negotiations are logged
- **Policy enforcement** — Rules are checked automatically
- **Standard protocol** — Interoperable across implementations

---

## Next Steps

- [Data Plane](/docs/architecture/data-plane) — How data actually moves
- [Identity Hub](/docs/architecture/identity-hub) — How identity enables negotiation
- [Critical Spare Part](/docs/use-cases/critical-spare-part) — See negotiation in action
