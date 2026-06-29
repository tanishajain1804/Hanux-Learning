import React from "react";
import { UserCheck, Calendar, Layers, TrendingUp, Activity } from "lucide-react";

export interface ProjectDetailData {
  title: string;
  category: string;
  number: string;
  themeColor: string;
  glowColor: string;
  tagline: string;
  metric: string;
  metricLabel: string;
  overview: string;
  stats: { label: string; value: string; icon: React.ReactNode }[];
  challenge: string;
  solution: string;
  results: string[];
  techStack: string[];
}

export const projectsDetailDataMap: Record<string, ProjectDetailData> = {
  "ai-crm-fintech": {
    title: "AI-Powered CRM for FinTech",
    category: "FinTech / CRM Systems",
    number: "01",
    themeColor: "#2563eb",
    glowColor: "rgba(37, 99, 235, 0.12)",
    tagline: "Reducing manual operations by 68% with ML-driven workflows.",
    metric: "68%",
    metricLabel: "Workflows automated",
    overview: "We built an enterprise-grade customer relationship manager (CRM) customized for financial advisory institutions. It includes ML-driven customer lead scoring models, automated client onboarding workflows, and secure document vaults that drastically reduce operational latency while ensuring strict compliance checks.",
    stats: [
      { label: "Client Partner", value: "Global Wealth Advisors", icon: <UserCheck size={15} /> },
      { label: "Project Phase", value: "12 Weeks (Production Ready)", icon: <Calendar size={15} /> },
      { label: "Compliance Standard", value: "SOC 2 Type II / GDPR", icon: <Layers size={15} /> }
    ],
    challenge: "Wealth managers were spending over 15 hours per week manually reviewing client onboarding documents, checking background registers, and scoring customer leads. Onboarding delays regularly took 2 to 3 business days, causing a 14% drop in customer sign-up conversions and high staff fatigue.",
    solution: "We designed a unified client dashboard in React connected to a Python FastAPI backend. We implemented autonomous ML workers that scan tax files and bank transcripts using secure OCR pipelines, pre-populate AML/KYC background checks, and score leads dynamically based on investment profiles. This reduced document validation reviews to under 30 seconds.",
    results: [
      "Cut client onboarding delay times from 3 days to under 5 minutes.",
      "Freed up advisory teams by automating 68% of manual checklist items.",
      "Boosted user sign-up completion conversion rate by 22% within 60 days."
    ],
    techStack: ["React", "TypeScript", "Python", "FastAPI", "AWS Cognito", "DynamoDB", "OpenAI API", "Docker"]
  },
  "retail-platform": {
    title: "EU Retail Platform Rebuild",
    category: "E-Commerce / Headless Architecture",
    number: "02",
    themeColor: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.12)",
    tagline: "Achieving a 340% increase in checkout conversion rates.",
    metric: "+340%",
    metricLabel: "Checkout conversions",
    overview: "We restructured the digital storefront and purchase pipeline of a fast-growing European fashion label. By transitioning to a headless commerce architecture, we achieved lightning-fast load times, eliminated server crashes during high-traffic promo drops, and streamlined checkout workflows.",
    stats: [
      { label: "Client Partner", value: "Aura Fashion Group", icon: <UserCheck size={15} /> },
      { label: "Project Phase", value: "10 Weeks (Launched)", icon: <Calendar size={15} /> },
      { label: "Core Performance", value: "98/100 Lighthouse Score", icon: <TrendingUp size={15} /> }
    ],
    challenge: "The client's legacy WooCommerce store suffered from slow loading speeds (over 6 seconds for main images) and regularly crashed during peak marketing sales events. Friction in their multi-page checkout flow led to a high cart abandonment rate (76%) and limited their growth.",
    solution: "We engineered a headless frontend using Next.js hosted on Vercel's global edge network. The frontend fetches data from Shopify Plus APIs via a optimized GraphQL gateway. We consolidated checkout steps into a single-page interactive sheet, preloaded assets using edge routing caching, and styled the UI using modular CSS tokens.",
    results: [
      "Accelerated Largest Contentful Paint (LCP) from 6.2s to 1.1s.",
      "Achieved a 340% increase in purchase checkout conversion rate.",
      "Handled a peak sales traffic event of 120,000 active shoppers without a single error."
    ],
    techStack: ["Next.js", "React", "GraphQL", "Shopify Plus API", "Tailwind CSS", "Vercel Edge", "Algolia Search"]
  },
  "saas-billing": {
    title: "Global Billing Architecture for SaaS",
    category: "SaaS / Subscription Systems",
    number: "03",
    themeColor: "#059669",
    glowColor: "rgba(5, 150, 105, 0.12)",
    tagline: "Enabling a $2M ARR subscription launch in under 90 days.",
    metric: "$2.0M",
    metricLabel: "ARR Enabled in 90 Days",
    overview: "We architected and deployed a multi-tenant subscription, billing, and tax validation system for an enterprise SaaS provider. Supporting usage-based metering, cross-border localized currencies, and auto-renewals, this system provides a secure financial foundation for global expansion.",
    stats: [
      { label: "Client Partner", value: "LogiCore Software", icon: <UserCheck size={15} /> },
      { label: "Project Phase", value: "8 Weeks (Live)", icon: <Calendar size={15} /> },
      { label: "Payment Systems", value: "Stripe Connect Integration", icon: <Layers size={15} /> }
    ],
    challenge: "The client wanted to launch their developer-facing SaaS portal in 14 countries. However, their engineering team was bogged down by complex merchant accounts, usage calculation sync errors, and localized value-added tax (VAT) compliance rules, stalling their product launch.",
    solution: "We built a dedicated Node.js microservice layer hosting customized Stripe billing engines. We created usage-metering webhooks that capture API event logs, aggregate volumes hourly in Redis caches, and sync bills automatically. We connected Stripe Tax and automated localization templates to handle VAT dynamically during checkout.",
    results: [
      "Brought billing implementation to production in 60 days, ahead of schedule.",
      "Processed over 15,000 monthly usage subscriptions with zero calculations errors.",
      "Enabled $2.0 Million in annual recurring revenue (ARR) within 3 months of launch."
    ],
    techStack: ["Node.js", "Express", "PostgreSQL", "Redis", "Stripe API", "Stripe Tax", "Docker", "AWS ECS"]
  },
  "health-companion-app": {
    title: "Mobile Health Companion App",
    category: "HealthTech / Mobile Apps",
    number: "04",
    themeColor: "#ef4444",
    glowColor: "rgba(239, 68, 68, 0.12)",
    tagline: "Boasting 2.8x higher user retention rates via AI habit models.",
    metric: "2.8x",
    metricLabel: "User retention increase",
    overview: "We developed a cross-platform companion mobile application for wellness coaching. By pairing native device biometric controls and offline database synchronization with customized OpenAI suggestion loops, the application offers personalized daily health recommendations.",
    stats: [
      { label: "Client Partner", value: "FitLife Digital", icon: <UserCheck size={15} /> },
      { label: "Project Phase", value: "14 Weeks (Store Launch)", icon: <Calendar size={15} /> },
      { label: "Device Scope", value: "iOS App Store / Google Play", icon: <Activity size={15} /> }
    ],
    challenge: "Health tracking apps face high churn, with 60% of users leaving within the first 14 days due to generic tracking boards, complex data inputs, and failure to load when users are offline or traveling.",
    solution: "We built a React Native app powered by a SQLite local database framework. The database holds tracking histories offline and syncs with the cloud when online. We implemented personalized habit loops powered by OpenAI models that offer daily suggestions based on sleep and activity logs, keeping users engaged.",
    results: [
      "Increased user 30-day retention rates by 2.8x compared to previous versions.",
      "Maintained a 4.8-star review rating across over 50,000 app store reviews.",
      "Synced offline records with 99.98% reliability under flaky network conditions."
    ],
    techStack: ["React Native", "Redux Toolkit", "SQLite", "Firebase", "OpenAI API", "TypeScript", "Node.js"]
  },
  "puntopago": {
    title: "Punto Pago",
    category: "FinTech / Mobile Apps",
    number: "05",
    themeColor: "#3b82f6",
    glowColor: "rgba(59, 130, 246, 0.12)",
    tagline: "The First Super-App in Latin America, enabling utilities, payments, and marketplace transactions.",
    metric: "1.2M+",
    metricLabel: "Active monthly users",
    overview: "Punto Pago brings digital banking, marketplace shopping, and utilities payments together in a single, high-performance interface designed for Latin American markets.",
    stats: [
      { label: "Client Partner", value: "Punto Pago S.A.", icon: <UserCheck size={15} /> },
      { label: "Project Phase", value: "Completed & Scaled", icon: <Calendar size={15} /> },
      { label: "App Store Rating", value: "4.9/5 stars", icon: <Layers size={15} /> }
    ],
    challenge: "Integrating hundreds of local utility APIs while maintaining responsive startup times and secure payment handshakes on entry-level Android devices in regions with unstable cellular data.",
    solution: "We engineered a modular React Native application utilizing dynamic micro-frontends and lightweight local database syncs, backed by a Node.js API gateway that batches and caches network queries.",
    results: ["Processed more than 1.2M monthly transactions smoothly.", "Reduced app startup payload size by 42% for low-end devices.", "Decreased transaction sync errors by 94% under weak signals."],
    techStack: ["React Native", "TypeScript", "Node.js", "GraphQL", "Redis", "PostgreSQL", "Docker"]
  },
  "sca": {
    title: "Sweeping Corp of America",
    category: "Design Systems / Enterprise Operations",
    number: "06",
    themeColor: "#0f172a",
    glowColor: "rgba(15, 23, 42, 0.12)",
    tagline: "A scalable design system powering logistics and field crew service dashboards.",
    metric: "180+",
    metricLabel: "Service Hubs Integrated",
    overview: "We unified Sweeping Corp of America's internal field operations and customer scheduling interfaces under a single custom React-based component library and design system.",
    stats: [
      { label: "Client Partner", value: "Sweeping Corp of America", icon: <UserCheck size={15} /> },
      { label: "Project Phase", value: "16 Weeks (Production)", icon: <Calendar size={15} /> },
      { label: "UI Consistency", value: "100% Shared Library", icon: <Layers size={15} /> }
    ],
    challenge: "Field workers and dispatchers used fragmented legacy tools that caused communication delays, mismatched schedules, and high training overhead for new users.",
    solution: "We designed and implemented a custom Tailwind-based component library and Figma-to-code design tokens, creating a unified logistics suite for desktop and mobile.",
    results: ["Cut dispatch onboarding training time from 2 weeks to 2 days.", "Reused 85% of code across regional fleet tracking interfaces.", "Reduced dispatch scheduling errors by 40%."],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Storybook", "Figma API", "Node.js", "Docker"]
  },
  "kzero": {
    title: "Kelvin Zero",
    category: "Cybersecurity / Passwordless Authentication",
    number: "07",
    themeColor: "#4f46e5",
    glowColor: "rgba(79, 70, 229, 0.12)",
    tagline: "Multi-chain digital security product supporting zero-trust passwordless authorization.",
    metric: "0.0s",
    metricLabel: "Auth Latency",
    overview: "Kelvin Zero is an enterprise cybersecurity software that replaces traditional passwords and hardware tokens with instant cryptographic biometric verification keys.",
    stats: [
      { label: "Client Partner", value: "Kelvin Zero Inc.", icon: <UserCheck size={15} /> },
      { label: "Project Phase", value: "14 Weeks (Certified)", icon: <Calendar size={15} /> },
      { label: "Security Level", value: "Military Grade Zero-Trust", icon: <Layers size={15} /> }
    ],
    challenge: "Users suffered from phishing vulnerabilities and slow hardware-key syncs, while administrators struggled with token provisioning costs.",
    solution: "We developed a decentralized authentication system using secure WebAuthn protocols and elliptic curve cryptography, wrapped in a sleek, lightweight portal.",
    results: ["Completely eliminated credentials-based phishing vectors.", "Reduced authentication time to under 100 milliseconds.", "Deployed to 50,000+ enterprise employees without desktop lag."],
    techStack: ["React", "Rust", "WebAuthn API", "WebAssembly", "Docker", "AWS KMS", "Tailwind"]
  },
  "daoway": {
    title: "DaoWay",
    category: "Astrology / Mobile Application",
    number: "08",
    themeColor: "#7c3aed",
    glowColor: "rgba(124, 58, 237, 0.12)",
    tagline: "Astrology-based scheduling and wellness app: plan, achieve, and thrive.",
    metric: "850K",
    metricLabel: "Downloads in App Store",
    overview: "DaoWay integrates celestial calculations with daily task planning, providing users with personalized time management insights based on astrology.",
    stats: [
      { label: "Client Partner", value: "DaoWay Ltd.", icon: <UserCheck size={15} /> },
      { label: "Project Phase", value: "12 Weeks (Launched)", icon: <Calendar size={15} /> },
      { label: "Daily Engagement", value: "45 Minutes Average", icon: <Layers size={15} /> }
    ],
    challenge: "Calculating high-precision planetary positions and birth chart houses in real-time caused heavy CPU spikes and battery drainage on mobile devices.",
    solution: "We outsourced complex celestial mathematical algorithms to a serverless AWS Lambda backend and built a highly optimized local cache using SQLite in Flutter.",
    results: ["Reduced mobile CPU usage by 65% during daily calculations.", "Achieved a 45-minute daily average engagement rate per user.", "Grew organically to 850,000 active app store installations."],
    techStack: ["Flutter", "Dart", "AWS Lambda", "Python (Ephemeris)", "SQLite", "Firebase", "App Store Connect"]
  },
  "flipaclip": {
    title: "FlipaClip",
    category: "Animation / Web & Mobile Software",
    number: "09",
    themeColor: "#ec4899",
    glowColor: "rgba(236, 72, 153, 0.12)",
    tagline: "Scaling the web companion platform for the world's best mobile stop-motion tool.",
    metric: "30M+",
    metricLabel: "Creations Exported",
    overview: "We designed and built the social sharing, tutorial, and asset marketplace web companion app for FlipaClip, the premier mobile frame-by-frame animation software.",
    stats: [
      { label: "Client Partner", value: "Visual Blasters LLC", icon: <UserCheck size={15} /> },
      { label: "Project Phase", value: "Ongoing Partnership", icon: <Calendar size={15} /> },
      { label: "Monthly Visits", value: "4.2M Active", icon: <Layers size={15} /> }
    ],
    challenge: "Enabling millions of animators to upload, preview, and share high-resolution video exports without incurring massive cloud storage and bandwidth costs.",
    solution: "We implemented a decentralized client-side video compression pipeline and integrated Cloudflare Stream edge nodes for cost-optimized video delivery.",
    results: ["Hosted over 30 Million animation creations with 100% uptime.", "Cut streaming bandwidth expenses by 55% using edge delivery.", "Grew community engagement metrics by 180% year-over-year."],
    techStack: ["React", "TypeScript", "Cloudflare Workers", "Cloudflare Stream", "S3", "FFmpeg", "Node.js"]
  },
  "riyadh": {
    title: "Riyadh Municipal Portal",
    category: "GovTech / Smart City Web Platform",
    number: "10",
    themeColor: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.12)",
    tagline: "Official portal of Saudi Arabia's capital city, streamlining citizen inquiries.",
    metric: "4.5M",
    metricLabel: "Citizens Served",
    overview: "We collaborated with Riyadh municipal planners to redesign their citizen-facing portal, integrating geographical mapping, payment of fees, and permit requests.",
    stats: [
      { label: "Client Partner", value: "Municipality of Riyadh", icon: <UserCheck size={15} /> },
      { label: "Project Phase", value: "Completed & Live", icon: <Calendar size={15} /> },
      { label: "Accessibility", value: "WCAG 2.1 AAA Compliant", icon: <Layers size={15} /> }
    ],
    challenge: "Legacy systems were disjointed, slow, and inaccessible on mobile, leading to citizen frustration and overloaded offices.",
    solution: "We built a unified portal using modern Next.js and Mapbox GL, connected to municipal databases via a secure enterprise API gateway.",
    results: ["Successfully served Riyadh's 4.5 million residents.", "Reduced citizen in-person office visits by 50%.", "Achieved full accessibility compliance for people of determination."],
    techStack: ["Next.js", "React", "Mapbox GL", "PostgreSQL", "Java Spring Boot", "AWS", "Kubernetes"]
  },
  "zelt": {
    title: "Zelt",
    category: "SaaS / Enterprise Software",
    number: "11",
    themeColor: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.12)",
    tagline: "Run HR, IT and Finance in one place. Streamline onboarding and payroll.",
    metric: "80%",
    metricLabel: "Admin Time Saved",
    overview: "We engineered the front-end dashboard and core workflow state engines for Zelt, a unified SaaS app that handles payroll, HR, and IT device management.",
    stats: [
      { label: "Client Partner", value: "Zelt Tech Ltd.", icon: <UserCheck size={15} /> },
      { label: "Project Phase", value: "10 Weeks (Production)", icon: <Calendar size={15} /> },
      { label: "Onboarding speed", value: "Under 5 Minutes", icon: <Layers size={15} /> }
    ],
    challenge: "Complex business workflows required syncing data between employee directories, local bank payment schemes, and device MDM profiles simultaneously.",
    solution: "We built a reactive React state engine backed by GraphQL subscriptions and designed a sleek dashboard that displays status logs clearly.",
    results: ["Saved admin teams 80% of manual data entry hours.", "Reduced employee onboarding setup time to under 5 minutes.", "Successfully processed monthly payroll for over 400 client teams."],
    techStack: ["React", "GraphQL", "TypeScript", "Apollo Client", "Tailwind CSS", "NestJS", "Node.js"]
  },
  "potion": {
    title: "Potion Video",
    category: "SaaS / Video Marketing Tools",
    number: "12",
    themeColor: "#84cc16",
    glowColor: "rgba(132, 204, 22, 0.12)",
    tagline: "Sales tool for generating personalized video outreach campaigns at scale.",
    metric: "+210%",
    metricLabel: "Sales Email Response",
    overview: "Potion allows sales teams to record a single video and dynamically customize names, backgrounds, and URLs for thousands of prospects.",
    stats: [
      { label: "Client Partner", value: "Potion Labs Inc.", icon: <UserCheck size={15} /> },
      { label: "Project Phase", value: "8 Weeks (Launched)", icon: <Calendar size={15} /> },
      { label: "Campaign Speed", value: "1000 Videos/Min", icon: <Layers size={15} /> }
    ],
    challenge: "Processing and rendering thousands of customized videos in standard browser environments led to heavy server bills and long rendering delays.",
    solution: "We designed an automated rendering pipeline using node clusters on AWS and integrated client-side media recording in React.",
    results: ["Boosted sales campaign email response rates by 210% average.", "Reduced video generation time to 1 minute for a 1,000-prospect list.", "Handled large files using client-side video processing."],
    techStack: ["React", "Node.js", "AWS EC2", "FFmpeg", "WebRTC", "PostgreSQL", "Redis"]
  },
  "magma": {
    title: "Magma Web3",
    category: "Web3 / Collaborative Canvas",
    number: "13",
    themeColor: "#d946ef",
    glowColor: "rgba(217, 70, 239, 0.12)",
    tagline: "The ultimate collaborative 3D tool for digital artists building in the Web3 era.",
    metric: "50K+",
    metricLabel: "Active Collaborative Canvases",
    overview: "We designed the WebGL-enabled interactive painting canvas and multi-user room state synchronizers for Magma.",
    stats: [
      { label: "Client Partner", value: "Magma Inc.", icon: <UserCheck size={15} /> },
      { label: "Project Phase", value: "14 Weeks (Live)", icon: <Calendar size={15} /> },
      { label: "Sync Latency", value: "12ms Real-Time", icon: <Layers size={15} /> }
    ],
    challenge: "Synchronizing millions of canvas paintbrush strokes in real-time between dozens of global artists on a 3D WebGL viewport without brush lag.",
    solution: "We built a custom WebSockets sync engine utilizing binary payload protocols and optimized the WebGL canvas contexts using Three.js.",
    results: ["Maintained zero-latency drawing sync at 12ms global average.", "Supported 50,000 active rooms without brush delays.", "Scaled seamlessly to support large-canvas painting."],
    techStack: ["TypeScript", "WebGL", "Three.js", "WebSockets", "Node.js", "Redis", "C++ Engine Node"]
  },
  "cisco": {
    title: "Cisco Network Cloud",
    category: "Cloud Computing / Brand Design",
    number: "14",
    themeColor: "#0284c7",
    glowColor: "rgba(2, 132, 199, 0.12)",
    tagline: "A cohesive design system and front-end interface for cloud network controllers.",
    metric: "99.999%",
    metricLabel: "Network Uptime Dashboard",
    overview: "We designed and built the front-end monitoring panel and unified brand component templates for Cisco's cloud network management systems.",
    stats: [
      { label: "Client Partner", value: "Cisco Systems", icon: <UserCheck size={15} /> },
      { label: "Project Phase", value: "Enterprise Contract", icon: <Calendar size={15} /> },
      { label: "Supported Devices", value: "10M+ Switched Ports", icon: <Layers size={15} /> }
    ],
    challenge: "Representing massive streams of real-time server network packet data in a dashboard that is clean, digestible, and responsive for admins.",
    solution: "We developed a canvas-based data stream rendering chart library and built components under strict enterprise accessibility guidelines.",
    results: ["Handled data refreshes of 100,000 events/second without browser lag.", "Standardized UI components across 4 legacy cloud controller products.", "Ensured robust accessibility compliance."],
    techStack: ["Vue.js", "TypeScript", "D3.js", "HTML5 Canvas", "Tailwind CSS", "Webpack", "Jira API"]
  },
  "qvino": {
    title: "Qvino Wine Platform",
    category: "E-Commerce / EdTech Application",
    number: "15",
    themeColor: "#be123c",
    glowColor: "rgba(190, 18, 60, 0.12)",
    tagline: "Wine marketplace paired with interactive sommelier learning and matching.",
    metric: "+145%",
    metricLabel: "Average Order Value",
    overview: "Qvino combines a direct-to-consumer wine marketplace with educational courses and an interactive sommelier recommendation engine.",
    stats: [
      { label: "Client Partner", value: "Qvino LLC", icon: <UserCheck size={15} /> },
      { label: "Project Phase", value: "10 Weeks (Launched)", icon: <Calendar size={15} /> },
      { label: "Matching Accuracy", value: "92% Customer Satisfaction", icon: <Layers size={15} /> }
    ],
    challenge: "Guiding novice wine buyers to premium bottles without overwhelming them with professional sommelier jargon.",
    solution: "We designed an interactive swipe-based flavor quiz and built a recommendation algorithm that maps customer tastes to sommelier databases.",
    results: ["Achieved a 145% increase in average order shopping basket value.", "Helped over 50,000 users discover new wineries.", "Processed e-commerce checkouts in under 30 seconds."],
    techStack: ["SwiftUI", "iOS Native", "Node.js", "Express", "PostgreSQL", "Stripe Checkout", "Algolia"]
  },
  "ferrumpipe": {
    title: "Ferrumpipe Industrial",
    category: "Industrial / Web Configuration",
    number: "16",
    themeColor: "#64748b",
    glowColor: "rgba(100, 116, 139, 0.12)",
    tagline: "3D galvanized steel frame configurator and B2B ordering portal.",
    metric: "3.5x",
    metricLabel: "Quoting Cycle Speedup",
    overview: "We built a customized web portal featuring an interactive 3D metal frame configurator for industrial manufacturer Ferrumpipe.",
    stats: [
      { label: "Client Partner", value: "Ferrumpipe Corp", icon: <UserCheck size={15} /> },
      { label: "Project Phase", value: "12 Weeks (Production)", icon: <Calendar size={15} /> },
      { label: "Ordering Speed", value: "Instant CAD Generation", icon: <Layers size={15} /> }
    ],
    challenge: "B2B customers had to wait 3 to 5 business days for engineers to manually generate CAD drawings and price quotes for custom steel frames.",
    solution: "We built a web-based 3D configurator using React Three Fiber that calculates specifications instantly and generates CAD files for ordering.",
    results: ["Reduced sales quoting cycles from 5 days to instant.", "Enabled B2B clients to customize and order steel frames online.", "Decreased manufacturing blueprint errors to zero."],
    techStack: ["React", "React Three Fiber", "Three.js", "Node.js", "PostgreSQL", "AWS S3", "Vite"]
  },
  "nurseclub": {
    title: "Nurse CE Club",
    category: "EdTech / Website Revamp",
    number: "17",
    themeColor: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.12)",
    tagline: "EdTech platform revamp featuring interactive 3D graphics for nursing credentials.",
    metric: "95K+",
    metricLabel: "Nurses Certified",
    overview: "We redesigned the educational portal for Nurse CE Club, streamlining class scheduling, exam scoring, and continuing education certifications.",
    stats: [
      { label: "Client Partner", value: "Nurse CE Club", icon: <UserCheck size={15} /> },
      { label: "Project Phase", value: "8 Weeks (Live)", icon: <Calendar size={15} /> },
      { label: "Course Completion", value: "+78% Growth", icon: <Layers size={15} /> }
    ],
    challenge: "The legacy site was slow and outdated, causing nurses to drop out of continuing education courses due to frustrating navigation.",
    solution: "We built a modern Next.js frontend with Lottie micro-animations, an interactive dashboard, and a secure certificate generator.",
    results: ["Helped over 95,000 nurses earn active certifications.", "Achieved a 78% increase in course completion rates.", "Reduced server page load time by 3.2 seconds."],
    techStack: ["Next.js", "React", "Node.js", "MongoDB", "Mux Video", "Lottie React", "PDFKit"]
  },
  "ulesson": {
    title: "uLesson Learning",
    category: "EdTech / Mobile Platform",
    number: "18",
    themeColor: "#e11d48",
    glowColor: "rgba(225, 29, 72, 0.12)",
    tagline: "Scaling distance learning video platforms across Sub-Saharan Africa.",
    metric: "2.0M+",
    metricLabel: "Lessons Delivered",
    overview: "We developed optimized streaming interfaces and lesson download workflows for uLesson, the leading African k-12 learning application.",
    stats: [
      { label: "Client Partner", value: "uLesson Education Ltd.", icon: <UserCheck size={15} /> },
      { label: "Project Phase", value: "Ongoing Collaboration", icon: <Calendar size={15} /> },
      { label: "Data Efficiency", value: "60% Bandwidth Saved", icon: <Layers size={15} /> }
    ],
    challenge: "Delivering high-quality educational video content to regions with high data costs and slow cellular network networks.",
    solution: "We built a customized, data-efficient video compression system in Android and created offline lesson libraries.",
    results: ["Delivered over 2 Million lessons to remote classrooms.", "Saved student households 60% in cellular data usage costs.", "Achieved offline database synchronization."],
    techStack: ["Android SDK", "Java", "Kotlin", "SQLite", "ExoPlayer", "AWS MediaConvert", "Node.js"]
  },
  "sleepiest": {
    title: "Sleepiest Wellness",
    category: "HealthTech / Mobile App",
    number: "19",
    themeColor: "#4338ca",
    glowColor: "rgba(67, 56, 202, 0.12)",
    tagline: "Interactive sleep app helping millions fall asleep every night.",
    metric: "4.8★",
    metricLabel: "App Store Rating",
    overview: "Sleepiest offers users custom sleep stories, smart alarms, and audio soundscapes, designed to improve nighttime rest patterns.",
    stats: [
      { label: "Client Partner", value: "Sleepiest UK Ltd.", icon: <UserCheck size={15} /> },
      { label: "Project Phase", value: "12 Weeks (Production)", icon: <Calendar size={15} /> },
      { label: "Subscribers", value: "300K+ Paid", icon: <Layers size={15} /> }
    ],
    challenge: "Laggy audio transitions and slow page loading ruined the relaxing user experience intended before bed.",
    solution: "We optimized the audio streaming buffer in React Native and designed a beautiful, dark-mode user interface.",
    results: ["Maintained a 4.8 App Store review rating across 50,000 reviews.", "Supported over 300,000 active monthly premium subscribers.", "Achieved gapless audio playback loops."],
    techStack: ["React Native", "TypeScript", "Redux", "AVFoundation", "Firebase", "Node.js", "Vercel"]
  },
  "euroauto": {
    title: "EuroAuto Logistics",
    category: "E-Commerce / B2B Logistics",
    number: "20",
    themeColor: "#047857",
    glowColor: "rgba(4, 120, 87, 0.12)",
    tagline: "Custom B2B inventory tracking and barcode cataloging app.",
    metric: "1.5M+",
    metricLabel: "Catalog Items Tracked",
    overview: "We developed a high-speed catalog database and inventory scanning app for EuroAuto, a large auto parts supplier.",
    stats: [
      { label: "Client Partner", value: "EuroAuto LLC", icon: <UserCheck size={15} /> },
      { label: "Project Phase", value: "10 Weeks (Production)", icon: <Calendar size={15} /> },
      { label: "Scan Latency", value: "Under 50ms", icon: <Layers size={15} /> }
    ],
    challenge: "Warehouse operators spent hours manually cataloging complex auto parts due to slow inventory databases.",
    solution: "We built a mobile scanning client in Flutter with instant SQLite catalog queries and automated barcode capture.",
    results: ["Tracked over 1.5 Million auto parts in real-time.", "Reduced stock checking time by 70% in regional hubs.", "Achieved scanning speeds under 50ms."],
    techStack: ["Flutter", "Dart", "SQLite", "Node.js", "Redis Cache", "PostgreSQL", "Docker"]
  },
  "genesis": {
    title: "Genesis Vision",
    category: "FinTech / Trading Platform",
    number: "21",
    themeColor: "#1d4ed8",
    glowColor: "rgba(29, 78, 216, 0.12)",
    tagline: "Private trust management and blockchain trading platform.",
    metric: "$40M+",
    metricLabel: "Trading Volume Enabled",
    overview: "Genesis Vision is a decentralized trust management network that connects asset managers with digital traders.",
    stats: [
      { label: "Client Partner", value: "Genesis Vision Group", icon: <UserCheck size={15} /> },
      { label: "Project Phase", value: "14 Weeks (Live)", icon: <Calendar size={15} /> },
      { label: "Security", value: "Smart Contract Audited", icon: <Layers size={15} /> }
    ],
    challenge: "Providing transparent, tamper-proof reporting of fund performance across thousands of private client accounts.",
    solution: "We built an audit portal connected to Ethereum smart contracts and designed real-time charting interfaces.",
    results: ["Processed over $40 Million in digital trading volume.", "Enabled transparent asset performance reporting.", "Completed smart contract security audits."],
    techStack: ["React Native", "Web3.js", "Solidity", "Node.js", "Chart.js", "Docker", "AWS"]
  },
  "wickret": {
    title: "Wickret FinTech",
    category: "FinTech / Web Development",
    number: "22",
    themeColor: "#1e3a8a",
    glowColor: "rgba(30, 58, 138, 0.12)",
    tagline: "A fresh mobile banking portal focused on digital-first customers.",
    metric: "100K+",
    metricLabel: "Cards Activated",
    overview: "We designed and developed the onboarding portals and card activation flows for Wickret, a modern consumer neobank.",
    stats: [
      { label: "Client Partner", value: "Wickret Inc.", icon: <UserCheck size={15} /> },
      { label: "Project Phase", value: "8 Weeks (Launched)", icon: <Calendar size={15} /> },
      { label: "Approval Speed", value: "Instant KYC Checks", icon: <Layers size={15} /> }
    ],
    challenge: "Friction during user registration caused over 45% of users to drop out before activating their bank cards.",
    solution: "We designed a simplified, friendly KYC onboarding wizard and built robust backend verification pipelines.",
    results: ["Activated over 100,000 consumer bank cards.", "Reduced KYC onboarding registration time to 90 seconds.", "Decreased registration drop-out rates by 35%."],
    techStack: ["Next.js", "React", "TypeScript", "Node.js", "Shufti Pro API", "MongoDB", "Express"]
  },
  "rallyreader": {
    title: "Rally Reader",
    category: "EdTech / AI Application",
    number: "23",
    themeColor: "#b45309",
    glowColor: "rgba(180, 83, 9, 0.12)",
    tagline: "An AI reading coach that listens to children read and tracks fluency.",
    metric: "98%",
    metricLabel: "Speech Recognition Accuracy",
    overview: "Rally Reader is an iPad and web application that listens to students read aloud, tracking mistakes and reading speed in real-time.",
    stats: [
      { label: "Client Partner", value: "Rally Reader LLC", icon: <UserCheck size={15} /> },
      { label: "Project Phase", value: "12 Weeks (Production)", icon: <Calendar size={15} /> },
      { label: "Fluency Lift", value: "+35% Reading Score", icon: <Layers size={15} /> }
    ],
    challenge: "Standard speech recognition tools struggle to understand children's voices, speech impediments, and pronunciation mistakes.",
    solution: "We integrated a customized speech-to-text algorithm and built a reading interface that highlights words as the child reads.",
    results: ["Achieved a 98% accuracy rate in word tracking.", "Helped students improve reading fluency scores by 35%.", "Deployed to over 150 elementary school classrooms."],
    techStack: ["React", "TypeScript", "CoreSpeech API", "Python AI Workers", "PostgreSQL", "Docker", "S3"]
  },
  "consumervoice": {
    title: "ConsumerVoice",
    category: "E-Commerce / Web Platform",
    number: "24",
    themeColor: "#15803d",
    glowColor: "rgba(21, 128, 61, 0.12)",
    tagline: "Review aggregator that helps shoppers find verified product ratings.",
    metric: "1.2M",
    metricLabel: "Monthly Search Queries",
    overview: "ConsumerVoice aggregates product reviews, filters out spam posts, and displays verified ratings for consumer goods.",
    stats: [
      { label: "Client Partner", value: "ConsumerVoice Inc.", icon: <UserCheck size={15} /> },
      { label: "Project Phase", value: "8 Weeks (Live)", icon: <Calendar size={15} /> },
      { label: "Spam Detection", value: "99.2% Accuracy", icon: <Layers size={15} /> }
    ],
    challenge: "Combating fake reviews, paid merchant spam, and maintaining fast search index times across millions of products.",
    solution: "We built a review parsing crawler using Python workers and implemented a search interface with Algolia.",
    results: ["Handled 1.2 Million monthly search queries.", "Filtered out 99.2% of spam and fake product reviews.", "Achieved search query results under 20ms."],
    techStack: ["Next.js", "React", "Python Crawler", "Algolia Search", "Redis", "PostgreSQL", "Vercel"]
  },
  "monmarche": {
    title: "Mon Marché",
    category: "E-Commerce / Delivery Application",
    number: "25",
    themeColor: "#16a34a",
    glowColor: "rgba(22, 163, 74, 0.12)",
    tagline: "Home delivery of fresh fruit and organic vegetables.",
    metric: "98.8%",
    metricLabel: "On-Time Deliveries",
    overview: "Mon Marché connects local organic farmers directly with residential grocery shoppers, delivering fresh produce daily.",
    stats: [
      { label: "Client Partner", value: "Mon Marché France", icon: <UserCheck size={15} /> },
      { label: "Project Phase", value: "10 Weeks (Live)", icon: <Calendar size={15} /> },
      { label: "Client Retention", value: "82% Repeat Orders", icon: <Layers size={15} /> }
    ],
    challenge: "Managing perishable inventories and routing dozens of delivery trucks efficiently through changing city traffic.",
    solution: "We built an inventory tracking database in Node.js and developed an automated delivery route planner.",
    results: ["Maintained a 98.8% on-time delivery rate.", "Supported an 82% monthly customer repeat order rate.", "Reduced truck fuel consumption by 20% using routing."],
    techStack: ["React Native", "TypeScript", "Node.js", "Express", "PostgreSQL", "Google Maps Routing", "Redis"]
  },
  "datalight": {
    title: "DataLight Crypto",
    category: "Web3 / Analytics Tool",
    number: "26",
    themeColor: "#701a75",
    glowColor: "rgba(112, 26, 117, 0.12)",
    tagline: "Professional dashboard for detailed cryptocurrency market analysis.",
    metric: "30M+",
    metricLabel: "Data Points Processed/Day",
    overview: "DataLight offers crypto traders advanced charting tools, sentiment analysis, and blockchain transaction data metrics.",
    stats: [
      { label: "Client Partner", value: "DataLight Inc.", icon: <UserCheck size={15} /> },
      { label: "Project Phase", value: "12 Weeks (Production)", icon: <Calendar size={15} /> },
      { label: "Live Refresh Rate", value: "Every 1.5 Seconds", icon: <Layers size={15} /> }
    ],
    challenge: "Ingesting and visualizing live exchange orderbooks and social media sentiment indexes without freezing the UI.",
    solution: "We built a dashboard using canvas-based charts and processed live data feeds in Web Workers.",
    results: ["Processed over 30 Million daily block data points.", "Maintained fluid 60fps chart rendering during high market volatility.", "Reduced dashboard browser memory usage by 45%."],
    techStack: ["React", "TypeScript", "D3.js", "Web Workers", "WebSockets", "Node.js", "ClickHouse"]
  },
};
