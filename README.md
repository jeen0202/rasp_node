# rasp_node

## 'onoff' 패키지를 사용한 GPIO 제어

### GPIO 제어를 위한 Package 호출
```js
const Gpio = require('onoff').Gpio;
```
### GPIO pinmode 설정
```js
const 제어할센서 = new Gpio(핀번호, direction(in,out),edge(rising,both,falling,both,[option])
const btn = new Gpio(16, in, rising, {debounceTimeout:10});
// 세번쨰 인자 'both' 상승/하락 인터럽트 에지 설정
```
### Signal R/W
**읽기**
```js
Gpio.read([callback]) => GPIO value 비동기식 읽기
Gpio.readSync() => GPIO Value 동기식 읽기
```
**쓰기**
```js
Gpio.write(value[,callback]) => GPIO Value 비동기식 쓰기
Gpio.writeSync(value) => GPIO Value 동기식 쓰기
```
**인터럽트 탐지**
```js
Gpio.watch(value[,callback]) => hardware interrupt 탐지
Gpio.unwatch([callback]) => interrupt 탐지 중단
Gpio.unwatchAll() - 모든 interrupt 탐지 중단
```
**할당해제**
```js
Gpio.unexport() => 할당되어있던 Gpio 해제
```


