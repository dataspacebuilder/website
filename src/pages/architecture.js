import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './architecture.module.css';

const sections = [
  {
    id: 'overview',
    title: '1. Overview',
    description: 'Why dataspaces exist: trust-enabled data sharing. The core value proposition and the three layers.',
    color: '#7C3AED',
    path: '/docs/architecture/overview',
  },
  {
    id: 'understanding-stack',
    title: '2. Understanding the Stack',
    description: 'Traditional vs. Modern architecture. The evolution to CFM-managed multi-tenant deployments.',
    color: '#2563EB',
    path: '/docs/architecture/understanding-the-stack',
  },
  {
    id: 'core-concepts',
    title: '3. Core Concepts',
    description: 'Participants & Identity, VPAs, Cells & Infrastructure, Service Virtualization.',
    color: '#0D9488',
    path: '/docs/architecture/core-concepts/participants-identity',
  },
  {
    id: 'trust-framework',
    title: '4. Trust Framework',
    description: 'How trust works: policies, credentials, DTFs, and trust isolation in multi-tenant.',
    color: '#8B5CF6',
    path: '/docs/architecture/trust-framework',
  },
  {
    id: 'components',
    title: '5. Components',
    description: 'CFM, Identity Hub, Control Plane, Data Plane, Issuer Service. Where trust decisions happen.',
    color: '#10B981',
    path: '/docs/architecture/components',
  },
  {
    id: 'protocols',
    title: '6. Protocols',
    description: 'DSP for negotiation, DCP for credentials, DPS for data plane signaling.',
    color: '#6366F1',
    path: '/docs/architecture/protocols',
  },
  {
    id: 'deployment',
    title: '7. Deployment Models',
    description: 'Single-tenant, multi-tenant, edge, hybrid. Migration paths and DSGA implementation.',
    color: '#1E3A5F',
    path: '/docs/architecture/deployment-topologies',
  },
];

function SectionCard({ section }) {
  return (
    <Link to={section.path} className={styles.cardLink}>
      <article className={styles.card} style={{ '--layer-color': section.color }}>
        <div className={styles.cardAccent} />
        <h3 className={styles.cardTitle}>{section.title}</h3>
        <p className={styles.cardDescription}>{section.description}</p>
        <span className={styles.cardArrow}>Learn more →</span>
      </article>
    </Link>
  );
}

