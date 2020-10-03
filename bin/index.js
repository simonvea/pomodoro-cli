#!/usr/bin/env node

'uset strict';
import readline from 'readline';
import { updateCounter, time } from '../lib/counter.js';
import FSM, { actions } from '../lib/fsm.js';

const args = process.argv.slice(2);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

FSM.onStateChange(updateConsole);
FSM.onStateChange(updateCounter);
FSM.onStateChange(updateSound);
FSM.init();

if (args[0] && args[0].toLocaleLowerCase() === 'start') {
  FSM.update('s');
}

process.stdin.on('keypress', (character, k) => {
  clearLine();
  FSM.update(character);
});

rl.on('close', () => {
  clearLine();
  console.log('Have a nice day!');
  process.exit(0);
});

function clearLine() {
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0, null);
}

function updateConsole(action) {
  switch (action) {
    case actions.START_SESSION:
    case actions.END_POMODORO:
    case actions.END_BREAK:
      console.clear();
      console.log('Welcome');
      console.log('Press s to start a pomodoro');
      console.log('and q to quit at anytime');
      break;
    case actions.END_SESSION:
      console.log('Already done?');
      rl.close();
      break;
    case actions.START_POMODORO:
      console.log('Starting Pomodoro!');
      break;
    case actions.CONTINUE_POMODORO:
      console.log('Continuing pomodoro');
      break;
    case actions.PAUSE_POMODORO:
      console.log('Pomodoro is paused...');
      console.log('Press s to continue, or');
      console.log('q to quit.');
      break;
    case actions.START_BREAK:
      console.log('You are on a break');
      break;
    case actions.ADD_SECOND:
      console.clear();
      console.log('Pomodoro in process!');
      console.log(time.toString());
      console.log('');
      console.log('Press q to quit');
      console.log('or press p to pause');
      break;
    default:
    // Continue with whatever you are doing..
  }
}

function updateSound(action) {
  switch (action) {
    case actions.ADD_SECOND:
      // Play sound;
      break;
    case 'FINISH_SOUND':
      // Or something.. Play sound!
      break;
  }
}
