class Endboss extends MovableObject {
  //#region attributes

  energy = 120;
  speed = 10;

  offset = {
    top: 10,
    right: 70,
    bottom: 70,
    left: 10,
  };

  //#endregion
  //#region constructor
  constructor() {
    super().loadImage(ImageHub.BOSS_IMAGES_ALERT[0]);
    this.loadImages(ImageHub.BOSS_IMAGES_ALERT);
    this.loadImages(ImageHub.BOSS_IMAGES_HURT);
    this.loadImages(ImageHub.BOSS_IMAGES_DEAD);
    this.loadImages(ImageHub.BOSS_IMAGES_WALK);

    this.x = 3000;
    this.height = 400;
    this.width = 300;
    this.y = 50;
    IntervalHub.startInterval(this.animate, 150);
    IntervalHub.startInterval(this.bossDashMechanic, 1000/60)
    IntervalHub.startInterval(this.bossWalkAnimation, 150)
  }
  //#endregion
  //#region methods
  animate = () => {
    //animation for alert
    if (!this.isHurt() && !this.isDead()) {
      this.playAnimation(ImageHub.BOSS_IMAGES_ALERT);
    }
    //playAnimation for movement hurt
    else if (this.isHurt()) {
      this.playAnimation(ImageHub.BOSS_IMAGES_HURT);
    }
    //playAnimation for movement DEAD
    else if (this.isDead()) {
      this.playAnimation(ImageHub.BOSS_IMAGES_DEAD);
    }
  };

  bossDashMechanic = () => {
    if (this.isHurt()) {
      this.moveLeft();
    }
  };

  bossWalkAnimation = () => {
    if (this.moveLeft()) {
      this.playAnimation(ImageHub.BOSS_IMAGES_WALK);
    }
  };
  //#endregion
}
