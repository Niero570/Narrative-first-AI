import { useState, useEffect } from "react";
import { MAP_CLUSTER_COLORS } from "../theme/celestial";

// Galaxy background — save the Aron Visuals Unsplash photo as:
//   client/public/galaxy-bg.jpg
// Then this path works in both dev and Vercel.
const BG_IMAGE = "/galaxy-bg.jpg";

// Cluster positions — Cross at the bright galactic core (center)
// Others spread naturally around it in the nebula
const CLUSTER_LAYOUT = {
  healingCovenant:        { cx: 22, cy: 30, spread: 5.5, nodeCount: 8 },
  theCross:               { cx: 52, cy: 50, spread: 4.0, nodeCount: 6 },
  wisdomAndWord:          { cx: 78, cy: 32, spread: 5.5, nodeCount: 7 },
  prophetsAndFulfillment: { cx: 36, cy: 74, spread: 5.5, nodeCount: 9 },
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
    const angle = (i / count) * Math.PI * 2 + rand() * 0.8;
    const dist = rand() * spread * 0.6 + spread * 0.4;
    pts.push({
      x: cx + dist * Math.cos(angle),
      y: cy + dist * Math.sin(angle),
      r: rand() * 0.7 + 0.5,
      brightness: rand(),
    });
  }
  return pts;
}

// Constellation lines between a cluster's nodes
function clusterEdges(pts, cx, cy) {
  const edges = [];
  // Ring connections
  for (let i = 0; i < pts.length; i++) {
    edges.push({ x1: pts[i].x, y1: pts[i].y, x2: pts[(i + 1) % pts.length].x, y2: pts[(i + 1) % pts.length].y });
  }
  // Spokes to center
  edges.push({ x1: pts[0].x, y1: pts[0].y, x2: cx, y2: cy });
  edges.push({ x1: pts[Math.floor(pts.length / 2)].x, y1: pts[Math.floor(pts.length / 2)].y, x2: cx, y2: cy });
  return edges;
}

const MAP_LABELS = {
  healingCovenant:        { title: "The Healing Covenant",       verse: "Isaiah 53:5",   count: 45 },
  theCross:               { title: "The Cross",                  verse: "John 19:30",    count: 25 },
  wisdomAndWord:          { title: "Wisdom & The Word",          verse: "Proverbs 3:5",  count: 22 },
  prophetsAndFulfillment: { title: "Prophets & Fulfillment",     verse: "Luke 24:44",    count: 24 },
};

// Shooting star data — each fires on a staggered loop
const SHOOTING_STARS = [
  { x1: -5, y1: 12,  x2: 30,  y2: 32,  delay: 0,    duration: 1.2 },
  { x1: 60, y1: -3,  x2: 90,  y2: 18,  delay: 3.5,  duration: 0.9 },
  { x1: -5, y1: 45,  x2: 22,  y2: 60,  delay: 7.0,  duration: 1.4 },
  { x1: 80, y1: 65,  x2: 105, y2: 80,  delay: 11.0, duration: 1.0 },
  { x1: 15, y1: -2,  x2: 45,  y2: 20,  delay: 15.0, duration: 1.1 },
];

