import React from "react";

interface TestiItem {
  stars: string;
  quote: string;
  initials: string;
  avatarBg: string;
  name: string;
  role: string;
}

const testimonialsData: TestiItem[] = [
  {
    stars: "★★★★★",
    quote: '"Hanux Tech delivered our platform ahead of schedule. Their engineering team is exceptional — zero shortcuts, all precision. Felt like having a co-founder."',
    initials: "AK",
    avatarBg: "#1f4096",
    name: "Arjun Kapoor",
    role: "CTO, Finvesta India"
  },
  {
    stars: "★★★★★",
    quote: '"The AI integration they built for our ops team cut our processing time by half. Outstanding technical depth and transparency throughout the entire project."',
    initials: "SR",
    avatarBg: "#10B981",
    name: "Sarah Robinson",
    role: "Head of Product, DataBridge UK"
  },
  {
    stars: "★★★★★",
    quote: '"Working with Hanux felt like having a senior engineering team embedded in our company. A genuine force multiplier — I\'d rehire them without hesitation."',
    initials: "MJ",
    avatarBg: "#F59E0B",
    name: "Marcus Johnson",
    role: "Founder, Lumio Health"
  },
  {
    stars: "★★★★★",
    quote: '"What a magical team! They built our custom lead routing engine in record time. Automated 80% of our manual marketing pipelines with zero fuss."',
    initials: "TL",
    avatarBg: "#D4537E",
    name: "Tuongvan Le",
    role: "Head of Marketing, Rutter"
  },
  {
    stars: "★★★★★",
    quote: '"Their cloud optimization saved us over $12K/month in server costs. The monitoring stack is crystal clear. Absolute game changer."',
    initials: "ML",
    avatarBg: "#534AB7",
    name: "Michel Lieben",
    role: "CEO, ColdIQ"
  },
  {
    stars: "★★★★★",
    quote: '"I just want to say Hanux Tech works exactly like I always wanted an engineering team to work. Pristine TypeScript code and robust APIs."',
    initials: "AP",
    avatarBg: "#EF9F27",
    name: "Andrea Popova",
    role: "CEO, CPDG"
  },
  {
    stars: "★★★★★",
    quote: '"Hanux is unreasonably great. They took our complex Figma designs and built a pixel-perfect, accessible interface in just 5 weeks."',
    initials: "CS",
    avatarBg: "#378ADD",
    name: "Collin Stewart",
    role: "CEO, Predictable Revenue"
  },
  {
    stars: "★★★★★",
    quote: '"Prediction: in the next few years, teams who do not outsource their core system optimizations to elite velocity squads like Hanux will fall behind."',
    initials: "XC",
    avatarBg: "#E24B4A",
    name: "Xavier Caffrey",
    role: "Founder, OneWay"
  },
  {
    stars: "★★★★★",
    quote: '"Their developer handoff is seamless. The design tokens compile straight into our Tailwind configuration. Exceptional attention to detail."',
    initials: "PS",
    avatarBg: "#1D9E75",
    name: "Patrick Spychalski",
    role: "Co-Founder, TheKiln"
  }
];

// Distribute testimonials into 3 columns
const col1 = [testimonialsData[0], testimonialsData[3], testimonialsData[6]];
const col2 = [testimonialsData[1], testimonialsData[4], testimonialsData[7]];
const col3 = [testimonialsData[2], testimonialsData[5], testimonialsData[8]];

