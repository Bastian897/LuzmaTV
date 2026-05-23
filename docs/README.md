# LuzmaTV Website UI Kit

Interactive recreation of the proposed luzmatv.cl website. This is **the** product surface — the channel doesn't ship a mobile app yet.

## Files

```
index.html       ← single-page interactive prototype
App.jsx          ← top-level layout (nav + sections + footer)
Header.jsx       ← sticky nav with LIVE indicator + mobile menu
Hero.jsx         ← electric-blue hero with logo, slogan, CTAs
Platforms.jsx    ← "¿Dónde vernos?" grid (Kick, Twitch, TikTok, IG, YT, TV Más)
LivePlayer.jsx   ← Kick-style embed shell with chat sidebar
Programs.jsx     ← Program grid with category filters
HostsRow.jsx     ← Conductor / equipo cards
Schedule.jsx     ← Weekly grilla, color-coded
Episodes.jsx     ← Latest clips carousel
Community.jsx    ← Social feed + check-in + newsletter
Footer.jsx       ← Logo, links, contacto, copyright
ui.jsx           ← shared primitives: Button, Pill, Card, LiveBadge, Star
```

## Interactivity

- The nav has a real LIVE indicator (default ON).
- Hero CTAs scroll to sections.
- Platform tiles open `target="_blank"` placeholder URLs.
- Programs grid can be filtered by category chips.
- Live player shows a chat with auto-incrementing fake messages.
- "Check-in" button increments a counter and persists to localStorage.
- Newsletter form does optimistic confirmation.

## What's faked

- No real Kick/Twitch embed — we render a video poster with a play button. (Production would embed the iframe.)
- Host photos are colored initials in the LuzmaTV palette — replace with real portraits.
- Episode thumbnails are gradient placeholders — replace with real stills.

## Visual rules followed

- 3–4px black outlines on every elevated surface.
- Hard offset shadows, no blurry web shadows.
- Pill buttons.
- Bebas Neue / Black Ops One / Montserrat / Nunito only.
- One accent at a time per component.
