import React from 'react';
import { ShieldCheck, Heart, MapPin, Clock, Users, ArrowRight, Calendar } from 'lucide-react';
import { BUSINESS_DETAILS } from '../data/clinicData';

interface AboutPageProps {
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Intro */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#168C91] bg-[#EAF8F5] px-3 py-1 rounded-full">
            <span>Goodwill Healthcare Group</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#142D3D] tracking-tight">
            About Goodwill Dental Care Dubai
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Goodwill Dental Care is the dedicated dental branch of Goodwill Healthcare Group in Dubai. Located on the 1st Floor of Talal Plaza Hypermarket in Jebel Ali Industrial 1, we provide accessible, patient-centered oral health consultations and restorative dentistry.
          </p>
        </div>

        {/* Real Facility Visuals Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200">
              <img
                src="/assets/goodwill/imgi_9_clinic_exterior.jpg"
                alt="Goodwill Dental Care Exterior Clinic Entrance"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#142D3D]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-bold text-[#83C64A] uppercase tracking-wider">
                  Real Clinic Facility
                </span>
                <h3 className="font-heading font-bold text-lg text-white mt-1">
                  1st Floor, Talal Plaza Hypermarket, Jebel Ali 1
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Contact reception for access and parking information.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden shadow-md border border-slate-200">
              <img
                src="/assets/goodwill/imgi_13_consultation_room.jpg"
                alt="Goodwill Consultation Room with Patient and Clinician"
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-white">
                <span className="text-xs font-bold text-[#142D3D] block">
                  Authentic Clinical Setting
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  Actual Goodwill consultation room with clinician discussing oral care with a patient.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#EAF8F5] border border-[#168C91]/30 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#168C91]" />
                <span className="font-heading font-bold text-sm text-[#142D3D]">
                  A Patient-Centered Approach
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Get in touch with Goodwill reception for official clinician credentials, available services and appointment information.
              </p>
            </div>
          </div>
        </div>

        {/* Practical Philosophy & Community Focus */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200">
          <div className="space-y-2 p-6 rounded-2xl bg-[#F5F8F6] border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-white text-[#168C91] flex items-center justify-center shadow-2xs font-bold">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-base text-[#142D3D]">
              Patient-First Care Philosophy
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We focus on listening to patient concerns, identifying the root cause of oral discomfort, and delivering conservative dental treatments without pressure or upselling.
            </p>
          </div>

          <div className="space-y-2 p-6 rounded-2xl bg-[#F5F8F6] border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-white text-[#168C91] flex items-center justify-center shadow-2xs font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-base text-[#142D3D]">
              Jebel Ali Community Focus
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Positioned centrally in Jebel Ali Industrial 1, we make quality dental care accessible to local workers, engineers, families, and residential communities.
            </p>
          </div>

          <div className="space-y-2 p-6 rounded-2xl bg-[#F5F8F6] border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-white text-[#168C91] flex items-center justify-center shadow-2xs font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-base text-[#142D3D]">
              Accessible Daily Timings
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our clinic facility is listed as open daily from 7:30 AM to 11:30 PM, accommodating shift workers and busy family schedules across Dubai.
            </p>
          </div>
        </div>

        {/* Clarification Callout */}
        <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs text-[#83C64A] font-bold uppercase tracking-wider block">
              Independent Facility Clarification
            </span>
            <h4 className="font-heading font-bold text-lg text-white">
              Goodwill Dental Care · Talal Plaza Hypermarket
            </h4>
            <p className="text-xs text-slate-300 max-w-xl">
              Please note our exact location in Jebel Ali Industrial 1. We are not connected to other regional facilities such as Bright Life Dental Care in DIP-2.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="px-6 py-3 rounded-xl bg-[#168C91] hover:bg-[#127276] text-white font-bold text-xs shrink-0 transition-colors shadow-xs"
          >
            Request Appointment
          </button>
        </div>

      </div>
    </div>
  );
};
