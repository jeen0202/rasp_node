'use strict';

const Gpio = require('onoff').Gpio;

const green = new Gpio(19,'out');
const yellow = new Gpio(20,'out');
const red = new Gpio(21,'out');


let high = Gpio.HIGH;
let low = Gpio.LOW;
const btn = new Gpio(16, 'in', 'rising',{debounceTimeout:10});

const sleep = (time) => {
    return new Promise((resolve)=>{
        setTimeout(resolve,time)
    })
}

const offAll = _=>{
    red.writeSync(low);
    yellow.writeSync(low);
    green.writeSync(low);
}

const tLight = async () => {
    while(true) {
        red.writeSync(high);
        await sleep(5000);

        //yellow.writeSync(high);
        //await sleep(1000);

        red.writeSync(low);
        yellow.writeSync(low);
        green.writeSync(high);
        await sleep(10000);

        green.writeSync(low);
        yellow.writeSync(high);
        await sleep(2000);

        yellow.writeSync(low);
    }
}

process.on('SIGINT', () => {
    offAll()
    process.exit()
})

offAll()
tLight()