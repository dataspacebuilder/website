---
title: Green Steel Certification
description: Sharing sustainability credentials through controlled data access
keywords: [sustainability, green steel, CO2 emissions, supply chain, verifiable credentials]
displayed_sidebar: null
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Use Case: Green Steel Certification

<div className="usecase-hero">
<div className="usecase-meta">
<span className="usecase-badge usecase-badge--manufacturing">Manufacturing</span>
<span className="usecase-badge usecase-badge--advanced">Advanced</span>
</div>
</div>

> **TL;DR:** A steel manufacturer proves the sustainability of their products to downstream customers. Dataspaces enable trusted, verifiable sharing of batch-level compliance data with **cryptographic proof of authenticity**.

---

## Context

A car manufacturer requires proof that the steel in their vehicles comes from sustainable sources. They need:

- Batch-level CO2 emissions data
- Proof of renewable energy usage
- Certification chain from raw materials

The steel producer has this data but needs to:

- Share it securely with verified customers
- Maintain control over who accesses what
- Ensure data integrity and authenticity
- Support audit requirements

---

## Actors

| Actor | Role | What They Do |
|-------|------|--------------|
| **Steel Manufacturer** | Data Provider | Publishes batch documentation |
| **Car Manufacturer** | Data Consumer | Needs sustainability proof |
| **Certification Body** | Credential Issuer | Issues sustainability certificates |
| **Dataspace Operator** | Governance | Defines data sharing rules |

---

## The Data Sharing Flow

### Step 1: Credentials Are Issued

The certification body verifies the steel manufacturer's processes and issues:

```json
{
  "type": "GreenSteelCertificate",
  "issuer": "did:web:certificationbody.example",
  "credentialSubject": {
    "organization": "did:web:steelmaker.example",
    "certification": "ISO 14064-1",
    "scope": "Scope 1 & 2 emissions verified",
    "validUntil": "2026-12-31"
  }
}
```

### Step 2: Provider Publishes Data Assets

The steel manufacturer registers batch documentation in their catalog:

**Asset Definition:**
- Asset ID: `batch-sustainability-docs`
- Type: API endpoint returning batch-specific data
- Format: JSON-LD with embedded provenance

**Access Policy:**
- Requires: Customer membership credential
- Requires: Valid purchase order reference
- Usage: Purpose-bound to sustainability reporting

### Step 3: Consumer Discovers Available Data

The car manufacturer queries the catalog:

```
GET /catalog
Filter: type = "sustainability-documentation"

Response:
{
  "assets": [{
    "id": "batch-sustainability-docs",
    "description": "CO2 emissions and energy source data per batch",
    "policy": {
      "requires": ["customer-credential", "purchase-order"]
    }
  }]
}
```

### Step 4: Contract Negotiation

The consumer initiates negotiation with their credentials:

**Consumer Presents:**
- Dataspace membership credential
- Customer relationship credential (proving they buy from this supplier)
- Purchase order reference

**Provider Verifies:**
- Customer is in their approved customer list
- Purchase order exists and is active
- Consumer credentials are valid and not revoked

**Agreement Terms:**
```json
{
  "assetId": "batch-sustainability-docs",
  "constraints": [{
    "purpose": "sustainability-reporting",
    "retention": "audit-period-only",
    "redistribution": "prohibited"
  }]
}
```

### Step 5: Data Transfer with Provenance

The consumer requests specific batch data:

```
POST /transfer
{
  "assetId": "batch-sustainability-docs",
  "parameters": {
    "batchId": "STEEL-2026-001847",
    "purchaseOrder": "PO-CAR-2026-3892"
  }
}
```

**Response includes:**
```json
{
  "batchId": "STEEL-2026-001847",
  "emissions": {
    "co2PerTonne": 1.2,
    "unit": "tCO2e",
    "scope": ["scope1", "scope2"]
  },
  "energy": {
    "renewablePercentage": 78,
    "sources": ["wind", "solar", "grid"]
  },
  "certification": {
    "credential": "<embedded VC>",
    "verificationUrl": "did:web:certificationbody.example"
  },
  "provenance": {
    "timestamp": "2026-01-15T08:23:41Z",
    "signature": "<digital signature>"
  }
}
```

### Step 6: Consumer Uses Data

The car manufacturer can now:

- Include sustainability data in their own reports
- Prove supply chain compliance to regulators
- Respond to customer inquiries about product sustainability
- Pass audits with verifiable data lineage

---

## What the EDC Components Did

| Component | Function in This Use Case |
|-----------|--------------------------|
| **Identity Hub** | Stored sustainability certificate, presented customer credentials |
| **Catalog** | Published batch documentation offerings |
| **Control Plane** | Verified purchase order, negotiated usage terms |
| **Policy Engine** | Ensured purpose-bound access constraints |
| **Data Plane** | Transferred batch data with embedded provenance |

---

## Key Benefits

- **Verifiability** — Credentials prove certification is real
- **Granularity** — Batch-level data, not just company-level
- **Automation** — No manual document sharing
- **Audit readiness** — Complete data lineage
- **Control** — Usage constraints enforced by policy

---

## Handling Updates

Steel manufacturing is continuous. How does the dataspace handle updates?

### New Batches

Each batch gets its own entry. Consumers query for specific batch IDs tied to their purchase orders.

### Certificate Renewal

When the certification body renews the certificate:
1. New credential is issued to the steel manufacturer's Identity Hub
2. Old credential is revoked
3. Future verifications use the new credential
4. Historical data remains tied to the credential valid at time of production

### Policy Changes

If the steel manufacturer changes access terms:
1. Update the contract definition in the catalog
2. New requests use new terms
3. Existing agreements honor their original terms

---

## Architecture Layers in Action

| Layer | What Happened |
|-------|--------------|
| **Trust Framework** | Defined sustainability credential schema, authorized certification body |
| **Trust Plane** | Verified customer credentials, validated purchase order linkage |
| **Control Plane** | Negotiated purpose-bound access, recorded agreement |
| **Data Plane** | Transferred batch data with embedded signatures |
| **Infrastructure** | Both parties in cloud deployment with edge access |

---

## Industry Applications

This pattern applies across supply chains:

- **Automotive** — Battery materials provenance
- **Food & Beverage** — Farm-to-table traceability
- **Pharmaceuticals** — Drug ingredient sourcing
- **Textiles** — Cotton origin and labor standards
- **Electronics** — Conflict mineral compliance

---

## Next Steps

<div className="usecase-cta-grid">
<a href="/docs/architecture/trust-framework" className="usecase-cta-card">
<span className="usecase-cta-icon">🏛️</span>
<span className="usecase-cta-title">Trust Framework</span>
<span className="usecase-cta-desc">How credentials are governed</span>
</a>
<a href="/docs/architecture/control-plane" className="usecase-cta-card">
<span className="usecase-cta-icon">🎛️</span>
<span className="usecase-cta-title">Control Plane</span>
<span className="usecase-cta-desc">Contract negotiation details</span>
</a>
<a href="/docs/architecture/data-plane" className="usecase-cta-card">
<span className="usecase-cta-icon">📡</span>
<span className="usecase-cta-title">Data Plane</span>
<span className="usecase-cta-desc">How data transfers work</span>
</a>
</div>

---

<div className="usecase-nav">
<a href="/use-cases" className="usecase-nav-link">← Back to all use cases</a>
<a href="/docs/use-cases/critical-spare-part" className="usecase-nav-link">Previous: Critical Spare Part →</a>
</div>
