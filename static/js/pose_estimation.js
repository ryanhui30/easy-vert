const videoElement = document.getElementById('videoPlayer');

let takeoffTime = null;
let landingTime = null;
const GRAVITY = 9.8;

let isSlowMotion = false; // Track slow-motion state

// Mark Takeoff Time
function markTakeoff() {
    takeoffTime = videoElement.currentTime; // Actual playback time
    document.getElementById('takeoff-display').innerText = `Takeoff Time: ${takeoffTime.toFixed(2)}s`;
}

// Mark Landing Time
function markLanding() {
    landingTime = videoElement.currentTime; // Actual playback time
    document.getElementById('landing-display').innerText = `Landing Time: ${landingTime.toFixed(2)}s`;

    if (takeoffTime !== null && landingTime !== null) {
        const airtime = landingTime - takeoffTime; // Real airtime, independent of playback speed
        document.getElementById('airtime-display').innerText = `Airtime: ${airtime.toFixed(2)}s`;

        const verticalHeightMeters = (GRAVITY * Math.pow(airtime, 2)) / 8;
        const verticalHeightInches = verticalHeightMeters * 39.3701;

        document.getElementById('height-display').innerText =
            `Vertical Jump Height: ${verticalHeightInches.toFixed(2)} inches`;
    }
}

// Toggle Slow Motion
function toggleSlowMotion() {
    isSlowMotion = !isSlowMotion;
    videoElement.playbackRate = isSlowMotion ? 0.5 : 1; // Set playback rate to 0.5x or normal speed
}

