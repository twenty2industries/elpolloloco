class Chicken extends MovableObject {
//#region attributes

chickenEnergy = 100;

  height = 80;
  y = 350;
  width = 70;
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
    super().loadImage(ImageHub.CHICKEN_IMAGES_WALKING[0]);
    this.x = 600 + Math.random() * 500;
    this.loadImages(ImageHub.CHICKEN_IMAGES_WALKING);
    this.animate();
  }
//#endregion
//#region methods
  animate() {
        setInterval(() => {
    this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(ImageHub.CHICKEN_IMAGES_WALKING);
    }, 150);
  }
  //#endregion
}
