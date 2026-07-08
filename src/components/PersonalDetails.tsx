import { useState } from 'react';
import { User, ShieldAlert, Phone, Mail, MapPin, Printer, CheckCircle, FileText, Download } from 'lucide-react';
import { PersonalInfo, ReferenceItem } from '../types';

const PERSONAL_DATA: PersonalInfo[] = [
  { label: 'Full Name', value: 'Md. Marufuzzaman Maruf' },
  { label: "Father's Name", value: 'Md. Masud Parveg' },
  { label: "Mother's Name", value: 'Mst. Mamina Begum' },
  { label: 'Date of Birth', value: '04 May 2005' },
  { label: 'Gender', value: 'Male' },
  { label: 'Religion', value: 'Islam' },
  { label: 'Marital Status', value: 'Unmarried' },
  { label: 'Height', value: '5 Feet 7 Inches' },
  { label: 'Nationality', value: 'Bangladeshi (By Birth)' },
  { label: 'Blood Group', value: 'B (+)' },
  { label: 'National ID (NID)', value: '5575099261' },
  { label: 'Permanent Address', value: 'Vill: Banupara, P.O: Haragach-5441, Upazila: Kaunia, Dist: Rangpur, Bangladesh' }
];

const REFERENCE: ReferenceItem = {
  name: 'Md. Ashad Al Mamud',
  designation: 'Chief Instructor & Head of Department',
  department: 'Electro-Medical Technology',
  institute: 'Rangpur Polytechnic Institute, Rangpur',
  phone: '+8801744901060'
};

