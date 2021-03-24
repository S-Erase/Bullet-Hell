import Game, {gameState} from "./game.js";
import { PauseMenu } from "./menu.js";
import BossPhase0_2 from "./Level/Phases/Boss Phases/bossphase0_2.js";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "/src/screen.js";
import { deleteAllBullets } from "./bullet.js";

var game = new Game();

var keyCodes = {
	up: 38,
	left: 37,
	down: 40,
	right: 39,
	Z: 90,
	X: 88,
	C: 67,
	R: 82,
	lShift: 16,
	esc: 27,
}

function HandleEvents(){
	/*document.addEventListener("keypress", function(event){
		switch(game.state){
			case gameState.Running:
				if(event.key == 'c')
				{
					deleteAllBullets(game);
					game.level.phase = new BossPhase0_2(game);
					game.boss.body.x = SCREEN_WIDTH/2;
					game.boss.body.y = 200;
				}
				break;
		}
	});*/
	document.addEventListener("keydown", function(event){
		switch(game.state){
			case gameState.Intro:
				switch(event.keyCode){
					case keyCodes.up:
						game.menu.prev();
						break;
					case keyCodes.down:
						game.menu.next();
						break;
					case keyCodes.Z:
						game.menu.select();
						break;
				}
				break;
			case gameState.Running:
				if(event.keyCode == keyCodes.up) //up arrow
				game.player.moveData.w = 1;
				if(event.keyCode == keyCodes.left) //<-
				game.player.moveData.a = 1;
				if(event.keyCode == keyCodes.down) //down arrow
				game.player.moveData.s = 1;
				if(event.keyCode == keyCodes.right) //->
				game.player.moveData.d = 1;
				if(event.keyCode == keyCodes.Z) //z
				game.player.shooting = true;
				if(event.keyCode == keyCodes.lShift) //lshift
				game.player.slow = true;
				break;
			case gameState.Paused:
				switch(event.keyCode){
					case keyCodes.up:
						game.menu.prev();
						break;
					case keyCodes.down:
						game.menu.next();
						break;
					case keyCodes.Z:
						game.menu.select();
						break;
					case keyCodes.R:
						game.restartLevel();
				}
				break;
			case gameState.GameOver:
				switch(event.keyCode){
					case keyCodes.up:
						game.menu.prev();
						break;
					case keyCodes.down:
						game.menu.next();
						break;
					case keyCodes.Z:
						game.menu.select();
						break;
					case keyCodes.R:
						game.restartLevel();
				}
				break;
		}
		if(event.keyCode == keyCodes.esc) //esc
		{
			switch(game.state){
				case gameState.Running:
					game.state = gameState.Paused;
					game.menu = new PauseMenu(game);
					break;
				case gameState.Paused:
					game.state = gameState.Running;
					game.menu = null;
					break;
			}
		}
	});
	document.addEventListener("keyup", function(event){
		
		switch(game.state){
			case gameState.Running:
				if(event.keyCode == keyCodes.up)
				game.player.moveData.w = 0;
				if(event.keyCode == keyCodes.left)
				game.player.moveData.a = 0;
				if(event.keyCode == keyCodes.down)
				game.player.moveData.s = 0;
				if(event.keyCode == keyCodes.right)
				game.player.moveData.d = 0;
				if(event.keyCode == keyCodes.Z) 
				game.player.shooting = false;
				if(event.keyCode == keyCodes.lShift) //lshift
				game.player.slow = false;
				break;
		}
	});
}

function Loop(timeStamp){
	HandleEvents();
	game.Update();
	game.Draw();
	
	requestAnimationFrame(Loop);
}

Loop(0);