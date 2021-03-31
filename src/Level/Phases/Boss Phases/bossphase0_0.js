import { SCREEN_WIDTH, SCREEN_HEIGHT } from "/src/screen.js";
import * as mth from "/src/math.js";
import { EnemyBullet0 } from "/src/bullet.js";

export default class BossPhase0_0{
    constructor(game){
        this.game = game;

        this.time = -60;
        this.ang = mth.randomUniform(0,Math.PI/12);
    }
    init(){
        this.boss = this.game.level.boss;
    }
    update(){
        this.time++;
        if(this.boss.health < 2800){
            this.boss.nextPhase();
            return;
        }
        this.updateBoss(this.time);
        this.updateBullets(this.time);
    }
    updateBoss(total){
        if(total < 0)
        this.boss.body.y = mth.easeIn(-12,100,1+total/60);
        else if(120 < total && total < 180){
            this.boss.body.x = SCREEN_WIDTH/2+SCREEN_WIDTH/5*Math.sin(mth.easeOut(0,0.4,(total-120)/60));
            this.boss.body.y = 150-50*Math.cos(mth.easeOut(0,0.4,(total-120)/60));
        }
        else if(total > 180){
            this.boss.body.x = SCREEN_WIDTH/2+SCREEN_WIDTH/5*Math.sin(0.4*(1+(total-180)/30));
            this.boss.body.y = 150-50*Math.cos(0.4*(1+(total-180)/30));
        }

    }
    updateBullets(total){
        if(total < 6*20){
            for(let i = 0; i < 20; i++){
                if(total==6*i){
                    for(let j = 0; j < 24; j++){
                        this.game.enemybullets.push(new EnemyBullet0(this.game, 
                            this.boss.body.x + 20*Math.cos(this.ang+j*Math.PI/12),
                            this.boss.body.y + 20*Math.sin(this.ang+j*Math.PI/12),
                            (1+i), this.ang+j*Math.PI/12,
                            "#600","#f00",10));
                    }
                }
            }
            if(total==6*19){
                for(let i = 0; i < 15; i++){
                    for(let j = 0; j < 24; j++){
                        this.game.enemybullets.push(new EnemyBullet0(this.game, 
                            this.boss.body.x + 20*Math.cos(this.ang+(j+0.5)*Math.PI/12),
                            this.boss.body.y + 20*Math.sin(this.ang+(j+0.5)*Math.PI/12),
                            (1+i), this.ang+(j+0.5)*Math.PI/12,
                            "#603","#f07",8));
                    }
                }
            }
            return;
        }
        if(total > 6*30){
            if(Math.floor(total/20)-Math.floor((total-1)/20)){
                for(let i = 0; i < 5; i++){
                    for(let j = 0; j < 5; j++){
                        this.game.enemybullets.push(new EnemyBullet0(this.game, 
                        this.boss.body.x + 20*Math.cos(this.ang+2*i*Math.PI/5),
                        this.boss.body.y + 20*Math.sin(this.ang+2*i*Math.PI/5),
                        1+2*j/3, this.ang+2*i*Math.PI/5,
                        "#fff",`hsl(${72*i},100%,50%)`));
                    }
                }
                this.ang+=1;
            }
            return;
        }
    }
}