export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'],
        allow: '/',
      },
      {
        userAgent: ['OAI-SearchBot', 'Claude-SearchBot'],
        allow: '/',
      },
    ],
    sitemap: 'https://www.institutolala.com.mx/sitemap.xml',
  }
}