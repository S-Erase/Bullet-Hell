import { SCREEN_WIDTH, SCREEN_HEIGHT } from "/src/screen.js";
import * as mth from "/src/math.js";
import { EnemyBullet0 } from "/src/Bullets/bullet.js";
import { BulletAIAccelerate } from "/src/Bullets/bulletai.js";

export default class BossPhase0_2{
    constructor(game, ratio){
        this.game = game;
        this.ratio = ratio;

        this.time = -130;
        this.ang = mth.randomUniform(0,Math.PI/5);

        this.bossmoving = true;
        this.bosstime = 60;
        this.end = {x:0,y:0};
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
        if(total < 0)
        return;
        if(this.bossmoving){
            switch(this.bosstime){
                case 60:
                    this.start.x = this.boss.body.x;
                    this.start.y = this.boss.body.y;
                    this.end.x = mth.clamp(SCREEN_WIDTH*0.2, SCREEN_WIDTH*0.8, this.boss.body.x + mth.randomUniform(-100,100));
                    this.end.y = mth.clamp(SCREEN_HEIGHT*0.1,SCREEN_HEIGHT*0.4,this.boss.body.y + mth.randomUniform(-100,100));

                    this.boss.body.x = mth.easeIn(this.start.x,this.end.x,1-this.bosstime/60);
                    this.boss.body.y = mth.easeIn(this.start.y,this.end.y,1-this.bosstime/60);
                    break;
                case 0:
                    this.boss.body.x = mth.easeIn(this.start.x,this.end.x,1-this.bosstime/60);
                    this.boss.body.y = mth.easeIn(this.start.y,this.end.y,1-this.bosstime/60);

                    this.bossmoving = false;
                    this.bosstime = mth.randomUniformDiscrete(40,180);
                    break;
                default:
                    this.boss.body.x = mth.easeIn(this.start.x,this.end.x,1-this.bosstime/60);
                    this.boss.body.y = mth.easeIn(this.start.y,this.end.y,1-this.bosstime/60);
                    break;
            }
        }
        else{
            if(this.bosstime == 0){
                this.bossmoving = true;
                this.bosstime = 61;
            }
        }
        this.bosstime--;
    }
    updateBullets(total){
        if(total < -10){
            if(total%4 == 0){
                for(let j = 0; j < 18; j++){
                    let bullet = EnemyBullet0(this.game, 
                        this.boss.body.x, this.boss.body.y,
                        25, mth.angleAtoB(this.boss.body,this.game.player.body)+j*Math.PI/9,
                        "#060","#0f0",10);
                    bullet.ai = new BulletAIAccelerate(bullet,2,30);
                    this.game.enemybullets.push(bullet);
                }
            }
            return;
        }
        if(total == -10){
            this.ang = mth.angleAtoB(this.boss.body, this.game.player.body);
            return;
        }
        if(total < 0){
            if(total%2 == 0){
                for(let j = 0; j < 36; j++){
                    this.game.enemybullets.push(EnemyBullet0(this.game, 
                        this.boss.body.x + 20*Math.cos(this.ang+j*Math.PI/18),
                        this.boss.body.y + 20*Math.sin(this.ang+j*Math.PI/18),
                        15, this.ang+j*Math.PI/18,
                        "#fff","#0f0",5));
                }
            }
            return;
        }
        if(total%120 == 0)
        {
            this.ang = mth.randomUniform(0,Math.PI/5);
            return;
        }
        if(total%120 < 40)
        {
            if(total%4 == 0){
                for(let j = 0; j < 10; j++){
                    this.game.enemybullets.push(EnemyBullet0(this.game, 
                        this.boss.body.x, this.boss.body.y,
                        1+(total%120)/8, this.ang+j*Math.PI/5,
                        "#fff","#f70",3));
                }
                this.ang+=0.06;
            }
            return;
        }
        if(total%120 < 80)
        {
            if(total%4 == 0){
                for(let j = 0; j < 10; j++){
                    this.game.enemybullets.push(EnemyBullet0(this.game, 
                        this.boss.body.x, this.boss.body.y,
                        1+(total%120-40)/8, this.ang+j*Math.PI/5,
                        "#fff","#f70",3));
                }
                this.ang-=0.06;
            }
            return;
        }
    }
}