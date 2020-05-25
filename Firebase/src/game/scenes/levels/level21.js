class Level21 extends Phaser.Scene {
    constructor(){
        super({key: 'level2-1'});
    }
    preload(){
        this.load.image('background', '../src/assets/images/backgrounds/sky_bg.png');
        
        //Map Stuff
        this.load.tilemapCSV('city1', "../src/assets/TileMaps/city1.csv");
        this.load.image("cityTiles", "../src/assets/tilesets/CityTileSet.png", {
            frameWidth: 64,
            frameHeight: 64
        });
    }

    create(){
        // activate gameHUD
        this.scene.launch('gameHUD');
        
        var gameOver = false;
        var camera = this.cameras.main;
        var bg = this.add.tileSprite(0, 0, camera.width, camera.height, 'background')
            .setOrigin(0, 0);
        var map = this.make.tilemap({key: "city1", tileWidth: 64, tileHeight: 64});
        var tileset = map.addTilesetImage("cityTiles");
        var layer = map.createStaticLayer(0, tileset);
        camera.setViewport(50, 45, 1090, 650);
    }

}

export default Level21;

