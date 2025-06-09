/**
 * BackgroundObject represents a fixed-size background image at a specific horizontal position.
 * Extends MovableObject.
 */
class BackgroundObject extends MovableObject {
  /** @type {number} Width of the background object in pixels */
  width = 720;

  /** @type {number} Height of the background object in pixels */
  height = 480;

  /**
   * Creates a BackgroundObject.
   * @param {string} imagePath - Path to the background image.
   * @param {number} x - Horizontal position on the canvas.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height; // aligns bottom edge with canvas bottom
  }
}
