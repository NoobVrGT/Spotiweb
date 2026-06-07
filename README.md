# Spotiweb

**Spotiweb** is a lightweight, client‑side web dashboard that displays your *Now Playing* and recent listening history by reading scrobbles from **Last.fm**. It is designed to work with Spotify (or any player that scrobbles to Last.fm) — Spotiweb queries the Last.fm API and renders a clean, responsive UI without requiring a backend.

---

## Table of Contents
- Features  
- How it works  
- Requirements  
- Quick start  
- Configuration  
- Last.fm API usage  
- Project structure  
- Usage and behavior  
- Customization  
- Deployment  
- Troubleshooting  
- Security and privacy  
- Contributing  
- Credits  
- License  
- FAQ  
- Changelog  

---

## Features
- **Now Playing:** Detects and displays the currently playing track via Last.fm scrobbling.  
- **Recent Tracks:** Shows a list of recent scrobbles with timestamps.  
- **Album Art:** Displays album artwork when available; falls back to a placeholder.  
- **Client‑side only:** No backend required — runs entirely in the browser.  
- **Responsive:** Mobile and desktop friendly layout.  
- **Lightweight:** Minimal dependencies and fast load times.  
- **Configurable:** Polling interval, recent tracks limit, and UI options are easy to change.  

---

## How it works
1. Spotify (or another player) scrobbles tracks to Last.fm (this must be enabled in your Spotify settings).  
2. Spotiweb calls the Last.fm `user.getrecenttracks` endpoint to fetch recent plays and detect the "now playing" state.  
3. The UI renders the current track, album art, artist, and a short history of recent plays.  
4. The app periodically polls Last.fm to update the display.  

> Important: Spotiweb does not use the Spotify Web API or Spotify OAuth. It relies entirely on Last.fm scrobbles.

---

## Requirements
- Last.fm account (public profile or scrobbling enabled).  
- Spotify scrobbling enabled (or another scrobbling client).  
- Last.fm API key (free to create).  
- Modern browser (Chrome, Firefox, Edge, Safari).  

---

## Quick start

### 1. Clone the repository
```bash
git clone https://github.com/NoobVrGT/Spotiweb.git
cd Spotiweb
2. Get a Last.fm API key
Visit: https://www.last.fm/api/account/create  
Create an API application and copy the API key.

3. Configure the app
Open script.js and set your Last.fm username and API key:

js
// script.js (example)
const LASTFM_USER = "your_lastfm_username";
const LASTFM_API_KEY = "YOUR_LASTFM_API_KEY";
const POLL_INTERVAL_MS = 15000; // 15 seconds
const RECENT_TRACKS_LIMIT = 10;
4. Run locally
Open index.html in your browser or use a local server:

bash
# Python 3 simple server (example)
python -m http.server 5500
# then open http://localhost:5500
Or use VS Code Live Server to open index.html.

Configuration
In script.js:

js
const LASTFM_USER = "your_lastfm_username";
const LASTFM_API_KEY = "YOUR_LASTFM_API_KEY";
const POLL_INTERVAL_MS = 15000; // how often to refresh (ms)
const RECENT_TRACKS_LIMIT = 10; // how many recent tracks to show
Notes:

Keep your API key private if possible (proxy/serverless recommended for public deployments).

Client‑side keys are visible to anyone inspecting the site.

Last.fm API usage
Spotiweb uses user.getrecenttracks:

text
https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=USERNAME&api_key=API_KEY&format=json&limit=5
Detecting Now Playing:

If the most recent track has @attr.nowplaying="true", it is the currently playing track.

Otherwise, the most recent item is the last scrobble.

Example fetch:

js
async function fetchRecentTracks(user, apiKey, limit = 5) {
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(user)}&api_key=${apiKey}&format=json&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Last.fm request failed');
  const data = await res.json();
  return data.recenttracks.track || [];
}
Project structure
text
Spotiweb/
├── index.html          # Main HTML
├── style.css           # Styles
├── script.js           # App logic and Last.fm calls
├── README.md           # This file
└── assets/
    ├── icons/
    └── screenshots/
Usage and behavior
UI
Now Playing card: album art, track title, artist, album, optional progress indicator.

Recent tracks list: timestamp, thumbnail, track/artist text, link to Last.fm track page.

Fallbacks: placeholder image and "Unknown" text when metadata is missing.

Polling
Polls Last.fm every POLL_INTERVAL_MS.

If "now playing" is present, updates immediately.

Customization
Styling
Edit style.css for colors, fonts, spacing.

Add .dark theme via CSS variables and a body class.

Behavior
Change RECENT_TRACKS_LIMIT to adjust list length.

Add a settings modal to let users enter username/API key at runtime (store in localStorage).

Caching
Cache last response in localStorage and show it while fetching new data.

Use backoff if rate‑limited.

Deployment
Netlify
Push repo to GitHub.

New site → Import from GitHub.

Select Spotiweb repo and deploy.

Vercel
Import repo.

Deploy (no build step).

GitHub Pages
Push to main.

Settings → Pages → branch main, root /.

Note: To hide API key, use a proxy/serverless function; pure client‑side will expose it.

Troubleshooting
No data: check Spotify → Last.fm scrobbling, username, API key.

CORS errors: ensure correct endpoint and format=json.

Now Playing not updating: verify Last.fm shows current track; adjust polling.

Rate limiting: reduce polling or add caching.

Missing art: use image array; fallback placeholder.

Security and privacy
API key is visible client‑side; use proxy for secrecy.

Only reads public Last.fm data.

To hide listening, disable scrobbling or make profile private.

Contributing
Fork repo.

git checkout -b feature/your-feature

Make changes, add tests/screenshots.

git commit -m "Add feature"

Open Pull Request.

Credits
NoobVrGT — author.

Last.fm — API and data.

License
MIT License. See LICENSE.

FAQ
Q: Do I need Spotify?
A: Any player that scrobbles to Last.fm works (Spotify is common).

Q: Why isn’t Now Playing updating?
A: Check scrobbling, profile, username/API key, and polling interval.

Q: Can I hide my API key?
A: Yes, via proxy/serverless; client‑side keys are visible.

Q: Can I show top artists/tracks?
A: Yes, use user.gettopartists and user.gettoptracks.

Changelog
v1.0.0 — Initial Last.fm‑powered release: Now Playing + Recent Tracks, responsive UI, client‑side only.

Example snippets
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

const tracks = await fetchRecentTracks(LASTFM_USER, LASTFM_API_KEY, 5);
const latest = tracks[0];
const nowPlaying = latest && latest['@attr'] && latest['@attr'].nowplaying === 'true';
if (nowPlaying) {
  // render now playing UI
} else {
  // render last scrobble as recent track
}
