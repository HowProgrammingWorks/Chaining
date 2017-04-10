#!/bin/sh

node --nouse-idle-notification --noconcurrent_sweeping --noconcurrent_recompilation --predictable 7-promise.js
node --nouse-idle-notification --noconcurrent_sweeping --noconcurrent_recompilation --predictable 7-functor.js
node --nouse-idle-notification --noconcurrent_sweeping --noconcurrent_recompilation --predictable 7-prototype.js
node --nouse-idle-notification --noconcurrent_sweeping --noconcurrent_recompilation --predictable 7-prototype-build.js
