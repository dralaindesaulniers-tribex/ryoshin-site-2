/**
 * RYOSHIN Solutions site copy. Single source of truth.
 * Rules (CLAUDE.md / spec section 12): no em dashes, no invented facts.
 * [INTERVIEW RYAN] and [COPY TBD] mark content that must not ship as-is.
 * TODO-ASSET marks missing image assets.
 */

export const brand = {
  name: "RYŌSHIN Solutions",
  tagline: "Strategy, technology, and community, connected by good heart.",
  logoLight: "/images/logo-white.png", // TODO-ASSET: replace with SVG when provided
  logoDark: "/images/logo-black.png", // TODO-ASSET: replace with SVG when provided
};

export const contact = {
  address: ["242 - 1489 Marine Drive", "West Vancouver, BC V7T 1B8", "Canada"],
  // Dialable phone removed July 2026 (Ryan was getting spam calls). WhatsApp
  // stays: it is a chat handoff, not a callable number, and Ryan's channel.
  whatsapp: "17789913747",
  email: "hello@ryoshin.ca",
  formRecipient: "ryan@ryoshin.ca",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/ryoshinsolutions/" },
    { label: "Instagram", href: "https://www.instagram.com/ryoshin.solutions/" },
    // canonical page URL resolved from Ryan's share link, tracking params stripped
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61560112841901" },
  ],
};

export const nav = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

/* ============ HOMEPAGE ============ */

export const hero = {
  // NOTE: copy is interim until Ryan's brother reviews. Keep swaps trivial.
  line1Pre: "Whole-hearted",
  line1Accent: "Solutions.", // vermilion, the one accent phrase on this page
  line2: "Real-World Results.",
  subhead:
    "Empowering organizations with business and technology strategies that simplify challenges and amplify your positive impact. Ultimately, we help you solve your own problems.",
  chatPlaceholder: "How may we be of service?",
  chatMicrocopy: "AI-POWERED GUIDANCE · COMING SOON",
};

export const trustedBy = {
  label: "Trusted by",
  // Full color per Ryan. No grayscale filters.
  logos: [
    { name: "FM", src: "/images/logo-fm.png" },
    { name: "Backpack Buddies", src: "/images/logo-backpack-buddies.png" },
    { name: "Hitachi Solutions", src: "/images/logo-hitachi.png" },
    { name: "Apple", src: "/images/logo-apple.png" },
    {
      name: "Nikkei National Museum & Cultural Centre",
      src: "/images/logo-nikkei.png",
    },
    { name: "Google", src: "/images/logo-google.png" },
    { name: "TribeX", src: "/images/logo-tribex.png" },
  ],
};

export const partnersClients = {
  eyebrow: "Partners & Clients",
  headline: "Good company, kept.", // [COPY TBD] flag for copy review per spec 5.3
  intro:
    "The organizations we build with, and the ones who trust us with their work.",
  // [COPY TBD] intro line above is scaffolding, review before ship
};

export const audiences = {
  organizations: {
    eyebrow: "For Organizations",
    headline: "Strategic solutions for meaningful impact",
    body: "We partner with businesses, cultural institutions, and government agencies on strategic planning, technology integration, and the kind of change management that actually sticks.",
  },
  individuals: {
    eyebrow: "For Individuals",
    headline: "Empowering leaders to lead with integrity",
    body: "We work with founders, executives, and changemakers who want more than a roadmap. They want a trusted, values-aligned, give-a-damn partner who can clarify their vision, sharpen their strategy, and make it happen.",
    // ALT (Ryan's spicier voice, his call): final clause "...and make shit happen."
  },
};

export const stats = {
  // CONFIRM WITH RYAN before shipping: firm is 5+ years old, Ryan personally 20+.
  // Keyword-rich descriptors per Ryan (airports, data centers, national consortiums).
  items: [
    {
      value: "$100M+",
      label: "Projects led, including two airport developments with SNC-Lavalin",
    },
    { value: "100+", label: "Projects delivered across industries" },
    {
      value: "30+",
      label: "Communities and organizations positively impacted",
    },
    {
      value: "5,000+",
      label: "Professionals, leaders, and innovators connected",
    },
  ],
};

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  photo?: string;
  pending?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Ryan has a keen ability to see how the relationship between technology and operations can be enhanced. This skill coupled with his outstanding people skills provides a solid base to participate and drive technology programs within our organization.",
    name: "Jim C.",
    title: "Technology Leader",
    photo: "/images/testimonial-jim.jpeg",
  },
  {
    quote:
      "Ryan has been a passionate contributor to the communities and causes close to his heart. He has consistently achieved success both professionally and in the community.",
    name: "Henry Wakabayashi",
    title: "Recipient of the Order of B.C., Member of the Order of Canada",
    photo: "/images/testimonial-wakabayashi.webp",
  },
  // Wired slots. Collection is a human task (spec 5.6). Component skips pending entries.
  { quote: "", name: "Karah", title: "NNMCC", pending: true },
  { quote: "", name: "Yvonne", title: "Nikkei Place Seniors Home", pending: true },
  { quote: "", name: "Keiko", title: "Nikkei Place Foundation", pending: true },
  { quote: "", name: "Sherri", title: "NNMCC", pending: true },
  { quote: "", name: "Chief Chad", title: "Penticton Indian Band", pending: true },
];

