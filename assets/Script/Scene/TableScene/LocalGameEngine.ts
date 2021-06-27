import { shuffleCards } from 'namwaa-pdz-sdk/dist/play';
import PdzGame from 'namwaa-pdz-sdk/dist/game';

export enum EventNames {
  PlayHands = 'PlayHands',
}

export default class GameEngine {
  private game: PdzGame;

  constructor() {
    this.game = new PdzGame(['myself', 'left', 'oppo', 'right']);
  }

  public playHands(hands: string[]) {
    this.game.play('myself', hands);
  }

  public get myPlayerId() {
    return 'myself';
  }

  public get myCards() {
    return this.game.playerCards['myself'];
  }

  public get leftCards() {
    return this.game.playerCards['left'];
  }
  
  public get oppoCards() {
    return this.game.playerCards['oppo'];
  }
  
  public get rightCards() {
    return this.game.playerCards['right'];
  }

  public get allCards() {
    return this.game.playerCards;
  }

  public get curIdx() {
    return this.game.curIdx;
  }
}