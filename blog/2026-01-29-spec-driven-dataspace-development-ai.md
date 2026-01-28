---
slug: spec-driven-dataspace-development-ai
title: "Blueprint for Building Domain-Specific Dataspaces with AI-Assisted Specification-Driven Development"
authors: [mbuchhorn]
tags: [dataspace, specification-driven-development, AI, blueprint, compliance, EDC, DCP, DSP, TCK]
description: "Learn how to build production-grade, compliant dataspaces using the BLUEPRINT methodology, GitHub Spec Kit, and AI-assisted development. Discover how specification-driven development accelerates your path from concept to certified dataspace."
keywords: [dataspace development, spec-driven development, AI coding assistant, Eclipse EDC, Dataspace Protocol, DCP, verifiable credentials, compliance testing, TCK, domain-specific dataspace]
image: /img/blog/titleSDD.png
---


Building a dataspace from scratch can feel overwhelming. Multiple protocols, identity frameworks, policy languages, and deployment patterns—where do you even begin? The answer lies in **specification-driven development (SDD)**, supercharged by AI assistants that understand your domain requirements.

This article introduces the **BLUEPRINT methodology**—a phased approach to creating production-grade, compliant dataspaces that's both repeatable and adaptable to any industry vertical, from healthcare to manufacturing to aerospace.

<!-- truncate -->

## The Challenge: Dataspaces Are Complex

Let's be honest about what you're signing up for when building a dataspace:

- **Multiple protocols**: Dataspace Protocol (DSP) for catalog and negotiation, Decentralized Claims Protocol (DCP) for identity
- **Distributed identity**: DIDs, verifiable credentials, IdentityHub, IssuerService
- **Policy enforcement**: ODRL policies, contract definitions, usage control
- **Multi-party trust**: Trust frameworks, credential schemas, verification flows
- **Production concerns**: Kubernetes deployment, observability, security hardening

Traditional approaches either give you a monolithic reference implementation you can't customize, or leave you piecing together documentation fragments. Neither works well for domain-specific requirements.

## The Solution: BLUEPRINT Methodology

The **Minimum Viable Dataspace (MVD)** project introduces a fundamentally different approach. It's not a finished product—it's a **template repository** that provides:

| Component | What You Get | Your Customization |
|-----------|--------------|-------------------|
| **EDC Runtimes** | Controlplane, Dataplane, IdentityHub, Catalog Server, IssuerService | Minimal—works out of box |
| **Custom Extensions** | DCP implementation, catalog resolver, DID resolver | Configure for your identity model |
| **Deployment Templates** | Kubernetes/Terraform, Docker Compose | Adjust ports/resources |
| **Specification Framework** | GitHub Spec Kit templates, ODRL policies, OpenAPI schemas | **Replace with your domain** |
| **Documentation** | BLUEPRINT methodology, cloud deployment guide | Extend with domain specifics |
| **Seeding Scripts** | Identity/credential creation, asset registration | **Replace with your assets** |

The key insight: **separate the infrastructure (stable, reusable) from the domain logic (your differentiation)**.

## What is Specification-Driven Development?

Instead of writing code first and documenting later, SDD flips the process:

```
Specification → Code Generation → Compliance Testing → Implementation
```

This approach ensures:

1. **Traceability**: Every feature maps to a spec requirement
2. **Compliance**: Generated tests verify spec conformance
3. **AI-friendly**: Specs provide context for AI assistants
4. **Domain alignment**: Business requirements drive technical implementation

### The GitHub Spec Kit Workflow

