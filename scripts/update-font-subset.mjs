import { mkdir, readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const projectRoot = new URL("../", import.meta.url);
const fontDirectory = new URL("app/fonts/", projectRoot);
export const fontSourcePaths = [
  "data/characters.json",
  "app/index.html",
  "app/favicon.svg",
];
const licenseUrl =
  "https://raw.githubusercontent.com/google/fonts/main/ofl/notoserifsc/OFL.txt";

export function extractHanzi(sources) {
  const glyphs = sources.join("").match(/\p{Script=Han}/gu) ?? [];

  return [...new Set(glyphs)]
    .sort((left, right) => left.codePointAt(0) - right.codePointAt(0))
    .join("");
}

async function fetchRequired(url, options) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`);
  }

  return response;
}

export async function updateFontSubset() {
  const sources = await Promise.all(
    fontSourcePaths.map((path) => readFile(new URL(path, projectRoot), "utf8")),
  );
  const glyphs = extractHanzi(sources);
  const cssUrl = new URL("https://fonts.googleapis.com/css2");
  cssUrl.searchParams.set("family", "Noto Serif SC:wght@400");
  cssUrl.searchParams.set("display", "swap");
  cssUrl.searchParams.set("text", glyphs);

  const cssResponse = await fetchRequired(cssUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 AppleWebKit/537.36 Chrome/136.0.0.0 Safari/537.36",
    },
  });
  const css = await cssResponse.text();
  const fontUrl = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/)?.[1];

  if (!fontUrl) {
    throw new Error("Google Fonts did not return a downloadable font URL");
  }

  const [fontResponse, licenseResponse] = await Promise.all([
    fetchRequired(fontUrl),
    fetchRequired(licenseUrl),
  ]);
  const font = Buffer.from(await fontResponse.arrayBuffer());

  if (font.subarray(0, 4).toString("ascii") !== "wOF2") {
    throw new Error("Google Fonts did not return a valid WOFF2 font");
  }

  await mkdir(fontDirectory, { recursive: true });
  await Promise.all([
    writeFile(new URL("noto-serif-sc-subset.woff2", fontDirectory), font),
    writeFile(
      new URL("OFL.txt", fontDirectory),
      await licenseResponse.text(),
      "utf8",
    ),
    writeFile(new URL("subset.txt", fontDirectory), `${glyphs}\n`, "utf8"),
  ]);

  console.log(
    `Wrote Noto Serif SC subset with ${Array.from(glyphs).length} glyphs.`,
  );
}

const entryPoint = process.argv[1]
  ? pathToFileURL(process.argv[1]).href
  : undefined;

if (import.meta.url === entryPoint) {
  await updateFontSubset();
}
