export default {
  title: 'Documentation',
  description: 'API3 technical documentation',
  markdown: {
    lineNumbers: true,
    toc: ['h2', 'h3', 'h4', 'h5'],
  },
  appearance: true,
  ignoreDeadLinks: true,
  head: [
    [
      'script',
      {},
      "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\nnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\nj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n})(window,document,'script','dataLayer','GTM-PKWG7ZFR');",
    ],
    ['link', { rel: 'stylesheet', href: '/styles/api3.css' }],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/img/small-logo.png',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/img/small-logo.png',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/img/small-logo.png',
      },
    ],
  ],
  themeConfig: {
    externalLinkIcon: true,
    logo: {
      light: '/img/API3-Active.png',
      dark: '/img/api3-inactive.png',
    },
    siteTitle: 'Documentation',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/api3dao/vitepress-docs' },
      {
        icon: 'discord',
        link: 'https://discord.com/channels/758003776174030948/765618225144266793',
      },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present API3',
    },
    sidebar: {
      '/dapis/': require('../dapis/sidebar.js'),
      '/oev/': require('../oev/sidebar.js'),
      '/dev/': require('../dev/sidebar.js'),
    },
    nav: nav(),
  },
};

function nav() {
  return [
    { text: 'Home', link: '/' },
    {
      text: 'dAPIs',
      link: '/dapis/introduction/',
      activeMatch: '/dapis/.*',
    },
    { text: 'OEV', link: '/oev/', activeMatch: '/oev/.*' },
  ];
}
