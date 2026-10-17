# Among Us Live Night

A laptop-first, responsive landing page for an upcoming Among Us event, built with React and Vite. It explains the event, lets visitors try a few mini tasks, and has a registration form that saves sign-ups to a Google Sheet.

> A fan-made event page, not affiliated with Innersloth.

**Live site:** _add your Vercel URL here_

## Features

- **Hero and countdown** to the event start, with an animated starfield background.
- **Small tasks** you can play on the page: Fix wiring (animated wires and sparks), Swipe card, and Calibrate. Finishing all three unlocks the Shield.
- **Day 1 and Day 2 schedule**, including the finale and a "Try the blackout" flashlight mode (20 seconds, or press Esc to leave).
- **Emergency meeting button** and a kill scene for the Impostor role.
- **Registration form** with colour and role picker and validation. Sign-ups are posted to a Google Sheet.
- **Pet dog cursor** with a settings panel (bottom-left): choose Dog, Arrow or the system default, change size and colour, or reset to a plain white cursor. Choices are saved in the browser. Mouse devices only.
- **Light and dark theme** toggle, scroll progress bar, and a developer log at the bottom of the page.
- Respects `prefers-reduced-motion`.

## Tech stack

- React 18
- Vite 5
- Plain CSS (no UI framework)
- Google Apps Script + Google Sheets for registration storage

## Getting started

You need Node.js 18 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |

## Registration setup (Google Sheets)

Registration saves to a Google Sheet through an Apps Script web app. Full steps are in [SHEETS_SETUP.md](SHEETS_SETUP.md). In short:

1. Copy `.env.example` to `.env`.
2. Set `VITE_SHEET_URL` to your Apps Script web app URL (it ends in `/exec`).
3. Restart `npm run dev`.

If `VITE_SHEET_URL` is not set, the form still works but nothing is saved, and a warning is printed to the browser console.

> `VITE_` variables are visible in the browser. Never put real secrets in them. `.env` is git-ignored; only commit `.env.example` with placeholders.

## Customising

- **Event date:** change the target date in `src/components/Countdown.jsx`.
- **Schedule and copy:** `src/components/Schedule.jsx`, `Finale.jsx` and `About.jsx`.
- **Programs and years in the form:** `src/data/form.js`.
- **Developer log entries:** `src/components/DevLog.jsx`.
- **Colours and theme:** `src/styles/theme.css` and the CSS variables in `src/styles/base.css`.

## Project structure

```
src/
  components/   Page sections and interactive pieces (tasks, cursor, blackout, form)
  data/         Crew colours, form options
  lib/          Helpers (effects, motion, Google Sheets sender)
  styles/       CSS split by area
  App.jsx       Page layout
legacy/         Original single-file HTML version
```

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it in [Vercel](https://vercel.com). Vite settings are detected automatically (build command `npm run build`, output folder `dist`).
3. Add the `VITE_SHEET_URL` environment variable under Project > Settings > Environment Variables.
4. Deploy, then open the live URL and test the form.

## Pre-launch checklist

- [ ] Buttons and links work
- [ ] Text is readable in light and dark themes
- [ ] Layout fits laptop and phone screens, with no overflow
- [ ] Animations don't get in the way of using the page
- [ ] `npm run build` succeeds
- [ ] No secrets or `.env` committed
- [ ] Registration lands in the Google Sheet
- [ ] Deployed site works

## License

No license has been chosen yet. Add one (for example MIT) before sharing the code publicly.
