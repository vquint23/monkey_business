const config = {
    type: Phaser.AUTO,
    parent: 'Firebase',
    width: 800,
    height: 600,
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


