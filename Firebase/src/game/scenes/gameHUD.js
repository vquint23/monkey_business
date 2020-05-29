class GameHUD extends Phaser.Scene {
	level;
	constructor() {
		super({key : 'gameHUD'});
	}

	init(data){
		this.level = data.level;
	}

	preload() {}

	create() {
		//Paused? 
		paused = false;
		
		//Sound Effects
		buttin = this.sound.add("buttonForward");
		buttout = this.sound.add("buttonBackward");

		//Healthbar
        var healthbase = this.add.image(900, 90, "healthbase");
        healthbase.setOrigin(.5,.5);
		healthbase.setScale(.3);
		var healthbar = this.add.image(900, 90, "healthbar");
        healthbar.setOrigin(.5,.5);
		healthbar.setScale(.3);
		  
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
	
		
		// Staff Border
		var border = this.add.sprite(0,0,'staffBorder')
            .setOrigin(0,0)
			.setDisplaySize(1200, 750);

		//Listeners for events (health change, win, lose)
        //this.level.events.on('levelWin', this.winDisplay, this);
        //this.level.events.on('takeDmg', this.redrawHealth, this);
        //this.level.events.on('gameOver', this.loseDisplay, this)        
	}

	pauseGame(){
		if(!paused){
			this.scene.pause(this.level);
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
			this.scene.resume(this.level);
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
			this.level.sys.shutdown();
			this.scene.switch('menuScene');
			this.scene.stop();
		}
	}

	levelSwitch(){
		if(paused){
			this.sound.stopAll();
			this.level.sys.shutdown();
			this.scene.switch('levelsScene');
			this.scene.stop();
		}
	}
		
	winDisplay(){
       
    }

    redrawHealth(){
        
    }

    loseDisplay(){
       
    }

}

var buttin, buttout, pauseBG, paused, pausedHeader, escText, xText, lText;

export default GameHUD;