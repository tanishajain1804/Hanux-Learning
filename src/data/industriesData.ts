export interface IndustryCardMetric {
  label: string;
  value: string;
  isNegative?: boolean;
  statusColor?: "red" | "yellow" | "green";
}

export interface IndustryCard {
  title: string;
  healthScore: number;
  healthLabel: string;
  healthColor: "pink" | "yellow" | "green";
  metrics: IndustryCardMetric[];
  characterBgColor: string;
  characterType: "stressed" | "active" | "growing";
}

export interface IndustryService {
  icon: string;
  title: string;
  desc: string;
  color?: string;
}

export interface IndustryStep {
  icon: string;
  title: string;
  desc: string;
}

export interface IndustryTestimonial {
  stars: number;
  quote: string;
  author: string;
  role: string;
  initials: string;
  color: string;
}

export interface IndustryData {
  key: string;
  title: string;
  breadcrumb: string;
  tagline: string;
  eyebrow: string;
  illustrationTheme: "fintech" | "edtech" | "healthtech" | "startups" | "ecommerce" | "manufacturing" | "real-estate" | "logistics" | "legal" | "consulting" | "marketing" | "non-profit" | "booking";
  expertiseTitle: string;
  expertiseParagraphs: string[];
  cards: IndustryCard[];
  services: IndustryService[];
  steps: IndustryStep[];
  testimonials: IndustryTestimonial[];
  ctaTitle: string;
  ctaDesc: string;
}

