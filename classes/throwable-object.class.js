/**
 * Represents a throwable object (e.g., a bottle) that can be thrown and animated with rotation and splash effects.
 * Inherits from MovableObject.
 */
class ThrowableObject extends MovableObject {
  //#region attributes

  /** @type {boolean} Indicates whether the object has been thrown. */
  isThrown = false;

  /** @type {boolean} Indicates whether the object has collided. */
  collided = false;

  /** @type {boolean} Prevents further damage once the object has collided. */
  hasDealtDamage = true;

  //#endregion

  //#region constructor
  /**
   * Creates a new throwable object at the given position and direction.
   * @param {number} x - The horizontal position.
   * @param {number} y - The vertical position.
   * @param {boolean} [otherDirection=false] - Direction of the throw (true = left, false = right).
   */
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

  /**
   * Triggers the throw movement: applies gravity, sets direction, and controls movement.
   */
  throw() {
    this.isThrown = true;
    this.hasDealtDamage = false;
    this.bottles -= 20;
    this.speedY = 20;
    IntervalHub.startInterval(this.applyGravity, 1000 / 60);
    this.throwInterval = setInterval(() => {
      if (this.isThrown) {
        if (this.otherDirection) {
          this.x -= 20;
        } else {
          this.x += 20;
        }
      } else {
        clearInterval(this.throwInterval);
      }
    }, 1000 / 60);
  }

  /**
   * Plays the bottle rotation animation while in the air.
   * @private
   */
  animateBottleRotation = () => {
    if (this.isThrown) {
      this.playAnimation(ImageHub.BOTTLE_IMAGE_ROTATION);
    }
  };

  /**
   * Plays the splash animation when the object has collided.
   * @private
   */
  animateBottleSplash = () => {
    if (this.collided) {
      this.playAnimation(ImageHub.BOTTLE_IMAGE_SPLASH);
    }
  };

  //#endregion
}
