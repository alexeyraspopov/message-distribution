import ExecutionContext from './ExecutionContext';

export default class MessageDispatcher {
  constructor() {
    this.context = new ExecutionContext();
    this.listeners = new Map();
  }

  dispatch(message) {
    for (const listener of this.listeners.values()) {
      this.context.execute(listener, message);
    }
  }

  register(listener) {
    const token = `ID${this.id++}`;
    this.listeners.set(token, listener);
    return token;
  }

  unregister(token) {
    this.listeners.delete(token);
  }
}
