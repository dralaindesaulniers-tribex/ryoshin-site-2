/**
 * The partners page (/partners). Bios provided by each partner via Alain's
 * Drive folder (July 2026), condensed for the web with facts unchanged.
 * Voice rules apply: no em dashes, short sentences, nothing invented.
 *
 * Pending (TODO-ASSET): bios for Kevin Eftekhari (photo on hand) and Joose;
 * both join the core team block up top when their material arrives.
 */

export type PartnerPerson = {
  id: string; // anchor: /partners#id, matches network pageAnchor
  name: string;
  role: string;
  org: string;
  photo: string | null; // null = TODO-ASSET, styled initials placeholder
  bio: string[];
};

export const partnersPage = {
  eyebrow: "Partners",
  heroQuote: "Good company, kept.",
  heroAttribution: "The people we build with",
  intro:
    "RYŌSHIN Solutions works as a network. For every engagement we bring the right people to the table: specialists we trust, who share our standard for doing work with a good heart. These are the people behind the nodes.",
  // Core team first (Alain, then Kavi, Wlad; Kevin and Joose join when their
  // bios arrive), then the wider roster. No numbering: order is not ranking.
  people: [
    {
      id: "tribex",
      name: "Alain Desaulniers",
      role: "Founder",
      org: "TribeX",
      photo: "/images/partners/alain-desaulniers.webp",
      bio: [
        "Dr. Alain Desaulniers is a Vancouver based family chiropractor, professional speaker, and the founder of TribeX, a leadership and communication company where he leads his flagship program, the TRANSFORM Speaking Academy. Through his signature Lighthouse Story Method, he teaches health experts, holistic practitioners, and coaches how to grow their confidence and heart-centred influence from the stage.",
        "A passionate storyteller and educator, he recently developed the bilingual Heritage StoryLab digital program for the Nikkei National Museum and Cultural Centre. He lives in British Columbia with his wife, Sarah, and their two daughters, Ève and Olivia.",
      ],
    },
    {
      id: "mobius",
      name: "Kavi Lochan",
      role: "Director of Operations",
      org: "Mobius Systems",
      photo: "/images/partners/kavi-lochan.jpg",
      bio: [
        "Kavi Lochan is a fractional COO and operations leader with more than 20 years leading operations, transformation, governance, and service delivery across regulated, public-sector, multi-site, and high-accountability environments.",
        "At Mobius Systems, he helps organizations build resilient operating systems that improve decision quality, accelerate execution, and enable responsible AI adoption. Like the Möbius strip the company is named for, strategy and execution exist on one continuous surface: Mobius stays through implementation and builds systems that keep delivering after the engagement ends.",
        "His conviction is simple. AI does not transform organizations. People, processes, and leadership do.",
      ],
    },
    {
      id: "eitree",
      name: "Wladimir Ribeiro Junior",
      role: "Founder",
      org: "Eitree",
      photo: "/images/partners/wladimir-ribeiro.jpg",
      bio: [
        "Wladimir is a technology founder and strategic consultant with a strong background in software architecture, AI integration, and technical execution. Through Eitree, he works with organizations to assess technical needs, design practical solutions, and guide implementation, bridging the gap between business objectives and reliable technology delivery.",
        "Eitree designs and builds artificial intelligence systems, including machine learning workflows, computer vision, and LLM powered tools, with clients spanning startups to enterprise organizations in regulated industries such as healthcare and finance.",
      ],
    },
    {
      id: "kizuna-tours",
      name: "April May Bellia",
      role: "Co-creator",
      org: "Kizuna Tours",
      photo: "/images/partners/april-may-bellia.jpg",
      bio: [
        "April May Bellia has spent a lifetime in travel, drawn to the journeys beyond logistics: the ones that connect people to their culture, their heritage, their history, and each other. Over many years of designing bespoke travel and cruise experiences across Europe and beyond, she has built her craft around personalized expert planning and cultural storytelling.",
        "That belief took on new meaning when April co-created Kizuna Tours, inspired by the Japanese concept of kizuna, the enduring bonds of family, community, and shared experience. Kizuna Tours helps Japanese Canadians reconnect with their roots through intimate, thoughtfully curated journeys that honour the past while opening space for understanding, healing, and connection for generations to come.",
        "Every itinerary April designs reflects the same care, with every detail handled, large and small, so guests can simply be present.",
      ],
    },
    {
      id: "aboriginal",
      name: "Jinxz Pollard-Flamand",
      role: "Co-founder",
      org: "Two Roots",
      photo: "/images/partners/jinxz-pollard-flamand.jpg",
      bio: [
        "Jinxz Pollard-Flamand, a citizen of Métis Nation British Columbia with an MSc in Biology, co-founded Two Roots with Chad Eneas of the Penticton Indian Band to bring small batch, wild lacto-fermented carrots to the Okanagan, blending scientific rigour with traditional fermentation knowledge and Indigenous food sovereignty.",
      ],
    },
    {
      id: "aboriginal-chad",
      name: "Chad Eneas",
      role: "Co-founder, Two Roots",
      org: "Former Chief, Penticton Indian Band",
      photo: "/images/partners/chad-eneas.jpg",
      bio: [
        "Chad Eneas, whose Syilx name is nk'lxwcin, is a Syilx and Okanagan leader, traditional knowledge keeper, and former Chief of the Penticton Indian Band, where he served from 2016 to 2020. A lifelong resident of the Okanagan, his work restores Syilx roles and responsibilities to the land: language and culture revitalization, traditional land use, water stewardship, and the return of salmon to the Okanagan and Columbia river systems.",
        "He now serves as tmixʷ Programs Manager at the En'owkin Centre and chairs the Indigenous Knowledge Council of the Columbia River Salmon Reintroduction Initiative. With Jinxz Pollard-Flamand, he co-founded Two Roots, a fermented food venture rooted in the same care for land and community.",
      ],
    },
    {
      id: "fraction",
      name: "Oliver Zihlmann",
      role: "Principal and Founder",
      org: "Fraction Philanthropy Group",
      photo: "/images/partners/oliver-zihlmann.jpg",
      bio: [
        "Oliver Zihlmann, MBA, is an experienced philanthropy advisor and management consultant with over 15 years in charitable giving. He has led and executed fundraising strategies in health care, higher education, and arts and culture, including with St. Paul's Foundation, UBC, and the Vancouver Art Gallery.",
        "Oliver is passionate about relational, strategic, and values-driven fundraising, delivering an exceptional philanthropy experience for staff, volunteers, and donors alike.",
      ],
    },
    {
      id: "sean-lowrie",
      name: "Sean Lowrie",
      role: "Head of External Affairs",
      org: "Arca",
      photo: "/images/partners/sean-lowrie.jpg",
      bio: [
        "Sean Lowrie is a humanitarian leader and climate tech executive who has spent 30 years bringing people who do not usually work together around the table to solve hard problems. He founded and led the Start Network, growing it from 15 founding NGOs into a coalition of 42 members across 15 countries that has secured over $200 million for crisis response in more than 50 countries.",
        "His early career took him to the frontlines of the refugee crises of the 1990s with CARE and Médecins Sans Frontières, and he built the global training programme for the Sphere Standards, the humanitarian sector's first common charter, delivering it on five continents. He holds a PhD from King's College London.",
        "Based in North Vancouver, he now leads external affairs at Arca, a Vancouver carbon removal company. In his own words, he is trying to be a good ancestor.",
      ],
    },
  ] satisfies PartnerPerson[],
};
