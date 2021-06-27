import PdzGame from "namwaa-pdz-sdk/dist/game";
import { observable, computed, observe, action } from "mobx";

class LocalGameEngine {
  game: PdzGame;

  constructor() {
    this.game = new PdzGame(['myself', 'left', 'oppo', 'right']);
    // observe(this, "curIdx", (idx) => {
    //   cc.log("curidx change: ", idx);
    // });
  }

  @action
  public playHands(hands: string[]): boolean {
    return this.game.play("myself", hands);
  }

  public getPlayerCards(playerId: string) {
    return this.game.playerCards[playerId];
  }

  @computed
  public get myCards() {
    return this.game.playerCards["myself"];
  }

  @computed
  public get leftCards() {
    return this.game.playerCards["left"];
  }

  @computed
  public get oppoCards() {
    return this.game.playerCards["oppo"];
  }

  @computed
  public get rightCards() {
    return this.game.playerCards["right"];
  }

  @computed
  public get allCards() {
    return this.game.playerCards;
  }

  @computed
  public get curIdx() {
    return this.game.curIdx;
  }
}

const _engine = new LocalGameEngine();

(window as any).game = _engine;

export const gameEngine = _engine;