function ArchitectureDiagram() {
  return (
    <div className={styles.diagramSection}>
      <div className={styles.diagramContainer}>
        <div className={styles.diagramWrapper}>
          <svg viewBox="0 0 800 520" className={styles.diagram}>
            {/* Trust Framework Layer */}
            <g>
              <rect x="50" y="20" width="700" height="55" rx="8" fill="#f3e8ff" stroke="#7c3aed" strokeWidth="2"/>
              <text x="400" y="42" textAnchor="middle" className={styles.diagramLayerTitle}>Trust Framework Layer</text>
              <text x="400" y="60" textAnchor="middle" className={styles.diagramLayerSubtitle}>Dataspace Trust Frameworks • Credential Issuers • Policies • Trust Anchors</text>
            </g>
            
            {/* Management Layer - CFM */}
            <g>
              <rect x="50" y="90" width="700" height="55" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
              <text x="400" y="112" textAnchor="middle" className={styles.diagramLayerTitle}>Connector Fabric Manager (CFM)</text>
              <text x="400" y="130" textAnchor="middle" className={styles.diagramLayerSubtitle}>Tenant Manager • Provision Manager • Activity Agents • Orchestration</text>
            </g>
            
            {/* Participant Components */}
            <g>
              <rect x="50" y="160" width="700" height="220" rx="8" fill="#f0fdfa" stroke="#0d9488" strokeWidth="2"/>
              <text x="400" y="185" textAnchor="middle" className={styles.diagramLayerTitle}>Participant Components (VPAs)</text>
              
              {/* Identity Hub */}
              <rect x="80" y="205" width="180" height="150" rx="6" fill="white" stroke="#10b981" strokeWidth="1.5"/>
              <text x="170" y="230" textAnchor="middle" className={styles.diagramBoxTitle}>Identity Hub</text>
              <text x="170" y="250" textAnchor="middle" className={styles.diagramBoxSubtitle}>DID Manager</text>
              <text x="170" y="268" textAnchor="middle" className={styles.diagramBoxSubtitle}>Credential Store</text>
              <text x="170" y="286" textAnchor="middle" className={styles.diagramBoxSubtitle}>Presentation Service</text>
              <rect x="95" y="305" width="150" height="22" rx="4" fill="#f3e8ff" stroke="#8b5cf6" strokeWidth="1"/>
              <text x="170" y="320" textAnchor="middle" className={styles.diagramTrustLabel}>TRUST STORE</text>
              
              {/* Control Plane */}
              <rect x="310" y="205" width="180" height="150" rx="6" fill="white" stroke="#0d9488" strokeWidth="1.5"/>
              <text x="400" y="230" textAnchor="middle" className={styles.diagramBoxTitle}>Control Plane</text>
              <text x="400" y="250" textAnchor="middle" className={styles.diagramBoxSubtitle}>Catalog Service</text>
              <text x="400" y="268" textAnchor="middle" className={styles.diagramBoxSubtitle}>Contract Negotiation</text>
              <text x="400" y="286" textAnchor="middle" className={styles.diagramBoxSubtitle}>Policy Engine</text>
              <rect x="325" y="305" width="150" height="22" rx="4" fill="#f3e8ff" stroke="#8b5cf6" strokeWidth="1"/>
              <text x="400" y="320" textAnchor="middle" className={styles.diagramTrustLabel}>TRUST DECISIONS</text>
              
              {/* Data Plane */}
              <rect x="540" y="205" width="180" height="150" rx="6" fill="white" stroke="#f59e0b" strokeWidth="1.5"/>
              <text x="630" y="230" textAnchor="middle" className={styles.diagramBoxTitle}>Data Plane</text>
              <text x="630" y="250" textAnchor="middle" className={styles.diagramBoxSubtitle}>Transfer Execution</text>
              <text x="630" y="268" textAnchor="middle" className={styles.diagramBoxSubtitle}>Protocol Support</text>
              <text x="630" y="286" textAnchor="middle" className={styles.diagramBoxSubtitle}>Access Enforcement</text>
              <rect x="555" y="305" width="150" height="22" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1"/>
              <text x="630" y="320" textAnchor="middle" className={styles.diagramTrustLabel}>TRUST-AGNOSTIC</text>
              
              {/* Arrows */}
              <path d="M260 275 L310 275" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
              <path d="M490 275 L540 275" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
            </g>
            
            {/* Infrastructure Layer */}
            <g>
              <rect x="50" y="400" width="700" height="55" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="2"/>
              <text x="400" y="422" textAnchor="middle" className={styles.diagramLayerTitle}>Infrastructure (Cells)</text>
              <text x="400" y="440" textAnchor="middle" className={styles.diagramLayerSubtitle}>Cloud • On-Premises • Edge • Multi-Tenant (EDC-V) • Kubernetes</text>
            </g>
            
            {/* Vertical connector lines */}
            <path d="M400 75 L400 90" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4"/>
            <path d="M400 145 L400 160" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4"/>
            <path d="M400 380 L400 400" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4"/>
            
            {/* Arrow definition */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#64748b"/>
              </marker>
            </defs>
          </svg>
        </div>
        <p className={styles.diagramCaption}>
          Trust flows through the architecture: Trust Frameworks define rules, CFM provisions infrastructure, 
          Control Plane makes trust decisions, Identity Hub stores credentials, Data Plane executes transfers.
        </p>
      </div>
    </div>
  );
}

export default function ArchitecturePage() {
  return (
    <Layout
      title="Architecture"
      description="Understand the architecture of dataspaces built with Eclipse Dataspace Components (EDC). Trust-first design with CFM, VPAs, Identity Hub, Control Plane, and Data Plane."
    >
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerBackground} />
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Dataspace Architecture</h1>
            <p className={styles.subtitle}>
              Trust-enabled data sharing with Eclipse Dataspace Components
            </p>
          </div>
        </header>

        <ArchitectureDiagram />

        <section className={styles.introSection}>
          <div className={styles.container}>
            <div className={styles.introContent}>
              <p className={styles.introText}>
                Dataspaces exist because organizations need to share data with parties they don't inherently trust. 
                The architecture is built around <strong>trust</strong>: Trust Frameworks define the rules, 
                the <strong>Connector Fabric Manager (CFM)</strong> provisions trust infrastructure,
                the <strong>Control Plane</strong> makes trust decisions, the <strong>Identity Hub</strong> stores 
                credentials, and the <strong>Data Plane</strong> executes transfers without trust logic.
              </p>
              <div className={styles.introCta}>
                <Link className="button button--primary" to="/docs/architecture/overview">
                  Why Dataspaces Exist
                </Link>
                <Link className="button button--secondary" to="/docs/architecture/trust-framework">
                  Trust Framework
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.cardsSection}>
          <div className={styles.container}>
            <div className={styles.cardsGrid}>
              {sections.map((section) => (
                <SectionCard key={section.id} section={section} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.protocolsSection}>
          <div className={styles.container}>
            <h2 className={styles.protocolsTitle}>Standards and Protocols</h2>
            <p className={styles.protocolsSubtitle}>
              Built on open standards for interoperability across implementations
            </p>
            <div className={styles.protocolsGrid}>
              <div className={styles.protocolCard}>
                <h3>Dataspace Protocol (DSP)</h3>
                <p>Catalog discovery, contract negotiation, and transfer initiation between connectors.</p>
              </div>
              <div className={styles.protocolCard}>
                <h3>Decentralized Claims Protocol (DCP)</h3>
                <p>Credential presentation and verification for establishing trust between parties.</p>
              </div>
              <div className={styles.protocolCard}>
                <h3>Data Plane Signaling (DPS)</h3>
                <p>Communication between control plane and data plane for transfer management.</p>
              </div>
            </div>
            <div className={styles.introCta} style={{marginTop: '2rem', justifyContent: 'center'}}>
              <Link className="button button--primary" to="/docs/architecture/protocols">
                Learn About the Protocols
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.evolutionSection}>
          <div className={styles.container}>
            <h2 className={styles.protocolsTitle}>Traditional vs. Modern Architecture</h2>
            <p className={styles.protocolsSubtitle}>
              Understanding the evolution from single-tenant to CFM-managed deployments
            </p>
            <div className={styles.protocolsGrid}>
              <div className={styles.protocolCard}>
                <h3>Traditional (Single-Tenant)</h3>
                <p>One connector per organization. Simple, self-contained. Best for self-hosted and edge deployments.</p>
              </div>
              <div className={styles.protocolCard}>
                <h3>Modern (CFM + EDC-V)</h3>
                <p>Multi-tenant with VPAs. Configuration-based isolation. Best for DSaaS and large enterprises.</p>
              </div>
              <div className={styles.protocolCard}>
                <h3>Hybrid</h3>
                <p>Central control planes with edge data planes. Combines the best of both approaches.</p>
              </div>
            </div>
            <div className={styles.introCta} style={{marginTop: '2rem', justifyContent: 'center'}}>
              <Link className="button button--primary" to="/docs/architecture/understanding-the-stack">
                Understand the Evolution
              </Link>
              <Link className="button button--secondary" to="/docs/architecture/deployment-topologies">
                Deployment Options
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