export const industriesDataMap: Record<string, IndustryData> = {
  fintech: {
    key: "fintech",
    title: "Best FinTech Software Development in Noida",
    breadcrumb: "Home / Industries / FinTech",
    tagline: "Build secure and scalable platforms with the Best FinTech Software Development tailored for modern financial businesses.",
    eyebrow: "Our Expertise",
    illustrationTheme: "fintech",
    expertiseTitle: "Leading FinTech Development Company",
    expertiseParagraphs: [
      "At Bhoomi Techzone, we assist companies innovate in the rapidly expanding financial environment by offering the best fintech software development services . Digital banking, payment solutions, blockchain, lending platforms, and cutting-edge financial technologies are among our areas of competence.",
      "We are aware of the intricacies of the financial industry, including scalability, real-time data processing, security, and compliance. Building safe, scalable, and user-friendly solutions with bank-grade security, flawless performance, and a solid architecture that can effectively handle millions of transactions is our main focus."
    ],
    cards: [
      {
        title: "HIGH RISK CLIENT",
        healthScore: 32,
        healthLabel: "BUSINESS HEALTH",
        healthColor: "pink",
        characterBgColor: "#F43F5E",
        characterType: "stressed",
        metrics: [
          { label: "CASH FLOW HEALTH", value: "Poor", statusColor: "red" },
          { label: "AVG. MONTHLY REVENUE", value: "12,090" },
          { label: "UNRECONCILED", value: "35" },
          { label: "CASH IN 6 MONTHS", value: "1,049" },
          { label: "OVERDUE INVOICES", value: "2,033" },
          { label: "UNPAID BILLS %", value: "2%" }
        ]
      },
      {
        title: "MEDIUM RISK CLIENT",
        healthScore: 57,
        healthLabel: "BUSINESS HEALTH",
        healthColor: "yellow",
        characterBgColor: "#F59E0B",
        characterType: "active",
        metrics: [
          { label: "CASH FLOW HEALTH", value: "Fair", statusColor: "yellow" },
          { label: "AVG. MONTHLY REVENUE", value: "12,090" },
          { label: "UNRECONCILED", value: "35" },
          { label: "CASH IN 6 MONTHS", value: "1,049" },
          { label: "OVERDUE INVOICES", value: "2,033" },
          { label: "UNPAID BILLS %", value: "2%" }
        ]
      },
      {
        title: "OPPORTUNITY CLIENT",
        healthScore: 87,
        healthLabel: "BUSINESS HEALTH",
        healthColor: "green",
        characterBgColor: "#10B981",
        characterType: "growing",
        metrics: [
          { label: "CASH FLOW HEALTH", value: "Excellent", statusColor: "green" },
          { label: "AVG. MONTHLY REVENUE", value: "32,409" },
          { label: "UNRECONCILED", value: "3" },
          { label: "CASH IN 6 MONTHS", value: "43,091" },
          { label: "OVERDUE INVOICES", value: "1,200" },
          { label: "UNPAID BILLS %", value: "23%" }
        ]
      }
    ],
    services: [
      { icon: "🏦", title: "Digital Banking", desc: "Core banking systems, neobank apps, multi-currency wallets, and account management platforms.", color: "#D1FAE5" },
      { icon: "💳", title: "Payment Gateways", desc: "High-throughput payment rails, UPI, card processing, and real-time settlement systems.", color: "#D1FAE5" },
      { icon: "⛓️", title: "Blockchain & DeFi", desc: "Smart contracts, DeFi protocols, NFT marketplaces, tokenization, and Web3 wallets.", color: "#D1FAE5" },
      { icon: "📈", title: "Lending Platforms", desc: "P2P lending, BNPL, credit scoring models, and loan origination systems.", color: "#D1FAE5" },
      { icon: "🤖", title: "AI Risk Analytics", desc: "Fraud detection, AML compliance, risk scoring, and behavioural analytics.", color: "#D1FAE5" },
      { icon: "📊", title: "WealthTech & Trading", desc: "Robo-advisors, algo trading platforms, portfolio management, and market data APIs.", color: "#D1FAE5" }
    ],
    steps: [
      { icon: "🔍", title: "Discovery & Scoping", desc: "Deep-dive into compliance, architecture, and business model requirements." },
      { icon: "🎨", title: "Design & Prototype", desc: "UX flows, API design, and security architecture approved before build." },
      { icon: "⚙️", title: "Agile Engineering", desc: "2-week sprints with continuous security testing and compliance checks." },
      { icon: "🚀", title: "Launch & Scale", desc: "Zero-downtime deployment, 24/7 monitoring, and compliance audits." }
    ],
    testimonials: [
      { stars: 5, quote: "HanuxTech delivered our core banking platform 3 weeks ahead of schedule. The security architecture is exceptional — exactly what we needed for RBI compliance.", author: "Rahul Kapoor", role: "CTO, NovaPay Fintech", initials: "RK", color: "#10B981" },
      { stars: 5, quote: "The DeFi protocol processes 50,000 transactions daily with zero downtime. Their blockchain expertise is genuinely world-class.", author: "Priya Sharma", role: "Founder, ChainVault Labs", initials: "PS", color: "#1B4FD8" },
      { stars: 5, quote: "Our fraud detection went from 78% to 99.2% after their AI risk engine. The ROI in Q1 alone paid for 3 years of development.", author: "Arjun Mehta", role: "VP Engineering, SecureLend", initials: "AM", color: "#10B981" }
    ],
    ctaTitle: "Need a Custom FinTech Solution?",
    ctaDesc: "Let's build secure, compliant financial infrastructure — together."
  },
  edtech: {
    key: "edtech",
    title: "Modern EdTech Software Development in Noida",
    breadcrumb: "Home / Industries / EdTech",
    tagline: "Build immersive learning management systems (LMS), virtual classrooms, and educational software designed for modern schools.",
    eyebrow: "Learning Innovation",
    illustrationTheme: "edtech",
    expertiseTitle: "Empowering Students and Educators",
    expertiseParagraphs: [
      "We design state-of-the-art education platforms that make collaborative study, remote classes, and automated grading a breeze. From online schools to university dashboards, our systems are optimized for video stream delivery and real-time interactive engagement.",
      "Our solutions combine AI-personalized learning tracks, smart quiz builders, and advanced analytics matrices to help school networks analyze performance trends and maintain active engagement from day one."
    ],
    cards: [
      {
        title: "AT-RISK STUDENT",
        healthScore: 38,
        healthLabel: "STUDENT ENGAGEMENT",
        healthColor: "pink",
        characterBgColor: "#F43F5E",
        characterType: "stressed",
        metrics: [
          { label: "ATTENDANCE RATE", value: "62%", statusColor: "red" },
          { label: "AVERAGE GRADE", value: "D+" },
          { label: "COMPLETED QUIZZES", value: "4 / 10", isNegative: true },
          { label: "MISSING LABS", value: "6", isNegative: true },
          { label: "FORUM DISCUSSIONS", value: "1 Post" },
          { label: "WEEKLY STUDY TIME", value: "1.2 hrs" }
        ]
      },
      {
        title: "STEADY PROGRESS",
        healthScore: 74,
        healthLabel: "STUDENT ENGAGEMENT",
        healthColor: "yellow",
        characterBgColor: "#F59E0B",
        characterType: "active",
        metrics: [
          { label: "ATTENDANCE RATE", value: "91%", statusColor: "yellow" },
          { label: "AVERAGE GRADE", value: "B" },
          { label: "COMPLETED QUIZZES", value: "9 / 10" },
          { label: "MISSING LABS", value: "0" },
          { label: "FORUM DISCUSSIONS", value: "12 Posts" },
          { label: "WEEKLY STUDY TIME", value: "6.5 hrs" }
        ]
      },
      {
        title: "HONORS CANDIDATE",
        healthScore: 96,
        healthLabel: "STUDENT ENGAGEMENT",
        healthColor: "green",
        characterBgColor: "#10B981",
        characterType: "growing",
        metrics: [
          { label: "ATTENDANCE RATE", value: "99%", statusColor: "green" },
          { label: "AVERAGE GRADE", value: "A+" },
          { label: "COMPLETED QUIZZES", value: "10 / 10" },
          { label: "MISSING LABS", value: "0" },
          { label: "FORUM DISCUSSIONS", value: "48 Posts" },
          { label: "WEEKLY STUDY TIME", value: "14.8 hrs" }
        ]
      }
    ],
    services: [
      { icon: "🎓", title: "LMS Platforms", desc: "Full-featured Learning Management Systems with course authoring, progress tracking, and certification workflows.", color: "#F5F3FF" },
      { icon: "📹", title: "Live Virtual Classrooms", desc: "Low-latency WebRTC video, screen sharing, breakout rooms, and interactive whiteboards that handle 10,000 concurrent students.", color: "#F5F3FF" },
      { icon: "🤖", title: "AI Adaptive Learning", desc: "AI engines that personalise content difficulty, pacing, and format based on each learner's real-time performance data.", color: "#F5F3FF" },
      { icon: "📝", title: "Assessment & Proctoring", desc: "Anti-cheat proctoring, auto-graded quizzes, rubric-based assignments, and instant feedback systems.", color: "#F5F3FF" },
      { icon: "📊", title: "Learning Analytics", desc: "Deep dashboards for administrators, instructors, and learners — from course completion to skill gap analysis.", color: "#F5F3FF" },
      { icon: "📱", title: "Mobile Learning Apps", desc: "Offline-capable iOS and Android apps with micro-learning modules, push notifications, and gamification.", color: "#F5F3FF" }
    ],
    steps: [
      { icon: "🔍", title: "Curriculum Mapping", desc: "Understand your pedagogical goals and map them to technical features." },
      { icon: "🎨", title: "UX for Learning", desc: "Design interfaces that reduce cognitive load and maximise engagement." },
      { icon: "⚙️", title: "Platform Build", desc: "Scalable backend, real-time features, and mobile apps in parallel." },
      { icon: "🧪", title: "Pilot & Scale", desc: "Run with 100 students, then scale to 1 million — zero re-architecture." }
    ],
    testimonials: [
      { stars: 5, quote: "Our platform serves 2 million students across 14 countries. HanuxTech built it, and it's never had an outage during exam season. Truly remarkable engineering.", author: "Dr. Sunita Rao", role: "CTO, EduGlobal", initials: "SR", color: "#7C3AED" },
      { stars: 5, quote: "The AI tutor they built for us improved student test scores by 34% in the first semester. The personalisation engine is unlike anything in the market.", author: "James Okafor", role: "Head of Product, LearnWave", initials: "JO", color: "#EC4899" },
      { stars: 5, quote: "Our live classroom platform scaled from 500 to 50,000 concurrent users in a weekend thanks to HanuxTech's infrastructure. Zero downtime, zero panic.", author: "Meera Iyer", role: "Founder, ClassSpark", initials: "MI", color: "#7C3AED" }
    ],
    ctaTitle: "Build the EdTech Platform of the Future",
    ctaDesc: "Whether you're a solo founder or an established institution — let's build learning technology that actually works."
  },
  healthtech: {
    key: "healthtech",
    title: "Secure HealthTech Software Development in Noida",
    breadcrumb: "Home / Industries / HealthTech",
    tagline: "Build HIPAA-compliant telemedicine portals, electronic health records (EHR), and custom clinic workflows.",
    eyebrow: "Digital Healthcare",
    illustrationTheme: "healthtech",
    expertiseTitle: "Patient Care Optimization Platforms",
    expertiseParagraphs: [
      "We design systems that connect physicians and patients securely. HIPAA compliance, patient record protection, real-time vital tracking, and telemedicine audio-video streaming are standard parts of our building blocks.",
      "Our team integrates electronic health databases, billing systems, and medical analytics APIs so hospitals and clinics can operate with zero data loss, minimal administrative overhead, and improved diagnostic results."
    ],
    cards: [
      {
        title: "CRITICAL ALERT PATIENT",
        healthScore: 29,
        healthLabel: "PATIENT VITAL HEALTH",
        healthColor: "pink",
        characterBgColor: "#F43F5E",
        characterType: "stressed",
        metrics: [
          { label: "VITAL COMPLIANCE", value: "Critical", statusColor: "red" },
          { label: "HEART RATE", value: "118 bpm" },
          { label: "BLOOD PRESSURE", value: "162 / 98", isNegative: true },
          { label: "OXYGEN SATURATION", value: "88%", isNegative: true },
          { label: "SLEEP INDEX", value: "3.2 hrs" },
          { label: "MEDICATION ADHERENCE", value: "40%" }
        ]
      },
      {
        title: "MONITORED PATIENT",
        healthScore: 68,
        healthLabel: "PATIENT VITAL HEALTH",
        healthColor: "yellow",
        characterBgColor: "#F59E0B",
        characterType: "active",
        metrics: [
          { label: "VITAL COMPLIANCE", value: "Stable", statusColor: "yellow" },
          { label: "HEART RATE", value: "82 bpm" },
          { label: "BLOOD PRESSURE", value: "132 / 85" },
          { label: "OXYGEN SATURATION", value: "96%" },
          { label: "SLEEP INDEX", value: "6.4 hrs" },
          { label: "MEDICATION ADHERENCE", value: "90%" }
        ]
      },
      {
        title: "OPTIMIZED DISCHARGE",
        healthScore: 92,
        healthLabel: "PATIENT VITAL HEALTH",
        healthColor: "green",
        characterBgColor: "#10B981",
        characterType: "growing",
        metrics: [
          { label: "VITAL COMPLIANCE", value: "Excellent", statusColor: "green" },
          { label: "HEART RATE", value: "68 bpm" },
          { label: "BLOOD PRESSURE", value: "118 / 78" },
          { label: "OXYGEN SATURATION", value: "99%" },
          { label: "SLEEP INDEX", value: "8.1 hrs" },
          { label: "MEDICATION ADHERENCE", value: "100%" }
        ]
      }
    ],
    services: [
      { icon: "📱", title: "Telemedicine Platforms", desc: "HD video consultations, e-prescriptions, lab result sharing, and follow-up scheduling.", color: "#FEE2E2" },
      { icon: "📋", title: "EHR / EMR Systems", desc: "Longitudinal patient records, clinical decision support, ABDM integration, and multi-specialty workflows.", color: "#FEE2E2" },
      { icon: "🧬", title: "AI Diagnostics", desc: "Radiology AI, symptom checkers, risk stratification models, and clinical NLP for unstructured notes.", color: "#FEE2E2" },
      { icon: "💊", title: "Pharmacy & RCM", desc: "Pharmacy management, insurance claims automation, and revenue cycle management.", color: "#FEE2E2" },
      { icon: "❤️", title: "Remote Patient Monitoring", desc: "IoT device integration, vital sign tracking, alert systems, and chronic disease management.", color: "#FEE2E2" },
      { icon: "🏥", title: "Hospital Management", desc: "Bed management, OT scheduling, staff rostering, and departmental resource planning.", color: "#FEE2E2" }
    ],
    steps: [
      { icon: "🔍", title: "Clinical Workflow Audit", desc: "Map existing clinical workflows to identify digitisation opportunities and risks." },
      { icon: "🔒", title: "Compliance Architecture", desc: "Design HIPAA, ABDM, and HL7-compliant data models and security layers." },
      { icon: "⚙️", title: "Build & Integrate", desc: "Develop, integrate with existing HIS/LIS/PACS systems, and run clinical pilots." },
      { icon: "🏥", title: "Go Live & Train", desc: "Gradual rollout with clinician training, real-time monitoring, and dedicated support." }
    ],
    testimonials: [
      { stars: 5, quote: "The telemedicine platform HanuxTech built now handles 8,000 consultations daily. Clinicians love it, patients love it, and it's HIPAA tight.", author: "Dr. Priya Menon", role: "CMO, CureConnect", initials: "PM", color: "#EF4444" },
      { stars: 5, quote: "Their AI diagnostic tool flagged a rare condition that our radiologists missed in 3 cases. It's genuinely augmenting our clinical capabilities.", author: "Dr. Suresh Rathi", role: "Head of Radiology, Apollo Group", initials: "SR", color: "#F97316" },
      { stars: 5, quote: "We deployed HanuxTech's EHR across 22 hospitals in 8 months. The implementation was flawless and the ABDM integration worked perfectly from day one.", author: "Aniket Shah", role: "CTO, MedChain Health", initials: "AS", color: "#EF4444" }
    ],
    ctaTitle: "Build HealthTech That Saves Lives",
    ctaDesc: "Let's create compliant, clinician-loved healthcare software together."
  },
  startups: {
    key: "startups",
    title: "Launch Your Startup With Expert Tech Partners",
    breadcrumb: "Home / Industries / Startups",
    tagline: "From MVP to market leader — we build the product, infrastructure, and systems that turn your vision into a fundable, scalable company.",
    eyebrow: "Technology / Startups",
    illustrationTheme: "startups",
    expertiseTitle: "Launch Your Startup Excellence",
    expertiseParagraphs: [
      "We've been early technical partners for over 200 startups across SaaS, marketplaces, consumer apps, and deep tech. We understand founder priorities: speed to market, investor readiness, and building a product users actually want to use.",
      "Whether you need a co-founder-level CTO, a design-led MVP, or a full engineering team, we embed into your vision and move fast — with the discipline to build it right the first time."
    ],
    cards: [
      {
        title: "PRE-SEED DECK VIEW",
        healthScore: 35,
        healthLabel: "DECK TRACTION",
        healthColor: "pink",
        characterBgColor: "#F43F5E",
        characterType: "stressed",
        metrics: [
          { label: "VISITOR RETENTION", value: "Low", statusColor: "red" },
          { label: "PITCH VIEWS", value: "48" },
          { label: "AVG. VIEW DURATION", value: "48s", isNegative: true },
          { label: "DOWNLOAD RATE", value: "4%", isNegative: true },
          { label: "MEETING REQUESTS", value: "1" },
          { label: "QUALIFIED LEADS", value: "2" }
        ]
      },
      {
        title: "SEED ROUND ACTIVE",
        healthScore: 71,
        healthLabel: "DECK TRACTION",
        healthColor: "yellow",
        characterBgColor: "#F59E0B",
        characterType: "active",
        metrics: [
          { label: "VISITOR RETENTION", value: "Good", statusColor: "yellow" },
          { label: "PITCH VIEWS", value: "245" },
          { label: "AVG. VIEW DURATION", value: "3m 12s" },
          { label: "DOWNLOAD RATE", value: "22%" },
          { label: "MEETING REQUESTS", value: "8" },
          { label: "QUALIFIED LEADS", value: "14" }
        ]
      },
      {
        title: "SERIES A PIPELINE",
        healthScore: 94,
        healthLabel: "DECK TRACTION",
        healthColor: "green",
        characterBgColor: "#10B981",
        characterType: "growing",
        metrics: [
          { label: "VISITOR RETENTION", value: "Outstanding", statusColor: "green" },
          { label: "PITCH VIEWS", value: "892" },
          { label: "AVG. VIEW DURATION", value: "8m 45s" },
          { label: "DOWNLOAD RATE", value: "62%" },
          { label: "MEETING REQUESTS", value: "43" },
          { label: "QUALIFIED LEADS", value: "78" }
        ]
      }
    ],
    services: [
      { icon: "🗂️", title: "MVP Development", desc: "Prioritised feature scoping, rapid prototyping, and production-grade code delivered in weeks — not months.", color: "#EEF2FF" },
      { icon: "📐", title: "UX & Product Design", desc: "User research, wireframes, and pixel-perfect interfaces that convert first-time visitors into loyal users.", color: "#EEF2FF" },
      { icon: "☁️", title: "Cloud Architecture", desc: "Auto-scaling AWS / GCP infrastructure that handles 10 users or 10 million — engineered to grow with you.", color: "#EEF2FF" },
      { icon: "🤖", title: "AI Feature Integration", desc: "Recommendation engines, LLM-powered features, computer vision — AI built into your product from day one.", color: "#EEF2FF" },
      { icon: "🔒", title: "Security & Compliance", desc: "SOC 2 readiness, penetration testing, and data privacy compliance that satisfies enterprise customers.", color: "#EEF2FF" },
      { icon: "📈", title: "Growth Engineering", desc: "Analytics instrumentation, A/B testing infrastructure, and growth loops engineered into the product layer.", color: "#EEF2FF" }
    ],
    steps: [
      { icon: "💡", title: "Discovery Workshop", desc: "3-day sprint to define scope, users, and technical architecture." },
      { icon: "🎨", title: "Design & Prototype", desc: "Clickable prototype validated with real users before a line of code is written." },
      { icon: "⚡", title: "Rapid Build", desc: "2-week sprints with daily demos. Live staging from week 2 onwards." },
      { icon: "🚀", title: "Launch & Iterate", desc: "Production deploy, app store submission, analytics, and ongoing improvement." }
    ],
    testimonials: [
      { stars: 5, quote: "HanuxTech took our napkin sketch and turned it into a product that got us into YC. They move faster than any agency we've worked with, and the quality is outstanding.", author: "Aryan Mehta", role: "Founder, QuickKart (YC S23)", initials: "AM", color: "#1B4FD8" },
      { stars: 5, quote: "We raised our seed round 3 weeks after launching the MVP HanuxTech built. Investors were blown away by the quality. Best decision we ever made.", author: "Nisha Patel", role: "CEO, HealthLoop", initials: "NP", color: "#6366F1" },
      { stars: 5, quote: "From idea to 10,000 users in 60 days. The team embedded so deeply into our startup that they felt like co-founders. Incredible energy and execution.", author: "Rohan Singh", role: "CTO, Finova", initials: "RS", color: "#1B4FD8" }
    ],
    ctaTitle: "Ready to Build Your Startup?",
    ctaDesc: "Let's turn your idea into a fundable, scalable product. First call is free."
  },
  ecommerce: {
    key: "ecommerce",
    title: "E-Commerce & Retail Software Development in Noida",
    breadcrumb: "Home / Industries / Retail & E-Commerce",
    tagline: "Build custom digital marketplaces, secure checkout flows, inventory systems, and smart recommendations.",
    eyebrow: "Digital Commerce",
    illustrationTheme: "ecommerce",
    expertiseTitle: "Conversion and Retention Optimization",
    expertiseParagraphs: [
      "We design custom retail systems that provide seamless purchasing pathways. Headless commerce integrations, lightning-fast product filtering, secure payment processing, and admin inventory controls are core aspects of our setups.",
      "We implement smart search index databases, recommendation engines, and customer engagement tracking tools to help you minimize cart abandonment and boost average order values."
    ],
    cards: [
      {
        title: "HIGH CART ABANDON",
        healthScore: 28,
        healthLabel: "CHECKOUT HEALTH",
        healthColor: "pink",
        characterBgColor: "#F43F5E",
        characterType: "stressed",
        metrics: [
          { label: "CONVERSION STATUS", value: "Poor", statusColor: "red" },
          { label: "ABANDONED CARTS", value: "542", isNegative: true },
          { label: "CHECKOUT DROP-OFF", value: "76%", isNegative: true },
          { label: "AVERAGE LOAD TIME", value: "5.4s", isNegative: true },
          { label: "REVENUE LOSS EST.", value: "-18,430", isNegative: true },
          { label: "DISCOUNT CODE USAGE", value: "5%" }
        ]
      },
      {
        title: "AVERAGE RETAIL FLOW",
        healthScore: 65,
        healthLabel: "CHECKOUT HEALTH",
        healthColor: "yellow",
        characterBgColor: "#F59E0B",
        characterType: "active",
        metrics: [
          { label: "CONVERSION STATUS", value: "Fair", statusColor: "yellow" },
          { label: "ABANDONED CARTS", value: "128" },
          { label: "CHECKOUT DROP-OFF", value: "32%" },
          { label: "AVERAGE LOAD TIME", value: "1.8s" },
          { label: "REVENUE LOSS EST.", value: "-2,120" },
          { label: "DISCOUNT CODE USAGE", value: "14%" }
        ]
      },
      {
        title: "OPTIMIZED CART CONV",
        healthScore: 91,
        healthLabel: "CHECKOUT HEALTH",
        healthColor: "green",
        characterBgColor: "#10B981",
        characterType: "growing",
        metrics: [
          { label: "CONVERSION STATUS", value: "Excellent", statusColor: "green" },
          { label: "ABANDONED CARTS", value: "12" },
          { label: "CHECKOUT DROP-OFF", value: "8%" },
          { label: "AVERAGE LOAD TIME", value: "0.4s" },
          { label: "REVENUE LOSS EST.", value: "-280" },
          { label: "DISCOUNT CODE USAGE", value: "35%" }
        ]
      }
    ],
    services: [
      { icon: "🛒", title: "Custom Storefronts", desc: "Blazing-fast headless storefronts built on Next.js with sub-2s load times and 95+ Lighthouse scores.", color: "#eff6ff" },
      { icon: "📦", title: "Inventory & OMS", desc: "Real-time inventory across multiple warehouses, automated reorder points, and order management.", color: "#eff6ff" },
      { icon: "🤖", title: "AI Recommendations", desc: "Collaborative filtering, visual search, and personalised homepage experiences that lift AOV.", color: "#eff6ff" },
      { icon: "🏪", title: "POS & Omnichannel", desc: "Unified cart and customer profile across online, in-store, WhatsApp, and social commerce.", color: "#eff6ff" },
      { icon: "🚚", title: "Logistics Integration", desc: "Shiprocket, Delhivery, and custom logistics integration with real-time tracking and SLA management.", color: "#eff6ff" },
      { icon: "📊", title: "Commerce Analytics", desc: "Funnel analysis, RFM segmentation, cohort reports, and real-time revenue dashboards.", color: "#eff6ff" }
    ],
    steps: [
      { icon: "🗺️", title: "Commerce Audit", desc: "Audit existing systems, catalogue structure, and customer journey friction points." },
      { icon: "🎨", title: "Design System", desc: "Build a design system optimised for conversion — CTA placement, trust signals, mobile UX." },
      { icon: "⚙️", title: "Platform Build", desc: "Core commerce engine, integrations, and performance optimisation in parallel." },
      { icon: "🚀", title: "Launch & Optimise", desc: "A/B testing, SEO, performance monitoring, and conversion rate optimisation." }
    ],
    testimonials: [
      { stars: 5, quote: "HanuxTech's headless storefront took our page load from 8s to 1.2s. Sales went up 34% in the first month. That's millions of rupees from a tech decision.", author: "Simran Kaur", role: "Founder, LuxeWear", initials: "SK", color: "#2563eb" },
      { stars: 5, quote: "The AI recommendation engine they built contributes 28% of our revenue. Our AOV went from ₹1,200 to ₹1,950 in two months.", author: "Rohit Gupta", role: "VP Growth, FreshBasket", initials: "RG", color: "#F97316" },
      { stars: 5, quote: "We scaled from ₹5Cr to ₹120Cr GMV in 18 months on the platform they built. The infrastructure never flinched.", author: "Ananya Joshi", role: "CEO, Urban Threads", initials: "AJ", color: "#2563eb" }
    ],
    ctaTitle: "Build an E-commerce Platform That Converts",
    ctaDesc: "Let's create a store that sells — across every channel, every device."
  },
  manufacturing: {
    key: "manufacturing",
    title: "Smart Manufacturing Software Development in Noida",
    breadcrumb: "Home / Industries / Manufacturing",
    tagline: "Build enterprise resource planning (ERP) systems, inventory automation, and real-time factory dashboard systems.",
    eyebrow: "Factory Analytics",
    illustrationTheme: "manufacturing",
    expertiseTitle: "Process Streamlining & IoT Operations",
    expertiseParagraphs: [
      "We design custom manufacturing dashboards that help factory managers monitor machinery throughput, trace resource queues, and prevent unexpected line stops.",
      "Our platforms integrate IoT sensor hooks, supply chain databases, and predictive maintenance schedules so your plant can operate with optimal asset tracking and reduced downtime."
    ],
    cards: [
      {
        title: "CRITICAL LINE HALT",
        healthScore: 25,
        healthLabel: "FACTORY STATUS",
        healthColor: "pink",
        characterBgColor: "#F43F5E",
        characterType: "stressed",
        metrics: [
          { label: "OPERATING LEVEL", value: "Stalled", statusColor: "red" },
          { label: "ACTIVE MACHINES", value: "4 / 12", isNegative: true },
          { label: "UNRESOLVED FAULTS", value: "18", isNegative: true },
          { label: "LINE DOWN TIME", value: "142 mins", isNegative: true },
          { label: "YIELD DEFECT RATE", value: "12%" },
          { label: "DAILY OUTPUT COST", value: "-45,000", isNegative: true }
        ]
      },
      {
        title: "STABLE FACTORY FLOW",
        healthScore: 69,
        healthLabel: "FACTORY STATUS",
        healthColor: "yellow",
        characterBgColor: "#F59E0B",
        characterType: "active",
        metrics: [
          { label: "OPERATING LEVEL", value: "Nominal", statusColor: "yellow" },
          { label: "ACTIVE MACHINES", value: "11 / 12" },
          { label: "UNRESOLVED FAULTS", value: "2" },
          { label: "LINE DOWN TIME", value: "5 mins" },
          { label: "YIELD DEFECT RATE", value: "0.8%" },
          { label: "DAILY OUTPUT COST", value: "124,000" }
        ]
      },
      {
        title: "PEAK EFFICIENCY RUN",
        healthScore: 95,
        healthLabel: "FACTORY STATUS",
        healthColor: "green",
        characterBgColor: "#10B981",
        characterType: "growing",
        metrics: [
          { label: "OPERATING LEVEL", value: "Maximum", statusColor: "green" },
          { label: "ACTIVE MACHINES", value: "12 / 12" },
          { label: "UNRESOLVED FAULTS", value: "0" },
          { label: "LINE DOWN TIME", value: "0 mins" },
          { label: "YIELD DEFECT RATE", value: "0.01%" },
          { label: "DAILY OUTPUT COST", value: "318,000" }
        ]
      }
    ],
    services: [
      { icon: "🏭", title: "Manufacturing ERP", desc: "Bill of materials, production planning, work orders, and cost tracking — integrated with your shop floor.", color: "#F3F4F6" },
      { icon: "📡", title: "IIoT Integration", desc: "Connect CNC machines, PLCs, and sensors to a real-time dashboard that flags anomalies instantly.", color: "#F3F4F6" },
      { icon: "🔧", title: "Predictive Maintenance", desc: "ML models that predict equipment failure 72 hours in advance — reducing unplanned downtime by up to 40%.", color: "#F3F4F6" },
      { icon: "🚛", title: "Supply Chain Platform", desc: "End-to-end supply chain visibility, supplier portals, and demand forecasting.", color: "#F3F4F6" },
      { icon: "✅", title: "Quality Management", desc: "In-process quality checks, defect tracking, CAPA workflows, and compliance reporting.", color: "#F3F4F6" },
      { icon: "📊", title: "OEE Dashboards", desc: "Real-time Overall Equipment Effectiveness with shift-level drill-downs and automated alerts.", color: "#F3F4F6" }
    ],
    steps: [
      { icon: "🏭", title: "Shop Floor Audit", desc: "Map production processes, identify bottlenecks, and define data capture points." },
      { icon: "📡", title: "IIoT Setup", desc: "Install sensors, configure edge computing, and establish real-time data pipelines." },
      { icon: "⚙️", title: "ERP Build & Integrate", desc: "Build core ERP modules and integrate with existing SCADA, MES, and financial systems." },
      { icon: "📊", title: "Go Live & Optimise", desc: "Phased rollout by plant, with operator training and continuous improvement reviews." }
    ],
    testimonials: [
      { stars: 5, quote: "Our unplanned downtime dropped 38% in 6 months after HanuxTech deployed the predictive maintenance system. The ROI was 11x in year one.", author: "Vikram Nair", role: "Plant Head, PrecisionParts India", initials: "VN", color: "#6B7280" },
      { stars: 5, quote: "The real-time OEE dashboard showed us we were losing 22% capacity on one line. HanuxTech identified it in week one. Priceless.", author: "Seema Desai", role: "VP Operations, AutoFab Ltd", initials: "SD", color: "#374151" },
      { stars: 5, quote: "Our supply chain visibility went from bi-weekly Excel reports to real-time dashboards. The impact on procurement decisions has been transformational.", author: "Deepak Jain", role: "SCM Head, MetalCraft Group", initials: "DJ", color: "#6B7280" }
    ],
    ctaTitle: "Digitise Your Manufacturing Operations",
    ctaDesc: "Let's connect your factory floor to data-driven decision-making."
  },
  "real-estate": {
    key: "real-estate",
    title: "Next-Gen Real Estate Software Development in Noida",
    breadcrumb: "Home / Industries / Real Estate",
    tagline: "Build custom property search portals, CRM platforms for brokers, and digital leasing agreement systems.",
    eyebrow: "Property Portals",
    illustrationTheme: "real-estate",
    expertiseTitle: "Leasing and Listing Automation Systems",
    expertiseParagraphs: [
      "We design real estate portals that load thousands of active listings instantly. Interactive maps, custom search filtering, booking slots, and automated agent notifications are part of our core stack.",
      "We integrate secure tenant background checks, rent payment gateways, and lease agreement automation, enabling agencies to close deals faster and manage portfolios effortlessly."
    ],
    cards: [
      {
        title: "STALLED PROPERTY",
        healthScore: 30,
        healthLabel: "LISTING TRACTION",
        healthColor: "pink",
        characterBgColor: "#F43F5E",
        characterType: "stressed",
        metrics: [
          { label: "DEMAND STATUS", value: "Poor", statusColor: "red" },
          { label: "VIEW COUNT", value: "14", isNegative: true },
          { label: "AVG. TIME ON PAGE", value: "12s", isNegative: true },
          { label: "INQUIRIES SUBMITTED", value: "0", isNegative: true },
          { label: "DAYS ON MARKET", value: "142 Days", isNegative: true },
          { label: "AGENT RATING", value: "3.2 / 5" }
        ]
      },
      {
        title: "STEADY LISTING",
        healthScore: 70,
        healthLabel: "LISTING TRACTION",
        healthColor: "yellow",
        characterBgColor: "#F59E0B",
        characterType: "active",
        metrics: [
          { label: "DEMAND STATUS", value: "Stable", statusColor: "yellow" },
          { label: "VIEW COUNT", value: "312" },
          { label: "AVG. TIME ON PAGE", value: "1m 45s" },
          { label: "INQUIRIES SUBMITTED", value: "9" },
          { label: "DAYS ON MARKET", value: "24 Days" },
          { label: "AGENT RATING", value: "4.5 / 5" }
        ]
      },
      {
        title: "HOT DEMAND PROPERTY",
        healthScore: 92,
        healthLabel: "LISTING TRACTION",
        healthColor: "green",
        characterBgColor: "#10B981",
        characterType: "growing",
        metrics: [
          { label: "DEMAND STATUS", value: "Excellent", statusColor: "green" },
          { label: "VIEW COUNT", value: "1,894" },
          { label: "AVG. TIME ON PAGE", value: "4m 12s" },
          { label: "INQUIRIES SUBMITTED", value: "84" },
          { label: "DAYS ON MARKET", value: "2 Days" },
          { label: "AGENT RATING", value: "4.9 / 5" }
        ]
      }
    ],
    services: [
      { icon: "🔍", title: "Property Portals", desc: "AI-powered search with filters, map view, price insights, and personalised listings.", color: "#FFEDD5" },
      { icon: "🥽", title: "Virtual Tours", desc: "360° photo tours, 3D walkthroughs, and AR-based furniture placement tools.", color: "#FFEDD5" },
      { icon: "👥", title: "Agent CRM", desc: "Lead scoring, automated follow-ups, WhatsApp integration, and deal pipeline management.", color: "#FFEDD5" },
      { icon: "📄", title: "Transaction Management", desc: "Digitised agreement workflows, e-sign, stamp duty calculation, and RERA compliance.", color: "#FFEDD5" },
      { icon: "📊", title: "Property Analytics", desc: "Market price trends, yield analysis, neighborhood insights, and investment calculators.", color: "#FFEDD5" },
      { icon: "🏢", title: "Facility Management", desc: "Maintenance ticketing, visitor management, amenity booking, and society accounting.", color: "#FFEDD5" }
    ],
    steps: [
      { icon: "🗺️", title: "Process Mapping", desc: "Map the buyer/seller/agent journey and identify conversion drop-off points." },
      { icon: "🎨", title: "UX Design", desc: "Design property browsing and lead capture flows optimised for mobile users." },
      { icon: "⚙️", title: "Platform Build", desc: "Core portal, CRM, virtual tour engine, and payment integrations." },
      { icon: "🚀", title: "Launch & Market", desc: "SEO-optimised launch, agent training, and digital marketing integration." }
    ],
    testimonials: [
      { stars: 5, quote: "Our leads went from 200 to 1,400 per month within 90 days of launching the portal HanuxTech built. The AI matching is extraordinary.", author: "Ravi Kapoor", role: "Founder, DreamHomes Realty", initials: "RK", color: "#F97316" },
      { stars: 5, quote: "The virtual tour platform saved our clients 3-4 site visits before decision. Deal closure time dropped from 45 days to 22 days.", author: "Shilpa Verma", role: "Director, PropVision", initials: "SV", color: "#F59E0B" },
      { stars: 5, quote: "RERA compliance used to be a nightmare. HanuxTech's document management system made it completely automated. Our legal team is finally happy.", author: "Nikhil Joshi", role: "COO, BuildRight Developers", initials: "NJ", color: "#F97316" }
    ],
    ctaTitle: "Build PropTech That Closes More Deals",
    ctaDesc: "Let's create real estate software that works as hard as your agents do."
  },
  logistics: {
    key: "logistics",
    title: "Smart Logistics & Fleet Software in Noida",
    breadcrumb: "Home / Industries / Logistics",
    tagline: "Build real-time fleet GPS tracking dashboards, delivery route optimization software, and warehouse cargo planners.",
    eyebrow: "Supply Chain",
    illustrationTheme: "logistics",
    expertiseTitle: "Route Planning and Delivery Optimization",
    expertiseParagraphs: [
      "We construct robust tracking systems that give managers immediate updates on delivery trucks, current cargo capacity, and fuel efficiency.",
      "Our algorithms calculate optimal route plans based on traffic, weather data, and package weight distribution — helping your business cut fuel usage and secure fast deliveries."
    ],
    cards: [
      {
        title: "DELAYED CARGO DEPLOY",
        healthScore: 31,
        healthLabel: "FLEET COMPLIANCE",
        healthColor: "pink",
        characterBgColor: "#F43F5E",
        characterType: "stressed",
        metrics: [
          { label: "ROUTE TIMING", value: "Delayed", statusColor: "red" },
          { label: "ACTIVE TRUCKS", value: "3 / 10", isNegative: true },
          { label: "AVERAGE SPEED", value: "22 km/h", isNegative: true },
          { label: "FUEL DISCREPANCY", value: "+18%", isNegative: true },
          { label: "PENDING STOPS", value: "14", isNegative: true },
          { label: "CUSTOMER RATINGS", value: "2.8 / 5" }
        ]
      },
      {
        title: "STABLE CARGO ROUTE",
        healthScore: 72,
        healthLabel: "FLEET COMPLIANCE",
        healthColor: "yellow",
        characterBgColor: "#F59E0B",
        characterType: "active",
        metrics: [
          { label: "ROUTE TIMING", value: "On Time", statusColor: "yellow" },
          { label: "ACTIVE TRUCKS", value: "9 / 10" },
          { label: "AVERAGE SPEED", value: "54 km/h" },
          { label: "FUEL DISCREPANCY", value: "0.2%" },
          { label: "PENDING STOPS", value: "1" },
          { label: "CUSTOMER RATINGS", value: "4.6 / 5" }
        ]
      },
      {
        title: "OPTIMAL DELIVERY RUN",
        healthScore: 96,
        healthLabel: "FLEET COMPLIANCE",
        healthColor: "green",
        characterBgColor: "#10B981",
        characterType: "growing",
        metrics: [
          { label: "ROUTE TIMING", value: "Fast", statusColor: "green" },
          { label: "ACTIVE TRUCKS", value: "10 / 10" },
          { label: "AVERAGE SPEED", value: "62 km/h" },
          { label: "FUEL DISCREPANCY", value: "-8%" },
          { label: "PENDING STOPS", value: "0" },
          { label: "CUSTOMER RATINGS", value: "5.0 / 5" }
        ]
      }
    ],
    services: [
      { icon: "🚛", title: "Fleet GPS Tracking", desc: "Real-time location, speed, fuel telemetry, and geo-fencing for your entire vehicle fleet.", color: "#E0F7FA" },
      { icon: "🗺️", title: "Route Optimization", desc: "Dynamic algorithms calculating the fastest paths based on traffic, weather, and cargo loads.", color: "#E0F7FA" },
      { icon: "📦", title: "Warehouse Analytics", desc: "Cargo distribution mapping, stock flow forecasting, and automated space utilization reports.", color: "#E0F7FA" },
      { icon: "🔌", title: "Carrier Portals", desc: "Consolidated system for booking, dispatch notes, electronic proof of delivery, and invoicing.", color: "#E0F7FA" },
      { icon: "⚡", title: "Automated Dispatch", desc: "Instant matching and scheduling of drivers with optimal load assignments.", color: "#E0F7FA" },
      { icon: "📱", title: "Delivery Mobile Apps", desc: "Driver route guidance, barcode scanning, client sign-off, and incident reporting apps.", color: "#E0F7FA" }
    ],
    steps: [
      { icon: "🔍", title: "Supply Chain Audit", desc: "Audit manual dispatch loops, identify vehicle idle points, and map workflow bottlenecks." },
      { icon: "🔌", title: "GPS API Setup", desc: "Install IoT telemetry trackers and build the dynamic map visualization layer." },
      { icon: "⚙️", title: "System Build", desc: "Develop the custom dispatcher panel, inventory control dashboard, and carrier interfaces." },
      { icon: "🚀", title: "Rollout & Training", desc: "Conduct driver onboarding sessions, run testing loops, and transition to live routing." }
    ],
    testimonials: [
      { stars: 5, quote: "HanuxTech's route planning system cut our fuel expenses by 18% in the first 90 days. Dispatch time is now down to seconds.", author: "Sanjay Kumar", role: "COO, SafeTransit", initials: "SK", color: "#0EA5C9" },
      { stars: 5, quote: "We track 200+ container shipments concurrently with zero latency. The client notifications are fully automated.", author: "Priya Bansal", role: "Director, CargoFlow", initials: "PB", color: "#06B6D4" },
      { stars: 5, quote: "The warehouse spacing model increased our storage efficiency by 26%. Highly structured and competent engineering team.", author: "Rohan Dev", role: "Founder, ShipLog", initials: "RD", color: "#0EA5C9" }
    ],
    ctaTitle: "Optimize Your Logistics & Fleet Operations",
    ctaDesc: "Let's build real-time logistics software that reduces fuel cost and improves efficiency."
  },
  legal: {
    key: "legal",
    title: "Enterprise Legal Tech Softwares in Noida",
    breadcrumb: "Home / Industries / Legal Services",
    tagline: "Build secure contract lifecycle management, legal case storage, and automated billing software for law firms.",
    eyebrow: "Legal Tech",
    illustrationTheme: "legal",
    expertiseTitle: "Contract Audits and Client Portal Security",
    expertiseParagraphs: [
      "We design secure software repositories that help law firms draft, review, and sign agreements in encrypted cloud vaults.",
      "Our solutions combine complex document parsing, audit logs, and granular access controls, keeping confidential client details fully protected while automating routine filings."
    ],
    cards: [
      {
        title: "CRITICAL COMPLIANCE",
        healthScore: 33,
        healthLabel: "FIRM AUDIT REPORT",
        healthColor: "pink",
        characterBgColor: "#F43F5E",
        characterType: "stressed",
        metrics: [
          { label: "DOCUMENT STATUS", value: "Critical", statusColor: "red" },
          { label: "PENDING AUDITS", value: "42 Docs", isNegative: true },
          { label: "EXPIRED CONTRACTS", value: "8", isNegative: true },
          { label: "COMPLIANCE BREACH", value: "2", isNegative: true },
          { label: "BILLABLE OVERDUE", value: "14,800", isNegative: true },
          { label: "SIGN-OFF DELAY", value: "12 Days" }
        ]
      },
      {
        title: "NOMINAL LAW SUITE",
        healthScore: 75,
        healthLabel: "FIRM AUDIT REPORT",
        healthColor: "yellow",
        characterBgColor: "#F59E0B",
        characterType: "active",
        metrics: [
          { label: "DOCUMENT STATUS", value: "Protected", statusColor: "yellow" },
          { label: "PENDING AUDITS", value: "3 Docs" },
          { label: "EXPIRED CONTRACTS", value: "0" },
          { label: "COMPLIANCE BREACH", value: "0" },
          { label: "BILLABLE OVERDUE", value: "420" },
          { label: "SIGN-OFF DELAY", value: "1 Day" }
        ]
      },
      {
        title: "COMPLIANT VAULT",
        healthScore: 98,
        healthLabel: "FIRM AUDIT REPORT",
        healthColor: "green",
        characterBgColor: "#10B981",
        characterType: "growing",
        metrics: [
          { label: "DOCUMENT STATUS", value: "Perfect", statusColor: "green" },
          { label: "PENDING AUDITS", value: "0 Docs" },
          { label: "EXPIRED CONTRACTS", value: "0" },
          { label: "COMPLIANCE BREACH", value: "0" },
          { label: "BILLABLE OVERDUE", value: "0" },
          { label: "SIGN-OFF DELAY", value: "0 Days" }
        ]
      }
    ],
    services: [
      { icon: "📁", title: "Case Management", desc: "Matter lifecycle management from intake to closure — with tasks, deadlines, documents, and communications.", color: "#FCE7F3" },
      { icon: "📝", title: "Contract Automation", desc: "Template-based contract generation, clause library, AI review, redlining, and e-signature workflows.", color: "#FCE7F3" },
      { icon: "🔍", title: "E-Discovery", desc: "AI-powered document review, privilege logging, and production sets for litigation matters.", color: "#FCE7F3" },
      { icon: "👥", title: "Client Portal", desc: "Secure client-facing portal for case updates, document sharing, invoices, and communication.", color: "#FCE7F3" },
      { icon: "⏱️", title: "Time & Billing", desc: "One-click time capture, UTBMS coding, invoice generation, and online payment collection.", color: "#FCE7F3" },
      { icon: "🤖", title: "AI Legal Research", desc: "AI assistant that searches case law, statutes, and firm knowledge base to draft research memos.", color: "#FCE7F3" }
    ],
    steps: [
      { icon: "🔍", title: "Workflow Analysis", desc: "Map your firm's practice areas, matter types, and existing pain points." },
      { icon: "🔒", title: "Security Design", desc: "Design data architecture with privilege protection, encryption, and access controls." },
      { icon: "⚙️", title: "System Build", desc: "Core case management, document, billing, and client portal modules." },
      { icon: "🎓", title: "Training & Go Live", desc: "Staff training, data migration from legacy systems, and phased rollout." }
    ],
    testimonials: [
      { stars: 5, quote: "Our associates now spend 60% less time on document review thanks to the AI e-discovery tool. We've taken on 40% more litigation matters without hiring.", author: "Advocate Suresh Patel", role: "Managing Partner, Patel & Associates", initials: "SP", color: "#EC4899" },
      { stars: 5, quote: "The client portal transformed our client relationships. Clients can see everything in real-time and we've had zero complaints about communication in 18 months.", author: "Meghna Rao", role: "Partner, Rao Law Group", initials: "MR", color: "#7C3AED" },
      { stars: 5, quote: "Contract turnaround dropped from 5 days to 4 hours. The AI clause library knows our playbook better than our junior associates did.", author: "Vivek Sharma", role: "General Counsel, Nexus Corp", initials: "VS", color: "#EC4899" }
    ],
    ctaTitle: "Modernise Your Law Firm With Technology",
    ctaDesc: "Let's build legal technology that gives your firm a competitive edge."
  },
  consulting: {
    key: "consulting",
    title: "Professional Consulting Portal Softwares in Noida",
    breadcrumb: "Home / Industries / Consulting Firms",
    tagline: "Build custom client portals, billable hour tracking sheets, and multi-tenant reporting dashboards.",
    eyebrow: "Firm Operations",
    illustrationTheme: "consulting",
    expertiseTitle: "Client Management & Resource Tracking",
    expertiseParagraphs: [
      "We design professional consulting portal applications that gather project sprints, documents, invoices, and timesheets into a single glossy workspace.",
      "Our platforms help managers track project progress, monitor consultant utilization, and export clear reports to prove ROI."
    ],
    cards: [
      {
        title: "OVER-BUDGET ACCOUNT",
        healthScore: 36,
        healthLabel: "ACCOUNT HEALTH",
        healthColor: "pink",
        characterBgColor: "#F43F5E",
        characterType: "stressed",
        metrics: [
          { label: "RESOURCE BURN", value: "High", statusColor: "red" },
          { label: "HOURS LOGGED", value: "182 / 120", isNegative: true },
          { label: "BUDGET OVERRUN", value: "+32%", isNegative: true },
          { label: "OUTSTANDING TASKS", value: "19", isNegative: true },
          { label: "CLIENT RESPONSE TIME", value: "48 hrs", isNegative: true },
          { label: "UNSUBMITTED REPORT", value: "3 Reports" }
        ]
      },
      {
        title: "STABLE CONSULT FLOW",
        healthScore: 73,
        healthLabel: "ACCOUNT HEALTH",
        healthColor: "yellow",
        characterBgColor: "#F59E0B",
        characterType: "active",
        metrics: [
          { label: "RESOURCE BURN", value: "Stable", statusColor: "yellow" },
          { label: "HOURS LOGGED", value: "94 / 120" },
          { label: "BUDGET OVERRUN", value: "0%" },
          { label: "OUTSTANDING TASKS", value: "2" },
          { label: "CLIENT RESPONSE TIME", value: "2 hrs" },
          { label: "UNSUBMITTED REPORT", value: "0 Reports" }
        ]
      },
      {
        title: "PEAK VALUE ENGAGED",
        healthScore: 93,
        healthLabel: "ACCOUNT HEALTH",
        healthColor: "green",
        characterBgColor: "#10B981",
        characterType: "growing",
        metrics: [
          { label: "RESOURCE BURN", value: "Optimal", statusColor: "green" },
          { label: "HOURS LOGGED", value: "115 / 120" },
          { label: "BUDGET OVERRUN", value: "-8%" },
          { label: "OUTSTANDING TASKS", value: "0" },
          { label: "CLIENT RESPONSE TIME", value: "15 mins" },
          { label: "UNSUBMITTED REPORT", value: "0 Reports" }
        ]
      }
    ],
    services: [
      { icon: "📊", title: "Project Management", desc: "Engagement lifecycle management with milestones, deliverables, risk tracking, and budget monitoring.", color: "#EEF2FF" },
      { icon: "⏱️", title: "Time & Billing", desc: "Frictionless time capture, expense management, milestone billing, and client-ready invoices.", color: "#EEF2FF" },
      { icon: "🧠", title: "Knowledge Management", desc: "Searchable IP repository, reusable frameworks, case studies, and expert directories.", color: "#EEF2FF" },
      { icon: "👥", title: "Client Portal", desc: "Secure portal for project status, deliverable review, feedback, and communication.", color: "#EEF2FF" },
      { icon: "📈", title: "Utilisation Analytics", desc: "Real-time billable vs non-billable tracking, consultant utilisation, and revenue forecasting.", color: "#EEF2FF" },
      { icon: "🔄", title: "CRM & Pipeline", desc: "Proposal management, opportunity tracking, win/loss analysis, and revenue pipeline.", color: "#EEF2FF" }
    ],
    steps: [
      { icon: "🔍", title: "Operations Audit", desc: "Analyse current workflows, time loss points, and client reporting processes." },
      { icon: "🎨", title: "Platform Design", desc: "Design a unified workspace that fits how your consultants actually work." },
      { icon: "⚙️", title: "Build & Integrate", desc: "Core platform plus integrations with email, calendar, Slack, and accounting." },
      { icon: "🚀", title: "Rollout & Train", desc: "Phased rollout with practice leader champions and change management support." }
    ],
    testimonials: [
      { stars: 5, quote: "We recovered ₹3.2Cr in previously un-billed time in the first year after deploying HanuxTech's time tracking system. The payback period was 3 months.", author: "Aditya Khanna", role: "Managing Director, Strategy First", initials: "AK", color: "#1B4FD8" },
      { stars: 5, quote: "Our client portal eliminated 80% of project status calls. Clients have real-time access to everything and our consultants can focus on the actual work.", author: "Neha Mathur", role: "Partner, Insight Advisory", initials: "NM", color: "#7C3AED" },
      { stars: 5, quote: "The knowledge management system means we never re-invent the wheel. Our IP is now searchable, structured, and actually used — instead of buried in email.", author: "Rahul Aggarwal", role: "CEO, ValueBridge Consulting", initials: "RA", color: "#1B4FD8" }
    ],
    ctaTitle: "Build the Operating System for Your Consulting Firm",
    ctaDesc: "Let's eliminate admin overhead and let your consultants focus on what they do best."
  },
  marketing: {
    key: "marketing",
    title: "Advanced Marketing Agency Platforms in Noida",
    breadcrumb: "Home / Industries / Marketing Agencies",
    tagline: "Build custom digital marketing dashboards, ad spend trackers, and multi-tenant performance report managers.",
    eyebrow: "Ad Analytics",
    illustrationTheme: "marketing",
    expertiseTitle: "Automated Reporting and Campaign Performance",
    expertiseParagraphs: [
      "We design custom marketing trackers that fetch client ad data from Google Ads, Meta, and TikTok APIs into a single dashboard.",
      "Our algorithms compute precise ROI metrics, forecast spend thresholds, and automatically email reports to stakeholders."
    ],
    cards: [
      {
        title: "INEFFICIENT AD SPEND",
        healthScore: 30,
        healthLabel: "CAMPAIGN ROAS",
        healthColor: "pink",
        characterBgColor: "#F43F5E",
        characterType: "stressed",
        metrics: [
          { label: "SPEND EFFICIENCY", value: "Poor", statusColor: "red" },
          { label: "AD CLICKS", value: "12,401" },
          { label: "BOUNCE RATE", value: "82%", isNegative: true },
          { label: "COST PER ACQUISITION", value: "$42.50", isNegative: true },
          { label: "REVENUE RECORDED", value: "8,940", isNegative: true },
          { label: "ROAS MULTIPLIER", value: "0.8x" }
        ]
      },
      {
        title: "NOMINAL CAMPAIGN RUN",
        healthScore: 70,
        healthLabel: "CAMPAIGN ROAS",
        healthColor: "yellow",
        characterBgColor: "#F59E0B",
        characterType: "active",
        metrics: [
          { label: "SPEND EFFICIENCY", value: "Nominal", statusColor: "yellow" },
          { label: "AD CLICKS", value: "84,902" },
          { label: "BOUNCE RATE", value: "41%" },
          { label: "COST PER ACQUISITION", value: "$18.20" },
          { label: "REVENUE RECORDED", value: "185,000" },
          { label: "ROAS MULTIPLIER", value: "3.2x" }
        ]
      },
      {
        title: "HIGH EFFICIENCY ROAS",
        healthScore: 92,
        healthLabel: "CAMPAIGN ROAS",
        healthColor: "green",
        characterBgColor: "#10B981",
        characterType: "growing",
        metrics: [
          { label: "SPEND EFFICIENCY", value: "Outstanding", statusColor: "green" },
          { label: "AD CLICKS", value: "389,021" },
          { label: "BOUNCE RATE", value: "18%" },
          { label: "COST PER ACQUISITION", value: "$6.40" },
          { label: "REVENUE RECORDED", value: "1,240,000" },
          { label: "ROAS MULTIPLIER", value: "8.5x" }
        ]
      }
    ],
    services: [
      { icon: "📊", title: "Marketing Dashboard", desc: "Unified view of all channels — Meta, Google, email, SEO, and social — with automated alerts.", color: "#F5F3FF" },
      { icon: "📧", title: "Marketing Automation", desc: "Behaviour-triggered emails, SMS sequences, retargeting workflows, and lead nurturing.", color: "#F5F3FF" },
      { icon: "👥", title: "Client Reporting Portal", desc: "White-label client dashboards with automated weekly and monthly reports — zero manual work.", color: "#F5F3FF" },
      { icon: "🎯", title: "CRM & Lead Management", desc: "Lead capture, scoring, attribution modelling, and sales-ready handoff to client CRMs.", color: "#F5F3FF" },
      { icon: "🤖", title: "AI Content Engine", desc: "LLM-powered ad copy, landing page variants, and social content generation at scale.", color: "#F5F3FF" },
      { icon: "📈", title: "Attribution & Analytics", desc: "Multi-touch attribution modelling, CAC / LTV analysis, and campaign ROI attribution.", color: "#F5F3FF" }
    ],
    steps: [
      { icon: "🔍", title: "Martech Audit", desc: "Audit current stack, data flows, and reporting gaps across all channels." },
      { icon: "🔌", title: "Integration Design", desc: "Design the data layer connecting all ad platforms, CRM, and analytics tools." },
      { icon: "⚙️", title: "Platform Build", desc: "Dashboard, automation, reporting, and AI tools built and integrated." },
      { icon: "🚀", title: "Onboard & Scale", desc: "Client onboarding, team training, and automated report scheduling." }
    ],
    testimonials: [
      { stars: 5, quote: "Our team saves 40 hours per month on client reporting. Every client gets beautiful white-label updates automatically.", author: "Priyanka Nair", role: "CEO, PixelPulse Agency", initials: "PN", color: "#7C3AED" },
      { stars: 5, quote: "The attribution modelling tool showed us that 60% of our spend was misallocated. Reallocating lifted ROAS to 5.1x.", author: "Kartik Mehta", role: "Performance Director, GrowthLab", initials: "KM", color: "#EC4899" },
      { stars: 5, quote: "The AI copy engine writes better ad headlines than half my team does on a Monday morning. It's scaled production 4x.", author: "Supriya Das", role: "Creative Head, BrandSpark", initials: "SD", color: "#7C3AED" }
    ],
    ctaTitle: "Build Marketing Technology That Scales Your Agency",
    ctaDesc: "Let's automate your reporting, unify your data, and prove your ROI."
  },
  "non-profit": {
    key: "non-profit",
    title: "Secure Non-Profit Organization Software in Noida",
    breadcrumb: "Home / Industries / Non-Profit",
    tagline: "Build custom donation portals, donor database management systems (CRM), and charity dashboard planners.",
    eyebrow: "Social Good",
    illustrationTheme: "non-profit",
    expertiseTitle: "Donor Retention and Campaign Transparency",
    expertiseParagraphs: [
      "We construct customized CRM interfaces that help charitable societies record donor details, track donation campaigns, and report tax-deductible receipts.",
      "Our checkout gateways support recurring subscription billing, international card payments, and detailed audit trails to ensure financial transparency."
    ],
    cards: [
      {
        title: "STALLED DONATION",
        healthScore: 34,
        healthLabel: "CAMPAIGN RETENTION",
        healthColor: "pink",
        characterBgColor: "#F43F5E",
        characterType: "stressed",
        metrics: [
          { label: "RECURRING RETENTION", value: "Low", statusColor: "red" },
          { label: "CAMPAIGN VIEWS", value: "312" },
          { label: "DONATION RATIO", value: "1.2%", isNegative: true },
          { label: "AVERAGE VALUE", value: "$8.50", isNegative: true },
          { label: "TOTAL RECEIVED", value: "$2,652" },
          { label: "PENDING RECEIPTS", value: "84" }
        ]
      },
      {
        title: "ACTIVE CHARITY RUN",
        healthScore: 72,
        healthLabel: "CAMPAIGN RETENTION",
        healthColor: "yellow",
        characterBgColor: "#F59E0B",
        characterType: "active",
        metrics: [
          { label: "RECURRING RETENTION", value: "Good", statusColor: "yellow" },
          { label: "CAMPAIGN VIEWS", value: "4,902" },
          { label: "DONATION RATIO", value: "4.8%" },
          { label: "AVERAGE VALUE", value: "$38.00" },
          { label: "TOTAL RECEIVED", value: "$186,276" },
          { label: "PENDING RECEIPTS", value: "2" }
        ]
      },
      {
        title: "MAX TRANSPARENCY RUN",
        healthScore: 94,
        healthLabel: "CAMPAIGN RETENTION",
        healthColor: "green",
        characterBgColor: "#10B981",
        characterType: "growing",
        metrics: [
          { label: "RECURRING RETENTION", value: "Outstanding", statusColor: "green" },
          { label: "CAMPAIGN VIEWS", value: "28,490" },
          { label: "DONATION RATIO", value: "12.4%" },
          { label: "AVERAGE VALUE", value: "$112.00" },
          { label: "TOTAL RECEIVED", value: "$3,190,880" },
          { label: "PENDING RECEIPTS", value: "0" }
        ]
      }
    ],
    services: [
      { icon: "💳", title: "Donation Portals", desc: "Secure checkout supporting one-time and recurring donation plans, international card rails, and automatic invoice receipts.", color: "#D1FAE5" },
      { icon: "👥", title: "Donor CRM", desc: "Unified donor profile trackers, contribution histories, dynamic email segmentation, and communication logs.", color: "#D1FAE5" },
      { icon: "📣", title: "Campaign Pages", desc: "Customizable, high-converting social campaign landing pages with live progress trackers and thermometers.", color: "#D1FAE5" },
      { icon: "🎟️", title: "Event Ticketing", desc: "Sell tickets for galas, run fundraisers, track RSVPs, and automatically email digital passes to attendees.", color: "#D1FAE5" },
      { icon: "🤝", title: "Volunteer Portals", desc: "Shift scheduling, application pipelines, interest screening, and hours logging for organization volunteers.", color: "#D1FAE5" },
      { icon: "📊", title: "Audit Trails", desc: "Transparent financial allocation trackers, exportable reporting formats, and tax exemption compliance logs.", color: "#D1FAE5" }
    ],
    steps: [
      { icon: "🔍", title: "Outreach Scoping", desc: "Deep-dive into donor pipelines, fundraising targets, compliance regulations, and integration needs." },
      { icon: "🎨", title: "System Design", desc: "Create smooth checkout journeys, intuitive admin CRM dashboards, and branded landing templates." },
      { icon: "⚙️", title: "CRM Setup", desc: "Deploy securely, connect international payment gateways, set up email systems, and migrate past records." },
      { icon: "🚀", title: "Portal Launch", desc: "Conduct training sessions, run small pilots, launch tracking systems, and monitor campaign performance." }
    ],
    testimonials: [
      { stars: 5, quote: "Our monthly recurring donors increased by 46% within four months of deploying the custom donation portal HanuxTech built.", author: "Dr. Renu Sharma", role: "Founder, GreenEarth NGO", initials: "RS", color: "#10B981" },
      { stars: 5, quote: "The donor CRM database helps us segment and email our supporters in seconds. The financial audit logs are fully automated.", author: "Manish Sen", role: "VP Operations, Hope Foundation", initials: "MS", color: "#F59E0B" },
      { stars: 5, quote: "A highly robust system. We ran our annual gala ticket sales through the new portal without a single drop-off. Excellent support.", author: "Alok Jha", role: "Director, Literacy India", initials: "AJ", color: "#10B981" }
    ],
    ctaTitle: "Empower Your Non-Profit With Modern Tools",
    ctaDesc: "Let's build custom donation portals and CRM systems that increase donor retention."
  },
  booking: {
    key: "booking",
    title: "Best Booking Platforms & Scheduling Software",
    breadcrumb: "Home / Industries / Booking Systems",
    tagline: "Real-time availability, smart scheduling, automated reminders, payment collection, and calendar sync for clinics, salons, hotels, and service businesses.",
    eyebrow: "Scheduling Automation",
    illustrationTheme: "booking",
    expertiseTitle: "Automated Scheduling and No-Show Prevention",
    expertiseParagraphs: [
      "We build custom scheduling platforms that help clinics, salons, hotels, and service firms automate bookings, sync staff calendars, and collect deposits.",
      "Our reminders via WhatsApp, SMS, and email reduce no-shows by up to 35%, ensuring slots are filled efficiently."
    ],
    cards: [
      {
        title: "STALLED SCHEDULER",
        healthScore: 35,
        healthLabel: "SLOT TRACTION",
        healthColor: "pink",
        characterBgColor: "#F43F5E",
        characterType: "stressed",
        metrics: [
          { label: "NO-SHOW RATE", value: "28%", isNegative: true },
          { label: "BOOKINGS RUNNING", value: "Low", statusColor: "red" },
          { label: "ONLINE ADOPTION", value: "12%", isNegative: true },
          { label: "AVG. STAFF BURN", value: "High", isNegative: true },
          { label: "CANCELLATION RATE", value: "14%", isNegative: true },
          { label: "REVENUE LOSS", value: "$4,200", isNegative: true }
        ]
      },
      {
        title: "ACTIVE BOOKINGS",
        healthScore: 78,
        healthLabel: "SLOT TRACTION",
        healthColor: "yellow",
        characterBgColor: "#F59E0B",
        characterType: "active",
        metrics: [
          { label: "NO-SHOW RATE", value: "12%" },
          { label: "BOOKINGS RUNNING", value: "Stable", statusColor: "yellow" },
          { label: "ONLINE ADOPTION", value: "48%" },
          { label: "AVG. STAFF BURN", value: "Medium" },
          { label: "CANCELLATION RATE", value: "6%" },
          { label: "REVENUE LOSS", value: "$420" }
        ]
      },
      {
        title: "OPTIMUM CAPACITY",
        healthScore: 96,
        healthLabel: "SLOT TRACTION",
        healthColor: "green",
        characterBgColor: "#10B981",
        characterType: "growing",
        metrics: [
          { label: "NO-SHOW RATE", value: "8%", statusColor: "green" },
          { label: "BOOKINGS RUNNING", value: "Perfect", statusColor: "green" },
          { label: "ONLINE ADOPTION", value: "78%" },
          { label: "AVG. STAFF BURN", value: "Optimal" },
          { label: "CANCELLATION RATE", value: "1%" },
          { label: "REVENUE LOSS", value: "$0" }
        ]
      }
    ],
    services: [
      { icon: "📅", title: "Appointment Scheduling", desc: "Real-time availability engine with instant booking, rescheduling, and cancellation flows." },
      { icon: "💬", title: "Automated Reminders", desc: "WhatsApp, SMS, and email sequences that reduce no-shows by up to 35%." },
      { icon: "💳", title: "Payment Integration", desc: "Online deposits, full prepayment, and post-service billing with Razorpay/Stripe." },
      { icon: "👥", title: "Staff & Resource Mgmt", desc: "Staff schedules, room/equipment allocation, and real-time dashboard for operations." },
      { icon: "⏳", title: "Waitlist & Auto-Fill", desc: "Intelligent waitlist that instantly notifies and fills cancellations - zero wasted slots." },
      { icon: "📈", title: "Revenue Analytics", desc: "Revenue per slot, peak hour analysis, staff utilisation, and client retention metrics." }
    ],
    steps: [
      { icon: "🔍", title: "Workflow Mapping", desc: "Map booking flows, resource constraints, and customer journey." },
      { icon: "🎨", title: "UX Design", desc: "Mobile-first booking UI optimised for 30-second completion." },
      { icon: "⚙️", title: "Platform Build", desc: "Core engine, integrations, and notification systems." },
      { icon: "🚀", title: "Go Live & Train", desc: "Staff training, migration of existing data, and soft launch." }
    ],
    testimonials: [
      { stars: 5, quote: "No-shows dropped from 28% to 8% in 90 days. The WhatsApp reminders are pure magic.", author: "Dr. Anjali Rao", role: "Director, ClearSkin Clinic", initials: "AR", color: "#0891b2" },
      { stars: 5, quote: "Online bookings now account for 78% of our appointments. Staff spend zero time scheduling.", author: "Ravi Khanna", role: "Owner, The Barber Studio", initials: "RK", color: "#0891b2" },
      { stars: 5, quote: "Multi-location view changed everything. We see utilisation across 6 clinics in real time.", author: "Meera Patel", role: "Operations Head, HealthFirst Chain", initials: "MP", color: "#0891b2" }
    ],
    ctaTitle: "Build a Booking Platform That Fills Itself",
    ctaDesc: "Automate scheduling, reduce no-shows, and collect payment — all in one place."
  }
};

industriesDataMap["bookingsystem"] = industriesDataMap["booking"];
industriesDataMap["Bookingsystem"] = industriesDataMap["booking"];
