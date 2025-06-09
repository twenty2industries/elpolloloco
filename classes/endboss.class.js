/**
 * Represents the Endboss character with health, animations, and boss-specific behaviors.
 * Extends MovableObject to include movement and animation capabilities.
 */
class Endboss extends MovableObject {
  //#region attributes

  /**
   * The energy (health) level of the Endboss.
   * @type {number}
   */
  energy = 100;
hasStoppedMovement = false;
  /**
   * Flag to trigger walking animation and movement.
   * @type {boolean}
   */
  bossWalkTrigger = false;

  /**
   * Flag indicating if the boss is hurt.
   * @type {boolean}
   */
  bossHurt = false;

  /**
   * Flag indicating if the player is within proximity of the boss.
   * @type {boolean}
   */
  bossProximity = false;

  /**
   * Flag to ensure boss approach sound is played only once.
   * @type {boolean}
   */
  hasPlayedBossApproach = false;

  /**
   * Collision box offset values for fine-tuning hit detection.
   */
  offset = {
    top: 55,
    right: 70,
    bottom: 30,
    left: 10,
  };

  //#endregion

  //#region constructor

  /**
   * Initializes the Endboss by loading all images, setting position, size,
   * and starting the necessary intervals for animation and movement.
   */
  constructor() {
    super();
    this.loadAllImagesEndboss();
    this.x = 3000;
    this.height = 400;
    this.width = 300;
    this.y = 50;
    this.animationInterval = IntervalHub.startInterval(this.animate, 200);
    this.bossDashInterval = IntervalHub.startInterval(this.bossDashMechanic, 1000 / 60);
    this.bossDashProximityInterval = IntervalHub.startInterval(this.bossDashMechanicProximity, 1000 / 60);
    this.speedInterval = IntervalHub.startInterval(this.setBossSpeed, 2000);
    this.positionBackInterval = IntervalHub.startInterval(this.setBossPositionBack, 1000 / 60);
  }

  //#endregion

  //#region methods

  /**
   * Loads all image sets for the Endboss animations.
   */
  loadAllImagesEndboss() {
    this.loadImage(ImageHub.BOSS_IMAGES_ALERT[0]);
    this.loadImages(ImageHub.BOSS_IMAGES_ALERT);
    this.loadImages(ImageHub.BOSS_IMAGES_HURT);
    this.loadImages(ImageHub.BOSS_IMAGES_DEAD);
    this.loadImages(ImageHub.BOSS_IMAGES_WALK);
  }

  /**
   * Controls which animation to play based on the Endboss's current state.
   */
animate = () => {
  if (this.isDead()) {
    this.playAnimation(ImageHub.BOSS_IMAGES_DEAD);

    // Stoppe alle Bewegungsintervalle nur einmal
    if (!this.hasStoppedMovement) {
      clearInterval(this.bossDashInterval);
      clearInterval(this.bossDashProximityInterval);
      clearInterval(this.speedInterval);
      clearInterval(this.positionBackInterval);
      this.hasStoppedMovement = true; // Flag setzen, damit stop nicht wiederholt wird
    }

    return; // Stoppe weitere Animationsprüfungen
  }

  // Rest deines Codes für andere Animationen
  if (this.isHurt()) {
    this.bossHurt = true;
    this.playAnimation(ImageHub.BOSS_IMAGES_HURT);
  } else if (this.bossWalkTrigger || this.bossDashMechanicProximity()) {
    this.playAnimation(ImageHub.BOSS_IMAGES_WALK);
  } else if (!this.isHurt()) {
    this.playAnimation(ImageHub.BOSS_IMAGES_ALERT);
    this.bossHurt = false;
    this.bossWalkTrigger = false;
  }
};

  /**
   * Returns whether the Endboss is currently moving back to its start position.
   * @returns {boolean}
   */
  isMovingBack() {
    return this.x < 2000 && !this.isHurt() && !this.isDead();
  }

  /**
   * Dash mechanic activated when the Endboss is hurt.
   * Increases speed and moves left.
   */
  bossDashMechanic = () => {
    if (this.isHurt()) {
      this.speed = 10;
      this.moveLeft();
      this.bossWalkTrigger = true;
      this.otherDirection = false;
    }
  };

  /**
   * Dash mechanic activated when the player is close.
   * Increases speed and moves left.
   */
  bossDashMechanicProximity = () => {
    if (this.bossProximity) {
      this.speed = 6;
      this.moveLeft();
      this.bossWalkTrigger = true;
      this.otherDirection = false;
    }
  };

  /**
   * Sets the speed for walking and moves the Endboss forward.
   */
  setBossSpeed = () => {
    if (this.bossWalkTrigger) {
      this.speed = 3;
      this.x += this.speed;
      this.bossWalkTrigger = false; // Prevent direction errors
    }
  };

  /**
   * Moves the Endboss back to starting position and adjusts facing direction.
   */
  setBossPositionBack = () => {
    if (this.x < 2000 && !this.isHurt() && !this.isDead() && !this.bossProximity) {
      this.speed = 6;
      this.x += this.speed;
      this.otherDirection = true;
    } else if (this.x >= 2000 || this.bossProximity) {
      this.otherDirection = false;
    }
  };

  //#endregion
}
