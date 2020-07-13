'use strict';

const benchmark = require('./c-benchmark');
const chainFunctor = require('./7-functor');
const test = require('./a-test');

benchmark.do(40000, 'Functor', done => test(chainFunctor, done));
