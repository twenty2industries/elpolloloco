/**
 * Class representing ground items in the game.
 * Extends MovableObject to inherit movement and rendering capabilities.
 */
class GroundItems extends MovableObject {
  /**
   * Offset object to adjust the collision detection area.
   * @property {number} top - Offset from the top edge.
   * @property {number} right - Offset from the right edge.
   * @property {number} bottom - Offset from the bottom edge.
   * @property {number} left - Offset from the left edge.
   */
  offset = {
    top: 40,
    right: 32,
    bottom: 32,
    left: 32,
  };

  /**
   * Creates an instance of GroundItems.
   * Loads the image for the ground item, sets random horizontal position with minimum spacing,
   * and sets fixed dimensions and vertical position.
   * @param {string} groundItems - The image path for the ground item.
   */
  constructor(groundItems) {
    super().loadImage(groundItems);
    this.x = 150 + Math.random() * 1600; // Random horizontal position
    this.x += MovableObject.minimumDistance; // Add minimum distance offset
    this.height = 120; // Fixed height
    this.width = 100;  // Fixed width
    this.y = 310;      // Fixed vertical position (ground level)
  }
}
