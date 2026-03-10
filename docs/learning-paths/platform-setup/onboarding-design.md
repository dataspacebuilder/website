---
sidebar_label: Onboarding Design
sidebar_position: 7
title: Onboarding Design
---

# Chapter 6: Designing the Onboarding Flow

Before you provision participants (next chapter), you need to know where the registration data comes from and who issues credentials. Provisioning is the technical act. Onboarding is the business + technical process that leads to it.

## Two Phases

| Phase | What happens | Who is responsible | Output |
|-------|-------------|-------------------|--------|
| **Legal onboarding** | Applicant provides company data, documents, consents. DSGA verifies membership policy compliance. | DSGA or its delegate (Registration Service) | Approved applicant with organizational identifier |
| **Technical onboarding** | Tenant and participant profile created. DID associated with identifier. Credentials issued and delivered. | You (the CSP), via CFM | Active participant context with credentials in Identity Hub |

Legal onboarding may happen outside your platform entirely — through a DSGA portal, an onboarding service provider, or a manual process. Your platform picks up where legal onboarding ends: you receive an approved applicant and provision their infrastructure.

## Issuer Service: Operate or Integrate?

The Issuer Service issues the verifiable credentials that participants need to interact in the dataspace. You have three options:

**You operate it.** Deploy the Eclipse EDC Issuer Service as part of your platform. Configure credential definitions per dataspace. CFM calls your Issuer Service during provisioning. You are the trust anchor (or delegate of the DSGA).

**External issuer.** The DSGA or a DTF operates the Issuer Service. Your CFM calls their API during provisioning. Credentials are delivered to the participant's Identity Hub. You integrate, not operate.

**Multiple issuers.** Membership credential from one issuer, certifications from another. Your platform coordinates issuance requests to each.

Which model applies depends on your agreement with the DSGA. Many DSaaS deployments start with a CSP-operated Issuer Service and add external issuers as the dataspace matures.

## Integration Points

### Registration Data → CFM

Your onboarding frontend or API collects:
- Company name, address, registration number
- Consents to terms and framework agreements
- Proof documents (if required)

Your backend maps this to CFM API calls:

```
Registration data  →  POST /api/v1alpha1/tenants
                       POST /api/v1alpha1/tenants/{id}/participant-profiles
```

The bridge between legal and technical onboarding is this mapping. Everything the applicant provided during registration becomes the input for tenant creation and participant profile deployment.

### Status Notifications

Onboarding is asynchronous. After the applicant submits their registration, multiple things happen in sequence — legal verification, CFM provisioning, credential issuance. Your platform needs to communicate progress.

Common patterns:
- **Polling** — the frontend polls CFM's participant profile endpoint until all activities reach `active` state
- **Webhook** — your backend sends a notification to a registered callback when onboarding completes or fails

## What the DSGA Must Define (Not Your Job)

Before you can implement onboarding, the DSGA must provide:

| Decision | You need it for |
|----------|----------------|
| Membership policies | Knowing what evidence to collect from applicants |
| Credential schemas | Configuring the Issuer Service (if you operate it) |
| Trust anchor list | Configuring which issuers the Control Plane accepts |
| Onboarding workflow | Knowing which steps are automated vs. manual |

These are governance inputs, not code. They become configuration in your Issuer Service, Control Plane policies, and onboarding frontend.

---

**Next:** [Provisioning Participants](./provisioning-participants.md)
