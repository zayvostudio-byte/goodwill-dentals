import React from 'react';
import { CalendarCheck2, ClipboardList, CheckCircle2, ArrowRight } from 'lucide-react';
const steps = [
  { number: '01', title: 'Choose Your Treatment', description: 'Select a dental consultation or explore care options.', icon: ClipboardList },
  { number: '02', title: 'Request Your Appointment', description: 'Choose your preferred dentist, date and time.', icon: CalendarCheck2 },
  { number: '03', title: 'Receive Clinic Confirmation', description: 'Contact reception to finalize availability. The demo does not notify the clinic.', icon: CheckCircle2 },
];
export const VisitStepsSection: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => <section className="py-20 sm:py-24 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="text-center max-w-2xl mx-auto mb-14 space-y-4"><p className="text-xs text-[#168C91] font-bold uppercase tracking-[.2em]">Simple & clear</p><h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#142D3D] tracking-tight">Your Visit, Made Simple</h2><p className="text-sm sm:text-base text-slate-600">A clear path from exploring care to arranging your consultation.</p></div>
    <div className="max-w-5xl mx-auto relative"><div className="hidden md:block absolute top-[54px] left-[18%] right-[18%] border-t border-dashed border-[#168C91]/40" /><div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">{steps.map(step=><article key={step.number} className="bg-[#F6FAF8] border border-slate-200 rounded-3xl p-7 text-center hover:shadow-md transition-shadow"><div className="w-[88px] h-[88px] mx-auto rounded-full border-8 border-white bg-[#EAF8F5] text-[#168C91] flex items-center justify-center relative shadow-sm"><step.icon className="w-7 h-7" /></div><p className="text-[#168C91] text-xs font-extrabold tracking-[.2em] mt-6">STEP {step.number}</p><h3 className="font-heading font-bold text-lg mt-2 text-[#142D3D]">{step.title}</h3><p className="text-sm leading-relaxed mt-3 text-slate-600">{step.description}</p></article>)}</div></div>
    <div className="text-center mt-10"><button type="button" onClick={onOpenBooking} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#168C91] hover:bg-[#117479] text-white text-sm font-bold">Schedule Your Visit <ArrowRight className="w-4 h-4" /></button></div>
  </div>
</section>;
