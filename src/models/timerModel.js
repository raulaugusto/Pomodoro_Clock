class TimerModel {
  constructor() {
    // Default Values
    this.focusTime = 25;
    this.restTime = 5;
    this.longRestTime = 30;
    this.remainingTime = 0;
    this.sessionCounter = 0;

    // Execution controll
    this.intervalId = null;
    this.state = "stopped";
    this.mode = "focus";

    // Observers list to notify changes
    this.observers = [];
  }

  // =============== OBSERVERS =================

  static subscribe(callback) {
    this.observers.push(callback);
  }

  static notify(event, data) {
    this.observers.forEach((callback) => callback(event, data));
  }
}
