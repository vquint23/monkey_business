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
        this.load.audio("GameOverTheme", "../audio/music/death.ogg");
        
        //Sound Effects
        this.load.audio("monkeyJump", "../src/assets/audio/monkey_jump.ogg");
        this.load.audio("monkeyRunning", "../src/assets/audio/monkey_running.ogg");
        this.load.audio("monkeyDamage", "../src/assets/audio/monkey_damage.ogg");
        this.load.audio("enemyDamage", "../src/assets/audio/enemy_damage.ogg");
    
        //Player
        this.load.spritesheet("Player", "../src/assets/Sprites/SunWukong.png", {
            frameWidth: 64,
            frameHeight: 64
        });
    
    }

    create(){
        // activate loading scene
        this.scene.launch('loading');

        // activate gameHUD
        this.scene.launch('gameHUD', {level: this } );

        // game is not over
        gameOver = false;

        // music not playing
        musicOn = false;

        // game is not paused
        paused = false;

        // camera setup
        var camera = this.cameras.main;
            camera.setViewport(50, 45, 1090, 650);

        //set background
        var bg = this.add.tileSprite(0, 0, camera.width, camera.height, 'background')
            .setOrigin(0, 0);
        bg.setScrollFactor(0);
        
        // map setup
        var map = this.make.tilemap({key: "tilemap", tileWidth: 64, tileHeight: 64});
        var tileset = map.addTilesetImage("tiles");
        var tilelayer = map.createStaticLayer(0, tileset);

        // Set tile blocks to be collidable
        map.setCollisionBetween(0, 10000, true);

        // player setup
        let player = new Player({scene: this, x: this.PlayerX, y: this.PlayerY}); 
        camera.startFollow(player);

        // collisions setup
        this.physics.add.collider(player, tilelayer);
        
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
            let musicConfig = {
                mute: false,
                volume: 0.5,
               loop: true,
               delay: 0
            };
            music.play(musicConfig);
            musicOn = true;
        }
    }
}
var cursorKeys, 
    gameOver,
    musicOn,
    paused;

    export default Level;

