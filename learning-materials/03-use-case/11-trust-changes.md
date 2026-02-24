# Chapter 11: What Happens When Trust Changes

Real supply chains aren't static. Three scenarios show how the system responds.

---

**A provider tightens its policy.** VeloForge changes its policy from "any active member" to "only FerroLink." LumenDrive browses the catalog — the offer is gone. FerroLink browses — still visible. One policy change, immediate effect, no integrations modified.

**A credential is revoked.** NebulaFlow's membership is suspended by the consortium. NebulaFlow tries to negotiate access — denied. No provider did anything. The credential was revoked at the consortium level and every policy referencing it now excludes NebulaFlow. When the credential is re-issued, access is restored.

**A credential expires.** Every credential has a validity period. When it expires, the next negotiation fails. The company renews with the consortium to participate again.

---

Policies are updated by providers. Credentials are managed by the consortium. Effects are immediate — the next catalog query or negotiation reflects the current state.

### How trust is managed

Two services handle trust behind the scenes:

| Service | Operated by | What it does |
|---------|------------|-------------|
| **Identity Hub** | Each participant | Stores the participant's DID, key pairs, and verifiable credentials. Presents credentials during negotiations on the participant's behalf. |
| **Issuer Service** | The consortium (TrustGrid) | Issues and revokes verifiable credentials. Defines what credential types exist and what they mean. |

When QuantisSeal's control plane evaluates a policy during negotiation, it asks the consumer's Identity Hub for a credential presentation. The Identity Hub responds with a signed proof. The control plane checks it against the policy. All automated, all within the protocol.

Revoking a credential at the Issuer Service means the next presentation will fail verification. No provider configuration changes needed.

---

**Next:** [What We Built](12-what-we-built.md)
