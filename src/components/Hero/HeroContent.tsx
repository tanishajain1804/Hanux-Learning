import React from "react";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "./HeroButtons";

export interface HeroContentProps {
  scrollY: number;
}

export const HeroContent: React.FC<HeroContentProps> = ({ scrollY }) => {
  // Scroll dependent fade and scale (Jellyfish style)
  const opacity = Math.max(1 - scrollY / 320, 0);
  const scale = Math.max(1 - scrollY / 800, 0.88);
  const translateY = -scrollY * 0.30; // Smooth upward translation

  return (
    <div 
      className="flex flex-col items-center text-center max-w-4xl mx-auto px-4 z-10 relative mt-4 sm:mt-8 transition-all duration-75"
      style={{
        opacity,
        transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
        willChange: "transform, opacity"
      }}
    >
      {/* Badge / Announcement */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-[#1F4096] bg-[#1F4096]/5 border border-[#1F4096]/10 mb-6 md:mb-8 animate-fade-in">
        <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
        <span>Enterprise Digital Platforms & Solutions</span>
      </div>

      {/* Main Title Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#0D1E3D] leading-[1.05] mb-6 font-heading">
        The Intelligence Platform<br />
        for <em className="hero-italic-emphasis">AI-Integrated</em><br />
        Engineering
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg md:text-xl text-[#475569] max-w-2xl mb-6 sm:mb-8 leading-relaxed font-sans">
        Hanux Tech turns your software engineering data and workflow integrations into deep developer insights that help R&amp;D teams deliver business value.
      </p>

      {/* Schedule Meeting CTA */}
      <div className="w-full max-w-2xl mb-0 animate-fade-in delay-200 flex justify-center">
        <MagneticButton strength={15}>
          <a
            href="/schedule-meeting"
            className="px-8 py-3.5 text-sm font-semibold text-white bg-[#0f3ca0] hover:bg-[#2563eb] rounded-full shadow-lg shadow-blue-100 hover:shadow-blue-200 transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            Schedule Meeting
            <ArrowRight className="w-4 h-4" />
          </a>
        </MagneticButton>
      </div>
    </div>
  );
};

export default HeroContent;
