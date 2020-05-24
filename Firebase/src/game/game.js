import TitleScene from './scenes/titleScene.js';
import MenuScene from './scenes/menuScene.js';
import GameScene from './scenes/gameScene.js';
import LevelsScene from './scenes/levelsScene.js';

// Scenes
var gameScene = new GameScene();
var titleScene = new TitleScene();
var menuScene = new MenuScene();
var levelsScene = new LevelsScene();

// Game Settings
var config = {
    parent: "game",
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
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

// Load Scenes
game.scene.add('titleScene', titleScene);
game.scene.add('menuScene', menuScene);
game.scene.add('levelsScene', levelsScene);
//about scene
//controls scene
//world 1
//world 2
//world 3
game.scene.add("game", gameScene);

// start title
game.scene.start('levelsScene');