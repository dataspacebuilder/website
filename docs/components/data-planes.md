# Data Planes

## What They Are

Data Planes are the execution layer for data sharing. Once a contract agreement is established and the Control Plane authorizes a transfer, the Data Plane moves the actual bytes between participants using the appropriate wire protocol.

Data Planes are designed to be **specialized, swappable, and independently deployable**. A single participant can run multiple Data Planes — one for HTTP APIs, another for S3 object storage, another for OPC-UA industrial protocols — all under the same trust and policy model.

## What Problem They Solve

The separation between Control Plane (decision) and Data Plane (execution) is a core architectural principle. It solves several problems:

- **Deployment flexibility** — Data Planes can run where the data lives (cloud, edge, factory floor, regulated region) while the Control Plane remains centrally managed
- **Protocol diversity** — different data types require different wire protocols; multiple specialized Data Planes can coexist
- **Independent scaling** — throughput can be scaled by adding Data Plane capacity without affecting policy evaluation
- **Security isolation** — the trust-decision layer and the data-transfer layer have separate security boundaries

## How They Fit in the Architecture

```
                Control Plane
                    │
                    │ DPS (signaling)
                    │
         ┌──────────┼──────────┐
         ↓          ↓          ↓
    Data Plane   Data Plane   Data Plane
      (HTTP)       (S3)      (OPC-UA)
         │          │          │
         ↓          ↓          ↓
    Wire protocol  Wire protocol  Wire protocol
```

The Control Plane selects the right Data Plane for each transfer based on registered capabilities, placement, and health. The Data Plane receives a signal to start and executes the transfer.

## Key Capabilities

### Transfer Patterns

| Pattern | Direction | Use Cases |
|---|---|---|
| **Pull** | Consumer fetches from provider | API access, on-demand queries, real-time data |
| **Push** | Provider sends to consumer | Batch exports, event-driven delivery, file transfers |
| **Stream** | Continuous flow until terminated | IoT sensors, telemetry, real-time monitoring |

### Data Plane Signaling (DPS)

DPS is the interoperability contract between Control Plane and Data Plane. It defines:

- **Lifecycle signals**: `START`, `SUSPEND`, `TERMINATE` — controlling the transfer state machine
- **Registration**: Data Planes register their capabilities (supported source types, transfer types, health) with the Control Plane
- **Capability-based selection**: The Control Plane selects the right Data Plane per transfer
- **Endpoint Data References (EDRs)**: For pull transfers, the Data Plane returns endpoint coordinates plus an access token that the consumer uses to fetch data

DPS is what makes Data Planes swappable. Any implementation that speaks DPS can participate — regardless of the underlying transport.

### Runtime Access Enforcement

Data Planes enforce access constraints derived from the contract agreement:
- Short-lived credentials (EDRs) with limited scope and duration
- Token-based access control at the data-plane-facing API
- Audit logging of all data access

## Deployment Patterns

### Co-located with Control Plane
Simplest model. Control Plane and Data Plane run in the same environment. Suitable for getting started and low-complexity scenarios.

### Edge / On-Premise
Data Planes deployed at the data source — factory floor, hospital, regional data center. The Control Plane remains cloud-hosted. This keeps data close to where it's generated while maintaining centralized trust and policy management.

### Multi-Protocol
Separate Data Planes for different transport protocols:
- HTTP Data Plane for API access
- S3 Data Plane for object storage replication
- MQTT/Kafka Data Plane for streaming
- OPC-UA Data Plane for industrial protocols

All under one policy model, coordinated by the same Control Plane.

### Geographic Distribution
Data Planes deployed in required regions to keep data flow within jurisdiction. Supports data residency requirements without fragmenting the trust model.

### Per-Tenant (DSaaS)
In managed deployments, Data Planes may be allocated per tenant for stricter isolation, or shared across tenants with logical separation.

## The Data Plane Ecosystem

### Eclipse Data Plane Core (DCore)

The [Eclipse Data Plane Core](https://github.com/eclipse-dataplane-core) project provides reusable building blocks for Data Plane implementations:
- State machines for transfer lifecycle management
- Idempotency and deduplication patterns
- Adapter plug-ins for wire protocol integration

### SDKs

Data Plane SDKs exist across multiple languages, enabling Data Planes built in the language and operational environment that best fits the transport requirements:

| SDK | Language | Repository |
|---|---|---|
| Java SDK | Java | [dataplane-sdk-java](https://github.com/eclipse-dataplane-core/dataplane-sdk-java) |
| Go SDK | Go | [dataplane-sdk-go](https://github.com/eclipse-dataplane-core/dataplane-sdk-go) |
| Rust SDK | Rust | [dataplane-sdk-rust](https://github.com/eclipse-dataplane-core/dataplane-sdk-rust) |
| .NET SDK | C# / .NET | [dataplane-sdk-net](https://github.com/eclipse-dataplane-core/dataplane-sdk-net) |

### External Data Planes

EDC supports **external Data Planes** — decoupled from the Control Plane process and deployed as independent services. This is the recommended production pattern, as it allows independent scaling, deployment, and security hardening.

## In JAD

In the [Get Started](../get-started.md) scenario, the Data Plane is what delivers Company A's telemetry data to Company B after the contract is negotiated. The Control Plane signals the Data Plane to make data available, and Company B retrieves it through the authorized endpoint.

## Key Concepts

| Concept | Description |
|---|---|
| **DPS** | Data Plane Signaling — the protocol between Control Plane and Data Plane |
| **EDR** | Endpoint Data Reference — endpoint coordinates + access token for pull transfers |
| **Wire protocol** | The actual transport used for data movement (HTTP, S3, MQTT, etc.) |
| **Adapter** | A Data Plane component that implements a specific wire protocol |
| **Capability registration** | Data Planes register what they can do (source types, transfer types) with the Control Plane |

---

**Learn more**: [DPS interface documentation](https://eclipse-edc.github.io/documentation/for-contributors/data-plane/data-plane-signaling/) | [Eclipse Data Plane Core](https://github.com/eclipse-dataplane-core)

**Related**: [Connector](./connector.md) | [CFM](./cfm.md) | [Concepts: Protocols](../concepts/protocols.md)
