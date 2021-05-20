import { SCREEN_WIDTH, SCREEN_HEIGHT, ctx } from "/src/screen.js";
import Circle, { doCirclesIntersect } from "/src/hitbox.js";
import { easeIn, lErp } from "/src/math.js";
import { star, heart } from "./shapes.js";

export class HeartPiece{
    constructor(game,x0,y0,dx,dy){
        this.game = game;
        this.body = new Circle(x0,y0,7);
        this.startPos = {x:x0, y:y0};
        this.restPos = {x:x0+dx, y:y0+dy};
        this.birthFrame = game.level.levelTime;

        //Constants of motion
        this.g = 0.01;
        let maxvy = 4;
        
        this.drag = 1-Math.exp(-this.g/maxvy);
        this.terminalVelocity = maxvy;

        this.delete = false;
    }
    update(){
        let life = this.game.level.levelTime-this.birthFrame;
        if(life < 30){
            this.body.x = easeIn(this.startPos.x,this.restPos.x,life/30);
            this.body.y = easeIn(this.startPos.y,this.restPos.y,life/30);
            return;
        }
        if(life == 30){
            this.body.x = this.restPos.x;
            this.body.y = this.restPos.y;
            this.v = this.terminalVelocity*(1 - this.drag*this.terminalVelocity/this.g);
            return;
        }
        this.body.y+=this.v;
        this.v+=this.drag * (this.terminalVelocity - this.v);
        if (this.body.y > SCREEN_HEIGHT+this.body.radius){this.delete = true;}
        if(doCirclesIntersect(this.body, this.game.player.body)){
            this.game.player.lifePieces++;
            if(this.game.player.lifePieces == 3){
                this.game.player.lifePieces = 0;
                this.game.player.lives++;
            }
            this.delete = true;
        }
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = "#e89";
        ctx.strokeStyle = "#a02";
        heart(this.body.x, this.body.y, this.body.radius);
        ctx.fill();
        ctx.stroke();
    }
}