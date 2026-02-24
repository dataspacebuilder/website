---
sidebar_label: FerroLink Gets
sidebar_position: 6
title: "Chapter 5: FerroLink Gets What It Needs"
---

# Chapter 5: FerroLink Gets What It Needs

FerroLink needs VeloForge's material certificate for alloy ALX88. They're building battery housings from that alloy and LumenDrive requires proof of material compliance.

FerroLink does three things:

1. **Browses the catalog.** Asks what VeloForge offers. Sees: material certificates, membership credential required.

2. **Negotiates a contract.** FerroLink's credentials are verified. VeloForge's policy is evaluated. A contract is agreed. No human involved. Takes seconds.

3. **Downloads the PDF** directly from VeloForge's data plane using the access token received through the contract.

No portal login. No API key. No custom integration. No manual approval. If FerroLink needs a document from a different supplier next week, the same three steps work.

### What happened under the hood

The three steps above map to three protocol phases:

| Phase | What happens |
|-------|-------------|
| **Catalog request** | FerroLink's control plane asks VeloForge's control plane for available offers. Credentials are exchanged and verified automatically. |
| **Contract negotiation** | An automated sequence: REQUESTED → AGREED → VERIFIED → FINALIZED. Both control planes record the agreement. |
| **Transfer** | FerroLink's control plane asks for data access. VeloForge's control plane signals VeloForge's data plane to issue an access token. FerroLink receives the token and the data plane URL — called an **EDR** (Endpoint Data Reference). |

FerroLink uses the EDR to download the PDF directly from VeloForge's data plane. The control planes coordinated the trust. The data plane delivered the data.

---

**Next:** [FerroLink Becomes a Provider Too](./ferrolink-provides.md)
