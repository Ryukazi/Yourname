import axios from "axios";

const usernames = [
  "haazeiy","thetrenzz","saiki.aepz","qudo.san",
  "netolodaran","serox_amv","jazonamv",
  "fuglylazy","xdragonx_1","deeplay.fx",
  "_grey.ae","viizz.ae","lil.monsterx",".m1k.raze_","kokomi.mp3"
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
    const validVideos = videos.filter(v => v.play);
    if (!validVideos.length) return null;
    const randomVideo = validVideos[Math.floor(Math.random() * validVideos.length)];
    return randomVideo.play;
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  try {
    const { username } = req.query;
    if (username) {
      const url = await fetchRandomVideo(username);
      if (!url) return res.status(404).json({ error: `No video found for ${username}` });
      return res.status(200).json({ url });
    }

    const shuffled = shuffleArray([...usernames]);
    for (const user of shuffled) {
      const url = await fetchRandomVideo(user);
      if (url) return res.status(200).json({ url });
    }

    return res.status(404).json({ error: "No valid videos found." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
