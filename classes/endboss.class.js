class Endboss extends MovableObject {
  //#region attributes

  energy = 100;

  bossWalkTrigger = false;
  bossHurt = false;

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
    IntervalHub.startInterval(this.bossDashMechanic, 1000 / 60);
    IntervalHub.startInterval(this.setBossSpeed, 2000);
    IntervalHub.startInterval(this.setBossPositionBack, 1000 / 60);
  }
  //#endregion
  //#region methods
  animate = () => {
    //animation for alert
    if (!this.isHurt() && !this.isDead()) {
      this.playAnimation(ImageHub.BOSS_IMAGES_ALERT);
      this.bossHurt = false;
    }
    //playAnimation for movement hurt
    else if (this.isHurt()) {
      this.bossHurt = true;
      this.playAnimation(ImageHub.BOSS_IMAGES_HURT);
    }
    //playAnimation for movement DEAD
    else if (this.isDead()) {
      this.playAnimation(ImageHub.BOSS_IMAGES_DEAD);
    } else if (this.moveLeft()) {
      this.playAnimation(ImageHub.BOSS_IMAGES_WALK);
      console.log("boss Walk animation wird ausgefühhrt");
    }
  };

  bossDashMechanic = () => {
    if (this.isHurt()) {
      this.speed = 10;
      this.moveLeft();
      this.bossWalkTrigger = true;
                  this.otherDirection = false;

    }
  };

  setBossSpeed = () => {
    if (this.bossWalkTrigger) {
      this.speed = 3;
      this.x += this.speed;
      this.bossWalkTrigger = false;
    }
  };

  setBossPositionBack = () => {
    if (this.x < 2000 && !this.isHurt() && !this.isDead()) {
      this.speed = 3;
      this.x += this.speed; // Nach rechts bewegen
      this.otherDirection = true;
    }
  };

  //#endregion
}
