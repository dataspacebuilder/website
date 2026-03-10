---
sidebar_label: Identity Provider Setup
sidebar_position: 6
title: Identity Provider Setup
---

# Chapter 5: Identity Provider Setup

Your identity provider must issue JWT access tokens with these custom claims at the
top level (not nested):

```json
{
  "role": "participant | provisioner | admin",
  "participant_context_id": "<context-id>",
  "scope": "management-api:read management-api:write ..."
}
```

Three logical roles exist:

| Role | Who | What they can do |
|------|-----|------------------|
| `admin` | Initial setup and emergency access | Full access to all APIs and all participants |
| `provisioner` | CFM and automation | Create/delete participant contexts, no access to participant data |
| `participant` | Customer's client app | Manage own assets, policies, contracts — scoped to their `participant_context_id` |

For details on scopes and access control, see the
[EDC-V Administration API documentation](https://github.com/eclipse-edc/Virtual-Connector/blob/main/docs/administration_api.md).

---

**Next:** [Onboarding Design](./onboarding-design.md)
