import Player from '../../Player.js';

class Level extends Phaser.Scene {
    Background;
    Data;
    Scorpions;
    Music;
    PlayerX;
    PlayerY;
    TileMap;
    TileSet;

    constructor(keyname){
        super({key: keyname});
    }

    init(data){
        this.Data = data;
    }

    preload(){}
    create(){
        console.log(this.Data);

        // activate loading scene
        this.scene.launch('gameHUD', {level: this } );
        
        // game initialization
        gameOver = false;   // game is not over
        musicOn = false;    // music not playing
        paused = false;     // game is not paused
        left = false;   // player starts facing right

        //set background
        var bg = this.add.tileSprite(0, 0, 1090, 650, this.Data.Background)
            .setOrigin(0, 0)
            .setScrollFactor(0);

        // map setup
        var map = this.make.tilemap({key: this.Data.TileMap, tileWidth: 64, tileHeight: 64});
        var tileset = map.addTilesetImage(this.Data.TileSet);
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
        player = new Player({scene: this, x: this.Data.PlayerX, y: this.Data.PlayerY}); 
        camera.startFollow(player);

        // enemies setup


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
            let music = this.sound.add(this.Data.Music);
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

