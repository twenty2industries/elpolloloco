/**
 * Represents a Cloud that moves left across the screen.
 * Extends MovableObject for basic movement and rendering.
 */
class Cloud extends MovableObject {
  /**
   * Horizontal position of the cloud, randomized between 0 and 200.
   * @type {number}
   */
  x = Math.random() * 200;

  /**
   * Vertical position of the cloud, randomized slightly around 0.
   * @type {number}
   */
  y = 0 + Math.random();

  /**
   * Width of the cloud in pixels.
   * @type {number}
   */
  width = 700;

  /**
   * Height of the cloud in pixels.
   * @type {number}
   */
  height = 500;

  /**
   * Creates a new Cloud instance, loads its image and starts movement animation.
   */
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.animate();
    this.moveLeft();
  }

  /**
   * Starts the cloud's left movement animation.
   */
  animate() {
    this.moveLeft();
  }
}
