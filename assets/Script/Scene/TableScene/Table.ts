// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameEngine, { EventNames } from "./LocalGameEngine";
import TableCards from "./Components/TableCards";
import PlayerCards from "./Components/PlayerCards";
import Dealer from "./Components/Dealer";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TableScene extends cc.Component {

    @property(cc.Node)
    tableCards: cc.Node = null;

    @property(cc.Node)
    playerCards: cc.Node = null;

    @property(cc.Node)
    dealer: cc.Node = null;

    private get tableCardsComponent() {
        return this.tableCards.getComponent('TableCards') as TableCards;
    }

    private get playerCardsComponent() {
        return this.playerCards.getComponent('PlayerCards') as PlayerCards;
    }

    private get dealerComponent() {
        return this.dealer.getComponent('Dealer') as Dealer;
    }

    private gameEngine: GameEngine;
    
    // LIFE-CYCLE CALLBACKS:

    onLoad () {}

    start () {
        this.startGame();
    }

    // update (dt) {}

    restart() {
        cc.director.loadScene('Table');
    }

    startGame() {
        this.gameEngine = new GameEngine();
        cc.log(this.gameEngine.allCards);

        this.registerEvents();
        this.renderTable();
    }

    renderTable() {
        this.renderCardsForAll();
        this.initDealer();
    }

    renderCardsForAll() {
        const { myCards, rightCards, leftCards, oppoCards} = this.gameEngine;
        this.tableCardsComponent.renderCards(myCards);
        this.playerCardsComponent.renderCards(leftCards, rightCards, oppoCards);
        // console.log(this.tableCards);
    }

    initDealer() {
        const { curIdx } = this.gameEngine;
        cc.log(`轮到你出牌了: ${curIdx}`);
        this.dealerComponent.init(curIdx);
    }

    registerEvents() {
        this.node.on(EventNames.PlayHands, (event: cc.Event.EventCustom) => {
            event.stopPropagation();
            
            cc.log('received playHands:', event.detail);
            const hands = event.detail as string[];
            this.gameEngine.playHands(hands);

            this.renderTable();
        })
    }
}
