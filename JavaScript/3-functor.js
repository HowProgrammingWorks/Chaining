'use strict';

const text = (s = '') => ({
  line: (a) => text(`${s}\n${a}`),
  toString: () => s
});

// Usage

const txt = text('line1')
  .line('line2')
  .line('line3')
  .line('line4');

console.log(`${txt}`);
