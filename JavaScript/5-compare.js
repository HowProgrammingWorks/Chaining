'use strict';

global.api = {
  metasync: require('metasync')
};

const implementations = (
  ['1-promise', '2-functor', '3-prototype']
  .map(name => './' + name + '.js')
  .map(require)
);

const test = require('./4-test.js');

implementations.map((chaining, i) => {
  console.log('Implementation: #' + i);
  test(chaining);
});
