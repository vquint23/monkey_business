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
        this.gotGate = false;
        this.wintext = this.add.text(350, 150, 'LEVEL COMPLETE', {fontSize: '64px', fill: '#000'});
        this.wintext.setVisible(false);
        // Used to determine which way player is facing
        this.left = false;
        // Create tilemap and background
        this.bg = this.add.tileSprite(0, 0, this.cameras.main.width / 2, this.cameras.main.height, "sky").setOrigin(0, 0);
        let scaleX = this.cameras.main.width / this.bg.width
        let scaleY = this.cameras.main.height / this.bg.height
        let scale = Math.max(scaleX, scaleY)
        this.bg.setScale(scale).setScrollFactor(0)
        this.map = this.make.tilemap({key: "city1", tileWidth: 64, tileHeight: 64});
        this.tileset = this.map.addTilesetImage("cityTiles");
        this.layer = this.map.createStaticLayer(0, this.tileset);
        // Set tile blocks to be collidable
        this.map.setCollisionBetween(0, 10000, true);
        // Create Player
        this.player = this.physics.add.sprite(this.game.config.width/2, 0, "Monkey");
        this.player.body.setSize(45, 60);
        this.player.body.setOffset(12, 0);
        // Create Staff
        this.staff = this.add.sprite(this.player.x, this.player.y, "Staff");
        this.staff.setOrigin(0, 0);
        // Create Gate (Tiled Location * 64)
        this.gate = this.add.sprite(6280, 192, "Gate");
        // Set collision between player and collidable layer
        this.physics.add.collider(this.player, this.layer);
        this.layer.setCollisionByProperty({collides: true});
        this.physics.add.collider(this.player, this.gate, null, this.gotGate = true);
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

        // this.input.on('pointerup', function (pointer) {
        //     this.player.play("attack_right", true);
        //     console.log("ATTACK");
        // }, this);
    }

    update() {
        // Reset player velocity back to 0 every frame
        this.player.setVelocityX(0);
        this.staff.setPosition(this.player.x, this.player.y);
        // console.log("Player x: " + this.player.x);
        // console.log("Player y: " + this.player.y);
        // console.log("Staff x: " + this.staff.x);
        // console.log("Staff y: " + this.staff.y);
        // Controls movement of player sprite
        this.movePlayerManager();
        // Controls main mechanic
        this.extendStaff();
        if (this.gotGate == true){
            this.wintext.setVisible(true);
            return;
        }
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

    extendStaff() {
        //this.staff.disableBody(false, false);
        //Phaser.Math.Angle.Between(this.staff.x, this.staff.y, this.game.input.mousePointer.x, this.game.input.mousePointer.y);
        if (this.game.input.mousePointer.isDown) {
            var angle = Phaser.Math.Angle.Between(this.player.x, 
                                                  this.player.y,
                                                  this.game.input.mousePointer.x + this.cameras.main.scrollX,
                                                  this.game.input.mousePointer.y + this.cameras.main.scrollY);
            var end = this.staff.x;

            this.staff.setAngle(Phaser.Math.RadToDeg(angle));
            this.extend = this.tweens.add({
                targets: this.staff,
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
            if ((this.game.input.mousePointer.x + this.cameras.main.scrollX) >= this.player.x) { // Change direction of sprite when pointer is clicked while on left or right of it.
                this.left = false;
                this.player.play("attack_right", true);
            } else {
                this.left = true;
                this.player.play("attack_left", true);
            }
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
        }
    }

    defaultAnim
}
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
            debug: true
        }
    },
    autoRound: false
}
var game = new Phaser.Game(config);