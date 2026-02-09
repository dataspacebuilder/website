---
slug: zero-to-dataspace-rapid-adoption
title: "From Zero to Dataspace: Concrete Steps for Rapid Adoption"
authors: [akowalski]
tags: [implementation]
description: A hands-on guide for engineering teams evaluating or implementing dataspace technology.
image: /img/guides/zero-to-dataspace.jpeg
---

Your organization has decided dataspaces are worth exploring. Now someone needs to make it work. This guide is for the engineering team tasked with evaluation, prototyping, or production implementation.

<!-- truncate -->

## What You're Building Toward

Before diving into steps, understand the end state:

- Your organization can **publish data** to other dataspace participants
- Your organization can **discover and consume** data from other participants
- All sharing happens under **negotiated agreements** with **verified identity**
- You have **audit trails** for every interaction

Whether you run infrastructure yourself or use a hosted service, these capabilities are the goal.

## Decision 1: Run It Yourself or Use a Hosted Service?

This is your first branch point.

### Option A: Hosted Dataspace Service

Cloud providers are building dataspace-as-a-service offerings. If one is available for your target dataspace:

**Pros:**
- No infrastructure to manage
- Faster time to production
- Operational burden on the provider

**Cons:**
- Less control
- Dependency on provider
- May have usage-based costs

**When to choose this:** You want to participate in a dataspace, not become a dataspace operator. Your engineering resources are better spent on integration than infrastructure.

### Option B: Self-Hosted

Deploy and operate the components yourself.

**Pros:**
- Full control
- No external dependencies
- Can customize deeply

**Cons:**
- Infrastructure and operations burden
- Need EDC expertise
- Longer time to production

**When to choose this:** You have specific requirements, regulatory constraints, or plan to offer dataspace services to others.

The rest of this guide assumes some level of hands-on work, whether evaluating, building integrations, or deploying.

## Step 1: See It Working (30 minutes)

Before writing any code, see a complete dataspace running. Two options:

### Minimum Viable Dataspace (MVD)

