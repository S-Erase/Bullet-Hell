import { SCREEN_WIDTH, SCREEN_HEIGHT } from "/src/screen.js";
import * as mth from "/src/math.js";
import { EnemyBullet0 } from "/src/bullet.js";

export default class LevelPhase0_0{
    constructor(game){
        this.game = game;

        this.time = 0;
        this.ang = mth.randomUniform(0,Math.PI/12);
    }
    init(){
    }
    update(){
        this.time++;
        if(this.time > 120){
            this.game.level.nextPhase();
            return;
        }
        this.updateBoss(this.time);
        this.updateBullets(this.time);
    }
    updateBoss(total){
    }
    updateBullets(total){
        
    }
}