import { useState, useEffect, useRef } from "react";
import StarField from "./StarField";
import {
  CATEGORIES, CROSS_FILL, CROSS_GLOW, CROSS_RING,
  RED_LETTER_FILL, RED_LETTER_GLOW,
  OPACITY, NODE_R, ANIM, DOVE,
} from "../theme/celestial";

// Ease in/out — slow leaving a node, fast mid-flight, slow on approach
function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

// ── DOVE LAYER ────────────────────────────────────────────────────────────────
// Owns a single requestAnimationFrame loop. Drives the dove's eased position,
// heading rotation, and a live particle trail. Renders only the dove + a handful
// of particles, so the 60fps re-render never touches the full node graph.
function DoveLayer({ active, target }) {
  const [, tick] = useState(0);
  const stateRef = useRef({
    cur: null,        // {x, y} current dove position
    angle: 0,         // heading in degrees
    anim: null,       // {from, to, start, dur, angle, dist} active flight segment
    particles: [],    // {id, x, y, born, life, r}
    lastSpawn: 0,
    primed: false,    // has the dove been snapped to its first node yet
  });
  const rafRef = useRef(null);
  const idRef = useRef(0);

  // When the journey advances, set up a new flight segment from cur -> target.
  // The very first target after activation snaps (no fly-in from nowhere).
  useEffect(() => {
    if (!target) return;
    const s = stateRef.current;
    if (!s.primed || !s.cur) {
      s.cur = { x: target.x, y: target.y };
      s.anim = null;
      s.primed = true;
      return;
    }
    const from = { ...s.cur };
    const to = { x: target.x, y: target.y };
    const dx = to.x - from.x, dy = to.y - from.y;
    const dist = Math.hypot(dx, dy);
    const angle = dist > 0.01 ? (Math.atan2(dy, dx) * 180) / Math.PI : s.angle;
    s.anim = { from, to, start: performance.now(), dur: DOVE.travelMs, angle, dist };
    s.angle = angle;
  }, [target]);

  // The animation loop runs only while the journey is active.
  useEffect(() => {
    if (!active) {
      const s = stateRef.current;
      s.primed = false;
      s.anim = null;
      s.particles = [];
      s.cur = null;
      return;
    }
    const loop = (now) => {
      const s = stateRef.current;
      if (s.anim) {
        const t = Math.min(1, (now - s.anim.start) / s.anim.dur);
        const e = easeInOut(t);
        s.cur = {
          x: s.anim.from.x + (s.anim.to.x - s.anim.from.x) * e,
          y: s.anim.from.y + (s.anim.to.y - s.anim.from.y) * e,
        };
        s.angle = s.anim.angle;
        // Spawn trail particles at the live position while in flight
        if (t < 1 && s.anim.dist > 1 && now - s.lastSpawn > 26) {
          s.particles.push({
            id: idRef.current++,
            x: s.cur.x + (Math.random() - 0.5) * 0.7,
            y: s.cur.y + (Math.random() - 0.5) * 0.7,
            born: now,
            life: 750 + Math.random() * 450,
            r: 0.28 + Math.random() * 0.42,
          });
          s.lastSpawn = now;
        }
        if (t >= 1) s.anim = null;
      }
      // Decay + cull particles
      if (s.particles.length) {
        s.particles = s.particles.filter((p) => now - p.born < p.life);
      }
      tick((n) => (n + 1) % 1000000);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  const s = stateRef.current;
  if (!active || !s.cur) return null;

  const now = performance.now();
  const sz = DOVE.size;
  // Top-down dove silhouette, nose pointing +x so rotation aligns with heading
  const body = `M ${1.0 * sz} 0 Q ${0.2 * sz} ${0.3 * sz} ${-1.1 * sz} ${0.12 * sz} Q ${-1.18 * sz} 0 ${-1.1 * sz} ${-0.12 * sz} Q ${0.2 * sz} ${-0.3 * sz} ${1.0 * sz} 0 Z`;
  const wingUpper = `M ${0.15 * sz} ${-0.08 * sz} Q ${-0.05 * sz} ${-0.95 * sz} ${-0.6 * sz} ${-1.15 * sz} Q ${-0.12 * sz} ${-0.5 * sz} ${-0.05 * sz} ${-0.06 * sz} Z`;
  const wingLower = `M ${0.15 * sz} ${0.08 * sz} Q ${-0.05 * sz} ${0.95 * sz} ${-0.6 * sz} ${1.15 * sz} Q ${-0.12 * sz} ${0.5 * sz} ${-0.05 * sz} ${0.06 * sz} Z`;

  return (
    <g style={{ pointerEvents: "none" }}>
      {/* Starry particle trail */}
      {s.particles.map((p) => {
        const age = (now - p.born) / p.life; // 0..1
        const op = Math.max(0, 1 - age) * 0.85;
        const r = p.r * (1 - age * 0.55);
        return (
          <circle key={p.id} cx={p.x} cy={p.y} r={r} fill={DOVE.trailColor} opacity={op} />
        );
      })}

      {/* The dove */}
      <g style={{ transform: `translate(${s.cur.x}px, ${s.cur.y}px) rotate(${s.angle}deg)` }}>
        {/* Aura */}
        <circle r={sz * 1.5} fill={DOVE.glow} opacity={0.16} filter="url(#dove-glow)" />
        {/* Wings — gentle flap */}
        <g className="dove-wings" style={{ transformOrigin: "0px 0px", animation: "doveFlap 0.5s ease-in-out infinite" }}>
          <path d={wingUpper} fill={DOVE.fill} opacity={0.9} stroke={DOVE.wingStroke} strokeWidth={0.08} />
          <path d={wingLower} fill={DOVE.fill} opacity={0.9} stroke={DOVE.wingStroke} strokeWidth={0.08} />
        </g>
        {/* Body */}
        <path d={body} fill={DOVE.fill} filter="url(#dove-glow)" />
        {/* Head highlight */}
        <circle cx={sz * 0.85} cy={0} r={sz * 0.22} fill="#FFFFFF" />
      </g>
    </g>
  );
}

// Builds a deduplicated edge list from node connections
function buildEdges(nodes) {
  const seen = new Set();
  const edges = [];
  const nodeMap = {};
  nodes.forEach(n => { nodeMap[n.id] = n; });

  nodes.forEach(node => {
    (node.connections || []).forEach(targetId => {
      const key = [node.id, targetId].sort().join("--");
      if (!seen.has(key) && nodeMap[targetId]) {
        seen.add(key);
        edges.push({
          from: node.id,
          to: targetId,
          isFulfillment: node.fulfilledBy === targetId || node.fulfillmentOf === targetId,
        });
      }
    });
  });
  return edges;
}

// BFS shortest path from startId to targetId
function shortestPath(nodes, startId, targetId) {
  if (startId === targetId) return [startId];
  const nodeMap = {};
  nodes.forEach(n => { nodeMap[n.id] = n; });

  const queue = [[startId]];
  const visited = new Set([startId]);

  while (queue.length) {
    const path = queue.shift();
    const current = path[path.length - 1];
    const node = nodeMap[current];
    if (!node) continue;

    for (const neighbor of (node.connections || [])) {
      if (!visited.has(neighbor)) {
        const newPath = [...path, neighbor];
        if (neighbor === targetId) return newPath;
        visited.add(neighbor);
        queue.push(newPath);
      }
    }
  }
  return null;
}

function pathToEdgeSet(path) {
  const set = new Set();
  for (let i = 0; i < path.length - 1; i++) {
    set.add([path[i], path[i + 1]].sort().join("--"));
  }
  return set;
}

export default function MapCanvas({
  nodes, onSelectNode, selectedNode, pathToCross,
  journeyActive = false, journey = null, journeyStep = 0,
}) {
  const [visible, setVisible] = useState(new Set());
  const [crossPath, setCrossPath] = useState(null); // Set of edge keys on the lit cross-path
  const timerRef = useRef([]);

  // Stagger node entrance animation
  useEffect(() => {
    setVisible(new Set());
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];
    nodes.forEach((node, i) => {
      const t = setTimeout(() => {
        setVisible(prev => new Set([...prev, node.id]));
      }, i * ANIM.nodeStagger);
      timerRef.current.push(t);
    });
    return () => timerRef.current.forEach(clearTimeout);
  }, [nodes]);

  // Path to Cross highlight
  useEffect(() => {
    if (!pathToCross || !selectedNode) { setCrossPath(null); return; }
    const crossNode = nodes.find(n => n.isCross);
    if (!crossNode) { setCrossPath(null); return; }
    const path = shortestPath(nodes, selectedNode.id, crossNode.id);
    if (path) setCrossPath(pathToEdgeSet(path));
    else setCrossPath(null);
  }, [pathToCross, selectedNode, nodes]);

  const edges = buildEdges(nodes);
  const selectedIds = selectedNode
    ? new Set([selectedNode.id, ...(selectedNode.connections || [])])
    : new Set();
  // During a journey the dove + gold wake carry the focus, so node-selection
  // dimming is suspended in favor of the journey-specific opacity scheme.
  const hasSelection = !journeyActive && selectedIds.size > 0;

  // Journey bookkeeping
  const journeyIds = journeyActive && journey ? new Set(journey.map(j => j.nodeId)) : null;
  const journeyCurrentId = journeyActive && journey ? journey[journeyStep]?.nodeId : null;

  function nodeOpacity(node) {
    if (!visible.has(node.id)) return 0;
    if (journeyActive && journeyIds) {
      if (node.id === journeyCurrentId) return OPACITY.full;
      if (journeyIds.has(node.id)) return 0.7;
      return 0.28;
    }
    if (!hasSelection) return OPACITY.full;
    return selectedIds.has(node.id) ? OPACITY.full : OPACITY.dim;
  }

  function edgeOpacity(edge) {
    const key = [edge.from, edge.to].sort().join("--");
    if (journeyActive) return 0.05; // graph recedes; the gold wake leads the eye
    if (crossPath && crossPath.has(key)) return 1;
    if (!hasSelection) return OPACITY.lineDefault;
    if (selectedIds.has(edge.from) && selectedIds.has(edge.to)) return OPACITY.lineActive;
    return OPACITY.lineDim;
  }

  function edgeStroke(edge) {
    const key = [edge.from, edge.to].sort().join("--");
    if (crossPath && crossPath.has(key)) return "#FCD34D";
    if (edge.isFulfillment) return "#FCD34D88";
    if (!hasSelection) return "rgba(255,255,255,0.22)";
    if (selectedIds.has(edge.from) && selectedIds.has(edge.to)) {
      const n = nodes.find(nd => nd.id === edge.from);
      if (!n) return "rgba(255,255,255,0.6)";
      const cat = CATEGORIES[n.category];
      return cat ? cat.glow : "rgba(255,255,255,0.6)";
    }
    return "rgba(255,255,255,0.04)";
  }

  function edgeWidth(edge) {
    const key = [edge.from, edge.to].sort().join("--");
    if (crossPath && crossPath.has(key)) return "0.55";
    if (!hasSelection) return "0.22";
    if (selectedIds.has(edge.from) && selectedIds.has(edge.to)) return "0.4";
    return "0.15";
  }

  const nodeMap = {};
  nodes.forEach(n => { nodeMap[n.id] = n; });

  // Journey geometry — the gold wake traces every node visited so far,
  // and the dove flies to the current journey node.
  const wakePoints = journeyActive && journey
    ? journey.slice(0, journeyStep + 1)
        .map(j => nodeMap[j.nodeId]?.position)
        .filter(Boolean)
    : [];
  const wakeStr = wakePoints.map(p => `${p.x},${p.y}`).join(" ");
  const doveTarget = journeyActive && journey
    ? nodeMap[journeyCurrentId]?.position || null
    : null;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <StarField />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        onClick={() => onSelectNode(null)}
      >
        <defs>
          {/* Glow filter for lit connections */}
          <filter id="line-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          {/* Node glow */}
          <filter id="node-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          {/* Cross glow — wider */}
          <filter id="cross-glow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          {/* Red Letter glow */}
          <filter id="red-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="1.4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          {/* Path-to-cross gold glow */}
          <filter id="gold-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          {/* Dove glow — soft indigo aura */}
          <filter id="dove-glow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="0.7" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <style>{`
            @keyframes crossPulse {
              0%, 100% { r: 6.5; opacity: 0.15; }
              50% { r: 9; opacity: 0; }
            }
            @keyframes crossPulse2 {
              0%, 100% { r: 5.2; opacity: 0.22; }
              50% { r: 7.5; opacity: 0.04; }
            }
            @keyframes redBreath {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.65; }
            }
            @keyframes nodeIn {
              from { opacity: 0; transform: scale(0.4); }
              to { opacity: 1; transform: scale(1); }
            }
            @keyframes doveFlap {
              0%, 100% { transform: scaleY(1); }
              50% { transform: scaleY(0.55); }
            }
            @keyframes journeyFlow {
              to { stroke-dashoffset: -8; }
            }
          `}</style>
        </defs>

        {/* Journey wake — the gold thread of the Spirit's path so far */}
        {journeyActive && wakePoints.length >= 2 && (
          <polyline
            points={wakeStr}
            fill="none"
            stroke={CROSS_RING}
            strokeWidth="0.45"
            strokeOpacity="0.85"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeDasharray="3 1.4"
            filter="url(#gold-glow)"
            style={{ animation: "journeyFlow 1.2s linear infinite" }}
          />
        )}

        {/* Connection edges */}
        {edges.map(edge => {
          const from = nodeMap[edge.from];
          const to = nodeMap[edge.to];
          if (!from?.position || !to?.position) return null;
          const key = [edge.from, edge.to].sort().join("--");
          const isGoldPath = crossPath && crossPath.has(key);

          return (
            <line
              key={key}
              x1={from.position.x}
              y1={from.position.y}
              x2={to.position.x}
              y2={to.position.y}
              stroke={edgeStroke(edge)}
              strokeWidth={edgeWidth(edge)}
              strokeOpacity={edgeOpacity(edge)}
              strokeDasharray={edge.isFulfillment && !isGoldPath ? "0.8 0.6" : undefined}
              filter={isGoldPath ? "url(#gold-glow)" : undefined}
              style={{ transition: "stroke 0.3s, stroke-opacity 0.3s, stroke-width 0.3s" }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map(node => {
          if (!node.position) return null;
          const { x, y } = node.position;
          const isCross = !!node.isCross;
          const isRedLetter = !!node.redLetter;
          const isSelected = selectedNode?.id === node.id;
          const isConnected = hasSelection && selectedIds.has(node.id) && !isSelected;
          const cat = CATEGORIES[node.category] || {};

          const fill = isCross ? CROSS_FILL : isRedLetter ? RED_LETTER_FILL : cat.fill;
          const glow = isCross ? CROSS_GLOW : isRedLetter ? RED_LETTER_GLOW : cat.glow;
          const r = isCross ? NODE_R.cross : (node.connections?.length >= 4 ? NODE_R.large : NODE_R.normal);
          const opacity = nodeOpacity(node);

          return (
            <g
              key={node.id}
              onClick={e => { e.stopPropagation(); onSelectNode(node); }}
              style={{ cursor: "pointer" }}
            >
              {/* Cross pulse rings */}
              {isCross && (
                <>
                  <circle cx={x} cy={y} r="8" fill="none" stroke={CROSS_RING} strokeWidth="0.4"
                    style={{ animation: `crossPulse ${ANIM.crossPulse} ease-out infinite`, transformOrigin: `${x}px ${y}px` }} />
                  <circle cx={x} cy={y} r="6.5" fill="none" stroke={CROSS_RING} strokeWidth="0.3"
                    style={{ animation: `crossPulse2 ${ANIM.crossPulse} 0.8s ease-out infinite`, transformOrigin: `${x}px ${y}px` }} />
                </>
              )}

              {/* Selected halo */}
              {isSelected && (
                <circle cx={x} cy={y} r={r + 2.2} fill="none" stroke={glow}
                  strokeWidth="0.5" opacity="0.6" />
              )}

              {/* Connected node halo */}
              {isConnected && (
                <circle cx={x} cy={y} r={r + 1.2} fill="none" stroke={glow}
                  strokeWidth="0.3" opacity="0.35" />
              )}

              {/* Node glow backing */}
              <circle
                cx={x} cy={y}
                r={r * 1.6}
                fill={glow + "18"}
                filter={isCross ? "url(#cross-glow)" : isRedLetter ? "url(#red-glow)" : "url(#node-glow)"}
                opacity={opacity}
                style={{ transition: "opacity 0.4s" }}
              />

              {/* Node body */}
              <circle
                cx={x} cy={y}
                r={r}
                fill={fill}
                stroke={isSelected ? glow : glow + "66"}
                strokeWidth={isSelected ? "0.55" : "0.28"}
                opacity={opacity}
                style={{
                  transition: "opacity 0.4s, r 0.2s",
                  animation: isRedLetter
                    ? `redBreath ${ANIM.redLetterBreath} ease-in-out infinite`
                    : undefined,
                  transformOrigin: `${x}px ${y}px`,
                }}
              />

              {/* Icon */}
              {isCross ? (
                <text x={x} y={y + 0.9} textAnchor="middle" dominantBaseline="middle"
                  fontSize="3.2" fill="white" opacity={opacity} style={{ pointerEvents: "none" }}>✝</text>
              ) : (
                <text x={x} y={y + 0.7} textAnchor="middle" dominantBaseline="middle"
                  fontSize="2.2" fill="white" opacity={opacity * 0.9} style={{ pointerEvents: "none" }}>
                  {cat.icon || "·"}
                </text>
              )}

              {/* Verse reference label */}
              {opacity > 0.15 && (
                <text
                  x={x < 50 ? x - r - 1 : x + r + 1}
                  y={y}
                  textAnchor={x < 50 ? "end" : "start"}
                  dominantBaseline="middle"
                  fontSize="1.8"
                  fill={isSelected || isConnected ? glow : glow + "66"}
                  fontFamily="'Cinzel', serif"
                  fontWeight="600"
                  opacity={opacity}
                  style={{ transition: "opacity 0.4s, fill 0.3s", pointerEvents: "none" }}
                >
                  {node.ref}
                </text>
              )}
            </g>
          );
        })}

        {/* The dove — rendered last so it flies above the whole map */}
        <DoveLayer active={journeyActive} target={doveTarget} />
      </svg>
    </div>
  );
}
