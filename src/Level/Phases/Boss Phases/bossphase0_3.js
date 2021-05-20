import { SCREEN_WIDTH, SCREEN_HEIGHT } from "/src/screen.js";
import * as mth from "/src/math.js";
import { doCirclesIntersect } from "/src/hitbox.js";
import { CreateEnemyBullet0, CreateEnemyBullet1, lifeStage } from "/src/Bullets/bullet.js";
import { BulletAIGravity } from "/src/Bullets/bulletai.js";

class BulletAI{
    constructor(bullet, rot, scale){
        this.game = bullet.game;
        this.bullet = bullet;
        this.rot = rot;
        this.scale = scale;
    }
    update(){
        let dx = this.bullet.body.x - this.game.level.boss.body.x;
        let dy = this.bullet.body.y - this.game.level.boss.body.y;
        this.bullet.vx = this.scale*(Math.cos(this.rot)*dx - Math.sin(this.rot)*dy);
        this.bullet.vy = this.scale*(Math.sin(this.rot)*dx + Math.cos(this.rot)*dy);
        this.bullet.body.x += this.bullet.vx;
        this.bullet.body.y += this.bullet.vy;
        if (this.bullet.body.y < -this.bullet.body.radius){this.bullet.delete = true;}
        else if (this.bullet.body.x < -this.bullet.body.radius){this.bullet.delete = true;}
        else if (this.bullet.body.y > SCREEN_HEIGHT+this.bullet.body.radius){this.bullet.delete = true;}
        else if (this.bullet.body.x > SCREEN_WIDTH+this.bullet.body.radius){this.bullet.delete = true;}
    }
}

export default class BossPhase0_3{
    constructor(game, ratio){
        this.game = game;
        this.ratio = ratio;

        this.time = -90;
        this.dir = 0.5;
        this.ang = 0;
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
            if(total%8==0){
                let bullet;
                for(let i = 0; i < 8; i++){
                    bullet = CreateEnemyBullet1(this.game, 
                        this.boss.body.x, this.boss.body.y,
                        -(2+i/3)*(Math.cos(Math.PI*(1+(total+i/2)/90)) + 0.5*Math.sin(Math.PI*(1+(total+i/2)/90))),
                        (2+i/3)*( Math.cos(Math.PI*(1+(total+i/2)/90)) - 0.5*Math.sin(Math.PI*(1+(total+i/2)/90))),
                        "#02f","#fff",3);
                    bullet.ai = new BulletAIGravity(bullet,0.05,6);

                    bullet = CreateEnemyBullet1(this.game, 
                        this.boss.body.x, this.boss.body.y,
                        (2+i/3)*(Math.cos(Math.PI*(1+(total+i/2)/90)) + 0.5*Math.sin(Math.PI*(1+(total+i/2)/90))),
                        (2+i/3)*(Math.cos(Math.PI*(1+(total+i/2)/90)) - 0.5*Math.sin(Math.PI*(1+(total+i/2)/90))),
                        "#777","#fff",3);
                    bullet.ai = new BulletAIGravity(bullet,0.05,6);
                }
            }
            return;
        }

        if(total%30==0){
            this.dir *= -1;
            this.ang += 0.309;
            let bullet;
            for(let i = 0; i < 10; i++){
                for(let j = 0; j < 2; j++){
                    bullet = CreateEnemyBullet0(this.game, 
                    this.boss.body.x+20*Math.cos(Math.PI/5*(i + j/10 + this.ang)),
                    this.boss.body.y+20*Math.sin(Math.PI/5*(i + j/10 + this.ang)),
                    0,0,
                    "#fb0","#fff",10);
                    bullet.ai = new BulletAI(bullet,this.dir,0.03);
                }
            }
            return;
        }
        if(total%6==0){
            let bullet;
            for(let i = 0; i < 10; i++){
                for(let j = 0; j < 2; j++){
                    bullet = CreateEnemyBullet0(this.game, 
                    this.boss.body.x+20*Math.cos(Math.PI/5*(i + j/10 + this.ang)),
                    this.boss.body.y+20*Math.sin(Math.PI/5*(i + j/10 + this.ang)),
                    0,0,
                    "#00f","#fff");
                    bullet.ai = new BulletAI(bullet,this.dir,0.03);
                }
            }
            return;
        }
    }
}