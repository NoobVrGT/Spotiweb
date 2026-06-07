# Spotiweb

Spotiweb is a focused, intentional web dashboard that surfaces the music that matters to you — in real time and in context. Rather than being a feature‑heavy music app, Spotiweb is a small, opinionated interface: it reads your Last.fm scrobbles and turns them into a clear, glanceable "Now Playing" card and a concise recent‑tracks timeline. The goal is to make your listening visible without noise — no accounts to create, no complex permissions to grant, and no server to maintain. It’s for people who want a tidy, reliable window into their listening habits that they can host anywhere and customize freely.

This project is built around three design principles:

- **Clarity** — show the essential information (track, artist, album art, timestamp) in a way that’s immediately readable at a glance.  
- **Privacy by default** — Spotiweb reads public Last.fm data for a username you configure; it does not collect or transmit your data to third parties. If you want to keep your API key private, you can add a small proxy or serverless function at deploy time.  
- **Composability** — Spotiweb is intentionally minimal so you can extend it: add top‑artists panels, embed widgets, or wire it into a home dashboard. The code is plain HTML/CSS/JS so it’s easy to fork, tweak, and redeploy.

Who this is for:
- **Music fans** who scrobble to Last.fm and want a lightweight "Now Playing" widget for a personal site or dashboard.  
- **Developers and tinkerers** who want a simple, client‑side example of consuming Last.fm data and rendering a responsive UI.  
- **Streamers and bloggers** who want an embeddable, privacy‑respecting way to show what they’re listening to.

What Spotiweb is not:
- It is not a full music player or a replacement for Spotify’s official apps. It does not control playback or require Spotify OAuth. It reads the public scrobble stream from Last.fm and displays it.

---

## Table of Contents

