class World11 extends Phaser.Scene {
    constructor() {
        super("World1-1");
    }

    preload() {
        // Import tile map
        this.load.image('jungle_bg', "../assets/Backgrounds/temp jungle.png");
        this.load.tilemapCSV('jungle', "../assets/TileMaps/jungle_jungle.csv");
    }

    create() {
        // Used to determine which way player is facing
        this.left = false;

        // Create tilemap and background
        this.bg = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, "jungle_bg").setOrigin(0, 0);
        this.map = this.make.tilemap({key: "jungle", tileWidth: 64, tileHeight: 64});
        this.tileset = this.map.addTilesetImage("jungleTiles");
        this.layer = this.map.createStaticLayer(0, this.tileset);

        // Set tile blocks to be collidable
        this.map.setCollisionBetween(0,8);

        // Create Player
        this.player = this.physics.add.sprite(this.game.config.width/2, 0, "Monkey");

        // Create Staff
        this.staff = this.add.sprite(this.player.x, this.player.y, "Staff");
        this.staff.setOrigin(0.5, 0.5);

        // Set collision between player and collidable layer
        this.physics.add.collider(this.player, this.layer);

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
            var angle = Phaser.Math.Angle.BetweenPoints(this.player, this.game.input.mousePointer);

            this.staff.setAngle(Phaser.Math.RadToDeg(angle));
            this.staff.setScale(2);
            if ((this.game.input.mousePointer.x + this.cameras.main.scrollX) >= this.player.x) { // Change direction of sprite when pointer is clicked while on left or right of it.
                this.left = false;
                this.player.play("attack_right", true);
            } else {
                this.left = true;
                this.player.play("attack_left", true);
            }
        } else {
            this.staff.setAngle(0);
            this.staff.setScale(1);
        }
    }

    defaultAnim

}