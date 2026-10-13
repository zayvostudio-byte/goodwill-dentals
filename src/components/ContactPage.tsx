import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle, 
  Mail, 
  Send, 
  Car, 
  Train, 
  Bus, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { BUSINESS_DETAILS } from '../data/clinicData';

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Dental Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    // Draft-only: without a configured backend, open the visitor's own mail client.
    // Nothing is automatically transmitted or stored by this website.
    const subject = encodeURIComponent(`Goodwill Dental Care — ${formData.subject}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email || 'Not provided'}\n\n${formData.message || 'General enquiry'}`);
    window.location.href = `mailto:${BUSINESS_DETAILS.email}?subject=${subject}&body=${body}`;
    setFormSubmitted(true);
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#168C91] bg-[#EAF8F5] px-3 py-1 rounded-full">
            <span>Location & Contact</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#142D3D] tracking-tight">
            Contact Goodwill Dental Care
          </h1>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            Located on the 1st Floor of Talal Plaza Hypermarket in Jebel Ali Industrial 1, Dubai. Please contact reception for access and parking details.
          </p>
        </div>

        {/* Contact Information & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#F5F8F6] rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-5">
              <h3 className="font-heading font-bold text-lg text-[#142D3D]">
                Clinic Contact Details
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#168C91] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#142D3D] block text-xs">Physical Address</span>
                    <span className="text-slate-600 leading-relaxed block mt-0.5">
                      {BUSINESS_DETAILS.location}
                    </span>
                    <span className="text-[#168C91] font-semibold block mt-1">
                      Located on the 1st Floor
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#83C64A] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#142D3D] block text-xs">Operating Hours</span>
                    <span className="text-slate-600 font-medium block mt-0.5">
                      {BUSINESS_DETAILS.hoursListing}
                    </span>
                    <span className="text-[11px] text-slate-400 block italic">
                      Individual dentist hours vary by duty rota.
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#168C91] flex items-center justify-center shrink-0 shadow-2xs">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#142D3D] block text-xs">Landline Telephone</span>
                    <a href={BUSINESS_DETAILS.phoneHref} className="text-[#168C91] hover:underline font-bold text-sm">
                      {BUSINESS_DETAILS.landline}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-emerald-600 flex items-center justify-center shrink-0 shadow-2xs">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#142D3D] block text-xs">WhatsApp & Mobile</span>
                    <a 
                      href={BUSINESS_DETAILS.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:underline font-bold text-sm"
                    >
                      {BUSINESS_DETAILS.whatsapp}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#168C91] flex items-center justify-center shrink-0 shadow-2xs">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#142D3D] block text-xs">Official Email</span>
                    <a href={BUSINESS_DETAILS.emailHref} className="text-slate-700 hover:underline font-medium">
                      {BUSINESS_DETAILS.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="pt-2 grid grid-cols-2 gap-2">
                <a
                  href={BUSINESS_DETAILS.phoneHref}
                  className="py-3 px-3 rounded-xl bg-[#142D3D] hover:bg-slate-800 text-white text-xs font-bold text-center transition-colors"
                >
                  Call Clinic
                </a>
                <a
                  href={BUSINESS_DETAILS.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Transit & Parking Guidance */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-3">
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#142D3D]">
                Directions to Talal Plaza:
              </h4>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <Car className="w-4 h-4 text-[#168C91] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#142D3D]">Driving & Parking: </span>
                    For the best driving route, open the Google Maps directions link. Please contact reception for current parking and entrance guidance.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Train className="w-4 h-4 text-[#168C91] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#142D3D]">Dubai Metro: </span>
                    Accessible via Danube Metro Station or UAE Exchange Station, followed by an RTA taxi or feeder bus ride into Jebel Ali Industrial 1.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Bus className="w-4 h-4 text-[#168C91] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#142D3D]">RTA Public Bus: </span>
                    Feeder routes F54 and Bus 99 stop within comfortable walking distance of the hypermarket.
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Embedded Map & Contact Form */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Embedded Google Map Centered on Goodwill Dental Care Location */}
            <div className="bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-xs relative h-80">
              <iframe
                title="Goodwill Dental Care Jebel Ali Industrial 1 Location"
                src="https://maps.google.com/maps?q=Talal%20Plaza%20Hypermarket,%20Jebel%20Ali%20Industrial%201,%20Dubai&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-200 text-[#142D3D] text-xs font-bold shadow-md flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>Goodwill Dental Care · 1st Floor Talal Plaza</span>
              </div>
              <div className="absolute top-4 right-4">
                <a
                  href="https://maps.google.com/?q=Talal+Plaza+Hypermarket+Jebel+Ali+Industrial+1+Dubai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#142D3D] text-white text-xs font-bold shadow-md flex items-center gap-1.5 hover:bg-slate-800 transition-colors"
                >
                  <span>Get Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* General Contact Inquiry Form */}
            <div className="bg-[#F5F8F6] rounded-3xl p-6 sm:p-8 border border-slate-200">
              <h3 className="font-heading font-bold text-lg text-[#142D3D] mb-1">
                Send a Non-Urgent Dental Message
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                This opens a prefilled draft in your email app. Nothing is sent automatically. For urgent enquiries or appointments, call or WhatsApp reception. Please do not include sensitive medical details.
              </p>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading font-bold text-base text-emerald-900">
                    Email Draft Prepared
                  </h4>
                  <p className="text-xs text-emerald-800">
                    Your email application should open with a draft addressed to Goodwill reception. Please press Send in your email application to actually deliver it. The website has not sent anything automatically.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', phone: '', email: '', subject: 'General Dental Inquiry', message: '' });
                    }}
                    className="text-xs text-emerald-700 font-semibold hover:underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Mohammed Salem"
                        className="w-full text-xs py-2.5 px-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-hidden focus:border-[#168C91]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+971 50 123 4567"
                        className="w-full text-xs py-2.5 px-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-hidden focus:border-[#168C91]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="yourname@example.com"
                        className="w-full text-xs py-2.5 px-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-hidden focus:border-[#168C91]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Inquiry Topic
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full text-xs py-2.5 px-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-hidden focus:border-[#168C91]"
                      >
                        <option value="General Dental Inquiry">General Dental Inquiry</option>
                        <option value="Toothache / Discomfort Question">Toothache / Discomfort Question</option>
                        <option value="Directions to Talal Plaza 1st Floor">Directions to Talal Plaza 1st Floor</option>
                        <option value="Dentist Availability Query">Dentist Availability Query</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Enter your inquiry or questions..."
                      className="w-full text-xs py-2 px-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-hidden focus:border-[#168C91]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-[#168C91] hover:bg-[#127276] text-white font-bold text-xs tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>Open Email Draft</span>
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
