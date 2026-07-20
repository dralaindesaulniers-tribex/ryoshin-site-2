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
  pageAnchor?: string; // /partners#anchor for the full bio page
  // the person behind the partner, shown in the network popup.
  // null = bio + headshot not yet provided (TODO-ASSET, Alain has these)
  person?: {
    name: string;
    role: string;
    photo: string | null; // null = TODO-ASSET headshot
    bio: string;
  } | null;
};

// Partner one-liners and person blurbs condensed from the bios in Alain's
// Drive folder (July 2026). Full bios live in content/partners.ts.
export const networkEntities: NetworkEntity[] = [
  // Partners (large named nodes, first ring)
  {
    id: "tribex",
    name: "TribeX",
    tier: "partner",
    ring: 1,
    line: "Leadership and communication. Home of the TRANSFORM Speaking Academy.",
    logo: "/images/logo-tribex.png",
    pageAnchor: "/partners#tribex",
    person: {
      name: "Alain Desaulniers",
      role: "Founder, TribeX",
      photo: "/images/partners/alain-desaulniers.webp",
      bio: "Chiropractor, professional speaker, and storyteller. Creator of the Lighthouse Story Method and the bilingual Heritage StoryLab program for the Nikkei National Museum and Cultural Centre.",
    },
  },
  {
    id: "eitree",
    name: "Eitree",
    tier: "partner",
    ring: 1,
    line: "Software strategy and AI engineering, from architecture to implementation.",
    logo: null, // TODO-ASSET
    pageAnchor: "/partners#eitree",
    person: {
      name: "Wladimir Ribeiro Junior",
      role: "Founder, Eitree",
      photo: "/images/partners/wladimir-ribeiro.jpg",
      bio: "Technology founder and strategic consultant who bridges business objectives and reliable technology delivery: software architecture, AI integration, and technical execution.",
    },
  },
  {
    id: "mobius",
    name: "Mobius Systems",
    tier: "partner",
    ring: 1,
    line: "Resilient operating systems and responsible AI adoption.",
    logo: null, // TODO-ASSET
    pageAnchor: "/partners#mobius",
    person: {
      name: "Kavi Lochan",
      role: "Director of Operations, Mobius Systems",
      photo: "/images/partners/kavi-lochan.jpg",
      bio: "Fractional COO with more than 20 years leading operations, transformation, and governance. His conviction: AI does not transform organizations. People, processes, and leadership do.",
    },
  },
  {
    id: "kizuna-tours",
    name: "Kizuna Tours",
    tier: "partner",
    ring: 1,
    line: "Heritage journeys reconnecting Japanese Canadians with their roots.",
    logo: null, // TODO-ASSET
    pageAnchor: "/partners#kizuna-tours",
    person: {
      name: "April May Bellia",
      role: "Co-creator, Kizuna Tours",
      photo: "/images/partners/april-may-bellia.jpg",
      bio: "A lifetime in travel, designing bespoke journeys built on personalized expert planning and cultural storytelling, inspired by kizuna: the enduring bonds of family and community.",
    },
  },
  {
    id: "aboriginal",
    name: "Two Roots",
    tier: "partner",
    ring: 1,
    line: "Wild fermentation and Indigenous food sovereignty in the Okanagan.",
    logo: null, // TODO-ASSET
    pageAnchor: "/partners#aboriginal",
    person: {
      name: "Jinxz Pollard-Flamand",
      role: "Co-founder, Two Roots",
      photo: "/images/partners/jinxz-pollard-flamand.jpg",
      bio: "Citizen of Métis Nation British Columbia with an MSc in Biology. Co-founded Two Roots with Chad Eneas, blending scientific rigour with traditional fermentation knowledge.",
    },
  },
  {
    id: "fraction",
    name: "Fraction Philanthropy Group",
    shortName: "Fraction",
    tier: "partner",
    ring: 1,
    line: "Relational, strategic, values-driven fundraising.",
    logo: null, // TODO-ASSET
    pageAnchor: "/partners#fraction",
    person: {
      name: "Oliver Zihlmann",
      role: "Principal and Founder, Fraction Philanthropy Group",
      photo: "/images/partners/oliver-zihlmann.jpg",
      bio: "Philanthropy advisor with over 15 years in charitable giving, including work with St. Paul's Foundation, UBC, and the Vancouver Art Gallery.",
    },
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
  "Essentialism",
  "Love",
  "Kindness",
  "Family",
];
