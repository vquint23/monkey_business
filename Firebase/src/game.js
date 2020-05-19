window.onload = function() {

    var config = {
        parent: "game-container",
        type: Phaser.AUTO,
        width: 1200,
        height: 700,
        bgColor: 0x000000,
        scene: [main, World11],
        pixelArt: true,
        physics: {
            default: "arcade",
            arcade:{
                gravity: { y: 700 },
                debug: false
            }
        },
        autoRound: false
    }

    var game = new Phaser.Game(config);
}