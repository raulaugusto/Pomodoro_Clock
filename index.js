const timer = document.getElementById("timer");
const focusTimeInput = document.getElementById("focus");
const restTimeInput = document.getElementById("rest");
const startButton = document.getElementById("startTimer");
const resetButton = document.getElementById("resetTimer");
const alternateButton = document.getElementById("alternate");

let focusTimerValue = 0.1;
let restTimerValue = 5;
let intervalId = null;

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
  123;
  if (timerValue < min) {
    showInputError(`O valor mínimo é de ${min} minutos`, "rest");
    timerValue = min;
  }

  restTimeInput.value = timerValue;
});

startButton.addEventListener("click", () => startTimer(focusTimerValue));

function startTimer(durationInMinutes) {
  if (intervalId !== null) {
    console.log("Já existe um intervalo rodando!");
    return;
  }

  const endTime = Date.now() + durationInMinutes * 60000;
  intervalId = setInterval(() => {
    const remaining = Math.max(0, endTime - Date.now());
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    if (remaining == 0) {
      clearInterval(intervalId);
      intervalId = null;
    }
    const formated = generateFormatedTime(minutes, seconds);
    timer.textContent = formated;
  }, 1000);
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
