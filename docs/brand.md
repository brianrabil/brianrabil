# Brand

The brand system for brianrabil.com and the products it lists, as decided in October 2026. When something here conflicts with older code or copy, this document wins.

## Identity

- **A holding company, not a résumé.** The site presents a portfolio of AI software products owned by Brian Rabil. No job titles, work history, employers, education, awards, skills lists, LinkedIn, or tenure lines.
- **An app store for the products.** The home page leads with the products as a grid, grouped by what they are (servers, harness, ADE, desktop, apps, developer kits), each with its status.
- **Evidence over claims.** Product lists, statuses, and the stack page are read from the repos and checked against live URLs. Nothing is linked that doesn't respond.

## Voice

Plain and literal: say what the thing is and what it does. No carnival barker. Headings stand alone: no subtitle, intro line, tagline, or topic list under a page or section heading. If a heading needs explaining, the content below it should do it. The full rules, banned shapes, and before/after examples are in the `plain-voice` skill (`.claude/skills/plain-voice/SKILL.md`). Interface microcopy also follows the stealth `ux-copy` skill.

## Look: "B2 × shadcn"

Named for the B-2 stealth bomber: black, flat, exact. Shared with vswarm.

- **Tokens:** the Stealth set in `app/styles/globals.css` (`page`, `frame`, `raised`, `hover`, `line`, `line-2`, `fg` to `fg-4`, `success`, `warning`, `danger`), mapped onto shadcn's names so `components/ui` follows the brand. Dark is the default theme; light is first-class.
- **Type:** Geist Sans 500 for interface and headings, set tight (−0.06em display, −0.04em section titles); Geist Mono only inside code blocks and inline code; numbers, dates, and labels use Geist Sans. No eyebrow labels (small tracked uppercase text above or beside headings and values), anywhere.
- **Shape:** radius 0.625rem for controls; hairline-divided grids with + crosshairs at intersections for collections (see `components/product-grid.tsx`); no shadows in dark mode, one soft shadow in light.
- **Motion:** quiet by default; entrances ease out; reduced motion is honoured everywhere.
- **Background:** the vgpu "low-observable terrain" shader (`components/stealth-field.tsx`), one instance per page, with a CSS fallback. GPU work uses vgpu (vercel-labs).

## Logos

Two tiers.

**Flagships** have their own iconic mark and a custom wordmark, like separate companies.

| Product | Mark | Wordmark | Status | Files |
| --- | --- | --- | --- | --- |
| Hyperpost | A sleek italic delta riding a comet blade | HYPERPOST in Michroma, slanted 12°, with a tapered comet underline | Locked, v1 | `public/brand/hyperpost/` |
| vswarm | A delta whose tail dissolves into fine horizontal streaks (speed dissolve) | VSWARM in Big Shoulders Display Black, slanted 16°, with a blacked-out stripe | Wordmark locked; mark is v1 and may be revisited | `public/brand/vswarm/` |

Each folder holds `mark`, `wordmark`, and `lockup`, each in `-dark.svg` and `-light.svg`. Wordmarks are outlined to paths, so no font is required.

**The rest of the fleet** are small stealth ships: flat, faceted silhouettes pointing up, one ink, with a shape that says what the product does in code. Workbot is the exception by design, a friendly reverse-knee mech walker in side profile with pointy feet that walks on its product card, because it is the helper that lives on your machine.

| Product | Mark | Status |
| --- | --- | --- |
| Workbot | Reverse-knee mech walker, cursor-block eye; walks on its card (`components/workbot-mark.tsx`). A spider quadruped was tried and rejected | Approved direction; the robot may be refined later. Wordmark: Geist 800 lowercase plus a cursor block |
| Brain | Placeholder only. The name, mark, and wordmark will all be redone once a new name is chosen (themes: brain, world model, workspace) | Rebrand pending |
| Arcwrite | Its original mark from the product repo (`ebook-agent/packages/branding`): a square folding into a diamond | Kept; the round-3 ship was rejected |
| Command Center | The agentic Linux distro (repo `agentic-linux`); Office Machine and Workstation are folded into it. Mark: a tilted orbit with three square agent nodes around a diamond command core; animated, a signal travels the orbit, each node flares as it passes, and the core pulses (`components/command-center-mark.tsx`). Inspired by the "Brainstorm Loop" loader specimen on loading.daniasyrofi.com, redrawn as our own. Wordmark: heavy all-caps COMMAND CENTER (Geist Black until a custom one is drawn). The brand has attitude; Hyperpost and vswarm are the drafts for its look | Mark in review; wordmark pending |
| ui, RSSX | Round-3 ships in `public/marks/` | Interim |
| Media Server | Monogram until it has a name | Needs a name |

Rules for new marks: test each one standing alone (app tile, avatar circle, 16px favicon, lockup next to its name) before it joins the set; avoid shapes that read as common UI icons (play, send, warning) or as someone else's mark; nothing cute except Workbot; no ornament (the "tramp stamp" diamond was rejected).

## Type registers for wordmarks

| Register | Members | Style |
| --- | --- | --- |
| Hyperpost line | Hyperpost, Brain | Wide italic (Michroma) with the comet blade |
| vswarm line | vswarm | Heavy condensed italic (Big Shoulders Display Black) with the stripe |
| Helpers | Workbot | Geist 800 lowercase |

All wordmark faces are under the SIL Open Font License.

## Statuses

Shown as quiet badges (`components/status-badge.tsx`), always with a word: **Live** (muted green dot), **Closed alpha** (hollow dot), **Coming soon** (grey pill). Paused and past work lives on `/archive`, not the home page.

## Craft section

The home page lists the rules a change has to meet (`components/build-standards.tsx`), taken from vswarm's `lat.md/craft.md` and the shared tooling policy. Each rule is something a reviewer can check: states, a real browser pass, tokens only, instant keyboard actions, one purpose per animation, keyboard access, the language policy, and Konsistent in CI. Add a rule only when it is enforced somewhere; never add adjectives about craft.

## Stack page

`/stack` is one line per tool: icon, name, and a role of a few words. Product counts and badges are not shown; `lib/stack.ts` still records which products use each tool, and a tool is listed only if a product's code depends on it. Icons come from `@thesvg/react`; marks it lacks (Workflow, eve) are copied from the vendor's own site as `currentColor` SVGs in `components/stack-icons.tsx`. Single-colour marks set a `tone` so they invert per theme. Minor libraries are left off.
