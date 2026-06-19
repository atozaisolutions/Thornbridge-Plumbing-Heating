import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  MapPin,
  Clock,
  Check,
  Droplet,
  Flame,
  ShieldCheck,
  Wrench,
  Leaf,
  MessageSquare,
  Menu,
  X,
  ChevronRight,
  Calculator,
  Award,
  AlertTriangle,
  Info
} from "lucide-react";

// Image Paths (standard ESM imports for local workspace assets to bundle nicely during build and export to GitHub)
import copperHeroImg from "./assets/images/copper_pipes_hero_1781824379875.jpg";
import boilerImg from "./assets/images/modern_boiler_heating_1781824390422.jpg";
import plumberImg from "./assets/images/friendly_plumber_1781824400466.jpg";
import serviceVanImg from "./assets/images/whitby_service_van_1781824815615.jpg";
import radiantHeatingImg from "./assets/images/radiant_floor_heating_1781824827092.jpg";
import brassSinkImg from "./assets/images/brass_sink_fitting_1781824839964.jpg";

// New premium realistic images
import plumberStewartImg from "./assets/images/master_plumber_stewart_1781825063262.jpg";
import backflowAssemblyImg from "./assets/images/backflow_valve_assembly_1781825075713.jpg";
import waterShutoffImg from "./assets/images/main_water_shutoff_1781825088368.jpg";
import ecoHeatRecoveryImg from "./assets/images/eco_heat_recovery_1781825099945.jpg";
import customerSupportImg from "./assets/images/durham_customer_support_1781825111730.jpg";
import bathroomLuxImg from "./assets/images/bathroom_lux_fixtures_1781825122510.jpg";

