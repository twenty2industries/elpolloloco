/**
 * Represents the "You Won" screen displayed when the player wins the game.
 * Extends DrawableObject to handle drawing on the canvas.
 * 
 * @class YouWonScreen
 * @extends DrawableObject
 */
class YouWonScreen extends DrawableObject {
  /**
   * Horizontal position of the screen image.
   * @type {number}
   */
  x = 150;

  /**
   * Vertical position of the screen image.
   * @type {number}
   */
  y = 50;

  /**
   * Height of the screen image.
   * @type {number}
   */
  height = 400;

  /**
   * Width of the screen image.
   * @type {number}
   */
  width = 400;

  /**
   * Creates an instance of YouWonScreen and loads the win image.
   */
  constructor() {
    super().loadImage(ImageHub.YOUWON_IMAGE);
  }
}
