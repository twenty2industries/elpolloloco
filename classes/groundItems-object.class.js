class GroundItems extends MovableObject {

  offset = {
    top: 40,
    right: 32,
    bottom: 32,
    left: 32,
  };


  constructor(groundItems) {
    super().loadImage(groundItems);
    this.x = 300 + Math.random() * 2400;
    this.x += MovableObject.minimumDistance;
    this.height = 120;
    this.width = 100;
    this.y = 310;
  }
}