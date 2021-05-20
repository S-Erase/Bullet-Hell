import Line, { doesCircleIntersectLine } from "../hitbox.js";
import CtsLaserAIDefault, {CtsLaserState} from "./laserai.js";

export class PlayerLaser //Untested
{
    constructor(game,dx=0,dy=0,ang=-Math.PI/2){
        this.game = game;
        this.body = new Line(game.player.body.x+dx, game.player.body.y+dy, 0, 0, 3);
        this.vx = 20*Math.cos(ang);
        this.vy = 20*Math.sin(ang);
        this.delete = false;
    }
    update(){
        this.body.dx += this.vx;
        this.body.dy += this.vy;
        if (this.body.y < -this.body.radius){this.delete = true;}
        else if (this.body.x < -this.body.radius){this.delete = true;}
        else if (this.body.y > SCREEN_HEIGHT+this.body.radius){this.delete = true;}
        else if (this.body.x > SCREEN_WIDTH+this.body.radius){this.delete = true;}
        else if (this.game.level !== null && this.game.level.boss.active){
            if(doCirclesIntersect(this.body, this.game.level.boss.body)){
                if(this.game.level.boss.health > 0)
                this.game.level.boss.health -= 1;
            }
        }
    }
    draw(){
		ctx.beginPath();
		ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.moveTo(this.body.x0,this.body.y0);
        ctx.moveTo(this.body.x0+this.body.dx,this.body.y0+this.body.dy);
        ctx.stroke();
		ctx.fill();
    }
}

export class EnemyCtsLaser //Untested
{
    constructor(game,enemy,x,y,vx,vy, rad=5, life = 60, strokeStyle="#00f", fillStyle="#fff"){
        this.body = new Line(x,y,0,0,rad);
        this.vx = vx;
        this.vy = vy;
        this.game = game;
        this.fillStyle = fillStyle;
        this.strokeStyle = strokeStyle;
        this.lifeStage = lifeStage.birth;
        this.delete = false;
        this.birthFrame = game.level.levelTime;
        this.birthPhase = birthPhase;
        this.attached = true;
        this.ai = new CtsLaserAIDefault(this,life,enemy);
    }
    update(){
        if(this.ai !== null)
            this.ai.update();
    }
    draw(){
		ctx.beginPath();
        let drawRadius = this.body.radius+3;
        
        ctx.lineWidth = drawRadius;
        ctx.moveTo(this.body.x,this.body.y);
        ctx.lineTo(this.body.x + this.body.dx,this.body.y + this.body.dy);
		ctx.strokeStyle = this.strokeStyle;
		ctx.stroke();
        ctx.lineWidth = drawRadius/2;
        ctx.moveTo(this.body.x,this.body.y);
        ctx.lineTo(this.body.x + this.body.dx,this.body.y + this.body.dy);
		ctx.strokeStyle = this.fillStyle;
		ctx.stroke();

        ctx.lineWidth = 1;
    }
    kill(){
        if(this.attached){
            this.body.dx = 0;
            this.body.dy = 0;
        }else{
            this.delete = true;
        }
    }
    deleteFun(){
        this.delete = true;
    }
    intersectPlayer(){
        return doesCircleIntersectLine(this.game.player.body, this.body);
    }
}