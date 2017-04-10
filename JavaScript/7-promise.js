'use strict';

global.api = {
  metasync: require('metasync')
};

const benchmark = require('./6-benchmark');
const chainPromise = require('./1-promise');
const test = require('./4-test');
benchmark.do(20000, 'Promise', (done) => test(chainPromise, done));
