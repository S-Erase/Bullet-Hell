import { SCREEN_WIDTH, SCREEN_HEIGHT } from "/src/screen.js";
import * as mth from "/src/math.js";
import { doCirclesIntersect } from "/src/hitbox.js";
import { CreateEnemyBullet0, lifeStage } from "/src/Bullets/bullet.js";
import { BulletAIAccelerate } from "/src/Bullets/bulletai.js";
import Enemy from "/src/Enemy/enemy.js";

class BulletAI{
    constructor(bullet, ang, time){
        this.game = bullet.game;
        this.bullet = bullet;
        this.startVel = Math.sqrt(bullet.vx**2 + bullet.vy**2);
        this.vel = this.startVel;
        this.ang = Math.atan2(bullet.vy,bullet.vx);
        this.newang = ang;
        this.time = time;
        this.accel = true;
    }
    update(){
        if(this.accel){
            let life = this.game.level.levelTime-this.bullet.birthFrame;
            if(life == 0){
                this.vel = this.startVel;
            }
            else if(life < this.time){ //Cubic interpolation
                this.vel -= this.startVel/this.time*2*(1-life/this.time);
            }
            else if(life == this.time){
                this.vel = 3;
                this.ang = this.newang;
                this.accel = false;
            }
        }
        
        this.bullet.vx = this.vel*Math.cos(this.ang);
        this.bullet.vy = this.vel*Math.sin(this.ang);
        this.bullet.body.x += this.bullet.vx;
        this.bullet.body.y += this.bullet.vy;
        if (this.bullet.body.y < -this.bullet.body.radius){this.bullet.delete = true;}
        else if (this.bullet.body.x < -this.bullet.body.radius){this.bullet.delete = true;}
        else if (this.bullet.body.y > SCREEN_HEIGHT+this.bullet.body.radius){this.bullet.delete = true;}
        else if (this.bullet.body.x > SCREEN_WIDTH+this.bullet.body.radius){this.bullet.delete = true;}
    }
}

class EnemyAI{
    constructor(enemy, ang){
        this.enemy = enemy;
        this.game = enemy.game;
        this.vx = 5*Math.cos(ang);
        this.vy = 5*Math.sin(ang);
        this.ang = ang;
    }
    update(){
        this.enemy.body.x += this.vx;
        this.enemy.body.y += this.vy;
        let life = this.game.level.levelTime-this.enemy.birthFrame;
        if(life%5 == 0){
            let bullet = CreateEnemyBullet0(this.game, 
                this.enemy.body.x, this.enemy.body.y,
                6, mth.angleAtoB(this.enemy.body,this.game.player.body),
                "#f00");
            bullet.ai = new BulletAI(bullet,this.ang,60);
            this.ang+=0.5;

            if (this.enemy.body.y < -this.enemy.body.radius){this.enemy.delete = true;}
            else if (this.enemy.body.x < -this.enemy.body.radius){this.enemy.delete = true;}
            else if (this.enemy.body.y > SCREEN_HEIGHT+this.enemy.body.radius){this.enemy.delete = true;}
            else if (this.enemy.body.x > SCREEN_WIDTH+this.enemy.body.radius){this.enemy.delete = true;}
        }
    }
}

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
                    let bullet = CreateEnemyBullet0(this.game, 
                        this.boss.body.x, this.boss.body.y,
                        25, mth.angleAtoB(this.boss.body,this.game.player.body)+j*Math.PI/9,
                        "#0f0","#060",10);
                    bullet.ai = new BulletAIAccelerate(bullet,2,30);
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
                    CreateEnemyBullet0(this.game, 
                        this.boss.body.x + 20*Math.cos(this.ang+j*Math.PI/18),
                        this.boss.body.y + 20*Math.sin(this.ang+j*Math.PI/18),
                        15, this.ang+j*Math.PI/18,
                        "#0f0","#fff",5);
                }
            }
            return;
        }
        if(total%30 == 0)
        {
            this.ang += 2*Math.PI*mth.goldenRatio;
            let enemy = new Enemy(this.game,null,this.boss.body.x,this.boss.body.y);
            enemy.ai = new EnemyAI(enemy,this.ang);
            this.game.enemies.push(enemy);
            return;
        }
    }
}
