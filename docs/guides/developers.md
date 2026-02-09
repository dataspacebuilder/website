# Guide: Building on Eclipse Dataspace Components

*For developers, integration engineers, and technical contributors*

---

## What This Guide Covers

This guide is for developers who want to build applications, extend components, or contribute to the Eclipse Dataspace Components (EDC) ecosystem. It covers the extension model, key APIs, common development tasks, and how to participate in the community.

**Prerequisites**: Read the [Get Started](../get-started.md) page to understand the components and how they interact. Familiarity with Java (for EDC core), Kubernetes (for deployment), and REST APIs (for integration) is assumed.

---

## The EDC Extension Model

EDC is designed as a modular framework. The core provides state machines, data models, and protocol implementations. Everything else is an **extension**.

Extensions plug into the runtime through a well-defined service provider interface (SPI). This allows you to:
- Add custom policy functions
- Implement new data plane adapters
- Integrate with your organization's IAM, vault, or storage systems
- Build custom catalog backends
- Add observability hooks

### Service Assemblies

An EDC deployment is composed from **service assemblies** — specific combinations of core modules and extensions that form a runtime. The standard assemblies are:

- **Control Plane** — catalog, negotiation, policy evaluation, transfer coordination
- **Data Plane** — transfer execution with protocol-specific adapters
- **Identity Hub** — DID management, credential storage, proof composition

You can create custom assemblies by selecting the modules and extensions your deployment needs.

### Getting the Code

```bash
# Core Connector
git clone https://github.com/eclipse-edc/Connector.git

# Virtual Connector (multi-tenant)
git clone https://github.com/eclipse-edc/Virtual-Connector.git

# Identity Hub
git clone https://github.com/eclipse-edc/IdentityHub.git

# Data Plane Core (SDKs)
git clone https://github.com/eclipse-dataplane-core/dataplane-sdk-java.git
```

