class Scorpion extends Phaser.Physics.Arcade.Sprite {
    Health = 100;
    
    constructor(config){
        super(config.scene, config.x, config.y, "scorpion");
        this.create(config);
    }

    create(config){
        // Add Player 
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this);
        this.body.setSize(45, 60);

        // Create scorpion animations
        this.anims.create({
            key: "scorpion_idle_left",
            frames: this.anims.generateFrameNumbers("Scorpion", {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "scorpion_idle_right",
            frames: this.anims.generateFrameNumbers("Scorpion", {
                start: 4,
                end: 7
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "scorpion_dead_left",
            frames: this.anims.generateFrameNumbers("Scorpion", {
                start: 18,
                end: 18
            }),
            frameRate: 10,
            duration: 1000,
            repeat: -1
        });
        this.anims.create({
            key: "scorpion_dead_right",
            frames: this.anims.generateFrameNumbers("Scorpion", {
                start: 19,
                end: 19
            }),
            frameRate: 10,
            duration: 1000,
            repeat: -1
        });
    }
}

export default Scorpion;