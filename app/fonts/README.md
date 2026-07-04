# Noto Serif SC subset

`noto-serif-sc-subset.woff2` contains only the Hanzi currently found in:

- `data/characters.json`
- `app/index.html`
- `app/favicon.svg`

Run `npm run font:subset` after adding characters. The command downloads an
optimized Noto Serif SC subset from the Google Fonts CSS API and updates
`subset.txt`. Tests fail when the recorded glyph list no longer matches the
project sources.

Noto Serif SC is licensed under the SIL Open Font License. See `OFL.txt`.
