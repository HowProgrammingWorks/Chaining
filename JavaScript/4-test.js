'use strict';

module.exports = (chaining) => {

  chaining
  .for([1, 2, 3, 4])
  .filter((item, cb) => cb(null, item % 2 === 0))
  .map((item, cb) => cb(null, item * 2))
  .reduce((a, b, cb) => cb(null, a + b))
  .fetch((err, result) => {
    if (err) throw err;
    console.dir(result);
  });

  chaining
  .for([1, 2, 3, 4])
  .filter((item, cb) => process.nextTick(cb, null, item % 2 === 0))
  .map((item, cb) => process.nextTick(cb, null, item * 2))
  .reduce((a, b, cb) => process.nextTick(cb, null, a + b))
  .fetch((err, result) => {
    if (err) throw err;
    console.dir(result);
  });

  chaining
  .for([1, 2, 3, 4])
  .map((item, cb) => cb(new Error('Something happened')))
  .fetch((err, result) => {
    if (err) console.log(err.message);
    else console.dir(result);
  });

};