// Custom Brass Pipe-Fitting/Coupling-Joint Divider
export function PipeFittingDivider() {
  return (
    <div className="flex items-center justify-center my-16 md:my-24 px-4 overflow-hidden select-none">
      <div className="h-[2px] flex-grow max-w-[150px] md:max-w-[250px] bg-gradient-to-r from-transparent to-[#B08D57]" />
      <svg
        className="w-24 h-12 mx-4 text-[#B08D57] flex-shrink-0"
        viewBox="0 0 120 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Left Pipe Segment */}
        <rect x="5" y="17" width="25" height="6" fill="#B08D57" fillOpacity="0.4" />
        <line x1="5" y1="17" x2="30" y2="17" stroke="#B08D57" strokeWidth="2" />
        <line x1="5" y1="23" x2="30" y2="23" stroke="#B08D57" strokeWidth="2" />
        
        {/* Left Collar Fitting */}
        <rect x="30" y="11" width="7" height="18" rx="1" fill="#B08D57" stroke="#9A7742" strokeWidth="1" />
        
        {/* Central Hexagonal Coupling Nut */}
        <polygon points="44,5 76,5 82,20 76,35 44,35 38,20" fill="#B08D57" stroke="#8c6c3c" strokeWidth="2" />
        <circle cx="60" cy="20" r="4" fill="#F7F5F1" stroke="#8c6c3c" strokeWidth="1" />
        <line x1="60" y1="5" x2="60" y2="35" stroke="#9A7742" strokeWidth="1" strokeDasharray="3 2" />

        {/* Right Collar Fitting */}
        <rect x="83" y="11" width="7" height="18" rx="1" fill="#B08D57" stroke="#9A7742" strokeWidth="1" />
        
        {/* Right Pipe Segment */}
        <rect x="90" y="17" width="25" height="6" fill="#B08D57" fillOpacity="0.4" />
        <line x1="90" y1="17" x2="115" y2="17" stroke="#B08D57" strokeWidth="2" />
        <line x1="90" y1="23" x2="115" y2="23" stroke="#B08D57" strokeWidth="2" />
      </svg>
      <div className="h-[2px] flex-grow max-w-[150px] md:max-w-[250px] bg-gradient-to-l from-transparent to-[#B08D57]" />
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [activeNav, setActiveNav] = useState("home");
  
  // Rebate calculator state
  const [rebateSelections, setRebateSelections] = useState({
    backwaterValve: false,
    sumpPump: false,
    lowFlowToilet: false,
    boilerUpgrade: false,
    smartThermostat: false
  });

  // Contact Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    serviceType: "Plumbing Service",
    urgency: "Standard",
    message: ""
  });

  // Simple active nav highlighting based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const sections = [
        { id: "home", el: document.getElementById("home") },
        { id: "services", el: document.getElementById("services") },
        { id: "products", el: document.getElementById("products") },
        { id: "backflow", el: document.getElementById("backflow") },
        { id: "green-initiatives", el: document.getElementById("green-initiatives") },
        { id: "rebates-advice", el: document.getElementById("rebates-advice") },
        { id: "contact", el: document.getElementById("contact") }
      ];

      for (const section of sections) {
        if (section.el) {
          const top = section.el.offsetTop;
          const height = section.el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveNav(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleRebate = (key: keyof typeof rebateSelections) => {
    setRebateSelections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const calculateTotalRebate = () => {
    let total = 0;
    if (rebateSelections.backwaterValve) total += 3000; // Durham rebate covers up to $3000 max
    if (rebateSelections.sumpPump) total += 2000;       // Sump pump covers up to $2000 max
    if (rebateSelections.lowFlowToilet) total += 75;     // Regional standard toilet incentive
    if (rebateSelections.boilerUpgrade) total += 1600;   // Efficiency retrofit grants
    if (rebateSelections.smartThermostat) total += 100;  // Local utility rebate
    return total;
  };

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setFormSubmitted(true);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      serviceType: "Plumbing Service",
      urgency: "Standard",
      message: ""
    });
    setFormSubmitted(false);
  };

  // Localized Whitby / Durham advice items
  const adviceItems = [
    {
      id: "all",
      category: "Plumbing Tips",
      title: "Preventing Frozen Water Pipes in Ontario Winters",
      text: "Durham winters get bitterly cold. Ensure any water pipes in unheated crawl spaces are insulated. Keep your home thermodynamic controls set no lower than 15°C even when away, and locate your main valve shut-off so you can close it quickly in emergencies.",
      tags: ["Plumbing Prevention", "Winter Prep"]
    },
    {
      id: "heating",
      category: "Winter Heating",
      title: "Radiator Air Bleeding for Optimal Home Heating",
      text: "If your hot water radiators are warm at the bottom but freezing cold at the top, they have trapped air. Bleeding them using a standard brass radiator key resets circulation and optimizes heating. Do it annually before November.",
      tags: ["Heating Advise", "DIY Care"]
    },
    {
      id: "drainage",
      category: "Plumbing Tips",
      title: "Mitigating Spring Drainage Overload",
      text: "With heavy spring rains in Whitby, inspect your foundation drainage sumps. Ensure your outlet pipe directs water at least 2 meters away from your masonry wall, and never pipe storm run-off into your sanitary plumbing system.",
      tags: ["Drainage", "Storm Safety"]
    },
    {
      id: "backflow",
      category: "Backflow testing",
      title: "Durham Cross-Connection Survey Compliance",
      text: "Whitby municipal regulations require Durham commercial properties to complete a cross-connection hazard assessment survey every 5 years. Standard backflow assemblies must undergo annual verification by registered master plumbers.",
      tags: ["Rebates & Laws", "Backflow"]
    },
    {
      id: "green",
      category: "Green Initiatives",
      title: "The Thermodynamic Benefit of Condensing Boilers",
      text: "By upgrading an aged standard gas boiler (typically 65% efficiency) to a modern sealed-combustion condensing model, you capture thermal energy from exhaust water vapor. It lifts fuel utilization efficiency closer to 96% while reducing carbon emissions.",
      tags: ["Eco Solutions", "Condensing Boilers"]
    }
  ];

  const filteredAdvice = activeTab === "all" 
    ? adviceItems 
    : adviceItems.filter(item => item.id === activeTab || item.category.toLowerCase().includes(activeTab.toLowerCase()));

  // Smooth scroll handler
  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F1] text-[#22262E] font-sans antialiased selection:bg-[#B08D57]/30 selection:text-[#1B2A4A]">
      
      {/* STICKY HEADER */}
      <header id="header" className="sticky top-0 z-50 bg-[#1B2A4A] text-[#F7F5F1] border-b border-[#B08D57]/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 flex items-center justify-between">
          
          {/* Logo Brand Area */}
          <a 
            onClick={() => handleNavClick("home")} 
            className="flex items-center space-x-3 group cursor-pointer focus-visible:outline-none"
            aria-label="Thornbridge Plumbing & Heating Home"
          >
            {/* Custom stylized line art showing skyline and plumbing pipe fittings */}
            <div className="relative w-10 h-10 bg-gradient-to-tr from-[#B08D57] to-[#d6b785] rounded-lg flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-[#1B2A4A]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Visual symbol: structural pipe joint connecting two lines representing skyline */}
                <path d="M4 14h5v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 18v-4h5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="3" fill="#1B2A4A" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 4v5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#F7F5F1] border-2 border-[#1B2A4A] rounded-full flex items-center justify-center text-[8px] font-bold text-[#1B2A4A]">27</div>
            </div>
            <div>
              <div className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#F7F5F1] group-hover:text-[#B08D57] transition-colors">
                Thornbridge
              </div>
              <div className="text-[9px] sm:text-[10px] tracking-widest font-semibold uppercase text-[#B08D57] -mt-1">
                Plumbing & Heating
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-sm font-semibold tracking-wide" aria-label="Main navigation">
            <button 
              onClick={() => handleNavClick("services")} 
              className={`px-3 py-2 rounded transition-colors ${activeNav === "services" ? "text-[#B08D57]" : "text-gray-300 hover:text-white"}`}
            >
              Plumbing & Heating
            </button>
            <button 
              onClick={() => handleNavClick("services")} // Same section, targeted drainage details
              className="px-3 py-2 text-gray-300 hover:text-white rounded transition-colors"
            >
              Drainage & Water Lines
            </button>
            <button 
              onClick={() => handleNavClick("products")} 
              className={`px-3 py-2 rounded transition-colors ${activeNav === "products" ? "text-[#B08D57]" : "text-gray-300 hover:text-white"}`}
            >
              Products
            </button>
            <button 
              onClick={() => handleNavClick("backflow")} 
              className={`px-3 py-2 rounded transition-colors ${activeNav === "backflow" ? "text-[#B08D57]" : "text-gray-300 hover:text-white"}`}
            >
              Backflow Testing
            </button>
            <button 
              onClick={() => handleNavClick("green-initiatives")} 
              className={`px-3 py-2 rounded transition-colors ${activeNav === "green-initiatives" ? "text-[#B08D57]" : "text-gray-300 hover:text-white"}`}
            >
              Green Initiatives
            </button>
            <button 
              onClick={() => handleNavClick("rebates-advice")} 
              className={`px-3 py-2 rounded transition-colors ${activeNav === "rebates-advice" ? "text-[#B08D57]" : "text-gray-300 hover:text-white"}`}
            >
              City Rebates & Advice
            </button>
            <button 
              onClick={() => handleNavClick("contact")} 
              className={`px-3 py-2 rounded transition-colors ${activeNav === "contact" ? "text-[#B08D57]" : "text-gray-300 hover:text-white"}`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action Trigger Box */}
          <div className="hidden sm:flex items-center space-x-4">
            <a 
              href="tel:+19056682417"
              className="flex items-center space-x-2 bg-gradient-to-r from-[#B08D57] to-[#c2a16a] hover:from-[#9A7742] hover:to-[#B08D57] text-[#1B2A4A] hover:text-[#F7F5F1] font-bold py-2.5 px-4 rounded shadow-sm text-sm transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-center"
              id="header-cta-call"
            >
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>(905) 668-2417</span>
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-2 text-gray-300 hover:text-white focus:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-[#1B2A4A]/98 border-t border-[#B08D57]/20"
            >
              <div className="px-4 pt-3 pb-6 space-y-2 flex flex-col">
                <button 
                  onClick={() => handleNavClick("services")} 
                  className="w-full text-left py-2.5 px-3 rounded hover:bg-[#3D5A80]/30 text-[#F7F5F1] font-medium transition-colors"
                >
                  Plumbing & Heating
                </button>
                <button 
                  onClick={() => handleNavClick("services")} 
                  className="w-full text-left py-2.5 px-3 rounded hover:bg-[#3D5A80]/30 text-[#F7F5F1] font-medium transition-colors"
                >
                  Drainage & Water Lines
                </button>
                <button 
                  onClick={() => handleNavClick("products")} 
                  className="w-full text-left py-2.5 px-3 rounded hover:bg-[#3D5A80]/30 text-[#F7F5F1] font-medium transition-colors"
                >
                  Products
                </button>
                <button 
                  onClick={() => handleNavClick("backflow")} 
                  className="w-full text-left py-2.5 px-3 rounded hover:bg-[#3D5A80]/30 text-[#F7F5F1] font-medium transition-colors"
                >
                  Backflow Testing
                </button>
                <button 
                  onClick={() => handleNavClick("green-initiatives")} 
                  className="w-full text-left py-2.5 px-3 rounded hover:bg-[#3D5A80]/30 text-[#F7F5F1] font-medium transition-colors"
                >
                  Green Initiatives
                </button>
                <button 
                  onClick={() => handleNavClick("rebates-advice")} 
                  className="w-full text-left py-2.5 px-3 rounded hover:bg-[#3D5A80]/30 text-[#F7F5F1] font-medium transition-colors"
                >
                  City Rebates & Advice
                </button>
                <button 
                  onClick={() => handleNavClick("contact")} 
                  className="w-full text-left py-2.5 px-3 rounded hover:bg-[#3D5A80]/30 text-[#F7F5F1] font-medium transition-colors"
                >
                  Contact
                </button>
                
                <div className="pt-4 border-t border-[#B08D57]/20 flex flex-col space-y-3">
                  <a 
                    href="tel:+19056682417"
                    className="flex items-center justify-center space-x-2 bg-[#B08D57] text-[#1B2A4A] font-bold py-3 rounded text-center transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call (905) 668-2417</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section id="home" className="relative overflow-hidden pt-8 md:pt-16 pb-12 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Editorial Typographic Column (Left 5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 z-10">
            <div className="inline-flex items-center space-x-2 bg-[#1B2A4A] text-[#B08D57] font-mono text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full self-start shadow-sm border border-[#B08D57]/30">
              <Award className="w-3.5 h-3.5 text-[#B08D57]" />
              <span>EST. 1999 — 27 YEARS OF EXCELLENCE</span>
            </div>
            
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1B2A4A] leading-[1.15]">
              Old Fashioned Service <br/>
              <span className="text-[#B08D57] italic font-medium">in a Modern World</span>
            </h1>

            <p className="font-sans text-base sm:text-lg text-gray-700 leading-relaxed max-w-xl">
              Proudly serving Whitby, Brooklin, Oshawa, and across the Durham Region, Ontario. As a family-run business for 27 years, we mix time-tested craftsmanship with modern green plumbing innovations.
            </p>

            {/* Simple bullet trust highlights */}
            <ul className="text-sm text-gray-600 space-y-2 pt-2">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#B08D57] flex-shrink-0" />
                <span>Fully Licensed, Bonded, and Insured Master Plumbers</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#B08D57] flex-shrink-0" />
                <span>Durham Region Backflow Prevention Approved Tester</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#B08D57] flex-shrink-0" />
                <span>Emergency Local Callouts & Dedicated Advice Channel</span>
              </li>
            </ul>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-3">
              <button 
                onClick={() => handleNavClick("contact")}
                className="bg-[#1B2A4A] hover:bg-[#3D5A80] text-white font-semibold py-3 px-6 rounded shadow-md hover:shadow-lg transition-all text-center"
              >
                Request Local Service
              </button>
              <a 
                href="tel:+19056682417"
                className="flex items-center justify-center space-x-2 text-[#1B2A4A] hover:text-[#B08D57] border-2 border-[#1B2A4A]/20 hover:border-[#B08D57] font-semibold py-3 px-6 rounded transition-all text-center bg-white/50"
              >
                <Phone className="w-4.5 h-4.5" />
                <span>Direct Line: (905) 668-2417</span>
              </a>
            </div>
            
            {/* Quick stats panel */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#B08D57]/20 max-w-md">
              <div>
                <div className="font-serif text-2xl font-bold text-[#1B2A4A]">27+</div>
                <div className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold">Years Active</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-[#1B2A4A]">Whitby</div>
                <div className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold">Home Base</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-[#1B2A4A]">100%</div>
                <div className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold">Guaranteed</div>
              </div>
            </div>
          </div>

          {/* Asymmetric Image Grid (Right 7 Columns) with Floating Typographic Serif Plate */}
          <div className="lg:col-span-7 select-none relative">
            
            {/* Elegant Floating Serif Plate overlaying the grid */}
            <div className="absolute z-20 -top-4 -left-4 sm:-left-6 md:-left-8 bg-[#1B2A4A]/95 backdrop-blur-md border-2 border-[#B08D57] p-5 sm:p-6 rounded-lg shadow-2xl max-w-xs hidden sm:block transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <span className="font-mono text-[10px] text-[#B08D57] font-bold tracking-widest uppercase block mb-1">
                Local Trade Authority
              </span>
              <h3 className="font-serif text-xl font-semibold text-[#F7F5F1] leading-tight mb-2">
                "Old Fashioned Service <br/>
                <span className="text-[#B08D57] italic">in a Modern World"</span>
              </h3>
              <div className="h-[1px] w-12 bg-[#B08D57]/50 my-2" />
              <p className="text-xs text-gray-300 font-medium">
                Celebrating 27 Years supporting homeowners across Whitby and the Durham Region.
              </p>
            </div>

            <div className="grid grid-cols-12 gap-4">
              
              {/* Large Image Panel (one large panel) */}
              <div className="col-span-7 relative h-[300px] sm:h-[450px] overflow-hidden rounded-lg shadow-xl border-2 border-[#B08D57]/10">
                <img 
                  src={copperHeroImg} 
                  alt="Professional installation of copper water pipes with polished brass joints" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                  id="hero-img-large"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                
                {/* On-mobile fallback text overlay for the plate */}
                <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                  <span className="sm:hidden font-serif text-xs text-[#B08D57] block mb-0.5">Est. 1999 — 27 Years</span>
                  <div className="font-serif text-base sm:text-lg font-semibold tracking-wide text-[#F7F5F1]">Handcrafted Copper Layup</div>
                  <p className="text-[10px] sm:text-xs text-gray-200 mt-0.5 font-sans">Precision jointing built to stand the test of time</p>
                </div>
              </div>

              {/* Stacked smaller panels (two stacked smaller panels) */}
              <div className="col-span-5 flex flex-col justify-between h-[300px] sm:h-[450px] space-y-4">
                
                {/* Top Stacked Panel: Modern Boiler Heating */}
                <div className="h-1/2 relative overflow-hidden rounded-lg shadow-lg border-2 border-[#B08D57]/10 flex-grow">
                  <img 
                    src={boilerImg} 
                    alt="Precision hydronic boiler heating and utility layout installed neat on concrete wall" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                    id="hero-img-small-boiler"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B2A4A]/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-sm font-semibold font-serif text-[#F7F5F1]">Modern Heating</div>
                    <p className="text-[10px] text-gray-200 mt-0.5">High efficiency systems & manifolds</p>
                  </div>
                </div>

                {/* Bottom Stacked Panel: Professional Plumber */}
                <div className="h-1/2 relative overflow-hidden rounded-lg shadow-lg border-2 border-[#B08D57]/10 flex-grow">
                  <img 
                    src={plumberImg} 
                    alt="Friendly plumber in uniform representing local Durham service standards" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                    id="hero-img-small-plumber"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B2A4A]/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-sm font-semibold font-serif text-[#F7F5F1]">Whitby Trusted Team</div>
                    <p className="text-[10px] text-gray-200 mt-0.5">Family craftsmanship with a smile</p>
                  </div>
                </div>

              </div>
            </div>

            {/* A subtle absolute-positioned decorative badge on the bottom-right corner */}
            <div className="absolute -bottom-3 -right-3 z-20 bg-[#B08D57] text-[#1B2A4A] p-3 rounded-full shadow-lg border-2 border-[#F7F5F1] flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 select-none animate-bounce" style={{ animationDuration: '3s' }}>
              <span className="font-serif text-lg sm:text-2xl font-bold leading-none">27</span>
              <span className="text-[8px] uppercase tracking-wider font-bold text-center leading-none mt-0.5">Years <br />Local</span>
            </div>

          </div>
          
        </div>
      </section>

      {/* SIGNATURE ELEMENT - PIPE DIVIDER 1 */}
      <PipeFittingDivider />

      {/* TRUST BAND (Full-Width Dark Navy Section with Large Testimonial) */}
      <section className="bg-[#1B2A4A] text-[#F7F5F1] py-16 md:py-24 relative overflow-hidden border-y-2 border-[#B08D57]/20 shadow-inner">
        {/* Decorative background brass ring motif */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full border-[8px] border-[#B08D57]/5 pointer-events-none select-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full border-[8px] border-[#B08D57]/5 pointer-events-none select-none" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <svg 
            className="w-14 h-14 mx-auto text-[#B08D57] opacity-60 mb-6" 
            fill="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.851h5v10h-11zm-12 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.851h5v10h-11z" />
          </svg>
          
          <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl font-medium tracking-normal text-[#F7F5F1] leading-relaxed italic">
            "Thornbridge upgraded our boiler system in Brooklin and resolved a slow basement main line drain. The craftsmanship was absolutely beautiful — neatly aligned copper pipes, tidy manifolds, and honest, old-fashioned explanation. They left our basement cleaner than they found it."
          </blockquote>
          
          <div className="mt-8 flex flex-col items-center justify-center space-y-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#B08D57] shadow-xl bg-gray-200">
              <img 
                src={plumberStewartImg} 
                alt="Stewart MacAlister - Senior Registered Master Plumber of Thornbridge" 
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-[1.5px] bg-[#B08D57]" />
              <cite className="font-sans text-xs sm:text-sm md:text-base font-semibold text-[#B08D57] uppercase tracking-widest not-italic">
                Stewart MacAlister, Baldwin Street North, Whitby
              </cite>
              <div className="w-10 h-[1.5px] bg-[#B08D57]" />
            </div>
          </div>
          
          {/* Real community badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-12 text-xs font-mono uppercase tracking-widest text-indigo-200 opacity-80">
            <span className="flex items-center"><Check className="w-3.5 h-3.5 text-[#B08D57] mr-1" /> Serviced Brooklin / Port Perry</span>
            <span className="flex items-center"><Check className="w-3.5 h-3.5 text-[#B08D57] mr-1" /> Authorized Cross-Connection Team</span>
            <span className="flex items-center"><Check className="w-3.5 h-3.5 text-[#B08D57] mr-1" /> 27 Years Family Reputation</span>
          </div>
        </div>
      </section>

      {/* SERVICES STRIP SECTION (4-6 Service Cards with Brass Icon Accents) */}
      <section id="services" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#1B2A4A]">
            Complete Home Plumbing & Heating Services
          </h2>
          <div className="h-[2px] w-20 bg-[#B08D57] mx-auto mt-4 mb-5" />
          <p className="text-gray-600 leading-relaxed">
            From residential leak diagnosis to high-efficiency furnace retrofits, we execute every repair with trade integrity and professional licensing. No shortcuts.
          </p>
        </div>

        {/* 5 Rich, detailed Service Cards containing actual high-end trade project photography */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Plumbing Services */}
          <div className="bg-white rounded-lg border border-[#B08D57]/10 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 relative group flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#1B2A4A] group-hover:bg-[#B08D57] transition-all z-20" />
            <div>
              {/* Card Photo Header */}
              <div className="h-44 relative overflow-hidden bg-gray-100">
                <img 
                  src={brassSinkImg} 
                  alt="Premium brushed warm-brass faucet fitting installed on modern basin countertop" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-6 bg-[#1B2A4A] text-[#B08D57] p-2.5 rounded-lg border border-[#B08D57]/30 shadow">
                  <Wrench className="w-5 h-5 text-[#B08D57]" />
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <h3 className="font-serif text-xl font-bold text-[#1B2A4A] mb-3">Residential Plumbing</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  Complete sink assemblies, leak mitigation, luxury bath fittings, copper repiping, faucet retrofits, and reliable high-end repair craftsmanship.
                </p>
              </div>
            </div>
            <ul className="text-xs text-gray-500 space-y-2 px-6 md:px-8 pb-8 mt-auto">
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#B08D57] mr-2" /> Pipe leak and valve identification</li>
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#B08D57] mr-2" /> Fixture refurnishing & upgrades</li>
            </ul>
          </div>

          {/* Card 2: Hydronic & Furnace Heating */}
          <div className="bg-white rounded-lg border border-[#B08D57]/10 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 relative group flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#1B2A4A] group-hover:bg-[#B08D57] transition-all z-20" />
            <div>
              {/* Card Photo Header */}
              <div className="h-44 relative overflow-hidden bg-gray-100">
                <img 
                  src={boilerImg} 
                  alt="Precision hydronic boiler heating layups and copper manifolds" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-6 bg-[#1B2A4A] text-[#B08D57] p-2.5 rounded-lg border border-[#B08D57]/30 shadow">
                  <Flame className="w-5 h-5 text-[#B08D57]" />
                </div>
              </div>

              <div className="p-6 md:p-8">
                <h3 className="font-serif text-xl font-bold text-[#1B2A4A] mb-3">Hydronic Heating & Furnaces</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  Hydronic boiler care, radiation bleeding, pump balancing, furnace tune-ups, smart home safety, and emergency heating winter protection.
                </p>
              </div>
            </div>
            <ul className="text-xs text-gray-500 space-y-2 px-6 md:px-8 pb-8 mt-auto">
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#B08D57] mr-2" /> High efficiency boilers & radiators</li>
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#B08D57] mr-2" /> Boiler manifold & combustion audits</li>
            </ul>
          </div>

          {/* Card 3: Drainage & Water Lines */}
          <div className="bg-white rounded-lg border border-[#B08D57]/10 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 relative group flex flex-col justify-between" id="drainage">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#1B2A4A] group-hover:bg-[#B08D57] transition-all z-20" />
            <div>
              {/* Card Photo Header */}
              <div className="h-44 relative overflow-hidden bg-gray-100">
                <img 
                  src={waterShutoffImg} 
                  alt="Neat water main shutoff line with pristine brass gate valves and pressure gauge" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-6 bg-[#1B2A4A] text-[#B08D57] p-2.5 rounded-lg border border-[#B08D57]/30 shadow">
                  <Droplet className="w-5 h-5 text-[#B08D57]" />
                </div>
              </div>

              <div className="p-6 md:p-8">
                <h3 className="font-serif text-xl font-bold text-[#1B2A4A] mb-3">Drainage & Water Lines</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  Drain cleanouts, localized root extraction, sewer backwater valve compliance, sump pumps setup, and water service line assessment.
                </p>
              </div>
            </div>
            <ul className="text-xs text-gray-500 space-y-2 px-6 md:px-8 pb-8 mt-auto">
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#B08D57] mr-2" /> Mechanical root routing & video scoping</li>
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#B08D57] mr-2" /> Sump pump float & battery backup configuration</li>
            </ul>
          </div>

          {/* Card 4: Backflow Assembly Testing (Certified) */}
          <div className="bg-white rounded-lg border border-[#B08D57]/10 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 relative group flex flex-col justify-between" id="backflow">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#1B2A4A] group-hover:bg-[#B08D57] transition-all z-20" />
            <div>
              {/* Card Photo Header */}
              <div className="h-44 relative overflow-hidden bg-gray-100">
                <img 
                  src={backflowAssemblyImg} 
                  alt="Industrial double check backflow valve assembly in high-grade utility installation" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-6 bg-[#1B2A4A] text-[#B08D57] p-2.5 rounded-lg border border-[#B08D57]/30 shadow">
                  <ShieldCheck className="w-5 h-5 text-[#B08D57]" />
                </div>
              </div>

              <div className="p-6 md:p-8">
                <h3 className="font-serif text-xl font-bold text-[#1B2A4A] mb-3">Backflow Testing & Surveys</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  Official Durham Region Backflow hazard certifications. Device testing, hazard classifications, cross-connection surveys, and municipal form management.
                </p>
              </div>
            </div>
            <ul className="text-xs text-gray-500 space-y-2 px-6 md:px-8 pb-8 mt-auto">
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#B08D57] mr-2" /> Double check valve certifications</li>
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#B08D57] mr-2" /> Registered Durham City Master Plumber signature</li>
            </ul>
          </div>

          {/* Card 5: Green / Eco Solutions */}
          <div className="bg-white rounded-lg border border-[#B08D57]/10 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 relative group flex flex-col justify-between" id="green-initiatives">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#1B2A4A] group-hover:bg-[#B08D57] transition-all z-20" />
            <div>
              {/* Card Photo Header */}
              <div className="h-44 relative overflow-hidden bg-gray-100">
                <img 
                  src={ecoHeatRecoveryImg} 
                  alt="Ecological drainwater recycling heat capture coil tightly coiled on drain lines" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-6 bg-[#1B2A4A] text-[#B08D57] p-2.5 rounded-lg border border-[#B08D57]/30 shadow">
                  <Leaf className="w-5 h-5 text-[#B08D57]" />
                </div>
              </div>

              <div className="p-6 md:p-8">
                <h3 className="font-serif text-xl font-bold text-[#1B2A4A] mb-3">Green Eco Solutions</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  Water conservation advice, ultra-low flow toilet retrofit integration, drainwater heat recovery systems, and eco thermodynamic controls.
                </p>
              </div>
            </div>
            <ul className="text-xs text-gray-500 space-y-2 px-6 md:px-8 pb-8 mt-auto">
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#B08D57] mr-2" /> Smart thermostatic flow integration</li>
              <li className="flex items-center"><Check className="w-3.5 h-3.5 text-[#B08D57] mr-2" /> Heat recapture plumbing upgrades</li>
            </ul>
          </div>

          {/* Card 6: Emergency Care Spot — with local office controller image background */}
          <div className="bg-[#1B2A4A] text-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between border-2 border-[#B08D57]/30 relative group">
            
            {/* Soft dark layered backdrop on top of support representative */}
            <div className="absolute inset-0 bg-[#1B2A4A]/92 z-10 transition-opacity duration-500 group-hover:bg-[#1B2A4A]/85" />
            <img 
              src={customerSupportImg} 
              alt="Friendly Thornbridge office service manager on the phone to schedule support layout" 
              className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-1000 group-hover:scale-105 pointer-events-none"
              referrerPolicy="no-referrer"
            />

            <div className="p-6 md:p-8 relative z-20">
              <div className="flex items-center space-x-2 text-[#B08D57] mb-6">
                <Clock className="w-6 h-6 shrink-0" />
                <span className="font-mono text-xs uppercase font-bold tracking-widest">24/7 Priority Emergency Line</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#F7F5F1] mb-3">Leak or Heat Outage Emergency?</h3>
              <p className="text-xs text-indigo-100 leading-relaxed mb-6 font-sans">
                If copper lines fail, gas valves freeze, or main water pipes back up, Durham Region families can reach our Whitby operators direct. We keep high-priority slots reserved for active emergencies.
              </p>
            </div>
            
            <div className="p-6 md:p-8 mt-auto pt-4 relative z-20">
              <a 
                href="tel:+19056682417"
                className="w-full inline-flex items-center justify-center space-x-2 bg-[#B08D57] hover:bg-white text-[#1B2A4A] font-bold py-3.5 px-5 rounded text-sm transition-all shadow-md group-hover:shadow-[#B08D57]/20"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>Call Emergency Coordinator</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* LOCAL CRAFTSMANSHIP SHOWCASE */}
      <section className="bg-gradient-to-b from-[#F7F5F1] to-white py-16 md:py-24 border-t border-[#B08D57]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
            <div className="lg:col-span-6">
              <span className="text-xs font-mono font-bold tracking-widest text-[#B08D57] uppercase block mb-2">
                Proven Local Excellence
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#1B2A4A] leading-tight">
                Our Gallery of Plumbing & Heating Craftsmanship
              </h2>
              <div className="h-[2px] w-20 bg-[#B08D57] mt-4" />
            </div>
            <div className="lg:col-span-6 lg:border-l lg:border-[#B08D57]/30 lg:pl-8">
              <p className="text-sm text-gray-600 leading-relaxed max-w-xl font-sans">
                We believe true trade work is an art form. From symmetrical boiler manifolds to master bathroom fixture setups, explore actual images of our family tradesmen supporting homeowners across Whitby and Durham Region.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Gallery Item 1 */}
            <div className="bg-[#F7F5F1] rounded-xl overflow-hidden shadow-md border border-[#B08D57]/10 flex flex-col justify-between group">
              <div className="relative h-64 md:h-72 overflow-hidden bg-gray-100">
                <img 
                  src={serviceVanImg} 
                  alt="Thornbridge service operations van parked on driveway ready for plumbing support" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 animate-fade-in"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-[#1B2A4A] text-[#B08D57] font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow">
                  Whitby Operations
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1B2A4A] mb-2">Prompt Service Vans</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans">
                    Our service vehicles are fully stocked and active daily inside Whitby, Brooklin, Oshawa, and Port Perry, ensuring standard repair calls have direct access to necessary brass replacement fittings immediately.
                  </p>
                </div>
              </div>
            </div>

            {/* Gallery Item 2 */}
            <div className="bg-[#F7F5F1] rounded-xl overflow-hidden shadow-md border border-[#B08D57]/10 flex flex-col justify-between group">
              <div className="relative h-64 md:h-72 overflow-hidden bg-gray-100">
                <img 
                  src={radiantHeatingImg} 
                  alt="Symmetrical hydronic radiant floor heating pipes layout before concrete pouring" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 animate-fade-in"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-[#1B2A4A] text-[#B08D57] font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow">
                  Green Initiatives
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1B2A4A] mb-2">Hydronic Radiant Slabs</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans">
                    Precision hydronic circuit layup delivers silent, highly-efficient radiant floor thermodynamic heating. Engineered to lower home heating carbon footprints by conserving thermal backflow dynamics.
                  </p>
                </div>
              </div>
            </div>

            {/* Gallery Item 3 */}
            <div className="bg-[#F7F5F1] rounded-xl overflow-hidden shadow-md border border-[#B08D57]/10 flex flex-col justify-between group">
              <div className="relative h-64 md:h-72 overflow-hidden bg-gray-100">
                <img 
                  src={brassSinkImg} 
                  alt="Premium brushed warm-brass basin mixer tap plumbing on elegant white Carrara marble" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 animate-fade-in"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-[#1B2A4A] text-[#B08D57] font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow">
                  Luxury Fitting
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1B2A4A] mb-2">High-End Residential Piping</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans">
                    Flawless brass vessel tapware integration over beautiful marble basins. Designed to secure solid flow boundaries without microscopic thread decay or dripping.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="products" className="py-16 md:py-24 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Editorial Product Text */}
            <div className="lg:col-span-5 space-y-6">
              <div className="text-xs font-mono font-bold tracking-widest text-[#B08D57] uppercase">Premium Brands & hardware</div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#1B2A4A]">
                Recommended Plumbing & Heating Products
              </h2>
              <div className="h-[2.5px] w-16 bg-[#B08D57]" />
              <p className="text-gray-600 leading-relaxed">
                As registered expert technicians, we refuse to install sub-par, flimsy hardware. Over 27 years, we have vetted the most robust boiler systems, backflow hardware, and smart water devices for Ontario's pressure fluctuations.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-[#1B2A4A] text-[#B08D57] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</div>
                  <div>
                    <h4 className="font-bold text-[#1B2A4A] text-sm">Viessmann & Bosch Condensing Boilers</h4>
                    <p className="text-xs text-gray-500">Industry-leading thermal heat capture with a 10-year manufacturer heat exchanger warranty.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-[#1B2A4A] text-[#B08D57] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
                  <div>
                    <h4 className="font-bold text-[#1B2A4A] text-sm">Moen & GROHE Eco-Flow Controls</h4>
                    <p className="text-xs text-gray-500">Premium brass valves and solid-metal internal fittings, preventing seal decay.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-[#1B2A4A] text-[#B08D57] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</div>
                  <div>
                    <h4 className="font-bold text-[#1B2A4A] text-sm">Watts Backflow Preventers</h4>
                    <p className="text-xs text-gray-500">High-grade double check assembly built for quick winter isolation and clean air injection.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Grid detailing our vetted products */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 bg-[#1B2A4A]/5 text-[#1B2A4A] rounded-full">Boilers</span>
                    <span className="text-xs text-green-600 font-semibold flex items-center"><Leaf className="w-3 h-3 mr-1" /> Premium Eco</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#1B2A4A]">High-Efficiency Boilers</h4>
                  <p className="text-xs text-gray-500 leading-relaxed mt-2">
                    Advanced hydronic layouts featuring stainless steel matrix heat exchange cylinders. Standard certified installation.
                  </p>
                </div>
                <div className="mt-6 border-t border-gray-100 pt-4 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">Installed Lifetime</span>
                  <span className="text-xs font-bold text-[#B08D57]">20+ Years</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 bg-[#1B2A4A]/5 text-[#1B2A4A] rounded-full">Flow Meters</span>
                    <span className="text-xs text-[#B08D57] font-semibold flex items-center"><Calculator className="w-3 h-3 mr-1" /> Smart Utility</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#1B2A4A]">Smart Thermostats & Leak Guards</h4>
                  <p className="text-xs text-gray-500 leading-relaxed mt-2">
                    Remotely monitor pipes for microscopic pressure drops. Automatic shut-off valves stops water catastrophic failures.
                  </p>
                </div>
                <div className="mt-6 border-t border-gray-100 pt-4 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">Rebate Eligible</span>
                  <span className="text-xs font-bold text-[#B08D57]">Yes ($100 Utility)</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 bg-[#1B2A4A]/5 text-[#1B2A4A] rounded-full">Drains</span>
                    <span className="text-xs text-blue-600 font-semibold flex items-center"><Info className="w-3 h-3 mr-1" /> Protection</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#1B2A4A]">Durham Sanitary Sewage Valves</h4>
                  <p className="text-xs text-gray-500 leading-relaxed mt-2">
                    Cast iron and brass heavy-duty sanitary backwater valves. Designed for deep municipal sewer line bypass.
                  </p>
                </div>
                <div className="mt-6 border-t border-gray-100 pt-4 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">Durham Subsidy</span>
                  <span className="text-xs font-bold text-green-600">Up to $3,000 Paid</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 bg-[#1B2A4A]/5 text-[#1B2A4A] rounded-full">Taps</span>
                    <span className="text-xs text-gray-400 font-semibold">Reliable Brass</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#1B2A4A]">Vandal-Proof Backflow Caps</h4>
                  <p className="text-xs text-gray-500 leading-relaxed mt-2">
                    Professional vacuum breakers protecting tap threads against cross connection contamination in commercial setups.
                  </p>
                </div>
                <div className="mt-6 border-t border-gray-100 pt-4 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">Annual Testing</span>
                  <span className="text-xs font-bold text-[#B08D57]">Certifiable</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SIGNATURE ELEMENT - PIPE DIVIDER 2 */}
      <PipeFittingDivider />

      {/* CITY REBATES & HELPFUL ADVICE SECTION */}
      <section id="rebates-advice" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#1B2A4A]">
            City Rebates & Trade Advice Workspace
          </h2>
          <div className="h-[2px] w-20 bg-[#B08D57] mx-auto mt-4 mb-5" />
          <p className="text-gray-600 leading-relaxed font-sans">
            Navigating local municipal subsidies can save a family thousands. Check your Durham Region eligibility below and explore our master plumber advice database.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Interactive Calculator (Left 5 Columns) */}
          <div className="lg:col-span-5 bg-white rounded-lg p-6 md:p-8 shadow-md border border-[#B08D57]/20 relative">
            <div className="absolute top-4 right-4 text-[#B08D57]">
              <Calculator className="w-6 h-6" />
            </div>
            
            <h3 className="font-serif text-2xl font-bold text-[#1B2A4A] mb-4">
              Durham Subsidy Tally
            </h3>
            
            <p className="text-xs text-gray-500 leading-relaxed mb-6">
              The Region of Durham offers several grants to protect homes against sanitary backing flooding and save water. Toggle items you planned to service to calculate potential rebates:
            </p>

            <div className="space-y-4">
              
              {/* Valve */}
              <div 
                onClick={() => toggleRebate("backwaterValve")}
                className={`p-3.5 rounded border transition-all cursor-pointer flex items-center justify-between ${rebateSelections.backwaterValve ? "bg-[#1B2A4A]/5 border-[#B08D57]" : "border-gray-200 hover:border-gray-300"}`}
              >
                <div>
                  <div className="font-bold text-sm text-[#1B2A4A]">Sanitary Backwater Valve</div>
                  <p className="text-[10px] text-gray-500">Durham Region basement flood preventative grant</p>
                </div>
                <div className="font-mono text-sm font-bold text-[#B08D57] flex items-center">
                  <span>+$3,000 max</span>
                  <div className={`w-4 h-4 rounded ml-2.5 border flex items-center justify-center ${rebateSelections.backwaterValve ? "bg-[#B08D57] border-[#B08D57] text-white" : "border-gray-300"}`}>
                    {rebateSelections.backwaterValve && <Check className="w-3 h-3" />}
                  </div>
                </div>
              </div>

              {/* Sump Pump */}
              <div 
                onClick={() => toggleRebate("sumpPump")}
                className={`p-3.5 rounded border transition-all cursor-pointer flex items-center justify-between ${rebateSelections.sumpPump ? "bg-[#1B2A4A]/5 border-[#B08D57]" : "border-gray-200 hover:border-gray-300"}`}
              >
                <div>
                  <div className="font-bold text-sm text-[#1B2A4A]">Foundation Isolation Sump Pump</div>
                  <p className="text-[10px] text-gray-500">Durham Storm runoff protection subsidy</p>
                </div>
                <div className="font-mono text-sm font-bold text-[#B08D57] flex items-center">
                  <span>+$2,000 max</span>
                  <div className={`w-4 h-4 rounded ml-2.5 border flex items-center justify-center ${rebateSelections.sumpPump ? "bg-[#B08D57] border-[#B08D57] text-white" : "border-gray-300"}`}>
                    {rebateSelections.sumpPump && <Check className="w-3 h-3" />}
                  </div>
                </div>
              </div>

              {/* Low Flow Toilet */}
              <div 
                onClick={() => toggleRebate("lowFlowToilet")}
                className={`p-3.5 rounded border transition-all cursor-pointer flex items-center justify-between ${rebateSelections.lowFlowToilet ? "bg-[#1B2A4A]/5 border-[#B08D57]" : "border-gray-200 hover:border-gray-300"}`}
              >
                <div>
                  <div className="font-bold text-sm text-[#1B2A4A]">Ultra-Low Flow Toilets</div>
                  <p className="text-[10px] text-gray-500">Standard water reduction program rebate</p>
                </div>
                <div className="font-mono text-sm font-bold text-[#B08D57] flex items-center">
                  <span>+$75 each</span>
                  <div className={`w-4 h-4 rounded ml-2.5 border flex items-center justify-center ${rebateSelections.lowFlowToilet ? "bg-[#B08D57] border-[#B08D57] text-white" : "border-gray-300"}`}>
                    {rebateSelections.lowFlowToilet && <Check className="w-3 h-3" />}
                  </div>
                </div>
              </div>

              {/* Boiler Retrofits */}
              <div 
                onClick={() => toggleRebate("boilerUpgrade")}
                className={`p-3.5 rounded border transition-all cursor-pointer flex items-center justify-between ${rebateSelections.boilerUpgrade ? "bg-[#1B2A4A]/5 border-[#B08D57]" : "border-gray-200 hover:border-gray-300"}`}
              >
                <div>
                  <div className="font-bold text-sm text-[#1B2A4A]">Energy-Smart Boiler Retrofit</div>
                  <p className="text-[10px] text-gray-500">Ontario thermodynamic carbon incentive support</p>
                </div>
                <div className="font-mono text-sm font-bold text-[#B08D57] flex items-center">
                  <span>+$1,600 max</span>
                  <div className={`w-4 h-4 rounded ml-2.5 border flex items-center justify-center ${rebateSelections.boilerUpgrade ? "bg-[#B08D57] border-[#B08D57] text-white" : "border-gray-300"}`}>
                    {rebateSelections.boilerUpgrade && <Check className="w-3 h-3" />}
                  </div>
                </div>
              </div>

              {/* Smart Thermostat */}
              <div 
                onClick={() => toggleRebate("smartThermostat")}
                className={`p-3.5 rounded border transition-all cursor-pointer flex items-center justify-between ${rebateSelections.smartThermostat ? "bg-[#1B2A4A]/5 border-[#B08D57]" : "border-gray-200 hover:border-gray-300"}`}
              >
                <div>
                  <div className="font-bold text-sm text-[#1B2A4A]">Smart Utilities Thermostat</div>
                  <p className="text-[10px] text-gray-500">Enbridge utility thermal optimization rebate</p>
                </div>
                <div className="font-mono text-sm font-bold text-[#B08D57] flex items-center">
                  <span>+$100 card</span>
                  <div className={`w-4 h-4 rounded ml-2.5 border flex items-center justify-center ${rebateSelections.smartThermostat ? "bg-[#B08D57] border-[#B08D57] text-white" : "border-gray-300"}`}>
                    {rebateSelections.smartThermostat && <Check className="w-3 h-3" />}
                  </div>
                </div>
              </div>

            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500 font-semibold uppercase">Total Estimated Savings</div>
                <div className="font-serif text-3xl font-bold text-[#1B2A4A] mt-1">
                  ${calculateTotalRebate().toLocaleString()} CAD
                </div>
              </div>
              <button 
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    message: `Hi, I worked through your Rebates Calculator and I'm interested in: ${
                      [
                        rebateSelections.backwaterValve ? "Backwater Valve" : "",
                        rebateSelections.sumpPump ? "Sump Pump" : "",
                        rebateSelections.lowFlowToilet ? "Toilet Retrofit" : "",
                        rebateSelections.boilerUpgrade ? "Boiler Upgrade" : "",
                        rebateSelections.smartThermostat ? "Smart Thermostat" : ""
                      ].filter(Boolean).join(", ")
                    }. Please send information regarding Durham Region processing.`
                  }));
                  handleNavClick("contact");
                }}
                className="bg-[#1B2A4A] hover:bg-[#3D5A80] text-[#F7F5F1] font-semibold text-xs py-3 px-4 rounded transition-all shadow-sm shrink-0"
              >
                Apply for Subsidies
              </button>
            </div>
            
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded text-[10px] text-yellow-800 leading-relaxed flex items-start space-x-2">
              <AlertTriangle className="w-4.5 h-4.5 text-yellow-600 shrink-0 mt-0.5" />
              <span>
                <strong>Note:</strong> Some of these programs require municipal approval parameters before installation works. Contact us as fully licensed master plumbers to coordinate required paperwork!
              </span>
            </div>

          </div>

          {/* Trade Advice / Knowledgebase (Right 7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Category tabs */}
            <div className="flex border-b border-gray-200">
              <button 
                onClick={() => setActiveTab("all")}
                className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${activeTab === "all" ? "border-[#B08D57] text-[#1B2A4A]" : "border-transparent text-gray-400 hover:text-gray-600"}`}
              >
                All Advice
              </button>
              <button 
                onClick={() => setActiveTab("heating")}
                className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${activeTab === "heating" ? "border-[#B08D57] text-[#1B2A4A]" : "border-transparent text-gray-400 hover:text-gray-600"}`}
              >
                Heating
              </button>
              <button 
                onClick={() => setActiveTab("drainage")}
                className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${activeTab === "drainage" ? "border-[#B08D57] text-[#1B2A4A]" : "border-transparent text-gray-400 hover:text-gray-600"}`}
              >
                Drainage
              </button>
              <button 
                onClick={() => setActiveTab("backflow")}
                className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${activeTab === "backflow" ? "border-[#B08D57] text-[#1B2A4A]" : "border-transparent text-gray-400 hover:text-gray-600"}`}
              >
                Backflow
              </button>
              <button 
                onClick={() => setActiveTab("green")}
                className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${activeTab === "green" ? "border-[#B08D57] text-[#1B2A4A]" : "border-transparent text-gray-400 hover:text-gray-600"}`}
              >
                Green Options
              </button>
            </div>

            {/* Advice entries */}
            <div className="space-y-6 max-h-[580px] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {filteredAdvice.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="p-5 bg-white rounded-lg border border-gray-100 hover:border-gray-200 shadow-sm transition-all"
                  >
                    <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#B08D57] mb-2">
                      <span className="uppercase">{item.category}</span>
                      <span>•</span>
                      <span className="text-gray-400">Durham Approved advice</span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-[#1B2A4A] mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.text}</p>

                    <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                      <div className="flex space-x-1.5">
                        {item.tags.map(tag => (
                          <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">#{tag}</span>
                        ))}
                      </div>
                      <button 
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            message: `I read your trade guide about "${item.title}" and would like assistance or a preventative checkup in Whitby/Durham region.`
                          }));
                          handleNavClick("contact");
                        }}
                        className="text-xs font-bold text-[#1B2A4A] hover:text-[#B08D57] inline-flex items-center space-x-1"
                      >
                        <span>Request Service For This</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* SIGNATURE ELEMENT - PIPE DIVIDER 3 */}
      <PipeFittingDivider />

      {/* CONTACT & RESERVATION SECTION */}
      <section id="contact" className="bg-[#1B2A4A] text-[#F7F5F1] py-16 md:py-24 relative overflow-hidden border-t-2 border-[#B08D57]/30">
        
        {/* Left background graphics */}
        <div className="absolute left-0 bottom-0 top-0 w-1/3 bg-[#3D5A80]/5 pointer-events-none skew-x-12 select-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Contact Info Deck */}
            <div className="lg:col-span-5 space-y-8">
              
              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-[#B08D57] uppercase">Family Service Desk</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-white mt-2">
                  Talk with Our Family Tradesmen
                </h2>
                <div className="h-[2px] w-14 bg-[#B08D57] mt-4 mb-5" />
                <p className="text-gray-300 leading-relaxed text-sm">
                  We don't use sales dispatch scripts. When you call, you speak directly with local veteran plumbers who know the soil, plumbing pressures, municipal standards, and winter parameters of Whitby and the Durham region.
                </p>
              </div>

              {/* Classic credentials list */}
              <div className="space-y-6">
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[#3D5A80]/40 rounded flex items-center justify-center shrink-0 border border-[#B08D57]/30 text-[#B08D57]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#F7F5F1] text-sm">Telephone Line</h4>
                    <p className="text-xs text-gray-300 mt-1">Direct to master technician desk:</p>
                    <a href="tel:+19056682417" className="font-serif text-xl font-bold text-[#B08D57] hover:underline mt-0.5 block">
                      (905) 668-2417
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[#3D5A80]/40 rounded flex items-center justify-center shrink-0 border border-[#B08D57]/30 text-[#B08D57]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#F7F5F1] text-sm">Service Territories</h4>
                    <p className="text-xs text-gray-300 mt-1">Based in Whitby, serving Durham Region:</p>
                    <p className="text-sm font-semibold text-[#B08D57] mt-1">
                      Whitby, Brooklin, Oshawa, Ajax, Pickering, Port Perry, & Uxbridge
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[#3D5A80]/40 rounded flex items-center justify-center shrink-0 border border-[#B08D57]/30 text-[#B08D57]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#F7F5F1] text-sm">Support Hours</h4>
                    <p className="text-xs text-gray-300 mt-1">Our family desk answers calls:</p>
                    <p className="text-sm font-semibold text-white mt-1">
                      Mon – Fri: 7:00 AM – 6:00 PM <br/>
                      Sat: 8:00 AM – 2:00 PM <br/>
                      <span className="text-[#B08D57] font-bold">24/7 For Verified Emergency Dials</span>
                    </p>
                  </div>
                </div>

              </div>

              {/* Decorative Map / Territory Boundaries Presentation */}
              <div className="bg-[#15213b] p-5 rounded border border-[#B08D57]/20 relative overflow-hidden">
                <div className="absolute top-2 right-3 flex items-center space-x-1.5 text-[#B08D57] text-[10px] uppercase tracking-wider font-mono">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span>Active Durham Duty</span>
                </div>
                
                <h5 className="font-serif text-sm font-bold text-white mb-2">Region of Durham Boundary Notice</h5>
                <p className="text-[11px] text-gray-400 leading-relaxed mb-4">
                  We are certified under municipal authority for all major utility connections inside Durham pipelines, guaranteeing compliant hazard inspections and full rebate tracking support.
                </p>
                
                <div className="h-28 bg-[#1B2A4A] rounded border border-gray-850 flex items-center justify-center text-center p-3">
                  <div className="space-y-1">
                    <MapPin className="w-5 h-5 text-[#B08D57] mx-auto animate-bounce" />
                    <p className="text-xs font-semibold text-gray-300 font-mono">Thornbridge central depot:</p>
                    <p className="text-[10px] text-gray-400">Dundas Street West, Whitby, ON</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Interactive Registration Form (Right 7 Columns) */}
            <div className="lg:col-span-7 bg-white text-[#22262E] rounded-lg p-6 md:p-8 shadow-xl border border-[#B08D57]/20 relative">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1B2A4A] via-[#B08D57] to-[#1B2A4A] rounded-t-lg" />
              
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form 
                    key="registration-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleFormSubmit} 
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-[#1B2A4A] mb-1">
                        Request Family Maintenance Or Advice
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Complete the direct form below. Our veteran plumbing master will review your notes and telephone you within 15 minutes during standard operational hours.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Name */}
                      <div>
                        <label htmlFor="form-name" className="block text-xs font-bold text-[#1B2A4A] uppercase tracking-wider mb-1.5">
                          Full Name *
                        </label>
                        <input 
                          type="text" 
                          id="form-name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleFormInputChange}
                          placeholder="Stewart MacAlister"
                          className="w-full text-sm p-2.5 rounded border border-gray-300 focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57] focus:outline-none bg-gray-50"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="form-phone" className="block text-xs font-bold text-[#1B2A4A] uppercase tracking-wider mb-1.5">
                          Telephone Number *
                        </label>
                        <input 
                          type="tel" 
                          id="form-phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleFormInputChange}
                          placeholder="(905) 555-0123"
                          className="w-full text-sm p-2.5 rounded border border-gray-300 focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57] focus:outline-none bg-gray-50"
                        />
                      </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Email */}
                      <div>
                        <label htmlFor="form-email" className="block text-xs font-bold text-[#1B2A4A] uppercase tracking-wider mb-1.5">
                          Email Address
                        </label>
                        <input 
                          type="email" 
                          id="form-email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormInputChange}
                          placeholder="customer@durhamhome.ca"
                          className="w-full text-sm p-2.5 rounded border border-gray-300 focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57] focus:outline-none bg-gray-50"
                        />
                      </div>

                      {/* Service Category */}
                      <div>
                        <label htmlFor="form-serviceType" className="block text-xs font-bold text-[#1B2A4A] uppercase tracking-wider mb-1.5">
                          Service Required
                        </label>
                        <select 
                          id="form-serviceType"
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleFormInputChange}
                          className="w-full text-sm p-2.5 rounded border border-gray-300 focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57] focus:outline-none bg-gray-50 text-gray-700"
                        >
                          <option>Plumbing Service</option>
                          <option>Hydronic / Radiator Heating</option>
                          <option>Drainage & Sewer lines</option>
                          <option>Backflow Prevention Test</option>
                          <option>Eco / Carbon Retrofits</option>
                          <option>Immediate Leak Assist</option>
                        </select>
                      </div>

                    </div>

                    {/* Address & Urgency Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      
                      <div className="sm:col-span-2">
                        <label htmlFor="form-address" className="block text-xs font-bold text-[#1B2A4A] uppercase tracking-wider mb-1.5">
                          Street Address / Town
                        </label>
                        <input 
                          type="text" 
                          id="form-address"
                          name="address"
                          value={formData.address}
                          onChange={handleFormInputChange}
                          placeholder="122 Baldwin St N, Brooklin"
                          className="w-full text-sm p-2.5 rounded border border-gray-300 focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57] focus:outline-none bg-gray-50"
                        />
                      </div>

                      <div>
                        <label htmlFor="form-urgency" className="block text-xs font-bold text-[#1B2A4A] uppercase tracking-wider mb-1.5">
                          Priority Urgency
                        </label>
                        <select 
                          id="form-urgency"
                          name="urgency"
                          value={formData.urgency}
                          onChange={handleFormInputChange}
                          className="w-full text-sm p-2.5 rounded border border-gray-300 focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57] focus:outline-none bg-gray-50 text-gray-700 font-semibold"
                        >
                          <option>Standard</option>
                          <option>Next Day Priority</option>
                          <option className="text-red-600 font-bold">Active Leak / Emergency</option>
                        </select>
                      </div>

                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="form-message" className="block text-xs font-bold text-[#1B2A4A] uppercase tracking-wider mb-1.5">
                        Describe What's Happening *
                      </label>
                      <textarea 
                        id="form-message"
                        name="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleFormInputChange}
                        placeholder="Please describe radiator symptoms, pipe locations, backflow survey compliance tags or water meter anomalies..."
                        className="w-full text-sm p-2.5 rounded border border-gray-300 focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57] focus:outline-none bg-gray-50"
                      />
                    </div>

                    {/* Urgency Trigger Warning */}
                    {formData.urgency.includes("Emergency") && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-800 leading-relaxed flex items-center space-x-2">
                        <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                        <span>
                          <strong>Emergency Warning:</strong> For active high-pressure pipe ruptures, please dial us immediately at <a href="tel:+19056682417" className="underline font-bold text-red-900">(905) 668-2417</a> instead of waiting for form responses! Use your master water supply valve to isolate the supply if safe.
                        </span>
                      </div>
                    )}

                    <div className="pt-2">
                      <button 
                        type="submit"
                        className="w-full bg-[#1B2A4A] hover:bg-[#3D5A80] text-white font-bold py-3.5 px-6 rounded shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <MessageSquare className="w-4.5 h-4.5 shrink-0" />
                        <span>Dispatch Maintenance Request</span>
                      </button>
                    </div>

                    <div className="text-[11px] text-gray-500 text-center leading-relaxed">
                      By submitting this form, you authorize our family team to contact you via telephone to discuss hardware diagnostics. Your data is stored locally and never distributed. Est. 1999.
                    </div>

                  </motion.form>
                ) : (
                  <motion.div 
                    key="submission-success"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="py-12 px-4 text-center space-y-6"
                  >
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto border-2 border-green-500 shadow-sm animate-pulse">
                      <Check className="w-8 h-8" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-serif text-2xl font-bold text-[#1B2A4A]">Request Dispatched Successfully!</h4>
                      <p className="text-sm text-gray-600 max-w-md mx-auto">
                        Hi <strong>{formData.name}</strong>, we have received your ticket for <strong>{formData.serviceType}</strong> ({formData.urgency} Urgency). 
                      </p>
                    </div>

                    <div className="p-4 bg-[#F7F5F1] rounded-lg inline-block max-w-sm text-left border border-[#B08D57]/30 text-xs text-gray-600 space-y-2 font-mono">
                      <div className="flex justify-between"><strong>Inbound Contact</strong> <span>{formData.phone}</span></div>
                      <div className="flex justify-between"><strong>Target Territory</strong> <span>{formData.address || "Whitby"}</span></div>
                      <div className="flex justify-between"><strong>Est. Callback Time</strong> <span className="text-[#B08D57] font-bold">Within 15 Min</span></div>
                    </div>

                    <p className="text-xs text-gray-500 leading-relaxed max-w-md mx-auto">
                      A senior licensed plumber has been paged with your system descriptions. Please keep your telephone lines open. We are looking forward to helping!
                    </p>

                    <div className="pt-4">
                      <button 
                        onClick={resetForm}
                        className="text-xs font-bold text-[#1B2A4A] hover:text-[#B08D57] border border-[#1B2A4A]/25 rounded py-2 px-4 hover:border-[#B08D57]"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1B2A4A] text-gray-400 text-sm border-t border-[#B08D57]/30 relative">
        
        {/* Decorative thin Brass divider line at the absolute top of container */}
        <div className="h-[2px] bg-[#B08D57] w-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12">
            
            {/* Logo area */}
            <div className="lg:col-span-4 space-y-4">
              <a 
                onClick={() => handleNavClick("home")} 
                className="flex items-center space-x-2 cursor-pointer focus-visible:outline-none"
              >
                <div className="w-8 h-8 bg-[#B08D57] rounded flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#1B2A4A]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="4" fill="currentColor"/>
                    <path d="M12 2v4M12 18v4M2 12h4m12 0h4" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <span className="font-serif text-lg font-bold text-[#F7F5F1]">Thornbridge</span>
                  <div className="text-[8px] tracking-widest font-bold uppercase text-[#B08D57] -mt-1">Plumbing & Heating</div>
                </div>
              </a>
              <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
                A family-owned trade specialist serving families and small businesses across Ontario's Durham Region since Est. 1999. Crafted on foundations of trust, licensed plumbing mastery, and old-fashioned trade pride.
              </p>
              <div className="text-xs text-[#B08D57] font-semibold">
                Licensed Master Plumber Lic #27-5645T
              </div>
            </div>

            {/* Quick Link categories */}
            <div className="lg:col-span-2.5 space-y-3">
              <h4 className="font-bold text-white text-xs uppercase tracking-widest">Our Operations</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => handleNavClick("services")} className="hover:text-white transition-colors">Residential Plumbing</button></li>
                <li><button onClick={() => handleNavClick("services")} className="hover:text-white transition-colors">Hydronic Radiators</button></li>
                <li><button onClick={() => handleNavClick("drainage")} className="hover:text-white transition-colors">Main Sewers & Drains</button></li>
                <li><button onClick={() => handleNavClick("backflow")} className="hover:text-white transition-colors">Backflow Preventers</button></li>
                <li><button onClick={() => handleNavClick("green-initiatives")} className="hover:text-white transition-colors">Drain Wastewater Recovery</button></li>
              </ul>
            </div>

            <div className="lg:col-span-2.5 space-y-3">
              <h4 className="font-bold text-white text-xs uppercase tracking-widest">Local Subsidies</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => handleNavClick("rebates-advice")} className="hover:text-white transition-colors">Whitby Backwater Grants</button></li>
                <li><button onClick={() => handleNavClick("rebates-advice")} className="hover:text-white transition-colors">Sump Sinking Subsidy</button></li>
                <li><button onClick={() => handleNavClick("rebates-advice")} className="hover:text-white transition-colors">Enbridge Carbon Grants</button></li>
                <li><button onClick={() => handleNavClick("rebates-advice")} className="hover:text-white transition-colors">Toilet Water-Saving Tally</button></li>
                <li><button onClick={() => handleNavClick("rebates-advice")} className="hover:text-white transition-colors">Helpful Advice Database</button></li>
              </ul>
            </div>

            {/* Support Desk */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-bold text-white text-xs uppercase tracking-widest block">Durham Dispatch</h4>
              <div className="bg-[#15213b] p-3 rounded border border-gray-800 text-xs">
                <div className="font-bold text-[#F7F5F1]">Emergency Call Desk:</div>
                <a href="tel:+19056682417" className="text-[#B08D57] hover:underline mt-1 font-serif text-base block font-bold">
                  (905) 668-2417
                </a>
                <p className="text-[10px] text-gray-400 mt-1.5 leading-relaxed">
                  Call direct for verified freeze hazards or wastewater backs. Servicing Durham 24/7.
                </p>
              </div>
            </div>

          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 space-y-4 sm:space-y-0">
            <div>
              © 2026 Thornbridge Plumbing & Heating. All Rights Reserved. Family Owned & Operated since 1999.
            </div>
            <div className="flex space-x-4">
              <span>Whitby, ON</span>
              <span>•</span>
              <span>Durham Region Authorities Approved</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
