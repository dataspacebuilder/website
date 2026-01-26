/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  architectureSidebar: [
    {
      type: 'category',
      label: 'Architecture',
      items: [
        'architecture/pyramid',
        'architecture/trust-framework',
        'architecture/identity-hub',
        'architecture/control-plane',
        'architecture/data-plane',
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
