'use strict';

let start = new Date();
let stopTime;
let isStop = false;

const testLoop = _ => {   
    let now = new Date(); 
    if(!isStop) {
        //Loop 실행부         
        loop(now);
    }else{
        //Interrupt 실행부              
        checkout(stopTime);
    }
    
}

const loop = (now) => {    
    let runtime = (now-start);
    if(runtime >=10000 && runtime <= 11000){
        isStop = true;
        stopTime = now;
        //stopLoop();
        //testLoop();
    }else{
        console.log('now Loop \n time : ', runtime)
    }
}

const checkout = (stopTime) => {
    let now = new Date();
    let runtime = now-stopTime;
    if(runtime >=5000 && runtime <=6000){
        isStop = false;
        start = now;
        //stopCheckout();
        //testLoop();
    }else{                   
        console.log("now interrupted...\n runtime : ",runtime);
    }
}
//const intervalLoop = setInterval(testLoop,1000);
const stopLoop = _=> clearInterval(intervalLoop);



//const intervalCheckout = setInterval(checkout,500,(new Date()));
const stopCheckout = _=> clearInterval(intervalCheckout);

setInterval(testLoop, 1000);