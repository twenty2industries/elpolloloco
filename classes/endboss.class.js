class Endboss extends MovableObject {
  //#region attributes

  energy = 100;

  bossWalkTrigger = false;
  bossHurt = false;
  bossProximity = false;

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
    IntervalHub.startInterval(this.animate, 200);
    IntervalHub.startInterval(this.bossDashMechanic, 1000 / 60);
    IntervalHub.startInterval(this.bossDashMechanicProximity, 1000 / 60);
    IntervalHub.startInterval(this.setBossSpeed, 2000);
    IntervalHub.startInterval(this.setBossPositionBack, 1000 / 60);
  }
  //#endregion
  //#region methods
  animate = () => {
    // animation for DEAD
    if (this.isDead()) {
      this.playAnimation(ImageHub.BOSS_IMAGES_DEAD);
    }
    // animation for HURT
    /*     else if (this.isHurt()) {
      this.bossHurt = true;
      this.playAnimation(ImageHub.BOSS_IMAGES_HURT);
    } */
    // play walk animation for dash mechanic oder wenn Boss zurückläuft
    else if (this.bossWalkTrigger) {
      this.playAnimation(ImageHub.BOSS_IMAGES_WALK);
    }
    // animation for alert (wenn Boss steht)
    else if (!this.isHurt()) {
      this.playAnimation(ImageHub.BOSS_IMAGES_ALERT);
      this.bossHurt = false;
      this.bossWalkTrigger = false;
    }
  };

  // helper method for calling setBossPositionBack to avoid side effects
  isMovingBack() {
    return this.x < 2000 && !this.isHurt() && !this.isDead();
  }

  bossDashMechanic = () => {
    if (this.isHurt()) {
      this.speed = 10;
      this.moveLeft();
      this.bossWalkTrigger = true;
      this.otherDirection = false;
    }
  };

  bossDashMechanicProximity = () => {
    if (this.bossProximity) {
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
    if (
      this.x < 2000 &&
      !this.isHurt() &&
      !this.isDead() &&
      this.bossWalkTrigger
    ) {
      this.speed = 6;
      this.x += this.speed; // Nach rechts bewegen
      this.otherDirection = true;
    } else if (this.x > 1900) {
      this.otherDirection = false;   
    }
  };
}
