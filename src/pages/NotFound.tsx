import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Footer } from "../components/Footer/Footer";
import { ArrowLeft, Home } from "lucide-react";

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fafbff] flex flex-col justify-between relative overflow-hidden font-sans">
      <Navbar />
      
      {/* Decorative Background Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#2563eb]/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#0f3ca0]/5 blur-[80px] pointer-events-none" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 relative z-10 py-20">
        <div className="max-w-md w-full bg-white/70 backdrop-blur-xl border border-slate-200/50 p-10 rounded-[32px] shadow-[0_20px_50px_rgba(15,60,160,0.04)] text-center transition-all duration-300 hover:shadow-[0_30px_70px_rgba(15,60,160,0.08)]">
          <div className="text-[#2563eb] text-8xl font-black tracking-tight mb-4 animate-bounce">
            404
          </div>
          
          <h1 className="text-2xl font-bold text-[#0d1b3e] mb-3 font-heading">
            Page Not Found
          </h1>
          
          <p className="text-slate-500 text-sm leading-relaxed mb-8">
            Oops! The page you are looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/"
              className="px-6 py-3 text-sm font-bold text-white bg-[#0f3ca0] hover:bg-[#2563eb] rounded-full shadow-md shadow-blue-100 hover:shadow-blue-200 transition-all duration-300 inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              Go to Homepage
            </a>
            
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 text-sm font-bold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200/80 rounded-full transition-all duration-300 inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
