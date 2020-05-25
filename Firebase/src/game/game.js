import TitleScene from './scenes/menus/titleScene.js';
import MenuScene from './scenes/menus/menuScene.js';
import LevelsScene from './scenes/menus/levelsScene.js';
import ControlsScene from './scenes/menus/controlsScene.js';
import AboutScene from './scenes/menus/aboutScene.js';
import Level11 from './scenes/levels/level11.js';
import Level12 from './scenes/levels/level12.js';
import Level21 from './scenes/levels/level21.js';
import Level22 from './scenes/levels/level22.js';
import Level31 from './scenes/levels/level31.js';
import Level32 from './scenes/levels/level32.js';
import GameHUD from './scenes/gameHUD.js';


// Menu Scenes
var titleScene = new TitleScene();
var menuScene = new MenuScene();
var levelsScene = new LevelsScene();
var aboutScene = new AboutScene();
var controlsScene = new ControlsScene();

// Level Scenes
var level11 = new Level11();
var level12 = new Level12();
var level21 = new Level21();
var level22 = new Level22();
var level31 = new Level31();
var level32 = new Level32();

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

//world 1
game.scene.add('level1-1', level11);
game.scene.add('level1-2', level12);
//world 2
game.scene.add('level2-1', level21);
game.scene.add('level2-2', level22);
//world 3
game.scene.add('level3-1', level31);
game.scene.add('level3-2', level32);

//gameHUD
game.scene.add('gameHUD', gameHUD);

// start title
game.scene.start('level2-1');