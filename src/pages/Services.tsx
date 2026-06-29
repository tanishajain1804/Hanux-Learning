import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Footer } from "../components/Footer/Footer";
import { Services as ServicesSection } from "../components/Services/Services";
import { Technology } from "../components/Technology/Technology";
import { Process } from "../components/Process/Process";

export const Services: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

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
      htmlEl.style.transitionDelay = `${(index % 4) * 80}ms`;
      observer.observe(el);
    });

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-bg text-[#0D1E3D] font-sans">
      <Navbar />

      <main className="flex-grow pt-24">
        {/* Header Block */}
        <div className="pt-16 pb-8 px-4 text-center">
          <div className="inline-flex items-center gap-2 mb-4 animate-slide-up">
            <span className="w-4 h-[2px] bg-[#3B82F6] rounded-full" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#3B82F6]">Our Services</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 font-heading animate-slide-up" style={{ animationDelay: "100ms" }}>
            What We <span className="text-[#2563eb]">Do</span>
          </h1>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed animate-slide-up" style={{ animationDelay: "200ms" }}>
            We deliver state-of-the-art software solutions tailored to help your business automate, scale, and thrive.
          </p>
        </div>

        {/* Content sections */}
        <ServicesSection />
        <Process />
        <Technology />
      </main>

      <Footer />
    </div>
  );
};

export default Services;

