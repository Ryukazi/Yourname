// Sequential video play functionality
const videos = document.querySelectorAll('.video-container video');
let currentVideoIndex = 0;

// Function to play the next video with a small delay
function playNextVideo() {
    // Pause the current video
    videos[currentVideoIndex].pause();

    // Update to the next video index
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;

    // Play the next video
    videos[currentVideoIndex].play();
}

// Adding 'ended' event listener to each video for sequential play
videos.forEach((video, index) => {
    video.addEventListener('ended', () => {
        // Delay to make sure the transition feels smooth
        setTimeout(() => {
            playNextVideo();
        }, 500); // 500ms delay before playing the next video
    });
});

// Play the first video when the page loads
window.addEventListener('load', () => {
    if (videos.length > 0) {
        videos[0].play();
    }
});

// Highlight the currently playing video with a glow effect
function updateVideoHighlight() {
    videos.forEach((video, index) => {
        if (index === currentVideoIndex) {
            video.style.boxShadow = '0 0 15px #00ff00'; // Green glow for current video
        } else {
            video.style.boxShadow = 'none'; // Remove glow from non-playing videos
        }
    });
}

// Update the highlight whenever the video changes
videos.forEach((video, index) => {
    video.addEventListener('play', () => {
        currentVideoIndex = index;
        updateVideoHighlight();
    });
});

// Trigger highlight when page loads
window.addEventListener('load', updateVideoHighlight);
