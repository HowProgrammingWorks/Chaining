'use strict';

const benchmark = {};
module.exports = benchmark;

const PRE_COUNT = 1000;

const rpad = (s, char, count) => (s + char.repeat(count - s.length));
const lpad = (s, char, count) => (char.repeat(count - s.length) + s);

benchmark.do = (count, name, fn) => {
  const result = [];
  let i;
  for (i = 0; i < PRE_COUNT; i++) result.push(fn());
  const begin = process.hrtime();
  for (i = 0; i < count; i++) result.push(fn());
  const end = process.hrtime(begin);
  const diff = end[0] * 1e9 + end[1];
  const time = lpad(diff.toString(), '.', 12);
  name = rpad(name, '.', 12);
  console.log(name + time + ' nanoseconds');
};
