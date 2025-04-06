const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const resetButton = document.getElementById("reset-button");
const timerDisplay = document.getElementById("display");
const lapList = document.getElementById("lap-list");
const lapButton = document.getElementById("lap-button");

let timeInterval;
let startTime;
let elapsedTime = 0;
let isRunning = false;
let lapCount = 0;
let lapTimes = [];

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
lapButton.addEventListener("click", recordLap);

function startTimer() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timeInterval = setInterval(updateTimer, 100);
    isRunning = true;
    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = false;
    lapButton.disabled = false;
  }
}

function stopTimer() {
  if (isRunning) {
    clearInterval(timeInterval);
    isRunning = false;
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = false;
    lapButton.disabled = false;
  }
}

function resetTimer() {
  clearInterval(timeInterval);
  elapsedTime = 0;
  lapCount = 0;
  lapTimes = [];
  timerDisplay.textContent = "00:00:00:00";
  lapList.innerHTML = "";
  isRunning = false;
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = true;
  lapButton.disabled = true;
}

function updateTimer() {
  elapsedTime = Date.now() - startTime;
  const time = new Date(elapsedTime);
  const hours = String(time.getUTCHours()).padStart(2, "0");
  const minutes = String(time.getUTCMinutes()).padStart(2, "0");
  const seconds = String(time.getUTCSeconds()).padStart(2, "0");
  const milliseconds = String(
    Math.floor(time.getUTCMilliseconds() / 10)
  ).padStart(2, "0");
  timerDisplay.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function recordLap() {
  if (isRunning) {
    lapCount++;
    const lapTime = new Date(elapsedTime);
    const hours = String(lapTime.getUTCHours()).padStart(2, "0");
    const minutes = String(lapTime.getUTCMinutes()).padStart(2, "0");
    const seconds = String(lapTime.getUTCSeconds()).padStart(2, "0");
    const milliseconds = String(
      Math.floor(lapTime.getUTCMilliseconds() / 10)
    ).padStart(2, "0");
    const lapEntry = document.createElement("li");
    lapEntry.textContent = `Lap ${lapCount}: ${hours}:${minutes}:${seconds}:${milliseconds}`;
    lapList.appendChild(lapEntry);
    lapTimes.push(elapsedTime);
  }
}
