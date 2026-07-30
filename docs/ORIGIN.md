# Origin and Original Architect Handoff

> This document preserves the original project brief and the early
> Architect-to-Builder history of Hanzi Explorer.
>
> Clyde (OpenClaw) created the original direction as Architect, and Codex
> received it as Builder. It is retained as project provenance rather than as
> the current roadmap, changelog, or implementation guide.
>
> Current product direction lives in `STRATEGY.md`. Current priorities live in
> `ROADMAP.md`. Durable decisions live in `docs/DECISIONS.md`.

---

> **Historical snapshot:** Everything below reflects the project at the time
> of the original handoff. Statements about status, scope, and next steps are
> preserved for context and are not current instructions.

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

## Builder Session — 2026-07-04 (Collection 02)

### What changed
- Added 水, 火, 口, 心, and 手 as five complete specimen records.
- Added a numeric `collection` field to all ten characters.
- Rendered Collection 01 and Collection 02 as distinct gallery groups while
  preserving a single specimen dialog and device-local notes.
- Expanded the Noto Serif SC subset from 37 to 72 glyphs.
- Added collection grouping and data-contract coverage.

### Decision appended
Collections are defined in `data/characters.json` with the integer
`collection` field. Characters retain their array order within each collection;
collections render in ascending numeric order. Specimen numbering remains
continuous across the atlas.

### Verification
- Automated tests: 10 passing.
- Browser verification: 390 × 844 and 1280 × 800.
- Confirmed two groups of five, all new cards and the 心 specimen, no horizontal
  overflow, consistent font loading, and no browser warnings or errors.

---
*Session appended: 2026-07-04 | Builder: Codex*

## Builder Session — 2026-07-04 (Typography and intent)

### What changed
- Replaced the hero eyebrow with “Studies in form and meaning” so it remains
  accurate as the collection grows.
- Replaced “Look closer.” with “Origin Exploration” to state Simon's purpose
  for the project directly.
- Added a locally hosted, 37-glyph Noto Serif SC web-font subset so Hanzi use
  the same typeface on macOS and iPhone.
- Added `npm run font:subset`, which derives required Hanzi from the data and
  static interface, downloads the official Google Fonts subset, and preserves
  the SIL Open Font License.
- Added a test that detects when new Hanzi require subset regeneration.

### Decision appended
Noto Serif SC is the canonical Hanzi display face. Whenever character data or
static interface Hanzi change, run `npm run font:subset` before committing.
Latin text continues to use the existing system-font fallbacks.

### Verification
- Automated tests: 8 passing.
- Browser verification: 390 × 844 and 1280 × 800.
- Confirmed Noto Serif SC loaded at both sizes, no horizontal overflow, and no
  browser warnings or errors.

---
*Session appended: 2026-07-04 | Builder: Codex*

## Builder Session — 2026-07-11 (Collection 03)

### What changed
- Added 米, 饭, 肉, 鱼, and 菜 as five complete specimen records.
- Kept the existing collection model: Collection 03 is defined by
  `collection: 3` in `data/characters.json`.
- Expanded the Noto Serif SC subset from 72 to 109 glyphs so the new food
  characters and related examples render consistently across devices.
- Updated the data-contract coverage for three five-character collections.

### Decision appended
Food vocabulary can be added as another ordinary collection without changing
the app structure. Collection grouping remains data-driven; the interface
automatically labels the atlas as Collections 01–03.

### Verification
- Automated tests: 10 passing.

---
*Session appended: 2026-07-11 | Builder: Codex*

## Builder Session — 2026-07-30 (Collection 04)

### What changed
- Added 我, 你, 这, 那, and 有 as five complete specimen records.
- Kept the existing collection model: Collection 04 is defined by
  `collection: 4` in `data/characters.json`.
- Expanded the Noto Serif SC subset from 109 to 131 glyphs so the new
  pronoun/demonstrative characters and related examples render consistently
  across devices.
- Updated the data-contract coverage for four five-character collections.

### Decision appended
Core sentence-building words can be added as another ordinary collection
without changing the app structure. The collection labels, total specimen
count, and continuous numbering remain derived from the JSON data.

### Verification
- Automated tests: 10 passing.

---
*Session appended: 2026-07-30 | Builder: Codex*
