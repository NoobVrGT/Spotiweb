/* ===========================
   LAST.FM CONFIG
=========================== */
const API_KEY = "8fd413aa98122acb8b43003d34a1a14d";
const USER = "noobvrgt";

/* ===========================
   PAGE LOADER + FADE
=========================== */
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const href = link.getAttribute("href");
      document.body.classList.remove("fade-in");
      document.body.classList.add("fade-out");
      setTimeout(() => window.location.href = href, 220);
    });
  });

  initPage();
});

/* ===========================
   PAGE DETECTOR
=========================== */
function initPage() {
  const page = document.body.dataset.page;

  if (page === "nowplaying") initNowPlaying();
  if (page === "recent") initRecent();
  if (page === "visualizer") initVisualizer();
  if (page === "stats") initStats();
}

/* ===========================
   TIME AGO HELPER
=========================== */
function timeAgo(ts) {
  const diff = (Date.now() - ts * 1000) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return Math.floor(diff / 60) + " minutes ago";
  if (diff < 86400) return Math.floor(diff / 3600) + " hours ago";
  return Math.floor(diff / 86400) + " days ago";
}

/* ===========================
   FETCH RECENT TRACKS
=========================== */
async function fetchRecentTracks() {
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USER}&api_key=${API_KEY}&format=json&limit=20`;
  const res = await fetch(url);
  return res.json();
}

/* ===========================
   NOW PLAYING PAGE
=========================== */
async function loadNowPlaying() {
  const data = await fetchRecentTracks();
  const tracks = data.recenttracks.track;

  const np = tracks.find(t => t["@attr"]?.nowplaying === "true");
  const last = tracks[0];
  const track = np || last;

  document.getElementById("np-art").src = track.image[3]["#text"] || "";
  document.getElementById("np-title").textContent = track.name;
  document.getElementById("np-artist").textContent = track.artist["#text"];
  document.getElementById("np-album").textContent = track.album["#text"];

  if (np) {
    document.getElementById("np-status").textContent = "Now Playing";
  } else {
    const ts = track.date.uts;
    document.getElementById("np-status").textContent = "Last played " + timeAgo(ts);
  }
}

function initNowPlaying() {
  loadNowPlaying();
  setInterval(loadNowPlaying, 10000);

  document.getElementById("refreshNowPlaying").addEventListener("click", loadNowPlaying);
}

/* ===========================
   RECENT PAGE
=========================== */
async function initRecent() {
  const data = await fetchRecentTracks();
  const list = document.getElementById("recentList");
  list.innerHTML = "";

  data.recenttracks.track.forEach(t => {
    const div = document.createElement("div");
    div.className = "recent-item";

    const art = t.image[2]["#text"];

    div.innerHTML = `
      <img class="recent-art" src="${art}">
      <div>
        <div class="recent-title">${t.name}</div>
        <div class="recent-artist">${t.artist["#text"]}</div>
        <div class="recent-time">${t.date ? timeAgo(t.date.uts) : "Now Playing"}</div>
      </div>
    `;

    list.appendChild(div);
  });
}

/* ===========================
   VISUALIZER PAGE
=========================== */
function initVisualizer() {
  const audioElement = document.getElementById("audioElement");
  const audioFileInput = document.getElementById("audioFileInput");
  const playBtn = document.getElementById("playBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const canvas = document.getElementById("visualizerCanvas");
  const ctx = canvas.getContext("2d");
  const chooseFileBtn = document.getElementById("chooseFileBtn");

chooseFileBtn.addEventListener("click", () => {
  audioFileInput.click();
});


  let audioContext;
  let analyser;
  let source;
  let dataArray;

  function resizeCanvas() {
    canvas.width = canvas.clientWidth * window.devicePixelRatio;
    canvas.height = canvas.clientHeight * window.devicePixelRatio;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  audioFileInput.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    audioElement.src = url;

    playBtn.disabled = false;
    pauseBtn.disabled = false;

    if (!audioContext) {
      audioContext = new AudioContext();
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      dataArray = new Uint8Array(analyser.frequencyBinCount);
    }

    if (source) source.disconnect();
    source = audioContext.createMediaElementSource(audioElement);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
  });

  playBtn.addEventListener("click", async () => {
    if (!audioContext) return;
    if (audioContext.state === "suspended") await audioContext.resume();
    audioElement.play();
  });

  pauseBtn.addEventListener("click", () => {
    audioElement.pause();
  });

  function draw() {
    requestAnimationFrame(draw);

    if (!analyser) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    analyser.getByteFrequencyData(dataArray);

    const width = canvas.width;
    const height = canvas.height;
    const barCount = 80;
    const barWidth = (width / barCount) * 0.7;
    const gap = (width / barCount) * 0.3;

    ctx.clearRect(0, 0, width, height);

    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#1DB954");
    gradient.addColorStop(1, "#ffffff");

    for (let i = 0; i < barCount; i++) {
      const index = Math.floor((i / barCount) * dataArray.length);
      const value = dataArray[index] / 255;
      const barHeight = value * height * 0.85;

      const x = i * (barWidth + gap);
      const y = height - barHeight;

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, barHeight);

      ctx.fillStyle = "#1DB954";
      ctx.beginPath();
      ctx.arc(x + barWidth / 2, y - 6, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  draw();
}

/* ===========================
   STATS PAGE (Last.fm)
=========================== */
async function initStats() {
  const topArtists = document.getElementById("topArtists");
  const topTracks = document.getElementById("topTracks");
  const topAlbums = document.getElementById("topAlbums");

  const loadBtn = document.getElementById("loadStatsBtn");
  const rangeSelect = document.getElementById("timeRangeSelect");

  loadBtn.addEventListener("click", async () => {
    const period = rangeSelect.value;

    const url = `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${USER}&api_key=${API_KEY}&format=json&period=${period}&limit=10`;
    const url2 = `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${USER}&api_key=${API_KEY}&format=json&period=${period}&limit=10`;
    const url3 = `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${USER}&api_key=${API_KEY}&format=json&period=${period}&limit=10`;

    const a = await fetch(url).then(r => r.json());
    const t = await fetch(url2).then(r => r.json());
    const al = await fetch(url3).then(r => r.json());

    topArtists.innerHTML = a.topartists.artist.map(x => `<li>${x.name} — ${x.playcount} plays</li>`).join("");
    topTracks.innerHTML = t.toptracks.track.map(x => `<li>${x.name} — ${x.playcount} plays</li>`).join("");
    topAlbums.innerHTML = al.topalbums.album.map(x => `<li>${x.name} — ${x.playcount} plays</li>`).join("");
  });
}
