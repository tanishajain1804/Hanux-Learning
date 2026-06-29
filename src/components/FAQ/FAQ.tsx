import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How long does a typical project take?",
    answer: "MVPs are typically delivered in 6–12 weeks. Enterprise platforms run 3–6 months with phased sprints and weekly deliverables. We scope accurately upfront so there are no timeline surprises."
  },
  {
    question: "Do you work with international clients?",
    answer: "Yes — we serve clients across 12+ countries including the US, UK, UAE, Germany, and Australia. We align to your timezone and communicate async where needed."
  },
  {
    question: "What engagement models do you offer?",
    answer: "Fixed-scope project contracts, dedicated team engagements, and time-and-materials retainers — depending on what fits your stage and risk tolerance best."
  },
  {
    question: "Will my source code be mine?",
    answer: "Absolutely. Full IP ownership transfers to you on project completion. We sign NDAs upfront and maintain strict confidentiality throughout every engagement."
  },
  {
    question: "Do you handle post-launch support?",
    answer: "All projects include a 30-day post-launch support window. We offer ongoing maintenance retainers and feature-sprint packages beyond that."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
    setName("");
    setEmail("");
    setMsg("");
  };

  return (
    <section id="faq" className="pt-16 pb-20 px-6 md:px-14 bg-bg border-t border-slate-200/40">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Column: Accordion */}
        <div className="flex flex-col items-start text-left w-full">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-4 h-[2px] bg-[#3B82F6] rounded-full" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#3B82F6]">FAQ</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0D1E3D] tracking-tight leading-[1.1] mb-8">
            Questions You<br />Probably Have
          </h2>
          
          <div className="w-full flex flex-col border-t border-[#0D1E3D]/5">
            {faqData.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="border-b border-[#0D1E3D]/5">
                  {/* Question header click trigger */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full py-5 flex items-center justify-between text-left font-bold text-sm sm:text-base text-[#0D1E3D] hover:text-[#1F4096] transition-colors duration-200 cursor-pointer select-none focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <div
                      className={`w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-xs shrink-0 transition-all duration-300 font-sans ${
                        isOpen 
                          ? "bg-[#1F4096] border-[#1F4096] text-white rotate-45" 
                          : "bg-white text-[#64748B]"
                      }`}
                    >
                      +
                    </div>
                  </button>
                  
                  {/* Collapsible Answer */}
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen ? "max-h-[200px] pb-5 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    <p className="text-[13px] text-[#475569] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Sticky Contact Form Box */}
        <div id="contact" className="lg:sticky lg:top-28 w-full">
          <div className="p-8 md:p-10 bg-[#F8FAFC] border border-[#0D1E3D]/5 rounded-3xl shadow-sm text-left">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-3 h-[2px] bg-[#3B82F6] rounded-full" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#3B82F6]">Contact Us</span>
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold text-[#0D1E3D] tracking-tight leading-snug mb-3">
              Ready to Kickstart<br />Your Next Product?
            </h3>
            
            <p className="text-xs text-[#64748B] leading-relaxed mb-6">
              Send us a summary of your requirements. Our solution architects will draft an estimation within 24 hours — no commitment required.
            </p>
            
            {submitted ? (
              <div className="p-5 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-2xl flex items-center gap-3 animate-scale-up">
                <svg className="w-5 h-5 text-emerald-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-semibold">Message sent! We'll reply within 24 hours.</span>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Your full name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-slate-200 focus:border-[#1F4096] rounded-xl px-4 py-3 text-xs text-slate-800 outline-none transition-colors"
                />
                
                <input
                  type="email"
                  placeholder="Work email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-slate-200 focus:border-[#1F4096] rounded-xl px-4 py-3 text-xs text-slate-800 outline-none transition-colors"
                />
                
                <textarea
                  placeholder="Tell us about your project..."
                  rows={3}
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  className="w-full bg-white border border-slate-200 focus:border-[#1F4096] rounded-xl px-4 py-3 text-xs text-slate-800 outline-none transition-colors resize-none"
                />
                
                <button
                  type="submit"
                  className="w-full bg-[#1F4096] hover:bg-[#3B82F6] text-white font-bold text-xs py-3.5 rounded-xl transition-all duration-300 cursor-pointer shadow-md shadow-blue-100 hover:shadow-lg inline-flex items-center justify-center gap-1.5"
                >
                  Send Message
                  <svg className="w-3.5 h-3.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 6h10M7 2l4 4-4 4" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQ;
