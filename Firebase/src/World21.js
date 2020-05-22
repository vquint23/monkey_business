class GameHUD extends Phaser.Scene {
    constructor(){
        super("GameHUD");
    }
    preload(){

    }
    create(){
        
    }

}

class PauseMenu extends Phaser.Scene {
    constructor() {
        super("PauseMenu");
    }
    preload(){
        //Pause image
        this.load.image("pausemenu", "../assets/Images/pausemenu.png");
        
           }
    create(){
        //this.add.image("pausemenu").setOrigin(0,0); why not?
        this.add.text(600,100, 'Paused', {fontSize: '32px', fill: '#000'});
         // Map keyboard inputs for menu 
        pauseKeys = this.input.keyboard.createCursorKeys();
        pauseKeys = this.input.keyboard.addKeys ({
             pause: Phaser.Input.Keyboard.KeyCodes.ESC,
             levelSelect: Phaser.Input.Keyboard.KeyCodes.L,
             mainMenu: Phaser.Input.Keyboard.KeyCodes.X,
          });
    }
    update(){
        if (pauseKeys.pause.isDown) {
            this.scene.resume("World2-1");
            this.scene.stop();
        }
        if (pauseKeys.levelSelect.isDown) {
            window.location = "LevelSelect.html";
        }
        if (pauseKeys.mainMenu.isDown) {
            window.location = "MainMenu.html";
        }
    }
}

class World21 extends Phaser.Scene {
    constructor() {
        super("World2-1");
    }

    preload() {
        // Import tile map
        this.load.image('sky', "../assets/Backgrounds/Sky Background.png");
        this.load.tilemapCSV('city1', "../assets/TileMaps/city1.csv");

        // Import audio
        this.load.audio("World2Theme", "../audio/music/world2.ogg");
    }

