// ─── CELESTIAL THEME ──────────────────────────────────────────────────────────
// All colors, glow values, and animation constants for the Scripture Map.
// Every value here is a design decision — change here to change everywhere.

export const VOID = "#040608";
export const OBSIDIAN = "#0A0C12";
export const CARD_BG = "#0D0F18";

// Cross / Christ node — always gold, always lit
export const CROSS_FILL = "#D4A017";
export const CROSS_GLOW = "#FBBF24";
export const CROSS_RING = "#FCD34D";

// Red Letter (direct words of Jesus)
export const RED_LETTER_FILL = "#C41E3A";
export const RED_LETTER_GLOW = "#FC8181";
export const RED_LETTER_BG   = "#1A0308";

// Category palette — gem colors
export const CATEGORIES = {
  faith: {
    label: "Faith",
    icon: "✦",
    fill: "#1E3A8A",
    glow: "#60A5FA",
    dim: "#0D1F4A",
  },
  healing: {
    label: "Healing",
    icon: "✚",
    fill: "#064E3B",
    glow: "#34D399",
    dim: "#02261D",
  },
  prayer: {
    label: "Prayer",
    icon: "🙏",
    fill: "#4C1D95",
    glow: "#A78BFA",
    dim: "#270E50",
  },
  covenant: {
    label: "Covenant",
    icon: "📜",
    fill: "#7F1D1D",
    glow: "#FCA5A5",
    dim: "#3F0E0E",
  },
  word: {
    label: "The Word",
    icon: "📖",
    fill: "#3B2F00",
    glow: "#FDE68A",
    dim: "#1C1600",
  },
  jesus: {
    label: "Jesus the Healer",
    icon: "☀",
    fill: "#78350F",
    glow: "#FCD34D",
    dim: "#3D1B07",
  },
  // Cross map categories
  atonement: {
    label: "Atonement",
    icon: "✝",
    fill: "#1C1C1C",
    glow: "#F5F0E0",
    dim: "#111111",
  },
  sacrifice: {
    label: "Sacrifice",
    icon: "🔥",
    fill: "#7C2D12",
    glow: "#FB923C",
    dim: "#3E1709",
  },
  resurrection: {
    label: "Resurrection",
    icon: "☀",
    fill: "#14532D",
    glow: "#86EFAC",
    dim: "#0A2916",
  },
  justification: {
    label: "Justification",
    icon: "⚖",
    fill: "#1E3A8A",
    glow: "#93C5FD",
    dim: "#0D1F4A",
  },
  redemption: {
    label: "Redemption",
    icon: "🔑",
    fill: "#4A1D96",
    glow: "#C4B5FD",
    dim: "#250E4B",
  },
  // Wisdom map categories
  wisdom: {
    label: "Wisdom",
    icon: "◈",
    fill: "#713F12",
    glow: "#FDE68A",
    dim: "#38200A",
  },
  instruction: {
    label: "Instruction",
    icon: "✎",
    fill: "#1E3A8A",
    glow: "#BAE6FD",
    dim: "#0D1F4A",
  },
  meditation: {
    label: "Meditation",
    icon: "◎",
    fill: "#064E3B",
    glow: "#A7F3D0",
    dim: "#02261D",
  },
  praise: {
    label: "Praise",
    icon: "♪",
    fill: "#7F1D1D",
    glow: "#FECACA",
    dim: "#3F0E0E",
  },
  // Prophets map categories
  prophecy: {
    label: "Prophecy (OT)",
    icon: "◭",
    fill: "#2D1B69",
    glow: "#C4B5FD",
    dim: "#170D35",
  },
  fulfillment: {
    label: "Fulfillment (NT)",
    icon: "★",
    fill: "#713F12",
    glow: "#FCD34D",
    dim: "#38200A",
  },
};

// Galaxy Home cluster colors — one per map
export const MAP_CLUSTER_COLORS = {
  healingCovenant:        { primary: "#34D399", secondary: "#064E3B", label: "The Healing Covenant" },
  theCross:               { primary: "#FCD34D", secondary: "#78350F", label: "The Cross: Center of All Things" },
  wisdomAndWord:          { primary: "#FDE68A", secondary: "#3B2F00", label: "Wisdom & The Word" },
  prophetsAndFulfillment: { primary: "#C4B5FD", secondary: "#2D1B69", label: "Prophets & Fulfillment" },
};

// Nebula gradient stops for background
export const NEBULA_LAYERS = [
  { color: "#1a053388", x: "25%", y: "35%", size: "45%" },
  { color: "#020d1a99", x: "75%", y: "60%", size: "55%" },
  { color: "#1a100066", x: "50%", y: "80%", size: "35%" },
  { color: "#05001a55", x: "10%", y: "70%", size: "30%" },
];

// Animation timings
export const ANIM = {
  nodeStagger: 80,       // ms between each node fading in
  crossPulse: "3s",      // period of the Cross pulse ring
  redLetterBreath: "4s", // period of the red-letter glow breath
  mapTransition: 400,    // ms for galaxy → map zoom transition
  hoverScale: 1.2,       // node scale on hover
};

// Node sizes
export const NODE_R = {
  cross: 5.5,    // Cross node radius
  normal: 3.2,   // default node radius
  large: 4.0,    // high-connectivity node radius (4+ connections)
};

// Opacity levels
export const OPACITY = {
  full: 1,
  dim: 0.12,       // non-selected nodes when something is selected
  lineActive: 0.8, // selected connection lines
  lineDim: 0.08,   // non-selected connection lines
  lineDefault: 0.22, // default unselected (nothing selected)
};
