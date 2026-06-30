import React, { useRef, useState, useEffect } from "react";
import "./Projects.css";

interface ProjectCardProps {
  href: string;
  number: string;
  category: string;
  title: string;
  description: string;
  videoUrl: string;
  imageUrl: string;
  theme: string;
  glow: string;
  layout?: string;
  aspectClass?: string;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  number,
  category,
  title,
  description,
  videoUrl,
  imageUrl,
  theme,
  glow,
  layout = "default",
  aspectClass = "aspect-[4/3]",
  className = ""
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
   const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
      videoRef.current.play().catch((err) => {
        console.log("Autoplay preview setup restricted", err);
      });
    }
  }, []);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const getGradient = (num: string) => {
    switch (num) {
      case "01": return "from-[#EEF2F6] to-[#E2EAF7]"; // Soft blue
      case "02": return "from-[#F0F2FE] to-[#E2E5FD]"; // Soft lavender
      case "03": return "from-[#f2faf7] to-[#e1f4ec]"; // Soft mint green
      case "04": return "from-[#FFF5F5] to-[#FCE4E4]"; // Soft rose
      default: return "from-[#F8FAFC] to-[#E2E8F0]"; // Soft slate
    }
  };

  const getStat = (num: string) => {
    switch (num) {
      case "01": return { val: "68%", label: "ops reduction" };
      case "02": return { val: "+340%", label: "conversions" };
      case "03": return { val: "100%", label: "automated" };
      case "04": return { val: "+45%", label: "engagement" };
      default: return { val: "100%", label: "quality delivery" };
    }
  };

  const gradient = getGradient(number);
  const stat = getStat(number);

  if (layout === "wide") {
    return (
      <a
        href={href}
        data-cursor="text"
        data-cursor-text="EXPLORE"
        className={`project-card-link group relative block w-full rounded-[32px] p-8 md:p-10 bg-gradient-to-br ${gradient} border border-slate-200/40 shadow-sm hover:shadow-[0_28px_56px_-12px_var(--project-glow,rgba(37,99,235,0.25))] transition-all duration-500 overflow-hidden ${className} min-h-[360px] md:min-h-[400px] flex flex-col justify-between`}
        style={{
          ["--project-theme" as any]: theme,
          ["--project-glow" as any]: glow
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Dynamic Hover Video Loop Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0">
          <img
            src={imageUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-[#0d1e3d]/45 backdrop-blur-[6px] pointer-events-none z-10" />
          <video
            ref={videoRef}
            src={videoUrl}
            loop
            muted
            autoPlay
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover scale-100 z-0"
          />
        </div>

        {/* Top Row Info */}
        <div className="flex items-start justify-between z-10 w-full relative">
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500/80 group-hover:text-slate-300 transition-colors duration-300">
            {number} — {category.split("/")[0].trim().toUpperCase()}
          </span>
          <div className="text-right flex flex-col items-end">
            <span className="text-4xl md:text-5xl font-black text-[#2563eb] leading-none group-hover:text-[#60a5fa] transition-colors duration-300">
              {stat.val}
            </span>
            <span className="text-[9px] uppercase font-extrabold text-[#2563eb]/80 tracking-widest mt-1 group-hover:text-[#93c5fd] transition-colors duration-300">
              {stat.label}
            </span>
          </div>
        </div>

        {/* Bottom Info Stack */}
        <div className="z-10 mt-auto pt-8 relative">
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="text-[10px] uppercase font-bold tracking-widest bg-white/90 backdrop-blur-md text-slate-600 px-3 py-1 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-200/40 group-hover:bg-slate-800 group-hover:text-slate-200 group-hover:border-slate-700 transition-all duration-300">
              {category.split("/")[1] ? category.split("/")[1].trim() : "Custom"}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest bg-white/90 backdrop-blur-md text-slate-600 px-3 py-1 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-200/40 group-hover:bg-slate-800 group-hover:text-slate-200 group-hover:border-slate-700 transition-all duration-300">
              Deliverable
            </span>
          </div>

          <h3 className="font-serif italic font-normal text-slate-800 text-[24px] md:text-[28px] leading-tight mb-2 text-left group-hover:text-white transition-colors duration-300">
            {title}
          </h3>
          <p className="project-desc-text text-slate-500 text-sm md:text-base font-medium leading-relaxed text-left group-hover:text-slate-200 transition-colors duration-300">
            {description}
          </p>
        </div>

        {/* Floating Arrow Badge at the bottom right */}
        <div className="absolute bottom-6 right-6 z-20 w-10 h-10 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-slate-200/40 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <svg className="w-4 h-4 text-[#0D1E3D] transition-transform duration-300 group-hover:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </a>
    );
  }

  return (
    <a
      href={href}
      data-cursor="text"
      data-cursor-text="EXPLORE"
      className={`project-card-link group relative block cursor-pointer ${className}`}
      style={{
        ["--project-theme" as any]: theme,
        ["--project-glow" as any]: glow
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Curved preview container */}
        <div className={`project-card-preview w-full ${layout === "wide" ? "aspect-[21/9]" : aspectClass} relative overflow-hidden`}>
          {/* Floating Tag Pills at the top left */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2 pointer-events-none">
            <span className="text-[10px] uppercase font-bold tracking-widest bg-white/90 backdrop-blur-md text-[#0D1E3D] px-2.5 py-1 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-slate-200/40">
              {number}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest bg-white/90 backdrop-blur-md text-[#0D1E3D] px-2.5 py-1 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-slate-200/40">
              {category.split("/")[0].trim()}
            </span>
          </div>
          {/* Floating Arrow Badge at the top right */}
          <div className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-slate-200/40 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <svg className="w-4 h-4 text-[#0D1E3D] transition-transform duration-300 group-hover:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>

      {/* Dynamic Hover Video Loop Overlay */}

        <img
          src={imageUrl}
          alt={title}
           className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply"
            style={{ backgroundColor: theme }}
        />

       {/* Top Row Info */}
        <div 
             className={`absolute inset-0 z-10 transition-opacity duration-500 ease-in-out ${
               hovered ? "opacity-100" : "opacity-0"
             }`}
           >
             <div className="absolute inset-0 bg-[#0d1b3e]/20 backdrop-blur-[6px] z-20 pointer-events-none" />
             <video
               ref={videoRef}
               src={videoUrl}
               loop
               muted
               autoPlay
               playsInline
               preload="auto"
               className="w-full h-full object-cover scale-100"
             />
        </div>
      </div>
      

      {/* Bottom Info Stack */}
      <div className="project-meta flex flex-col gap-1 mt-6 text-left">
        <h3 className="project-title-text text-lg md:text-xl font-extrabold text-[#0D1E3D] tracking-tight group-hover:text-[var(--project-theme)] transition-colors duration-300">
          {title}
        </h3>
        <p className="project-desc-text text-slate-500 text-sm font-medium leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
          {description}
        </p>
      </div>

      {/* Floating Arrow Badge at the bottom right */}
      <div className="absolute bottom-6 right-6 z-20 w-10 h-10 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-slate-200/40 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        <svg className="w-4 h-4 text-[#0D1E3D] transition-transform duration-300 group-hover:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </a>
  );
};

export const Projects: React.FC = () => {
  return (
    <section id="work" className="py-24 px-6 md:px-14 bg-bg">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
          <div className="reveal text-left">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-4 h-[2px] bg-[#2563eb] rounded-full" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#2563eb]">Featured Work</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0d1b3e] tracking-tight leading-[1.1]">
              Case Studies &<br />
              <em className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#0f3ca0] to-[#2563eb]">Software Deliverables</em>
            </h2>
          </div>
          
          <div className="reveal flex flex-col items-start md:items-end gap-4 text-left md:text-right">
            <p className="text-[#3d5a8a] text-sm leading-relaxed max-w-[280px]">
              Dynamic web products and billing architectures launched for our global clients.
            </p>
            <a
              href="/projects"
              className="px-6 py-3 text-sm font-semibold text-white bg-[#0f3ca0] hover:bg-[#2563eb] rounded-full shadow-lg shadow-blue-900/5 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
            >
              All Projects
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </a>
          </div>
        </div>

        {/* Projects Layout Grid */}
        <div className="flex flex-col gap-10">
          
          {/* Row 1: 2 Cards (1.35fr and 1fr layout on desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-10">
            <ProjectCard
              href="/projects/ai-crm-fintech"
              number="01"
              category="FinTech / CRM Systems"
              title="AI-Powered CRM for FinTech"
              description="Next-gen CRM with ML-driven lead scoring and automated workflows."
              videoUrl="https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-connection-lines-loop-40102-large.mp4"
              imageUrl="/images/projects/crm-mockup.png"
              theme="#2563eb"
              glow="rgba(37, 99, 235, 0.12)"
              aspectClass="aspect-[1.35/1]"
            />

            <ProjectCard
              href="/projects/retail-platform"
              number="02"
              category="E-Commerce / Headless Commerce"
              title="EU Retail Platform Rebuild"
              description="Complete e-commerce rebuild with headless architecture, delivering an uplift in conversion rate."
              videoUrl="https://assets.mixkit.co/videos/preview/mixkit-futuristic-abstract-digital-background-loop-40101-large.mp4"
              imageUrl="/images/projects/retail-mockup.png"
              theme="#10b981"
              glow="rgba(16, 185, 129, 0.12)"
              aspectClass="aspect-[1/1]"
            />
          </div>

          {/* Row 2: 1 Wide Card */}
          <ProjectCard
            href="/projects/saas-billing"
            number="03"
            category="SaaS Billing / Subscriptions"
            title="Global Billing Architecture for SaaS Startup"
            description="Architected a Stripe-based billing system supporting localized subscription pricing tiers and compliance."
            videoUrl="https://assets.mixkit.co/videos/preview/mixkit-abstract-financial-chart-loop-40097-large.mp4"
            imageUrl="/images/projects/billing-mockup.png"
            theme="#059669"
            glow="rgba(5, 150, 105, 0.12)"
            layout="wide"
          />

          {/* Row 3: Reversed (1fr and 1.35fr layout on desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-10">
            <ProjectCard
              href="/projects/health-companion-app"
              number="04"
              category="HealthTech / Mobile Apps"
              title="Mobile Health Companion App"
              description="Cross-platform health tracking app with AI-driven personalization and offline sync."
              videoUrl="https://assets.mixkit.co/videos/preview/mixkit-smartwatch-displaying-heart-rate-loop-46761-large.mp4"
              imageUrl="/images/projects/health-mockup.png"
              theme="white"
              glow="rgba(239, 68, 68, 0.12)"
              aspectClass="aspect-[1/1]"
            />

            {/* Card 5: Pitch Card */}
            <div className="reveal group flex flex-col justify-between">
              <div className="w-full aspect-[1.35/1] rounded-[28px] overflow-hidden p-8 flex flex-col justify-center items-center text-center border border-slate-200/85 bg-white shadow-sm hover:border-[#2563eb]/20 transition-all duration-300">
                <div className="flex flex-col items-center max-w-xs">
                  <div className="text-4xl mb-5 animate-bounce">🚀</div>
                  
                  <h3 className="font-serif italic font-normal text-[#0d1b3e] text-2xl leading-snug mb-3">
                    Your project<br />could be next
                  </h3>
                  
                  <p className="text-xs text-[#3d5a8a] leading-relaxed mb-6">
                    Let's build something remarkable together and scale your software capabilities.
                  </p>
                  
                  <a
                    href="/contact"
                    className="px-6 py-2.5 text-xs font-bold text-white bg-[#0f3ca0] hover:bg-[#2563eb] rounded-full shadow-md shadow-blue-100 hover:shadow-blue-200 transition-all duration-300 inline-flex items-center gap-1 cursor-pointer"
                  >
                    Start a project
                  </a>
                </div>
              </div>
              
              {/* Pitch Card matching meta gap underneath for grid alignment */}
              <div className="project-meta opacity-0 pointer-events-none">
                <span className="project-title-text">Spacer</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Projects;
