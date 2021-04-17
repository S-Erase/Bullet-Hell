import { SCREEN_WIDTH, SCREEN_HEIGHT } from "/src/screen.js";
import * as mth from "/src/math.js";
import { EnemyBullet } from "/src/Bullets/bullet.js";
import { BulletAIGravity } from "/src/Bullets/bulletai.js";

export default class BossPhase0_3{
    constructor(game, ratio){
        this.game = game;
        this.ratio = ratio;

        this.time = -90;
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
        if(this.boss.health < this.ratio*this.boss.maxHealth){
            this.boss.nextPhase();
            return;
        }
        this.updateBoss(this.time);
        this.updateBullets(this.time);
    }
    updateBoss(total){
        if(total < 0){
            this.boss.body.x = mth.easeIn(this.start.x,SCREEN_WIDTH/2,1+total/90);
            this.boss.body.y = mth.easeIn(this.start.y,250,1+total/90);
            return;
        }
        
    }
    updateBullets(total){
        if(total < 0){
            if(total%4==0){
                let bullet;
                for(let i = 0; i < 5; i++){
                    bullet = new EnemyBullet(this.game, 
                        this.boss.body.x, this.boss.body.y,
                        -(2+i/3)*(Math.cos(Math.PI*(1+(total-i/2)/90)) + 0.5*Math.sin(Math.PI*(1+(total-i/2)/90))),
                        (2+i/3)*( Math.cos(Math.PI*(1+(total-i/2)/90)) - 0.5*Math.sin(Math.PI*(1+(total-i/2)/90))),
                        "#02f","#fff",3);
                    bullet.ai = new BulletAIGravity(bullet,0.05,6);
                    this.game.enemybullets.push(bullet);

                    bullet = new EnemyBullet(this.game, 
                        this.boss.body.x, this.boss.body.y,
                        (2+i/3)*(Math.cos(Math.PI*(1+(total-i/2)/90)) + 0.5*Math.sin(Math.PI*(1+(total-i/2)/90))),
                        (2+i/3)*(Math.cos(Math.PI*(1+(total-i/2)/90)) - 0.5*Math.sin(Math.PI*(1+(total-i/2)/90))),
                        "#777","#fff",3);
                    bullet.ai = new BulletAIGravity(bullet,0.05,6);
                    this.game.enemybullets.push(bullet);
                }
            }
            return;
        }
    }
}