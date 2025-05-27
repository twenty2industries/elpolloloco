class Character extends MovableObject {
  //#region attributes
  height = 200;
  y = 230;
  speed = 10;
  static x = 100;

  rX;

  offset = {
    top: 1,
    right: 80,
    bottom: 92,
    left: 80,
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
    IntervalHub.startInterval(this.animateCharacterJump, 300);
    IntervalHub.startInterval(this.animateCharacterDead, 100);
    IntervalHub.startInterval(this.animateCharacterHurt, 100);
    IntervalHub.startInterval(this.animateIdleAnimations, 200);

  }
  //#endregion
  //#region methods
  characterMovement = () => {
    //movement right & left || movement SPACE / jump ||movement camera
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

  animateCharacterWalking = () => {
    //animation for movement right & left
    if (Keyboard.RIGHT || Keyboard.LEFT) {
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
        !Keyboard.RIGHT &&
        !Keyboard.LEFT &&
        !Keyboard.UP &&
        !Keyboard.DOWN &&
        !Keyboard.SPACE &&
        !Keyboard.F;

      if (noKeyPressed && !this.isDead()) {
        this.idleTimer += 200; // add time in 100 = every 100 ms
        this.playAnimation(ImageHub.CHARACTER_IMAGES_IDLE); // plays idle animation if noKeyPressed

        if (this.idleTimer >= 5000) {
          //interval ticks 50 times = 5000ms long idle animation starts
          this.playAnimation(ImageHub.CHARACTER_IMAGES_LONG_IDLE);
        }
      } else {
        this.idleTimer = 0; // sets back timer if noKeyPressed is negotiated
      }
  }

  moveRight() {
    this.x += this.speed;
  }
  //#endregion
}
