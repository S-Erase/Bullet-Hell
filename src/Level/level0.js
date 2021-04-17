import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../screen.js";
import { deleteAllBullets } from "/src/Bullets/bullet.js";
import Boss0 from "./boss0.js";
import LevelPhase0_0 from "./Phases/Level Phases/levelphase0_0.js";

export default class Level0{
    constructor(game){
        this.game = game;
        this.boss = new Boss0(game, 3500, SCREEN_WIDTH/2, -12);
        this.levelTime = 0;

        this.phases = [new LevelPhase0_0(game)];
        this.phaseindex = 0;

        this.phase = null;
    }
    init(){
        this.phase = this.phases[this.phaseindex];
        this.phase.init();
    }
    nextPhase(){
        deleteAllBullets(this.game);
        this.phaseindex++;
        if(this.phaseindex < this.phases.length){
            this.phase = this.phases[this.phaseindex];
            this.phase.init();
        }
        else{
            this.phase = null;
            this.boss.init();
        }
    }
    update(){
        this.levelTime++;
        if(this.boss.active)
        this.boss.phase.update();
        else
        this.phase.update();
    }
}