const videos = document.querySelectorAll('video');
let currentVideo = 0;

// Play videos sequentially
videos.forEach((video, index) => {
    video.loop = false; // Disable default looping
    video.addEventListener('ended', () => {
        if (currentVideo < videos.length - 1) {
            currentVideo++;
            videos[currentVideo].play();
        } else {
            currentVideo = 0; // Reset to the first video
            videos[currentVideo].play();
        }
    });
});

// Automatically start the first video when the page loads
window.addEventListener('load', () => {
    if (videos.length > 0) {
        videos[0].play();
    }
});
