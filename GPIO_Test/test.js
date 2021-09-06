'use strict';

const Gpio = require('onoff').Gpio; // import GPIO
const led = new Gpio(21,'out'); // set GPIO 21 as Output

//Toggle the state of the LED connected to GPIO21 every 200ms
const iv = setInterval(_=>led.writeSync(led.readSync()^1),200);

setTimeout(_=>{
    clearInterval(iv);
    led.unexport();
},5000)