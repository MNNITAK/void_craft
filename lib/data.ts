export const services = [
  {
    id: "ai-automation",
    title: "AI Automation",
    description:
      "We find the work your team shouldn't be doing and hand it to machines — quoting, follow-ups, reporting, reconciliation. Quietly, reliably, every day.",
    icon: "bolt",
  },
  {
    id: "voice-agents",
    title: "AI Voice Agents",
    description:
      "Phone agents that answer instantly, book appointments, qualify callers, and never put a customer on hold. Your front desk, available at 3am.",
    icon: "wave",
  },
  {
    id: "custom-agents",
    title: "Custom AI Agents",
    description:
      "Purpose-built agents wired into your data and tools — researching, triaging, drafting, deciding — with guardrails your compliance team will sign off on.",
    icon: "spark",
  },
  {
    id: "web-mobile",
    title: "Web & Mobile Apps",
    description:
      "Product-grade applications your customers actually enjoy using. Fast, accessible, and built to survive your growth curve.",
    icon: "layers",
  },
  {
    id: "internal-tools",
    title: "Internal Tools & CRMs",
    description:
      "The operating system for your business — pipelines, approvals, customer records — replacing the spreadsheet sprawl that's slowing you down.",
    icon: "grid",
  },
  {
    id: "saas",
    title: "SaaS Products",
    description:
      "From napkin sketch to paying subscribers. We architect, design, and ship SaaS products with billing, auth, and analytics done right the first time.",
    icon: "cube",
  },
  {
    id: "data-dashboards",
    title: "Dashboards & Analytics",
    description:
      "One screen that tells you the truth about your business. Live pipelines, clean models, and numbers everyone finally agrees on.",
    icon: "chart",
  },
  {
    id: "cloud-integrations",
    title: "Cloud, APIs & Integrations",
    description:
      "Backends that don't wake you up at night. We connect your stack end-to-end and build infrastructure that scales without drama.",
    icon: "cloud",
  },
] as const;

export const metrics = [
  { value: 100, suffix: "+", label: "Clients across India" },
  { value: 130, suffix: "+", label: "Projects shipped" },
  { value: 60, suffix: "+", label: "Automations in production" },
  { value: 15, suffix: "k+", label: "Hours saved for clients every year" },
] as const;

/* Industries we've actually shipped for — honest, not logo-wall theatre. */
export const clients = [
  "DENTAL & CLINICS",
  "REAL ESTATE",
  "RESTAURANTS & CLOUD KITCHENS",
  "DIAGNOSTICS LABS",
  "LOGISTICS & STAFFING",
  "RETAIL & D2C",
  "SALONS & WELLNESS",
  "EDUCATION & COACHING",
  "MANUFACTURING",
  "PROFESSIONAL SERVICES",
] as const;

/* The event stream — left: things that happen in a business,
   right: what Void Craft systems do about them. */
export const streamEvents = [
  { trigger: "INBOUND CALL RECEIVED", action: "APPOINTMENT BOOKED" },
  { trigger: "LEAD CAPTURED", action: "FOLLOW-UP SENT IN 90S" },
  { trigger: "INVOICE UPLOADED", action: "SYNCED TO ERP" },
  { trigger: "CV SUBMITTED", action: "INTERVIEW SCHEDULED" },
  { trigger: "ORDER PLACED", action: "SENT TO POS" },
  { trigger: "TICKET OPENED", action: "REPLY DRAFTED" },
  { trigger: "PAYMENT FAILED", action: "RECOVERY FLOW STARTED" },
  { trigger: "STOCK RUNNING LOW", action: "REORDER TRIGGERED" },
  { trigger: "FORM SUBMITTED", action: "CRM UPDATED" },
  { trigger: "MEETING REQUESTED", action: "CALENDAR CONFIRMED" },
  { trigger: "ANOMALY DETECTED", action: "ALERT ROUTED" },
  { trigger: "REFUND REQUESTED", action: "CASE ESCALATED TO HUMAN" },
  { trigger: "SHIFT GAP FOUND", action: "ROSTER REBALANCED" },
  { trigger: "REPORT DUE", action: "REPORT WRITTEN & SENT" },
  { trigger: "NO-SHOW PREDICTED", action: "REMINDER SEQUENCE FIRED" },
  { trigger: "CONTRACT SIGNED", action: "ONBOARDING KICKED OFF" },
] as const;

