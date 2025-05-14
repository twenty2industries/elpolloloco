class Cloud extends MovableObject {
  x = Math.random() * 200;
  y = 0 + Math.random();
  width = 700;
  height = 500;

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.animate();
    this.moveLeft();
  }

  animate() {
    this.moveLeft();
  }

}
