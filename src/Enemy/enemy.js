import { SCREEN_WIDTH, SCREEN_HEIGHT, ctx } from "../screen.js";
import Circle from "../hitbox.js";

export default class Enemy{
    constructor(game,health,x,y,fill = "#999"){
        this.game = game;
        this.body = new Circle(x,y,10);
        this.health = health; //Set to null for immortal enemies
        this.birthFrame = game.level.levelTime;
        this.delete = false;
        this.id = game.enemycount++;
        this.fill = fill;

        this.ai = null;
    }
    update(){
        if(this.ai !== null)
        this.ai.update();
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.fill;
        ctx.strokeStyle = "#000";
        ctx.arc(this.body.x, this.body.y, this.body.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}
