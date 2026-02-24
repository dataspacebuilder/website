---
sidebar_label: The Identity Hub
sidebar_position: 5
title: The Identity Hub
---

# Chapter 4: The Identity Hub

The Identity Hub manages your customer's decentralized identity — their DID,
key pairs, and verifiable credentials. In most cases, credentials are set up
during provisioning and you will not need to interact with the Identity Hub
directly.

However, you may need it when:

- **Checking credential status** — verify that your customer's credentials
  are valid and have not expired or been revoked.
- **Requesting additional credentials** — some dataspaces require multiple
  credentials (e.g., a membership credential plus a domain-specific
  certification). You can request these through the Identity Hub API.
- **Managing key pairs** — rotate keys or inspect the DID document.

The Identity Hub API is available at the URL provided by the CSP. For the
full API reference, see the
[EDC Documentation](https://eclipse-edc.github.io/documentation/).

---

**Next:** [Data Plane Architecture](./data-plane-architecture.md)
