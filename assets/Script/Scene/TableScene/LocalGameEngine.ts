import { shuffleCards } from 'namwaa-pdz-sdk';

export default class GameEngine {
  private players: string[][] = [];

  private cur: number = 0;

  constructor() {
    const shuffleResult = shuffleCards();
    this.players = shuffleResult.hands;
    this.cur = shuffleResult.starter;
  }

  public get myCards() {
    return this.players[0];
  }

  public get leftCards() {
    return this.players[1];
  }
  
  public get oppoCards() {
    return this.players[2];
  }
  
  public get rightCards() {
    return this.players[3];
  }

  public get allCards() {
    return this.players;
  }
}