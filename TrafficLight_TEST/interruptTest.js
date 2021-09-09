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

const tLight = (startTime) => {
        let now = new Date();        
        let runningTime = (now-startTime)%17100;
        if(btn.readSync()==Gpio.HIGH){
            process.emit('InterruptTest','test')
            }
        if (runningTime >= 100 && runningTime<= 110){
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
}

const runTraffic = _=>{
    let start = new Date();
    const intervalTraffic = setInterval(tLight,10,start);
    intervalTraffic;

}
process.on('SIGINT', () => {
    offAll()
    process.exit()
})
process.on('InterruptTest', (arg) => {
    offAll();
    //intervalTraffic.unref(); 이부분에서 interval을 끊었다가 재실행
    console.log('Button Pressed '+arg)
    process.exit();
})
offAll();
//tLight()
runTraffic();