**Documentation**: [EDC Developer Documentation](https://eclipse-edc.github.io/documentation/)

---

## Working with the APIs

### Management API (Control Plane)

The Management API is the primary interface for managing assets, policies, and contracts.

**Base path**: `/api/management/v3/`

**Key operations**:

| Endpoint | Method | Description |
|---|---|---|
| `/assets` | POST | Create a data asset |
| `/policydefinitions` | POST | Define a policy |
| `/contractdefinitions` | POST | Create a contract definition (asset + policies) |
| `/catalog/request` | POST | Query another participant's catalog |
| `/contractnegotiations` | POST | Initiate a contract negotiation |
| `/transferprocesses` | POST | Start a data transfer |

**Content type**: JSON-LD (for semantic interoperability)

**Authentication**: OAuth2 `client_credentials` with appropriate role and scope claims.

### Identity API (Identity Hub)

The Identity API manages DIDs, key pairs, and verifiable credentials.

**Key operations**:

| Endpoint | Method | Description |
|---|---|---|
| `/participants/{id}/dids` | GET/POST | Manage participant DIDs |
| `/participants/{id}/keypairs` | GET/POST | Manage key pairs |
| `/participants/{id}/credentials` | GET/POST | Manage verifiable credentials |

**Authentication**: OAuth2 `client_credentials` with `participant_context_id` claim.

### Federated Catalog API

For querying the federated catalog of data offerings across multiple participants:

**Key operations**:

| Endpoint | Method | Description |
|---|---|---|
| `/federatedcatalog` | POST | Query the federated catalog with filter criteria |

---

## Common Development Tasks

### Creating a Custom Policy Function

Policy functions evaluate specific policy constraints during negotiation. To create a custom function:

1. Implement the `AtomicConstraintFunction` interface
2. Register it as an extension in your service assembly
3. Map it to a policy constraint type in your configuration

Custom policy functions can check external systems, perform complex calculations, or integrate with business workflows.

### Building a Data Plane Adapter

A Data Plane adapter implements a specific wire protocol for data transfer:

1. Implement the `DataSource` and/or `DataSink` interfaces
2. Register supported source and transfer types
3. Package as a Data Plane extension

Use the [Data Plane SDKs](https://github.com/eclipse-dataplane-core) for implementations in Java, Go, Rust, or .NET.

### Building a Sharing Application

A sharing application is a client that uses the Management API to discover data, negotiate contracts, and manage transfers on behalf of a user or automated process:

1. Authenticate with OAuth2 using `client_credentials`
2. Query the federated catalog or a specific participant's catalog
3. Initiate contract negotiation for desired offerings
4. Start and monitor transfer processes
5. Consume data through the Data Plane endpoint (using the EDR)

The [Redline](https://github.com/Metaform/redline) reference implementation demonstrates this pattern as a web application.

### Integrating with External Systems

Common integration patterns:

| Integration | Approach |
|---|---|
| **IAM / IdP** | Configure OAuth2 token endpoint and client credentials |
| **Secrets / Vault** | Implement the `Vault` SPI for your secrets management system |
| **Storage** | Build a Data Plane adapter for your storage system |
| **Event bus** | Use EDC's event system to react to lifecycle events (negotiations, transfers) |
| **Monitoring** | EDC exports metrics via Micrometer; configure your preferred backend |

---

## Testing and Compliance

### Technology Compatibility Kit (TCK)

The TCK validates that your implementation conforms to the DSP and DCP specifications:

- [**DSP TCK**](https://github.com/eclipse-dataspacetck/dsp-tck) — validates Connector (Control Plane) protocol compliance
- [**DCP TCK**](https://github.com/eclipse-dataspacetck/dcp-tck) — validates Identity Hub (Credential Service) protocol compliance

Run the TCK before deploying to production and when upgrading EDC versions. It's the fastest way to catch interoperability issues.

### Integration Testing with JAD

Use [JAD](https://github.com/Metaform/jad) as a local integration test environment. Deploy JAD, then point your custom extensions or applications at its APIs to test end-to-end workflows.

---

## Key Architecture Documents

For deeper understanding of the EDC internals:

| Document | What It Covers |
|---|---|
| [Task-based architecture](https://github.com/eclipse-edc/Virtual-Connector/blob/main/docs/task_based_architecture.md) | How EDC-V processes requests using task-based isolation |
| [Security boundaries](https://github.com/eclipse-edc/Virtual-Connector/blob/main/docs/security_boundaries.md) | Trust and security model for multi-tenant deployments |
| [Administration API](https://github.com/eclipse-edc/Virtual-Connector/blob/main/docs/administration_api.md) | API design and access control model |
| [Access control](https://github.com/eclipse-edc/Virtual-Connector/blob/main/docs/access_control.md) | Role and scope-based access control |
| [Dynamic policy evaluation (CEL)](https://github.com/eclipse-edc/Virtual-Connector/blob/main/docs/common_expression_language.md) | Policy evaluation without redeployment |
| [CFM system architecture](https://github.com/Metaform/connector-fabric-manager/blob/main/docs/developer/architecture/system.architecture.md) | Management plane design and extension points |

---

## Contributing to the Ecosystem

### Repositories

| Repository | What It Is |
|---|---|
| [eclipse-edc/Connector](https://github.com/eclipse-edc/Connector) | Core Connector (Control Plane + Data Plane) |
| [eclipse-edc/Virtual-Connector](https://github.com/eclipse-edc/Virtual-Connector) | Multi-tenant Virtual Connector |
| [eclipse-edc/IdentityHub](https://github.com/eclipse-edc/IdentityHub) | Identity Hub (Credential Service) |
| [eclipse-dataplane-core](https://github.com/eclipse-dataplane-core) | Data Plane SDKs and building blocks |
| [eclipse-dataspacetck](https://github.com/eclipse-dataspacetck) | Technology Compatibility Kits |

### Community

- **Discussions**: [EDC Connector Discussions](https://github.com/eclipse-edc/Connector/discussions) — questions, ideas, knowledge sharing
- **Working Group**: [Eclipse Dataspace Working Group](https://projects.eclipse.org/working-group/eclipse-dataspace) — broader ecosystem engagement, protocol evolution
- **Issues**: Use GitHub issues on the relevant repository for bugs and feature requests

### Contribution Model

EDC follows standard Eclipse Foundation governance:
- Contributions via pull requests
- Eclipse Contributor Agreement (ECA) required
- IP review for significant contributions
- Community consensus for architectural changes

Staying close to the upstream community is how you de-risk protocol changes, security fixes, and interoperability edge cases.

---

**Next steps**: [EDC Documentation](https://eclipse-edc.github.io/documentation/) | [Components](../components/connector.md) (component deep dives) | [Reference: APIs](../reference/apis.md) (API reference)
