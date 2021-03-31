import { SCREEN_WIDTH, SCREEN_HEIGHT } from "/src/screen.js";
import * as mth from "/src/math.js";
import { EnemyBullet0 } from "/src/bullet.js";
import { BulletAIAccelerate } from "/src/bulletai.js";

export default class BossPhase0_2{
    constructor(game){
        this.game = game;

        this.time = -130;
        this.ang = mth.randomUniform(0,Math.PI/5);
    }
    init(){
        this.boss = this.game.level.boss;

        this.start = {
            x: this.boss.body.x,
            y: this.boss.body.y,
        };
    }
    update(){
        this.time++;
        if(this.boss.health < 1400){
            this.boss.nextPhase();
            return;
        }
        this.updateBoss(this.time);
        this.updateBullets(this.time);
    }
    updateBoss(total){
        if(total < 0)
        return;
        if(total%180 < 40)
        {
            this.boss.body.x = mth.easeIn(this.start.x,3*SCREEN_WIDTH/4,(total%180)/40);
            this.boss.body.y = mth.easeIn(this.start.y,130,(total%180)/40);
            return;
        }
        if(total%180 < 80)
        {
            this.boss.body.x = mth.easeIn(3*SCREEN_WIDTH/4,SCREEN_WIDTH/4,(total%180-40)/40);
            return;
        }
        if(total%180 < 120)
        {
            this.boss.body.x = mth.easeIn(SCREEN_WIDTH/4,SCREEN_WIDTH/2,(total%180-80)/40);
            this.boss.body.y = mth.easeIn(130,200,(total%180-80)/40);
            return;
        }
    }
    updateBullets(total){
        if(total < -10){
            if(total%4 == 0){
                for(let j = 0; j < 18; j++){
                    let bullet = new EnemyBullet0(this.game, 
                        this.boss.body.x, this.boss.body.y,
                        25, mth.angleAtoB(this.boss.body,this.game.player.body)+j*Math.PI/9,
                        "#060","#0f0",10);
                    bullet.ai = new BulletAIAccelerate(bullet,2,30);
                    this.game.enemybullets.push(bullet);
                }
            }
            return;
        }
        if(total == -10){
            this.ang = mth.angleAtoB(this.boss.body, this.game.player.body);
            return;
        }
        if(total < 0){
            if(total%2 == 0){
                for(let j = 0; j < 36; j++){
                    this.game.enemybullets.push(new EnemyBullet0(this.game, 
                        this.boss.body.x + 20*Math.cos(this.ang+j*Math.PI/18),
                        this.boss.body.y + 20*Math.sin(this.ang+j*Math.PI/18),
                        15, this.ang+j*Math.PI/18,
                        "#fff","#0f0",5));
                }
            }
            return;
        }
        if(total%180 == 0)
        {
            this.ang = mth.randomUniform(0,Math.PI/5);
            return;
        }
        if(total%180 < 40)
        {
            if(total%4 == 0){
                for(let j = 0; j < 10; j++){
                    this.game.enemybullets.push(new EnemyBullet0(this.game, 
                        this.boss.body.x, this.boss.body.y,
                        1+(total%180)/8, this.ang+j*Math.PI/5,
                        "#fff","#f70",3));
                }
                this.ang+=0.06;
            }
            return;
        }
        if(total%180 < 80)
        {
            if(total%2 == 0){
                for(let j = 0; j < 2; j++){
                    this.game.enemybullets.push(new EnemyBullet0(this.game, 
                        this.boss.body.x, this.boss.body.y,
                        3+j, mth.lErp(0,Math.PI,(total%180-40)/40),
                        "#fff","#f70",3));
                    this.game.enemybullets.push(new EnemyBullet0(this.game, 
                        this.boss.body.x, this.boss.body.y,
                        3+j, mth.lErp(0,-Math.PI,(total%180-40)/40),
                        "#fff","#f70",3));
                }
            }
            return;
        }
        if(total%180 < 120)
        {
            if(total%4 == 0){
                for(let j = 0; j < 10; j++){
                    this.game.enemybullets.push(new EnemyBullet0(this.game, 
                        this.boss.body.x, this.boss.body.y,
                        1+(total%180-80)/8, this.ang+j*Math.PI/5,
                        "#fff","#f70",3));
                }
                this.ang-=0.06;
            }
            return;
        }
    }
}