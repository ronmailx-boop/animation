# אולם ההקרנות

פלטפורמה לסרטוני אנימציה קצרים בעברית (עד 30 שניות). כל סרט מצויר בקוד (SVG + JS, בלי ספריות) ומדובב בקולות של ElevenLabs.

## כתובת
- https://nu.beemet.vplusstudio.app (המותג: "נו, באמת" — `@nu.beemet`)
- גיבוי: https://nu-beemet.ronmailx.workers.dev
- פריסה: Cloudflare Workers (static assets) דרך GitHub Actions בכל push ל-main (`wrangler.jsonc`, `.assetsignore`, `.github/workflows/deploy-cloudflare.yml`). צריך Secret בשם `CLOUDFLARE_API_TOKEN` בריפו; בלעדיו ה-workflow מדלג. התיקייה `remotion/` ושאר הקבצים הפנימיים לא עולים לאתר.

## מבנה
- `index.html` — דף הבית בסגנון טיקטוק: פיד אנכי במסך מלא, סרט אחד בכל מסך. גוללים למעלה והסרט הבא מתחיל לבד (בלולאה); הקודם נעצר. בצד: לייק (נשמר רק בטלפון של הצופה), שיתוף ו"מההתחלה". הקשה ראשונה פותחת את הסאונד: לכל הפיד יש AudioContext אחד (`window.__ac`), והסרטים משתמשים בו.
- שיתוף: לכל סרט בפיד כפתור "שיתוף". בטלפון נפתח תפריט השיתוף של המכשיר (וואטסאפ וכל אפליקציה מותקנת); במחשב נפתח חלון עם וואטסאפ, טלגרם, פייסבוק, מייל והעתקת קישור. הקישור הוא `index.html#<slug>`, והוא פותח את הסרט ישר בנגן.
- `films/<slug>/index.html` — הסרט עצמו (עובד גם לבד). מצבים לפי hash:
  - `#preview` — לולאה שקטה של קטע נבחר, בלי פקדים (לכרטיס בגלריה).
  - `#embed` — הסרט עם פקדים, בלי כותרת.
  - `#feed` — מסך מלא בלי פקדים, לפיד. הסרט חושף `window.film` (`play`/`pause`/`restart`/`time`/`dur`), מתנגן בלולאה ומשמיע דרך ה-AudioContext של הפיד. בסרט ה-MP4 התמונה מושתקת והסאונד מגיע מ-`audio.mp3`.
- `films/<slug>/audio/*.mp3` — קטעי הקול מ-ElevenLabs.
- `films/<slug>/poster.jpg` — פריים מהסרט, לתצוגה מיידית בגלריה.

## הסרטים
| סרט | תיקייה | דמויות |
|---|---|---|
| יום פיג'מות (Remotion, MP4) | `films/yom-pijamot/` | יעל, מירי הגננת, הורי הגן |
| אכלת? | `films/achalta/` | דני, אמא, אבא |
| שומרת חנייה | `films/shomeret-chanaya/` | יוסי, רינה, שמוליק (בטלפון) |
| רק שאלה | `films/rak-sheela/` | מוטי, צביקה, סבתא, השליח, המזכירה |
| שיעור נהיגה | `films/shiur-nehiga/` | סבתא רחל, המורה, השוטר |
| המקרר החכם | `films/hamekarer-hachacham/` | אבי, המקרר, אמא |
| המשולש האחרון | `films/hameshulash-haacharon/` | אבא, אמא, נועה, סבא, הכלב |
| ביטול מנוי | `films/bitul-minui/` | דנה, עומר |

## הוספת סרט
1. יוצרים תיקייה `films/<slug>/` עם `index.html`, `audio/` ו-`poster.jpg`.
2. מוסיפים לסרט את `startPreview(from,to)` ואת מצב `#feed` (ראו את הסרטים הקיימים).
3. מוסיפים רשומה למערך `FILMS` בראש הסקריפט ב-`index.html`.

## סרטים ב-Remotion
מסרטון 8 ("יום פיג'מות") יש גם שיטה שנייה: הסרט נכתב ב-React עם [Remotion](https://www.remotion.dev) בתיקייה `remotion/` ומרונדר לקובץ `films/<slug>/film.mp4`. הדף `films/<slug>/index.html` הוא נגן וידאו עם אותם מצבי `#preview` / `#embed`, כך שהגלריה לא צריכה לדעת את ההבדל.
- קולות: `remotion/public/audio/*.mp3` (ElevenLabs), סנכרון שפתיים מ-`remotion/src/envelopes.json`, תזמון ב-`remotion/src/timeline.ts`.
- פונטים מקומיים ב-`remotion/public/fonts` (הרינדור לא תלוי ברשת).
- רינדור: `cd remotion && npm i && npx remotion render YomPijamot ../films/yom-pijamot/film.mp4 --crf=26`
  (בסביבת הענן של Claude: להוסיף `--browser-executable=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell`).
- תצוגה מקדימה אינטראקטיבית: `npx remotion studio`.

## הרצה מקומית
`python3 -m http.server` מתיקיית הריפו, ואז http://localhost:8000 (צריך שרת, כי הקולות נטענים ב-fetch; לסרטי ה-MP4 עדיף שרת שתומך ב-Range, למשל `npx http-server`, כדי שהטריילר יוכל לקפוץ לאמצע).
