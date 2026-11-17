# Varun & Radhika Wedding Invitation

A mobile-first wedding invitation with an animated group-chat opening, couple story, family sections, memory gallery, event schedule, RSVP, venue map, and closing message. Built with React, Vite, Tailwind CSS, and Framer Motion.

## Run locally

```powershell
npm install
npm run dev
```

Create a production build with `npm run build`; check code style with `npm run lint`.

## Personalize before sharing

All invitation content is centralized in `src/data/weddingData.js`.

- Confirm names, dates, event times, dress codes, venue names, street addresses, map pins, and host details with both families. The current schedule and venue entries are editable draft content from the existing project.
- Replace the image paths and matching alt text in `story.image`/`story.imageAlt`, each gallery entry’s `image`/`alt`, `familyStories[].portraits[]`, `familyHosts[]`, and `filmPoster` with approved photos. Place local photos in `public/images`.
- Replace the story prompts and family-story copy with real, family-approved memories. No personal anecdotes are fabricated.
- Add an approved pre-wedding film URL to `filmUrl` to enable video playback.
- Before deployment, set `og:image` in `index.html` to an absolute URL for an approved cover photograph on the deployed site.
- Connect RSVP by setting `rsvpConfig.endpointUrl` to a trusted HTTPS endpoint that accepts the documented form payload, or set `rsvpPhone` to the family WhatsApp number (country code and digits only, for example `911234567890`). The RSVP form stays disabled until one is configured; it never claims an unconfigured RSVP was submitted. Guest wishes are not publicly displayed; connect a family-reviewed moderation service before publishing them.
- The embedded map is a city overview. Confirm the exact event venue pins before sharing.

The intro sound is off by default, can only be enabled by visitor interaction, and can be skipped. The opening is remembered for the current browser session and can be replayed from the footer.