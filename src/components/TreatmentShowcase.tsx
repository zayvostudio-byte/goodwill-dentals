import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, CalendarDays, X, Info } from 'lucide-react';
import { DENTAL_TREATMENTS } from '../data/clinicData';
import { DentalTreatment } from '../types';

interface TreatmentShowcaseProps { onSelectTreatmentForBooking: (treatmentId: string) => void; standalonePage?: boolean; }
const publicTreatments = DENTAL_TREATMENTS.filter(t => t.category === 'core_verified');

export const TreatmentShowcase: React.FC<TreatmentShowcaseProps> = ({ onSelectTreatmentForBooking, standalonePage = false }) => {
  const [selected, setSelected] = useState<DentalTreatment | null>(null);
  return <section id="treatments" className={`py-20 sm:py-24 ${standalonePage ? 'bg-white' : 'bg-[#F7FAF9]'}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-14 space-y-4">
        <p className="text-[#168C91] font-bold text-xs uppercase tracking-[.2em]">Dental care</p>
        <h2 className="font-heading font-extrabold text-[#142D3D] text-3xl sm:text-5xl tracking-tight leading-tight">Complete Care for Every Smile</h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">Explore dental care options and ask our reception team about currently available treatments and appointments in Jebel Ali.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
        {publicTreatments.map(t => <article key={t.id} className="group bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
          <button type="button" onClick={() => setSelected(t)} className="relative overflow-hidden aspect-[16/10] bg-[#EAF8F5] text-left" aria-label={`Learn about ${t.name}`}>
            <img src={t.imagePath} alt={`Illustrative photograph for ${t.name}`} loading="lazy" className="h-full w-full object-cover group-hover:scale-[1.035] transition-transform duration-700" />
            <span className="absolute bottom-3 left-4 bg-[#142D3D]/75 text-white backdrop-blur-sm text-[10px] px-2 py-1 rounded">Illustrative image</span>
          </button>
          <div className="p-6 sm:p-7 flex flex-col flex-1">
            <h3 className="text-[#142D3D] text-lg font-extrabold font-heading leading-snug">{t.name}</h3>
            <p className="text-slate-600 text-sm leading-relaxed mt-3 flex-1">{t.tagline}</p>
            <button type="button" onClick={() => setSelected(t)} className="mt-6 pt-4 border-t border-slate-100 text-[#168C91] hover:text-[#0e686f] text-sm font-bold inline-flex gap-2 items-center justify-between">Learn More <ArrowUpRight className="w-4 h-4" /></button>
          </div>
        </article>)}
      </div>
      <div className="mt-10 flex flex-col items-center gap-4">
        <p className="text-center text-xs text-slate-500 max-w-2xl">Please confirm treatment availability with the clinic. Individual procedures depend on an in-person dental assessment.</p>
        {standalonePage ? <button onClick={() => onSelectTreatmentForBooking('consultation-exam')} className="px-7 py-3.5 rounded-xl font-bold text-sm bg-[#168C91] text-white hover:bg-[#117479] inline-flex gap-2 items-center"><CalendarDays className="w-4 h-4" /> Request a Consultation</button> : <a href="#/treatments" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#142D3D] hover:bg-[#253c4c] text-white rounded-xl text-sm font-bold">Explore All Treatments <ArrowRight className="w-4 h-4" /></a>}
      </div>
    </div>
    {selected && <div role="presentation" className="fixed inset-0 z-50 bg-[#071a24]/75 backdrop-blur-sm flex items-center justify-center p-4" onMouseDown={e => {if(e.target===e.currentTarget)setSelected(null);}}>
      <div role="dialog" aria-modal="true" aria-label={selected.name} className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-6 sm:p-9 shadow-2xl">
        <button type="button" onClick={() => setSelected(null)} aria-label="Close treatment details" className="absolute top-5 right-5 w-9 h-9 rounded-full grid place-items-center hover:bg-slate-100"><X className="w-5 h-5" /></button>
        <p className="text-xs font-bold text-[#168C91] uppercase tracking-widest mb-3">Dental treatment information</p>
        <h3 className="font-heading font-extrabold text-2xl sm:text-3xl max-w-lg text-[#142D3D]">{selected.name}</h3>
        <p className="text-sm text-slate-600 leading-relaxed mt-4">{selected.description}</p>
        <div className="mt-6 p-5 rounded-2xl bg-[#F7FAF9]"><h4 className="text-sm font-bold text-[#142D3D] mb-3">What your dentist may discuss</h4><ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">{selected.procedureOverview.map(item=><li key={item}>{item}</li>)}</ul></div>
        <p className="mt-5 text-xs text-slate-500 flex gap-2 items-start"><Info className="w-4 h-4 shrink-0 text-[#168C91]" />The information above is general education, not a personalized diagnosis. Contact reception to confirm whether this treatment is currently offered.</p>
        <button type="button" onClick={() => { const id=selected.id;setSelected(null);onSelectTreatmentForBooking(id); }} className="mt-6 inline-flex items-center gap-2 bg-[#168C91] text-white rounded-xl py-3 px-5 text-sm font-bold hover:bg-[#117479]"><CalendarDays className="w-4 h-4" /> Request Consultation</button>
      </div>
    </div>}
  </section>;
};