export type CaseStudy = {
  id: string;
  tag: string;
  title: string;
  client: string;
  hook: string;
  problem: string;
  solution: string;
  stack: readonly string[];
  impact: readonly { value: string; label: string }[];
  hue: string;
  events: readonly string[];
  /** Path under /public — drop real product screenshots here later. */
  image: string | null;
};

export const caseStudies: readonly CaseStudy[] = [
  {
    id: "ai-receptionist",
    tag: "AI Receptionist",
    title: "The receptionist that never misses a call",
    client: "Dental clinic chain, Pune · 4 branches",
    hook: "Every missed call was a new patient calling the next clinic on the list.",
    problem:
      "Four clinics, one overwhelmed front desk. 38% of inbound calls went to voicemail — most of them new patients who simply called the next clinic on the list.",
    solution:
      "A voice agent that answers every call in under two seconds, books directly into the practice calendar, handles rescheduling and insurance questions, and hands off edge cases to staff with full context.",
    stack: ["Voice AI", "Twilio", "Next.js", "Calendar Sync", "DPDP-ready infra"],
    impact: [
      { value: "0", label: "missed calls in 6 months" },
      { value: "+31%", label: "new patient bookings" },
    ],
    hue: "from-[#0B4FFF]/80 to-[#06277F]",
    events: ["INBOUND CALL 00:02", "INTENT: NEW PATIENT", "SLOT BOOKED ✓"],
    image: null,
  },
  {
    id: "lead-engine",
    tag: "Lead Automation",
    title: "A lead engine that follows up in ninety seconds",
    client: "Real-estate brokerage, Gurugram",
    hook: "Nine hours to answer a lead. Buyers had already toured with someone else.",
    problem:
      "Leads from six portals landed in six inboxes. Average first response: 9 hours. By then, buyers had already toured with someone else.",
    solution:
      "Unified lead capture with AI qualification, instant personalized outreach across SMS and email, and routing that puts hot buyers on an agent's phone while they're still browsing.",
    stack: ["LLM Pipelines", "CRM Integration", "SMS/Email", "Scoring Models"],
    impact: [
      { value: "90s", label: "median first response" },
      { value: "2.3×", label: "lead-to-viewing rate" },
    ],
    hue: "from-[#FF4D2E]/70 to-[#5E1265]",
    events: ["LEAD CAPTURED", "SCORE: 94 / HOT", "AGENT NOTIFIED ✓"],
    image: null,
  },
  {
    id: "healthcare-dashboard",
    tag: "Lab Operations Dashboard",
    title: "One screen for a lab chain's whole operation",
    client: "Diagnostics lab chain, Hyderabad · 3 centres",
    hook: "Leadership was steering three busy labs with a weekly Excel.",
    problem:
      "Sample volumes, technician rosters, and machine downtime lived in five spreadsheets and one weekly Excel. Leadership was steering three busy labs by looking in the rear-view mirror.",
    solution:
      "A live operations dashboard unifying bookings, machine throughput, and staffing — with anomaly alerts that flag tomorrow's report backlog today.",
    stack: ["Data Pipelines", "React", "Postgres", "Forecasting Models"],
    impact: [
      { value: "-27%", label: "report turnaround time" },
      { value: "5→1", label: "systems consolidated" },
    ],
    hue: "from-[#3DDC97]/70 to-[#0E4749]",
    events: ["SAMPLE LOAD 82%", "FORECAST: +120 SAMPLES", "ALERT ROUTED ✓"],
    image: null,
  },
  {
    id: "restaurant-ordering",
    tag: "Restaurant AI Ordering",
    title: "Phone orders, without the phone tag",
    client: "Cloud kitchen brand, Bengaluru · 6 outlets",
    hook: "Staff juggling handsets over a fryer while orders walked away.",
    problem:
      "Peak-hour phone orders meant staff juggling handsets over a fryer. Long holds, wrong orders, abandoned calls — and a POS that never knew about any of it.",
    solution:
      "An AI ordering line that takes complex orders conversationally, upsells with taste, pushes tickets straight into the POS, and texts customers when food is ready.",
    stack: ["Voice AI", "POS Integration", "Payments", "SMS"],
    impact: [
      { value: "+22%", label: "average order value" },
      { value: "100%", label: "orders reaching POS" },
    ],
    hue: "from-[#FFB020]/70 to-[#7A2E0E]",
    events: ["ORDER: 4 ITEMS", "UPSELL ACCEPTED", "SENT TO POS ✓"],
    image: null,
  },
  {
    id: "recruitment-automation",
    tag: "Recruitment Automation",
    title: "Screening 1,500 CVs a month without burning out a team",
    client: "Staffing agency, Mumbai",
    hook: "Strong candidates waited two weeks for a reply — and took other offers.",
    problem:
      "Every hiring wave buried recruiters in CVs. Strong candidates waited two weeks for a reply and took other offers; the funnel leaked at every stage.",
    solution:
      "An automated pipeline that parses, scores, and shortlists candidates, schedules interviews around recruiter calendars, and keeps every applicant warm with human-sounding updates.",
    stack: ["LLM Screening", "ATS Integration", "Scheduling", "Analytics"],
    impact: [
      { value: "-70%", label: "time-to-shortlist" },
      { value: "8 days", label: "faster average hire" },
    ],
    hue: "from-[#5C86FF]/70 to-[#0E1D55]",
    events: ["CV PARSED", "MATCH: 88%", "INTERVIEW SET ✓"],
    image: null,
  },
];

