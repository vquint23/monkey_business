var config = {
    type: Phaser.AUTO,
    width: 1100,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', '../../assets/Backgrounds/Sky Background.png');
    this.load.image('ground', '../../assets/platform.png');
    this.load.image('star', '../../assets/star.png');
    this.load.image('bomb', '../../assets/Sprites/Scorpion Static.png');
    this.load.spritesheet('dude', '../../assets/Sprites/SunWukong.png', { frameWidth: 64, frameHeight: 64 });
}

function create ()
{
    //  A simple background for our game
    this.add.image(400, 300, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 700, 'ground').setScale(3.5).refreshBody();

    //  Now let's create some ledges
    platforms.create(600, 500, 'ground');
    platforms.create(50, 400, 'ground');
    platforms.create(750, 320, 'ground');

    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'dude');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 20, end: 23 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 16, end: 19 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'jump',
        frames: [ {key: 'dude',  frame: 24 } ],
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'die',
        frames: [ {key: 'dude',  frame: 30 } ],
        frameRate: 10
    });

    //  Input Events
    cursors = this.input.keyboard.addKeys(
        {up:Phaser.Input.Keyboard.KeyCodes.SPACE,
        down:Phaser.Input.Keyboard.KeyCodes.S,
        left:Phaser.Input.Keyboard.KeyCodes.A,
        right:Phaser.Input.Keyboard.KeyCodes.D,
        continue:Phaser.Input.Keyboard.KeyCodes.ENTER
        }
    );


    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {

        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    bombs = this.physics.add.group();

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //Game over text
    gameOverText = this.add.text(350, 150, 'GAME OVER', {fontSize: '64px', fill: '#623'});
    gameOverText.setVisible(false);
    restartText = this.add.text(310, 200, 'PRESS ENTER TO RESTART', {fontSize: '32px', fill: '#420'});
    restartText.setVisible(false);

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, stars, collectStar, null, this);

    this.physics.add.collider(player, bombs, hitBomb, null, this);
}

function update ()
{
    if (gameOver)
    {
        player.body.enable = false;
        gameOverText.setVisible(true);
        restartText.setVisible(true);
        if (cursors.continue.isDown){
            gameOverText.setVisible(false);
            restartText.setVisible(false);
            this.scene.restart();
            player.body.enable = true;
            gameOver = false;
        }
    }

    if (cursors.left.isDown && !gameOver)
    {
        player.setVelocityX(-200);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown && !gameOver)
    {
        player.setVelocityX(200);

        player.anims.play('right', true);
    }
    else if (!gameOver)
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down && !gameOver)
    {
        player.setVelocityY(-350);
    }
}

function collectStar (player, star)
{
    star.disableBody(true, true);

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0)
    {
        //  A new batch of stars to collect
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;

    }
}

function hitBomb (player, bomb)
{
    player.setTint(0xff0000);
    gameOver = true;
    player.anims.play('die', true);
}
