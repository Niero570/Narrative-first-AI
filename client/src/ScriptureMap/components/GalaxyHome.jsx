import { useState } from "react";
import StarField from "./StarField";
import { MAP_CLUSTER_COLORS } from "../theme/celestial";

// Cluster positions on the galaxy home canvas (% units in viewBox 0 0 100 100)
const CLUSTER_LAYOUT = {
  healingCovenant:        { cx: 28, cy: 38, nodePositions: generateCluster(28, 38, 10, 7) },
  theCross:               { cx: 68, cy: 36, nodePositions: generateCluster(68, 36, 8, 7) },
  wisdomAndWord:          { cx: 30, cy: 68, nodePositions: generateCluster(30, 68, 9, 7) },
  prophetsAndFulfillment: { cx: 70, cy: 70, nodePositions: generateCluster(70, 70, 11, 7) },
};

// Deterministic mini-nodes for each cluster preview
function generateCluster(cx, cy, count, spread) {
  const pts = [];
  let seed = cx * 17 + cy * 31;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < count; i++) {
    const angle = rand() * Math.PI * 2;
    const dist = rand() * spread + 1.5;
    pts.push({
      x: cx + dist * Math.cos(angle),
      y: cy + dist * Math.sin(angle),
      r: rand() * 0.8 + 0.4,
    });
  }
  return pts;
}

// Lines between cluster nodes for the constellation preview
function clusterLines(positions, cx, cy) {
  const lines = [];
  for (let i = 0; i < positions.length; i++) {
    const next = positions[(i + 1) % positions.length];
    lines.push({ x1: positions[i].x, y1: positions[i].y, x2: next.x, y2: next.y });
  }
  // Connect a few to center
  lines.push({ x1: positions[0].x, y1: positions[0].y, x2: cx, y2: cy });
  if (positions[3]) {
    lines.push({ x1: positions[3].x, y1: positions[3].y, x2: cx, y2: cy });
  }
  return lines;
}

const MAP_LABELS = {
  healingCovenant:        { short: "The Healing Covenant", verse: "Isaiah 53:5", count: 45 },
  theCross:               { short: "The Cross", verse: "John 3:16", count: 25 },
  wisdomAndWord:          { short: "Wisdom & The Word", verse: "Proverbs 3:5", count: 22 },
  prophetsAndFulfillment: { short: "Prophets & Fulfillment", verse: "Luke 24:44", count: 24 },
};

