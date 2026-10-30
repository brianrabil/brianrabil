# Product line audit

Audit date: 2026-10-05. Standard: `docs/brand.md`, `.claude/skills/plain-voice/SKILL.md`, and the Stealth tokens in `app/styles/globals.css`, plus the owner's hard rules (no eyebrows, no subtitles under headings, plain voice, Geist with mono only in code, B2 monochrome, full interactive states, a presence setting where there is motion or sound, one set piece per product).

All product repos were read only. Paths are relative to `/Users/rabilb/Developer/` unless they start with a repo-local folder under a product heading. Scores: **Pass**, **Partial**, **Fail**, or n/a.

## Scoreboard

| Product (repo, branch) | Tokens | Type | Voice | Mark | Family | Set piece | States | Agent | Docs | Effort |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RSSX (`rssx-rebrand`, rebrand/stealth) | Pass | Pass | Partial | Partial | Fail | Partial | Partial | Fail | Fail | S for demo, L in full |
| Command Center site (`agentic-linux-site`, site/command-center) | Pass | Pass | n/a | Partial | Fail | Partial | Fail | Fail | Fail | M |
| Command Center native (`officemachine`, `agentic-linux`) | Fail | Partial | Partial | Fail | Fail | n/a | Partial | Fail | Fail | L |
| explore plugin (`skills-explore`, skill/explore) | Partial | Partial | Partial | Fail | Fail | Partial | Partial | Pass | Fail | M |
| vswarm (`vswarm`, main) | Partial | Partial | Fail | Fail | Fail | Fail | Partial | Partial | Partial | M visible, L in full |
| Brain (`agent-memory`, main) | Fail | Partial | Partial | Fail | Fail | Partial | Partial | Partial | Partial | M, L with rename |
| Hyperpost (`hyperpost`, main) | Fail | Fail | Fail (Partial on copy/plain-voice) | Fail | Fail | Fail | Partial | Partial | Fail | L |
| Workbot (`workbot`, regroup) | Fail | Partial | Fail | Fail | Fail | Fail | Fail | Partial | Partial | L |
| Arcwrite (`ebook-agent`, main) | Fail | Partial | Partial | Partial | Fail | Fail | Partial | Partial | Fail | L |
| Media Server (`ai-torrent-app`, main) | Partial | Partial | Fail | Partial | Fail | Fail | Partial | Fail | Fail | M visible, L in full |
| ui (`ui-native`, native-ui) | Fail | Partial | Fail | Fail | Fail | Fail | Partial | Partial | Partial | L |
| Zig World (`world-zig`, main) | n/a | n/a | Pass | Fail | Fail | Fail | n/a | Partial | Pass | M |

Three findings hold across the whole line:

- No product links back to brianrabil.com or to a sibling product. Every footer is product-local.
- Only explore has a presence setting (Off/Functional/Theatrical) and sound. brianrabil.com itself has none, though it runs five animated pieces.
- Only RSSX (rebrand branch) and the Command Center site use the Stealth tokens as the brand defines them. vswarm has the hex values but leaves shadcn's names on stock neutral.

## brianrabil.com (the reference)

Not scored. These gaps matter because the site is first in the demo.

- **No presence setting.** The site animates `components/stealth-field.tsx`, `components/brand-stage.tsx` (Hyperpost comet and vswarm warp shaders in `components/gpu/`), `components/brain-graph/`, the Workbot walk (`app/styles/globals.css` `.workbot-mark.is-walking`) and `components/command-center-mark.tsx`. A grep for `presence|theatrical` in `app components lib` returns only `AnimatePresence`. Reduced motion is handled in each piece (`stealth-field.tsx:78`, `brand-stage.tsx:84`, `brain-graph/brain-graph.tsx:60`).
- **explore is missing from `lib/app-config.ts`**, though it is a demo item and the only product with every agent door.
- **The RSSX description disagrees with rssx.ai.** `lib/app-config.ts:107-108` says "An RSS reader with structured feeds, filtering, and semantic search". The rebrand site says "A directory of RSS feeds… reader in development" (`rssx-rebrand/apps/site/app/layout.tsx:24`), and `download/page.tsx:40` marks the reader "soon".
- brianrabil.com already holds the best copies of four set pieces (comet, warp, brain graph, walker). They belong in the shared registry (see below).

## RSSX

Audited `rssx-rebrand` (branch rebrand/stealth): 124 files, +6389/−3522 against main. The rebrand reached `apps/site` routes, header, footer, `packages/ui` tokens and base components, marks, favicon, OG and globe. It has not reached `README.md`, `apps/pro` (copilot), `apps/native` (Zig reader), the old logo SVGs, or a group of dead legacy components.

