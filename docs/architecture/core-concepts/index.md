---
sidebar_position: 0
title: Core Concepts
description: "Fundamental concepts of the dataspace architecture: participants, identity, VPAs, cells, and service virtualization."
---

# Core Concepts

This section covers the fundamental concepts that form the foundation of the dataspace architecture.

## Overview

Understanding these core concepts is essential for building and operating dataspaces:

- **[Participants & Identity](/docs/architecture/core-concepts/participants-identity)** — DIDs, Verifiable Credentials, and Trust Anchors
- **[Virtual Participant Agents](/docs/architecture/core-concepts/virtual-participant-agents)** — The unit of deployment
- **[Cells & Infrastructure](/docs/architecture/core-concepts/cells-infrastructure)** — Deployment zones and scaling
- **[Service Virtualization](/docs/architecture/core-concepts/service-virtualization)** — Multi-tenant architecture patterns

---

## Participants and Identity

Every organization in a dataspace has a **participant identity**—typically a Web DID (Decentralized Identifier). This identity is cryptographically verifiable and forms the basis for all trust decisions.

## Virtual Participant Agents (VPAs)

VPAs are the unit of deployment in multi-tenant architectures. They represent isolated contexts within shared infrastructure, enabling efficient resource utilization while maintaining strict trust boundaries.

## Cells

Cells are homogeneous deployment zones—typically Kubernetes clusters—that host shared runtime infrastructure. They enable geographic distribution, regulatory compliance, and scalable operations.

## Service Virtualization

Service virtualization enables multiple participants to share infrastructure while maintaining complete isolation through configuration-based contexts rather than separate processes.
