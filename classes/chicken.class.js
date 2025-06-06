class Chicken extends MovableObject {
  //#region attributes

  energy = 5;

  height = 80;
  y = 350;
  width = 70;
  speed = 0.3 + Math.random() * 0.25; // zufällige zahl zwischen 0.15 und 0.25

  offset = { top: 3, bottom: 3, left: 3, right: 3};
  //#endregion
  //#region constructor
  constructor() {
    super().loadImage(ImageHub.CHICKEN_IMAGES_WALKING[0]);
    this.x = 800 + Math.random() * 1600
    this.loadImages(ImageHub.CHICKEN_IMAGES_WALKING);
    this.loadImages(ImageHub.CHICKEN_IMAGES_DEAD);
    IntervalHub.startInterval(this.chickenMoveLeft, 1000 / 60);
    IntervalHub.startInterval(this.animateChickenWalking, 150);
    IntervalHub.startInterval(this.animateChickenDead, 200);
  }
  //#endregion
  //#region methods
  chickenMoveLeft = () => {
    if (!this.isDead()) {
      this.moveLeft();
    }
  };

  animateChickenWalking = () => {
    if (!this.isDead()) {
      this.playAnimation(ImageHub.CHICKEN_IMAGES_WALKING);
    }
  };

  animateChickenDead = () => {
    if (this.isDead() && this.isDeadFlag) {
      this.playAnimation(ImageHub.CHICKEN_IMAGES_DEAD);
      AudioHub.playOne(AudioHub.chicken)
    }
  };
  //#endregion
}
