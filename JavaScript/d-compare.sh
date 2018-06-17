#!/bin/sh

node --nouse-idle-notification --noconcurrent_sweeping --noconcurrent_recompilation --predictable d-promise.js
node --nouse-idle-notification --noconcurrent_sweeping --noconcurrent_recompilation --predictable d-functor.js
node --nouse-idle-notification --noconcurrent_sweeping --noconcurrent_recompilation --predictable d-prototype.js
node --nouse-idle-notification --noconcurrent_sweeping --noconcurrent_recompilation --predictable d-build.js
