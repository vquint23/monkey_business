class Player extends Phaser.Physics.Arcade.Sprite {
    Health;
    
    constructor(config){
        super(config.scene, config.x, config.y, "Player");
        this.create(config);
      

    }

    create(config){
        // Add Player 
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this);
        this.body.setSize(45, 60);
        this.body.setOffset(12, 0);

        // Create animations
        config.scene.anims.create({
            key: "idle_right",
            frames: config.scene.anims.generateFrameNumbers("Player", {
                start: 0,
                end: 7
            }),
            frameRate: 10,
            repeat: -1 //Use -1 for infinite loops
        });
        config.scene.anims.create({
            key: "idle_left",
            frames: config.scene.anims.generateFrameNumbers("Player", {
                start: 8,
                end: 15
            }),
            frameRate: 10,
            repeat: -1
        });
        config.scene.anims.create({
            key: "run_right",
            frames: config.scene.anims.generateFrameNumbers("Player", {
                start: 16,
                end: 19
            }),
            frameRate: 10,
            repeat: -1
        });
        config.scene.anims.create({
            key: "run_left",
            frames: config.scene.anims.generateFrameNumbers("Player", {
                start: 20,
                end: 23
            }),
            frameRate: 10,
            repeat: -1
        });
        config.scene.anims.create({
            key: "jump_right",
            frames: config.scene.anims.generateFrameNumbers("Player", {
                start: 24,
                end: 24
            }),
            frameRate: 10,
            repeat: -1
        });
        config.scene.anims.create({
            key: "jump_left",
            frames: config.scene.anims.generateFrameNumbers("Player", {
                start: 25,
                end: 25
            }),
            frameRate: 10,
            repeat: -1
        });
        config.scene.anims.create({
            key: "attack_right",
            frames: config.scene.anims.generateFrameNumbers("Player", {
                start: 26,
                end: 26
            }),
            frameRate: 10,
            repeat: -1
        });
        config.scene.anims.create({
            key: "attack_left",
            frames: config.scene.anims.generateFrameNumbers("Player", {
                start: 27,
                end: 27
            }),
            frameRate: 10,
            repeat: -1
        });
        config.scene.anims.create({
            key: "hurt_right",
            frames: config.scene.anims.generateFrameNumbers("Player", {
                start: 28,
                end: 28
            }),
            duration: 1000,
            frameRate: 10,
            repeat: -1
        });

    }
}

export default Player;