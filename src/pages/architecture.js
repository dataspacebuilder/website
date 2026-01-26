import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './architecture.module.css';

const layers = [
  {
    id: 'pyramid',
    title: 'The Trusted Data Sharing Pyramid',
    description: 'Overview of the five-layer architecture enabling sovereign, policy-controlled data exchange.',
    color: '#0D9488',
    path: '/docs/architecture/pyramid',
  },
  {
    id: 'trust-framework',
    title: 'Trust Framework & Credentials',
    description: 'Governance structures, credential issuers, and schemas that define the rules of participation.',
    color: '#7C3AED',
    path: '/docs/architecture/trust-framework',
  },
  {
    id: 'identity-hub',
    title: 'Identity Hub',
    description: 'DIDs and verifiable credentials enabling machine-verifiable trust between organizations.',
    color: '#10B981',
    path: '/docs/architecture/identity-hub',
  },
  {
    id: 'control-plane',
    title: 'Control Plane',
    description: 'Contract negotiation, policy enforcement, and catalog management with the EDC Connector.',
    color: '#0D9488',
    path: '/docs/architecture/control-plane',
  },
  {
    id: 'data-plane',
    title: 'Data Plane',
    description: 'Secure data transfer execution using agreed protocols and access tokens.',
    color: '#F59E0B',
    path: '/docs/architecture/data-plane',
  },
  {
    id: 'deployment',
    title: 'Deployment Topologies',
    description: 'Cloud, on-premises, and edge deployment options including multi-tenant EDC-V.',
    color: '#1E3A5F',
    path: '/docs/architecture/deployment-topologies',
  },
];

function LayerCard({ layer }) {
  return (
    <Link to={layer.path} className={styles.cardLink}>
      <article className={styles.card} style={{ '--layer-color': layer.color }}>
        <div className={styles.cardAccent} />
        <h3 className={styles.cardTitle}>{layer.title}</h3>
        <p className={styles.cardDescription}>{layer.description}</p>
        <span className={styles.cardArrow}>Read more →</span>
      </article>
    </Link>
  );
}

export default function ArchitecturePage() {
  return (
    <Layout
      title="Architecture"
      description="Understand the five-layer architecture for trusted data sharing with Eclipse Dataspace Components."
    >
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerBackground} />
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Architecture</h1>
            <p className={styles.subtitle}>
              A five-layer stack enabling sovereign, policy-controlled data exchange 
              between organizations
            </p>
          </div>
        </header>

        <section className={styles.cardsSection}>
          <div className={styles.container}>
            <div className={styles.cardsGrid}>
              {layers.map((layer) => (
                <LayerCard key={layer.id} layer={layer} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
