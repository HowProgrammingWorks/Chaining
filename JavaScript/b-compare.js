'use strict';

const implementations = [
  '6-promise', '7-functor', '8-prototype', '9-build'
].map((name) => `./${name}.js`).map(require);

const test = require('./a-test.js');

implementations.map((chaining, i) => {
  console.log(`Implementation: #${i}`);
  test(chaining);
});
