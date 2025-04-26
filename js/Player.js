import { Bullet } from './Bullet.js';

export class Player {
  constructor(game) {
    this.game = game;
    this.width = 60;
    this.height = 60;
    this.x = (this.game.canvas.width / 2) - (this.width / 2);
    this.y = this.game.canvas.height - this.height - 10;
    this.speed = 5;
    this.cooldown = 0;
    this.cooldownTime = 500; // milliseconds
    this.image = new Image();
    this.image.src = 'assets/images/player/playerShip1_blue.png';
  }

  update(deltaTime, keys) {
    // Movement
    if (keys['ArrowLeft'] && this.x > 0) {
      this.x -= this.speed;
    }
    if (keys['ArrowRight'] && this.x + this.width < this.game.canvas.width) {
      this.x += this.speed;
    }

    // Shooting
    if (keys[' ']) {
      this.shoot();
    }

    // Handle cooldown
    if (this.cooldown > 0) {
      this.cooldown -= deltaTime;
    }
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  shoot() {
    if (this.cooldown <= 0) {
      const bullet = new Bullet(this.game, this.x + this.width / 2, this.y);
      this.game.bullets.push(bullet);
      this.cooldown = this.cooldownTime;
    }
  }
}
