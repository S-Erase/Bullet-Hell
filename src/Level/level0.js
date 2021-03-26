import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../screen.js";
import LevelPhase0_0 from "./Phases/Level Phases/levelphase0_0.js";

export default class Level0{
    constructor(game){
        this.game = game;
        this.levelTime = 0;
        game.boss = null
        this.phase = new LevelPhase0_0(game);
    }
    update(){
        this.levelTime++;
        if(this.phase !== null)
        this.phase.update();
    }
}