// Source: Ryan's AI rant, July 2026. Every claim below is his.
export const aiProjects = {
  eyebrow: "Applied AI",
  headline: "AI, applied with intention.",
  intro:
    "We start with governance, not gadgets. Appropriate use policies ratified at the board level, staff training, and an ethics framework grounded in a commissioned Deloitte study. Then we put AI to work on things that matter.",
  items: [
    {
      status: "Proof of concept",
      title: "Ask your ancestors",
      body: "Decades of oral histories, transcribed and translated by AI, then made fully searchable. Our proof of concept for the Nikkei National Museum means you can ask a question and find the answer in the voices of the people who lived it.",
    },
    {
      status: "Business case underway",
      title: "AI that never leaves the building",
      body: "Fifty years of archival backlog, some of it sensitive. We are building the business case for sovereign AI: local models that describe, transcribe, and flag sensitive content on site, so nothing gets shipped to servers the community never agreed to.",
    },
    {
      status: "Delivered",
      title: "Six months of research, done in 45 minutes",
      body: "The museum needed a master subject index for its new collections system, an effort that would normally take three to six months. A deep research pass covered more than 800 sources in 45 minutes, without sacrificing the museum's brand or integrity.",
    },
  ],
};

export const footerCta = {
  headline: "Ready to Start?",
  // TODO: copywriter pass on this line (flagged awkward but acceptable, spec 5.8)
  subline: "Let's Build Something Worth Building",
  button: "Get in Touch",
  href: "/contact",
};

/* ============ ABOUT ============ */

export const about = {
  heroLine1: "Our work begins and ends with people.",
  heroLine2: "Technology is just the bridge.",
  heroAttribution: "Ryan Yada, Founder and Principal Progressor",
  whoWeAre: {
    eyebrow: "Who We Are",
    headline: "Built on trust, guided by heart.",
    paragraphs: [
      "At RYŌSHIN Solutions, we believe meaningful progress is built on trust, integrity, and human connection. The Japanese word ryōshin carries two meanings: good heart, and parents. Both guide everything we do.",
      "We partner with leaders, organizations, and communities to design and deliver solutions that serve both today's needs and tomorrow's possibilities. From strategic consulting to innovative technology platforms, our work is intentional, collaborative, and built to last.",
      "Founded by Ryan Yada, Principal Progressor, RYŌSHIN Solutions draws on decades of experience in strategy, technology, and community development. Ryan's vision is simple: solutions should not only solve problems, but also reflect the values of the people and communities they serve.",
    ],
  },
  founder: {
    eyebrow: "The Founder",
    headline: "I'm Ryan Yada.",
    title: "Principal Progressor · Co-pilot",
    // cropped per Ryan's July 2026 critique: head to mid-shin, no shoes,
    // tighter perspective. original kept at /images/ryan-yada.jpg
    photo: "/images/ryan-yada-crop.jpg",
    paragraphs: [
      'I\'ve never been drawn to doing things the "standard" way. Throughout my career, I\'ve given myself titles like Solution Investor, Imagineer, Co-pilot, and now Principal Progressor, because what I do doesn\'t fit neatly into a box.',
      "My work has taken me from leading large-scale projects in the corporate world to helping cultural institutions preserve heritage stories, to building innovative platforms that connect communities. Along the way, I've learned that progress isn't just about speed or efficiency. It's about moving in the right direction, for the right reasons.",
      "I approach every project with curiosity, creativity, and a strong commitment to integrity. My goal is to connect people, ideas, and technology in a way that makes a measurable difference, not just for today but for years to come.",
    ],
    cta: "Work with Ryōshin",
  },
  // Spec 8.1: the Japanese lesson block. Precise, teaches, native-speaker
  // review REQUIRED before launch (note in PR description).
  japaneseLesson: {
    eyebrow: "The Name",
    headline: "Two words, one sound.",
    entries: [
      {
        kanji: "良心",
        kana: "りょうしん",
        romaji: "ryōshin",
        pronunciation: "say it: ryoh-sheen",
        literal: 'Conscience. Literally "good heart."',
        meaning:
          "Solutions rooted in integrity and a moral compass. We ask whether we are solving the right problems, in the right way.",
      },
      {
        kanji: "両親",
        kana: "りょうしん",
        romaji: "ryōshin",
        pronunciation: "same sound, different characters",
        literal: "Parents.",
        meaning:
          "A reminder that our work is about family, community, and the future. Every decision should be one we would be proud to pass forward.",
      },
    ],
  },
  values: {
    eyebrow: "What Guides Us",
    items: [
      {
        kanji: "誠実",
        title: "Integrity",
        body: "Every recommendation, every decision, every relationship. All held to the same standard we'd apply to our own.",
      },
      {
        kanji: "協力",
        title: "Collaboration",
        body: "We don't hand you a plan and step away. We work alongside you, in the room, in the details, through the hard parts.",
      },
      {
        kanji: "影響",
        title: "Impact",
        body: "Success isn't just delivery. It's the lasting difference made in the people, communities, and organizations we work with.",
      },
    ],
  },
};

