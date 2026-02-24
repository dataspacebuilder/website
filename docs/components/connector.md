# Connector (Control Plane)

## What It Is

The Connector is the core software agent that represents a participant in a dataspace. Its Control Plane is responsible for all trust decisions: publishing data offerings, discovering catalogs, negotiating contracts, evaluating policies, and coordinating data transfers.

Every participant in a dataspace operates a Connector. It implements the [Dataspace Protocol (DSP)](https://eclipse-dataspace-protocol-base.github.io/DataspaceProtocol/) and is the component through which all business interactions flow.

## What Problem It Solves

Without a Connector, organizations would need to build custom integrations for every data sharing relationship — each with its own authentication, authorization, contract management, and transfer coordination. The Connector standardizes these interactions so that any two organizations with conformant Connectors can discover, negotiate, and share data.

## How It Fits in the Architecture

```
Identity Hub ←─ DCP ─→ Identity Hub
     ↕                      ↕
Connector  ←── DSP ──→ Connector
     ↕                      ↕
Data Plane ←─ DPS ─→ Data Plane
```

The Connector sits between the Identity Hub (which manages credentials) and the Data Plane (which executes transfers). It is the decision layer — it uses identity information to evaluate policies and produces authorizations that the Data Plane executes.

## Key Capabilities

### Catalog Publication
A data provider's Connector publishes a **catalog** of available data offerings. Each offering includes:
- **Asset metadata** — description, format, data type
- **Access policies** — which participants can discover this offering (based on their attributes)
- **Contract offers** — the terms under which the data can be accessed (policies that must be satisfied)

Catalogs can be queried by other Connectors. Access policies are evaluated during discovery, ensuring that participants only see offerings they're authorized to negotiate for.

### Contract Negotiation
When a consumer selects an offering, their Connector initiates a **contract negotiation** with the provider's Connector:

1. The consumer sends a negotiation request
2. The provider requests credential proofs (triggering DCP exchanges between Identity Hubs)
3. The provider evaluates the consumer's verified attributes against the contract policies
4. If all policies are satisfied, both sides record a **contract agreement**

The contract agreement is the authorization artifact that enables data sharing. It records what was agreed, between whom, and under which terms.

### Policy Evaluation
The Connector evaluates policies at multiple points:
- **Access policies** during catalog queries
- **Contract policies** during negotiation
- **Usage policies** during and after transfer

Policies can be static (defined at deployment) or dynamic. For dynamic policy evaluation, EDC-V supports [Common Expression Language (CEL)](https://github.com/eclipse-edc/Virtual-Connector/blob/main/docs/common_expression_language.md), allowing policy updates without redeploying the runtime.

### Transfer Coordination
Once a contract agreement exists, the Connector coordinates the data transfer:
1. The consumer or provider initiates a transfer request
2. The Control Plane selects the appropriate Data Plane based on capabilities and placement
3. The Control Plane signals the Data Plane via DPS to start the transfer
4. The Data Plane executes and reports status back

The Control Plane **never touches the data** — it produces authorizations and signals; the Data Plane executes.

## Administration APIs

The Connector exposes APIs for managing its resources:

| API | Purpose | Content Type | Intended Client |
|---|---|---|---|
| **Management API** | Manage assets, policies, contracts | JSON-LD | Participant applications, provisioning automation |
| **Federated Catalog API** | Query the federated catalog | JSON | Participant applications |
| **Observability API** | Health and readiness | JSON | Monitoring systems |

These APIs are designed for machine clients (UI backends, automation tools), not direct human use. Authentication uses OAuth2 with the `client_credentials` flow.

## In JAD

In the [JAD](https://github.com/Metaform/jad) scenario, the Connector enables the Consumer to browse the Provider's catalog, request a contract, and initiate data transfer. Using the Bruno API collection, you call the Management API directly — the same API surface that a production application (web portal, ERP system, or automation tool) would use. Behind the scenes, the Connectors execute DSP protocol exchanges to evaluate policies and establish agreements.

For dynamic policy evaluation, JAD seeds **CEL (Common Expression Language)** expressions into the Control Plane, allowing policies like "only participants with a valid Membership Credential can access this data" to be evaluated at runtime without redeploying.

## Deployment Models

### Standalone (Classic EDC)
A single Connector runtime per organization. Simple but operationally expensive at scale — each tenant requires its own deployment.

### Multi-Tenant (EDC-V)
The Virtual Connector enables multiple participant contexts on shared infrastructure. Each participant's context is logically isolated while sharing the underlying runtime. This is the model that CFM manages for Dataspace-as-a-Service deployments.

## Key Concepts

| Concept | Description |
|---|---|
| **Asset** | A data resource that can be shared (described by metadata in the catalog) |
| **Policy** | A set of rules governing access, contracts, or usage |
| **Contract Offer** | An asset paired with access and contract policies — what a consumer sees in the catalog |
| **Contract Agreement** | The result of a successful negotiation — the authorization to share |
| **Transfer Process** | The lifecycle of a data transfer, from initiation to completion |

---

**Learn more**: [EDC Documentation](https://eclipse-edc.github.io/documentation/for-adopters/) | [EDC Control Plane docs](https://eclipse-edc.github.io/documentation/for-adopters/control-plane/)

**Related**: [Identity Hub](./identity-hub.md) | [Data Planes](./data-planes.md) | [Concepts: Protocols](../concepts/protocols.md)