export default function GalaxyHome({ onSelectMap }) {
  const [hovered, setHovered] = useState(null);
  const [entering, setEntering] = useState(null);
  const [bgLoaded, setBgLoaded] = useState(false);

  // Preload background
  useEffect(() => {
    const img = new Image();
    img.onload = () => setBgLoaded(true);
    img.onerror = () => setBgLoaded(true); // fall back to gradient
    img.src = BG_IMAGE;
  }, []);

  function handleClick(mapId) {
    setEntering(mapId);
    setTimeout(() => { onSelectMap(mapId); setEntering(null); }, 400);
  }

  const clusterData = Object.entries(CLUSTER_LAYOUT).map(([id, layout]) => ({
    id,
    ...layout,
    pts: generateCluster(layout.cx, layout.cy, layout.nodeCount, layout.spread),
    color: MAP_CLUSTER_COLORS[id],
    label: MAP_LABELS[id],
  }));

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100vh",
      overflow: "hidden",
      fontFamily: "'Cinzel', serif",
    }}>
      {/* ── BACKGROUND IMAGE ── */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: bgLoaded ? `url(${BG_IMAGE})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        backgroundColor: "#08031a",
        transition: "opacity 0.8s",
        opacity: bgLoaded ? 1 : 1,
      }} />

      {/* Dark vignette overlay — keep text readable */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 52% 50%, transparent 20%, #04020E99 75%, #020010EE 100%)",
        pointerEvents: "none",
      }} />
      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "30%",
        background: "linear-gradient(transparent, #020010DD)",
        pointerEvents: "none",
      }} />

      {/* ── SHOOTING STARS SVG ── */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        <defs>
          {SHOOTING_STARS.map((s, i) => (
            <linearGradient key={i} id={`star-grad-${i}`}
              x1={`${s.x1}%`} y1={`${s.y1}%`} x2={`${s.x2}%`} y2={`${s.y2}%`}
              gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="60%" stopColor="white" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0" />
            </linearGradient>
          ))}
          <style>{`
            ${SHOOTING_STARS.map((s, i) => `
              @keyframes shoot-${i} {
                0%   { stroke-dashoffset: 30; opacity: 0; }
                8%   { opacity: 1; }
                100% { stroke-dashoffset: -30; opacity: 0; }
              }
              .shoot-${i} {
                animation: shoot-${i} ${s.duration}s ${s.delay}s ease-in-out infinite;
                stroke-dasharray: 12 30;
              }
            `).join('')}
          `}</style>
        </defs>
        {SHOOTING_STARS.map((s, i) => (
          <line key={i} className={`shoot-${i}`}
            x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
            stroke={`url(#star-grad-${i})`}
            strokeWidth="0.4"
          />
        ))}
      </svg>

      {/* ── HEADER ── */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        textAlign: "center", paddingTop: 32, zIndex: 10, pointerEvents: "none",
      }}>
        <div style={{ fontSize: 9, letterSpacing: "0.45em", color: "#C4B5FD99",
          fontWeight: 400, marginBottom: 7, textTransform: "uppercase" }}>
          Celestial Concordance
        </div>
        <h1 style={{
          margin: 0, fontSize: "clamp(16px, 4vw, 28px)", fontWeight: 900,
          color: "#F5F0E0", letterSpacing: "0.15em", textTransform: "uppercase",
          textShadow: "0 0 60px #9333EA88, 0 0 20px #7C3AED44, 0 2px 8px #000",
        }}>
          Secrets of the Eternal Word
        </h1>
        <div style={{ marginTop: 8, fontSize: 10, color: "#6B21A8AA",
          letterSpacing: "0.2em", fontFamily: "'Inter', sans-serif" }}>
          select a constellation to enter
        </div>
      </div>

      {/* ── CONSTELLATION SVG ── */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          transition: entering ? "transform 0.4s ease-in, opacity 0.4s" : "none",
          transform: entering ? "scale(1.15)" : "scale(1)",
          opacity: entering ? 0 : 1,
        }}
      >
        <defs>
          {clusterData.map(c => (
            <filter key={c.id} id={`g-${c.id}`} x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation={hovered === c.id ? "1.6" : "0.9"} result="b" />
              <feComposite in="SourceGraphic" in2="b" operator="over" />
            </filter>
          ))}
          <filter id="cross-core" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feComposite in="SourceGraphic" in2="b" operator="over" />
          </filter>
          <style>{`
            @keyframes crossPulse {
              0%,100% { r:8; opacity:0.12; }
              50% { r:13; opacity:0; }
            }
            @keyframes crossPulse2 {
              0%,100% { r:5.5; opacity:0.22; }
              50% { r:9; opacity:0.04; }
            }
            @keyframes starBreath {
              0%,100% { opacity:1; }
              50% { opacity:0.4; }
            }
          `}</style>
        </defs>

        {/* Faint inter-cluster connection lines */}
        {[
          ["healingCovenant","theCross"],
          ["theCross","wisdomAndWord"],
          ["theCross","prophetsAndFulfillment"],
          ["healingCovenant","prophetsAndFulfillment"],
          ["wisdomAndWord","prophetsAndFulfillment"],
        ].map(([a, b], i) => {
          const pa = CLUSTER_LAYOUT[a], pb = CLUSTER_LAYOUT[b];
          return (
            <line key={i}
              x1={pa.cx} y1={pa.cy} x2={pb.cx} y2={pb.cy}
              stroke="rgba(196,181,253,0.06)" strokeWidth="0.18" strokeDasharray="0.6 1.4"
            />
          );
        })}

        {/* Cluster constellations */}
        {clusterData.map(c => {
          const isHov = hovered === c.id;
          const isCrossMap = c.id === "theCross";
          const edges = clusterEdges(c.pts, c.cx, c.cy);
          const labelAbove = c.cy > 55;

          return (
            <g key={c.id}
              onClick={() => handleClick(c.id)}
              onMouseEnter={() => setHovered(c.id)}
              onMouseLeave={() => setHovered(null)}
              onTouchStart={() => setHovered(c.id)}
              style={{ cursor: "pointer" }}
            >
              {/* Cluster soft glow area */}
              <circle cx={c.cx} cy={c.cy}
                r={isHov ? 11 : 8}
                fill={c.color.primary + (isHov ? "14" : "08")}
                style={{ transition: "r 0.3s, fill 0.3s" }}
              />

              {/* Constellation edges */}
              {edges.map((e, i) => (
                <line key={i}
                  x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
                  stroke={isHov ? c.color.primary + "CC" : c.color.primary + "44"}
                  strokeWidth={isHov ? "0.3" : "0.18"}
                  style={{ transition: "stroke 0.25s, stroke-width 0.25s" }}
                />
              ))}

              {/* Peripheral stars */}
              {c.pts.map((p, i) => (
                <circle key={i}
                  cx={p.x} cy={p.y}
                  r={isHov ? p.r * 1.5 : p.r * 0.9}
                  fill={isHov ? c.color.primary : c.color.primary + "99"}
                  filter={isHov ? `url(#g-${c.id})` : undefined}
                  style={{
                    transition: "r 0.25s, fill 0.25s",
                    animation: isHov ? `starBreath ${2 + p.brightness}s ${i * 0.3}s ease-in-out infinite` : "none",
                  }}
                />
              ))}

              {/* Center node */}
              {isCrossMap ? (
                <>
                  <circle cx={c.cx} cy={c.cy} r="7" fill="none" stroke="#FCD34D"
                    strokeWidth="0.35" style={{ animation: "crossPulse 3s ease-out infinite", transformOrigin: `${c.cx}px ${c.cy}px` }} />
                  <circle cx={c.cx} cy={c.cy} r="5" fill="none" stroke="#FCD34D88"
                    strokeWidth="0.25" style={{ animation: "crossPulse2 3s 0.7s ease-out infinite", transformOrigin: `${c.cx}px ${c.cy}px` }} />
                  <circle cx={c.cx} cy={c.cy} r={isHov ? 3.2 : 2.6}
                    fill="#D4A017" filter="url(#cross-core)"
                    style={{ transition: "r 0.25s" }} />
                  <text x={c.cx} y={c.cy + 0.8} textAnchor="middle" dominantBaseline="middle"
                    fontSize="2.2" fill="white" style={{ pointerEvents: "none" }}>✝</text>
                </>
              ) : (
                <circle cx={c.cx} cy={c.cy}
                  r={isHov ? 2.4 : 1.8}
                  fill={c.color.primary}
                  filter={`url(#g-${c.id})`}
                  style={{ transition: "r 0.25s" }}
                />
              )}

              {/* Hover label */}
              {isHov && (
                <g style={{ pointerEvents: "none" }}>
                  <rect
                    x={c.cx - 16} y={c.cy + (labelAbove ? -16 : 6)}
                    width={32} height={10} rx="1.5"
                    fill="#04020EEE" stroke={c.color.primary + "55"} strokeWidth="0.3"
                  />
                  <text x={c.cx} y={c.cy + (labelAbove ? -12.5 : 9.5)}
                    textAnchor="middle" fontSize="2.3"
                    fill={c.color.primary} fontFamily="'Cinzel', serif" fontWeight="700"
                  >{c.label.title}</text>
                  <text x={c.cx} y={c.cy + (labelAbove ? -9.5 : 12.5)}
                    textAnchor="middle" fontSize="1.6"
                    fill="#94A3B8" fontFamily="'Inter', sans-serif"
                  >{c.label.verse} · {c.label.count} scriptures</text>
                </g>
              )}

              {/* Resting label — always visible, small */}
              {!isHov && (
                <text
                  x={c.cx}
                  y={c.cy + (c.cy < 50 ? -5 : 5.5)}
                  textAnchor="middle"
                  fontSize="1.8"
                  fill={isCrossMap ? "#FCD34DAA" : c.color.primary + "BB"}
                  fontFamily="'Cinzel', serif"
                  fontWeight="600"
                  style={{ pointerEvents: "none" }}
                >{c.label.title}</text>
              )}
            </g>
          );
        })}
      </svg>

      {/* ── BOTTOM SCRIPTURE ── */}
      <div style={{
        position: "absolute", bottom: 18, left: 0, right: 0,
        textAlign: "center", zIndex: 10, pointerEvents: "none",
        fontFamily: "'Lora', serif",
      }}>
        <div style={{ fontSize: 10, color: "#6B21A8AA", letterSpacing: "0.15em",
          fontFamily: "'Inter', sans-serif", marginBottom: 4 }}>
          ALL PATHS LEAD TO THE CROSS
        </div>
        <div style={{ fontSize: 11, fontStyle: "italic", color: "#4C1D9588" }}>
          "In whom are hidden all the treasures of wisdom and knowledge." — Col 2:3
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Lora:ital@0;1&family=Inter:wght@400;600;700;800&display=swap');
      `}</style>
    </div>
  );
}
