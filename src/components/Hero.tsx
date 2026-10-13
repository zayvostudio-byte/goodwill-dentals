import React from 'react';
import { ArrowUpRight, ArrowRight, CalendarDays, HeartHandshake, MapPin, ShieldCheck } from 'lucide-react';

interface HeroProps { onOpenBooking: () => void; onExploreTreatments: () => void; }
const highlights = [
  { icon: HeartHandshake, title: 'Patient-focused care', description: 'Your comfort comes first' },
  { icon: ShieldCheck, title: 'Dental professionals', description: 'Meet our general dentists' },
  { icon: MapPin, title: 'Convenient Jebel Ali location', description: 'Talal Plaza Hypermarket' },
];
export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreTreatments }) => (
  <section className="overflow-hidden relative bg-gradient-to-br from-[#F0FAF6] via-white to-[#F8FAF9] border-b border-slate-100">
    <div className="pointer-events-none absolute -top-56 -right-44 w-[650px] h-[650px] rounded-full bg-[#DBF4EA] blur-3xl opacity-60" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-10 lg:pb-16 relative">
      <div className="grid grid-cols-1 lg:grid-cols-[1.04fr_.96fr] gap-12 lg:gap-16 items-center">
        <div className="space-y-7">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.19em] text-[#168C91]"><span className="w-7 h-px bg-[#83C64A]" />Goodwill Dental Care · Dubai</div>
          <h1 className="font-heading text-[#142D3D] font-extrabold text-5xl sm:text-6xl xl:text-[70px] leading-[1.06] tracking-[-.055em] max-w-[750px]">A Healthier Smile <span className="text-[#168C91]">Starts Here.</span></h1>
          <p className="text-slate-600 leading-relaxed text-base sm:text-lg max-w-xl">Thoughtful, professional dental care in Jebel Ali, Dubai — focused on your comfort and oral health.</p>
          <div className="flex gap-3 flex-wrap pt-2">
            <button type="button" onClick={onOpenBooking} className="inline-flex justify-center items-center gap-2 bg-[#168C91] hover:bg-[#117479] text-white rounded-xl px-6 py-4 text-sm font-bold shadow-lg shadow-[#168C91]/20 transition-all"><CalendarDays className="w-4 h-4" /> Book an Appointment <ArrowUpRight className="w-4 h-4" /></button>
            <button type="button" onClick={onExploreTreatments} className="inline-flex justify-center items-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-6 py-4 text-sm font-bold text-[#142D3D] hover:border-[#168C91] hover:text-[#168C91] transition-colors">Explore Treatments <ArrowRight className="w-4 h-4" /></button>
          </div>
          <p className="text-xs text-slate-500 max-w-md">Appointments are requested online and confirmed by the clinic team. Individual dentist schedules may vary.</p>
        </div>
        <div className="relative lg:pl-6">
          <div className="absolute -inset-4 rounded-[44px] border border-[#168C91]/10 -rotate-3" />
          <div className="relative overflow-hidden rounded-[34px] rounded-tr-[100px] shadow-2xl shadow-[#142D3D]/15 aspect-[4/4.3] sm:aspect-[5/4] lg:aspect-[4/4.4] bg-[#EAF8F5]">
            <img src="/assets/goodwill/pexels-photo-4971512.png" alt="Illustrative dental care consultation" className="h-full w-full object-cover object-center" fetchPriority="high" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#142D3D]/45 to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 text-white text-xs bg-[#142D3D]/60 backdrop-blur-md rounded-lg px-3 py-2">Dental care illustration</div>
          </div>
        </div>
      </div>
      <div className="mt-14 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 rounded-3xl border border-slate-200/75 bg-white/90 p-4 sm:p-5 shadow-sm">
        {highlights.map(({ icon: Icon, title, description }, idx) => <div key={title} className={`flex items-start gap-3 py-2 px-3 ${idx ? 'md:border-l border-slate-200 md:pl-6' : ''}`}><span className="w-10 h-10 rounded-xl bg-[#EAF8F5] text-[#168C91] flex justify-center items-center shrink-0"><Icon className="w-5 h-5" /></span><div><strong className="text-sm text-[#142D3D] block">{title}</strong><span className="text-xs text-slate-500">{description}</span></div></div>)}
      </div>
    </div>
  </section>
);
