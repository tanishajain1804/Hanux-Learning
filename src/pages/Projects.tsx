import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { projectsData } from "../data/projectsData";
import type { ProjectItem } from "../data/projectsData";
import "./ProjectsPage.css";

const ProjectPageCard: React.FC<{ project: ProjectItem; className?: string }> = ({ project, className = "" }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const getGradient = (id: string) => {
    switch (id) {
      case "ai-crm-fintech":
      case "puntopago":
        return "from-[#E8F1FC] to-[#D8E6F8]"; // Soft blue
      case "retail-platform":
        return "from-[#F0F2FE] to-[#E2E5FD]"; // Soft lavender
      case "saas-billing":
        return "from-[#f2faf7] to-[#e1f4ec]"; // Soft mint green
      case "health-companion-app":
        return "from-[#FFF5F5] to-[#FCE4E4]"; // Soft rose
      case "kzero":
        return "from-[#f5f3ff] to-[#edd1fe]"; // Soft purple
      case "daoway":
        return "from-[#fffbfe] to-[#f9ecfc]"; // Soft rose-purple
      default:
        return "from-[#F8FAFC] to-[#E2E8F0]"; // Soft slate
    }
  };

  const getStat = (id: string) => {
    switch (id) {
      case "ai-crm-fintech": return { val: "68%", label: "ops reduction" };
      case "retail-platform": return { val: "+340%", label: "conversions" };
      case "saas-billing": return { val: "100%", label: "automated" };
      case "health-companion-app": return { val: "+45%", label: "engagement" };
      case "puntopago": return { val: "1M+", label: "active users" };
      case "sca": return { val: "24/7", label: "monitoring" };
      case "kzero": return { val: "0", label: "passwords" };
      case "daoway": return { val: "4.9", label: "app rating" };
      default: return { val: "100%", label: "quality delivery" };
    }
  };

  const getNumberStr = (id: string) => {
    switch (id) {
      case "ai-crm-fintech": return "01 — FINTECH";
      case "retail-platform": return "02 — E-COMMERCE";
      case "saas-billing": return "03 — SAAS BILLING";
      case "health-companion-app": return "04 — HEALTH COMPANION";
      case "puntopago": return "05 — MOBILE SUPER-APP";
      case "sca": return "06 — ENTERPRISE OPS";
      case "kzero": return "07 — CYBERSECURITY";
      case "daoway": return "08 — PLANNER APP";
      default: return "09 — SPECIALTY WORK";
    }
  };

  const stat = getStat(project.id);
  const gradient = getGradient(project.id);
  const numberStr = getNumberStr(project.id);

  return (
    <a
      href={`/projects/${project.id}`}
      data-cursor="text"
      data-cursor-text="EXPLORE"
      className={`cb-card group relative block w-full rounded-[32px] p-8 md:p-10 bg-gradient-to-br ${gradient} border border-slate-200/40 shadow-sm hover:shadow-[0_28px_56px_-12px_var(--project-glow,rgba(37,99,235,0.25))] transition-all duration-500 overflow-hidden ${className} min-h-[360px] md:min-h-[400px] flex flex-col justify-between`}
      style={{
        ["--project-theme" as any]: project.theme,
        ["--project-glow" as any]: project.glow
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic Hover Video Loop Overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0">
        {/* Static cover mockup image */}
        <img
          src={project.imageUrl}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
        />
        {/* Dark overlay tint */}
        <div className="absolute inset-0 bg-[#0d1e3d]/20 pointer-events-none z-10" />

        {/* Video Loop */}
        <video
          ref={videoRef}
          src={project.videoUrl}
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
          {numberStr}
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
        {/* Pills */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="text-[10px] uppercase font-bold tracking-widest bg-white/90 backdrop-blur-md text-slate-600 px-3 py-1 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-200/40 group-hover:bg-slate-800 group-hover:text-slate-200 group-hover:border-slate-700 transition-all duration-300">
              {tag}
            </span>
          ))}
        </div>

        {/* Title & Description */}
        <h3 className="font-serif italic font-normal text-slate-800 text-[24px] md:text-[28px] leading-tight mb-2 text-left group-hover:text-white transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-slate-600 text-xs md:text-sm leading-relaxed max-w-[85%] text-left font-medium group-hover:text-slate-200 transition-colors duration-300">
          {project.description}
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
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    // Scroll to top when loading the page
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = projectsData.filter((project) => {
    if (selectedFilter === "all") return true;
    return project.categories.includes(selectedFilter);
  });

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Websites" },
    { id: "app", label: "Applications" },
    { id: "branding", label: "Branding" }
  ];

  return (
    <div className="relative min-h-screen bg-bg text-[#0D1E3D] font-sans pb-24">
      {/* Header Navigation */}
      <Navbar />

      <main className="cb-entrylist relative z-10 max-w-[1400px] mx-auto px-6 pt-36 md:pt-44">
        <div className="cb-entrylist-container -lg">
          
          {/* Header text */}
          <div className="cb-entrylist-header flex flex-col items-center justify-center mb-6">
            <h1 className="text-4xl md:text-7xl font-extrabold text-[#0D1E3D] tracking-tight leading-[1.05] mb-6 text-center select-none font-heading animate-slide-up">
              Our projects
            </h1>
          </div>

          <div className="cb-entrylist-text text-center max-w-xl mx-auto mb-16 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <p className="text-slate-500 text-base md:text-[20px] leading-relaxed">
              We help bring ideas to life and create digital products that work.
            </p>
          </div>

          {/* Interactive Filters */}
          <div className="cb-entrylist-filters flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-20 animate-slide-up" style={{ animationDelay: "200ms" }}>
            {filters.map((filter) => {
              const isActive = selectedFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`cb-entrylist-filter cursor-pointer ${
                    isActive ? "-active text-[#0f3ca0]" : "text-[#475569] hover:text-[#0f3ca0]"
                  }`}
                >
                  <span className="cb-entrylist-filter-title">
                    <span data-text={filter.label}>{filter.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
          {/* Staggered Cards Grid Layout */}
          <div className="cb-entrylist-items -cards grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 md:gap-y-36 pb-36 max-w-[1200px] mx-auto relative">
            {filteredProjects.map((project, idx) => {
              // Apply stagger shift for every second card (odd indices in 0-based index)
              const isStaggered = idx % 2 === 1;
              const staggerClass = isStaggered ? "md:translate-y-32" : "";

              return (
                <div key={project.id} className={`cb-entrylist-item relative w-full ${staggerClass}`}>
                  <ProjectPageCard project={project} />
                </div>
              );
            })}
          </div>

        </div>
      </main>

      {/* Footer Navigation */}
      <Footer />
    </div>
  );
};

export default Projects;
