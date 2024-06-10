import Phaser, { Scene } from "phaser";
import playerSprite from "./../p1jump.png";

export default class Player {
  player: Phaser.GameObjects.Shape;
  sceneRef: Phaser.Scene;
  _position: {
    x: number;
    y: number;
  };
  _velocity: {
    x: number;
    y: number;
  } = {
    x: 0,
    y: 0,
  };

  constructor(scene: Phaser.Scene) {
    scene.load.image("playerSprite", playerSprite);
    this.sceneRef = scene;

    console.log("player constructor");
    this._position = {
      x: 200,
      y: 200,
    };
    this._velocity = {
      x: 0,
      y: 0,
    };
  }

  get position() {
    return this._position;
  }

  set position(coordinance: any) {
    this._position = {
      x: coordinance.x,
      y: coordinance.y,
    };
  }

  get velocity() {
    console.log("Get velocity");
    return this._velocity;
  }

  set velocityY(y: number) {
    this._velocity.y = y;
  }

  set velocityX(x: number) {
    console.log("add: ", x);
    if (this._velocity.x + x > -1 && this._velocity.x + x < 300) {
      this._velocity.x += x;
    }
  }

  updateVelocity(x?: number, y?: number) {}

  spawnPlayer() {
    console.log("spawn player");
    return this.sceneRef.physics.add.sprite(
      this._position.x,
      this._position.y,
      "playerSprite"
    );
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
