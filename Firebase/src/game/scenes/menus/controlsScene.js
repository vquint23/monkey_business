class ControlsScene extends Phaser.Scene {
    constructor(){
        super({key: 'controlsScene'});
    }
    preload(){
        this.load.image('border', '../src/assets/images/backgrounds/staff_border.png');
        this.load.image('background', '../src/assets/images/backgrounds/sky_bg.png');
        this.load.image('controlsBG', '../src/assets/images/backgrounds/controls.png');
        this.load.image('backarrow2', '../src/assets/images/icons/back2.png');
        this.load.image('backarrow', '../src/assets/images/icons/back.png');
    }

    create(){
        var gameHeight = this.game.config.height;
        var gameWidth = this.game.config.width;
        
        var bg = this.add.sprite(55, 45, 'background')
            .setOrigin(0, 0)
            .setDisplaySize(1075, 650);

        var controlsBG = this.add.sprite((gameWidth/2) - 30, (gameHeight/2) - 30,  'controlsBG')
            .setOrigin(0.5, 0.5)
            .setScale(.45);

		var border = this.add.sprite(0,0,'border')
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
        this.add.text((gameWidth/3) + 60, 110, "CONTROLS", headerTextConfig);

        //Left Buttons
        this.add.text((gameWidth/4) + 40, 260, "Left", itemTextConfig);
        this.add.text((gameWidth/4) + 30, 340, "Right", itemTextConfig);
        this.add.text((gameWidth/4) + 15, 420, "Crouch", itemTextConfig);
        this.add.text((gameWidth/4) + 30, 505, "Pause", itemTextConfig);
        //Right Buttons
        this.add.text((gameWidth/2), 250, "Jump", itemTextConfig);
        this.add.text((gameWidth/2), 370, "Extend", itemTextConfig);
        this.add.text((gameWidth/2) + 10, 400, "Staff", itemTextConfig);
        this.add.text((gameWidth/2), 500, "Shield", itemTextConfig);
 

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

export default ControlsScene;

