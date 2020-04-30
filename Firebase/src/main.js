const config = {
    type: Phaser.AUTO,
    parent: 'Firebase',
    width: 1100,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 600
            },
            debug: false
        }
    }
};


const game = new Phaser.Game(config); 


