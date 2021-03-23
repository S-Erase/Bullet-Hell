import { SCREEN_WIDTH, SCREEN_HEIGHT, ctx } from "./screen.js";
import Player from "./player.js";
import Level0 from "./Level/level0.js";
import { GameOverMenu, IntroMenu } from "./menu.js";


export var gameState = {
    Intro: 0,
    Running: 1,
    Paused: 2,
    GameOver: 3,
}


export default class Game{
    constructor(){
        this.player = new Player(this);
        this.playerbullets = [];
        this.boss = null;
        this.enemybullets = [];
        this.state = gameState.Intro;

        this.level = null;
        this.menu = new IntroMenu(this);

        this.gameFrame = 0; //in frames
        this.deathFrame = undefined;
    }
    Update(){
        this.gameFrame++;
        if(this.state == gameState.Running)
        {
            this.player.update();
            this.playerbullets.forEach(obj => obj.update());
            this.playerbullets = this.playerbullets.filter(obj => !obj.delete);
            this.enemybullets.forEach(obj => obj.update());
            this.enemybullets = this.enemybullets.filter(obj => !obj.delete);
            
            if(this.level !== null)
            this.level.update();

            if(this.gameFrame - this.deathFrame > 20){
                this.state = gameState.GameOver;
                this.menu = new GameOverMenu(this);
            }
        }
        
    }
    Draw(){
        ctx.globalAlpha = 1;
        ctx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
        //Background
        ctx.fillStyle = "#222";
        ctx.fillRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
        if(this.boss !== null)
        this.boss.drawGrid();

        //Game objects
        this.player.drawPlayer();
        if(this.boss !== null)
        this.boss.drawBoss();
        this.playerbullets.forEach(obj => obj.draw());
        this.enemybullets.forEach(obj => obj.draw());

        //UI
        ctx.globalAlpha = 1;
        if(this.boss !== null)
        this.boss.drawHealth();
        this.player.drawLives();
        this.player.drawSpell();

        if(this.menu !== null)
        this.menu.draw();
    }
    restartLevel(){
        this.player.reset();
        this.playerbullets.length = 0;
        this.boss = null;
        this.enemybullets.length = 0;
        this.state = gameState.Running;
        this.level = new Level0(this);
        this.menu = null;
        this.gameFrame = 0;
        this.deathFrame = undefined;
    }
    restartGame(){
        console.log("1");
        this.player.reset();
        this.playerbullets.length = 0;
        this.boss = null;
        this.enemybullets.length = 0;
        this.state = gameState.Intro;
        this.level = null;
        this.menu = new IntroMenu(this);
        this.gameFrame = 0;
        this.deathFrame = undefined;
    }
}