import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8")

test("the product site delegates Home-first authority to The VZion", async () => {
  const [landing, sitemap, nginx] = await Promise.all([
    read("src/pages/index.astro"),
    read("public/sitemap.xml"),
    read("nginx.conf"),
  ])

  assert.match(landing, /https:\/\/thevzion\.com\/home-first\//)
  assert.doesNotMatch(sitemap, /hairness\.dev\/home-first/)
  assert.match(nginx, /return 301 https:\/\/thevzion\.com\/home-first\//)
})

test("product maturity is explicit", async () => {
  const landing = await read("src/pages/index.astro")

  assert.match(landing, /Available today/)
  assert.match(landing, /Designed for/)
  assert.match(landing, /Conceptual · Not installable yet/)
  assert.match(landing, /Codex and Claude today/)
})

test("the public environment layer keeps ecosystem roles distinct", async () => {
  const [landing, layer] = await Promise.all([
    read("src/pages/index.astro"),
    read("src/components/EnvironmentLayer.astro"),
  ])

  assert.match(landing, /<EnvironmentLayer \/>/)
  assert.match(layer, /id="environment-layer"/)
  assert.match(layer, /Codex.+Available today/s)
  assert.match(layer, /OpenClaw.+Ecosystem example/s)
  assert.match(layer, /Separate model supply/)
  assert.match(layer, /MCP/)
  assert.match(layer, /Examples of organizable material—not announced integrations/)
  assert.doesNotMatch(layer, /<b>Workspaces<\/b>/)
})
