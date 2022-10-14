'use strict';

const benchmark = require('./c-benchmark.js');
const chainFunctor = require('./7-functor.js');
const test = require('./a-test.js');

benchmark.do(40000, 'Functor', (done) => test(chainFunctor, done));
