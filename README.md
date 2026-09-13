# Achii Lanka Tours — Next.js MVP

Initial Next.js App Router scaffold for the Sri Lanka travel enquiry website.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- ESLint

## Initial route structure

- `/` — Home
- `/tours` — Tours listing
- `/tours/[slug]` — Tour/package detail
- `/explore` — Explore / experiences
- `/activities` — Activities / services
- `/plan-my-trip` — Custom trip enquiry
- `/about` — About / trust
- `/contact` — Contact

The FRD defines the MVP as enquiry-driven: WhatsApp, Google Form and Contact Us are the commercial conversion paths. Online payment, checkout, transactional booking and automated availability are intentionally not implemented in this scaffold.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.
