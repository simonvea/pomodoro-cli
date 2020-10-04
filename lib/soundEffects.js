import player from 'play-sound';
import { actions } from './fsm.js';

const pomoPLayer = player();

let audio;

export function updateSound(action) {
  switch (action) {
    case actions.CONTINUE_POMODORO:
    case actions.START_POMODORO:
      // TODO: Fix so this loops.
      audio = pomoPLayer.play('../assets/clock-ticking-2.mp3', (err) => {
        if (err && !err.killed) throw err;
      });
      break;
    case actions.START_BREAK:
      audio = pomoPLayer.play(
        '../assets/analog-watch-alarm_daniel-simion.mp3',
        (err) => {
          if (err && !err.killed) throw err;
        }
      );
      break;
    case actions.PAUSE_POMODORO:
    case actions.END_SESSION:
    case actions.END_POMODORO:
      audio.kill();
      break;
  }
}
