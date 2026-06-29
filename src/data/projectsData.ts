export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  categories: string[];
  imageUrl: string;
  videoUrl: string;
  theme: string;
  glow: string;
  tags: string[];
}

export const projectsData: ProjectItem[] = [
  {
    id: "ai-crm-fintech",
    title: "AI-Powered CRM for FinTech",
    description: "Next-gen CRM with ML-driven lead scoring and automated workflows.",
    categories: ["app"],
    imageUrl: "/images/projects/crm-mockup.png",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-connection-lines-loop-40102-large.mp4",
    theme: "#2563eb",
    glow: "rgba(37, 99, 235, 0.12)",
    tags: ["CRM", "FinTech", "AI", "ML"]
  },
  {
    id: "retail-platform",
    title: "EU Retail Platform Rebuild",
    description: "Complete e-commerce rebuild with headless architecture, delivering an uplift in conversion rate.",
    categories: ["web"],
    imageUrl: "/images/projects/retail-mockup.png",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-abstract-digital-background-loop-40101-large.mp4",
    theme: "#10b981",
    glow: "rgba(16, 185, 129, 0.12)",
    tags: ["E-Commerce", "Headless", "Next.js"]
  },
  {
    id: "saas-billing",
    title: "Global Billing Architecture for SaaS",
    description: "Architected a Stripe-based billing system supporting localized subscription pricing tiers and compliance.",
    categories: ["web"],
    imageUrl: "/images/projects/billing-mockup.png",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-financial-chart-loop-40097-large.mp4",
    theme: "#059669",
    glow: "rgba(5, 150, 105, 0.12)",
    tags: ["SaaS", "Billing", "Stripe", "Node.js"]
  },
  {
    id: "health-companion-app",
    title: "Mobile Health Companion App",
    description: "Cross-platform health tracking app with AI-driven personalization and offline sync.",
    categories: ["app"],
    imageUrl: "/images/projects/health-mockup.png",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-smartwatch-displaying-heart-rate-loop-46761-large.mp4",
    theme: "#ef4444",
    glow: "rgba(239, 68, 68, 0.12)",
    tags: ["Mobile App", "HealthTech", "React Native"]
  },
  {
    id: "puntopago",
    title: "Punto Pago",
    description: "The First Super-App in Latin America",
    categories: ["app", "branding"],
    imageUrl: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-connection-lines-loop-40102-large.mp4",
    theme: "#3b82f6",
    glow: "rgba(59, 130, 246, 0.12)",
    tags: ["Mobile App", "Super-App", "FinTech", "Branding"]
  },
  {
    id: "sca",
    title: "Sweeping Corp of America",
    description: "Scalable design system for enterprise operations",
    categories: ["web"],
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-abstract-digital-background-loop-40101-large.mp4",
    theme: "#0f172a",
    glow: "rgba(15, 23, 42, 0.12)",
    tags: ["Design System", "Enterprise Ops", "Web Portal", "React"]
  },
  {
    id: "kzero",
    title: "Kelvin Zero",
    description: "A digital product for passwordless authentication",
    categories: ["web"],
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-financial-chart-loop-40097-large.mp4",
    theme: "#4f46e5",
    glow: "rgba(79, 70, 229, 0.12)",
    tags: ["Cybersecurity", "Passwordless", "Cryptography", "Next.js"]
  },
  {
    id: "daoway",
    title: "DaoWay",
    description: "Astrology planner app: plan, achieve, thrive",
    categories: ["app"],
    imageUrl: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-smartwatch-displaying-heart-rate-loop-46761-large.mp4",
    theme: "#7c3aed",
    glow: "rgba(124, 58, 237, 0.12)",
    tags: ["Astrology App", "Planner App", "iOS & Android", "Flutter"]
  },
  {
    id: "flipaclip",
    title: "FlipaClip",
    description: "The best tool for stop-motion animation",
    categories: ["web"],
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-technology-network-loops-40094-large.mp4",
    theme: "#ec4899",
    glow: "rgba(236, 72, 153, 0.12)",
    tags: ["Animation Tool", "Stop-Motion", "Web App", "Canvas API"]
  },
  {
    id: "riyadh",
    title: "Riyadh",
    description: "Official website of Riyadh, Saudi Arabia's capital",
    categories: ["web", "app"],
    imageUrl: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-connection-lines-loop-40102-large.mp4",
    theme: "#10b981",
    glow: "rgba(16, 185, 129, 0.12)",
    tags: ["GovTech", "Official Portal", "Scale City Web", "Mapbox GL"]
  },
  {
    id: "zelt",
    title: "Zelt",
    description: "Run HR, IT & Finance in one place",
    categories: ["web", "branding"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-abstract-digital-background-loop-40101-large.mp4",
    theme: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.12)",
    tags: ["SaaS Platform", "Enterprise HR & IT", "Dashboard", "Tailwind"]
  },
  {
    id: "potion",
    title: "Potion",
    description: "Sales tool for increasing conversions",
    categories: ["web"],
    imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-smartphone-typing-40096-large.mp4",
    theme: "#84cc16",
    glow: "rgba(132, 204, 22, 0.12)",
    tags: ["Sales Tool", "Video Personalization", "Chrome Extension", "React"]
  },
  {
    id: "magma",
    title: "Magma",
    description: "The ultimate tool for building in the Web3 era",
    categories: ["web"],
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-technology-network-loops-40094-large.mp4",
    theme: "#d946ef",
    glow: "rgba(217, 70, 239, 0.12)",
    tags: ["Web3 Platform", "3D Collaborative Canvas", "Realtime Sync", "Three.js"]
  },
  {
    id: "cisco",
    title: "Cisco",
    description: "Cloud based network management",
    categories: ["branding"],
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-connection-lines-loop-40102-large.mp4",
    theme: "#0284c7",
    glow: "rgba(2, 132, 199, 0.12)",
    tags: ["Network Management", "Cloud Network Control", "B2B Branding", "Vue"]
  },
  {
    id: "qvino",
    title: "Qvino",
    description: "Wine marketplace with interactive learning",
    categories: ["app"],
    imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-financial-chart-loop-40097-large.mp4",
    theme: "#be123c",
    glow: "rgba(190, 18, 60, 0.12)",
    tags: ["E-Commerce Marketplace", "Interactive App", "Wine Selection", "SwiftUI"]
  },
  {
    id: "ferrumpipe",
    title: "Ferrumpipe",
    description: "Galvanized steel metal frame manufacturer",
    categories: ["web"],
    imageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-abstract-digital-background-loop-40101-large.mp4",
    theme: "#64748b",
    glow: "rgba(100, 116, 139, 0.12)",
    tags: ["Manufacturing Portal", "3D Configurator", "Web Showcase", "Web Components"]
  },
  {
    id: "nurseclub",
    title: "Nurse CE Club",
    description: "Website revamp with 3D graphics",
    categories: ["web", "branding"],
    imageUrl: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-smartwatch-displaying-heart-rate-loop-46761-large.mp4",
    theme: "#06b6d4",
    glow: "rgba(6, 182, 212, 0.12)",
    tags: ["EdTech", "3D Visuals", "Web Revamp", "Lottie Animations"]
  },
  {
    id: "ulesson",
    title: "uLesson",
    description: "Online platform for distance learning",
    categories: ["web", "app"],
    imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-technology-network-loops-40094-large.mp4",
    theme: "#e11d48",
    glow: "rgba(225, 29, 72, 0.12)",
    tags: ["Distance Learning", "Video Courses", "Mobile App", "Android Native"]
  },
  {
    id: "sleepiest",
    title: "Sleepiest",
    description: "Sleep app helps millions fall asleep every night",
    categories: ["app"],
    imageUrl: "https://images.unsplash.com/photo-1511295742364-92767fa62d9f?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-smartphone-typing-40096-large.mp4",
    theme: "#4338ca",
    glow: "rgba(67, 56, 202, 0.12)",
    tags: ["Sleep Tracking App", "Audio Library", "iOS Development", "React Native"]
  },
  {
    id: "euroauto",
    title: "EuroAuto",
    description: "Largest auto parts supplier in Russia",
    categories: ["app"],
    imageUrl: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-abstract-digital-background-loop-40101-large.mp4",
    theme: "#047857",
    glow: "rgba(4, 120, 87, 0.12)",
    tags: ["Supply Chain App", "Barcode Scanner", "B2B Logistics", "Flutter"]
  },
  {
    id: "genesis",
    title: "Genesis Vision",
    description: "Private trust management and trading platform",
    categories: ["app"],
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-financial-chart-loop-40097-large.mp4",
    theme: "#1d4ed8",
    glow: "rgba(29, 78, 216, 0.12)",
    tags: ["Trust Management", "Trading Platform", "Web3 Integration", "React Native"]
  },
  {
    id: "wickret",
    title: "Wickret",
    description: "A new way to think about money",
    categories: ["web"],
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-smartphone-typing-40096-large.mp4",
    theme: "#1e3a8a",
    glow: "rgba(30, 58, 138, 0.12)",
    tags: ["FinTech", "Neobank Portal", "Responsive Web Design", "Next.js"]
  },
  {
    id: "rallyreader",
    title: "Rally Reader",
    description: "Private reading coach that hears you read",
    categories: ["web", "app"],
    imageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-technology-network-loops-40094-large.mp4",
    theme: "#b45309",
    glow: "rgba(180, 83, 9, 0.12)",
    tags: ["Reading Coach", "Audio OCR Analysis", "AI Learning Assistant", "iOS & iPadOS"]
  },
  {
    id: "consumervoice",
    title: "ConsumerVoice",
    description: "A service that helps find verified products",
    categories: ["branding"],
    imageUrl: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-connection-lines-loop-40102-large.mp4",
    theme: "#15803d",
    glow: "rgba(21, 128, 61, 0.12)",
    tags: ["Product Review Board", "Verified Rating Hub", "Rebranding", "SEO Optimizations"]
  },
  {
    id: "monmarche",
    title: "Mon Marché",
    description: "Home delivery of fresh fruit and vegetables",
    categories: ["app"],
    imageUrl: "https://images.unsplash.com/photo-1610348725531-843dff14722a?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-smartwatch-displaying-heart-rate-loop-46761-large.mp4",
    theme: "#16a34a",
    glow: "rgba(22, 163, 74, 0.12)",
    tags: ["Grocery Delivery", "Route Optimization", "Cart Workflow", "Expo & SQLite"]
  },
  {
    id: "datalight",
    title: "DataLight",
    description: "Instrument for cryptocurrency market analysis",
    categories: ["branding"],
    imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-financial-chart-loop-40097-large.mp4",
    theme: "#701a75",
    glow: "rgba(112, 26, 117, 0.12)",
    tags: ["Cryptocurrency Analytics", "Chart Tool", "Brand Strategy", "React"]
  }
];
