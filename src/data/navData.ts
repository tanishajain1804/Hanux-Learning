export interface NavItem {
  label: string;
  href?: string;
  dropdownItems?: {
    title: string;
    description: string;
    href: string;
    icon: string;
  }[];
  isMega?: boolean;
}

export const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/"
  },
  {
    label: "About",
    href: "/about"
  },
  {
    label: "Services",
    isMega: true,
    dropdownItems: [
      {
        title: "Website Development",
        description: "High-performance websites built for growth and scalability.",
        href: "/services/web-development",
        icon: "Monitor"
      },
      {
        title: "Mobile App Development",
        description: "Native & cross-platform apps that deliver exceptional experiences.",
        href: "/services/mobile-apps",
        icon: "Smartphone"
      },
      {
        title: "SaaS Development",
        description: "Scalable SaaS products that help you automate and scale faster.",
        href: "/services/software-development",
        icon: "Cloud"
      },
      {
        title: "CRM Solutions",
        description: "Custom CRM to streamline your business and customer relationships.",
        href: "/services/crm-solutions",
        icon: "Users"
      },
      {
        title: "AI & Automation",
        description: "Intelligent automation solutions that improve productivity and reduce cost.",
        href: "/services/ai-automation",
        icon: "Sparkles"
      },
      {
        title: "UI/UX Design",
        description: "Beautiful, user-centric designs that enhance engagement and conversions.",
        href: "/services/web-design",
        icon: "Palette"
      }
    ]
  },
  {
    label: "Our Projects",
    href: "/projects"
  },
  {
    label: "Industries",
    isMega: true,
    dropdownItems: [
      {
        title: "Startups",
        description: "Technology",
        href: "/industries/startups",
        icon: "Briefcase"
      },
      {
        title: "EdTech",
        description: "Technology",
        href: "/industries/edtech",
        icon: "BookOpen"
      },
      {
        title: "Booking System",
        description: "Technology",
        href: "/industries/Bookingsystem",
        icon: "Calendar"
      },
      {
        title: "FinTech",
        description: "Technology",
        href: "/industries/fintech",
        icon: "CreditCard"
      },
      {
        title: "HealthTech",
        description: "Technology",
        href: "/industries/healthtech",
        icon: "Activity"
      },
      {
        title: "Retail & E-commerce",
        description: "Traditional Sectors",
        href: "/industries/ecommerce",
        icon: "ShoppingCart"
      },
      {
        title: "Manufacturing",
        description: "Traditional Sectors",
        href: "/industries/manufacturing",
        icon: "Briefcase"
      },
      {
        title: "Real Estate",
        description: "Traditional Sectors",
        href: "/industries/real-estate",
        icon: "Globe"
      },
      {
        title: "Legal Services",
        description: "Professional Services",
        href: "/industries/legal",
        icon: "FileText"
      },
      {
        title: "Consulting Firms",
        description: "Professional Services",
        href: "/industries/consulting",
        icon: "Users"
      },
      {
        title: "Marketing Agencies",
        description: "Professional Services",
        href: "/industries/marketing",
        icon: "Award"
      }
    ]
  },
  {
    label: "Career",
    href: "/career"
  },
  {
    label: "Contact Us",
    href: "/contact"
  }
];
