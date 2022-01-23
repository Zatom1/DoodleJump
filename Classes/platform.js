
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
  