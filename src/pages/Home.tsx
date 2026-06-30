import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar/Navbar";
import { Hero } from "../components/Hero/Hero";
import { About } from "../components/About/About";
import { Services } from "../components/Services/Services";
import { Technology } from "../components/Technology/Technology";
import { Projects } from "../components/Projects/Projects";
import { Process } from "../components/Process/Process";
import { Testimonials } from "../components/Testimonials/Testimonials";
import { FAQ } from "../components/FAQ/FAQ";
import { Footer } from "../components/Footer/Footer";

export const Home: React.FC = () => {
  useEffect(() => {
    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el, index) => {
      const htmlEl = el as HTMLElement;
      // Stagger transitions slightly
      htmlEl.style.transitionDelay = `${(index % 4) * 80}ms`;
      observer.observe(el);
    });

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-bg text-[#0D1E3D] overflow-x-clip font-sans">
      {/* Header Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero />



        {/* 3. About Section */}
        <About />

        {/* 4. Technology Stack (Horizontal Infinite Marquee) */}
        <Technology />

        {/* 5. Services Section */}
        <Services />

        {/* 6. Featured Projects (Case Studies) */}
        <Projects />

        {/* 7. How We Work (Process Timeline) */}
        <Process />

        {/* 7.5. Automated Workflow Animation Section */}
        <section className="px-6 md:px-14 pt-0 pb-16 bg-[#FAF5EC] select-none relative overflow-hidden">
          <div className="max-w-[1200px] mx-auto text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2563eb] mb-3 inline-block">
              Interactive Ecosystem
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0d1b3e] mb-6 tracking-tight">
              Automated Workflows, <em>Visualized.</em>
            </h2>
            <p className="text-base text-gray-500 max-w-[640px] mx-auto mb-12 leading-relaxed">
              See how our design and engineering pieces connect seamlessly to deliver zero-downtime, scalable, and high-performance digital products.
            </p>
            <div className="relative rounded-[28px] overflow-hidden shadow-2xl border border-gray-100/50 bg-[#F3F4F6] max-w-[1000px] mx-auto group">
              {/* Decorative browser dots */}
              <div className="absolute top-4 left-4 flex gap-2 z-10">
                <span className="w-3 h-3 rounded-full bg-red-400/80"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400/80"></span>
                <span className="w-3 h-3 rounded-full bg-green-400/80"></span>
              </div>
              <video
                src="/videos/make_it_similar_type_of_animat.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover block"
              />
            </div>
          </div>
        </section>

        {/* 8. Testimonials Section */}
        <Testimonials />

        {/* 9. FAQ Section & Sticky Contact Form */}
        <FAQ />

        {/* 10. CTA Banner Section */}
        <section className="px-6 md:px-14 pb-24 bg-bg">
          <div className="max-w-[1200px] mx-auto bg-gradient-to-r from-[#0d2e7a] via-[#0f3ca0] to-[#3b82f6] rounded-[28px] py-16 px-8 md:px-16 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xl text-left">
            {/* Ambient Background Circles */}
            <div className="absolute w-[500px] h-[500px] rounded-full bg-white/5 right-[-100px] top-[-200px] pointer-events-none" />
            <div className="absolute w-[300px] h-[300px] rounded-full bg-white/5 left-[-50px] bottom-[-150px] pointer-events-none" />
            
            <div className="relative z-10 max-w-xl">
              <h2 className="text-2xl md:text-4xl font-extrabold !text-white tracking-tight leading-[1.1] mb-3">
                Let's Build Something<br />
                <em className="font-serif italic font-normal !text-white">Remarkable</em> Together
              </h2>
              <p className="!text-white/80 text-sm md:text-base leading-relaxed">
                Join 50+ companies who've scaled their engineering with Hanux Tech. Your next product starts with a conversation.
              </p>
            </div>
            
            <div className="relative z-10 flex flex-wrap items-center gap-4 shrink-0">
              <a
                href="/schedule-meeting"
                className="px-6 py-3 text-sm font-semibold text-[#0f3ca0] bg-white hover:bg-slate-100 rounded-full shadow-lg transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
              >
                Schedule a Meeting
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 7h10M8 3l4 4-4 4" />
                </svg>
              </a>
              <a
                href="/projects"
                className="px-6 py-3 text-sm font-semibold text-[#0f3ca0] bg-white hover:bg-slate-100 rounded-full shadow-lg transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
              >
                View our work
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 7h10M8 3l4 4-4 4" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 11. Footer Section */}
      <Footer />
    </div>
  );
};

export default Home;
