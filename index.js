const timer = document.getElementById("timer");
const focusTimeInput = document.getElementById("focus");
const restTimeInput = document.getElementById("rest");
const startButton = document.getElementById("startTimer");
const resetButton = document.getElementById("resetTimer");
const alternateButton = document.getElementById("alternate");

let focusTimerValue = 25;
let restTimerValue = 5;
let timeLeft = focusTimerValue;

focusTimeInput.addEventListener("focusout", () => {
  const timerValue = focusTimeInput.value;
  if (timerValue > 60) {
    alert("O valor máximo é de 60 minutos");
    focusTimeInput.value = 60;
    focusTimerValue = 60;
  }
  timer.textContent = `${timerValue}:00`;
  timeLeft = timerValue;
});

restTimeInput.addEventListener("focusout", () => {
  const timerValue = restTimeInput.value;
  if (timerValue > 60) {
    alert("O valor máximo é de 60 minutos");
    restTimeInput.value = 60;
    restTimerValue = 60;
  } else {
    restTimerValue = timerValue;
  }
});