export const processSteps = [
  {
    id: "01",
    title: "Discovery",
    description:
      "We map how your business actually runs — not the org chart, the reality. Where time goes, where money leaks, where intelligence would compound.",
  },
  {
    id: "02",
    title: "Strategy",
    description:
      "A build plan ranked by return, not by novelty. You'll know what we're building, why it wins, and what it's worth before a line of code exists.",
  },
  {
    id: "03",
    title: "Design",
    description:
      "Interfaces and system architecture designed together, so what's beautiful is also buildable — and what's buildable stays beautiful at scale.",
  },
  {
    id: "04",
    title: "Development",
    description:
      "Senior engineers shipping in weekly increments you can see and touch. No black box, no big reveal, no surprises in month three.",
  },
  {
    id: "05",
    title: "Deployment",
    description:
      "Launches that are boring in the best way — tested, monitored, documented, and handed over with your team trained to run it.",
  },
  {
    id: "06",
    title: "Optimization",
    description:
      "Live systems get smarter. We watch the data, tune the models, and keep compounding the return long after launch day.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "The voice agent books patients while my staff looks after the ones in the chair. We haven't missed a new-patient call since it went live.",
    name: "Dr. Meera Kulkarni",
    role: "Co-founder, dental clinic chain, Pune",
  },
  {
    quote:
      "Leads that used to wait hours now get a call back in under two minutes. My agents walk into every conversation already knowing the requirement.",
    name: "Rohan Malhotra",
    role: "Partner, real-estate brokerage, Gurugram",
  },
  {
    quote:
      "They asked about our margins before they asked about our tech stack. Eighteen months later, they're still the first call we make.",
    name: "Anjali Nair",
    role: "Director, diagnostics lab chain, Hyderabad",
  },
  {
    quote:
      "Our operations ran on WhatsApp and spreadsheets. Now there's one dashboard the whole team actually uses — adoption took a week, not a quarter.",
    name: "Siddharth Jain",
    role: "Founder, cloud kitchen brand, Bengaluru",
  },
] as const;

export const faqs = [
  {
    q: "How fast can you ship?",
    a: "Most engagements produce something working in the first two to three weeks — a live automation, a functional prototype, a callable voice agent. Full products typically ship in six to twelve weeks depending on scope. We work in weekly increments, so you're never waiting for a big reveal.",
  },
  {
    q: "What does an engagement cost?",
    a: "Focused automations and agents are priced for Indian SMBs — most start in the tens of thousands of rupees, not lakhs. Full products and platforms scale with scope. Every proposal is anchored to a business case — if we can't show a credible path to the system paying for itself, we'll tell you not to build it.",
  },
  {
    q: "Do we need to be 'AI-ready' to work with you?",
    a: "No. Most of our clients start with scattered data and manual processes — that's exactly the starting point we design for. Part of our job is putting the foundations in place while delivering value from week one.",
  },
  {
    q: "Who owns the code and the models?",
    a: "You do. Full stop. Everything we build — code, infrastructure, prompts, documentation — is delivered into accounts you control. No lock-in, no hostage licensing.",
  },
  {
    q: "How do you handle data privacy and security?",
    a: "Security is designed in, not bolted on: least-privilege access, encrypted data in transit and at rest, and architectures that keep sensitive data inside your boundary. For regulated industries we build to your compliance requirements from day one.",
  },
  {
    q: "What happens after launch?",
    a: "Systems that learn need partners that stay. Most clients keep us on a lightweight optimization retainer — monitoring, model tuning, and a roadmap of compounding improvements. But everything is documented so your team can run it without us.",
  },
] as const;
