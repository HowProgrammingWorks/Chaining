'use strict';

const metasync = require('metasync');

const arrayChain = (array, prev = null) => {
  let next = null, done = null, fail = null;

  const self = (err, data) => {
    array = data;
    if (next) next();
    if (err) {
      if (fail) fail(err);
    } else if (done) {
      done(data);
    }
  };

  if (!prev) process.nextTick(() => self(null, array));

  self.then = (fn) => (done = fn, self);
  self.catch = (fn) => (fail = fn, self);
  self.fetch = (fn) => (self
    .then((data) => fn(null, data))
    .catch((err) => fn(err))
  );

  const chain = (performer) => (fn, initial) => {
    const res = arrayChain(null, self);
    next = () => performer(array, fn, res, initial);
    return res;
  };

  self.map = chain(metasync.map);
  self.filter = chain(metasync.filter);
  self.reduce = chain(metasync.reduce);
  self.each = chain(metasync.each);
  self.series = chain(metasync.series);
  self.find = chain(metasync.find);

  return self;
};

module.exports = {
  for: arrayChain
};
