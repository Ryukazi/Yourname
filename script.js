// Get the video element
const video = document.querySelector('.video-container video');

// Play the video when the page loads
window.addEventListener('load', () => {
    if (video) {
        video.play();
    }
});

// If you want to ensure the video plays only once and doesn't auto-loop, remove looping behavior from the video
video.addEventListener('ended', () => {
    console.log('Video has ended.');
    // If you need to do something after the video ends (e.g., redirect or show a message), you can do that here
});
