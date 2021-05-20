import { SCREEN_WIDTH, SCREEN_HEIGHT } from "/src/screen.js";
import { doesCircleIntersectLine } from "/src/hitbox.js";
import * as mth from "/src/math.js";

export var CtsLaserState = {
    growing: 0,
    static: 1,
    moving: 2,
};

export default class CtsLaserAIDefault{
    constructor(laser, life, enemy){
        this.laser = laser;
        this.enemyid = enemy.id;
        this.game = laser.game;
        this.state = CtsLaserState.growing;
        this.life = life;
    }
    update(){
        if(this.game.enemies.find(obj => (obj.id == this.enemyid)) == undefined){
            this.laser.attached = false;
            this.state = CtsLaserState.moving;
        }
        switch(this.state){
            case CtsLaserState.growing:
                this.laser.body.dx += this.laser.vx;
                this.laser.body.dy += this.laser.vy;

                if (this.laser.body.y + this.laser.body.dy < -this.bullet.body.radius){this.state = CtsLaserState.static;}
                else if (this.laser.body.y + this.laser.body.dy > SCREEN_HEIGHT + this.bullet.body.radius){this.state = CtsLaserState.static;}
                else if (this.laser.body.x + this.laser.body.dx < -this.bullet.body.radius){this.state = CtsLaserState.static;}
                else if (this.laser.body.x + this.laser.body.dx > SCREEN_WIDTH + this.bullet.body.radius){this.state = CtsLaserState.static;}
                break;
            case CtsLaserState.moving:
                this.laser.body.x += this.laser.vx;
                this.laser.body.y += this.laser.vy;

                if (this.laser.body.y + this.laser.body.dy < -this.bullet.body.radius){this.laser.delete = true;}
                else if (this.laser.body.y + this.laser.body.dy > SCREEN_HEIGHT + this.bullet.body.radius){this.laser.delete = true;}
                else if (this.laser.body.x + this.laser.body.dx < -this.bullet.body.radius){this.laser.delete = true;}
                else if (this.laser.body.x + this.laser.body.dx > SCREEN_WIDTH + this.bullet.body.radius){this.laser.delete = true;}
                break;
        }
    }
}