The [MVD](https://github.com/eclipse-edc/MinimumViableDataspace) is the official EDC demo:

```bash
git clone https://github.com/eclipse-edc/MinimumViableDataspace
cd MinimumViableDataspace
./gradlew build
docker compose up
```

This gives you two connectors (provider and consumer), identity components, and sample data. The README walks through contract negotiation and data transfer.

**Best for:** Understanding the core EDC components and protocol flow.

### JAD (Just Another Demonstrator)

[JAD](https://github.com/Metaform/jad) deploys a complete dataspace-as-a-service in Kubernetes:

```bash
# Prerequisites: KinD, kubectl, Helm
kind create cluster -n edcv
# ... (follow JAD README for full setup)
kubectl apply -f k8s/base/
kubectl apply -f k8s/apps/
```

JAD includes:
- Virtual Connector (multi-tenant control plane)
- Identity Hub
- Issuer Service
- Connector Fabric Manager
- Data planes
- Supporting infrastructure (PostgreSQL, Vault, Keycloak, NATS)

**Best for:** Understanding the full hosted service architecture, especially if you're a cloud provider or considering self-hosting.

## Step 2: Understand the Protocol Flow

Before building anything, understand what happens when data is shared:

### 1. Catalog Query

Consumer asks: "What data do you have available?"

```
Consumer Connector → Provider Connector
GET /catalog/request

Response: List of datasets with policies
```

### 2. Contract Negotiation

Consumer requests access under specific terms:

```
Consumer Connector → Provider Connector
POST /negotiations

Body: {
  "offerId": "...",
  "policy": { ... }
}
```

Provider evaluates:
- Does consumer have required credentials?
- Does request match the policy?

If yes: Agreement is recorded on both sides.

### 3. Transfer Request

Consumer requests actual data transfer:

```
Consumer Connector → Provider Connector
POST /transfers

Body: {
  "agreementId": "...",
  "transferType": "HttpData-PULL"
}
```

### 4. Data Plane Execution

Provider data plane prepares data access. Consumer receives endpoint + token. Data flows.

This is the [Dataspace Protocol (DSP)](https://eclipse-dataspace-protocol-base.github.io/DataspaceProtocol/) in action.

## Step 3: Understand the Components

### Control Plane (EDC Connector)

Handles:
- Catalog management (what data is available)
- Contract negotiation (agreeing on terms)
- Transfer coordination (initiating data movement)
- Policy evaluation (checking requests against rules)

**Key APIs:**
- Management API — For your applications to manage assets, policies, contracts
- DSP API — For connector-to-connector protocol messages

### Data Plane

Handles actual data transfer. Separate from control plane because:
- Different scaling requirements
- Different deployment locations (edge vs. cloud)
- Different protocols (HTTP, S3, OPC UA, etc.)

**Key concept:** The control plane authorizes; the data plane executes.

### Identity Hub

Manages your organization's decentralized identity:
- DID (Decentralized Identifier) — Your verifiable identity
- Verifiable Credentials — Proofs of attributes (membership, certifications)
- Presentation Service — Responds to verification requests

### Connector Fabric Manager (CFM)

If you're running multi-tenant (hosting multiple organizations):
- Tenant lifecycle management
- Automated provisioning
- Credential request orchestration

**For single-tenant deployments:** You may not need CFM.

## Step 4: Your First Integration

Now let's build something. Assume you want to publish data from your existing system.

### Define Your Asset

What data are you sharing? An asset is a reference to data, not the data itself:

```json
{
  "@context": { "edc": "https://w3id.org/edc/v0.0.1/ns/" },
  "@id": "inventory-api",
  "edc:properties": {
    "name": "Parts Inventory",
    "description": "Real-time inventory levels"
  },
  "edc:dataAddress": {
    "type": "HttpData",
    "baseUrl": "https://your-api.example.com/inventory"
  }
}
```

The `dataAddress` tells the data plane where to get the data when transfer is authorized.

### Define Your Policy

Who can access? Under what conditions?

```json
{
  "@context": { "odrl": "http://www.w3.org/ns/odrl/2/" },
  "@id": "membership-policy",
  "odrl:permission": [{
    "odrl:action": "use",
    "odrl:constraint": [{
      "odrl:leftOperand": "Membership",
      "odrl:operator": "eq",
      "odrl:rightOperand": "active"
    }]
  }]
}
```

This says: "Only participants with active membership can access."

### Create Contract Definition

Link asset to policy:

```json
{
  "@id": "inventory-contract",
  "accessPolicyId": "membership-policy",
  "contractPolicyId": "membership-policy",
  "assetsSelector": {
    "operandLeft": "https://w3id.org/edc/v0.0.1/ns/id",
    "operator": "=",
    "operandRight": "inventory-api"
  }
}
```

Now your data appears in the catalog with the defined access terms.

### Wire Up Your Data Source

The data plane needs to reach your actual data. Options:

1. **HTTP proxy** — Data plane fetches from your API, passes through to consumer
2. **Custom data plane** — Build a data plane that speaks your protocol (database, message queue, etc.)
3. **File/blob storage** — Data plane reads from storage you populate

For most REST API scenarios, the HTTP data plane (included in EDC) works out of the box.

## Step 5: Verify Credentials Work

Dataspaces are only useful if trust is enforced. This means:

1. Your organization has a DID
2. Your organization has verifiable credentials (issued by trusted parties)
3. Your policies reference credential attributes
4. Negotiation fails if credentials don't match

### Testing the Flow

1. **Without credentials:** Consumer requests access. Negotiation should fail.
2. **With wrong credentials:** Consumer has credentials, but wrong type. Negotiation should fail.
3. **With correct credentials:** Consumer has matching credentials. Negotiation should succeed.

If all three work, your trust enforcement is functional.

## Step 6: Common Pitfalls

### Pitfall: Skipping Identity Setup

Without proper DID/credential setup, you have a connector but not a dataspace. Everything works technically but without trust guarantees.

**Fix:** Always deploy with Identity Hub. Always use verifiable credentials in policies.

### Pitfall: Overly Complex Policies

Starting with elaborate ODRL policies makes debugging hard.

**Fix:** Start with simple policies (membership = active). Add complexity once basic flow works.

### Pitfall: Ignoring Data Plane

The control plane negotiates; the data plane delivers. Forgetting to configure data plane endpoints means negotiations succeed but transfers fail.

**Fix:** Test the complete flow, including actual data retrieval.

### Pitfall: Manual Operations

Registering assets, policies, and contracts by hand works for demos. It doesn't work for production.

**Fix:** Build automation from the start. Use the Management API programmatically.

## Step 7: Production Considerations

### Monitoring

- Contract negotiation success/failure rates
- Transfer completion rates and latency
- Policy evaluation metrics
- Credential verification events

### High Availability

- Multiple control plane replicas
- Database replication (PostgreSQL)
- Load balancing for protocol endpoints

### Security

- Management API authentication (OAuth2)
- Private key storage (Vault)
- Network segmentation (management vs. protocol traffic)
- Audit logging

### Compliance

- Audit trail for all negotiations and transfers
- Credential verification logs
- Policy enforcement records

## Resources

### Documentation
- [EDC Documentation](https://eclipse-edc.github.io/documentation/)
- [Management API Reference](https://eclipse-edc.github.io/documentation/for-contributors/architecture/api/management-api/)
- [EDC-V Administration APIs](https://github.com/eclipse-edc/Virtual-Connector/blob/main/docs/administration_api.md)

### Code
- [Eclipse Dataspace Components](https://github.com/eclipse-edc)
- [Minimum Viable Dataspace](https://github.com/eclipse-edc/MinimumViableDataspace)
- [JAD Demonstrator](https://github.com/Metaform/jad)

### Community
- [Eclipse Dataspace Working Group](https://dataspace.eclipse.org/)
- [GitHub Discussions](https://github.com/eclipse-edc/Connector/discussions)

## What's Next?

Once you have a working prototype:

1. **Integrate with your systems** — Connect real data sources, not demo data
2. **Engage your dataspace community** — Which industry initiative will you join?
3. **Plan production deployment** — Infrastructure, operations, support
4. **Build your team's expertise** — The technology is new; invest in learning

The technology works. The standards are stable. Now it's about applying them to your specific context.

---

Questions? The [Eclipse Dataspace Working Group](https://dataspace.eclipse.org/) community is active and helpful. Start with GitHub Discussions for technical questions.
