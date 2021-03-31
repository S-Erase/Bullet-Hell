import { SCREEN_WIDTH, SCREEN_HEIGHT, ctx } from "./screen.js";
import { gameState } from "./game.js";
import Level0 from "./Level/level0.js";

export class IntroMenu{
    constructor(game){
        this.game = game;
        this.options = ["Start","Settings"];
        this.index = 0;
    }
    next(){
        this.index++;
        this.index %= this.options.length;
    }
    prev(){
        this.index--;
        this.index = this.index < 0 ? this.index+= this.options.length : this.index;
    }
    select(){
        switch(this.index){
            case 0:
                if(this.game.gameFrame>10){
                    this.game.state = gameState.Running;
                    this.game.level = new Level0(this.game);
                    this.game.level.init();
                    this.game.menu = null;
                }
                break;
            case 1:
                break;
        }
    }
    draw(){
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#000";
        ctx.fillRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
        ctx.fillStyle = "#fff";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        for(let i in this.options){
            if(i == this.index)
            ctx.fillStyle = "#fff";
            else
            ctx.fillStyle = "#888";
            ctx.fillText(this.options[i], SCREEN_WIDTH/2, 400+40*+i);
        }
    }
}

export class PauseMenu{
    constructor(game){
        this.game = game;
        this.options = ["Continue","Restart","Exit"];
        this.index = 0;
    }
    next(){
        this.index++;
        this.index %= this.options.length;
    }
    prev(){
        this.index--;
        this.index = this.index < 0 ? this.index+= this.options.length : this.index;
    }
    select(){
        switch(this.index){
            case 0:
                this.game.state = gameState.Running;
                this.game.menu = null;
                break;
            case 1:
                this.game.restartLevel();
                break;
            case 2:
                this.game.restartGame();
                break;
        }
    }
    draw(){
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "#000";
        ctx.fillRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#fff";
        ctx.font = "30px Arial";
        ctx.textAlign = "left";
        for(let i in this.options){
            if(i == this.index)
            ctx.fillStyle = "#fff";
            else
            ctx.fillStyle = "#888";
            ctx.fillText(this.options[i], 200+20*+i, 400+40*+i);
        }
    }
}

export class GameOverMenu{
    constructor(game){
        this.game = game;
        this.options = ["Restart","Exit"];
        this.index = 0;
    }
    next(){
        this.index++;
        this.index %= this.options.length;
    }
    prev(){
        this.index--;
        this.index = this.index < 0 ? this.index+= this.options.length : this.index;
    }
    select(){
        switch(this.index){
            case 0:
                this.game.restartLevel();
                break;
            case 1:
                this.game.restartGame();
                break;
        }
    }
    draw(){
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "#000";
        ctx.fillRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#fff";
        ctx.font = "30px Arial";
        ctx.textAlign = "left";
        for(let i in this.options){
            if(i == this.index)
            ctx.fillStyle = "#fff";
            else
            ctx.fillStyle = "#888";
            ctx.fillText(this.options[i], 200+20*+i, 400+40*+i);
        }
    }
}