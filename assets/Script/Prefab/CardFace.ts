// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { cardDecoder } from "namwaa-pdz-sdk/dist/transform";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CardFacePrefab extends cc.Component {
    
    @property(cc.Button)
    cardBtn: cc.Button = null;

    @property(cc.Label)
    value: cc.Label = null;

    @property(cc.Label)
    kind: cc.Label= null;

    _selected = false;

    _posVet: cc.Vec3 = null;

    get selected() {
        return this._selected;
    }

    set selected(val: boolean) {
        this._selected = val;
        this.handleSelectionChange();
    }

    cardValue = '';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this._posVet = this.node.position;
    }

    // update (dt) {}

    init(card: string) {
        this.cardValue = card;
        const decoded = cardDecoder(card);
        this.value.string = decoded.point;
        this.kind.string = decoded.suit;
    }

    onClick() {
        cc.log(`clicked card ${this.cardValue}`);
        this.selected = !this.selected;
    }

    resetSelection() {
        this.selected = false;
    }

    private handleSelectionChange() {
        const { selected, cardValue } = this;
        this.node.emit('selectionchange', {
            selected,
            cardValue,
        });

        if (this._selected) {
            this.setSelectedPosition();
        } else {
            this.resetPosition();
        }
    }

    private setSelectedPosition() {
        const {x, y} = this._posVet;
        this.node.setPosition(x, y+30);
    }

    private resetPosition() {
        const {x, y} = this._posVet;
        this.node.setPosition(x, y);
    }
}
