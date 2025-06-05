class Character extends MovableObject {
  //#region attributes
  height = 200;
  y = 230;
  speed = 10;

  runningSoundIsPlaying = false; // neue Eigenschaft in Character
  hasPlayedDamageSound = false;
  hasPlayedSnoringSound = false;

  offset = {
    top: 90,
    right: 30,
    bottom: 10,
    left: 30,
  };

  world;
  speedY = 0;
  acceleration = 0.5;

  drawableObjektInstance = new DrawableObject();
  throwableObjectBottle = new ThrowableObject();
  //#endregion
  //#region constructor
  constructor() {
    //wird immer als aller erstes ausgeführt sobald new Character erstellt wird
    super().loadImage(ImageHub.CHARACTER_IMAGES_WALKING[0]);
    this.loadImages(ImageHub.CHARACTER_IMAGES_JUMP); // jump animation
    this.loadImages(ImageHub.CHARACTER_IMAGES_WALKING); // walking animation
    this.loadImages(ImageHub.CHARACTER_IMAGES_HURT); // hurt animation
    this.loadImages(ImageHub.CHARACTER_IMAGES_DEAD); // dead animation
    this.loadImages(ImageHub.CHARACTER_IMAGES_IDLE); // short idle animation
    this.loadImages(ImageHub.CHARACTER_IMAGES_LONG_IDLE); //long idle animation
    IntervalHub.startInterval(this.applyGravity, 1000 / 60);
    IntervalHub.startInterval(this.characterMovement, 1000 / 60);
    IntervalHub.startInterval(this.animateCharacterWalking, 100);
    IntervalHub.startInterval(this.animateCharacterJump, 80);
    IntervalHub.startInterval(this.animateCharacterHurt, 100);
    IntervalHub.startInterval(this.animateIdleAnimations, 200);
    IntervalHub.startInterval(this.playDamageSoundOnce, 600);
  }
  //#endregion
  //#region methods

  characterMovement = () => {
    const isMoving = (Keyboard.RIGHT || Keyboard.LEFT) && !this.isAboveGround();

    if (isMoving && !this.runningSoundIsPlaying) {
      AudioHub.playOne(AudioHub.characterRunning);
      this.runningSoundIsPlaying = true;
    } else if ((!Keyboard.RIGHT && !Keyboard.LEFT) || this.isAboveGround()) {
      AudioHub.stopOne(AudioHub.characterRunning);
      this.runningSoundIsPlaying = false;
    }
    if (Keyboard.RIGHT && this.x < Level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
    }
    if (Keyboard.LEFT && this.x > 100) {
      this.moveLeft();
      this.otherDirection = true;
    }
    if (Keyboard.SPACE) {
      this.jump();
    }
    this.world.camera_x = -this.x + 100;
  };

  playDamageSoundOnce = () => {
    if (this.hasPlayedDamageSound) {
      AudioHub.playOne(AudioHub.characterDamage);
      this.hasPlayedDamageSound = false;
    }
  };

  animateCharacterWalking = () => {
    //animation for movement right & left
    if ((Keyboard.RIGHT || Keyboard.LEFT) && !this.isAboveGround()) {
      this.playAnimation(ImageHub.CHARACTER_IMAGES_WALKING);
    }
  };

  animateCharacterJump = () => {
    if (this.isAboveGround()) {
      this.playAnimation(ImageHub.CHARACTER_IMAGES_JUMP);
    }
  };

  animateCharacterDead = () => {
    //playAnimation for movement DEAD
    if (this.isDead() && this.isDeadFlag) {
      this.playAnimation(ImageHub.CHARACTER_IMAGES_DEAD);
      this.isDeadFlag = false; // turn off dead animation; issue with method hit(), need to be solved
    }
  };

  animateCharacterHurt = () => {
    //playAnimation for movement hurt
    if (this.isHurt()) {
      this.playAnimation(ImageHub.CHARACTER_IMAGES_HURT);
    }
  };

animateIdleAnimations = () => {
  const noKeyPressed = 
    !Keyboard.RIGHT && !Keyboard.LEFT && !Keyboard.UP && 
    !Keyboard.DOWN && !Keyboard.SPACE && !Keyboard.F;

  if (noKeyPressed && !this.isDead()) {
    this.idleTimer += 200;

    if (this.idleTimer < 5000) {
      this.playAnimation(ImageHub.CHARACTER_IMAGES_IDLE);
      AudioHub.stopOne(AudioHub.characterRunning);
      this.hasPlayedSnoringSound = false; // Reset hier, wenn noch keine lange Idle
    } else {
      this.playAnimation(ImageHub.CHARACTER_IMAGES_LONG_IDLE);
      if (!this.hasPlayedSnoringSound) {
        AudioHub.playOne(AudioHub.characterSnoring);
        this.hasPlayedSnoringSound = true;
      }
    }
  } else {
    this.idleTimer = 0;
    this.hasPlayedSnoringSound = false; // Reset wenn Bewegung
  }
};

  //#endregion
}
