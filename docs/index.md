---
slug: /
sidebar_label: Overview
sidebar_position: 1
title: Trusted Data Sharing with Eclipse Dataspace Components
---

# Trusted Data Sharing with Eclipse Dataspace Components

## The Problem

Organizations need to share data across boundaries — with partners, customers, suppliers, regulators — without losing control, sovereignty, or legal clarity.

Today's approaches don't scale:

- **Point-to-point integrations** accumulate technical debt with every new partner
- **Central platforms** demand surrendered control over your data
- **Manual agreements** can't support ecosystem-level collaboration
- **Proprietary APIs** create lock-in and fragmentation

Meanwhile, supply chains demand transparency, regulators demand traceability, and AI use cases demand access to distributed datasets. The EU Data Act, Digital Product Passport, and sector-specific mandates increasingly *assume* that organizations can exchange data in a controlled, auditable way. The gap between ambition and infrastructure is widening.

What's emerging is a shift from bilateral data transfer to **distributed data sharing ecosystems** — environments where organizations share data as peers, under decentralized governance, without surrendering control to a central platform. The challenge is building the infrastructure that makes this possible.

## What Is a Dataspace

A **dataspace** is an environment that enables trusted data sharing between organizations, based on agreed governance, shared policies, standardized protocols, and decentralized identity — without a central data lake, mandatory aggregator, or platform owner.

Participants interact as equals. Each organization retains sovereign control over what they share, with whom, and under which conditions. Trust is verified cryptographically at every interaction, not assumed from a platform account.

This is defined formally in [ISO/IEC 20151](https://www.iso.org/standard/86589.html) and operationalized through the [Eclipse Dataspace Components](https://eclipse-edc.github.io/documentation/) (EDC) stack. As **digital ecosystems** mature — from supply chains to regulatory frameworks to federated AI — dataspaces provide the infrastructure pattern that makes distributed data sharing repeatable, interoperable, and trustworthy.

## Core Capabilities

Based on open protocols and decentralized architecture, the EDC stack enables trusted data sharing through four capabilities:

1. **TRUST** — Establish verifiable identity and attributes without a central authority. Organizations prove who they are using cryptographic credentials, not platform accounts. Trust is evaluated locally, per interaction, between peers.

2. **DISCOVER** — Find data offerings across organizational boundaries. Catalogs expose what data is available and under which terms, with access controlled by policies that filter visibility based on participant attributes.

3. **NEGOTIATE** — Agree on usage terms machine-to-machine. Contract negotiation happens over standardized protocols — not via PDFs, emails, or manual legal review. Policies define permissions, obligations, and prohibitions; credentials prove compliance.

4. **SHARE** — Move data peer-to-peer under enforced policies. Data flows only after authorization is established. The data plane executes transfers while the control plane ensures the terms are met. Data never flows through the dataspace itself — it moves directly between participants.

## Who This Is For

- **Technical decision-makers** evaluating dataspace infrastructure — understand what problems dataspaces solve, how the technology works, and where the strategic opportunity lies
- **Developers and architects** responsible for understanding, building, or operating dataspace infrastructure — get hands-on with the stack and learn how the components fit together
- **Cloud service providers** productizing trusted data sharing — learn how to offer Dataspace-as-a-Service (DSaaS) using multi-tenant EDC deployments

## Get Started

The fastest way to understand how trusted data sharing works in practice is to see it run.

**[Get Started with JAD](./get-started.md)** — Deploy the Just Another Demonstrator, walk through a complete data sharing scenario, and understand how each component contributes to the end-to-end flow.

## Learn More

| Section | What You'll Find |
|---|---|
| [Get Started](./get-started.md) | Hands-on scenario with JAD — the one document to read first |
| [Concepts](./concepts/what-is-a-dataspace.md) | What dataspaces are, how trust works, the protocols, the lifecycle |
| [Components](./components/connector.md) | Connector, Identity Hub, Data Planes, Redline UI, CFM |
| [Guides](./guides/decision-makers.md) | Audience-specific learning paths for decision-makers, architects, operators, developers |
| [Reference](./reference/glossary.md) | Protocol specs, API reference, glossary, community |
