import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Easing, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Night } from "./Night";
import { Morning } from "./Morning";
import { LINES, MORNING_START, NIGHT_END } from "./timeline";
import { fontBody, fontDisplay } from "./fonts";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/* "next morning" card between the two scenes */
const Card: React.FC<{ title: string; sub?: string; bg: string }> = ({ title, sub, bg }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        background: bg,
        justifyContent: "center",
        alignItems: "center",
        opacity: interpolate(frame, [0, 0.2 * fps, durationInFrames - 0.2 * fps, durationInFrames], [0, 1, 1, 0], clamp),
      }}
    >
      <div
        dir="rtl"
        style={{
          fontFamily: fontDisplay,
          fontSize: 120,
          color: "#fff",
          textAlign: "center",
          scale: String(interpolate(frame, [0, 0.4 * fps], [0.7, 1], { ...clamp, easing: Easing.bezier(0.2, 1.5, 0.4, 1) })),
        }}
      >
        {title}
        {sub && <div style={{ fontFamily: fontBody, fontWeight: 500, fontSize: 52, opacity: 0.85, marginTop: 20 }}>{sub}</div>}
      </div>
    </AbsoluteFill>
  );
};

export const Film: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Sequence name="Night" durationInFrames={Math.round(NIGHT_END * fps)}>
        <Night />
      </Sequence>
      <Sequence name="Next morning card" from={Math.round(NIGHT_END * fps)} durationInFrames={Math.round((MORNING_START - NIGHT_END + 0.3) * fps)}>
        <Card title="למחרת בבוקר" sub="7:45" bg="#ff8c42" />
      </Sequence>
      <Sequence name="Morning" from={Math.round(MORNING_START * fps)} durationInFrames={Math.round((29.0 - MORNING_START) * fps)}>
        <Morning />
      </Sequence>
      <Sequence name="End title" from={Math.round(28.9 * fps)}>
        <Card title="יום פיג'מות 🧸" sub="ביום חמישי. כנראה." bg="#7d4f8c" />
      </Sequence>

      {LINES.map((l) => (
        <Sequence key={l.id} name={`Line ${l.id}`} from={Math.round(l.at * fps)}>
          <Audio src={staticFile(`audio/${l.id}.mp3`)} />
        </Sequence>
      ))}
      {/* phone buzzes: first message, the "thanks" burst, the morning ping */}
      {[0.8, 8.1, 14.3, 27.1].map((at) => (
        <Sequence key={at} name={`Buzz ${at}`} from={Math.round(at * fps)}>
          <Audio src={staticFile("sfx/buzz.mp3")} volume={0.55} />
        </Sequence>
      ))}
      {[8.2, 8.3, 8.4, 8.5, 10.6, 10.9, 11.2, 14.5, 14.7, 14.9].map((at) => (
        <Sequence key={at} name={`Pop ${at}`} from={Math.round(at * fps)}>
          <Audio src={staticFile("sfx/pop.mp3")} volume={0.35} />
        </Sequence>
      ))}
      <Sequence name="Ding" from={Math.round(25.2 * fps)}>
        <Audio src={staticFile("sfx/ding.mp3")} volume={0.4} />
      </Sequence>
    </AbsoluteFill>
  );
};
