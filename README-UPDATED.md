# Goodwill Dental Care — Website Redesign Demo

This is an edited **React + TypeScript + Vite** WEBSITE project, supplied as a source-code ZIP for Google AI Studio or any Vite-compatible environment. It is not a mobile application.

## Important distinction: demo vs. production

**The booking form is not linked to a clinic server.** It displays an interactive request preview in the current browser session only, and it does **not** deliver appointments, send patient information or confirm available slots. The portal is a publicly accessible UI demo only, with no authentication and no live patient database. Do not enter real patient information, deploy the portal as a real staff tool, or advertise live appointment booking without implementing a secure authenticated backend and legal/privacy review.

## Run locally

1. `npm install`
2. `npm run dev`
3. `npm run lint` and `npm run build`

These commands require the listed package dependencies to be installed. No backend secrets are required to preview the static demo.

## Edited sections

- Header: responsive single-line desktop nav, clear CTA, overflow-safe mobile nav, secondary Reviews/Portal.
- Hero: stronger editorial hierarchy and two clear actions, original supplied illustrative treatment image.
- Treatments: six featured cards, concise descriptions, detail modal and standalone treatments route.
- About: authentic clinic photograph and grounded patient-focused text.
- Dental team: two featured dentists; separate compact GPs with full list on the dentists route.
- Doctor records: single centralized `src/data/doctorsManifest.ts`, correct doctor-specific portraits.
- Visit timeline: clear three-step appointment journey.
- Gallery: authentic Goodwill facility/staff photos only, no doctor announcement posters or unrelated photos.
- Feedback: Google Maps review-listing link rather than invented patient testimonials.
- Footer: four structured information columns, legible text and correct contact actions.
- Appointment: visible demo-only notices, Dubai calendar day handling, no false successful clinic submission.
- Portal: demo-only UI with no seeded patient contacts; not a deployable production administration tool.

## Business verification

Phone, WhatsApp, address and hours are based on supplied brand materials. Service availability, doctor schedules, professional accreditation, visitor access/parking and any live reviews must be reconfirmed by the clinic before public launch.

## Image policy

All original Goodwill doctor portraits and clinic photographs come from the supplied asset set; stock dental imagery is illustrative only. See `src/data/assetManifest.ts` and `src/data/doctorsManifest.ts`.

## Production checklist

- Get clinic authorization to deploy using the official brand and verified doctor portraits.
- Reconfirm all listed service categories, doctors, operating hours, phone and location information.
- Add a secure appointment API/database with validation, CSRF/rate protections, anti-abuse and authenticated staff roles.
- Wire actual doctor availability and notification providers; handle confirmations and cancellations server-side.
- Add reviewed Privacy Policy and Terms appropriate for UAE patient data.
- Run `npm run lint`, `npm run build`, and browser/device QA after dependencies are available.
