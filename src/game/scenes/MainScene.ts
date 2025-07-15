import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class MainScene extends Scene {
    
    constructor() {
        super('MainScene');
    }
    preload() {

        this.load.image("roadStart" , "images/road-start.jpg")
        
    }

    create() {      

        let text = this.add.text(300 , 300, "This is main Scene")
        .setColor("red")
        .setScale(2.5)

        this.add.image(300, 500 , 'roadStart')

        this.add.text(200, 300, " hello");

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
