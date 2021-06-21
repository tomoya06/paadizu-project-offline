// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class CountdownPrefab extends cc.Component {

    @property(cc.Label)
    cntLabel: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    timer = 0;

    start () {

    }

    // update (dt) {}

    private cdCallback() {
        this.cntLabel.string = `${this.timer}`;
        if (this.timer <= 0) {
            this.unschedule(this.cdCallback);
            this.node.emit('timesup');
        }
        this.timer -= 1;
    }

    setCnt(cnt: number) {
        this.timer = cnt;
        this.schedule(this.cdCallback, 1, cnt);
    }
}
