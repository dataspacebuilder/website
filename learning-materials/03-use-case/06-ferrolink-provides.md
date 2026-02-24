# Chapter 6: FerroLink Becomes a Provider Too

FerroLink machines battery housing BH-2026 from VeloForge's alloy. For that component, FerroLink creates its own documentation — assembly specs, safety data, quality records, and a reference to VeloForge's material certificate.

FerroLink follows the same three steps as VeloForge: store the PDF on its own data plane, describe it in the catalog, set access rules.

FerroLink's data plane is independent from VeloForge's — separate service, separate infrastructure, separate documents. Both connect to the shared catalog. Both follow the same protocol.

Two providers now. Two data planes. Both discoverable. Both accessible. Built independently.

### The data plane

A data plane is a small service that does two things:

1. **Handles signaling** from the control plane — receives a message when a transfer is authorized, and responds with an access token and endpoint URL.
2. **Serves data** to consumers — validates the token and delivers the document.

Each provider builds and runs their own data plane. Data Plane SDKs are available in Go, Java, Rust, and .NET that handle the signaling protocol — the provider only implements the part that stores and serves their specific data.

The control plane and data plane communicate through the **Data Plane Signaling** protocol. This is what keeps control (trust, contracts, policies) separate from data (storage, delivery, formats).

---

**Next:** [QuantisSeal Adds Trust](07-quantisseal-adds-trust.md)
