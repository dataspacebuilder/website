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

const sidebars = {
  // Architecture docs are conditionally enabled via ENABLE_ARCHITECTURE_DOCS flag above
  ...(ENABLE_ARCHITECTURE_DOCS && { architectureSidebar }),
};

export default sidebars;
