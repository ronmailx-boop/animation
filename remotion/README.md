# Remotion — סרטי MP4 של "נו, באמת"

כאן נכתבים הסרטים שמרונדרים לווידאו (כרגע: `YomPijamot` → `films/yom-pijamot/film.mp4`).

```
npm i
npx remotion studio                 # תצוגה מקדימה אינטראקטיבית
npx remotion render YomPijamot ../films/yom-pijamot/film.mp4 --crf=26
```

- `src/timeline.ts` — מתי כל שורת קול מתחילה ומי אומר אותה; `mouth()` נותן פתיחת פה לפי `envelopes.json`.
- `src/Night.tsx`, `src/Morning.tsx` — שתי הסצנות. `src/characters.tsx` — הדמויות (SVG).
- `public/audio` — קולות ElevenLabs, `public/sfx` — אפקטים, `public/fonts` — Heebo ו-Secular One (עברית + לטינית).
