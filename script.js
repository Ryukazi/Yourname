// Sequential video play functionality
const videos = document.querySelectorAll('.video-container video');
let currentVideoIndex = 0;

videos.forEach((video, index) => {
    video.addEventListener('ended', () => {
        // Move to the next video after the current one ends
        currentVideoIndex = (index + 1) % videos.length;
        videos[currentVideoIndex].play();
    });
});

// Play the first video when the page loads
window.addEventListener('load', () => {
    if (videos.length > 0) {
        videos[0].play();
    }
});
