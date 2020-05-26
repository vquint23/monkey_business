import TitleScene from './scenes/menus/titleScene.js';
import MenuScene from './scenes/menus/menuScene.js';
import LevelsScene from './scenes/menus/levelsScene.js';
import ControlsScene from './scenes/menus/controlsScene.js';
import AboutScene from './scenes/menus/aboutScene.js';
import Level from './scenes/levels/level.js';
import GameHUD from './scenes/gameHUD.js';


// Menu Scenes
var titleScene = new TitleScene();
var menuScene = new MenuScene();
var levelsScene = new LevelsScene();
var aboutScene = new AboutScene();
var controlsScene = new ControlsScene();

// Level Scenes + init assets
var level11 = new Level("level1-1", {
    Background: '../src/assets/images/backgrounds/tempjungle.png',
    TileMap: '../src/assets/TileMaps/jungle1.csv',
    TileSet: '../src/assets/tilesets/JungleTileSet.png',
    Music: '../src/assets/audio/music/world1.ogg'
});

var level21 = new Level("level2-1", {
    Background: '../src/assets/images/backgrounds/sky_bg.png',
    TileMap: '../src/assets/TileMaps/city1.csv',
    TileSet: '../src/assets/tilesets/CityTileSet.png',
    Music: '../src/assets/audio/music/world2.ogg'
});
var level22 = new Level("level2-2", {
    Background: '../src/assets/images/backgrounds/sky_bg.png',
    TileMap: '../src/assets/TileMaps/city2.csv',
    TileSet: '../src/assets/tilesets/CityTileSet.png',
    Music: '../src/assets/audio/music/world2.ogg'
});

// Game HUD
var gameHUD = new GameHUD();

// Game Settings
var config = {
    parent: "game",
    type: Phaser.AUTO,
    width: 1200,
    height: 750,
    transparent: true,
    scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade:{
            gravity: { y: 700 },
            debug: true
        }
    },
    autoRound: false
};
var game = new Phaser.Game(config);

/* Load Scenes */
//Menu
game.scene.add('titleScene', titleScene);
game.scene.add('menuScene', menuScene);
game.scene.add('levelsScene', levelsScene);
game.scene.add('aboutScene', aboutScene);
game.scene.add('controlsScene', controlsScene);

//levels
game.scene.add('level1-1', level11);
game.scene.add('level2-1', level21);
game.scene.add('level2-2', level22);

//gameHUD
game.scene.add('gameHUD', gameHUD);

// start title
game.scene.start('titleScene');