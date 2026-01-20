# A Minimal Dataspace Use Case — From Zero to Value

## Context

*Company A* is a medium-sized manufacturer operating a production line.
*Company B* is a service provider that supports predictive maintenance.

They already exchange files by email and APIs, but:

•⁠  ⁠integrations are brittle,
•⁠  ⁠access rules are unclear,
•⁠  ⁠trust is manual,
•⁠  ⁠and scaling this to more partners is painful.

Both have heard of dataspaces, but until now they were “too heavy” to try.

---

## Step 0 — Getting Started (No Commitment)

Company A’s IT team deploys the *minimal dataspace stack*:

•⁠  ⁠control plane
•⁠  ⁠data plane
•⁠  ⁠identity / trust component
•⁠  ⁠lightweight discovery / indexing component

This takes less than an hour using provided deployment scripts.

No consortium membership.
No contracts signed.
No data shared yet.

The system is idle but ready.

---

## Step 1 — Publishing Data (Producer Side)

A production engineer at Company A wants to share *one data point*:
the *current temperature of a machine*.

She opens a simple web interface provided by the stack.

She sees:

	⁠“What do you want to share?”

She selects:

•⁠  ⁠*Data type*: Machine telemetry
•⁠  ⁠*Value*: Temperature
•⁠  ⁠*Unit*: °C

She clicks *Publish*.

### What happens behind the scenes

•⁠  ⁠The data is registered in the control plane as an available asset
•⁠  ⁠A default access policy is applied (“read-only, purpose-bound”)
•⁠  ⁠A standard contract offer template is generated
•⁠  ⁠The data becomes discoverable via the indexing component

The engineer does not see any of this.

She just sees:

	⁠“Data published successfully.”

---

## Step 2 — Making the Data Discoverable

The system automatically exposes:

•⁠  ⁠a reference to the data,
•⁠  ⁠metadata describing what it is,
•⁠  ⁠and how access can be requested.

The engineer clicks *“Share link”* and sends it to Company B.

This link is not the data itself.
It is simply a reference that allows others to discover what is available and how to request it.

---

## Step 3 — Discovering the Data (Consumer Side)

An engineer at Company B opens the link.

He sees a clean page:

	⁠*Available data*
	⁠– Machine temperature
	⁠– Last update: 2 minutes ago
	⁠– Access: Request required

He clicks *Request access*.

---

## Step 4 — Requesting Access (Contract & Trust)

The system asks him one simple question:

	⁠“What is the purpose of use?”

He enters:

	⁠“Predictive maintenance service”

He clicks *Submit*.

### What happens behind the scenes

•⁠  ⁠His organization’s credentials are automatically checked
•⁠  ⁠A contract negotiation request is created using a standard template
•⁠  ⁠The request is sent to Company A’s control plane

No emails.
No PDFs.
No manual contract drafting.

---

## Step 5 — Approving Access (Producer Side)

Company A receives a notification:

	⁠“Company B requests access to machine temperature data.”
	⁠Purpose: Predictive maintenance

The data owner sees:

•⁠  ⁠who is requesting,
•⁠  ⁠what data,
•⁠  ⁠for what purpose,
•⁠  ⁠under which standard rules.

She clicks *Approve*.

That’s it.

---

## Step 6 — Accessing the Data

Company B immediately sees:

	⁠“Access granted.”

He clicks *Get data*.

The current temperature value is returned.

Behind the scenes:

•⁠  ⁠the contract is now active,
•⁠  ⁠the policy is enforced by the control plane,
•⁠  ⁠the data plane delivers the value,
•⁠  ⁠and access is logged for audit purposes.

From the user’s perspective:

	⁠“I requested data and now I have it.”

---

## Step 7 — Using the Data

Company B:

•⁠  ⁠integrates the temperature value into their maintenance dashboard,
•⁠  ⁠sets up a periodic pull or subscription,
•⁠  ⁠and starts delivering value to Company A.

No custom API integration.
No bespoke agreements.
No one-off solution.

---

## Step 8 — Scaling the Same Pattern

Encouraged by how easy this was, Company A:

•⁠  ⁠publishes vibration data,
•⁠  ⁠shares maintenance logs,
•⁠  ⁠and later sustainability metrics.

Company B:

•⁠  ⁠reuses the same request and contract flow,
•⁠  ⁠without new integrations.

Later, a *third company* joins and uses the *same stack and templates*.

The pattern repeats.

---

## Why This Use Case Is Minimal — and Powerful

### Minimal because:

•⁠  ⁠only one data point is shared,
•⁠  ⁠only one producer and one consumer,
•⁠  ⁠no advanced semantics,
•⁠  ⁠no complex governance,
•⁠  ⁠no regulatory overhead.

### Powerful because:

•⁠  ⁠it demonstrates the full dataspace lifecycle,
•⁠  ⁠it uses real contracts and trust,
•⁠  ⁠it works with existing systems,
•⁠  ⁠it scales without redesign,
•⁠  ⁠and it creates immediate value.

---

## What This Proves

This story shows that:

•⁠  ⁠dataspaces do not need to start “big”,
•⁠  ⁠adoption does not require upfront ecosystem alignment,
•⁠  ⁠the new stack works with existing concepts,
•⁠  ⁠and value can be created in minutes, not months.

Once organizations experience this flow, the dataspace stops being an abstract idea and becomes a *practical tool* they want to reuse.

---

## The Key Takeaway

	⁠*If a dataspace can handle one simple data point intuitively, it can scale to complex scenarios naturally.*

This minimal use case is the foundation on which network effects, trust, interoperability, and sustainable business models can grow.