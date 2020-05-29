class ControlsScene extends Phaser.Scene {
    constructor(){
        super({key: 'controlsScene'});
    }
    preload(){}

    create(){
        var gameHeight = 700;
        var gameWidth = 1100;
        
        var bg = this.add.sprite(55, 45, 'skyBG')
            .setOrigin(0, 0)
            .setDisplaySize(1075, 650);

        var controlsBG = this.add.sprite(590, 375, 'controlsBG')
            .setOrigin(0.5, 0.5)
            .setDisplaySize(1300, 820);

		var border = this.add.sprite(0,0,'staffBorder')
            .setOrigin(0,0)
            .setDisplaySize(1200, 750);

        var headerTextConfig = {
            fontSize: '52px',
            color: '#000',
        }

        var itemTextConfig = {
            fontSize: '28px',
            color: '#000',
        }
        
        //Header Text
        this.add.text(485, 115, "CONTROLS", headerTextConfig);

        //Left Buttons
        this.add.text(360, 260, "Left", itemTextConfig);
        this.add.text(350, 340, "Right", itemTextConfig);
        this.add.text(330, 420, "Crouch", itemTextConfig);
        this.add.text(350, 505, "Pause", itemTextConfig);
        //Right Buttons
        this.add.text(620, 260, "Jump", itemTextConfig);
        this.add.text(620, 370, "Extend", itemTextConfig);
        this.add.text(630, 400, "Staff", itemTextConfig);
        this.add.text(620, 500, "Shield", itemTextConfig);
 

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

export default ControlsScene;

