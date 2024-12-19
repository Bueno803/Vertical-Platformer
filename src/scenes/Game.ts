import { Scene } from "phaser";
import player from "./../p1jump.png";
import Player from "../characters/player";

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;
  player: Player;
  enemy: Player;
  cursor: any;
  playerRef: any;
  enemyRef: any;

  // player2: Player = new Player();

  constructor() {
    super("Game");
  }

  preload() {
    this.player = new Player(this.scene.get("Game"));
    this.enemy = new Player(this.scene.get("Game"));
    console.log("1");
    this.load.image("playerSprite", player);
    this.load.image("playerSprite", player);
    // this.load.image('playerSprite', player)
    console.log("2");
  }

  create() {
    this.enemy.position = { x: 600, y: 200 };
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
    this.enemyRef = this.enemy.spawnPlayer();
    this.enemyRef.setCollideWorldBounds(true);
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x00ff00);
    console.log("testing ", this.playerRef.getTopLeft());

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
    this.checkCollision();
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

  checkCollision() {
    // for (let enemy of enemies) {\
    // console.log("player os: ", this.player._position.x);
    let distance = Math.abs(
      this.playerRef.getTopLeft().x - this.enemy._position.x
    );
    // console.log("distance: ", distance);
    if (distance < 300) {
      let deceleration = (300 - distance) / 300;
      this.player.velocityX *= deceleration;
      this.playerRef.setVelocityX(this.player.velocity.x);
      // enemy.speed *= deceleration;
      if (distance < 5) {
        this.player.velocityX = 0;
        this.playerRef.setVelocityX(this.player.velocity.x);
        // enemy.speed = 0;
      }
    }
    // }
  }

  // getRelativePositionToCanvas(gameObject: Player) {
  //   return {
  //     x: (gameObj - camera.worldView.x) * this.camera.zoom,
  //     y: (gameObj.y - camera.worldView.y) * this.camera.zoom,
  //   };
  // }
}
