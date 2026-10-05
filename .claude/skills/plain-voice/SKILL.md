---
name: plain-voice
description: >-
  Write product, interface, and marketing copy in a plain, literal voice: say what the thing is and what it does. Bans the default model "marketing voice" — slogans, mic-drop closers, "X, not Y" contrasts, rhythmic triplets, invented stakes. Use whenever writing or reviewing any user-facing words: headlines, intros, product descriptions, badges, buttons, metadata, OG text, READMEs, store listings, release notes, social posts, or agent instructions that produce copy.
---

# plain-voice

Every line says what something is or what it does. If a sentence would work on a billboard, rewrite it.

## The failure mode: the carnival barker

The owner calls it the carnival-barker voice: someone shouting at a crowd to step right up, instead of telling you what is in the tent. Write like the plaque next to the exhibit, not the barker outside it.

Language models drift into this stock marketing voice, likely a product of how they are trained: confident, rhythmic, quotable, and slightly larger than the facts. It reads as generated, and readers who have seen it a thousand times stop trusting the page. The owner of this brand cannot stand it.

It sounds like:

- "Products that compound."
- "Software for single-operator scale."
- "Written for operators, not tourists."
- "One operator, one stack."
- "Not a logo wall: every product listed here imports the thing it's listed under."
- "Agents in the cloud, agents on your machine, and the memory between them."
- "Every system feeds the others."
- "Dispatches from the frontier."

Each of those was written for this site and then replaced. The replacements are below.

## Banned shapes

| Shape | Example | Why it fails |
| --- | --- | --- |
| Slogan headline | "Products that compound" | States a feeling, not a fact |
| Mic-drop closer | "One operator, one stack." | A fragment placed for rhythm |
| "X, not Y" | "for operators, not tourists" | Invents an opponent to sound sharp |
| "Not A: B" reveal | "Not a logo wall: …" | Sets up a strawman, then knocks it down |
| Rhythmic triplet | "in the cloud, on your machine, and the memory between them" | Cadence instead of information |
| Grand metaphor | "fleet", "frontier", "singularity", "dispatches" | Decoration for ordinary things |
| Invented stakes | "game-changer", "the future of", "redefines" | Claims no one can check |
| Hype vocabulary | seamless, powerful, supercharge, unlock, revolutionize, blazing, effortless, leverage, robust | Says nothing specific |
| Rhetorical question | "What if your agents could…?" | Makes the reader do the work |
| Exclamation marks | anything! | The interface is calm |
| Methodology disclaimer | "Libraries are listed only where a product's code depends on them." | Explains how the page was made to sound rigorous; the reader didn't ask |
| Résumé framing | job titles, "building since", "e-begging" | The site is about the products, not a candidate |

## The rewrite procedure

1. **Name the thing.** Noun first: what category is it? "A memory library for agents."
2. **Say what it does.** One concrete verb phrase. "Stores data in your own SQLite, libSQL, PGlite, or Postgres database."
3. **Add one fact that matters,** if there is one: license, platform, status, requirement. "MIT licensed." "In closed alpha."
4. **Stop.** No closer, no summary line, no flourish.
5. **Check every claim against a source** (the code, the README, a live URL). If you can't point at it, cut it.

## Before and after (from this site)

| Before | After |
| --- | --- |
| Software for single-operator scale. | AI software products, built and owned by Brian Rabil. |
| I build systems that compound — AI-native products, agent infrastructure, and tools designed for operators who refuse to stay small. | Hyperpost, Workbot, Brain, and vswarm are in development, and RSSX is live. Every product is built on the same stack. |
| Products that compound | Products |
| 15 products on one shared stack. Agents in the cloud, agents on your machine, and the memory between them. Every system feeds the others. | 10 products. Only the ones you can use today are linked. |
| Dispatches from the frontier | Recent finds |
| Built on Vercel · Not a logo wall: every product listed here imports the thing it's listed under. | Stack · The 18 Vercel tools used across 10 products. A product is listed under a tool only if its code depends on it. |
| Product launches and strategic thinking from the frontier. | An occasional email when a product launches or a new find is published. |
| The 29 tools the products are built with. Libraries are listed only where a product’s code depends on them. The last section is the coding agents used to write that code. | Tools and libraries used across the products. |
| Command center for the fleet. This site. | (removed: the site is not one of its own products) |
| One agent, every chat surface. | Library for chat bots on Slack, Discord, and other platforms. |

## Rules that hold everywhere

- No subtitles under headings: no intro line, tagline, or "Topic · Topic · Topic" list under a page or section title.
- Sentence case. Buttons are verbs ("Request access", "Open rssx.ai").
- Numbers are digits and are computed from data where possible ("10 products"), so they never go stale.
- Status is stated, not dramatized: "Coming soon", "Closed alpha", "Live".
- Third person or product-first is fine; first person is fine when it is literal ("I'll email you when…").
- Short is not the goal; specific is. A longer sentence with a real fact beats a short slogan.
- When writing instructions for an agent that will produce copy, include this skill's banned shapes and the rewrite procedure verbatim. Agents default to the marketing voice unless told otherwise, and a code-level check (as in the finds agent's publish tool) is better than a hope.

## Self-check before returning copy

- [ ] Every sentence names a thing or states what it does
- [ ] No banned shape from the table above
- [ ] No word from the hype list
- [ ] Every claim traces to code, docs, or a live URL
- [ ] Read it aloud flat; if it sounds like an ad, rewrite it

Related: `docs/brand.md` (the full brand system), and the stealth `ux-copy` skill for interface microcopy (buttons, errors, empty states).
