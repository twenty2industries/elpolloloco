class GroundItems extends MovableObject {

  constructor(groundItems) {
    super().loadImage(groundItems);
    this.x = 300  + MovableObject.minimumDistance + Math.random() * 2400;
    this.height = 120;
    this.width = 100;
    this.y = 310;
  }
}