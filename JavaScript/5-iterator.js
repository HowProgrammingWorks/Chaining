'use strict';

const text = (
  s = '',
  instance = {
    line: (t) => {
      s += '\n' + t;
      return instance;
    },
    [Symbol.iterator]: () => ({
      next() {
        const res = { value: s, done: this.finished };
        this.finished = true;
        return res;
      },
    }),
  },
) => instance;

// Usage

const txt = text('line1').line('line2').line('line3').line('line4');

console.log(...txt);
