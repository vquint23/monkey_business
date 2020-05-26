class MenuScene extends Phaser.Scene {
    constructor(){
        super({key: 'menuScene'});
    }
    preload(){
        this.load.image('border', '../src/assets/images/backgrounds/staff_border.png');
        this.load.image('background', '../src/assets/images/backgrounds/sky_bg.png');
        this.load.image('menuBG', '../src/assets/images/backgrounds/MenuBase.png');
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

        var menuTextConfig = {
            fontSize: '64px',
            color: '#000',
        }

        var itemTextConfig = {
            fontSize: '36px',
            color: '#000'
        }

        var menuText = this.add.text(525, 105, "MENU", menuTextConfig);

        var startText = this.add.text(300, 250, "Start Game", itemTextConfig)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.hover(startText, startStaff) )
            .on('pointerout', () => this.mouseout(startText, startStaff) )
            .on('pointerdown', () => this.startGame("level1-1") );               
        var levelsText = this.add.text(300, 350, "Level Select", itemTextConfig)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.hover(levelsText, levelsStaff) )
            .on('pointerout', () => this.mouseout(levelsText, levelsStaff) )
            .on('pointerdown', () => this.scene.switch('levelsScene') );
        var controlsText = this.add.text(300, 450, "Controls", itemTextConfig)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.hover(controlsText, controlsStaff) )
            .on('pointerout', () => this.mouseout(controlsText, controlsStaff) )
            .on('pointerdown', () => this.scene.switch('controlsScene') );
        var aboutText = this.add.text(300, 550, "About", itemTextConfig)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.hover(aboutText, aboutStaff) )
            .on('pointerout', () => this.mouseout(aboutText, aboutStaff) )
            .on('pointerdown', () => this.scene.switch('aboutScene') );

        var startStaff = this.add.sprite(760, 260, "staff");
        this.initStaff(startStaff);
        var levelsStaff = this.add.sprite(760, 360, "staff");
        this.initStaff(levelsStaff);
        var controlsStaff = this.add.sprite(760, 460, "staff");
        this.initStaff(controlsStaff);
        var aboutStaff = this.add.sprite(760, 560, "staff");
        this.initStaff(aboutStaff);
    }

    hover(text, staff){
        text.setColor("#fff");
        staff.setVisible(true);
    }

    mouseout(text, staff){
        text.setColor("#000");
        staff.setVisible(false);
    }

    initStaff(staff){
        staff.setOrigin(0.5, 0.5)
        .setScale(.10)
        .setVisible(false);
    }

    startGame(level,){
        this.sound.stopAll();
        this.scene.switch(level);
    }
}

export default MenuScene;