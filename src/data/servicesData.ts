export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: "Development" | "Digital Marketing" | "Support & Consulting" | "Solutions";
  iconName: string;
  features: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "web-dev",
    title: "Web Development",
    description: "End-to-end design, development, and hosting of high-performance web applications using React, Next.js, and Node.js.",
    category: "Development",
    iconName: "Globe",
    features: ["Responsive design", "SPA & SSR configurations", "CMS integration", "SEO optimization"]
  },
  {
    id: "mobile-dev",
    title: "Mobile App Development",
    description: "Top-tier native and hybrid mobile apps for iOS and Android, focusing on seamless animation and user flow.",
    category: "Development",
    iconName: "Smartphone",
    features: ["iOS App Store deployment", "Google Play Store deployment", "Cross-platform consistency", "Offline capabilities"]
  },
  {
    id: "crm-systems",
    title: "CRM Solutions",
    description: "Custom Client Relationship Management software to streamline lead intake, ticketing, and support pipelines.",
    category: "Solutions",
    iconName: "Users",
    features: ["Automated reminders", "Visual sales pipeline", "Detailed metrics dashboard", "Email integration"]
  },
  {
    id: "digital-marketing",
    title: "SEO & Digital Marketing",
    description: "Data-backed campaigns to drive organic search results, pay-per-click traffic, and social brand awareness.",
    category: "Digital Marketing",
    iconName: "Search",
    features: ["Keyword research", "On-page SEO auditing", "Competitor analysis", "Monthly reports"]
  }
];
