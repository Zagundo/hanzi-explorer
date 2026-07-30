# Hanzi Explorer Decision Record

This document records durable product and technical decisions whose reasoning may be useful later.

A decision can be revisited. When that happens, retain the original entry, mark it as superseded, and add a new entry explaining the change.

## D-001 — Use a static web application

**Status:** Accepted **Date:** 2026-07-04

Hanzi Explorer will remain a static web application without a backend while that architecture supports the product.

This keeps the project easy to understand, host, and maintain. It also suits GitHub Pages and the project’s current personal scale.

The original requirement to open the application directly from a local file was revised because browsers restrict JavaScript from loading local JSON reliably. Local development therefore uses a simple static web server.

## D-002 — Keep character content in JSON

**Status:** Accepted **Date:** 2026-07-04

`data/characters.json` is the canonical source for character specimen content.

Keeping content separate from presentation makes the atlas data-driven and allows new specimens to appear without changing the interface structure.

This decision should be revisited if the data becomes difficult to validate, edit, relate, or query.

## D-003 — Organise characters into ordered collections

**Status:** Accepted **Date:** 2026-07-04

Each character record contains an integer `collection` value.

Collections render in numeric order, while characters retain their array order within a collection. Specimen numbering remains continuous across the complete atlas.

Collections provide a record of learning in manageable groups without imposing a complex taxonomy.

## D-004 — Use device-local personal notes

**Status:** Accepted **Date:** 2026-07-04

Personal character notes are stored in the browser using `localStorage`.

This avoids accounts and backend infrastructure while the project has one primary user. Notes are consequently tied to a particular browser and device.

Cross-device access should be treated as a future product decision, not assumed as an incremental implementation detail.

## D-005 — Use Noto Serif SC for Hanzi display

**Status:** Accepted **Date:** 2026-07-04

Noto Serif SC is the canonical display face for Chinese characters.

A locally hosted subset keeps rendering consistent across supported devices without loading the complete font. When character data or static interface Hanzi changes, the font subset must be regenerated before committing.

## D-006 — Treat the repository as the canonical project record

**Status:** Accepted **Date:** 2026-07-31

Canonical product direction and implementation context live in the GitHub repository.

Responsibilities are separated as follows:

- `README.md` explains the project and its use.
- `STRATEGY.md` records durable product direction.
- `ROADMAP.md` records current and possible future investment.
- `docs/DECISIONS.md` records consequential decisions and reasoning.
- GitHub Issues hold actionable work.
- Git history and pull requests record implementation changes.
- `docs/ORIGIN.md` preserves the original Architect-to-Builder handoff.

Private notes may supplement this record but must not contain information required to understand or continue the project.
