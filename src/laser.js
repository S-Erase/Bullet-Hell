import Line, { doesCircleIntersectLine } from "./hitbox.js";

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