import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Face, INK } from "./characters";
import { mouth, speaking } from "./timeline";
import { fontBody, fontDisplay } from "./fonts";

/* the parents' group: t = second the bubble lands, line = the voice that reads it */
const MSGS: { t: number; name: string; color: string; text: string; line?: string }[] = [
  { t: 0.8, name: "מירי הגננת", color: "#c2255c", text: "הורים יקרים! ביום חמישי — יום פיג'מות! 🧸", line: "01" },
  { t: 4.9, name: "איתי (אבא של רוני)", color: "#1971c2", text: "תודה מירי!", line: "02" },
  { t: 6.15, name: "שירה", color: "#2b8a3e", text: "תודה רבה!", line: "03" },
  { t: 7.25, name: "עמית", color: "#e8590c", text: "תודה! ❤️", line: "04" },
  { t: 8.1, name: "אמא של נועם", color: "#7048e8", text: "תודה!!" },
  { t: 8.2, name: "דנה", color: "#0c8599", text: "תודה מירי ❤️" },
  { t: 8.3, name: "גלית", color: "#d6336c", text: "תותחית!!" },
  { t: 8.4, name: "משה", color: "#5c940d", text: "תודה" },
  { t: 8.5, name: "רוני ק.", color: "#1864ab", text: "תודה רבה!!!" },
  { t: 8.65, name: "מאיה", color: "#ae3ec9", text: "רגע, פיג'מה של קיץ או של חורף?", line: "05" },
  { t: 10.6, name: "אבא של יואב", color: "#e67700", text: "קיץ" },
  { t: 10.9, name: "גלית", color: "#d6336c", text: "חורף!!" },
  { t: 11.2, name: "דנה", color: "#0c8599", text: "מה זה משנה" },
  { t: 11.9, name: "עומר", color: "#c92a2a", text: "אז זה מחר?", line: "06" },
  { t: 13.3, name: "תומר", color: "#364fc7", text: "כן. מחר.", line: "07" },
  { t: 14.3, name: "שירה", color: "#2b8a3e", text: "מחר??" },
  { t: 14.5, name: "עמית", color: "#e8590c", text: "חשבתי חמישי" },
  { t: 14.7, name: "אמא של נועם", color: "#7048e8", text: "אפשר לשלוח שוב את ההודעה?" },
  { t: 14.9, name: "משה", color: "#5c940d", text: "תודה" },
];

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Bubble: React.FC<{ m: (typeof MSGS)[number]; t: number }> = ({ m, t }) => {
  const k = interpolate(t, [m.t, m.t + 0.22], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) });
  const live = m.line ? speaking(m.line, t) : false;
  return (
    <div style={{ maxHeight: interpolate(t, [m.t, m.t + 0.18], [0, 260], clamp), overflow: "visible" }}>
      <div
        style={{
          margin: "10px 0 8px",
          alignSelf: "flex-start",
          maxWidth: 680,
          width: "fit-content",
          background: "#fff",
          borderRadius: "8px 30px 30px 30px",
          padding: "14px 26px 16px",
          boxShadow: live ? "0 0 0 6px #ffd43b" : "0 3px 0 rgba(0,0,0,.12)",
          opacity: k,
          scale: String(0.6 + 0.4 * k),
          transformOrigin: "right top",
        }}
      >
        <div style={{ fontFamily: fontBody, fontWeight: 800, fontSize: 30, color: m.color }}>{m.name}</div>
        <div style={{ fontFamily: fontBody, fontWeight: 500, fontSize: 46, color: "#1d1d1d", lineHeight: 1.2 }}>{m.text}</div>
      </div>
    </div>
  );
};

