// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { gameEngine } from "./LocalGameEngine";
import Dealer from "./Components/Dealer";

import { observe } from 'mobx';
import { observer, render, reactor, react } from "mobx-cocos";

const { ccclass, property } = cc._decorator;

@ccclass
@observer
export default class TableScene extends cc.Component {

  // LIFE-CYCLE CALLBACKS:

  onLoad() {}

  start() {
  }

  restart() {
    cc.director.loadScene("Table");
  }

  // update (dt) {}
}
