import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Footer } from "../components/Footer/Footer";
import { 
  Globe, 
  Smartphone, 
  Cloud, 
  Handshake, 
  Cpu, 
  Palette, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Building, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Lock 
} from "lucide-react";
import "./ScheduleMeeting.css";

interface ServiceItem {
  id: string;
  name: string;
  duration: string;
  iconName: "Globe" | "Smartphone" | "Cloud" | "Handshake" | "Cpu" | "Palette";
}

const servicesList: ServiceItem[] = [
  { id: "web-dev", name: "Website Development", duration: "30 min · Engineering lead", iconName: "Globe" },
  { id: "mobile-apps", name: "Mobile App Development", duration: "30 min · Mobile lead", iconName: "Smartphone" },
  { id: "saas-dev", name: "SaaS Development", duration: "30 min · Product lead", iconName: "Cloud" },
  { id: "crm-solutions", name: "CRM Solutions", duration: "30 min · Solutions lead", iconName: "Handshake" },
  { id: "ai-automation", name: "AI & Automation", duration: "30 min · AI lead", iconName: "Cpu" },
  { id: "ui-ux", name: "UI/UX Design", duration: "30 min · Design lead", iconName: "Palette" }
];

interface CountryCode {
  code: string;
  name: string;
  dial: string;
  flag: string;
}

const countryCodes: CountryCode[] = [
  { code: "IN", name: "India", dial: "+91", flag: "🇮🇳" },
  { code: "US", name: "United States", dial: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧" },
  { code: "CA", name: "Canada", dial: "+1", flag: "🇨🇦" },
  { code: "AU", name: "Australia", dial: "+61", flag: "🇦🇺" },
  { code: "AE", name: "United Arab Emirates", dial: "+971", flag: "🇦🇪" },
  { code: "SG", name: "Singapore", dial: "+65", flag: "🇸🇬" },
  { code: "DE", name: "Germany", dial: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", dial: "+33", flag: "🇫🇷" },
  { code: "JP", name: "Japan", dial: "+81", flag: "🇯🇵" },
  { code: "ZA", name: "South Africa", dial: "+27", flag: "🇿🇦" },
  { code: "BR", name: "Brazil", dial: "+55", flag: "🇧🇷" },
  { code: "RU", name: "Russia", dial: "+7", flag: "🇷🇺" },
  { code: "CN", name: "China", dial: "+86", flag: "🇨🇳" },
  { code: "IT", name: "Italy", dial: "+39", flag: "🇮🇹" },
  { code: "ES", name: "Spain", dial: "+34", flag: "🇪🇸" },
  { code: "NL", name: "Netherlands", dial: "+31", flag: "🇳🇱" },
  { code: "CH", name: "Switzerland", dial: "+41", flag: "🇨🇭" },
  { code: "SE", name: "Sweden", dial: "+46", flag: "🇸🇪" },
  { code: "NZ", name: "New Zealand", dial: "+64", flag: "🇳🇿" },
  { code: "MY", name: "Malaysia", dial: "+60", flag: "🇲🇾" },
  { code: "ID", name: "Indonesia", dial: "+62", flag: "🇮🇩" },
  { code: "TH", name: "Thailand", dial: "+66", flag: "🇹🇭" },
  { code: "PH", name: "Philippines", dial: "+63", flag: "🇵🇭" },
  { code: "VN", name: "Vietnam", dial: "+84", flag: "🇻🇳" },
  { code: "MX", name: "Mexico", dial: "+52", flag: "🇲🇽" },
  { code: "AR", name: "Argentina", dial: "+54", flag: "🇦🇷" },
  { code: "CO", name: "Colombia", dial: "+57", flag: "🇨🇴" },
  { code: "CL", name: "Chile", dial: "+56", flag: "🇨🇱" },
  { code: "PE", name: "Peru", dial: "+51", flag: "🇵🇪" },
  { code: "SA", name: "Saudi Arabia", dial: "+966", flag: "🇸🇦" },
  { code: "TR", name: "Turkey", dial: "+90", flag: "🇹🇷" },
  { code: "EG", name: "Egypt", dial: "+20", flag: "🇪🇬" },
  { code: "PK", name: "Pakistan", dial: "+92", flag: "🇵🇰" },
  { code: "BD", name: "Bangladesh", dial: "+880", flag: "🇧🇩" },
  { code: "LK", name: "Sri Lanka", dial: "+94", flag: "🇱🇰" },
  { code: "NP", name: "Nepal", dial: "+977", flag: "🇳🇵" },
];

const getPhoneConfig = (countryCode: string) => {
  switch (countryCode) {
    case "US":
    case "CA":
      return { placeholder: "(555) 000-0000", maxLength: 14 };
    case "IN":
      return { placeholder: "98765 43210", maxLength: 11 };
    case "GB":
      return { placeholder: "7911 123456", maxLength: 11 };
    case "AU":
      return { placeholder: "412 345 678", maxLength: 11 };
    default:
      return { placeholder: "98765 43210", maxLength: 15 };
  }
};

const formatPhoneNumber = (val: string, countryCode: string) => {
  const digits = val.replace(/\D/g, "");
  if (countryCode === "US" || countryCode === "CA") {
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  }
  if (countryCode === "IN") {
    if (digits.length <= 5) return digits;
    return `${digits.slice(0, 5)} ${digits.slice(5, 10)}`;
  }
  if (countryCode === "GB") {
    if (digits.length <= 4) return digits;
    return `${digits.slice(0, 4)} ${digits.slice(4, 10)}`;
  }
  if (countryCode === "AU") {
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3, 6)}`;
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`;
  }
  const parts = [];
  for (let i = 0; i < digits.length; i += 4) {
    parts.push(digits.slice(i, i + 4));
  }
  return parts.join(" ").slice(0, 15);
};

