export class Bullet {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 5;
    this.height = 20;
    this.speed = 7;
    this.image = new Image();
    this.image.src = 'assets/images/bullets/laserBlue01.png';
  }

  update() {
    this.y -= this.speed;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x - this.width / 2, this.y, this.width, this.height);
  }

  offScreen() {
    return this.y + this.height < 0;
  }
}
