import Player from '../../Player.js';
import Scorpion from '../../enemies/scorpion.js';
import EventsDispatcher from '../../EventsDispatcher.js';

class Level extends Phaser.Scene {
    Data;

    constructor(keyname){
        super({key: keyname});
    }

    init(data){
        this.Data = data;
    }

    preload(){}

    create(){
        // game initialization
        eventDispatcher = EventsDispatcher.getInstance();   // events dispatcher init
        gameOver = false;   // game is not over
        musicOn = false;    // music not playing
        paused = false;     // game is not paused
        left = false;   // player starts facing right

        //set background
        var bg = this.add.tileSprite(0, 0, 1090, 650, this.Data.Background)
            .setOrigin(0, 0)
            .setScrollFactor(0);

        // map setup
        var map = this.make.tilemap({key: this.Data.TileMap, tileWidth: 64, tileHeight: 64});
        var tileset = map.addTilesetImage(this.Data.TileSet);
        var tilelayer = map.createStaticLayer(0, tileset);

        // Set tile blocks to be collidable
        map.setCollisionBetween(0, 10000, true);

        // camera setup
        var camera = this.cameras.main;
        camera.setViewport(50, 45, 1090, 650)
                   .setBounds(0, 0, map.widthInPixels, map.heightInPixels);;
        
        // player setup
        var playerCoords = this.Data.Player;
        player = new Player({scene: this, x: playerCoords.x, y: playerCoords.y}); 
        camera.startFollow(player);

        // enemies setup
        var scorpionCoords = this.Data.Scorpions;
        var i = 0;
        scorpions = this.physics.add.group();
        while(scorpionCoords.x[i] != null){
            scorpions.add(new Scorpion(
                {scene: this, 
                    x: scorpionCoords.x[i],  
                    y: scorpionCoords.y[i]
                }));
                i++;
        }
        var dragonflyCoords = this.Data.Dragonflies;
        var i = 0;
        dragonflies = this.physics.add.group();
        while(dragonflyCoords.x[i] != null){
            dragonflies.add(new Dragonfly(
                {scene: this, 
                    x: dragonflyCoords.x[i],  
                    y: dragonflyCoords.y[i]
                }));
                i++;
        }       
         // gate setup 
         var gateCoords = this.Data.Gate;
         gate = this.physics.add.sprite(gateCoords.x, gateCoords.y, "Gate");

        // collisions setup
        this.physics.add.collider(player, tilelayer);
        this.physics.add.collider(scorpions, tilelayer);
        this.physics.add.collider(gate, tilelayer);

        enemyCollider = this.physics.add.collider(player, scorpions, this.damage);
        this.physics.add.overlap(player, gate, this.levelWin, null, this); 
        
       
        // keyboard inputs for movement to ASD and Space 
        cursorKeys = this.input.keyboard.createCursorKeys();
        cursorKeys = this.input.keyboard.addKeys ({
            up: Phaser.Input.Keyboard.KeyCodes.SPACE,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D, 
        });

        //debugging/testing:
        this.input.keyboard.on('keyup_I', this.setInvincible, this);
	
    }

    update(){
        // Game Over?
        if (gameOver){
            this.sound.remove(music);
            this.gameOver();
        }
        // Music
        if (!musicOn){
            music = this.sound.add(this.Data.Music);
            var musicConfig = {
                mute: false,
                volume: 0.5,
               loop: true,
               delay: 0
            };
            music.play(musicConfig);
            musicOn = true;
        }
        //Player
        player.update();
        this.movePlayerManager();
        this.playerHealthManager();
        // Enemies
        this.moveScorpionManager();
    }

    gameOver(){
        player.die();
        eventDispatcher.emit('gameOver');
    }

    levelWin(){
        player.setVisible(false);
        //player.body.moves = false;
        //staff.setVisible(false);
        eventDispatcher.emit('levelWin'); 
    }

    damage(){
        player.setHealth(-15);
        player.takeDamage();
     }

    playerHealthManager(){
        if(player.getHealth() <= 0){
            gameOver = true;
        }
    }
    movePlayerManager(){
        // Moves player according to buttons pressed and updates sprite states
        if (cursorKeys.left.isDown && !gameOver) {
            player.setLeft(true);
            player.moveLeft();
        } 
        else if (cursorKeys.right.isDown && !gameOver) {
            player.setLeft(false);
            player.moveRight();
        } 
        else if (!gameOver) {
            player.idle();
        }
        if (cursorKeys.up.isDown && player.body.onFloor() && !gameOver)
        {
            player.jump();
        }
        if (!player.body.onFloor() && !gameOver) {
            player.airborne();
        }
    }

    moveScorpionManager(){
        Phaser.Actions.Call(scorpions.getChildren(), child => {
            child.body.moves = true;
            if (gameOver){
                child.wander();
            }
            else if(!paused){
                if (player.x < child.x){
                    child.moveLeft();
                }
                else {
                    child.moveRight();
                }
                if (child.body.onFloor() && player.y < child.y){
                    child.jump();
                 }
            }
        });
    } 

    getPlayer(){
        return player;
    }
    //for testing/ debugging
    setInvincible(){
        eventDispatcher.emit('invincible');
        player.setInvincible(true);
    }

}
var cursorKeys, 
    dragonflies,
    enemies,
    enemyCollider,
    eventDispatcher,
    gameOver,
    gate,
    left,
    music,
    musicOn,
    paused,
    player,
    scorpions;

    export default Level;

