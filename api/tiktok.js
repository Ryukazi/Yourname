import axios from "axios";

const usernames = [
  "haazeiy", "thetrenzz", "saiki.aepz", "qudo.san",
  "netolodaran", "serox_amv", "jazonamv",
  "fuglylazy", "xdragonx_1", "deeplay.fx",
  "grey.ae", "viizz.ae", "lil.monsterx", ".m1k.raze", "kokomi.mp3"
];

// Helper: shuffle array
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Fetch videos for a single username
async function fetchUserVideos(username, count = 6) {
  try {
    const res = await axios.post(
      "https://tikwm.com/api/user/posts",
      { unique_id: username, count: 20 },
      { headers: { "Content-Type": "application/json" } }
    );

    const videos = res.data?.data?.videos;
    if (!videos?.length) return [];

    const validVideos = videos.filter(v => v.play);
    if (!validVideos.length) return [];

    // Pick random 'count' videos
    shuffleArray(validVideos);
    return validVideos.slice(0, count).map(v => v.play);

  } catch (err) {
    console.error(`❌ Failed for ${username}:`, err.response?.data || err.message);
    return [];
  }
}

// API handler
export default async function handler(req, res) {
  const { username, count } = req.query;
  const videosPerUser = parseInt(count) || 5; // default 5 videos

  let resultVideos = [];

  if (username) {
    // Fetch videos from a specific user
    resultVideos = await fetchUserVideos(username, videosPerUser);
  } else {
    // Fetch videos randomly from all usernames
    const shuffledUsers = shuffleArray([...usernames]);
    for (const user of shuffledUsers) {
      const vids = await fetchUserVideos(user, videosPerUser);
      if (vids.length > 0) {
        resultVideos = resultVideos.concat(vids);
        if (resultVideos.length >= videosPerUser) break;
      }
    }
  }

  if (resultVideos.length === 0) {
    return res.status(404).json({ error: "No valid videos found." });
  }

  // Return JSON array of video URLs
  res.setHeader("Content-Type", "application/json");
  res.status(200).json({ videos: resultVideos });
}
