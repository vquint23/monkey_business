var Background, TileMap, TileSet, Music;

class Level extends Phaser.Scene {
    constructor(keyname, data){
        super({key: keyname});
        //Level Background
        Background = data.Background;
        //Level Tilemap
        TileMap = data.TileMap;
        //Level Tileset
        TileSet = data.TileSet;
        //Level Music
        Music = data.Music;
    }

    preload(){
        //Level Background
        this.load.image('background', Background);
        
        //Map Stuff
        this.load.tilemapCSV('tilemap', TileMap);
        this.load.image("tiles", TileSet, {
            frameWidth: 64,
            frameHeight: 64
        });

        //Music
        this.load.audio('music', Music);
    }

    create(){
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
        
        // map setup
        var map = this.make.tilemap({key: "tilemap", tileWidth: 64, tileHeight: 64});
        var tileset = map.addTilesetImage("tiles");
        var layer = map.createStaticLayer(0, tileset);

        cursorKeys = this.input.keyboard.createCursorKeys();
        cursorKeys = this.input.keyboard.addKeys ({

        });
    }

    update(){
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

