class SmallChicken extends MovableObject {
  //#region attributes

  energy = 5;

  height = 60;
  y = 370;
  width = 55;
  speed = 0.3 + Math.random() * 1; // random speed between 0.3 and 1.3
  dashSpeed = 5; // dash speed value
  isDashingRight = false; // state flag for right dash
  dashDistance = 200; // distance to cover while dashing
  dashTraveled = 0; // distance covered during dash

  offset = {
    top: 8,
    right: 8,
    bottom: 8,
    left: 8,
  };

  //#endregion
  //#region constructor
  constructor() {
    super().loadImage(ImageHub.SMALL_CHICKEN_ENEMYS_WALK[0]);
    this.x = 800 + Math.random() * 1600;
    this.loadImages(ImageHub.SMALL_CHICKEN_ENEMYS_WALK);
    this.loadImages(ImageHub.SMALL_CHICKEN_ENEMYS_DEAD);
    IntervalHub.startInterval(this.smallChickenMove, 1000 / 60);
    IntervalHub.startInterval(this.animateSmallChickenWalking, 150);
    IntervalHub.startInterval(this.animateSmallChickenDead, 200);
    IntervalHub.startInterval(this.randomRightDash, 4000); // triggers every 4 seconds
  }
  //#endregion
  //#region methods

  // handle left/right movement logic
  smallChickenMove = () => {
    if (!this.isDead()) {
      if (this.isDashingRight && this.dashTraveled < this.dashDistance) {
        this.x += this.dashSpeed;
        this.dashTraveled += this.dashSpeed;
      } else {
        this.isDashingRight = false;
        this.dashTraveled = 0;
        this.moveLeft();
        this.otherDirection = false;
      }
    }
  };

  // walking animation (looped)
  animateSmallChickenWalking = () => {
    if (!this.isDead()) {
      this.playAnimation(ImageHub.SMALL_CHICKEN_ENEMYS_WALK);
    }
  };

  // play dead animation once
  animateSmallChickenDead = () => {
    if (this.isDead() && this.isDeadFlag) {
      this.playAnimation(ImageHub.SMALL_CHICKEN_ENEMYS_DEAD);
    }
  };

  // randomly trigger a right dash
  randomRightDash = () => {
    let dashChance = Math.random() * 100; // 0–99.99
    if (dashChance < 20 && !this.isDead()) {
      this.isDashingRight = true;
      this.dashTraveled = 0;
      this.otherDirection = true;
    }
  };

  //#endregion
}
