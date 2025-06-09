/**
 * Base class for drawable objects on the canvas.
 * Handles image loading, drawing, and hitbox/frame drawing with offset support.
 */
class DrawableObject {
  //#region attributes

  /**
   * Image element representing the drawable object's current image.
   * @type {HTMLImageElement}
   */
  img;

  /**
   * Cache for loaded images to optimize performance.
   * @type {Object.<string, HTMLImageElement>}
   */
  imageCache = {};

  /**
   * Index of the current image in animations or sequences.
   * @type {number}
   */
  currentImage = 0;

  /**
   * Horizontal position on the canvas.
   * @type {number}
   */
  x = 120;

  /**
   * Vertical position on the canvas.
   * @type {number}
   */
  y = 280;

  /**
   * Height of the drawable object in pixels.
   * @type {number}
   */
  height = 150;

  /**
   * Width of the drawable object in pixels.
   * @type {number}
   */
  width = 100;

  /**
   * Offset object to adjust collision or rendering boundaries.
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  //#endregion

  //#region constructor
  constructor() {}
  //#endregion

  //#region methods

  /**
   * Loads an image from the given path and sets it as the current image.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
    this.imageCache[path] = this.img;
  }

  /**
   * Draws the current image at the object's (x, y) position with its width and height.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws a blue frame around the object to visualize collision boundaries.
   * Only draws for specific object types.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawFrame(ctx) {
    if (
      this instanceof Character || this instanceof Chicken || this instanceof Endboss ||
      this instanceof SmallChicken || this instanceof AirItems || this instanceof GroundItems || this instanceof ThrowableObject
    ) {
      ctx.beginPath();
      ctx.lineWidth = "4";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
      ctx.stroke();
    }
  }

  /**
   * Sets the image based on the given percentage threshold from an array of image paths.
   * @param {number} percentage - The percentage value to determine which image to load.
   * @param {string[]} imgPath - Array of image paths indexed by percentage thresholds.
   */
  setPercentage(percentage, imgPath) {
    if (percentage == 100) {
      this.loadImage(imgPath[0]);
    } else if (percentage >= 80) {
      this.loadImage(imgPath[1]);
    } else if (percentage >= 60) {
      this.loadImage(imgPath[2]);
    } else if (percentage >= 40) {
      this.loadImage(imgPath[3]);
    } else if (percentage >= 20) {
      this.loadImage(imgPath[4]);
    } else if (percentage == 0) {
      this.loadImage(imgPath[5]);
    }
  }

  //#endregion
}
