'use strict';
import FSM, { states } from './fsm.js';

const POMO_LENGTH_IN_MINUTES = 25;
let secondsSpent = 0;

function pomoCounter() {
  if (FSM.state === states.POMODORO) {
    secondsSpent++;
    const minutes = secondsSpent ? Math.floor(secondsSpent / 60) : 0;
    const seconds = Math.floor(
      minutes ? secondsSpent % (minutes * 60) : secondsSpent
    );

    // TODO: Move this to onStatechange?
    // I.e FSM.on('count'). Maybe include the whole logic in FSM. It is an event after all.
    console.clear();
    console.log('Pomodoro in process!');
    console.log(`Time: ${minutes}m ${seconds}s`);
    console.log('');
    // TODO: Add sound
    console.log('Press q to quit');
    console.log('or press p to pause');

    if (minutes >= POMO_LENGTH_IN_MINUTES) {
      clearInterval(counter);
      // TODO: Add sound
      FSM.update('finished');
    }
  }
}

export let counter;
export const clearSecondsSpent = () => (secondsSpent = 0);

export const startCounter = () => {
  clearInterval(counter);
  counter = setInterval(pomoCounter, 1000);
};
