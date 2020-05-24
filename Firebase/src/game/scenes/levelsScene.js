class LevelsScene extends Phaser.Scene {
    constructor(){
        super({key: 'levelsScene'});
    }
    preload(){
        this.load.image('bg', '../src/assets/images/backgrounds/MenuBase.png');
    }

    create(){

    }
}

export default LevelsScene;