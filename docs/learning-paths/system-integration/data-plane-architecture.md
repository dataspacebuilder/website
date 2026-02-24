---
sidebar_label: Data Plane Architecture
sidebar_position: 6
title: Data Plane Architecture
---

# Chapter 5: Data Plane Architecture

The EDC architecture separates the Control Plane (which handles protocol
communication, catalog, contracts, and trust) from the Data Plane (which handles
actual data transfer). The two communicate through the **Data Plane Signaling** protocol.

The Control Plane handles trust, contracts, and protocol negotiation. The Data Plane handles
the actual data transfer using the wire protocol appropriate for the use case —
HTTP, streaming, file transfer, or others.

For the rationale behind this architecture and how it works, see the
[Data Plane Signaling blog post](https://eclipse-edc.github.io/blog/2026/01/19/data-plane-signaling/).

---

**Next:** [Deploying a Data Plane](./deploying-a-data-plane.md)