The [GitHub Spec Kit](https://github.com/github/spec-kit) provides a structured workflow for specification-driven development:

```bash
# Install the Spec Kit
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git

# Define project principles
/speckit.constitution

# Create feature specifications
/speckit.specify

# Generate technical implementation plans
/speckit.plan

# Break down into actionable tasks
/speckit.tasks

# Execute implementation with AI assistance
/speckit.implement
```

Each command produces artifacts that feed into the next phase, creating a traceable chain from business requirement to running code.

![alt text](image-2.png)

Using the GitHub Spec Kit framework, architects can deploy a four-phase workflow triggered by the Python-based Specify CLI. This tool bootstraps the SDD scaffolding and injects specialized "Slash Commands" into the development environment:
1. Specify (```/specify```): The agent outlines the "what" and "why," focusing purely on motivations and functional requirements. This bootstraps the Product Requirements Document (PRD) without locking in technical decisions.
2. Plan (```/plan```): The agent defines the "how," selecting frameworks and infrastructure. This phase generates the technical plan and data contracts, grounded by the project's non-negotiable principles.
3. Tasks (```/tasks```): The specification and plan are decomposed into manageable, phased chunks for execution.
4. Implement: The agent builds the project based on the finalized task list, maintaining architectural consistency across tools like Cursor, Claude Code, or Github Copilot.

Central to this is the Constitution (```constitution.md```). For dataspaces, the Constitution establishes "sovereignty-first" principles and standardized policy enforcement as immutable rules. This structured approach ensures that the resulting software is not a collection of disjointed parts but a cohesive implementation of the architect’s intent. This disciplined process is exactly what is required to build and extend the core of modern data exchange: the Eclipse Dataspace Components.


## The Five Phases of BLUEPRINT

![alt text](image.png)

### Phase 1: BASELINE — Foundation Layer

The first phase establishes your dataspace's core identity and infrastructure:

**Activities:**
- Set up development environment (Java 17+, Node.js 18+, OrbStack/KinD)
- Configure initial participants (Provider, Consumer)
- Deploy base EDC runtimes locally
- Seed Catalog, policy, Identity assets
- Deploy your solution to the cloud with Terraform/Kubernetes Helm Charts

**Deliverables:**
- Running EDC infrastructure with IdentityHub
- DID documents for all participants
- Basic credential issuance working

```bash
# Clone and set up MVD
git clone https://github.com/ma3u/MinimumViableDataspace.git
cd MinimumViableDataspace
git checkout -b health-demo  # Your domain branch

# Build core infrastructure
./gradlew build -x test

# Start local deployment
cd launchers/compose
docker-compose up -d
```

### Phase 2: LEVERAGE — Protocol Integration

With infrastructure running, integrate the dataspace protocols:

**Activities:**
- Configure Dataspace Protocol (DSP) endpoints
- Set up credential verification flows
- Implement catalog federation
- Test basic negotiation flows

**Key Protocols:**
- **DSP 2025-1**: Catalog requests, contract negotiation, transfer process
- **DCP**: Verifiable Presentation Protocol, credential issuance, Self-Issued ID tokens

**Validation Checkpoint:**
```bash
# Test DSP catalog endpoint
curl -X POST http://localhost:8080/api/v1/management/catalog/request \
  -H "Content-Type: application/json" \
  -d '{"counterPartyAddress": "http://provider:8082/api/v1/dsp"}'
```

### Phase 3: USE — Domain Customization

This is where your domain expertise shines. Replace placeholder assets with real domain data:

**For Healthcare Dataspace:**
- FHIR R4 resources as data assets
- ISiK/KBV profile compliance
- Patient consent as access policies

**For Manufacturing Dataspace:**
- Digital twin assets
- Supply chain credentials
- Quality certifications

**For Aerospace Dataspace:**
- MRO (Maintenance, Repair, Overhaul) data
- Airworthiness credentials
- Regulatory compliance tracking

**Example: Healthcare Asset Definition**
```json
{
  "@context": {
    "edc": "https://w3id.org/edc/v0.0.1/ns/"
  },
  "@type": "Asset",
  "@id": "fhir-patient-summary",
  "edc:properties": {
    "edc:name": "FHIR Patient Summary",
    "edc:contenttype": "application/fhir+json",
    "edc:fhirProfile": "https://fhir.kbv.de/StructureDefinition/KBV_PR_Base_Patient"
  }
}
```

### Phase 4: EXTEND — Advanced Features

Add production-grade capabilities:

**Security Hardening:**
- Vault integration for key management
- mTLS between components
- Audit logging

**Observability:**
- OpenTelemetry instrumentation
- Prometheus metrics
- Distributed tracing

**Scalability:**
- Kubernetes deployment
- Horizontal scaling
- Database persistence

### Phase 5: PREPARE — Compliance & Certification

The final phase ensures your dataspace passes compliance testing:

**TCK (Technology Compatibility Kit) Testing:**
- DSP TCK for protocol compliance
- DCP TCK for identity compliance
- Domain-specific certification (if applicable)

This is where the specification-driven approach pays off—your implementation was built against the specs, so compliance testing validates rather than surprises.

## Looking Forward: 

### JAD Demonstrator

The **JAD (Just Another Demonstrator)** project showcases the future of dataspace deployment: **Dataspace-as-a-Service (DaaS)**.

JAD deploys a fully-fledged dataspace in Kubernetes, demonstrating how Cloud Service Providers can offer managed dataspace services:

![alt text](image-5.png)

**Getting Started with JAD:**
```bash
# Create KinD cluster
kind create cluster -n edcv --kubeconfig ~/.kube/edcv-kind.conf

# Deploy infrastructure
kubectl apply -f k8s/base/
kubectl wait --namespace edc-v \
  --for=condition=ready pod \
  --selector=type=edcv-infra \
  --timeout=90s

# Deploy applications
kubectl apply -f k8s/apps/
```

JAD demonstrates the complete tenant lifecycle: onboarding, credential issuance, asset registration, catalog publishing, contract negotiation, and data transfer—all through APIs.

### Virtual Connector (EDC-V)

The [Virtual Connector](https://github.com/eclipse-edc/Virtual-Connector) enables multi-tenant dataspace deployments:

- Single control plane serving multiple participants
- Shared infrastructure, isolated data
- Per-tenant credential management
- Cost-efficient at scale

### The Eclipse Connector Fabric Manager (CFM)

The [Connector Fabric Manager (CFM)](https://github.com/Metaform/connector-fabric-manager) orchestrates multi-tenant dataspaces:
- Centralized governance
- Tenant onboarding workflows
- Policy distribution
- Monitoring and billing integration

![alt text](image-6.png)



## Ensuring Compliance: TCK Testing

A dataspace is only valuable if it can interoperate. The **Technology Compatibility Kits (TCKs)** ensure your implementation speaks the same language as others.

### DSP-TCK: Dataspace Protocol Compliance

The [DSP-TCK](https://github.com/eclipse-dataspacetck/dsp-tck) validates protocol compliance across four areas:

| Test Group | Coverage |
|------------|----------|
| **MET** (Metadata) | Protocol version endpoint |
| **CAT** (Catalog) | Catalog request/response flows |
| **CN** (Contract Negotiation) | Provider-side negotiation flows |
| **CN_C** (Consumer Negotiation) | Consumer-side negotiation flows |
| **TP** (Transfer Process) | Provider-side transfer flows |
| **TP_C** (Consumer Transfer) | Consumer-side transfer flows |

**Running DSP-TCK:**
```bash
# Configure TCK
cat > tck.properties << EOF
dataspacetck.dsp.connector.agent.id=urn:connector:my-connector
dataspacetck.dsp.connector.http.url=http://localhost:8080/dsp
dataspacetck.callback.address=http://localhost:8083
EOF

# Run tests via Docker
docker run --rm \
  -v $(pwd)/tck.properties:/config/tck.properties \
  eclipsedataspacetck/dsp-tck-runtime:latest
```

### DCP-TCK: Decentralized Claims Protocol Compliance

![alt text](image-4.png)

The [DCP-TCK](https://github.com/eclipse-dataspacetck/dcp-tck) validates identity protocol compliance:

| Test Package | What It Validates |
|--------------|-------------------|
| **CredentialService** | Presentation queries, credential storage |
| **IssuerService** | Credential issuance, offer flows |
| **Verifier** | Token verification, presentation validation |

**Key Test Flows:**
- Verifiable Presentation Protocol (VPP)
- Self-Issued ID Token creation
- Credential revocation handling

**Running DCP-TCK:**
```bash
docker run --rm \
  --add-host "host.docker.internal:host-gateway" \
  -p "8080:8080" \
  -e "DATASPACETCK_DID_HOLDER=did:web:host.docker.internal%3A4711:holder" \
  -e "DATASPACETCK_CALLBACK_ADDRESS=http://0.0.0.0:8080" \
  -e "DATASPACETCK_STS_URL=http://host.docker.internal:8923/api/sts" \
  eclipsedataspacetck/dcp-tck-runtime:latest
```



## AI-Assisted Development: The Multiplier

Here's where the specification-driven approach truly shines. When you provide an AI coding assistant with:

1. **Clear specifications** (OpenAPI, ODRL schemas)
2. **Domain context** (your constitution, requirements)
3. **Reference implementations** (MVD patterns)

The AI can generate:
- Policy definitions matching your access control requirements
- Asset metadata conforming to domain standards
- Integration code following established patterns
- Test cases derived from specifications

**Example AI Prompt:**
```
Using the ODRL vocabulary and EDC policy schema, create an access 
policy for FHIR Patient resources that:
1. Requires MembershipCredential from a trusted issuer
2. Enforces data residency in EU regions
3. Limits access to authenticated healthcare providers
4. Includes audit logging requirements
```

The AI doesn't guess—it generates spec-compliant artifacts because the context is unambiguous.

## Getting Started Today

### Prerequisites

| Software | Version | Purpose |
|----------|---------|---------|
| Java | 17+ | EDC runtimes |
| Node.js | 18+ | Frontend/tooling |
| uv | Latest | Python package manager |
| OrbStack/Docker | Latest | Container runtime |
| kubectl | Latest | Kubernetes CLI |

### Your First Hour

```bash
# 1. Clone the template
git clone https://github.com/ma3u/MinimumViableDataspace.git
cd MinimumViableDataspace

# 2. Install Spec Kit
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git

# 3. Create your domain branch
git checkout -b my-domain-demo

# 4. Build infrastructure
./gradlew build -x test

# 5. Run local deployment
./gradlew -p launchers/compose up
```

### Your First Week

![alt text](image-3.png)

| Day | Focus Area |
|-----|------------|
| 1 | Set up dev environment, run MVD locally |
| 2 | Understand DSP flow: catalog → negotiate → transfer |
| 3 | Explore DCP: DIDs, credentials, verification |
| 4 | Create first domain-specific asset |
| 5 | Run TCK tests, identify gaps |

## Resources

### Documentation & Repositories

| Resource | URL | Purpose |
|----------|-----|---------|
| **MVD Repository** | [github.com/ma3u/MinimumViableDataspace](https://github.com/ma3u/MinimumViableDataspace) | Template repository |
| **JAD Demonstrator** | [github.com/Metaform/jad](https://github.com/Metaform/jad) | DaaS reference |
| **DSP-TCK** | [github.com/eclipse-dataspacetck/dsp-tck](https://github.com/eclipse-dataspacetck/dsp-tck) | Protocol compliance |
| **DCP-TCK** | [github.com/eclipse-dataspacetck/dcp-tck](https://github.com/eclipse-dataspacetck/dcp-tck) | Identity compliance |
| **EDC Compatibility** | [eclipse-edc.github.io/documentation/compatibility](https://eclipse-edc.github.io/documentation/compatibility/) | Version matrix |

### Specifications

| Spec | Version | URL |
|------|---------|-----|
| Dataspace Protocol | 2025-1 | [eclipse-dataspace-protocol-base.github.io](https://eclipse-dataspace-protocol-base.github.io/DataspaceProtocol/2025-1/) |
| DCP | Latest | [eclipse-dataspace-dcp.github.io](https://eclipse-dataspace-dcp.github.io/decentralized-claims-protocol/) |
| ODRL | 2.2 | [w3.org/TR/odrl-model](https://www.w3.org/TR/odrl-model/) |

---

## Conclusion

Building a domain-specific dataspace doesn't require starting from scratch. The BLUEPRINT methodology, combined with AI-assisted specification-driven development, provides a structured path from concept to compliant, production-ready implementation.

**The formula:**
1. **Start with MVD** — proven infrastructure patterns
2. **Use Spec Kit** — traceable, AI-friendly specifications
3. **Customize your domain** — where your expertise matters
4. **Validate with TCKs** — ensure interoperability
5. **Deploy with confidence** — JAD shows the production path

The dataspace ecosystem is maturing rapidly. The tools, specifications, and reference implementations are ready. Your domain expertise is the missing piece.

Ready to build? [Fork the MVD repository](https://github.com/ma3u/MinimumViableDataspace) and start your first BLUEPRINT phase today.

---

*Want to see this in action? Check out the [JAD Demonstrator](/blog/jad-demonstrator-dataspace-as-a-service) for a complete Dataspace-as-a-Service experience, or explore our [architecture documentation](/docs/architecture/overview) for deep dives into each component.*