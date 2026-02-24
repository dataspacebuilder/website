# Chapter 8: LumenDrive Assembles the Picture

LumenDrive Motors needs documentation from across the supply chain to build compliance packages for its vehicles.

LumenDrive queries three catalogs, negotiates three contracts, downloads three PDFs — each pulled directly from its source:

| Document | Source |
|----------|--------|
| Material certificate for ALX88 | VeloForge |
| Component documentation for BH-2026 | FerroLink |
| Test report for BH-2026 | QuantisSeal |

Same flow each time: discover, negotiate, download. Together these form the basis of a Digital Product Passport.

Adding a new supplier next month means one more catalog query — not a new integration project.

### How LumenDrive reaches different providers

Each provider has a **DSP endpoint** — the address where their control plane accepts protocol messages. To query a provider's catalog, a consumer points its request at that endpoint.

LumenDrive's control plane sends three separate catalog requests — one to each provider's DSP endpoint. Each request triggers the same protocol: credential exchange, policy evaluation, offer listing. The responses come back independently.

All of this happens through a single **management API** on LumenDrive's own control plane. LumenDrive doesn't talk to three different APIs with three different formats. It talks to its own control plane, which speaks DSP to each provider on LumenDrive's behalf.

---

**Next:** [NebulaFlow Sees Everything](09-nebulaflow-sees-everything.md)
