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
  'get-started',
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
    label: 'Guides',
    collapsed: false,
    items: [
      'guides/decision-makers',
      'guides/architects',
      'guides/operators',
      'guides/developers',
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
