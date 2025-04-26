export class Enemy {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.speed = 2;
    this.image = new Image();
    this.image.src = 'assets/images/enemies/enemyRed1.png';}

  update() {
    this.y += this.speed;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  offScreen() {
    return this.y > this.game.canvas.height;
  }
}
