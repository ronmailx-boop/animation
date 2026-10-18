import envelopes from "./envelopes.json";

/* every spoken line: file in public/audio/<id>.mp3, start time in seconds, who says it */
export type Who = "miri" | "yael" | "group";

export const LINES: { id: keyof typeof envelopes; at: number; who: Who }[] = [
  { id: "01", at: 1.0, who: "miri" }, // הורים יקרים! ביום חמישי — יום פיג'מות!
  { id: "02", at: 5.0, who: "group" }, // תודה מירי!
  { id: "03", at: 6.25, who: "group" }, // תודה רבה!
  { id: "04", at: 7.35, who: "group" }, // תודה!
  { id: "05", at: 8.75, who: "group" }, // רגע, פיג'מה של קיץ או של חורף?
  { id: "06", at: 12.0, who: "group" }, // אז זה מחר?
  { id: "07", at: 13.4, who: "group" }, // כן. מחר.
  { id: "08", at: 15.3, who: "yael" }, // די... תנו לישון...
  { id: "09", at: 19.2, who: "yael" }, // בוקר טוב! באנו בפיג'מות!
  { id: "10", at: 22.7, who: "miri" }, // יעל... זה ביום חמישי. היום שלישי.
  { id: "11", at: 27.4, who: "group" }, // תודה מירי!!
];

export const NIGHT_END = 17.6; // night scene → "next morning" card
export const MORNING_START = 18.4;

const FPS = 30; // envelopes.json was sampled at 30 values per second

/** how open a character's mouth is (0..1) at a given time, from the real loudness of their lines */
export const mouth = (who: Who, t: number) => {
  for (const l of LINES) {
    if (l.who !== who) continue;
    const env = envelopes[l.id];
    const i = Math.floor((t - l.at) * FPS);
    if (i >= 0 && i < env.length) return env[i];
  }
  return 0;
};

/** is this line being heard right now */
export const speaking = (id: string, t: number) => {
  const l = LINES.find((x) => x.id === id)!;
  return t >= l.at && t < l.at + envelopes[l.id].length / FPS;
};
