class Preloading extends Phaser.Scene {
    constructor() {
        super("preloading");
    }

    preload() {
        // Load Player Spritesheet
        this.load.spritesheet("Player", "../src/assets/sprites/SunWukong.png", {
            frameWidth: 64,
            frameHeight: 64
        });
      
        // Load Logo
        this.load.image('logo', '../src/assets/logo.png');
    }

    create() {
        this.game.anims.create({
            key: "run_right",
            frames: this.game.anims.generateFrameNumbers("Player", {
                start: 16,
                end: 19
            }),
            frameRate: 10,
            repeat: -1
        });
		this.scene.start("loading");
    }
}

export default Preloading;