export const Testimonials: React.FC = () => {
  return (
    <section className="pt-12 pb-24 px-6 md:px-14 bg-slate-50/50 border-t border-slate-200/40 relative overflow-hidden">
      {/* CSS Injected Styles block for infinite vertical scrolling marquees */}
      <style>{`
        .testimonials-marquee-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          height: 620px;
          overflow: hidden;
          position: relative;
          mask-image: linear-gradient(to bottom, transparent, white 12%, white 88%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, white 12%, white 88%, transparent);
        }

        @media (max-width: 900px) {
          .testimonials-marquee-container {
            grid-template-columns: 1fr;
            height: 520px;
            mask-image: linear-gradient(to bottom, transparent, white 8%, white 92%, transparent);
            -webkit-mask-image: linear-gradient(to bottom, transparent, white 8%, white 92%, transparent);
          }
          /* Hide column 2 and 3 on small mobile to keep it clean */
          .marquee-column-2, .marquee-column-3 {
            display: none !important;
          }
        }

        .marquee-column {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          height: 100%;
        }

        .marquee-inner {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          will-change: transform;
        }

        .column-up .marquee-inner {
          animation: testiScrollUp 25s linear infinite;
        }

        .column-down .marquee-inner {
          animation: testiScrollDown 25s linear infinite;
        }

        /* Pause animation on hover */
        .marquee-column:hover .marquee-inner {
          animation-play-state: paused;
        }

        @keyframes testiScrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }

        @keyframes testiScrollDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }

        .testi-card {
          background: #ffffff;
          border: 1px solid rgba(13, 30, 61, 0.05);
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .testi-card:hover {
          border-color: rgba(31, 64, 150, 0.18);
          box-shadow: 0 10px 30px rgba(31, 64, 150, 0.06);
          transform: translateY(-2px);
        }
      `}</style>

      <div className="max-w-[1200px] mx-auto">
        
        {/* Header Block */}
        <div className="mb-16 text-left">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-4 h-[2px] bg-[#3B82F6] rounded-full" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#3B82F6]">Testimonials</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0D1E3D] tracking-tight leading-[1.1] mb-6">
            Partners Who<br />
            <em className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#1F4096] to-[#3B82F6]">Trust Us</em>
          </h2>
          
          <p className="text-[#64748B] leading-relaxed text-[15px] max-w-lg">
            Satisfaction scores from startup and enterprise teams who build high-velocity systems with Hanux Tech.
          </p>
        </div>

        {/* Scrolling Columns Container */}
        <div className="testimonials-marquee-container">
          
          {/* Column 1 - Scroll Up */}
          <div className="marquee-column column-up marquee-column-1">
            <div className="marquee-inner">
              {/* Duplicate array elements for seamless infinite scroll loop */}
              {[...col1, ...col1].map((testi, idx) => (
                <div key={idx} className="testi-card">
                  <div>
                    <div className="text-[#F59E0B] text-xs tracking-[2px] mb-4 select-none">
                      {testi.stars}
                    </div>
                    <p className="text-[13px] text-[#475569] leading-relaxed mb-6">
                      {testi.quote}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-auto">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ backgroundColor: testi.avatarBg }}
                    >
                      {testi.initials}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-[#0D1E3D]">{testi.name}</span>
                      <span className="text-[10px] font-semibold text-[#64748B] mt-0.5">{testi.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 - Scroll Down */}
          <div className="marquee-column column-down marquee-column-2">
            <div className="marquee-inner">
              {[...col2, ...col2].map((testi, idx) => (
                <div key={idx} className="testi-card">
                  <div>
                    <div className="text-[#F59E0B] text-xs tracking-[2px] mb-4 select-none">
                      {testi.stars}
                    </div>
                    <p className="text-[13px] text-[#475569] leading-relaxed mb-6">
                      {testi.quote}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-auto">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ backgroundColor: testi.avatarBg }}
                    >
                      {testi.initials}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-[#0D1E3D]">{testi.name}</span>
                      <span className="text-[10px] font-semibold text-[#64748B] mt-0.5">{testi.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3 - Scroll Up */}
          <div className="marquee-column column-up marquee-column-3">
            <div className="marquee-inner">
              {[...col3, ...col3].map((testi, idx) => (
                <div key={idx} className="testi-card">
                  <div>
                    <div className="text-[#F59E0B] text-xs tracking-[2px] mb-4 select-none">
                      {testi.stars}
                    </div>
                    <p className="text-[13px] text-[#475569] leading-relaxed mb-6">
                      {testi.quote}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-auto">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ backgroundColor: testi.avatarBg }}
                    >
                      {testi.initials}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-[#0D1E3D]">{testi.name}</span>
                      <span className="text-[10px] font-semibold text-[#64748B] mt-0.5">{testi.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
        
      </div>
    </section>
  );
};

export default Testimonials;
