class ThrowableObject extends MovableObject {

  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.x = 100;
    this.height = 120;
    this.width = 100;
    this.y = 100;
    this.throw(120, 200);
  }

  throw(x, y) {
    this.x = x;
    this.y = y;
    this.speedY = 1;
  }
}