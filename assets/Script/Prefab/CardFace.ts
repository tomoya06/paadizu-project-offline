// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

const kindStringMapper = {
    'A': '♦',
    'B': '♣',
    'C': '♥',
    'D': '♠',
}

@ccclass
export default class NewClass extends cc.Component {
    
    @property(cc.Button)
    cardBtn: cc.Button = null;

    @property(cc.Label)
    value: cc.Label = null;

    @property(cc.Label)
    kind: cc.Label= null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}

    init(card: string) {
        this.kind.string = kindStringMapper[card[1]];
        this.value.string = card[0];
    }
}
