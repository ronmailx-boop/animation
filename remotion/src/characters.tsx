import React from "react";

/* flat cartoon with thick outlines, same look as the other films in the gallery */
export const INK = "#2a1d14";
const SW = 7;

type Eyes = "open" | "closed" | "half" | "wide";
type Smile = "big" | "neutral" | "awkward" | "tired";

export type FaceProps = {
  skin: string;
  hair: string;
  hairStyle: "bun-messy" | "bob" | "kid" | "curly" | "pony";
  mouth: number; // 0..1 open
  eyes?: Eyes;
  smile?: Smile;
  look?: number; // pupils, -1 (left) .. 1 (right)
  lookUp?: number; // pupils, 0 .. 1 (up)
  blush?: boolean;
  bags?: number; // tired eye bags 0..1
  sweat?: number; // 0..1 sweat drop
  glow?: number; // blue phone light 0..1
};

/* a head centred on (0,0), radius ~100 */
export const Face: React.FC<FaceProps> = ({
  skin,
  hair,
  hairStyle,
  mouth,
  eyes = "open",
  smile = "neutral",
  look = 0,
  lookUp = 0,
  blush,
  bags = 0,
  sweat = 0,
  glow = 0,
}) => {
  const px = look * 7;
  const py = -lookUp * 7;
  const eye = (x: number) => {
    if (eyes === "closed")
      return <path d={`M${x - 16} 0 q16 12 32 0`} fill="none" stroke={INK} strokeWidth={6} strokeLinecap="round" />;
    const r = eyes === "wide" ? 21 : 17;
    return (
      <g>
        <ellipse cx={x} cy={0} rx={r} ry={eyes === "wide" ? 24 : 20} fill="#fff" stroke={INK} strokeWidth={5} />
        <circle cx={x + px} cy={2 + py} r={eyes === "wide" ? 7 : 9} fill={INK} />
        {eyes === "half" && (
          <g>
            <path d={`M${x - 24} 2 a24 26 0 0 1 48 0z`} fill={skin} />
            <path d={`M${x - 22} 2 h44`} stroke={INK} strokeWidth={7} strokeLinecap="round" />
          </g>
        )}
      </g>
    );
  };
  const m = Math.max(0, Math.min(1, mouth));
  return (
    <g>
      {/* hair behind the head */}
      {hairStyle === "bob" && <path d="M-112 10 q-6 -128 112 -132 q118 4 112 132 l0 70 q-40 10 -40 -40 l-144 0 q0 50 -40 40z" fill={hair} stroke={INK} strokeWidth={SW} />}
      {hairStyle === "curly" && (
        <g fill={hair} stroke={INK} strokeWidth={SW}>
          {[-95, -55, -10, 40, 85].map((x, i) => (
            <circle key={i} cx={x} cy={-70 + (i % 2) * 14} r={48} />
          ))}
          <circle cx={-105} cy={-5} r={36} />
          <circle cx={105} cy={-5} r={36} />
        </g>
      )}
      {hairStyle === "pony" && <path d="M95 -40 q70 20 50 120 q-10 40 -40 30 q30 -60 -20 -110z" fill={hair} stroke={INK} strokeWidth={SW} />}
      <ellipse cx={0} cy={0} rx={100} ry={110} fill={skin} stroke={INK} strokeWidth={SW} />
      <circle cx={-100} cy={10} r={20} fill={skin} stroke={INK} strokeWidth={SW} />
      <circle cx={100} cy={10} r={20} fill={skin} stroke={INK} strokeWidth={SW} />
      {/* hair on top */}
      {hairStyle === "bun-messy" && (
        <g fill={hair} stroke={INK} strokeWidth={SW} strokeLinejoin="round">
          <circle cx={10} cy={-128} r={46} />
          <path d="M-60 -150 l-14 -26 M40 -168 l22 -22 M-10 -176 l-4 -26" fill="none" />
          <path d="M-104 -10 q-6 -110 104 -112 q110 2 104 112 q-30 -60 -70 -64 q-30 30 -90 26 q-30 -4 -48 38z" />
        </g>
      )}
      {hairStyle === "bob" && <path d="M-104 -20 q0 -100 104 -102 q104 2 104 102 q-50 -70 -120 -50 q-40 10 -88 50z" fill={hair} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />}
      {hairStyle === "kid" && <path d="M-100 -20 q-4 -96 100 -96 q104 0 100 96 q-24 -34 -50 -40 l-10 22 l-20 -26 l-16 22 l-16 -24 l-20 22 l-10 -22 q-36 10 -58 46z" fill={hair} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />}
      {hairStyle === "pony" && <path d="M-104 -10 q-4 -110 104 -110 q108 0 104 110 q-60 -80 -208 0z" fill={hair} stroke={INK} strokeWidth={SW} />}
      {/* eyes */}
      <g transform="translate(0,-5)">
        {bags > 0 && (
          <g opacity={bags} fill="none" stroke="#7d5a8a" strokeWidth={5} strokeLinecap="round">
            <path d="M-56 26 q16 10 32 0" />
            <path d="M24 26 q16 10 32 0" />
          </g>
        )}
        {eye(-40)}
        {eye(40)}
      </g>
      {blush && (
        <g fill="#ff8b8b" opacity={0.55}>
          <ellipse cx={-62} cy={38} rx={18} ry={10} />
          <ellipse cx={62} cy={38} rx={18} ry={10} />
        </g>
      )}
      {/* nose */}
      <path d="M0 10 q-10 22 4 26" fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />
      {/* mouth: talking opens an ellipse, otherwise the expression */}
      {m > 0.08 ? (
        <g>
          <ellipse cx={0} cy={66} rx={22 + m * 10} ry={6 + m * 22} fill="#7a1f24" stroke={INK} strokeWidth={6} />
          <ellipse cx={0} cy={72 + m * 12} rx={12 + m * 4} ry={3 + m * 6} fill="#ff7b86" />
        </g>
      ) : smile === "big" ? (
        <path d="M-38 56 q38 44 76 0 z" fill="#7a1f24" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      ) : smile === "awkward" ? (
        <path d="M-34 66 l14 -6 l14 8 l14 -8 l14 8 l12 -6" fill="none" stroke={INK} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
      ) : smile === "tired" ? (
        <path d="M-24 70 q24 -10 48 0" fill="none" stroke={INK} strokeWidth={6} strokeLinecap="round" />
      ) : (
        <path d="M-26 62 q26 16 52 0" fill="none" stroke={INK} strokeWidth={6} strokeLinecap="round" />
      )}
      {sweat > 0 && (
        <path
          transform={`translate(96,${-60 + sweat * 50}) scale(${sweat})`}
          d="M0 -24 q16 24 0 34 q-16 -10 0 -34z"
          fill="#8fd3ff"
          stroke={INK}
          strokeWidth={4}
        />
      )}
      {glow > 0 && <ellipse cx={0} cy={0} rx={100} ry={110} fill="#6fb6ff" opacity={glow * 0.14} />}
    </g>
  );
};

