const timer = document.getElementById("timer");
const focusTimeInput = document.getElementById("focus");
const restTimeInput = document.getElementById("rest");
const startButton = document.getElementById("startTimer");
const resetButton = document.getElementById("resetTimer");
const alternateButton = document.getElementById("alternate");

let focusTimerValue = 25;
let restTimerValue = 5;

focusTimeInput.addEventListener("focusout", () => {
  let timerValue = parseInt(focusTimeInput.value, 10);

  const min = 1;
  const max = 60;

  if (isNaN(timerValue) || timerValue == undefined || timerValue == null) {
    showInputError("Digite um número válido", "focus");
    return;
  }

  if (timerValue > max) {
    showInputError(`O valor máximo é de ${max} minutos`, "focus");
    timerValue = max;
  }

  if (timerValue < min) {
    showInputError(`O valor mínimo é de ${max} minutos`, "focus");
    timerValue = min;
  }

  focusTimeInput.value = timerValue;
  focusTimerValue = timerValue;
  timer.textContent = `${timerValue}:00`;
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
    showInputError(`O valor mínimo é de ${max} minutos`, "rest");
    timerValue = min;
  }

  restTimeInput.value = timerValue;
  restTimerValue = timerValue;
});

startButton.addEventListener("click", () => startTimer(focusTimerValue));

function startTimer(durationInMinutes) {
  const endTime = Date.now() + durationInMinutes * 60000;
  var counter = setInterval(() => {
    const remaining = Math.max(0, endTime - Date.now());
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    if (remaining == 0) {
      clearInterval(counter);
      alert("end");
    }
    const formated = generateFormatedTime(minutes, seconds);
    timer.textContent = formated;
  }, 1000);
}

function generateFormatedTime(minutes, seconds) {
  if (!minutes) minutes == 0;
  if (!seconds) seconds == 0;
  let formatedMinutes = minutes;
  let formatedSeconds = seconds;

  if (minutes < 10) formatedMinutes = `0${minutes}`;
  if (seconds < 10) formatedSeconds = `0${seconds}`;

  return `${formatedMinutes}:${formatedSeconds}`;
}

function showInputError(message, idSufix) {
  const errorLabel = document.getElementById(`${idSufix}-time-error`);
  console.log(errorLabel);

  if (errorLabel) {
    errorLabel.textContent = message;
    errorLabel.style.display = "block";
  } else {
    errorLabel.style.display = "hidden";
  }
}
