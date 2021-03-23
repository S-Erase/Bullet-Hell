import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../screen.js";
import Boss from "../boss.js";
import BossPhase0_0 from "./Phases/Boss Phases/bossphase0_0.js";

export default class Level0{
    constructor(game){
        this.game = game;
        this.levelTime = 0;
        game.boss = new Boss(3500, SCREEN_WIDTH/2, -12);
        this.phase = new BossPhase0_0(game);
    }
    update(){
        this.levelTime++;
        this.phase.update();
    }
}