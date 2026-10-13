import React, { useState } from 'react';
import { CalendarDays, ArrowUpRight, X, Languages, ArrowRight } from 'lucide-react';
import { DENTISTS, GENERAL_PRACTITIONERS } from '../data/doctorsManifest';
import { DoctorProfile } from '../types';

interface DoctorsSectionProps { onSelectDoctorForBooking: (doctorName: string) => void; standalonePage?: boolean; }
export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ onSelectDoctorForBooking, standalonePage = false }) => {
  const [selected, setSelected] = useState<DoctorProfile | null>(null);
  const practitioners = standalonePage ? GENERAL_PRACTITIONERS : GENERAL_PRACTITIONERS.slice(0, 4);
  return <section id="dentists" className={`py-20 sm:py-24 ${standalonePage ? 'bg-white' : 'bg-[#FCFDFC]'}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
        <p className="text-xs font-bold text-[#168C91] uppercase tracking-[.2em]">The people behind your care</p>
        <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#142D3D] tracking-tight">Meet Your Dental Team</h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">Get to know the general dentists featured by Goodwill Dental Care in Jebel Ali.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-9 max-w-5xl mx-auto">
        {DENTISTS.map(doctor => <article key={doctor.id} className="group bg-white rounded-[28px] border border-slate-200/80 overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="bg-gradient-to-br from-[#E9F8F3] via-white to-[#EAF8F5] pt-8 px-9 sm:px-12 overflow-hidden">
            <div className="mx-auto max-w-[315px] aspect-[1.2/1] overflow-hidden rounded-t-[120px] relative"><img src={doctor.imagePath} alt={`Portrait of ${doctor.name}`} loading="lazy" className="w-full h-full object-cover object-top group-hover:scale-[1.025] transition-transform duration-500" /></div>
          </div>
          <div className="p-7 sm:p-8"><span className="inline-block uppercase tracking-widest text-xs font-bold text-[#168C91] mb-2">{doctor.specialty}</span><h3 className="font-heading font-extrabold text-2xl text-[#142D3D]">{doctor.name}</h3><p className="mt-3 text-sm text-slate-600 leading-relaxed">{doctor.description}</p>
            <div className="mt-7 pt-5 border-t border-slate-100 flex flex-wrap gap-3 items-center"><button onClick={()=>setSelected(doctor)} className="text-sm font-bold text-[#142D3D] hover:text-[#168C91] inline-flex items-center gap-1.5">View Profile <ArrowUpRight className="w-4 h-4" /></button><button onClick={()=>onSelectDoctorForBooking(doctor.name)} className="ml-auto inline-flex items-center gap-2 bg-[#168C91] hover:bg-[#117479] text-white text-xs sm:text-sm font-bold px-4 py-3 rounded-xl"><CalendarDays className="w-4 h-4" /> Request Appointment</button></div>
          </div>
        </article>)}
      </div>
      <div className="mt-16 sm:mt-20 bg-gradient-to-br from-[#F1F8F6] to-[#F9FBFA] border border-slate-200 rounded-[32px] p-7 sm:p-10 lg:p-12">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-5 mb-8"><div><p className="text-xs text-[#168C91] uppercase tracking-[.18em] font-bold mb-3">Part of Goodwill Healthcare Group</p><h3 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-[#142D3D]">Our Wider Medical Team</h3><p className="mt-2 max-w-2xl text-sm text-slate-600 leading-relaxed">Meet the general practitioners in the broader Goodwill network. These practitioners are separate from our dental team.</p></div>{!standalonePage && <a href="#/dentists" className="inline-flex gap-2 items-center whitespace-nowrap text-[#168C91] text-sm font-bold hover:underline">View Full Team <ArrowRight className="w-4 h-4" /></a>}</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {practitioners.map(doctor => <button key={doctor.id} type="button" onClick={()=>setSelected(doctor)} className="group text-left bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-[#168C91]/50 hover:shadow-md transition-all">
            <div className="aspect-square bg-[#EAF8F5] overflow-hidden"><img src={doctor.imagePath} alt={`Portrait of ${doctor.name}`} loading="lazy" className="h-full w-full object-cover object-center group-hover:scale-[1.035] transition-transform duration-500" /></div>
            <div className="p-3.5 sm:p-4"><h4 className="text-xs sm:text-sm font-bold text-[#142D3D] leading-snug">{doctor.name}</h4><p className="text-[11px] sm:text-xs text-slate-500 mt-1">General Practitioner</p></div>
          </button>)}
        </div>
        {!standalonePage && <p className="text-xs text-slate-500 mt-5">The dedicated team page includes all six general practitioners. For medical consultations, please contact clinic reception.</p>}
      </div>
    </div>
    {selected && <div role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setSelected(null)}} className="fixed z-50 inset-0 bg-[#061922]/75 backdrop-blur-sm flex items-center justify-center p-4"><div role="dialog" aria-modal="true" aria-label={`Profile of ${selected.name}`} className="relative max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-7 sm:p-9 shadow-2xl"><button type="button" aria-label="Close profile" onClick={()=>setSelected(null)} className="absolute top-5 right-5 w-10 h-10 rounded-full hover:bg-slate-100 grid place-items-center"><X className="w-5 h-5" /></button><div className="h-44 w-44 mx-auto rounded-full bg-[#EAF8F5] overflow-hidden"><img className="h-full w-full object-cover" src={selected.imagePath} alt={selected.name} /></div><p className="text-center text-[#168C91] text-xs font-bold uppercase tracking-[.16em] mt-6">{selected.specialty}</p><h3 className="text-center font-heading font-extrabold text-2xl text-[#142D3D] mt-2">{selected.name}</h3><p className="text-center text-sm text-slate-600 leading-relaxed mt-4">{selected.description}</p>{selected.languages && <p className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-600"><Languages className="w-4 h-4 text-[#168C91]" /> Languages: {selected.languages.join(', ')}</p>}{selected.roleType === 'dentist' ? <button type="button" onClick={()=>{let name=selected.name;setSelected(null);onSelectDoctorForBooking(name);}} className="mt-7 mx-auto bg-[#168C91] rounded-xl py-3.5 px-6 font-bold text-white text-sm flex items-center gap-2"><CalendarDays className="w-4 h-4" /> Request Appointment</button> : <p className="mt-6 text-center text-sm text-slate-500">Please contact clinic reception to enquire about general medical consultations.</p>}</div></div>}
  </section>;
};
