/**
 * Single source of truth for the network entities (spec 5.3 + 7.2).
 * Renders BOTH the 2D Partners & Clients section and the named nodes
 * in the R3F hero network. Define once, render twice.
 */

export type NetworkEntity = {
  id: string;
  name: string;
  shortName?: string; // label in the 3D scene when full name is too long
  tier: "partner" | "client";
  ring: 1 | 2; // partners ring 1 (large), clients ring 2 (medium)
  line: string; // one-liner for the network info card + 2D card
  logo: string | null; // null = TODO-ASSET, render styled text mark
  workAnchor?: string; // /work#anchor for info card link
};

export const networkEntities: NetworkEntity[] = [
  // Partners (large named nodes, first ring)
  {
    id: "tribe-rocks",
    name: "Tribe Rocks",
    tier: "partner",
    ring: 1,
    line: "[COPY TBD] Partner",
    logo: null, // TODO-ASSET
  },
  {
    id: "eitree",
    name: "Eitree",
    tier: "partner",
    ring: 1,
    line: "[COPY TBD] Partner",
    logo: null, // TODO-ASSET
  },
  {
    id: "mobius",
    name: "Mobius Systems",
    tier: "partner",
    ring: 1,
    line: "[COPY TBD] Partner",
    logo: null, // TODO-ASSET
  },
  // Recent clients (medium named nodes, second ring)
  {
    id: "nnmcc",
    name: "Nikkei National Museum & Cultural Centre",
    shortName: "NNMCC",
    tier: "client",
    ring: 2,
    line: "Heritage Hub and applied AI storytelling tools",
    logo: "/images/logo-nnmcc.png",
    workAnchor: "/work#nnmcc",
  },
  {
    id: "nikkei-seniors",
    name: "Nikkei Place Seniors Home",
    shortName: "Nikkei Seniors",
    tier: "client",
    ring: 2,
    line: "[COPY TBD] Client",
    logo: null, // TODO-ASSET (may share Nikkei Place mark, confirm)
  },
  {
    id: "npf",
    name: "Nikkei Place Foundation",
    shortName: "NPF",
    tier: "client",
    ring: 2,
    line: "[COPY TBD] Client",
    logo: null, // TODO-ASSET
  },
  {
    id: "hastings-park",
    name: "Japanese Canadian Hastings Park Interpretive Centre",
    shortName: "Hastings Park",
    tier: "client",
    ring: 2,
    line: "[COPY TBD] Client",
    logo: null, // TODO-ASSET
  },
  {
    id: "pib",
    name: "Penticton Indian Band",
    shortName: "PIB",
    tier: "client",
    ring: 2,
    line: "[COPY TBD] Client",
    logo: null, // TODO-ASSET
  },
];

// Category labels float OUTSIDE the center zone (spec 7.1). Nothing crowds the core.
export const networkCategories = [
  "Strategy",
  "Technology",
  "Community",
  "People",
  "Ideas",
  "Projects",
  "Places",
  "Culture",
  "AI",
];

// Value words (per Alain, July 2026): rendered extra faded in the hero
// network so they whisper rather than compete with the categories.
export const networkValues = [
  "Integrity",
  "Compassion",
  "Passion",
  "Mission",
  "Inspiration",
  "Fundamentals",
  "Love",
  "Kindness",
  "Family",
];
