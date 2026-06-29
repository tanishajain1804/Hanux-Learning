import React, { useRef, useState, useEffect } from "react";
import "./Services.css";

interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  href: string;
  themeColor: string;
  glowColor: string;
  tags: string[];
  videoUrl: string;
}

const servicesData: ServiceItem[] = [
  {
    title: "Full-Stack Web Development",
    description: "End-to-end web applications built with React, Next.js, and Node.js. From MVPs to enterprise-grade platforms that handle millions of users.",
    icon: "🌐",
    iconBg: "rgba(31, 64, 150, 0.12)",
    href: "/services/web-development",
    themeColor: "#1F4096",
    glowColor: "rgba(31, 64, 150, 0.15)",
    tags: ["React", "Next.js", "Node.js", "TypeScript"],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-with-multiple-monitors-40103-large.mp4"
  },
  {
    title: "Mobile App Development",
    description: "Cross-platform iOS and Android apps using React Native and Flutter. Polished UI, native performance, App Store-ready delivery.",
    icon: "📱",
    iconBg: "rgba(16, 185, 129, 0.1)",
    href: "/services/mobile-app-development",
    themeColor: "#10B981",
    glowColor: "rgba(16, 185, 129, 0.15)",
    tags: ["React Native", "Flutter", "iOS", "Android"],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-smartphone-typing-40096-large.mp4"
  },
  {
    title: "AI & Automation",
    description: "Integrate AI into your workflows — intelligent automation, ML pipelines, LLM-powered features, and RAG systems built for production.",
    icon: "🤖",
    iconBg: "rgba(59, 130, 246, 0.12)",
    href: "/services/ai-automation",
    themeColor: "#3B82F6",
    glowColor: "rgba(59, 130, 246, 0.15)",
    tags: ["OpenAI", "LLMs", "Python", "LangChain"],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-technology-network-loops-40094-large.mp4"
  },
  {
    title: "CRM & ERP Systems",
    description: "Custom CRM modules, ERP integrations, and business workflow automation that eliminate manual ops and give you real-time clarity.",
    icon: "🔧",
    iconBg: "rgba(245, 158, 11, 0.1)",
    href: "/services/crm-erp-systems",
    themeColor: "#F59E0B",
    glowColor: "rgba(245, 158, 11, 0.15)",
    tags: ["Salesforce", "HubSpot", "Workflows", "APIs"],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-business-charts-and-data-on-a-monitor-40093-large.mp4"
  },
  {
    title: "Cloud Infrastructure",
    description: "AWS, GCP, and Azure deployments. Scalable architecture, CI/CD pipelines, observability, and cost-optimized cloud ops.",
    icon: "☁️",
    iconBg: "rgba(6, 182, 212, 0.1)",
    href: "/services/cloud-infrastructure",
    themeColor: "#06B6D4",
    glowColor: "rgba(6, 182, 212, 0.15)",
    tags: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-datacenter-server-corridor-40104-large.mp4"
  },
  {
    title: "UI/UX Design Systems",
    description: "Research-led design systems and digital product design that bridge engineering precision with experiences users genuinely love.",
    icon: "🎨",
    iconBg: "rgba(239, 68, 68, 0.1)",
    href: "/services/ui-ux-design-systems",
    themeColor: "#EF4444",
    glowColor: "rgba(239, 68, 68, 0.15)",
    tags: ["Figma", "Design Systems", "UI/UX", "Prototyping"],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-designer-working-on-a-digital-tablet-40105-large.mp4"
  }
];

const ServiceCard: React.FC<{ svc: ServiceItem }> = ({ svc }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
      videoRef.current.play().catch((err) => {
        console.log("Services video autoplay restricted", err);
      });
    }
  }, []);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <a
      href={svc.href}
      data-cursor="text"
      data-cursor-text="TALK"
      className="reveal group service-card-3d relative flex flex-col justify-between p-8 rounded-3xl cursor-pointer text-left overflow-hidden"
      style={{
        ["--theme-color" as any]: svc.themeColor,
        ["--glow-color" as any]: svc.glowColor
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic Hover Video Loop Overlay */}
      <div 
        className={`absolute inset-0 z-0 transition-opacity duration-500 ease-in-out ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-[#0d1b3e]/35 z-20 pointer-events-none" />
        <video
          ref={videoRef}
          src={svc.videoUrl}
          loop
          muted
          autoPlay
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-100"
        />
      </div>

      {/* Radial Hover Glow Backdrop overlay */}
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(37,99,235,0.04),transparent)] transition-opacity duration-300 pointer-events-none z-10 ${hovered ? "opacity-0" : "opacity-0 group-hover:opacity-100"}`} />
      
      <div className="relative z-20">
        {/* Top Bar with Icon & Interactive Arrow */}
        <div className="flex items-center justify-between mb-6">
          {/* Service Icon bubble */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm"
            style={{ backgroundColor: svc.iconBg }}
          >
            {svc.icon}
          </div>
          
          {/* Circled Interaction Arrow */}
          <div className="card-arrow-circle">
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-base font-bold text-[#0D1E3D] mb-3 group-hover:text-white transition-colors duration-200">
          {svc.title}
        </h3>
        
        {/* Description */}
        <p className="text-[13px] text-[#475569] group-hover:text-white/85 leading-relaxed mb-6 transition-colors duration-200">
          {svc.description}
        </p>
      </div>
      
      {/* Tech Badges at the bottom */}
      <div className="flex flex-wrap gap-2 mt-auto relative z-20">
        {svc.tags.map((tag, tIdx) => (
          <span key={tIdx} className="tech-badge bg-white/80 backdrop-blur-sm">
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
};

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 px-6 md:px-14 bg-[#FAF5EC] border-t border-slate-200/40">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header Block */}
        <div className="reveal mb-16 text-left">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-4 h-[2px] bg-[#3B82F6] rounded-full" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#3B82F6]">Our Services</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0D1E3D] tracking-tight leading-[1.1] mb-6">
            Custom Tech Built<br />
            to <em className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#1F4096] to-[#3B82F6]">Scale</em>
          </h2>
          
          <p className="text-[#64748B] leading-relaxed text-[15px] max-w-lg">
            Core technical offerings from full-stack web development and mobile apps to AI automation and enterprise CRM systems.
          </p>
        </div>

        {/* 3-Column Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {servicesData.map((svc, idx) => (
            <ServiceCard key={idx} svc={svc} />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Services;
