'use strict';

module.exports = (chaining, done) => {

  let count = 0;
  const next = () => (++count === 3 && done ? done() : 0);

  chaining
    .for([1, 2, 3, 4])
    .filter(item => item % 2 === 0)
    .map(item => item * 2)
    .reduce((a, b) => a + b)
    .fetch((err, result) => {
      if (err) throw err;
      if (!done) console.dir(result);
      next();
    });

  chaining
    .for([1, 2, 3, 4])
    .filter((item, cb) => cb(null, item % 2 === 0))
    .map((item, cb) => cb(null, item * 2))
    .reduce((a, b, cb) => cb(null, a + b))
    .fetch((err, result) => {
      if (err) throw err;
      if (!done) console.dir(result);
      next();
    });

  chaining
    .for([1, 2, 3, 4])
    .filter((item, cb) => process.nextTick(cb, null, item % 2 === 0))
    .map((item, cb) => process.nextTick(cb, null, item * 2))
    .reduce((a, b, cb) => process.nextTick(cb, null, a + b))
    .fetch((err, result) => {
      if (err) throw err;
      if (!done) console.dir(result);
      next();
    });

  chaining
    .for([1, 2, 3, 4])
    .map((item, cb) => cb(new Error('Something happened')))
    .fetch((err, result) => {
      if (!done) {
        if (err) console.log(err.message);
        else console.dir(result);
      }
      next();
    });

};
