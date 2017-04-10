'use strict';

global.api = {
  metasync: require('metasync')
};

const benchmark = require('./6-benchmark');
const chainPrototype = require('./3-prototype');
const test = require('./4-test');
benchmark.do(40000, 'ProtoBuild', (done) => test(chainPrototype, done));
