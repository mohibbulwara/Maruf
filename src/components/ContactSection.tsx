import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Send, AlertTriangle, MessageSquare, Trash2 } from 'lucide-react';

interface Inquiry {
  id: string;
  name: string;
  organization: string;
  email: string;
  subject: string;
  message: string;
  priority: 'High' | 'Normal';
  timestamp: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    subject: '',
    message: '',
    priority: 'Normal' as 'High' | 'Normal'
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [copiedType, setCopiedType] = useState<'email' | 'phone' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Load inquiries from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('maruf_portfolio_inquiries');
    if (stored) {
      try {
        setInquiries(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse inquiries', e);
      }
    }
  }, []);

  // Save to localStorage helper
  const saveInquiries = (list: Inquiry[]) => {
    setInquiries(list);
    localStorage.setItem('maruf_portfolio_inquiries', JSON.stringify(list));
  };

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Simulate database network delay
    setTimeout(() => {
      const newInquiry: Inquiry = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        organization: formData.organization || 'Independent/Other',
        email: formData.email,
        subject: formData.subject || 'Electro-Medical Engineering Inquiry',
        message: formData.message,
        priority: formData.priority,
        timestamp: new Date().toLocaleString()
      };

      const updated = [newInquiry, ...inquiries];
      saveInquiries(updated);

      // Reset form
      setFormData({
        name: '',
        organization: '',
        email: '',
        subject: '',
        message: '',
        priority: 'Normal'
      });
      
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 4000);
    }, 800);
  };

  const deleteInquiry = (id: string) => {
    const updated = inquiries.filter(item => item.id !== id);
    saveInquiries(updated);
  };

  return (
    <div id="contact" className="grid grid-cols-1 lg:grid-cols-3 gap-8 font-sans no-print">
      
      {/* Column 1: Contact Direct Cards */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold font-mono tracking-widest text-slate-400 uppercase">Direct Channels</h4>
        
        {/* Phone */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 flex items-center justify-between group">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-xl bg-[#0284C7]/10 border border-[#0284C7]/20 flex items-center justify-center text-[#0284C7]">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-stone-400 uppercase">CALL DIRECTLY</span>
              <p className="text-sm font-semibold font-mono text-stone-800 mt-0.5">+88 01940786701</p>
            </div>
          </div>
          <button
            onClick={() => copyToClipboard('+88 01940786701', 'phone')}
            className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-stone-500 hover:text-[#0284C7] hover:bg-[#0284C7]/5 transition-colors cursor-pointer"
            title="Copy phone number"
          >
            {copiedType === 'phone' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* Email */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 flex items-center justify-between group">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-xl bg-[#0284C7]/10 border border-[#0284C7]/20 flex items-center justify-center text-[#0284C7]">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-stone-400 uppercase">EMAIL ADDRESS</span>
              <p className="text-xs sm:text-sm font-semibold font-mono text-stone-800 mt-0.5">mdmarufuzzamanmaruf76@gmail.com</p>
            </div>
          </div>
          <button
            onClick={() => copyToClipboard('mdmarufuzzamanmaruf76@gmail.com', 'email')}
            className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-stone-500 hover:text-[#0284C7] hover:bg-[#0284C7]/5 transition-colors cursor-pointer"
            title="Copy email address"
          >
            {copiedType === 'email' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* Location */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#0D9488]/10 border border-[#0D9488]/20 flex items-center justify-center text-[#0D9488] shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold text-stone-400 uppercase">CURRENT LOCATION</span>
            <p className="text-xs text-stone-650 mt-0.5 leading-relaxed">
              Banupara, P.O: Haragach-5441, Kaunia, Rangpur, Bangladesh.
            </p>
          </div>
        </div>

        {/* Warning card */}
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-5 text-xs text-stone-600 leading-relaxed flex gap-2">
          <AlertTriangle className="text-[#0284C7] w-4 h-4 shrink-0 mt-0.5" />
          <p>
            <strong className="text-[#0284C7]">Fast Mobilization:</strong> Maruf is located in Rangpur division, ready to relocate or travel for clinical installations, emergency device breakdowns, or medical center engineering audits.
          </p>
        </div>
      </div>

      {/* Columns 2 & 3: Message Submission Form */}
      <div className="lg:col-span-2 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
        <h4 className="text-xs font-bold font-mono tracking-widest text-slate-500 uppercase border-b border-[#E2E8F0] pb-3 mb-6">
          Clinical & Technical Inquiry Form
        </h4>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-1.5">
                Your Name <span className="text-[#0284C7]">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#0284C7] focus:bg-white"
                placeholder="Dr. Al-Amin / HR Manager"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-1.5">
                Hospital / Organization
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#0284C7] focus:bg-white"
                placeholder="Apollo Diagnostics / RMCH"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-1.5">
                Email Address <span className="text-[#0284C7]">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#0284C7] focus:bg-white"
                placeholder="recruiter@clinicalgroup.com"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-1.5">
                Inquiry Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs text-stone-700 focus:outline-none focus:border-[#0284C7] focus:bg-white cursor-pointer"
              >
                <option value="Normal">Normal — Employment Opportunity</option>
                <option value="High">High — Device Breakdown / Consultation</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-1.5">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#0284C7] focus:bg-white"
              placeholder="Career Interview / Preventative Maintenance Project"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase mb-1.5">
              Message Content <span className="text-[#0284C7]">*</span>
            </label>
            <textarea
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#0284C7] focus:bg-white resize-none"
              placeholder="Provide job details, hospital location, or specific medical devices requiring service..."
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <span className="text-[10px] text-[#0284C7] font-sans italic text-center sm:text-left">
              * Indicates required fields. Forms are locally compiled inside this browser session.
            </span>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-[#0F172A] text-white font-bold text-xs px-6 py-3 rounded-xl hover:bg-slate-800 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? 'Transmitting...' : 'Transmit Message'}
            </button>
          </div>
        </form>

        {/* Visual submission success notification */}
        {submitSuccess && (
          <div className="mt-4 bg-emerald-50 border border-emerald-500 text-emerald-800 rounded-xl p-4 flex gap-3 animate-fade-in">
            <Check className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
            <div>
              <h5 className="font-bold text-xs text-emerald-950">Transmission Complete</h5>
              <p className="text-[11px] text-stone-600 mt-1">
                Your message has been successfully saved to local storage. You can view it below in the browser logs console!
              </p>
            </div>
          </div>
        )}

        {/* Persisted Messages Logs Console */}
        {inquiries.length > 0 && (
          <div className="mt-6 border-t border-[#E2E8F0] pt-6">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-[10px] font-mono font-bold tracking-widest text-stone-500 uppercase flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#0284C7]" />
                Submitted Inquiries Logs ({inquiries.length})
              </h5>
              <button
                onClick={() => saveInquiries([])}
                className="text-[9px] font-mono text-red-700 hover:text-red-900 flex items-center gap-1 bg-red-50 border border-red-200 px-2 py-1 rounded cursor-pointer"
              >
                <Trash2 className="w-3 h-3" /> Clear Console
              </button>
            </div>

            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
              {inquiries.map(item => (
                <div key={item.id} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3 text-xs relative">
                  <div className="flex justify-between items-start">
                    <div>
                      <strong className="text-stone-800">{item.name}</strong>
                      <span className="text-stone-500 text-[10px] font-mono ml-2">({item.organization})</span>
                    </div>
                    <span className="text-[9px] text-stone-400 font-mono">{item.timestamp}</span>
                  </div>
                  <p className="text-[10px] text-[#0284C7] font-mono mt-0.5">Subject: {item.subject}</p>
                  <p className="text-stone-600 font-sans mt-2 leading-relaxed bg-white rounded p-2 italic border border-[#E2E8F0]">
                    "{item.message}"
                  </p>
                  <div className="mt-2 flex items-center justify-between text-[9px] font-mono text-stone-400">
                    <span>Priority: <strong className={item.priority === 'High' ? 'text-red-600' : 'text-stone-500'}>{item.priority}</strong></span>
                    <button 
                      onClick={() => deleteInquiry(item.id)}
                      className="text-red-700 hover:text-red-950 cursor-pointer"
                    >
                      Delete Log
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
