import { SCREEN_WIDTH, SCREEN_HEIGHT, ctx } from "./screen.js";
import * as mth from "/src/math.js";
import { PlayerBullet, killAllBullets } from "/src/Bullets/bullet.js";
import { star, heart, heartOneThird, heartTwoThirds } from "./shapes.js";
import Circle from "./hitbox.js";

export default class Player{
	constructor(game){
        this.game = game;

		this.body = new Circle(SCREEN_WIDTH/2, SCREEN_HEIGHT-30, 8);
        this.lives = 2;
        this.lifePieces = 0;
        this.spell = 2;
        this.spellDelay = 0;

        this.slow = false;
        this.shooting = false;
        this.shotDelay = 0;
        this.betweenSlowAndFast = 1; //1:fast, 0:slow

        this.moveData = {
            w: 0,
            a: 0,
            s: 0,
            d: 0,
        };
	}
	update(){
        if(this.lives >= 0){
            //Movement
            let vel = {
                x:(this.moveData.d-this.moveData.a),
                y:(this.moveData.s-this.moveData.w),
            };
            if(vel.x && vel.y){
                vel.x *= Math.sqrt(0.5);
                vel.y *= Math.sqrt(0.5);
            }

            if(this.slow){
                this.body.x += vel.x*2;
                this.body.y += vel.y*2;
                this.betweenSlowAndFast-=1/5;
            }else{
                this.body.x += vel.x*4;
                this.body.y += vel.y*4;
                this.betweenSlowAndFast+=1/5;
            }
            this.betweenSlowAndFast = mth.clamp(0,1,this.betweenSlowAndFast);
            
            if(this.body.x < this.body.radius) this.body.x = this.body.radius;
            else if(this.body.x > SCREEN_WIDTH-this.body.radius) this.body.x = SCREEN_WIDTH-this.body.radius;
            if(this.body.y < this.body.radius) this.body.y = this.body.radius;
            else if(this.body.y > SCREEN_HEIGHT-this.body.radius) this.body.y = SCREEN_HEIGHT-this.body.radius;

            //Shooting
            if(this.shooting && this.shotDelay <= 0){
                this.shotDelay = 2;
                this.game.playerbullets.push(new PlayerBullet(this.game,3+this.betweenSlowAndFast));
                this.game.playerbullets.push(new PlayerBullet(this.game,-(3+this.betweenSlowAndFast)));
                this.game.playerbullets.push(new PlayerBullet(this.game,9+2*this.betweenSlowAndFast,3,-Math.PI/2+0.05*this.betweenSlowAndFast));
                this.game.playerbullets.push(new PlayerBullet(this.game,-9-2*this.betweenSlowAndFast,3,-Math.PI/2-0.05*this.betweenSlowAndFast));
            }
            this.shotDelay--;
            this.spellDelay--;
        }
	}
	drawPlayer(){
        if(this.lives >= 0){
            ctx.beginPath();
            ctx.fillStyle = "#666";
            ctx.strokeStyle = "#000";
            ctx.arc(this.body.x, this.body.y, this.body.radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        }
	}
    drawLives(){
        ctx.fillStyle = "#e89";
        ctx.strokeStyle = "#a02";
        for(let i = 0; i < this.lives; i++){
            ctx.beginPath();
            heart(15+25*i,SCREEN_HEIGHT-40,10);
            ctx.fill();
            ctx.stroke();
        }
        ctx.beginPath();
        switch(this.lifePieces){
            case 1:
                heartOneThird(15+25*this.lives,SCREEN_HEIGHT-40,10);
                break;
            case 2:
                heartTwoThirds(15+25*this.lives,SCREEN_HEIGHT-40,10);
                break;
        }
        ctx.fill();
        ctx.stroke();
    }
    drawSpell(){
        ctx.fillStyle = "#9d9";
        ctx.strokeStyle = "#090";
        for(let i = 0; i < this.spell; i++){
            ctx.beginPath();
            star(15+25*i,SCREEN_HEIGHT-15,10);
            ctx.fill();
            ctx.stroke();
        }
    }
    kill(){
        if(this.lives > 0){
            this.spell = 3;
        }
        else{
            this.game.deathFrame = this.game.gameFrame;
        }
        this.lives--;
        killAllBullets(this.game);
        this.body.x = SCREEN_WIDTH/2;
        this.body.y = SCREEN_HEIGHT-30;
    }
    reset(){
        this.body = new Circle(SCREEN_WIDTH/2, SCREEN_HEIGHT-30, 8);
        this.lives = 2;
        this.lifePieces = 0;
        this.spell = 2;
        this.shooting = false;
        this.shotDelay = 0;
        this.slow = false;

        this.moveData = {
            w: 0,
            a: 0,
            s: 0,
            d: 0,
        };
    }
}