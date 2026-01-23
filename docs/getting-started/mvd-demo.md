# Minimum Viable Dataspace Demo

> Experience a working dataspace in minutes

---

## Overview

The **Minimum Viable Dataspace (MVD)** is a pre-configured demo environment that showcases the complete data sharing flow. It's perfect for:

- Understanding how dataspaces work in practice
- Demonstrating capabilities to stakeholders
- Learning the concepts hands-on
- Testing integrations during development

---

## What's Included

The MVD deploys a complete ecosystem:

```
┌─────────────────────────────────────────────────────────────────┐
│                    MVD Environment                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────┐        ┌─────────────┐                       │
│   │  Provider   │◀──────▶│  Consumer   │                       │
│   │  Connector  │        │  Connector  │                       │
│   └─────────────┘        └─────────────┘                       │
│          │                      │                               │
│          ▼                      ▼                               │
│   ┌─────────────┐        ┌─────────────┐                       │
│   │  Identity   │        │  Identity   │                       │
│   │    Hub      │        │    Hub      │                       │
│   └─────────────┘        └─────────────┘                       │
│                                                                 │
│   ┌───────────────────────────────────┐                        │
│   │         Credential Issuer         │                        │
│   └───────────────────────────────────┘                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Prerequisites

- Docker and Docker Compose
- 8GB RAM available
- Ports 8080-8090 available

---

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/eclipse-edc/MinimumViableDataspace.git
cd MinimumViableDataspace
```

### 2. Start the Environment

```bash
docker-compose up -d
```

Wait 2-3 minutes for all services to start.

### 3. Verify Health

```bash
# Check provider
curl http://localhost:8080/api/check/health

# Check consumer
curl http://localhost:8081/api/check/health
```

---

## Demo Walkthrough

### Step 1: Explore the Catalogs

**Provider's catalog:**
```bash
curl http://localhost:8080/api/catalog
```

You'll see the pre-configured data assets available for sharing.

**Consumer discovering provider:**
```bash
curl -X POST http://localhost:8081/api/catalog/request \
  -H "Content-Type: application/json" \
  -d '{"providerUrl": "http://provider:8080/api/dsp"}'
```

---

### Step 2: Negotiate a Contract

**Initiate negotiation:**
```bash
curl -X POST http://localhost:8081/api/negotiation \
  -H "Content-Type: application/json" \
  -d '{
    "offerId": "asset-1-offer",
    "providerId": "provider",
    "policy": {
      "permissions": [{"action": "use"}]
    }
  }'
```

**Check negotiation status:**
```bash
curl http://localhost:8081/api/negotiation/{negotiation-id}
```

---

### Step 3: Transfer Data

**Initiate transfer:**
```bash
curl -X POST http://localhost:8081/api/transfer \
  -H "Content-Type: application/json" \
  -d '{
    "agreementId": "{agreement-id}",
    "assetId": "asset-1",
    "destination": {
      "type": "HttpProxy"
    }
  }'
```

**Retrieve transferred data:**
```bash
curl http://localhost:8081/api/data/{transfer-id}
```

---

## What Just Happened?

1. **Discovery**: Consumer found provider's offerings via catalog
2. **Negotiation**: Automated contract based on policy matching
3. **Agreement**: Contract stored and enforceable
4. **Transfer**: Secure data movement with audit

This entire flow took seconds, not weeks.

---

## Exploring Further

### View Identity Credentials

```bash
# Provider's credentials
curl http://localhost:8082/api/identityhub/credentials

# Consumer's credentials  
curl http://localhost:8083/api/identityhub/credentials
```

### Modify Policies

Edit `resources/policies/` to experiment with:
- Different access restrictions
- Purpose-based rules
- Credential requirements

### Add New Assets

Create new data assets by adding entries to `resources/assets/`.

---

## Troubleshooting

### Services not starting?

```bash
# Check logs
docker-compose logs -f

# Restart specific service
docker-compose restart provider-connector
```

### Negotiation failing?

Check that:
- Provider is healthy
- Consumer has required credentials
- Policy conditions can be met

### Transfer not completing?

Verify:
- Agreement ID is valid
- Data plane is accessible
- Network connectivity between services

---

## Demo Resources

| Resource | URL |
|----------|-----|
| Provider Management API | http://localhost:8080/api |
| Consumer Management API | http://localhost:8081/api |
| Provider Identity Hub | http://localhost:8082/api |
| Consumer Identity Hub | http://localhost:8083/api |
| Issuer Service | http://localhost:8084/api |

---

## Next Steps

After exploring the MVD:

- **CSPs**: [Deploy your own multi-tenant environment](../csp/quickstart.md)
- **Adopters**: [Understand what you'll experience](../adopters/quickstart.md)
- **Developers**: [Explore the codebase](https://github.com/eclipse-edc/MinimumViableDataspace)

---

## Alternative Demo: JAD

For a more advanced demonstration with UI and additional features, see the [JAD demo environment](https://github.com/Metaform/jad).
