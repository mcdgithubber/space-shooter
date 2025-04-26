import { Game } from './js/Game.js';

window.addEventListener('load', () => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  // Resize the canvas to match the CSS size (optional safety)
  canvas.width = 800;
  canvas.height = 600;

  const game = new Game(canvas, ctx);
  game.start();
});