/* ============ SERVICES ============ */

export const services = {
  heroQuote: "The best solutions don't just solve problems. They create possibilities.",
  heroAttribution: "Ryan Yada, Principal Progressor",
  framework: [
    {
      kanji: "心",
      romaji: "Kokoro",
      title: "The Heart",
      body: "Every organization has a vision for where they want to go. At RYŌSHIN Solutions, we've seen how the right mix of strategy, technology, and collaboration can turn that vision into reality. Our work has taken us into boardrooms, community halls, and innovation labs, always with one goal in mind: to create solutions that serve both people and purpose.",
    },
    {
      kanji: "問題",
      romaji: "Mondai",
      title: "The Challenge",
      body: "Too often, projects get lost in complexity. Technology feels disconnected from the people using it. Strategies look good on paper but stall in execution. Leaders are left juggling competing priorities without the clarity or tools to move forward. When this happens, opportunities are missed and the original vision fades.",
    },
    {
      kanji: "階段",
      romaji: "Kaidan",
      title: "The Steps Forward",
      body: "We bridge the gap between people and technology, ideas and action. Through clear strategy, human-centered design, and hands-on collaboration, we help organizations cut through the noise, focus on what matters, and deliver results they can be proud of. Our solutions are built to last and grounded in integrity.",
    },
  ],
  intro:
    "At RYŌSHIN Solutions, we help leaders, businesses, and organizations turn vision into action. Our expertise spans strategic growth consulting, vision-led project delivery, and the development of systems that scale, from AI and app strategies to stakeholder engagement platforms and impact-tracking dashboards. We design and lead digital transformation initiatives, guide product-market fit, and build cultures where people and technology work well together. Whatever you need, we bring clarity, execution, and results, always with a good heart at the center of the work.",
  list: [
    { title: "Strategic Growth Consulting", body: "Aligning vision, purpose, and measurable goals." },
    { title: "Business & Technology Strategy Development", body: "From market positioning to tech roadmaps." },
    { title: "AI, App, & Digital Platform Strategy", body: "From appropriate use policies to sovereign AI pilots and launches." },
    { title: "Vision-Led Project Management", body: "Delivering projects that connect people and technology." },
    { title: "Digital Transformation & Change Management", body: "Leading organizations through evolution." },
    { title: "Data to Decisions (D2D)", body: "Analysis, dashboarding, and impact measurement." },
    { title: "Program & Community Growth", body: "Systems for engagement, culture, and scalability." },
    { title: "Stakeholder Engagement Systems", body: "Communication, mapping, and reporting solutions." },
  ],
};

/* ============ WORK ============ */

