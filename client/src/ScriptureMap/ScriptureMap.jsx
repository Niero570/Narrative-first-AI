import { useState, useRef, useEffect } from "react";
import GalaxyHome from "./components/GalaxyHome";
import MapCanvas from "./components/MapCanvas";
import NodeDetail from "./components/NodeDetail";
import { DOVE } from "./theme/celestial";

// Map data
import { NODES as healingNodes, MAP_META as healingMeta } from "./maps/healingCovenant";
import { NODES as crossNodes, MAP_META as crossMeta } from "./maps/theCross";
import { NODES as wisdomNodes, MAP_META as wisdomMeta } from "./maps/wisdomAndWord";
import { NODES as prophetsNodes, MAP_META as prophetsMeta } from "./maps/prophetsAndFulfillment";

import { MAP_CLUSTER_COLORS, CATEGORIES } from "./theme/celestial";

const MAPS = {
  healingCovenant:        { nodes: healingNodes,  meta: healingMeta },
  theCross:               { nodes: crossNodes,    meta: crossMeta },
  wisdomAndWord:          { nodes: wisdomNodes,   meta: wisdomMeta },
  prophetsAndFulfillment: { nodes: prophetsNodes, meta: prophetsMeta },
};



export default function ScriptureMap({ apiBaseUrl = "" }) {
  const [currentMap, setCurrentMap] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [pathToCrossActive, setPathToCrossActive] = useState(false);
  const [activeCategories, setActiveCategories] = useState(new Set());
  const [ttsLoading, setTtsLoading] = useState(false);
  const [ttsError, setTtsError] = useState(null);
  // Dove Journey Mode
  const [journeyActive, setJourneyActive] = useState(false);
  const [journeyStep, setJourneyStep] = useState(0);
  const [journeyPaused, setJourneyPaused] = useState(false);
  const audioRef = useRef(null);

  const journey = currentMap ? MAPS[currentMap].meta.journey : null;

  function resetJourney() {
    setJourneyActive(false);
    setJourneyPaused(false);
    setJourneyStep(0);
  }

  function enterMap(mapId) {
    const map = MAPS[mapId];
    setCurrentMap(mapId);
    setSelectedNode(null);
    setPathToCrossActive(false);
    resetJourney();
    // Initialize all categories as active
    const cats = new Set(map.nodes.map(n => n.category));
    setActiveCategories(cats);
  }

  function exitMap() {
    setCurrentMap(null);
    setSelectedNode(null);
    setPathToCrossActive(false);
    resetJourney();
  }

  function handleSelectNode(node) {
    // Tapping the map breaks the auto-tour and hands control back to the user
    if (journeyActive) resetJourney();
    setSelectedNode(node);
    setPathToCrossActive(false);
  }

  // ── Journey controls ──
  function beginJourney() {
    if (!journey) return;
    let startIdx = 0;
    if (selectedNode) {
      const i = journey.findIndex(j => j.nodeId === selectedNode.id);
      if (i >= 0) startIdx = i;
    }
    setPathToCrossActive(false);
    setJourneyPaused(false);
    setJourneyStep(startIdx);
    setJourneyActive(true);
  }

  function nextJourneyStep() {
    if (!journey) return;
    setJourneyStep(s => Math.min(s + 1, journey.length - 1));
  }

  function exitJourney() {
    setJourneyActive(false);
    setJourneyPaused(false);
  }

  function toggleCategory(cat) {
    setActiveCategories(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  async function handleDeclare(text, ref) {
    setTtsError(null);
    setTtsLoading(true);
    try {
      // Stop any current audio
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }

      const res = await fetch(`${apiBaseUrl}/api/tts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: `${ref}. ${text}` }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "TTS failed");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => URL.revokeObjectURL(url);
      await audio.play();
    } catch (err) {
      setTtsError(err.message);
      setTimeout(() => setTtsError(null), 4000);
    } finally {
      setTtsLoading(false);
    }
  }

  // Keep the detail panel synced to whichever node the dove is visiting
  useEffect(() => {
    if (!journeyActive || !journey || !currentMap) return;
    const stop = journey[journeyStep];
    if (!stop) return;
    const node = MAPS[currentMap].nodes.find(n => n.id === stop.nodeId);
    if (node) setSelectedNode(node);
  }, [journeyActive, journeyStep, journey, currentMap]);

  // Auto-advance: dwell at each stop (travel + read), then move to the next.
  // Stops once the dove reaches the Cross (final stop).
  useEffect(() => {
    if (!journeyActive || journeyPaused || !journey) return;
    if (journeyStep >= journey.length - 1) return;
    const t = setTimeout(
      () => setJourneyStep(s => Math.min(s + 1, journey.length - 1)),
      DOVE.travelMs + DOVE.pauseMs
    );
    return () => clearTimeout(t);
  }, [journeyActive, journeyPaused, journeyStep, journey]);

  // ── GALAXY HOME ──────────────────────────────────────────────────────────────
  if (!currentMap) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Lora:ital@0;1&family=Inter:wght@400;600;700;800&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: #040608; }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-track { background: #040608; }
          ::-webkit-scrollbar-thumb { background: #1E293B; border-radius: 4px; }
        `}</style>
        <GalaxyHome onSelectMap={enterMap} />
      </>
    );
  }

  // ── MAP VIEW ─────────────────────────────────────────────────────────────────
  const mapData = MAPS[currentMap];
  const clusterColor = MAP_CLUSTER_COLORS[currentMap];
  const allNodes = mapData.nodes;
  const visibleNodes = allNodes.filter(n => n.isCross || activeCategories.has(n.category));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Lora:ital@0;1&family=Inter:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; }
        body { background: #040608; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #040608; }
        ::-webkit-scrollbar-thumb { background: #1E293B; border-radius: 4px; }
      `}</style>

      <div style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}>

        {/* ── TOP BAR ── */}
        <div style={{
          position: "relative",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px",
          background: "linear-gradient(180deg, #040608FF 0%, #040608CC 70%, transparent 100%)",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={exitMap}
              style={{
                background: "transparent", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8, padding: "5px 10px", color: "#64748B",
                cursor: "pointer", fontSize: 11, fontWeight: 700,
                display: "flex", alignItems: "center", gap: 4,
              }}
            >← GALAXY</button>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: clusterColor.primary,
                fontFamily: "'Cinzel', serif", letterSpacing: "0.06em" }}>
                {mapData.meta.title}
              </div>
              <div style={{ fontSize: 10, color: "#334155" }}>{mapData.meta.subtitle}</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {ttsError && (
              <span style={{ fontSize: 10, color: "#EF4444" }}>{ttsError}</span>
            )}
            {ttsLoading && (
              <span style={{ fontSize: 10, color: "#60A5FA", animation: "pulse 1s infinite" }}>🔊 Speaking…</span>
            )}
            <div style={{ fontSize: 10, color: "#1E293B", fontFamily: "'Cinzel', serif", letterSpacing: "0.15em" }}>
              {visibleNodes.length} SCRIPTURES
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div style={{ flex: 1, display: "flex", position: "relative", overflow: "hidden" }}>

          {/* MAP CANVAS */}
          <div style={{ flex: 1, position: "relative" }}>
            <MapCanvas
              nodes={journeyActive ? allNodes : visibleNodes}
              selectedNode={selectedNode}
              onSelectNode={handleSelectNode}
              pathToCross={pathToCrossActive}
              journeyActive={journeyActive}
              journey={journey}
              journeyStep={journeyStep}
            />

            {/* Category filters — bottom overlay (hidden during a journey) */}
            {!journeyActive && (
            <div style={{
              position: "absolute",
              bottom: 14,
              left: 14,
              right: selectedNode ? "calc(320px + 14px)" : 14,
              zIndex: 15,
              display: "flex",
              flexWrap: "wrap",
              gap: 5,
            }}>
              {[...new Set(allNodes.filter(n => !n.isCross).map(n => n.category))].map(cat => {
                // CATEGORIES imported at top of file
                const c = CATEGORIES[cat] || {};
                const on = activeCategories.has(cat);
                return (
                  <button key={cat} onClick={() => toggleCategory(cat)} style={{
                    padding: "3px 10px", borderRadius: 20, cursor: "pointer",
                    fontSize: 10, fontWeight: 700,
                    border: `1px solid ${on ? c.fill : "rgba(255,255,255,0.06)"}`,
                    background: on ? c.fill + "33" : "#04060888",
                    color: on ? c.glow : "#334155",
                    backdropFilter: "blur(4px)",
                    transition: "all 0.2s",
                  }}>
                    {c.icon} {c.label}
                  </button>
                );
              })}
            </div>
            )}
          </div>

          {/* DETAIL PANEL — slides in when node selected */}
          {selectedNode && (
            <div style={{
              width: 310,
              flexShrink: 0,
              padding: "0 12px 12px 0",
              position: "relative",
              zIndex: 20,
              animation: "slideIn 0.25s ease-out",
            }}>
              <style>{`
                @keyframes slideIn {
                  from { transform: translateX(20px); opacity: 0; }
                  to { transform: translateX(0); opacity: 1; }
                }
              `}</style>
              <NodeDetail
                node={selectedNode}
                allNodes={allNodes}
                onSelectNode={handleSelectNode}
                onPathToCross={() => setPathToCrossActive(v => !v)}
                pathToCrossActive={pathToCrossActive}
                ttsAvailable={true}
                onDeclare={handleDeclare}
                onBeginJourney={journey ? beginJourney : null}
                journey={journeyActive ? {
                  active: true,
                  step: journeyStep,
                  total: journey.length,
                  note: journey[journeyStep]?.note,
                  paused: journeyPaused,
                  onPause: () => setJourneyPaused(true),
                  onResume: () => setJourneyPaused(false),
                  onNext: nextJourneyStep,
                  onExit: exitJourney,
                } : null}
              />
            </div>
          )}
        </div>

        {/* Map description tooltip — shown when no node selected */}
        {!selectedNode && (
          <div style={{
            position: "absolute",
            bottom: 60,
            right: 16,
            zIndex: 15,
            maxWidth: 260,
            padding: "10px 14px",
            background: "#04060888",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: 10,
            pointerEvents: "none",
          }}>
            <p style={{ margin: 0, fontSize: 10, color: "#334155", lineHeight: 1.65, fontStyle: "italic", fontFamily: "'Lora', serif" }}>
              {mapData.meta.description}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
