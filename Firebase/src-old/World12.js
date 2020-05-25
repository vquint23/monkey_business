class GameHUD extends Phaser.Scene {            //todo: ESC to pause text? add to controls menu?
    constructor(){
        super({key: "GameHUD", active: true});
    }
    preload(){
        this.load.image("healthbar", "../assets/Images/health.png");
        this.load.image("healthbase", "../assets/Images/healthbase.png");
        this.load.image("pausemenu", "../assets/Images/pausemenu.png");
    }
    create(){
        let gamePlaying = this.scene.get("World1-1");

        //Pause Stuff
        pauseBG = this.add.image(game.config.width/2, game.config.height/2, "pausemenu");
        pauseBG.setOrigin(.5, .5);
        pauseBG.setScale(.45);
        pauseBG.setVisible(false);
        // Map keyboard inputs for HUD interaction 
        hudKeys = this.input.keyboard.createCursorKeys();
        hudKeys = this.input.keyboard.addKeys ({
            continue: Phaser.Input.Keyboard.KeyCodes.ENTER,
            levelSelect: Phaser.Input.Keyboard.KeyCodes.L,
            mainMenu: Phaser.Input.Keyboard.KeyCodes.X
         });
        //Win Stuff                                                                                                     
        wintext = this.add.text(gameWidth/2, gameHeight/3, 'LEVEL COMPLETE!',
        {fontSize: '64px', fill: '#fff'});
        wintext.setOrigin(.5, .5);
        wintext.setVisible(false);
        //Lose Stuff
        gameOverText = this.add.text(gameWidth/2, gameHeight/3, 'GAME OVER', 
        {fontSize: '64px', fill: '#c70707'});
        gameOverText.setOrigin(.5, .5);
        gameOverText.setVisible(false);
        this.deathEventHappened = false;
        // Restart 
        restartText = this.add.text(gameHeight/2, gameWidth/2, 'PRESS ENTER TO RESTART', 
        {fontSize: '32px', fill: '#fff'});
        restartText.setVisible(false);
        //Continue 
        continueText = this.add.text(gameHeight/2, gameWidth/2, 'PRESS ENTER TO CONTINUE', 
        {fontSize: '32px', fill: '#fff'});
        continueText.setVisible(false);
        //Healthbar Stuff
        var healthbarX = gameWidth/1.22;        //this is specific cuz i tested it 40 times
        var healthbarY = gameWidth/21;
        healthbase = this.add.image(healthbarX, healthbarY, "healthbase");
        healthbase.setOrigin(.5,.5);
        healthbase.setScale(.3);
        healthbar = this.add.image(healthbarX, healthbarY, "healthbar");
        healthbar.setOrigin(.5,.5);
        healthbar.setScale(.3);
        //Listeners for events (health change, win, lose)
        gamePlaying.events.on('levelWin', this.winDisplay, this);
        gamePlaying.events.on('takeDmg', this.redrawHealth, this);
        gamePlaying.events.on('gameOver', this.loseDisplay, this);
        gamePlaying.events.on('pause', this.pauseMenu, this);
        gamePlaying.events.on('unpause', this.unpauseGame, this);
        
    }

    winDisplay(){
        wintext.setVisible(true);
        continueText.setVisible(true);
        if (hudKeys.continue.isDown){
            window.location = "Level31.html";
        }
    }

    redrawHealth(){
        // if taken 20 damage, healthbar is at 80% width, etc.
        if (health <= 0){
            healthbar.destroy();
        }
        healthbar.setScale((.3 *health/100), .3);
    }

    loseDisplay(){
        if(!this.deathEventHappened) {
            gameOverText.setVisible(true);
            restartText.setVisible(true);
            this.sound.stopAll();
            let damage = this.sound.add("monkeyDamage");
            damage.play();
            // Add in game over music (but only play it once)
            let deathMusic = this.sound.add("GameOverTheme");
            let musicConfig = {
                mute: false,
                volume: 0.5,
                loop: false,
                delay: 0
            };
            deathMusic.play(musicConfig);
            this.deathEventHappened = true;
        }

        if (cursorKeys.continue.isDown){
            gameOverText.setVisible(false);
            restartText.setVisible(false);
            this.scene.stop("World1-1");
            this.scene.start("World1-1");
            this.sound.stopAll();
            let button = this.sound.add("buttonForward");
            button.play();
            gameOver = false;
            health = 100;
        }
    }

    pauseMenu(){
        let button = this.sound.add("buttonForward");
        button.play();
        pauseBG.setVisible(true);       
        paused = true; 
        if (hudKeys.levelSelect.isDown) {
            let button = this.sound.add("buttonForward");
            button.play();
            window.location = "LevelSelect.html";
        }
        if (hudKeys.mainMenu.isDown) {
            let button = this.sound.add("buttonForward");
            button.play();
            window.location = "MainMenu.html";
        }
    }
    unpauseGame(){
        pauseBG.setVisible(false);            
        let button = this.sound.add("buttonForward");
        button.play();
    }
}
class World12 extends Phaser.Scene {
    constructor() {
        super("World1-1");
    }

