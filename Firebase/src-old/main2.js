class main2 extends Phaser.Scene {
    constructor() {
        super("LoadGame");
    }

    preload() {
        // Import audio
        this.load.audio("World2Theme", "../audio/music/world2.ogg");
        this.load.audio("GameOverTheme", "../audio/music/death.ogg");
        this.load.audio("monkeyJump", "../audio/monkey_jump.ogg");
        this.load.audio("monkeyRunning", "../audio/monkey_running.ogg");
        this.load.audio("monkeyDamage", "../audio/monkey_damage.ogg");
        this.load.audio("enemyDamage", "../audio/enemy_damage.ogg");
        this.load.audio("buttonForward", "../audio/button_forward.ogg");
        this.load.audio("buttonBackward", "../audio/button_backward.ogg");

        // Load in spritesheets
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
        this.load.image("Staff", "../assets/Sprites/Staff.png", {
            frameWidth: 32,
            frameHeight: 4
        });
        this.load.image("Gate", "../assets/Images/gate.png", {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.image("Hit", "assets/Images/hit.png", {
            frameWidth: 20,
            frameHeight: 20
        });
        
    }

    create() {
        // Add text
        this.add.text(20, 20, "World 2-1");
        this.scene.start("World2-1");

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

        //hurt left
        //die left
        //die right


        // Create enemy animations
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
        this.anims.create({
            key: "scorpion_dead_left",
            frames: this.anims.generateFrameNumbers("Scorpion", {
                start: 18,
                end: 18
            }),
            frameRate: 10,
            duration: 1000,
            repeat: -1
        });
        this.anims.create({
            key: "scorpion_dead_right",
            frames: this.anims.generateFrameNumbers("Scorpion", {
                start: 19,
                end: 19
            }),
            frameRate: 10,
            duration: 1000,
            repeat: -1
        });
    }
}