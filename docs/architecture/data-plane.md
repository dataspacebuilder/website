---
sidebar_position: 5
title: Data Plane
description: How data actually moves in a dataspace
---

# Data Plane

The Data Plane handles the actual movement of data between parties. After the Control Plane agrees on terms, the Data Plane executes the transfer securely and efficiently.

---

## What Does the Data Plane Do?

The Data Plane is responsible for:

- **Data transfer** — Moving data from provider to consumer
- **Protocol support** — HTTP, S3, Azure Blob, industrial protocols
- **Access control** — Enforcing agreed-upon transfer credentials
- **Performance** — Optimized, high-throughput data movement

---

## Why Separate the Data Plane?

The Control Plane and Data Plane are deliberately separated:

- **Different concerns** — Business logic vs. data transfer optimization
- **Different scaling** — Control planes are lightweight; data planes handle volume
- **Different deployment** — Data planes can run close to data sources
- **Different protocols** — Each use case may need different transfer mechanisms

---

## How Data Transfer Works

### 1. Control Plane Agrees

Contract negotiation completes with a Contract Agreement.

### 2. Transfer Request

Consumer requests transfer of the agreed asset via the Control Plane.

### 3. Signaling

Control Plane signals the Data Plane to prepare the transfer:
- Provider data plane prepares source access
- Consumer data plane prepares destination

### 4. Token Exchange

Access tokens are exchanged:
- Short-lived credentials for the specific transfer
- Tied to the contract agreement

### 5. Data Flows

Data moves directly between data planes:
- Provider data plane reads from source
- Consumer data plane writes to destination
- Transfer type determines the flow (push/pull/streaming)

---

## Transfer Types

### Pull Transfer

Consumer pulls data from provider:
- Provider exposes a temporary endpoint
- Consumer fetches data with access token
- Good for on-demand access

### Push Transfer

Provider pushes data to consumer:
- Consumer provides a destination endpoint
- Provider writes data directly
- Good for event-driven flows

### Streaming Transfer

Continuous data flow:
- Real-time data from IoT sensors
- Live feeds from production systems
- Industrial protocol support

---

## Supported Protocols

### HTTP/REST

Standard web protocols for general data transfer:
- JSON/XML payloads
- File downloads
- API responses

### Cloud Storage

Direct integration with cloud storage:
- Amazon S3
- Azure Blob Storage
- Google Cloud Storage

### Industrial Protocols

For manufacturing and industrial use cases:
- OPC UA for industrial equipment
- MQTT for IoT devices
- Custom protocol extensions

---

## Data Plane Architecture

```
Provider Side                    Consumer Side
┌─────────────────┐              ┌─────────────────┐
│  Control Plane  │    DSP       │  Control Plane  │
│                 │<------------>│                 │
└────────┬────────┘              └────────┬────────┘
         │ DPS                            │ DPS
         │ (signaling)                    │ (signaling)
┌────────▼────────┐              ┌────────▼────────┐
│   Data Plane    │              │   Data Plane    │
│                 │------------->│                 │
│  ┌───────────┐  │   Data       │  ┌───────────┐  │
│  │   Data    │  │   Transfer   │  │   Data    │  │
│  │   Source  │  │              │  │   Sink    │  │
│  └───────────┘  │              │  └───────────┘  │
└─────────────────┘              └─────────────────┘
```

---

## Data Plane Signaling (DPS)

DPS is the protocol between Control Plane and Data Plane:

- **Start transfer** — Initiate data movement
- **Suspend/resume** — Pause and continue transfers
- **Terminate** — Stop transfers
- **Status updates** — Report progress and completion

This separation allows:
- Control planes to be lightweight
- Data planes to scale independently
- Remote data plane deployment

---

## Deployment Options

### Embedded Data Plane

Data plane runs within the connector:
- Simpler deployment
- Good for getting started
- Suitable for moderate volumes

### External Data Plane

Data plane runs as a separate service:
- Better scaling
- Deploy close to data
- Multiple data planes per connector

### Specialized Data Planes

Purpose-built for specific protocols:
- Industrial data planes for OPC UA
- Streaming data planes for real-time
- High-throughput planes for large files

---

## Key Features

- **Protocol flexibility** — Support any data source or destination
- **Horizontal scaling** — Add data planes as volume grows
- **Edge deployment** — Run close to data sources
- **Security** — Access tokens tied to agreements

---

## Next Steps

- [Control Plane](/docs/architecture/control-plane) — What happens before transfer
- [Deployment Topologies](/docs/architecture/deployment-topologies) — Where to run data planes
- [Green Steel](/docs/use-cases/green-steel-certification) — Data plane in action
