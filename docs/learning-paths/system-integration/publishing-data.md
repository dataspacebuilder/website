---
sidebar_label: Publishing Data
sidebar_position: 2
title: Publishing Data
---

# Chapter 1: Publishing Data

To make your customer's data available in a dataspace, you do three things:

1. **Create an asset** — describes what the customer offers (e.g., product passports,
   sensor data, API access). The asset includes a data address pointing to where
   the data is actually served.
2. **Define a policy** — controls who can access the asset, using ODRL. Policies
   are typically aligned with the dataspace's governance rules (e.g., requiring
   specific credentials such as a membership credential, a compliance
   certification, or a role-based credential).
3. **Create a contract definition** — binds an asset to a policy, making it
   discoverable in the catalog.

Once published, any participant in the dataspace with valid credentials can discover
the offering and negotiate access.

---

**Next:** [Consuming Data](./consuming-data.md)
