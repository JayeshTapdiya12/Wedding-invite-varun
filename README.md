# Varun & Radhika – Wedding Website

React + Vite, Framer Motion, Lucide icons. Plain CSS, no Tailwind.

```bash
npm install
npm run dev        # local preview (also open it on your phone via the Network URL)
npm run build      # production build in /dist
```

## Where to change things

| What | File |
|---|---|
| Names, date, city, blessing, invite line, hero photo, story, videos, venue, RSVP settings, closing text, intro text | `src/data/weddingData.js` |
| The festivities (date, time, venue, address, dress code, description, map link) | `src/data/eventsData.js` |
| Gallery photos and categories | `src/data/galleryData.js` |
| Colours and fonts | top of `src/styles/global.css` |
| Share-preview address | `.env` → `VITE_SITE_URL` |

## Replace the placeholders before sharing
Everything that looks like a stock photo, and the story paragraphs, are **placeholders**.
- **Photos:** put files in `public/photos/` and use `"/photos/name.jpg"` (hero, story chapters, gallery, venue). Use roughly 1600px wide JPGs, under 400 KB each.
- **Story text:** `story.chapters` in `weddingData.js` is generic copy. Write the real one.
- **Venues and maps:** event venues/addresses are the ones from your data. "Get Directions" builds a Google Maps search from venue + address. For exact pins paste the Google Maps share link into `mapLink` (events) or `venue.directionsUrl` / `venue.mapEmbedUrl`.
- **Parents' names:** still "Smt. & Shri Kabra / Rathi".
- **Videos:** MP4 into `public/videos/` (`type: "file"`) or `youtubeId` / `vimeoId`. Videos never autoplay on page load; they start only when a guest taps play.

## The opening
A Gen Z cinematic intro: tap to play → group-chat reveal → "WE'RE GETTING MARRIED" slam → title card → iris-wipe into the site. All sound is synthesised in the browser (no audio files). Edit the chat lines in `intro.chat`. Set `intro.enabled: false` to remove it. Skip button is always visible. `music.file: "/music/song.mp3"` swaps the ambient music for your own song.

## RSVP: connect it before you share the link
The form **never pretends to submit.** If nothing is connected, the guest is told their RSVP was not sent. Pick one in `weddingData.js → rsvp` (recipes with copy-paste code are at the top of `src/lib/rsvpApi.js`):
1. **Formspree** – `endpoint: "https://formspree.io/f/xxxx"` (easiest, emails you each RSVP)
2. **Google Sheets** (Apps Script) – every RSVP becomes a row
3. **Supabase** / **Firebase** / your own API
4. **WhatsApp fallback** – set `whatsappNumber: "919876543210"`; submitting opens WhatsApp with the RSVP pre-filled

## Sharing on WhatsApp
Set `VITE_SITE_URL` in `.env` to your final address *before* building, so the preview card (`public/og-image.png`) works. Replace `og-image.png` (1200×630) with a couple photo if you like.

## Deploy (free)
Push to GitHub, import into Vercel or Netlify (build `npm run build`, output `dist`, add env var `VITE_SITE_URL`).

## Notes
- Respects `prefers-reduced-motion`; the petal canvas pauses off-screen; custom cursor only on mouse devices.
- Keyboard: Esc closes menus/players/lightbox, ←/→ in the gallery; swipe works on phones.

---

# v3 additions: the "lifetime website" features

All of these are driven from the data files in `src/data/`. Placeholder/sample content is marked and **must be replaced with your real details**.

## Personalised guest links
Each family gets their own link: `https://your-site/?g=sharma-family`. The hero greets them by name, and only the events they are invited to are shown (and prefilled in RSVP).
1. Edit `src/data/guestsData.js` (slug, name, optional `nameHi`, `events`, `lang`).
2. Run `npm run links` to write `invite-links.csv` with one link per guest, ready for WhatsApp.
3. Privacy: guest names are bundled into the site's JavaScript. Do not put anything sensitive there.
The three guests in that file are samples; delete them.

