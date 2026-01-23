# Consuming Data

> How to discover and access data from partners

---

## The Consumption Workflow

Consuming data in a dataspace involves a standardized negotiation process defined by the **Dataspace Protocol (DSP)**.

1.  **Discovery:** Find what data is available.
2.  **Negotiation:** Agree on terms of usage.
3.  **Transfer:** Move the data to your system.

---

## 1. Discovery (Catalog)

You don't browse a central website to find data. Instead, your connector queries the **Catalogs** of other participants or a **Federated Catalog** service.

*   **Request:** Your connector asks another connector "What do you have?"
*   **Response:** A DCAT catalog containing available **Contract Offers**.

Each offer details:
*   Asset Metadata (Name, Description)
*   Policy Requirements (e.g., "Must be a certified audit firm")

---

## 2. Contract Negotiation

Once you identify an asset you want, you initiate a negotiation.

1.  **Request:** "I want to access Asset X under terms Y."
2.  **Validation:** The provider's connector checks if you meet the policy requirements (e.g., verifies your credentials).
3.  **Agreement:** If valid, both parties sign a **Contract Agreement**.

> **Note:** This happens automatically in seconds if your credentials match the provider's policy.

---

## 3. Data Transfer

With a valid Contract Agreement, you can request the data.

### Transfer Types

*   **Pull (Synchronous):** You download the data. The provider generates a temporary access token (EDR - Endpoint Data Reference) which you use to fetch the file or call the API directly.
*   **Push (Asynchronous):** You ask the provider to push the data to your S3 bucket or HTTP endpoint.

### The Data Plane
The actual data flows through the **Data Plane**. It connects directly to the source and destination storage, ensuring high performance and security without routing traffic through the control layer.

---

## Handling Data Usage

If the contract includes usage constraints (e.g., "Delete after 7 days"), you are technically and legally bound to adhere to them. Advanced setups may use **Data Usage Control** extensions to technically enforce these rules within your environment.
