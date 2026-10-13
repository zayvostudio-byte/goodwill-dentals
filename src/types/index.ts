export type NavRoute = 
  | 'home' 
  | 'about' 
  | 'treatments' 
  | 'dentists' 
  | 'clinic' 
  | 'reviews' 
  | 'book' 
  | 'contact'
  | 'portal'; // Desktop portal for appointment management

export interface DoctorProfile {
  id: string;
  name: string;
  title: string;
  roleType: 'dentist' | 'practitioner';
  specialty: string;
  imagePath: string;
  fullPosterPath?: string;
  sourceFilename: string;
  graphicPath?: string;
  description: string;
  isDentalSpecialist: boolean;
  appointmentLeadTime?: string;
  languages?: string[];
  category: 'dental_team' | 'general_medical';
}

export interface DentalTreatment {
  id: string;
  name: string;
  category: 'core_verified' | 'draft_verification';
  tagline: string;
  description: string;
  procedureOverview: string[];
  candidateFor: string;
  aftercare: string;
  imagePath: string;
  imageIsStock: boolean;
  statusLabel: string; // e.g. 'Clinic Verified Service' or 'Service In Review with Clinic'
}

export interface AppointmentRequest {
  id: string;
  serviceId: string;
  serviceName: string;
  doctorPreference: string; // doctor name or 'No Preference (Next Available)'
  preferredDate: string;
  preferredTime: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  isNewPatient: boolean;
  patientNotes?: string;
  agreedToPrivacy: boolean;
  status: 'Pending Clinic Confirmation' | 'Confirmed' | 'Rescheduled' | 'Completed';
  createdAt: string;
  referenceNumber: string;
}

export interface ClinicGalleryPhoto {
  id: string;
  title: string;
  caption: string;
  path: string;
  category: 'exterior' | 'consultation' | 'staff' | 'graphic';
  isRealGoodwill: boolean;
}