## Hindi / English
The EN / हिं toggle is in the navbar. `?lang=hi` opens a link in Hindi (a guest's `lang` does the same). Translations live in `src/i18n/hi.js`. `npm run i18n` lists any English text that has no Hindi yet. The intro stays English. Please have a Hindi speaker read the translations once.

## Wedding phases
The site changes itself (`phase` in `weddingData.js`): before the wedding it is the full invitation; during, the live stream and album appear; after, it becomes a thank-you page with the photo album on top. Preview any state with `?phase=before|during|after`.

## Add to calendar
Every event card has Google Calendar and Apple/Outlook (.ics) buttons, plus "add all". Edit the durations in `eventsData.js` (`durationMin`); they are my assumptions.

## Travel & Stay, FAQ
Edit `travel` and `faq` in `weddingData.js`. Contents are sample text. Add a real contact name and phone number to `travel.contact`.

## Live stream
Set `liveStream.enabled = true` and `youtubeId` (an unlisted YouTube live). A countdown shows until it starts.

## Couple quiz
Set `quiz.enabled = true` and replace the SAMPLE questions with real ones about Varun & Radhika.

## Shared photo album
Paste a Google Photos / iCloud shared-album link into `album.url`. The section stays hidden until it is set.

## Voice note
Put an audio file in `public/audio/` and set `voiceNote.src` (e.g. `/audio/note.mp3`). It appears in Our Story.

## Live wishes wall
Wishes are shown from `wishesWall.readUrl` (a read-only JSON endpoint, e.g. a Supabase view; recipe in `src/lib/rsvpApi.js`). Without it, the wall says blessings will appear soon. Only publish wishes you are happy to show publicly.

## RSVP still needs a backend
Nothing is saved until you set `rsvp.endpoint` (or Supabase settings, or a WhatsApp number). Until then the form tells guests honestly that it was not sent.

## Not built into code
Custom domain (buy one and attach it in Vercel/Netlify), a hand-drawn couple illustration, and backing up RSVP data are things for you to arrange.

---

# v4 additions: cinematic scroll + guest extras

**Replace the placeholder photos** in `src/data/extrasData.js` (couple portraits and the photo-stack). Use files in `/public/photos/` (e.g. `"/photos/varun.jpg"`); portrait 4:5 photos work best.

- **Couple photo reveal** (`CoupleReveal`): after the hero, the groom's and bride's portraits glide together as you scroll, then their names appear.
- **Pinned photo stack** (`PhotoStack`): the page holds while 4 photos fade into each other. Edit `extrasData.stack.photos`.
- **Horizontal events scroll:** on laptops/desktops the four events slide sideways while the background tints to each festival. Phones, tablets and "reduce motion" users get the normal vertical list.
- **Gold progress bar, self-drawing vine (wide screens) and drifting petals** (`ScrollDecor`). All switch off for "reduce motion".
- **RSVP confirmation card:** after a successful RSVP, guests can save/share an image of their confirmation.
- **WhatsApp / native share button** in the closing section. It shares the plain site link, never a guest's personal link.
- **Wedding selfie frame** (`PhotoBooth`): guests choose a photo and a frame, then save or share. It runs fully on their phone; nothing is uploaded.
- **Easter egg:** tap the couple's names 5 times in the hero for confetti and a message (`extrasData.easterEgg`).
- **Free RSVP backend:** `docs/google-sheet-rsvp.gs` has step-by-step instructions to send every RSVP to a Google Sheet (and, optionally, show approved wishes on the wishes wall).

Not included: a mehendi-pattern loader (the intro already covers the opening), and a separate blessing form (RSVP wishes + the wishes wall do that).

---

# v5: your real photos + new first page

- Your 19 photos are in `public/photos/` (full size) and `public/photos/thumb/` (small, for the gallery). To add or swap a photo, drop the file into both folders (or just `public/photos/`) and use `"/photos/name.jpg"` in the data files.
- **First page:** the photo side is clean, with no text on it. Four photos cross-fade slowly (edit `heroPhotos` in `weddingData.js`; `pos` keeps the couple in the crop). The names, date and countdown sit on a separate forest-green panel beside it (on phones: below the photo).
- Gallery categories are now by photo shoot (Cinema Date, Windmill Hills, Picnic & Night, Heritage Doors, Riverside & Temples). Edit them in `galleryData.js`.
- The share image (`public/og-image.png`) now uses your photo.
- Your venue (The Exotica) and its Google Maps link are kept.
- Photo file `NEER4928` was listed in your data but was not among the files sent, so another photo is used in its place.


---

# v8: event cards

Each festival is a big photo card: your photos fill the card on every screen size (small versions load on phones), slowly zoom and cross-fade, and the card has its own colour. On laptops the cards stack: as you scroll, the next card slides over the previous one. On phones and tablets they sit one under the other.

- Edit photos per event in `eventsData.js` (`photos`, each with a `pos` crop point so the couple stay in view). Put the photo in `public/photos/` and a small copy (about 900px wide) in `public/photos/thumb/`.
- A crash in one section no longer blanks the whole page: that section is skipped and the error is printed in the browser console (F12). A crash in the page itself now shows the error on screen.


---

# v9: 13 new features

All the text for these is in **`src/data/v9Data.js`** (Hindi is already filled in; run `npm run i18n` after editing text). Anything marked SAMPLE there is a placeholder.

| Feature | What it does | What you do |
|---|---|---|
| **Stories** | Instagram-style circles built from the gallery categories. Tap right = next, left = back, hold = pause, Esc or swipe down = close. | Nothing. |
| **Swipe game** | Swipe photos right (love) or left (it becomes a heart anyway). | Nothing. |
| **Love map** | A route draws itself through 4 places with a photo and story at each stop. | Edit the stops in `v9Data.loveMap`. |
| **Teaser video** | Short muted looping clip below the hero. Hidden while empty. | Put a clip (10-20 s, under 8 MB) in `public/videos/` and set `teaser.src`. |
| **Indore guide** | Eat / See / Day-trip tabs with "Open in Maps" links. | **Check the SAMPLE places and distances** before sharing. |
| **Table finder** | Guest types their name, sees table and room. Shows only on the wedding days. | Replace the SAMPLE names in `v9Data.seating.guests`. Names are readable in the site code, so use first or family names only. |
| **Weather** | Real forecast for 13th and 14th Dec (Open-Meteo, free, no key) from about 16 days before; typical December weather until then. | Nothing. |
| **Song requests** | 3 requests per guest, sent to your Google Sheet ("Songs" tab). | Needs the RSVP web app (below). |
| **Time capsule** | Guests write a note now; on 14th Dec 2027 the site shows the approved notes. | Needs the RSVP web app. After the date, type YES in column E of the "Capsule" tab for notes to show and set `capsule.readUrl`. |
| **Thank-you page** | After the wedding the page shows a thank-you section: film link, a personal thank-you card guests can share, full-size photo downloads. | Set `thanks.filmUrl` and pick `thanks.downloads`. Preview: add `?phase=after`. |
| **Offline mode** | The site can be added to a phone's home screen and opens without internet. | Works only on the real https site, not on localhost. Nothing to do. |
| **QR codes** | One printable QR per guest, pointing to their personal link. | `npm run qr -- https://your-site.com` makes a `qr-codes/` folder (open `qr-sheet.html` to print). |
| **Link-opened tracking** | Records which personal links were opened (the link name only, nothing else). | Needs the RSVP web app. See the "Opened" tab. |
| **WhatsApp reminders** | Ready messages for 30 days, 7 days and 1 day before. | `npm run reminders -- https://your-site.com` makes `reminders.csv` with a tap-to-send link per guest. |

## Connecting songs, capsule and tracking
Song requests, capsule notes and link-open pings go to the **same web app as the RSVP**. Re-paste the updated `docs/google-sheet-rsvp.gs` into Apps Script and publish a **new version** (Deploy -> Manage deployments -> edit -> New version). The tabs "Songs", "Capsule" and "Opened" are created automatically. Until the web app is connected, the forms honestly say "not sent" (or open WhatsApp if `rsvp.whatsappNumber` is set), and nothing is tracked.

## Privacy
Tracking stores only the personal-link name, once per visit, and only when the link has `?g=`. Mention it if guests ask. Turn it off with `tracking: { enabled: false }`.
