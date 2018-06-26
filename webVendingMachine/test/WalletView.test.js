import {WalletView} from '../js/WalletView.js';
import {getEl} from '../js/utils';


describe('walletView Test', () => {
  let walletView;
  beforeEach(()=>{
    const testTemplate = 
    `
    <input class="select-input" type="text" placeholder="choose your snack">
    <ul class="number-buttons">
      <li>
          <button class="select-button">1</button>
      </li>
      <li>
          <button class="select-button">선택</button>
      </li>
      <li>
          <button class="select-button">취소</button>
      </li>    
    </ul>
    <ul class="money-button-list">
          <li class="wallet-money-button">
            <button class="money-button" data-money="1000" data-unit="원">1000 원</button>
            <span class="money-count" data-count="5">5개</span>
          </li>
      </ul>
      <div class="total-my-assets">
      <p>
          <span class="money">3000</span><span class="unit">원</span>
      </p>
      </div>
    `
    document.body.innerHTML = testTemplate.trim()
    walletView = new WalletView()
    // console.log('test',gs('.money-button-list') === vendingMachineView.moneyButtonListEl)
    walletView.bindEvent();
    walletView.controller = {}
    walletView.controller.on = (evtName, data)=> {evtName, data} 
  })
  test('moneyButton이 클릭되었을 떄 handleMoneyButtonClicked 메소드가 불린다.', () => {
    // 이벤트 캡쳐링 ?.? 어떻게 해야 될지 
    // 머니 버튼이 클릭되었을 때 이벤트 메소드가 불리는지 테스트?
    
    //given
    walletView.handleMoneyButtonClicked = jest.fn();
    const evt = new Event('click');
    //when
    walletView.moneyButtonListEl.dispatchEvent(evt)

    // 버튼에 바로 dispatch하는 것으로는 바인딩 이벤트를 인식 못해서 나서 2번쨰 방법으로 접근했습니다.
    // gs('.money-button').dispatchEvent(evt)

    //then
    expect(walletView.handleMoneyButtonClicked).toHaveBeenCalled()
   });

  test('머니메소드에서는 evt.target에 data-count 와 data-money를 가지고 와서 업데이트 하는지 test', () => {
  
    //given
    walletView.emit = jest.fn();
    const evtMock = {}
    evtMock.target = getEl('.money-button')
    const moneyCountEl = getEl('.money-count')
    const initCount = Number(moneyCountEl.dataset.count)
    const money = Number(evtMock.target.dataset.money)
    //when
    // 모델에서 가지고 오도록 테스트 
    const initTotalMoney = Number(walletView.myTotalMoneyEl.innerText)
    walletView.handleMoneyButtonClicked(evtMock)    
    const changedMoney = initTotalMoney-money   
    //then
    expect(Number(walletView.myTotalMoneyEl.innerText)).toBe(changedMoney)
    expect(Number(moneyCountEl.dataset.count)).toBe(initCount-1)
   });  

  test('handleMoneyButtonClicked되고 해당 MoneyBtn data-money와 함께  useMoney 메소드를 emit한다', () => {
    
    //given
    walletView.emit = jest.fn();
    const evtMock = {}
    evtMock.target = getEl('.money-button')
    const mockMoney = 1000
    console.dir(evtMock)
    //when
    walletView.handleMoneyButtonClicked(evtMock)       
    //then
    expect(walletView.emit).toHaveBeenCalledWith('useMoney', mockMoney)
    });

 
});
