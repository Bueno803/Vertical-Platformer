import { Scene } from "phaser";
import Player from "../characters/player";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;
  player: Player = new Player();

  player2: Player = new Player();

  constructor() {
    super("Game");
  }

  create() {
    this.physics.world.gravity.y = 150;
    const group = this.physics.add.group({
      defaultKey: "block",
      bounceX: 1,
      bounceY: 1,
      collideWorldBounds: true,
    });
    // Total gravity is 150.
    group.create(450, 300).setGravity(0, -300);
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x00ff00);

    this.background = this.add.image(512, 384, "background");
    this.background.setAlpha(0.5);
    // this.player = this.add.rectangle(200, 100, 100, 100, 0xffffff, 1);

    // this.msg_text = this.add.text(512, 384, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
    //     fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
    //     stroke: '#000000', strokeThickness: 8,
    //     align: 'center'
    // });
    // this.msg_text.setOrigin(0.5);

    // const player = new Player();
    this.player.draw(this.scene.get("Game"), 0xffffff);
    this.input.once("pointerdown", () => {
      this.scene.start("GameOver");
    });
  }

  update() {
    // this.player.updateYPos();
    // this.player.draw(this.scene.get("Game"), 0xffffff);
    // this.player2.draw(this.scene.get("Game"), 0x00ff00);
  }
}
