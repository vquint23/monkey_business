class World11 extends Phaser.Scene {
    constructor() {
        super("World1-1");
    }

    preload() {
        // Import tile map
        this.load.image('jungle_bg', "../assets/Backgrounds/temp jungle.png");
        this.load.tilemapCSV('jungle', "../assets/TileMaps/jungle1.csv");

        // Import audio
        this.load.audio("World1Theme", "../audio/world one theme in game mix.ogg");
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
        this.player = this.physics.add.sprite(this.game.config.width/5, 1700, "Monkey");
        this.player.setInteractive();

        // Create Staff
        this.staff = this.add.sprite(this.player.x - 64, this.player.y, "Staff");
        this.staff.setOrigin(0, 0);

        // Used as the hitbox of the staff
        this.hit = this.physics.add.sprite(this.player.x - 64, this.player.y, "Hit");
        this.hit.setOrigin(0.5,0.5);
        this.hit.setVisible(false);
        this.hit.body.setAllowGravity(false);

        // Create enemies
        this.scorpion1 = this.physics.add.sprite(1500, 1500, "Scorpion");
        this.scorpion1.setImmovable(true);
        this.scorpion1.setInteractive();
        this.scorpion2 = this.physics.add.sprite(2000, 1500, "Scorpion");
        this.scorpion2.setImmovable(true);
        this.scorpion2.setInteractive();
        this.scorpion3 = this.physics.add.sprite(3500, 1500, "Scorpion");
        this.scorpion3.setImmovable(true);
        this.scorpion3.setInteractive();
        this.scorpion4 = this.physics.add.sprite(4500, 1500, "Scorpion");
        this.scorpion4.setImmovable(true);
        this.scorpion4.setInteractive();
        this.scorpion5 = this.physics.add.sprite(4500, 3000, "Scorpion");
        this.scorpion5.setImmovable(true);
        this.scorpion5.setInteractive();
        this.scorpion6 = this.physics.add.sprite(4500, 3000, "Scorpion");
        this.scorpion6.setImmovable(true);
        this.scorpion6.setInteractive();
        this.scorpion7 = this.physics.add.sprite(4500, 3000, "Scorpion");
        this.scorpion7.setImmovable(true);
        this.scorpion7.setInteractive();
        this.scorpion8 = this.physics.add.sprite(4500, 3000, "Scorpion");
        this.scorpion8.setImmovable(true);
        this.scorpion8.setInteractive();


        this.enemies = this.physics.add.group();
        this.enemies.add(this.scorpion1);
        this.enemies.add(this.scorpion2);
        this.enemies.add(this.scorpion3);
        this.enemies.add(this.scorpion4);
        this.enemies.add(this.scorpion5);
        this.enemies.add(this.scorpion6);
        this.enemies.add(this.scorpion7);
        this.enemies.add(this.scorpion8);

        // Add win gate
        this.gate = this.physics.add.sprite(9472, 512, "Gate");

        // Set collision between player, enemies, and collidable layer
        this.physics.add.collider(this.player, this.layer);
        // this.physics.add.overlap(this.hit, this.map, function(player, layer) {
        //     console.log("Pogo");
        // });
        this.physics.add.collider(this.enemies, this.layer);
        this.physics.add.collider(this.enemies, this.enemies);
        this.physics.add.collider(this.gate, this.layer);
        this.physics.add.overlap(this.gate, this.player, function(gate, player) {
            window.location = "Level21.html";
        })

        // Set collision between player and enemies
        // this.physics.add.collider(this.enemies, this.player, function(enemy, player) {
        //     if (this.player.)
        // });

        this.physics.add.overlap(this.hit, this.enemies, this.hitEnemy, null, this);

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

        // Controls staff extension by checking for left click
        this.input.on('pointerdown', function (pointer) {
            if (this.extended) {
                this.extended = false;
            } else {
                this.extended = true;
                if ((this.game.input.mousePointer.x + this.cameras.main.scrollX) >= this.player.x) { // Change direction of sprite when pointer is clicked while on left or right of it.
                    this.left = false;
                    this.player.play("attack_right", true);
                } else {
                    this.left = true;
                    this.player.play("attack_left", true);
                }
            }
            if (this.extended) {
                //this.staff.setActive(true); 
                var angle = Phaser.Math.Angle.Between(this.player.x, 
                                                      this.player.y,
                                                      this.game.input.mousePointer.x + this.cameras.main.scrollX,
                                                      this.game.input.mousePointer.y + this.cameras.main.scrollY);
    
                this.staff.setAngle(Phaser.Math.RadToDeg(angle));
                if ((Phaser.Math.RadToDeg(angle) >= 0) && (Phaser.Math.RadToDeg(angle) <= 180)) {
                    this.hit.setOffset((this.game.input.mousePointer.x + this.cameras.main.scrollX) - this.player.x, (this.game.input.mousePointer.y + this.cameras.main.scrollY) - this.player.y);
                }
                else if ((Phaser.Math.RadToDeg(angle) <= 0) && (Phaser.Math.RadToDeg(angle) >= -180)) {
                    this.hit.setOffset((this.game.input.mousePointer.x + this.cameras.main.scrollX) - this.player.x, (this.game.input.mousePointer.y + this.cameras.main.scrollY) - this.player.y);
                }
                this.tweens.add({
                    targets: this.staff,
                    scaleX: 8,
                    scaleY: 3,
                    duration: 30,
                    repeat: 0
                })
                // this.pogo = new Phaser.Geom.Rectangle(this.game.input.mousePointer.x + this.cameras.main.scrollX,
                //     this.game.input.mousePointer.y + this.cameras.main.scrollY,
                //     20, 20);
                
                // if (this.map.getTilesWithinShape(this.pogo, this.cameras.main).index == null) {
                //     console.log(this.map.getTilesWithinShape(this.pogo, this.cameras.main).index);
                // }
            } else {
                this.tweens.add({
                    targets: this.staff,
                    scaleX: 1,
                    scaleY: 1,
                    angleX: 0,
                    angleY: 0,
                    duration: 30,
                    repeat: 0
                });
                this.hit.setOffset(0, 0);
                //this.staff.setActive(false);
            }
        }, this);
        
    }

        // Add in music
        //  this.music = this.sound.add("World1Theme");

        //  var musicConfig = {
        //      mute: false,
        //      volume: 1,
        //      loop: true,
        //      delay:0
        //  }

        //  this.music.play(musicConfig);

    update() {
        // Reset player velocity back to 0 every frame
        this.player.setVelocityX(0);
        this.staff.x = this.player.x;
        this.staff.y = this.player.y;
        this.hit.x = this.player.x;
        this.hit.y = this.player.y;

        // Controls movement of player sprite
        this.movePlayerManager();

        // Controls movement of scorpions
        this.moveScorpionManager();
    }

    movePlayerManager() {
        // Moves player according to buttons pressed and updates sprite states
        if (this.cursorKeys.left.isDown) {
            this.left = true;
            this.player.setVelocityX(-300);
            if (this.player.body.onFloor()) {
                this.player.play("run_left", true);
            } 
        } else if (this.cursorKeys.right.isDown) {
            this.left = false;
            this.player.setVelocityX(300);
            if (this.player.body.onFloor()) {
                this.player.play("run_right", true);
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
            this.player.setVelocityY(-500);
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
        Phaser.Actions.Call(this.enemies.getChildren(), child => {
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

    hitEnemy(hit, enemy) {
        enemy.destroy();
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