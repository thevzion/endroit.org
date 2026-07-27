// @ts-check
// @ts-expect-error Astro runs this config in Node; the site does not need Node types.
import { existsSync, readdirSync } from 'node:fs';
import { defineConfig } from 'astro/config';

/** @type {import('astro').AstroIntegration} */
const iterationLab = {
  name: 'hairness-iteration-lab',
  hooks: {
    'astro:config:setup': ({ command, injectRoute }) => {
      if (command !== 'dev') return;

      injectRoute({
        pattern: '/lab',
        entrypoint: new URL('./src/lab/index.astro', import.meta.url),
      });

      const iterations = new URL('./src/lab/iterations/', import.meta.url);
      const folders = /** @type {string[]} */ (readdirSync(iterations));

      for (const slug of folders) {
        const page = new URL(`${slug}/Page.astro`, iterations);
        if (!existsSync(page)) continue;

        injectRoute({
          pattern: `/lab/${slug}`,
          entrypoint: page,
        });
      }

      injectRoute({
        pattern: '/diagram-lab',
        entrypoint: new URL('./src/lab/iterations/001-diagram-lab/Page.astro', import.meta.url),
      });
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://hairness.dev',
  integrations: [iterationLab],
  devToolbar: {
    enabled: false,
  },
});
