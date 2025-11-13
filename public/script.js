// ======== 1️⃣ List of saved and old videos ========
const savedVideos = [
  // Local videos in public/videos/
  "videos/myvideo1.mp4",
  "videos/myvideo2.mp4",

  // Old GitHub-hosted videos
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

// ======== 2️⃣ Setup video container ========
const container = document.querySelector(".video-container");
const videoElements = [];

// Function to add a video element
function addVideo(url) {
  const video = document.createElement("video");
  video.src = url;
  video.controls = true;
  video.loop = false;
  container.appendChild(video);
  videoElements.push(video);

  // When this video ends, play the next one
  video.addEventListener("ended", playNextVideo);
  return video;
}

// Add all saved/old videos first
savedVideos.forEach(url => addVideo(url));

// ======== 3️⃣ Fetch TikTok API video ========
async function loadTikTokVideo() {
  try {
    const res = await fetch("/api/tiktok");
    const data = await res.json();
    if (data.url) {
      addVideo(data.url);
    }
  } catch (err) {
    console.error("Failed to load TikTok video:", err);
  }
}

// You can call this multiple times to fetch more TikTok videos dynamically
loadTikTokVideo();

// ======== 4️⃣ Video looping logic ========
let currentVideoIndex = 0;

function playNextVideo() {
  if (videoElements.length === 0) return;

  // Pause all videos first
  videoElements.forEach(v => v.pause());

  // Move to next video
  currentVideoIndex = (currentVideoIndex + 1) % videoElements.length;
  videoElements[currentVideoIndex].play();
}

// ======== 5️⃣ Auto-play the first video on page load ========
window.addEventListener("DOMContentLoaded", () => {
  if (videoElements.length > 0) {
    videoElements[currentVideoIndex].play();
  }
});
