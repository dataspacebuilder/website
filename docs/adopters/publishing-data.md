# Publishing Data

> How to share your data assets securely in a dataspace

---

## Overview

Publishing data in a dataspace is different from uploading a file to an FTP server. You don't "upload" data to the dataspace; instead, you **register** it. The data stays in your system until a validated consumer requests it.

To publish data, you create three key entities:

1.  **Asset:** What you are sharing (metadata + location).
2.  **Policy:** Who can access it and how (rules).
3.  **Contract Definition:** Linking assets to policies to create an offer.

---

## 1. Creating an Asset

An Asset represents a dataset, API, or service. It consists of two parts:

### Data Address
Details on where the connector can find the data *internally* to serve it.
*   **Type:** `AmazonS3`, `AzureStorage`, `HttpData`
*   **Properties:** Bucket name, specific file path, or API URL.

### Metadata
Public information describing the asset (DCAT standard).
*   `id`: Unique identifier
*   `name`: Human-readable title
*   `description`: What the data contains
*   `contenttype`: MIME type (e.g., `application/json`, `text/csv`)
*   `version`: Version of the dataset

> **EDC Note:** Assets are created via the Management API.

---

## 2. Defining Policies

Policies control access using the **ODRL (Open Digital Rights Language)** standard.

### Usage Policy
Rules that apply *after* the data is transferred.
*   *Example:* "Data must be deleted after 30 days."

### Access Policy
Rules that determine *if* a consumer can negotiate a contract.
*   *Example:* "Consumer must have the credential `MembershipCredentials` issued by `Gaia-X`."
*   *Example:* "Consumer DID must be in the allowed list."

---

## 3. Creating a Contract Definition

The Contract Definition is the final step that publishes the offer to the catalog. It binds policies to assets.

*   **Access Policy:** Who can see this offer?
*   **Contract Policy:** What terms must they agree to?
*   **Assets:** Which assets does this apply to? (Selected by ID or property selector)

Once created, your connector will automatically include these offers in its **Catalog**, which other participants can query via the Dataspace Protocol.

---

## Best Practices

*   **Granularity:** Create specific assets for specific purposes rather than one giant "dump".
*   **Metadata Quality:** Rich metadata helps partners find your data.
*   **Policy reuse:** Define standard policies (e.g., "Partner Only") and reuse them across multiple assets.
