import { Cpu, Languages, Check, Compass, Users, HeartHandshake, Shield, Sparkles, Zap } from 'lucide-react';
import { SkillItem } from '../types';

const SKILLS_DATA: SkillItem[] = [
  { name: 'Biomedical Instrumentation', category: 'Biomedical', level: 94, description: 'ECG, Defibrillators, EEG, Patient Monitors, Autoclaves, Ultrasound probe arrays, and syringe pump electronics.' },
  { name: 'Preventive Maintenance & Calibration', category: 'Biomedical', level: 92, description: 'Transducer zero-calibrating, biomedical safety tests, leakage current checking, and preventative replacement cycle.' },
  { name: 'General Electrical & Electronics', category: 'Technical', level: 95, description: 'Analog circuits, differential amplifiers, filtering networks, high-voltage systems, transformers, and electrical wiring.' },
  { name: 'Embedded Systems & Microcontrollers', category: 'Technical', level: 85, description: 'Microcontroller programming, sensor integration, electronic telemetry, prototype assembly, and signal filtering.' },
  { name: 'Biomedical Standards (IEC 60601)', category: 'Biomedical', level: 88, description: 'Familiarity with medical electrical equipment safety standards, electrical isolation, leakage thresholds, and electromagnetic compatibility.' },
  { name: 'Oscilloscope & Diagnostics Software', category: 'Technical', level: 90, description: 'Usage of storage oscilloscopes, safety analyzers, function generators, multimeters, and RF wattage analyzers.' }
];

const TRAITS = [
  {
    title: 'Willing to Take Any Challenge',
    icon: Compass,
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    desc: 'Adaptable to newly evolving technologies, ready to work on state-of-the-art diagnostic or therapeutic equipment.'
  },
  {
    title: 'Resilient Under Pressure',
    icon: Shield,
    color: 'text-teal-400 bg-teal-500/10 border-teal-500/30',
    desc: 'Capable of troubleshooting high-risk emergency-room or operating-theater equipment in real-time under clinical constraints.'
  },
  {
    title: 'Independent & Collaborative',
    icon: Users,
    color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    desc: 'Highly functional as an independent technician or as a collaborative member of multi-disciplinary clinical engineering teams.'
  },
  {
    title: 'Dedicated Positive Attitude',
    icon: HeartHandshake,
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    desc: 'Organized, confident, friendly, and deeply motivated by the positive impact of clinical engineering on human lives.'
  }
];

export default function SkillsAndTraits() {
  return (
    <div id="skills-traits" className="space-y-8 font-sans">
      
      {/* Upper Grid: Technical Skills & Languages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Technical Skills */}
        <div className="lg:col-span-2 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-4 mb-6">
            <Cpu className="text-[#0284C7] w-5 h-5" />
            <h3 className="text-stone-800 font-serif font-bold text-lg tracking-tight">Core Competencies & Expertise</h3>
          </div>

          <div className="space-y-6">
            {SKILLS_DATA.map((skill, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex flex-wrap justify-between items-end gap-2">
                  <div>
                    <span className="text-[9px] font-mono font-bold tracking-widest text-slate-550 uppercase">
                      {skill.category}
                    </span>
                    <h4 className="text-stone-800 text-sm font-semibold font-sans">{skill.name}</h4>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#0284C7]">{skill.level}%</span>
                </div>
                
                {/* Custom Progress Bar */}
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-[#E2E8F0]">
                  <div 
                    className="h-full bg-[#0284C7] rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                
                <p className="text-xs text-stone-600 font-sans leading-relaxed pl-1">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Column: Language & General Trades */}
        <div className="space-y-6">
          
          {/* Languages card */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-4 mb-5">
              <Languages className="text-[#0284C7] w-5 h-5" />
              <h3 className="text-stone-800 font-serif font-bold text-lg tracking-tight">Language Proficiency</h3>
            </div>

            <p className="text-xs text-stone-500 mb-5 leading-relaxed">
              Excellent linguistic coordination is essential for consulting technical manuals, manufacturer guides, and collaborating with international suppliers.
            </p>

            <div className="space-y-4">
              {[
                { lang: 'English', desc: 'Professional fluency: Reading manuals, writing diagnostics reports, attending international service seminars, and speaking.' },
                { lang: 'Bengali (Native)', desc: 'Excellent: Flawless native communication, essential for working with clinical staff, clinicians, and domestic safety auditors.' }
              ].map((item, index) => (
                <div key={index} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#0284C7]/10 border border-[#0284C7]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="text-[#0284C7] w-3 h-3" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-800">{item.lang}</h4>
                    <span className="text-[10px] font-mono text-[#0284C7] font-semibold">EXCELLENT PROFICIENCY</span>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats banner */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 top-0 w-24 h-24 bg-[#0284C7]/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex gap-3">
              <Sparkles className="text-[#0284C7] w-5 h-5 shrink-0 mt-1" />
              <div>
                <h4 className="text-stone-850 font-serif font-bold text-sm">Industrial Ready</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Combining a solid foundation in <strong className="text-[#0284C7]">General Electrical Works (SSC)</strong> with specialized advanced <strong className="text-[#0284C7]">Electro-Medical Engineering (Diploma)</strong> yields a highly versatile background for high-voltage medical devices.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Lower Section: Core Traits */}
      <div>
        <h4 className="text-xs font-bold font-mono tracking-widest text-slate-400 uppercase mb-5 text-center">
          Professional Traits & Attributes
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRAITS.map((trait, idx) => {
            const IconComponent = trait.icon;
            let traitColorClasses = idx % 2 === 0 
              ? "text-[#0284C7] bg-[#0284C7]/5 border-[#0284C7]/20" 
              : "text-[#0D9488] bg-[#0D9488]/5 border-[#0D9488]/20";

            return (
              <div 
                key={idx} 
                className="bg-white border border-[#E2E8F0] hover:border-[#0284C7]/30 hover:shadow-sm transition-all rounded-xl p-5"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${traitColorClasses} mb-4`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <h4 className="text-stone-800 font-serif font-bold text-sm">
                  {trait.title}
                </h4>
                <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                  {trait.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
