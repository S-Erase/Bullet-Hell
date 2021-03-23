import { SCREEN_WIDTH, SCREEN_HEIGHT } from "./screen.js";
import { doCirclesIntersect } from "./circle.js";
import { lErp } from "./math.js";
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
        else{
            if(this.bullet.lifeStage == lifeStage.life && doCirclesIntersect(this.bullet.body, this.game.player.body)){
                this.game.player.kill();
            }
        }
    }
}

export class BulletAI0{
    constructor(bullet,angd){
        this.bullet = bullet;
        this.game = bullet.game;
        this.angDiff = angd;
        this.startVel = Math.sqrt(this.bullet.vx**2 + this.bullet.vy**2);
        this.vel = Math.sqrt(this.bullet.vx**2 + this.bullet.vy**2);
        this.ang = Math.atan2(this.bullet.vy,this.bullet.vx);
    }
    update(){
        let life = this.game.level.phase.time-this.bullet.birthFrame;
        if(life < 60){
            this.vel = lErp(this.startVel,this.startVel*0.1,life/60);
            this.ang += this.angDiff/60;
        }
        else if(life < 150){
            this.vel = lErp(this.startVel*0.1,this.startVel*3,(life-60)/90);
        }

        this.bullet.vx = this.vel*Math.cos(this.ang);
        this.bullet.vy = this.vel*Math.sin(this.ang);
        this.bullet.body.x += this.bullet.vx;
        this.bullet.body.y += this.bullet.vy;
        if (this.bullet.body.y < -this.bullet.body.radius){this.bullet.delete = true;}
        else if (this.bullet.body.x < -this.bullet.body.radius){this.bullet.delete = true;}
        else if (this.bullet.body.y > SCREEN_HEIGHT+this.bullet.body.radius){this.bullet.delete = true;}
        else if (this.bullet.body.x > SCREEN_WIDTH+this.bullet.body.radius){this.bullet.delete = true;}
        else{
            if(this.bullet.lifeStage == lifeStage.life && doCirclesIntersect(this.bullet.body, this.game.player.body)){
                this.bullet.delete = true;
                this.game.player.kill();
            }
        }
    }
}