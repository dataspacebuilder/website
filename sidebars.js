/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  architectureSidebar: [
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
  ],
  useCasesSidebar: [
    {
      type: 'category',
      label: 'Use Cases',
      items: [
        'use-cases/critical-spare-part',
        'use-cases/green-steel-certification',
      ],
    },
  ],
};

export default sidebars;
