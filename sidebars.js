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
        'architecture/components',
        'architecture/identity-hub',
        'architecture/control-plane',
        'architecture/data-plane',
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
