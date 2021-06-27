// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import CountdownPrefab from "../../../Prefab/Countdown";

import { observe } from "mobx";
import { observer, render, reactor, react } from "mobx-cocos";
import { gameEngine } from "../LocalGameEngine";

const { ccclass, property } = cc._decorator;

type dealerEvents = "timesup";

@ccclass
@observer
export default class Dealer extends cc.Component {
  @property(cc.Prefab)
  countDownPrefab: cc.Prefab = null;

  @property(cc.Node)
  leftClockSlot: cc.Node = null;

  @property(cc.Node)
  rightClockSlot: cc.Node = null;

  @property(cc.Node)
  oppoClockSlot: cc.Node = null;

  @property(cc.Node)
  myClockSlot: cc.Node = null;

  private get countdownComponent() {
    return this.countdownNode.getComponent("Countdown") as CountdownPrefab;
  }

  countdownNode: cc.Node = null;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    const clock = cc.instantiate(this.countDownPrefab);
    this.countdownNode = clock;
  }

  start() {}

  // update (dt) {}

  @render
  init() {
    const { curIdx } = gameEngine;
    this.setClock(curIdx);
  }

  public setClock(pos: number, timer = 10) {
    if (this.countdownNode.parent) {
      this.countdownNode.parent.removeChild(this.countdownNode);
    }

    if (pos === 0) {
      this.myClockSlot.addChild(this.countdownNode);
    } else if (pos === 1) {
      this.leftClockSlot.addChild(this.countdownNode);
    } else if (pos === 2) {
      this.oppoClockSlot.addChild(this.countdownNode);
    } else if (pos === 3) {
      this.rightClockSlot.addChild(this.countdownNode);
    }

    this.countdownComponent.setCnt(timer);
    this.countdownNode.on("timesup", () => {
      cc.log(`timesup for ${pos}`);
    });
  }
}
