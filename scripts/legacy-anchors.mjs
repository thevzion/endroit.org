import { readFile, writeFile } from 'node:fs/promises';

// Add the historical anchor to the built page without changing owned Markdown.
export default function legacyAnchors() {
  return {
    name: 'endroit-legacy-anchors',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const target = new URL('index.html', dir);
        const html = await readFile(target, 'utf8');
        const heading = /<h2\b[^>]*\bid="create-a-home"[^>]*>/g;
        if ([...html.matchAll(heading)].length !== 1) {
          throw new Error('Expected one Create a Home heading for the legacy anchor.');
        }
        await writeFile(target, html.replace(heading,
          '$&<span id="create-home" aria-hidden="true"></span>'));
      },
    },
  };
}
