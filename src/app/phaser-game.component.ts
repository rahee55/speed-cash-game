import { Component, OnInit } from "@angular/core";
import Phaser from "phaser";
import StartGame from "../game/main";
import { EventBus } from "../game/EventBus";

@Component({
    selector: 'phaser-game',
    template: '<div id="game-container"></div>',
    standalone: true,
})
export class PhaserGame implements OnInit
{
    scene: Phaser.Scene;
    game: Phaser.Game;
    sceneCallback: (scene: Phaser.Scene) => void;

    ngOnInit ()
    {
        this.game = StartGame('game-container');
    }

}
