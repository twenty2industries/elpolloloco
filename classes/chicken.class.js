class Chicken extends MovableObject {
//#region attributes
  height = 80;
  y = 350;
  width = 70;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  speed = 0.3 + Math.random() * 0.25; // zufällige zahl zwischen 0.15 und 0.25 

    offset = {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1,
  }
//#endregion
//#region constructor
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 200 + Math.random() * 500;
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }
//#endregion
//#region methods
  animate() {
        setInterval(() => {
    this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 150);
  }
  //#endregion
}
