import { VendingMachineModel } from'../js/models.js';
import {snackList} from'../js/assets';


// 전체를 다 하면 좋지만 주요메소드 위주로만 우선 테스트-> 시간 대비 학습효과!
// 1. insertMoney 
// 2. selectSnak 
// 3. useMoney 

describe('VendingMachineModel Test', () => {
  let vendingMachineModel;
  beforeEach(()=>{
    vendingMachineModel = new VendingMachineModel(snackList)
    vendingMachineModel.controller = {}
    vendingMachineModel.money = 0; 
    vendingMachineModel.controller.on = (evtName, data)=> {evtName, data} 
  })
  test('insertMoney Test 입력한 돈 만큼 돈이 들어오는지 테스트', () => {
    //given
    const inputMoney = 1000;
    const initialMoney = vendingMachineModel.money
    //when
    vendingMachineModel.insertMoney(inputMoney)
    //then
    console.log(vendingMachineModel.money)
    expect(vendingMachineModel.money).toBe(inputMoney+initialMoney)
    });
    test('insertMoney를 3번 했을 때 logInsert가 잘 기록되는지 테스트', () => {
      //given
      const inputMoneyList = [1000, 500, 100];
      const initialMoney = vendingMachineModel.money
      //when
      vendingMachineModel.insertMoney(inputMoneyList[0])
      vendingMachineModel.insertMoney(inputMoneyList[1])
      vendingMachineModel.insertMoney(inputMoneyList[2])
      //then
      console.log(vendingMachineModel.logHistoryList)
      // length만 test
      // ...
      expect(vendingMachineModel.logHistoryList.length).toBe(3)
      });
  test('select Snack Test', () => {
    // 1. 유효 번호 선택경우 살 수 있는 경우 테스트 
    
    //given
    vendingMachineModel.selectedText = '1';
    const inputMoney = 10000;
    vendingMachineModel.insertMoney(inputMoney);

    const selectedOne = vendingMachineModel.snackList.find(snack=>snack.id===Number(vendingMachineModel.selectedText))
    vendingMachineModel.emit = jest.fn();
    //when 
    
    vendingMachineModel.selectSnack()
    expect(vendingMachineModel.money).toBe(inputMoney-selectedOne.price)
    expect(vendingMachineModel.emit).toHaveBeenCalled()
    const updateLogdata = {...selectedOne, logType:'displaySelectedOne'}
    expect(vendingMachineModel.emit).toHaveBeenCalledWith('updateLogView',updateLogdata)
    });
});


