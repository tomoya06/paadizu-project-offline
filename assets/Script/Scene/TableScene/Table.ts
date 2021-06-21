// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameEngine from "./LocalGameEngine";
import TableCards from "./Components/TableCards";
import PlayerCards from "./Components/PlayerCards";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TableScene extends cc.Component {

    @property(cc.Node)
    tableCards: cc.Node = null;

    @property(cc.Node)
    playerCards: cc.Node = null;

    private gameEngine: GameEngine;
    
    // LIFE-CYCLE CALLBACKS:

    onLoad () {}

    start () {
        this.startGame();
    }

    restart() {
        cc.director.loadScene('Table');
    }

    startGame() {
        this.gameEngine = new GameEngine();
        cc.log(this.gameEngine.allCards);
        this.renderCardsForAll();
    }

    renderCardsForAll() {
        const { myCards, rightCards, leftCards, oppoCards} = this.gameEngine;
        this.tableCardsNode.renderCards(myCards);
        this.playerCardsNode.renderCards(leftCards, rightCards, oppoCards);
        // console.log(this.tableCards);
    }

    private get tableCardsNode() {
        return this.tableCards.getComponent('TableCards') as TableCards;
    }

    private get playerCardsNode() {
        return this.playerCards.getComponent('PlayerCards') as PlayerCards;
    }

    // update (dt) {}
}
