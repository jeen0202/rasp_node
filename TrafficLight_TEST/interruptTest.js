'use strict';

const Gpio = require('onoff').Gpio;

const green = new Gpio(19,'out');
const yellow = new Gpio(20,'out');
const red = new Gpio(21,'out');


let high = Gpio.HIGH;
let low = Gpio.LOW;

const btn = new Gpio(16, 'in', 'rising',{debounceTimeout:10});

let isStop = false;
let isPushed = false;
let start = new Date();

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

const tLight = _ => {
        let now = new Date();
        let runningTime = (now-start)%17100;         
        if(!isStop){         
            console.log(runningTime);                    
            if(btn.readSync()==Gpio.HIGH){
                isStop = true;                         
                }
            else if (runningTime >= 100 && runningTime<= 110){
                yellow.writeSync(low);
                red.writeSync(high);
            }
            else if(runningTime >= 5000 && runningTime <= 5010){
                red.writeSync(low);
                yellow.writeSync(low);
                green.writeSync(high);
            }    
            else if(runningTime >= 15000 && runningTime <= 15010){
            green.writeSync(low);
            yellow.writeSync(high);
            }
        }else{
            if(isPushed == false){    
            offAll();
            yellow.writeSync(high); //실행시킬 함수부           
            setTimeout(_=>{                
                yellow.writeSync(low);
                red.writeSync(high);
                start = new Date();
                isStop = false;
                isPushed = false;
                },5000)
                isPushed = true;
            }
        }
}

const runTraffic = setInterval(tLight,10,start);

const bLight  = _=>{    
    offAll();
}

process.on('SIGINT', () => {
    offAll()
    process.exit()
})



offAll();
runTraffic;
