import TitleScene from './scenes/menus/titleScene.js';
import MenuScene from './scenes/menus/menuScene.js';
import LevelsScene from './scenes/menus/levelsScene.js';
import ControlsScene from './scenes/menus/controlsScene.js';
import AboutScene from './scenes/menus/aboutScene.js';
import GameHUD from './scenes/gameHUD.js';
import Loading from './scenes/loading.js';
import Level from './scenes/levels/level.js';
import Player from './Player.js';

// Loading Scene
var loading = new Loading();

// Menu Scenes
var titleScene = new TitleScene();
var menuScene = new MenuScene();
var levelsScene = new LevelsScene();
var aboutScene = new AboutScene();
var controlsScene = new ControlsScene();

// Level Configs
var level11Config = {
    Background: '../src/assets/images/backgrounds/tempjungle.png',
    TileMap: '../src/assets/TileMaps/jungle1.csv',
    TileSet: '../src/assets/tilesets/JungleTileSet.png',
    Music: '../src/assets/audio/music/world1.ogg',
    PlayerX: 240,
    PlayerY: 1664,
}
var level12Config = {
    Background: '../src/assets/images/backgrounds/tempjungle.png',
    TileMap: '../src/assets/TileMaps/jungle2.csv',
    TileSet: '../src/assets/tilesets/JungleTileSet.png',
    Music: '../src/assets/audio/music/world1.ogg',
    PlayerX: 240,
    PlayerY: 4224,
}
var level21Config = {
    Background: '../src/assets/images/backgrounds/sky_bg.png',
    TileMap: '../src/assets/TileMaps/city1.csv',
    TileSet: '../src/assets/tilesets/CityTileSet.png',
    Music: '../src/assets/audio/music/world2.ogg',
    PlayerX: 600,
    PlayerY: 0,
}
var level22Config = {
    Background: '../src/assets/images/backgrounds/sky_bg.png',
    TileMap: '../src/assets/TileMaps/city2.csv',
    TileSet: '../src/assets/tilesets/CityTileSet.png',
    Music: '../src/assets/audio/music/world2.ogg',
    PlayerX: 164,
    PlayerY: 4702,
}
var level31Config = {
    Background: '../src/assets/images/backgrounds/sky_bg.png',
    TileMap: '../src/assets/TileMaps/world31.csv',
    TileSet: '../src/assets/tilesets/CloudTileSet.png',
    Music: '../src/assets/audio/music/world3.ogg',
    PlayerX: 600,
    PlayerY: 3050,
}
var level32Config = {
    Background: '../src/assets/images/backgrounds/sky_bg.png',
    TileMap: '../src/assets/TileMaps/world32.csv',
    TileSet: '../src/assets/tilesets/CloudTileSet.png',
    Music: '../src/assets/audio/music/world3.ogg',
    PlayerX: 4096,
    PlayerY: 5930,
}

// Level Scenes
var level11 = new Level("level1-1", level11Config);
var level12 = new Level("level1-2", level12Config);
var level21 = new Level("level2-1", level21Config);
var level22 = new Level("level2-2", level22Config);
var level31 = new Level("level3-1", level31Config);
var level32 = new Level("level3-2", level32Config);

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

// loading scene
game.scene.add('loading', loading);

// menu
game.scene.add('titleScene', titleScene);
game.scene.add('menuScene', menuScene);
game.scene.add('levelsScene', levelsScene);
game.scene.add('aboutScene', aboutScene);
game.scene.add('controlsScene', controlsScene);

// levels
game.scene.add('level1-1', level11);
game.scene.add('level1-2', level12);
game.scene.add('level2-1', level21);
game.scene.add('level2-2', level22);
game.scene.add('level3-1', level31);
game.scene.add('level3-2', level32);

// gameHUD
game.scene.add('gameHUD', gameHUD);

// start title
//game.scene.start('titleScene');

// testing
game.scene.start('level2-1');