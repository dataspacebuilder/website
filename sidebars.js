/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

// ============================================
// FEATURE FLAG: Enable architecture docs via environment variable
// Usage: ENABLE_ARCHITECTURE=true npm run start
// ============================================
const ENABLE_ARCHITECTURE_DOCS = process.env.ENABLE_ARCHITECTURE === 'true';

const architectureSidebar = [
  {
    type: 'category',
    label: 'Architecture',
    link: {
      type: 'doc',
      id: 'architecture/overview',
    },
    items: [
      'architecture/overview',
      'architecture/understanding-the-stack',
      {
        type: 'category',
        label: 'Core Concepts',
        link: {
          type: 'doc',
          id: 'architecture/core-concepts/index',
        },
        items: [
          'architecture/core-concepts/index',
          'architecture/core-concepts/participants-identity',
          'architecture/core-concepts/virtual-participant-agents',
          'architecture/core-concepts/cells-infrastructure',
          'architecture/core-concepts/service-virtualization',
        ],
      },
      'architecture/trust-framework',
      {
        type: 'category',
        label: 'Components',
        link: {
          type: 'doc',
          id: 'architecture/components',
        },
        items: [
          'architecture/components',
          'architecture/identity-hub',
          'architecture/control-plane',
          'architecture/data-plane',
        ],
      },
      'architecture/protocols',
      'architecture/deployment-topologies',
    ],
  },
];

// ============================================
// Docs section — trusted data sharing documentation
// ============================================
const docsSidebar = [
  'index',
  {
    type: 'category',
    label: 'Concepts',
    collapsed: false,
    items: [
      'concepts/what-is-a-dataspace',
      'concepts/trust-and-governance',
      'concepts/decentralized-identity',
      'concepts/protocols',
      'concepts/roles-and-participation',
      'concepts/data-sharing-lifecycle',
      'concepts/interoperability',
      'concepts/ai-agents',
    ],
  },
  {
    type: 'category',
    label: 'Learning Paths',
    collapsed: false,
    link: {
      type: 'doc',
      id: 'learning-paths/index',
    },
    items: [
      {
        type: 'category',
        label: 'Platform Setup',
        link: {
          type: 'doc',
          id: 'learning-paths/platform-setup/index',
        },
        items: [
          'learning-paths/platform-setup/prerequisites',
          'learning-paths/platform-setup/edc-services',
          'learning-paths/platform-setup/connector-fabric-manager',
          'learning-paths/platform-setup/activity-agents',
          'learning-paths/platform-setup/identity-provider-setup',
          'learning-paths/platform-setup/provisioning-participants',
          'learning-paths/platform-setup/customer-handoff',
        ],
      },
      {
        type: 'category',
        label: 'System Integration',
        link: {
          type: 'doc',
          id: 'learning-paths/system-integration/index',
        },
        items: [
          'learning-paths/system-integration/publishing-data',
          'learning-paths/system-integration/consuming-data',
          'learning-paths/system-integration/management-api',
          'learning-paths/system-integration/identity-hub',
          'learning-paths/system-integration/data-plane-architecture',
          'learning-paths/system-integration/deploying-a-data-plane',
        ],
      },
      {
        type: 'category',
        label: 'Use Case: Product Info Sharing',
        link: {
          type: 'doc',
          id: 'learning-paths/use-case/index',
        },
        items: [
          'learning-paths/use-case/the-problem',
          'learning-paths/use-case/the-companies',
          'learning-paths/use-case/how-a-dataspace-works',
          'learning-paths/use-case/veloforge-shares',
          'learning-paths/use-case/ferrolink-gets',
          'learning-paths/use-case/ferrolink-provides',
          'learning-paths/use-case/quantisseal-adds-trust',
          'learning-paths/use-case/lumendrive-assembles',
          'learning-paths/use-case/nebulaflow-sees-everything',
          'learning-paths/use-case/documents-get-updated',
          'learning-paths/use-case/trust-changes',
          'learning-paths/use-case/what-we-built',
        ],
      },
    ],
  },
  {
    type: 'category',
    label: 'Components',
    collapsed: false,
    items: [
      'components/connector',
      'components/identity-hub',
      'components/data-planes',
      'components/redline',
      'components/cfm',
    ],
  },
  {
    type: 'category',
    label: 'Reference',
    collapsed: true,
    items: [
      'reference/protocols',
      'reference/apis',
      'reference/glossary',
      'reference/community',
    ],
  },
];

const sidebars = {
  docsSidebar,
  // Architecture docs are conditionally enabled via ENABLE_ARCHITECTURE_DOCS flag above
  ...(ENABLE_ARCHITECTURE_DOCS && { architectureSidebar }),
};

export default sidebars;
