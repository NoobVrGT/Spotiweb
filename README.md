# Spotiweb

A clean, fast, browser-based Spotify dashboard that displays your currently playing track, album art, and listening stats using the Spotify Web API.

Spotiweb is lightweight, responsive, and easy to deploy on Netlify, Vercel, or GitHub Pages.

## Features
- Shows your currently playing Spotify track
- Displays album art, track name, artist, and progress
- Auto-refreshes in real time
- 100% client-side (no backend required)
- Fully responsive layout
- Uses Spotify OAuth securely
- Fast, minimal, and easy to customize

## Tech Stack
- HTML, CSS, JavaScript
- Spotify Web API
- OAuth 2.0 (Implicit Grant or PKCE)
- Optional deployment: Netlify, Vercel, GitHub Pages

## Installation and Setup

### 1. Clone the repository
git clone https://github.com/NoobVrGT/Spotiweb
cd Spotiweb

### 2. Create a Spotify Developer App
Go to: https://developer.spotify.com/dashboard

Create a new app and add this redirect URI:
http://localhost:5500/

(Or whatever domain you deploy to)

### 3. Add your Spotify Client ID
Open script.js and insert your Client ID:

const clientId = "YOUR_SPOTIFY_CLIENT_ID";

### 4. Run locally
Use any local web server (VS Code Live Server recommended).

Open index.html with Live Server.

## Project Structure
Spotiweb/
├── index.html
├── style.css
├── script.js
└── assets/
    └── icons/

## Deployment

### Deploy to Netlify
1. Go to https://netlify.com
2. Click "New Site" → "Import from GitHub"
3. Select your Spotiweb repo
4. Deploy
5. Add your Netlify URL to Spotify Redirect URIs

Example:
https://myspotiweb.netlify.app/

### Deploy to Vercel
1. Go to https://vercel.com
2. Import your GitHub repo
3. Deploy
4. Add your Vercel URL to Spotify Redirect URIs

### Deploy to GitHub Pages
1. Push your repo
2. Go to Settings → Pages
3. Set branch to "main"
4. Save
5. Add your GitHub Pages URL to Spotify Redirect URIs

## Screenshots
Add your own screenshots here:

![Dashboard Screenshot](assets/screenshot1.png)
![Mobile View](assets/screenshot2.png)

## Credits
Created by NoobVrGT  
Powered by the Spotify Web API

## License
MIT License

🙌 Credits
Created by NoobVrGT  
Powered by the Spotify Web API

📜 License
MIT License — free to use, modify, and share.
