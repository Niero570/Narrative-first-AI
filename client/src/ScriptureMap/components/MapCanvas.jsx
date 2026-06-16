import { useState, useEffect, useRef } from "react";
import StarField from "./StarField";
import {
  CATEGORIES, CROSS_FILL, CROSS_GLOW, CROSS_RING,
  RED_LETTER_FILL, RED_LETTER_GLOW,
  OPACITY, NODE_R, ANIM,
} from "../theme/celestial";

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

export default function MapCanvas({ nodes, onSelectNode, selectedNode, pathToCross }) {
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
  const hasSelection = selectedIds.size > 0;

  function nodeOpacity(node) {
    if (!visible.has(node.id)) return 0;
    if (!hasSelection) return OPACITY.full;
    return selectedIds.has(node.id) ? OPACITY.full : OPACITY.dim;
  }

  function edgeOpacity(edge) {
    const key = [edge.from, edge.to].sort().join("--");
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
          `}</style>
        </defs>

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
      </svg>
    </div>
  );
}
