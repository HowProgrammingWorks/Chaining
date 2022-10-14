'use strict';

const benchmark = require('./c-benchmark.js');
const chainPromise = require('./6-promise.js');
const test = require('./a-test.js');

benchmark.do(40000, 'Promise', (done) => test(chainPromise, done));
