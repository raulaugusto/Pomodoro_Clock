class TimeFormatter {
  static formatTime(minutes, seconds) {
    if (!minutes) minutes = 0;
    if (!seconds) seconds = 0;

    const m = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const s = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${m}:${s}`;
  }

  static minutesToMs(minutes) {
    return minutes * 60000;
  }

  static msToMinutesSeconds(ms) {
    const m = Math.floor(ms / 60000);
    const s = Math.ceil(ms % 60000) / 1000;
    return { minutes, seconds };
  }
}
TimeFormatter.formatTime(5, 30); // "05:30"
TimeFormatter.minutesToMs(25); // 1500000
module.exports = TimeFormatter;
