import React, { useState } from "react";
import { Sparkles } from "lucide-react";

interface TechItem {
  name: string;
  logo: React.ReactNode;
  isDark?: boolean;
}

export const Technology: React.FC = () => {
  const [activeTech, setActiveTech] = useState<string | null>(null);

  // SVG Brand Logos List
  const track1: TechItem[] = [
    {
      name: "React",
      logo: (
        <svg className="w-8 h-8 transition-transform duration-300 group-hover:scale-75 group-hover:-translate-y-2.5" viewBox="-11.5 -10.23 23 20.46">
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      )
    },
    {
      name: "Next.js",
      logo: (
        <svg className="w-8 h-8 transition-transform duration-300 group-hover:scale-75 group-hover:-translate-y-2.5" viewBox="0 0 24 24" fill="black">
          <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="1.2" fill="none"/>
          <path d="M17.5 17.5L10 9v7.5H9V8h1.5l6.5 7.5V8h1v9.5z"/>
        </svg>
      )
    },
    {
      name: "Node.js",
      logo: (
        <svg className="w-8 h-8 transition-transform duration-300 group-hover:scale-75 group-hover:-translate-y-2.5" viewBox="0 0 24 24" fill="#339933">
          <path d="M12 2L4 6.5v9L12 20l8-4.5v-9L12 2zm-1 15.5l-5-2.8v-5.4l5 2.8v5.4zm2 0v-5.4l5-2.8v5.4l-5 2.8z"/>
        </svg>
      )
    },
    {
      name: "TypeScript",
      logo: (
        <svg className="w-8 h-8 transition-transform duration-300 group-hover:scale-75 group-hover:-translate-y-2.5" viewBox="0 0 24 24" fill="#3178C6">
          <rect width="24" height="24" rx="4"/>
          <text x="12" y="17" fill="white" fontSize="11" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">TS</text>
        </svg>
      )
    },
    {
      name: "Hanux API",
      logo: (
        <svg className="w-8 h-8 fill-white transition-transform duration-300 group-hover:scale-75 group-hover:-translate-y-2.5" viewBox="0 0 16 16">
          <path d="M3 3h4v4H3zm6 0h4v4H9zM3 9h4v4H3zm6 2a2 2 0 104 0 2 2 0 00-4 0z"/>
        </svg>
      ),
      isDark: true
    },
    {
      name: "Docker",
      logo: (
        <svg className="w-8 h-8 transition-transform duration-300 group-hover:scale-75 group-hover:-translate-y-2.5" viewBox="0 0 24 24" fill="#2496ED">
          <path d="M13.983 11.078h2.119c.102 0 .186-.083.186-.185V8.99c0-.102-.084-.186-.186-.186h-2.119c-.103 0-.186.084-.186.186v1.903c0 .102.083.185.186.185zm-2.91 0h2.117c.102 0 .185-.083.185-.185V8.99c0-.102-.083-.186-.185-.186h-2.117c-.103 0-.186.084-.186.186v1.903c0 .102.083.185.186.185zm-2.912 0h2.119c.102 0 .185-.083.185-.185V8.99c0-.102-.083-.186-.185-.186H8.16c-.102 0-.185.084-.185.186v1.903c0 .102.083.185.185.185zm-2.91 0h2.12c.102 0 .185-.083.185-.185V8.99c0-.102-.083-.186-.185-.186H5.25c-.102 0-.185.084-.185.186v1.903c0 .102.083.185.185.185zM8.16 8.162h2.119c.102 0 .185-.083.185-.185V6.074c0-.102-.083-.186-.185-.186H8.16c-.102 0-.185.084-.185.186v1.903c0 .102.083.185.185.185zM11.07 8.162h2.119c.102 0 .186-.083.186-.185V6.074c0-.102-.084-.186-.186-.186h-2.119c-.103 0-.186.084-.186.186v1.903c0 .102.083.185.186.185zm0-2.913h2.119c.102 0 .186-.083.186-.185V3.161c0-.103-.084-.186-.186-.186h-2.119c-.103 0-.186.083-.186.186v1.903c0 .102.083.185.186.185zM15 22.8c-1.2.6-3 .9-4.2.9C5.4 23.7 0 20.1 0 12.6c0-1.8.6-3.6 1.8-5.1.3-.3.9-.3 1.2 0l1.2 1.2c.3.3.3.9 0 1.2C3.3 10.8 3 12 3 12.9c0 5.4 3.9 7.8 7.5 7.8 2.7 0 5.4-1.2 5.7-3.9h-8.7c-.3 0-.6-.3-.6-.6v-1.2c0-.3.3-.6.6-.6h14.7c.3 0 .6.3.6.6C22.8 19.8 19.2 21.9 15 22.8z"/>
        </svg>
      )
    },
    {
      name: "Kubernetes",
      logo: (
        <svg className="w-8 h-8 transition-transform duration-300 group-hover:scale-75 group-hover:-translate-y-2.5" viewBox="0 0 24 24" fill="#326CE5">
          <path d="M12 1.6l9 5.2v10.4l-9 5.2-9-5.2V6.8zM12 4.4L5.4 8.2v7.6l6.6 3.8 6.6-3.8V8.2z"/>
        </svg>
      )
    },
    {
      name: "AWS",
      logo: (
        <svg className="w-8 h-8 transition-transform duration-300 group-hover:scale-75 group-hover:-translate-y-2.5" viewBox="0 0 24 24" fill="#FF9900">
          <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4c-3.48 0-6.47 2.37-7.35 5.54A6 6 0 0 0 0 15c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
        </svg>
      )
    },
    {
      name: "GitHub",
      logo: (
        <svg className="w-8 h-8 transition-transform duration-300 group-hover:scale-75 group-hover:-translate-y-2.5" viewBox="0 0 24 24" fill="#181717">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      )
    },
    {
      name: "Slack",
      logo: (
        <svg className="w-8 h-8 transition-transform duration-300 group-hover:scale-75 group-hover:-translate-y-2.5" viewBox="0 0 24 24" fill="none">
          <path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523 2.528 2.528 0 01-2.522-2.523 2.528 2.528 0 012.522-2.52h2.52v2.52z" fill="#36C5F0"/>
          <path d="M6.302 15.165a2.528 2.528 0 012.52-2.52h5.043a2.528 2.528 0 012.522 2.52v5.042a2.528 2.528 0 01-2.522 2.52H8.822a2.528 2.528 0 01-2.52-2.52v-5.042z" fill="#36C5F0"/>
          <path d="M8.822 5.043a2.528 2.528 0 012.52-2.522 2.528 2.528 0 012.522 2.522v2.52h-2.522a2.528 2.528 0 01-2.52-2.52z" fill="#2EB67D"/>
          <path d="M8.822 6.303a2.528 2.528 0 012.52 2.52v5.043a2.528 2.528 0 01-2.52 2.522H3.78a2.528 2.528 0 01-2.522-2.522V8.823a2.528 2.528 0 012.522-2.52h5.042z" fill="#2EB67D"/>
          <path d="M18.958 8.823a2.528 2.528 0 012.52-2.52h2.522a2.528 2.528 0 012.522 2.52 2.528 2.528 0 01-2.522 2.52h-2.522v-2.52z" fill="#ECB22E"/>
          <path d="M17.698 8.823a2.528 2.528 0 01-2.52 2.52h-5.043a2.528 2.528 0 01-2.522-2.52V3.78a2.528 2.528 0 012.522-2.522h5.043a2.528 2.528 0 012.52 2.522v5.043z" fill="#ECB22E"/>
          <path d="M15.178 18.958a2.528 2.528 0 01-2.52 2.522 2.528 2.528 0 01-2.522-2.522v-2.52h2.522a2.528 2.528 0 012.52 2.52z" fill="#E01E5A"/>
          <path d="M15.178 17.698a2.528 2.528 0 01-2.52-2.52v-5.043a2.528 2.528 0 012.52-2.522h5.043a2.528 2.528 0 012.522 2.522v5.043a2.528 2.528 0 01-2.522 2.52h-5.043z" fill="#E01E5A"/>
        </svg>
      )
    }
  ];

  const track2: TechItem[] = [
    {
      name: "Figma",
      logo: (
        <svg className="w-8 h-8 transition-transform duration-300 group-hover:scale-75 group-hover:-translate-y-2.5" viewBox="0 0 24 24" fill="none">
          <path d="M12 2a4 4 0 00-4 4 4 4 0 004 4h4V6a4 4 0 00-4-4z" fill="#F24E1E"/>
          <path d="M8 10a4 4 0 004-4 4 4 0 00-4 4v4H4a4 4 0 004-4z" fill="#A259FF"/>
          <path d="M8 14a4 4 0 004 4V14H8z" fill="#1ABCFE"/>
          <path d="M16 10a4 4 0 00-4 4V10h4z" fill="#0ACF83"/>
          <path d="M12 18a4 4 0 004 4 4 4 0 004-4 4 4 0 00-4-4h-4v4z" fill="#FF7262"/>
        </svg>
      )
    },
    {
      name: "OpenAI",
      logo: (
        <svg className="w-8 h-8 transition-transform duration-300 group-hover:scale-75 group-hover:-translate-y-2.5" viewBox="0 0 24 24" fill="#000000">
          <path d="M21.2 10.4a4.4 4.4 0 00-1.6-4 4.4 4.4 0 00-5.8-.3 4.4 4.4 0 00-4-1.6 4.4 4.4 0 00-5.8 4 4.4 0 00.3 5.8 4.4 4.4 0 001.6 4 4.4 0 005.8.3 4.4 4.4 0 004 1.6 4.4 4.4 0 005.8-4 4.4 0 00-.3-5.8zM12 13.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm4.5-1.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-6 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
        </svg>
      )
    },
    {
      name: "PostgreSQL",
      logo: (
        <svg className="w-8 h-8 transition-transform duration-300 group-hover:scale-75 group-hover:-translate-y-2.5" viewBox="0 0 24 24" fill="#336791">
          <path d="M12 2a10 10 0 00-10 10c0 4.54 3.03 8.38 7.18 9.57.17-.4.22-.84.22-1.24v-1.66c0-.52-.16-1.02-.46-1.44a5.955 5.955 0 01-.94-3.23c0-3.31 2.69-6 6-6s6 2.69 6 6c0 1.25-.38 2.41-.94 3.23-.3.42-.46.92-.46 1.44v1.66c0 .4.05.84.22 1.24 4.15-1.19 7.18-5.03 7.18-9.57A10 10 0 0012 2z"/>
        </svg>
      )
    },
    {
      name: "Python",
      logo: (
        <svg className="w-8 h-8 transition-transform duration-300 group-hover:scale-75 group-hover:-translate-y-2.5" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#3776AB"/>
          <path d="M11 7V9H9V11H7V13H9V15H11V17H13V15H15V13H17V11H15V9H13V7H11z" fill="#FFE873"/>
        </svg>
      )
    },
    {
      name: "GraphQL",
      logo: (
        <svg className="w-8 h-8 transition-transform duration-300 group-hover:scale-75 group-hover:-translate-y-2.5" viewBox="0 0 24 24" fill="#E10098">
          <path d="M12 2L2 8v8l10 6 10-6V8L12 2zm0 3.2L18.8 9.3v5.4L12 18.8l-6.8-4.1V9.3L12 5.2z"/>
        </svg>
      )
    },
    
    
    {
      name: "Stripe",
      logo: (
        <svg className="w-8 h-8 transition-transform duration-300 group-hover:scale-75 group-hover:-translate-y-2.5" viewBox="0 0 24 24" fill="#635BFF">
          <path d="M13.9 11.2c-1.2-.5-1.7-.8-1.7-1.4 0-.5.5-.9 1.3-.9 1.1 0 2.2.3 3.1.9l.9-2.1c-1.1-.6-2.5-.9-4-.9-2.6 0-4.4 1.4-4.4 3.7 0 2.4 2 3.3 3.8 4 1.3.5 1.8.9 1.8 1.5 0 .6-.6 1-1.6 1-1.3 0-2.8-.5-3.8-1.2l-.9 2.2c1.2.7 2.9 1.1 4.7 1.1 2.7 0 4.6-1.4 4.6-3.8.1-2.5-1.9-3.4-3.8-4.2z"/>
        </svg>
      )
    },
    {
      name: "Jira",
      logo: (
        <svg className="w-8 h-8 transition-transform duration-300 group-hover:scale-75 group-hover:-translate-y-2.5" viewBox="0 0 24 24" fill="#0052CC">
          <path d="M11.95 2A1.95 1.95 0 0010 3.95v6.1a1.95 1.95 0 003.9 0v-6.1A1.95 1.95 0 0011.95 2zm-6 6A1.95 1.95 0 004 9.95v6.1a1.95 1.95 0 003.9 0v-6.1A1.95 1.95 0 005.95 8zm12 4a1.95 1.95 0 00-1.95 1.95v6.1a1.95 1.95 0 003.9 0v-6.1A1.95 1.95 0 0017.95 12z"/>
        </svg>
      )
    },
    {
      name: "Trello",
      logo: (
        <svg className="w-8 h-8 transition-transform duration-300 group-hover:scale-75 group-hover:-translate-y-2.5" viewBox="0 0 24 24" fill="#0079BF">
          <rect width="24" height="24" rx="4" />
          <rect x="3" y="3" width="7" height="13" rx="1.5" fill="white" />
          <rect x="14" y="3" width="7" height="8" rx="1.5" fill="white" />
        </svg>
      )
    },
    {
      name: "Confluence",
      logo: (
        <svg className="w-8 h-8 transition-transform duration-300 group-hover:scale-75 group-hover:-translate-y-2.5" viewBox="0 0 24 24" fill="#0052CC">
          <path d="M12.016 1.984a10.016 10.016 0 00-7.07 17.07 10.016 10.016 0 0014.14 0 10.016 10.016 0 00-7.07-17.07zm3.53 10.61l-3.53-3.53-3.53 3.53 3.53 3.53 3.53-3.53z"/>
        </svg>
      )
    }
  ];

  // Triplicate the tracks to ensure a fully seamless carousel scroll loop on all widths
  const duplicatedTrack1 = [...track1, ...track1, ...track1];
  const duplicatedTrack2 = [...track2, ...track2, ...track2];

  const handleCardClick = (techName: string) => {
    setActiveTech(activeTech === techName ? null : techName);
  };

  return (
    <div className="bg-[#FAF5EC] py-12 px-4 sm:px-6 md:px-10">
      <section className="max-w-[1280px] mx-auto bg-gradient-to-b from-[#080d21] to-[#0d1533] rounded-[32px] md:rounded-[48px] shadow-[0_20px_50px_rgba(8,13,33,0.25)] select-none overflow-hidden relative py-20 px-6 md:px-14">
      <div className="max-w-[1200px] mx-auto text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 !text-[#38bdf8]" />
          <span className="text-xs font-bold uppercase tracking-widest !text-[#38bdf8]">Integrations</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold !text-[#38bdf8] tracking-tight leading-[1.1] mb-4">
          Unify Data From All Your Tools
        </h2>
        <p className="text-slate-300 leading-relaxed text-sm sm:text-base max-w-xl mx-auto">
          Integrate with the tools your team already uses. Hover or click on any tool card to see its identity.
        </p>
      </div>

      {/* Two Row Opposite Marquee Track */}
      <div className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto relative z-10">
        
        {/* Row 1: Scrolling Left */}
        <div className="overflow-hidden py-2 bg-transparent w-full relative">
          {/* Left/Right fading gradient mask for integrations */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#080d21] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#080d21] to-transparent z-20 pointer-events-none" />
          
          <div className="marquee-track">
            {duplicatedTrack1.map((tech, idx) => (
              <div 
                key={`t1-${idx}`} 
                onClick={() => handleCardClick(tech.name)}
                className={`group relative rounded-[28px] w-20 h-20 sm:w-24 sm:h-24 flex flex-col items-center justify-center p-3.5 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 shrink-0 mx-3 select-none ${
                  tech.isDark 
                    ? "bg-gradient-to-br from-[#0f3ca0] to-[#1e40af] border border-blue-500/30 shadow-[0_4px_20px_rgba(15,60,160,0.35)] hover:shadow-[0_12px_28px_rgba(15,60,160,0.55)]"
                    : "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_30px_rgba(37,99,235,0.18)]"
                }`}
              >
                {tech.logo}
                <span className={`absolute bottom-2 text-[9px] sm:text-[10px] font-extrabold tracking-tight whitespace-nowrap transition-all duration-300 pointer-events-none ${
                  tech.isDark ? "text-white" : "text-[#1F4096]"
                } ${
                  activeTech === tech.name ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
                }`}>
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="overflow-hidden py-2 bg-transparent w-full relative">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#080d21] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#080d21] to-transparent z-20 pointer-events-none" />
          
          <div className="marquee-track-reverse">
            {duplicatedTrack2.map((tech, idx) => (
              <div 
                key={`t2-${idx}`} 
                onClick={() => handleCardClick(tech.name)}
                className={`group relative rounded-[28px] w-20 h-20 sm:w-24 sm:h-24 flex flex-col items-center justify-center p-3.5 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 shrink-0 mx-3 select-none ${
                  tech.isDark 
                    ? "bg-gradient-to-br from-[#0f3ca0] to-[#1e40af] border border-blue-500/30 shadow-[0_4px_20px_rgba(15,60,160,0.35)] hover:shadow-[0_12px_28px_rgba(15,60,160,0.55)]"
                    : "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_30px_rgba(37,99,235,0.18)]"
                }`}
              >
                {tech.logo}
                <span className={`absolute bottom-2 text-[9px] sm:text-[10px] font-extrabold tracking-tight whitespace-nowrap transition-all duration-300 pointer-events-none ${
                  tech.isDark ? "text-white" : "text-[#1F4096]"
                } ${
                  activeTech === tech.name ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
                }`}>
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  </div>
  );
};

export default Technology;
