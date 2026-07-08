import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Activity, Award, Calendar, ShieldCheck, Mail, Phone, MapPin, 
  Wrench, FileText, Cpu, BookOpen, Compass, CheckCircle2, Languages,
  Printer, ArrowUpRight
} from 'lucide-react';

import BiomedicalSimulator from './components/BiomedicalSimulator';
import EducationAndTraining from './components/EducationAndTraining';
import SkillsAndTraits from './components/SkillsAndTraits';
import PersonalDetails from './components/PersonalDetails';
import ContactSection from './components/ContactSection';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('credentials');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const tabs = [
    { id: 'credentials', label: 'Education & Skills' },
    { id: 'simulator', label: 'Patient Monitor' },
    { id: 'contact', label: 'Profile & Contact' }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-[#0284C7] selection:text-white flex flex-col font-sans">
      
      {/* Visual background scanning grid effect (no-print) */}
      <div className="absolute inset-0 bg-monitor-grid-fine opacity-45 pointer-events-none no-print" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0284C7]/5 rounded-full blur-3xl pointer-events-none no-print" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#0D9488]/5 rounded-full blur-3xl pointer-events-none no-print" />

      {/* HEADER NAVBAR (no-print) */}
      <header className="sticky top-0 z-50 bg-[#F8FAFC]/95 backdrop-blur-md border-b border-[#E2E8F0] px-4 py-4 no-print">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#0F172A] p-0.5 shadow-md">
              <div className="w-full h-full bg-[#F8FAFC] rounded-[10px] flex items-center justify-center">
                <Activity className="text-[#0284C7] w-5 h-5 animate-pulse" />
              </div>
            </div>
            <div>
              <span className="text-[#0F172A] font-serif font-bold italic text-base tracking-tight block">
                Md. Marufuzzaman Maruf
              </span>
              <span className="text-[10px] font-mono text-[#0284C7] tracking-widest block uppercase font-bold">
                Electro-Medical Technologist
              </span>
            </div>
          </div>

          {/* Quick Contact Badges */}
          <div className="hidden md:flex items-center gap-4 text-xs font-mono text-slate-600">
            <a href="tel:+8801940786701" className="hover:text-[#0284C7] transition-colors flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#0284C7]" />
              +88 01940786701
            </a>
            <a href="mailto:mdmarufuzzamanmaruf76@gmail.com" className="hover:text-[#0284C7] transition-colors flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#0284C7]" />
              mdmarufuzzamanmaruf76@gmail.com
            </a>
          </div>

          {/* Download/Print Action */}
          <button 
            onClick={() => window.print()}
            className="bg-white hover:bg-slate-50 text-xs font-semibold px-4 py-2 border border-[#E2E8F0] rounded-lg text-slate-750 shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#0284C7]" />
            Print CV
          </button>

        </div>
      </header>

      {/* HERO SECTION (no-print) */}
      <section className="relative pt-12 pb-8 px-4 max-w-7xl mx-auto w-full no-print">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Intro Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 border border-[#E2E8F0] bg-white px-3 py-1 text-xs text-[#0284C7] font-mono font-bold uppercase tracking-widest rounded-full shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              BTEB Certified Electro-Medical Engineer
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-serif font-normal text-[#0F172A] tracking-tight leading-tight">
              Engineering Medical Precision <br />
              <span className="text-[#0284C7] font-serif font-medium italic">
                Securing Patient Care.
              </span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-justify font-sans">
              Welcome to the digital portfolio of <strong className="text-slate-800">Md. Marufuzzaman Maruf</strong>. 
              As a dedicated and highly disciplined Electro-Medical Engineer, I bridge the crucial gap between clinical instrumentation and physical engineering logic. Armed with an exceptional academic record (<strong className="text-[#0284C7]">CGPA 3.97/4.00</strong>) from Rangpur Polytechnic Institute and intensive hands-on industrial rotations at <strong className="text-slate-800">Rangpur Medical College Hospital</strong>, I specialize in calibrating physiological signal monitor circuits, troubleshooting high-frequency electrosurgical systems, and assuring strict hospital electrical safety guidelines.
            </p>

            {/* Quick KPIs stats row */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 text-center shadow-sm">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-[#0284C7]">3.97</span>
                <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mt-1">Diploma CGPA</p>
              </div>
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 text-center shadow-sm">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-[#0284C7]">5.00</span>
                <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mt-1">SSC GPA (Electrical)</p>
              </div>
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 text-center shadow-sm">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-[#0284C7]">3-Mo</span>
                <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mt-1">Clinical Training</p>
              </div>
            </div>
          </div>

          {/* Hero Highlight Card: Visual Bio-Amplifier Status block */}
          <div className="lg:col-span-5 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md relative overflow-hidden">
            <div className="absolute right-3 top-3 flex items-center gap-1.5 bg-[#0284C7]/10 border border-[#0284C7]/20 rounded-full px-2 py-0.5 text-[9px] font-mono text-[#0284C7] animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] inline-block" />
              SYS LIVE
            </div>

            <h3 className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase mb-4">ENGINEERING PROFILE DISPATCH</h3>
            
            <div className="space-y-4 text-xs font-mono text-slate-700">
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">TECHNOLOGIST:</span>
                  <span className="text-slate-900 font-semibold">Md. Marufuzzaman Maruf</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">DEPT / FOCUS:</span>
                  <span className="text-[#0284C7] font-semibold">Electro-Medical Eng.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">EXPERTISE:</span>
                  <span className="text-slate-900 font-semibold">Physiological Circuits & RF Diathermy</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">TRAINING:</span>
                  <span className="text-[#0284C7] font-semibold">Rangpur Medical College Hosp.</span>
                </div>
              </div>

              {/* High-quality graphic element showing ECG vector wave */}
              <div className="h-16 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] relative overflow-hidden flex items-center justify-center p-2">
                <div className="absolute inset-0 bg-monitor-grid opacity-20" />
                {/* Simulated static preview wave */}
                <svg className="w-full h-full text-[#0284C7]" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path 
                    d="M 0 10 L 10 10 L 12 11 L 14 9 L 16 10 L 25 10 L 28 5 L 31 18 L 34 10 L 45 10 L 50 12 L 55 8 L 60 10 L 75 10 L 77 9 L 79 11 L 81 10 L 90 10 L 92 4 L 95 18 L 98 10 L 100 10" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1" 
                  />
                </svg>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0] text-[10px]">
                <span className="text-slate-500">CURRENT STATUS:</span>
                <span className="text-[#0284C7] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7]" />
                  AVAILABLE FOR IMMEDIATE DEPLOYMENT
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* TABS SELECTOR DOCK (no-print) */}
      <section className="sticky top-[73px] z-40 bg-[#F8FAFC]/90 backdrop-blur-md border-y border-[#E2E8F0] px-4 py-3 no-print">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
              }}
              className={`text-xs px-3.5 py-2 rounded-lg font-medium whitespace-nowrap transition-all border cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#0F172A] border-transparent text-white font-bold shadow-sm'
                  : 'bg-white border-[#E2E8F0] text-slate-600 hover:bg-slate-50 hover:text-[#0284C7]'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current inline-block mr-1.5 align-middle" />
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        
        {/* 1. CREDENTIALS & EXPERTISE (Education + Skills) */}
        <div className={activeTab === 'credentials' ? 'space-y-12 block print:hidden' : 'hidden print:hidden'}>
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <EducationAndTraining />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <SkillsAndTraits />
          </motion.div>
        </div>

        {/* 2. INTERACTIVE DEMO (Patient Monitor ECG Simulator) */}
        <div className={activeTab === 'simulator' ? 'block print:hidden' : 'hidden print:hidden'}>
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <BiomedicalSimulator />
          </motion.div>
        </div>

        {/* 3. PROFILE & CONTACT (Personal details + contact info) */}
        <div className={activeTab === 'contact' ? 'space-y-12 block print:block' : 'hidden print:block'}>
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <PersonalDetails />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="no-print"
          >
            <ContactSection />
          </motion.div>
        </div>

      </main>

      {/* FOOTER (no-print) */}
      <footer className="bg-[#0F172A] text-white py-6 px-12 mt-16 text-center text-xs font-mono no-print flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-inner">
        <p className="font-bold uppercase tracking-widest">Portfolio Dashboard / {new Date().getFullYear()}</p>
        <div className="flex flex-wrap justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-[#0284C7]">
          <span className="text-white">CGPA: 3.97</span>
          <span className="text-slate-600">•</span>
          <span className="text-white">BTEB REGISTERED</span>
          <span className="text-slate-600">•</span>
          <span className="text-white">RANGPUR POLYTECHNIC ALUMNI</span>
        </div>
      </footer>

    </div>
  );
}
