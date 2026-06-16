import { useState } from "react";
import {
  CATEGORIES, CROSS_FILL, CROSS_GLOW, CROSS_RING,
  RED_LETTER_FILL, RED_LETTER_GLOW, RED_LETTER_BG,
  CARD_BG,
} from "../theme/celestial";

const TRANSLATIONS = {
  KJV:  { label: "KJV",  full: "King James Version" },
  ESV:  { label: "ESV",  full: "English Standard Version" },
  NKJV: { label: "NKJV", full: "New King James Version" },
};

function getVerseText(node, translation) {
  if (translation === "KJV")  return node.textKJV;
  if (translation === "ESV")  return node.textESV;
  if (translation === "NKJV") return node.textNKJV || node.textESV;
  return node.textKJV;
}

// Strong's word chip — shows expanded definition on click
function StrongsChip({ word }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 8 }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 6, padding: "4px 10px",
          cursor: "pointer", fontSize: 11, color: "#FDE68A",
          fontFamily: "'Inter', sans-serif",
          transition: "border-color 0.2s",
        }}
      >
        <span style={{ fontFamily: "'Cinzel', serif", fontWeight: 700 }}>{word.word}</span>
        <span style={{ color: "#64748B", fontSize: 10 }}>{word.strongs}</span>
        <span style={{ color: "#64748B", fontSize: 11 }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div style={{
          marginTop: 6,
          background: "#080A10",
          border: "1px solid #FDE68A22",
          borderRadius: 8,
          padding: "10px 12px",
          fontSize: 11,
          lineHeight: 1.65,
          fontFamily: "'Inter', sans-serif",
        }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 6 }}>
            <span style={{ color: "#FDE68A", fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 700 }}>
              {word.original}
            </span>
            <span style={{ color: "#64748B" }}>{word.phonetic}</span>
            <span style={{
              fontSize: 9, fontWeight: 700, letterSpacing: "0.1em",
              color: word.language === "Hebrew" ? "#FB923C" : "#60A5FA",
              background: word.language === "Hebrew" ? "#7C2D1222" : "#1E3A8A22",
              borderRadius: 4, padding: "2px 6px",
            }}>
              {word.language} · {word.strongs}
            </span>
          </div>
          <p style={{ margin: "0 0 6px", color: "#CBD5E1" }}>{word.definition}</p>
          {word.occurrences && (
            <p style={{ margin: 0, color: "#475569", fontSize: 10, fontStyle: "italic" }}>
              {word.occurrences}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default function NodeDetail({
  node,
  allNodes = [],
  onSelectNode,
  onPathToCross,
  pathToCrossActive,
  ttsAvailable = false,
  onDeclare,
}) {
  const [translation, setTranslation] = useState("KJV");
  const [showStrongs, setShowStrongs] = useState(false);

  if (!node) return <EmptyPanel />;

  const isCross = !!node.isCross;
  const isRedLetter = !!node.redLetter;
  const cat = CATEGORIES[node.category] || {};

  const fill    = isCross ? CROSS_FILL    : isRedLetter ? RED_LETTER_FILL : cat.fill;
  const glow    = isCross ? CROSS_GLOW    : isRedLetter ? RED_LETTER_GLOW : cat.glow;
  const border  = isCross ? CROSS_RING    : glow;
  const bg      = isRedLetter ? RED_LETTER_BG : CARD_BG;

  const verseText = getVerseText(node, translation);
  const connectedNodes = (node.connections || [])
    .map(id => allNodes.find(n => n.id === id))
    .filter(Boolean);

  return (
    <div style={{
      background: bg,
      border: `1px solid ${border}33`,
      borderRadius: 14,
      padding: 18,
      height: "100%",
      overflowY: "auto",
      boxSizing: "border-box",
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Header row: category badge + translation toggle */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 12 }}>
        <div>
          {isCross && (
            <div style={{
              display: "inline-block", fontSize: 9, fontWeight: 800, letterSpacing: "0.12em",
              color: CROSS_RING, background: "#1A1000", borderRadius: 5, padding: "3px 8px", marginBottom: 4,
            }}>✝ THE CROSS · CENTER OF ALL THINGS</div>
          )}
          {isRedLetter && !isCross && (
            <div style={{
              display: "inline-block", fontSize: 9, fontWeight: 800, letterSpacing: "0.12em",
              color: RED_LETTER_FILL, background: RED_LETTER_BG, borderRadius: 5, padding: "3px 8px", marginBottom: 4,
            }}>🔴 WORDS OF JESUS</div>
          )}
          {!isCross && !isRedLetter && cat.label && (
            <div style={{
              display: "inline-block", fontSize: 9, fontWeight: 800, letterSpacing: "0.12em",
              color: glow, background: fill + "22", borderRadius: 5, padding: "3px 8px", marginBottom: 4,
            }}>{cat.icon} {cat.label.toUpperCase()}</div>
          )}
          {node.fulfilledBy && (
            <div style={{ display: "inline-block", marginLeft: 6, fontSize: 9, fontWeight: 700,
              color: "#FCD34D", background: "#3B2F0022", borderRadius: 5, padding: "3px 8px" }}>
              ◭ OT PROPHECY
            </div>
          )}
          {node.fulfillmentOf && (
            <div style={{ display: "inline-block", marginLeft: 6, fontSize: 9, fontWeight: 700,
              color: "#FDE68A", background: "#78350F22", borderRadius: 5, padding: "3px 8px" }}>
              ★ NT FULFILLMENT
            </div>
          )}
        </div>

        {/* Translation toggle */}
        <div style={{ display: "flex", gap: 2, background: "#040608", borderRadius: 8, padding: 2, flexShrink: 0 }}>
          {Object.entries(TRANSLATIONS).map(([key, t]) => (
            <button
              key={key}
              onClick={() => setTranslation(key)}
              style={{
                padding: "3px 8px", border: "none", borderRadius: 6, cursor: "pointer",
                fontSize: 9, fontWeight: 800,
                background: translation === key ? glow + "AA" : "transparent",
                color: translation === key ? "#fff" : "#475569",
                transition: "all 0.15s",
              }}
            >{t.label}</button>
          ))}
        </div>
      </div>

      {/* Verse reference */}
      <h2 style={{
        margin: "0 0 10px",
        fontSize: 17,
        fontWeight: 700,
        color: isCross ? CROSS_RING : glow,
        fontFamily: "'Cinzel', serif",
        letterSpacing: "0.05em",
      }}>{node.ref}</h2>

      {/* Verse text */}
      <blockquote style={{
        margin: "0 0 10px",
        padding: "10px 14px",
        borderLeft: `3px solid ${border}`,
        background: isRedLetter ? "#1A030888" : "#04060888",
        borderRadius: "0 8px 8px 0",
        fontSize: 12.5,
        lineHeight: 1.75,
        fontStyle: "italic",
        color: isRedLetter ? RED_LETTER_GLOW : "#CBD5E1",
        fontFamily: "'Lora', serif",
      }}>
        "{verseText}"
      </blockquote>

      {/* Translation label */}
      <div style={{ fontSize: 9, color: "#334155", fontWeight: 600, marginBottom: 12, letterSpacing: "0.12em" }}>
        {TRANSLATIONS[translation].full}
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
        {/* Path to Cross */}
        {!isCross && (
          <button
            onClick={onPathToCross}
            style={{
              flex: "1 1 auto",
              padding: "7px 10px",
              border: `1px solid ${pathToCrossActive ? "#FCD34D" : "#FCD34D33"}`,
              borderRadius: 8,
              background: pathToCrossActive ? "#FCD34D18" : "transparent",
              color: pathToCrossActive ? "#FCD34D" : "#64748B",
              cursor: "pointer",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.08em",
              transition: "all 0.2s",
            }}
          >✝ PATH TO THE CROSS{pathToCrossActive ? " ✓" : ""}</button>
        )}

        {/* Declare This */}
        {ttsAvailable && (
          <button
            onClick={() => onDeclare && onDeclare(verseText, node.ref)}
            style={{
              flex: "1 1 auto",
              padding: "7px 10px",
              border: `1px solid ${glow}44`,
              borderRadius: 8,
              background: "transparent",
              color: glow,
              cursor: "pointer",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.08em",
              transition: "all 0.2s",
            }}
          >🔊 DECLARE THIS</button>
        )}
      </div>

      {/* Application */}
      <div style={{
        background: "#080A10",
        borderRadius: 10,
        padding: "11px 13px",
        marginBottom: 14,
      }}>
        <div style={{ fontSize: 9, fontWeight: 800, color: "#FBBF24", marginBottom: 5, letterSpacing: "0.1em" }}>
          ⚡ HOW TO STAND ON THIS TODAY
        </div>
        <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.7, color: "#CBD5E1" }}>
          {node.application}
        </p>
      </div>

      {/* Strong's / Original Language */}
      {node.strongsWords && node.strongsWords.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <button
            onClick={() => setShowStrongs(v => !v)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "transparent", border: "none",
              cursor: "pointer", padding: "0 0 6px",
              fontSize: 9, fontWeight: 800, color: "#FDE68A",
              letterSpacing: "0.12em",
            }}
          >
            𝛼β HEBREW / GREEK KEYS {showStrongs ? "▲" : "▼"}
          </button>
          {showStrongs && node.strongsWords.map((w, i) => (
            <StrongsChip key={i} word={w} />
          ))}
        </div>
      )}

      {/* Source note */}
      {node.source && (
        <div style={{ fontSize: 9, color: "#1E293B", marginBottom: 12, fontStyle: "italic" }}>
          {node.source}
        </div>
      )}

      {/* Connected nodes */}
      {connectedNodes.length > 0 && (
        <div>
          <div style={{ fontSize: 9, fontWeight: 800, color: "#334155", marginBottom: 7, letterSpacing: "0.1em" }}>
            CONNECTED SCRIPTURES ({connectedNodes.length})
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {connectedNodes.map(n => {
              const nc = CATEGORIES[n.category] || {};
              const isRL = n.redLetter;
              const nodeGlow = n.isCross ? CROSS_GLOW : isRL ? RED_LETTER_GLOW : nc.glow;
              const nodeFill = n.isCross ? CROSS_FILL : isRL ? RED_LETTER_FILL : nc.fill;
              return (
                <button
                  key={n.id}
                  onClick={() => onSelectNode(n)}
                  style={{
                    background: nodeFill + "22",
                    color: nodeGlow,
                    border: `1px solid ${nodeFill}44`,
                    borderRadius: 20,
                    padding: "3px 9px",
                    fontSize: 10,
                    cursor: "pointer",
                    fontWeight: 700,
                    fontFamily: "'Inter', sans-serif",
                    transition: "background 0.2s",
                  }}
                >
                  {n.isCross ? "✝" : isRL ? "🔴" : nc.icon} {n.ref}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Prophecy/Fulfillment link */}
      {(node.fulfilledBy || node.fulfillmentOf) && (() => {
        const linkedId = node.fulfilledBy || node.fulfillmentOf;
        const linked = allNodes.find(n => n.id === linkedId);
        if (!linked) return null;
        const isProphecy = !!node.fulfilledBy;
        return (
          <div style={{ marginTop: 12, padding: "10px 12px", background: "#1A100044",
            border: "1px solid #FCD34D33", borderRadius: 8 }}>
            <div style={{ fontSize: 9, fontWeight: 800, color: "#FCD34D", letterSpacing: "0.1em", marginBottom: 5 }}>
              {isProphecy ? "◭ FULFILLED IN →" : "★ PROPHECY ←"}
            </div>
            <button
              onClick={() => onSelectNode(linked)}
              style={{
                background: "transparent", border: "none",
                color: "#FDE68A", cursor: "pointer",
                fontFamily: "'Cinzel', serif", fontWeight: 700,
                fontSize: 12, padding: 0,
              }}
            >{linked.ref}</button>
            <p style={{ margin: "4px 0 0", fontSize: 10, color: "#94A3B8", lineHeight: 1.5 }}>
              {isProphecy ? linked.textKJV?.slice(0, 100) + "…" : linked.textKJV?.slice(0, 100) + "…"}
            </p>
          </div>
        );
      })()}
    </div>
  );
}

function EmptyPanel() {
  return (
    <div style={{
      background: "#0A0C1288",
      border: "1px solid rgba(255,255,255,0.04)",
      borderRadius: 14,
      padding: 22,
      height: "100%",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      fontFamily: "'Cinzel', serif",
    }}>
      <div style={{ fontSize: 36, marginBottom: 12, opacity: 0.6 }}>✝</div>
      <h3 style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 700, color: CROSS_RING, letterSpacing: "0.1em" }}>
        The Cross Is the Center
      </h3>
      <p style={{ margin: "0 0 16px", color: "#334155", fontSize: 11, lineHeight: 1.7, fontFamily: "'Lora', serif", fontStyle: "italic" }}>
        Every promise, every covenant, every prophecy — they all converge here.
        Select any node to trace its path back to the Cross.
      </p>
      <div style={{ fontSize: 9, color: "#1E293B", letterSpacing: "0.15em" }}>
        SELECT A SCRIPTURE TO BEGIN
      </div>
    </div>
  );
}
