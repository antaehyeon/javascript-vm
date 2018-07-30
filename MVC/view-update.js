/** 
 * MV 구조에서 VIEW 에 해당하며, 갱신 및 조작을 담당합니다
*/
class VendingMachineViewUpdate {
    constructor(model, util) {
        this.model = model;
        this.viewUtil = util;
        
        console.log("Success Load view-update");
    }

    /** 
     * 내 지갑의 돈을 새로고침합니다 (VIEW)
    */
    refreshWalletMoney() {
       const walletMoneyDivNode = this.viewUtil.getNodeData('#money-amount-window');
       this.changeMoneyNodeTextContent(walletMoneyDivNode, this.model.getWalletMoney());
    }

    /** 
     * 자판기에 투입된 돈을 새로고침합니다 (VIEW)
    */
    refreshInvestedMoneyInVendingMachine() {
        const vendingMachineInvestedMoneyDivNode = this.viewUtil.getNodeData('#money-display');
        this.changeMoneyNodeTextContent(vendingMachineInvestedMoneyDivNode, this.model.getInvestedMoney());
    }

    /**
     * 돈을 표시하는 노드의 textContent 를 수정합니다
     * @param {DOM NODE} node - 노드 데이터
     * @param {number} money - 금액 데이터
     */
    changeMoneyNodeTextContent(node, money) {
        let moneyWithCommas = this.viewUtil.numberWithCommas(money);
        node.textContent = money + "원";
    }

    /**
     * 로그 데이터를 DIV node 로 반환합니다
     * @param {string} logData 
     */
    createLogDivNode(logData) {
        /*
            원래 해당 부분을 insertAdjacentHTML 메서드를 이용해서 노드를 바로 추가했었는데
            classList 를 사용해보기 위하여 createElement 와 innerText 속성을 이용하였습니다

            문자열에 class 를 넣어서 insertAdjacentHTML 을 이용해도 괜찮을 것 같습니다.
            ex. const logDivNodeText = <div class="text-left-align">LOG DATA</div>;
        */ 
        const logDivElement = document.createElement("div");
        logData = this.viewUtil.addLogModeText(logData, "[투입] ");
        debugger;
        logDivElement.innerText = logData;
        logDivElement.classList.add('text-left-align');
        return logDivElement;
    }

    /**
     * 로그창에 로그노드(DIV)를 삽입합니다
     * @param {string} logData 
     */
    insertLogDivToLogWindow(logData) {
        const logDivNode = this.createLogDivNode(logData);
        const logWindowNode = this.viewUtil.getNodeData('#status-panel');
        // logWindowNode.insertAdjacentHTML("beforeend", logDivNode);
        logWindowNode.appendChild(logDivNode);
        debugger;
    }

    /**
     * 노드에 Highlight 클래스를 설정합니다
     * @param {node} node 
     */
    setHighLightToItemNode(node) {
        node.classList.add('high-light');
        // node.style.color = "#FFF";
        // node.style.backgroundColor = "#222";
        debugger;
    }

}