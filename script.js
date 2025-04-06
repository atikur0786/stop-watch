// DOM Elements
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const resetButton = document.getElementById("reset-button");
const timerDisplay = document.getElementById("display");
const lapList = document.getElementById("lap-list");
const lapButton = document.getElementById("lap-button");

// Stopwatch state variables
let timeInterval;
let startTime;
let elapsedTime = 0;
let isRunning = false;
let lapCount = 0;
let lapTimes = [];

// Initialize button states
function initializeButtons() {
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = true;
  lapButton.disabled = true;
}

// Format time to display in HH:MM:SS:CC format
function formatTime(timeInMs) {
  const time = new Date(timeInMs);
  const hours = String(time.getUTCHours()).padStart(2, "0");
  const minutes = String(time.getUTCMinutes()).padStart(2, "0");
  const seconds = String(time.getUTCSeconds()).padStart(2, "0");
  // Convert milliseconds to centiseconds (1/100th of a second)
  const centiseconds = String(
    Math.floor(time.getUTCMilliseconds() / 10)
  ).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}:${centiseconds}`;
}

// Event listeners
startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
lapButton.addEventListener("click", recordLap);

// Start the timer
function startTimer() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timeInterval = setInterval(updateTimer, 10); // Update every 10ms for smoother display
    isRunning = true;

    // Update button states
    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = false;
    lapButton.disabled = false;
  }
}

// Stop the timer
function stopTimer() {
  if (isRunning) {
    clearInterval(timeInterval);
    isRunning = false;

    // Update button states
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = false;
    lapButton.disabled = false;
  }
}

// Reset the timer
function resetTimer() {
  clearInterval(timeInterval);

  // Reset all state variables
  elapsedTime = 0;
  lapCount = 0;
  lapTimes = [];

  // Reset display
  timerDisplay.textContent = "00:00:00:00";
  lapList.innerHTML = "";

  isRunning = false;

  // Reset button states
  initializeButtons();
}

// Update the timer display
function updateTimer() {
  elapsedTime = Date.now() - startTime;
  timerDisplay.textContent = formatTime(elapsedTime);
}

// Record a lap time
function recordLap() {
  if (isRunning) {
    lapCount++;
    const formattedTime = formatTime(elapsedTime);

    // Create lap entry element
    const lapEntry = document.createElement("li");
    lapEntry.innerHTML = `<span>Lap ${lapCount}</span><span>${formattedTime}</span>`;

    // Add to the beginning of the list for most recent at top
    if (lapList.firstChild) {
      lapList.insertBefore(lapEntry, lapList.firstChild);
    } else {
      lapList.appendChild(lapEntry);
    }

    // Store lap time
    lapTimes.push(elapsedTime);
  }
}

// Initialize the stopwatch on page load
document.addEventListener("DOMContentLoaded", function () {
  initializeButtons();
});
