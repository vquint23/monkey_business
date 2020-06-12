class Scorpion extends Phaser.Physics.Arcade.Sprite {
    direction;
    timer;
    constructor(config){
        super(config.scene, config.x, config.y, "Scorpion");
        this.create(config);
    }

    create(config){
        // Add Scorpion 
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this);
        this.body.setSize(60, 45);

        // Sound Effects
        destroy = config.scene.sound.add("enemyDamage");

        // Wandering Variables
        this.direction = Phaser.Math.Between(-1, 1);
        this.timer = 623;
        
        // Create scorpion animations
        config.scene.anims.create({
            key: "scorpion_idle_left",
            frames: config.scene.anims.generateFrameNumbers("Scorpion", {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        config.scene.anims.create({
            key: "scorpion_idle_right",
            frames: config.scene.anims.generateFrameNumbers("Scorpion", {
                start: 4,
                end: 7
            }),
            frameRate: 10,
            repeat: -1
        });
        config.scene.anims.create({
            key: "scorpion_dead_left",
            frames: config.scene.anims.generateFrameNumbers("Scorpion", {
                start: 18,
                end: 18
            }),
            frameRate: 10,
            duration: 1000,
            repeat: -1
        });
        config.scene.anims.create({
            key: "scorpion_dead_right",
            frames: config.scene.anims.generateFrameNumbers("Scorpion", {
                start: 19,
                end: 19
            }),
            frameRate: 10,
            duration: 1000,
            repeat: -1
        });
    }

    wander(){
        switch (this.direction) {
            case -1:
                 // Move left
                if (this.timer > 0) {
                    this.moveLeft();
                    this.timer --;
                } else {
                   // Hit left bounds, change direction
                    this.direction = 1;
                    this.timer = Phaser.Math.Between(100, 500);
                }
                break;
            case 0:
                if (this.timer > 0){
                    this.timer--;
                    this.setVelocityX(0);
                } else{
                    this.direction = Phaser.Math.Between(-1, 1);
                    this.timer = Phaser.Math.Between(100, 500);
                }
            case 1:
                // Move right
                if (this.timer > 0) {
                    this.moveRight();
                    this.timer--;
                } else {
                    //  Hit rightbounds, change direction
                    this.direction = -1;
                    this.timer = Phaser.Math.Between(100, 500);
                }
                break;
        }
    }

    freeze(){
        this.body.moves = false;
    }

    moveRight(){
        this.play("scorpion_idle_right", true);
        this.setVelocityX(100);
    }

    moveLeft(){
        this.play("scorpion_idle_left", true);
        this.setVelocityX(-100);
    }

    jump(){
        this.setVelocityY(-500);
    }

    die(left){
        if (left){
            this.play("scorpion_dead_left");
        }
        else{
            this.play("scorpion_dead_right");
        }
    }
}

var destroy;

export default Scorpion;