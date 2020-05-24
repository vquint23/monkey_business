class TitleScene extends Phaser.Scene {

	constructor() {
		super({key:'titleScene'});
	}

	preload() {
        this.load.image('border', '../src/assets/images/backgrounds/staff_border.png');
        this.load.image('background', '../src/assets/images/backgrounds/sky_bg.png');
        this.load.image('logo', '../src/assets/logo.png');
	}

	create() {
        var gameHeight = this.game.config.height;
        var gameWidth = this.game.config.width;
        
        var bg = this.add.sprite(55, 45, 'background');
          bg.setOrigin(0, 0);
          bg.setDisplaySize(1075, 650);

		var border = this.add.sprite(0,0,'border');
          border.setOrigin(0,0);
          border.setDisplaySize(1200, 750);

        var logo = this.add.sprite(gameWidth/2, gameHeight/3, 'logo');
          logo.setOrigin(0.5,0.5);
          logo.setDisplaySize(700, 500);

        var textConfig = {
            fontSize: '64px',
            color: '#000',
            align: 'center'
        }
        var startText = this.add.text(gameWidth/2, gameHeight/1.5, "Click to Start!", textConfig);
        startText.setOrigin(0.5, 0);
        
	}

}

export default TitleScene;