import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './architecture.module.css';

const sections = [
  {
    id: 'overview',
    title: 'Overview',
    description: 'What are dataspaces, why you need them, and what they can do. Understand the core concepts of decentralized, policy-controlled data sharing.',
    color: '#7C3AED',
    path: '/docs/architecture/overview',
  },
  {
    id: 'components',
    title: 'Dataspace Components',
    description: 'Essential components: Identity Hub, Control Plane, Data Plane, Connector Fabric Manager, and how they work together.',
    color: '#0D9488',
    path: '/docs/architecture/components',
  },
  {
    id: 'identity-hub',
    title: 'Identity Hub',
    description: 'Decentralized identifiers (DIDs) and verifiable credentials for automated trust between organizations.',
    color: '#10B981',
    path: '/docs/architecture/identity-hub',
  },
  {
    id: 'control-plane',
    title: 'Control Plane',
    description: 'Catalog discovery, contract negotiation, and policy enforcement using the Dataspace Protocol (DSP).',
    color: '#0D9488',
    path: '/docs/architecture/control-plane',
  },
  {
    id: 'data-plane',
    title: 'Data Plane',
    description: 'Secure data transfer execution supporting HTTP, S3, industrial protocols, and more.',
    color: '#F59E0B',
    path: '/docs/architecture/data-plane',
  },
  {
    id: 'protocols',
    title: 'Protocols',
    description: 'DSP, DCP, and DPS: the three standard protocols that enable interoperability between implementations.',
    color: '#6366F1',
    path: '/docs/architecture/protocols',
  },
  {
    id: 'deployment',
    title: 'Deployment Topologies',
    description: 'Cloud-native, on-premises, edge, and multi-tenant deployments with CFM and EDC-V.',
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
          <svg viewBox="0 0 800 480" className={styles.diagram}>
            {/* Trust Framework Layer */}
            <g>
              <rect x="50" y="20" width="700" height="55" rx="8" fill="#f3e8ff" stroke="#7c3aed" strokeWidth="2"/>
              <text x="400" y="42" textAnchor="middle" className={styles.diagramLayerTitle}>Trust Framework</text>
              <text x="400" y="60" textAnchor="middle" className={styles.diagramLayerSubtitle}>Credential Issuers • Governance • Trust Registries</text>
            </g>
            
            {/* Management Layer */}
            <g>
              <rect x="50" y="90" width="700" height="55" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
              <text x="400" y="112" textAnchor="middle" className={styles.diagramLayerTitle}>Management Layer</text>
              <text x="400" y="130" textAnchor="middle" className={styles.diagramLayerSubtitle}>Connector Fabric Manager • Tenant Manager • Provision Manager</text>
            </g>
            
            {/* Participant Components */}
            <g>
              <rect x="50" y="160" width="700" height="200" rx="8" fill="#f0fdfa" stroke="#0d9488" strokeWidth="2"/>
              <text x="400" y="185" textAnchor="middle" className={styles.diagramLayerTitle}>Participant Components</text>
              
              {/* Identity Hub */}
              <rect x="80" y="205" width="180" height="130" rx="6" fill="white" stroke="#10b981" strokeWidth="1.5"/>
              <text x="170" y="235" textAnchor="middle" className={styles.diagramBoxTitle}>Identity Hub</text>
              <text x="170" y="260" textAnchor="middle" className={styles.diagramBoxSubtitle}>DID Manager</text>
              <text x="170" y="280" textAnchor="middle" className={styles.diagramBoxSubtitle}>Credential Store</text>
              <text x="170" y="300" textAnchor="middle" className={styles.diagramBoxSubtitle}>Presentation Service</text>
              
              {/* Control Plane */}
              <rect x="310" y="205" width="180" height="130" rx="6" fill="white" stroke="#0d9488" strokeWidth="1.5"/>
              <text x="400" y="235" textAnchor="middle" className={styles.diagramBoxTitle}>Control Plane</text>
              <text x="400" y="260" textAnchor="middle" className={styles.diagramBoxSubtitle}>Catalog Service</text>
              <text x="400" y="280" textAnchor="middle" className={styles.diagramBoxSubtitle}>Contract Negotiation</text>
              <text x="400" y="300" textAnchor="middle" className={styles.diagramBoxSubtitle}>Policy Engine</text>
              
              {/* Data Plane */}
              <rect x="540" y="205" width="180" height="130" rx="6" fill="white" stroke="#f59e0b" strokeWidth="1.5"/>
              <text x="630" y="235" textAnchor="middle" className={styles.diagramBoxTitle}>Data Plane</text>
              <text x="630" y="260" textAnchor="middle" className={styles.diagramBoxSubtitle}>Transfer Execution</text>
              <text x="630" y="280" textAnchor="middle" className={styles.diagramBoxSubtitle}>Protocol Support</text>
              <text x="630" y="300" textAnchor="middle" className={styles.diagramBoxSubtitle}>Access Enforcement</text>
              
              {/* Arrows */}
              <path d="M260 270 L310 270" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
              <path d="M490 270 L540 270" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
            </g>
            
            {/* Infrastructure Layer */}
            <g>
              <rect x="50" y="380" width="700" height="55" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="2"/>
              <text x="400" y="402" textAnchor="middle" className={styles.diagramLayerTitle}>Infrastructure</text>
              <text x="400" y="420" textAnchor="middle" className={styles.diagramLayerSubtitle}>Cloud • On-Premises • Edge • Multi-Tenant (EDC-V)</text>
            </g>
            
            {/* Arrow definition */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#64748b"/>
              </marker>
            </defs>
          </svg>
        </div>
        <p className={styles.diagramCaption}>
          Dataspace architecture: Trust frameworks establish governance, management components orchestrate deployments, 
          participant components enable data sharing, infrastructure provides flexibility.
        </p>
      </div>
    </div>
  );
}

export default function ArchitecturePage() {
  return (
    <Layout
      title="Architecture"
      description="Understand the architecture of dataspaces built with Eclipse Dataspace Components (EDC). Learn about Identity Hub, Control Plane, Data Plane, CFM, and deployment options."
    >
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerBackground} />
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Dataspace Architecture</h1>
            <p className={styles.subtitle}>
              The architectural concepts behind trusted data sharing with Eclipse Dataspace Components
            </p>
          </div>
        </header>

        <ArchitectureDiagram />

        <section className={styles.introSection}>
          <div className={styles.container}>
            <div className={styles.introContent}>
              <p className={styles.introText}>
                A dataspace deployment consists of <strong>trust framework</strong> components that establish governance, 
                a <strong>management layer</strong> that orchestrates multi-tenant deployments,
                <strong> participant components</strong> that enable data sharing, and <strong>infrastructure</strong> that 
                provides deployment flexibility. The architecture separates concerns between identity, business logic, 
                and data transfer—enabling interoperability, scalability, and sovereignty.
              </p>
              <div className={styles.introCta}>
                <Link className="button button--primary" to="/docs/architecture/overview">
                  Read the Overview
                </Link>
                <Link className="button button--secondary" to="/docs/architecture/components">
                  Explore Components
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
      </main>
    </Layout>
  );
}
