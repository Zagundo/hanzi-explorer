import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  extractHanzi,
  fontSourcePaths,
} from "../scripts/update-font-subset.mjs";

const readProjectFile = (path) =>
  readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("hero copy reflects the collection's continuing purpose", async () => {
  const html = await readProjectFile("app/index.html");

  assert.match(html, />Studies in form and meaning</);
  assert.match(html, />Origin Exploration</);
  assert.doesNotMatch(html, />Five studies in form and meaning</);
  assert.doesNotMatch(html, />Look closer\.</);
});

test("the gallery provides separate numbered collection groups", async () => {
  const html = await readProjectFile("app/index.html");

  assert.match(html, /id="character-collections"/);
  assert.match(html, /id="collection-mark"/);
  assert.doesNotMatch(html, /id="character-grid"/);
});

test("the interface uses the locally hosted Noto Serif SC subset", async () => {
  const css = await readProjectFile("app/styles.css");
  const font = await readFile(
    new URL("../app/fonts/noto-serif-sc-subset.woff2", import.meta.url),
  );

  assert.match(css, /font-family: "Noto Serif SC Subset"/);
  assert.ok(css.includes('url("./fonts/noto-serif-sc-subset.woff2")'));
  assert.ok(font.length > 1_000, "font subset should contain binary font data");
  assert.equal(font.subarray(0, 4).toString("ascii"), "wOF2");
});

test("the recorded font glyphs match the current character sources", async () => {
  const sources = await Promise.all(fontSourcePaths.map(readProjectFile));
  const recordedGlyphs = await readProjectFile("app/fonts/subset.txt");

  assert.equal(recordedGlyphs.trim(), extractHanzi(sources));
});
