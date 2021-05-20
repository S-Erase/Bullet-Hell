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

        this.enemycount = 0;
        this.enemybullets = [];
        this.enemies = [];

        this.items = [];

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
            this.enemies.forEach(obj => obj.update());
            this.enemies = this.enemies.filter(obj => !obj.delete);
            this.playerbullets.forEach(obj => obj.update());
            this.playerbullets = this.playerbullets.filter(obj => !obj.delete);
            this.enemybullets.forEach(obj => obj.update());
            this.enemybullets = this.enemybullets.filter(obj => !obj.delete);
            this.items.forEach(obj => obj.update());
            this.items = this.items.filter(obj => !obj.delete);
            
            if(this.enemybullets.find(obj => obj.intersectsPlayer()) != undefined){
                this.player.kill();
            }

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
        if(this.level !== null && this.level.boss.active)
        this.level.boss.drawGrid();

        //Game objects
        this.player.drawPlayer();
        this.items.forEach(obj => obj.draw());
        if(this.level !== null && this.level.boss.active)
        this.level.boss.drawBoss();
        this.playerbullets.forEach(obj => obj.draw());

        this.enemybullets.forEach(obj => obj.draw());
        this.enemies.forEach(obj => obj.draw());


        //UI
        ctx.globalAlpha = 1;
        if(this.level !== null && this.level.boss.active)
        this.level.boss.drawHealth();
        this.player.drawLives();
        this.player.drawSpell();

        if(this.menu !== null)
        this.menu.draw();
    }
    restartLevel(){
        this.player.reset();
        this.playerbullets.length = 0;
        this.enemybullets.length = 0;
        this.enemies.length = 0;
        this.items.length = 0;
        this.state = gameState.Running;
        this.level = new Level0(this);
        this.level.init();
        this.menu = null;
        this.gameFrame = 0;
        this.deathFrame = undefined;
    }
    restartGame(){
        this.player.reset();
        this.playerbullets.length = 0;
        this.enemybullets.length = 0;
        this.enemies.length = 0;
        this.items.length = 0;
        this.state = gameState.Intro;
        this.level = null;
        this.menu = new IntroMenu(this);
        this.gameFrame = 0;
        this.deathFrame = undefined;
    }
}