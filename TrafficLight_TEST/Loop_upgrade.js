'use strict';

//라즈베리파이 구동을 위한 변수 지정
const Gpio = require('onoff').Gpio;

const green = new Gpio(19,'out');
const yellow = new Gpio(20,'out');
const red = new Gpio(21,'out');


let high = Gpio.HIGH;
let low = Gpio.LOW;

const btn = new Gpio(16, 'in', 'rising',{debounceTimeout:10});

//Loop 동작을 위한 global 변수
let start = new Date();
let stopTime;
let isStop = false;

//GPIO 초기화
const offAll = _=>{
    red.writeSync(low);
    yellow.writeSync(low);
    green.writeSync(low);
}
//loop 본문
const loop = (now) => {    
    let runtime = (now-start);
    if(btn.readSync()==Gpio.HIGH){
        isStop = true;    
        stopTime = now;
        offAll();                     
    }
    !isStop?traffic(runtime):checkout();       
}
//interval 설정
const testLoop = _ => {   
    let now = new Date(); 
    !isStop?loop(now):checkout(stopTime);   
}
//기본 loop 조건문
const traffic = runtime =>{
    console.clear();
    (runtime >= 200 && runtime <=300)?
    loop1():
    (runtime>=5000 && runtime<=5100)?
    loop2():
    (runtime >= 15000 && runtime <= 15100)?
    loop3():
    runtime >=16000?
    start=new Date():
    console.log(`runtime ${runtime}`); 
}
//interrupt 조건문
const checkout = (stopTime) => {
    let now = new Date();
    let runtime = now-stopTime;
    (runtime >=5000 && runtime <=5100)?
    returntoLoop(now):
    blink(runtime);
}

//interrupt 본문
const blink = (runtime)=>{
    console.clear();
    runtime%500<=50?
    yellow.writeSync(yellow.readSync()^1):    
    console.log(`checkout : ${runtime}`);
}

// 조건에 따른 실행문 구분
const loop1 = _ =>{
    yellow.writeSync(low);
    red.writeSync(high);
}
const loop2 = _ =>{
    red.writeSync(low);
    yellow.writeSync(low);
    green.writeSync(high);
}
const loop3 = _ =>{
    green.writeSync(low);
    yellow.writeSync(high);
}

//interrupt 종료문
const returntoLoop = (now)=>{
    isStop = false;
    start = now;
}
//소멸자
process.on('SIGINT', () => {
    offAll()
    process.exit()
})

offAll();
setInterval(testLoop, 100);