import React, { useState } from 'react';
import { CLINIC_GALLERY, BUSINESS_DETAILS } from '../data/clinicData';
import { ClinicGalleryPhoto } from '../types';
import { ArrowUpRight, MapPin, X } from 'lucide-react';

const realPhotos = CLINIC_GALLERY.filter(p => p.isRealGoodwill && p.category !== 'graphic');
export const ClinicGallerySection: React.FC<{ standalonePage?: boolean }> = ({ standalonePage = false }) => {
  const [active, setActive] = useState<ClinicGalleryPhoto | null>(null);
  return <section id="clinic" className={`${standalonePage ? 'bg-white' : 'bg-[#F7FAF9]'} py-20 sm:py-24`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
        <p className="text-xs uppercase tracking-[.2em] text-[#168C91] font-bold">A look inside</p>
        <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#142D3D] tracking-tight">Our Clinic at Talal Plaza</h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">A glimpse of the real Goodwill clinic in Jebel Ali. These are authentic photographs, not computer-generated interiors.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
        {realPhotos.map((photo,i) => <button type="button" onClick={() => setActive(photo)} key={photo.id} className={`group text-left relative rounded-3xl overflow-hidden bg-[#EAF8F5] shadow-md border border-slate-200/80 ${i===0 ? 'md:row-span-2 h-[340px] md:h-full min-h-[340px]' : 'h-[270px] sm:h-[320px]'}`}>
          <img src={photo.path} alt={photo.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071e2b]/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 p-6 sm:p-8 text-white w-full flex items-end justify-between"><div><h3 className="font-heading font-bold text-lg sm:text-xl">{photo.title}</h3><p className="text-white/80 text-xs mt-1">{photo.caption}</p></div><span className="w-10 h-10 bg-white/20 backdrop-blur rounded-full shrink-0 grid place-items-center"><ArrowUpRight className="w-5 h-5" /></span></div>
        </button>)}
      </div>
      <div className="flex flex-wrap justify-center items-center gap-4 mt-10">
        <span className="text-sm text-slate-600 inline-flex gap-2 items-center"><MapPin className="w-4 h-4 text-[#168C91]" /> {BUSINESS_DETAILS.shortLocation}, Dubai</span>
        <a className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-xl bg-[#142D3D] text-white hover:bg-[#253c4c]" href="https://www.google.com/maps/search/?api=1&query=Goodwill+Dental+Care+Talal+Plaza+Jebel+Ali+Dubai" target="_blank" rel="noopener noreferrer">Get Directions <ArrowUpRight className="w-4 h-4" /></a>
      </div>
    </div>
    {active && <div role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setActive(null);}} className="fixed inset-0 z-50 flex items-center justify-center bg-[#071e2b]/85 p-4"><div role="dialog" aria-modal="true" aria-label={active.title} className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"><button aria-label="Close image" type="button" onClick={()=>setActive(null)} className="absolute right-4 top-4 z-10 bg-[#142D3D] text-white rounded-full w-10 h-10 grid place-items-center"><X className="w-5 h-5" /></button><img src={active.path} alt={active.title} className="w-full max-h-[75vh] object-contain bg-slate-100" /><div className="p-5"><h3 className="font-heading font-bold text-[#142D3D]">{active.title}</h3><p className="text-sm text-slate-600 mt-1">{active.caption}</p></div></div></div>}
  </section>;
};
