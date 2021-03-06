// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import CardStackPrefab from "../../../Prefab/CardStack";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerCards extends cc.Component {

    @property(cc.Node)
    playerLeftNode: cc.Node = null;

    @property(cc.Node)
    playerRightNode: cc.Node = null;

    @property(cc.Node)
    playerOppoNode: cc.Node = null;

    @property(cc.Prefab)
    cardBackPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    cardStackPrefab: cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}

    public renderCards(leftCards: string[], rightCards: string[], oppoCards: string[]) {
        this.renderCardsForPlayer(this.playerLeftNode, leftCards);
        this.renderCardsForPlayer(this.playerRightNode, rightCards);
        this.renderCardsForPlayer(this.playerOppoNode, oppoCards);
    }

    private renderCardsForPlayer(node: cc.Node, cards: string[]) {
        node.removeAllChildren();
        const cardPrefab = cc.instantiate(this.cardStackPrefab);
        node.addChild(cardPrefab);
        (cardPrefab.getComponent('CardStack') as CardStackPrefab).setCnt(cards.length);
    }
}
