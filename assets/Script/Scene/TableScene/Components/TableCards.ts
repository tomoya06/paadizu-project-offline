// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class TableCards extends cc.Component {
    @property(cc.Prefab)
    cardFacePrefab: cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    }

    start () {
    }

    // update (dt) {}

    renderCards(cards: string[]) {
        for (let i=0; i<cards.length; i+=1) {
            const cardPrefab = cc.instantiate(this.cardFacePrefab);
            this.node.addChild(cardPrefab);
            const cardData = cards[i];
            console.log(cardData);
            cardPrefab.getComponent('CardFace').init(cardData);
        }
    }
}
