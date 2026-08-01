import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const read = (path, encoding = "utf8") =>
  readFile(new URL(`../${path}`, import.meta.url), encoding)

test("the landing follows the workplace narrative in order", async () => {
  const landing = await read("src/pages/index.astro")
  const chapters = [
    "The place layer for agentic work.",
    "Your agent setup quietly became a workplace.",
    "Prompt-centric · Agent-centric · Workplace-first",
    "Enter the place. Complete the work.",
    "Touch the same Material as your agents.",
    "Repositories keep their sovereignty.",
    'id="install"',
    "Usable today. Still evolving.",
  ]

  let cursor = -1
  for (const chapter of chapters) {
    const position = landing.indexOf(chapter)
    assert.ok(position > cursor, `${chapter} must follow the preceding chapter`)
    cursor = position
  }
})

test("the product site delegates the Proposal to Open Workplace", async () => {
  const [landing, sitemap, nginx] = await Promise.all([
    read("src/pages/index.astro"),
    read("public/sitemap.xml"),
    read("nginx.conf"),
  ])

  assert.match(landing, /https:\/\/open-workplace\.org\/proposal\//)
  assert.doesNotMatch(sitemap, /endroit\.org\/home-first/)
  assert.match(nginx, /return 301 https:\/\/open-workplace\.org\/proposal\//)
})

test("the landing states the 0.8 product truth and limits", async () => {
  const landing = await read("src/pages/index.astro")

  assert.match(landing, /0\.8 alpha · actively dogfooded/)
  assert.match(landing, /Codex and Claude are the first qualified providers/)
  assert.match(landing, /Managed clone/)
  assert.match(landing, /Managed worktree/)
  assert.match(landing, /Submodules are recognized; their lifecycle is not managed/)
  assert.match(landing, /Home Hygiene advises and inspects/)
  assert.match(landing, /Presence, live titles and adaptive workplace behavior remain later work/)
  assert.match(landing, /No claim of better intelligence, fewer hallucinations, lower costs or higher productivity/)
  assert.doesNotMatch(landing, /Target-first/)
})

test("the public vocabulary distinguishes workplace owners", async () => {
  const [landing, homes] = await Promise.all([
    read("src/pages/index.astro"),
    read("src/pages/homes.astro"),
  ])

  for (const noun of ["Home", "Member", "Desk", "Room", "Equipment", "Site", "Route"]) {
    assert.match(landing, new RegExp(`\\b${noun}\\b`))
  }
  assert.match(homes, /Meeting/)
  assert.match(homes, /Nothing becomes durable by accident/)
})

test("the install block uses real create and init commands", async () => {
  const [landing, install] = await Promise.all([
    read("src/pages/index.astro"),
    read("src/components/InstallCommand.astro"),
  ])

  assert.match(install, /npx --yes @endroit\/cli@latest create my-home/)
  assert.match(install, /navigator\.clipboard/)
  assert.match(install, /aria-live="polite"/)
  assert.match(landing, /npx @endroit\/cli init/)
})

test("the comparison is one React island with a static fallback", async () => {
  const [landing, component, packageJson] = await Promise.all([
    read("src/pages/index.astro"),
    read("src/components/EnvironmentDistrict.tsx"),
    read("package.json"),
  ])
  const islands = landing.match(/client:(?:visible|load|idle|media|only)/g) ?? []

  assert.equal(islands.length, 1)
  assert.match(landing, /<EnvironmentDistrict client:visible \/>/)
  assert.match(landing, /<noscript>/)
  assert.match(component, /Equip the agent/)
  assert.match(component, /Equip the place/)
  assert.doesNotMatch(packageJson, /"motion"/)
})

test("social metadata points to the current 1200 by 630 PNG", async () => {
  const [layout, card] = await Promise.all([
    read("src/layouts/BaseLayout.astro"),
    read("public/social-card.png", null),
  ])

  assert.match(layout, /Give agentic work a place to compound/)
  assert.match(layout, /og:image:type" content="image\/png"/)
  assert.match(layout, /twitter:image:alt/)
  assert.equal(card.toString("ascii", 1, 4), "PNG")
  assert.equal(card.readUInt32BE(16), 1200)
  assert.equal(card.readUInt32BE(20), 630)
})

test("the roadmap separates shipped, active, exploratory and later work", async () => {
  const [roadmap, sitemap] = await Promise.all([
    read("src/pages/roadmap.astro"),
    read("public/sitemap.xml"),
  ])

  for (const status of ["Available", "In progress", "Exploring", "Later"]) {
    assert.match(roadmap, new RegExp(status))
  }
  assert.match(roadmap, /Provider portability/)
  assert.match(roadmap, /Presence/)
  assert.match(roadmap, /not a delivery commitment/)
  assert.match(sitemap, /endroit\.org\/roadmap\//)
})
