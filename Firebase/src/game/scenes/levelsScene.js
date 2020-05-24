class LevelsScene extends Phaser.Scene {
    constructor(){
        super({key: 'levelsScene'});
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
        this.add.text((gameWidth/2) - 80, 90, "LEVEL", headerTextConfig);
        this.add.text((gameWidth/2) - 95, 130, "SELECT", headerTextConfig);

        var world1Text = this.add.text(gameWidth/4, 250, "Jungle World", itemTextConfig);
        var level11 = this.add.text(gameWidth/4 + 50, 300, "Level 1", unlockedTextConfig)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.hover(level11, world1Staff) )
            .on('pointerout', () => this.mouseout(level11, world1Staff) );
            //.on('pointerdown', () => this.scene.switch('World1-1') );
        var level12 = this.add.text((gameWidth/3) + 150, 300, "Level 2", lockedTextConfig)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.hover(null, world1Staff) )
            .on('pointerout', () => this.mouseout(null, world1Staff) );
            //.on('pointerdown', () => this.scene.switch('World1-2') );
        var world2Text = this.add.text(gameWidth/4, 380, "Mountain City", itemTextConfig);
        var level21 = this.add.text(gameWidth/4 + 50, 430, "Level 1", lockedTextConfig)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.hover(null, world2Staff) )
            .on('pointerout', () => this.mouseout(null, world2Staff) );
            //.on('pointerdown', () => this.scene.switch('World2-1') );
        var level22 = this.add.text((gameWidth/3) + 150, 430, "Level 2", lockedTextConfig)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.hover(null, world2Staff) )
            .on('pointerout', () => this.mouseout(null, world2Staff) );
            //.on('pointerdown', () => this.scene.switch('World2-2') );
        var world3Text = this.add.text(gameWidth/4, 510, "The Heavens", itemTextConfig);
        var level21 = this.add.text(gameWidth/4 + 50, 550, "Level 1", lockedTextConfig)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.hover(null, world3Staff) )
            .on('pointerout', () => this.mouseout(null, world3Staff) );
            //.on('pointerdown', () => this.scene.switch('World3-1') );
        var level22 = this.add.text((gameWidth/3) + 150, 550, "Level 2", lockedTextConfig)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.hover(null, world3Staff) )
            .on('pointerout', () => this.mouseout(null, world3Staff) );
            //.on('pointerdown', () => this.scene.switch('World3-2') );
    
        var world1Staff = this.add.sprite((gameWidth/2 + 160), 255, "staff");
        this.initStaff(world1Staff);
        var world2Staff = this.add.sprite((gameWidth/2 + 160), 385, "staff");
        this.initStaff(world2Staff);
        var world3Staff = this.add.sprite((gameWidth/2 + 160), 515, "staff");
        this.initStaff(world3Staff);
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

    unlockLevel(level){
        level.setColor("#000");
    }

}

export default LevelsScene;