const timezoneOffsets: Record<string, number> = {
  "Pacific/Midway": 990,
  "Pacific/Honolulu": 930,
  "America/Anchorage": 870,
  "America/Los_Angeles": 810,
  "America/Denver": 750,
  "America/Chicago": 690,
  "America/New_York": 630,
  "America/Halifax": 570,
  "America/Argentina/Buenos_Aires": 510,
  "America/Sao_Paulo": 510,
  "Atlantic/Azores": 390,
  "Europe/London": 330,
  "Europe/Paris": 270,
  "Africa/Cairo": 210,
  "Europe/Moscow": 150,
  "Asia/Tehran": 120,
  "Asia/Dubai": 90,
  "Asia/Kabul": 60,
  "Asia/Karachi": 30,
  "Asia/Kolkata": 0,
  "Asia/Kathmandu": -15,
  "Asia/Dhaka": -30,
  "Asia/Bangkok": -90,
  "Asia/Singapore": -150,
  "Asia/Tokyo": -210,
  "Australia/Adelaide": -240,
  "Australia/Sydney": -270,
  "Pacific/Noumea": -330,
  "Pacific/Auckland": -390
};

const getTimezoneFlagCode = (tz: string) => {
  if (tz === "Pacific/Midway" || tz === "Pacific/Honolulu" || tz === "America/Anchorage" || tz === "America/Los_Angeles" || tz === "America/Denver" || tz === "America/Chicago" || tz === "America/New_York") return "us";
  if (tz === "America/Halifax") return "ca";
  if (tz === "America/Argentina/Buenos_Aires") return "ar";
  if (tz === "America/Sao_Paulo") return "br";
  if (tz === "Atlantic/Azores") return "pt";
  if (tz === "Europe/London") return "gb";
  if (tz === "Europe/Paris") return "fr";
  if (tz === "Africa/Cairo") return "eg";
  if (tz === "Europe/Moscow") return "ru";
  if (tz === "Asia/Tehran") return "ir";
  if (tz === "Asia/Dubai") return "ae";
  if (tz === "Asia/Kabul") return "af";
  if (tz === "Asia/Karachi") return "pk";
  if (tz === "Asia/Kolkata") return "in";
  if (tz === "Asia/Kathmandu") return "np";
  if (tz === "Asia/Dhaka") return "bd";
  if (tz === "Asia/Bangkok") return "th";
  if (tz === "Asia/Singapore") return "sg";
  if (tz === "Asia/Tokyo") return "jp";
  if (tz === "Australia/Adelaide") return "au";
  if (tz === "Australia/Sydney") return "au";
  if (tz === "Pacific/Noumea") return "nc";
  if (tz === "Pacific/Auckland") return "nz";
  return "us";
};

const convertToIST = (timeStr: string, timezone: string): string => {
  const clean = timeStr.toLowerCase().replace(/\s+/g, "");
  let hour = -1;
  let minute = 0;
  
  const isPm = clean.includes("pm");
  const isAm = clean.includes("am");
  const numOnly = clean.replace(/[ap]m/g, "");
  
  if (numOnly.includes(":")) {
    const parts = numOnly.split(":");
    hour = parseInt(parts[0], 10);
    minute = parseInt(parts[1], 10);
  } else {
    hour = parseInt(numOnly, 10);
    minute = 0;
  }
  
  if (isNaN(hour) || hour < 0 || hour > 23 || isNaN(minute) || minute < 0 || minute > 59) {
    return "";
  }
  
  if (isPm && hour < 12) hour += 12;
  if (isAm && hour === 12) hour = 0;
  
  const offsetDiffMinutes = timezoneOffsets[timezone] !== undefined ? timezoneOffsets[timezone] : 0;
  const rawSum = hour * 60 + minute + offsetDiffMinutes;
  let totalMinutes = rawSum;
  let dayLabel = "";
  if (rawSum >= 24 * 60) {
    totalMinutes = rawSum % (24 * 60);
    dayLabel = " (Next Day)";
  } else if (rawSum < 0) {
    totalMinutes = (rawSum + 24 * 60) % (24 * 60);
    dayLabel = " (Prev Day)";
  }
  
  let istHour = Math.floor(totalMinutes / 60);
  const istMinute = totalMinutes % 60;
  
  const istAmPm = istHour >= 12 ? "PM" : "AM";
  let displayHour = istHour % 12;
  if (displayHour === 0) displayHour = 12;
  
  const minPad = istMinute.toString().padStart(2, "0");
  return `${displayHour}:${minPad} ${istAmPm} IST${dayLabel}`;
};

