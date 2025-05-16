class Chicken extends MovableObject {
  height = 80;
  y = 350;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  speed = 0.15 + Math.random() * 0.25; // zufällige zahl zwischen 0.15 und 0.25 

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 200 + Math.random() * 500;
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
    this.moveLeft();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 150);
  }
}
