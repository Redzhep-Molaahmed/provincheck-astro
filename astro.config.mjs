import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind(), react()],
  markdownOptions: {
    syntaxHighlight: 'shiki',
    // or 'prism' for different highlighting options
    remarkPlugins: [],
    rehypePlugins: []
  },
  adapter: cloudflare()
});