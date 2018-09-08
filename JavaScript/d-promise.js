'use strict';

global.api = {
  metasync: require('metasync')
};

const benchmark = require('./c-benchmark');
const chainPromise = require('./6-promise');
const test = require('./a-test');
benchmark.do(40000, 'Promise', done => test(chainPromise, done));
