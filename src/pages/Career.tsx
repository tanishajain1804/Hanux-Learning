import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Footer } from "../components/Footer/Footer";
import { 
  Code, 
  Smartphone, 
  Server, 
  Palette, 
  Bot, 
  BarChart2, 
  Briefcase, 
  Coins, 
  Calendar, 
  BookOpen, 
  Activity, 
  Monitor, 
  TrendingUp 
} from "lucide-react";
import "./Career.css";

export const Career: React.FC = () => {
  // State for overlay modal
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Step 1 Form States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  // Step 2 Form States
  const [selectedRole, setSelectedRole] = useState("");
  const [roleOther, setRoleOther] = useState("");
  const [experience, setExperience] = useState("");
  const [availability, setAvailability] = useState("");

  // Step 3 Form States
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");

  // Step 4 Form States
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  // Validation States
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, boolean> = {};
    let isValid = true;

    if (step === 1) {
      if (!firstName.trim()) { newErrors.firstName = true; isValid = false; }
      if (!lastName.trim()) { newErrors.lastName = true; isValid = false; }
      if (!email.trim() || !email.includes("@")) { newErrors.email = true; isValid = false; }
      const digits = phone.replace(/\D/g, "");
      let checkDigits = digits;
      if (digits.startsWith("91") && digits.length === 12) {
        checkDigits = digits.substring(2);
      } else if (digits.startsWith("0") && digits.length === 11) {
        checkDigits = digits.substring(1);
      }
      if (checkDigits.length !== 10) { newErrors.phone = true; isValid = false; }
    } else if (step === 2) {
      if (!selectedRole) { newErrors.role = true; isValid = false; }
      if (selectedRole === "Other" && !roleOther.trim()) { newErrors.roleOther = true; isValid = false; }
      if (!experience) { newErrors.experience = true; isValid = false; }
      if (!availability) { newErrors.availability = true; isValid = false; }
    } else if (step === 3) {
      if (!uploadedFile) { newErrors.uploadedFile = true; isValid = false; }
    } else if (step === 4) {
      if (message.trim().length < 20) { newErrors.message = true; isValid = false; }
      if (!consent) { newErrors.consent = true; isValid = false; }
    }

    setErrors(newErrors);
    return isValid;
  };

  const goToStep = (stepNum: number) => {
    setCurrentStep(stepNum);
    setTimeout(() => {
      const body = document.getElementById("cvBody");
      if (body) {
        body.scrollTop = 0;
      }
    }, 50);
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;
    if (currentStep === 4) {
      submitForm();
    } else {
      goToStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  };

  const openOverlay = () => {
    setIsOverlayOpen(true);
    document.body.style.overflow = "hidden";
    // Reset form states on reopen
    goToStep(1);
    setIsSuccess(false);
    setIsSubmitting(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setLocation("");
    setSelectedRole("");
    setRoleOther("");
    setExperience("");
    setAvailability("");
    setUploadedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setLinkedin("");
    setPortfolio("");
    setMessage("");
    setConsent(false);
    setErrors({});
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeOverlay();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
      alert("Please upload a PDF or Word document (.doc, .docx).");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert("File must be under 10 MB.");
      return;
    }

    setUploadedFile(file);
    setErrors(prev => ({ ...prev, uploadedFile: false }));
    setIsUploading(true);
    setUploadProgress(0);

    let progressVal = 0;
    const interval = setInterval(() => {
      progressVal += Math.random() * 20;
      setUploadProgress(Math.min(progressVal, 100));
      if (progressVal >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
        }, 500);
      }
    }, 100);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const submitForm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        launchConfetti();
      }, 50);
    }, 1800);
  };

  const launchConfetti = () => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions based on modal panel size
    const panel = canvas.parentElement?.querySelector(".cv-panel") as HTMLElement;
    canvas.width = panel ? panel.offsetWidth : 600;
    canvas.height = panel ? panel.offsetHeight : 800;

    const colors = ["#1e4fd8", "#3b7bf5", "#0ea68c", "#fbbf24", "#7c3aed", "#f87171"];
    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -100,
      r: Math.random() * 5 + 2,
      d: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 5,
      tiltA: 0.1 + Math.random() * 0.1,
      tiltS: 0,
    }));

    let frames = 0;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.tiltS += p.tiltA;
        p.y += (Math.cos(p.d) + 1.5) * 1.4;
        p.x += Math.sin(frames * 0.01) * 1.2;
        p.tilt = Math.sin(p.tiltS) * 15;
        ctx.beginPath();
        ctx.lineWidth = p.r / 2;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
        ctx.stroke();
      });
      frames++;
      if (frames < 180) {
        requestAnimationFrame(loop);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    requestAnimationFrame(loop);
  };

  const roles = [
    {
      title: "Senior React / Next.js Engineer",
      dept: "Engineering",
      type: "Full-time",
      loc: "Remote",
      icon: Code,
      newTag: "NEW",
      delay: ".04s",
      bg: "rgba(37, 99, 235, 0.08)",
      color: "#2563eb"
    },
    {
      title: "React Native / Flutter Developer",
      dept: "Mobile",
      type: "Full-time",
      loc: "Remote",
      icon: Smartphone,
      newTag: "NEW",
      delay: ".08s",
      bg: "rgba(16, 185, 129, 0.08)",
      color: "#10b981"
    },
    {
      title: "Backend Engineer — Node.js & AWS",
      dept: "Engineering",
      type: "Full-time",
      loc: "Remote",
      icon: Server,
      delay: ".12s",
      bg: "rgba(55, 138, 221, 0.08)",
      color: "#378add"
    },
    {
      title: "Senior UI/UX Designer",
      dept: "Design",
      type: "Full-time",
      loc: "Remote",
      icon: Palette,
      delay: ".16s",
      bg: "rgba(212, 83, 126, 0.08)",
      color: "#d4537e"
    },
    {
      title: "AI / ML Engineer — LLM & Automation",
      dept: "AI",
      type: "Full-time",
      loc: "Remote",
      icon: Bot,
      newTag: "HOT 🔥",
      tagBg: "linear-gradient(90deg, #d4537e, #ef9f27)",
      delay: ".2s",
      bg: "rgba(127, 119, 221, 0.08)",
      color: "#7f77dd"
    },
    {
      title: "Product Manager — SaaS Products",
      dept: "Product",
      type: "Full-time",
      loc: "Remote",
      icon: BarChart2,
      delay: ".24s",
      bg: "rgba(239, 159, 39, 0.08)",
      color: "#ef9f27"
    },
    {
      title: "Business Development Executive",
      dept: "Sales",
      type: "Full-time",
      loc: "Remote",
      icon: Briefcase,
      delay: ".28s",
      bg: "rgba(29, 158, 117, 0.08)",
      color: "#1d9e75"
    }
  ];

  const cultures = [
    {
      ico: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "40px", height: "40px" }}>
          <rect x="2" y="2" width="20" height="20" rx="6" fill="rgba(15, 60, 160, 0.05)" stroke="none" />
          <path d="M4.5 16.5c-1.5 1.5-2.5 3.5-2.5 5 1.5 0 3.5-1 5-2.5" stroke="#0f3ca0" />
          <path d="M12 2C8 2 5 5 5 9c0 2 1 4 2 5l10-10C16 3 14 2 12 2Z" fill="rgba(15, 60, 160, 0.12)" stroke="#0f3ca0" />
          <path d="M9 15c-1 1-1 2.5 0 3.5s2.5 0 3.5 0" stroke="#0f3ca0" />
          <path d="M14 7c.5-.5 1.5-.5 2 0s.5 1.5 0 2" stroke="#0f3ca0" />
          <path d="M17 7 21 3" stroke="#0f3ca0" />
          <path d="M19 14.5c1.5 1.5 2.5 3.5 2.5 5-1.5 0-3.5-1-5-2.5" stroke="#0f3ca0" />
        </svg>
      ),
      name: "Ship real products",
      desc: "Work on live apps used by real users from week one — no tutorial projects or sandbox work.",
      delay: ".04s"
    },
    {
      ico: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "40px", height: "40px" }}>
          <rect x="2" y="2" width="20" height="20" rx="6" fill="rgba(15, 60, 160, 0.05)" stroke="none" />
          <path d="M9.5 6C7 6 5 8 5 10.5c0 2 1.5 3.5 3 3.5H9.5V6Z" fill="rgba(15, 60, 160, 0.12)" stroke="#0f3ca0" />
          <path d="M14.5 6c2.5 0 4.5 2 4.5 4.5 0 2-1.5 3.5-3 3.5H14.5V6Z" fill="rgba(15, 60, 160, 0.12)" stroke="#0f3ca0" />
          <path d="M12 14v4" stroke="#0f3ca0" />
          <circle cx="12" cy="19" r="1.2" fill="#0f3ca0" stroke="none" />
          <path d="M8 9.5c.5-.5 1-.5 1.5 0" stroke="#0f3ca0" />
          <path d="M16 9.5c-.5-.5-1-.5-1.5 0" stroke="#0f3ca0" />
          <circle cx="7.5" cy="11.5" r="0.75" fill="#0f3ca0" />
          <circle cx="16.5" cy="11.5" r="0.75" fill="#0f3ca0" />
        </svg>
      ),
      name: "Learn every week",
      desc: "Dedicated learning budget, mentorship from senior engineers, and weekly tech talks.",
      delay: ".08s"
    },
    {
      ico: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "40px", height: "40px" }}>
          <rect x="2" y="2" width="20" height="20" rx="6" fill="rgba(15, 60, 160, 0.05)" stroke="none" />
          <circle cx="12" cy="12" r="7" stroke="#0f3ca0" />
          <path d="M12 5a15.3 15.3 0 0 1 2 7 15.3 15.3 0 0 1-2 7 15.3 15.3 0 0 1-2-7 15.3 15.3 0 0 1 2-7Z" fill="rgba(15, 60, 160, 0.12)" stroke="#0f3ca0" />
          <path d="M5.5 9h13M5.5 15h13" stroke="#0f3ca0" />
        </svg>
      ),
      name: "Work from anywhere",
      desc: "Fully remote setup with async-first culture and flexible working hours globally.",
      delay: ".12s"
    },
    {
      ico: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "40px", height: "40px" }}>
          <rect x="2" y="2" width="20" height="20" rx="6" fill="rgba(15, 60, 160, 0.05)" stroke="none" />
          <path d="M6 5h12l3.5 4.5-9.5 9.5-9.5-9.5Z" fill="rgba(15, 60, 160, 0.12)" stroke="#0f3ca0" />
          <path d="M11 5 8 9.5l4 9.5 4-9.5-3-4.5" stroke="#0f3ca0" />
          <path d="M2.5 9.5h19" stroke="#0f3ca0" />
        </svg>
      ),
      name: "Premium clients",
      desc: "Partner with funded startups and global brands on high-quality deliverables.",
      delay: ".16s"
    },
    {
      ico: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "40px", height: "40px" }}>
          <rect x="2" y="2" width="20" height="20" rx="6" fill="rgba(15, 60, 160, 0.05)" stroke="none" />
          <path d="M13 3 4 13h7l-1 8 9-10h-7Z" fill="rgba(15, 60, 160, 0.12)" stroke="#0f3ca0" />
        </svg>
      ),
      name: "Move fast",
      desc: "Lean teams, low bureaucracy. Your ideas ship in days, not months of approvals.",
      delay: ".2s"
    },
    {
      ico: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "40px", height: "40px" }}>
          <rect x="2" y="2" width="20" height="20" rx="6" fill="rgba(15, 60, 160, 0.05)" stroke="none" />
          <path d="M16 11a4 4 0 0 1-4 4H7.5A3.5 3.5 0 0 1 4 11.5v0A3.5 3.5 0 0 1 7.5 8H9" fill="rgba(15, 60, 160, 0.12)" stroke="#0f3ca0" />
          <path d="M8 13a4 4 0 0 1 4-4h4.5a3.5 3.5 0 0 1 3.5 3.5v0A3.5 3.5 0 0 1 16.5 16H15" fill="rgba(15, 60, 160, 0.12)" stroke="#0f3ca0" />
        </svg>
      ),
      name: "Full ownership",
      desc: "You own your work end-to-end — full responsibility and full credit for what you build.",
      delay: ".24s"
    }
  ];

  const perks = [
    { ico: Coins, title: "Competitive salary", desc: "Top-of-market pay benchmarked to global standards — not just local rates.", bg: "rgba(37, 99, 235, 0.08)", color: "#2563eb", delay: ".04s" },
    { ico: Calendar, title: "Unlimited PTO", desc: "Flexible time off you'll actually use — we don't track days, we track outcomes.", bg: "rgba(16, 185, 129, 0.08)", color: "#10b981", delay: ".08s" },
    { ico: BookOpen, title: "₹50K learning budget", desc: "Courses, books, conferences — anything that makes you sharper and better.", bg: "rgba(55, 138, 221, 0.08)", color: "#378add", delay: ".12s" },
    { ico: Activity, title: "Health coverage", desc: "Comprehensive health insurance covering you and your immediate family members.", bg: "rgba(212, 83, 126, 0.08)", color: "#d4537e", delay: ".16s" },
    { ico: Monitor, title: "Home office setup", desc: "MacBook Pro + monitor + ₹20K to build your perfect home workspace.", bg: "rgba(239, 159, 39, 0.08)", color: "#ef9f27", delay: ".2s" },
    { ico: TrendingUp, title: "Equity / profit share", desc: "Skin in the game — grow with the company, not just at it, with real upside.", bg: "rgba(127, 119, 221, 0.08)", color: "#7f77dd", delay: ".24s" }
  ];

  const technologies = [
    {
      name: "React Native",
      icon: (
        <svg viewBox="0 0 100 100" width="16" height="16" fill="none" stroke="#00d8ff" strokeWidth="6" style={{ marginRight: "4px" }}>
          <ellipse cx="50" cy="50" rx="18" ry="45" transform="rotate(30 50 50)" />
          <ellipse cx="50" cy="50" rx="18" ry="45" transform="rotate(90 50 50)" />
          <ellipse cx="50" cy="50" rx="18" ry="45" transform="rotate(150 50 50)" />
          <circle cx="50" cy="50" r="6" fill="#00d8ff" />
        </svg>
      )
    },
    {
      name: "TypeScript",
      icon: (
        <svg viewBox="0 0 100 100" width="16" height="16" style={{ marginRight: "4px" }}>
          <rect width="100" height="100" rx="12" fill="#3178c6" />
          <text x="82" y="80" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="52" fill="white" textAnchor="end">TS</text>
        </svg>
      )
    },
    {
      name: "Flutter",
      icon: (
        <svg viewBox="0 0 100 100" width="16" height="16" style={{ marginRight: "4px" }}>
          <path d="M55 10 L75 30 L40 65 L20 45 Z" fill="#47C5FB" />
          <path d="M40 65 L75 100 L55 100 L20 65 Z" fill="#02569B" />
          <path d="M40 65 L55 50 L75 70 L60 85 Z" fill="#01579B" />
        </svg>
      )
    },
    {
      name: "Node.js",
      icon: (
        <svg viewBox="0 0 100 100" width="16" height="16" style={{ marginRight: "4px" }}>
          <path d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z" fill="none" stroke="#339933" strokeWidth="8" strokeLinejoin="round" />
          <path d="M50 25 L72 38 L72 62 L50 75 L28 62 L28 38 Z" fill="#339933" />
        </svg>
      )
    },
    {
      name: "AI / ML",
      icon: (
        <svg viewBox="0 0 100 100" width="16" height="16" fill="none" stroke="#7f77dd" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "4px" }}>
          <path d="M45 20 A25 25 0 0 0 20 45 A25 25 0 0 0 45 70 A20 20 0 0 0 45 90 M55 20 A25 25 0 0 1 80 45 A25 25 0 0 1 55 70 A20 20 0 0 1 55 90" />
          <path d="M45 20 L55 20 M45 35 L55 35 M45 50 L55 50 M45 65 L55 65 M45 80 L55 80" />
        </svg>
      )
    },
    {
      name: "Figma",
      icon: (
        <svg viewBox="0 0 12 18" width="11" height="16" fill="none" style={{ marginRight: "4px" }}>
          <path d="M0 3a3 3 0 0 1 3-3h3v6H3a3 3 0 0 1-3-3z" fill="#F24E1E"/>
          <path d="M6 0h3a3 3 0 0 1 0 6H6V0z" fill="#FF7262"/>
          <path d="M0 9a3 3 0 0 1 3-3h3v6H3a3 3 0 0 1-3-3z" fill="#A259FF"/>
          <path d="M6 6h3a3 3 0 0 1 0 6H6V6z" fill="#1ABC9C"/>
          <path d="M0 15a3 3 0 0 1 3-3h3v6H3a3 3 0 0 1-3-3z" fill="#0ACF83"/>
        </svg>
      )
    },
    {
      name: "AWS",
      icon: (
        <svg viewBox="0 0 100 100" width="16" height="16" style={{ marginRight: "4px" }}>
          <path d="M20 70 A25 25 0 0 1 45 40 A30 30 0 0 1 80 50 A20 20 0 0 1 80 85 L20 85 Z" fill="#ff9900" />
          <path d="M30 95 Q50 105 70 95" fill="none" stroke="#ff9900" strokeWidth="6" strokeLinecap="round" />
          <path d="M67 91 L73 97 L75 90" fill="none" stroke="#ff9900" strokeWidth="6" strokeLinecap="round" />
        </svg>
      )
    },
    {
      name: "PostgreSQL",
      icon: (
        <svg viewBox="0 0 100 100" width="16" height="16" style={{ marginRight: "4px" }}>
          <path d="M50 15 C30 15 15 30 15 50 C15 65 25 78 40 83 C45 85 50 82 50 78 C50 75 46 72 42 70 C30 65 28 50 35 42 C42 34 58 34 65 42 C72 50 70 65 58 70 C54 72 50 75 50 78 C50 82 55 85 60 83 C75 78 85 65 85 50 C85 30 70 15 50 15 Z" fill="#336791" />
        </svg>
      )
    },
    {
      name: "GraphQL",
      icon: (
        <svg viewBox="0 0 100 100" width="16" height="16" fill="none" stroke="#e10098" strokeWidth="6" style={{ marginRight: "4px" }}>
          <polygon points="50 15, 80 32.5, 80 67.5, 50 85, 20 67.5, 20 32.5" />
          <line x1="50" y1="15" x2="50" y2="85" />
          <line x1="20" y1="32.5" x2="80" y2="67.5" />
          <line x1="20" y1="67.5" x2="80" y2="32.5" />
          <circle cx="50" cy="50" r="10" fill="#e10098" />
          <circle cx="50" cy="15" r="6" fill="#e10098" />
          <circle cx="80" cy="32.5" r="6" fill="#e10098" />
          <circle cx="80" cy="67.5" r="6" fill="#e10098" />
          <circle cx="50" cy="85" r="6" fill="#e10098" />
          <circle cx="20" cy="67.5" r="6" fill="#e10098" />
          <circle cx="20" cy="32.5" r="6" fill="#e10098" />
        </svg>
      )
    },
    {
      name: "Next.js",
      icon: (
        <svg viewBox="0 0 100 100" width="16" height="16" fill="black" style={{ marginRight: "4px" }}>
          <circle cx="50" cy="50" r="48" fill="none" stroke="black" strokeWidth="4" />
          <path d="M30 70 L30 30 L45 30 L65 60 L65 30 L72 30 L72 70 L57 70 L37 40 L37 70 Z" />
        </svg>
      )
    },
    {
      name: "Docker",
      icon: (
        <svg viewBox="0 0 100 100" width="16" height="16" fill="#2496ed" style={{ marginRight: "4px" }}>
          <rect x="25" y="45" width="10" height="10" rx="2" />
          <rect x="38" y="45" width="10" height="10" rx="2" />
          <rect x="51" y="45" width="10" height="10" rx="2" />
          <rect x="38" y="32" width="10" height="10" rx="2" />
          <rect x="51" y="32" width="10" height="10" rx="2" />
          <rect x="64" y="45" width="10" height="10" rx="2" />
          <path d="M15 65 C20 70 80 70 85 55 C90 45 80 40 75 42 C70 45 68 48 64 45 L15 45 Z" />
        </svg>
      )
    },
    {
      name: "LLMs",
      icon: (
        <svg viewBox="0 0 100 100" width="16" height="16" fill="none" stroke="#d4537e" strokeWidth="8" strokeLinecap="round" style={{ marginRight: "4px" }}>
          <path d="M50 15 L50 25 M50 75 L50 85 M15 50 L25 50 M75 50 L85 50 M25 25 L32 32 M68 68 L75 75 M75 25 L68 32 M32 68 L25 75" />
          <circle cx="50" cy="50" r="15" fill="#d4537e" />
        </svg>
      )
    }
  ];

  return (
    <div className="careers-page">
      <Navbar />

      {/* BACKGROUND */}
      <div className="bg-decorations">
        <div className="bg-grid"></div>
      </div>

      <div className="page-container">
        {/* HERO */}
        <div className="hero">
          <div className="hero-badge">
            <div className="hdot"></div>
            <span className="hero-label">We're hiring — join the team</span>
          </div>
          <h1 className="hero-title">Build the future<br />with HanuxTech</h1>
          <p className="hero-sub">
            Join our premium digital product studio and ship high-end software used by millions — from day one.
          </p>
          <div className="hero-stats">
            <div className="hstat">
              <div className="hstat-num">48+</div>
              <div className="hstat-lbl">Team members</div>
            </div>
            <div className="hstat">
              <div className="hstat-num" style={{ animationDelay: ".2s" }}>12</div>
              <div className="hstat-lbl">Open roles</div>
            </div>
            <div className="hstat">
              <div className="hstat-num" style={{ animationDelay: ".4s" }}>20M+</div>
              <div className="hstat-lbl">Users served</div>
            </div>
            <div className="hstat">
              <div className="hstat-num" style={{ animationDelay: ".6s" }}>100%</div>
              <div className="hstat-lbl">Remote-first</div>
            </div>
          </div>
        </div>

        {/* TICKER */}
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {[...technologies, ...technologies].map((tech, idx) => (
              <div className="tick" key={idx}>
                {tech.icon}
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CULTURE */}
        <div className="sec-hdr">
          <div className="sec-tag">Culture</div>
          <div className="sec-title">Why join us?</div>
        </div>
        <div className="cult-grid">
          {cultures.map((c, idx) => (
            <div className="cult-card" style={{ animationDelay: c.delay }} key={idx}>
              <div className="cult-ico">
                {c.ico}
              </div>
              <div className="cult-name">{c.name}</div>
              <div className="cult-desc">{c.desc}</div>
            </div>
          ))}
        </div>

        {/* HIRING PROCESS */}
        <div className="sec-hdr">
          <div className="sec-tag">Process</div>
          <div className="sec-title">How we hire</div>
        </div>
        <div className="process">
          <div className="process-steps">
            <div className="pstep active done">
              <div className="pstep-circle">✓</div>
              <div className="pstep-label">Apply</div>
              <div className="pstep-sub">Send CV + portfolio</div>
            </div>
            <div className="pstep active done">
              <div className="pstep-circle">✓</div>
              <div className="pstep-label">Screen</div>
              <div className="pstep-sub">30-min intro call</div>
            </div>
            <div className="pstep active">
              <div className="pstep-circle">3</div>
              <div className="pstep-label">Task</div>
              <div className="pstep-sub">Small paid task</div>
            </div>
            <div className="pstep">
              <div className="pstep-circle">4</div>
              <div className="pstep-label">Interview</div>
              <div className="pstep-sub">Meet the team</div>
            </div>
            <div className="pstep">
              <div className="pstep-circle">5</div>
              <div className="pstep-label">Offer</div>
              <div className="pstep-sub">Welcome aboard!</div>
            </div>
          </div>
        </div>

        {/* OPEN ROLES */}
        <div className="sec-hdr">
          <div className="sec-tag">Open roles</div>
          <div className="sec-title">12 positions available</div>
        </div>
        <div className="roles">
          {roles.map((r, idx) => (
            <a href="/schedule-meeting" className="role-card" style={{ animationDelay: r.delay }} key={idx}>
              <div className="role-shimmer"></div>
              <div className="role-dept-ico" style={{ backgroundColor: r.bg, color: r.color }}>
                <r.icon size={25} strokeWidth={1.8} />
              </div>
              <div className="role-info">
                <div className="role-title">{r.title}</div>
                <div className="role-meta">
                  <span className="role-badge badge-dept">{r.dept}</span>
                  <span className="role-badge badge-full">{r.type}</span>
                  <span className="role-badge badge-remote">{r.loc}</span>
                </div>
              </div>
              {r.newTag && (
                <div 
                  className="role-new" 
                  style={r.tagBg ? { background: r.tagBg } : undefined}
                >
                  {r.newTag}
                </div>
              )}
              <div className="role-arrow">→</div>
            </a>
          ))}
        </div>

        {/* PERKS */}
        <div className="sec-hdr">
          <div className="sec-tag">Perks</div>
          <div className="sec-title">What you get</div>
        </div>
        <div className="perks-grid">
          {perks.map((p, idx) => (
            <div className="perk" style={{ animationDelay: p.delay }} key={idx}>
              <div className="perk-ico" style={{ backgroundColor: p.bg, color: p.color }}>
                <p.ico size={24} strokeWidth={1.8} />
              </div>
              <div>
                <div className="perk-title">{p.title}</div>
                <div className="perk-desc">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* APPLY CTA */}
        <div className="apply-cta">
          <span className="apply-emoji">👋</span>
          <div className="apply-title">Don't see your role?</div>
          <p className="apply-sub">We're always looking for exceptional people. Send us your portfolio and let's start a conversation.</p>
          <div className="apply-btns">
            <a href="/schedule-meeting" className="btn-main">View all openings →</a>
            <button onClick={openOverlay} className="btn-ghost" style={{ border: "1.5px solid var(--border)", background: "transparent" }}>Send your CV</button>
          </div>
        </div>

        {/* FOOTER STRIP */}
        <div className="footer-strip">
          <div className="fitem"><span className="fitem-ico">📧</span>careers@hanuxtech.com</div>
          <div className="fitem"><span className="fitem-ico">💬</span>WhatsApp: +91 98765 43210</div>
          <div className="fitem"><span className="fitem-ico">🌍</span>Bengaluru, India · Remote worldwide</div>
        </div>

      </div>

      {/* ══ CV OVERLAY ══ */}
      <div id="cv-overlay" className={isOverlayOpen ? "open" : ""} role="dialog" aria-modal="true" aria-label="Send your CV">
        <div className="cv-backdrop" onClick={closeOverlay}></div>
        {isSuccess && <canvas id="confetti-canvas" ref={confettiCanvasRef}></canvas>}

        <div className="cv-panel">
          {/* HEADER */}
          <div className="cv-header">
            <div className="cv-header-left">
              <div className="cv-header-eyebrow">Join HanuxTech</div>
              <div className="cv-header-title">Tell us about yourself</div>
              <div className="cv-header-sub">Takes about 3 minutes. We read every single submission.</div>
            </div>
            <button className="cv-close" onClick={closeOverlay} aria-label="Close">✕</button>
          </div>

          {/* STEP PROGRESS */}
          {!isSuccess && (
            <div className="cv-steps">
              <div className={`cv-step ${currentStep === 1 ? "active" : ""} ${currentStep > 1 ? "done clickable" : ""}`} onClick={() => currentStep > 1 && goToStep(1)}>
                <div className="cs-circle" data-n="1"></div>
                <span className="cs-lbl">You</span>
              </div>
              <div className={`cv-step ${currentStep === 2 ? "active" : ""} ${currentStep > 2 ? "done clickable" : ""}`} onClick={() => currentStep > 2 && goToStep(2)}>
                <div className="cs-circle" data-n="2"></div>
                <span className="cs-lbl">Role</span>
              </div>
              <div className={`cv-step ${currentStep === 3 ? "active" : ""} ${currentStep > 3 ? "done clickable" : ""}`} onClick={() => currentStep > 3 && goToStep(3)}>
                <div className="cs-circle" data-n="3"></div>
                <span className="cs-lbl">Your CV</span>
              </div>
              <div className={`cv-step ${currentStep === 4 ? "active" : ""} ${currentStep > 4 ? "done clickable" : ""}`} onClick={() => currentStep > 4 && goToStep(4)}>
                <div className="cs-circle" data-n="4"></div>
                <span className="cs-lbl">Review</span>
              </div>
            </div>
          )}

          {/* BODY */}
          <div className="cv-body" id="cvBody">
            {!isSuccess ? (
              <>
                {/* STEP 1: Personal info */}
                <div className={`form-step ${currentStep === 1 ? "active" : ""}`}>
                  <div className="step-h">Nice to meet you 👋</div>
                  <div className="step-sub">We need a few basics to know who we're talking to.</div>
                  <div className="field-group">
                    <div className="field-row">
                      <div className={`field ${errors.firstName ? "has-error" : ""}`}>
                        <label className="field-label">First name <span className="field-req">*</span></label>
                        <input
                          id="inp-firstname"
                          className="field-input"
                          type="text"
                          placeholder="Rahul"
                          value={firstName}
                          onChange={(e) => { setFirstName(e.target.value); if(errors.firstName) setErrors({...errors, firstName: false}); }}
                        />
                        {errors.firstName && <span className="field-error">Please enter your first name</span>}
                      </div>
                      <div className={`field ${errors.lastName ? "has-error" : ""}`}>
                        <label className="field-label">Last name <span className="field-req">*</span></label>
                        <input
                          id="inp-lastname"
                          className="field-input"
                          type="text"
                          placeholder="Sharma"
                          value={lastName}
                          onChange={(e) => { setLastName(e.target.value); if(errors.lastName) setErrors({...errors, lastName: false}); }}
                        />
                        {errors.lastName && <span className="field-error">Please enter your last name</span>}
                      </div>
                    </div>
                    <div className={`field ${errors.email ? "has-error" : ""}`}>
                      <label className="field-label">Work email <span className="field-req">*</span></label>
                      <input
                        id="inp-email"
                        className="field-input"
                        type="email"
                        placeholder="rahul@company.com"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); if(errors.email) setErrors({...errors, email: false}); }}
                      />
                      {errors.email && <span className="field-error">Please enter a valid email address</span>}
                    </div>
                    <div className={`field ${errors.phone ? "has-error" : ""}`}>
                      <label className="field-label">Mobile number <span className="field-req">*</span></label>
                      <input
                        id="inp-phone"
                        className="field-input"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => { setPhone(e.target.value); if(errors.phone) setErrors({...errors, phone: false}); }}
                      />
                      <span className="field-hint">Include country code · We may WhatsApp you for a quick chat</span>
                      {errors.phone && <span className="field-error">Please enter a valid 10-digit mobile number</span>}
                    </div>
                    <div className="field">
                      <label className="field-label">Location</label>
                      <input
                        id="inp-location"
                        className="field-input"
                        type="text"
                        placeholder="Bengaluru, India"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                      <span className="field-hint">City or country · remote candidates welcome</span>
                    </div>
                  </div>
                </div>

                {/* STEP 2: Role */}
                <div className={`form-step ${currentStep === 2 ? "active" : ""}`}>
                  <div className="step-h">What kind of work excites you?</div>
                  <div className="step-sub">Pick the role that fits best — or choose "Other" and describe it yourself.</div>
                  <div className="field">
                    <label className="field-label">I'm applying for <span className="field-req">*</span></label>
                    <div className="role-chips">
                      {[
                        "Full-Stack Engineer",
                        "Frontend Engineer",
                        "Backend Engineer",
                        "DevOps / Cloud",
                        "AI / ML Engineer",
                        "UI/UX Designer",
                        "QA Engineer",
                        "Product Manager",
                        "Other"
                      ].map((role) => (
                        <div
                          key={role}
                          className={`role-chip ${selectedRole === role ? "selected" : ""}`}
                          onClick={() => {
                            setSelectedRole(role);
                            if(errors.role) setErrors({...errors, role: false});
                          }}
                        >
                          {role === "Full-Stack Engineer" && "🖥️ "}
                          {role === "Frontend Engineer" && "🎨 "}
                          {role === "Backend Engineer" && "⚙️ "}
                          {role === "DevOps / Cloud" && "☁️ "}
                          {role === "AI / ML Engineer" && "🤖 "}
                          {role === "UI/UX Designer" && "✏️ "}
                          {role === "QA Engineer" && "🔬 "}
                          {role === "Product Manager" && "📋 "}
                          {role === "Other" && "💡 "}
                          {role}
                        </div>
                      ))}
                    </div>
                    {selectedRole === "Other" && (
                      <div className="role-other-wrap show">
                        <br/>
                        <input
                          className="field-input"
                          type="text"
                          placeholder="Tell us the role you're aiming for…"
                          value={roleOther}
                          onChange={(e) => { setRoleOther(e.target.value); if(errors.roleOther) setErrors({...errors, roleOther: false}); }}
                        />
                        {errors.roleOther && <span className="field-error">Please describe the role</span>}
                      </div>
                    )}
                    {errors.role && <span className="field-error" style={{ marginTop: ".4rem" }}>Please select a role</span>}
                  </div>

                  <div className="field" style={{ marginTop: "1.5rem" }}>
                    <label className="field-label">Years of experience <span className="field-req">*</span></label>
                    <select
                      id="inp-exp"
                      className="field-input"
                      value={experience}
                      onChange={(e) => { setExperience(e.target.value); if(errors.experience) setErrors({...errors, experience: false}); }}
                    >
                      <option value="">Select…</option>
                      <option>0 – 1 year (fresh grad / trainee)</option>
                      <option>1 – 3 years</option>
                      <option>3 – 5 years</option>
                      <option>5 – 8 years</option>
                      <option>8 – 12 years</option>
                      <option>12+ years (Principal / Staff)</option>
                    </select>
                    {errors.experience && <span className="field-error">Please select your years of experience</span>}
                  </div>

                  <div style={{ marginTop: "1.5rem" }}>
                    <label className="field-label" style={{ display: "block", marginBottom: ".75rem" }}>Availability <span className="field-req">*</span></label>
                    <div className="avail-opts">
                      {[
                        { val: "Immediately", icon: "⚡" },
                        { val: "Within 2 weeks", icon: "📅" },
                        { val: "Within 1 month", icon: "🗓️" },
                        { val: "2–3 months notice", icon: "⏳" }
                      ].map((opt) => (
                        <div
                          key={opt.val}
                          className={`avail-opt ${availability === opt.val ? "selected" : ""}`}
                          onClick={() => {
                            setAvailability(opt.val);
                            if(errors.availability) setErrors({...errors, availability: false});
                          }}
                        >
                          <span className="avail-opt-ic">{opt.icon}</span>
                          {opt.val}
                        </div>
                      ))}
                    </div>
                    {errors.availability && <span className="field-error" style={{ marginTop: ".4rem" }}>Please select your availability</span>}
                  </div>
                </div>

                {/* STEP 3: CV upload */}
                <div className={`form-step ${currentStep === 3 ? "active" : ""}`}>
                  <div className="step-h">Upload your CV 📄</div>
                  <div className="step-sub">PDF preferred, max 10 MB. We look at every CV, not just keywords.</div>

                  <div
                    className={`upload-zone ${isDragOver ? "drag" : ""} ${errors.uploadedFile ? "error" : ""}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      id="cv-file-input"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFile(e.target.files?.[0])}
                      style={{ display: "none" }}
                    />
                    <div className="uz-icon">{uploadedFile ? "✅" : "📎"}</div>
                    <div className="uz-title">{uploadedFile ? "File ready to submit" : "Drag & drop your CV here"}</div>
                    <div className="uz-sub">or <b>browse to upload</b></div>
                    <div className="uz-types">
                      <span className="uz-type">PDF</span>
                      <span className="uz-type">DOC</span>
                      <span className="uz-type">DOCX</span>
                    </div>
                  </div>

                  {uploadedFile && (
                    <div className="file-preview show">
                      <div className="fp-icon">📄</div>
                      <div>
                        <div className="fp-name">{uploadedFile.name}</div>
                        <div className="fp-size">{(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB</div>
                      </div>
                      <button className="fp-remove" onClick={(e) => { e.stopPropagation(); removeFile(); }} aria-label="Remove file">✕</button>
                    </div>
                  )}

                  {errors.uploadedFile && (
                    <span className="field-error" style={{ marginTop: ".8rem", display: "block" }}>
                      Please upload your CV to proceed
                    </span>
                  )}

                  {isUploading && (
                    <div className="upload-progress show">
                      <div className="up-fill" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                  )}

                  <div className="optional-label" style={{ marginTop: "1.5rem" }}>Optional links</div>

                  <div className="field-group">
                    <div className="field">
                      <label className="field-label">LinkedIn profile</label>
                      <input
                        id="inp-linkedin"
                        className="field-input"
                        type="url"
                        placeholder="https://linkedin.com/in/rahulsharma"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <label className="field-label">Portfolio / GitHub</label>
                      <input
                        id="inp-portfolio"
                        className="field-input"
                        type="url"
                        placeholder="https://github.com/rahul or portfolio.dev"
                        value={portfolio}
                        onChange={(e) => setPortfolio(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* STEP 4: Review + message */}
                <div className={`form-step ${currentStep === 4 ? "active" : ""}`}>
                  <div className="step-h">Almost done 🎯</div>
                  <div className="step-sub">Review your details and add a quick note — this is your chance to stand out.</div>

                  {/* Summary card */}
                  <div id="reviewCard" style={{ background: "#f4f7ff", border: "1px solid rgba(30,79,216,.18)", borderRadius: "16px", padding: "1.25rem", marginBottom: "1.5rem" }}>
                    <div style={{ fontSize: ".62rem", fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase", color: "#9baecf", marginBottom: ".85rem", textAlign: "left" }}>Your summary</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".75rem", textAlign: "left" }}>
                      <div>
                        <div style={{ fontSize: ".6rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#9baecf", marginBottom: "2px" }}>Name</div>
                        <div style={{ fontSize: ".82rem", fontWeight: 600, color: "#2d3f6b" }}>{firstName} {lastName}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: ".6rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#9baecf", marginBottom: "2px" }}>Email</div>
                        <div style={{ fontSize: ".82rem", fontWeight: 600, color: "#2d3f6b" }}>{email}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: ".6rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#9baecf", marginBottom: "2px" }}>Mobile</div>
                        <div style={{ fontSize: ".82rem", fontWeight: 600, color: "#2d3f6b" }}>{phone}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: ".6rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#9baecf", marginBottom: "2px" }}>Location</div>
                        <div style={{ fontSize: ".82rem", fontWeight: 600, color: "#2d3f6b" }}>{location || "—"}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: ".6rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#9baecf", marginBottom: "2px" }}>Role</div>
                        <div style={{ fontSize: ".82rem", fontWeight: 600, color: "#2d3f6b" }}>{selectedRole === "Other" ? roleOther : selectedRole}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: ".6rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#9baecf", marginBottom: "2px" }}>Experience</div>
                        <div style={{ fontSize: ".82rem", fontWeight: 600, color: "#2d3f6b" }}>{experience}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: ".6rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#9baecf", marginBottom: "2px" }}>Availability</div>
                        <div style={{ fontSize: ".82rem", fontWeight: 600, color: "#2d3f6b" }}>{availability}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: ".6rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#9baecf", marginBottom: "2px" }}>CV Uploaded</div>
                        <div style={{ fontSize: ".82rem", fontWeight: 600, color: "#2d3f6b" }}>{uploadedFile ? uploadedFile.name : "Not uploaded (optional)"}</div>
                      </div>
                    </div>
                  </div>

                  <div className={`field ${errors.message ? "has-error" : ""}`}>
                    <label className="field-label">Why HanuxTech? <span className="field-req">*</span></label>
                    <textarea
                      id="inp-message"
                      className="field-input"
                      rows={4}
                      placeholder="What draws you to HanuxTech? What's the project or challenge you'd most want to work on here?"
                      value={message}
                      onChange={(e) => { setMessage(e.target.value); if(errors.message) setErrors({...errors, message: false}); }}
                    />
                    <span className="field-hint">2–4 sentences is perfect. Be specific — generic answers blend in (min 20 chars).</span>
                    {errors.message && <span className="field-error">Please add a short note so we can get to know you (minimum 20 characters)</span>}
                  </div>

                  <div className={`field ${errors.consent ? "has-error" : ""}`} style={{ marginTop: "1.25rem" }}>
                    <label style={{ display: "flex", alignItems: "flex-start", gap: ".65rem", cursor: "pointer", textAlign: "left" }}>
                      <input
                        id="inp-consent"
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => { setConsent(e.target.checked); if(errors.consent) setErrors({...errors, consent: false}); }}
                        style={{ marginTop: "3px", flexShrink: 0, accentColor: "#1e4fd8" }}
                      />
                      <span style={{ fontSize: ".78rem", color: "#7e93be", lineHeight: "1.6" }}>
                        I agree that HanuxTech may store my information for up to 12 months to consider me for suitable roles. <a href="#" style={{ color: "#1e4fd8" }}>Privacy policy →</a>
                      </span>
                    </label>
                    {errors.consent && <span className="field-error">Please accept the privacy policy to continue</span>}
                  </div>
                </div>
              </>
            ) : (
              /* SUCCESS STATE */
              <div className="cv-success show">
                <div className="cs-anim">🎉</div>
                <div className="cs-h">Application received!</div>
                <div className="cs-p">Your CV is with our team. We personally read every application and aim to reply within <strong>3 working days</strong>.</div>
                <div className="cs-meta">
                  <span className="cs-tag">👤 {firstName}</span>
                  <span className="cs-tag">🎯 {selectedRole === "Other" ? roleOther : selectedRole}</span>
                  <span className="cs-tag">⚡ {availability}</span>
                  {uploadedFile && <span className="cs-tag">📄 CV attached</span>}
                </div>
                <button className="btn-primary" onClick={closeOverlay}>Back to careers →</button>
              </div>
            )}
          </div>

          {/* FOOTER NAV */}
          {!isSuccess && (
            <div className="cv-footer">
              {currentStep > 1 && (
                <button className="btn-back" onClick={handleBack}>← Back</button>
              )}
              <button className="btn-next" onClick={handleNext} disabled={isSubmitting}>
                {isSubmitting ? (
                  <span style={{ animation: "pulse 1s ease-in-out infinite", display: "inline-block" }}>Submitting…</span>
                ) : currentStep === 4 ? (
                  <>
                    Submit application
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: "6px" }}><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </>
                ) : (
                  <>
                    Continue
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: "6px" }}><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" stroke-width="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Career;
