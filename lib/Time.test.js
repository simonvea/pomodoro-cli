'use strict';
import Time from './Time.js';

jest.useFakeTimers();

describe('Time', () => {
  let time = new Time();
  afterEach(() => {
    time.stopAndReset();
  });

  it('calls onUpdate callback after oneSecond', () => {
    const onUpdate = jest.fn();

    time = new Time(onUpdate);
    time.start();
    jest.advanceTimersByTime(1001);
    expect(onUpdate).toHaveBeenCalledTimes(1);
  });

  it('calls onFinish when time is up', () => {
    const onUpdate = jest.fn();
    const onFinish = jest.fn();
    time = new Time(onUpdate, onFinish);
    time.start(6);
    jest.advanceTimersByTime(6005);
    expect(onFinish).toHaveBeenCalledTimes(1);
  });
});
