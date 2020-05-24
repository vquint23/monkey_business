class TitleScene extends Phaser.Scene {

	constructor() {
		super({key:'titleScene'});
	}

	preload() {
        this.load.image('border', '../src/assets/images/backgrounds/staff_border.png');
        this.load.image('background', '../src/assets/images/backgrounds/sky_bg.png');
        this.load.image('logo', '../src/assets/logo.png');

        this.load.audio("titleMusic", '../src/assets/audio/music/titlescreen.ogg');
	}

	create() {
        var gameHeight = this.game.config.height;
        var gameWidth = this.game.config.width;
        
        var bg = this.add.sprite(55, 45, 'background')
            .setOrigin(0, 0)
            .setDisplaySize(1075, 650);

		var border = this.add.sprite(0,0,'border')
            .setOrigin(0,0)
            .setDisplaySize(1200, 750);

        var logo = this.add.sprite(gameWidth/2, gameHeight/3, 'logo')
            .setOrigin(0.5,0.5)
            .setScale(.4);

        var textConfig = {
            fontSize: '64px',
            fontStyle: 'bold',
            color: '#000',
        }

        var startText = this.add.text(gameWidth/4, gameHeight/1.5, "Click to Start!", textConfig)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => startText.setColor("#fff") )
            .on('pointerout', () => startText.setColor("#000") )
            .on('pointerdown', () => this.scene.switch('menuScene') );
        
        var musicConfig = {
            mute: false,
            volume: 0.5,
            loop: true,
            delay: 0
        };

        var music = this.sound.add("titleMusic")
            .play(musicConfig);
    }
}

export default TitleScene;