const timezonesList = [
  { value: "Pacific/Midway", label: "(UTC-11:00) Midway Island, Samoa", country: "Samoa Midway" },
  { value: "Pacific/Honolulu", label: "(UTC-10:00) Hawaii", country: "United States USA Hawaii" },
  { value: "America/Anchorage", label: "(UTC-09:00) Alaska", country: "United States USA Alaska" },
  { value: "America/Los_Angeles", label: "(UTC-08:00) Pacific Time (PST/PDT)", country: "United States USA California Seattle LA Los Angeles" },
  { value: "America/Denver", label: "(UTC-07:00) Mountain Time (MST/MDT)", country: "United States USA Denver Colorado" },
  { value: "America/Chicago", label: "(UTC-06:00) Central Time (CST/CDT)", country: "United States USA Chicago Texas Houston" },
  { value: "America/New_York", label: "(UTC-05:00) Eastern Time (EST/EDT)", country: "United States USA New York Washington Boston Miami" },
  { value: "America/Halifax", label: "(UTC-04:00) Atlantic Time (AST/ADT)", country: "Canada Halifax Nova Scotia Toronto Montreal" },
  { value: "America/Argentina/Buenos_Aires", label: "(UTC-03:00) Buenos Aires, Georgetown", country: "Argentina Buenos Aires Guyana" },
  { value: "America/Sao_Paulo", label: "(UTC-03:00) Sao Paulo", country: "Brazil Sao Paulo Rio" },
  { value: "Atlantic/Azores", label: "(UTC-01:00) Azores", country: "Portugal Azores" },
  { value: "Europe/London", label: "(UTC+00:00) London Time (GMT/BST)", country: "United Kingdom UK London Great Britain England" },
  { value: "Europe/Paris", label: "(UTC+01:00) Amsterdam, Berlin, Paris, Rome", country: "France Germany Italy Netherlands Amsterdam Berlin Paris Rome Europe Spain Madrid Brussels Belgium" },
  { value: "Africa/Cairo", label: "(UTC+02:00) Cairo, Athens, Istanbul", country: "Egypt Greece Turkey Cairo Athens Istanbul" },
  { value: "Europe/Moscow", label: "(UTC+03:00) Moscow, St. Petersburg", country: "Russia Moscow St Petersburg" },
  { value: "Asia/Tehran", label: "(UTC+03:30) Tehran", country: "Iran Tehran" },
  { value: "Asia/Dubai", label: "(UTC+04:00) Abu Dhabi, Dubai, Muscat", country: "United Arab Emirates UAE Dubai Abu Dhabi Oman Muscat" },
  { value: "Asia/Kabul", label: "(UTC+04:30) Kabul", country: "Afghanistan Kabul" },
  { value: "Asia/Karachi", label: "(UTC+05:00) Islamabad, Karachi", country: "Pakistan Islamabad Karachi" },
  { value: "Asia/Kolkata", label: "(UTC+05:30) Chennai, Kolkata, Mumbai (IST)", country: "India Chennai Kolkata Mumbai Delhi Bangalore Hyderabad Pune IST" },
  { value: "Asia/Kathmandu", label: "(UTC+05:45) Kathmandu", country: "Nepal Kathmandu" },
  { value: "Asia/Dhaka", label: "(UTC+06:00) Almaty, Dhaka", country: "Bangladesh Dhaka Kazakhstan Almaty" },
  { value: "Asia/Bangkok", label: "(UTC+07:00) Bangkok, Hanoi, Jakarta", country: "Thailand Bangkok Vietnam Hanoi Indonesia Jakarta" },
  { value: "Asia/Singapore", label: "(UTC+08:00) Beijing, Singapore, Hong Kong", country: "Singapore China Beijing Hong Kong Shanghai" },
  { value: "Asia/Tokyo", label: "(UTC+09:00) Osaka, Sapporo, Tokyo", country: "Japan Tokyo Osaka" },
  { value: "Australia/Adelaide", label: "(UTC+09:30) Adelaide", country: "Australia Adelaide" },
  { value: "Australia/Sydney", label: "(UTC+10:00) Canberra, Melbourne, Sydney", country: "Australia Sydney Melbourne Canberra AEST" },
  { value: "Pacific/Noumea", label: "(UTC+11:00) Solomon Is., New Caledonia", country: "Solomon Islands New Caledonia" },
  { value: "Pacific/Auckland", label: "(UTC+12:00) Auckland, Wellington", country: "New Zealand NZ Auckland Wellington" }
];

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
}

