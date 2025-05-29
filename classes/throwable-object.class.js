class ThrowableObject extends MovableObject {
  //#region attributes
  isThrown = false; //track down if throw() method has been executed
  collided = false;

  hasDealtDamage = true; // stop dmg for @throwableobject as soon its collides

  //#endregion

  //#region constructor
  constructor(x, y, otherDirection = false) {
    super().loadImage(ImageHub.BOTTLE_IMAGE_ROTATION[0]);
    this.loadImages(ImageHub.BOTTLE_IMAGE_ROTATION);
    this.loadImages(ImageHub.BOTTLE_IMAGE_SPLASH);
    this.x = x;
    this.y = y;
    this.otherDirection = otherDirection;
    this.height = 110;
    this.width = 100;
    this.throw();
    IntervalHub.startInterval(this.animateBottleRotation, 1000 / 30);
    IntervalHub.startInterval(this.animateBottleSplash, 1000 / 10);
  }
  //#endregion
  //#region methods
throw() {
  this.isThrown = true; // flag to track down rotation motion
  this.hasDealtDamage = false; // stop dmg for @throwableobject as soon it collides
  this.bottles -= 20;
  this.speedY = 20;
  IntervalHub.startInterval(this.applyGravity, 1000 / 60);

  this.throwInterval = setInterval(() => {
    // no x speed so the bottle stops at collision point
    if (this.isThrown) {
      if (this.otherDirection) {
        this.x -= 20;  // nach links werfen, wenn otherDirection true ist
      } else {
        this.x += 20;  // sonst nach rechts werfen
      }
    } else {
      clearInterval(this.throwInterval);
    }
  }, 1000 / 60);
}
  animateBottleRotation = () => {
    //playAnimation for bottle rotation
    if (this.isThrown) {
      this.playAnimation(ImageHub.BOTTLE_IMAGE_ROTATION);
    }
  }

  animateBottleSplash = () => {
    if (this.collided) {
      this.playAnimation(ImageHub.BOTTLE_IMAGE_SPLASH);
    }
  }
  //#endregion
}
