import React, { useState } from 'react';
import { MessageCircle, X, Send, Phone, Clock } from 'lucide-react';
import { BUSINESS_DETAILS } from '../data/clinicData';

export const WhatsAppFloat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const quickInquiries = [
    'I would like to inquire about dental consultation availability today.',
    'Could you provide details on dental scaling and checkups?',
    'What are your dentist duty hours at Talal Plaza Hypermarket?',
    'I have a toothache and would like to know if walk-in is available.',
  ];

  const handleSend = (text: string) => {
    const url = `https://wa.me/${BUSINESS_DETAILS.whatsappDigits}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col items-end">
      
      {/* Quick Questions Card Drawer */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom duration-150">
          <div className="bg-[#142D3D] text-white p-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-xs">
                GW
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs text-white">
                  Goodwill Dental Care WhatsApp
                </h4>
                <p className="text-[10px] text-[#83C64A]">
                  Talal Plaza 1st Floor · Jebel Ali 1
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3 bg-[#F5F8F6] text-xs">
            <p className="text-[11px] text-slate-600 leading-snug">
              Choose an inquiry topic below to open a direct chat on WhatsApp with our clinic reception:
            </p>

            <div className="space-y-1.5">
              {quickInquiries.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 text-[11px] font-medium transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <span className="group-hover:text-emerald-800 leading-tight">{q}</span>
                  <Send className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 shrink-0 ml-2" />
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
              <a href={BUSINESS_DETAILS.phoneHref} className="hover:text-slate-900 flex items-center gap-1 font-semibold text-[#168C91]">
                <Phone className="w-3 h-3" />
                <span>Call: {BUSINESS_DETAILS.landline}</span>
              </a>
              <span className="text-[10px] text-slate-400">Listed: 7:30 AM – 11:30 PM</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl shadow-emerald-700/25 hover:scale-105 transition-all cursor-pointer"
        aria-label="Open WhatsApp Inquiry"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="text-xs font-bold tracking-wide">
          WhatsApp Reception
        </span>
      </button>

    </div>
  );
};
