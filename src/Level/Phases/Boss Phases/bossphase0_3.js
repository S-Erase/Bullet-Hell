import { SCREEN_WIDTH, SCREEN_HEIGHT } from "/src/screen.js";
import * as mth from "/src/math.js";
import { EnemyBullet1 } from "/src/bullet.js";
import { BulletAIGravity } from "/src/bulletai.js";

export default class BossPhase0_3{
    constructor(game){
        this.game = game;

        this.time = -60;
        this.ang = mth.randomUniform(0,Math.PI/5);
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
        if(this.boss.health < 700){
            this.boss.nextPhase();
            return;
        }
        this.updateBoss(this.time);
        this.updateBullets(this.time);
    }
    updateBoss(total){
        if(total < 0){
            this.boss.body.x = mth.easeIn(this.start.x,SCREEN_WIDTH/2,1+total/60);
            this.boss.body.y = mth.easeIn(this.start.y,250,1+total/60);
            return;
        }
        
    }
    updateBullets(total){
        if(total < 0){
            if(total%3==0){
                let bullet;
                for(let i = 0; i < 5; i++){
                    bullet = new EnemyBullet1(this.game, 
                        this.boss.body.x, this.boss.body.y,
                        -(1+i)*(Math.cos(Math.PI*(1+total/60)) + 0.5*Math.sin(Math.PI*(1+total/60))),
                        (1+i)*( Math.cos(Math.PI*(1+total/60)) - 0.5*Math.sin(Math.PI*(1+total/60))),
                        "#fff","#02f",3);
                    bullet.ai = new BulletAIGravity(bullet,0.05,6);
                    this.game.enemybullets.push(bullet);

                    bullet = new EnemyBullet1(this.game, 
                        this.boss.body.x, this.boss.body.y,
                        (1+i)*(Math.cos(Math.PI*(1+total/60)) + 0.5*Math.sin(Math.PI*(1+total/60))),
                        (1+i)*(Math.cos(Math.PI*(1+total/60)) - 0.5*Math.sin(Math.PI*(1+total/60))),
                        "#fff","#777",3);
                    bullet.ai = new BulletAIGravity(bullet,0.05,6);
                    this.game.enemybullets.push(bullet);
                }
            }
            return;
        }
    }
}