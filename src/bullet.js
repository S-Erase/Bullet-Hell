import { SCREEN_WIDTH, SCREEN_HEIGHT, ctx } from "./screen.js";
import Circle, { doCirclesIntersect } from "./circle.js";
import { easeIn, lErp } from "./math.js";
import BulletAIDefault from "./bulletai.js";

export class PlayerBullet{
    constructor(game,dx=0,dy=0,ang=-Math.PI/2){
        this.game = game;
        this.body = new Circle(game.player.body.x+dx, game.player.body.y+dy, 3);
        this.vx = 20*Math.cos(ang);
        this.vy = 20*Math.sin(ang);
        this.delete = false;
    }
    update(){
        this.body.x += this.vx;
        this.body.y += this.vy;
        if (this.body.y < -this.body.radius){this.delete = true;}
        else if (this.body.x < -this.body.radius){this.delete = true;}
        else if (this.body.y > SCREEN_HEIGHT+this.body.radius){this.delete = true;}
        else if (this.body.x > SCREEN_WIDTH+this.body.radius){this.delete = true;}
        else if (this.game.level !== null && this.game.level.boss.active){
            if(doCirclesIntersect(this.body, this.game.level.boss.body)){
                this.delete = true;
                if(this.game.level.boss.health > 0)
                this.game.level.boss.health -= 1;
            }
        }
    }
    draw(){
		ctx.beginPath();
		ctx.fillStyle = "#fff";
		ctx.arc(this.body.x, this.body.y, this.body.radius, 0, 2 * Math.PI);
		ctx.fill();
    }
}

export var lifeStage = {
    birth: 0,
    life: 1,
    dying: 2,
};

export class EnemyBullet0{
    constructor(game,x,y,vel,ang, col0="#fff", col1="#f00", rad=2){
        this.body = new Circle(x,y,rad);
        this.vx = vel*Math.cos(ang);
        this.vy = vel*Math.sin(ang);
        this.game = game;
        this.fillStyle = col0;
        this.strokeStyle = col1;
        this.lifeStage = lifeStage.birth;
        this.delete = false;
        this.birthFrame = game.level.levelTime;
        this.birthPhase = 10;
        this.deathFrame = null;
        this.ai = new BulletAIDefault(this);
    }
    update(){
        if(this.lifeStage != lifeStage.dying){
            if(this.ai !== null)
            this.ai.update();

            if(this.lifeStage == lifeStage.birth){
                let life = this.game.level.levelTime - this.birthFrame;
                if(life >= this.birthPhase)
                this.lifeStage = lifeStage.life;
            }
        }
        else{
            let life = this.game.level.levelTime - this.deathFrame;
            this.body.y -= (10-life)/10;
            if(life >= 10)
            this.delete = true;
        }
    }
    draw(){
		ctx.beginPath();
        let drawRadius = this.body.radius+3;
        let drawOpacity = 1;
        if(this.lifeStage == lifeStage.birth){
            let life = this.game.level.levelTime - this.birthFrame;
            drawRadius *= easeIn(2,1,life/this.birthPhase);
            drawOpacity = easeIn(0,1,life/this.birthPhase);;
        }
        else if(this.lifeStage == lifeStage.dying){
            let life = this.game.level.levelTime - this.deathFrame;
            drawRadius *= lErp(1,3,life/10);
            drawOpacity = lErp(1,0,life/10);;
        }
		ctx.arc(this.body.x, this.body.y, drawRadius, 0, 2 * Math.PI);
        if(this.lifeStage != lifeStage.dying){
            ctx.fillStyle = this.fillStyle;
		    ctx.fill(); 
        }
		
        ctx.globalAlpha = drawOpacity;
		ctx.strokeStyle = this.strokeStyle;
		ctx.stroke();
    }
}
export class EnemyBullet1{
    constructor(game,x,y,vx,vy, col0="#fff", col1="#f00", rad=2){
        this.body = new Circle(x,y,rad);
        this.vx = vx;
        this.vy = vy;
        this.game = game;
        this.fillStyle = col0;
        this.strokeStyle = col1;
        this.lifeStage = lifeStage.birth;
        this.delete = false;
        this.birthFrame = game.level.levelTime;
        this.birthPhase = 10;
        this.deathFrame = null;
        this.ai = new BulletAIDefault(this);
    }
    update(){
        if(this.lifeStage != lifeStage.dying){
            if(this.ai !== null)
            this.ai.update();

            if(this.lifeStage == lifeStage.birth){
                let life = this.game.level.levelTime - this.birthFrame;
                if(life >= this.birthPhase)
                this.lifeStage = lifeStage.life;
            }
        }
        else{
            let life = this.game.level.levelTime - this.deathFrame;
            this.body.y -= (10-life)/10;
            if(life >= 10)
            this.delete = true;
        }
    }
    draw(){
		ctx.beginPath();
        let drawRadius = this.body.radius+3;
        let drawOpacity = 1;
        if(this.lifeStage == lifeStage.birth){
            let life = this.game.level.levelTime - this.birthFrame;
            drawRadius *= easeIn(2,1,life/this.birthPhase);
            drawOpacity = easeIn(0,1,life/this.birthPhase);;
        }
        else if(this.lifeStage == lifeStage.dying){
            let life = this.game.level.levelTime - this.deathFrame;
            drawRadius *= lErp(1,3,life/10);
            drawOpacity = lErp(1,0,life/10);;
        }
		ctx.arc(this.body.x, this.body.y, drawRadius, 0, 2 * Math.PI);
        if(this.lifeStage != lifeStage.dying){
            ctx.fillStyle = this.fillStyle;
		    ctx.fill(); 
        }
		
        ctx.globalAlpha = drawOpacity;
		ctx.strokeStyle = this.strokeStyle;
		ctx.stroke();
    }
}

export function deleteAllBullets(game){
    game.enemybullets.forEach(obj => {
        obj.lifeStage = lifeStage.dying;
        obj.deathFrame = game.level.levelTime;
    });
}