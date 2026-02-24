---
sidebar_label: Consuming Data
sidebar_position: 3
title: Consuming Data
---

# Chapter 2: Consuming Data

To access data from another participant, the flow follows the Dataspace Protocol:

1. **Query the catalog** — ask the provider's Control Plane (via the DSP endpoint)
   what data is available and under what terms.
2. **Negotiate a contract** — agree to the provider's terms. The negotiation is
   asynchronous and results in a contract agreement.
3. **Initiate a transfer** — request access to the data. In the simplest form,
   you get back an endpoint and a token to fetch it. Other transfer patterns
   like push and streaming are also supported.

If your customer needs to serve data (not just consume), they need a data plane.
The data plane is the component that actually handles data transfer — it runs
outside the EDCaaS platform, under your customer's control (or as a separate
CSP service). See [Data Plane Architecture](./data-plane-architecture.md) and
[Deploying a Data Plane](./deploying-a-data-plane.md).

---

**Next:** [The Management API](./management-api.md)
