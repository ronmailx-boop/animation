# PROJECT_STATE

## הפרויקט
"ביטול מנוי" — סרטון אנימציה של 30 שניות (דף HTML יחיד, SVG + overlays, הכל נגזר מ-`render(t)`).
- קוד: `index.html` (המקור של ה-Artifact, בלי skeleton — עוטפים אותו בפרסום).
- קולות: `audio/01.mp3` … `audio/10.mp3` (ElevenLabs, eleven_v4, flow `QhiyuhC8R6usk7Ljt1ul`).
- פורסם: https://claude.ai/artifact/7ffY3Q4gkMkreNyXG9eYyx (גרסה 2).

## משימות
- [x] הורדת 10 קטעי ElevenLabs הסופיים (קישורים טריים מ-`creative_get_flow_run_status`) ובדיקת אורכים ב-ffprobe
- [x] שילוב הקולות בדף: נטענים אוטומטית מ-`audio/`, כפתור הטעינה הידני נשאר כגיבוי, speechSynthesis רק כשאין קובץ
- [x] סנכרון שפתיים לפי עוצמת הקול האמיתית (מעטפת RMS לכל קטע)
- [x] אלמנט Audio משותף שנפתח בלחיצה הראשונה (נייד), המשך שורה מאמצע אחרי עצירה/גלילה/ביטול השתקה
- [x] אימות: השורה האחרונה נגמרת ב-29.5 שניות בערך, ופה פתוח רק בזמן דיבור (נבדק ב-Playwright)
- [x] פרסום גרסה 2 ל-Artifact

## Current Focus
הגרסה עם קולות ElevenLabs פורסמה. הצעד הבא: בדיקה בטלפון (iOS/Android) שהקול מתנגן ושהשפתיים מסונכרנות.
