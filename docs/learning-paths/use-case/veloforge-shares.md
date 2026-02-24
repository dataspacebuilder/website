---
sidebar_label: VeloForge Shares
sidebar_position: 5
title: "Chapter 4: VeloForge Shares a Certificate"
---

# Chapter 4: VeloForge Shares a Certificate

VeloForge has produced a batch of recycled aluminum alloy — batch ALX88. It comes with a material certificate: a PDF documenting composition, origin, recycling percentage, and regulatory compliance.

VeloForge does three things:

1. **Stores the PDF** on its own data plane. The document gets a label — ID, type, product name, validity dates. It doesn't go anywhere yet.

2. **Describes it in the catalog** by registering an asset. The asset is a description, not the document itself. Other companies can now see that it exists.

3. **Sets an access policy:** "Any company with an active membership credential may access this."

The certificate is now discoverable. Nobody has accessed it yet. The PDF sits on VeloForge's data plane, waiting for someone to negotiate a contract.

### What VeloForge created

Three objects in the control plane make a document available:

| Object | What it does |
|--------|-------------|
| **Asset** | Describes the data — name, type, and a pointer to where it's stored (the data plane URL) |
| **Policy** | Defines who may access it — based on credentials, not company names |
| **Contract definition** | Binds asset + policy into an offer that appears in the catalog |

The asset's pointer to the data plane is called a **DataAddress**. It tells the system where to fetch the actual document when a contract is agreed. The control plane never stores the document itself — only metadata and rules.

---

**Next:** [FerroLink Gets What It Needs](./ferrolink-gets.md)
