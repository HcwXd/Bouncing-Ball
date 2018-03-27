// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var ballAmount = 25;
var evilSpeed = 15;
var evilScore = 0;
var speed = document.querySelector('.speed');
var score = document.querySelector('.score');

var input = document.querySelector('input');
var control = document.querySelector('.controls');
var go = document.querySelector('.go');




var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;



// function to generate random number

function random(min, max) {
  var num = Math.floor(Math.random() * (max - min)) + min;
  if (num === 0) {
    num = 2;
  }
  return num;
}

function Ball(x, y, vx, vy, color, r, exist) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.r = r;
  this.vx = vx;
  this.vy = vy;
  this.exist = exist;
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

Ball.prototype.detectCollision = function () {
  for (var j = 0; j < balls.length; j++) {
    if (balls[j].exist) {
      if (!(this === balls[j])) {
        var dx = this.x - balls[j].x;
        var dy = this.y - balls[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.r + balls[j].r) {
          balls[j].color = `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
          balls[j].vx = -(balls[j].vx);
          balls[j].vy = -(balls[j].vy);
        }
      }

    }

  }
};


function EvilBall() {
  Ball.call(this);
  this.x = width / 2;
  this.y = height / 2;
  this.color = "white";
  this.vx = 0;
  this.vy = 0;
  this.r = 15;
  this.exist = true;
}

EvilBall.prototype = Object.create(Ball.prototype);
EvilBall.prototype.constructor = EvilBall;


EvilBall.prototype.draw = function () {
  ctx.beginPath();
  // var img = new Image();
  // img.src = 'Smile.png';
  // var ptrn = ctx.createPattern(img, 'no-repeat');
  ctx.fillStyle = this.color;
  ctx.strokeStyle = "white";
  ctx.lineWidth = 3;
  ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
}

EvilBall.prototype.detectBound = function () {
  if ((this.x + this.r) >= width) {
    this.x = width - this.r;
  }
  if ((this.x - this.r) <= 0) {
    this.x = 0 + this.r;
  }
  if ((this.y + this.r) >= height) {
    this.y = height - this.r;
  }
  if ((this.y - this.r) <= 0) {
    this.y = 0 + this.r;
  }
}


EvilBall.prototype.move = function () {
  var _this = this;
  window.addEventListener("keydown", function (e) {
    var action = e.which;
    //dir_up
    if (action === 38) {
      e.preventDefault();
      _this.y -= evilSpeed;
    }
    //dir_down
    else if (action === 40) {
      e.preventDefault();
      _this.y += evilSpeed;
    }
    //dir_right
    else if (action === 39) {
      e.preventDefault();
      _this.x += evilSpeed;
    }
    //dir_left
    else if (action === 37) {
      e.preventDefault();
      _this.x -= evilSpeed;
    }
  })
}

EvilBall.prototype.detectCollision = function () {
  for (var j = 0; j < balls.length; j++) {
    if (balls[j].exist) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < this.r + balls[j].r) {
        balls[j].exist = false;
        console.log("eat!");
        if (this.r <= height / 2) {
          this.r += 1;
        }


        if (evilSpeed <= 100) {
          evilSpeed += 2;
        }
        evilScore += 1;
        this.color = `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;

      }
    }
  }
};





var balls = [];
var evil = new EvilBall();
evil.move();


function loop() {
  control.style.display = "none";
  ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
  ctx.fillRect(0, 0, width, height);
  while (balls.length < ballAmount) {
    var ball = new Ball(random(0, width), random(0, height), random(-2, 2), random(-2, 2),
      `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`,
      15, true
    );
    balls.push(ball);
  }
  evil.draw();
  evil.detectBound();
  evil.detectCollision();
  // evil.update();

  speed.innerHTML = evilSpeed + " mph";
  score.innerHTML = evilScore;
  for (var i = 0; i < balls.length; i++) {
    if (balls[i].exist) {
      balls[i].draw();
      balls[i].update();
      balls[i].detectCollision();
    }
  }
  requestAnimationFrame(loop);
}

function handleUpdate() {
  ballAmount = this.value;
}





input.addEventListener('change', handleUpdate)
go.addEventListener("click", loop);