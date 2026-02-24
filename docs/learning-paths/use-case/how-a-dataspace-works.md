---
sidebar_label: How a Dataspace Works
sidebar_position: 4
title: "Chapter 3: How a Dataspace Works"
---

# Chapter 3: How a Dataspace Works

Three ideas.

**Publish once, let others find it.** VeloForge doesn't send its certificate to FerroLink directly. It publishes a description in a catalog. Any authorized company can browse the catalog and request it. VeloForge doesn't need to know in advance who will want it.

**Access requires a contract.** When FerroLink finds the certificate in the catalog, it can't just download it. The two companies negotiate a contract — automatically, through the protocol. FerroLink presents its credentials. VeloForge's policy is evaluated. If the credentials satisfy the policy, the contract goes through. No human involved.

**Data stays with its owner.** Documents are never stored centrally. VeloForge's certificate lives on VeloForge's infrastructure. When FerroLink gets access, it retrieves the document directly from VeloForge.

### The protocol

All of this runs on the **Dataspace Protocol (DSP)** — an open standard that defines how participants discover data, negotiate contracts, and transfer data between each other. DSP is to dataspaces what HTTP is to the web: the common language every participant speaks.

### The infrastructure

Each company connects to two things:

- A **control plane** — handles catalog, negotiation, credentials, and policies. This is the DSP layer.
- A **data plane** — stores and serves the actual documents. This is where data lives.

Companies can share a control plane hosted by a platform provider, or run their own. The protocol doesn't care. What matters is that control planes can talk to each other.

```
  TrustGrid Consortium
  (rules, credentials, formats)

  ┌─────────────────┐      ┌─────────────────┐
  │ Control Plane A  │◄─DSP─►│ Control Plane B  │
  │ (hosted)         │      │ (self-operated)  │
  └──┬─────┬─────┬──┘      └──┬──────────────┘
     │     │     │             │
  Velo   Ferro  Quanti     LumenDrive
  Forge  Link   Seal       data plane
  data   data   data
  plane  plane  plane

  NebulaFlow (consumer only — no data plane)
```

Providers run data planes. Consumers just need access to a control plane. DSP connects everything — across infrastructure boundaries.

---

**Next:** [VeloForge Shares a Certificate](./veloforge-shares.md)
