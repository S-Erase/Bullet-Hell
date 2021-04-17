import { SCREEN_WIDTH, SCREEN_HEIGHT } from "/src/screen.js";
import * as mth from "/src/math.js";
import { EnemyBullet0 } from "/src/Bullets/bullet.js";
import { BulletAISlowCurve } from "/src/Bullets/bulletai.js";

export default class BossPhase0_1{
    constructor(game, ratio){
        this.game = game;
        this.ratio = ratio;

        this.time = -60;
        this.ang = mth.randomUniform(0,Math.PI/5);
        this.dir = 1;
    }
    init(){
        this.boss = this.game.level.boss;

        this.start = {
            x: this.boss.body.x,
            y: this.boss.body.y,
        };
    }
    update(){
        this.time++;
        if(this.boss.health < this.ratio*this.boss.maxHealth){
            this.boss.nextPhase();
            return;
        }
        this.updateBoss(this.time);
        this.updateBullets(this.time);
    }
    updateBoss(total){
        if(total < 0){
            this.boss.body.x = mth.easeIn(this.start.x,SCREEN_WIDTH/2,1+total/60);
            this.boss.body.y = mth.easeIn(this.start.y,200,1+total/60);
        }
    }
    updateBullets(total){
        if(total < 0){
            for(let i = 0; i < 15; i++){
                if(total==-60+4*i){
                    for(let j = 0; j < 18; j++){
                        this.game.enemybullets.push(EnemyBullet0(this.game, 
                            this.boss.body.x + 20*Math.cos(this.ang+j*Math.PI/9),
                            this.boss.body.y + 20*Math.sin(this.ang+j*Math.PI/9),
                            (1+i/4), this.ang+j*Math.PI/9,
                            `hsl(${20*j},100%,20%)`,`hsl(${20*j},100%,50%)`,10));
                    }
                    this.ang-=0.025;
                }
            }
            return;
        }
        if(total < 10){
            for(let j = 0; j < 18; j++){
                this.game.enemybullets.push(EnemyBullet0(this.game, 
                    this.boss.body.x + 20*Math.cos(this.ang+j*Math.PI/9),
                    this.boss.body.y + 20*Math.sin(this.ang+j*Math.PI/9),
                    (1+total/3), this.ang+j*Math.PI/9,
                    "#fff",`hsl(${20*j},100%,50%)`,5));
            }
            this.ang-=mth.lErp(0.15,-0.15,total/9);
            return;
        }
            if(Math.floor(total/4)-Math.floor((total-1)/4)){
                for(let i = 0; i < 10; i++){
                    let bullet = EnemyBullet0(this.game, 
                        this.boss.body.x + 20*Math.cos(this.ang+i*Math.PI/5),
                        this.boss.body.y + 20*Math.sin(this.ang+i*Math.PI/5),
                        3, this.ang+i*Math.PI/5,
                        "#fff","#00f");
                    bullet.ai = new BulletAISlowCurve(bullet,Math.PI/2*this.dir);
                    this.game.enemybullets.push(bullet);
                    
                }
            }
            if(Math.floor((total-9)/20)-Math.floor((total-10)/20)){
                this.dir*=-1;
                this.ang = mth.randomUniform(0,Math.PI/5);
            }
        
    }
}