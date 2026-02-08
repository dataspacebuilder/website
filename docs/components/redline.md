# Redline (UI / Backend-for-Frontend)

## What It Is

Redline is the **Backend-for-Frontend (BFF)** service that provides the web portal experience for dataspace participants and operators. It translates user actions into API calls to the Connector, Identity Hub, and management services — hiding protocol complexity behind an accessible interface.

**Repository**: [Metaform/redline](https://github.com/Metaform/redline)

## What Problem It Solves

The dataspace infrastructure — Connectors, Identity Hubs, Data Planes — is designed for machine-to-machine interaction. The APIs use JSON-LD, OAuth2, and protocol-specific message formats that are powerful but not designed for direct human use.

Redline bridges this gap. It provides the "product surface" that participants interact with day-to-day, while the protocols execute behind the scenes.

Without Redline (or an equivalent BFF), every participant would need to build their own UI layer or work directly with APIs — raising the barrier to adoption, especially for organizations without deep technical resources.

## How It Fits in the Architecture

```
Browser (User)
    │
    ↓
Redline (BFF) ──→ Keycloak (Authentication)
    │
    ├──→ Connector Management API
    ├──→ Identity Hub Identity API
    ├──→ CFM Administration API
    └──→ Issuer Admin API
```

Redline is the only internet-facing service in the participant's interaction path. It holds machine credentials and calls the backend APIs on behalf of logged-in users. The backend APIs themselves are not exposed directly to end users.

## Key Capabilities

### For Participants

- **Catalog browsing** — Discover available data offerings from other participants, filtered by access policies
- **Contract management** — Initiate contract negotiations, review terms, approve or reject requests
- **Credential management** — View and manage verifiable credentials, DIDs, and dataspace memberships
- **Data transfer** — Initiate and monitor data transfers under established contracts
- **Observability** — View negotiation history, transfer status, and audit logs (within tenant boundaries)

### For Operators

- **Tenant lifecycle management** — Create, configure, and manage participant contexts
- **Resource monitoring** — Monitor provisioned resources and runtime health
- **Credential issuance oversight** — Manage and oversee the issuance of base credentials

### Authentication

Redline integrates with **Keycloak** for authentication. Users authenticate to the portal through standard web flows (e.g., OpenID Connect). Redline then uses machine credentials (`client_credentials` OAuth2 flow) to call the backend APIs on behalf of the authenticated user.

This separation ensures that:
- Human authentication is handled by a mature IdP (Keycloak)
- API access uses machine credentials with proper scoping
- The principle of least privilege is maintained

## Architecture

Redline is a **Spring Boot** application that implements the BFF pattern:

- **Session management** — maintains user sessions and maps them to backend API contexts
- **API aggregation** — combines calls to multiple backend services into coherent UI workflows
- **Authorization mapping** — maps authenticated user roles to API scopes and participant contexts
- **Error handling** — translates API errors into user-friendly messages

The UI itself is a web application served by Redline, communicating with the BFF backend via REST endpoints.

## Complementary Reference: End-User API

For organizations building onboarding-focused UIs (particularly for SME onboarding), an alternative reference implementation exists:

**[FraunhoferISST/End-User-API](https://github.com/FraunhoferISST/End-User-API)** — an end-user onboarding demonstrator focused on simplified self-service for smaller organizations.

Both implementations share the same backend API surface — they differ in the UX approach and the target user persona.

## In JAD

In the [Get Started](../get-started.md) scenario, Redline is the interface you interact with. When you browse Company A's catalog as Company B, you're using Redline. When you click "request access," Redline translates that click into a DSP contract negotiation by calling the Connector's Management API. When you view your credentials, Redline queries the Identity Hub's Identity API.

The protocol complexity is there — but the user experience is a simple web portal.

## Key Concepts

| Concept | Description |
|---|---|
| **BFF (Backend-for-Frontend)** | An architecture pattern where a server-side service mediates between the frontend UI and multiple backend APIs |
| **Tenant** | An organization using the platform — the billing entity and support boundary |
| **Participant Profile** | A participant identity context (DID-backed) within a tenant |
| **Dataspace Profile** | Per-dataspace configuration: trust requirements, protocol versioning, policy alignment |

---

**Learn more**: [Redline repository](https://github.com/Metaform/redline) | [End-User API](https://github.com/FraunhoferISST/End-User-API)

**Related**: [Connector](./connector.md) | [Identity Hub](./identity-hub.md) | [CFM](./cfm.md)
