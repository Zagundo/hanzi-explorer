# HANDOFF.md — Hanzi Explorer

> **This file is the memory bridge between Architect and Builder.**
> Clyde (Architect) writes it. Codex (Builder) reads it before starting work.
> Update after every session. Never delete old decisions — append reasoning.

---

## Project in One Sentence
A visual, personal web app that turns Chinese characters into knowledge specimens — meaning, components, ancient form, Tang usage, and Simon's own mnemonic notes.

## Status
`phase-1-built` — the display layer is implemented and verified locally.

## What's Been Decided (Frozen)

| Decision | Reasoning |
|----------|-----------|
| No backend | Keep it simple — local JSON only for now. Browser opens index.html directly. |
| Single-page app | Not a multi-page site. One page, search/browse characters inline. |
| Data format | JSON array in `data/characters.json`. Schema is in place — 5 starter characters. |
| Phase 1 scope | Display character, pinyin, meaning, components, component notes, modern phrases. Tang usage and sketch fields exist but can be empty. |
| Visual-first | Character should be large, beautiful. Not a flashcard. A specimen. |

## What's Been Built
- `data/characters.json` — 5 characters (木, 好, 人, 月, 山) with full schema
- `app/` folder — empty, ready for Codex to build into
- This HANDOFF.md

## Open Decisions (for Codex to ask about or make calls on)
- Framework preference: plain HTML/CSS/JS preferred (no build tools for now). Codex can propose React if justified.
- Font for the character display: something that renders hanzi beautifully. Noto Serif SC is a good candidate.
- Search vs. browse: MVP can be a simple list/grid. Search can come later.

## Next Slice for Codex
**Build Phase 1: Hanzi Explorer display**

```
Load data/characters.json
↓
Show characters in a grid
↓
Click a character → expand to full specimen view
↓
Display: character (large), pinyin, tone, meaning, components + notes, modern phrases
↓
Simon's notes field visible but empty/editable
```

That's the whole scope. Don't add more.

## Constraints
- No APIs, no external dependencies that require a server
- Must open directly as `index.html` in a browser (no `npm run dev` for Phase 1)
- Keep it beautiful — Simon is visually motivated. This is a museum exhibit, not a spreadsheet.

## Next Project Phases (don't build yet)
- Phase 2: Character family trees (semantic networks, component → characters that use it)
- Phase 3: Tang Lens — open a Tang poem, click any character to explore it

## Architect Notes (Clyde)
This project is deliberately tiny. The point is to learn Codex workflows AND Mandarin AND components simultaneously through the same artifact. Resist scope creep. The data schema already supports future phases — Codex just doesn't need to display those fields yet.

Simon discovered this project through a serendipitous voice-to-text typo that led to Dunhuang and Diǎngù (典故). Keep that spirit of exploration alive in the UX.

---
*Last updated: 2026-07-04 | Architect: Clyde | Builder: Codex*

## Builder Session — 2026-07-04

### What changed
- Added a mobile-first character gallery in `app/index.html`.
- Added a full specimen dialog for character, pinyin, tone, meaning,
  components, component notes, and modern phrases.
- Added editable Simon's notes backed by browser `localStorage`; notes remain
  on the device and browser where they were written.
- Kept `data/characters.json` as the only character-data source.
- Added focused tests for the Phase 1 data contract, tone labels, and note
  storage behavior.

### Decision appended
The original direct-file requirement conflicts with browser security around
loading local JSON and with the intended iPhone workflow. Phase 1 is therefore
a static hosted site with no backend or build step. It can be published through
GitHub Pages and previewed locally with any static file server.

### Verification
- Automated tests: 5 passing.
- Mobile browser: verified at 390 × 844 with all five cards, specimen details,
  no horizontal overflow, and device-local note saving.
- Desktop responsiveness is defined at 600 px and 900 px breakpoints; the
  automated desktop browser pass was unavailable during this session.

---
*Session appended: 2026-07-04 | Builder: Codex*
