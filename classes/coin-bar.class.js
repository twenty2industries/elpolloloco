/**
 * Represents the Coinbar UI element displaying collected coins.
 * Extends DrawableObject for rendering on screen.
 */
class Coinbar extends MovableObject {
  /**
   * Vertical position of the coin bar.
   * @type {number}
   */
  y = 40;

  /**
   * Horizontal position of the coin bar.
   * @type {number}
   */
  x = 20;

  /**
   * Height of the coin bar in pixels.
   * @type {number}
   */
  height = 40;

  /**
   * Width of the coin bar in pixels.
   * @type {number}
   */
  width = 130;

  /**
   * Creates a new Coinbar instance and loads the coin bar image.
   */
  constructor() {
    super().loadImage(ImageHub.IMAGES_STATUS_COIN[0]);
    this.loadImages(ImageHub.IMAGES_STATUS_COIN);
  }
}
