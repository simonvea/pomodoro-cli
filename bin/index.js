#!/usr/bin/env node

'uset strict';
const readline = require('readline');

const MINUTES = 25;
let start = new Date();

let counter;

const arguments = process.argv.splice(2); // i.e if pomo start, this will give us ["start"]

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const startCounter = () => {
  counter = setInterval(() => {
    const time = new Date();
    const timeSpent = time - start;
    const allSeconds = timeSpent / 1000;
    const minutes = Math.floor(allSeconds / 60);
    const seconds = Math.floor(
      minutes ? allSeconds % (minutes * 60) : allSeconds
    );

    console.clear();
    console.log('Pomodoro in process!');
    console.log(`Time: ${minutes}m ${seconds}s`);
    console.log('');
    // TODO: Add sound
    console.log('Press q to quit');
    if (minutes >= MINUTES) {
      clearInterval(counter);
      // TODO: Add sound
      console.log('Finished Pomodoro!');
    }
  }, 1000);
};

console.clear();
console.log('Welcome');
console.log('Press s to start a pomodoro');
console.log('and q to quit at anytime');

process.stdin.on('keypress', (c, k) => {
  switch (c) {
    case 'q':
      clearLine();
      console.log('Ferdig allerede?');
      rl.close();
      break;
    case 's':
      if (!counter) {
        clearLine();
        console.log('Starter Pomodoro!');
        start = new Date();
        startCounter();
      }
      break;
  }
});

rl.on('close', () => {
  clearLine();
  console.log('Ha en fin dag!');
  process.exit(0);
});

function clearLine() {
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0, null);
}
