# PROJECT_STATE

## הפרויקט
"ביטול מנוי" — סרטון אנימציה של 30 שניות (דף HTML יחיד, SVG + overlays, הכל נגזר מ-`render(t)`).
- קוד: `films/bitul-minui/index.html`.
- קולות: `films/bitul-minui/audio/01.mp3` … `10.mp3` (ElevenLabs, eleven_v4, flow `QhiyuhC8R6usk7Ljt1ul`).
- פורסם: https://claude.ai/artifact/7ffY3Q4gkMkreNyXG9eYyx (גרסה 2).

## משימות
- [x] הורדת 10 קטעי ElevenLabs הסופיים (קישורים טריים מ-`creative_get_flow_run_status`) ובדיקת אורכים ב-ffprobe
- [x] שילוב הקולות בדף: נטענים אוטומטית מ-`audio/`, כפתור הטעינה הידני נשאר כגיבוי, speechSynthesis רק כשאין קובץ
- [x] סנכרון שפתיים לפי עוצמת הקול האמיתית (מעטפת RMS לכל קטע)
- [x] אלמנט Audio משותף שנפתח בלחיצה הראשונה (נייד), המשך שורה מאמצע אחרי עצירה/גלילה/ביטול השתקה
- [x] אימות: השורה האחרונה נגמרת ב-29.5 שניות בערך, ופה פתוח רק בזמן דיבור (נבדק ב-Playwright)
- [x] פרסום גרסה 2 ל-Artifact
- [x] בדיקה בטלפון: הקול עובד (אושר ע"י המשתמש)

## סרטון 2: "המשולש האחרון" (`pizza/`)
משפחה (אבא, אמא, נועה, סבא) מתביישת לקחת את משולש הפיצה האחרון; האור כבה והכלב אוכל אותו. בלי כתוביות, רק קול.
- קוד: `films/hameshulash-haacharon/index.html`, קולות: `films/hameshulash-haacharon/audio/*.mp3` (flow `yIkiS0cqsciFdiC2KE2g`, eleven_v4).
- קולות: אבא Itai, אמא Tamar, נועה Shira, סבא Amit ([elderly voice]).
- אודיו דרך Web Audio (4 קולות "אף אחד!" בבת אחת), אפקטים מסונתזים, סנכרון שפתיים לפי עוצמה.
- פורסם: https://claude.ai/artifact/D7Tk19C5Qjh3pcBCeJRCwY

- [x] תסריט, בחירת קולות ויצירת 11 קטעים ב-ElevenLabs
- [x] בניית האנימציה ובדיקת תזמון (שורה אחרונה נגמרת ב-28.9 שניות)
- [x] פרסום
- [x] בדיקה בטלפון: הקול עובד (אושר ע"י המשתמש)

## פלטפורמה: "אולם ההקרנות" (`index.html` בשורש)
- [x] העברת הסרטים ל-`films/<slug>/` + מצבי `#preview` (טריילר שקט בלולאה) ו-`#embed` (נגן)
- [x] דף גלריה: פוסטר + טריילר חי לכל סרט, נגן מלא ב-dialog, Mobile-First, RTL
- [x] פוסטרים (`poster.jpg`) מפריים מתוך כל סרט
- [x] PR ומיזוג ל-main (PR #1)
- פורסם כ-Artifact: https://claude.ai/artifact/Nsv5YM9fV3yDRzqUgQAnjn

## Current Focus
הפלטפורמה ושני הסרטים מוזגו ל-main. הצעד הבא (לפי בקשה): אירוח ציבורי (למשל Cloudflare לפי CLAUDE.md), סרט שלישי.
