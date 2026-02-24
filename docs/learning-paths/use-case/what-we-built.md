---
sidebar_label: What We Built
sidebar_position: 13
title: "Chapter 12: What We Built"
---

# Chapter 12: What We Built

| Company | What they do |
|---------|-------------|
| VeloForge Materials | Publishes material certificates |
| FerroLink Industries | Pulls material data, publishes component docs |
| QuantisSeal Labs | Publishes independent test reports |
| LumenDrive Motors | Pulls from all three providers |
| NebulaFlow Cloudworks | Pulls from all three for a different purpose |

Three providers with their own data planes. Two consumers. Zero bilateral integrations.

---

Every interaction followed the same pattern:

**Provider:** store document → describe in catalog → set policy

**Consumer:** browse catalog → negotiate contract → download document

---

| Before | After |
|--------|-------|
| New partner = new integration | New partner = issue a credential |
| Sharing = email or portal | Sharing = publish to catalog |
| Access = logins and API keys | Access = verifiable credentials |
| Revoking = disable accounts | Revoking = revoke credential |
| Updates = email everyone | Updates = notification + catalog |

---

Five companies built their parts independently. Each provider runs its own data plane. Each consumer runs its own workflow. They share no code and no infrastructure. They share a protocol, a credential type, and the policies defined by the TrustGrid Consortium.
