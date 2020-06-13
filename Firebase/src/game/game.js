import TitleScene from './scenes/menus/titleScene.js';
import MenuScene from './scenes/menus/menuScene.js';
import LevelsScene from './scenes/menus/levelsScene.js';
import ControlsScene from './scenes/menus/controlsScene.js';
import AboutScene from './scenes/menus/aboutScene.js';
import GameHUD from './scenes/gameHUD.js';
import Preloading from './scenes/preloading.js';
import Loading from './scenes/loading.js';
import Level from './scenes/levels/level.js';
import Player from './Player.js';
import Scorpion from './enemies/scorpion.js';
import EventsDispatcher from './EventsDispatcher.js';

// Preloading Scene
var preloading = new Preloading();

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
    Gate: {
        x: 9520, 
        y: 576
    },
    TileMap: 'level11TM',
    TileSet: 'world1tiles',
    Music: 'World1Theme',
    Player:{
        x: 240, 
        y: 1664
    },
    Scorpions: {
        x: [1472, 2240, 3200, 3648, 4288, 6016, 9920],
        y: [1472, 1600, 1600, 1536, 1664, 1792, 1024]
    },
    Dragonflies: {
        x: [],
        y: []
    }
}
var level12Config = {
    Background: 'world1BG',
    Gate: {
        x: 3120, 
        y: 192
    },
    TileMap: 'level12TM',
    TileSet: 'world1tiles',
    Music: 'World1Theme',
    Player:{
        x: 128, 
        y: 4224
    },
    Scorpions: {
        x: [1472, 2240, 1536, 832, 1344, 2368, 960, 1024, 1344, 2368, 2368, 2368],
        y: [1472, 1600, 3904, 3456, 3456, 2844, 448, 448, 448, 1152, 768, 384]
    },
    Dragonflies: {
        x: [832, 2048, 896, 896, 2368, 2112, 1663],
        y: [3904, 3648, 3328, 2048, 320, 2880, 1920]
    }

}
var level21Config = {
    Background: 'skyBG',
    Gate: {
        x: 6300, 
        y: 192
    },
    TileMap: 'level21TM',
    TileSet: 'world2tiles',
    Music: 'World2Theme',
    Player:{
        x: 600, 
        y: 0
    },
    Scorpions: {
        x: [1728, 2432, 1241, 2329, 3186, 3931, 4632],
        y: [2176, 2816, 1764, 1190, 2737, 2786, 489]
    },
    Dragonflies: {
        x: [],
        y: []
    }
}
var level22Config = {
    Background: 'skyBG',
    Gate: {
        x: 3102, 
        y: 196
    },
    TileMap: 'level22TM',
    TileSet: 'world2tiles',
    Music: 'World2Theme',
    Player:{
        x: 164, 
        y: 4702
    },
    Scorpions: {
        x: [418, 2276, 2978, 1195, 92],
        y: [3750, 4114, 1328, 1261, 604]
    },
    Dragonflies: {
        x: [],
        y: []
    }
}
var level31Config = {
    Background: 'skyBG',
    Gate: {
        x: 12672, 
        y: 1096
    },
    TileMap: 'level31TM',
    TileSet: 'world3tiles',
    Music: 'World3Theme',
    Player:{
        x: 600, 
        y: 3050
    },
    Scorpions:{
        x: [1728, 2432, 1241, 2329, 3186, 3931, 4632],
        y: [2176, 2816, 1764, 1190, 2737, 2786, 489]
    },
    Dragonflies: {
        x: [],
        y: []
    }
}
var level32Config = {
    Background: 'skyBG',
    Gate: {
        x: 5504, 
        y: 584
    },
    TileMap: 'level33TM',
    TileSet: 'world3tiles',
    Music: 'World3Theme',
    Player:{
        x: 4096, 
        y: 5930
    },
    Scorpions: {
        x: [1728, 2432, 1241, 2329, 3186, 3931, 4632],
        y: [2176, 2816, 1764, 1190, 2737, 2786, 489]
    },
    Dragonflies: {
        x: [],
        y: []
    }
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
            debug: false
        }
    },
    autoRound: false
};
var game = new Phaser.Game(config);

/* Load Scenes */

// preloading scene
game.scene.add('preloading', preloading);

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
game.scene.start('preloading');

