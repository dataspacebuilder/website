# Adopter Guide

> Participate in digital ecosystems with trusted data sharing

---

## Why Dataspaces Matter for Your Organization

Your organization exchanges data with partners, suppliers, and customers every day. But today's approaches have critical limitations:

| Current Approach | The Problem |
|------------------|-------------|
| Email attachments | No control after sending, no audit trail |
| Point-to-point APIs | Expensive to build, maintain, and scale |
| EDI systems | Rigid, legacy, limited to large enterprises |
| Shared drives | Security risks, version chaos |

**Dataspaces solve this** by providing a standardized, secure way to share data while maintaining control over who accesses it and how it's used.

---

## What You Get

As an adopter using the [Eclipse Dataspace Components](https://eclipse-edc.github.io/documentation/for-adopters/), you gain:

### Data Sovereignty
- **You control access** — Define policies that govern who can see and use your data
- **Revocable permissions** — Withdraw access at any time
- **Usage enforcement** — Technical guarantees, not just legal contracts

### Simplified Collaboration
- **Standard interfaces** — Connect once, collaborate with many partners
- **Automated negotiation** — Contracts agreed in seconds, not weeks
- **Trust by design** — Partner credentials verified automatically

### Compliance Built-In
- **Audit trails** — Complete record of all data exchanges
- **Policy automation** — Compliance rules enforced technically
- **EU Data Act ready** — Meet regulatory requirements

---

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                    Your Organization                            │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐       │
│  │ Your Data   │────▶│ Connector   │◀───▶│ Dataspace   │       │
│  │ Sources     │     │ (Managed)   │     │ Ecosystem   │       │
│  └─────────────┘     └─────────────┘     └─────────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

1. **Your data stays with you** — The connector accesses your data on demand
2. **Managed service** — Your CSP operates the connector infrastructure
3. **You define policies** — Control access through a simple interface
4. **Partners discover and request** — Standard protocol for negotiation
5. **Data transfers securely** — End-to-end protected exchanges

---

## The Journey: From Zero to Value

### Step 1: Getting Started (Day 1)
- Sign up with your dataspace provider
- Your connector is provisioned automatically
- Log into your dashboard

### Step 2: Publishing Data (Day 1-2)
- Connect your data sources
- Define what to share and with whom
- Set access policies

### Step 3: Discovering Partners (Week 1)
- Browse the dataspace catalog
- Find data offered by partners
- Request access to relevant assets

### Step 4: Establishing Trust (Week 1-2)
- Your credentials are verified automatically
- Contract terms are negotiated
- Access is granted or refined

### Step 5: Exchanging Data (Ongoing)
- Data flows according to agreements
- Usage is logged and auditable
- Policies are enforced continuously

---

## Use Cases by Role

### For CTOs
*"How does this fit our technical architecture?"*

- Cloud-native, API-first design integrates with modern stacks
- No on-premise infrastructure required (managed service)
- Standards-based—avoid vendor lock-in
- Scales from pilot to production seamlessly

[→ Technical Integration Guide](integration.md)

### For Product Managers
*"What new products and services can we enable?"*

- Access partner data to enhance your offerings
- Monetize your data assets through controlled sharing
- Accelerate innovation with ecosystem data
- Build data-driven features faster

[→ Use Case Examples](use-cases.md)

### For Innovation Managers
*"How do we start exploring dataspaces?"*

- Low-risk pilot with managed service
- No capital investment required
- Quick time-to-value (days, not months)
- Scale based on proven results

[→ Getting Started Guide](quickstart.md)

---

## Common Questions

### Do I need to host any infrastructure?
**No.** Your connector runs as a managed service. You just configure it through a web interface and connect your data sources.

### How is this different from an API?
APIs are point-to-point and require custom integration for each partner. Dataspaces provide a **standard protocol** so you can connect with any participant—present or future—through the same interface.

### What about data security?
Your data is **never stored** in the dataspace infrastructure. The connector coordinates access but the actual data flows directly between you and your partners, encrypted end-to-end.

### How do contracts work?
Contracts are **automated and machine-readable**. You define policies (who can access, for what purpose, for how long), and the system enforces them. No manual legal review for routine exchanges.

---

## Key Sections

| Section | What You'll Learn |
|---------|-------------------|
| [Why Dataspaces?](why-dataspaces.md) | Deep dive on the value proposition |
| [Quick Start](quickstart.md) | Get your first data exchange working |
| [Publishing Data](publishing-data.md) | Share your data assets |
| [Consuming Data](consuming-data.md) | Access partner data |
| [Integration](integration.md) | Connect with your systems |
| [Use Cases](use-cases.md) | Real-world examples |

---

## Next Steps

→ **[Quick Start Guide](quickstart.md)** — Set up your first data exchange in under an hour

→ **[Why Dataspaces?](why-dataspaces.md)** — Make the business case internally
