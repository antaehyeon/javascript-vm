### 시나리오 작성 


1. 돈을 쓴다 
- 돈 종류 갯수가 줄어든다. [O]
- 최종 돈을 쓴만큼 줄인다. [O]

2. 돈이 벤딩머신에 들어간다. 
- 벤딩머신에 투입된 돈이 나오고 
- 살 수 있는 목록이 나온다. 


->
뷰
data-money를  Model에 보내준다.
data-count의 갯수를 업데이트 한다. 
data-money만큼 totalMoney를 줄여준다.

Model 

walletMode이 돈 사용한 돈을 받아서 update하고 [O]
vendingMachine insertMoney를 호출한다.  [O]

insertMoney 
1. vendingMachine insertMoney만큼 돈이 저장된다. [O]
2. vendingMachineView의  입력된 돈 만큼 뷰를 업데이트 한다. -> 뷰 업데이트 메소드를 호출한다. [O]
3. vendingMachine 의 살 수 있는 목록을 확인하는 뷰의 displayCanBuyList의 메소드를  호출한다. [O]
4. insertMoney 횟수만큼 기록을 한다 [O]

순서데로 테스트 코드 진행 

### 뷰를 나눌 필요성 
나눠져서 각각해당되는 부분만 관리 하는 것이 더 깔끔해보인다. Why not 모델도 나눠져 있어서 더 흐름 보기 용이 
-> vendingMachineView / WalletView

### 뷰 테스트

* WalletView Test
1. 머니버튼이 클릭되면 머니버튼 메소드가 불린다. [O]
2. 머니메소드에서는 evt.target에 data-count 와 data-money를 가지고 와서 뷰를 업데이트한다. [O]
3.  머니메소드에서는 컨트롤러에 useMoney 메소드와 useMoney에 필요한 data-money -> money를 param으로 넘긴다. [O]

* VendingMachineView Test

0. 돈이 투입된 받은 돈 만큼 insertMoney를 표시한다. [O]
1. 입력된 돈에 살 수 있는 리스트를 하이라이트 시켜준다. [O]
2. 상품 선택시 상황에 맞는 테스트 [...ing]


// 너무 많은 테스트가 남아 있어서 시나리오 중에 굵직한 몇 가지 테스트들을 하고 
// 안 해본 비동기 테스트를 하고 넘어가도록 하겠습니다.

2.0 넘버 번호 선택시 

선택 버튼이 클릭되면 타이머가 실행된다. [O]
누적된 버튼텍스트를 최근 두자리까지만 저장하고 그 번호를 출력한다. [O] mock으로 대체 dom메소드를 부르지 못해서 
timer가 0이 되면 timer를 종료되고 자동선택 메소드가 불리는지 테스트. [O]

비동기 test 
callback함수들을 지정할 수 있게 메소드화 시켜야 test가능하다 ! 


선택 한 후에 timer가 종료되면 잔돈을 반환하는 메소드를 호출한다. 
2.1 상품 선택시 범위 없는 번호가 선택 된 경우 []
-> 선택할 수 없는 번호입니다 메시지 출력 
기존에 짠 코드에서 numberText를 왜 가지고 있어야 되는지 의문 마지막만 보내주게 수정 하기 
선택 이전에 -> 넘버 번호 선택을 다뤄야 된다.
2.2 범위에 맞는 번호가 선택된 경우 
지금 금액으로 살 수 있는 경우 
2.2.1 현재 금액을 상품 가격만큼 내린다 
2.2.2 상품 이름을 displayLog에 출력한다.

지금 금액으로 살 수 없는 경우 
2.2.3 살 수 없는 상품이다라는 메시지 출력 

2.4 
넘버 번호 선택시 
1. 타이머가 5초가 시작되는지
2. 5초가 지나면 선택 되었다는 메소드가 불리는지 
3. 시간이 가는 중에 번호를 입력하면 초가 다시 reset된다.




Q&A

1. 어떻게???  리팩토링하면서 질문 Dom이 로드되기 전에 어떻게 gs로 찾을 수 있었던 건지

해결해야 될 부분 

상품 선택 번호를 누르다가 -> 돈을 투입했을 때 타이머를 다시 시작시킨다. 


### 2차 리뷰 반영 하기 

1. utilTest Test Description  fix [O]  -> 나중에 util도 이름 제대로 다 써주는 방향으로 
or `$ on @ 등등 특수 기호로 특징을 반영(아주 자주쓰는 기능)`

2. walletViewTest Description fix [O]
+ 변수에 따로 저장하기 가독성 initTotalMoney-money
+ setTimeOut으로 수정 


3. 뷰에 실제 돈이 적혔는지와 같이 최종적인 변화에 대한 테스트가 더 의미있지 않을까요?
구체적인 테스트로 대체 모델이 바뀐 다음 변화를 체크하는 부분까지 ! [O]


4.