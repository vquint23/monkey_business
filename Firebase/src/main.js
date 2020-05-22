class main extends Phaser.Scene {
    constructor() {
        super("LoadGame");
    }

    preload() {
        // Import audio
        this.load.audio("World1Theme", "../audio/music/world1.ogg");
        this.load.audio("monkeyJump", "../audio/monkey_jump.ogg");
        this.load.audio("monkeyRunning", "../audio/monkey_running.ogg");
        this.load.audio("enemyDamage", "../audio/enemy_damage.ogg");
        
        // Load in spritesheets
        this.load.image("jungleTiles", "../assets/Images/JungleTileSet.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.image("cityTiles", "../assets/Images/CityTileSet.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet("Monkey", "../assets/Sprites/SunWukong.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet("Scorpion", "../assets/Sprites/Scorpion.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet("Dragonfly", "../assets/Sprites/Dragonfly.png", {
            frameWidth: 64,
            frameHeight: 32
        });
        this.load.image("Staff", "../assets/Sprites/Staff.png", {
            frameWidth: 32,
            frameHeight: 4
        });
        this.load.image("Hit", "../assets/Images/hit.png", {
            frameWidth: 20,
            frameHeight: 20
        });
        this.load.image("Gate", "../assets/Images/gate.png", {
            frameWidth: 128,
            frameHeight: 128
        });
        
    }

    create() {
        // Add text
        this.add.text(20, 20, "World 1-1");
        this.scene.start("World1-1");

        // Create animations
        this.anims.create({
            key: "idle_right",
            frames: this.anims.generateFrameNumbers("Monkey", {
                start: 0,
                end: 7
            }),
            frameRate: 10,
            repeat: -1 //Use -1 for infinite loops
        });
        this.anims.create({
            key: "idle_left",
            frames: this.anims.generateFrameNumbers("Monkey", {
                start: 8,
                end: 15
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "run_right",
            frames: this.anims.generateFrameNumbers("Monkey", {
                start: 16,
                end: 19
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "run_left",
            frames: this.anims.generateFrameNumbers("Monkey", {
                start: 20,
                end: 23
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "jump_right",
            frames: this.anims.generateFrameNumbers("Monkey", {
                start: 24,
                end: 24
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "jump_left",
            frames: this.anims.generateFrameNumbers("Monkey", {
                start: 25,
                end: 25
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "attack_right",
            frames: this.anims.generateFrameNumbers("Monkey", {
                start: 26,
                end: 26
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "attack_left",
            frames: this.anims.generateFrameNumbers("Monkey", {
                start: 27,
                end: 27
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "hurt_right",
            frames: this.anims.generateFrameNumbers("Monkey", {
                start: 28,
                end: 28
            }),
            duration: 1000,
            frameRate: 10,
            repeat: -1
        });

        // Create scorpion animations
        this.anims.create({
            key: "scorpion_idle_left",
            frames: this.anims.generateFrameNumbers("Scorpion", {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "scorpion_idle_right",
            frames: this.anims.generateFrameNumbers("Scorpion", {
                start: 4,
                end: 7
            }),
            frameRate: 10,
            repeat: -1
        });

        // Create dragonfly animations
        this.anims.create({
            key: "dragonfly_left",
            frames: this.anims.generateFrameNumbers("Dragonfly", {
                start: 0,
                end: 1
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "dragonfly_right",
            frames: this.anims.generateFrameNumbers("Dragonfly", {
                start: 2,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });
    }
}