import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HeroSection() {
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgePulse}></span>
            European Cloud Accelerator Initiative
          </div>
          <Heading as="h1" className={styles.heroTitle}>
            Build Trusted Data Sharing.<br />
            <span className={styles.heroTitleAccent}>Together.</span>
          </Heading>
          <p className={styles.heroSubtitle}>
            Join the global community building sovereign data sharing with open-source components. 
            No central platform. No vendor lock-in. Just trusted, policy-controlled collaboration.
          </p>
          <div className={styles.heroButtons}>
            <Link
              className="button button--primary button--lg"
              to="/guides">
              Read the Guides
            </Link>
            <Link
              className="button button--secondary button--lg"
              href="https://github.com/eclipse-edc">
              View on GitHub
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}


const Pathways = [
  {
    id: 'decision-makers',
    title: 'Decision Makers',
    subtitle: 'The Business Case for DSaaS',
    description: 'Understand why trusted data sharing matters, the market momentum behind dataspaces, and how DSaaS creates new business opportunities.',
    icon: '📊',
    cta: 'Read the Strategic Guide',
    ctaLink: '/guides/decision-maker-guide',
    highlights: ['Business case', 'Market momentum', 'Deployment options'],
  },
  {
    id: 'architects',
    title: 'Enterprise Architects',
    subtitle: 'DSaaS Implementation',
    description: 'From complexity to commodity. Deploy the EDC stack on your platform and turn data sharing capabilities into a managed service.',
    icon: '🏗️',
    cta: 'Implementation Guide',
    ctaLink: '/guides/ops-multi-tenant-ds-env-guide',
    highlights: ['EDC stack architecture', 'Production operations', 'Multi-tenant setup'],
  },
  {
    id: 'developers',
    title: 'Enterprise Developers',
    subtitle: 'DSaaS Integration',
    description: 'From weeks to days. Learn how to integrate dataspace capabilities into your systems and build applications on DSaaS.',
    icon: '👩‍💻',
    cta: 'Implementation Guide',
    ctaLink: '/guides/ops-multi-tenant-ds-env-guide',
    highlights: ['DSaaS integration', 'On-premise data planes', 'Application development'],
  },
];

function PathwaysSection() {
  return (
    <section className={clsx('section', styles.pathwaysSection)}>
      <div className="container">
        <Heading as="h2" className="section__title">
          Your Path to Dataspaces
        </Heading>
        <p className="section__subtitle">
          Whether you're offering dataspace services, deploying the stack, or integrating with it—there's a clear path forward.
        </p>
        <div className={styles.pathwaysGrid}>
          {Pathways.map((pathway) => (
            <div key={pathway.id} className={styles.pathwayCard}>
              <div className={styles.pathwayIcon}>{pathway.icon}</div>
              <div className={styles.pathwayHeader}>
                <h3 className={styles.pathwayTitle}>{pathway.title}</h3>
                <span className={styles.pathwaySubtitle}>{pathway.subtitle}</span>
              </div>
              <p className={styles.pathwayDescription}>{pathway.description}</p>
              <ul className={styles.pathwayHighlights}>
                {pathway.highlights.map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>
              <Link to={pathway.ctaLink} className={styles.pathwayCta}>
                {pathway.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


const WhyNowReasons = [
  {
    title: 'The Data Act Mandates Interoperability',
    description: 'European regulation requires data sharing by 2027. Dataspaces are the architecture designed to meet these requirements.',
    icon: '⚖️',
  },
  {
    title: 'Industry Ecosystems Are Going Live',
    description: 'Catena-X, Manufacturing-X, DECADE-X—production dataspaces are no longer pilots. They\'re operational.',
    icon: '🚀',
  },
  {
    title: 'Open Standards Are Maturing',
    description: 'DSP, DCP, and ISO 20151 provide a stable foundation. Build on proven protocols, not proprietary APIs.',
    icon: '📐',
  },
];

function WhyNowSection() {
  return (
    <section className={clsx('section section--alt', styles.whyNowSection)}>
      <div className="container">
        <Heading as="h2" className="section__title">
          Why Now?
        </Heading>
        <p className="section__subtitle">
          The window is open. Organizations that move now will shape how data flows in their industries.
        </p>
        <div className={styles.whyNowGrid}>
          {WhyNowReasons.map((reason, idx) => (
            <div key={idx} className={styles.whyNowCard}>
              <span className={styles.whyNowIcon}>{reason.icon}</span>
              <h3 className={styles.whyNowTitle}>{reason.title}</h3>
              <p className={styles.whyNowDescription}>{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section className={clsx('section', styles.communitySection)}>
      <div className="container">
        <Heading as="h2" className="section__title">
          Join the Community
        </Heading>
        <p className="section__subtitle">
          Dataspace Builders is an open source project that anyone in the community can use, improve, and enjoy. We'd love you to join us!
        </p>
        <div className={styles.communityGrid}>
          <div className={styles.communityCard}>
            <h3 className={styles.communityCardTitle}>Learn and Connect</h3>
            <p className={styles.communityCardDescription}>
              Using or want to use Eclipse Dataspace Components? Find out more here:
            </p>
            <ul className={styles.communityLinks}>
              <li>
                <Link href="https://dataspace.eclipse.org/">Eclipse Dataspace Working Group</Link>
              </li>
              <li>
                <Link href="https://eclipse-edc.github.io/documentation/">EDC Documentation</Link>
              </li>
            </ul>
          </div>
          <div className={styles.communityCard}>
            <h3 className={styles.communityCardTitle}>Develop and Contribute</h3>
            <p className={styles.communityCardDescription}>
              If you want to get more involved by contributing to the project, join us here:
            </p>
            <ul className={styles.communityLinks}>
              <li>
                <Link href="https://github.com/eclipse-edc">GitHub Repositories</Link>
              </li>
              <li>
                <Link href="https://github.com/eclipse-edc/Connector/blob/main/CONTRIBUTING.md">Contribution Guidelines</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="section">
      <div className="container">
        <div className="cta-section">
          <h2 className="cta-section__title">Ready to Join the Builders?</h2>
          <p className="cta-section__description">
            Get started with EDC-based trusted data sharing. Open source, open standards, open community.
          </p>
          <div className={styles.ctaButtons}>
            <Link className="button button--primary button--lg" to="/guides">
              Read the Guides
            </Link>
            <Link className="button button--secondary button--lg" href="https://github.com/eclipse-edc">
              View on GitHub
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title="Build Trusted Data Sharing Together"
      description="Dataspace Builders is the global community building trusted data sharing with open-source components. Join us to build dataspaces with Eclipse EDC. No vendor lock-in, just sovereign collaboration.">
      <HeroSection />
      <main>
        <PathwaysSection />
        <WhyNowSection />
        <CommunitySection />
        <CTASection />
      </main>
    </Layout>
  );
}