    create() {
        gameOver = false;
        paused = false;
        gotGate = false;

        // Various Text  
        healthText = this.add.text(400, 400, 'Health: 100', {fontSize: '32px', fill: '#000'});
        healthText.setVisible(true);  
        //Game over
        gameOverText = this.add.text(350, 150, 'GAME OVER', {fontSize: '64px', fill: '#623'});
        gameOverText.setVisible(false);
        // Restart 
        restartText = this.add.text(310, 200, 'PRESS ENTER TO RESTART', {fontSize: '32px', fill: '#420'});
        restartText.setVisible(false);
        // Win
        var wintext = this.add.text(350, 150, 'LEVEL COMPLETE!', {fontSize: '64px', fill: '#000'});
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
        staff = this.add.sprite(player.x-64, player.y, "Staff");
        staff.setOrigin(0, 0);

        // Used as the hitbox of the staff
        hit = this.physics.add.sprite(player.x - 64, player.y, "Hit");
        hit.setOrigin(0.5,0.5);
        hit.setVisible(false);
        hit.body.setAllowGravity(false);

        // Create Enemies
        var scorpionA = this.physics.add.sprite(1728, 2176, "Scorpion");
        var scorpionB = this.physics.add.sprite(2432, 2816, "Scorpion");
        var scorpionC = this.physics.add.sprite(1241, 1764, "Scorpion");
        var scorpionD = this.physics.add.sprite(2329, 1190, "Scorpion");
        var scorpionE = this.physics.add.sprite(3186, 2737, "Scorpion");
        var scorpionF = this.physics.add.sprite(3931, 2786, "Scorpion");
        var scorpionG = this.physics.add.sprite(4632, 489, "Scorpion");

        scorpions = this.physics.add.group();
        scorpions.add(scorpionA);
        scorpions.add(scorpionB);
        scorpions.add(scorpionC);
        scorpions.add(scorpionD);
        scorpions.add(scorpionE);
        scorpions.add(scorpionF);
        scorpions.add(scorpionG);

        // Create Gate (Tiled Location * 64)
        gate = this.add.sprite(6280, 192, "Gate");

        // Set collision between player, enemies, and collidable layer
        layer.setCollisionByProperty({collides: true});
        this.physics.add.collider(player, layer);
        this.physics.add.collider(scorpions, layer);
        this.physics.add.collider(scorpions, player, this.takeDamage, null);
        
        this.physics.add.overlap(hit, scorpions, this.hitEnemy, null, this);
        this.physics.add.overlap(player, gate, this.levelWin, null); 
        
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
            continue: Phaser.Input.Keyboard.KeyCodes.ENTER,
            pause: Phaser.Input.Keyboard.KeyCodes.ESC,
            levelSelect: Phaser.Input.Keyboard.KeyCodes.L,
            mainMenu: Phaser.Input.Keyboard.KeyCodes.X,
         });

        // Add in music
        let music = this.sound.add("World2Theme");

        let musicConfig = {
            mute: false,
            volume: 1,
            loop: true,
            delay: 0
        };

        music.play(musicConfig);
    }

    extendStaff() {
        // Controls staff extension by checking for left click
        if (this.game.input.mousePointer.isDown) {
            var mouseX = this.game.input.mousePointer.x;
            var mouseY = this.game.input.mousePointer.y;
            var camX = this.cameras.main.scrollX;
            var camY = this.cameras.main.scrollY;

            //Determine if left or right attack animation should play
            if ((mouseX+ camX) >= player.x) { 
                left = false;
                player.play("attack_right", true);
            } else {
                left = true;
                player.play("attack_left", true);
            }
            // Change direction of sprite when pointer is clicked while on left or right of it.
            var angle = Phaser.Math.Angle.Between(player.x, player.y, mouseX + camX, mouseY + camY);
            staff.setAngle(Phaser.Math.RadToDeg(angle));

            var hitOffsetX = (mouseX + camX) - player.x;
            var hitOffsetY = (mouseY + camY) - player.y;
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
            hit.setOffset(hitOffsetX, hitOffsetY);

            //resize staff
            this.tweens.add({
                targets: staff,
                scaleX: 8,
                scaleY: 3,
                duration: 30,
                repeat: 0
            });
        }

        // When mouseup, pull back staff
        else{
            this.tweens.add({
                targets: staff,
                scaleX: 1,
                scaleY: 1,
                angleX: 0,
                angleY: 0,
                duration: 30,
                repeat: 0
            });
            // reset staff hitbox
            hit.setOffset(0, 0);
        }
    }
    
    hitEnemy(hit, enemy) {
        enemy.destroy();
    }

    takeDamage(){

    }

    levelWin(){
        player.body.enable = false;
        wintext.setVisible(true);       //@todo: Win HUD
        if (cursorKeys.continue.isDown){
            window.location = "Level21.html";
        }
    }

    gameOver(){
        player.body.enable = false;
        gameOverText.setVisible(true);      //@todo: Game Over HUD
        restartText.setVisible(true);
        if (cursorKeys.continue.isDown){
            gameOverText.setVisible(false);
            restartText.setVisible(false);
            this.scene.restart();
            player.body.enable = true;
            gameOver = false;
        }
    }

    update() {
        if (gameOver){
            this.gameOver();
        }
        // Reset player velocity back to 0 every frame
        player.setVelocityX(0);
        staff.x = player.x;
        staff.y = player.y;
        hit.x = player.x;
        hit.y = player.y;
        // Controls movement of player sprite
        this.movePlayerManager();
        // Controls scorpion movement
        this.moveScorpionManager();
        //Controls pause 
        this.pauseManager();
        // Controls Staff Mechanic
        this.extendStaff();
        // Controls Health
        this.healthManager();
    }

    healthManager(){
        if (health == 0){
            gameOver = true;
        }
        else{
            
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
            player.setVelocityY(-525);
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
        if(cursorKeys.pause.isDown){
            this.scene.pause();
            this.scene.launch('PauseMenu');
        }
    }
}

var paused, cursorKeys, scorpions, gate, gotGate, wintext, pauseKeys,
player, bg, map, tileset, layer, staff, left, hit, gameOver, healthText, gameOverText, restartText;
var health = 100;

var config = {
    parent: "game-container",
    type: Phaser.AUTO,
    width: 1200,
    height: 700,
    bgColor: 0x000000,
    scene: [main2, World21, PauseMenu],
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