class TitleScene extends Phaser.Scene {

	constructor() {
		super({key:'titleScene'});
	}

	preload() {
		this.load.image('background', '../src/assets/screens/splashScreen.png');
	}

	create() {
		 var bg = this.add.sprite(0,0,'background');
          bg.setOrigin(0,0);
          bg.setSize(this.cameras.main.centerX, this.cameras.main.centerY);
	}

}

export default TitleScene;