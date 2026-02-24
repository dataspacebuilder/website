---
sidebar_label: The Management API
sidebar_position: 4
title: The Management API
---

# Chapter 3: The Management API

The management API is your primary interface for all provider and consumer operations.
All endpoints live under:

```
{management-api-base}/participants/{participantContextId}/
```

For the full API reference, working samples, and detailed walkthroughs, see:

- [EDC Samples](https://github.com/eclipse-edc/Samples) — end-to-end examples
  covering assets, policies, negotiations, and transfers
- [EDC Documentation](https://eclipse-edc.github.io/documentation/) — complete
  API reference and concept explanations

### Key things to know

- All request and response bodies use **JSON-LD**. Every request must include
  `"@context": ["https://w3id.org/edc/connector/management/v2"]`.
- Policies use the **ODRL** vocabulary.
- Negotiations and transfers are **asynchronous** — you create them and poll for
  state changes.
- Contract negotiation policies must **exactly match** the offer from the catalog.

---

**Next:** [The Identity Hub](./identity-hub.md)
