import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class MainScene extends Scene
{
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
    BSlight: Phaser.GameObjects.Image;
    OSlight: Phaser.GameObjects.Image;
    roadStart: Phaser.GameObjects.Image;
    Road: Phaser.GameObjects.TileSprite;
    blueCar: { sprite: Phaser.GameObjects.Container, speed: number, active: boolean, multiplier: number };
    orangeCar: { sprite: Phaser.GameObjects.Container, speed: number, active: boolean, multiplier: number };
    blueMultiplierText: Phaser.GameObjects.Text;
    orangeMultiplierText: Phaser.GameObjects.Text;
    blueBustedText: Phaser.GameObjects.Text;
    orangeBustedText: Phaser.GameObjects.Text;


    constructor()
    {
        super('MainScene');
    }
    preload()
    {

        this.load.image("roadStart", "images/road-start.jpg")
        this.load.image("blueSideLight", "images/blue-sidelight.png")
        this.load.image("orangeSideLight", "images/orange-sidelight.png")
        this.load.image("blueCar-shadow", "images/bluecar-shadow.webp")
        this.load.image("blueCar", "images/blue-car.webp")
        this.load.image("blueCar-light", "images/bluecar-light.webp")
        this.load.image("blueCar-blight", "images/bluecar-blight.webp")
        this.load.image("orangeCar", "images/orange-car.webp")
        this.load.image("orangeCar-light", "images/orangecar-light.webp")
        this.load.image("orangeCar-blight", "images/orangecar-blight.webp")
        this.load.image("orangeCar-shadow", "images/bluecar-shadow.webp")
        this.load.image("orangeCar-shadow", "images/bluecar-shadow.webp")
        this.load.image("road", "images/road.jpg")


    }

    create()
    {

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // multipliers are now initialized in the object definition below

        this.BCshadow = this.add.image(-9, 0, "blueCar-shadow")
        this.BC = this.add.image(0, 0, "blueCar")
        this.BClight = this.add.image(0, -220, "blueCar-light")
        this.BCblight = this.add.image(0, 130, "blueCar-blight")

        this.BCcontainer = this.add.container(490, 300, [this.BCshadow, this.BCblight, this.BC, this.BClight])
            .setDepth(9)
            .setScale(0.9);

        this.OCshadow = this.add.image(6, 0, "orangeCar-shadow")
        this.OC = this.add.image(0, 0, "orangeCar")
        this.OClight = this.add.image(0, -220, "orangeCar-light")
        this.OCblight = this.add.image(0, 130, "orangeCar-blight")

        this.OCcontainer = this.add.container(890, 300, [this.OCshadow, this.OCblight, this.OC, this.OClight])
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



        this.roadStart = this.add.image(width / 2, 400, 'roadStart')
            .setScale(1.4)
            .setDepth(8)

        this.BSlight = this.add.image(width * 0.047, height / 2, 'blueSideLight').setDepth(9)
        this.OSlight = this.add.image(width * 0.949, height / 2, 'orangeSideLight').setDepth(9)

        this.add.tween({
            targets: this.BSlight,
            x: - width * 0.003,
            duration: 5000,
            ease: 'ease-in-out',
            yoyo: true,
            repeat: -1
        })
        this.add.tween({
            targets: this.OSlight,
            x: width * 0.973,
            duration: 5000,
            ease: 'ease-in-out',
            yoyo: true,
            repeat: -1
        })

        this.Road = this.add.tileSprite(width / 1.568, -1700, width, height * 100, 'road')
            .setScale(1.4)
            .setDepth(7)
            .setOrigin(0.5, 0)
            .setScrollFactor(0)

        this.blueCar = {
            sprite: this.BCcontainer,
            speed: Phaser.Math.Between(150, 250),
            active: true,
            multiplier: 1.0
        };

        this.orangeCar = {
            sprite: this.OCcontainer,
            speed: Phaser.Math.Between(150, 250),
            active: true,
            multiplier: 1.0
        };
        this.scheduleCrash(this.blueCar);
        this.scheduleCrash(this.orangeCar);

        this.blueMultiplierText = this.add.text(150, 100, 'x1.00', {
            fontFamily: 'Arial',
            fontSize: '48px',
            color: '#00bfff',
            fontStyle: 'bold'
        }).setDepth(10);

        this.orangeMultiplierText = this.add.text(650, 100, 'x1.00', {
            fontFamily: 'Arial',
            fontSize: '48px',
            color: '#ff8c00',
            fontStyle: 'bold'
        }).setDepth(10);

        this.blueBustedText = this.add.text(this.blueMultiplierText.x, this.blueMultiplierText.y + 60, 'BUSTED', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#00bfff',
            fontStyle: 'bold'
        }).setDepth(10).setVisible(false);

        this.orangeBustedText = this.add.text(this.orangeMultiplierText.x, this.orangeMultiplierText.y + 60, 'BUSTED', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ff8c00',
            fontStyle: 'bold'
        }).setDepth(10).setVisible(false);



        EventBus.emit('current-scene-ready', this);
    }
    scheduleCrash(car: { sprite: Phaser.GameObjects.Container, speed: number, active: boolean })
    {
        const crashDelay = Phaser.Math.Between(4000, 10000);
        this.time.delayedCall(crashDelay, () =>
        {
            if (car.active)
            {
                car.active = false;
                this.crashCar(car);
            }
        });
    }

    crashCar(car: { sprite: Phaser.GameObjects.Container, speed: number, active: boolean })
    {
        const height = this.cameras.main.height;
        const isBlueCar = car === this.blueCar;
        const targetY = isBlueCar ? height + 1000 : - 1000;

        this.add.tween({
            targets: car.sprite,
            y: targetY,
            alpha: 0.5,
            duration: 800,
            ease: 'Bounce.easeOut',
            onComplete: () =>
            {
                car.sprite.destroy();
            }
        });
        if (car === this.blueCar)
        {
            this.blueBustedText.setVisible(true);
        } else if (car === this.orangeCar)
        {
            this.orangeBustedText.setVisible(true);
        }
        car.active = false;
        car.speed = 0;
    }



    override update(time: number, delta: number)
    {
        if (this.blueCar && this.blueCar.active) {
            this.blueCar.sprite.y -= this.blueCar.speed * delta / 1000;
            this.blueCar.multiplier += 0.3 * delta / 1000;
            this.blueMultiplierText.setText(`x${this.blueCar.multiplier.toFixed(2)}`);
        }

        if (this.orangeCar && this.orangeCar.active) {
            this.orangeCar.sprite.y -= this.orangeCar.speed * delta / 1000;
            this.orangeCar.multiplier += 0.3 * delta / 1000;
            this.orangeMultiplierText.setText(`x${this.orangeCar.multiplier.toFixed(2)}`);
        }

        this.Road.tilePositionY += 8;
        this.roadStart.y += 8;

    }
}
