class SmallChicken extends MovableObject {
  //#region attributes

  energy = 5;

  height = 80;
  y = 350;
  width = 70;
  speed = 0.3 + Math.random() * 1; // zufällige zahl zwischen 0.15 und 0.25

  offset = {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1,
  };
  //#endregion
  //#region constructor
  constructor() {
    super().loadImage(ImageHub.SMALL_CHICKEN_ENEMYS_WALK[0]);
    this.x = 800 + Math.random() * 1600
    this.loadImages(ImageHub.SMALL_CHICKEN_ENEMYS_WALK);
    this.loadImages(ImageHub.SMALL_CHICKEN_ENEMYS_DEAD);
    IntervalHub.startInterval(this.smallChickenMoveLeft, 1000 / 60);
    IntervalHub.startInterval(this.animateSmallChickenWalking, 150);
    IntervalHub.startInterval(this.animateSmallChickenDead, 200);
  }
  //#endregion
  //#region methods
  smallChickenMoveLeft = () => {
    if (!this.isDead()) {
      this.moveLeft();
    }
  };

  animateSmallChickenWalking = () => {
    if (!this.isDead()) {
      this.playAnimation(ImageHub.SMALL_CHICKEN_ENEMYS_WALK);
    }
  };

  animateSmallChickenDead = () => {
    if (this.isDead() && this.isDeadFlag) {
      this.playAnimation(ImageHub.SMALL_CHICKEN_ENEMYS_DEAD);
    }
  };
  //#endregion
}
