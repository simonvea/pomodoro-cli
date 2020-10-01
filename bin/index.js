#!/usr/bin/env node

'uset strict';
import readline from 'readline';
import FSM, { actions } from '../lib/fsm.js';
import { counter, startCounter, clearSecondsSpent } from '../lib/counter.js';

const args = process.argv.slice(2);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

FSM.onStateChange(updateConsole);
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
      if (counter) clearInterval(counter);
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
      clearSecondsSpent();
      startCounter();
      break;
    case actions.CONTINUE_POMODORO:
      console.log('Continuing pomodoro');
      startCounter();
      break;
    case actions.PAUSE_POMODORO:
      console.log('Pomodoro is paused...');
      console.log('Press s to continue, or');
      console.log('q to quit.');
      break;
    case actions.START_BREAK:
      // TODO: implement a counter.
      console.log('You are on a break');
      break;
    default:
    // Continue with whatever you are doing..
  }
}
