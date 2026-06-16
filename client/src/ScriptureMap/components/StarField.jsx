// StarField — no hooks needed; star data is statically computed above
import { VOID, NEBULA_LAYERS } from "../theme/celestial";

// Deterministic star generator — same seed = same stars every render
function makeStars(count) {
  const stars = [];
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < count; i++) {
    stars.push({
      x: rand() * 100,
      y: rand() * 100,
      r: rand() * 0.6 + 0.1,
      opacity: rand() * 0.7 + 0.1,
      twinkleDelay: rand() * 8,
      twinkleDuration: rand() * 4 + 3,
    });
  }
  return stars;
}

const STARS = makeStars(220);

// Sacred geometry — barely-visible background grid at 3% opacity
// 6-pointed star / hexagonal mandala pattern
function GeometryGrid() {
  const cx = 50, cy = 50, R = 45;
  const angles = [0, 60, 120, 180, 240, 300];
  const hex = angles.map(a => {
    const rad = (a * Math.PI) / 180;
    return [cx + R * Math.cos(rad), cy + R * Math.sin(rad)];
  });
  const hexStr = hex.map(([x, y]) => `${x},${y}`).join(" ");

  // Inner circles
  const circles = [R * 0.33, R * 0.66, R].map(r => ({ r, cx, cy }));

  // Spokes from center to each hex vertex
  const spokes = hex.map(([x, y]) => ({ x1: cx, y1: cy, x2: x, y2: y }));

  // Star of David lines
  const star = [
    [hex[0], hex[2], hex[4]], // triangle 1
    [hex[1], hex[3], hex[5]], // triangle 2
  ].map(pts => pts.map(([x, y]) => `${x},${y}`).join(" "));

  return (
    <g opacity="0.028" fill="none" stroke="#8888FF" strokeWidth="0.3">
      {circles.map((c, i) => <circle key={i} cx={c.cx} cy={c.cy} r={c.r} />)}
      {spokes.map((s, i) => <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} />)}
      {star.map((pts, i) => <polygon key={i} points={pts} />)}
      <polygon points={hexStr} />
    </g>
  );
}

export default function StarField({ style = {} }) {
  const nebulaStyle = {
    position: "absolute",
    inset: 0,
    background: `
      radial-gradient(ellipse 50% 40% at ${NEBULA_LAYERS[0].x} ${NEBULA_LAYERS[0].y}, ${NEBULA_LAYERS[0].color} 0%, transparent 70%),
      radial-gradient(ellipse 60% 55% at ${NEBULA_LAYERS[1].x} ${NEBULA_LAYERS[1].y}, ${NEBULA_LAYERS[1].color} 0%, transparent 70%),
      radial-gradient(ellipse 38% 32% at ${NEBULA_LAYERS[2].x} ${NEBULA_LAYERS[2].y}, ${NEBULA_LAYERS[2].color} 0%, transparent 70%),
      radial-gradient(ellipse 32% 28% at ${NEBULA_LAYERS[3].x} ${NEBULA_LAYERS[3].y}, ${NEBULA_LAYERS[3].color} 0%, transparent 70%)
    `,
    pointerEvents: "none",
  };

  return (
    <div style={{ position: "absolute", inset: 0, background: VOID, overflow: "hidden", ...style }}>
      {/* Nebula gradient layers */}
      <div style={nebulaStyle} />

      {/* SVG star field + geometry */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      >
        <defs>
          <style>{`
            @keyframes twinkle {
              0%, 100% { opacity: var(--base-op); }
              50% { opacity: calc(var(--base-op) * 0.3); }
            }
          `}</style>
        </defs>

        {/* Sacred geometry grid */}
        <GeometryGrid />

        {/* Stars */}
        {STARS.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="white"
            style={{
              "--base-op": s.opacity,
              opacity: s.opacity,
              animation: `twinkle ${s.twinkleDuration}s ${s.twinkleDelay}s ease-in-out infinite`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
