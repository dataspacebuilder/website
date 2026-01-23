# Integration Guide

> Connecting your internal systems to the Dataspace Connector

---

## Architecture Overview

Your **Dataspace Connector** acts as a gateway between your internal IT landscape and the external dataspace ecosystem. Integration typically happens at two levels:

1.  **Control Plane Integration:** Managing assets and negotiations (Management API).
2.  **Data Plane Integration:** Moving the actual data.

---

## 1. Management API

The Control Plane exposes a REST API for your internal applications to manage the dataspace lifecycle.

*   **Integration Pattern:** Build a lightweight "wrapper" or internal dashboard that calls these APIs.
*   **Key Operations:**
    *   `POST /assets` - Register new data resources from your ERP/Database.
    *   `POST /contractdefinitions` - Publish offers based on business logic.
    *   `POST /catalog/request` - Search for external data.
    *   `POST /contractnegotiations` - Initiate a purchase/access request.

> **EDC Reference:** [Edc Management API Swagger](https://eclipse-edc.github.io/Connector/openapi/management-api/)

---

## 2. Data Plane Integration

The Data Plane is responsible for reading from your source and writing to your destination.

### Supported Source Systems
Out-of-the-box, the Eclipse Dataspace Components support:
*   **HttpData:** REST APIs (the most common interface).
*   **Amazon S3:** Direct reads from S3 buckets.
*   **Azure Blob Storage:** Direct reads from Azure containers.

### Integration Patterns

**A. The "Facade" Pattern (Recommended for APIs)**
Don't expose your internal legacy database directly. Create a dedicated internal API (Facade) that:
1.  Authenticates the Connector.
2.  Fetches/Sanitizes the data.
3.  Returns it to the Data Plane.

**B. The "Drop Zone" Pattern (Recommended for Files)**
Designate a specific S3 bucket or folder as the "Dataspace Drop Zone".
1.  Internal system exports file to Drop Zone.
2.  Asset is registered pointing to that file.
3.  Connector reads file when requested.

---

## 3. Identity & Security

### Managing Keys (Vault)
The connector needs access to secrets (API keys for your systems, private keys for signing). These are stored in a secure **Vault** (HashiCorp Vault, Azure KeyVault).

### Authentication
Secure the Management API using an API Key (`x-api-key`) to prevent unauthorized internal access.

---

## Checklist for Production Integration

- [ ] **Firewall Ports:** Ensure outbound access for DSP protocol (HTTPS).
- [ ] **Public Endpoint:** Your connector needs a publicly resolvable URL.
- [ ] **Vault:** Configure a secure secrets engine.
- [ ] **Backup:** Backup the connector's PostgreSQL database (stores contract history).
