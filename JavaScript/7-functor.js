'use strict';

global.api = {
  metasync: require('metasync')
};

const benchmark = require('./6-benchmark');
const chainFunctor = require('./2-functor');
const test = require('./4-test');
benchmark.do(10000, 'Functor', () => test(chainFunctor));
