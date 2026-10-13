import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TreatmentShowcase } from './components/TreatmentShowcase';
import { DoctorsSection } from './components/DoctorsSection';
import { VisitStepsSection } from './components/VisitStepsSection';
import { ClinicGallerySection } from './components/ClinicGallerySection';
import { PatientFeedbackSection } from './components/PatientFeedbackSection';
import { FaqSection } from './components/FaqSection';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { AppointmentSystem } from './components/AppointmentSystem';
import { DesktopPortal } from './components/DesktopPortal';
import { MobileStickyBar } from './components/MobileStickyBar';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { Footer } from './components/Footer';
import { BUSINESS_DETAILS, INITIAL_DEMO_REQUESTS } from './data/clinicData';
import { NavRoute, AppointmentRequest } from './types';
import { Calendar, Phone, MessageCircle, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<NavRoute>('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isPortalModalOpen, setIsPortalModalOpen] = useState(false);
  const [bookingPrefillService, setBookingPrefillService] = useState<string | undefined>(undefined);
  const [bookingPrefillDoctor, setBookingPrefillDoctor] = useState<string | undefined>(undefined);
  const [requestsList, setRequestsList] = useState<AppointmentRequest[]>(INITIAL_DEMO_REQUESTS); // Demo-only and not persisted

  // Sync with browser hash for reliable refresh & routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '') as NavRoute;
      const validRoutes: NavRoute[] = ['home', 'about', 'treatments', 'dentists', 'clinic', 'reviews', 'book', 'contact', 'portal'];
      if (validRoutes.includes(hash)) {
        setCurrentRoute(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: NavRoute) => {
    setCurrentRoute(route);
    window.location.hash = `#/${route}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBookingModal = (serviceId?: string, doctorName?: string) => {
    setBookingPrefillService(serviceId);
    setBookingPrefillDoctor(doctorName);
    setIsBookingModalOpen(true);
  };

  const handleNewRequestSubmitted = (newRequest: AppointmentRequest) => {
    // No backend or staff authentication is configured: do not expose visitor-submitted
    // personal details through the publicly accessible demonstration portal.
    void newRequest;
  };

  const handleUpdateRequestStatus = (id: string, newStatus: AppointmentRequest['status']) => {
    setRequestsList((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFDFC] text-[#142D3D] font-sans selection:bg-[#EAF8F5] selection:text-[#168C91]">
      
      {/* Unofficial redesign concept: the domain/booking backend is not owned or configured. */}
      <div className="bg-[#EAF8F5] text-[#245c62] text-[11px] sm:text-xs text-center px-4 py-1.5 border-b border-[#168C91]/10">Unofficial redesign demonstration · Appointment requests are previews only and are not sent to the clinic</div>
      {/* 1. Header (Shared Across All Routes) */}
      <Header
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        onOpenBooking={() => handleOpenBookingModal()}
        onOpenPortal={() => setIsPortalModalOpen(true)}
      />

      {/* 2. Main Content Routing */}
      <main className="flex-1 pb-16 sm:pb-0">
        
        {/* ========================================================= */}
        {/* ROUTE: HOME */}
        {/* ========================================================= */}
        {currentRoute === 'home' && (
          <div>
            {/* Hero Section */}
            <Hero
              onOpenBooking={() => handleOpenBookingModal()}
              onExploreTreatments={() => navigateTo('treatments')}
            />

            {/* Treatment Showcase Preview */}
            <TreatmentShowcase
              onSelectTreatmentForBooking={(sId) => handleOpenBookingModal(sId)}
            />

            {/* About Goodwill Preview with Real Clinic Photo */}
            <section className="py-16 bg-white border-b border-slate-200/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  
                  <div className="lg:col-span-6 relative">
                    <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-lg relative h-80 sm:h-96">
                      <img
                        src="/assets/goodwill/imgi_9_clinic_exterior.jpg"
                        alt="Goodwill Dental Care Jebel Ali Exterior Shopfront"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#142D3D]/80 via-transparent to-transparent" />
                      <div className="absolute bottom-5 left-5 right-5 text-white">
                        <span className="text-[11px] font-bold text-[#83C64A] uppercase tracking-wider block">
                          OUR JEBEL ALI CLINIC
                        </span>
                        <h4 className="font-heading font-bold text-lg text-white mt-1">
                          1st Floor, Talal Plaza Hypermarket, Jebel Ali 1
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-5">
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#168C91] bg-[#EAF8F5] px-3 py-1 rounded-full">
                      <span>Our Practice</span>
                    </div>

                    <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#142D3D] tracking-tight">
                      Rooted in Care. Focused on Your Smile.
                    </h2>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      Part of Goodwill Healthcare Group, Goodwill Dental Care serves patients in Jebel Ali Industrial 1. We aim to make it easy to explore dental care, meet the team and contact reception about a consultation.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-[#142D3D]">
                      {['Personalized attention', 'Dental care information', 'Convenient Jebel Ali location'].map(item => <div key={item} className="p-3.5 rounded-xl bg-[#EAF8F5] font-semibold">{item}</div>)}
                    </div>

                    <div className="pt-2 flex items-center gap-4">
                      <button
                        onClick={() => navigateTo('about')}
                        className="text-xs font-bold text-[#168C91] hover:underline flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Discover Our Clinic</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Meet Your Dental Team */}
            <DoctorsSection
              onSelectDoctorForBooking={(dName) => handleOpenBookingModal(undefined, dName)}
            />

            {/* Your Visit, Made Simple (3-Step Guide) */}
            <VisitStepsSection
              onOpenBooking={() => handleOpenBookingModal()}
            />

            {/* Authentic Clinic Gallery Section */}
            <ClinicGallerySection />

            {/* Patient Feedback & Google Reviews Invitation */}
            <PatientFeedbackSection />

            {/* Frequently Asked Questions */}
            <FaqSection />

            {/* Contrasting Navy/Teal Appointment CTA Banner */}
            <section className="bg-[#142D3D] text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
              <div className="max-w-4xl mx-auto text-center space-y-6">
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#83C64A] bg-slate-900/80 px-3.5 py-1 rounded-full border border-slate-700">
                  Ready to Visit?
                </span>
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                  Your Healthier Smile Starts With One Appointment.
                </h2>
                <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
                  Connect with our team in Jebel Ali to request your preferred consultation time. This website form is a demo; contact reception for real bookings.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
                  <button
                    onClick={() => handleOpenBookingModal()}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#168C91] hover:bg-[#127276] text-white font-bold text-xs shadow-lg transition-colors cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Request Appointment</span>
                  </button>

                  <a
                    href={BUSINESS_DETAILS.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>


                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================= */}
        {/* ROUTE: ABOUT */}
        {/* ========================================================= */}
        {currentRoute === 'about' && (
          <AboutPage onOpenBooking={() => handleOpenBookingModal()} />
        )}

        {/* ========================================================= */}
        {/* ROUTE: TREATMENTS */}
        {/* ========================================================= */}
        {currentRoute === 'treatments' && (
          <TreatmentShowcase
            standalonePage={true}
            onSelectTreatmentForBooking={(sId) => handleOpenBookingModal(sId)}
          />
        )}

        {/* ========================================================= */}
        {/* ROUTE: OUR DENTISTS */}
        {/* ========================================================= */}
        {currentRoute === 'dentists' && (
          <DoctorsSection
            standalonePage={true}
            onSelectDoctorForBooking={(dName) => handleOpenBookingModal(undefined, dName)}
          />
        )}

        {/* ========================================================= */}
        {/* ROUTE: OUR CLINIC */}
        {/* ========================================================= */}
        {currentRoute === 'clinic' && (
          <ClinicGallerySection standalonePage={true} />
        )}

        {/* ========================================================= */}
        {/* ROUTE: REVIEWS */}
        {/* ========================================================= */}
        {currentRoute === 'reviews' && (
          <PatientFeedbackSection />
        )}

        {/* ========================================================= */}
        {/* ROUTE: CONTACT */}
        {/* ========================================================= */}
        {currentRoute === 'contact' && (
          <ContactPage />
        )}

        {/* ========================================================= */}
        {/* ROUTE: BOOK APPOINTMENT (FULL PAGE) */}
        {/* ========================================================= */}
        {currentRoute === 'book' && (
          <div className="py-16 bg-[#F5F8F6]/60">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <AppointmentSystem
                onSuccessSubmission={handleNewRequestSubmitted}
                preselectedServiceId={bookingPrefillService}
                preselectedDoctorName={bookingPrefillDoctor}
              />
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* ROUTE: CLINIC DESKTOP PORTAL */}
        {/* ========================================================= */}
        {currentRoute === 'portal' && (
          <div className="py-12 bg-slate-100 min-h-[70vh]">
            <div className="max-w-6xl mx-auto px-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6 flex items-center justify-between">
                <div>
                  <h2 className="font-heading font-extrabold text-2xl text-[#142D3D]">
                    Clinic Desktop Administration Portal
                  </h2>
                  <p className="text-xs text-slate-500">
                    Demonstration only: no staff authentication, no patient database and no live scheduling. Do not enter real patient records.
                  </p>
                </div>
                <button
                  onClick={() => handleOpenBookingModal()}
                  className="px-4 py-2.5 rounded-xl bg-[#168C91] text-white text-xs font-bold shadow-xs hover:bg-[#127276]"
                >
                  + Add Request
                </button>
              </div>

              {/* Render Desktop Portal Body inline for full page route */}
              <DesktopPortal
                isOpen={true}
                onClose={() => navigateTo('home')}
                requests={requestsList}
                onUpdateRequestStatus={handleUpdateRequestStatus}
                onOpenNewBooking={() => handleOpenBookingModal()}
              />
            </div>
          </div>
        )}

      </main>

      {/* 3. Footer (Shared Across All Routes) */}
      <Footer
        onNavigate={navigateTo}
        onOpenBooking={() => handleOpenBookingModal()}
      />

      {/* 4. Desktop Portal Modal (Triggerable from Header CTA) */}
      {isPortalModalOpen && currentRoute !== 'portal' && (
        <DesktopPortal
          isOpen={isPortalModalOpen}
          onClose={() => setIsPortalModalOpen(false)}
          requests={requestsList}
          onUpdateRequestStatus={handleUpdateRequestStatus}
          onOpenNewBooking={() => {
            setIsPortalModalOpen(false);
            handleOpenBookingModal();
          }}
        />
      )}

      {/* 5. Booking Modal (Triggerable anywhere on site) */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <AppointmentSystem
            isModal={true}
            onCloseModal={() => setIsBookingModalOpen(false)}
            onSuccessSubmission={(newReq) => {
              handleNewRequestSubmitted(newReq);
            }}
            preselectedServiceId={bookingPrefillService}
            preselectedDoctorName={bookingPrefillDoctor}
          />
        </div>
      )}

      {/* 6. Floating WhatsApp Desk (Desktop) */}
      <WhatsAppFloat />

      {/* 7. Mobile-Responsive Bottom Sticky Bar (Phones only, pure website responsive bar, no app frame!) */}
      <MobileStickyBar onOpenBooking={() => handleOpenBookingModal()} />

    </div>
  );
}
