// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import CardFacePrefab from "../../../Prefab/CardFace";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TableCards extends cc.Component {
    @property(cc.Prefab)
    cardFacePrefab: cc.Prefab = null;

    cardFaceNodeMapper: {[key: string]: cc.Node} = {};

    selectedCards: Set<string> = new Set();

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    }

    start () {
    }

    // update (dt) {}

    renderCards(cards: string[]) {
        for (let i=0; i<cards.length; i+=1) {
            const cardNode = cc.instantiate(this.cardFacePrefab);
            const cardData = cards[i];
            this.node.addChild(cardNode);
            (cardNode.getComponent('CardFace') as CardFacePrefab).init(cardData);
            cardNode.on('selectionchange', this.cardSelectionChangeHandler.bind(this));
            // 添加引用到mapper
            this.cardFaceNodeMapper[cardData] = cardNode;
        }
    }

    cardSelectionChangeHandler(payload: {selected: boolean; cardValue: string}) {
        const { selected, cardValue } = payload;
        if (selected) {
            this.selectedCards.add(cardValue);
        } else {
            this.selectedCards.delete(cardValue);
        }
        cc.log(`selected cards: `, [...this.selectedCards]);
    }
}
