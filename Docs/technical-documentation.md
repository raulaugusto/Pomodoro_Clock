# 📘 Documentação Técnica --- Pomodoro Clock

Este documento descreve o funcionamento interno do Pomodoro Clock,
incluindo a estrutura das variáveis globais, fluxo de execução do timer,
manipulação do DOM e funções utilitárias.

---

# 📂 Estrutura do Código

O script é organizado em quatro partes principais:

1.  **Seleção de elementos do DOM**
2.  **Variáveis de controle**
3.  **Listeners e interações**
4.  **Funções de lógica e utilidades**

---

# 🎯 1. Seleção dos Elementos do DOM

```js
const badge = document.getElementById("badge");
const clockCard = document.getElementById("clock");
const body = document.querySelector("body");
const timer = document.getElementById("timer");
const focusTimeInput = document.getElementById("focus");
const restTimeInput = document.getElementById("rest");
const startButton = document.getElementById("startTimer");
const resetButton = document.getElementById("resetTimer");
const alternateButton = document.getElementById("alternate");
```

Esses elementos representam partes principais da interface, como:

- O display do timer\
- Inputs de foco e descanso\
- Botões\
- Layout para alternar entre tema de foco e descanso

---

# 🎚️ 2. Variáveis de Controle

```js
let focusTimerValue = 25;
let restTimerValue = 5;
let intervalId = null;
let remainingTime = 0;
let timerState = "stopped"; // "running" | "paused"
let mode = "focus"; // "focus" | "rest"
```

### Explicação dos Estados:

Variável Função

---

focusTimerValue Minutos configurados para foco
restTimerValue Minutos para descanso
intervalId ID do setInterval ativo
remainingTime Tempo restante em ms
timerState Estado atual do timer
mode Modo: foco ou descanso

---

# 🎛️ 3. Event Listeners

### ➤ Validação dos inputs

```js
focusTimeInput.addEventListener("focusout", ...)
restTimeInput.addEventListener("focusout", ...)
```

Sempre que o usuário sai do campo, o input é:

- Validado (1 a 60 min)
- Aplicado ao modo atual
- Usado para atualizar o display

### ➤ Botões principais

- **Start/Pause**

  ```js
  startButton.addEventListener("click", () => evalTimerState());
  ```

- **Reset**

  ```js
  resetButton.addEventListener("click", () => resetTimer());
  ```

- **Alternar entre modos**

  ```js
  alternateButton.addEventListener("click", () => changeMode());
  ```

---

# ⚙️ 4. Funções Principais

## 🧠 evalTimerState()

Gerencia o comportamento do botão Start/Pause.

Estados possíveis:

- `stopped` → inicia o timer\
- `running` → pausa o timer\
- `paused` → retoma o timer

---

## ⏱️ startTimer(time)

Inicia o timer regressivo:

```js
const endTime = Date.now() + time * 60000;
```

A cada segundo:

- Atualiza `remainingTime`
- Formata o tempo
- Exibe no display

Quando chega a 0:

- Executa `finishTimer()`
- Alterna automaticamente entre foco ↔ descanso

---

## 🔄 resetTimer()

Reseta totalmente o estado do timer:

- Para intervalos\
- Reabilita inputs\
- Redefine o tempo no display

---

## 🛑 finishTimer()

Usada quando o timer chega ao fim ou ao alterar inputs.

Executa:

- Cancela intervalos\
- Retorna ao estado `"stopped"`\
- Atualiza o botão para "play"\
- Exibe o tempo inicial do modo atual

---

## 🔁 changeMode()

Alterna entre:

- `"focus"`
- `"rest"`

E executa:

- Reset\
- Troca layout (classes CSS)\
- Atualiza texto do badge

---

## 🎨 updateModeLayout()

Modifica o visual da aplicação:

- Cor de fundo\
- Cores dos botões\
- Estilo do timer

---

## ⏳ updateTimerStartingValue()

Exibe o tempo inicial do modo atual:

- `focusTimerValue` se mode = `"focus"`
- `restTimerValue` se mode = `"rest"`

---

## 🪪 changeBadgeText()

Atualiza o texto do badge:

- **Foco**
- **Descanso**

---

# 🧩 Funções Utilitárias

### ✨ generateFormatedTime(minutes, seconds)

Formata o tempo para:

    mm:ss

### ✨ showInputError(message, idSuffix)

Exibe ou oculta mensagens de erro abaixo dos inputs.

### ✨ updateButtonIcon(icon)

Alterna entre ícones de play/pause.

### ✨ toggleInputDisabled(status)

Controla se os inputs estão habilitados ou não durante o timer.

---

# 📌 Fluxo Geral do Timer

    Usuário clica Start →
        evalTimerState() detecta "stopped" →
            startTimer() inicia contagem →
                Timer atualiza display a cada segundo →
                    Quando chega a 0:
                        finishTimer() →
                            changeMode() →
                                evalTimerState() inicia o próximo ciclo

---