- [Features](#features)  
- [How It Works](#how-it-works)  
- [Requirements](#requirements)  
- [Quick Start](#quick-start)  
  - [1. Clone the repository](#1-clone-the-repository)  
  - [2. Get a Last.fm API key](#2-get-a-lastfm-api-key)  
  - [3. Configure the app](#3-configure-the-app)  
  - [4. Run locally](#4-run-locally)  
- [Project Structure](#project-structure)  
- [Last.fm API Usage](#lastfm-api-usage)  
  - [Detecting Now Playing](#detecting-now-playing)  
  - [Example Fetch Code](#example-fetch-code)  
- [Usage and Behavior](#usage-and-behavior)  
- [Customization](#customization)  
- [Deployment](#deployment)  
  - [GitHub Pages](#github-pages)  
  - [Netlify / Vercel](#netlify--vercel)  
- [Troubleshooting](#troubleshooting)  
- [Security and Privacy](#security-and-privacy)  
- [Contributing](#contributing)  
- [Credits](#credits)  
- [License](#license)  
- [FAQ](#faq)  
- [Changelog](#changelog)  
- [Example Snippets](#example-snippets)

---

## Features

- **Now Playing detection** using Last.fm’s `nowplaying` attribute  
- **Recent tracks list** with timestamps and links to Last.fm  
- **Album art support** with graceful fallbacks  
- **Fully client‑side** (HTML, CSS, JS only) — no backend required  
- **Responsive layout** for desktop and mobile  
- **Configurable refresh interval and list length**  
- **Easy to extend** with additional Last.fm endpoints (top artists, top tracks)

---

## How It Works

1. Your music player (e.g., Spotify) scrobbles tracks to **Last.fm**.  
2. Spotiweb queries Last.fm’s `user.getrecenttracks` endpoint for the configured username.  
3. The most recent track is inspected for `@attr.nowplaying="true"`. If present, it’s shown as **Now Playing**; otherwise the most recent scrobble is shown in the recent list.  
4. The UI refreshes on a configurable interval to reflect new scrobbles.

> **Important:** Spotiweb does **not** use the Spotify Web API or Spotify OAuth. It relies on Last.fm scrobbles.

---

## Requirements

- **Last.fm account** (public profile or scrobbling enabled)  
- **Spotify scrobbling** enabled (or another scrobbling client)  
- **Last.fm API key**  
- A modern browser (Chrome, Firefox, Edge, Safari)

---

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/NoobVrGT/Spotiweb.git
cd Spotiweb
2. Get a Last.fm API key
Create one here:
https://www.last.fm/api/account/create

3. Configure the app
Edit script.js:

js
const LASTFM_USER = "your_lastfm_username";
const LASTFM_API_KEY = "YOUR_LASTFM_API_KEY";
const POLL_INTERVAL_MS = 15000; // refresh every 15 seconds
const RECENT_TRACKS_LIMIT = 10; // number of recent tracks to show
4. Run locally
Open index.html directly, or use a local server:

bash
python -m http.server 5500
Then visit:
http://localhost:5500

Project Structure
Code
Spotiweb/
├── index.html          # Main HTML
├── style.css           # Styles
├── script.js           # App logic and Last.fm calls
├── README.md           # This file
└── assets/
    ├── icons/
    └── screenshots/
Last.fm API Usage
Spotiweb uses the user.getrecenttracks method to fetch recent plays and detect the "now playing" track.

Code
https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=USERNAME&api_key=API_KEY&format=json&limit=10
Detecting Now Playing
If the first track contains:

json
"@attr": { "nowplaying": "true" }
then it is the currently playing track.

Example Fetch Code
js
async function fetchRecentTracks(user, apiKey, limit = 10) {
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(user)}&api_key=${apiKey}&format=json&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Last.fm request failed");
  const data = await res.json();
  return data.recenttracks.track || [];
}
Usage and Behavior
Now Playing card: album art, track title, artist, album, and optional progress indicator.

Recent tracks list: timestamp, thumbnail, track/artist text, and link to Last.fm.

Fallbacks: placeholder image and "Unknown" text when metadata is missing.

Polling: the app polls Last.fm every POLL_INTERVAL_MS. Increase the interval to reduce API usage.

Customization
Styling: edit style.css to change colors, fonts, spacing, and add dark mode.

Behavior: change POLL_INTERVAL_MS and RECENT_TRACKS_LIMIT in script.js.

Settings UI: add a small modal to let users enter username/API key at runtime and persist to localStorage.

Advanced: add user.gettoptracks or user.gettopartists to show stats and trends.

Deployment
Spotiweb is static and deploys easily.

GitHub Pages
Push to main

Settings → Pages → branch main → root / → Save

Netlify / Vercel
Import the repo and deploy — no build step required.

Hiding API keys: for public deployments, consider a serverless proxy or build-time injection to avoid exposing the API key client‑side.

Troubleshooting
No data: ensure Spotify scrobbling to Last.fm is enabled and the username/API key are correct.

CORS errors: verify the request URL and format=json.

Now Playing not updating: confirm Last.fm shows your current track; adjust polling.

Rate limiting: reduce polling frequency or add caching/proxy.

Missing album art: use the image array and fallback to a placeholder.

Security and Privacy
Client‑side API keys are visible to anyone who inspects network requests. Use a proxy or serverless function to keep keys secret.

Spotiweb reads public Last.fm data for the configured username and does not transmit data elsewhere by default.

To hide listening activity, disable scrobbling or set your Last.fm profile to private.

Contributing
Fork the repo.

Create a branch: git checkout -b feature/your-feature.

Make changes and include tests/screenshots if applicable.

Commit and open a Pull Request.

Please document UI or API changes in README.md.

Credits
NoobVrGT — author and maintainer

Last.fm — scrobbling API and data

License
MIT License — free to use, modify, and share. See the LICENSE file for details.

FAQ
Q: Do I need Spotify?  
A: Any player that scrobbles to Last.fm will work; Spotify is commonly used.

Q: Why isn’t Now Playing updating?  
A: Check scrobbling settings, Last.fm profile, username/API key, and polling interval.

Q: Can I hide my API key?  
A: Yes — use a proxy or serverless function to keep the key secret.

Q: Can I show top tracks or artists?  
A: Yes — call user.gettoptracks and user.gettopartists from Last.fm and add UI sections.

Changelog
v1.0.0 — Initial Last.fm‑powered release: Now Playing + Recent Tracks, responsive UI, client‑side only.

Example Snippets
Fetch recent tracks (full example)

js
async function fetchRecentTracks(user, apiKey, limit = 10) {
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(user)}&api_key=${apiKey}&format=json&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error('Last.fm request failed', res.status, res.statusText);
    return [];
  }
  const data = await res.json();
  return data?.recenttracks?.track || [];
}
Detect now playing

js
const tracks = await fetchRecentTracks(LASTFM_USER, LASTFM_API_KEY, 5);
const latest = tracks[0];
const nowPlaying = latest && latest['@attr'] && latest['@attr'].nowplaying === 'true';
if (nowPlaying) {
  // render now playing UI
} else {
  // render last scrobble as recent track
}
