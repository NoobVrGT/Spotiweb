🎵 Spotiweb
A clean, fast, browser‑based Spotify dashboard that displays your currently playing track, album art, and listening stats — all powered by the Spotify Web API.

Spotiweb is designed to be lightweight, responsive, and easy to deploy on services like Netlify, Vercel, or GitHub Pages.

🚀 Features
🎧 Shows your currently playing Spotify track

🖼️ Displays album art, track name, artist, and progress

🔄 Auto‑refreshes in real time

🌐 100% client‑side — no backend required

📱 Fully responsive layout

🔒 Uses Spotify OAuth securely

⚡ Fast, minimal, and easy to customize

🛠️ Tech Stack
HTML / CSS / JavaScript

Spotify Web API

OAuth 2.0 (Implicit Grant / PKCE)

Netlify / Vercel (optional deployment)

📦 Installation & Setup
1. Clone the repository
bash
git clone https://github.com/NoobVrGT/Spotiweb
cd Spotiweb
2. Create a Spotify Developer App
Go to: https://developer.spotify.com/dashboard

Create a new app and add this redirect URI:

Code
http://localhost:5500/
(or whatever domain you deploy to)

3. Add your Spotify Client ID
Open script.js and insert your Client ID:

js
const clientId = "YOUR_SPOTIFY_CLIENT_ID";
4. Run locally
Use any local web server (VS Code Live Server works great):

Code
Open index.html with Live Server
📁 Project Structure
Code
Spotiweb/
├── index.html
├── style.css
├── script.js
└── assets/
    └── icons/
🌍 Deployment
✔️ Deploy to Netlify (recommended)
Go to https://netlify.com

Click New Site → Import from GitHub

Select your Spotiweb repo

Deploy

Add your Netlify URL to Spotify Redirect URIs

Example:

Code
https://myspotiweb.netlify.app/
✔️ Deploy to Vercel
Go to https://vercel.com

Import your GitHub repo

Deploy

Add your Vercel URL to Spotify Redirect URIs

✔️ Deploy to GitHub Pages
Push your repo

Go to Settings → Pages

Set branch to main

Save

Add your GitHub Pages URL to Spotify Redirect URIs

📸 Screenshots (placeholders)
Add your own screenshots here:

Code
![Dashboard Screenshot](assets/screenshot1.png)
![Mobile View](assets/screenshot2.png)
🙌 Credits
Created by NoobVrGT  
Powered by the Spotify Web API

📜 License
MIT License — free to use, modify, and share.
