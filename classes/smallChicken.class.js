/**
 * Represents a small chicken enemy in the game with basic movement, dash behavior, and animations.
 * Inherits from MovableObject.
 */
class SmallChicken extends MovableObject {
  //#region attributes

  /** @type {number} The energy level of the small chicken (used for health). */
  energy = 5;

  /** @type {number} Height of the small chicken. */
  height = 60;

  /** @type {number} Vertical position on the canvas. */
  y = 370;

  /** @type {number} Width of the small chicken. */
  width = 55;

  /** @type {number} Base movement speed, randomized. */
  speed = 0.3 + Math.random() * 1;

  /** @type {number} Speed used during dash movement. */
  dashSpeed = 5;

  /** @type {boolean} Whether the chicken is currently dashing to the right. */
  isDashingRight = false;

  /** @type {number} Distance to cover during a dash. */
  dashDistance = 200;

  /** @type {number} Distance already traveled during the current dash. */
  dashTraveled = 0;

  /** @type {{top: number, right: number, bottom: number, left: number}} Collision offsets. */
  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  //#endregion
  //#region constructor
  /**
   * Initializes the small chicken: loads images and starts its movement/animation intervals.
   */
  constructor() {
    super().loadImage(ImageHub.SMALL_CHICKEN_ENEMYS_WALK[0]);
    this.x = 800 + Math.random() * 1600;
    this.loadImages(ImageHub.SMALL_CHICKEN_ENEMYS_WALK);
    this.loadImages(ImageHub.SMALL_CHICKEN_ENEMYS_DEAD);
    IntervalHub.startInterval(this.smallChickenMove, 1000 / 60);
    IntervalHub.startInterval(this.animateSmallChickenWalking, 150);
    IntervalHub.startInterval(this.animateSmallChickenDead, 200);
    IntervalHub.startInterval(this.randomRightDash, 4000);
  }
  //#endregion
  //#region methods

  /**
   * Handles movement logic: dashes right or moves left if not dead.
   * @private
   */
  smallChickenMove = () => {
    if (!this.isDead()) {
      if (this.isDashingRight && this.dashTraveled < this.dashDistance) {
        this.x += this.dashSpeed;
        this.dashTraveled += this.dashSpeed;
      } else {
        this.isDashingRight = false;
        this.dashTraveled = 0;
        this.moveLeft();
        this.otherDirection = false;
      }
    }
  };

  /**
   * Plays the walking animation if the chicken is alive.
   * @private
   */
  animateSmallChickenWalking = () => {
    if (!this.isDead()) {
      this.playAnimation(ImageHub.SMALL_CHICKEN_ENEMYS_WALK);
    }
  };

  /**
   * Plays the dead animation if the chicken has died and is in dead state.
   * @private
   */
  animateSmallChickenDead = () => {
    if (this.isDead() && this.isDeadFlag) {
      this.playAnimation(ImageHub.SMALL_CHICKEN_ENEMYS_DEAD);
    }
  };

  /**
   * Randomly triggers a dash to the right with 20% probability.
   * @private
   */
  randomRightDash = () => {
    let dashChance = Math.random() * 100;
    if (dashChance < 20 && !this.isDead()) {
      this.isDashingRight = true;
      this.dashTraveled = 0;
      this.otherDirection = true;
    }
  };

  //#endregion
}
