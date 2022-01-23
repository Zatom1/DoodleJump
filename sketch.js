const screenWidth = 450;
const screenHeight = 600;

const gravity = 9.81;

let aIsDown = false;
let dIsDown = false;

let scroll = 0;

let gameScreen = 1;

new p5();

let pathetic;
let breakablePlat;
let basePlatform;

function setup() {
  createCanvas(screenWidth, screenHeight);
  pathetic = loadImage("DoodleJump-Default-Solid(trans).png");
  breakablePlat = loadImage("DoodleJump-Default-Breakable(trans).png");
  basePlatform = loadImage("DoodleJump-Base-Solid(trans).png");
  frameRate(500);
}

function invert(n, limit) {
  let diff = limit - n;
  return diff;
}

class box {
  constructor(x, y, mass, width, height, bounce) {
    this.x = x;
    this.y = y;
    this.mass = mass;
    this.height = height;
    this.width = width;
    this.Xdrag = this.height / 500;
    this.Ydrag = this.width / 500;
    this.Xvelo = 0;
    this.Yvelo = 0;
    this.bounce = bounce;
    this.onGround = false;
  }

  velocity() {
    this.x += this.Xvelo;
    this.y += this.Yvelo;
  }
  appXForce(Xforce) {
    this.Xvelo += Xforce;
    this.x += this.Xvelo;
  }
  appYForce(Yforce) {
    this.Yvelo += Yforce;
    this.y += this.Yvelo;
  }
  appXDrag(d1) {
    if (this.Xvelo > d1) {
      this.Xvelo -= d1;
    } else if (this.Xvelo > 0) {
      this.Xvelo -= 0.05;
    }

    if (this.Xvelo < -d1) {
      this.Xvelo += d1;
    } else if (this.Xvelo < 0) {
      this.Xvelo += 0.05;
    }
    if (abs(this.Xvelo) < 0.25) {
      this.Xvelo = 0;
    }
  }
  appXDragGround(d2) {
    if (this.onGround === true) {
      if (this.Xvelo > d2) {
        this.Xvelo -= d2;
      } else if (this.Xvelo > 0) {
        this.Xvelo -= 0.05;
      }

      if (this.Xvelo < -d2) {
        this.Xvelo += d2;
      } else if (this.Xvelo < 0) {
        this.Xvelo += 0.05;
      }
      if (abs(this.Xvelo) < 0.25) {
        this.Xvelo = 0;
      }
    }
  }
  appYDrag(d3) {
    if (this.Yvelo > d3) {
      this.Yvelo -= d3;
    } else if (this.Yvelo > 0) {
      this.Yvelo -= 0.05;
    }

    if (this.Yvelo < -d3) {
      this.Yvelo += d3;
    } else if (this.Yvelo < 0) {
      this.Yvelo += 0.05;
    }
    if (abs(this.Yvelo) < 0.25) {
      this.Yvelo = 0;
    }
  }
  appGrav(grav) {
    if (this.y < screenHeight - this.height) this.Yvelo -= grav;
  }
  ground(bounce) {
    if (this.y + this.height >= screenHeight - 1) {
      this.Yvelo = 0;
    }
    if (this.y + this.height >= screenHeight + 1) {
      this.Yvelo -= 1;
    }

    if (this.x < 0) {
      this.Xvelo *= -0.4 + this.bounce / 8;
    }
    if (this.x <= -1) {
      this.Xvelo += 1;
    }

    if (this.x + this.width + 3 > screenWidth) {
      this.Xvelo *= -0.4 + this.bounce / 8;
    }
    if (this.x + this.width + 3 >= screenWidth + 1) {
      this.Xvelo -= 1;
    }
  }
  drawThis() {
    rect(this.x, this.y, this.width, this.height);
  }
  moveBox(mouseX, mouseY) {
    if(this.y<25){scroll += 2;}
    if(this.y<50){scroll += 2;}
    if(this.y<75){scroll += 2;}
    if(this.y<100){scroll += 2;}
    if(this.y<100){scroll += 2;}
    if(this.y<200){scroll += 2}
    if(this.y<300){scroll +=2}
    if (this.y < 350) {
      scroll += 1;
    } //EWGHSDFIGNEISRDOREMDSBNVODLSNFVOESDMFBODLFNGXMBOVJLDMFBVIORNEDFVONRMFDOVERDFBJMVOFDNBMODSFMODNFSMOODSGMGOMDSO
    if (keyIsPressed && keyCode === 32 && this.onGround === true) {
      this.appYForce(-20);
    }
    if (aIsDown === true && this.Xvelo > -10) {
      this.appXForce(-0.6);
    }
    if (dIsDown === true && this.Xvelo < 10) {
      this.appXForce(0.6);
    }

    if (this.y + this.height >= screenHeight - 1) {
      this.onGround = true;
    } else {
      this.onGround = false;
    }
  }

  terminalVelo() {
    if (this.Xvelo > 2) {
      this.appXForce(-this.Xvelo / 4);
    }
    if (this.Xvelo < -2) {
      this.appXForce(-this.Xvelo / 4);
    }
  }

