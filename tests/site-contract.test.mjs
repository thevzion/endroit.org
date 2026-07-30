import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const read = (path, encoding = "utf8") =>
  readFile(new URL(`../${path}`, import.meta.url), encoding)

test("the landing follows the Endroit 0.7 narrative in order", async () => {
  const landing = await read("src/pages/index.astro")
  const chapters = [
    "You equipped the agent.",
    "Interactive model of an Endroit environment",
    "What becomes owned",
    "Do you need a Home?",
    "Endroit 0.7 today",
    'id="install"',
  ]

  let cursor = -1
  for (const chapter of chapters) {
    const position = landing.indexOf(chapter)
    assert.ok(position > cursor, `${chapter} must follow the preceding chapter`)
    cursor = position
  }
})

test("the product site delegates Home-first authority to The VZion", async () => {
  const [landing, sitemap, nginx] = await Promise.all([
    read("src/pages/index.astro"),
    read("public/sitemap.xml"),
    read("nginx.conf"),
  ])

  assert.match(landing, /https:\/\/thevzion\.com\/home-first\//)
  assert.doesNotMatch(sitemap, /endroit\.org\/home-first/)
  assert.match(nginx, /return 301 https:\/\/thevzion\.com\/home-first\//)
})

test("the landing states current capabilities, alpha limits and honest claims", async () => {
  const landing = await read("src/pages/index.astro")

  assert.match(landing, /Endroit 0\.7 alpha/)
  assert.match(landing, /Get more from the agents you already use\./)
  assert.match(landing, /Codex and Claude are native and qualified today/)
  assert.match(landing, /Resume without starting over/)
  assert.match(landing, /Change runtimes, keep the work/)
  assert.match(landing, /Keep repositories independent/)
  assert.match(landing, /Different interfaces\. Different runtimes\. Same place\. Same material\./)
  assert.match(landing, /Digest trust detects changed bytes; it is not a sandbox/)
  assert.match(landing, /not a measured claim about[\s\S]*reasoning quality, hallucinations, speed, cost or productivity/)
  assert.doesNotMatch(landing, /\bNess\b/)
  assert.doesNotMatch(landing, /See how I use Endroit/)
})

test("the install block uses the real 0.7 setup and a progressive copy control", async () => {
  const install = await read("src/components/InstallCommand.astro")

  assert.match(install, /npx --yes @endroit\/cli@latest create my-home/)
  assert.match(install, /cd my-home/)
  assert.match(install, /'codex'/)
  assert.match(install, /navigator\.clipboard/)
  assert.match(install, /aria-live="polite"/)
})

test("the landing contains one React island and no UI or 3D framework", async () => {
  const [landing, packageJson, config] = await Promise.all([
    read("src/pages/index.astro"),
    read("package.json"),
    read("astro.config.mjs"),
  ])
  const islands = landing.match(/client:(?:visible|load|idle|media|only)/g) ?? []

  assert.equal(islands.length, 1)
  assert.match(landing, /<EnvironmentDistrict client:visible \/>/)
  assert.match(packageJson, /"tailwindcss"/)
  assert.match(packageJson, /"@tailwindcss\/vite"/)
  assert.match(packageJson, /"motion"/)
  assert.doesNotMatch(packageJson, /"shadcn|"three|"@react-three/)
  assert.match(config, /tailwindcss\(\)/)
})

test("the district keeps a complete static summary without JavaScript", async () => {
  const landing = await read("src/pages/index.astro")

  assert.match(landing, /<noscript>/)
  assert.match(landing, /Home-first model summary/)
  assert.match(landing, /human[\s\n]+curation promotes chosen results to Artifacts/)
  assert.match(landing, /local Bindings reach[\s\n]+independent Targets/)
})

test("the landing qualifies when a Home is and is not useful", async () => {
  const landing = await read("src/pages/index.astro")

  assert.match(landing, /You keep re-explaining the same maps and decisions/)
  assert.match(landing, /repository that does not own the work around it/)
  assert.match(landing, /copying instructions between them—makes the environment drift/)
  assert.match(landing, /right source or the destination for a result stays ambiguous/)
  assert.match(landing, /short session in one repository with no continuity worth retaining/)
  assert.match(landing, /Another Home would create more ambiguity than the work itself/)
  assert.match(landing, /one Home → one existing Target → one current subject → one retained result → one resumed session/)
  assert.match(
    landing,
    /href="https:\/\/github\.com\/thevzion\/endroit#do-you-need-a-home"[\s\S]*Read the full adoption path/,
  )
})

test("social metadata points to a 1200 by 630 PNG", async () => {
  const [layout, card] = await Promise.all([
    read("src/layouts/BaseLayout.astro"),
    read("public/social-card.png", null),
  ])

  assert.match(layout, /og:image:type" content="image\/png"/)
  assert.match(layout, /twitter:image:alt/)
  assert.equal(card.toString("ascii", 1, 4), "PNG")
  assert.equal(card.readUInt32BE(16), 1200)
  assert.equal(card.readUInt32BE(20), 630)
})
