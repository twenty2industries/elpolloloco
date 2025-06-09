/**
 * Represents the "You Lose" screen displayed when the player loses the game.
 * Extends DrawableObject to handle drawing on the canvas.
 * 
 * @class YouLoseScreen
 * @extends DrawableObject
 */
class YouLoseScreen extends DrawableObject {
  /**
   * Horizontal position of the screen image.
   * @type {number}
   */
  x = 80;

  /**
   * Vertical position of the screen image.
   * @type {number}
   */
  y = 70;

  /**
   * Height of the screen image.
   * @type {number}
   */
  height = 320;

  /**
   * Width of the screen image.
   * @type {number}
   */
  width = 550;

  /**
   * Creates an instance of YouLoseScreen and loads the lose image.
   */
  constructor() {
    super().loadImage(ImageHub.YOULOSE_IMAGE);
  }
}
