import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [tailwind(), react()],
  markdownOptions: {
    syntaxHighlight: 'shiki',
    // or 'prism' for different highlighting options
    remarkPlugins: [],
    rehypePlugins: []
  }
});