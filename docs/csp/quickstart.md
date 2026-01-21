# CSP Quick Start Guide

> Deploy your first multi-tenant dataspace environment

---

## Overview

This guide walks you through deploying a minimal Trusted Data Sharing Stack environment. By the end, you'll have:

- A working Connector Fabric Manager (CFM)
- Multi-tenant EDC-V control plane
- Sample tenant onboarded and operational

**Time Required:** ~2-4 hours  
**Prerequisites:** Kubernetes cluster, basic k8s knowledge

---

## Prerequisites

### Infrastructure Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| Kubernetes | 1.26+ | 1.28+ |
| Nodes | 3 nodes, 4 vCPU, 16GB RAM each | 5+ nodes, 8 vCPU, 32GB RAM |
| Storage | 100GB persistent storage | 500GB+ SSD |
| PostgreSQL | 14+ | 15+ managed |
| Vault | Any | HashiCorp Vault |

### Tools Required

```bash
# Verify you have these installed
kubectl version --client
helm version
terraform version  # or OpenTofu
```

---

## Step 1: Base Infrastructure

<!-- TODO: Add detailed Terraform/Helm configurations -->

### 1.1 Deploy Ingress Controller

```bash
# Example with NGINX Ingress
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm install ingress-nginx ingress-nginx/ingress-nginx
```

### 1.2 Deploy Database

```bash
# Deploy PostgreSQL (or use managed service)
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install postgresql bitnami/postgresql \
  --set auth.postgresPassword=<your-password>
```

### 1.3 Deploy Vault (Optional but Recommended)

```bash
helm repo add hashicorp https://helm.releases.hashicorp.com
helm install vault hashicorp/vault
```

---

## Step 2: Deploy Connector Fabric Manager

<!-- TODO: Add actual CFM deployment steps -->

### 2.1 Add Helm Repository

```bash
# Add the dataspace charts repository
helm repo add dataspace https://charts.example.com/dataspace
helm repo update
```

### 2.2 Configure Values

Create `cfm-values.yaml`:

```yaml
# cfm-values.yaml
global:
  domain: dataspace.your-csp.com

database:
  host: postgresql
  port: 5432
  name: cfm
  
vault:
  address: http://vault:8200
  
ingress:
  enabled: true
  className: nginx
```

### 2.3 Deploy CFM

```bash
helm install cfm dataspace/connector-fabric-manager \
  -f cfm-values.yaml \
  --namespace dataspace \
  --create-namespace
```

---

## Step 3: Deploy EDC-V Control Plane

<!-- TODO: Add actual EDC-V deployment steps -->

### 3.1 Configure EDC-V

Create `edc-v-values.yaml`:

```yaml
# edc-v-values.yaml
replicaCount: 3

cfm:
  endpoint: http://cfm:8080
  
database:
  host: postgresql
  port: 5432
  
multiTenant:
  enabled: true
  isolationLevel: namespace
```

### 3.2 Deploy EDC-V

```bash
helm install edc-v dataspace/edc-virtual-connector \
  -f edc-v-values.yaml \
  --namespace dataspace
```

---

## Step 4: Deploy Management UI

<!-- TODO: Add Redline UI deployment -->

```bash
helm install redline dataspace/redline \
  --set cfm.endpoint=http://cfm:8080 \
  --namespace dataspace
```

---

## Step 5: Onboard First Tenant

### 5.1 Create Tenant via API

```bash
curl -X POST https://admin.dataspace.your-csp.com/api/tenants \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Acme Corporation",
    "domain": "acme.dataspace.your-csp.com",
    "contact": "admin@acme.example.com"
  }'
```

### 5.2 Verify Tenant Provisioning

```bash
# Check tenant status
curl https://admin.dataspace.your-csp.com/api/tenants/acme-corporation

# Expected response:
{
  "id": "acme-corporation",
  "status": "ACTIVE",
  "endpoints": {
    "catalog": "https://acme.dataspace.your-csp.com/api/catalog",
    "negotiation": "https://acme.dataspace.your-csp.com/api/negotiation"
  }
}
```

---

## Step 6: Verify Installation

### Health Checks

```bash
# CFM health
curl https://admin.dataspace.your-csp.com/health

# EDC-V health
curl https://api.dataspace.your-csp.com/health

# Tenant connector health
curl https://acme.dataspace.your-csp.com/health
```

### Test Data Exchange

<!-- TODO: Add end-to-end test script -->

1. Log into tenant portal as Acme admin
2. Publish a test data asset
3. Create another test tenant
4. Request and negotiate access
5. Verify data transfer

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| CFM pods not starting | Check database connectivity |
| Tenant provisioning fails | Verify Vault secrets access |
| Ingress not resolving | Check DNS and cert-manager |

### Logs

```bash
# CFM logs
kubectl logs -l app=cfm -n dataspace

# EDC-V logs
kubectl logs -l app=edc-v -n dataspace
```

---

## Next Steps

- **[Architecture Deep Dive](architecture.md)** — Understand the components in detail
- **[Operations Guide](operations.md)** — Prepare for production
- **[Tenant Lifecycle](tenant-lifecycle.md)** — Manage tenant onboarding at scale
