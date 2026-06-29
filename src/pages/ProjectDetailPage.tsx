import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { 
  ArrowLeft, 
  Sparkles, 
  ArrowRight
} from "lucide-react";
import "./ProjectDetailPage.css";

import { projectsDetailDataMap } from "../data/projectsDetailData";


export const ProjectDetailPage: React.FC<{ projectKey: string }> = ({ projectKey }) => {
  const data = projectsDetailDataMap[projectKey];

  useEffect(() => {
    // Scroll to top instantly when page loads
    window.scrollTo(0, 0);
  }, [projectKey, data]);

  if (!data) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center flex-col p-8">
        <h1 className="text-2xl font-bold text-[#0D1E3D] mb-4">Project Not Found</h1>
        <a href="/" className="px-5 py-2.5 bg-[#1F4096] text-white text-xs font-bold rounded-xl">Go Home</a>
      </div>
    );
  }

  return (
    <div 
      className="relative min-h-screen bg-bg text-[#0D1E3D] font-sans pb-24"
      style={{
        ["--theme-color" as any]: data.themeColor,
        ["--glow-color" as any]: data.glowColor
      }}
    >
      <Navbar />

      {/* Hero & Background Gradients */}
      <div className="project-hero-overlay">
        <div className="project-hero-mesh" />
        <div className="project-hero-glow" />
      </div>

      <main className="relative z-10 max-w-[1100px] mx-auto px-6 pt-36 md:pt-44">
        
        {/* Navigation Breadcrumb */}
        <div className="animate-slide-up mb-8">
          <a 
            href="/projects" 
            className="back-link-wrapper inline-flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest"
          >
            <ArrowLeft size={14} className="back-btn-text" /> Back to Projects
          </a>
        </div>

        {/* Hero Header Block */}
        <div className="animate-slide-up text-left max-w-4xl mb-16" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="project-badge">{data.category}</span>
            <span className="text-xs font-bold text-slate-400">Project {data.number}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-[#0D1E3D] tracking-tight leading-[1.1] mb-6">
            {data.title}
          </h1>

          <p className="text-lg md:text-xl font-medium text-slate-700 leading-snug">
            {data.tagline}
          </p>
        </div>

        {/* Stats & Quick Metrics Grid */}
        <div 
          className="animate-slide-up grid grid-cols-1 md:grid-cols-4 gap-5 mb-20"
          style={{ animationDelay: "200ms" }}
        >
          {/* Big Key Metric Card */}
          <div className="project-stat-box p-6 rounded-2xl flex flex-col justify-center border-l-4 border-l-[var(--theme-color)] text-left md:col-span-1">
            <span className="text-3xl md:text-4xl font-black text-[var(--theme-color)] leading-none mb-1">
              {data.metric}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {data.metricLabel}
            </span>
          </div>

          {data.stats.map((stat, idx) => (
            <div key={idx} className="project-stat-box p-6 rounded-2xl flex items-start gap-4 text-left md:col-span-1">
              <div 
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: data.glowColor, color: data.themeColor }}
              >
                {stat.icon}
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  {stat.label}
                </span>
                <span className="text-sm font-extrabold text-[#0D1E3D]">
                  {stat.value}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Narrative & Case details */}
        <div className="animate-slide-up grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 text-left" style={{ animationDelay: "300ms" }}>
          
          {/* Left Column: Challenge & Solution (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="narrative-card p-8 rounded-3xl">
              <h2 className="text-xl font-extrabold text-[#0D1E3D] tracking-tight mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
                The Challenge
              </h2>
              <p className="text-[#475569] text-[14px] leading-relaxed">
                {data.challenge}
              </p>
            </div>

            <div className="narrative-card p-8 rounded-3xl">
              <h2 className="text-xl font-extrabold text-[#0D1E3D] tracking-tight mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                Our Solution
              </h2>
              <p className="text-[#475569] text-[14px] leading-relaxed">
                {data.solution}
              </p>
            </div>
          </div>

          {/* Right Column: Results & Tech Stack (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-8">
            <div className="narrative-card p-8 rounded-3xl h-full">
              <h2 className="text-xl font-extrabold text-[#0D1E3D] tracking-tight mb-6 flex items-center gap-2">
                <Sparkles size={18} className="text-amber-400" />
                Key Results
              </h2>
              
              <ul className="flex flex-col gap-4">
                {data.results.map((result, idx) => (
                  <li key={idx} className="flex gap-3 text-xs sm:text-[13px] text-[#475569] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-color)] mt-1.5 shrink-0" />
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.techStack.map((tech, idx) => (
                  <span key={idx} className="tech-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Call to Action Project Panel */}
        <div className="animate-slide-up p-8 md:p-12 rounded-[28px] bg-gradient-to-r from-[#0d2e7a] via-[#0f3ca0] to-[#2563eb] text-left relative overflow-hidden shadow-xl" style={{ animationDelay: "400ms" }}>
          <div className="absolute w-[400px] h-[400px] rounded-full bg-white/5 right-[-50px] top-[-100px] pointer-events-none" />
          
          <div className="relative z-10 max-w-xl">
            <h3 className="text-xl md:text-3xl font-extrabold text-white tracking-tight leading-snug mb-3">
              Have a Similar Project in Mind?
            </h3>
            
            <p className="text-white/80 text-xs md:text-sm leading-relaxed mb-6">
              Let's jump on a quick call to audit your legacy codebases, scope resource planning, and design a custom software execution strategy.
            </p>

            <a
              href="/contact"
              className="px-6 py-3 text-xs font-bold text-[#0f3ca0] bg-white hover:bg-slate-100 rounded-full transition-all duration-300 inline-flex items-center gap-1.5 shadow-lg shadow-blue-900/10 cursor-pointer"
            >
              Discuss Your Project <ArrowRight size={14} />
            </a>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