| Dimension | Score | Evidence |
| --- | --- | --- |
| Tokens and surfaces | Pass | `packages/ui/src/styles/globals.css:16-100` is a verbatim copy of Stealth, with dark `--shadow`/`--pop` set to none, which is stricter than brianrabil.com. Drift is limited to unrebranded or dead code: `apps/pro/app/globals.css:1-33` (blue `--focus-ring: #006bff`) and `components/directory/cta-section.tsx:25` (#7775D6→#E935C1 gradient, unused). |
| Type | Pass | Geist loads in `apps/site/app/layout.tsx:6-7,45`, and mono is limited to code (`globals.css:300-304`). `apps/site/components/brand.tsx:41-96` (PageHeader, SectionHeading) enforces no eyebrow and no subtitle. The only remaining eyebrows and serif type are in `components/directory/category-grid.tsx:29,33,96`, which no route renders. |
| Voice | Partial | Site copy is literal. The README is the worst file in the repo: `README.md:1` "RSSX: A Next-Generation RSS Feed Reader"; `README.md:22` "A Cognitive Infrastructure for a Fragmented Digital Landscape"; `README.md:67` "RSSX provides a robust API". The README also has `your-username` badges and dead `docs.rssx.dev`/`app.rssx.dev` links. |
| Mark and wordmark | Partial | `packages/branding/rssx-mark-dark.svg` is byte-identical to `brianrabil/public/marks/rssx-dark.svg`. `app/icon.svg`, `apple-icon.tsx` and `opengraph-image.tsx:39-45` agree. Old marks are still shipped: `packages/branding/rssx-logo-primary.svg` (orange #FF6E3C), `apps/site/public/rssx-logo-*.svg` and `rssx-logomark-*.svg`, and `apps/pro/app/icon.svg` (orange #F97316). |
| Family links | Fail | `app/@footer/default.tsx:41-53,78` links GitHub, X and the feed only. |
| Set piece | Partial | `components/globe/radar-globe.tsx` uses vgpu 0.5.0, pauses off-screen and on hidden tabs (`:225,265,275`), shows a still frame under reduced motion (`:189-192`), and falls back to Canvas2D. It is still the dotted globe, not the photoreal night Earth. Blips are decorative, and the `markers` prop is unused, so it does not yet show feeds being scanned. |
| States and motion | Partial | `packages/ui/.../button.tsx:10` covers active, disabled and aria-busy. There is a global `:focus-visible` (`globals.css:316`) and a reduced-motion block (`:334-343`). No presence setting and no sound. Hover is not gated with `@media (hover: hover)`. |
| Agent surfaces | Fail | No MCP server (the "RSSX inbox" in brand.md does not exist), no CLI, no Agent Plugin. `apps/site/agent/skills/article-writer/SKILL.md:20` says only "No hype language" where brand.md requires the plain-voice banned shapes verbatim. |
| Docs | Fail | No docs app. The README links a docs site that does not exist. |

**Verdict.** The rebranded rssx.ai site is the closest product to the brand: exact tokens, primitives that enforce the heading rules, literal copy, one mark across favicon, OG and lockup, and a vgpu globe that pauses and holds still correctly. The gaps are around the site: a carnival-voice README, old orange logos still in `public/`, no link to brianrabil.com, two conflicting descriptions, no presence setting, and no agent surfaces. **Effort: S** for the demo, **L** for MCP, CLI, plugin and the photoreal Earth.

Before the demo:

1. Merge `rebrand/stealth`. The live rssx.ai does not show the rebrand until this is merged.
2. Rewrite `README.md` with plain-voice. Remove the badges, dead links and "non-functioning".
3. Delete the old marks (`apps/site/public/rssx-logo-*`, `rssx-logomark-*`, `packages/branding/rssx-logo-*`, `grid-pattern.svg`) and the dead components (`category-grid`, `cta-section`, `like-button`, `author-card`, `subcategory-list`, `stat-ticker`, `homepage-marquee`, `feed-activity-chart`, `multiple-select`).
4. Add a brianrabil.com link to the footer.
5. Make `brianrabil/lib/app-config.ts:107` and rssx.ai describe RSSX the same way.
6. Add a presence control that drives the globe's `paused` prop.

## Command Center

The site is in `agentic-linux-site` (branch site/command-center). It has one baseline commit (b41ab72). Everything else is untracked in `apps/site/`: `globals.css`, `command-center-mark.tsx`, four `stage/*` files and `public/shots/*.png`. There is no `layout.tsx`, `page.tsx`, metadata, favicon or OG yet, and no component mounts the stage. The native apps are in `officemachine` (branch codex/baseline-refresh, with 688 deletions and 36 untracked files in the working tree) and `agentic-linux`.

| Dimension | Score | Evidence |
| --- | --- | --- |
| Tokens and surfaces | Site Pass, native Fail | The site has an exact Stealth copy (`agentic-linux-site/apps/site/src/app/globals.css:10-53`) without the shadcn name mapping. Its windows use `shadow-pop` in dark (`stage/windows.tsx:47`). The native apps use the Native SDK Vercel `geist` pack (`workstation-native/src/theme.zig:6`, `.theme = "geist"` in each `app.zon`). `officemachine/DESIGN.md:15,23` sets pure #000/#fff and a blue focus colour, and `:71-72` sets radius 6/12px. The Music Player adds pink (`apps/music-player/src/theme.zig:18`). `officemachine/packages/ui/src/styles/globals.css` and `agentic-linux/apps/design/src/app/globals.css:14` are shadcn neutral. |
| Type | Site Pass, native Partial | The site sets Geist in `@theme` (`globals.css:56`), and mono is only in the terminal `<pre>` (`stage/windows.tsx:217`). The `rise` keyframe adds a blur (`globals.css:94`). `officemachine/apps/site/app/layout.tsx:3-8` uses Inter, as do `workstation-web` and `workstation-ade`. There are mono uppercase eyebrows in `officemachine/packages/ui/src/components/landing/footer.tsx:24,44` and a subtitle at `apps/site/app/(home)/page.tsx:194-195`. `officemachine/DESIGN.md:145-157` bans eyebrows, which is correct. |
| Voice | Partial | `officemachine/apps/site/app/(home)/page.tsx:195`: "Native apps, the shared runtime, and bounded sandboxes share one local-first architecture." (triplet subtitle). `:54`: "One shared runtime implementation." (fragment headline). `apps/site/content/docs/test.mdx` is a leftover template page. The new site has almost no copy yet. |
| Mark and wordmark | Partial | The orbit mark is copied, differing only in whitespace (`agentic-linux-site/apps/site/src/components/command-center-mark.tsx`, CSS at `globals.css:177-283`, gated for reduced motion). There is no wordmark, favicon or OG. Names conflict: the stage window is titled "OfficeMachine Video" (`stage/scene.ts:72,103`); `officemachine/docs/linux-desktop.md:3` says "Office Machine is the Linux distro's name"; `agentic-linux/apps/design/src/app/layout.tsx:9` titles the app "HyperPost"; `agentic-linux/packages/branding/logo-primary.svg` is an old blue (#4187F5) cross. |
| Family links | Fail | The site has no footer. The officemachine footer links GitHub, AI SDK and vercel.com (`apps/site/app/(home)/page.tsx:199-203`). |
| Set piece | Partial | vgpu 0.5.0 draws a dot field, build particles and measuring lines in one ink (`stage/renderer.ts`, `stage/shaders.ts:37-38`). Agent 1 prints Clock and Files windows from prompts and agent 2 types in a Terminal (`stage/scene.ts:23-36,181,257`). There is a still frame for reduced motion (`scene.ts:136-137`). Missing: the mounting component, off-screen pause, and a fallback without WebGPU. |
| States and motion | Fail | The site has reduced motion (`globals.css:108-114,167-175`) and focus-visible (`:157`) but no interactive elements, presence setting or sound yet. The officemachine landing has no reduced-motion handling, and `landing-fade-up` (`hero.tsx:18`) is never defined. Native passes reduce-motion to the token pack (`theme.zig:4`). |
| Agent surfaces | Fail | `agentic-linux/apps/design/src/app/api/mcp/route.ts` is an HTTP MCP server for the OpenPencil canvas. `officemachine/apps/cli` uses ink and meow, not incur, and is excluded from the workspace. No Agent Plugin. `officemachine/skills/office-workflow` is a repo workflow skill, not a product skill. |
| Docs | Fail | officemachine docs are Fumadocs with the stock neutral preset in Inter (`apps/site/app/global.css:2-3`). The Command Center site has no docs. |

**Verdict.** The new site's parts are on brand: exact Stealth tokens, Geist, a monochrome vgpu stage that shows agents building windows on the canvas, and reduced motion considered from the start. There is no page around them yet. The native apps follow Vercel's Geist pack, which differs from B2 on focus colour, accent hue, radius and pure-black surfaces. Across three repos the product is still called Office Machine, HyperPost or agentic-canvas, and "Command Center" also names `officemachine/apps/command-center` (an unrelated "Agent Lattice" app) and the `command-center` repo (the HyperPost ADE, `app.json` id `ai.hyperpost.command-center`). **Effort: M** for the site, **L** to move the native apps onto Stealth through Native SDK token overrides.

Before the demo:

1. Add `layout.tsx` (Geist Sans and Mono, dark by default) and `page.tsx` with the stage mounted in the hero.
2. Build the stage component with off-screen and `visibilitychange` pause, a still image without WebGPU (`STILL_TIME` render or `shots/canvas.png`), and reduced motion.
3. Rename the "OfficeMachine Video" window (`stage/scene.ts:72,103`). Keep Office Machine and Workstation out of all copy.
4. Add the COMMAND CENTER wordmark (Geist Black, uppercase) next to the animated mark, `icon.svg` from the mark, and an OG image.
5. Add a footer that links brianrabil.com and the sibling products.
6. Add the presence control (lift it from explore; see the shared pieces below).
7. Remove the dark-mode window shadow (`stage/windows.tsx:47`) and the blur in `rise`.
8. Give every call to action hover, focus-visible, active, disabled and loading states. No subtitle under the hero heading.

## explore plugin

Audited `skills-explore` (branch skill/explore). The worktree has uncommitted edits in 6 files under `app/src`. App paths below are under `plugins/explore/skills/explore/app/src/`.

| Dimension | Score | Evidence |
| --- | --- | --- |
| Tokens and surfaces | Partial | `web/styles.css:2-21` copies Stealth with drift: `--hover: #1a1a1a` (Stealth is #161616, `:6`), and the extra hues `--agent: #8fbd9e` and `--doc: #9eadd1` (`:16-17`, used at `:109,113,127`). Light mode does not redefine danger, success or warning. |
| Type | Partial | Geist loads from Google Fonts (`index.html:9`), and mono is only on `code` (`styles.css:660`). `web/hud.tsx:52-55` puts a "files · symbols · sections" line under the h1, which is the banned "Topic · Topic" subtitle. |
| Voice | Partial | `SKILL.md:8` "A short story in three acts… Act 3 is the reveal" and the radio personas (`:62`) are agent-facing, but they produce HUD text that people read. `SKILL.md:64` rejects clichés in code, which is good. |
| Mark and wordmark | Fail | No explore mark in `brianrabil/public/marks/` or `docs/brand.md`, and no favicon in `index.html`. |
| Family links | Fail | No brianrabil.com link in the HUD. explore is not in `brianrabil/lib/app-config.ts`. |
| Set piece | Partial | The vgpu code-graph map (`graph/renderer.ts:1,12`) with a 2D fallback works as one, but explore has no row in the brand.md set-piece table. |
| States and motion | Partial | The only real presence setting in the portfolio: `web/app.tsx:38-39` (`type Presence = "off" \| "functional" \| "theatrical"`), with a sound engine (`sound/engine.ts:65,149`) and reduced motion (`web/app.tsx:103,446`). `styles.css` has no `:active` rules, and hover is not gated. |
| Agent surfaces | Pass | Agent Plugin 1.0 at `plugins/explore/plugin.json` with `mcp.json`. Claude Code plugin at `plugins/explore/.claude-plugin/plugin.json` with `.mcp.json`, agents, commands and hooks. Marketplace at `.claude-plugin/marketplace.json`. The CLI uses incur (`cli/main.ts:2`) and prints `claude mcp add explore -- <bin> --mcp` (`:303`). |
| Docs | Fail | explore is absent from `README.md` and `apps/docs`. No `npx skills add brianrabil/skills --skill explore` line anywhere; the skill sits under `plugins/`, so it may need `--full-depth`. The docs landing `apps/docs/app/(home)/page.tsx` has a lime accent (`:143,223,303`), eyebrows ("The Collection", "How It Works"), slogans ("Give your agent the missing manual." `:149-153`; "Install. Trigger. Execute." `:306-310`; "Better instructions compound into better work." `:335`) and subtitles (`:156,232`). Theme: `apps/docs/app/global.css:2` imports `fumadocs-ui/css/black.css`. |

**Verdict.** The product is the most complete in the portfolio: presence, sound, an incur CLI, and both plugin formats. What is missing is everything around it: a mark, install lines, a docs page, a family link, a brianrabil.com entry, and a fix for the token drift. **Effort: M.**

Before the demo:

1. Make the agent and doc colours monochrome (or map them to status tokens) and set `--hover` to #161616.
2. Add `:active` states and gate hover with `@media (hover: hover)`.
3. Move the "files · symbols · sections" line out from under the h1.
4. Add explore to the skills README and docs with the `npx skills add`, `claude mcp add` and plugin install lines.
5. Add a mark and favicon, and add explore to `brianrabil/lib/app-config.ts` and the set-piece table.

## vswarm

| Dimension | Score | Evidence |
| --- | --- | --- |
| Tokens and surfaces | Partial | `apps/web/styles/stealth.css:7-55` (installed from the `@stealth` registry, `https://stealth.pm/r/{name}.json`, registered in `apps/web/components.json`) matches brianrabil's dark values hex for hex. Drift: light fg-3 is #8d8d89 (`stealth.css:41`) where brianrabil has #6e6e6a; vswarm adds a blue `--info` (`:27,51`); there is no `--radius` or `--input-edge`; theming uses `[data-theme]`, not `.dark`. The largest gap: shadcn's names are not mapped onto Stealth. `packages/ui/src/styles/globals.css:66-133` is stock neutral oklch with blue `chart-*` and dark `sidebar-primary`, and those names are used widely (`text-muted-foreground` in 76 files). `packages/ui/src/components/status.tsx:24-38` uses emerald, blue and amber. Popovers and dialogs use `shadow-pop` in dark (`components/ui/popover.tsx:90`). |
| Type | Partial | Geist and Geist Mono load in `app/layout.tsx:12-17`. Eyebrows: `(home)/_components/home-how-it-works.tsx:9`, `home-topology.tsx:10`, `home-hero.tsx:10` ("Local-first agent app" above the h1), and mono uppercase group labels in `components/ui/sidebar.tsx:213`, `command-palette.tsx:301`, `docs-toc.tsx:38`. Subtitles: `home-hero.tsx:14`, `home-how-it-works.tsx:15`, `app/docs/_components/docs-article-header.tsx:10`. Mono outside code: `dashboard/settings/account.tsx:24`. |
| Voice | Fail | `app/(home)/_components/home-content.ts:40`: "Local sqlite, not a hidden cloud". `content/docs/getting-started/what-is-vswarm.mdx:10`: "It is not a chatbot bolted onto a hosted dashboard." `content/docs/getting-started/first-look.mdx:21`: "This app is not a separate desktop shell, installer, or blog. It is not the Office Machine broker." About 12 more "not X" lines. The name is cased three ways: VSwarm (`README.md:1`), VSWARM (`components/footer.tsx:75`), vswarm. The footer says "All rights reserved" on an MIT repo. |
| Mark and wordmark | Fail | The in-app mark is a 96px base64 PNG cube cluster (`packages/ui/src/branding/logo.tsx:3-7`), and the wordmark is Geist extrabold lowercase (`:65`), not Big Shoulders at 16° with the stripe. `app/icon.tsx` and `apple-icon.tsx` render cyan and indigo orbs on navy (`components/pwa-icon.tsx:44,66,121-123`). `app/favicon.ico` is the create-next-app default (md5 c30c7d42…). No OG image. The correct files exist only in `brianrabil/public/brand/vswarm/`. |
| Family links | Fail | `components/footer.tsx:9-28` links only vswarm pages and GitHub. |
| Set piece | Fail | No warp-in streaks. vgpu is used only in `components/paint/paint-canvas.tsx` and `components/chat/prototype-shadcn-mcp.tsx`. The warp shader exists on brianrabil.com (`components/gpu/vswarm-warp.wgsl.ts`). |
| States and motion | Partial | Button has focus-visible, active, disabled, busy and loading text (`components/ui/button.tsx:47-50,75-127`). Reduced motion is global (`stealth.css:131-133`) and used in 223 places. No presence setting, no sound. |
| Agent surfaces | Partial | HTTP MCP at `apps/web/app/api/mcp/route.ts` with 5 tools behind a session, built with mcp-handler, no stdio. No CLI, no product skills, no Agent Plugin. |
| Docs | Partial | Custom MDX (`apps/web/lib/content.ts`), not Fumadocs, on unmapped shadcn tokens. Concrete spec content (routes, tables, env vars) with defensive "not X" lines and description subtitles. `lat.md/craft.md:11,45` has corrupted text (`change.nd [[standards…`). |

**Verdict.** vswarm is the origin of Stealth and its dark values and button states match the brand exactly, but its public face does not: shadcn names still point at neutral and blue, the hero and docs carry eyebrows and subtitles, the copy leans on "not X", and the logo, favicon and PWA icon belong to an older cyan identity. It has no set piece, presence, sound, CLI, plugin, skills or family links. **Effort: M** for the visible brand (map shadcn names, strip eyebrows and subtitles, rewrite "not X" lines, swap in `brand/vswarm` SVGs, new favicon and OG, family footer). **L** for the full standard (warp set piece, presence and sound, incur CLI with stdio MCP, Agent Plugin, skills). Policy: `apps/web/postcss.config.mjs` and `apps/web/public/sw.js` break the no-.js rule.

## Brain

Audited `agent-memory` (main). The product currently ships as "Hyperpost Brain" (`apps/web/app/layout.tsx:22`, `apps/docs/geistdocs.tsx:4,25`).

| Dimension | Score | Evidence |
| --- | --- | --- |
| Tokens and surfaces | Fail | `packages/ui/src/styles/globals.css` is stock shadcn and Vercel neutral: dark `#0a0a0a/#111111/#1a1a1a` (`:106-119`), `--radius: 0.5rem` (`:84`), violet `--info` (`:98,141`). Shadows in dark (`product-panel.tsx:107`). Buttons are `rounded-2xl` (`button.tsx:6`). Hues: orange ember `rgb(255 150 70)` (`apps/web/app/globals.css:154`), Vesper orange, teal and red graph nodes (`packages/brain-ui/src/graph/graph-model.ts:72-93`), blue and pink in the MCP view (`apps/mcp/views/memory-results/view.tsx:23-27`). Theme defaults to system (`layout.tsx:43`). |
| Type | Partial | Geist Sans and Mono only (`layout.tsx:10-18`). Eyebrow: the docs table of contents header is mono, uppercase and tracked (`packages/ui/src/components/table-of-contents.tsx:37`; also `animated-sidebar.tsx:758`). Mono for values and IDs: `memory-workbench.tsx:158,168`, `memory-graph.tsx:844`. Subtitles under every landing h2 (`verbs.tsx:39`, `surfaces.tsx:103`, `ownership.tsx:34`, `closing.tsx:14`), a footer tagline (`footer-1.tsx:83-85`), and a tagline under the README H1 (`README.md:18`). |
| Voice | Partial | `apps/web/components/landing/ownership.tsx:32` and `README.md:24`: "A library, not another service." `components/landing/verbs.tsx:37`: "Five verbs. The whole memory." `ownership.tsx:35`: "It never holds your data hostage". `README.md:22` heading "Why Brain?". The rest of the body copy is plain. |
| Mark and wordmark | Fail | A wireframe isometric cube is inlined twice (`hero-section-6-header.tsx:96-123`, `footer-1.tsx:53-80`) next to "Hyperpost Brain" in Geist semibold. `public/brand/wordmark-dark.png` still reads "Context Machine". Both favicons are the create-next-app default (same md5 as vswarm's). No OG image. Expected while the rebrand is pending, but the current state is three names deep. |
| Family links | Fail | No brianrabil.com or sibling links. The README links hyperpost.ai and a Hyperpost Discord (`README.md:10-12`). The footer copyright reads "Hyperpost Brain. Apache-2.0" (`footer-1.tsx:119`). |
| Set piece | Partial | `packages/brain-ui/src/graph/` (vgpu 0.5.0) is a real evolving graph with force and Layers views (`memory-graph.tsx:80-86`). It appears only on /demo and /memory/graph; the landing hero shows a code panel (`hero.tsx:47`). Nodes are hued, and there is no off-screen pause. The MCP App view uses a separate three.js graph. brianrabil.com's `components/brain-graph/` is a credited port of the Layers half that is monochrome and pauses off-screen, so the site copy is ahead of the product. |
| States and motion | Partial | Reduced motion is honoured in the graph (`memory-graph.tsx:197-207`) and the party animations. Button has no loading state (`button.tsx:6`). No presence setting (settings has only a theme toggle, `settings/theme-setting.tsx:8-10`), no sound. |
| Agent surfaces | Partial | MCP server in `apps/mcp` (mcp-use over Hono HTTP), and the CLI serves stdio with `--mcp`. The CLI is incur 0.5.1 (`apps/cli/src/index.ts:13`) bundled with tsdown for Node, not `bun build --compile`. Agent Plugin 1.0 at `packages/integrations/agent-plugin/plugin.json` with Claude and Codex manifests; skills sit separately in `packages/skills/skills/`. The plugin's `.mcp.json` runs `npx -y @hyperpost-labs/brain-cli --mcp`, but `README.md:33` says "Brain is not on npm yet", so that install path fails. |
| Docs | Partial | Fumadocs 16.2.2 on stock `@vercel/geistdocs/theme.css`, `fumadocs-ui/css/shadcn.css` and `preset.css` (`apps/docs/app/global.css:1-5`). Good factual reference prose (`apps/docs/content/docs/index.md`). apps/web also renders the same docs at /docs (`apps/web/lib/docs.ts:10`), so there are two docs surfaces. |

**Verdict.** Brain has the most complete engineering of the server products: a library, an MCP server, an incur CLI, an Agent Plugin with Claude and Codex variants, and a vgpu graph that already does what its set piece needs. Its brand layer is a different system: neutral shadcn tokens, rounded-2xl buttons, dark shadows, hued nodes, a system-default theme, the Hyperpost name, a cube placeholder and a stale "Context Machine" wordmark. **Effort: M** for tokens, subtitles, eyebrows, copy, a monochrome graph in the hero, Fumadocs skin and the npm fix; much of the mark work waits for the new name. **L** with the rename, mark and `bun build --compile`.

## Hyperpost

Audited `hyperpost` (main), the `copy/plain-voice` branch in `hyperpost-plain-voice`, and `hyperpost-labs/web` (live hyperpost.ai). In production, `hyperpost-labs/web/proxy.ts:43-44` sends every visitor to `/coming-soon` until the `site-launched` flag is on.

| Dimension | Score | Evidence |
| --- | --- | --- |
| Tokens and surfaces | Fail | `apps/web/app/globals.css:74-121` is stock shadcn neutral oklch, and `.dark` (`:123-167`) uses Vercel Geist hex (`#000000`, `#0a0a0a`, `#ededed`, `#62c073`) with `--radius: 0.5rem` (`:166`). Violet `--info` (`:113-114`). Hardcoded `bg-[#060606]` and `#ee3b1f`/`#ff7a63` in `components/marketing/hero-section.tsx:173,216`; galaxy hues `#52a8ff`/`#8e4ec6`/`#2dd4bf` in `lib/fleet-galaxy.ts:4`. A large dark shadow at `hero-section.tsx:64`. The live site has a third token set, pure black `oklch(0 0 0)` (`hyperpost-labs/packages/ui/src/styles/globals.css:43`). |
| Type | Fail | Main loads Geist (`apps/web/app/layout.tsx:9-10`), but the live site uses Inter (`hyperpost-labs/web/app/layout.tsx:3,12`), as do the docs (`apps/docs/app/layout.tsx:4`). Mono uppercase eyebrows: `hero-section.tsx:41,84,108,120,133,157,193`, `studio-sequence.tsx:51,64`, `bento-8.tsx:53,74,187`, all still present on the branch and live. Subtitles: two-line grey heading `hero-section.tsx:225-226`, intro paragraphs `pricing.tsx:22-27`, `studio-sequence.tsx:195-200`. |
| Voice | Fail on main, Partial on the branch | Main: `apps/web/components/marketing/hero-section.tsx:225-226` "Build products that / move markets."; `studio-sequence.tsx:196` "A studio that can make, prove, and move the work."; `footer.tsx:50-51` "Make the work. / Create the momentum." The branch (commits 0025381ce, 4d7e0eb6a, 19 files in `apps/web`) fixes the hero, CTA, footer, metadata, FAQ and mock labels, and the live site already carries it. It leaves the "fact. / grey fact." heading shape, `apps/web/app/manifest.ts:7` ("Build and operate your business with HyperPost."), the docs (`apps/docs/content/docs/index.mdx:19` "the new creative stack"), the blog (`apps/docs/content/blog/blog-distribution-crisis.md:3` "Building is now effortless…"), and `hyperpost-labs/packages/cli/README.md:3` ("your personal marketing agency in the cloud"). |
| Mark and wordmark | Fail | Every repo uses a flat hexagon path (`M32 10 18 18v16L4 26V10l14-8Z`) with "HyperPost" at weight 650: `apps/web/components/ui/logo.tsx:17,30`, `apps/web/public/hyperpost-mark.svg`, `hyperpost-labs/packages/ui/src/components/logo.tsx`, `hyperpost-labs/web/public/favicon.svg`. The locked delta, comet blade and Michroma wordmark exist only in `brianrabil/public/brand/hyperpost/`. The repos spell it "HyperPost"; brand.md spells it "Hyperpost". No web OG image (`hyperpost-labs/web/app/layout.tsx:49-53`); docs use the stock Fumadocs OG. |
| Family links | Fail | No references to brianrabil.com or siblings. `apps/web/components/marketing/footer.tsx:5-36` is product-only. |
| Set piece | Fail | No comet streak. The hero is a static mock over a stock image (`hero-section.tsx:32-38`). The comet shader exists on brianrabil.com (`components/gpu/hyperpost-comet.wgsl.ts`). The in-app vgpu fleet galaxy (`apps/web/lib/fleet-canvas.ts`) honours reduced motion but uses off-brand hues. |
| States and motion | Partial | The GSAP sequence checks reduced motion (`studio-sequence.tsx:131`). `animate-pulse` at `hero-section.tsx:179` has no `motion-reduce` guard. The mock "Preview launch" button has only an active state (`hero-section.tsx:144-146`). `ui/button.tsx:6` has no loading state. No presence, no sound. |
| Agent surfaces | Partial | HTTP MCP at `apps/web/app/mcp/route.ts:637-655` with one tool, `fleet_view`. `apps/brand-mcp` is a separate mcp-use server with two skills. An incur CLI exists only in `hyperpost-labs/packages/cli` (`lib/cli.ts:4`). No Agent Plugin. `apps/docs/content/docs/index.mdx:8-9` says "CLI, and MCP surfaces are deliberately deferred", which contradicts both. |
| Docs | Fail | Stock Fumadocs `neutral.css` and `preset.css` (`apps/docs/app/global.css:2-3`) plus an oklch blog theme, in Inter. One content page; `api/`, `deployment/` and `sdk/` are empty. Six blog posts in the marketing voice with Unsplash images. |

**Verdict.** Hyperpost is listed as a locked flagship on brianrabil.com, but none of its own surfaces use that brand: three token sets, Inter on the live site and docs, a hexagon in place of the comet delta, mono eyebrows throughout, no set piece, no presence, no family links. The plain-voice branch fixes most marketing body copy. **Effort: L.** Merge `copy/plain-voice`, then swap tokens in three CSS sets, replace logo components and favicons with the `brand/hyperpost` SVGs, restyle marketing without eyebrows or subtitles in Geist, skin Fumadocs, build the comet set piece, and move the incur CLI into the main repo with an Agent Plugin.

## Workbot

Audited `workbot` (branch regroup, 533 commits ahead of main; main has nothing regroup lacks and the visible surfaces are the same).

| Dimension | Score | Evidence |
| --- | --- | --- |
| Tokens and surfaces | Fail | Three non-Stealth sets: `apps/site/app/globals.css:51-118` (stock shadcn, dark `oklch(0.145)`, blue dark `--sidebar-primary` at `:112`); `packages/ui/src/lib/styles/globals.css:66-141` (`--radius: 0.875rem` at `:93`, blue `--ns-accent: #006bff` at `:103`); `apps/web/app/globals.css:100-147` (zinc, plus `animate-hue-rotate` at `:7`). The TUI is orange (`packages/tui/src/lib/theme.ts:23,46-52`). Dark shadows: `apps/site/components/hero.tsx:89`, `durable-runs.tsx:30,57`, `capabilities.tsx:55`. |
| Type | Partial | Geist and Geist Mono everywhere (`apps/site/app/layout.tsx:7-8`, `apps/web/app/layout.tsx:10-14`, `apps/docs/app/layout.tsx:6-7`). No eyebrows. Subtitles: `hero.tsx:55`, `reach.tsx:20`, `call-to-action.tsx:14`, `apps/web/components/agents-empty.tsx:53`, and `<DocsDescription>` under every docs H1 (`apps/docs/app/docs/[[...slug]]/page.tsx:27`). Mono for non-code labels in `capabilities.tsx:42,44,55`. |
| Voice | Fail | `apps/site/components/call-to-action.tsx:12`: "Give your next long task to an agent that won't quit on you". `apps/site/components/local-first.tsx:13`: "Your machine. Your model. Your data stays put." `apps/web/components/agents-empty.tsx:53`: "Code with Agents. Tools, plans, and edits all live." Also `durable-runs.tsx:16` "Starts in your terminal. Finishes without it." The product is described four ways (`lib/site.ts`, hero, `apps/cli/src/main.ts:66`, the web empty state). |
| Mark and wordmark | Fail | Every surface uses a rounded box with a cursor block, not the walker: `apps/site/components/logo.tsx:3-9`, `apps/web/components/logo.tsx:7-20`, `apps/web/components/workbot-mark.tsx`, `apps/site/app/icon.svg`, `.github/assets/mark.svg`, `apps/site/app/opengraph-image.tsx:24-27`. The wordmark is title case "Workbot" at weight 600 without the cursor (`logo.tsx:14,19`); brand.md calls for Geist 800 lowercase with a cursor block. Docs have no mark and stock Fumadocs OG. `brianrabil/components/workbot-mark.tsx` can replace the box directly. |
| Family links | Fail | No hits in site, docs, web or README. `apps/site/components/site-footer.tsx:9-30,44` is site-only. |
| Set piece | Fail | No walker, no code graph, no vgpu. The hero is a static mock window (`hero.tsx:87-92`). |
| States and motion | Fail | The marketing site has no reduced-motion handling. "Connect a model" appears only on `group-hover` (`hero.tsx:103`). Nav links and reach cards have hover but no focus-visible (`site-header.tsx:73`, `reach.tsx:103`). `packages/ui` and `apps/web/app/globals.css:253` handle reduced motion well. No presence, no sound. |
| Agent surfaces | Partial | incur CLI built with `bun build --compile` (`apps/cli/src/main.ts:3,63`). Workbot is an MCP client and plugin installer, not an MCP server, though brand.md lists it as one. No Agent Plugin manifest, no product skills. Docs show commands the CLI lacks: `workbot init / on / ask` (`apps/docs/content/docs/(use)/index.mdx:9-11`). |
| Docs | Partial | Stock Fumadocs `neutral.css` and `preset.css` (`apps/docs/app/global.css:2-3`). Mostly plain prose; `index.mdx:6` and `mcp.mdx:6` open with "After this page you know…". The site links docs pages that do not exist: `/models`, `/chat-apps`, `/browser`, `/contributing` (`site-footer.tsx:11,19,29`, `reach.tsx:28,54`, `hero.tsx:104`); the real slugs are `providers`, `channels`, `web-ui`, `contribute`. |

**Verdict.** Workbot is the furthest from the brand among the products with a public site: default shadcn, zinc and Fumadocs themes with a blue accent and an orange TUI, its own box mark, a title-case wordmark, no set piece, no family links, no presence, no reduced motion on the site, and copy built on contrasts and triplets. Geist, the incur CLI, `packages/ui` motion and most of the docs are sound. **Effort: L.**

## Arcwrite

Audited `ebook-agent` (main). The UI spells it "ArcWrite" (`apps/web/app/layout.tsx:60`, `app/(app)/page.tsx:33`, `components/layout/app-titlebar.tsx:55`, `apps/cli/src/index.ts:20-24`); the README and docs say "Arcwrite". The related `ebook-agent-native` repo calls it "OfficeMachine Writer (current repo/codename: Arcwrite)" (`README.md:1-3`), which conflicts with Office Machine folding into Command Center.

| Dimension | Score | Evidence |
| --- | --- | --- |
| Tokens and surfaces | Fail | Own palette "lifted from the border-beam demo" (`apps/web/app/globals.css:63-174`): dark `#121212/#1d1d1d`, radius 0.75rem (`:91`), `--tag-amber/orange/green/red/blue` (`:107-111,160-164`), blue selection (`:199-200`). `shadow-lg` in dark on `components/editor/editor-bubble-menu.tsx:58`. Theme defaults to system (`components/theme-provider.tsx:20`). |
| Type | Partial | Geist Sans and Mono for the interface (`layout.tsx:16-17`); serif faces (`:18-57`) are reader options, which is fine. Eyebrows: `components/ui/sidebar.tsx:449` (10.5px uppercase, `tracking-[0.12em]`) renders "Contents", "Library", "Documents". Subtitles: `app/(app)/page.tsx:34-35`, `settings/page.tsx:13-15`. Docs use Inter (`apps/docs/app/layout.tsx:3-7`). |
| Voice | Partial | `components/copilot/copilot.tsx:338` placeholder "Build anything...". `copilot.tsx:104` "What are we writing today?". `app/(app)/page.tsx:33-35` "Welcome to ArcWrite / Your studio for writing and reading long-form fiction." Other app copy is plain (`editor/page.tsx:93-94`). |
| Mark and wordmark | Partial | The square-to-diamond mark exists (`packages/branding/logo-*.svg`, `components/brand/arcwrite-mark.tsx:23`). `logo-primary.svg` is cream #F5EBE1. No favicon or OG: `apps/web/public/` is empty and `app/` has no `icon.*`. The docs OG says `site="My App"` (`apps/docs/app/og/docs/[...slug]/route.tsx:14`). |
| Family links | Fail | None. |
| Set piece | Fail | No vgpu, canvas or WebGL in `apps/web`. |
| States and motion | Partial | Button has hover, focus-visible, active and disabled but no loading (`components/ui/button.tsx:7`). Home cards lack focus-visible (`app/(app)/page.tsx:45`). Reduced motion only for the shimmer (`globals.css:531`); `components/message-animated.tsx:5` animates without it. No presence, no sound. |
| Agent surfaces | Partial | An incur CLI projects the OpenAPI as CLI, MCP and skills (`apps/cli/src/index.ts:3,12`), built with tsdown for Node. An eve agent at `apps/eve`. No Agent Plugin and no product SKILL.md. |
| Docs | Fail | Unconfigured Fumadocs scaffold: `appName = "My App"`, `gitConfig` pointing at `fuma-nama/fumadocs` (`apps/docs/lib/shared.ts:1-10`), "Hello World" home (`app/(home)/page.tsx:6`), stock `neutral.css`, three pages including `test.mdx`. |

**Verdict.** Arcwrite has a working web app, API, incur CLI with MCP, an eve agent and collaboration, and its mark is the one brand.md keeps. It has two spellings plus a third name in the native repo, no Stealth tokens, its own hue palette, no favicon, a scaffold docs site and no set piece. **Effort: L** (M for tokens, eyebrows and subtitles alone). Policy: tracked `apps/web/postcss.config.mjs`, `apps/docs/postcss.config.mjs` and `packages/db/lib/schema.js`, and no `konsistent.json`.

## Media Server

Audited `ai-torrent-app` (main). No surface uses the name "Media Server". The web app is "Library" (`apps/web/src/app/layout.tsx:5`, `public/manifest.webmanifest:3`), the README is "Torrent" (`README.md:1`), Tauri is "ai-torrent-app" (`apps/desktop/tauri.conf.json:3,15`), and the binary is `torrent-server` (`apps/server/Cargo.toml:13`).

| Dimension | Score | Evidence |
| --- | --- | --- |
| Tokens and surfaces | Partial | Its own neutrals sit close to Stealth (dark `#0a0a0a/#111111/#ededed`, radius 0.5rem, `apps/web/src/index.css:101-160`), with a blue `--ns-accent: #006bff` (`:136`). Hardcoded hues in `routes/torrents/activity.tsx:114-115` (17 hue classes in the file) and `torrent-file-list.tsx:147`. Forced dark, which is correct (`layout.tsx:9`). |
| Type | Partial | Geist from fontsource (`index.css:1-2,55-56`), and the hero uses −0.06em tracking (`:236-240`). One eyebrow (`components/ui/tool-invocation.tsx:144`). Subtitles on most routes: `routes/settings.tsx:34-35`, `notifications.tsx:21-22`, `discover.tsx:65-66`, `activity.tsx:57`, and a "·" list under the hero (`components/welcome-hero.tsx:25`). |
| Voice | Fail | `README.md:3`: "A local-first AI-powered media management application. Netflix-style interface … intelligent search" (and `README.md:11` "**AI-Powered** - Semantic search, voice commands, smart recommendations"). `components/welcome-hero.tsx:23,27`: "A library of your own." / "A place for the stories you love." `routes/torrents/activity.tsx:56-57`: "Download Activity / Real-time torrent status overview". |
| Mark and wordmark | Partial | A geometric pinwheel (`src/assets/logo-dark.svg`) matches the PWA icons, but brand.md says monogram. The Tauri bundle icons are the default Tauri logo (`apps/desktop/icons/128x128.png`). Scaffold files remain (`public/vite.svg`, `public/tauri.svg`, `src/assets/react.svg`). No OG, no wordmark. |
| Family links | Fail | None. |
| Set piece | Fail | `packages/media-gpu` is a vgpu 0.5.0 module with no UI wired ("No app routes … or UI pages are wired here" in its README). The VR theater uses three.js (`components/vr/theater-scene.ts:1`). |
| States and motion | Partial | Button has hover, focus-visible, active and disabled (`components/ui/button.tsx:6`). Pending, error and not-found routes exist. Reduced motion is honoured (`index.css:47,271`, `content-row.tsx:46`, `lib/sidebar-motion.ts:8`). A `data-sidebar-motion="instant"` switch exists (`index.css:43`) but no presence setting, no sound. |
| Agent surfaces | Fail | No MCP, no CLI (`apps/server/src/main.rs:4-24` has no argument parsing), no Agent Plugin, no product skills. |
| Docs | Fail | No docs site. `lat.md/` and `docs/` are developer notes. |

**Verdict.** Visually it is close: near-Stealth neutrals, Geist, good states and reduced motion. It needs the blue accent and route hues removed and the subtitles stripped. The larger gaps are four names and none of them the one on brianrabil.com, the default Tauri icon, a hype README, and no agent surfaces, docs or set piece. **Effort: M** visible, **L** in full. Konsistent runs in CI (`konsistent.json`).

## ui

Audited `ui-native` (branch native-ui, 8 commits ahead of main; adds `packages/native-ui`). `ui` is the main checkout with uncommitted staged changes; `ui-native-stealth` (branch feat/stealth-native) has no Stealth work yet; `ui-run` (branch run-ux) adds run UX blocks. The product calls itself "hyperpost/ui" and "HyperPost UI" with homepage ui.hyperpost.com (`packages/ui/registry.json:3-4`).

| Dimension | Score | Evidence |
| --- | --- | --- |
| Tokens and surfaces | Fail | `packages/ui/src/styles/globals.css:56-125` is stock shadcn neutral with hued charts and a blue dark `--sidebar-primary` (`:114`). An apparently unused duplicate sits in `apps/web/styles/globals.css:6-75`. Default theme is system (`apps/web/components/providers.tsx`). 79 hue utility classes (`filters.tsx`, `schema-display.tsx`, marketing blocks). The registry ships no `registry:style`, `registry:theme` or `cssVars` item. |
| Type | Partial | Geist plus Geist Pixel Square as `--font-display` (`apps/web/app/layout.tsx:4,45`). `PageHero` puts a headline paragraph above the h1 (`packages/ui/src/components/layout/page-hero.tsx:48-57`), filled with "N components / N blocks" on the home page (`app/(public)/page.tsx:18`). 19 uppercase tracked labels, including mono at `marketing/hero-section.tsx:50,94,123`. Every page sets a description subtitle (`page.tsx:17`, `docs/page.tsx:18`). Headings are `font-bold tracking-tight` (`page-hero.tsx:61`), not 500 at −0.06em. |
| Voice | Fail | `apps/web/app/layout.tsx:14`: "Discover and explore the galaxy of shadcn/ui components…". `app/(public)/page.tsx:23` and `README.md:5`: "Design Engineering Hub". `app/(public)/page.tsx:17`: "Hyperpost-branded … Install with the CLI — you own the code." `packages/native-ui/README.md` is plain. |
| Mark and wordmark | Fail | `apps/web/public/icon.svg` is a stacked cube titled "hyperpost/ui", not the round-3 ship in `brianrabil/public/marks/ui-*.svg`. No OG. |
| Family links | Fail | None in `apps/web` or `packages/ui/src`. |
| Set piece | Fail | No Stealth Native gallery or diff scores; the stealth branch is empty. |
| States and motion | Partial | Reduced motion in 4 files and the native `motion` block. Custom components rely on primitives for states (`install-command.tsx`, `approval-gate.tsx`). No presence, no sound. |
| Agent surfaces | Partial | MCP server "hyperpost-ui" on mcp-use with 5 read-only tools (`apps/mcp/index.ts:13-22`). No incur CLI, no Agent Plugin, no skills of its own. `apps/factory` is a copy of Vercel's Foreman eve template. |
| Docs | Partial | Custom Next.js 16 docs (`app/(public)/docs`, `typeset.css`) on stock shadcn tokens. Mostly spec-like apart from hero and metadata. |

**Verdict.** ui is where the shared pieces should live, and the delivery mechanism already works: `packages/native-ui/registry.json` ships universal `registry:file` items with explicit targets, so the registry can carry tokens, blocks, hooks and SVGs. None of it is B2 yet, and it still carries the Hyperpost name. **Effort: L.** Swap tokens, rename to ui with the round-3 mark, drop PageHero's headline and description, rewrite hero and metadata, de-hue the marketing blocks, and build the gallery set piece.

## Zig World

Audited README, `docs/`, `lat.md` and `browser/demo` in `world-zig` (main, no git remote).

| Dimension | Score | Evidence |
| --- | --- | --- |
| Tokens and surfaces | n/a | The only page, `browser/demo/index.html:7-45`, uses system-ui and an unbranded #c33. |
| Type | n/a | Demo uses system-ui (`index.html:10-12`). |
| Voice | Pass | Literal and sourced. Nits: `README.md:96` "### One World, every door" (slogan heading); `package.json:5` still says "an append-only log" engine though SQLite is now the default; `README.md:512` says "The simulator covers the log engine only", which contradicts the SQLite simulation section. |
| Mark and wordmark | Fail | No SVG, favicon or OG; `brianrabil/lib/app-config.ts:134-143` has no `logo`. "Zig World" appears zero times in the repo: it uses "@workbot/zig-world" (`README.md:1`), "zig-world" (`docs/positioning.md:1`), "Zig world" (`lat.md/zig-world.md:1`) and "ZigWorld" (Swift). |
| Family links | Fail | Refers only to Workbot's botworld and eve (`README.md:32,39`). |
| Set piece | Fail | None. The material exists: the `zig build sim` crash replay (`README.md:424-436`), `zw tail`, and the OPFS browser demo. |
| States and motion | n/a | No UI. |
| Agent surfaces | Partial | The `zw` CLI is hand-built Zig, not incur (`README.md:442-450`). No MCP, skills or Agent Plugin. eve and harness examples in `examples/`. |
| Docs | Pass | The README is the best spec writing in the portfolio: tables and a reading order. No docs site. |

**Verdict.** The best docs voice in the line and almost no brand presence: no mark, a name that does not match the site, no family links, no set piece, no MCP. **Effort: M.** Settle the name, add a mark and site logo, fix `README.md:512` and `package.json:5`, wrap the JSON protocol as an MCP server, and build the set piece from the simulator's crash and replay trace.

## Shared versus duplicated

| Piece | Copies today | Notes |
| --- | --- | --- |
| Stealth tokens | 5 copies: `brianrabil/app/styles/globals.css:11-75` (canonical, with shadcn mapping); `vswarm/apps/web/styles/stealth.css` (from the `@stealth` registry at stealth.pm, light fg-3 differs, no shadcn mapping); `rssx-rebrand/packages/ui/src/styles/globals.css` (verbatim plus sidebar, chart and dark no-shadow, the most complete); `agentic-linux-site/apps/site/src/app/globals.css:10-53` (no shadcn mapping); `skills-explore/.../web/styles.css` (drifted `--hover`, two hues) | Every other product has its own non-Stealth set: 3 in Hyperpost, 3 plus a TUI theme in Workbot, 1 each in Brain, Arcwrite, Media Server, ui, officemachine, `agentic-linux/apps/design`, `skills/apps/docs`. Native apps use the Native SDK `geist` pack. |
| Fumadocs theme | 6 stock instances, 0 B2 | `hyperpost/apps/docs` (neutral, Inter), `workbot/apps/docs` (neutral), `agent-memory/apps/docs` (geistdocs), `officemachine/apps/site` (neutral, Inter), `ebook-agent/apps/docs` (unconfigured scaffold, Inter), `skills/apps/docs` (black). vswarm and ui use custom MDX on unmapped tokens. |
| Footer / family links | 0 | Every footer is product-local. brianrabil.com's `components/footer.tsx` is the only one with the brand's link style. |
| Presence setting and sound | 1 | `skills-explore/.../app/src/web/app.tsx:38-39` plus `sound/engine.ts`, `cues.ts`, `dsp.ts`. Nothing else, including brianrabil.com. |
| Set pieces | Built: Hyperpost comet and vswarm warp (`brianrabil/components/gpu/`, `brand-stage.tsx`), Brain graph (`agent-memory/packages/brain-ui/src/graph/`, monochrome port in `brianrabil/components/brain-graph/`), RSSX globe (`rssx-rebrand/apps/site/components/globe/`, portable, with README), Command Center stage (`agentic-linux-site/apps/site/src/components/stage/`), explore map (`skills-explore/.../graph/renderer.ts`), Workbot walker (`brianrabil/components/workbot-mark.tsx`). Missing: Arcwrite, Media Server (has `packages/media-gpu` base), Zig World, ui. | Each built piece reimplements the same harness (vgpu device, off-screen pause, `visibilitychange`, reduced-motion still frame, low-end check, fallback). brianrabil.com has a shared GPU helper (`components/gpu/shared-gpu.ts`); RSSX's globe has its own. The set pieces for Hyperpost and vswarm exist only on brianrabil.com, not on the products. |
| Marks | Correct files only in `brianrabil/public/brand/` and `public/marks/`; copied correctly into `rssx-rebrand/packages/branding/` and `agentic-linux-site` | Wrong marks in use: Hyperpost (hexagon), vswarm (PNG cubes and cyan orbs), Workbot (box), Brain (cube, "Context Machine" PNG), ui (stacked cube). The create-next-app default favicon (md5 c30c7d42…) ships in vswarm and agent-memory; Media Server desktop ships the default Tauri icon; Arcwrite, Zig World and explore have no favicon. |
| Brand primitives | `brianrabil/components/status-badge.tsx`, `crosshair.tsx`, `product-grid.tsx`; `rssx-rebrand/apps/site/components/brand.tsx` (PageHeader, SectionHeading, Crosshair, CollectionGrid, ScanLine, StatusBadge, RssxMark) | RSSX's PageHeader and SectionHeading make eyebrows and subtitles impossible by API. No other product has these. |
| shadcn base | Radix (brianrabil), Base UI `base-rhea` (Arcwrite, Media Server), Base UI (ui), `base-mira` (vswarm) | All use shadcn variable names, so one Stealth theme item with the shadcn mapping covers all of them. Buttons default to `rounded-2xl` in Brain, Arcwrite and Media Server. |
| Names | | Hyperpost is "HyperPost" in its repos. vswarm is cased three ways. Brain ships as "Hyperpost Brain". Command Center is Office Machine, HyperPost and agentic-canvas in its repos, and the name also belongs to two unrelated codebases. Arcwrite is "ArcWrite" and "OfficeMachine Writer". Media Server is Library, Torrent and ai-torrent-app. ui is "hyperpost/ui". Zig World is "@workbot/zig-world". |

## Smallest set of shared pieces

Each item lives in the ui registry unless noted. The registry's universal `registry:file` items (proven in `ui-native/packages/native-ui/registry.json`) can carry CSS, TS and SVG with explicit targets.

1. **Stealth theme item.** One `registry:theme` (or `registry:style`) with the Stealth tokens, the shadcn name mapping, `prose-stealth`, the reduced-motion block, `--radius: 0.625rem`, and no dark shadows. Seed it from `rssx-rebrand/packages/ui/src/styles/globals.css`, which is the most complete copy. vswarm already installs Stealth from `stealth.pm/r`; pick one source (ui re-exports stealth.pm, or ui becomes the source and stealth.pm points at it) so the light fg-3 split cannot happen again. Add a Native SDK token override generated from the same values for the Command Center native apps, shipped through `native-ui`.
2. **Family bar.** A `registry:block` footer with the brianrabil.com link and the sibling products, built from the same list as `brianrabil/lib/app-config.ts`. Serve that list as JSON from brianrabil.com (the `/mcp` server already exposes it as a tool) so the footer never needs a hand edit.
3. **Presence and sound.** Lift explore's `Presence` type, toggle and `sound/{engine,cues,dsp}.ts` into a `registry:lib` plus a `usePresence` hook and a `PresenceToggle` component. Store the choice, start at Off when `prefers-reduced-motion` is set, and have set pieces read it.
4. **Set-piece harness.** A `SetPiece` wrapper that owns the vgpu device (from `brianrabil/components/gpu/shared-gpu.ts`), off-screen and hidden-tab pause, the reduced-motion still frame, the low-end check, the non-WebGPU fallback, and presence. Then one block per product, moved from where it already works: comet and warp (brianrabil.com), brain graph (brianrabil.com's monochrome port), radar globe (RSSX), desktop stage (Command Center site), code map (explore).
5. **Marks.** SVG `registry:file` items for every mark, plus the animated `WorkbotMark` and `CommandCenterMark` components, plus one `icon.tsx` and `opengraph-image.tsx` template (RSSX's is the reference) so favicon, OG and lockup always agree.
6. **Brand primitives.** RSSX's `PageHeader` and `SectionHeading` (no eyebrow or subtitle slots), `StatusBadge`, `Crosshair` and `CollectionGrid`.
7. **Fumadocs B2 theme.** One CSS file mapping `--color-fd-*` onto Stealth, Geist for text, a monochrome Shiki theme, and a docs page layout without `DocsDescription` under the H1. It replaces six stock presets.
8. **Voice check.** Install the plain-voice skill in each repo (`npx skills add brianrabil/skills --skill plain-voice`) and add a banned-phrase check to the shared Konsistent rules in `~/.config/konsistent/conventions.json`, following the code-level check in the finds agent's publish tool. Agents that write copy (the RSSX article writer) get the banned shapes verbatim.

## Order of work

Demo items come first. Each step lists what it unblocks.

1. **brianrabil.com (S).** Add a presence setting for the StealthField and card set pieces (drop in explore's module directly, extract it later). Add explore to `lib/app-config.ts`. Make the RSSX description match rssx.ai.
2. **rssx.ai (S).** The punch list in the RSSX section, then merge `rebrand/stealth`.
3. **explore plugin (S to M).** The punch list in the explore section. Its sound and presence code becomes shared piece 3.
4. **Command Center site (M).** The punch list in the Command Center section. Its stage becomes a set-piece block.
5. **Shared pieces in ui (M).** Pieces 1 to 7 above, seeded from the code the first four steps finished. Rebrand ui's own site at the same time (rename from hyperpost/ui, round-3 mark, no PageHero headline or description).
6. **vswarm (M).** Closest after RSSX: map the shadcn names, swap in `brand/vswarm` marks, install the warp block and family bar, rewrite the "not X" lines. CLI, plugin and skills follow.
7. **Hyperpost (L).** Merge `copy/plain-voice`, collapse three token sets into the theme item, swap the hexagon for the comet delta and Michroma wordmark, install the comet block, theme Fumadocs, and move the incur CLI into the main repo with an Agent Plugin.
8. **Brain (M, then L).** Tokens, copy, monochrome graph in the hero, Fumadocs theme, fix the npm install path in the plugin. Mark and wordmark wait for the new name.
9. **Workbot (L).** Theme item across three CSS sets and the TUI, walker mark and lowercase cursor wordmark, focus states and reduced motion on the site, fix the four broken docs links, then the walker set piece and an MCP server.
10. **Arcwrite (L).** Settle one spelling and drop "OfficeMachine Writer", theme item, favicon and OG from its mark, configure the docs scaffold, then the book set piece and an Agent Plugin.
11. **Media Server (L).** Choose a name first; everything else (mark, README, Tauri icons) depends on it. Then remove the blue accent and route hues, add an incur CLI over the Rust API, and build the poster wall on `packages/media-gpu`.
12. **Zig World (M).** Settle the name, add a mark, fix the two stale lines, add MCP, build the crash-replay set piece.
13. **Command Center native apps (L).** Native SDK token overrides from the Stealth values, remove the pink accent and blue focus, and rename Office Machine and Workstation surfaces.
