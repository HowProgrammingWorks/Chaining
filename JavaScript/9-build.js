'use strict';

const metasync = require('metasync');

const async = (op) => {
  switch (op) {
  case 'map': return metasync.map;
  case 'filter': return metasync.filter;
  case 'reduce': return metasync.reduce;
  case 'each': return metasync.each;
  case 'series': return metasync.series;
  case 'find': return metasync.find;
  default: return null;
  }
};

function ArrayChain(array) {
  this.array = array;
  this.chain = [];
}

ArrayChain.prototype.execute = function(err) {
  const item = this.chain.shift() || {};
  if (err) {
    if (!item.op) throw err;
    if (item.op === 'catch') {
      item.fn(err);
      return void this.execute();
    } else {
      return void this.execute(err);
    }
  }
  if (!item.op) return;
  if (item.op === 'then') {
    item.fn(this.array);
    return void this.execute();
  }
  const op = async(item.op);
  if (!op) return void this.execute();
  op(this.array, item.fn, (err, data) => {
    if (err) return void this.execute(err);
    this.array = data;
    this.execute();
  });
};

['then', 'catch', 'map', 'filter', 'reduce', 'each', 'series', 'find']
  .map((op) => {
    ArrayChain.prototype[op] = function(fn) {
      this.chain.push({ op, fn });
      return this;
    };
  });

ArrayChain.prototype.fetch = function(fn) {
  this.chain.push({ op: 'then', fn: (res) => fn(null, res) });
  this.chain.push({ op: 'catch', fn });
  this.execute();
  return this;
};

module.exports = {
  for: (array) => new ArrayChain(array)
};
