# Interoperability

## Why Interoperability Matters

Data creates value when it can interact with other data across organizational and system boundaries. For this to work at ecosystem scale, different systems, organizations, and dataspaces need to exchange, understand, and use data in compatible ways.

Without interoperability, dataspaces fragment into isolated silos — defeating their entire purpose. With interoperability, a participant can join multiple dataspaces, interact with partners regardless of their technology stack, and reuse the same infrastructure across different governance contexts.

## Four Facets of Interoperability

Interoperability is not a single property. It operates at four distinct levels, each requiring alignment:

### Technical Interoperability
The physical and logical connections between systems: protocols, interfaces, and data formats.

In dataspaces, technical interoperability is achieved through **DSP** and **DCP**. These protocols define how Connectors communicate, regardless of implementation, vendor, or deployment model. The DSGA specifies which protocol versions are mandatory for its dataspace.

If two dataspaces mandate the same protocol versions, participants can reuse the same technical components across both — reducing operational burden.

### Semantic Interoperability
The meaning and interpretation of the data exchanged: concepts, relationships, vocabularies, and ontologies.

To participate in a dataspace, a participant must understand at minimum:
- The **policy vocabulary** — what each policy means, what values are accepted, how they are evaluated
- The **credential formats** — how claims and attributes are structured

Semantic models for the *actual data being shared* are optional but strongly recommended. Without them, data consumers must guess what fields mean, leading to misinterpretation. For example, if a "country code" field uses ISO two-letter codes in one system and three-letter codes in another, interoperability breaks at the semantic level even if the protocols work perfectly.

### Organizational Interoperability
The processes, policies, and governance of data sharing: roles, responsibilities, agreements, and workflows.

When two dataspaces define the same organizational processes (e.g., onboarding, dispute resolution), participation across both becomes significantly simpler. Divergent processes increase the burden on participants who must comply with each set independently.

### Legal Interoperability
The acceptance of legal equivalence across jurisdictions, regulations, and contractual frameworks.

Just because a policy has the same semantic definition in two dataspaces does not mean it has the same legal force. Legal interoperability requires explicit agreements about how policies map to legal obligations — especially when participants operate across jurisdictions.

## Intra-Dataspace vs. Cross-Dataspace Interoperability

### Within a Dataspace
The DSGA defines the interoperability requirements: which protocols, semantic models, trust frameworks, and processes all participants must support. Compliance with these requirements is a condition of membership.

Participants may support additional capabilities beyond the minimum, but they must at least meet the DSGA's requirements.

### Across Dataspaces
When an organization participates in multiple dataspaces, interoperability becomes the participant's responsibility. They must:
- Meet the membership requirements of each dataspace
- Support all required protocols and their versions
- Understand all required semantic models
- Comply with all governance processes
- Track which data came from which dataspace and what obligations apply

This burden can be reduced when DSGAs cooperate: agreeing on common protocols, shared semantic models, and mutual recognition of credentials.

## Interoperability Models

### Hierarchical Dataspaces
A larger dataspace contains sub-dataspaces with additional rules. The sub-dataspace inherits the parent's governance while adding its own. Interoperability is straightforward because the foundation is shared.

*Example: An industrial dataspace has a sub-dataspace for one company's direct suppliers, adding specific data sharing requirements on top of the industry-wide rules.*

### Peer Dataspaces
Two dataspaces operate in different domains but have substantial participant overlap. To reduce burden, they agree on common protocols, semantic models, and organizational processes — including legal equivalence where possible.

*Example: A manufacturing dataspace and a logistics dataspace agree on shared semantic models for supply chain data.*

### Unrelated Dataspaces
Two dataspaces with no coordination, where only a few participants need to access data from both. The full interoperability burden falls on those participants, who may need separate technical environments for each.

## Technology Compatibility Kit (TCK)

Interoperability claims must be verifiable. The **TCK** provides automated conformance testing for DSP and DCP implementations:

- [**DSP TCK**](https://github.com/eclipse-dataspacetck/dsp-tck) — validates Control Plane implementations
- [**DCP TCK**](https://github.com/eclipse-dataspacetck/dcp-tck) — validates Credential Service implementations

Running the TCK against an implementation provides objective evidence of protocol compliance. Passing results are published openly, building ecosystem trust.

The TCK prevents fragmentation: instead of incompatible variants proliferating, the ecosystem maintains a common compliance baseline.

## Improving Interoperability

Interoperability improves through progressively broader agreements:

1. **Between two participants** — bilateral agreements, tailored to specific use cases
2. **Within a group** — shared conventions adopted by a community
3. **Within a common framework** — adoption of the same technical or organizational framework
4. **Between service providers** — interoperable solutions offered as services
5. **Within a dataspace governance framework** — default interoperability for all participants
6. **Between DSGAs** — bridges across dataspaces through mutual recognition

Each level reduces friction and extends the network of interoperable participants.

---

**Go deeper**: [IDSA Rulebook — Interoperability](../reference/community.md) | [IDSA Rulebook — Vocabularies](../reference/community.md)

**Related concepts**: [Protocols](./protocols.md) | [Trust and Governance](./trust-and-governance.md) | [What Is a Dataspace](./what-is-a-dataspace.md)
