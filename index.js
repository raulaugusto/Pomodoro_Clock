const timer = document.getElementById("timer");
const focusTimeInput = document.getElementById("focus");
const restTimeInput = document.getElementById("rest");
const startButton = document.getElementById("startTimer");
const resetButton = document.getElementById("resetTimer");
const alternateButton = document.getElementById("alternate");

let focusTimerValue = 0.1;
let restTimerValue = 5;
let intervalId = null;
let remainingTime = 0;
let timerState = "stopped";

focusTimeInput.addEventListener("focusout", () => {
  let timerValue = parseInt(focusTimeInput.value, 10);

  const min = 1;
  const max = 60;

  if (isNaN(timerValue)) {
    showInputError("Digite um número válido", "focus");
    return;
  }

  if (timerValue > max) {
    showInputError(`O valor máximo é de ${max} minutos`, "focus");
    timerValue = max;
  }

  if (timerValue < min) {
    showInputError(`O valor mínimo é de ${min} minutos`, "focus");
    timerValue = min;
  }

  focusTimeInput.value = timerValue;
  focusTimerValue = timerValue;
  const formatedTime = generateFormatedTime(timerValue);
  timer.textContent = formatedTime;
});

restTimeInput.addEventListener("focusout", () => {
  let timerValue = parseInt(restTimeInput.value, 10);

  const min = 1;
  const max = 60;

  if (isNaN(timerValue) || timerValue == undefined || timerValue == null) {
    showInputError("Digite um número válido", "rest");
    return;
  }

  if (timerValue > max) {
    showInputError(`O valor máximo é de ${max} minutos`, "rest");
    timerValue = max;
  }
  if (timerValue < min) {
    showInputError(`O valor mínimo é de ${min} minutos`, "rest");
    timerValue = min;
  }

  restTimeInput.value = timerValue;
});

startButton.addEventListener("click", () => evalTimerState());

resetButton.addEventListener("click", () => resetTimer());

function evalTimerState() {
  switch (timerState) {
    case "stopped":
      startTimer(focusTimerValue);
      timerState = "running";
      break;
    case "running":
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
        timerState = "paused";
        return;
      }
    case "paused":
      startTimer(remainingTime / 60000);
      timerState = "running";
  }
}

function startTimer(time) {
  const endTime = Date.now() + time * 60000;
  intervalId = setInterval(() => {
    remainingTime = Math.max(0, endTime - Date.now());
    const minutes = Math.floor(remainingTime / 60000);
    const seconds = Math.floor((remainingTime % 60000) / 1000);
    if (remainingTime == 0) {
      clearInterval(intervalId);
      intervalId = null;
      timerState = "stopped";
    }
    const formated = generateFormatedTime(minutes, seconds);
    timer.textContent = formated;
  }, 1000);
}

function resetTimer() {
  clearInterval(intervalId);
  intervalId = null;
  timer.innerText = generateFormatedTime(focusTimerValue);
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
  console.log(errorLabel);

  if (errorLabel.style.display == "none") {
    errorLabel.textContent = message;
    errorLabel.style.display = "block";
  } else {
    errorLabel.style.display = "none";
  }
}
