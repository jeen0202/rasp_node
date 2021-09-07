'use strict';

const Gpio = require('onoff').Gpio;

let led = [
    new Gpio(19,'out'),
    new Gpio(20,'out'),
    new Gpio(21,'out')
]
let OnInterval =[20000,10000,13000];
let OffInterval =[10000,3000,7000]
const LightOn = ( index) => {
    setTimeout(()=>led[index].writeSync(Gpio.HIGH),OnInterval[index]);
    switch(index){    
    case 0:        
        console.log('Green Light On!');        
        break; 
    case 1:
        console.log('Yellow Light On!');
        break;
    case 2:
        console.log('Red Light On!');
        break;       
    }
    setTimeout(()=>led[index].writeSync(Gpio.Low),OffInterval[index]);        
}

for(let i=0;i<led.length;i++){
   LightOn(i)
}