export const work = {
  heroQuote:
    "Every project is an opportunity to connect people, ideas, and technology in a way that makes a lasting difference.",
  heroAttribution: "Ryan Yada, Principal Progressor",
  intro:
    "At RYŌSHIN Solutions, every project begins with people and purpose. Whether leading multi-million-dollar initiatives, co-founding global startups, or transforming operations inside established enterprises, Ryan's work blends strategic vision with hands-on execution. From cultural preservation to data centers and the Malta Cruise Network, each project is designed to solve complex problems, create lasting impact, and leave organizations stronger than before.",
  caseStudies: [
    {
      id: "nnmcc",
      client: "Nikkei National Museum & Cultural Centre",
      image: "/images/work-nikkei.jpg",
      logo: "/images/logo-nnmcc.png",
      blocks: [
        {
          title: "NNMCC Heritage Hub Project",
          body: "A multi-million-dollar initiative to ensure the legacies of the Japanese Canadian community are never lost. Ryan led the development of innovative proof-of-concept AI tools to capture, organize, and share these stories for generations to come.",
        },
        {
          title: "Internment Bus Tour",
          body: "In just weeks, we brought together a talented team, hit the road, and set out to capture a living piece of history. Using drones, multiple cameras, and immersive 360° technology, we documented voices, landscapes, and moments that might otherwise fade away, turning a small project into an enduring record of resilience and memory.",
        },
      ],
      // Source: Ryan's AI rant, July 2026
      highlights: [
        "Over $2 million saved on a $3.5M collections system through formal requirements and RFP",
        "AI appropriate use policy and standards, ratified by the board, with staff training",
        "Ethics and governance framework built on a commissioned Deloitte study",
        "Online internment camp tour, 3D exhibit walkthrough, and the Story Lab course",
      ],
    },
    {
      id: "flowmotion",
      client: "Flowmotion Entertainment",
      image: "/images/logo-flowmotion.png",
      logo: null,
      blocks: [
        {
          title: "Co-founder and co-pilot",
          body: "As co-founder and co-pilot of this global tech startup, Ryan helped build an international remote team of over 50 talented professionals, raised investor funding, and brought joy to more than 50 million players across every country on the planet. Through a partnership with Backpack Buddies, the company provided over 45,000 meals to hungry children, while collaborating with development studios worldwide to publish more than 100 digital games.",
        },
      ],
      highlights: [
        "50M+ players reached globally",
        "50+ international team members",
        "45,000+ meals provided through Backpack Buddies",
        "100+ digital games published",
      ],
    },
    {
      id: "ledcor",
      client: "Ledcor Group",
      image: "/images/logo-ledcor.png",
      logo: null,
      blocks: [
        {
          title: "Intrapreneur and solution investor",
          body: "Over five years at Ledcor, Ryan served as an intrapreneur and solution investor, leading transformative projects that made operations safer, more profitable, more sustainable, and more productive.",
        },
      ],
      highlights: [
        "Mobile workforce solution that increased productivity by 33% and halved the order-to-cash cycle, earning a CIO100 nomination",
        "ERP safety incident management system that won a Ledcor Innovation Award",
        "Launched the company's first Green Team and Sustainability Program",
        "Implemented an enterprise-wide CRM managing a multi-billion-dollar sales funnel",
        "Developed payroll and billing automation that improved NIBT by 3%",
      ],
    },
  ],
  closingCta: {
    headline: "Let's create your success story.",
    body: "Whether you're looking to build a new platform, strengthen your leadership, or connect your community, we're ready to help turn your vision into reality.",
    button: "Start Your Project",
    href: "/contact",
  },
};

/* ============ CONTACT ============ */

export const contactPage = {
  headline: "How can we help?",
  body: "If you have a business inquiry or any questions about RYŌSHIN Solutions, we'd love to hear from you.",
  inquiryOptions: [
    "Leadership / Organizational Consulting",
    "Technology & Innovation Solutions",
    "Community Development Partnership",
    "Project Collaboration Opportunity",
    "Media / Interview Request",
    "Speaking Request",
    "General Inquiry",
  ],
  messageMaxLength: 350,
  testimonial: {
    quote:
      "Working with Ryan was a rewarding time in my professional career. It has been inspiring to watch Ryan create his team of talented people and create solutions for many business problems. His ability to help people work through complex issues, be a leader of organizational change, and challenge the status quo are second to none. Ryan is a rare kind of visionary who embraces a heart centred approach to his business and personal life.",
    name: "Alex G.",
  },
};

/* ============ EMAIL CAPTURE ============ */

export const emailCapture = {
  headline: "Stay Ahead. Lead with Impact.",
  body: "Join our insider list for strategy insights, community stories, and perspectives on what it means to lead with a good heart.",
  placeholder: "Your email address",
  button: "Join the List",
  // MailerLite integration deferred. Form is a styled stub.
};
