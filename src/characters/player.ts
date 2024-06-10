import Phaser, { Scene } from "phaser";
import playerSprite from './../p1jump.png'

export default class Player {
  player: Phaser.GameObjects.Shape;
  sceneRef: Phaser.Scene;
  position: {
    x: number;
    y: number;
  };
  velocity: {
    x: number,
    y: number
  }

  constructor(scene: Phaser.Scene) {
    scene.load.image('playerSprite', playerSprite);
    this.sceneRef = scene;

    console.log("player constructor");
    // this.position = {
    //   x: 0,
    //   y: 0,
    // };
    // this.velocity = {
    //   x: 0,
    //   y: 1
    // };
  }

  spawnPlayer() {
    return this.sceneRef.physics.add.sprite(200,200, 'playerSprite');
  }

  get posY() {
    return this.position.y;
  }
  draw(scene: Phaser.Scene, color: any) {
    console.log("Draw Player");
    this.player = scene.add.rectangle(
      this.position.x,
      this.position.y,
      100,
      100,
      color,
      1
    );
  }

  updateYPos() {
    console.log("Update player");
    this.position.y += this.velocity.y;
    this.velocity.y += 0.5;
  }
}
