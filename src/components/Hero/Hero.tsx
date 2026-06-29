import React, { useState, useEffect, useRef } from "react";
import { 
  ChevronDown, 
  ArrowDown, 
  ArrowUp, 
  Compass,
  Terminal, 
  Code2, 
  Cpu, 
  Wind, 
  MessageSquare, 
  Flame, 
  Box,
  Bot,
  Activity,
  Sparkles,
  User
} from "lucide-react";
import { HeroBackground, ScrollIndicator } from "./HeroBackground";
import { HeroContent } from "./HeroContent";
import { useScroll } from "../../hooks/useScroll";
import { 
  dashboardTabs, 
  sidebarTools, 
  dashboardDataSet 
} from "../../data/technologiesData";
import "./Hero.css";

// Helper component to animate numbers counting up on load/tab switch
interface AnimatedNumberProps {
  valueStr: string;
  duration?: number;
  trigger?: boolean;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ valueStr, duration = 800, trigger = true }) => {
  const [displayVal, setDisplayVal] = useState("");

  useEffect(() => {
    const match = valueStr.match(/([+-]?\d+(?:\.\d+)?)/);
    if (!match) {
      setDisplayVal(valueStr);
      return;
    }
    const endVal = parseFloat(match[1]);
    const prefix = valueStr.substring(0, match.index || 0);
    const suffix = valueStr.substring((match.index || 0) + match[1].length);

    if (!trigger) {
      setDisplayVal(`${prefix}0${suffix}`);
      return;
    }

    let startTimestamp: number | null = null;
    const startValue = 0;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      
      const current = startValue + easeProgress * (endVal - startValue);
      const formatted = current % 1 === 0 ? Math.round(current) : current.toFixed(1);
      setDisplayVal(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [valueStr, duration, trigger]);

  return <span>{displayVal}</span>;
};

const throughputWeeklyData = [
  { segments: [{ color: "bg-[#7C3AED]", h: 25 }, { color: "bg-[#1E1B4B]", h: 15 }, { color: "bg-[#06B6D4]", h: 20 }, { color: "bg-[#475569]", h: 10 }] },
  { segments: [{ color: "bg-[#7C3AED]", h: 30 }, { color: "bg-[#1E1B4B]", h: 18 }, { color: "bg-[#06B6D4]", h: 15 }, { color: "bg-[#475569]", h: 12 }] },
  { segments: [{ color: "bg-[#7C3AED]", h: 28 }, { color: "bg-[#1E1B4B]", h: 22 }, { color: "bg-[#06B6D4]", h: 18 }, { color: "bg-[#475569]", h: 8 }] },
  { segments: [{ color: "bg-[#7C3AED]", h: 35 }, { color: "bg-[#1E1B4B]", h: 25 }, { color: "bg-[#06B6D4]", h: 22 }, { color: "bg-[#475569]", h: 10 }] },
  { segments: [{ color: "bg-[#7C3AED]", h: 42 }, { color: "bg-[#1E1B4B]", h: 20 }, { color: "bg-[#06B6D4]", h: 25 }, { color: "bg-[#475569]", h: 12 }] },
  { segments: [{ color: "bg-[#7C3AED]", h: 40 }, { color: "bg-[#1E1B4B]", h: 24 }, { color: "bg-[#06B6D4]", h: 20 }, { color: "bg-[#475569]", h: 15 }] },
  { segments: [{ color: "bg-[#7C3AED]", h: 38 }, { color: "bg-[#1E1B4B]", h: 30 }, { color: "bg-[#06B6D4]", h: 24 }, { color: "bg-[#475569]", h: 8 }] },
  { segments: [{ color: "bg-[#7C3AED]", h: 45 }, { color: "bg-[#1E1B4B]", h: 28 }, { color: "bg-[#06B6D4]", h: 28 }, { color: "bg-[#475569]", h: 10 }] },
  { segments: [{ color: "bg-[#7C3AED]", h: 50 }, { color: "bg-[#1E1B4B]", h: 35 }, { color: "bg-[#06B6D4]", h: 20 }, { color: "bg-[#475569]", h: 12 }] },
  { segments: [{ color: "bg-[#7C3AED]", h: 48 }, { color: "bg-[#1E1B4B]", h: 32 }, { color: "bg-[#06B6D4]", h: 22 }, { color: "bg-[#475569]", h: 14 }] },
  { segments: [{ color: "bg-[#7C3AED]", h: 52 }, { color: "bg-[#1E1B4B]", h: 30 }, { color: "bg-[#06B6D4]", h: 25 }, { color: "bg-[#475569]", h: 15 }] },
  { segments: [{ color: "bg-[#7C3AED]", h: 55 }, { color: "bg-[#1E1B4B]", h: 28 }, { color: "bg-[#06B6D4]", h: 26 }, { color: "bg-[#475569]", h: 16 }] },
];

export const Hero: React.FC = () => {
  const { y } = useScroll();
  const [activeTab, setActiveTab] = useState("AI Impact");
  const [activeTool, setActiveTool] = useState("All Tools");
  const [isIntersecting, setIsIntersecting] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = dashboardRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsIntersecting(entry.isIntersecting);
        });
      },
      {
        threshold: 0.15
      }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // Get current active metrics dataset
  const currentData = dashboardDataSet[activeTab]?.[activeTool] || dashboardDataSet["AI Impact"]["All Tools"];

  // Tool icon mapper for the exact list
  const getToolIcon = (tool: string) => {
    const props = { className: "w-4 h-4" };
    switch (tool) {
      case "All Tools": return <Compass {...props} className="w-4 h-4 text-slate-500" />;
      case "Cursor": return <Terminal {...props} className="w-4 h-4 text-violet-500" />;
      case "GitHub Copilot": return <Code2 {...props} className="w-4 h-4 text-sky-500" />;
      case "Claude Code": return <Cpu {...props} className="w-4 h-4 text-amber-500" />;
      case "Windsurf": return <Wind {...props} className="w-4 h-4 text-emerald-500" />;
      case "Amazon Q": return <MessageSquare {...props} className="w-4 h-4 text-blue-500" />;
      case "Code Rabbit": return <Flame {...props} className="w-4 h-4 text-rose-500" />;
      case "Greptile": return <Box {...props} className="w-4 h-4 text-slate-400" />;
      case "Cursor Bugbot": return <Bot {...props} className="w-4 h-4 text-indigo-500" />;
      default: return <Activity {...props} className="w-4 h-4 text-slate-400" />;
    }
  };

  const handleScrollDown = () => {
    const nextSection = document.getElementById("about");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const dashboardY = Math.max(-y * 0.15, -150);

  return (
    <section className="relative min-h-screen pt-16 sm:pt-20 pb-24 flex flex-col items-center justify-start overflow-hidden bg-bg z-10">
      {/* Background blobs & patterns */}
      <HeroBackground scrollY={y} />

      <div className="w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-start gap-4 sm:gap-6 relative z-10">
        
        {/* Main centered copywriting wrapper with dynamic height to collapse layout space on scroll */}
          <HeroContent scrollY={y} />

        {/* Dynamic Interactive Dashboard (Jellyfish Style) */}
        <div 
          ref={dashboardRef}
          className={`w-full rounded-3xl dashboard-pop-3d overflow-hidden max-w-[1240px] animate-fade-in delay-500 transition-transform duration-75 ${
            isIntersecting ? "in-view" : ""
          }`}
          style={{
            transform: `translate3d(0, ${dashboardY}px, 0)`,
            willChange: "transform"
          }}
        >
          
          {/* Sub-navbar / Tabs (matching the exact Jellyfish order) */}
          <div className="flex items-center overflow-x-auto border-b border-slate-100 bg-slate-50/50 px-6 py-1 scrollbar-none">
            <div className="flex gap-6">
              {dashboardTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 text-xs font-bold tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer border-b-2 ${
                    activeTab === tab
                      ? "border-[#1F4096] text-[#1F4096]"
                      : "border-transparent text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Dashboard Content split layout */}
          <div className="grid grid-cols-1 md:grid-cols-5 min-h-[480px]">
            
            {/* Left Sidebar */}
            <div className="md:col-span-1 border-r border-slate-100 bg-slate-50/20 p-5 flex flex-col gap-4 dashboard-sidebar">
              <div className="flex items-center justify-between px-3 py-2.5 bg-white rounded-xl border border-slate-200/60 shadow-sm cursor-pointer hover:border-slate-300 transition-colors">
                <span className="text-xs font-bold text-slate-700">All Tools</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>

              <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm p-3 flex flex-col gap-1">
                {sidebarTools.map((tool) => (
                  <button
                    key={tool}
                    onClick={() => setActiveTool(tool)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all duration-300 cursor-pointer ${
                      activeTool === tool
                        ? "bg-[#1F4096]/10 text-[#1F4096]"
                        : "hover:bg-slate-100/70 text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {getToolIcon(tool)}
                    <span>{tool}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right main charts area */}
            <div className="md:col-span-4 p-6 sm:p-8 flex flex-col justify-between gap-8 bg-slate-50/50">
              
              {/* Header section inside the board with AI Orbit */}
              <div className="flex items-center justify-between w-full dashboard-main-header">
                <h3 className="text-xl font-bold text-slate-900 font-heading">
                  {currentData.headline}
                </h3>
                <div className="orbit-wrap" aria-hidden="true">
                  <div className="orbit-ring"></div>
                  <div className="orbit-center">🤖</div>
                  <div className="orbit-dot d1"></div>
                  <div className="orbit-dot d2"></div>
                </div>
              </div>

              {/* Cards Grid */}
              <div key={`${activeTab}-${activeTool}-cards`} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {currentData.cards.map((card, idx) => (
                  <div 
                    key={idx} 
                    className="p-6 rounded-2xl pop-card-3d flex flex-col justify-between min-h-[235px]"
                  >
                    {/* Title */}
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
                      {card.title}
                    </span>

                    {/* Main metrics block (matching Jellyfish style exactly) */}
                    <div className="mb-4">
                      {card.cardType === "comparison" ? (
                        <div className="flex flex-col">
                          <span className={`text-2xl font-black tracking-tight flex items-center gap-1 leading-none ${
                            card.isPositive ? "text-emerald-500" : "text-rose-500"
                          }`}>
                            {card.isPositive ? (
                              <ArrowDown className="w-5 h-5 flex-shrink-0" />
                            ) : (
                              <ArrowUp className="w-5 h-5 flex-shrink-0" />
                            )}
                            <AnimatedNumber valueStr={card.metric} trigger={isIntersecting} />
                          </span>
                          <span className={`text-[10px] font-bold mt-1.5 ${
                            card.isPositive ? "text-emerald-500" : "text-rose-500"
                          }`}>
                            {card.metricLabel}
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col">
                          <span className="text-3xl font-black tracking-tight text-slate-800 leading-none">
                            <AnimatedNumber valueStr={card.metric} trigger={isIntersecting} />
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400 mt-1.5 leading-tight">
                            {card.metricLabel}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Stacked comparison bar chart or NPS segment */}
                    <div className="mt-auto pt-3 border-t border-slate-100">
                      {card.cardType === "comparison" && card.comparisonData ? (
                        <div className="flex flex-col gap-2">
                          {card.comparisonData.map((bar, bIdx) => {
                            const isWithAI = bar.label.toLowerCase().includes("with");
                            
                            // Color variables matching Jellyfish site
                            let pillBgClass = "bg-slate-100 text-slate-700";
                            if (isWithAI) {
                              pillBgClass = card.isPositive 
                                ? "bg-[#D4FC34] text-slate-900 font-extrabold" 
                                : "bg-rose-100 text-rose-700 font-bold";
                            }

                            return (
                              <div key={bIdx} className="flex flex-col gap-1.5 py-0.5">
                                <div className="flex items-center justify-between text-xs">
                                  <div className="flex items-center gap-2 text-slate-500 font-bold text-[11px]">
                                    {isWithAI ? (
                                      <Sparkles className="w-3.5 h-3.5 text-violet-500 shrink-0" />
                                    ) : (
                                      <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                    )}
                                    <span>{bar.label}</span>
                                  </div>
                                  <span className={`px-2.5 py-1 rounded-md text-[10px] tracking-tight ${pillBgClass}`}>
                                    {bar.valueText}
                                    {bar.offsetLabel && (
                                      <span className="opacity-80 ml-1 font-bold">{bar.offsetLabel}</span>
                                    )}
                                  </span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${bar.colorClass} hero-progress-bar-fill`}
                                    style={{ width: `${bar.percentage}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        // NPS Segment Chart (stacked horizontal bar + labels)
                        card.npsData && (
                          <div className="w-full flex flex-col gap-2.5">
                            {/* Stacked bar */}
                            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                              {card.npsData.map((seg, sIdx) => (
                                <div
                                  key={sIdx}
                                  className={`h-full ${seg.colorClass}`}
                                  style={{ width: `${seg.percentage}%` }}
                                  title={`${seg.label}: ${seg.percentage}%`}
                                />
                              ))}
                            </div>
                            
                            {/* Detailed breakdown list with mini-progress bars */}
                            <div className="flex flex-col gap-1.5 mt-1">
                              {card.npsData.map((seg, sIdx) => (
                                <div key={sIdx} className="flex items-center justify-between gap-3 text-[10.5px] font-bold">
                                  <div className="flex items-center gap-1.5 w-16 text-slate-500 font-extrabold">
                                    <span className={`w-2 h-2 rounded-full ${seg.colorClass}`} />
                                    <span>{seg.label}</span>
                                  </div>
                                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full ${seg.colorClass} rounded-full hero-progress-bar-fill`} 
                                      style={{ width: `${seg.percentage}%` }} 
                                    />
                                  </div>
                                  <span className="text-slate-700 w-8 text-right font-extrabold">
                                    <AnimatedNumber valueStr={`${seg.percentage}%`} trigger={isIntersecting} />
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </div>

                  </div>
                ))}
              </div>

              {/* Bottom Throughput bar charts */}
              <div className="border-t border-slate-100 pt-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4 throughput-header">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Throughput
                  </h4>
                  {/* Legend matching Jellyfish */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[10px] font-extrabold text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#7C3AED]" />
                      <span>with Copilot</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#1E1B4B]" />
                      <span>with Cursor</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#06B6D4]" />
                      <span>with Gemini</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#475569]" />
                      <span>with 2+ Tools</span>
                    </div>
                  </div>
                </div>
                
                {/* Vertical Bar Chart Container */}
                <div className="flex gap-4 items-stretch h-48 w-full mt-6 pl-2 relative throughput-chart-wrap">
                  {/* Y-Axis Labels */}
                  <div className="flex flex-col justify-between text-[9px] font-bold text-slate-400 h-full w-6 pr-2 border-r border-slate-100/80">
                    <span>40</span>
                    <span>30</span>
                    <span>20</span>
                    <span>10</span>
                    <span>0</span>
                  </div>

                  {/* Chart Grid & Bars Wrapper */}
                  <div key={`${activeTab}-${activeTool}-chart`} className="flex-1 flex justify-between items-end h-full px-4 relative">
                    {/* Horizontal grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                      <div className="w-full border-t border-slate-100/70 h-px" />
                      <div className="w-full border-t border-slate-100/70 h-px" />
                      <div className="w-full border-t border-slate-100/70 h-px" />
                      <div className="w-full border-t border-slate-100/70 h-px" />
                      <div className="w-full border-t border-slate-100/70 h-px" />
                    </div>

                    {/* Stacked Vertical Bars */}
                    {throughputWeeklyData.map((bar, bIdx) => (
                      <div key={bIdx} className="w-6 sm:w-8 flex flex-col justify-end h-full gap-0.5 z-10 hover:opacity-90 transition-opacity">
                        {bar.segments.map((seg, sIdx) => (
                          <div
                            key={sIdx}
                            className={`${seg.color} w-full rounded-sm bar-segment-grow`}
                            style={{ 
                              height: `${seg.h}%`,
                              animationDelay: `${0.1 + bIdx * 0.03 + sIdx * 0.01}s`
                            }}
                            title={`Segment height: ${seg.h}%`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Mouse scroll-down indicator */}
      <ScrollIndicator onClick={handleScrollDown} scrollY={y} />
    </section>
  );
};

export default Hero;
