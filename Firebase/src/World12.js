class World11 extends Phaser.Scene {
    constructor() {
        super("World1-1");
    }

    preload() {
        // Import tile map
        this.load.image('jungle_bg', "../assets/Backgrounds/temp jungle.png");
        this.load.tilemapCSV('jungle', "../assets/TileMaps/jungle2.csv");
    }

    create() {
        // Used to determine which way player is facing
        this.left = false;
        // Used to determine the state of the staff
        this.extended = false;

        // Create tilemap and background
        this.bg = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, "jungle_bg").setOrigin(0, 0);
        this.map = this.make.tilemap({key: "jungle", tileWidth: 64, tileHeight: 64});
        this.tileset = this.map.addTilesetImage("jungleTiles");
        this.layer = this.map.createStaticLayer(0, this.tileset);

        // Set tile blocks to be collidable
        this.map.setCollisionBetween(0,8);

        // Create Player
        this.player = this.physics.add.sprite(128, 4224, "Monkey");
        this.player.setInteractive();

        // Set a timer for the running sound effect
        this.runEffectTimer = 12;

        // Create Staff
        this.staff = this.add.sprite(this.player.x - 64, this.player.y, "Staff");
        this.staff.setOrigin(0, 0);

        // Used as the hitbox of the staff
        this.hit = this.physics.add.sprite(this.player.x - 64, this.player.y, "Hit");
        this.hit.setOrigin(0.5,0.5);
        this.hit.setVisible(false);
        this.hit.body.setAllowGravity(false);

        // Create enemies
        // this.scorpion1 = this.physics.add.sprite(1500, 1500, "Scorpion");
        // this.scorpion1.setImmovable(true);
        // this.scorpion1.setInteractive();
        // this.scorpion2 = this.physics.add.sprite(2000, 1500, "Scorpion");
        // this.scorpion2.setImmovable(true);
        // this.scorpion2.setInteractive();
        // this.scorpion3 = this.physics.add.sprite(3500, 1500, "Scorpion");
        // this.scorpion3.setImmovable(true);
        // this.scorpion3.setInteractive();
        // this.scorpion4 = this.physics.add.sprite(4500, 1500, "Scorpion");
        // this.scorpion4.setImmovable(true);
        // this.scorpion4.setInteractive();
        this.dragonfly1 = this.physics.add.sprite(768, 3904, "Dragonfly");
        this.dragonfly1.setImmovable(true);
        this.dragonfly1.body.setAllowGravity(false);
        this.dragonfly1.setInteractive();


        this.scorpions = this.physics.add.group();
        this.dragonflies = this.physics.add.group();
        // this.scorpions.add(this.scorpion1);
        // this.scorpions.add(this.scorpion2);
        // this.scorpions.add(this.scorpion3);
        //this.scorpions.add(this.scorpion4);
        this.dragonflies.add(this.dragonfly1);

        // Add win gate
        this.gate = this.physics.add.sprite(3072, 128, "Gate");

        // Set collision between player, enemies, and collidable layer
        this.physics.add.collider(this.player, this.layer);
        // this.physics.add.overlap(this.hit, this.map, function(player, layer) {
        //     console.log("Pogo");
        // });
        //this.physics.add.collider(this.scorpions, this.layer);
        this.physics.add.collider(this.dragonflies, this.layer);
        //this.physics.add.collider(this.scorpions, this.scorpions);
        this.physics.add.collider(this.dragonflies, this.dragonflies);
        this.physics.add.collider(this.gate, this.layer);
        this.physics.add.overlap(this.gate, this.player, function(gate, player) {
            window.location = "Level21.html";
        });

        // Set collision between player and enemies
        // this.physics.add.collider(this.enemies, this.player, function(enemy, player) {
        //     if (this.player.)
        // });

        //this.physics.add.overlap(this.hit, this.scorpions, this.hitEnemy, null, this);
        this.physics.add.overlap(this.hit, this.dragonflies, this.hitEnemy, null, this);

        this.layer.setCollisionByProperty({collides: true});

        // Set up camera that follows player
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player);

        // Map keyboard inputs for movement to ASD and Space 
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.cursorKeys = this.input.keyboard.addKeys ({
            up: Phaser.Input.Keyboard.KeyCodes.SPACE,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
         });
        
        // Add in music
        let music = this.sound.add("World1Theme");

        let musicConfig = {
            mute: false,
            volume: 0.5,
            loop: true,
            delay: 0
        };

        music.play(musicConfig);
    }  

    update() {
        // Reset player velocity back to 0 every frame
        this.player.setVelocityX(0);
        this.staff.x = this.player.x;
        this.staff.y = this.player.y;
        this.hit.x = this.player.x;
        this.hit.y = this.player.y;

        // Controls movement of player sprite
        this.movePlayerManager();

        this.extendStaff();

        // Controls movement of scorpions
        this.moveScorpionManager();
        this.moveDragonflyManager();
    }

    movePlayerManager() {
        // Moves player according to buttons pressed and updates sprite states
        if (this.cursorKeys.left.isDown) {
            this.left = true;
            this.player.setVelocityX(-300);
            if (this.player.body.onFloor()) {
                this.player.play("run_left", true);
                this.runEffectTimer--;

                if(this.runEffectTimer === 0) {
                    let run = this.sound.add("monkeyRunning");
                    run.play({volume: 3});
                    this.runEffectTimer = 12;
                }
            } 
        } else if (this.cursorKeys.right.isDown) {
            this.left = false;
            this.player.setVelocityX(300);
            if (this.player.body.onFloor()) {
                this.player.play("run_right", true);
                this.runEffectTimer--;

                if(this.runEffectTimer === 0) {
                    let run = this.sound.add("monkeyRunning");
                    run.play({volume: 3});
                    this.runEffectTimer = 12;
                }
            }
        } else {
            if (this.left) {
                this.player.play("idle_left", true);
            } else {
                this.player.play("idle_right", true);
            }
        }
        if (this.cursorKeys.up.isDown && this.player.body.onFloor())
        {
            let jump = this.sound.add("monkeyJump");
            jump.play({volume: 1.5});

            this.player.setVelocityY(-525);
        }
        if (!this.player.body.onFloor()) {
            if (this.left) {
                this.player.play("jump_left", true);
            } else {
                this.player.play("jump_right", true);
            }
        }
    }

    moveScorpionManager(){
        Phaser.Actions.Call(this.scorpions.getChildren(), child => {
            child.body.moves = true;
            if (this.player.x < child.x){
                child.play("scorpion_idle_left", true);
                child.setVelocityX(-100);
            }
            else {
                child.play("scorpion_idle_right", true);
                child.setVelocityX(100);
            }
            if (child.body.onFloor() && this.player.y < child.y){
                child.setVelocityY(-500);
             }
        });   
    }
    
    moveDragonflyManager(){
        var drangle = 0;
        Phaser.Actions.Call(this.dragonflies.getChildren(), child => {
            child.body.moves = true;
            if (this.player.x < child.x){
                child.play("dragonfly_left", true);
                if ((child.x - this.player.x) <= 100 && (child.y - this.player.y) <= 100) {
                    child.setVelocityX(200);
                    child.setVelocityY(-200);
                } else {
                    child.setVelocityX(0);
                    child.setVelocityY(0);
                }
            }
            else {
                child.play("dragonfly_right", true);
                if ((this.player.x - child.x) <= 100 && (this.player.y - child.y) <= 100) {
                    child.setVelocityX(-200);
                    child.setVelocityY(-200);
                } else {
                    child.setVelocityX(0);
                    child.setVelocityY(0);
                }
            }
        });   
    }

    extendStaff() {
        // Controls staff extension by checking for left click
        if (this.game.input.mousePointer.isDown) {
            var mouseX = this.game.input.mousePointer.x;
            var mouseY = this.game.input.mousePointer.y;
            var camX = this.cameras.main.scrollX;
            var camY = this.cameras.main.scrollY;

            //Determine if left or right attack animation should play
            if ((mouseX+ camX) >= this.player.x) { 
                this.left = false;
                this.player.play("attack_right", true);
            } else {
                this.left = true;
                this.player.play("attack_left", true);
            }
            // Change direction of sprite when pointer is clicked while on left or right of it.
            var angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, mouseX + camX, mouseY + camY);
            this.staff.setAngle(Phaser.Math.RadToDeg(angle));

            var hitOffsetX = (mouseX + camX) - this.player.x;
            var hitOffsetY = (mouseY + camY) - this.player.y;
            //Change hitbox of staff offset - radius of 250

            if (hitOffsetX < -250){
                hitOffsetX = -250;
            }
            if (hitOffsetX > 250){
                hitOffsetX = 250;
            }
            if (hitOffsetY < -250){
                hitOffsetY = -250;
            }
            if (hitOffsetY > 250){
                hitOffsetY = 250;
            }
            this.hit.setOffset(hitOffsetX, hitOffsetY);

            //resize staff
            this.tweens.add({
                targets: this.staff,
                scaleX: 8,
                scaleY: 3,
                duration: 30,
                repeat: 0
            });
        }

        // When mouseup, pull back staff
        else{
            this.tweens.add({
                targets: this.staff,
                scaleX: 1,
                scaleY: 1,
                angleX: 0,
                angleY: 0,
                duration: 30,
                repeat: 0
            });
            // reset staff hitbox
            this.hit.setOffset(0, 0);
        }
    }

    hitEnemy(hit, enemy) {
        
        enemy.destroy();

        let destroy = this.sound.add("enemyDamage");
        destroy.play({volume: 1.5});
    }

}
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
            debug: true
        }
    },
    autoRound: false
}
var game = new Phaser.Game(config);