import Player from '../../Player.js';

class Level extends Phaser.Scene {
    Background;
    Enemies;
    Music;
    PlayerX;
    PlayerY;
    TileMap;
    TileSet;


    constructor(keyname, data){
        super({key: keyname});
        // Background
        this.Background = data.Background;
        // Enemies
        // Music
        this.Music = data.Music;
        // Player
        this.PlayerX = data.PlayerX;
        this.PlayerY = data.PlayerY;
        // TileMap
        this.TileMap = data.TileMap;
        // TileSet
        this.TileSet = data.TileSet;
    }

    preload(){
        //Level Background
        this.load.image('background', this.Background);
        
        //Map Stuff
        this.load.tilemapCSV('tilemap', this.TileMap);
        this.load.image("tiles", this.TileSet, {
            frameWidth: 64,
            frameHeight: 64
        });

        //Music
        this.load.audio('music', this.Music);
        this.load.audio("GameOverTheme", "../src/assets/audio/music/death.ogg");
        
        //Sound Effects
        this.load.audio("monkeyJump", "../src/assets/audio/sfx/monkey_jump.ogg");
        this.load.audio("monkeyRunning", "../src/assets/audio/sfx/monkey_running.ogg");
        this.load.audio("monkeyDamage", "../src/assets/audio/sfx/monkey_damage.ogg");
        this.load.audio("enemyDamage", "../src/assets/audio/sfx/enemy_damage.ogg");
    
        //Player
        this.load.spritesheet("Player", "../src/assets/Sprites/SunWukong.png", {
            frameWidth: 64,
            frameHeight: 64
        });
    
    }

    create(){
        // activate loading scene
        this.scene.launch('gameHUD', {level: this } );
        
        // game initialization
        gameOver = false;   // game is not over
        musicOn = false;    // music not playing
        paused = false;     // game is not paused
        left = false;   // player starts facing right

        //set background
        var bg = this.add.tileSprite(0, 0, 1090, 650, 'background')
            .setOrigin(0, 0)
            .setScrollFactor(0);

        // map setup
        var map = this.make.tilemap({key: "tilemap", tileWidth: 64, tileHeight: 64});
        var tileset = map.addTilesetImage("tiles");
        var tilelayer = map.createStaticLayer(0, tileset);

        // Set tile blocks to be collidable
        map.setCollisionBetween(0, 10000, true);

        // sound
        this.runEffectTimer = 12;   // timer for the running sound effect
        jump = this.sound.add("monkeyJump");
        run = this.sound.add("monkeyRunning");

        // camera setup
        var camera = this.cameras.main;
        camera.setViewport(50, 45, 1090, 650)
                   .setBounds(0, 0, map.widthInPixels, map.heightInPixels);;
        
        // player setup
        player = new Player({scene: this, x: this.PlayerX, y: this.PlayerY}); 
        camera.startFollow(player);

        // collisions setup
        this.physics.add.collider(player, tilelayer);

        // keyboard inputs for movement to ASD and Space 
        cursorKeys = this.input.keyboard.createCursorKeys();
        cursorKeys = this.input.keyboard.addKeys ({
            up: Phaser.Input.Keyboard.KeyCodes.SPACE,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D, 
            //debug/testing:
            invincibility: Phaser.Input.Keyboard.KeyCodes.I,
        });
    }

    update(){
        // Music
        if (!musicOn){
            let music = this.sound.add('music');
            var musicConfig = {
                mute: false,
                volume: 0.5,
               loop: true,
               delay: 0
            };
            music.play(musicConfig);
            musicOn = true;
        }
        //Player
        // Reset player velocity back to 0 every frame
        player.setVelocityX(0);
        this.movePlayerManager();
    }

    movePlayerManager(){
        // Moves player according to buttons pressed and updates sprite states
        if (cursorKeys.left.isDown) {
            left = true;
            player.setVelocityX(-300);
            if (player.body.onFloor()) {
                player.play("run_left", true);
                this.runEffectTimer--;

                if(this.runEffectTimer === 0) {
                    run.play({volume: 3});
                    this.runEffectTimer = 12;
                }
            } 
        } 
        else if (cursorKeys.right.isDown) {
            left = false;
            player.setVelocityX(300);
            if (player.body.onFloor()) {
                player.play("run_right", true);
                this.runEffectTimer--;
                if(this.runEffectTimer === 0) {
                    run.play({volume: 3});
                    this.runEffectTimer = 12;
                }
            }
        } 
        else {
            if (left) {
                player.play("idle_left", true);
            } 
            else {
                player.play("idle_right", true);
            }
        }
        if (cursorKeys.up.isDown && player.body.onFloor())
        {
            jump.play({volume: 1.5});
            
            player.setVelocityY(-525);
        }
        if (!player.body.onFloor()) {
            if (left) {
                player.play("jump_left", true);
            } 
            else {
                player.play("jump_right", true);
            }
        }
    }
}
var cursorKeys, 
    gameOver,
    jump,
    left,
    musicOn,
    paused,
    player,
    run;

    export default Level;