export const ScheduleMeeting: React.FC = () => {
  // Wizard active step for highlights (1 to 4)
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isBooked, setIsBooked] = useState<boolean>(false);
  
  // Selection States
  const [selectedService, setSelectedService] = useState<string>("web-dev");
  const [selectedDate, setSelectedDate] = useState<{ day: number; month: number; year: number } | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedTimezone, setSelectedTimezone] = useState<string>("Asia/Kolkata");
  
  // Form States
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(countryCodes[0]); // default to India
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isTzDropdownOpen, setIsTzDropdownOpen] = useState<boolean>(false);
  const [tzSearchQuery, setTzSearchQuery] = useState<string>("");
  const tzDropdownRef = useRef<HTMLDivElement>(null);
  const [company, setCompany] = useState<string>("");
  const [requests, setRequests] = useState<string>("");
  
  // Calendar Month Navigation
  const [calMonth, setCalMonth] = useState<number>(new Date().getMonth());
  const [calYear, setCalYear] = useState<number>(new Date().getFullYear());
  
  // Error & Confetti
  const [error, setError] = useState<string>("");
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (tzDropdownRef.current && !tzDropdownRef.current.contains(event.target as Node)) {
        setIsTzDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Autofill today's date if valid
  useEffect(() => {
    const today = new Date();
    if (today.getMonth() === calMonth && today.getFullYear() === calYear) {
      setSelectedDate({ day: today.getDate(), month: calMonth, year: calYear });
      setActiveStep(2); // Move highlight to Step 2: Date & Time
    }
  }, [calMonth, calYear]);

  const handleServiceSelect = (svcId: string) => {
    setSelectedService(svcId);
    if (activeStep < 2) {
      setActiveStep(2);
    }
  };

  const handleDaySelect = (dayNum: number) => {
    const today = new Date();
    const cellDate = new Date(calYear, calMonth, dayNum);
    const comparisonDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    if (cellDate < comparisonDate) return; // Ignore past dates

    setSelectedDate({ day: dayNum, month: calMonth, year: calYear });
    setSelectedTime(""); // Reset time on new day select
    setActiveStep(2);
  };

  const handleTimeInput = (val: string) => {
    setSelectedTime(val);
    if (val.trim().length > 0) {
      if (activeStep < 3) {
        setActiveStep(3);
      }
    } else {
      if (activeStep === 3 && (!name && !email && !phone)) {
        setActiveStep(2);
      }
    }
  };

  const handleNameInput = (val: string) => {
    setName(val);
    checkDetailsProgress(val, email, phone);
  };

  const handleEmailInput = (val: string) => {
    setEmail(val);
    checkDetailsProgress(name, val, phone);
  };

  const handlePhoneInputChange = (val: string) => {
    const formatted = formatPhoneNumber(val, selectedCountry.code);
    setPhoneNumber(formatted);
    const fullPhone = `${selectedCountry.dial} ${formatted}`;
    setPhone(fullPhone);
    checkDetailsProgress(name, email, fullPhone);
  };

  const handleCountrySelect = (country: CountryCode) => {
    setSelectedCountry(country);
    const formatted = formatPhoneNumber(phoneNumber, country.code);
    setPhoneNumber(formatted);
    const fullPhone = `${country.dial} ${formatted}`;
    setPhone(fullPhone);
    checkDetailsProgress(name, email, fullPhone);

    // Sync timezone with selected country
    if (country.code === "IN") {
      setSelectedTimezone("Asia/Kolkata");
    } else if (country.code === "US" || country.code === "CA") {
      setSelectedTimezone("America/New_York");
    } else if (country.code === "GB") {
      setSelectedTimezone("Europe/London");
    } else if (country.code === "AU") {
      setSelectedTimezone("Australia/Sydney");
    } else if (country.code === "NZ") {
      setSelectedTimezone("Pacific/Auckland");
    } else if (country.code === "FR" || country.code === "DE" || country.code === "IT" || country.code === "ES" || country.code === "NL") {
      setSelectedTimezone("Europe/Paris");
    } else if (country.code === "SG") {
      setSelectedTimezone("Asia/Singapore");
    } else if (country.code === "JP") {
      setSelectedTimezone("Asia/Tokyo");
    } else if (country.code === "AE") {
      setSelectedTimezone("Asia/Dubai");
    } else if (country.code === "EG") {
      setSelectedTimezone("Africa/Cairo");
    } else if (country.code === "BR") {
      setSelectedTimezone("America/Sao_Paulo");
    } else if (country.code === "RU") {
      setSelectedTimezone("Europe/Moscow");
    } else if (country.code === "PK") {
      setSelectedTimezone("Asia/Karachi");
    } else if (country.code === "BD") {
      setSelectedTimezone("Asia/Dhaka");
    } else if (country.code === "LK" || country.code === "NP") {
      setSelectedTimezone("Asia/Kathmandu");
    }
  };

  const handleTimezoneChange = (tz: string) => {
    setSelectedTimezone(tz);
    
    // Sync country with selected timezone
    let targetCountryCode = "";
    if (tz === "Asia/Kolkata") targetCountryCode = "IN";
    else if (tz.startsWith("America/New_York") || tz.startsWith("America/Los_Angeles") || tz.startsWith("America/Chicago") || tz.startsWith("America/Denver") || tz.startsWith("America/Anchorage") || tz.startsWith("Pacific/Midway") || tz.startsWith("Pacific/Honolulu")) targetCountryCode = "US";
    else if (tz === "Europe/London") targetCountryCode = "GB";
    else if (tz === "Australia/Sydney" || tz === "Australia/Adelaide") targetCountryCode = "AU";
    else if (tz === "Europe/Paris") targetCountryCode = "FR";
    else if (tz === "Asia/Singapore") targetCountryCode = "SG";
    else if (tz === "Asia/Tokyo") targetCountryCode = "JP";
    else if (tz === "Asia/Dubai") targetCountryCode = "AE";
    else if (tz === "Africa/Cairo") targetCountryCode = "EG";
    else if (tz === "America/Sao_Paulo") targetCountryCode = "BR";
    else if (tz === "Europe/Moscow") targetCountryCode = "RU";
    else if (tz === "Asia/Karachi") targetCountryCode = "PK";
    else if (tz === "Asia/Dhaka") targetCountryCode = "BD";
    else if (tz === "Asia/Kathmandu") targetCountryCode = "NP";
    else if (tz === "Pacific/Auckland") targetCountryCode = "NZ";
    else if (tz === "America/Halifax") targetCountryCode = "CA";

    if (targetCountryCode) {
      const match = countryCodes.find(c => c.code === targetCountryCode);
      if (match) {
        setSelectedCountry(match);
        const formatted = formatPhoneNumber(phoneNumber, match.code);
        setPhoneNumber(formatted);
        const fullPhone = `${match.dial} ${formatted}`;
        setPhone(fullPhone);
        checkDetailsProgress(name, email, fullPhone);
      }
    }
  };

  const checkDetailsProgress = (currName: string, currEmail: string, currPhone: string) => {
    if (currName.trim() && currEmail.trim() && currPhone.trim()) {
      setActiveStep(4);
    } else if (selectedDate && selectedTime) {
      setActiveStep(3);
    } else {
      setActiveStep(2);
    }
  };

  const handleMonthPrev = () => {
    setCalMonth(prev => {
      if (prev === 0) {
        setCalYear(y => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleMonthNext = () => {
    setCalMonth(prev => {
      if (prev === 11) {
        setCalYear(y => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) {
      setError("Please select a service first.");
      return;
    }
    if (!selectedDate) {
      setError("Please select a date on the calendar.");
      return;
    }
    if (!selectedTime.trim()) {
      setError("Please specify your preferred time manually.");
      return;
    }
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill in Name, Email, and Mobile to confirm.");
      return;
    }
    setError("");

    const ref = "HTX-" + Math.floor(100000 + Math.random() * 900000);

    try {
      const response = await fetch(`http://${window.location.hostname}:5000/api/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          serviceName: activeService?.name || "Consultation Call",
          date: `${selectedDate.day}/${selectedDate.month + 1}/${selectedDate.year}`,
          timeSlot: `${selectedTime} (${selectedTimezone})`,
          bookingRef: ref,
          notes: `Phone: ${phone}\nCompany: ${company}\nSpecial Requests: ${requests}`
        })
      });
      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }
    } catch (err: any) {
      console.error("Failed to submit booking:", err);
      alert(`Error scheduling meeting: ${err.message}. Please ensure the backend server is running on Port 5000 and matches the dynamic network IP.`);
    }

    // Trigger Confetti
    const pieces: ConfettiPiece[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: 15 + Math.random() * 70,
      color: ["#0f3ca0", "#2563eb", "#10b981", "#fbbf24", "#ef4444"][i % 5],
      delay: Math.random() * 0.4,
      duration: 0.8 + Math.random() * 0.8
    }));
    setConfetti(pieces);
    setIsBooked(true);
    setActiveStep(4);

    // Clear confetti after animation
    setTimeout(() => setConfetti([]), 2000);
  };

  const handleResetForm = () => {
    setSelectedTime("");
    setSelectedTimezone("Asia/Kolkata");
    setName("");
    setEmail("");
    setPhone("");
    setPhoneNumber("");
    setSelectedCountry(countryCodes[0]);
    setIsDropdownOpen(false);
    setSearchQuery("");
    setCompany("");
    setRequests("");
    setIsBooked(false);
    setActiveStep(1);
    
    // Reset to today's date if possible
    const today = new Date();
    setSelectedDate({ day: today.getDate(), month: today.getMonth(), year: today.getFullYear() });
    setCalMonth(today.getMonth());
    setCalYear(today.getFullYear());
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Globe": return <Globe />;
      case "Smartphone": return <Smartphone />;
      case "Cloud": return <Cloud />;
      case "Handshake": return <Handshake />;
      case "Cpu": return <Cpu />;
      case "Palette": return <Palette />;
      default: return <Globe />;
    }
  };

  // Calendar calculations
  const firstDayIndex = new Date(calYear, calMonth, 1).getDay();
  const totalDaysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const todayDate = new Date();

  const emptyCells = Array.from({ length: firstDayIndex });
  const daysArray = Array.from({ length: totalDaysInMonth }, (_, i) => i + 1);

  const activeService = servicesList.find(s => s.id === selectedService);

  return (
    <div className="schedule-meeting-page">
      {/* Background decorations */}
      <div className="bg-decorations">
        <div className="bg-grid" />
        <div className="blob1" />
        <div className="blob2" />
      </div>

      <Navbar />

      {/* Confetti Render */}
      {confetti.map(p => (
        <div 
          key={p.id} 
          className="conf-piece"
          style={{
            left: `${p.left}%`,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`
          }}
        />
      ))}

      <main className="page-container">
        
        {/* HERO / HEADER */}
        {!isBooked && (
          <div className="page-header">
            <div className="badge">
              <div className="badge-dot" />
              <span className="badge-text">Free consultation · 30 min</span>
            </div>
            <h1 className="page-title">
              Book a <span>Meeting</span>
            </h1>
            <p className="page-sub">
              Schedule a free technical consultation with our engineering leads. No commitment, just clarity.
            </p>
          </div>
        )}

        {/* PROGRESS STEPS INDICATOR */}
        {!isBooked && (
          <div className="steps-bar">
            <div className={`step ${activeStep >= 1 ? (activeStep > 1 ? "done" : "active") : ""}`}>
              <div className="step-num">{activeStep > 1 ? "✓" : "1"}</div>
              <div className="step-label">Service</div>
            </div>
            <div className={`step-line ${activeStep > 1 ? "done" : (activeStep === 1 ? "active" : "")}`} />
            
            <div className={`step ${activeStep >= 2 ? (activeStep > 2 ? "done" : "active") : ""}`}>
              <div className="step-num">{activeStep > 2 ? "✓" : "2"}</div>
              <div className="step-label">Date &amp; Time</div>
            </div>
            <div className={`step-line ${activeStep > 2 ? "done" : (activeStep === 2 ? "active" : "")}`} />
            
            <div className={`step ${activeStep >= 3 ? (activeStep > 3 ? "done" : "active") : ""}`}>
              <div className="step-num">{activeStep > 3 ? "✓" : "3"}</div>
              <div className="step-label">Details</div>
            </div>
            <div className={`step-line ${activeStep > 3 ? "done" : (activeStep === 3 ? "active" : "")}`} />
            
            <div className={`step ${activeStep === 4 ? "active" : ""}`}>
              <div className="step-num">4</div>
              <div className="step-label">Confirm</div>
            </div>
          </div>
        )}

        {/* WIZARD CONTAINER CARDS */}
        {!isBooked ? (
          <div className="layout-grid">
            
            {/* LEFT COLUMN: SECTIONS */}
            <div className="flex flex-col gap-2">
              
              {/* SECTION 1: SERVICE */}
              <div className={`section ${activeStep === 1 ? "active-section" : ""}`}>
                <div className="sec-header">
                  <div className="sec-num">1</div>
                  <h2 className="sec-title">What can we help you build?</h2>
                </div>
                
                <div className="services-grid">
                  {servicesList.map((svc) => {
                    const isSelected = selectedService === svc.id;
                    return (
                      <div
                        key={svc.id}
                        onClick={() => handleServiceSelect(svc.id)}
                        className={`svc-card ${isSelected ? "selected" : ""}`}
                      >
                        <div className="svc-radio" />
                        <div className="svc-icon-wrapper">
                          {getServiceIcon(svc.iconName)}
                        </div>
                        <div className="svc-name">
                          {svc.name}
                        </div>
                        <div className="svc-dur">
                          <Clock className="w-3.5 h-3.5" /> 30 min
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 2: DATE & TIME */}
              <div className={`section ${activeStep === 2 ? "active-section" : ""}`}>
                <div className="sec-header">
                  <div className="sec-num">2</div>
                  <h2 className="sec-title">Pick a Date &amp; Time</h2>
                </div>
                
                <div className="cal-wrap">
                  {/* Calendar Box */}
                  <div>
                    <div className="cal-header">
                      <button type="button" onClick={handleMonthPrev} className="cal-nav">
                        ‹
                      </button>
                      <div className="cal-title">{months[calMonth]} {calYear}</div>
                      <button type="button" onClick={handleMonthNext} className="cal-nav">
                        ›
                      </button>
                    </div>
                    
                    <div className="cal-days-header">
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(lbl => (
                        <div key={lbl} className="cal-day-label">{lbl}</div>
                      ))}
                    </div>
                    
                    <div className="cal-grid">
                      {emptyCells.map((_, i) => (
                        <div key={`empty-${i}`} className="cal-day empty" />
                      ))}
                      
                      {daysArray.map((dNum: number) => {
                        const cellDate = new Date(calYear, calMonth, dNum);
                        const isPast = cellDate < new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
                        const isToday = dNum === todayDate.getDate() && calMonth === todayDate.getMonth() && calYear === todayDate.getFullYear();
                        const isSelected = selectedDate && selectedDate.day === dNum && selectedDate.month === calMonth && selectedDate.year === calYear;
                        
                        return (
                          <div
                            key={dNum}
                            onClick={() => !isPast && handleDaySelect(dNum)}
                            className={`cal-day ${isPast ? "past" : ""} ${isToday ? "today" : ""} ${isSelected ? "selected" : ""}`}
                          >
                            {dNum}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Manual Time Input Box */}
                  <div className="manual-time-wrap">
                    <div className="manual-time-label">
                      {selectedDate 
                        ? `Time for ${months[selectedDate.month].slice(0,3)} ${selectedDate.day}` 
                        : "Preferred Time"
                      }
                    </div>
                    
                    <div className="time-input-container">
                      <input 
                        type="text"
                        className="time-input-field"
                        placeholder="e.g. 10:30 AM or 3:00 PM"
                        value={selectedTime}
                        onChange={(e) => handleTimeInput(e.target.value)}
                        disabled={!selectedDate}
                        maxLength={12}
                      />
                      <span className="time-icon-left">
                        <Clock />
                      </span>
                    </div>

                    <div className="manual-time-label mt-4">
                      Select Time Zone
                    </div>
                    
                    <div className="time-input-container relative" ref={tzDropdownRef}>
                      <button
                        type="button"
                        className="flex items-center w-full h-[52px] bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-10 text-xs text-slate-700 hover:bg-slate-100/50 transition-all text-left outline-none cursor-pointer focus:border-indigo-600 bg-white disabled:opacity-60 disabled:cursor-not-allowed"
                        onClick={() => !selectedDate ? null : setIsTzDropdownOpen(!isTzDropdownOpen)}
                        disabled={!selectedDate}
                      >
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                          <img 
                            src={`https://flagcdn.com/w20/${getTimezoneFlagCode(selectedTimezone)}.png`} 
                            srcSet={`https://flagcdn.com/w40/${getTimezoneFlagCode(selectedTimezone)}.png 2x`}
                            className="w-5 h-3.5 object-cover rounded-sm shadow-xs" 
                            alt="" 
                          />
                        </span>
                        <span className="truncate">
                          {timezonesList.find(t => t.value === selectedTimezone)?.label || selectedTimezone}
                        </span>
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
                          ▼
                        </span>
                      </button>

                      {isTzDropdownOpen && (
                        <div className="absolute top-[58px] left-0 z-50 w-full max-h-64 bg-white border border-slate-200 rounded-xl shadow-lg flex flex-col overflow-hidden animate-fadeIn">
                          <div className="p-2 border-b border-slate-100 bg-slate-50">
                            <input 
                              type="text"
                              placeholder="Search country or timezone..."
                              value={tzSearchQuery}
                              onChange={(e) => setTzSearchQuery(e.target.value)}
                              className="w-full h-9 px-2.5 border border-slate-200 rounded-lg text-xs outline-none focus:border-indigo-600 bg-white text-slate-800"
                              autoFocus
                            />
                          </div>
                          <div className="flex-1 overflow-y-auto max-h-48">
                            {timezonesList
                              .filter(t => 
                                t.label.toLowerCase().includes(tzSearchQuery.toLowerCase()) || 
                                t.country.toLowerCase().includes(tzSearchQuery.toLowerCase())
                              )
                              .map(t => (
                                <button
                                  key={t.value}
                                  type="button"
                                  onClick={() => {
                                    handleTimezoneChange(t.value);
                                    setIsTzDropdownOpen(false);
                                    setTzSearchQuery("");
                                  }}
                                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs text-slate-700 hover:bg-slate-50 cursor-pointer text-left transition-colors ${selectedTimezone === t.value ? "bg-slate-50 font-semibold" : ""}`}
                                >
                                  <img 
                                    src={`https://flagcdn.com/w20/${getTimezoneFlagCode(t.value)}.png`} 
                                    srcSet={`https://flagcdn.com/w40/${getTimezoneFlagCode(t.value)}.png 2x`}
                                    className="w-5 h-3.5 object-cover rounded-sm shadow-xs flex-shrink-0" 
                                    alt="" 
                                  />
                                  <span className="flex-grow">{t.label}</span>
                                </button>
                              ))
                            }
                            {timezonesList.filter(t => 
                              t.label.toLowerCase().includes(tzSearchQuery.toLowerCase()) || 
                              t.country.toLowerCase().includes(tzSearchQuery.toLowerCase())
                            ).length === 0 && (
                              <div className="p-4 text-center text-xs text-slate-400">
                                No matching timezones found.
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {selectedTime.trim() && selectedDate && convertToIST(selectedTime, selectedTimezone) && (
                      <p className="mt-2 text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
                        <span>✨ Matches:</span>
                        <span className="bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">{convertToIST(selectedTime, selectedTimezone)}</span>
                      </p>
                    )}
 
                    <p className="time-helper">
                      {!selectedDate 
                        ? "⚠️ Please pick a date on the calendar first."
                        : "Type your preferred meeting time and select your local timezone. Our team will accommodate."
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 3: YOUR DETAILS */}
              <div className={`section ${activeStep === 3 ? "active-section" : ""}`}>
                <div className="sec-header">
                  <div className="sec-num">3</div>
                  <h2 className="sec-title">Your Details</h2>
                </div>
                
                <div className="form-grid">
                  <div className="form-field">
                    <label className="field-label">Full Name<span>*</span></label>
                    <div className="field-wrap">
                      <input 
                        type="text" 
                        placeholder="Arjun Mehta" 
                        value={name}
                        onChange={(e) => handleNameInput(e.target.value)}
                        className="field-input"
                        required
                      />
                      <span className="field-icon-left">
                        <User />
                      </span>
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="field-label">Email Address<span>*</span></label>
                    <div className="field-wrap">
                      <input 
                        type="email" 
                        placeholder="arjun@company.com" 
                        value={email}
                        onChange={(e) => handleEmailInput(e.target.value)}
                        className="field-input"
                        required
                      />
                      <span className="field-icon-left">
                        <Mail />
                      </span>
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="field-label">Mobile Number<span>*</span></label>
                    <div className="field-wrap flex gap-2 relative" ref={dropdownRef}>
                      <div className="relative">
                        <button 
                          type="button"
                          className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 h-[52px] text-sm font-medium text-slate-700 hover:bg-slate-100 cursor-pointer"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                          <img 
                            src={`https://flagcdn.com/w20/${selectedCountry.code.toLowerCase()}.png`} 
                            srcSet={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png 2x`}
                            className="w-5 h-3.5 object-cover rounded-sm shadow-xs" 
                            alt="" 
                          />
                          <span>{selectedCountry.dial}</span>
                          <span className="text-[10px] text-slate-400">▼</span>
                        </button>

                        {isDropdownOpen && (
                          <div className="absolute top-[58px] left-0 z-50 w-72 max-h-64 bg-white border border-slate-200 rounded-xl shadow-lg flex flex-col overflow-hidden">
                            <div className="p-2 border-b border-slate-100 bg-slate-50">
                              <input 
                                type="text"
                                placeholder="Search country..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-9 px-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-600 bg-white text-slate-800"
                                autoFocus
                              />
                            </div>
                            <div className="flex-1 overflow-y-auto max-h-48">
                              {countryCodes
                                .filter(c => 
                                  c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  c.dial.includes(searchQuery)
                                )
                                .map(c => (
                                  <button
                                    key={c.code}
                                    type="button"
                                    onClick={() => {
                                      handleCountrySelect(c);
                                      setIsDropdownOpen(false);
                                      setSearchQuery("");
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer text-left transition-colors"
                                  >
                                    <img 
                                      src={`https://flagcdn.com/w20/${c.code.toLowerCase()}.png`} 
                                      srcSet={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png 2x`}
                                      className="w-5 h-3.5 object-cover rounded-sm shadow-xs flex-shrink-0" 
                                      alt="" 
                                    />
                                    <span className="flex-grow">{c.name}</span>
                                    <span className="font-semibold text-slate-400">{c.dial}</span>
                                  </button>
                                ))
                              }
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex-grow relative">
                        <input 
                          type="tel" 
                          placeholder={getPhoneConfig(selectedCountry.code).placeholder} 
                          value={phoneNumber}
                          onChange={(e) => handlePhoneInputChange(e.target.value)}
                          maxLength={getPhoneConfig(selectedCountry.code).maxLength}
                          className="field-input w-full pl-4"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="field-label">Company / Project</label>
                    <div className="field-wrap">
                      <input 
                        type="text" 
                        placeholder="Your company name" 
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="field-input"
                      />
                      <span className="field-icon-left">
                        <Building />
                      </span>
                    </div>
                  </div>

                  <div className="form-field full">
                    <label className="field-label">Special Requests</label>
                    <div className="field-wrap">
                      <textarea 
                        placeholder="Tell us what you'd like to discuss — the more context, the better your consultation…" 
                        value={requests}
                        onChange={(e) => setRequests(e.target.value)}
                        className="field-input"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-[#ef4444] text-xs font-bold text-center mt-3">
                  {error}
                </p>
              )}

              {/* Confirm CTA for mobile screen width */}
              <div className="cta-wrap md:hidden">
                <button 
                  onClick={handleConfirmBooking}
                  disabled={!selectedService || !selectedDate || !selectedTime.trim() || !name.trim() || !email.trim() || !phone.trim()}
                  className="cta-btn"
                >
                  <span>Confirm Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="cta-note">
                  <Lock className="w-3.5 h-3.5" /> Free consultation · No credit card · Cancel anytime
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: SUMMARY SIDEBAR */}
            <div className="sidebar-column">
              <div className="summary">
                <div className="summary-title">Booking Summary</div>
                <div className="summary-row">
                  <div className="summary-icon"><Zap /></div>
                  <div>
                    <div className="summary-key">Service</div>
                    <div className="summary-val">{activeService?.name || "None selected"}</div>
                  </div>
                </div>
                <div className="summary-row">
                  <div className="summary-icon"><Calendar /></div>
                  <div>
                    <div className="summary-key">Date</div>
                    <div className="summary-val">
                      {selectedDate 
                        ? `${months[selectedDate.month].slice(0,3)} ${selectedDate.day}, ${selectedDate.year}`
                        : <span className="summary-empty">Not selected</span>
                      }
                    </div>
                  </div>
                </div>
                <div className="summary-row">
                  <div className="summary-icon"><Clock /></div>
                  <div>
                    <div className="summary-key">Time</div>
                    <div className="summary-val">
                      {selectedTime.trim() 
                        ? `${selectedTime} (${selectedTimezone})` 
                        : <span className="summary-empty">Not selected</span>
                      }
                    </div>
                  </div>
                </div>
                <div className="summary-row">
                  <div className="summary-icon"><User /></div>
                  <div>
                    <div className="summary-key">Name</div>
                    <div className="summary-val">
                      {name.trim() 
                        ? name 
                        : <span className="summary-empty">—</span>
                      }
                    </div>
                  </div>
                </div>
                
                <div className="summary-meta-box">
                  <div className="meta-item">
                    <span className="meta-item-key">Duration</span>
                    <span className="meta-item-val">30 min</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-item-key">Format</span>
                    <span className="meta-item-val">Video call</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-item-key">Cost</span>
                    <span className="meta-item-val green">Free 🎉</span>
                  </div>
                </div>

                {/* Confirm CTA for desktop screen width */}
                <div className="cta-wrap hidden md:block">
                  <button 
                    onClick={handleConfirmBooking}
                    disabled={!selectedService || !selectedDate || !selectedTime.trim() || !name.trim() || !email.trim() || !phone.trim()}
                    className="cta-btn"
                  >
                    <span>Confirm Booking</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <div className="cta-note">
                    <Lock className="w-3 h-3" /> Free consultation · No credit card
                  </div>
                </div>
              </div>

              {/* Trust signals */}
              <div className="trust-signals">
                <div className="trust-card">
                  <span className="trust-icon"><Zap /></span>
                  <div>
                    <div className="trust-title">Fast response</div>
                    <div className="trust-desc">Confirmation in under 1 hour</div>
                  </div>
                </div>
                <div className="trust-card">
                  <span className="trust-icon"><ShieldCheck /></span>
                  <div>
                    <div className="trust-title">Global team</div>
                    <div className="trust-desc">Available across all timezones</div>
                  </div>
                </div>
                <div className="trust-card">
                  <span className="trust-icon"><Lock /></span>
                  <div>
                    <div className="trust-title">No obligation</div>
                    <div className="trust-desc">Cancel or reschedule free</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          
          /* CONFIRM SUCCESS SCREEN */
          <div className="success-screen">
            <div className="success-icon-wrap">
              <CheckCircle className="w-10 h-10 text-white" fill="var(--green)" />
            </div>
            
            <h2 className="success-title">
              You're all set! 🎉
            </h2>
            <p className="success-sub">
              A calendar invite and confirmation have been sent to your email. Our team is excited to connect with you.
            </p>
            
            <div className="success-details-card">
              <div className="success-card-title">
                Your booking
              </div>
              <div className="success-detail-row">
                <Zap />
                <span>{activeService?.name}</span>
              </div>
              <div className="success-detail-row">
                <Calendar />
                <span>
                  {selectedDate && `${months[selectedDate.month]} ${selectedDate.day}, ${selectedDate.year}`} at {selectedTime} ({selectedTimezone})
                </span>
              </div>
              <div className="success-detail-row">
                <User />
                <span>{name} · {email}</span>
              </div>
            </div>
            
            <div>
              <button
                onClick={handleResetForm}
                className="success-reset-btn"
              >
                Book another meeting
              </button>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default ScheduleMeeting;
