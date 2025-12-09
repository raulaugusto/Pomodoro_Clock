const timer = document.getElementById("timer");
const focusTimeInput = document.getElementById("focus");
const restTimeInput = document.getElementById("rest");
const startButton = document.getElementById("startTimer");
const resetButton = document.getElementById("resetTimer");
const alternateButton = document.getElementById("alternate");

let focusTimerValue = 25;
let restTimerValue = 5;
let intervalId = null;
let remainingTime = 0;
let timerState = "stopped";

function checkInputValue(value, min, max, idPrefix) {
  if (isNaN(value)) {
    showInputError("Digite um número válido", "focus");
    return;
  }

  if (value > max) {
    showInputError(`O valor máximo é de ${max} minutos`, idPrefix);
    value = max;
    return value;
  }

  if (value < min) {
    showInputError(`O valor mínimo é de ${min} minutos`, idPrefix);
    value = min;
    return value;
  }
  showInputError("", idPrefix);
  return value;
}

focusTimeInput.addEventListener("focusout", () => {
  let timerValue = parseInt(focusTimeInput.value, 10);

  timerValue = checkInputValue(timerValue, 1, 60, "focus");

  focusTimeInput.value = timerValue;
  focusTimerValue = timerValue;
  const formatedTime = generateFormatedTime(timerValue);
  timer.textContent = formatedTime;
});

restTimeInput.addEventListener("focusout", () => {
  let timerValue = parseInt(restTimeInput.value, 10);

  checkInputValue(timerValue, 1, 60, "rest");

  restTimeInput.value = timerValue;
});

startButton.addEventListener("click", () => evalTimerState());

resetButton.addEventListener("click", () => resetTimer());

function evalTimerState() {
  switch (timerState) {
    case "stopped":
      startTimer(focusTimerValue);
      updateButtonIcon("pause");
      timerState = "running";
      break;
    case "running":
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
        timerState = "paused";
        updateButtonIcon("play");
        toggleInputDisabled(false);
      }
      break;
    case "paused":
      startTimer(remainingTime / 60000);
      timerState = "running";
      updateButtonIcon("pause");
      break;
  }
}

function startTimer(time) {
  toggleInputDisabled(true);
  const endTime = Date.now() + time * 60000;
  intervalId = setInterval(() => {
    remainingTime = Math.max(0, endTime - Date.now());
    const minutes = Math.floor(remainingTime / 60000);
    const seconds = Math.floor((remainingTime % 60000) / 1000);
    if (remainingTime === 0) {
      finishTimer();
    }
    const formated = generateFormatedTime(minutes, seconds);
    timer.textContent = formated;
  }, 1000);
}

function resetTimer() {
  clearInterval(intervalId);
  toggleInputDisabled(false);
  updateButtonIcon("play");
  timerState = "stopped";
  intervalId = null;
  timer.innerText = generateFormatedTime(focusTimerValue);
}

function finishTimer() {
  clearInterval(intervalId);
  intervalId = null;
  timerState = "stopped";
  console.log("finished");
  updateButtonIcon("play");
  toggleInputDisabled(false);
}

function generateFormatedTime(minutes, seconds) {
  if (!minutes) minutes = 0;
  if (!seconds) seconds = 0;
  let formatedMinutes = minutes;
  let formatedSeconds = seconds;

  if (minutes < 10) formatedMinutes = `0${minutes}`;
  if (seconds < 10) formatedSeconds = `0${seconds}`;

  return `${formatedMinutes}:${formatedSeconds}`;
}

function showInputError(message, idSufix) {
  const errorLabel = document.getElementById(`${idSufix}-time-error`);

  if (errorLabel.style.display == "none") {
    errorLabel.textContent = message;
    errorLabel.style.display = "block";
  } else {
    errorLabel.style.display = "none";
  }
}

function updateButtonIcon(icon) {
  const pauseIcon = document.getElementById("pause-button");
  const playIcon = document.getElementById("play-button");

  if (icon === "play") {
    pauseIcon.classList.add("hidden");
    playIcon.classList.remove("hidden");
    return;
  }
  if (icon === "pause") {
    pauseIcon.classList.remove("hidden");
    playIcon.classList.add("hidden");
  }
}

function toggleInputDisabled(status) {
  focusTimeInput.disabled = status;
  restTimeInput.disabled = status;
}
