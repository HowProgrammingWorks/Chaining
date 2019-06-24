'use strict';

class ArrayChain {
  constructor(array) {
    this._promise = Promise.resolve(array);
  }

  then(fn) {
    return this._promise.then(fn);
  }

  catch(fn) {
    return this._promise.catch(fn);
  }

  fetch(fn) {
    return (this
      .then(data => fn(null, data))
      .catch(err => fn(err))
    );
  }

  _chain(performer, fn, initial) {
    this._promise = this._promise.then(array => (
      new Promise((resolve, reject) => (
        performer(array, fn, (err, result) => (
          (err ? reject(err) : resolve(result))
        ), initial)
      ))
    ));
  }

  map(fn) {
    this._chain(api.metasync.map, fn);
    return this;
  }

  filter(fn) {
    this._chain(api.metasync.filter, fn);
    return this;
  }

  reduce(fn, initial) {
    this._chain(api.metasync.reduce, fn, initial);
    return this;
  }

  each(fn) {
    this._chain(api.metasync.each, fn);
    return this;
  }

  series(fn) {
    this._chain(api.metasync.series, fn);
    return this;
  }

  find(fn) {
    this._chain(api.metasync.find, fn);
    return this;
  }
}

module.exports = {
  for: array => new ArrayChain(array)
};
