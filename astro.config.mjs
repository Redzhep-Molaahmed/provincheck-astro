import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind()],
  markdownOptions: {
    syntaxHighlight: 'shiki', // or 'prism' for different highlighting options
    remarkPlugins: [],
    rehypePlugins: [],
  },
}
);