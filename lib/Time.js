export default class Time {
  _secondsSpent = 0;
  _counter;
  _endTime;
  _onFinished;
  _onUpdate;

  constructor(onUpdate = () => {}, onFinished = () => {}) {
    this._onUpdate = onUpdate;
    this._onFinished = onFinished;
  }

  start(endTime = 5 * 60) {
    this._counter = setInterval(() => this._addSecond(), 1000);
    this._endTime = endTime;
  }

  stop() {
    clearInterval(this._counter);
  }

  onUpdate(cb) {
    this._onUpdate = cb;
  }

  onFinished(cb) {
    this._onFinished = cb;
  }

  _addSecond() {
    this._secondsSpent++;
    this._onUpdate();
    if (this._secondsSpent >= this._endTime) {
      this._onFinished();
      this.stopAndReset();
    }
  }

  reset() {
    this.secondsSpent = 0;
  }

  stopAndReset() {
    this.stop();
    this.reset();
  }

  toString() {
    const minutes = this._secondsSpent
      ? Math.floor(this._secondsSpent / 60)
      : 0;
    const seconds = Math.floor(
      minutes ? this._secondsSpent % (minutes * 60) : this._secondsSpent
    );
    return `Time: ${minutes}m ${seconds}s`;
  }
}
