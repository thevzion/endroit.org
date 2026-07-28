// @ts-check
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hairness.dev',
  integrations: [react()],
  devToolbar: {
    enabled: false,
  },
});
