# brianrabil.com

Read `docs/brand.md` before changing anything visible. It is the source of truth for identity, look, logos, type, and statuses.

Write every user-facing word with the `plain-voice` skill (`.claude/skills/plain-voice/`): say what the thing is and what it does, with no carnival-barker marketing voice. Interface microcopy also follows the stealth `ux-copy` skill.

Product data lives in `lib/app-config.ts`; store shelves and ordering in `lib/fleet.ts`; the stack page reads `lib/stack.ts`; past work is in `lib/archive.ts`. Verify facts against the product repos and live URLs before changing them.

Finds (`content/finds/*.md`) are validated by `lib/finds-schema.ts`; the eve agent in `agents/finds/` keeps an identical copy of that schema.