export const Night: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const minutes = interpolate(t, [0, 8, 15, 17.6], [0, 7, 38, 65], clamp);
  const total = (23 * 60 + 47 + Math.floor(minutes)) % 1440;
  const clock = `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
  const unread = Math.round(interpolate(t, [0, 0.8, 7.3, 8.6, 11.3, 14.9, 16], [0, 1, 4, 47, 112, 186, 214], clamp));

  // Yael wakes up with the first buzz and gets more tired; after her line she pulls the blanket over her head
  const yaelMouth = mouth("yael", t);
  const blanket = interpolate(t, [16.9, 17.35], [0, 1], { ...clamp, easing: Easing.bezier(0.5, 0, 0.3, 1) });
  const buzz = MSGS.some((m) => t >= m.t && t < m.t + 0.25) ? Math.sin(frame * 2.6) * 6 : 0;
  const eyes = t < 0.8 ? "closed" : t < 1.4 ? "wide" : t > 15.1 ? "half" : "open";

  const visible = MSGS.filter((m) => t >= m.t);

  return (
    <AbsoluteFill style={{ background: "#141a3a" }}>
      <svg viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        {/* window + moon */}
        <rect x={70} y={110} width={260} height={300} rx={14} fill="#26346e" stroke={INK} strokeWidth={8} />
        <circle cx={250} cy={190} r={44} fill="#fff4c2" />
        <circle cx={268} cy={176} r={40} fill="#26346e" />
        {[
          [120, 160],
          [170, 330],
          [290, 340],
          [110, 270],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={4} fill="#fff4c2" opacity={0.5 + 0.5 * Math.sin(frame / 9 + i)} />
        ))}
        <path d="M200 110 v300 M70 260 h260" stroke={INK} strokeWidth={8} />
        {/* nightstand + clock */}
        <rect x={810} y={520} width={210} height={260} rx={10} fill="#5b3b2a" stroke={INK} strokeWidth={8} />
        <rect x={830} y={440} width={170} height={84} rx={14} fill="#1b1b1b" stroke={INK} strokeWidth={8} />
        {/* bed: headboard, pillow, Yael, blanket */}
        <rect x={190} y={300} width={700} height={520} rx={40} fill="#7d4f8c" stroke={INK} strokeWidth={8} />
        <rect x={300} y={400} width={480} height={170} rx={80} fill="#f3eefc" stroke={INK} strokeWidth={8} />
        <g transform={`translate(540,${470 + blanket * 30}) rotate(${buzz * 0.4})`}>
          <Face
            skin="#f2c6a0"
            hair="#5a3825"
            hairStyle="bun-messy"
            mouth={yaelMouth * 0.7}
            eyes={eyes}
            smile={t > 9 ? "tired" : "neutral"}
                        lookUp={-0.6}
            bags={interpolate(t, [4, 15], [0, 1], clamp)}
            glow={t > 0.8 ? 1 : 0}
          />
        </g>
        <path
          d={`M150 ${interpolate(blanket, [0, 1], [600, 385])} q390 ${-60 + blanket * 20} 780 0 v400 h-780z`}
          fill="#e4577a"
          stroke={INK}
          strokeWidth={8}
          strokeLinejoin="round"
        />
        <path d={`M150 ${interpolate(blanket, [0, 1], [640, 425])} q390 -60 780 0`} fill="none" stroke="#ffd1dc" strokeWidth={10} opacity={0.7} />
        {/* phone held up: bezel, extends past the bottom edge */}
        <g transform={`translate(${buzz},0)`}>
          <rect x={80} y={760} width={920} height={1260} rx={70} fill="#16161b" stroke={INK} strokeWidth={8} />
        </g>
      </svg>

      {/* clock digits */}
      <div style={{ position: "absolute", left: 830, top: 452, width: 170, textAlign: "center", fontFamily: fontBody, fontWeight: 800, fontSize: 54, color: "#ff4d4d", direction: "ltr", textShadow: "0 0 12px #ff4d4d" }}>
        {clock}
      </div>

      {/* phone screen */}
      <div
        dir="rtl"
        style={{
          position: "absolute",
          left: 112 + buzz,
          top: 792,
          width: 856,
          height: 1128,
          borderRadius: "46px 46px 0 0",
          overflow: "hidden",
          background: "#ece5dd",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22, background: "#1f7a5c", color: "#fff", padding: "26px 30px" }}>
          <div style={{ width: 92, height: 92, borderRadius: "50%", background: "#ffe066", display: "grid", placeItems: "center", fontSize: 56 }}>🌼</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: fontDisplay, fontSize: 46 }}>הורי גן החבצלות</div>
            <div style={{ fontFamily: fontBody, fontSize: 28, opacity: 0.85 }}>32 משתתפים</div>
          </div>
          <div
            style={{
              fontFamily: fontBody,
              fontWeight: 800,
              fontSize: 40,
              background: "#ff3b3b",
              borderRadius: 40,
              padding: "6px 22px",
              scale: String(1 + (unread > 0 ? 0.12 * Math.max(0, Math.sin(frame / 3)) * (t > 8 ? 1 : 0) : 0)),
              opacity: unread > 0 ? 1 : 0,
            }}
          >
            {unread}
          </div>
        </div>
        <div style={{ flex: 1, minHeight: 0, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 30px 40px" }}>
          {visible.slice(-9).map((m, i) => (
            <Bubble key={m.t + m.name + i} m={m} t={t} />
          ))}
        </div>
      </div>

      {/* Yael's whisper, as a caption over the room */}
      <div
        style={{
          position: "absolute",
          top: 90,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: fontDisplay,
          fontSize: 64,
          color: "#fff",
          opacity: interpolate(t, [15.3, 15.5, 17.1, 17.4], [0, 1, 1, 0], clamp),
          textShadow: "0 4px 0 #000",
        }}
      >
        די... תנו לישון...
      </div>
    </AbsoluteFill>
  );
};
