import React, { useState } from 'react';
import { ChevronDown, MessageCircle, ArrowUpRight } from 'lucide-react';
import { CLINIC_FAQS, BUSINESS_DETAILS } from '../data/clinicData';
export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return <section className="py-20 sm:py-24 bg-[#F7FAF9]">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><div className="text-center space-y-4 mb-12"><p className="text-xs uppercase tracking-[.2em] text-[#168C91] font-bold">Here to help</p><h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#142D3D] tracking-tight">Frequently Asked Questions</h2><p className="text-sm sm:text-base text-slate-600">Helpful answers about our location and appointment enquiries.</p></div>
      <div className="space-y-3">{CLINIC_FAQS.slice(0,6).map((faq,i)=><div key={faq.q} className={`rounded-2xl overflow-hidden border transition-colors ${openIndex===i ? 'border-[#168C91]/30 bg-[#EAF8F5]' : 'border-slate-200 bg-white'}`}><h3><button type="button" onClick={()=>setOpenIndex(openIndex===i?null:i)} aria-expanded={openIndex===i} aria-controls={`faq-content-${i}`} className="w-full flex justify-between items-center gap-4 px-5 sm:px-7 py-5 text-left"><span className="text-sm sm:text-base font-bold text-[#142D3D]">{faq.q}</span><ChevronDown className={`text-[#168C91] w-5 h-5 shrink-0 transition-transform ${openIndex===i?'rotate-180':''}`} /></button></h3>{openIndex===i && <p id={`faq-content-${i}`} className="text-sm text-slate-600 leading-relaxed px-5 sm:px-7 pb-6">{faq.a}</p>}</div>)}</div>
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-9 p-6 rounded-2xl border border-slate-200 bg-white"><div><strong className="text-[#142D3D] font-heading text-lg">Still have questions?</strong><p className="text-sm text-slate-600 mt-1">Our reception team can assist with enquiries.</p></div><a href={BUSINESS_DETAILS.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex gap-2 items-center shrink-0 bg-[#142D3D] hover:bg-[#263e4e] text-white font-bold text-sm px-5 py-3 rounded-xl"><MessageCircle className="w-4 h-4" /> Chat With Our Team <ArrowUpRight className="w-4 h-4" /></a></div>
    </div>
  </section>;
};
