const videoElement = document.getElementById('videoPlayer');
const canvasElement = document.getElementById('overlayCanvas');
const canvasCtx = canvasElement.getContext('2d');

let showSkeleton = true; // Toggle flag

const pose = new Pose({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
});

// Toggle skeleton visibility
function toggleSkeleton() {
    showSkeleton = !showSkeleton;
    document.getElementById('skeleton-status').innerText = showSkeleton ? 'On' : 'Off';
}

document.addEventListener('DOMContentLoaded', () => {
    const videoElement = document.getElementById('videoPlayer');
    const canvasElement = document.getElementById('overlayCanvas');
    if (!canvasElement) {
        console.error('Canvas element not found!');
        return;
    }
    const canvasCtx = canvasElement.getContext('2d');

    const pose = new Pose({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
    });

    pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });

    pose.onResults((results) => {
        // Clear the canvas
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

        // Draw the video frame
        canvasCtx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

        // Draw pose landmarks and connections
        if (results.poseLandmarks) {
            drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, { color: '#00FF00' });
            drawLandmarks(canvasCtx, results.poseLandmarks, { color: '#FF0000', radius: 5 });
        }
    });

    videoElement.addEventListener('play', () => {
        const processFrame = () => {
            if (!videoElement.paused && !videoElement.ended) {
                pose.send({ image: videoElement });
                requestAnimationFrame(processFrame);
            }
        };
        processFrame();
    });
});
