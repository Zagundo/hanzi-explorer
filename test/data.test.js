import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const requiredFields = [
  "collection",
  "character",
  "pinyin",
  "tone",
  "meaning",
  "components",
  "component_notes",
  "modern_phrases",
  "simon_notes",
];

test("two five-character collections support the specimen display", async () => {
  const source = await readFile(
    new URL("../data/characters.json", import.meta.url),
    "utf8",
  );
  const characters = JSON.parse(source);

  assert.equal(characters.length, 10);
  assert.deepEqual(
    characters.filter(({ collection }) => collection === 2).map(
      ({ character }) => character,
    ),
    ["水", "火", "口", "心", "手"],
  );

  assert.deepEqual(
    [1, 2].map((collection) => [
      collection,
      characters.filter((character) => character.collection === collection)
        .length,
    ]),
    [
      [1, 5],
      [2, 5],
    ],
  );

  for (const character of characters) {
    for (const field of requiredFields) {
      assert.ok(field in character, `${character.character} is missing ${field}`);
    }

    assert.equal(Array.from(character.character).length, 1);
    assert.ok(Number.isInteger(character.collection));
    assert.ok(Array.isArray(character.components));
    assert.ok(Array.isArray(character.modern_phrases));
  }
});
