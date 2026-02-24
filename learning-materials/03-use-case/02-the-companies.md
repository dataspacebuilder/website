# Chapter 2: The Companies

Five companies. One supply chain.

| Company | What they do |
|---------|-------------|
| **LumenDrive Motors** | Builds electric vehicles. Needs documents from everyone upstream. |
| **FerroLink Industries** | Makes battery housings. Buys materials, sells components. Sits in the middle. |
| **VeloForge Materials** | Produces alloys. Creates a material certificate for every batch. |
| **QuantisSeal Labs** | Independent testing lab. Issues neutral test reports. |
| **NebulaFlow Cloudworks** | Runs analytics platforms. Consumes product data for dashboards. |

The **TrustGrid Consortium** operates the dataspace — defines the rules, credentials, and shared formats. Doesn't touch the data itself.

```
VeloForge Materials           QuantisSeal Labs
(material certificates)       (test reports)
        │                           │
        ▼                           ▼
FerroLink Industries ──────────────────────► LumenDrive Motors
(component documentation)                     (product passports)
        │                                          │
        └───────────┐                   ┌──────────┘
                    ▼                   ▼
              NebulaFlow Cloudworks
              (dashboards, analytics)
```

### Participants and identity

In a dataspace, each company is a **participant**. Every participant gets a unique digital identity — a **DID** (Decentralized Identifier) — that other participants can verify. Think of it as a tamper-proof business card that proves who you are during every interaction.

The TrustGrid Consortium also issues each participant a **verifiable credential** — a digitally signed proof of membership. This credential is what policies check when deciding whether to grant access.

No shared user database. No central login system. Each company carries its own identity and proves it on demand.

---

**Next:** [How a Dataspace Works](03-how-a-dataspace-works.md)
