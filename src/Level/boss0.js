import { SCREEN_WIDTH, SCREEN_HEIGHT, ctx } from "../screen.js";
import { deleteAllBullets } from "/src/Bullets/bullet.js";
import Circle from "../hitbox.js";
import BossPhase0_0 from "./Phases/Boss Phases/bossphase0_0.js";
import BossPhase0_1 from "./Phases/Boss Phases/bossphase0_1.js";
import BossPhase0_2 from "./Phases/Boss Phases/bossphase0_2.js";
import BossPhase0_3 from "./Phases/Boss Phases/bossphase0_3.js";
import { HeartPiece } from "../items.js";

export default class Boss0{
	constructor(game,health,x,y){
		this.game = game;
		this.body = new Circle(x,y,12);
        this.maxHealth = health;
        this.health = health;

		this.phases = [new BossPhase0_0(game, 0.8), new BossPhase0_1(game, 0.6), new BossPhase0_2(game, 0.4), new BossPhase0_3(game, 0.2)];
		//this.phases = [new BossPhase0_1(game, 0.95), new BossPhase0_2(game, 0.75), new BossPhase0_3(game, 0.2)];
		//this.phases = [new BossPhase0_1(game, 0.95), new BossPhase0_3(game, 0.75)];
		this.phaseindex = 0;
		this.phase = null;

		this.active = false;
	}
	init(){
        this.phase = this.phases[this.phaseindex];
        this.phase.init();
		this.active = true;
	}
	nextPhase(){
        deleteAllBullets(this.game);
		this.game.enemies.length = 0;
        this.phaseindex++;
        if(this.phaseindex < this.phases.length){
            this.phase = this.phases[this.phaseindex];
            this.phase.init();
        }
		this.game.items.push(new HeartPiece(this.game, this.body.x, this.body.y,-30,-30));
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