'use strict';

const benchmark = require('./c-benchmark.js');
const chainPrototype = require('./9-build.js');
const test = require('./a-test.js');

benchmark.do(40000, 'ProtoBuild', (done) => test(chainPrototype, done));
