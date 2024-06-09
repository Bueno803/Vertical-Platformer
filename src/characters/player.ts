import Phaser, { Scene } from "phaser";

export default class Player {
  player: Phaser.GameObjects.Shape;
  position: {
    x: number;
    y: number;
  };

  constructor() {
    console.log("player constructor");
    this.position = {
      x: 0,
      y: 0,
    };
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
    this.position.y++;
  }
}
