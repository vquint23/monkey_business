import EventsDispatcher from "./EventsDispatcher.js";

class Player extends Phaser.Physics.Arcade.Sprite {
    runEffectTimer = 12;
    hitTimer = 0;
    invincible = false;
    left = false;
    damaged = false;
    
    constructor(config){
        super(config.scene, config.x, config.y, "Player");
        this.create(config);
    }

    create(config){
        // Events Dispatcher
        eventDispatcher = EventsDispatcher.getInstance();

        // Add Player 
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this);
        this.body.setSize(45, 60);
        this.body.setOffset(12, 0);
        Health = 100;

        // Sound Effects
        jump = config.scene.sound.add("monkeyJump");
        run = config.scene.sound.add("monkeyRunning");
        damage = config.scene.sound.add("monkeyDamage");
           
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
        config.scene.anims.create({
            key: "hurt_left",
            frames: config.scene.anims.generateFrameNumbers("Player", {
                start: 29,
                end: 29
            }),
            duration: 1000,
            frameRate: 10,
            repeat: -1
        });
        config.scene.anims.create({
            key: "dead_left",
            frames: config.scene.anims.generateFrameNumbers("Player", {
                start: 30,
                end: 30
            }),
            duration: 1000,
            frameRate: 10,
            repeat: -1
        });
        config.scene.anims.create({
            key: "dead_right",
            frames: config.scene.anims.generateFrameNumbers("Player", {
                start: 31,
                end: 31
            }),
            duration: 1000,
            frameRate: 10,
            repeat: -1
        });

        //Listeners for events (health change, death)
        //eventDispatcher.on('takeDmg', this.takeDamage);
    }

    update(){
        this.setVelocityX(0);
        if (this.hitTimer > 0){
            this.hitTimer--;
        }
        if (this.hitTimer == 0){
            this.setInvincible(false);
        }
    }

    moveRight(){
        this.setVelocityX(300);
        if (this.body.onFloor()) {
            this.play("run_right", true);
            this.runEffectTimer--;
            if(this.runEffectTimer === 0) {
                run.play({volume: 3});
                this.runEffectTimer = 12;
            }
        }
    }

    moveLeft(){
        this.setVelocityX(-300);
        if (this.body.onFloor()) {
            this.play("run_left", true);
            this.runEffectTimer--;
            if(this.runEffectTimer === 0) {
                run.play({volume: 3});
                this.runEffectTimer = 12;
            } 
        }
    }

    jump(){
        jump.play({volume: 1.5});    
        this.setVelocityY(-525);
    }

    idle(){
        if (this.left) {
            this.play("idle_left", true);
        } 
        else {
            this.play("idle_right", true);
        }
    }

    airborne(){
        if (this.left) {
            this.play("jump_left", true);
        } 
        else {
            this.play("jump_right", true);
        }
    }

    takeDamage(){
        if(!this.invincible){
            damage.play();    
            if (this.left){
                this.setVelocityX(-500);
                this.play("hurt_left", true)
            }
            else{
                this.setVelocityX(500);
                this.play("hurt_right", true);
            }
            this.invincible = true;
            this.hitTimer = 120; 
        }
    }

    die(){
        if(this.left){
            this.play('dead_left', true);
        }
        else{
            this.play('dead_right', true);
        }
        this.setInvincible(true);
        this.body.moves = false;
    }

    setInvincible(bool){
        this.invincible = bool;
    }

    getHealth(){
        return Health;
    }

    setHealth(amount){
        if(!this.invincible){
            Health+=amount;
            eventDispatcher.emit('tookDmg', Health);
            if(Health > 100){
                Health = 100;
            }
            if(Health <= 0){
                Health = 0;
                this.die();
            }
        }
    }

    setLeft(bool){
        this.left = bool;
    }

    getPlayer(){
        return this;
    }
}
var damage, eventDispatcher, Health, jump, run;

export default Player;