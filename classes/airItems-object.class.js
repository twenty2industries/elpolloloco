class AirItems extends MovableObject {

  constructor(airItems) {
    super().loadImage(airItems);
    this.y = 130 + Math.random() * 100;
    this.height = 120;
    this.width = 100;
    this.x = 300  + MovableObject.minimumDistance + Math.random() * 2400;
  }
}