  simulate() {
    this.velocity();
    this.appXDrag(this.height / 600);
    this.appXDragGround(this.width / 200);
    this.appYDrag(this.width / 200);
    this.appGrav(this.mass / -5);
    this.moveBox(mouseX, mouseY);
    this.terminalVelo();
    this.drawThis();
    this.ground(this.bounce / 2);
  }
}

let box1 = new box(50, 550, 5, 40, 40, 0.2);

class platform {
  constructor(x, y, width, height, breakable, base) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.breakable = breakable;
    this.carrying = false;
    this.carryTime = 0;
    this.broken = false;
    this.base = base;
  }

  simulate() {
    if (this.y + scroll > screenHeight) {
      this.x = random(20, screenWidth - 70);
      this.y = -15 - scroll;
      this.broken = false;
      this.carryTime = 0;
    }
    this.show();
    this.hitbox();
    this.breaking();
  }

  show() {
    if (this.broken === false) {
      rect(this.x, this.y, this.width, this.height)
      if (this.breakable == false && this.base == false) {
        image(pathetic, this.x - 5, this.y + scroll - 5);
      } else if (this.breakable == true) {
        image(trans, this.x - 5, this.y + scroll - 5);
      } else if (this.base == true) {
        image(basePlatform, this.x - 5, this.y + scroll - 5);
      }
    }
  }

  hitbox() {
    if (
      box1.x + box1.width > this.x &&
      box1.x < this.x + this.width &&
      box1.y + box1.height >= this.y + scroll &&
      box1.y < this.y + scroll + this.height &&
      this.broken === false
    ) {
      box1.appYForce(-1);
      box1.Yvelo = 0;
      box1.onGround = true;
      //box1.Yvelo -=10;

      if (
        box1.y + box1.height > this.y + scroll &&
        box1.y < this.y + scroll + this.height
      ) {
        box1.y -= 2;
      }
    }
    if (
      box1.x + box1.width > this.x &&
      box1.x < this.x + this.width &&
      box1.y + box1.height >= this.y + scroll - 15 &&
      box1.y < this.y + scroll + this.height &&
      this.broken === false
    ) {
      this.carrying = true;
    } else {
      this.carrying = false;
    }
  }

  breaking() {
    if (this.breakable === true && this.carrying === true) {
      this.carryTime++;
      if (this.carryTime > 10) {
        this.broken = true;
      }
    } else if (this.carryTime > 0) {
      this.carryTime--;
    }
  }
}

let platform1 = new platform(
  random(20, screenWidth - 70),
  random(10, screenHeight / 5) + scroll,
  80,
  10,
  true,
  false
);
let platform2 = new platform(
  random(20, screenWidth - 70),
  random(screenHeight / 5, (screenHeight / 5) * 2) + scroll,
  80,
  10,
  false,
  false
);
let platform3 = new platform(
  random(20, screenWidth - 70),
  random((screenHeight / 5) * 2, (screenHeight / 5) * 3) + scroll,
  80,
  10,
  true,
  false
);
let platform4 = new platform(
  random(20, screenWidth - 70),
  random((screenHeight / 5) * 3, (screenHeight / 5) * 4) + scroll,
  80,
  10,
  false,
  false
);
let platform5 = new platform(
  random(20, screenWidth - 70),
  random((screenHeight / 5) * 4, (screenHeight / 5) * 5) + scroll,
  80,
  10,
  true,
  false
);
let platform6 = new platform(
  random(20, screenWidth - 70),
  random((screenHeight / 5) * 2, (screenHeight / 5) * 3) + scroll,
  80,
  10,
  false,
  false
);
let platform7 = new platform(
  random(20, screenWidth - 70),
  random((screenHeight / 5) * 3, (screenHeight / 5) * 4) + scroll,
  80,
  10,
  true,
  false
);

let base = new platform(25, screenHeight - 50 + scroll, 400, 40, false, true);

function draw() {
  background(240, 186, 70);

  if (gameScreen === 0) {
    textSize(50);
    text("Doodle Jump", 50, 50);
    textSize(10);
  }
  //scroll = 0;
  if (gameScreen === 1) {
    box1.simulate();
    platform1.simulate();
    platform2.simulate();
    platform3.simulate();
    platform4.simulate();
    platform5.simulate();
    base.show();
    base.hitbox();

    if (scroll > 2.5) {
      platform6.simulate();
      platform7.simulate();
    }
  }
  //scroll+=0.0001;
  text(box1.Xvelo, 20, 20);
  text(platform2.carryTime, 20, 40);
  text(platform3.carryTime, 20, 60);
  text(platform4.carryTime, 20, 80);
  text(platform5.carryTime, 20, 100);
  text(platform6.carryTime, 20, 120);
}

function keyPressed() {
  if (keyCode == 65) {
    aIsDown = true;
  }

  if (keyCode == 68) {
    dIsDown = true;
  }
}
function keyReleased() {
  if (keyCode == 65) {
    aIsDown = false;
  }
  if (keyCode == 68) {
    dIsDown = false;
  }
}