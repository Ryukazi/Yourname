const container = document.getElementById("video-container");

// ✅ All saved videos
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

// Function to create video element
function createVideoElement(src) {
  const video = document.createElement("video");
  video.src = src;
  video.controls = true;
  video.loop = true;
  return video;
}

// Load saved videos
savedVideos.forEach(src => container.appendChild(createVideoElement(src)));

// Load TikTok API videos
async function loadTikTokVideos() {
  try {
    const res = await fetch("/api/random?count=5");
    const data = await res.json();
    data.videos.forEach(url => container.appendChild(createVideoElement(url)));
  } catch (err) {
    console.error("❌ Failed to load TikTok videos:", err);
  }
}

loadTikTokVideos();
