'use strict';

const Gpio = require('onoff').Gpio;

let state=-1;
let led = [
    new Gpio(19,'out'),
    new Gpio(20,'out'),
    new Gpio(21,'out')
]

const btn = new Gpio(16, 'in', 'rising',{debounceTimeout:10});

btn.watch((err,value)=>{
    if(err){
        throw err;
    }

    console.log(state);
    if(state !==-1){
        led[state].writeSync(0);     
        state == 2 ? state=0:state++;
        led[state].writeSync(1);
    }else
        ++state;
});

process.on('SIGINT',_ =>{
    led.forEach(element => {
       element.unexport();
       btn.unexport();
    });
})