
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
