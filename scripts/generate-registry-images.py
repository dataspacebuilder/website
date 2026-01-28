#!/usr/bin/env python3
"""
Generate registry modernization blog images using DALL-E 3.
These images replace the German versions with English text.
"""

import os
from openai import OpenAI

client = OpenAI()

# Image prompts for registry modernization blog post - ALL IN ENGLISH
REGISTRY_IMAGES = {
    "registry-noots-architecture.jpeg": """
Technical architecture diagram showing NOOTS (National Once-Only Technical System) data flow.
Left side labeled "Data Consumer" (government authority icon), right side labeled "Data Provider" (registry database icon).
Center shows NOOTS middleware layer with components: "Registry Discovery", "Policy Engine", "Data Broker".
Arrows showing: Request flow from Consumer through NOOTS to Provider, Response flow back.
Labels in English: "Evidence Request", "Policy Validation", "Secure Transfer", "Evidence Response".
Clean modern technical diagram style, navy blue (#1E3A5F) and teal (#0D9488) color scheme, 
white background, professional government IT documentation aesthetic, geometric shapes.
""",

    "registry-simpl-agents.jpeg": """
Technical diagram showing SIMPL-Open agents architecture for dataspace communication.
Two participant boxes on left and right, each containing an "Agent" component.
Center shows secure channel with "Dataspace Protocol" label.
Agent components show: "Catalog", "Contract Negotiation", "Data Transfer" layers.
Labels in English: "Participant A", "Participant B", "Secure Data Exchange", "Policy Enforcement".
eDelivery AS4 protocol indicator at data plane level.
Clean EU technical documentation style, teal and navy color scheme with orange (#F59E0B) highlights,
professional European Commission aesthetic, modern geometric design.
""",

    "registry-protocols-standards.jpeg": """
Paradigm shift visualization for government interoperability.
Left side showing "Traditional" approach: siloed systems, point-to-point connections, tangled lines.
Right side showing "Dataspace" approach: standardized protocols, organized hub topology.
Center arrow labeled "Paradigm Shift" with "Once-Only Principle" subtitle.
Protocol badges: "DSP 1.0", "DCP", "W3C DCAT", "W3C ODRL", "W3C DID".
Labels in English: "From Silos to Standards", "Interoperable Administration".
Clean infographic style, purple (#7C3AED) and green (#10B981) accents,
professional government modernization theme, modern European aesthetic.
""",

    "registry-decentralized-identity.jpeg": """
Trust automation diagram with decentralized identities and verifiable credentials.
Three-column layout: "Issuer" (ministry icon), "Holder" (wallet icon), "Verifier" (checkpoint icon).
Credential flow arrows between columns showing issuance and presentation.
Center shows "Trust Triangle" with cryptographic verification symbols.
Labels in English: "Issue Credential", "Store in Wallet", "Present & Verify", "Automated Trust".
DID and VC icons, digital signature symbols.
Clean modern identity management diagram, green (#10B981) primary color,
professional SSI/identity theme, European digital identity aesthetic.
""",

    "registry-did-necessity.jpeg": """
Diagram showing why Decentralized Identifiers (W3C DID) are necessary for registry interconnection.
Top: Traditional model with central IdP as "Single Point of Failure" (red warning).
Bottom: Decentralized model with peer-to-peer trust, DIDs enabling direct verification.
Comparison labels in English: "Centralized Risk" vs "Decentralized Resilience".
DID method examples: "did:web", "did:key" shown as identifier formats.
Labels: "No Central Authority Required", "Cryptographic Proof", "Cross-Border Trust".
Clean comparison diagram, red/orange for risks, green/teal for solutions,
professional security architecture theme, modern government IT aesthetic.
""",

    "registry-legal-compliance.jpeg": """
Legal compliance architecture for registry modernization.
Three pillars diagram: "DID" (identity), "ODRL Policies" (rules), "Data Contracts" (agreements).
Each pillar shows key features beneath.
Top banner: "GDPR Compliant Registry Modernization".
Compliance checkmarks for: "Data Sovereignty", "Audit Trail", "Purpose Limitation", "Consent Management".
Labels in English: "Decentralized Identity", "Machine-Readable Policies", "Legally Binding Contracts".
Clean legal/compliance diagram style, professional colors (navy, teal, green),
European regulatory aesthetic, trust and governance theme.
""",

    "registry-zero-trust.jpeg": """
Zero Trust Architecture implementation diagram for government dataspaces.
Center: "Zero Trust" shield icon with "Never Trust, Always Verify" subtitle.
Surrounding elements: "Data Sovereignty", "EU Data Act", "Policy Enforcement", "Identity Verification".
Network diagram showing: no implicit trust, every request verified.
Labels in English: "Dynamic Identity Assertions", "Cryptographic Verification", "Continuous Validation".
NIST SP 800-207 reference badge.
Clean security architecture style, navy (#1E3A5F) and orange (#F59E0B) for alerts,
professional government security theme, modern Zero Trust aesthetic.
""",

    "registry-modernization-cover.jpeg": """
Cover image for registry modernization article.
Abstract visualization of European government buildings connecting through digital infrastructure.
Central hub representing dataspace with radiating connections to multiple registry nodes.
European stars motif subtly integrated.
Text overlay area (dark gradient) for title placement.
Symbols: Government buildings, database icons, secure connection lines, EU flag elements.
Labels minimal - primarily visual storytelling.
Professional editorial cover style, navy (#1E3A5F) and teal (#0D9488) gradient,
modern European digital government aesthetic, inspiring and forward-looking mood.
"""
}

def generate_image(prompt: str, filename: str, output_dir: str = "static/img/blog"):
    """Generate an image using DALL-E 3 and save it."""
    print(f"Generating: {filename}...")
    
    # Clean up the prompt (remove extra whitespace)
    clean_prompt = " ".join(prompt.split())
    
    try:
        response = client.images.generate(
            model="dall-e-3",
            prompt=clean_prompt,
            size="1792x1024",  # Landscape for blog headers
            quality="standard",
            n=1,
        )
        
        image_url = response.data[0].url
        
        # Download and save the image
        import urllib.request
        output_path = os.path.join(output_dir, filename)
        urllib.request.urlretrieve(image_url, output_path)
        print(f"  ✓ Saved: {output_path}")
        return True
        
    except Exception as e:
        print(f"  ✗ Error generating {filename}: {e}")
        return False

def main():
    """Generate all registry images."""
    print("=" * 60)
    print("Registry Modernization Blog Image Generator")
    print("Generating English versions of all images...")
    print("=" * 60)
    
    output_dir = "static/img/blog"
    os.makedirs(output_dir, exist_ok=True)
    
    success_count = 0
    for filename, prompt in REGISTRY_IMAGES.items():
        if generate_image(prompt, filename, output_dir):
            success_count += 1
    
    print("=" * 60)
    print(f"Complete: {success_count}/{len(REGISTRY_IMAGES)} images generated")
    print("=" * 60)

if __name__ == "__main__":
    main()