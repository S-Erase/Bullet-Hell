import { SCREEN_WIDTH, SCREEN_HEIGHT } from "/src/screen.js";
import { doCirclesIntersect } from "/src/hitbox.js";
import * as mth from "/src/math.js";
import { lifeStage } from "./bullet.js";

export default class BulletAIDefault{
    constructor(bullet){
        this.bullet = bullet;
        this.game = bullet.game;
    }
    update(){
        this.bullet.body.x += this.bullet.vx;
        this.bullet.body.y += this.bullet.vy;
        if (this.bullet.body.y < -this.bullet.body.radius){this.bullet.delete = true;}
        else if (this.bullet.body.x < -this.bullet.body.radius){this.bullet.delete = true;}
        else if (this.bullet.body.y > SCREEN_HEIGHT+this.bullet.body.radius){this.bullet.delete = true;}
        else if (this.bullet.body.x > SCREEN_WIDTH+this.bullet.body.radius){this.bullet.delete = true;}
    }
}

export class BulletAISlowCurve{
    constructor(bullet,angd){
        this.bullet = bullet;
        this.game = bullet.game;
        this.angDiff = angd;
        this.startVel = Math.sqrt(this.bullet.vx**2 + this.bullet.vy**2);
        this.vel = Math.sqrt(this.bullet.vx**2 + this.bullet.vy**2);
        this.ang = Math.atan2(this.bullet.vy,this.bullet.vx);
    }
    update(){
        let life = this.game.level.levelTime-this.bullet.birthFrame;
        if(life < 60){
            this.vel = mth.lErp(this.startVel,this.startVel*0.1,life/60);
            this.ang += this.angDiff/60;
        }
        else if(life < 150){
            this.vel = mth.lErp(this.startVel*0.1,this.startVel*3,(life-60)/90);
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

export class BulletAIAccelerate{
    constructor(bullet,endvel,time){
        this.bullet = bullet;
        this.game = bullet.game;
        this.startVel = Math.sqrt(this.bullet.vx**2 + this.bullet.vy**2);
        this.endVel = endvel;
        this.velDiff = this.endVel - this.startVel;
        this.vel = Math.sqrt(this.bullet.vx**2 + this.bullet.vy**2);
        this.ang = Math.atan2(bullet.vy,bullet.vx);
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
                this.vel += this.velDiff/this.time*2*(1-life/this.time);
            }
            else if(life == this.time){
                this.vel = this.endVel;
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

export class BulletAIGravity{
    constructor(bullet, g, maxvy){
        this.bullet = bullet;
        this.game = bullet.game;

        //Complex equations make motion mirror continuous motion
        this.drag = 1-Math.exp(-g/maxvy);
        this.terminalVelocity = maxvy;
        bullet.vy = maxvy + this.drag*(bullet.vy-maxvy)*maxvy/g;
    }
    update(){
        this.bullet.body.x += this.bullet.vx;
        this.bullet.body.y += this.bullet.vy;
        if (this.bullet.body.x < -this.bullet.body.radius){this.bullet.delete = true;}
        else if (this.bullet.body.y > SCREEN_HEIGHT+this.bullet.body.radius){this.bullet.delete = true;}
        else if (this.bullet.body.x > SCREEN_WIDTH+this.bullet.body.radius){this.bullet.delete = true;}

        this.bullet.vy+=this.drag * (this.terminalVelocity - this.bullet.vy);
    }
}