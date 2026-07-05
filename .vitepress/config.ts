import { defineConfig } from 'vitepress'

// JSON-LD structured data (Organization + SoftwareApplication) so search
// engines and LLM crawlers can resolve the product's entity, ownership, and
// where it is published. Emitted once in the document <head> below.
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://backtest.wickra.org/#organization',
      name: 'Wickra',
      url: 'https://backtest.wickra.org/',
      logo: 'https://backtest.wickra.org/wickra-mark.svg',
      sameAs: [
        'https://github.com/wickra-lib/wickra-backtest',
        'https://github.com/wickra-lib/wickra',
        'https://wickra.org/',
      ],
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://backtest.wickra.org/#software',
      name: 'Wickra Backtest',
      url: 'https://backtest.wickra.org/',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Windows, macOS, Linux, WebAssembly',
      programmingLanguage: ['Rust', 'Python', 'JavaScript', 'WebAssembly', 'C', 'C++', 'C#', 'Go', 'Java', 'R'],
      description:
        'A streaming-native, event-driven backtester on the Wickra core — backtest and live are byte-identical, and a strategy is JSON, not code — in ten languages.',
      license: 'https://github.com/wickra-lib/wickra-backtest#license',
      publisher: { '@id': 'https://backtest.wickra.org/#organization' },
    },
  ],
}

export default defineConfig({
  title: 'Wickra Backtest',
  description:
    'A streaming-native, event-driven backtester on the Wickra core — backtest and live are byte-identical, and a strategy is JSON, not code — in ten languages.',
  lang: 'en-US',
  cleanUrls: true,

  // Served at the domain root (backtest.wickra.org via Cloudflare Pages).
  base: '/',

  sitemap: { hostname: 'https://backtest.wickra.org' },

  // README.md is repo documentation, not a site page — keep it out of the build.
  srcExclude: ['README.md'],

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/wickra-mark.svg' }],
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: 'any' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#0ea5e9' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Wickra Backtest — backtest and live, byte-identical' }],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'A streaming-native, event-driven backtester on the Wickra core: a strategy is a JSON spec, not code, so a backtest and a live run over the same spec produce identical signals, in ten languages, byte-identical across every binding.',
      },
    ],
    ['meta', { property: 'og:image', content: 'https://backtest.wickra.org/og-banner.webp' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://backtest.wickra.org/og-banner.webp' }],
    ['script', { type: 'application/ld+json' }, JSON.stringify(structuredData)],
  ],

  transformPageData(pageData) {
    const path = pageData.relativePath.replace(/(?:index)?\.md$/, '')
    const canonical = `https://backtest.wickra.org/${path}`
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonical }],
      ['meta', { property: 'og:url', content: canonical }],
    )
  },

  themeConfig: {
    siteTitle: 'Wickra Backtest',
    logo: { src: '/wickra-mark.svg', alt: 'Wickra Backtest' },
    logoLink: 'https://wickra.org/',

    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'API',
        items: [
          { text: 'Rust', link: '/api/rust' },
          { text: 'Python', link: '/api/python' },
          { text: 'Node', link: '/api/node' },
          { text: 'WASM', link: '/api/wasm' },
          { text: 'C', link: '/api/c' },
          { text: 'C#', link: '/api/csharp' },
          { text: 'Go', link: '/api/go' },
          { text: 'Java', link: '/api/java' },
          { text: 'R', link: '/api/r' },
        ],
      },
      { text: 'GitHub', link: 'https://github.com/wickra-lib/wickra-backtest' },
      {
        text: 'Links',
        items: [
          { text: 'crates.io', link: 'https://crates.io/crates/wickra-backtest' },
          { text: 'PyPI', link: 'https://pypi.org/project/wickra-backtest/' },
          { text: 'npm', link: 'https://www.npmjs.com/package/wickra-backtest' },
          { text: 'NuGet', link: 'https://www.nuget.org/packages/WickraBacktest' },
          { text: 'Maven Central', link: 'https://central.sonatype.com/artifact/org.wickra/wickra-backtest' },
          { text: 'Go module', link: 'https://pkg.go.dev/github.com/wickra-lib/wickra-backtest-go' },
          { text: 'r-universe', link: 'https://wickra-lib.r-universe.dev' },
        ],
      },
      {
        text: 'v0.1.0',
        items: [
          { text: 'Release notes', link: 'https://github.com/wickra-lib/wickra-backtest/releases' },
          { text: 'Changelog', link: 'https://github.com/wickra-lib/wickra-backtest/blob/main/CHANGELOG.md' },
          { text: 'docs.rs', link: 'https://docs.rs/wickra-backtest/latest/wickra_backtest/' },
        ],
      },
      {
        text: 'Ecosystem',
        items: [
          { text: 'Wickra (core)', link: 'https://wickra.org' },
          { text: 'Docs', link: 'https://docs.wickra.org' },
          { text: 'wickra-exchange', link: 'https://github.com/wickra-lib/wickra-exchange' },
          { text: 'wickra-copilot', link: 'https://github.com/wickra-lib/wickra-copilot' },
          { text: 'wickra-terminal', link: 'https://github.com/wickra-lib/wickra-terminal' },
          { text: 'wickra-xray', link: 'https://github.com/wickra-lib/wickra-xray' },
          { text: 'wickra-screener', link: 'https://github.com/wickra-lib/wickra-screener' },
          { text: 'wickra-radar', link: 'https://github.com/wickra-lib/wickra-radar' },
          { text: 'wickra-shazam', link: 'https://github.com/wickra-lib/wickra-shazam' },
        ],
      },
    ],

    sidebar: {
      '/api/': [
        {
          text: 'Bindings',
          items: [
            { text: 'Rust', link: '/api/rust' },
            { text: 'Python', link: '/api/python' },
            { text: 'Node', link: '/api/node' },
            { text: 'WASM', link: '/api/wasm' },
            { text: 'C', link: '/api/c' },
            { text: 'C#', link: '/api/csharp' },
            { text: 'Go', link: '/api/go' },
            { text: 'Java', link: '/api/java' },
            { text: 'R', link: '/api/r' },
          ],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/wickra-lib/wickra-backtest' }],

    search: { provider: 'local' },

    outline: { level: [2, 3], label: 'On this page' },

    lastUpdated: { text: 'Updated', formatOptions: { dateStyle: 'medium' } },
  },

  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' },
    lineNumbers: false,
  },
})
