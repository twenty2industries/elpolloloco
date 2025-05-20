class MovableObject extends DrawableObject {
  //#region attributes
  speed = 0.15;
  otherDirection = false; // to flip an image
  energy = 100; //healthbar property
  lastHit = 0;
  idle = false;
  isDeadQuery = false; // um die animation dead zu stopppen IF Abfrage
  //#endregion
  //#region methods

  loadImages(arr) {
    //Array
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

  playAnimation(imgs) {
    let i = this.currentImage % imgs.length;
    let path = imgs[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  jump() {
    if (!this.isAboveGround()) {
      this.speedY = 15;
      this.y -= this.speedY;
    }
  }

  //character.isColliding(chicken);
  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height
    );
  }

  hit() {
    if (this.isDeadQuery) return; //
    this.energy -= 5;
    if (this.energy <= 0 && this.isDeadQuery === false) {
      this.energy = 0;
      this.isDeadQuery = true;
    } else if (this.energy > 0) {
      this.lastHit = new Date().getTime(); // last collision contact getting saved to calculate time passed
    }
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
    return this.y < 230;
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        // this.y smaller than 230
        this.y -= this.speedY; // attribute this.y from character -= speed for gravity
        this.speedY -= this.acceleration; // speed for gravity -= acceleration, the character will fall faster every interval
      }
    }, 1000 / 60);
  }
  //#endregion
}
