class AboutScene extends Phaser.Scene {
    constructor(){
        super({key: 'aboutScene'});
    }
    preload(){
        this.load.image('border', '../src/assets/images/backgrounds/staff_border.png');
        this.load.image('background', '../src/assets/images/backgrounds/sky_bg.png');
        this.load.image('menuBG', '../src/assets/images/backgrounds/MenuBase.png');
        this.load.image('backarrow2', '../src/assets/images/icons/back2.png');
        this.load.image('backarrow', '../src/assets/images/icons/back.png');
    }

    create(){
        var gameHeight = this.game.config.height;
        var gameWidth = this.game.config.width;
        
        var bg = this.add.sprite(55, 45, 'background')
            .setOrigin(0, 0)
            .setDisplaySize(1075, 650);

        var menuBG = this.add.sprite((gameWidth/2) - 30, (gameHeight/2) - 30,  'menuBG')
            .setOrigin(0.5, 0.5)
            .setScale(.45);

		var border = this.add.sprite(0,0,'border')
            .setOrigin(0,0)
            .setDisplaySize(1200, 750);

        var menuTextConfig = {
            fontSize: '64px',
            color: '#000',
        }
        
        var headerTextConfig = {
            fontSize: '48px',
            color: '#000',
        }

        var itemTextConfig = {
            fontSize: '24px',
            color: '#000',
            wordWrap: 500
        }
        
        //Header Text
        this.add.text((gameWidth/3) + 100, 100, "ABOUT", menuTextConfig);
 
        var bgHeaderText = this.add.text(gameWidth/4, 220, "Backstory:", headerTextConfig);
        this.add.text(gameWidth/4 + 50, 280, "Play as Sun Wukong, the Monkey King,", itemTextConfig);
        this.add.text(gameWidth/4, 320, "on his quest to conquer the heavens, ", itemTextConfig);
        this.add.text(gameWidth/4, 360, "prove his worth, and ascend to godhood!", itemTextConfig);
        var aboutHeaderText = this.add.text(gameWidth/4, 420, "About:", headerTextConfig);
        this.add.text(gameWidth/4 + 50, 480, "Monkey Business is a 2D Platformer game", itemTextConfig);
        this.add.text(gameWidth/4, 520, "created using the Phaser game engine by", itemTextConfig);
        this.add.text(gameWidth/4, 560, "Jacob Joseph, V Quintana, and JJ Salvador.", itemTextConfig);

        var backArrow = this.add.sprite(gameWidth - 300, gameHeight-160, "backarrow")
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => backArrow2.setVisible(true) )
            .on('pointerout', () => backArrow2.setVisible(false) )
            .on('pointerdown', () => this.scene.switch('menuScene') );
        this.initArrows(backArrow, true);

        var backArrow2 = this.add.sprite(gameWidth - 300, gameHeight-160, "backarrow2");
        this.initArrows(backArrow2, false);
    }

    initArrows(arrow, visible){
        arrow.setOrigin(0.5, 0.5)
        .setScale(.1)
        .setVisible(visible);
    }

    unlockLevel(level){
        level.setColor("#000");
    }

}

export default AboutScene;

