import React from 'react';
import { Phone, Calendar, MessageCircle } from 'lucide-react';
import { BUSINESS_DETAILS } from '../data/clinicData';

interface MobileStickyBarProps {
  onOpenBooking: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenBooking }) => {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 shadow-lg flex items-center justify-between gap-3">
      <a
        href={BUSINESS_DETAILS.phoneHref}
        className="flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-xs transition-colors"
        aria-label="Call Goodwill Dental Care"
      >
        <Phone className="w-4 h-4 text-teal-300" />
        <span>Call</span>
      </a>

      <button
        onClick={onOpenBooking}
        className="flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#168C91] hover:bg-[#127276] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
        aria-label="Request Appointment"
      >
        <Calendar className="w-4 h-4" />
        <span>Request Visit</span>
      </button>

      <a
        href={BUSINESS_DETAILS.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shrink-0"
        aria-label="WhatsApp Goodwill Dental Care"
        title="WhatsApp"
      >
        <MessageCircle className="w-4 h-4" />
      </a>
    </div>
  );
};
