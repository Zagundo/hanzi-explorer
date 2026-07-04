import assert from "node:assert/strict";
import { readStoredNotes, toneLabel, writeStoredNote } from "../app/app.js";
import test from "node:test";

function createStorage(initial = {}) {
  const values = new Map(Object.entries(initial));

  return {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      values.set(key, value);
    },
  };
}

test("toneLabel returns a readable Mandarin tone name", () => {
  assert.equal(toneLabel(1), "Tone 1 · high");
  assert.equal(toneLabel(3), "Tone 3 · low");
  assert.equal(toneLabel(8), "Tone 8");
});

test("device notes default to an empty collection", () => {
  assert.deepEqual(readStoredNotes(createStorage()), {});
});

test("device notes recover from malformed stored data", () => {
  const storage = createStorage({ "hanzi-explorer:notes": "not json" });

  assert.deepEqual(readStoredNotes(storage), {});
});

test("writeStoredNote saves and removes notes by character", () => {
  const storage = createStorage();

  assert.deepEqual(writeStoredNote(storage, "月", "Moon over the water"), {
    月: "Moon over the water",
  });
  assert.deepEqual(writeStoredNote(storage, "山", "Three peaks"), {
    月: "Moon over the water",
    山: "Three peaks",
  });
  assert.deepEqual(writeStoredNote(storage, "月", "   "), {
    山: "Three peaks",
  });
});
