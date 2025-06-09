/**
 * Represents the bottle bar UI element that displays bottle status.
 * Extends DrawableObject.
 */
class Bottlebar extends MovableObject {
  /**
   * Vertical position of the bottle bar on the canvas.
   * @type {number}
   */
  y = 80;

  /**
   * Horizontal position of the bottle bar on the canvas.
   * @type {number}
   */
  x = 20;

  /**
   * Height of the bottle bar in pixels.
   * @type {number}
   */
  height = 40;

  /**
   * Width of the bottle bar in pixels.
   * @type {number}
   */
  width = 130;

  /**
   * Creates an instance of Bottlebar and loads the initial bottle image.
   */
  constructor() {
    super().loadImage(ImageHub.IMAGES_STATUS_BOTTLE[0]);
    this.loadImages(ImageHub.IMAGES_STATUS_BOTTLE);
  }
}
