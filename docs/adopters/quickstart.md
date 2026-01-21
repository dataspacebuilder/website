# Adopter Quick Start

> Your first data exchange in under an hour

---

## Overview

This guide walks you through participating in a dataspace as a data provider and consumer. By the end, you'll have:

- Published a data asset from your organization
- Requested access to partner data
- Completed your first data exchange

**Time Required:** ~45-60 minutes  
**Prerequisites:** Access to a dataspace provider account

---

## Step 1: Access Your Dashboard

### 1.1 Log In to Your Tenant Portal

Your organization should have received credentials from your dataspace provider. Navigate to your tenant URL:

```
https://your-org.dataspace.provider.com
```

Log in with your organizational credentials (typically via SSO).

### 1.2 Explore the Dashboard

You'll see:
- **My Assets** — Data you're sharing
- **Catalog** — Data available from partners
- **Agreements** — Active contracts
- **Transfers** — Ongoing and historical exchanges

---

## Step 2: Publish Your First Data Asset

Let's publish a simple data asset to understand the flow.

### 2.1 Navigate to "My Assets"

Click **+ New Asset** to start the publishing wizard.

### 2.2 Define the Asset

| Field | Example Value |
|-------|---------------|
| Name | `Product Specifications Q1 2026` |
| Description | `Technical specifications for our Q1 2026 product line` |
| Type | `Document` |
| Format | `application/pdf` |

### 2.3 Connect the Data Source

Choose how partners will access this data:

- **Upload File** — For static documents
- **REST API** — Connect to your existing API
- **Database** — Query from a database table
- **Object Storage** — Link to S3/Azure Blob/etc.

For this quickstart, select **Upload File** and upload a sample document.

### 2.4 Set Access Policy

Define who can access this asset:

```yaml
# Example policy (shown as simplified view)
Access Rules:
  - Allow if: Partner is verified member
  - Allow if: Purpose is "product development"
  - Deny: All others
```

In the UI, this translates to checkboxes and dropdowns—no code required.

### 2.5 Publish

Click **Publish**. Your asset is now:
- Visible in the dataspace catalog
- Protected by your access policy
- Ready for partners to discover

---

## Step 3: Discover Partner Data

### 3.1 Browse the Catalog

Navigate to **Catalog** to see assets shared by other participants.

### 3.2 Search and Filter

Use filters to find relevant data:
- **Category**: Product data, Sustainability metrics, etc.
- **Provider**: Specific partner organizations
- **Data Type**: Documents, APIs, Streams

### 3.3 View Asset Details

Click on an asset to see:
- Description and metadata
- Data format and schema
- Access requirements
- Available contract templates

---

## Step 4: Request Access

### 4.1 Initiate Contract Negotiation

On the asset detail page, click **Request Access**.

### 4.2 State Your Purpose

You'll be asked:
- **Purpose of use**: Why do you need this data?
- **Duration**: How long do you need access?
- **Intended recipients**: Who in your organization will use it?

### 4.3 Submit Request

Click **Submit**. The system will:
1. Verify your credentials against the provider's policy
2. Create a contract negotiation request
3. Send it to the data provider for approval (if manual review is required)

### 4.4 Wait for Approval

- **Automatic approval**: If your credentials match the policy, access is granted immediately
- **Manual review**: The provider reviews and approves/rejects

You'll receive a notification when the decision is made.

---

## Step 5: Access the Data

### 5.1 Agreement Confirmed

Once approved, the agreement appears in your **Agreements** section.

### 5.2 Initiate Transfer

Click on the agreement and select **Transfer Data**.

Choose your destination:
- **Download** — Direct download to your browser
- **Push to Storage** — Send to your S3/Azure/GCS bucket
- **API Endpoint** — Receive via webhook

### 5.3 Receive the Data

The data is transferred securely:
- Encrypted in transit
- Logged for audit purposes
- Usage terms enforced

---

## Step 6: Verify and Celebrate 🎉

You've completed the full dataspace cycle:

✅ Published data with access controls  
✅ Discovered partner offerings  
✅ Negotiated and signed a contract  
✅ Securely exchanged data  

---

## What's Different Here?

| Traditional Approach | Dataspace Approach |
|---------------------|-------------------|
| Email files, hope for the best | Controlled, auditable access |
| Weeks of legal negotiation | Automated contract in seconds |
| Custom API integration per partner | Standard protocol for all |
| "Did they get it? Did they use it right?" | Full visibility and enforcement |

---

## Next Steps

Now that you understand the basics:

### Deepen Your Data Publishing
- [Publishing Data Guide](publishing-data.md) — Connect real data sources
- [Access Policies](contracts.md) — Design sophisticated access rules

### Integrate with Your Systems  
- [API Integration](api-integration.md) — Automate data exchanges
- [Industrial Data Planes](industrial-data-planes.md) — Connect manufacturing systems

### Explore Use Cases
- [Use Case Examples](use-cases.md) — See what others are doing

---

## Troubleshooting

### Can't see partner assets?
- Ensure your credentials are valid
- Check that you have the required certifications
- Contact your dataspace administrator

### Contract negotiation failed?
- Review the access requirements on the asset
- Ensure your stated purpose matches allowed uses
- Request manual review if automatic matching fails

### Data transfer not completing?
- Check your destination configuration
- Verify network connectivity to your storage
- Review transfer logs for error details

---

## Getting Help

- **In-app support**: Click the help icon in your dashboard
- **Documentation**: You're here! Keep exploring
- **Your provider**: Contact your dataspace service provider
