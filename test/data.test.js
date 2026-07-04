import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const requiredFields = [
  "character",
  "pinyin",
  "tone",
  "meaning",
  "components",
  "component_notes",
  "modern_phrases",
  "simon_notes",
];

test("starter character data supports the Phase 1 display", async () => {
  const source = await readFile(
    new URL("../data/characters.json", import.meta.url),
    "utf8",
  );
  const characters = JSON.parse(source);

  assert.equal(characters.length, 5);

  for (const character of characters) {
    for (const field of requiredFields) {
      assert.ok(field in character, `${character.character} is missing ${field}`);
    }

    assert.equal(Array.from(character.character).length, 1);
    assert.ok(Array.isArray(character.components));
    assert.ok(Array.isArray(character.modern_phrases));
  }
});
