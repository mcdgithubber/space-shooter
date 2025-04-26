import { Player } from './Player.js';
import { Bullet } from './Bullet.js';
import { Enemy } from './Enemy.js';
import { detectCollision } from './utils.js';

export class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.player = new Player(this);
    this.bullets = [];
    this.enemies = [];

    this.keys = {}; // Track keys pressed

    this.gameOver = false;
    this.score = 0;
    this.lives = 3; // Future proof: life system

    this.enemySpawnTimer = 0;
    this.enemySpawnInterval = 2000; // 2 seconds

    this.lastTime = 0;
  }

  start() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.key] = true;
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.key] = false;
    });

    requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
  }

  gameLoop(timestamp) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.update(deltaTime);
    this.draw();

    if (!this.gameOver) {
      requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }
  }

  update(deltaTime) {
    this.player.update(deltaTime, this.keys);

    this.bullets.forEach((bullet, index) => {
      bullet.update();
      if (bullet.offScreen()) {
        this.bullets.splice(index, 1);
      }
    });

    this.enemies.forEach((enemy, eIndex) => {
      enemy.update();
      if (enemy.offScreen()) {
        this.enemies.splice(eIndex, 1);
        this.lives--;
        if (this.lives <= 0) this.gameOver = true;
      }

      // Check collision with bullets
      this.bullets.forEach((bullet, bIndex) => {
        if (detectCollision(bullet, enemy)) {
          this.enemies.splice(eIndex, 1);
          this.bullets.splice(bIndex, 1);
          this.score += 100;
        }
      });
    });

    // Spawn enemies
    this.enemySpawnTimer += deltaTime;
    if (this.enemySpawnTimer > this.enemySpawnInterval) {
      this.spawnEnemy();
      this.enemySpawnTimer = 0;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.player.draw(this.ctx);

    this.bullets.forEach((bullet) => bullet.draw(this.ctx));
    this.enemies.forEach((enemy) => enemy.draw(this.ctx));

    // Draw score
    this.ctx.fillStyle = 'white';
    this.ctx.font = '20px Arial';
    this.ctx.fillText(`Score: ${this.score}`, 10, 30);

    // Draw lives
    this.ctx.fillText(`Lives: ${this.lives}`, 10, 60);

    if (this.gameOver) {
      this.ctx.fillStyle = 'red';
      this.ctx.font = '50px Arial';
      this.ctx.fillText('GAME OVER', this.canvas.width / 2 - 150, this.canvas.height / 2);
    }
  }

  spawnEnemy() {
    const x = Math.random() * (this.canvas.width - 50);
    const y = -50;
    this.enemies.push(new Enemy(this, x, y));
  }
}
