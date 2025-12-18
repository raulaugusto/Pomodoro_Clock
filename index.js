const badge = document.getElementById("badge");
const clockCard = document.getElementById("clock");
const body = document.querySelector("body");
const timer = document.getElementById("timer");
const focusTimeInput = document.getElementById("focus");
const restTimeInput = document.getElementById("rest");
const longRestTimeInput = document.getElementById("long-rest");
const startButton = document.getElementById("startTimer");
const resetButton = document.getElementById("resetTimer");
const alternateButton = document.getElementById("alternate");
const progressFilling = document.getElementById("progressFilling");

let focusTimerValue = 0;
let restTimerValue = 0;
let longRestTimerValue = 1;
let remainingTime = 0;
let sessionCounter = 0;
let intervalId = null;
let timerState = "stopped";
let mode = "focus";

function checkInputValue(value, min, max, idPrefix) {
  if (isNaN(value)) {
    showInputError("Digite um número válido", idprefix);
    return 25;
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
  captureOnFocusOut(focusTimeInput, "focus");
});

restTimeInput.addEventListener("focusout", () => {
  captureOnFocusOut(restTimeInput, "rest");
});

longRestTimeInput.addEventListener("focusout", () => {
  captureOnFocusOut(longRestTimeInput, "long-rest");
});

function captureOnFocusOut(input, idPrefix) {
  let timerValue = parseInt(input.value, 10);
  timerValue = checkInputValue(timerValue, 1, 60, idPrefix);
  input.value = timerValue;

  if (idPrefix === "focus") {
    focusTimerValue = timerValue;
  } else if (idPrefix === "rest") {
    restTimerValue = timerValue;
  } else if (idPrefix === "long-rest") {
    longRestTimerValue = timerValue;
  }

  if (idPrefix === mode) {
    finishTimer();
    timer.textContent = generateFormatedTime(timerValue, 0);
  }
}

startButton.addEventListener("click", () => evalTimerState());

resetButton.addEventListener("click", () => resetTimer());

alternateButton.addEventListener("click", () => changeMode());

function evalTimerState() {
  switch (timerState) {
    case "stopped":
      let initialTime = evalTimeValue();
      startTimer(initialTime);
      updateButtonIcon("pause");
      timerState = "running";
      break;
    case "running":
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
        timerState = "paused";
        progressFilling.style.width = getCurrentProgressWidth()
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

function evalTimeValue() {
  if (mode === "focus") {
    return focusTimerValue;
  } else if (mode === "long-rest") {
    return longRestTimerValue;
  } else {
    return restTimerValue;
  }
}

function startTimer(time) {
  if (intervalId !== null) {
    console.warn("Timer já rodando!");
    return;
  }
  console.log("remaining time 1: " + time)
  console.log("remaining time multiplied: " + time * 60000)
  toggleInputDisabled(true);
  const endTime = Date.now() + time * 60000;
  console.log("endTime: " + endTime)
  progressBar(time)
  intervalId = setInterval(() => {
    remainingTime = Math.max(0, endTime - Date.now());
    console.log("remaining time 2: " + remainingTime)
    const minutes = Math.floor(remainingTime / 60000);
    const seconds = Math.ceil((remainingTime % 60000) / 1000);
    if (remainingTime <= 0) {
      if (mode === "focus") {
        sessionCounter++
        finishTimer();
        changeMode()
        evalTimerState(); // Auto-inicia descanso
        if(sessionCounter === 4) sessionCounter = 0
      } else {
        finishTimer(); // Para no descanso
        changeMode()
      }
      return;
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
  updateTimerStartingValue();
}

function finishTimer() {
  clearInterval(intervalId);
  intervalId = null;
  timerState = "stopped";
  updateButtonIcon("play");
  toggleInputDisabled(false);
  updateTimerStartingValue();
}

function changeMode() {

  if(sessionCounter === 4){
    mode = 'long-rest'
  }else{
    mode = mode === "focus" ? "rest" : "focus";
  }
  resetTimer();
  updateModeLayout();
  changeBadgeText();
}

function updateModeLayout() {
  const elementsToChange = [badge, startButton, clockCard, body];
  elementsToChange.forEach((el) => {
    el.classList.toggle("focus");
    el.classList.toggle("rest");
  });
}

function updateTimerStartingValue() {
  const timeToUpdate = evalTimeValue();
  timer.innerText = generateFormatedTime(timeToUpdate, 0);
}

function changeBadgeText() {
  badge.innerText = badge.classList.contains("focus") ? "Foco" : "Descanso";
}

function generateFormatedTime(minutes, seconds) {
  if (!minutes) minutes = 0;
  if (!seconds) sseconds = 0;
  let formatedMinutes = minutes;
  let formatedSeconds = seconds;

  if (minutes < 10) formatedMinutes = `0${minutes}`;
  if (seconds < 10) formatedSeconds = `0${seconds}`;

  return `${formatedMinutes}:${formatedSeconds}`;
}

function showInputError(message, idSufix) {
  const errorLabel = document.getElementById(`${idSufix}-time-error`);

  if (message === "") {
    errorLabel.style.display = "none";
  } else {
    errorLabel.textContent = message;
    errorLabel.style.display = "block";
    setTimeout(() => {
      errorLabel.style.display = "none";
      message = "";
    }, 5000);
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
  longRestTimeInput.disabled = status;
}

function progressBar(time) {
  const timeInSeconds = time * 60  
  progressFilling.style.transition = `linear ${timeInSeconds}s`
  progressFilling.style.width = '300px';
  progressFilling.style.opacity = "100%";
}

function getCurrentProgressWidth() {
  let timeInMinutes = 0;
  
  // Pega o tempo total em minutos baseado no modo atual
  switch(mode){
    case "focus":
      timeInMinutes = focusTimerValue;
      break; 
    case "rest":
      timeInMinutes = restTimerValue;
      break;
    case "long-rest":
      timeInMinutes = longRestTimerValue;
      break;
  }
  
  // Converte o tempo total para milissegundos
  const totalTimeInMs = timeInMinutes * 60000;

  
  // Calcula a fração (quanto já passou / total)
  const fraction = remainingTime / totalTimeInMs;
  
  // Retorna a largura proporcional
  return `${300 * fraction}px`;
}