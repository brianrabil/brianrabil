---
title: Stealth Skills
summary: Fifteen design-engineering skills for coding agents covering type, spacing, colour, motion, states, accessibility, and interface review.
url: https://github.com/paragonhq/stealth-skills
homepage: https://stealth.pm/skills
category: devtools
tags: [skills, design, coding-agents]
author: Brian Rabil
date: "2026-10-05"
---

Stealth Skills is a set of `SKILL.md` files in the Agent Skills format, so they load in Claude Code, Cursor, Codex, and other agents that read that format. Each skill holds specific values and rules for one part of interface work, such as a spacing scale, type sizes by role, easing curves and durations, or the states a screen needs.

The `review` skill produces an audit as a table with a file, line, current value, and fix for each finding, capped at fifteen. This site's redesign was built and reviewed with these skills.

## Things to know

- Start with the `stealth` skill. It sets the order of decisions and says which other skill to load.
- As of October 2026, three of the files (`stealth`, `interaction`, `ux-copy`) have an unquoted colon in their YAML `description`, and the `skills` CLI skips them. Quoting the description fixes it.

## Try it

```sh
npx skills add paragonhq/stealth-skills
```
