import { DoctorProfile } from '../types';

/**
 * CENTRALIZED AUTHORITATIVE DOCTORS DATA MANIFEST
 * 
 * Strict data-integrity specifications for Goodwill Dental Care & Goodwill Healthcare Group:
 * - 1:1 verified mapping between each doctor profile, their verified specialty, and authentic image.
 * - Dr. Nida Iqbal & Dr. Shristi Pradhan are the primary licensed dental clinicians at Goodwill Dental Care.
 * - The remaining 6 physicians are General Practitioners with Goodwill Healthcare Group.
 * - Image paths use authentic, lossless derived portraits centered on each clinician's face.
 * - Descriptions adhere strictly to verified clinical copy without inventing unverified credentials.
 * - Languages are only displayed where explicitly confirmed in original clinic graphics.
 */

export const DOCTORS_MANIFEST: DoctorProfile[] = [
  {
    id: 'dr-nida-iqbal',
    name: 'Dr. Nida Iqbal',
    title: 'Dr. Nida Iqbal',
    roleType: 'dentist',
    specialty: 'General Dentist',
    imagePath: '/assets/goodwill/imgi_3_dr_nida_iqbal_portrait.jpg',
    fullPosterPath: '/assets/goodwill/imgi_3_dr_nida_iqbal.jpg',
    sourceFilename: 'imgi_3_591161323_17975988056967611_746476421400991042_n.jpg',
    description: 'General dentist at Goodwill Dental Care. Contact the clinic to enquire about consultation availability.',
    isDentalSpecialist: true,
    appointmentLeadTime: 'Advance request recommended',
    category: 'dental_team',
  },
  {
    id: 'dr-shristi-pradhan',
    name: 'Dr. Shristi Pradhan',
    title: 'Dr. Shristi Pradhan',
    roleType: 'dentist',
    specialty: 'General Dentist',
    imagePath: '/assets/goodwill/imgi_4_dr_shristi_pradhan_portrait.jpg',
    fullPosterPath: '/assets/goodwill/imgi_4_dr_shristi_pradhan.jpg',
    sourceFilename: 'imgi_4_591133325_17975988020967611_5347859473524572357_n.jpg',
    description: 'General dentist at Goodwill Dental Care. Contact the clinic to enquire about consultation availability.',
    isDentalSpecialist: true,
    appointmentLeadTime: 'Advance request recommended',
    category: 'dental_team',
  },
  {
    id: 'dr-benatt-george',
    name: 'Dr. Benatt George',
    title: 'Dr. Benatt George',
    roleType: 'practitioner',
    specialty: 'General Practitioner',
    imagePath: '/assets/goodwill/imgi_5_dr_benatt_george_portrait.jpg',
    fullPosterPath: '/assets/goodwill/imgi_5_dr_benatt_george.jpg',
    sourceFilename: 'imgi_5_591110879_17975987990967611_4083888953509484154_n.jpg',
    description: 'General practitioner featured by Goodwill Healthcare Group. Contact the clinic for consultation and availability information.',
    isDentalSpecialist: false,
    category: 'general_medical',
  },
  {
    id: 'dr-maliha-arfeen',
    name: 'Dr. Maliha Arfeen',
    title: 'Dr. Maliha Arfeen',
    roleType: 'practitioner',
    specialty: 'General Practitioner',
    imagePath: '/assets/goodwill/imgi_6_dr_maliha_arfeen_portrait.jpg',
    fullPosterPath: '/assets/goodwill/imgi_6_dr_maliha_arfeen.jpg',
    sourceFilename: 'imgi_6_591156473_17975987951967611_6007668871589629812_n.jpg',
    description: 'General practitioner featured by Goodwill Healthcare Group. Contact the clinic for consultation and availability information.',
    isDentalSpecialist: false,
    category: 'general_medical',
  },
  {
    id: 'dr-amber-hanif',
    name: 'Dr. Amber Hanif',
    title: 'Dr. Amber Hanif',
    roleType: 'practitioner',
    specialty: 'General Practitioner',
    imagePath: '/assets/goodwill/imgi_7_dr_amber_hanif_portrait.jpg',
    fullPosterPath: '/assets/goodwill/imgi_7_dr_amber_hanif.jpg',
    sourceFilename: 'imgi_7_591171341_17975987861967611_1140496093914859217_n.jpg',
    description: 'General practitioner featured by Goodwill Healthcare Group. Contact the clinic for consultation and availability information.',
    isDentalSpecialist: false,
    category: 'general_medical',
  },
  {
    id: 'dr-mohammed-tasleem',
    name: 'Dr. Mohammed Tasleem',
    title: 'Dr. Mohammed Tasleem',
    roleType: 'practitioner',
    specialty: 'General Practitioner',
    imagePath: '/assets/goodwill/imgi_8_dr_mohammed_tasleem_portrait.jpg',
    fullPosterPath: '/assets/goodwill/imgi_8_dr_mohammed_tasleem.jpg',
    graphicPath: '/assets/goodwill/imgi_11_dr_mohammed_tasleem_graphic.jpg',
    sourceFilename: 'imgi_8_591160056_17975987813967611_1024646574424376610_n.jpg',
    description: 'General practitioner featured by Goodwill Healthcare Group. Contact the clinic for consultation and availability information.',
    isDentalSpecialist: false,
    languages: ['English', 'Hindi', 'Urdu', 'Arabic'],
    category: 'general_medical',
  },
  {
    id: 'dr-sana-samad',
    name: 'Dr. Sana Samad',
    title: 'Dr. Sana Samad',
    roleType: 'practitioner',
    specialty: 'General Practitioner',
    imagePath: '/assets/goodwill/imgi_12_dr_sana_samad_portrait.jpg',
    graphicPath: '/assets/goodwill/imgi_12_dr_sana_samad_graphic.jpg',
    fullPosterPath: '/assets/goodwill/imgi_12_dr_sana_samad_graphic.jpg',
    sourceFilename: 'imgi_12_624842714_18141374338486084_2324112258053868912_n.jpg',
    description: 'General practitioner featured by Goodwill Healthcare Group. Contact the clinic for consultation and availability information.',
    isDentalSpecialist: false,
    languages: ['English', 'Hindi', 'Urdu', 'Punjabi'],
    category: 'general_medical',
  },
  {
    id: 'dr-charles-augustine',
    name: 'Dr. Charles Augustine',
    title: 'Dr. Charles Augustine',
    roleType: 'practitioner',
    specialty: 'General Practitioner',
    imagePath: '/assets/goodwill/imgi_14_dr_charles_augustine_portrait.jpg',
    graphicPath: '/assets/goodwill/imgi_14_dr_charles_augustine_graphic.jpg',
    fullPosterPath: '/assets/goodwill/imgi_14_dr_charles_augustine_graphic.jpg',
    sourceFilename: 'imgi_14_624772637_18098069494923557_7265060401158245300_n.jpg',
    description: 'General practitioner featured by Goodwill Healthcare Group. Contact the clinic for consultation and availability information.',
    isDentalSpecialist: false,
    languages: ['English', 'Hindi', 'Tamil', 'Malayalam'],
    category: 'general_medical',
  },
];

/** Primary featured dentists for Goodwill Dental Care */
export const DENTISTS: DoctorProfile[] = DOCTORS_MANIFEST.filter(
  (doc) => doc.roleType === 'dentist' && doc.isDentalSpecialist
);

/** General medical practitioners from Goodwill Healthcare Group */
export const GENERAL_PRACTITIONERS: DoctorProfile[] = DOCTORS_MANIFEST.filter(
  (doc) => doc.roleType === 'practitioner' && !doc.isDentalSpecialist
);

/** Lookup helpers */
export function getDoctorById(id: string): DoctorProfile | undefined {
  return DOCTORS_MANIFEST.find((doc) => doc.id === id);
}

export function getDoctorByName(name: string): DoctorProfile | undefined {
  return DOCTORS_MANIFEST.find((doc) => doc.name.toLowerCase() === name.toLowerCase());
}