export default function PersonalDetails() {
  const [printSuccess, setPrintSuccess] = useState(false);

  const handlePrint = () => {
    setPrintSuccess(true);
    setTimeout(() => setPrintSuccess(false), 3000);
    window.print();
  };

  return (
    <div id="personal-info" className="space-y-8 font-sans">
      
      {/* Visual Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Personal Profile Details Table */}
        <div className="lg:col-span-2 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4 mb-6">
            <div className="flex items-center gap-3">
              <User className="text-[#0284C7] w-5 h-5" />
              <h3 className="text-stone-800 font-serif font-bold text-lg tracking-tight">Personal Profile</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {PERSONAL_DATA.map((info, idx) => (
              <div 
                key={idx} 
                className={`py-3 border-b border-stone-100 flex flex-col justify-between ${
                  info.label === 'Permanent Address' ? 'md:col-span-2' : ''
                }`}
              >
                <span className="text-[10px] font-mono font-bold tracking-wider text-stone-400 uppercase">
                  {info.label}
                </span>
                <span className="text-sm font-semibold text-stone-800 mt-1">
                  {info.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Column: Reference & Verification Declaration */}
        <div className="space-y-6">
          
          {/* Reference Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
            <h4 className="text-xs font-bold font-mono tracking-widest text-stone-500 uppercase border-b border-[#E2E8F0] pb-3 mb-4">
              Professional Reference
            </h4>
            
            <div className="space-y-3">
              <div>
                <h5 className="text-sm font-bold text-stone-800">{REFERENCE.name}</h5>
                <p className="text-xs text-[#0284C7] font-bold mt-0.5">{REFERENCE.designation}</p>
                <p className="text-xs text-stone-600 mt-1">{REFERENCE.department}</p>
                <p className="text-[11px] text-stone-400 font-semibold">{REFERENCE.institute}</p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0284C7]/10 border border-[#0284C7]/20 flex items-center justify-center text-[#0284C7]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold text-stone-400 uppercase block">DIRECT PHONE</span>
                  <a href={`tel:${REFERENCE.phone}`} className="text-xs font-mono font-bold text-stone-700 hover:text-[#0284C7] transition-colors">
                    {REFERENCE.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Declaration */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-sm">
            <div className="absolute right-0 top-0 w-16 h-16 bg-[#0284C7]/5 rounded-full blur-xl pointer-events-none" />
            
            <div>
              <div className="flex items-center gap-2 text-[#0284C7] mb-3">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span className="text-[10px] font-mono font-bold tracking-wider uppercase">Verification Certification</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed italic">
                "I understand that withholding pertinent information or giving false information in this resume will make me liable to dismissal. Bearing this in mind, I certify that the statements and information herein are correct and complete."
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
              <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">Signed Statement</span>
              <span className="text-xs font-bold text-stone-800 font-serif italic border-b border-[#E2E8F0] pb-0.5">
                Md. Marufuzzaman Maruf
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Print CV Call-To-Action Box (no-print) */}
      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6 no-print">
        <div className="flex gap-4 items-start text-left">
          <div className="w-12 h-12 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center text-[#0284C7] shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-[#0F172A] font-serif font-bold text-base">Print-Ready Official Resume</h4>
            <p className="text-xs text-stone-600 mt-1 max-w-xl leading-relaxed">
              Need a physical or PDF copy of this curriculum vitae? Click the button to launch a perfectly formatted, high-contrast print sheet optimized specifically for recruiters, hospital HR, and technical directors.
            </p>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className={`px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
            printSuccess 
              ? 'bg-emerald-600 text-white shadow-sm' 
              : 'bg-[#0F172A] text-white hover:bg-slate-800 shadow-sm'
          }`}
        >
          {printSuccess ? (
            <>
              <CheckCircle className="w-4 h-4" />
              Document Formatted!
            </>
          ) : (
            <>
              <Printer className="w-4 h-4" />
              Print Official CV / Save PDF
            </>
          )}
        </button>
      </div>

      {/* ========================================== */}
      {/* PRINT-ONLY RESUME DUMMY LAYOUT (HIDDEN ON SCREEN) */}
      {/* ========================================== */}
      <div className="hidden print:block bg-white text-black p-8 max-w-[210mm] mx-auto text-left font-sans leading-relaxed">
        
        {/* Print Header */}
        <div className="border-b-2 border-slate-800 pb-4 mb-6">
          <h1 className="text-3xl font-bold font-serif text-slate-900 tracking-tight">Md. Marufuzzaman Maruf</h1>
          <p className="text-sm font-semibold text-slate-700 font-mono mt-1">ELECTRO-MEDICAL TECHNOLOGY ENGINEER</p>
          
          {/* Quick contact row */}
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-600 mt-3 font-mono">
            <span>Cell: +88 01940786701</span>
            <span>Email: mdmarufuzzamanmaruf76@gmail.com</span>
            <span>Address: Banupara, P.O: Haragach, Kaunia, Rangpur</span>
          </div>
        </div>

        {/* Objective */}
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-1 mb-2">Career Objective</h2>
          <p className="text-xs text-slate-700 leading-relaxed text-justify">
            To work with sincerity and integrity in a challenging atmosphere where my talent and knowledge will significantly contribute to the organization's target achievement and to become a successful personality with excellent career where hard work, discipline and creative problem solving is the cornerstone of success.
          </p>
        </div>

        {/* Academic Qualification */}
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-1 mb-3">Academic Qualification</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between font-semibold text-xs">
                <span className="text-slate-900 text-sm">Diploma in Engineering (Electro-Medical Technology)</span>
                <span className="font-mono">Passing Year: 2024</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">Rangpur Polytechnic Institute, Rangpur</p>
              <p className="text-xs text-slate-600 font-mono">Board: Bangladesh Technical Education Board | Result: 3.97 (Out of 4.00)</p>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-xs">
                <span className="text-slate-900 text-sm">Secondary School Certificate (S.S.C) — General Electrical Works</span>
                <span className="font-mono">Passing Year: 2020</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">Rangpur Technical School & College, Rangpur</p>
              <p className="text-xs text-slate-600 font-mono">Board: Bangladesh Technical Education Board | Result: 5.00 (Out of 5.00)</p>
            </div>
          </div>
        </div>

        {/* Training */}
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-1 mb-2">Industrial Training</h2>
          <div>
            <div className="flex justify-between font-semibold text-xs">
              <span className="text-slate-900">Hospital/Institute: Rangpur Medical College Hospital, Rangpur</span>
              <span className="font-mono">Year: 2024</span>
            </div>
            <p className="text-xs text-slate-700">Subject: Industrial Practical Training (3 Months)</p>
            <p className="text-xs text-slate-500 mt-1 text-justify">
              Acquired substantial practical experience on multi-parameter patient vital monitoring systems, high-voltage medical device insulation testing, central sterilization systems, and biomedical instrumentation safety standards inside a major government clinical facility.
            </p>
          </div>
        </div>

        {/* Core Expertise */}
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-1 mb-2">Technical Skills & Expertise</h2>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <strong className="text-slate-800">Biomedical:</strong>
              <p className="text-slate-600 mt-0.5">Electro-Medical Instrumentation, Patient Monitoring Systems, Differential Amplifiers, Sensor Calibration, preventive maintenance codes.</p>
            </div>
            <div>
              <strong className="text-slate-800">Electrical & Safety:</strong>
              <p className="text-slate-600 mt-0.5">Analog and digital circuit design, AC/DC high-power wiring, oscilloscope testing, leakage currents (IEC 60601-1 compliance).</p>
            </div>
          </div>
        </div>

        {/* Language Skills */}
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-1 mb-2">Language Skills</h2>
          <p className="text-xs text-slate-700">
            <strong>English:</strong> Excellent in Speaking, Reading, Writing and Listening.<br />
            <strong>Bengali (Native):</strong> Excellent in Speaking, Reading, Writing and Listening.
          </p>
        </div>

        {/* Personal Details */}
        <div className="mb-6 page-break-inside-avoid">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-1 mb-2">Personal Information</h2>
          <table className="w-full text-xs text-slate-700 border-collapse">
            <tbody>
              <tr>
                <td className="py-1 font-semibold w-1/3">Father's Name:</td>
                <td className="py-1">Md. Masud Parveg</td>
                <td className="py-1 font-semibold w-1/4">Mother's Name:</td>
                <td className="py-1">Mst. Mamina Begum</td>
              </tr>
              <tr>
                <td className="py-1 font-semibold">Date of Birth:</td>
                <td className="py-1">04 May 2005</td>
                <td className="py-1 font-semibold">Gender:</td>
                <td className="py-1">Male</td>
              </tr>
              <tr>
                <td className="py-1 font-semibold">Nationality:</td>
                <td className="py-1">Bangladeshi (By Birth)</td>
                <td className="py-1 font-semibold">Religion:</td>
                <td className="py-1">Islam</td>
              </tr>
              <tr>
                <td className="py-1 font-semibold">Marital Status:</td>
                <td className="py-1">Unmarried</td>
                <td className="py-1 font-semibold">Blood Group:</td>
                <td className="py-1">B (+)</td>
              </tr>
              <tr>
                <td className="py-1 font-semibold">Height:</td>
                <td className="py-1">5 Feet 7 Inches</td>
                <td className="py-1 font-semibold">National ID (NID):</td>
                <td className="py-1">5575099261</td>
              </tr>
              <tr>
                <td className="py-1 font-semibold">Permanent Address:</td>
                <td className="py-1" colSpan={3}>Vill: Banupara, P.O: Haragach-5441, Upazila: Kaunia, Dist: Rangpur, Bangladesh.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Reference */}
        <div className="mb-8 page-break-inside-avoid">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-1 mb-2">Professional Reference</h2>
          <div className="text-xs text-slate-700">
            <strong className="text-slate-950">{REFERENCE.name}</strong><br />
            {REFERENCE.designation} — {REFERENCE.department}<br />
            {REFERENCE.institute}<br />
            Direct Contact: {REFERENCE.phone}
          </div>
        </div>

        {/* Statement & Signature */}
        <div className="mt-12 page-break-inside-avoid border-t border-slate-300 pt-4 flex justify-between items-end text-xs text-slate-600">
          <div className="max-w-[70%] text-[10px] text-slate-500 italic">
            I certify that the statements and information provided in this curriculum vitae are completely correct and complete.
          </div>
          <div className="text-right">
            <div className="border-b border-slate-800 w-36 mx-auto mb-1"></div>
            <span className="font-semibold text-slate-900 block">Md. Marufuzzaman Maruf</span>
            <span className="text-[10px] text-slate-500">Applicant Signature</span>
          </div>
        </div>

      </div>

    </div>
  );
}
