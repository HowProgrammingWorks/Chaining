'use strict';

const benchmark = require('./c-benchmark.js');
const chainPrototype = require('./8-prototype.js');
const test = require('./a-test.js');

benchmark.do(40000, 'Prototype', (done) => test(chainPrototype, done));
