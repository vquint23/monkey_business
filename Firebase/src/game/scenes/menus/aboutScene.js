class AboutScene extends Phaser.Scene {
    constructor(){
        super({key: 'aboutScene'});
    }
    preload(){}

    create(){
        var gameHeight = 700;
        var gameWidth = 1100;
        
        var bg = this.add.sprite(55, 45, 'skyBG');
        var menuBG = this.add.sprite(590, 375, 'menuBG');
		var border = this.add.sprite(0,0,'staffBorder');

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
        this.add.text(510, 105, "ABOUT", menuTextConfig);
 
        var bgHeaderText = this.add.text(gameWidth/4, 220, "Backstory:", headerTextConfig);
        this.add.text(350, 280, "Play as Sun Wukong, the Monkey King,", itemTextConfig);
        this.add.text(325, 320, "on his quest to conquer the heavens, ", itemTextConfig);
        this.add.text(325, 360, "prove his worth, and ascend to godhood!", itemTextConfig);
        var aboutHeaderText = this.add.text(gameWidth/4, 420, "About:", headerTextConfig);
        this.add.text(350, 480, "Monkey Business is a 2D Platformer game", itemTextConfig);
        this.add.text(325, 520, "created using the Phaser game engine by", itemTextConfig);
        this.add.text(325, 560, "Jacob Joseph, V Quintana, and JJ Salvador.", itemTextConfig);

        var backArrow = this.add.sprite(gameWidth - 200, gameHeight - 70, "backarrow")
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => backArrow2.setVisible(true) )
            .on('pointerout', () => backArrow2.setVisible(false) )
            .on('pointerdown', () => this.scene.switch('menuScene') );
        this.initArrows(backArrow, true);

        var backArrow2 = this.add.sprite(gameWidth - 200, gameHeight - 70, "backarrow2");
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

