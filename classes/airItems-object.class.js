/**
 * Represents air items that are movable objects with specific offsets and random positioning.
 * @extends MovableObject
 */
class AirItems extends MovableObject {
  /**
   * Offset values to adjust collision or rendering boundaries.
   * @type {Object}
   * @property {number} top - Top offset in pixels.
   * @property {number} right - Right offset in pixels.
   * @property {number} bottom - Bottom offset in pixels.
   * @property {number} left - Left offset in pixels.
   */
  offset = {
    top: 40,
    right: 32,
    bottom: 32,
    left: 32,
  };

  /**
   * Creates an instance of AirItems.
   * @param {string} airItems - The image path or identifier to load for this air item.
   */
  constructor(airItems) {
    super().loadImage(airItems);
    /**
     * Vertical position of the air item, randomized between 130 and 230.
     * @type {number}
     */
    this.y = 130 + Math.random() * 100;
    /**
     * Height of the air item in pixels.
     * @type {number}
     */
    this.height = 120;
    /**
     * Width of the air item in pixels.
     * @type {number}
     */
    this.width = 100;
    /**
     * Horizontal position of the air item, randomized with a minimum distance offset.
     * @type {number}
     */
    this.x = 300 + MovableObject.minimumDistance + Math.random() * 2400;
  }
}
