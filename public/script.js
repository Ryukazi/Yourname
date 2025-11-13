const container = document.querySelector(".video-container");

// 1️⃣ Saved videos
const savedVideos = [
  "https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1735998848452-761.mp4",
  "https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1735998858687-288.mp4",
  "https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1735998893726-199.mp4",
  "https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1735998898920-822.mp4",
  "https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1735998935398-584.mp4",
  "https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1735997576507-531.mp4",
  "https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1736067515235-790.mp4",
  "https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1736067508499-390.mp4",
  "https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1736067535477-537.mp4",
  "https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1736067528238-788.mp4",
  "https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1736067551359-428.mp4",
  "https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1736067521704-236.mp4",
  "https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1736067586547-892.mp4",
  "https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1736067599730-716.mp4",
  "https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1736067628882-539.mp4",
  "https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1736067647552-432.mp4",
  "https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1736264638943-477.mp4"
];

// 2️⃣ Fetch multiple videos from API
async function fetchApiVideos(count = 5) {
  try {
    const res = await fetch(`/api/tiktok?count=${count}`);
    const data = await res.json();
    return Array.isArray(data.videos) ? data.videos : [];
  } catch (err) {
    console.error("❌ Failed to fetch API videos:", err);
    return [];
  }
}

// 3️⃣ Load all videos (saved + API)
async function loadAllVideos() {
  const apiVideos = await fetchApiVideos(5);
  const allVideos = [...savedVideos, ...apiVideos];

  // Shuffle videos
  shuffleArray(allVideos);

  allVideos.forEach((url, index) => {
    const videoEl = document.createElement("video");
    videoEl.src = url;
    videoEl.controls = true;
    videoEl.loop = false;
    videoEl.id = `video${index + 1}`;
    container.appendChild(videoEl);

    // Play this video, pause all others
    videoEl.addEventListener("play", () => {
      container.querySelectorAll("video").forEach(v => {
        if (v !== videoEl) v.pause();
      });
    });
  });
}

// Shuffle helper
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 4️⃣ DOMContentLoaded + fake 8-second loading
document.addEventListener("DOMContentLoaded", () => {
  // Show fake loading screen for 8 seconds
  setTimeout(() => {
    // Hide loading screen
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) loadingScreen.style.display = 'none';

    // Show page content
    const header = document.querySelector('header');
    const videoContainer = document.getElementById('video-container');
    const footer = document.querySelector('footer');

    if (header) header.style.display = 'block';
    if (videoContainer) videoContainer.style.display = 'grid';
    if (footer) footer.style.display = 'block';
  }, 8000);

  // Load videos in background
  loadAllVideos();
});
