<script>
    // Track video play and pause events
    document.addEventListener('DOMContentLoaded', () => {
        const videoContainer = document.getElementById('video-container');
        const videos = videoContainer.querySelectorAll('video');

        // Track play and pause events for all videos
        videos.forEach(video => {
            video.addEventListener('play', function() {
                console.log(`Video with src ${video.src} is playing!`);
            });

            video.addEventListener('pause', function() {
                console.log(`Video with src ${video.src} is paused!`);
            });
        });

        // Scroll event to restart videos when reaching the end
        videoContainer.addEventListener('scroll', () => {
            // Check if the user has scrolled to the end of the container
            if (videoContainer.scrollLeft + videoContainer.clientWidth >= videoContainer.scrollWidth) {
                // Restart the videos by resetting the scroll position to the start
                videoContainer.scrollLeft = 0;

                // Play the first video again if it's paused
                videos[0].currentTime = 0;
                videos[0].play();
            }
        });

        // Add 'loaded' class to body to hide loading animation once the page is fully loaded
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });
    });
</script>
