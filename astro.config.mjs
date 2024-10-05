import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://provindcheck.com',
  output: 'server',
  integrations: [tailwind(), react(), sitemap()],
  markdownOptions: {
    syntaxHighlight: 'shiki',
    // or 'prism' for different highlighting options
    remarkPlugins: [],
    rehypePlugins: []
  },
  adapter: cloudflare()
});