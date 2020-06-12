import EventsDispatcher from '../EventsDispatcher.js';
import Player from '../Player.js';

class GameHUD extends Phaser.Scene {
	Level;
	constructor() {
		super({key : 'gameHUD'});
	}

	init(data){
		this.Level = data;
	}

	preload() {}

	create() {
		//Event Dispatcher
		eventDispatcher = EventsDispatcher.getInstance();   

		//Current Level
		currentLevel = this.scene.get(this.Level);

		//Deathed???
		deathed = false;

		//Winned???
		winned = false;

		//Paused? 
		paused = false;
		
		//Sound Effects
		buttin = this.sound.add("buttonForward");
		buttout = this.sound.add("buttonBackward");

		//Healthbar
        healthbase = this.add.image(900, 90, "healthbase")
        	.setOrigin(.5,.5)
			.setScale(.3);
		healthbar = this.add.image(900, 90, "healthbar")
        	.setOrigin(.5,.5)
			.setScale(.3);
		  
		//Pause Menu
		var menuTextConfig = {
            fontSize: '64px',
            color: '#000',
        }
        var headerTextConfig = {
            fontSize: '48px',
            color: '#000',
		}
		
		pauseBG = this.add.sprite(600, 375, "pausedBG")
			.setOrigin(0.5, 0.5)
			.setScale(.45)
			.setVisible(false);
		
		pausedHeader = this.add.text(510, 105, "PAUSED", menuTextConfig)
			.setVisible(false);
		escText = this.add.text(500, 240, "Resume", headerTextConfig)
			.setVisible(false);
		xText = this.add.text(500, 370, "Main Menu", headerTextConfig)
			.setVisible(false);
		lText = this.add.text(500, 500, "Level Select", headerTextConfig)
			.setVisible(false);
		
		// pause keys
        this.input.keyboard.on('keyup_Q', this.pauseGame, this);
        this.input.keyboard.on('keyup_ESC', this.unpauseGame, this);
		this.input.keyboard.on('keyup_X', this.menuSwitch, this);
		this.input.keyboard.on('keyup_L', this.levelSwitch, this);
		this.input.keyboard.on('keyup_ENTER', this.continue, this);
	
		//Win Stuff                                                                                                     
        wintext = this.add.text(600, 200, 'LEVEL COMPLETE!',
        {fontSize: '64px', fill: '#fff'})
        	.setOrigin(.5, .5)
        	.setVisible(false);
        //Lose Stuff
        gameOverText = this.add.text(600, 200, 'GAME OVER', 
        {fontSize: '64px', fill: '#c70707'})
        	.setOrigin(.5, .5)
        	.setVisible(false);
        // Restart 
        restartText = this.add.text(400, 500, 'PRESS ENTER TO RESTART', 
        {fontSize: '32px', fill: '#fff'})
        	.setVisible(false);
        //Continue 
        continueText = this.add.text(400, 500, 'PRESS ENTER TO CONTINUE', 
        {fontSize: '32px', fill: '#fff'})
        	.setVisible(false);
		
		// Staff Border
		var border = this.add.sprite(0,0,'staffBorder')
            .setOrigin(0,0)
			.setDisplaySize(1200, 750);

		//Listeners for events (health change, win, lose)
		eventDispatcher.on('levelWin', this.winDisplay, this);
		eventDispatcher.on('tookDmg', this.redrawHealth, this);
		eventDispatcher.on('gameOver', this.loseDisplay, this);      
		eventDispatcher.on('invincible', this.invincible, this);  
	}

	pauseGame(){
		if(!paused){
			this.scene.pause(currentLevel);
			buttin.play();
			pauseBG.setVisible(true);   
			pausedHeader.setVisible(true);    
			escText.setVisible(true);
			xText.setVisible(true);
			lText.setVisible(true);
			paused = true;
		}
	}
	
    unpauseGame(){
		if(paused){
			this.scene.resume(currentLevel);
			buttout.play();
			pauseBG.setVisible(false);
			pausedHeader.setVisible(false);
			escText.setVisible(false);
			xText.setVisible(false);
			lText.setVisible(false);
			paused = false;
		}
	}

	menuSwitch(){
		if(paused){
			this.sound.stopAll();
			currentLevel.sys.shutdown();
			this.scene.switch('menuScene');
			this.scene.stop();
		}
	}

	levelSwitch(){
		if(paused){
			this.sound.stopAll();
			currentLevel.sys.shutdown();
			this.scene.switch('levelsScene');
			this.scene.stop();
		}
	}

	continue(){
		if(deathed){
			buttin.play();
			currentLevel.sound.stopAll();
			this.scene.stop(currentLevel);
			this.scene.start(currentLevel);
			this.scene.restart();
			deathed = false;
		}
		else{
			buttin.play();
			currentLevel.sound.stopAll();
			// eventsDispatcher.emit('unlockNextsLevel');
			this.scene.stop(currentLevel);
			this.scene.switch('levelSelect');
		}
	}
		
	winDisplay(){
		wintext.setVisible(true);
        continueText.setVisible(true);
        winned = true;
    }

    redrawHealth(health){
        // if taken 20 damage, healthbar is at 80% width, etc.
        if (health <= 0){
            healthbar.destroy();
        }
        healthbar.setScale((.3 *health/100), .3);
    }

    loseDisplay(){
		if(!deathed) {
            gameOverText.setVisible(true);
            restartText.setVisible(true);
            currentLevel.sound.stopAll();
            let deathMusic = this.sound.add("GameOverTheme");
            let musicConfig = {
                mute: false,
                volume: 0.5,
                loop: false,
                delay: 0
            };
            deathMusic.play(musicConfig);
            deathed = true;
        }
	}
	
	invincible(){
		var invincibleText = this.add.text(500, 50, 'Invincible!', 
        {fontSize: '28px', fill: '#fff'})
	}

}

var buttin, buttout, currentLevel, deathed, eventDispatcher, healthbase, healthbar,
pauseBG, paused, pausedHeader, winned, 
wintext, gameOverText, restartText, continueText,
escText, xText, lText;

export default GameHUD;