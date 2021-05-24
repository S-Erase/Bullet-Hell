import { SCREEN_WIDTH, SCREEN_HEIGHT, ctx } from "/src/screen.js";
import { Line, doesCircleIntersectLine } from "../hitbox.js";
import SourceLaserAIDefault, {SourceLaserState} from "./laserai.js";
import { drawLaser } from "../shapes.js";

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

export class EnemySourceLaser
{
    constructor(game,enemy,dx,dy,vx,vy, rad=8, life = 60, strokeStyle="#00f", fillStyle="#fff"){
        this.body = new Line(enemy.body.x + dx,enemy.body.y + dy,0,0,rad);
        this.vx = vx;
        this.vy = vy;
        this.game = game;
        this.fillStyle = fillStyle;
        this.strokeStyle = strokeStyle;
        this.delete = false;
        this.birthFrame = game.level.levelTime;
        this.attached = true;
        this.ai = new SourceLaserAIDefault(this,life,enemy);
    }
    update(){
        if(this.ai !== null)
            this.ai.update();
    }
    draw()
    {
        drawLaser(this);
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
    intersectsPlayer(){
        return doesCircleIntersectLine(this.game.player.body, this.body);
    }
}

export function CreateEnemySourceLaser0(game,enemy,v,ang,rad = 8, life = 60, strokeStyle="#00f", fillStyle="#fff"){
    let laser = new EnemySourceLaser(game,enemy, rad*Math.cos(ang), rad*Math.sin(ang),
                                                    v*Math.cos(ang), v*Math.sin(ang), rad, life, strokeStyle, fillStyle);
    game.enemybullets.push(laser);
    return laser;
}