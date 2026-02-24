---
sidebar_label: Documents Get Updated
sidebar_position: 11
title: "Chapter 10: Documents Get Updated"
---

# Chapter 10: Documents Get Updated

VeloForge refines its recycling process for alloy ALX88. Recycled content goes from 80% to 87%. They issue a new version of the material certificate, place it on their data plane, and update the catalog.

How does FerroLink find out?

---

**Notifications.** When VeloForge updates the certificate, it sends a lightweight message: "New version of cert-ALX88 available." The message doesn't contain the document — just the reference. FerroLink then pulls the new version through the normal flow: catalog, contract, download.

FerroLink updates its own component documentation and notifies downstream. LumenDrive and NebulaFlow each react in turn.

```
VeloForge ──notify──► FerroLink ──notify──► LumenDrive
                                        ──► NebulaFlow
VeloForge ──notify──► NebulaFlow
QuantisSeal ──notify──► LumenDrive
                    ──► NebulaFlow
```

The chain stays in sync because each company reacts independently. Notifications don't bypass any step — they replace polling.

### Signals and data stay separate

This separation is a core principle:

| Layer | What it carries |
|-------|----------------|
| **Notification** | A signal — something changed, here's the reference |
| **Catalog** | Metadata — what's available and under what terms |
| **Contract** | Authorization — agreed access rights |
| **Data plane** | The actual document |

Notifications travel through the same infrastructure and follow the same credential and policy rules. A notification about a document you're not authorized to access won't reach you.

---

**Next:** [What Happens When Trust Changes](./trust-changes.md)
