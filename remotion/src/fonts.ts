import { continueRender, delayRender, staticFile } from "remotion";

/* same pair as the HTML films: Secular One for titles, Heebo for everything else.
   Bundled in public/fonts (Hebrew + Latin subsets) so rendering never depends on the network. */
const HEBREW = "U+0307-0308, U+0590-05FF, U+200C-2010, U+20AA, U+25CC, U+FB1D-FB4F";
const LATIN = "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD";

export const fontBody = "Heebo";
export const fontDisplay = "'Secular One', Heebo";

const faces: [string, string, string][] = [
  ["Heebo", "Heebo", "500 800"], // variable font: one file covers both weights
  ["Secular One", "SecularOne", "400"],
];

const handle = delayRender("Loading fonts");
Promise.all(
  faces.flatMap(([family, file, weight]) =>
    [
      ["hebrew", HEBREW],
      ["latin", LATIN],
    ].map(([sub, range]) => {
      const face = new FontFace(family, `url(${staticFile(`fonts/${file}-${sub}.woff2`)}) format('woff2')`, { weight, unicodeRange: range });
      document.fonts.add(face);
      return face.load();
    }),
  ),
).then(() => continueRender(handle));