/* simple standing body, feet at (0,0), shoulders at about -330*s */
export const Body: React.FC<{
  top: string;
  bottom: string;
  pattern?: "dots" | "stars" | "stripes";
  s?: number;
  skin: string;
  arms?: "down" | "wave" | "hips" | "hold";
  slippers?: boolean;
  shoes?: string;
}> = ({ top, bottom, pattern, s = 1, skin, arms = "down", slippers, shoes = "#3b3b4f" }) => {
  const id = `p${top.slice(1)}${pattern}`;
  return (
    <g transform={`scale(${s})`}>
      <defs>
        {pattern === "dots" && (
          <pattern id={id} width={44} height={44} patternUnits="userSpaceOnUse">
            <rect width={44} height={44} fill={top} />
            <circle cx={11} cy={11} r={7} fill="#fff" opacity={0.85} />
            <circle cx={33} cy={33} r={7} fill="#fff" opacity={0.85} />
          </pattern>
        )}
        {pattern === "stars" && (
          <pattern id={id} width={60} height={60} patternUnits="userSpaceOnUse">
            <rect width={60} height={60} fill={top} />
            <path d="M15 5 l4 9 l10 1 l-7 7 l2 10 l-9 -5 l-9 5 l2 -10 l-7 -7 l10 -1z" fill="#ffe066" />
            <circle cx={46} cy={44} r={4} fill="#ffe066" />
          </pattern>
        )}
        {pattern === "stripes" && (
          <pattern id={id} width={40} height={40} patternUnits="userSpaceOnUse">
            <rect width={40} height={40} fill={top} />
            <rect width={40} height={14} fill="#fff" opacity={0.6} />
          </pattern>
        )}
      </defs>
      {/* legs */}
      <path d="M-60 -170 l-6 160 h52 l6 -150 l16 0 l6 150 h52 l-6 -160z" fill={pattern ? `url(#${id})` : bottom} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
      {/* feet */}
      {slippers ? (
        <g stroke={INK} strokeWidth={SW} fill="#ffb3c8">
          <ellipse cx={-50} cy={0} rx={50} ry={22} />
          <ellipse cx={50} cy={0} rx={50} ry={22} />
          <ellipse cx={-80} cy={-26} rx={10} ry={22} />
          <ellipse cx={-60} cy={-28} rx={10} ry={22} />
          <ellipse cx={20} cy={-26} rx={10} ry={22} />
          <ellipse cx={40} cy={-28} rx={10} ry={22} />
        </g>
      ) : (
        <g stroke={INK} strokeWidth={SW} fill={shoes}>
          <path d="M-90 4 q0 -30 30 -30 h40 v30z" />
          <path d="M90 4 q0 -30 -30 -30 h-40 v30z" />
        </g>
      )}
      {/* torso */}
      <path d="M-90 -330 q90 -30 180 0 l14 180 h-208z" fill={pattern ? `url(#${id})` : top} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
      {/* arms */}
      <g fill={pattern ? `url(#${id})` : top} stroke={INK} strokeWidth={SW} strokeLinejoin="round">
        {arms === "wave" ? (
          <path d="M80 -320 l60 -110 l34 18 l-60 120z" />
        ) : arms === "hips" ? (
          <path d="M84 -316 l50 80 l-40 60 l-20 -20 l26 -40 l-30 -50z" />
        ) : arms === "hold" ? (
          <path d="M84 -316 l20 120 l-70 30 l-10 -30 l46 -20 l-12 -90z" />
        ) : (
          <path d="M84 -316 l30 150 h-36 l-24 -130z" />
        )}
        <path d="M-84 -316 l-30 150 h36 l24 -130z" />
      </g>
      <g fill={skin} stroke={INK} strokeWidth={SW}>
        {arms === "wave" ? <circle cx={160} cy={-430} r={24} /> : arms === "hips" ? <circle cx={84} cy={-180} r={22} /> : arms === "hold" ? <circle cx={30} cy={-170} r={22} /> : <circle cx={96} cy={-160} r={22} />}
        <circle cx={-96} cy={-160} r={22} />
      </g>
    </g>
  );
};

export const Teddy: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <g transform={`scale(${s})`} fill="#c98a4b" stroke={INK} strokeWidth={6}>
    <circle cx={-34} cy={-118} r={18} />
    <circle cx={34} cy={-118} r={18} />
    <ellipse cx={0} cy={-30} rx={52} ry={50} />
    <circle cx={0} cy={-96} r={44} />
    <ellipse cx={0} cy={-84} rx={18} ry={13} fill="#f1d3a8" />
    <circle cx={-15} cy={-104} r={5} fill={INK} stroke="none" />
    <circle cx={15} cy={-104} r={5} fill={INK} stroke="none" />
    <circle cx={0} cy={-88} r={5} fill={INK} stroke="none" />
  </g>
);
