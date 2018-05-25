class VmController {
  constructor(vendingMachine,wallet,vendingMachineView){
    this.vendingMachine = vendingMachine;
    this.wallet = wallet;
    this.vendingMachineView = vendingMachineView;
  }
  on(eventName, data){
    this[eventName](data)
  }
  useMoney(data){
    this.wallet.useMoney(data)
    this.insertMoney(data)
  }
  reRenderWallet(data){
    this.vendingMachineView.reRenderWallet(data);
  }
  insertMoney(data){
    this.vendingMachine.insertMoney(data);
  }
  reRenderVendingMachineMoney(money){
    this.vendingMachineView.reRenderVendingMachineMoney(money);
  }
  displayCanBuyList(money){
    this.vendingMachineView.displayCanBuyList(money);
  }
  reRenderLog(latestHistorys){
    this.vendingMachineView.reRenderLog(latestHistorys);
  }
  handleSelectNumberButtonClicked(buttonText){
    this.clearAutoClear();
    this.vendingMachine.handleSelectNumberButtonClicked(buttonText)
  }
  displaySelectedButtonNumber(selectedText){
    this.vendingMachineView.displaySelectedButtonNumber(selectedText)
  }
  startTimer(time){
    this.vendingMachineView.startTimer(time);
  }
  updateTimerInfo(intervalId){
    this.vendingMachine.updateTimerInfo(intervalId)
  }
  selectSnack(){
    this.vendingMachine.selectSnack()
    this.vendingMachineView.setNumberButtonState(false);
  }
  sendSelectedSnack(selectedOne){
    this.vendingMachineView.updateLogView(selectedOne,'displaySelectedOne')
  }
  notifyCanNotBuy(money){
    this.vendingMachineView.updateLogView(money,'notifyCanNotBuy')
  }
  handleCancelButtonClicked(){
    this.clearAutoClear();
    this.clearSelectedInfo();
    this.vendingMachineView.handleCancelButtonClicked();
  }
  updateCanBuyList(money){
    this.vendingMachineView.updateCanBuyList(money)
  }
  notifyChoseWrongNumber(wrongNumber){
    this.vendingMachineView.updateLogView(wrongNumber,'notifyChoseWrongNumber')
  }
  notifyBreakdown(breakId){
    this.vendingMachineView.updateLogView(breakId,'notifyBreakdown')
  }
  blockOverRange(){
    this.vendingMachineView.setNumberButtonState(true)
    this.vendingMachineView.notifyNumberButtonBlocked()
  }
  sendAutoClearId(autoClearId){
    this.vendingMachine.getAutoClearId(autoClearId)
  }
  clearSelectedInfo(){
    this.vendingMachine.clearSelectedInfo();
  }
  clearAutoClear(){
    this.vendingMachine.clearAutoClear();
  }
}