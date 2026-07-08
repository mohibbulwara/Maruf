import { Calendar, Award, Landmark, BookOpen, Clock, Activity } from 'lucide-react';
import { EducationItem, TrainingItem } from '../types';

const EDUCATION_DATA: EducationItem[] = [
  {
    degree: 'Diploma in Engineering',
    department: 'Electro-Medical Technology',
    institute: 'Rangpur Polytechnic Institute, Rangpur',
    result: '3.97 (Out of 4.00)',
    year: '2024',
    board: 'Bangladesh Technical Education Board',
    highlights: [
      'Top-tier ranking in the department with a near-perfect CGPA of 3.97.',
      'Specialized in biomedical instrumentation, medical sensors, clinical equipment calibration, and safety standards.',
      'Completed academic projects on microcontroller-based heart rate monitoring and electronic telemetry systems.'
    ]
  },
  {
    degree: 'Secondary School Certificate (S.S.C)',
    department: 'General Electrical Works',
    institute: 'Rangpur Technical School & College, Rangpur',
    result: '5.00 (Out of 5.00)',
    year: '2020',
    board: 'Bangladesh Technical Education Board',
    highlights: [
      'Acquired perfect GPA of 5.00/5.00.',
      'Solid foundational training in residential/industrial electrical wiring, circuit design, transformer winding, and electrical safety codes.'
    ]
  }
];

const TRAINING_DATA: TrainingItem[] = [
  {
    institute: 'Rangpur Medical College Hospital, Rangpur',
    subject: 'Industrial Practical Training',
    duration: '3 Months',
    year: '2024',
    details: [
      'Hands-on experience inside a major tertiary government teaching hospital.',
      'Assisted chief biomedical engineers with preventive maintenance, troubleshooting, and calibration of Patient Monitors, ECG machines, Defibrillators, and Laboratory Centrifuges.',
      'Learned central sterilization (CSSD) machinery operations and clinical gas pipeline distribution maintenance.'
    ]
  }
];

export default function EducationAndTraining() {
  return (
    <div id="education-training" className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-sans">
      
      {/* Education Section */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-4 mb-6">
          <BookOpen className="text-[#0284C7] w-5 h-5" />
          <h3 className="text-stone-800 font-serif font-bold text-lg tracking-tight">Academic Qualifications</h3>
        </div>

        <div className="relative border-l border-[#E2E8F0] ml-3 pl-6 space-y-8">
          {EDUCATION_DATA.map((edu, idx) => (
            <div key={idx} className="relative">
              {/* Timeline node */}
              <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-[#0284C7] border-2 border-white shadow-md" />
              
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-bold text-[#0284C7] bg-[#0284C7]/10 border border-[#0284C7]/20 px-2 py-0.5 rounded-full">
                  Class of {edu.year}
                </span>
                <span className="text-xs font-mono font-semibold text-stone-600 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-[#0D9488]" />
                  GPA: {edu.result}
                </span>
              </div>

              <h4 className="text-stone-800 font-serif font-bold text-base mt-2">
                {edu.degree} {edu.department && `— ${edu.department}`}
              </h4>
              <p className="text-xs text-stone-600 font-sans mt-1 flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
                {edu.institute}
              </p>
              <p className="text-[10px] text-stone-500 font-mono mt-0.5 uppercase tracking-wide">
                Board: {edu.board}
              </p>

              <ul className="mt-3 space-y-1.5 list-disc list-inside text-xs text-stone-600 pl-1 leading-relaxed">
                {edu.highlights.map((hl, hidx) => (
                  <li key={hidx} className="marker:text-[#0284C7]">
                    <span className="font-sans text-stone-700">{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Industrial Training Section */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-4 mb-6">
            <Activity className="text-[#0284C7] w-5 h-5" />
            <h3 className="text-stone-800 font-serif font-bold text-lg tracking-tight">Clinical & Industrial Training</h3>
          </div>

          {TRAINING_DATA.map((tr, idx) => (
            <div key={idx} className="relative pl-6 border-l-2 border-[#E2E8F0] ml-3">
              <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-[#0D9488] border-2 border-white shadow-sm" />
              
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-bold text-[#0D9488] bg-[#0D9488]/10 border border-[#0D9488]/20 px-2 py-0.5 rounded-full">
                  Year: {tr.year}
                </span>
                <span className="text-xs font-mono font-semibold text-stone-600 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                  Duration: {tr.duration}
                </span>
              </div>

              <h4 className="text-stone-800 font-serif font-bold text-base mt-2">
                {tr.subject}
              </h4>
              <p className="text-xs text-stone-600 font-sans mt-1 flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
                {tr.institute}
              </p>

              <div className="mt-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4">
                <h5 className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase mb-2">Key Training Competencies</h5>
                <ul className="space-y-2 text-xs text-stone-600 leading-relaxed">
                  {tr.details.map((detail, didx) => (
                    <li key={didx} className="flex gap-2">
                      <span className="text-[#0284C7] select-none">•</span>
                      <span className="font-sans text-stone-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic professional highlight box */}
        <div className="mt-6 border border-[#E2E8F0] bg-[#F8FAFC] rounded-xl p-4">
          <p className="text-xs text-stone-600 leading-relaxed">
            <strong className="text-[#0284C7]">Clinical Integration Notice:</strong> Hospital rotations require strict adherence to hygiene, patient privacy, infection control protocols, and electrical leakage containment standards. Maruf completed clinical department rotations in ICU, Operation Theaters, Dialysis units, and Pathology labs.
          </p>
        </div>
      </div>

    </div>
  );
}
