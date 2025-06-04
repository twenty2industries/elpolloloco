class MovableObject extends DrawableObject {
  //#region attributes
  speed = 0.15;
  otherDirection = false; // to flip an image

  energy = 100; //healthbar property
  bottles = 100; //bottlebar
  coins = 100; //coinsbar
  acceleration = 2;

  idleTimer = 0; // track idleTimer for long idle animation

  lastHit = 0;
  idle = false;
  isDeadFlag = false; // um die animation dead zu stopppen IF Abfrage
  static minimumDistance = 100; // minimum distance between spawnspoints for salstabottle & coins

  //#endregion
  //#region methods

  loadImages(arr) {
    arr.forEach((path) => {
      //path is the argument from loadImages(arr)
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  moveLeft() {
    this.x -= this.speed;
  }

    moveRight() {
    this.x += this.speed;
  }

  playAnimation(imgs) {
    let i = this.currentImage % imgs.length;
    let path = imgs[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  jump() {
    if (!this.isAboveGround()) {
      this.speedY = 11;
      this.y -= this.speedY;
      AudioHub.playOne(AudioHub.characterJump);
    }
  }

  //character.isColliding(chicken);
  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x + mo.width &&
      this.y < mo.y + mo.height
    );
  }
  
  hit() {
    if (this.hasDealtDamage) return; // prevent multiple damage hits
    this.hasDealtDamage = true; // mark that damage has been dealt
    this.energy -= 20;
    this.idleTimer = 0; // track idleTimer for long idle animation
    if (this.energy <= 0 && !this.isDeadFlag) {
      this.energy = 0;
      this.isDeadFlag = true;
    } else if (this.energy > 0) {
      this.lastHit = new Date().getTime(); // last collision contact getting saved to calculate time passed
    }

    // Reset hasDealtDamage after 200 ms to allow new hits
    setTimeout(() => {
      this.hasDealtDamage = false;
    }, 200);
  }

  hitBottle() {
    if (this.bottle == 100) {
      return;
    }
    this.bottles -= 20;
    if (this.bottles <= 0) {
      this.bottles = 0;
    }
  }

  hitCoin() {
    if (this.coin == 100) {
      return;
    }
    this.coins -= 20;
    if (this.coins <= 0) {
      this.coins = 0;
    }
  }

stomp(enemy) {
    return (
        this.speedY < 0 &&
        this.y + this.height <= enemy.y + 50 && // füße berühren oben
        this.y + this.height >= enemy.y && // nicht zu weit drüner
        this.x + this.width > enemy.x &&
        this.x < enemy.x + enemy.width
    );
}

  isDead() {
    return this.energy == 0;
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // difference in ms
    timePassed = timePassed / 1000; // difference in s
    return timePassed < 0.7; // if char got hit in the last 5 sec // isHurt true
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      //Throwable object should always fall
      return true;
    } else {
      return this.y < 230;
    }
  }

  applyGravity = () => {
    if (this.collided) {
      this.speedY = 0;
      this.acceleration = 0;
      return; // Gravity stoppen
    } else if (this.isAboveGround() || this.speedY > 0) {
      // this.y smaller than 230
      this.y -= this.speedY; // attribute this.y from character -= speed for gravity
      this.speedY -= this.acceleration; // speed for gravity -= acceleration, the character will fall faster every interval
    }
  };

  //#endregion
}
