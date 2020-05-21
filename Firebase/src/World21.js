class World21 extends Phaser.Scene {
    constructor() {
        super("World2-1");
    }

    preload() {
        // Import tile map
        this.load.image('sky', "../assets/Backgrounds/Sky Background.png");
        this.load.tilemapCSV('city1', "../assets/TileMaps/city1.csv");
    }

    create() {
        paused = false;
        gotGate = false;
        wintext = this.add.text(350, 150, 'LEVEL COMPLETE', {fontSize: '64px', fill: '#000'});
        wintext.setVisible(false);

        // Used to determine which way player is facing
        left = false;

        // Create tilemap and background
        bg = this.add.tileSprite(0, 0, this.cameras.main.width / 2, this.cameras.main.height, "sky").setOrigin(0, 0);
        let scaleX = this.cameras.main.width / bg.width
        let scaleY = this.cameras.main.height / bg.height
        let scale = Math.max(scaleX, scaleY)
        bg.setScale(scale).setScrollFactor(0)
        map = this.make.tilemap({key: "city1", tileWidth: 64, tileHeight: 64});
        tileset = map.addTilesetImage("cityTiles");
        layer = map.createStaticLayer(0, tileset);

        // Set tile blocks to be collidable
        map.setCollisionBetween(0, 10000, true);

        // Create Player
        player = this.physics.add.sprite(this.game.config.width/2, 0, "Monkey");
        player.body.setSize(45, 60);
        player.body.setOffset(12, 0);

        // Create Staff
        staff = this.add.sprite(player.x, player.y, "Staff");
        staff.setOrigin(0, 0);

        // Create Enemies
        scorpionA = this.physics.add.sprite(1728, 1865, "Scorpion");
        scorpionB = this.physics.add.sprite(2432, 2816, "Scorpion");

        scorpions = this.physics.add.group();
        scorpions.add(scorpionA);
        scorpions.add(scorpionB);


        // Create Gate (Tiled Location * 64)
        gate = this.add.sprite(6280, 192, "Gate");

        // Set collision between player, enemies, and collidable layer
        this.physics.add.collider(player, layer);
        layer.setCollisionByProperty({collides: true});
        this.physics.add.collider(player, gate, null, gotGate = true);
        this.physics.add.collider(scorpions, layer);

        // Set up camera that follows player
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(player);

        // Map keyboard inputs for movement to ASD and Space 
        cursorKeys = this.input.keyboard.createCursorKeys();
        cursorKeys = this.input.keyboard.addKeys ({
            up: Phaser.Input.Keyboard.KeyCodes.SPACE,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D, 
            pause: Phaser.Input.Keyboard.KeyCodes.ENTER
         });

        // this.input.on('pointerup', function (pointer) {
        //     this.player.play("attack_right", true);
        //     console.log("ATTACK");
        // }, this);
    }

    update() {
        // Reset player velocity back to 0 every frame
        player.setVelocityX(0);
        staff.setPosition(player.x, player.y);
        // console.log("Player x: " + this.player.x);
        // console.log("Player y: " + this.player.y);
        // console.log("Staff x: " + this.staff.x);
        // console.log("Staff y: " + this.staff.y);
        // Controls movement of player sprite
        this.movePlayerManager();
        // Controls scorpion movement
        this.moveScorpionManager();
        // Controls main mechanic
        this.extendStaff();
        //Controls pause 
        this.pauseManager();

    }

    extendStaff() {
        //this.staff.disableBody(false, false);
        //Phaser.Math.Angle.Between(this.staff.x, this.staff.y, this.game.input.mousePointer.x, this.game.input.mousePointer.y);
        if (this.game.input.mousePointer.isDown) {
            var angle = Phaser.Math.Angle.Between(player.x, 
                                                  player.y,
                                                  this.game.input.mousePointer.x + this.cameras.main.scrollX,
                                                  this.game.input.mousePointer.y + this.cameras.main.scrollY);
            var end = staff.x;

            staff.setAngle(Phaser.Math.RadToDeg(angle));
            this.extend = this.tweens.add({
                targets: staff,
                scaleX: 8,
                scaleY: 3,
                duration: 30,
                repeat: 0
            });
            this.scaleY = 3;
            // for (var i = 0; i < 8; i++) {
            //     this.staff.scaleX++;
            // if ((end >= this.game.input.mousePointer.x + this.cameras.main.scrollX)) {
            //     this.extend.stop();
            // }
            // }
            if ((this.game.input.mousePointer.x + this.cameras.main.scrollX) >= player.x) { // Change direction of sprite when pointer is clicked while on left or right of it.
                left = false;
                player.play("attack_right", true);
            } else {
                left = true;
                player.play("attack_left", true);
            }
        } else {
            this.tweens.add({
                targets: staff,
                scaleX: 1,
                scaleY: 1,
                angleX: 0,
                angleY: 0,
                duration: 30,
                repeat: 0
            });
        }
    }

    movePlayerManager() {
        // Moves player according to buttons pressed and updates sprite states
        if (cursorKeys.left.isDown) {
            left = true;
            player.setVelocityX(-300);
            if (player.body.onFloor()) {
                player.play("run_left", true);
            } 
        } else if (cursorKeys.right.isDown) {
            left = false;
            player.setVelocityX(300);
            if (player.body.onFloor()) {
                player.play("run_right", true);
            }
        } else {
            if (left) {
                player.play("idle_left", true);
            } else {
                player.play("idle_right", true);
            }
        }
        if (cursorKeys.up.isDown && player.body.onFloor())
        {
            player.setVelocityY(-500);
        }
        if (!player.body.onFloor()) {
            if (left) {
                player.play("jump_left", true);
            } else {
                player.play("jump_right", true);
            }
        }
    }

    moveScorpionManager(){
        Phaser.Actions.Call(scorpions.getChildren(), child => {
            child.body.moves = true;
            if (player.x < child.x){
                child.play("scorpion_idle_left", true);
                child.setVelocityX(-100);
            }
            else {
                child.play("scorpion_idle_right", true);
                child.setVelocityX(100);
            }
            if (child.body.onFloor() && player.y < child.y){
                child.setVelocityY(-500);
             }
        });
        
    } 

    pauseManager(){
        if(cursorKeys.pause.isDown && !paused){
            //this.scene.pause();
            //open pause scene
        }
        if (cursorKeys.pause.isDown && paused){
            //close pause scene
            //this.scene.resume();
        }
        this.paused = !paused;
    }

    defaultAnim
}

var speed;
var loop;
var delay;
var paused;
var scorpionA;
var scorpionB;
var cursorKeys;
var scorpions;
var gate;
var gotGate;
var wintext;
var player;
var bg;
var map;
var tileset;
var layer;
var staff;
var left;


var config = {
    parent: "game-container",
    type: Phaser.AUTO,
    width: 1200,
    height: 700,
    bgColor: 0x000000,
    scene: [main2, World21],
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