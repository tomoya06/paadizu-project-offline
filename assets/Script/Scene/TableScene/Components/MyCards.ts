// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import CardFacePrefab from "../../../Prefab/CardFace";
import { observer, render, reactor, react } from "mobx-cocos";
import { gameEngine } from "../LocalGameEngine";

const { ccclass, property } = cc._decorator;

@ccclass
@observer
export default class MyCards extends cc.Component {
  @property(cc.Prefab)
  cardFacePrefab: cc.Prefab = null;

  @property(cc.Node)
  playerMeNode: cc.Node = null;

  cardFaceNodeMapper: { [key: string]: cc.Node } = {};

  selectedCards: Set<string> = new Set();

  // LIFE-CYCLE CALLBACKS:

  onLoad() {}

  start() {}

  // update (dt) {}

  @render
  renderCards() {
    if (!this.playerMeNode) return;

    const { myCards: cards } = gameEngine;
    this.playerMeNode.removeAllChildren();

    cc.log("myCards", cards);
    for (let i = 0; i < cards.length; i += 1) {
      const cardNode = cc.instantiate(this.cardFacePrefab);
      const cardData = cards[i];
      this.playerMeNode.addChild(cardNode);
      (cardNode.getComponent("CardFace") as CardFacePrefab).init(cardData);
      cardNode.on(
        "selectionchange",
        this.cardSelectionChangeHandler.bind(this)
      );
      // 添加引用到mapper
      this.cardFaceNodeMapper[cardData] = cardNode;
    }
  }

  cardSelectionChangeHandler(payload: {
    selected: boolean;
    cardValue: string;
  }) {
    const { selected, cardValue } = payload;
    if (selected) {
      this.selectedCards.add(cardValue);
    } else {
      this.selectedCards.delete(cardValue);
    }
    cc.log(`selected cards: `, [...this.selectedCards]);
  }

  playHands() {
    cc.log("playHands");
    const { selectedCards } = this;
    gameEngine.playHands([...selectedCards]);
  }
}
