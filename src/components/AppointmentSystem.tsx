import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  ShieldCheck, 
  CheckCircle2, 
  MessageCircle, 
  ArrowRight, 
  ChevronLeft, 
  AlertCircle,
  FileText,
  Info,
  X
} from 'lucide-react';
import { DENTAL_TREATMENTS, DENTISTS, BUSINESS_DETAILS } from '../data/clinicData';
import { AppointmentRequest } from '../types';

interface AppointmentSystemProps {
  onSuccessSubmission: (request: AppointmentRequest) => void;
  preselectedServiceId?: string;
  preselectedDoctorName?: string;
  onCloseModal?: () => void;
  isModal?: boolean;
}

export const AppointmentSystem: React.FC<AppointmentSystemProps> = ({
  onSuccessSubmission,
  preselectedServiceId,
  preselectedDoctorName,
  onCloseModal,
  isModal = false,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 'success'>(1);

  // Form State
  const [serviceId, setServiceId] = useState<string>(preselectedServiceId || 'consultation-exam');
  const [doctorPreference, setDoctorPreference] = useState<string>(preselectedDoctorName || 'No Preference (Next Available Dentist)');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [preferredTime, setPreferredTime] = useState<string>('10:00 AM');
  const [patientName, setPatientName] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [isNewPatient, setIsNewPatient] = useState<boolean>(true);
  const [patientNotes, setPatientNotes] = useState<string>('');
  const [agreedToPrivacy, setAgreedToPrivacy] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>('');
  const [submittedRequest, setSubmittedRequest] = useState<AppointmentRequest | null>(null);

  // Set default tomorrow date on mount
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setPreferredDate(new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dubai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(tomorrow));
  }, []);

  useEffect(() => {
    if (preselectedServiceId) setServiceId(preselectedServiceId);
    if (preselectedDoctorName) setDoctorPreference(preselectedDoctorName);
  }, [preselectedServiceId, preselectedDoctorName]);

  const selectedTreatmentObj = DENTAL_TREATMENTS.find((t) => t.id === serviceId) || DENTAL_TREATMENTS[0];

  // Listed clinic time slots (7:30 AM – 11:30 PM)
  const timeSlotsMorning = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM'];
  const timeSlotsAfternoon = ['12:30 PM', '02:00 PM', '03:30 PM', '04:30 PM'];
  const timeSlotsEvening = ['06:00 PM', '07:30 PM', '09:00 PM', '10:30 PM'];

  const validateStep4 = (): boolean => {
    if (!patientName.trim()) {
      setValidationError('Please enter your full name.');
      return false;
    }
    if (!patientPhone.trim() || patientPhone.trim().length < 7) {
      setValidationError('Please enter a valid phone or WhatsApp number.');
      return false;
    }
    if (!agreedToPrivacy) {
      setValidationError('Please consent to be contacted regarding this appointment request.');
      return false;
    }
    setValidationError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep4()) return;
    const todayDubai = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dubai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
    if (!preferredDate || preferredDate < todayDubai) { setValidationError('Please choose a future date in the Dubai time zone.'); setStep(3); return; }
    if (![...timeSlotsMorning, ...timeSlotsAfternoon, ...timeSlotsEvening].includes(preferredTime)) { setValidationError('Please select a preferred time.'); setStep(3); return; }
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const refCode = `DEMO-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}-${randomSuffix}`;

    const newRequest: AppointmentRequest = {
      id: `req-${Date.now()}`,
      referenceNumber: refCode,
      serviceId,
      serviceName: selectedTreatmentObj.name,
      doctorPreference,
      preferredDate,
      preferredTime,
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      patientEmail: patientEmail.trim() || undefined,
      isNewPatient,
      patientNotes: patientNotes.trim() || undefined,
      agreedToPrivacy: true,
      status: 'Pending Clinic Confirmation',
      createdAt: new Date().toISOString(),
    };

    setSubmittedRequest(newRequest);
    onSuccessSubmission(newRequest);
    setStep('success');
  };

  return (
    <div className={`bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden ${isModal ? 'max-w-2xl w-full' : 'max-w-3xl mx-auto'}`}>
      
      {/* Top Header */}
      <div className="bg-[#142D3D] text-white p-6 sm:px-8 flex items-center justify-between border-b border-slate-800">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#83C64A] block">
            Goodwill Dental Care · Jebel Ali 1
          </span>
          <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white mt-0.5">
            Request an Appointment
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Interactive demo only · Not sent to clinic · Contact reception to book.
          </p>
        </div>

        {isModal && onCloseModal && (
          <button
            onClick={onCloseModal}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Step Indicators */}
      {step !== 'success' && (
        <div className="bg-[#F5F8F6] px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-500 overflow-x-auto">
          <span className={step === 1 ? 'text-[#168C91] font-bold' : step > 1 ? 'text-slate-800' : ''}>1. Service</span>
          <span className="text-slate-300">/</span>
          <span className={step === 2 ? 'text-[#168C91] font-bold' : step > 2 ? 'text-slate-800' : ''}>2. Dentist</span>
          <span className="text-slate-300">/</span>
          <span className={step === 3 ? 'text-[#168C91] font-bold' : step > 3 ? 'text-slate-800' : ''}>3. Date & Time</span>
          <span className="text-slate-300">/</span>
          <span className={step === 4 ? 'text-[#168C91] font-bold' : step > 4 ? 'text-slate-800' : ''}>4. Contact</span>
          <span className="text-slate-300">/</span>
          <span className={step === 5 ? 'text-[#168C91] font-bold' : ''}>5. Review</span>
        </div>
      )}

      {/* Step Contents */}
      <div className="p-6 sm:p-8">
        
        {/* STEP 1: Select Verified Service */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h4 className="font-heading font-bold text-base text-[#142D3D]">
                Step 1: Choose Desired Dental Care
              </h4>
              <p className="text-xs text-slate-500">
                Select from our core clinical services or general consultation.
              </p>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {DENTAL_TREATMENTS.filter(t => t.category === 'core_verified').map((t) => (
                <div
                  key={t.id}
                  onClick={() => setServiceId(t.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    serviceId === t.id
                      ? 'border-[#168C91] bg-[#EAF8F5]/60 shadow-xs ring-1 ring-[#168C91]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-xs text-[#142D3D]">
                        {t.name}
                      </span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        t.category === 'core_verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {t.statusLabel}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      {t.description}
                    </p>
                  </div>

                  <input
                    type="radio"
                    checked={serviceId === t.id}
                    onChange={() => setServiceId(t.id)}
                    className="mt-1 text-[#168C91] focus:ring-[#168C91]"
                  />
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-xl bg-[#168C91] hover:bg-[#127276] text-white text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Continue to Dentist</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Choose Doctor */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h4 className="font-heading font-bold text-base text-[#142D3D]">
                Step 2: Choose Preferred Dentist
              </h4>
              <p className="text-xs text-slate-500">
                Choose a specific general dentist or select next available.
              </p>
            </div>

            <div className="space-y-2.5">
              {/* Option 1: No Preference */}
              <div
                onClick={() => setDoctorPreference('No Preference (Next Available Dentist)')}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  doctorPreference === 'No Preference (Next Available Dentist)'
                    ? 'border-[#168C91] bg-[#EAF8F5]/60 shadow-xs ring-1 ring-[#168C91]'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <span className="font-heading font-bold text-xs text-[#142D3D] block">
                    No Preference (Next Available Dentist)
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Highest scheduling flexibility according to duty rota.
                  </span>
                </div>
                <input
                  type="radio"
                  checked={doctorPreference === 'No Preference (Next Available Dentist)'}
                  onChange={() => {}}
                  className="text-[#168C91] focus:ring-[#168C91]"
                />
              </div>

              {/* Individual Dentists */}
              {DENTISTS.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setDoctorPreference(doc.name)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    doctorPreference === doc.name
                      ? 'border-[#168C91] bg-[#EAF8F5]/60 shadow-xs ring-1 ring-[#168C91]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                      <img
                        src={doc.imagePath}
                        alt={doc.name}
                        className="w-full h-full object-cover object-top"
                        style={{ objectPosition: 'center 15%' }}
                      />
                    </div>
                    <div>
                      <span className="font-heading font-bold text-xs text-[#142D3D] block">
                        {doc.name}
                      </span>
                      <span className="text-[11px] text-[#168C91] font-semibold block">
                        {doc.specialty}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {doc.appointmentLeadTime}
                      </span>
                    </div>
                  </div>

                  <input
                    type="radio"
                    checked={doctorPreference === doc.name}
                    onChange={() => {}}
                    className="text-[#168C91] focus:ring-[#168C91]"
                  />
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-xl bg-[#168C91] hover:bg-[#127276] text-white text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Continue to Date & Time</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Choose Preferred Date & Time */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h4 className="font-heading font-bold text-base text-[#142D3D]">
                Step 3: Select Preferred Date & Time
              </h4>
              <p className="text-xs text-slate-500">
                Clinic operating hours: 7:30 AM to 11:30 PM daily. Times are preferences only, not live availability. This demo does not submit them to the clinic.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Preferred Date * (Dubai local date)
              </label>
              <input
                type="date"
                required
                value={preferredDate}
                min={new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dubai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())}
                onChange={(e) => { setPreferredDate(e.target.value); setValidationError(''); }}
                className="w-full text-xs py-2.5 px-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-hidden focus:border-[#168C91]"
              />
            </div>

            {validationError && <p role="alert" className="text-xs text-red-700">{validationError}</p>}
            {/* Time Slot Picker */}
            <div className="space-y-3 pt-2">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Morning Slots (7:30 AM – 12:00 PM)
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlotsMorning.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setPreferredTime(slot)}
                      className={`py-2 px-1 text-center rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        preferredTime === slot
                          ? 'bg-[#168C91] text-white shadow-xs'
                          : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Afternoon Slots (12:00 PM – 5:00 PM)
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlotsAfternoon.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setPreferredTime(slot)}
                      className={`py-2 px-1 text-center rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        preferredTime === slot
                          ? 'bg-[#168C91] text-white shadow-xs'
                          : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Evening Slots (5:00 PM – 11:30 PM)
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlotsEvening.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setPreferredTime(slot)}
                      className={`py-2 px-1 text-center rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        preferredTime === slot
                          ? 'bg-[#168C91] text-white shadow-xs'
                          : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-[11px] text-amber-900 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                Times requested are tentative until confirmed by the clinic reception against the doctor's duty shift.
              </span>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-6 py-2.5 rounded-xl bg-[#168C91] hover:bg-[#127276] text-white text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Continue to Patient Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Patient Details */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <h4 className="font-heading font-bold text-base text-[#142D3D]">
                Step 4: Contact & Patient Information
              </h4>
              <p className="text-xs text-slate-500">
                Please provide your contact details so clinic staff can confirm your visit.
              </p>
            </div>

            {validationError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. Tariq Al-Mansoor"
                  className="w-full text-xs py-2.5 px-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-hidden focus:border-[#168C91]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  placeholder="+971 50 123 4567"
                  className="w-full text-xs py-2.5 px-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-hidden focus:border-[#168C91]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                placeholder="yourname@example.com"
                className="w-full text-xs py-2.5 px-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-hidden focus:border-[#168C91]"
              />
            </div>

            {/* New or Existing Patient */}
            <div className="flex items-center gap-6 pt-1 text-xs text-slate-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="patientTypeRadio"
                  checked={isNewPatient}
                  onChange={() => setIsNewPatient(true)}
                  className="text-[#168C91] focus:ring-[#168C91]"
                />
                <span>New Patient to Goodwill</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="patientTypeRadio"
                  checked={!isNewPatient}
                  onChange={() => setIsNewPatient(false)}
                  className="text-[#168C91] focus:ring-[#168C91]"
                />
                <span>Existing Patient</span>
              </label>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Optional Non-Sensitive Notes (e.g. Sensitivity, routine checkup)
              </label>
              <textarea
                rows={2}
                value={patientNotes}
                onChange={(e) => setPatientNotes(e.target.value)}
                placeholder="Please do not include confidential medical records."
                className="w-full text-xs py-2 px-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-hidden focus:border-[#168C91]"
              />
            </div>

            {/* Mandatory Consent Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={agreedToPrivacy}
                  onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                  className="mt-0.5 rounded text-[#168C91] focus:ring-[#168C91]"
                />
                <span className="leading-snug">
                  I consent to being contacted by Goodwill Dental Care regarding this appointment request. I acknowledge this is a request subject to clinic confirmation.
                </span>
              </label>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  if (validateStep4()) setStep(5);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#168C91] hover:bg-[#127276] text-white text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Review Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Review & Explicit Submit */}
        {step === 5 && (
          <div className="space-y-4">
            <div>
              <h4 className="font-heading font-bold text-base text-[#142D3D]">
                Step 5: Review Your Appointment Request
              </h4>
              <p className="text-xs text-slate-500">
                Please verify details before submitting your request.
              </p>
            </div>

            {/* Summary Card */}
            <div className="bg-[#F5F8F6] rounded-2xl p-5 border border-slate-200 text-xs space-y-3">
              <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Requested Service</span>
                  <span className="font-bold text-[#142D3D] block">{selectedTreatmentObj.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Doctor Preference</span>
                  <span className="font-bold text-[#142D3D] block">{doctorPreference}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Preferred Date</span>
                  <span className="font-bold text-[#142D3D] block">{preferredDate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Requested Time</span>
                  <span className="font-bold text-[#142D3D] block">{preferredTime}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Patient</span>
                  <span className="font-bold text-[#142D3D] block">{patientName} ({isNewPatient ? 'New' : 'Existing'})</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Contact Phone</span>
                  <span className="font-bold text-[#142D3D] block">{patientPhone}</span>
                </div>
              </div>

              {patientNotes && (
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Notes</span>
                  <span className="text-slate-700 block italic">"{patientNotes}"</span>
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#168C91] shrink-0 mt-0.5" />
              <span>
                Demo mode: submitting only previews your request in this browser session. It does not notify the clinic. Contact reception separately to arrange an appointment.
              </span>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Back to Edit
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2.5 rounded-xl bg-[#168C91] hover:bg-[#127276] text-white text-xs font-bold shadow-md shadow-[#168C91]/20 flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit Appointment Request</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP SUCCESS: Confirmation & Reference Code */}
        {step === 'success' && submittedRequest && (
          <div className="space-y-6 text-center py-2">
            
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Demo Request Prepared
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-[#142D3D] mt-2">
                Thank You, {submittedRequest.patientName}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                This is a website demo. Your details have NOT been sent to the clinic. Please contact reception to make a real booking.
              </p>
            </div>

            {/* Official Confirmation Card */}
            <div className="bg-[#F5F8F6] border border-slate-200 rounded-2xl p-5 text-left max-w-md mx-auto space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Reference Code
                  </span>
                  <span className="font-mono font-bold text-base text-[#168C91]">
                    {submittedRequest.referenceNumber}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Status
                  </span>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Not Sent to Clinic
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Service</span>
                  <span className="font-bold text-[#142D3D]">{submittedRequest.serviceName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Clinician</span>
                  <span className="font-bold text-[#142D3D]">{submittedRequest.doctorPreference}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Requested Date</span>
                  <span className="font-bold text-[#142D3D]">{submittedRequest.preferredDate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Requested Slot</span>
                  <span className="font-bold text-[#142D3D]">{submittedRequest.preferredTime}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-500 flex items-center justify-between">
                <span>📍 Talal Plaza 1st Floor, Jebel Ali 1</span>
                <span>📞 {BUSINESS_DETAILS.landline}</span>
              </div>
            </div>

            {/* Honest Demo Mode Clarification */}
            <div className="p-3 bg-slate-100 rounded-xl text-[11px] text-slate-600 max-w-md mx-auto text-left">
              <span className="font-semibold text-slate-900 block mb-0.5">Demo System Notice:</span>
              Demo only: this request exists in temporary browser memory for this session and is not delivered or stored on the clinic server. Please call reception or initiate the optional WhatsApp enquiry for a real appointment.
            </div>

            {/* Separate User-Initiated WhatsApp Inquiry */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <a
                href={BUSINESS_DETAILS.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors"
                title="Send inquiry on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire on WhatsApp</span>
              </a>

              {isModal && onCloseModal && (
                <button
                  onClick={onCloseModal}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-[#142D3D] text-xs font-bold hover:bg-slate-50 transition-colors"
                >
                  Close Window
                </button>
              )}
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
