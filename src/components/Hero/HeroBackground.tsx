import React from "react";
import "./Hero.css";

export interface HeroBackgroundProps {
  scrollY: number;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({ scrollY }) => {
  // Parallax offsets based on scroll
  const waveTranslateY = scrollY * 0.15;
  const sphere1TranslateY = scrollY * 0.18;
  const sphere2TranslateY = scrollY * -0.1;
  const bubble1Translate = scrollY * 0.12;
  const bubble2Translate = scrollY * -0.15;
  const bubble3Translate = scrollY * 0.08;
  const bubble4Translate = scrollY * -0.06;

  return (
    <div className="hero-gradient-bg">
      {/* Background Dots & Grid lines */}
      <div className="hero-dot-grid" />
      <div className="hero-mesh-lines" />

      {/* Glowing Ambient Aura Blob Elements */}
      <div className="glow-blob glow-blob-1" />
      <div className="glow-blob glow-blob-2" />
      <div className="glow-blob glow-blob-3" />

      {/* Rising Bubble stream particles (constant animation) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        <div className="rising-bubble rise-1" />
        <div className="rising-bubble rise-2" />
        <div className="rising-bubble rise-3" />
        <div className="rising-bubble rise-4" />
        <div className="rising-bubble rise-5" />
        <div className="rising-bubble rise-6" />
        <div className="rising-bubble rise-7" />
        <div className="rising-bubble rise-8" />
      </div>

      {/* Dynamic Fluid Wavy Particle Mesh */}
      <div 
        className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-[2] transition-transform duration-75"
        style={{
          transform: `translate3d(0, ${waveTranslateY}px, 0)`,
          willChange: "transform"
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" preserveAspectRatio="none">
          {/* Wave Path 1 - Solid soft blue */}
          <path 
            d="M0,580 C360,420 720,700 1080,520 C1260,430 1380,560 1440,580" 
            stroke="url(#wave-grad-1)" 
            strokeWidth="2.5" 
            className="hero-wave-solid-1" 
          />
          {/* Wave Path 2 - Dotted light white/blue */}
          <path 
            d="M0,640 C400,490 800,760 1200,560 C1320,460 1400,610 1440,640" 
            stroke="url(#wave-grad-2)" 
            strokeWidth="2" 
            strokeDasharray="4 8" 
            className="hero-wave-dashed-1" 
          />
          {/* Wave Path 3 - Fine grid lines */}
          <path 
            d="M0,510 C300,330 600,630 900,450 C1200,270 1350,570 1440,610" 
            stroke="url(#wave-grad-3)" 
            strokeWidth="1.5" 
            strokeDasharray="1 5" 
            className="hero-wave-dotted-1" 
          />
          {/* Wave Path 4 - Additional flowing curve */}
          <path 
            d="M0,670 C350,540 700,790 1050,610 C1250,510 1370,640 1440,670" 
            stroke="url(#wave-grad-1)" 
            strokeWidth="1.5" 
            className="hero-wave-solid-2" 
          />

          <defs>
            <linearGradient id="wave-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(37, 99, 235, 0.04)" />
              <stop offset="40%" stopColor="rgba(96, 165, 250, 0.32)" />
              <stop offset="80%" stopColor="rgba(37, 99, 235, 0.45)" />
              <stop offset="100%" stopColor="rgba(96, 165, 250, 0.06)" />
            </linearGradient>
            <linearGradient id="wave-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.08)" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 0.65)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.08)" />
            </linearGradient>
            <linearGradient id="wave-grad-3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(96, 165, 250, 0.04)" />
              <stop offset="50%" stopColor="rgba(37, 99, 235, 0.22)" />
              <stop offset="100%" stopColor="rgba(37, 99, 235, 0.04)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Tiny Twinkling Star Sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
        <div className="star-sparkle sparkle-pos-1" />
        <div className="star-sparkle sparkle-pos-2" />
        <div className="star-sparkle sparkle-pos-3" />
        <div className="star-sparkle sparkle-pos-4" />
        <div className="star-sparkle sparkle-pos-5" />
        <div className="star-sparkle sparkle-pos-6" />
      </div>

      {/* Left Column stack of 5 dots */}
      <div className="absolute left-[3%] top-[40%] flex flex-col gap-3.5 pointer-events-none z-[3] hidden md:flex">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1d4ed8] opacity-25" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#1d4ed8] opacity-50" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#1d4ed8] opacity-80 shadow-[0_0_8px_rgba(29,78,216,0.6)]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#1d4ed8] opacity-50" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#1d4ed8] opacity-25" />
      </div>

      {/* Large Glass Orbs (with Parallax & 3D Lighting) */}
      <div 
        className="absolute bottom-[8%] left-[4%] w-[170px] h-[170px] z-[3] transition-transform duration-75"
        style={{
          transform: `translate3d(0, ${sphere1TranslateY}px, 0)`,
          willChange: "transform"
        }}
      >
        <div className="bubble-entrance delay-100">
          <div className="sphere-large-bottom-left" />
        </div>
      </div>

      <div 
        className="absolute top-[-8%] right-[-4%] w-[300px] h-[300px] z-[2] transition-transform duration-75"
        style={{
          transform: `translate3d(0, ${sphere2TranslateY}px, 0)`,
          willChange: "transform"
        }}
      >
        <div className="bubble-entrance delay-300">
          <div className="sphere-large-top-right" />
        </div>
      </div>

      {/* Smaller Floating Bubbles */}
      <div 
        className="absolute top-[22%] left-[10%] w-[32px] h-[32px] z-[3] transition-transform duration-75"
        style={{
          transform: `translate3d(0, ${bubble1Translate}px, 0)`,
          willChange: "transform"
        }}
      >
        <div className="bubble-entrance delay-400">
          <div className="floating-bubble bubble-purple-top-left" />
        </div>
      </div>

      <div 
        className="absolute top-[48%] left-[18%] w-[40px] h-[40px] z-[3] transition-transform duration-75"
        style={{
          transform: `translate3d(0, ${bubble2Translate}px, 0)`,
          willChange: "transform"
        }}
      >
        <div className="bubble-entrance delay-500">
          <div className="floating-bubble bubble-blue-mid-left" />
        </div>
      </div>

      <div 
        className="absolute top-[53%] right-[14%] w-[28px] h-[28px] z-[3] transition-transform duration-75"
        style={{
          transform: `translate3d(0, ${bubble3Translate}px, 0)`,
          willChange: "transform"
        }}
      >
        <div className="bubble-entrance delay-600">
          <div className="floating-bubble bubble-green-mid-right" />
        </div>
      </div>

      <div 
        className="absolute top-[74%] right-[15%] w-[36px] h-[36px] z-[3] transition-transform duration-75"
        style={{
          transform: `translate3d(0, ${bubble4Translate}px, 0)`,
          willChange: "transform"
        }}
      >
        <div className="bubble-entrance delay-700">
          <div className="floating-bubble bubble-blue-bottom-right" />
        </div>
      </div>

      {/* Tiny Bubbles */}
      <div className="absolute top-[20%] right-[25%] w-[20px] h-[20px] z-[3] pointer-events-none">
        <div className="bubble-entrance delay-800">
          <div className="floating-bubble bubble-tiny-top-right" />
        </div>
      </div>

      <div className="absolute bottom-[20%] left-[24%] w-[16px] h-[16px] z-[3] pointer-events-none">
        <div className="bubble-entrance delay-900">
          <div className="floating-bubble bubble-tiny-bottom-left" />
        </div>
      </div>
    </div>
  );
};

export interface ScrollIndicatorProps {
  onClick?: () => void;
  scrollY: number;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ onClick, scrollY }) => {
  // Fade out scroll indicator early as user scrolls down
  const indicatorOpacity = Math.max(1 - scrollY / 150, 0);

  if (indicatorOpacity === 0) return null;

  return (
    <button
      onClick={onClick}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#1F4096] rounded-full p-2"
      style={{ opacity: indicatorOpacity }}
      aria-label="Scroll Down"
    >
      <span className="text-[10px] uppercase tracking-widest text-[#64748B] font-semibold font-sans">
        Scroll Down
      </span>
      <div className="w-5 h-8 rounded-full border border-slate-300 flex items-start justify-center p-1.5 bg-white/50 backdrop-blur-sm">
        <div className="w-1.5 h-2.5 rounded-full bg-[#1F4096] scroll-indicator-wheel" />
      </div>
    </button>
  );
};

export default HeroBackground;