export default function GalaxyHome({ onSelectMap }) {
  const [hovered, setHovered] = useState(null);
  const [entering, setEntering] = useState(null);

  function handleClick(mapId) {
    setEntering(mapId);
    setTimeout(() => {
      onSelectMap(mapId);
      setEntering(null);
    }, 420);
  }

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100vh",
      overflow: "hidden",
      fontFamily: "'Cinzel', serif",
    }}>
      <StarField />

      {/* Title */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        textAlign: "center",
        paddingTop: 28,
        zIndex: 10,
        pointerEvents: "none",
      }}>
        <div style={{ fontSize: 11, letterSpacing: "0.35em", color: "#FCD34D88", fontWeight: 400, marginBottom: 6, textTransform: "uppercase" }}>
          Celestial Concordance
        </div>
        <h1 style={{
          margin: 0,
          fontSize: "clamp(18px, 3vw, 32px)",
          fontWeight: 700,
          color: "#F5F0E0",
          letterSpacing: "0.12em",
          textShadow: "0 0 40px #FCD34D55, 0 2px 8px #000",
          textTransform: "uppercase",
        }}>
          Secrets of the Eternal Word
        </h1>
        <div style={{ marginTop: 8, fontSize: 11, color: "#64748B", letterSpacing: "0.2em", fontFamily: "'Inter', sans-serif" }}>
          Select a constellation to enter
        </div>
      </div>

      {/* Galaxy SVG */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          cursor: "default",
          transition: entering ? "transform 0.42s ease-in, opacity 0.42s ease-in" : "none",
          transform: entering ? "scale(1.18)" : "scale(1)",
          opacity: entering ? 0 : 1,
        }}
      >
        <defs>
          {Object.entries(MAP_CLUSTER_COLORS).map(([id, c]) => (
            <filter key={id} id={`glow-${id}`} x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation={hovered === id ? "1.4" : "0.8"} result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          ))}
          <filter id="cross-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Central galactic core — subtle gold glow at center */}
        <circle cx="50" cy="52" r="3" fill="#D4A01722" filter="url(#cross-glow)" />
        <circle cx="50" cy="52" r="0.8" fill="#FCD34D55" />

        {/* Faint connecting arcs between clusters */}
        {[
          ["healingCovenant", "theCross"],
          ["healingCovenant", "wisdomAndWord"],
          ["theCross", "prophetsAndFulfillment"],
          ["wisdomAndWord", "prophetsAndFulfillment"],
          ["healingCovenant", "prophetsAndFulfillment"],
          ["theCross", "wisdomAndWord"],
        ].map(([a, b], i) => {
          const pa = CLUSTER_LAYOUT[a];
          const pb = CLUSTER_LAYOUT[b];
          return (
            <line
              key={i}
              x1={pa.cx} y1={pa.cy} x2={pb.cx} y2={pb.cy}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="0.2"
              strokeDasharray="0.5 1.2"
            />
          );
        })}

        {/* Cluster constellations */}
        {Object.entries(CLUSTER_LAYOUT).map(([mapId, layout]) => {
          const color = MAP_CLUSTER_COLORS[mapId];
          const label = MAP_LABELS[mapId];
          const isHovered = hovered === mapId;
          const lines = clusterLines(layout.nodePositions, layout.cx, layout.cy);

          return (
            <g
              key={mapId}
              onClick={() => handleClick(mapId)}
              onMouseEnter={() => setHovered(mapId)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Constellation lines */}
              {lines.map((l, i) => (
                <line
                  key={i}
                  x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                  stroke={isHovered ? color.primary + "88" : color.primary + "22"}
                  strokeWidth={isHovered ? "0.35" : "0.18"}
                  style={{ transition: "stroke 0.25s, stroke-width 0.25s" }}
                />
              ))}

              {/* Cluster outer glow halo */}
              <circle
                cx={layout.cx}
                cy={layout.cy}
                r={isHovered ? 12 : 9}
                fill={color.primary + (isHovered ? "08" : "04")}
                style={{ transition: "r 0.3s, fill 0.3s" }}
              />

              {/* Peripheral stars */}
              {layout.nodePositions.map((p, i) => (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? p.r * 1.4 : p.r}
                  fill={isHovered ? color.primary : color.primary + "88"}
                  filter={isHovered ? `url(#glow-${mapId})` : undefined}
                  style={{ transition: "r 0.25s, fill 0.25s" }}
                />
              ))}

              {/* Center cross node */}
              <circle
                cx={layout.cx}
                cy={layout.cy}
                r={isHovered ? 2.2 : 1.6}
                fill={mapId === "theCross" ? "#D4A017" : color.primary}
                filter={`url(#glow-${mapId})`}
                style={{ transition: "r 0.25s" }}
              />
              {mapId === "theCross" && (
                <text
                  x={layout.cx}
                  y={layout.cy + 0.7}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="1.6"
                  fill="white"
                  style={{ pointerEvents: "none" }}
                >✝</text>
              )}

              {/* Hover label */}
              {isHovered && (
                <g>
                  {/* Label background */}
                  <rect
                    x={layout.cx - 14}
                    y={layout.cy + (layout.cy > 55 ? -14 : 5)}
                    width={28}
                    height={9}
                    rx="1"
                    fill="#040608DD"
                    stroke={color.primary + "44"}
                    strokeWidth="0.3"
                  />
                  <text
                    x={layout.cx}
                    y={layout.cy + (layout.cy > 55 ? -11 : 8)}
                    textAnchor="middle"
                    fontSize="2.2"
                    fill={color.primary}
                    fontFamily="'Cinzel', serif"
                    fontWeight="700"
                  >{label.short}</text>
                  <text
                    x={layout.cx}
                    y={layout.cy + (layout.cy > 55 ? -8 : 11)}
                    textAnchor="middle"
                    fontSize="1.5"
                    fill="#94A3B8"
                    fontFamily="'Inter', sans-serif"
                  >{label.verse} · {label.count} scriptures</text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {/* Bottom hint */}
      <div style={{
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        textAlign: "center",
        zIndex: 10,
        pointerEvents: "none",
        fontFamily: "'Inter', sans-serif",
      }}>
        <div style={{ fontSize: 10, color: "#1E293B", letterSpacing: "0.2em" }}>
          ALL PATHS LEAD TO THE CROSS · JOHN 19:30
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Lora:ital@0;1&family=Inter:wght@400;600;700&display=swap');
      `}</style>
    </div>
  );
}
