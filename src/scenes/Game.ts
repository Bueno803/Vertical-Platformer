import { Scene } from "phaser";
import player from "./../p1jump.png";
import Player from "../characters/player";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;
  player: Player;
  cursor: any;
  playerRef: any;

  // player2: Player = new Player();

  constructor() {
    super("Game");
  }

  preload() {
    this.player = new Player(this.scene.get("Game"));
    console.log("1");
    this.load.image("playerSprite", player);
    // this.load.image('playerSprite', player)
    console.log("2");
  }

  create() {
    // const tempPlayer = this.physics.add.sprite(200, 200, 'playerSprite');

    // this.add.image(300, 300, 'player');
    // const group = this.physics.add.group({
    //   defaultKey: "playerSprite",
    //   bounceX: 1,
    //   bounceY: 1,
    //   collideWorldBounds: true,
    // });
    // Total gravity is 150.
    // group.create(450, 300).setGravity(0, 300);
    this.playerRef = this.player.spawnPlayer();
    this.playerRef.setCollideWorldBounds(true);
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x00ff00);

    this.background = this.add.image(512, 384, "background");
    this.background.setAlpha(0.5);

    // tempPlayer.setCollideWorldBounds(true);
    // tempPlayer.setBounceY(0.4);
    // this.player.draw(this.scene.get("Game"), 0xffffff);
    this.input.once("pointerdown", () => {
      this.scene.start("GameOver");
    });

    this.cursor = this.input.keyboard?.createCursorKeys();
  }

  update() {
    this.handlePlayerInput();
    // this.player.updateYPos();
    // this.player.draw(this.scene.get("Game"), 0xffffff);
    // this.player2.draw(this.scene.get("Game"), 0x00ff00);
  }

  handlePlayerInput() {
    // const body = this.paddleLeft.body
    if (this.cursor.left.isDown) {
      console.log("Move left");
      // body.setVelocityY(-100);
      // I want to increate the velocity incrementally as the key is held
      // So that when it isn't held the velocity will decrement
      // giving the effect of slowing down (Sliding effect)
      // this.playerRef.setVelocityX(-200);
    } else if (this.cursor.right.isDown) {
      this.player.velocityX = 20;
      console.log(this.player.velocity.x);
      this.playerRef.setVelocityX(this.player.velocity.x);
    } else if (this.cursor.space.isDown) {
      console.log("Space");
      console.log(this.player.velocity);
    } else {
      this.player.velocityX = -10;
      this.playerRef.setVelocityX(this.player.velocity.x);
      // console.log(this.player.velocity);
      // this.playerRef.setVelocityX(this.playerRef.velocity);
    }
  }
}
