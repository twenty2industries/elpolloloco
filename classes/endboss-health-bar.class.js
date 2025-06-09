/**
 * Represents the health bar of the Endboss.
 * Extends DrawableObject to display health status visually on the canvas.
 */
class EndbossHealthBar extends DrawableObject {
  //#region attributes

  /**
   * Vertical position of the health bar on the canvas.
   * @type {number}
   */
  y = 20;

  /**
   * Horizontal position of the health bar on the canvas.
   * @type {number}
   */
  x = 465;

  /**
   * Height of the health bar in pixels.
   * @type {number}
   */
  height = 80;

  /**
   * Width of the health bar in pixels.
   * @type {number}
   */
  width = 230;

  //#endregion

  //#region methods

  /**
   * Constructs the EndbossHealthBar and loads the initial health bar image.
   */
  constructor() {
    super().loadImage(ImageHub.BOSS_IMAGES_STATUS_HEALTH[0]);
  }

  //#endregion
}
