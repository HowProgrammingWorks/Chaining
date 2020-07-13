'use strict';

const benchmark = require('./c-benchmark');
const chainPrototype = require('./9-build');
const test = require('./a-test');

benchmark.do(40000, 'ProtoBuild', done => test(chainPrototype, done));