    preload() {
        // Import tile map
        this.load.image('jungle', "../assets/Backgrounds/temp jungle.png");
        this.load.tilemapCSV('jungle2', "../assets/TileMaps/jungle2.csv");
        this.musicPlayed = false;
    }

    create() {
        this.sound.stopAll();
        gameOver = false;
        gotGate = false;
        invincible = false;
        paused = false;
        
        // Used to determine which way player is facing
        left = false;

        // Create tilemap and background
        bg = this.add.tileSprite(0, 0, this.cameras.main.width / 2, this.cameras.main.height, "jungle").setOrigin(0, 0);
        let scaleX = this.cameras.main.width / bg.width
        let scaleY = this.cameras.main.height / bg.height
        let scale = Math.max(scaleX, scaleY)
        bg.setScale(scale).setScrollFactor(0)
        map = this.make.tilemap({key: "jungle2", tileWidth: 64, tileHeight: 64});
        tileset = map.addTilesetImage("jungleTiles");
        layer = map.createStaticLayer(0, tileset);

        // Set tile blocks to be collidable
        map.setCollisionBetween(0, 10000, true);

        // Create Player
        player = this.physics.add.sprite(128, 4224, "Monkey");
        player.body.setSize(45, 60);
        player.body.setOffset(12, 0);

        // Set a timer for the running sound effect
        this.runEffectTimer = 12;

        // Create Staff
        staff = this.add.sprite(player.x-64, player.y, "Staff");
        staff.setOrigin(0, 0);
        
        // Used as the hitbox of the staff
        hit = this.physics.add.sprite(player.x - 64, player.y, "Hit");
        hit.setOrigin(0.5,0.5);
        hit.setVisible(false);
        hit.body.setAllowGravity(false);
        hit.body.setSize(10, 10);
        hit.body.setEnable(false);

        // Create Enemies
        var scorpionA = this.physics.add.sprite(1472, 1472, "Scorpion");
        var scorpionB = this.physics.add.sprite(2240, 1600, "Scorpion");
        var scorpionC = this.physics.add.sprite(1536, 3904, "Scorpion");
        var scorpionD = this.physics.add.sprite(832, 3456, "Scorpion");
        var scorpionE = this.physics.add.sprite(1344, 3456, "Scorpion");
        var scorpionF = this.physics.add.sprite(2368, 2944, "Scorpion");
        var scorpionG = this.physics.add.sprite(960, 448, "Scorpion");
        var scorpionH = this.physics.add.sprite(1024, 448, "Scorpion");
        var scorpionI = this.physics.add.sprite(1344, 448, "Scorpion");
        var scorpionJ = this.physics.add.sprite(2368, 1152, "Scorpion");
        var scorpionK = this.physics.add.sprite(2368, 768, "Scorpion");
        var scorpionL = this.physics.add.sprite(2368, 384, "Scorpion");

        var dragonflyA = this.physics.add.sprite(832, 3904, "Dragonfly");
        var dragonflyB = this.physics.add.sprite(2048, 3648, "Dragonfly");
        var dragonflyC = this.physics.add.sprite(896, 3328, "Dragonfly");
        var dragonflyD = this.physics.add.sprite(896, 2048, "Dragonfly");
        var dragonflyE = this.physics.add.sprite(2368, 320, "Dragonfly");
        var dragonflyF = this.physics.add.sprite(2112, 2880, "Dragonfly");
        var dragonflyG = this.physics.add.sprite(1664, 1920, "Dragonfly");

        scorpions = this.physics.add.group();
        scorpions.add(scorpionA);
        scorpions.add(scorpionB);
        scorpions.add(scorpionC);
        scorpions.add(scorpionD);
        scorpions.add(scorpionE);
        scorpions.add(scorpionF);
        scorpions.add(scorpionG);
        scorpions.add(scorpionH);
        scorpions.add(scorpionI);
        scorpions.add(scorpionJ);
        scorpions.add(scorpionK);
        scorpions.add(scorpionL);

        dragonflies = this.physics.add.group();
        dragonflies.add(dragonflyA);
        dragonflies.add(dragonflyB);
        dragonflies.add(dragonflyC);
        dragonflies.add(dragonflyD);
        dragonflies.add(dragonflyE);
        dragonflies.add(dragonflyF);
        dragonflies.add(dragonflyG);

        // Create Gate (Tiled Location * 64)
        gate = this.physics.add.sprite(3120, 192, "Gate");

        // Set collision between player, enemies, and collidable layer
        layer.setCollisionByProperty({collides: true});
        this.physics.add.collider(player, layer);
        this.physics.add.collider(scorpions, layer);
        this.physics.add.collider(dragonflies, layer);
        this.physics.add.collider(scorpions, scorpions);
        this.physics.add.collider(dragonflies, dragonflies);
        this.physics.add.collider(gate, layer);

        this.physics.add.collider(scorpions, player, this.takeDamage, null, this);
        this.physics.add.overlap(hit, scorpions, this.hitScorpion, null, this);
        this.physics.add.collider(dragonflies, player, this.takeDamage, null, this);
        this.physics.add.overlap(hit, dragonflies, this.hitDragonfly, null, this);
        this.physics.add.overlap(player, gate, this.levelWin, null, this); 
        
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
            pause: Phaser.Input.Keyboard.KeyCodes.Q,
            levelSelect: Phaser.Input.Keyboard.KeyCodes.L,
            mainMenu: Phaser.Input.Keyboard.KeyCodes.X,
            unpause: Phaser.Input.Keyboard.KeyCodes.ESC,
            //debug/testing:
            invincibility: Phaser.Input.Keyboard.KeyCodes.I
         });
       
        this.scene.launch('GameHUD');
    }

    extendStaff() {
        // Controls staff extension by checking for left click
        if (this.game.input.mousePointer.isDown) {
            var mouseX = this.game.input.mousePointer.x;
            var mouseY = this.game.input.mousePointer.y;
            var camX = this.cameras.main.scrollX;
            var camY = this.cameras.main.scrollY;
            hit.body.setEnable(true);

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
            hit.body.setEnable(false);
        }
    }
    
    hitScorpion(hit, enemy) {
        scorpions.remove(enemy);
        let destroy = this.sound.add("enemyDamage");
        destroy.play({volume: 1.5});
        if (left){
            enemy.play("scorpion_dead_left");
        }
        else{
            enemy.play("scorpion_dead_right");
        }
    }
    hitDragonfly(hit, enemy) {
        dragonflies.remove(enemy);
        enemy.body.allowGravity = true;
        let destroy = this.sound.add("enemyDamage");
        destroy.play({volume: 1.5});
        if (left){
            enemy.play("dragonfly_dead_left");
        }
        else{
            enemy.play("dragonfly_dead_right");
        }
    }

    //@todo: prevent infinite damage (turn on invincible for 1 second?)
    takeDamage(player, enemy){
        if(!invincible){
            health-=15;
            console.log("Current Health: " + health);
            let damage = this.sound.add("monkeyDamage");
            damage.play();
            if(left){
                player.setVelocityX(-100);
                player.setVelocityY(-100);
                //player.play("hurt_left, true")
            }
            else{
                player.setVelocityX(100);
                player.setVelocityY(-100);
                player.play("hurt_right");
            }           
            this.events.emit('takeDmg');
        }
    }

    levelWin(){
        this.events.emit('levelWin');
        victory = true;
        if (victory && cursorKeys.continue.isDown) {
            victory = false;
            window.location = "Level21.html";
        } 
    }

    gameOver(){
        player.body.enable = false;
        this.events.emit('gameOver');
    }

    update() {
        if(!this.musicPlayed) {
            // Add in music
            // I had to move it here since it would play over itself when the stage restarted
            let music = this.sound.add("World1Theme");
            let musicConfig = {
                mute: false,
                volume: 0.5,
               loop: true,
               delay: 0
            };
            music.play(musicConfig);
            this.musicPlayed = true;
        }
        if (gameOver){
            this.sound.remove(music);
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
        // Controls dragonfly movement
        this.moveDragonflyManager();
        //Controls pause 
        this.pauseManager();
        // Controls Staff Mechanic
        this.extendStaff();
        // Controls Health
        this.healthManager();
        //testing
        this.invincibilityManager();
    }

    healthManager(){
        if (health <= 0){
            gameOver = true;
        }
    }
    //for testing/ debugging
    invincibilityManager(){
        if(cursorKeys.invincibility.isDown){
            console.log("Invincibility was activated.");
            invincible = true;
        }
    }
    movePlayerManager() {
        // Moves player according to buttons pressed and updates sprite states
        if (cursorKeys.left.isDown) {
            left = true;
            player.setVelocityX(-300);
            if (player.body.onFloor()) {
                player.play("run_left", true);
                this.runEffectTimer--;

                if(this.runEffectTimer === 0) {
                    let run = this.sound.add("monkeyRunning");
                    run.play({volume: 3});
                    this.runEffectTimer = 12;
                }
            } 
        } else if (cursorKeys.right.isDown) {
            left = false;
            player.setVelocityX(300);
            if (player.body.onFloor()) {
                player.play("run_right", true);
                this.runEffectTimer--;

                if(this.runEffectTimer === 0) {
                    let run = this.sound.add("monkeyRunning");
                    run.play({volume: 3});
                    this.runEffectTimer = 12;
                }
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
            let jump = this.sound.add("monkeyJump");
            jump.play({volume: 1.5});
            
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
            child.setInteractive();
            if (gameOver){
                child.setVelocityX(0);
                child.setVelocityY(0);
            }
            else if (player.x < child.x){
                child.play("scorpion_idle_left", true);
                child.setVelocityX(-250);
            }
            else {
                child.play("scorpion_idle_right", true);
                child.setVelocityX(250);
            }
            if (child.body.onFloor() && player.y < child.y){
                child.setVelocityY(-500);
             }
        });
        
    }

    moveDragonflyManager(){
        Phaser.Actions.Call(dragonflies.getChildren(), child => {
            child.body.moves = true;
            child.body.allowGravity = false;
            child.setInteractive();
            if (player.x < child.x){
                child.play("dragonfly_left", true);
                if ((child.x - player.x) <= 200 && (child.y - player.y) <= 200) {
                    child.setVelocityX(200);
                    child.setVelocityY(-200);
                } else {
                    child.setVelocityX(0);
                    child.setVelocityY(0);
                }
            }
            else {
                child.play("dragonfly_right", true);
                if ((player.x - child.x) <= 200 && (player.y - child.y) <= 200) {
                    child.setVelocityX(-200);
                    child.setVelocityY(-200);
                } else {
                    child.setVelocityX(0);
                    child.setVelocityY(0);
                }
            }
        });   
    }

    pauseManager(){
        if(cursorKeys.pause.isDown){
            this.events.emit('pause');
            paused = true;
            player.body.moves = false;
        }
        if(cursorKeys.unpause.isDown){
            paused = false;
            player.body.moves = true;
            this.events.emit('unpause');
        }
        if (cursorKeys.levelSelect.isDown) {
            let button = this.sound.add("buttonForward");
            button.play();
            window.location = "LevelSelect.html";
        }
        if (cursorKeys.mainMenu.isDown) {
            let button = this.sound.add("buttonForward");
            button.play();
            window.location = "MainMenu.html";
        }
    }
}

var config = {
    parent: "game-container",
    type: Phaser.AUTO,
    width: 1200,
    height: 700,
    bgColor: 0x000000,
    scene: [main, World12, GameHUD],
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
var beenPaused, pauseBG, cursorKeys, scorpions, dragonflies, gate, gotGate, wintext, pauseKeys, hudKeys, paused, music,
player, bg, map, tileset, layer, staff, left, hit, gameOver, healthbar, healthbase, gameOverText, restartText,
continueText, invincible, victory;
var health = 100;
var gameWidth = game.config.width;
var gameHeight = game.config.height;