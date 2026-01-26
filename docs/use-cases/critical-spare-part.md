---
title: Critical Spare Part Retrieval
description: Urgent access to supplier inventory data through trusted data sharing
keywords: [emergency access, inventory data, wind energy, credential verification]
displayed_sidebar: null
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Use Case: Critical Spare Part Retrieval

<div className="usecase-hero">
<div className="usecase-meta">
<span className="usecase-badge usecase-badge--energy">Energy & Utilities</span>
<span className="usecase-badge usecase-badge--intermediate">Intermediate</span>
</div>
</div>

> **TL;DR:** A wind farm operator needs urgent access to a supplier's inventory data to prevent costly downtime. This use case demonstrates how dataspaces enable rapid, trusted data exchange in emergency situations — **minutes instead of hours**.

---

## Context

A wind turbine at an offshore wind farm has a critical component failure. The operator needs to locate a replacement part immediately. Multiple suppliers may have the part in stock, but accessing their inventory systems requires:

- Proof of emergency status
- Verification of the operator's identity
- Agreement on terms of access
- Secure data transfer

Traditional approaches (phone calls, emails, manual portal logins) take hours. With a dataspace, this happens in minutes.

---

## Actors

| Actor | Role | What They Do |
|-------|------|--------------|
| **Wind Farm Operator** | Data Consumer | Needs inventory data to find parts |
| **Parts Supplier** | Data Provider | Has inventory data to share |
| **Dataspace Operator** | Trust Authority | Issues membership and emergency credentials |

---

## The Data Sharing Flow

### Step 1: Trust is Already Established

Before the emergency occurs:
- The wind farm operator joined the dataspace and received membership credentials
- They obtained "authorized maintenance operator" credentials
- The supplier registered their inventory API as a data asset in their catalog
- Access policies allow queries from verified maintenance operators

### Step 2: Emergency Occurs

The turbine fails. The operator needs part number `WT-BEARING-7450`.

### Step 3: Consumer Queries the Catalog

The operator's connector queries the supplier's catalog:

```
Consumer Control Plane → Supplier Control Plane
"What data assets are available?"

Response:
- Asset: "parts-inventory-api"
- Policy: Requires "maintenance-operator" credential
- Contract Definition: "emergency-access-terms"
```

### Step 4: Consumer Presents Credentials

During contract negotiation, the consumer's Identity Hub presents:

- Dataspace membership credential
- Maintenance operator credential
- Emergency access justification

The provider's policy engine verifies:
- Credentials are from trusted issuers
- Credentials haven't been revoked
- Attributes match the access policy

### Step 5: Contract Agreement

Both parties agree on terms:

```json
{
  "assetId": "parts-inventory-api",
  "policy": {
    "permission": [{
      "action": "read",
      "constraint": [{
        "leftOperand": "purpose",
        "operator": "eq",
        "rightOperand": "emergency-maintenance"
      }]
    }]
  }
}
```

### Step 6: Data Transfer

The consumer receives an access token and endpoint:

```
Consumer Data Plane → Supplier Data Plane
GET /inventory?partNumber=WT-BEARING-7450
Authorization: Bearer <transfer-token>

Response:
{
  "partNumber": "WT-BEARING-7450",
  "inStock": 3,
  "locations": ["Hamburg", "Rotterdam"],
  "leadTime": "24h"
}
```

### Step 7: Problem Solved

The operator identifies that Hamburg has the part. They arrange emergency shipping. The turbine is back online within 48 hours instead of waiting weeks for manual procurement.

---

## What the EDC Components Did

| Component | Function in This Use Case |
|-----------|--------------------------|
| **Identity Hub** | Stored and presented maintenance operator credentials |
| **Control Plane** | Handled catalog query and contract negotiation |
| **Policy Engine** | Verified credentials met the access requirements |
| **Data Plane** | Executed the secure API call with access token |

---

## Key Benefits

- **Speed** — Minutes instead of hours to access data
- **Trust** — Cryptographic verification of identity and credentials
- **Audit trail** — Every step is logged for compliance
- **Automation** — No manual approval needed when policies are met
- **Sovereignty** — Supplier maintained control over their data

---

## Architecture Layers in Action

| Layer | What Happened |
|-------|--------------|
| **Trust Framework** | Defined "maintenance operator" credential schema |
| **Trust Plane** | Verified credentials during negotiation |
| **Control Plane** | Negotiated contract, issued access token |
| **Data Plane** | Transferred inventory data securely |
| **Infrastructure** | Both parties hosted connectors (cloud/on-prem) |

---

## Extending This Use Case

This pattern applies to many urgent B2B data needs:

- **Healthcare** — Emergency access to patient records between facilities
- **Logistics** — Real-time shipment tracking across carriers
- **Finance** — Fraud detection data sharing between institutions
- **Manufacturing** — Supply chain disruption visibility

---

## Try It Yourself

<div className="usecase-cta-grid">
<a href="/architecture" className="usecase-cta-card">
<span className="usecase-cta-icon">🏗️</span>
<span className="usecase-cta-title">Architecture</span>
<span className="usecase-cta-desc">The five-layer stack</span>
</a>
<a href="/docs/architecture/control-plane" className="usecase-cta-card">
<span className="usecase-cta-icon">🎛️</span>
<span className="usecase-cta-title">Control Plane</span>
<span className="usecase-cta-desc">Deep dive into negotiation</span>
</a>
<a href="/docs/architecture/identity-hub" className="usecase-cta-card">
<span className="usecase-cta-icon">🔐</span>
<span className="usecase-cta-title">Identity Hub</span>
<span className="usecase-cta-desc">How credentials work</span>
</a>
</div>

---

<div className="usecase-nav">
<a href="/use-cases" className="usecase-nav-link">← Back to all use cases</a>
<a href="/docs/use-cases/green-steel-certification" className="usecase-nav-link">Next: Green Steel Certification →</a>
</div>
