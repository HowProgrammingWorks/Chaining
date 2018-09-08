'use strict';

global.api = {
  metasync: require('metasync')
};

const benchmark = require('./c-benchmark');
const chainPrototype = require('./8-prototype');
const test = require('./a-test');
benchmark.do(40000, 'Prototype', done => test(chainPrototype, done));
