const timer = document.getElementById("timer");
const focusTimeInput = document.getElementById("focus");
const restTimeInput = document.getElementById("rest");
const startButton = document.getElementById("startTimer");
const resetButton = document.getElementById("resetTimer");
const alternateButton = document.getElementById("alternate");

let focusTimerValue = 0.1;
let restTimerValue = 5;

focusTimeInput.addEventListener("focusout", () => {
  const timerValue = focusTimeInput.value;
  if (timerValue > 60) {
    alert("O valor máximo é de 60 minutos");
    focusTimeInput.value = 60;
    focusTimerValue = 60;
  }
  timer.textContent = `${timerValue}:00`;
  focusTimerValue = timerValue;
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

startButton.addEventListener("click", () => startTimer(focusTimerValue));

function startTimer(durationInMinutes) {
  const endTime = Date.now() + durationInMinutes * 60000;
  console.log(endTime);
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
  }, 100);
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
