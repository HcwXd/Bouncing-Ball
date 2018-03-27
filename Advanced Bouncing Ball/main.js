// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var input = document.querySelector('input');
var ballAmount = 50;
var control = document.querySelector('.controls');
var go = document.querySelector('.go');

var speed = document.querySelector('.speed');
var speedUp = document.querySelector('.speedUp');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
ctx.fillRect(0, 0, width, height);

// function to generate random number

function random(min, max) {
  var num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

function Ball(x, y, vx, vy, color, r) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.r = r;
  this.vx = vx;
  this.vy = vy;
}

Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
  ctx.fill();
  this.x += this.vx;
  this.y += this.vy;
}

Ball.prototype.update = function () {
  if ((this.x + this.r) >= width) {
    this.vx = -(this.vx);
  }
  if ((this.x - this.r) <= 0) {
    this.vx = -(this.vx);
  }
  if ((this.y + this.r) >= height) {
    this.vy = -(this.vy);
  }
  if ((this.y - this.r) <= 0) {
    this.vy = -(this.vy);
  }
  this.x += this.vx;
  this.y += this.vy;
}
var balls = [];

function loop() {
  control.style.display = "none";
  speed.style.display = "initial";
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);
  while (balls.length < ballAmount) {
    var ball = new Ball(random(0, width), random(0, height), random(-7, 7), random(-7, 7),
      `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`,
      random(2, 15)
    );
    balls.push(ball);
  }

  for (var i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
  }
  requestAnimationFrame(loop);
}

function handleUpdate() {
  ballAmount = this.value;
}





input.addEventListener('change', handleUpdate)
go.addEventListener("click", loop);
speedUp.addEventListener("click", loop);