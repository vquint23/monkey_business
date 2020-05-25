class LevelsScene extends Phaser.Scene {
    constructor(){
        super({key: 'levelsScene'});
    }
    preload(){
        this.load.image('border', '../src/assets/images/backgrounds/staff_border.png');
        this.load.image('background', '../src/assets/images/backgrounds/sky_bg.png');
        this.load.image('menuBG', '../src/assets/images/backgrounds/MenuBase.png');
        this.load.image('backarrow2', '../src/assets/images/icons/back2.png');
        this.load.image('backarrow', '../src/assets/images/icons/back.png');
        this.load.image('staff', '../src/assets/sprites/staff.png')
    }

    create(){
        var gameHeight = 700;
        var gameWidth = 1100;
        
        var bg = this.add.sprite(55, 45, 'background')
            .setOrigin(0, 0)
            .setDisplaySize(1075, 650);

        var menuBG = this.add.sprite(590, 375, 'menuBG')
            .setOrigin(0.5, 0.5)
            .setDisplaySize(1300, 820);

		var border = this.add.sprite(0,0,'border')
            .setOrigin(0,0)
            .setDisplaySize(1200, 750);

        var headerTextConfig = {
            fontSize: '48px',
            color: '#000',
        }

        var itemTextConfig = {
            fontSize: '32px',
            color: '#000'
        }
        
        var unlockedTextConfig = {
            fontSize: '24px',
            color: '#000'
        }

        var lockedTextConfig = {
            fontSize: '24px',
            color: '#919191'
        }

        //Header Text
        this.add.text(530, 90, "LEVEL", headerTextConfig);
        this.add.text(515, 130, "SELECT", headerTextConfig);

        var world1Text = this.add.text(350, 250, "Jungle World", itemTextConfig);
        var level11 = this.add.text(380, 300, "Level 1", unlockedTextConfig)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.hover(level11, world1Staff) )
            .on('pointerout', () => this.mouseout(level11, world1Staff) )
            .on('pointerdown', () => this.startLevel('level2-1') );
        var level12 = this.add.text(540, 300, "Level 2", lockedTextConfig)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.hover(null, world1Staff) )
            .on('pointerout', () => this.mouseout(null, world1Staff) );
            //.on('pointerdown', () => this.scene.switch('level12') );
        var world2Text = this.add.text(350, 380, "Mountain City", itemTextConfig);
        var level21 = this.add.text(380, 430, "Level 1", lockedTextConfig)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.hover(null, world2Staff) )
            .on('pointerout', () => this.mouseout(null, world2Staff) );
            //.on('pointerdown', () => this.scene.switch('level21') );
        var level22 = this.add.text(540, 430, "Level 2", lockedTextConfig)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.hover(null, world2Staff) )
            .on('pointerout', () => this.mouseout(null, world2Staff) );
            //.on('pointerdown', () => this.scene.switch('level22') );
        var world3Text = this.add.text(350, 510, "The Heavens", itemTextConfig);
        var level21 = this.add.text(380, 550, "Level 1", lockedTextConfig)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.hover(null, world3Staff) )
            .on('pointerout', () => this.mouseout(null, world3Staff) );
            //.on('pointerdown', () => this.scene.switch('level31') );
        var level22 = this.add.text(540, 550, "Level 2", lockedTextConfig)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.hover(null, world3Staff) )
            .on('pointerout', () => this.mouseout(null, world3Staff) );
            //.on('pointerdown', () => this.scene.switch('level32') );
    
        var world1Staff = this.add.sprite(800, 255, "staff");
        this.initStaff(world1Staff);
        var world2Staff = this.add.sprite(800, 385, "staff");
        this.initStaff(world2Staff);
        var world3Staff = this.add.sprite(800, 515, "staff");
        this.initStaff(world3Staff);

        var backArrow = this.add.sprite(gameWidth - 200, gameHeight - 70, "backarrow")
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => backArrow2.setVisible(true) )
            .on('pointerout', () => backArrow2.setVisible(false) )
            .on('pointerdown', () => this.scene.switch('menuScene') );
        this.initArrows(backArrow, true);

        var backArrow2 = this.add.sprite(gameWidth - 200, gameHeight - 70, "backarrow2");
        this.initArrows(backArrow2, false);
    }

    hover(text, staff){
        if(text != null){
            text.setColor("#fff");
        }
        staff.setVisible(true);
    }

    mouseout(text, staff){
        if(text != null){
            text.setColor("#000");
        }
        staff.setVisible(false);
    }

    initStaff(staff){
        staff.setOrigin(0.5, 0.5)
        .setScale(.10)
        .setVisible(false);
    }

    initArrows(arrow, visible){
        arrow.setOrigin(0.5, 0.5)
        .setScale(.1)
        .setVisible(visible);
    }

    unlockLevel(level){
        level.setColor("#000");
    }

    startLevel(level){
        this.sound.stopAll();
        this.scene.switch(level);
    }

}

export default LevelsScene;