import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './use-cases.module.css';

const useCases = [
  {
    id: 'critical-spare-part',
    title: 'Critical Spare Part Retrieval',
    description: 'A wind farm operator needs urgent access to supplier inventory data. See how dataspaces enable rapid, trusted data exchange in emergency situations.',
    color: '#F59E0B',
    path: '/docs/use-cases/critical-spare-part',
  },
  {
    id: 'green-steel-certification',
    title: 'Green Steel Certification',
    description: 'A steel manufacturer shares sustainability credentials with automotive customers. Trusted, verifiable compliance documentation.',
    color: '#10B981',
    path: '/docs/use-cases/green-steel-certification',
  },
  {
    id: 'digital-product-passport',
    title: 'Digital Product Passport',
    description: 'Share product lifecycle data across the value chain for circular economy compliance.',
    color: '#7C3AED',
    path: null,
    comingSoon: true,
  },
  {
    id: 'healthcare-data-exchange',
    title: 'Healthcare Data Exchange',
    description: 'Enable secure patient data sharing between healthcare providers for better outcomes.',
    color: '#EF4444',
    path: null,
    comingSoon: true,
  },
  {
    id: 'supply-chain-visibility',
    title: 'Supply Chain Visibility',
    description: 'Real-time tracking and traceability across multi-tier supply chains.',
    color: '#3B82F6',
    path: null,
    comingSoon: true,
  },
];

function UseCaseCard({ useCase }) {
  const CardWrapper = useCase.path ? Link : 'div';
  const wrapperProps = useCase.path ? { to: useCase.path, className: styles.cardLink } : { className: styles.cardLinkDisabled };
  
  return (
    <CardWrapper {...wrapperProps}>
      <article className={styles.card} style={{ '--layer-color': useCase.color }}>
        <div className={styles.cardAccent} />
        {useCase.comingSoon && <span className={styles.comingSoonBadge}>Coming Soon</span>}
        <h3 className={styles.cardTitle}>{useCase.title}</h3>
        <p className={styles.cardDescription}>{useCase.description}</p>
        {useCase.path && <span className={styles.cardArrow}>Read use case →</span>}
      </article>
    </CardWrapper>
  );
}

export default function UseCasesPage() {
  return (
    <Layout
      title="Use Cases"
      description="Explore practical use cases demonstrating how dataspaces solve real business challenges through trusted data sharing."
    >
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerBackground} />
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Use Cases</h1>
            <p className={styles.subtitle}>
              See trusted data sharing in action. Each use case walks through a complete 
              data exchange flow, from credential verification to secure transfer.
            </p>
          </div>
        </header>

        <section className={styles.cardsSection}>
          <div className={styles.container}>
            <div className={styles.cardsGrid}>
              {useCases.map((useCase) => (
                <UseCaseCard key={useCase.id} useCase={useCase} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
