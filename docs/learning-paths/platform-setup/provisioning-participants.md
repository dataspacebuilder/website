---
sidebar_label: Provisioning Participants
sidebar_position: 8
title: Provisioning Participants
---

# Chapter 7: Provisioning Participants

When a new customer signs up for your EDCaaS, you provision them with two API calls.

Before provisioning participants, your platform needs baseline configuration: at least
one **cell** (a deployment zone — typically your k8s cluster) and one or more
**dataspace profiles**.
These are set up once during platform bootstrap via the Tenant Manager API.

## Step 1 — Create a tenant

A tenant represents your customer's organization.

```json
POST /api/v1alpha1/tenants
{
  "tenantId": "acme",
  "displayName": "ACME Corp",
  "description": "Manufacturing company"
}
```

## Step 2 — Deploy a participant profile

This triggers the full orchestration. A participant profile binds a tenant to a
cell, a DID identity, and one or more dataspace profiles. Dataspace profiles
are configured during platform bootstrap and define which dataspaces your
platform supports. A participant profile
can target a single dataspace or span multiple dataspaces with the same
identity.

```json
POST /api/v1alpha1/tenants/{tenantId}/participant-profiles
{
  "identifier": "did:web:ih.your-platform.io:acme",
  "cellId": "<cell-id>"
}
```

The DID format follows `did:web:<your-identity-hub-host>:<participant-name>`.

## What happens next

After this call, the orchestration engine:

1. Creates OAuth2 clients in your IDP
2. Stores secrets in your secret store
3. Creates participant contexts in the Control Plane and Identity Hub
4. Registers the participant at the credential issuer
5. Requests and stores the verifiable credential (e.g., MembershipCredential)

The process is asynchronous. Poll the participant profile endpoint to track
progress — provisioning is complete when all activities reach `active` state.

```
GET /api/v1alpha1/tenants/{tenantId}/participant-profiles/{profileId}
```

---

**Next:** [Customer Handoff](./customer-handoff.md)
