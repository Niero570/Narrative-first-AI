// ─── DOVE CONTEXT — for Opus session reference ────────────────────────────────
// This file exists so Opus can understand the data shapes it needs WITHOUT
// reading the 4 large map data files (healingCovenant, theCross, etc.).
// Do not import this file in production components — import DOVE from celestial.js.
//
// ── NODE INTERFACE ────────────────────────────────────────────────────────────
// Every node in every map has these fields:
//
// {
//   id:          string,           // unique within the map, e.g. "f1", "cross", "p_virgin"
//   category:    string,           // key into CATEGORIES from celestial.js
//   redLetter:   boolean,          // true = direct speech of Jesus
//   ref:         string,           // human-readable verse ref, e.g. "John 3:16"
//   textKJV:     string,
//   textESV:     string,
//   textNKJV:    string,
//   application: string,           // "HOW TO STAND ON THIS TODAY" one-paragraph note
//   connections: string[],         // array of other node ids this node connects to
//   position:    { x: number, y: number },  // 0–100 in the SVG viewBox
//   isCross?:    boolean,          // true only on the Cross anchor node
//   strongsWords?: Array<{
//     word: string,
//     strongs: string,             // e.g. "H7495" or "G2390"
//     original: string,
//     phonetic: string,
//     language: "Hebrew" | "Greek",
//     definition: string,
//     occurrences: number,
//   }>,
//   source?:        string,        // "TSK: cross-refs ..." citation
//   fulfilledBy?:   string,        // Prophets map only — OT node pointing to NT node id
//   fulfillmentOf?: string,        // Prophets map only — NT node pointing to OT node id
// }
//
// ── MAP_META INTERFACE ────────────────────────────────────────────────────────
// Each map exports MAP_META and NODES.
//
// MAP_META = {
//   id:          string,           // "healingCovenant" | "theCross" | etc.
//   title:       string,
//   subtitle:    string,
//   anchor:      string,           // anchor verse reference
//   verseCount:  number,
//   description: string,
//   journey:     Array<{ nodeId: string, note: string }>,
//                // curated sequence for the dove to travel
//                // nodeId must exist in NODES for this map
//                // note = one-line reason this stop connects to the previous one
// }
//
// ── JOURNEY ARRAY EXAMPLE (Healing Covenant, first 3 stops) ──────────────────
// journey: [
//   { nodeId: "f1",  note: "Faith is the foundation — it is the substance of what God promised" },
//   { nodeId: "f2",  note: "Faith grows by hearing the Word — it cannot be manufactured" },
//   { nodeId: "w1",  note: "The Word itself is medicine: 'health to all your flesh'" },
//   // ... 10 more stops ending at { nodeId: "cross", note: "It is finished..." }
// ]
//
// ── PROPS DOVE NEEDS FROM ScriptureMap.jsx ───────────────────────────────────
// Dove-related state to add to ScriptureMap.jsx:
//   journeyActive:  boolean  — is journey mode running?
//   journeyStep:    number   — index into MAP_META.journey[]
//   journeyPaused:  boolean  — auto-advance paused?
//
// These should be passed as props to MapCanvas (for dove position) and
// NodeDetail (for journey panel display).
//
// ── DOVE THEME CONSTANTS ──────────────────────────────────────────────────────
// Import from '../theme/celestial' in production:
//
// DOVE = {
//   fill: "#F0F4FF",        // soft white-blue body
//   glow: "#A5B4FC",        // indigo aura
//   wingStroke: "#C7D2FE",  // wing edge highlight
//   size: 2.8,              // SVG units
//   trailCount: 6,          // fading trail particles
//   trailColor: "#C4B5FD",  // violet trail
//   travelMs: 1200,         // ms per edge travel
//   pauseMs: 2000,          // ms paused at each node
//   easing: "cubic-bezier(0.4, 0, 0.2, 1)",
// }

export const DOVE_CONTEXT_VERSION = "1.0";
