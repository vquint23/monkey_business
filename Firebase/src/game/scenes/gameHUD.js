class GameHUD extends Phaser.Scene {

	constructor() {
		super({key : 'gameHUD'});
	}

	preload() {
		this.load.image("healthbar", "../src/assets/Images/health.png");
        this.load.image("healthbase", "../src/assets/Images/healthbase.png");
        this.load.image("pausemenu", "../src/assets/Images/pausemenu.png");
		this.load.image('border', '../src/assets/images/backgrounds/staff_border.png');
        
		
	}

	create() {
		var border = this.add.sprite(0,0,'border')
            .setOrigin(0,0)
			.setDisplaySize(1200, 750);

		//Healthbar
        var healthbase = this.add.image(900, 90, "healthbase");
        healthbase.setOrigin(.5,.5);
		healthbase.setScale(.3);
		var healthbar = this.add.image(900, 90, "healthbar");
        healthbar.setOrigin(.5,.5);
        healthbar.setScale(.3);
        
	}
	
	winDisplay(){
       
    }

    redrawHealth(){
        
    }

    loseDisplay(){
       
    }

    pauseMenu(){

    }
    unpauseGame(){

    }

}

export default GameHUD;