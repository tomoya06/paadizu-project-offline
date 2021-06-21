// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerCards extends cc.Component {

    @property(cc.Node)
    playerLeft: cc.Node = null;

    @property(cc.Node)
    playerRight: cc.Node = null;

    @property(cc.Node)
    playerOppo: cc.Node = null;

    @property(cc.Prefab)
    cardBackPrefab: cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}

    public renderCards(leftCards: string[], rightCards: string[], oppoCards: string[]) {
        this.renderCardsForPlayer(this.playerLeft, leftCards);
        this.renderCardsForPlayer(this.playerRight, rightCards);
        this.renderCardsForPlayer(this.playerOppo, oppoCards);
    }

    private renderCardsForPlayer(node: cc.Node, cards: string[]) {
        for (let i=0; i<cards.length; i+=1) {
            const cardPrefab = cc.instantiate(this.cardBackPrefab);
            node.addChild(cardPrefab);
            // 不用渲染牌面
        }
    }
}
