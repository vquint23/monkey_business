class GameHUD extends Phaser.Scene {

	constructor() {
		super({key : 'gameHUD'});
	}

	init(data){
		this.level = data.level;
	}

	preload() {
		this.load.image("healthbar", "../src/assets/Images/health.png");
        this.load.image("healthbase", "../src/assets/Images/healthbase.png");
        this.load.image("pausemenu", "../src/assets/Images/backgrounds/paused.png");
		this.load.image('border', '../src/assets/images/backgrounds/staff_border.png');
		
		this.load.audio("buttonForward", "../src/assets/audio/sfx/button_forward.ogg");
        this.load.audio("buttonBackward", "../src/assets/audio/sfx/button_backward.ogg");
        this.load.audio("GameOverTheme", "../src/assets/audio/music/death.ogg");
        
		
	}

	create() {
		// Current Level
		currentLevel = this.level;

		//Paused 
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
		pauseBG = this.add.sprite(600, 375, "pausemenu")
			.setOrigin(0.5, 0.5)
			.setScale(.45)
			.setVisible(false);

		// pause keys
        this.input.keyboard.on('keyup_Q', this.pauseGame, this);
        this.input.keyboard.on('keyup_ESC', this.unpauseGame, this);
		this.input.keyboard.on('keyup_X', this.menuSwitch, this);
		this.input.keyboard.on('keyup_L', this.levelSwitch, this);
	
		
		// Staff Border
		var border = this.add.sprite(0,0,'border')
            .setOrigin(0,0)
			.setDisplaySize(1200, 750);

		//Listeners for events (health change, win, lose)
        //this.level.events.on('levelWin', this.winDisplay, this);
        //this.level.events.on('takeDmg', this.redrawHealth, this);
        //this.level.events.on('gameOver', this.loseDisplay, this)        
	}

	pauseGame(){
		if(!paused){
			this.scene.pause(currentLevel);
			buttin.play();
			pauseBG.setVisible(true);       
			paused = true;
		}
	}
	
    unpauseGame(){
		if(paused){
			paused = false;
			this.scene.resume(currentLevel);
			buttout.play();
			pauseBG.setVisible(false);
		}
	}

	menuSwitch(){
		if(paused){
			this.scene.stop(currentLevel);
			this.scene.switch('menuScene');
			this.scene.stop();
		}
	}

	levelSwitch(){
		if(paused){
			this.scene.stop(currentLevel);
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

var currentLevel, buttin, buttout, pauseBG, paused;

export default GameHUD;