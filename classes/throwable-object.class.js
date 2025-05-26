class ThrowableObject extends MovableObject {
  //#region attributes
  isThrown = false;
  collided = false;

  hasDealtDamage = true; // stop dmg for @throwableobject as soon its collides

  //#endregion

  //#region constructor
  constructor(x, y) {
    super().loadImage(ImageHub.BOTTLE_IMAGE_ROTATION[0]);
    this.loadImages(ImageHub.BOTTLE_IMAGE_ROTATION);
    this.loadImages(ImageHub.BOTTLE_IMAGE_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 110;
    this.width = 100;
    this.throw();
    this.animate();
  }
  //#endregion
  //#region methods
  throw() {
    this.isThrown = true;
    this.hasDealtDamage = false; // stop dmg for @throwableobject as soon its collides

    this.speedY = 20;
    this.applyGravity();
    this.throwInterval = setInterval(() => {
      if (this.isThrown) {
        this.x += 20;
      } else {
        clearInterval(this.throwInterval);
      }
    }, 1000 / 60);
  }
  animate() {
    //playAnimation for bottle rotation
    setInterval(() => {
      if (this.isThrown) {
        this.playAnimation(ImageHub.BOTTLE_IMAGE_ROTATION);
      }
    }, 1000 / 30);

/*     this.splashInterval =  */setInterval(() => {
      if (this.collided) {
        this.playAnimation(ImageHub.BOTTLE_IMAGE_SPLASH);
/*         clearInterval(this.splashInterval); // Intervall beenden
 */      }
    }, 1000 / 10);
  }
  //#endregion
}
