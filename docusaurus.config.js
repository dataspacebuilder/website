// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Dataspace Builders',
  tagline: 'Build trusted data infrastructure. Together.',
  favicon: 'img/favicon.ico',

  url: 'https://dataspacebuilders.org',
  baseUrl: '/',

  organizationName: 'dataspace-builders',
  projectName: 'dataspace-builders',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Markdown configuration
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/dataspace-builders/dataspace-builders/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/dataspace-builders/dataspace-builders/tree/main/',
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.png',
      navbar: {
        title: 'Dataspace Builders',
        logo: {
          alt: 'Dataspace Builders Logo',
          src: 'img/logo.png',
        },
        items: [
          { to: '/blog', label: 'Blog', position: 'left' },
          { to: '/architecture', label: 'Architecture', position: 'left' },
          { to: '/use-cases', label: 'Use Cases', position: 'left' },
          { to: '/community', label: 'Community', position: 'left' },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Learn',
            items: [
              { label: 'Architecture', to: '/architecture' },
              { label: 'Use Cases', to: '/use-cases' },
            ],
          },
          {
            title: 'Community',
            items: [
              { label: 'Eclipse Dataspace WG', href: 'https://dataspace.eclipse.org/' },
              { label: 'GitHub', href: 'https://github.com/eclipse-edc' },
            ],
          },
          {
            title: 'More',
            items: [
              { label: 'Blog', to: '/blog' },
              { label: 'EDC Documentation', href: 'https://eclipse-edc.github.io/documentation/' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Dataspace Builders. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'json', 'yaml'],
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      mermaid: {
        theme: { light: 'neutral', dark: 'dark' },
        options: {
          themeVariables: {
            primaryColor: '#0D9488',
            primaryTextColor: '#1E3A5F',
            primaryBorderColor: '#10B981',
            lineColor: '#64748B',
            secondaryColor: '#F0FDFA',
            tertiaryColor: '#F8FAFC',
          },
        },
      },
    }),
};

export default config;
