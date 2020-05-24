class MenuScene extends Phaser.Scene {
    constructor(){
        super({key: 'menuScene'});
    }
    preload(){
        this.load.image('border', '../src/assets/images/backgrounds/staff_border.png');
        this.load.image('background', '../src/assets/images/backgrounds/sky_bg.png');
        this.load.image('menuBG', '../src/assets/images/backgrounds/MenuBase.png');
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
    }
}

export default MenuScene;