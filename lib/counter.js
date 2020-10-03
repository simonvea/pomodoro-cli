'use strict';
import FSM, { actions } from './fsm.js';
import Time from './Time.js';

const POMO_LENGTH_IN_SECONDS = 25 * 60;
const BREAK_LENGT_IN_SECONDS = 5 * 60;

const onUpdate = () => FSM.update('count');
const onFinished = () => FSM.update('finished');

export const time = new Time(onUpdate, onFinished);

export function updateCounter(action) {
  switch (action) {
    case actions.START_BREAK:
      time.start(BREAK_LENGT_IN_SECONDS);
      break;
    case actions.START_POMODORO:
      time.start(POMO_LENGTH_IN_SECONDS);
      break;
    case actions.CONTINUE_POMODORO:
      time.start();
      break;
    case actions.PAUSE_POMODORO:
      time.stop();
      break;
    case actions.END_BREAK:
    case actions.END_POMODORO:
      time.stopAndReset();
      break;
    default:
    // Do nothing.
  }
}
