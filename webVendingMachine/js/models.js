// class SnackList {
//   constructor(snackList){
//     this.snackList = snackList;
//   }
//   add(snack){
//     this.snackList = [...this.snackList, snack]
//   }
// }

// class Account {
//   constructor(money){
//     this.money = money
//   }
//   addMoney(kind){
//     if(this.money[kind]===undefined) this.money[kind] = 1
//     this.money[kind]+=1
//   }
// }


function WalletModel(myMoney) {
    this.myMoney=myMoney;
    this.controller = null;
    this.totalMoney = Object.keys(this.myMoney).reduce((ac,money)=> {
      return ac+=Number(money)*this.myMoney[money]
    },0)
}
WalletModel.prototype = {
  getTotalMoney(){
    return this.totalMoney = Object.keys(this.myMoney).reduce((ac,money)=> {
      return ac+=Number(money)*this.myMoney[money]
    },0)
  },
  useMoney(money){
    if(this.myMoney[money]){
      this.myMoney[money]-=1;
      this.sendUseMoneyInfo(money)  
      return Number(money)
    }
  },
  sendUseMoneyInfo(money){
    const useMoneyInfo = {
      totalMoney: this.getTotalMoney(),
      moneyCount: this.myMoney[money],
    }
    this.emit('reRenderWallet', useMoneyInfo)
  },
  emit(eventName, data){
    this.controller.on(eventName, data);
  }
}


function VendingMachineModel(snackList){
    this.selectedText = '';
    this.money = 0;
    this.snackList= snackList
    this.controller = null;
    this.logHistoryList = [];
    this.timerId = null;
    this.autoClearId = null;
}

VendingMachineModel.prototype = {
  insertMoney(data){
    this.money += Number(data.money);
    this.logInsert('insertMoney', data.money);
    this.emit('displayCanBuyList', this.money);
    this.emit('reRenderVendingMachineMoney', this.money)
  },
  logInsert(type, data){
    const logData = {type, data};
    this.savelogHistory(logData);
    const latestHistorys = this.logHistoryList.slice(-3);
    this.emit('reRenderLog',latestHistorys)
  },
  handleSelectNumberButtonClicked(selectedText){
    this.selectedText += selectedText
    this.selectedText = this.selectedText.slice(-2)
    this.emit('displaySelectedButtonNumber', this.selectedText)
    this.emit('startTimer',5)
  },
  updatedSelectedText(selectedText){
    return this.selectedText += selectedText
  },
  clearSelectedInfo(){
    this.selectedText = "";
    clearTimeout(this.timerId);
    this.timerId = null;
  },
  savelogHistory(logData){
    this.logHistoryList = [...this.logHistoryList, logData];
  },
  updateTimerInfo(intervalId){
    clearTimeout(this.timerId);
    this.timerId = intervalId;
  },
  getSnackId(selectedSnackId){
    this.selectedText = selectedSnackId;
    this.selectSnack()
  },
  selectSnack(){
    if(this.selectedText==="") return this.emit('updateLogView',{logType: 'notifyNoneSelect'})
    const snackId = Number(this.selectedText)
    const selectedOne = this.snackList.find(snack=>snack.id===snackId);
    this.clearSelectedInfo();    
    return this.checkValidSelection(selectedOne, snackId)
  },
  checkValidSelection(selectedOne={name: 'outOfRange'}, snackId){
    if(this.isInValidCase(selectedOne)) return this.handleErrorCase(selectedOne, snackId)
    return this.checkCanBuy(selectedOne)
  },
  isInValidCase({name}){
    return (name==='outOfRange'||name==='{고장}') 
  },
  handleErrorCase(selectedOne, snackId){
    const updatedlogData = {id: snackId}
    updatedlogData.logType = selectedOne.name==='outOfRange'  ? 'notifyChoseWrongNumber' :'notifyBreakdown'
    return this.emit('updateLogView', updatedlogData)
  },
  checkCanBuy(selectedOne){
    if(this.money>=selectedOne.price){
      this.useMoney(selectedOne.price)
      const updatelogData = {...selectedOne, logType: 'displaySelectedOne'} 
      return this.emit('updateLogView', updatelogData) 
    } 
    else {
      const updatelogData = {money: this.money, logType: 'notifyCanNotBuy'}
      return this.emit('updateLogView',updatelogData)
    } 
  },
  useMoney(snackPrice){
    this.money-=snackPrice
    this.emit('reRenderVendingMachineMoney', this.money)
    this.emit('updateCanBuyList', this.money)
  },
  returnMoney(){
    const returnMoney = this.money
    this.money = 0;
    const updateLogData = {money: returnMoney, logType: 'notifyReturnMoney'}
    this.logHistoryList = [];
    this.emit('reRenderVendingMachineMoney', this.money)
    this.emit('updateLogView', updateLogData)
    this.emit('updateCanBuyList', this.money)
  },
  getAutoClearId(autoClearId){
    return this.autoClearId = autoClearId;
  },
  clearAutoClear(){
    clearTimeout(this.autoClearId);
    this.autoClearId = null;
  },
  emit(eventName, data){
    this.controller.on(eventName, data);
  },
}


module.exports = {
  WalletModel,
  VendingMachineModel,
}
