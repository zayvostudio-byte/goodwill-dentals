import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Search, 
  Filter, 
  MessageCircle,
  FileText,
  Image as ImageIcon,
  Check
} from 'lucide-react';
import { BUSINESS_DETAILS, DENTISTS, DENTAL_TREATMENTS } from '../data/clinicData';
import { ASSET_MANIFEST } from '../data/assetManifest';
import { AppointmentRequest } from '../types';

interface DesktopPortalProps {
  isOpen: boolean;
  onClose: () => void;
  requests: AppointmentRequest[];
  onUpdateRequestStatus: (id: string, newStatus: AppointmentRequest['status']) => void;
  onOpenNewBooking: () => void;
}

export const DesktopPortal: React.FC<DesktopPortalProps> = ({
  isOpen,
  onClose,
  requests,
  onUpdateRequestStatus,
  onOpenNewBooking,
}) => {
  const [activeTab, setActiveTab] = useState<'requests' | 'roster' | 'assets' | 'treatments'>('requests');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  if (!isOpen) return null;

  const filteredRequests = requests.filter((req) => {
    const matchesSearch = 
      req.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.patientPhone.includes(searchQuery);
    
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && req.status === statusFilter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-6xl w-full h-[90vh] shadow-2xl border border-slate-200 overflow-hidden flex flex-col relative">
        
        {/* Portal Header */}
        <div className="bg-[#142D3D] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#168C91] flex items-center justify-center text-white font-bold shadow-xs">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-base text-white">
                  Goodwill Dental Care — Portal Preview (Demo Only)
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                  NON-PRODUCTION DEMO
                </span>
              </div>
              <p className="text-xs text-slate-400">
                No authentication or backend configured · Do not enter patient data
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenNewBooking}
              className="px-3.5 py-2 rounded-xl bg-[#168C91] hover:bg-[#127276] text-white text-xs font-bold transition-colors shadow-xs"
            >
              + New Patient Request
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Close Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Portal Sub-Nav Tabs */}
        <div className="bg-[#F5F8F6] px-6 py-2 border-b border-slate-200 flex items-center gap-4 text-xs font-semibold text-slate-600 shrink-0">
          <button
            onClick={() => setActiveTab('requests')}
            className={`py-2 px-3 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'requests' ? 'bg-white text-[#168C91] shadow-2xs font-bold' : 'hover:text-[#142D3D]'
            }`}
          >
            Appointment Requests ({requests.length})
          </button>
          <button
            onClick={() => setActiveTab('roster')}
            className={`py-2 px-3 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'roster' ? 'bg-white text-[#168C91] shadow-2xs font-bold' : 'hover:text-[#142D3D]'
            }`}
          >
            Dentist Duty Overview
          </button>
          <button
            onClick={() => setActiveTab('treatments')}
            className={`py-2 px-3 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'treatments' ? 'bg-white text-[#168C91] shadow-2xs font-bold' : 'hover:text-[#142D3D]'
            }`}
          >
            Treatment Verification Status
          </button>
          <button
            onClick={() => setActiveTab('assets')}
            className={`py-2 px-3 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'assets' ? 'bg-white text-[#168C91] shadow-2xs font-bold' : 'hover:text-[#142D3D]'
            }`}
          >
            Asset Pipeline & Inventory (19)
          </button>
        </div>

        {/* Portal Body Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
          
          {/* TAB 1: APPOINTMENT REQUESTS TABLE */}
          {activeTab === 'requests' && (
            <div className="space-y-4">
              
              {/* Filter and Search Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by patient, phone or reference #..."
                    className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#168C91]"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="text-xs py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden"
                  >
                    <option value="all">All Statuses</option>
                    <option value="Pending Clinic Confirmation">Pending Confirmation</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Rescheduled">Rescheduled</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#F5F8F6] text-slate-600 uppercase font-semibold text-[10px] border-b border-slate-200 tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Ref #</th>
                        <th className="py-3 px-4">Patient Name</th>
                        <th className="py-3 px-4">Contact Phone</th>
                        <th className="py-3 px-4">Requested Service</th>
                        <th className="py-3 px-4">Clinician</th>
                        <th className="py-3 px-4">Requested Slot</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredRequests.map((req) => (
                        <tr key={req.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-[#168C91]">
                            {req.referenceNumber}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-[#142D3D]">
                            {req.patientName}
                            <span className="block text-[10px] font-normal text-slate-400">
                              {req.isNewPatient ? 'New Patient' : 'Existing Patient'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-700">
                            {req.patientPhone}
                          </td>
                          <td className="py-3.5 px-4 text-slate-700 font-medium">
                            {req.serviceName}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">
                            {req.doctorPreference}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">
                            {req.preferredDate} · {req.preferredTime}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                              req.status === 'Confirmed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : req.status === 'Pending Clinic Confirmation'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}>
                              {req.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {req.status !== 'Confirmed' ? (
                                <button
                                  onClick={() => onUpdateRequestStatus(req.id, 'Confirmed')}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] transition-colors"
                                >
                                  Confirm
                                </button>
                              ) : (
                                <button
                                  onClick={() => onUpdateRequestStatus(req.id, 'Completed')}
                                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-bold text-[10px] transition-colors"
                                >
                                  Mark Done
                                </button>
                              )}
                              <a
                                href={`https://wa.me/${req.patientPhone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(req.patientName)},%20this%20is%20Goodwill%20Dental%20Care%20regarding%20your%20appointment%20ref%20${req.referenceNumber}.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                title="WhatsApp Patient"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredRequests.length === 0 && (
                  <div className="text-center py-10 text-xs text-slate-400">
                    No requests found matching your filter criteria.
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: DENTIST DUTY ROSTER */}
          {activeTab === 'roster' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DENTISTS.map((dentist) => (
                <div key={dentist.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                      <img
                        src={dentist.imagePath}
                        alt={dentist.name}
                        className="w-full h-full object-cover object-top"
                        style={{ objectPosition: 'center 15%' }}
                      />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-base text-[#142D3D]">{dentist.name}</h4>
                      <p className="text-xs text-[#168C91] font-semibold">{dentist.specialty}</p>
                      <p className="text-[11px] text-slate-500">Goodwill Dental Care · 1st Floor Talal Plaza</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                    <span className="font-bold text-[#142D3D] block">Duty Shift Protocol:</span>
                    <p className="text-slate-600 leading-relaxed">
                      Consultation availability rotates between morning and evening shifts across listed clinic hours (7:30 AM to 11:30 PM). Reception staff verify slot allocations upon receiving online requests.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: TREATMENT VERIFICATION STATUS */}
          {activeTab === 'treatments' && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
              <div className="p-4 bg-[#F5F8F6] border-b border-slate-200">
                <h4 className="font-heading font-bold text-sm text-[#142D3D]">
                  Clinical Service Verification Directory
                </h4>
                <p className="text-xs text-slate-500">
                  Clearly delineating verified services from draft proposals under clinical review.
                </p>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {DENTAL_TREATMENTS.map((t) => (
                  <div key={t.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#142D3D]">{t.name}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          t.category === 'core_verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {t.statusLabel}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">{t.tagline}</p>
                    </div>

                    <span className="text-[11px] font-semibold text-slate-400 shrink-0">
                      {t.category === 'core_verified' ? 'Active for Booking' : 'Pending Review'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ASSET PIPELINE & INVENTORY (ALL 19 ASSETS) */}
          {activeTab === 'assets' && (
            <div className="space-y-4">
              <div className="bg-[#EAF8F5] p-4 rounded-2xl border border-[#168C91]/30 text-xs text-[#142D3D]">
                <span className="font-bold block mb-0.5">Asset Pipeline Inventory (19 Verified Files)</span>
                All uploaded files are organized locally in <code className="font-mono bg-white px-1.5 py-0.5 rounded text-[#168C91]">public/assets/goodwill/</code> and verified before display.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.values(ASSET_MANIFEST).map((asset) => (
                  <div key={asset.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="h-40 w-full bg-slate-900 flex items-center justify-center overflow-hidden">
                        <img
                          src={asset.path}
                          alt={asset.title}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="p-3.5 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-slate-400 truncate max-w-[150px]">{asset.id}</span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            asset.isAuthenticGoodwill ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {asset.isAuthenticGoodwill ? 'Real Goodwill' : 'Illustrative Stock'}
                          </span>
                        </div>
                        <h5 className="font-heading font-bold text-xs text-[#142D3D]">{asset.title}</h5>
                        <p className="text-[10px] text-slate-500 leading-snug">{asset.caption}</p>
                      </div>
                    </div>

                    <div className="p-3 pt-0 text-[10px] font-mono text-slate-400 border-t border-slate-100 truncate">
                      {asset.path}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
