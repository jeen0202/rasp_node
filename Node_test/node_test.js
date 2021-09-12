let start = new Date();
let isStop = false;

const testLoop = _ => {
    let now = new Date();
    let runtime = (now-start);
    if(runtime >=10000 && runtime <= 11000){
        isStop = true;
    }       
    if(!isStop) {
        console.clear();
        console.log("now in Loop\ntime:"+runtime);
    }
    else{
        //interrupt 실행부
        // stopLoop;       
        // intervalCheckout;
    }
    
}
const intervalLoop = setInterval(testLoop,1000);
const stopLoop = _=> clearInterval(intervalLoop);

const checkout = (stopTime) => {
    let now = new Date();
    if(now-stopTime >=5000 && now-stopTime <=6000){
        isStop = false;
        start = now;
        stopCheckout;
        intervalLoop; 
    }else{
        console.clear();
        console.log("now interrupted...")
    }
}

const intervalCheckout = setInterval(checkout,1000);
const stopCheckout = _=> clearInterval(intervalCheckout);

intervalLoop;