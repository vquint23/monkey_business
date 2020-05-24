class MenuScene extends Phaser.Scene {
    constructor(){
        super({key: 'menuScene'});
    }
    preload(){
        this.load.image('border', '../src/assets/images/backgrounds/staff_border.png');
        this.load.image('background', '../src/assets/images/backgrounds/sky_bg.png');
        this.load.image('menuBG', '../src/assets/images/backgrounds/MenuBase.png');
        this.load.image('staff', '../src/assets/sprites/staff.png')
        this.load.image('logo', '../src/assets/logo.png');
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

        var itemTextConfig = {
            fontSize: '36px',
            color: '#000'
        }

        var menuText = this.add.text((gameWidth/2) - 80, 100, "MENU", menuTextConfig);

        var startText = this.add.text(gameWidth/4, 250, "Start Game", itemTextConfig)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.hover(startText, startStaff) )
            .on('pointerout', () => this.mouseout(startText, startStaff) );
            //.on('pointerdown', () => this.scene.switch('level11'));
        var levelsText = this.add.text(gameWidth/4, 350, "Level Select", itemTextConfig)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.hover(levelsText, levelsStaff) )
            .on('pointerout', () => this.mouseout(levelsText, levelsStaff) );
        var controlsText = this.add.text(gameWidth/4, 450, "Controls", itemTextConfig)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.hover(controlsText,controlsStaff) )
            .on('pointerout', () => this.mouseout(controlsText, controlsStaff) );
        var aboutText = this.add.text(gameWidth/4, 550, "About", itemTextConfig)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.hover(aboutText, aboutStaff) )
            .on('pointerout', () => this.mouseout(aboutText, aboutStaff) );

        var startStaff = this.add.sprite((gameWidth/2 + 160), 260, "staff")
            .setOrigin(0.5, 0.5)
            .setScale(.10)
            .setVisible(false);
        var levelsStaff = this.add.sprite((gameWidth/2 + 160), 360, "staff")
            .setOrigin(0.5, 0.5)
            .setScale(.10)
            .setVisible(false);
        var controlsStaff = this.add.sprite((gameWidth/2 + 160), 460, "staff")
            .setOrigin(0.5, 0.5)
            .setScale(.10)
            .setVisible(false);
        var aboutStaff = this.add.sprite((gameWidth/2 + 160), 560, "staff")
            .setOrigin(0.5, 0.5)
            .setScale(.10)
            .setVisible(false);
    }

    hover(text, staff){
        text.setColor("#fff");
        staff.setVisible(true);
    }

    mouseout(text, staff){
        text.setColor("#000");
        staff.setVisible(false);
    }
}

export default MenuScene;