import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class MainScene extends Scene {
    
    constructor() {
        super('MainScene');
    }
    preload() {
        
    }

    create() {      

        let text = this.add.text(300 , 300, "Chupa ty la cha Zeba")
        .setColor("red")
        .setScale(2.5)

        this.add.tween({
            targets: text,
            x: 800,
            duration: 5000,
            yoyo: true,
            repeat: -1
        })

        EventBus.emit('current-scene-ready', this);
    }

    override update() {
        
    }
}
