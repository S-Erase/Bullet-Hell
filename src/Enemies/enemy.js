import { SCREEN_WIDTH, SCREEN_HEIGHT, ctx } from "../screen.js";
import { deleteAllBullets } from "/src/bullet.js";
import Circle from "../hitbox.js";

export default class Enemy{
    constructor(game,health,x,y){
        this.game = game;
        this.body = new Circle(x,y,10);
        this.maxHealth = health;
        this.health = health;

        this.ai = null;
    }
    update(){
        if(this.ai !== null)
        this.ai.update();
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = "#999";
        ctx.strokeStyle = "#000";
        ctx.arc(this.body.x, this.body.y, this.body.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}
