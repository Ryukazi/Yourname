// Select all video elements
const videos = document.querySelectorAll('video');
let currentVideoIndex = 0;

// Function to play videos sequentially
videos.forEach((video, index) => {
    video.addEventListener('ended', () => {
        if (currentVideoIndex < videos.length - 1) {
            currentVideoIndex++;
            videos[currentVideoIndex].play();
        }
    });
});

// Automatically play the first video when the page loads
window.addEventListener('load', () => {
    if (videos.length > 0) {
        videos[0].play();
    }
});
