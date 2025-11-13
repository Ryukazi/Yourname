import express from "express";
import axios from "axios";

const router = express.Router();

const usernames = [
  "haazeiy", "thetrenzz", "saiki.aepz", "qudo.san",
  "netolodaran", "serox_amv", "jazonamv",
  "fuglylazy", "xdragonx_1", "deeplay.fx",
  "grey.ae", "viizz.ae", "lil.monsterx", ".m1k.raze", "kokomi.mp3"
];

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function fetchRandomVideo(username) {
  try {
    const res = await axios.post(
      "https://tikwm.com/api/user/posts",
      { unique_id: username, count: 20 },
      { headers: { "Content-Type": "application/json" } }
    );

    const videos = res.data?.data?.videos;
    if (!videos?.length) return null;

    const valid = videos.filter(v => v.play);
    if (!valid.length) return null;

    return valid[Math.floor(Math.random() * valid.length)].play;
  } catch (err) {
    console.error(`❌ Failed for ${username}:`, err.message);
    return null;
  }
}

// Get multiple random TikTok videos
router.get("/random", async (req, res) => {
  const count = parseInt(req.query.count) || 5;
  const shuffled = shuffleArray([...usernames]);
  const results = [];

  for (const user of shuffled) {
    const videoUrl = await fetchRandomVideo(user);
    if (videoUrl) results.push(videoUrl);
    if (results.length >= count) break;
  }

  if (results.length === 0) return res.status(404).json({ error: "No valid videos found" });

  res.json({ videos: results });
});

export default router;
