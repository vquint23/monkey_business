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

// Level Scenes
var level11 = new Level("level1-1");
var level12 = new Level("level1-2");
var level21 = new Level("level2-1");
var level22 = new Level("level2-2");
var level31 = new Level("level3-1");
var level32 = new Level("level3-2");

 // Level Configs
 var level11Config = {
    Background: 'world1BG',
    TileMap: 'level11TM',
    TileSet: 'world1tiles',
    Music: 'World1Theme',
    PlayerX: 240,
    PlayerY: 1664,
    Scorpions: [[1728, 2176], [2432, 2816], [1241, 1764], [2329, 1190], [3186, 2737], [3931, 2786], [4632, 489]],
}
var level12Config = {
    Background: 'world1BG',
    TileMap: 'level12TM',
    TileSet: 'world1tiles',
    Music: 'World1Theme',
    PlayerX: 240,
    PlayerY: 4224,
    Scorpions: [[1728, 2176], [2432, 2816], [1241, 1764], [2329, 1190], [3186, 2737], [3931, 2786], [4632, 489]],
}
var level21Config = {
    Background: 'skyBG',
    TileMap: 'level21TM',
    TileSet: 'world2tiles',
    Music: 'World2Theme',
    PlayerX: 600,
    PlayerY: 0,
    Scorpions: [[1728, 2176], [2432, 2816], [1241, 1764], [2329, 1190], [3186, 2737], [3931, 2786], [4632, 489]],
}
var level22Config = {
    Background: 'skyBG',
    TileMap: 'level22TM',
    TileSet: 'world2tiles',
    Music: 'World2Theme',
    PlayerX: 164,
    PlayerY: 4702,
    Scorpions: [[1728, 2176], [2432, 2816], [1241, 1764], [2329, 1190], [3186, 2737], [3931, 2786], [4632, 489]],
}
var level31Config = {
    Background: 'skyBG',
    TileMap: 'level31TM',
    TileSet: 'world3tiles',
    Music: 'World3Theme',
    PlayerX: 600,
    PlayerY: 3050,
    Scorpions: [[1728, 2176], [2432, 2816], [1241, 1764], [2329, 1190], [3186, 2737], [3931, 2786], [4632, 489]],
}
var level32Config = {
    Background: 'skyBG',
    TileMap: 'level33TM',
    TileSet: 'world3tiles',
    Music: 'World3Theme',
    PlayerX: 4096,
    PlayerY: 5930,
    Scorpions: [[1728, 2176], [2432, 2816], [1241, 1764], [2329, 1190], [3186, 2737], [3931, 2786], [4632, 489]],
}

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
game.scene.add('level1-1', level11, false, level11Config);
game.scene.add('level1-2', level12, false, level12Config);
game.scene.add('level2-1', level21, false, level21Config);
game.scene.add('level2-2', level22, false, level22Config);
game.scene.add('level3-1', level31, false, level31Config);
game.scene.add('level3-2', level32, false, level32Config);

// gameHUD
game.scene.add('gameHUD', gameHUD);

// start loading
game.scene.start('loading');

