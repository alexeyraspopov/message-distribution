export default class ExecutionContext {
  constructor() {
    this.queue = [];
    this.pending = false;
  }

  execute(routine, ...args) {
    this.queue.push({ routine, args });

    if (!this.pending) {
    	this.pending = true;
      this.flush();
    }
  }

  flush() {
    window.requestIdleCallback(deadline => {
      while (deadline.timeRemaining() > 0 && this.queue.length > 0) {
        const { routine, args } = this.queue.shift();
        routine(...args);
      }

      if (this.queue.length > 0) {
        return this.flush();
      }

      this.pending = false;
    });
  }
}
