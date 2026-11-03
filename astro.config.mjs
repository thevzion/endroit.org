// @ts-check
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import legacyAnchors from './scripts/legacy-anchors.mjs';

export default defineConfig({
  site: 'https://endroit.org',
  integrations: [react(), legacyAnchors()],
  vite: {
    plugins: [tailwindcss()],
  },
  devToolbar: {
    enabled: false,
  },
});
