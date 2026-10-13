import React, { useEffect, useState } from 'react';
import { Phone, Clock3, CalendarDays, Menu, X, MessageCircle, ChevronDown, LayoutDashboard } from 'lucide-react';
import { BUSINESS_DETAILS } from '../data/clinicData';
import { NavRoute } from '../types';

interface HeaderProps {
  currentRoute: NavRoute;
  onNavigate: (route: NavRoute) => void;
  onOpenBooking: () => void;
  onOpenPortal: () => void;
}

const mainLinks: { route: NavRoute; label: string }[] = [
  { route: 'home', label: 'Home' },
  { route: 'about', label: 'About' },
  { route: 'treatments', label: 'Treatments' },
  { route: 'dentists', label: 'Dentists' },
  { route: 'clinic', label: 'Our Clinic' },
  { route: 'contact', label: 'Contact' },
];

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate, onOpenBooking, onOpenPortal }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  const go = (route: NavRoute) => { onNavigate(route); setMenuOpen(false); setMoreOpen(false); };
  const book = () => { setMenuOpen(false); setMoreOpen(false); onOpenBooking(); };
  return (
    <header className={`sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/70 transition-shadow ${scrolled ? 'shadow-lg shadow-slate-900/5' : ''}`}>
      <div className="bg-[#142D3D] text-white/85">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-9 flex flex-wrap justify-center sm:justify-between items-center gap-x-5 gap-y-1 py-1 text-[11px] sm:text-xs">
          <span className="flex gap-2 items-center whitespace-nowrap"><Clock3 className="h-3.5 w-3.5 text-[#83C64A]" /><span>{BUSINESS_DETAILS.hoursListing}</span></span>
          <div className="flex gap-4 sm:gap-6 items-center">
            <a href={BUSINESS_DETAILS.phoneHref} className="inline-flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap"><Phone className="h-3.5 w-3.5 text-[#83C64A]" />{BUSINESS_DETAILS.landline}</a>
            <a href={BUSINESS_DETAILS.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap"><MessageCircle className="h-3.5 w-3.5 text-[#83C64A]" /><span className="hidden sm:inline">WhatsApp</span><span className="sm:hidden">Chat</span></a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-[74px] flex items-center gap-5 xl:gap-8 justify-between">
          <button type="button" onClick={() => go('home')} aria-label="Goodwill Dental Care, homepage" className="group flex gap-2.5 items-center shrink-0 text-left min-w-0">
            <img src="/assets/goodwill/imgi_1_logo.png" alt="Goodwill Healthcare Group logo" className="w-[69px] sm:w-[82px] h-12 object-contain shrink-0" />
            <span className="hidden sm:block min-w-0"><strong className="block leading-tight text-[16px] font-extrabold tracking-tight text-[#142D3D] group-hover:text-[#168C91] transition-colors">Goodwill <span className="block">Dental Care</span></strong><small className="block text-[10px] mt-1 text-slate-500">Jebel Ali · Dubai</small></span>
          </button>
          <nav aria-label="Primary navigation" className="hidden xl:flex items-center gap-5 2xl:gap-7 min-w-0 flex-1 justify-center">
            {mainLinks.map(link => <button key={link.route} type="button" onClick={() => go(link.route)} aria-current={currentRoute === link.route ? 'page' : undefined} className={`whitespace-nowrap text-[13px] font-semibold py-2 border-b-2 transition-colors ${currentRoute === link.route ? 'text-[#168C91] border-[#168C91]' : 'text-[#45576a] border-transparent hover:text-[#168C91]'}`}>{link.label}</button>)}
            <div className="relative">
              <button type="button" onClick={() => setMoreOpen(!moreOpen)} aria-expanded={moreOpen} className="flex gap-1 items-center whitespace-nowrap text-[13px] font-semibold py-2 text-[#45576a] hover:text-[#168C91]">More <ChevronDown className="w-3.5 h-3.5" /></button>
              {moreOpen && <div className="absolute top-full right-0 w-56 bg-white border border-slate-200 shadow-xl rounded-2xl p-2 mt-2">
                <button type="button" onClick={() => go('reviews')} className="block w-full text-left px-4 py-3 text-sm hover:bg-[#EAF8F5] rounded-xl">Patient Reviews</button>
                <button type="button" onClick={() => { setMoreOpen(false); onOpenPortal(); }} className="flex gap-2 items-center w-full text-left px-4 py-3 text-sm hover:bg-[#EAF8F5] rounded-xl"><LayoutDashboard className="w-4 h-4" />Portal demo</button>
              </div>}
            </div>
          </nav>
          <div className="flex items-center gap-2.5 shrink-0 ml-auto xl:ml-0">
            <button type="button" onClick={book} className="inline-flex items-center justify-center gap-2 whitespace-nowrap px-3 sm:px-5 py-3 bg-[#168C91] hover:bg-[#117479] text-white rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md shadow-teal-900/10"><CalendarDays className="h-4 w-4" /><span className="hidden sm:inline">Book Appointment</span><span className="sm:hidden">Book</span></button>
            <button type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="site-mobile-navigation" className="xl:hidden w-11 h-11 border border-slate-200 rounded-xl grid place-items-center text-[#142D3D] hover:bg-[#EAF8F5]">{menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
          </div>
        </div>
      </div>
      {menuOpen && <nav id="site-mobile-navigation" aria-label="Mobile navigation" className="xl:hidden max-h-[75vh] overflow-y-auto bg-white border-t border-slate-100 shadow-xl px-4 sm:px-6 pb-5 pt-2">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-1">
          {[...mainLinks, { route: 'reviews' as NavRoute, label: 'Patient Reviews' }].map(link => <button key={link.route} type="button" onClick={() => go(link.route)} className={`text-left px-4 py-3 rounded-xl text-sm font-semibold ${currentRoute === link.route ? 'bg-[#EAF8F5] text-[#168C91]' : 'text-[#142D3D] hover:bg-slate-50'}`}>{link.label}</button>)}
          <button type="button" onClick={() => { setMenuOpen(false); onOpenPortal(); }} className="text-left px-4 py-3 rounded-xl text-sm text-slate-600 hover:bg-slate-50">Clinic Portal (Demo)</button>
        </div>
      </nav>}
    </header>
  );
};
