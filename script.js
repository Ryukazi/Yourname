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

// Scroll to the next video automatically when one video ends
const videoContainer = document.querySelector('.video-container');

videoContainer.addEventListener('scroll', () => {
    let scrollPosition = videoContainer.scrollLeft;
    let containerWidth = videoContainer.offsetWidth;
    let totalWidth = videoContainer.scrollWidth;

    // Check if user has scrolled to the right end
    if (scrollPosition + containerWidth >= totalWidth) {
        // Start from the first video again after reaching the end
        currentVideoIndex = 0;
        videos[currentVideoIndex].play();
    }
});

// Optional: Auto-play the next video when a user scrolls the container
videoContainer.addEventListener('scroll', () => {
    const visibleVideo = getVisibleVideo();
    if (visibleVideo && !visibleVideo.paused) {
        return;
    }
    if (visibleVideo) {
        visibleVideo.play();
    }
});

function getVisibleVideo() {
    return Array.from(videos).find((video) => {
        const rect = video.getBoundingClientRect();
        return rect.top >= 0 && rect.bottom <= window.innerHeight;
    });
}
