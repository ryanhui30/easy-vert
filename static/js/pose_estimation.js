const videoElement = document.getElementById('videoPlayer');
const canvasElement = document.getElementById('overlayCanvas');
const canvasCtx = canvasElement.getContext('2d');

let showSkeleton = true; // Toggle flag

// Toggle skeleton visibility
function toggleSkeleton() {
    showSkeleton = !showSkeleton;
    document.getElementById('skeleton-status').innerText = showSkeleton ? 'On' : 'Off';
}

/*
window.onload = () => {
    const videoElement = document.getElementById('videoPlayer');
    const canvasElement = document.getElementById('overlayCanvas');
    const canvasCtx = canvasElement.getContext('2d');
    let showSkeleton = false; // Initialize the toggle flag to false, meaning the skeleton is off initially

    // Initialize Pose object after the page is loaded
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

    // Pose results handler
    pose.onResults((results) => {
        console.log("Pose results received:", results); // Log pose results when they are received

        // Clear the canvas
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

        // Draw the video frame
        canvasCtx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

        if (showSkeleton) {
            if (results.poseLandmarks) {
                console.log("Drawing skeleton on canvas...");
                drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, { color: '#00FF00' });
                drawLandmarks(canvasCtx, results.poseLandmarks, { color: '#FF0000', radius: 5 });
            } else {
                console.warn("No landmarks detected, skeleton not drawn.");
            }
        } else {
            console.log("Skeleton toggle is off, skipping pose drawing.");
        }
    });

    // Toggle skeleton visibility
    function toggleSkeleton() {
        showSkeleton = !showSkeleton;
        document.getElementById('skeleton-status').innerText = showSkeleton ? 'Skeleton: On' : 'Skeleton: Off';
        console.log(`Skeleton toggle changed: ${showSkeleton ? 'On' : 'Off'}`);
    }

    // Process video frames when the video is playing
    videoElement.addEventListener('play', () => {
        const processFrame = () => {
            if (!videoElement.paused && !videoElement.ended) {
                // Only send frames to pose detection if the skeleton is toggled on
                if (showSkeleton) {
                    console.log("Sending video frame to pose detection...");
                    pose.send({ image: videoElement });
                }
                else {
                    console.log("Skeleton toggle is off, skipping pose detection.");
                }
                requestAnimationFrame(processFrame);
            }
        };
        processFrame();
    });
    window.toggleSkeleton = toggleSkeleton;
};
*/

window.onload = () => {
    const videoElement = document.getElementById('videoPlayer');
    const canvasElement = document.getElementById('overlayCanvas');
    const canvasCtx = canvasElement.getContext('2d');

    // Function to resize canvas to match video while respecting aspect ratio
    function resizeCanvas() {
        const videoWidth = videoElement.videoWidth; // Intrinsic video width
        const videoHeight = videoElement.videoHeight; // Intrinsic video height
        const rect = videoElement.getBoundingClientRect(); // Displayed dimensions of the video element

        // Calculate the displayed aspect ratio
        const aspectRatio = videoWidth / videoHeight;

        // Adjust the canvas size to match the displayed video size
        if (rect.width / rect.height > aspectRatio) {
            // Wider container than video: match height, adjust width
            canvasElement.width = rect.height * aspectRatio;
            canvasElement.height = rect.height;
        } else {
            // Taller container than video: match width, adjust height
            canvasElement.width = rect.width;
            canvasElement.height = rect.width / aspectRatio;
        }

        // Sync canvas visual styles with new dimensions
        canvasElement.style.width = `${rect.width}px`;
        canvasElement.style.height = `${rect.height}px`;
    }

    // Resize canvas when video metadata is loaded (to get intrinsic dimensions)
    videoElement.addEventListener('loadedmetadata', resizeCanvas);

    // Resize canvas when the window is resized
    window.addEventListener('resize', resizeCanvas);

    // Optional: Clear the canvas when resizing
    window.addEventListener('resize', () => {
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    });
};

