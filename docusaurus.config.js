// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

// Feature flag for architecture docs
const ENABLE_ARCHITECTURE = process.env.ENABLE_ARCHITECTURE === 'true';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Dataspace Builders',
  tagline: 'Build trusted data sharing. Together.',
  favicon: 'img/favicon.ico',

  url: 'https://dataspacebuilder.github.io',
  baseUrl: '/website/',

  organizationName: 'dataspacebuilder',
  projectName: 'website',

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
          path: 'guides',
          routeBasePath: 'guides',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/dataspace-builders/dataspace-builders/tree/main/',
          blogSidebarTitle: 'All guides',
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
          { to: '/guides', label: 'Guides', position: 'left' },
          // Architecture link conditionally enabled via ENABLE_ARCHITECTURE env var
          ...(ENABLE_ARCHITECTURE ? [{ to: '/docs/architecture/overview', label: 'Architecture', position: 'left' }] : []),
          { 
            href: 'https://github.com/eclipse-edc', 
            label: 'GitHub', 
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Learn',
            items: [
              { label: 'Guides', to: '/guides' },
              { label: 'EDC Documentation', href: 'https://eclipse-edc.github.io/documentation/' },
            ],
          },
          {
            title: 'Community',
            items: [
              { label: 'Eclipse Dataspace WG', href: 'https://dataspace.eclipse.org/' },
              { label: 'GitHub', href: 'https://github.com/eclipse-edc' },
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
