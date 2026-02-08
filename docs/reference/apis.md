# Reference: APIs

## Overview

The EDC stack exposes several APIs for different purposes and audiences. All administration APIs are designed for **machine clients** (UI backends, automation tools), not direct human interaction.

**Authentication**: All APIs (except Observability) use OAuth2 `client_credentials` flow. Tokens carry `role` and `participant_context_id` claims for access control.

## Control Plane APIs

### Management API

The primary API for managing assets, policies, contracts, and transfers.

| | |
|---|---|
| **Exposed by** | Connector (Control Plane) |
| **Content type** | JSON-LD |
| **Authentication** | OAuth2 (`participant`, `provisioner`) |
| **Base path** | `/api/management/v3/` |

**Key resource endpoints**:

| Resource | Path | Operations |
|---|---|---|
| Assets | `/assets` | Create, read, update, delete data assets |
| Policy Definitions | `/policydefinitions` | Define access and contract policies |
| Contract Definitions | `/contractdefinitions` | Combine assets with policies into offers |
| Catalog | `/catalog/request` | Query another participant's catalog |
| Contract Negotiations | `/contractnegotiations` | Initiate and monitor negotiations |
| Contract Agreements | `/contractagreements` | View established agreements |
| Transfer Processes | `/transferprocesses` | Initiate, monitor, and manage transfers |
| EDRs | `/edrs` | Manage Endpoint Data References |

**Documentation**: [EDC Management API](https://eclipse-edc.github.io/documentation/for-adopters/control-plane/)

### Federated Catalog API

Query the aggregated federated catalog of data offerings.

| | |
|---|---|
| **Exposed by** | Control Plane (optional component) |
| **Content type** | JSON |
| **Authentication** | OAuth2 (`participant`) |

| Endpoint | Method | Description |
|---|---|---|
| `/federatedcatalog` | POST | Query with filter criteria |

## Identity Hub APIs

### Identity API

Manage DIDs, key pairs, and verifiable credentials.

| | |
|---|---|
| **Exposed by** | Identity Hub |
| **Content type** | JSON |
| **Authentication** | OAuth2 (`participant`, `provisioner`) |

**Key resource endpoints**:

| Resource | Path | Operations |
|---|---|---|
| DIDs | `/participants/{id}/dids` | Create, list, manage DIDs |
| Key Pairs | `/participants/{id}/keypairs` | Create, rotate, revoke keys |
| Credentials | `/participants/{id}/credentials` | Store, list, manage VCs |

**Documentation**: [EDC Identity Hub](https://eclipse-edc.github.io/documentation/for-adopters/identity-hub/)

### Issuer Admin API

Manage credential issuance workflows (for organizations operating an issuer service).

| | |
|---|---|
| **Exposed by** | Issuer Service |
| **Content type** | JSON-LD |
| **Authentication** | OAuth2 (`provisioner`) |

| Resource | Path | Operations |
|---|---|---|
| Holders | `/holders` | Manage credential holders |
| Attestations | `/attestations` | Define credential attestation types |
| Credential Definitions | `/credentialdefinitions` | Configure credential schemas |

## Observability API

Health and readiness endpoints for monitoring.

| | |
|---|---|
| **Exposed by** | All components |
| **Content type** | JSON |
| **Authentication** | None |

| Endpoint | Method | Description |
|---|---|---|
| `/health` | GET | Component health status |
| `/readiness` | GET | Readiness probe |
| `/liveness` | GET | Liveness probe |

## Access Control Model

### Roles

| Role | Scope | Intended Client |
|---|---|---|
| `admin` | Full access to all resources | Emergency and initial setup only |
| `provisioner` | Create/manage participant contexts | CFM automation, onboarding workflows |
| `participant` | Manage own scoped resources | Portal UI backend, sharing applications |

### Key Claims

| Claim | Purpose |
|---|---|
| `role` | Authorization level (admin, provisioner, participant) |
| `participant_context_id` | Identifies the participant context; the security unit |
| `scope` | Granular access (e.g., `management-api:read`, `identity-api:write`) |

### Token Retrieval

```bash
curl -X POST "$TOKEN_URL" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials&client_id=...&client_secret=..."
```

### Best Practices

- Keep `client_id` separate from `participant_context_id` — rotate independently
- Use scoped tokens with least privilege
- Separate Vault access credentials from API access credentials
- Use `role=admin` only for emergencies; use `role=provisioner` for automation
