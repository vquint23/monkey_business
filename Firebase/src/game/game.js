import TitleScene from './titleScene.js';
import GameScene from './gameScene.js';

var gameScene = new GameScene();
var titleScene = new TitleScene();


//* Game scene */
var config = {
  parent: "game",
  type: Phaser.AUTO,
  width: 1200,
  height: 800,
  transparent: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
},
autoRound: false
};
var game = new Phaser.Game(config);

// load scenes
game.scene.add('titleScene', titleScene);
game.scene.add("game", gameScene);

// start title
game.scene.start('titleScene');