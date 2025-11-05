'use strict';

const text = (
  s = '',
  instance = {
    line: (a) => {
      s += '\n' + a;
      return instance;
    },
    toString: () => s,
  },
) => instance;

// Usage

const txt = text('line1').line('line2').line('line3').line('line4');

console.log(`${txt}`);
