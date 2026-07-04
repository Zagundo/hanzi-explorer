const NOTES_STORAGE_KEY = "hanzi-explorer:notes";

const TONE_NAMES = {
  1: "high",
  2: "rising",
  3: "low",
  4: "falling",
  5: "neutral",
};

export function toneLabel(tone) {
  const name = TONE_NAMES[tone];
  return name ? `Tone ${tone} · ${name}` : `Tone ${tone}`;
}

export function readStoredNotes(storage) {
  try {
    const parsed = JSON.parse(storage.getItem(NOTES_STORAGE_KEY) || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed
      : {};
  } catch {
    return {};
  }
}

export function writeStoredNote(storage, character, note) {
  const notes = readStoredNotes(storage);

  if (note.trim()) {
    notes[character] = note;
  } else {
    delete notes[character];
  }

  storage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  return notes;
}

function element(tagName, className, text) {
  const node = document.createElement(tagName);

  if (className) {
    node.className = className;
  }

  if (text !== undefined) {
    node.textContent = text;
  }

  return node;
}

function replaceList(list, values, className = "") {
  list.replaceChildren(
    ...values.map((value) => element("li", className, value)),
  );
}

function init() {
  const grid = document.querySelector("#character-grid");
  const status = document.querySelector("#status");
  const count = document.querySelector("#collection-count");
  const dialog = document.querySelector("#specimen-dialog");
  const closeButton = document.querySelector("#close-specimen");
  const notesField = document.querySelector("#simon-notes");
  const saveStatus = document.querySelector("#save-status");
  let selectedCharacter = null;

  function renderGrid(characters) {
    const cards = characters.map((character, index) => {
      const item = element("li");
      const button = element("button", "character-card");
      button.type = "button";
      button.setAttribute(
        "aria-label",
        `Open ${character.character}, ${character.pinyin}, ${character.meaning}`,
      );

      const number = element(
        "span",
        "card-number",
        String(index + 1).padStart(2, "0"),
      );
      const hanzi = element("span", "card-character", character.character);
      hanzi.lang = "zh-Hans";

      const meta = element("span", "card-meta");
      meta.append(
        element("span", "card-pinyin", character.pinyin),
        element("span", "card-meaning", character.meaning),
      );

      button.append(number, hanzi, meta);
      button.addEventListener("click", () =>
        openSpecimen(character, index, characters.length),
      );
      item.append(button);
      return item;
    });

    grid.replaceChildren(...cards);
    count.textContent = `${characters.length} specimens`;
    status.hidden = true;
  }

  function openSpecimen(character, index, total) {
    selectedCharacter = character;
    document.querySelector("#specimen-index").textContent =
      `Specimen ${String(index + 1).padStart(2, "0")} of ${String(total).padStart(2, "0")}`;
    document.querySelector("#specimen-character").textContent =
      character.character;
    document.querySelector("#specimen-pinyin").textContent = character.pinyin;
    document.querySelector("#specimen-meaning").textContent = character.meaning;
    document.querySelector("#specimen-tone").textContent = toneLabel(
      character.tone,
    );
    document.querySelector("#specimen-component-notes").textContent =
      character.component_notes;

    replaceList(
      document.querySelector("#specimen-components"),
      character.components,
    );
    replaceList(
      document.querySelector("#specimen-phrases"),
      character.modern_phrases,
    );

    const storedNotes = readStoredNotes(window.localStorage);
    notesField.value =
      storedNotes[character.character] ?? character.simon_notes ?? "";
    saveStatus.textContent = "Saved only on this device";

    dialog.showModal();
  }

  closeButton.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  notesField.addEventListener("input", () => {
    if (!selectedCharacter) {
      return;
    }

    try {
      writeStoredNote(
        window.localStorage,
        selectedCharacter.character,
        notesField.value,
      );
      saveStatus.textContent = notesField.value.trim()
        ? "Saved on this device"
        : "No note saved";
    } catch {
      saveStatus.textContent = "This browser could not save your note";
    }
  });

  fetch("../data/characters.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Character data returned ${response.status}`);
      }

      return response.json();
    })
    .then((characters) => {
      if (!Array.isArray(characters) || characters.length === 0) {
        throw new Error("Character data is empty");
      }

      renderGrid(characters);
    })
    .catch((error) => {
      console.error(error);
      count.textContent = "Unavailable";
      status.classList.add("status-error");
      status.textContent =
        window.location.protocol === "file:"
          ? "Open Hanzi Explorer from its published web address so the collection data can load."
          : "The character collection could not be loaded. Please try again.";
    });
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", init);
}
