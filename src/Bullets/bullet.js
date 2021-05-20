import { SCREEN_WIDTH, SCREEN_HEIGHT, ctx } from "/src/screen.js";
import Circle, { doCirclesIntersect } from "/src/hitbox.js";
import { easeIn, lErp } from "/src/math.js";
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

export class EnemyBullet{
    constructor(game,x,y,vx,vy, strokeStyle="#f00", fillStyle="#fff", rad=2){
        this.body = new Circle(x,y,rad);
        this.vx = vx;
        this.vy = vy;
        this.game = game;
        this.fillStyle = fillStyle;
        this.strokeStyle = strokeStyle;
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
    kill(){
        this.lifeStage = lifeStage.dying;
        this.deathFrame = this.game.level.levelTime;
    }
    deleteFun(){
        this.kill();
    }
    intersectsPlayer(){
        return this.lifeStage == lifeStage.life && doCirclesIntersect(this.body, this.game.player.body)
    }
}

export function CreateEnemyBullet0(game,x,y,vel,ang, col0="#f00", col1="#fff", rad=2){
    let bullet = new EnemyBullet(game,x,y,vel*Math.cos(ang),vel*Math.sin(ang),col0,col1,rad);
    game.enemybullets.push(bullet);
    return bullet;
}
export function CreateEnemyBullet1(game,x,y,vx,vy, col0="#f00", col1="#fff", rad=2){
    let bullet = new EnemyBullet(game,x,y,vx,vy,col0,col1,rad);
    game.enemybullets.push(bullet);
    return bullet;
}

export function killAllBullets(game){
    game.enemybullets.forEach(obj => {
        obj.kill();
    });
}
export function deleteAllBullets(game){
    game.enemybullets.forEach(obj => {
        obj.deleteFun();
    });
}