/**
 * Represents a Chicken enemy that moves left across the screen,
 * has energy points, and can animate walking and death.
 * Extends MovableObject for basic movement and rendering functionality.
 */
class Chicken extends MovableObject {
  /**
   * Energy level of the chicken.
   * @type {number}
   */
  energy = 5;

  /**
   * Height of the chicken in pixels.
   * @type {number}
   */
  height = 80;

  /**
   * Vertical position of the chicken.
   * @type {number}
   */
  y = 350;

  /**
   * Width of the chicken in pixels.
   * @type {number}
   */
  width = 70;

  /**
   * Movement speed of the chicken, randomized between 0.3 and 0.55.
   * @type {number}
   */
  speed = 0.3 + Math.random() * 0.25;

  /**
   * Collision or rendering offset boundaries.
   * @type {{top: number, bottom: number, left: number, right: number}}
   */
  offset = { top: 3, bottom: 3, left: 3, right: 3};

  /**
   * Creates a new Chicken instance, loads images and starts movement and animation intervals.
   */
  constructor() {
    super().loadImage(ImageHub.CHICKEN_IMAGES_WALKING[0]);
    this.x = 800 + Math.random() * 1600;
    this.loadImages(ImageHub.CHICKEN_IMAGES_WALKING);
    this.loadImages(ImageHub.CHICKEN_IMAGES_DEAD);
    IntervalHub.startInterval(this.chickenMoveLeft, 1000 / 60);
    IntervalHub.startInterval(this.animateChickenWalking, 150);
    IntervalHub.startInterval(this.animateChickenDead, 200);
  }

  /**
   * Moves the chicken left continuously if it is not dead.
   */
  chickenMoveLeft = () => {
    if (!this.isDead()) {
      this.moveLeft();
    }
  };

  /**
   * Plays walking animation if the chicken is alive.
   */
  animateChickenWalking = () => {
    if (!this.isDead()) {
      this.playAnimation(ImageHub.CHICKEN_IMAGES_WALKING);
    }
  };

  /**
   * Plays death animation once and triggers the chicken death sound.
   */
  animateChickenDead = () => {
    if (this.isDead() && this.isDeadFlag) {
      this.playAnimation(ImageHub.CHICKEN_IMAGES_DEAD);
      AudioHub.playOne(AudioHub.chicken);
    }
  };
}
