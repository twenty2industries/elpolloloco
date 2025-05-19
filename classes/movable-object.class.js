class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false; // to flip an image
  energy = 100; //healthbar property
  lastHit = 0;
  idle = false

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
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime(); // last collision contact getting safed to calculate timepassed
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
}
