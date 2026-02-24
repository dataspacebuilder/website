---
sidebar_label: Overview
sidebar_position: 1
title: "System Integration: Your Starting Point"
---

# System Integration — Connecting Customers via EDCaaS

## Who This Is For

You are a solution engineer at a system integrator. Your customer has signed up for
an EDCaaS offering from a cloud service provider. The CSP has provisioned your
customer and handed you a set of endpoints and credentials (see the
[Platform Setup](../platform-setup/) learning path for what that process looks like).

Your job is to help the customer participate in a dataspace — publish data, consume
data from others, and if needed, deploy a data plane. You work with the management
APIs and the Dataspace Protocol. You do not need access to the platform infrastructure.

## What You Get from the CSP

After the CSP provisions your customer, you receive:

| What | Purpose |
|------|---------|
| Participant Context ID | Identifies the customer across all APIs |
| OAuth2 client credentials | `client_id` + `client_secret` to authenticate |
| Token endpoint | Obtain access tokens (`client_credentials` grant) |
| Management API base URL | Manage assets, policies, contracts, catalog, negotiations, transfers |
| Identity Hub API URL | Manage credentials and DIDs |
| DSP protocol endpoint | The address other participants use to reach your customer |
| DID | Your customer's decentralized identifier |

All API calls require a Bearer token obtained from the token endpoint. Tokens are
short-lived — refresh as needed.

## Chapters

| # | Chapter | What you'll learn |
|---|---------|-------------------|
| 1 | [Publishing Data](./publishing-data.md) | Making your customer's data available in a dataspace |
| 2 | [Consuming Data](./consuming-data.md) | Discovering and accessing data from other participants |
| 3 | [The Management API](./management-api.md) | Working with the primary interface for all operations |
| 4 | [The Identity Hub](./identity-hub.md) | Managing credentials, key pairs, and DIDs |
| 5 | [Data Plane Architecture](./data-plane-architecture.md) | Why Control Plane and Data Plane are separate |
| 6 | [Deploying a Data Plane](./deploying-a-data-plane.md) | Registering, building, and running a data plane |
