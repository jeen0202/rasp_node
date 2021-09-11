# 09/11 SourceCode 정리
  ## 기본 기능 정의
  1. Rpi사용하여 GPIO 제어
  2. 주기적으로 신호제어
  3. 인터럽트 발생시 기본동작 중지
  4. 인터럽트 종료시 기본동작 재실행
  ## 세부 구현 로그
  ### GPIO제어
   => 향후 반응형웹과의 연동성을 위해 node.js의 onoff 패키지사용하여 RPI에서 GPIO 제어 
  ### 주기적인 신호제어
  => while 반복문을 사용하여 기본 loop 동작 구현<br/>
  => node.js의 setInterval을 사용하여 interrupt에 대비<br/>
  ### Interrupt 발생과 기존 Loop 중지
  => 상태 flag와 condition을 사용하여 코드 실행 제어<br/>
  ### 인터럽트 종료시 기본동작 재실행
  => 상태 flag를 사용하여 전역변수를 제어하여 재실행<br/>
