const videos = document.querySelectorAll('video');
let currentVideoIndex = 0;

// Function to play the next video
const playNextVideo = () => {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length; // Cycle to the next video
    videos[currentVideoIndex].play();
};

// Attach event listeners to each video
videos.forEach((video, index) => {
    video.loop = false; // Disable default looping
    video.addEventListener('ended', () => {
        playNextVideo(); // Play the next video when the current one ends
    });
});

// Start the first video automatically on page load
window.addEventListener('DOMContentLoaded', () => {
    if (videos.length > 0) {
        videos[currentVideoIndex].play();
    }
});
