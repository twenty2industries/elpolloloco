/**
 * Class representing the health bar UI element.
 * Extends DrawableObject to handle image rendering.
 */
class Healthbar extends MovableObject {
  /**
   * Vertical position of the health bar.
   * @type {number}
   */
  y = 0;

  /**
   * Horizontal position of the health bar.
   * @type {number}
   */
  x = 20;

  /**
   * Height of the health bar.
   * @type {number}
   */
  height = 40;

  /**
   * Width of the health bar.
   * @type {number}
   */
  width = 130;

  /**
   * Creates an instance of Healthbar.
   * Loads the initial health bar image.
   */
  constructor() {
    super().loadImage(ImageHub.IMAGES_STATUS_HEALTH[0]);
    this.loadImages(ImageHub.IMAGES_STATUS_HEALTH);
  }
}
