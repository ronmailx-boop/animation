import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Body, Face, INK, Teddy } from "./characters";
import { MORNING_START, mouth } from "./timeline";
import { fontBody, fontDisplay } from "./fonts";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const pop = Easing.bezier(0.2, 1.5, 0.4, 1);

/* a classmate in ordinary clothes, peeking in from the right */
const Classmate: React.FC<{ x: number; t0: number; t: number; top: string; hair: string; skin: string; style: "kid" | "pony" | "curly" }> = ({ x, t0, t, top, hair, skin, style }) => {
  const k = interpolate(t, [t0, t0 + 0.35], [0, 1], { ...clamp, easing: pop });
  return (
    <g transform={`translate(${x + (1 - k) * 500},1900) scale(0.5)`}>
      <Body top={top} bottom="#3d5a80" skin={skin} s={1} />
      <g transform="translate(0,-440)">
        <Face skin={skin} hair={hair} hairStyle={style} mouth={0} eyes="wide" look={-1} smile="neutral" />
      </g>
    </g>
  );
};

export const Morning: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps + MORNING_START; // timeline seconds

  const enter = interpolate(t, [18.4, 19.1], [-520, 0], { ...clamp, easing: Easing.bezier(0.2, 0.9, 0.3, 1) });
  const bob = t < 19.1 ? Math.abs(Math.sin(t * 14)) * -18 : 0;
  const yaelTalk = mouth("yael", t);
  const miriTalk = mouth("miri", t);
  const busted = t > 23.3; // Miri says "Thursday"
  const circle = interpolate(t, [25.2, 25.9], [1, 0], clamp); // red marker around "שלישי"
  const slump = interpolate(t, [28.0, 28.5], [0, 1], { ...clamp, easing: Easing.bezier(0.5, 0, 0.3, 1) });
  const ping = interpolate(t, [27.3, 27.55], [0, 1], { ...clamp, easing: pop });
  const pingOut = interpolate(t, [29.0, 29.3], [1, 0], clamp);
  const buzz = t > 27.1 && t < 27.6 ? Math.sin(frame * 2.6) * 5 : 0;

  return (
    <AbsoluteFill style={{ background: "#fff3c4" }}>
      <svg viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
        {/* wall, floor */}
        <rect x={0} y={1380} width={1080} height={540} fill="#d9a066" />
        {[1470, 1580, 1700, 1830].map((y) => (
          <path key={y} d={`M0 ${y} H1080`} stroke="#b97f4a" strokeWidth={6} />
        ))}
        <path d="M0 1380 H1080" stroke={INK} strokeWidth={8} />
        {/* bunting */}
        <path d="M0 70 q540 90 1080 0" fill="none" stroke={INK} strokeWidth={5} />
        {["#ff6b6b", "#ffd43b", "#69db7c", "#4dabf7", "#da77f2", "#ff922b", "#ff6b6b", "#ffd43b", "#69db7c"].map((c, i) => {
          const x = 60 + i * 120;
          const y = 70 + 90 * (1 - Math.pow((x - 540) / 540, 2)) * 0.5;
          return <path key={i} d={`M${x - 34} ${y} h68 l-34 60z`} fill={c} stroke={INK} strokeWidth={5} />;
        })}
        {/* sign */}
        <rect x={250} y={200} width={580} height={130} rx={30} fill="#ffffff" stroke={INK} strokeWidth={8} />
        {/* whiteboard */}
        <rect x={600} y={420} width={420} height={330} rx={16} fill="#fdfdfd" stroke={INK} strokeWidth={8} />
        <ellipse
          cx={815}
          cy={520}
          rx={150}
          ry={62}
          fill="none"
          stroke="#e03131"
          strokeWidth={9}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={circle}
          strokeLinecap="round"
          transform="rotate(-4 815 520)"
        />
        {/* window with sun */}
        <rect x={60} y={420} width={300} height={300} rx={16} fill="#a5d8ff" stroke={INK} strokeWidth={8} />
        <circle cx={150} cy={510} r={50} fill="#ffd43b" stroke={INK} strokeWidth={6} />
        <path d="M210 420 v300 M60 570 h300" stroke={INK} strokeWidth={8} />

        {/* classmates, all dressed normally */}
        <Classmate x={690} t0={21.7} t={t} top="#4dabf7" hair="#2b1d12" skin="#e0ac69" style="kid" />
        <Classmate x={850} t0={21.85} t={t} top="#69db7c" hair="#c47a2c" skin="#f6cfa8" style="pony" />
        <Classmate x={1000} t0={22.0} t={t} top="#ff922b" hair="#1d1d1d" skin="#c68642" style="curly" />

        {/* Miri, the teacher */}
        <g transform="translate(820,1640)">
          <Body top="#20c997" bottom="#364fc7" skin="#e8b98f" s={0.95} arms={busted ? "down" : "wave"} />
          <g transform={`translate(0,-418) rotate(${busted ? -6 : 0})`}>
            <Face skin="#e8b98f" hair="#a0522d" hairStyle="curly" mouth={miriTalk * 0.8} eyes={t > 21.6 && t < 22.6 ? "wide" : "open"} smile={busted ? "awkward" : "big"} look={-1} blush />
          </g>
        </g>

        {/* Yael + Itamar walk in, both in pyjamas */}
        <g transform={`translate(${enter},${bob})`}>
          <g transform="translate(560,1740)">
            <Body top="#4c6ef5" bottom="#4c6ef5" pattern="stars" skin="#f2c6a0" s={0.62} arms="hold" />
            <g transform="translate(26,-92) scale(0.6)">
              <Teddy />
            </g>
            <g transform="translate(0,-280) scale(0.66)">
              <Face skin="#f2c6a0" hair="#5a3825" hairStyle="kid" mouth={0} eyes={busted ? "open" : "open"} smile={t > 26.6 ? "neutral" : "big"} look={t > 26.6 ? -1 : 1} lookUp={t > 26.6 ? 1 : 0} blush />
            </g>
          </g>
          <g transform={`translate(300,1700) rotate(${slump * 3})`}>
            <Body top="#f783ac" bottom="#f783ac" pattern="dots" skin="#f2c6a0" s={1} arms={busted ? "down" : "wave"} slippers />
            <g transform={`translate(0,${-440 + slump * 30}) rotate(${slump * 12})`}>
              <Face
                skin="#f2c6a0"
                hair="#5a3825"
                hairStyle="bun-messy"
                mouth={yaelTalk * 0.85}
                eyes={t > 28.2 ? "closed" : busted ? "wide" : "open"}
                smile={busted ? "awkward" : "big"}
                look={1}
                bags={0.8}
                sweat={interpolate(t, [24.2, 24.8], [0, 1], clamp)}
                blush={busted}
              />
            </g>
            {/* phone in the pyjama pocket */}
            <rect x={-70 + buzz} y={-260} width={46} height={74} rx={10} fill="#16161b" stroke={INK} strokeWidth={5} />
            <rect x={-64 + buzz} y={-252} width={34} height={56} rx={6} fill={t > 27.1 ? "#9be7c4" : "#334"} />
          </g>
        </g>
      </svg>

      {/* sign + board text */}
      <div style={{ position: "absolute", left: 250, top: 212, width: 580, textAlign: "center", fontFamily: fontDisplay, fontSize: 76, color: "#c2255c" }}>🌼 גן החבצלות 🌼</div>
      <div dir="rtl" style={{ position: "absolute", left: 600, top: 448, width: 420, textAlign: "center", fontFamily: fontDisplay, color: "#1d1d1d" }}>
        <div style={{ fontSize: 66 }}>היום: שלישי</div>
        <div style={{ fontSize: 38, color: "#495057", marginTop: 40 }}>חמישי: יום פיג'מות 🧸</div>
      </div>

      {/* the group pings again */}
      <div
        dir="rtl"
        style={{
          position: "absolute",
          left: 90 + enter,
          top: 1030,
          background: "#fff",
          borderRadius: "30px 30px 30px 8px",
          padding: "16px 28px",
          boxShadow: "0 6px 0 rgba(0,0,0,.18)",
          border: `5px solid ${INK}`,
          opacity: ping * pingOut,
          scale: String(0.5 + 0.5 * ping),
          transformOrigin: "left bottom",
        }}
      >
        <div style={{ fontFamily: fontBody, fontWeight: 800, fontSize: 30, color: "#1971c2" }}>הורי גן החבצלות · איתי</div>
        <div style={{ fontFamily: fontBody, fontWeight: 500, fontSize: 48 }}>תודה מירי!! 🙏</div>
      </div>
    </AbsoluteFill>
  );
};
