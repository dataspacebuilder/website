import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
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
            Build Trusted Data Infrastructure.<br />
            <span className={styles.heroTitleAccent}>Together.</span>
          </Heading>
          <p className={styles.heroSubtitle}>
            Join the global community building sovereign data sharing with open-source components. 
            No central platform. No vendor lock-in. Just trusted, policy-controlled data exchange.
          </p>
          <div className={styles.heroButtons}>
            <Link
              className="button button--primary button--lg"
              to="/blog/your-first-steps-as-dataspace-builder">
              Start Building
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/blog">
              Read the Blog
            </Link>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNumber}>5+</span>
              <span className={styles.heroStatLabel}>Cloud Providers Building</span>
            </div>
            <div className={styles.heroStatDivider}></div>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNumber}>100%</span>
              <span className={styles.heroStatLabel}>Open Source</span>
            </div>
            <div className={styles.heroStatDivider}></div>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNumber}>DSP/DCP</span>
              <span className={styles.heroStatLabel}>Standards-Based</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function TrustBar() {
  const logos = [
    { name: 'Eclipse Foundation', type: 'foundation' },
    { name: 'IDSA', type: 'foundation' },
    { name: 'Gaia-X', type: 'foundation' },
    { name: 'Catena-X', type: 'industry' },
    { name: 'DECADE-X', type: 'industry' },
  ];

  return (
    <section className={styles.trustBar}>
      <div className="container">
        <p className={styles.trustBarLabel}>
          Built on Eclipse Dataspace Components — Trusted by leading organizations
        </p>
        <div className={styles.trustBarLogos}>
          {logos.map((logo, idx) => (
            <span key={idx} className={clsx(styles.trustBarLogo, styles[`trustBarLogo--${logo.type}`])}>
              {logo.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const Pathways = [
  {
    id: 'cloud-providers',
    title: 'Cloud Providers',
    subtitle: 'Offer Dataspace-as-a-Service',
    description: 'Add trusted data sharing to your cloud portfolio. Multi-tenant architecture means margin. Open standards mean no lock-in for your customers.',
    icon: '☁️',
    cta: 'See the Business Case',
    ctaLink: '/blog/why-dataspaces-matter-cloud-providers',
    highlights: ['New revenue stream', 'Multi-tenant EDC-V', 'Managed identity services'],
  },
  {
    id: 'developers',
    title: 'Developers',
    subtitle: 'Build with Open Components',
    description: 'Production-ready building blocks for identity, trust, contracts, and data transfer. If you know APIs and OAuth, you\'re 80% there.',
    icon: '👩‍💻',
    cta: 'Read the Technical Guide',
    ctaLink: '/blog/zero-to-dataspace-rapid-adoption',
    highlights: ['Eclipse EDC stack', 'Verifiable credentials', 'Policy-based exchange'],
  },
  {
    id: 'organizations',
    title: 'Organizations',
    subtitle: 'Join a Dataspace',
    description: 'Share data with partners on your own terms. Participate in industry ecosystems like Manufacturing-X, DECADE-X, or build your own.',
    icon: '🏢',
    cta: 'Understand Dataspaces',
    ctaLink: '/blog/what-are-dataspaces-plain-language',
    highlights: ['Data sovereignty', 'Automated trust', 'Regulatory compliance'],
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
          Whether you're building infrastructure, developing software, or joining an ecosystem—there's a clear path forward.
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

const UseCases = [
  {
    title: 'Emergency Parts Data in Minutes',
    description: 'A wind farm operator needs urgent access to a supplier\'s inventory. Trust credentials verify the emergency role, and data flows within minutes—not days.',
    industry: 'Energy',
    link: '/docs/use-cases/critical-spare-part',
  },
  {
    title: 'Carbon Credentials Without Exposure',
    description: 'A steel manufacturer proves sustainability compliance without exposing proprietary process data. Verifiable credentials travel with the batch.',
    industry: 'Manufacturing',
    link: '/docs/use-cases/green-steel-certification',
  },
];

function UseCasesSection() {
  return (
    <section className={clsx('section section--alt', styles.useCasesSection)}>
      <div className="container">
        <Heading as="h2" className="section__title">
          See It in Action
        </Heading>
        <p className="section__subtitle">
          Real problems, solved by trusted data sharing.
        </p>
        <div className={styles.useCasesGrid}>
          {UseCases.map((useCase, idx) => (
            <Link to={useCase.link} key={idx} className={styles.useCaseCard}>
              <span className={styles.useCaseIndustry}>{useCase.industry}</span>
              <h3 className={styles.useCaseTitle}>{useCase.title}</h3>
              <p className={styles.useCaseDescription}>{useCase.description}</p>
              <span className={styles.useCaseLink}>Read the use case →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchitecturePreview() {
  const stackImageUrl = useBaseUrl('/img/stack.jpeg');
  return (
    <section className={clsx('section', styles.architectureSection)}>
      <div className="container">
        <div className={styles.architectureContent}>
          <div className={styles.architectureText}>
            <Heading as="h2" className={styles.architectureSectionTitle}>
              A Clear, Layered Architecture
            </Heading>
            <p className={styles.architectureSubtitle}>
              Five layers that work together to enable trusted, policy-controlled data sharing across organizations.
            </p>
            <div className={styles.architectureLayers}>
              <div className={clsx(styles.architectureLayer, styles.layerTrustFramework)}>
                <span className={styles.layerName}>Trust Frameworks</span>
                <span className={styles.layerDesc}>Governance & credential schemas</span>
              </div>
              <div className={clsx(styles.architectureLayer, styles.layerTrustPlane)}>
                <span className={styles.layerName}>Trust Plane</span>
                <span className={styles.layerDesc}>Identity Hub & verifiable credentials</span>
              </div>
              <div className={clsx(styles.architectureLayer, styles.layerControlPlane)}>
                <span className={styles.layerName}>Control Plane</span>
                <span className={styles.layerDesc}>Catalog, negotiation & policies</span>
              </div>
              <div className={clsx(styles.architectureLayer, styles.layerDataPlane)}>
                <span className={styles.layerName}>Data Plane</span>
                <span className={styles.layerDesc}>Secure data transfer</span>
              </div>
              <div className={clsx(styles.architectureLayer, styles.layerInfrastructure)}>
                <span className={styles.layerName}>Infrastructure</span>
                <span className={styles.layerDesc}>Cloud, edge, on-premises</span>
              </div>
            </div>
            <Link className="button button--primary" to="/docs/architecture/pyramid">
              Explore the Full Architecture
            </Link>
          </div>
          <div className={styles.architectureImage}>
            <img 
              src={stackImageUrl} 
              alt="Dataspace Builders Architecture - Five-layer stack for trusted data sharing"
            />
          </div>
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
            <Link className="button button--primary button--lg" to="/blog/your-first-steps-as-dataspace-builder">
              Get Started
            </Link>
            <Link className="button button--secondary button--lg" to="/community">
              Join the Community
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
      title="Build Trusted Data Infrastructure Together"
      description="Dataspace Builders is the global community building trusted data infrastructure with open-source components. Join us to build dataspaces with Eclipse EDC. No vendor lock-in, just sovereign data exchange.">
      <HeroSection />
      <TrustBar />
      <main>
        <PathwaysSection />
        <UseCasesSection />
        <ArchitecturePreview />
        <WhyNowSection />
        <CTASection />
      </main>
    </Layout>
  );
}
