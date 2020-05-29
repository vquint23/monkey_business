class Loading extends Phaser.Scene {
    constructor() {
        super("loading");
    }

    preload() {
        // Loading bar
        this.graphics = this.add.graphics();
		this.newGraphics = this.add.graphics();
		var progressBar = new Phaser.Geom.Rectangle(400, 300, 400, 50);
		var progressBarFill = new Phaser.Geom.Rectangle(405, 305, 290, 40);

		this.graphics.fillStyle(0xffffff, 1);
		this.graphics.fillRectShape(progressBar);

		this.newGraphics.fillStyle(0x3587e2, 1);
		this.newGraphics.fillRectShape(progressBarFill);

		var loadingText = this.add.text(450,360,"Loading: ", { 
            fontSize: '32px', fill: '#FFF' 
        });

        // Import audio
        this.load.audio("TitleTheme", "../src/assets/audio/music/titlescreen.ogg");
        this.load.audio("World1Theme", "../src/assets/audio/music/world1.ogg");
        this.load.audio("World2Theme", "../src/assets/audio/music/world2.ogg");
        this.load.audio("World3Theme", "../src/assets/audio/music/world3.ogg");
        this.load.audio("GameOverTheme", "../src/assets/audio/music/death.ogg");
        this.load.audio("StageClearTheme", "../src/assets/audio/music/stageclear.ogg");
        this.load.audio("EndingTheme", "../src/assets/audio/music/ending.ogg");

        this.load.audio("monkeyJump", "../src/assets/audio/sfx/monkey_jump.ogg");
        this.load.audio("monkeyRunning", "../src/assets/audio/sfx/monkey_running.ogg");
        this.load.audio("monkeyDamage", "../src/assets/audio/sfx/monkey_damage.ogg");
        this.load.audio("enemyDamage", "../src/assets/audio/sfx/enemy_damage.ogg");
        this.load.audio("buttonForward", "../src/assets/audio/sfx/button_forward.ogg");
        this.load.audio("buttonBackward", "../src/assets/audio/sfx/button_backward.ogg");
        
        // Load Logo
        this.load.image('logo', '../src/assets/logo.png');

        // Load Icons
        this.load.image('backarrow2', '../src/assets/images/icons/back2.png');
        this.load.image('backarrow', '../src/assets/images/icons/back.png');
   
        // Load in spritesheets
        this.load.spritesheet("Player", "../src/assets/sprites/SunWukong.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet("Scorpion", "../src/assets/sprites/Scorpion.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet("Dragonfly", "../src/assets/sprites/Dragonfly.png", {
            frameWidth: 64,
            frameHeight: 32
        });
        this.load.image("staff", "../src/assets/sprites/staff.png", {
            frameWidth: 32,
            frameHeight: 4
        });
        this.load.image("Hit", "../src/assets/images/hit.png", {
            frameWidth: 20,
            frameHeight: 20
        });
        this.load.image("Gate", "../src/assets/images/sprites/gate.png", {
            frameWidth: 42,
            frameHeight: 128
        });
        this.load.image("Beam", "../src/assets/images/beam.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        // Load backgrounds
        this.load.image("controlsBG", "../src/assets/images/backgrounds/controls.png");
        this.load.image("menuBG", "../src/assets/images/backgrounds/MenuBase.png");
        this.load.image("pausedBG", "../src/assets/images/backgrounds/paused.png");
        this.load.image("staffBorder", "../src/assets/images/backgrounds/staff_border.png");
        
        this.load.image("world1BG", "../src/assets/images/backgrounds/tempjungle.png");
        this.load.image("skyBG", "../src/assets/images/backgrounds/sky_bg.png");

        // Load HUD images
        this.load.image("healthbar", "../src/assets/images/health.png");
        this.load.image("healthbase", "../src/assets/images/healthbase.png");

        // Load TileMaps
        this.load.tilemapCSV('level11TM', '../src/assets/TileMaps/jungle1.csv');
        this.load.tilemapCSV('level12TM', '../src/assets/TileMaps/jungle2.csv');
        this.load.tilemapCSV('level21TM', '../src/assets/TileMaps/city1.csv');
        this.load.tilemapCSV('level22TM', '../src/assets/TileMaps/city2.csv');
        this.load.tilemapCSV('level31TM', '../src/assets/TileMaps/world31.csv');
        this.load.tilemapCSV('level33TM', '../src/assets/TileMaps/world32.csv');
        
        // Load TileSets
        this.load.image("world1tiles", '../src/assets/tilesets/JungleTileSet.png', {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.image("world2tiles", '../src/assets/tilesets/CityTileSet.png', {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.image("world3tiles", '../src/assets/tilesets/CloudTileSet.png', {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.on('progress', this.updateBar, {newGraphics:this.newGraphics, loadingText: loadingText})
        this.load.on('complete', this.complete, {scene:this.scene});
    }

    create() {
    }

    updateBar(percentage) {
        this.newGraphics.clear();
        this.newGraphics.fillStyle(0x3587e2, 1);
        this.newGraphics.fillRectShape(new Phaser.Geom.Rectangle(405, 305, percentage*390, 40));
                
        percentage = percentage * 100;
        this.loadingText.setText("Loading: " + percentage.toFixed(2) + "%");
    }

	complete() {
		console.log("COMPLETE!");
		this.scene.start("titleScene");
	}
}

export default Loading;