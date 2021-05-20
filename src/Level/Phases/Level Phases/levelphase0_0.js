import { SCREEN_WIDTH, SCREEN_HEIGHT } from "/src/screen.js";
import {EnemyCtsLaser} from "/src/Laser/laser.js";
import * as mth from "/src/math.js";

class EnemyAI{
    constructor(enemy, ang, y1){
        this.enemy = enemy;
        this.game = enemy.game;
        this.ang = ang;
        this.start = 30;
        this.v0 = 2*(y1-enemy.body.y)/(this.start+1);
        this.acc = -this.v0/this.start;
    }
    update(){
        let life = this.game.level.levelTime-this.enemy.birthFrame;
        if(life <= this.start){
            this.enemy.body.y += this.v0;
            this.v0 += this.acc;
            return;
        }
        if(life % 60 == 0){

        }
    }
}

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
        this.updateEnemies(this.time);
    }
    updateEnemies(total){
    }
}