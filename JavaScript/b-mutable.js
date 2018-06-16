'use strict';

const text = (s = '', o = {
  line: a => (s += '\n' + a, o),
  toString: () => s
}) => o;

// Usage

const txt = text('line1')
  .line('line2')
  .line('line3')
  .line('line4');

console.log(`${txt}`);
