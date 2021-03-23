import { SCREEN_WIDTH, SCREEN_HEIGHT, ctx } from "./screen.js";
import Circle from "./circle.js";

export default class Boss{
	constructor(health,x,y){
		this.body = new Circle(x,y,12);
        this.maxHealth = health;
        this.prevHealth = health;
        this.health = health;
	}
	drawBoss(){
		ctx.beginPath();
		ctx.fillStyle = "#b11";
		ctx.strokeStyle = "#000";
		ctx.arc(this.body.x, this.body.y, this.body.radius, 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();
	}
    drawHealth(){
		ctx.fillStyle = "#999";
		ctx.strokeStyle = "#fff";
        let ratio = this.health/this.maxHealth;
        ctx.fillRect(5,5,(SCREEN_WIDTH-10)*ratio,10);
        ctx.strokeRect(5,5,(SCREEN_WIDTH-10),10);
    }
	drawGrid(){
		ctx.strokeStyle = "#444";
		ctx.beginPath();
		ctx.moveTo(this.body.x,0);
		ctx.lineTo(this.body.x,SCREEN_HEIGHT);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(0,this.body.y);
		ctx.lineTo(SCREEN_WIDTH,this.body.y);
		ctx.stroke();
	}
}