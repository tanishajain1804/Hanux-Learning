import React from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight 
} from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-[#383847] to-[#0c0c0e] text-zinc-300 pt-20 pb-10 px-6 md:px-14 border-t border-zinc-800/80 w-full relative z-10">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-left">
        
        {/* Column 1: Brand Logo & Description */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="logo-icon bg-gradient-to-br from-[#0f3ca0] to-[#2563eb] flex items-center justify-center rounded-[9px] w-[34px] h-[34px] shrink-0">
              <svg className="fill-white w-[14px] h-[14px]" viewBox="0 0 16 16">
                <path d="M3 3h4v4H3zm6 0h4v4H9zM3 9h4v4H3zm6 2a2 2 0 104 0 2 2 0 00-4 0z"/>
              </svg>
            </div>
            <span className="font-extrabold tracking-tight text-white font-heading text-lg">
              HANUX<span className="text-[#2563eb]">TECH</span>
            </span>
          </div>
          
          <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
            Empowering businesses with innovative technology solutions. We transform ideas into reality with cutting-edge development and digital excellence.
          </p>
          
          {/* Social Icons */}
          <div className="flex gap-3 mt-6">
            <a href="https://facebook.com" className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#2563eb] hover:bg-[#2563eb]/10 transition-all duration-200" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
            <a href="https://twitter.com" className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#2563eb] hover:bg-[#2563eb]/10 transition-all duration-200" aria-label="Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#2563eb] hover:bg-[#2563eb]/10 transition-all duration-200" aria-label="LinkedIn">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
              </svg>
            </a>
            <a href="https://instagram.com" className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#2563eb] hover:bg-[#2563eb]/10 transition-all duration-200" aria-label="Instagram">
              <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="https://youtube.com" className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#2563eb] hover:bg-[#2563eb]/10 transition-all duration-200" aria-label="YouTube">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.522 3.4 12 3.4 12 3.4s-7.522 0-9.388.505a3.002 3.002 0 0 0-2.11 2.108C0 8.03 0 12 0 12s0 3.97.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.478 20.45 12 20.45 12 20.45s7.522 0 9.388-.505a3.002 3.002 0 0 0 2.11-2.108C24 15.97 24 12 24 12s0-3.97-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>

          <div className="text-3xl font-extrabold tracking-tight mt-10 select-none">
            <span className="text-white">Let's </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-[#60a5fa] hover:from-[#60a5fa] hover:to-[#2563eb] transition-all duration-300">Start</span>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="font-bold text-white text-base relative pb-3 mb-6 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-[2px] after:bg-[#2563eb]">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li><a href="/career" className="text-zinc-400 hover:text-white transition-colors duration-200">Learning Hub</a></li>
            <li><a href="/about" className="text-zinc-400 hover:text-white transition-colors duration-200">About Us</a></li>
            <li><a href="/services" className="text-zinc-400 hover:text-white transition-colors duration-200">Services</a></li>
            <li><a href="/projects" className="text-zinc-400 hover:text-white transition-colors duration-200">Projects</a></li>
            <li><a href="/about" className="text-zinc-400 hover:text-white transition-colors duration-200">Clients</a></li>
            <li><a href="/career" className="text-zinc-400 hover:text-white transition-colors duration-200">Blogs</a></li>
            <li><a href="/projects" className="text-zinc-400 hover:text-white transition-colors duration-200">Gallery</a></li>
          </ul>
        </div>

        {/* Column 3: Our Services */}
        <div>
          <h3 className="font-bold text-white text-base relative pb-3 mb-6 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-[2px] after:bg-[#2563eb]">
            Our Services
          </h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li><a href="/services/web-development" className="text-zinc-400 hover:text-white transition-colors duration-200">Web Dev.</a></li>
            <li><a href="/services/mobile-apps" className="text-zinc-400 hover:text-white transition-colors duration-200">Mobile Apps</a></li>
            <li><a href="/services/web-design" className="text-zinc-400 hover:text-white transition-colors duration-200">Website Design</a></li>
            <li><a href="/services/software-development" className="text-zinc-400 hover:text-white transition-colors duration-200">Technology</a></li>
            <li><a href="/privacy" className="text-zinc-400 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
            <li><a href="/terms" className="text-zinc-400 hover:text-white transition-colors duration-200">Terms of Service</a></li>
            <li><a href="/contact" className="text-zinc-400 hover:text-white transition-colors duration-200">24/7 Support</a></li>
          </ul>
        </div>

        {/* Column 4: Get In Touch */}
        <div>
          <h3 className="font-bold text-white text-base relative pb-3 mb-6 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-[2px] after:bg-[#2563eb]">
            Get In Touch
          </h3>
          <div className="flex flex-col gap-5 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center text-[#2563eb] shrink-0 mt-0.5 bg-zinc-900/50">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-zinc-300 font-semibold hover:text-[#2563eb] transition-colors"><a href="tel:+16505550199">+1 (650) 555-0199</a></span>
                <span className="text-zinc-400 hover:text-[#2563eb] transition-colors"><a href="tel:+911204550199">+91 120 455 0199</a></span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center text-[#2563eb] shrink-0 mt-0.5 bg-zinc-900/50">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <a href="mailto:hello@hanuxtech.com" className="text-zinc-300 font-semibold hover:text-[#2563eb] transition-colors mt-1.5">
                hello@hanuxtech.com
              </a>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center text-[#2563eb] shrink-0 mt-0.5 bg-zinc-900/50">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col text-left text-xs leading-relaxed">
                <span className="text-zinc-300 font-medium">A-43, Sector 63, Noida, UP 201301, India</span>
                <span className="text-zinc-400 mt-1">15442 Ventura Blvd, Suite 201, Sherman Oaks, CA 91403, USA</span>
              </div>
            </div>

            <div className="mt-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#0f3ca0] to-[#2563eb] border border-blue-500/20 shadow-md shadow-blue-500/10 hover:shadow-blue-500/25 hover:from-[#2563eb] hover:to-[#0f3ca0] transition-all duration-300"
              >
                Sprint past the competition
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright Line */}
      <div className="border-t border-zinc-800/60 pt-8 mt-12 flex flex-col items-center justify-center">
        <div className="px-6 py-2.5 rounded-full bg-[#0a0a0c] border border-zinc-900/40 text-xs text-zinc-500 select-none shadow-inner">
          Copyright © 2026 Hanux Tech Pvt. Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
