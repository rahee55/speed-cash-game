import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class MainScene extends Scene {
    BCcontainer: Phaser.GameObjects.Container;
    BC: Phaser.GameObjects.Image;
    BCshadow: Phaser.GameObjects.Image;
    BClight: Phaser.GameObjects.Image;
    BCblight: Phaser.GameObjects.Image;
    OCcontainer: Phaser.GameObjects.Container;
    OC: Phaser.GameObjects.Image;
    OCshadow: Phaser.GameObjects.Image;
    OClight: Phaser.GameObjects.Image;
    OCblight: Phaser.GameObjects.Image;
    
    constructor() {
        super('MainScene');
    }
    preload() {

        this.load.image("roadStart" , "images/road-start.jpg")
        this.load.image("blueSideLight" , "images/blue-sidelight.png")
        this.load.image("orangeSideLight" , "images/orange-sidelight.png")
        this.load.image("blueCar-shadow" , "images/bluecar-shadow.webp")
        this.load.image("blueCar" , "images/blue-car.webp")
        this.load.image("blueCar-light" , "images/bluecar-light.webp")
        this.load.image("blueCar-blight" , "images/bluecar-blight.webp")
        this.load.image("orangeCar" , "images/orange-car.webp")
        this.load.image("orangeCar-light" , "images/orangecar-light.webp")
        this.load.image("orangeCar-blight" , "images/orangecar-blight.webp")
        this.load.image("orangeCar-shadow" , "images/bluecar-shadow.webp")
        
        
    }

    create() {  
        
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        this.BCshadow =  this.add.image(-9, 0, "blueCar-shadow")
        this.BC = this.add.image(0, 0, "blueCar")
        this.BClight = this.add.image(0, -220, "blueCar-light")
        this.BCblight = this.add.image(0, 130, "blueCar-blight")

        this.BCcontainer = this.add.container(490 , 300, [this.BCshadow,this.BCblight , this.BC, this.BClight])
        .setDepth(9)
        .setScale(0.9);

        this.OCshadow =  this.add.image(6, 0, "orangeCar-shadow")
        this.OC = this.add.image(0, 0, "orangeCar")
        this.OClight = this.add.image(0, -220, "orangeCar-light")
        this.OCblight = this.add.image(0, 130, "orangeCar-blight")

        this.OCcontainer = this.add.container(890 , 300, [this.OCshadow,this.OCblight , this.OC, this.OClight])
        .setDepth(9)
        .setScale(0.9);

        this.add.tween({
            targets: this.BCcontainer,
            y: +150,
            duration: 3000,
            ease: 'ease-in-out',
            yoyo: true,
            repeat: -1
        })
        this.add.tween({
            targets: this.OCcontainer,
            y: +150,
            duration: 2000,
            ease: 'ease-in-out',
            yoyo: true,
            repeat: -1
        })

        this.add.image(width / 2, 400 , 'roadStart')
        .setScale(1.4)

        this.add.image(width * 0.047, height /2, 'blueSideLight')
        this.add.image(width * 0.949, height /2, 'orangeSideLight')


        EventBus.emit('current-scene-ready', this);
    }

    override update() {
        
    }
}
