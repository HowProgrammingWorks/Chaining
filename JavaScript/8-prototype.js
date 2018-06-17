'use strict';

const async = op => {
  switch (op) {
    case 'map': return api.metasync.map;
    case 'filter': return api.metasync.filter;
    case 'reduce': return api.metasync.reduce;
    case 'each': return api.metasync.each;
    case 'series': return api.metasync.series;
    case 'find': return api.metasync.find;
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
      return this.execute();
    } else {
      return this.execute(err);
    }
  }
  if (!item.op) return;
  if (item.op === 'then') {
    item.fn(this.array);
    return this.execute();
  }
  const op = async(item.op);
  if (!op) return this.execute();
  op(this.array, item.fn, (err, data) => {
    if (err) return this.execute(err);
    this.array = data;
    this.execute();
  });
};

ArrayChain.prototype.then = function(fn) {
  this.chain.push({ op: 'then', fn });
  return this;
};

ArrayChain.prototype.catch = function(fn) {
  this.chain.push({ op: 'catch', fn });
  return this;
};

ArrayChain.prototype.fetch = function(fn) {
  this.chain.push({ op: 'then', fn: res => fn(null, res) });
  this.chain.push({ op: 'catch', fn });
  this.execute();
  return this;
};

ArrayChain.prototype.map = function(fn) {
  this.chain.push({ op: 'map', fn });
  return this;
};

ArrayChain.prototype.filter = function(fn) {
  this.chain.push({ op: 'filter', fn });
  return this;
};

ArrayChain.prototype.reduce = function(fn) {
  this.chain.push({ op: 'reduce', fn });
  return this;
};

ArrayChain.prototype.each = function(fn) {
  this.chain.push({ op: 'each', fn });
  return this;
};

ArrayChain.prototype.series = function(fn) {
  this.chain.push({ op: 'series', fn });
  return this;
};

ArrayChain.prototype.find = function(fn) {
  this.chain.push({ op: 'find', fn });
  return this;
};

module.exports = {
  for: array => new ArrayChain(array)
};
