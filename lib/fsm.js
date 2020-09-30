'use strict';

export const states = {
  INITIAL: 'INITIAL',
  POMODORO: 'POMODORO',
  PAUSE: 'PAUSE',
  BREAK: 'BREAK',
  DONE: 'DONE',
};

export const actions = {
  START_SESSION: 'START_SESSION',
  START_POMODORO: 'START_POMODORO',
  END_POMODORO: 'END_POMODORO',
  PAUSE_POMODORO: 'PAUSE_POMODORO',
  CONTINUE_POMODORO: 'CONTINUE_POMODORO',
  START_BREAK: 'START_BREAK',
  END_BREAK: 'END_BREAK',
  DEFAULT: 'DEFAULT',
  END_SESSION: 'END_SESSION',
};

const TRANSITIONS = {
  // CurrentState[event] =>  New State, Action
  [states.INITIAL]: {
    s: [states.POMODORO, actions.START_POMODORO],
    q: [states.DONE, actions.END_SESSION],
    start: [states.INITIAL, actions.START_SESSION],
  },
  [states.POMODORO]: {
    p: [states.PAUSE, actions.PAUSE_POMODORO],
    q: [states.INITIAL, actions.END_POMODORO],
    finished: [states.BREAK, actions.START_BREAK],
  },
  [states.PAUSE]: {
    s: [states.POMODORO, actions.CONTINUE_POMODORO],
    q: [states.INITIAL, actions.END_POMODORO],
  },
  [states.BREAK]: {
    q: [states.INITIAL, actions.END_BREAK],
    finished: [states.INITIAL, actions.DEFAULT],
  },
};

class FSM {
  constructor() {}

  state = states.INITIAL;
  listener;

  init() {
    this.update('start');
  }

  update(event) {
    const [newState, action] = TRANSITIONS[this.state][event] || [
      this.state,
      actions.DEFAULT,
    ];
    this.state = newState;
    this.listener(action);
  }

  onStateChange(cb) {
    this.listener = cb;
  }
}

export default new FSM();
