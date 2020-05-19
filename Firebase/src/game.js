window.onload = function() {

    var config = {
        type: Phaser.AUTO,
        width: 640,
        height: 480,
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
        scale: {
            parent: "game",
            top: 100,
            width: 800, 
            height: 600,
        },
        autoRound: false
    }

    var game = new Phaser.Game(config);
}