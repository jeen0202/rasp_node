# rasp_node

## 'onoff' 패키지를 사용한 GPIO 제어

### GPIO 제어를 위한 Package 호출
```js
const Gpio = require('onoff').Gpio;
```
### GPIO pinmode 설정
```js
const 제어할센서 = new Gpio(핀번호, '모드(in,out),'both')
// 세번쨰 인자 'both' 상승/하락 인터럽트 에지 설정
```
