import { SCREEN_WIDTH, SCREEN_HEIGHT } from "/src/screen.js";
import * as mth from "/src/math.js";
import { EnemyBullet0, deleteAllBullets } from "/src/bullet.js";
import BossPhase0_0 from "../Boss Phases/bossphase0_0.js";

export default class LevelPhase0_0{
    constructor(game){
        this.game = game;
        this.nextPhase = new BossPhase0_0(this.game);

        this.time = 0;
        this.ang = mth.randomUniform(0,Math.PI/12);
    }
    init(){
        
    }
    update(){
        this.time++;
        if(this.time > 120){
            deleteAllBullets(this.game);
            this.nextPhase.init();
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