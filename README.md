# Hanzi Explorer 🌸

> A personal character atlas for Simon's Mandarin journey.

Not a flashcard app. A specimen cabinet.

Each character is a node: meaning, components, ancient origin, Tang dynasty usage, modern phrases, your own mnemonic image. Characters as knowledge artifacts, not vocabulary drills.

## What it is
- Static web app (no backend or build step required)
- Data-driven: `data/characters.json`
- Visual-first: characters as museum exhibits
- Grows as you learn

## Phase roadmap
- **Phase 1** (now): Browse and view character specimens
- **Phase 2**: Character family trees — see how components branch into related characters
- **Phase 3**: Tang Lens — explore Tang poetry, click any character to open it

## Running it
Serve the repository as a static website, then open `/app/`.

For a local preview:

```sh
python3 -m http.server
```

Then visit `http://localhost:8000/app/`.

For iPhone use, publish the repository with a static host such as GitHub Pages
and add the `/app/` page to the Home Screen.

## Data
See `data/characters.json` — add new characters as you learn them in HelloChinese.

Personal notes are saved in the browser on the current device. They do not sync
between devices.

## Connections
- HelloChinese app → learning → characters enter here
- Pleco → deep etymology reference
- Anki → spaced repetition layer (separate)
- Tang poetry → Phase 3 content layer
