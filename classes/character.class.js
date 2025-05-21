class Character extends MovableObject {
  //#region attributes
  height = 200;
  y = 230;
  speed = 10;

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
  //#endregion
  //#region constructor
  constructor() {
    //wird immer als aller erstes ausgeführt sobald new Character erstellt wird
    super().loadImage(ImageHub.CHARACTER_IMAGES_WALKING[0]);
    this.loadImages(ImageHub.CHARACTER_IMAGES_JUMP); // jump animation
    this.loadImages(ImageHub.CHARACTER_IMAGES_WALKING); // walking animation
    this.loadImages(ImageHub.CHARACTER_IMAGES_HURT); // hurt animation
    this.loadImages(ImageHub.CHARACTER_IMAGES_DEAD); // dead animation
    this.applyGravity();
    this.animate();
  }
  //#endregion
  //#region methods
  animate() {
    setInterval(() => {
      //movement right & left
      if (Keyboard.RIGHT && this.x < Level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
      }
      if (Keyboard.LEFT && this.x > 100) {
        this.moveLeft();
        this.otherDirection = true;
      }
      //movement SPACE / jump
      if (Keyboard.SPACE) {
        this.jump();
      }

          // Werfen (F) – einfachste Methode ohne Interval
    if (Keyboard.F && this.bottles >= 100) {
      this.bottles += 20;
      console.log(this.bottles);
      Keyboard.F = false; // Verhindert Dauerfeuer
    }

      //movement camera
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);


    //animation for movement right & left
    setInterval(() => {
      if (Keyboard.RIGHT || Keyboard.LEFT) {
        this.playAnimation(ImageHub.CHARACTER_IMAGES_WALKING);
      }
    }, 100);

    //playAnimation for movement up / jump
    setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(ImageHub.CHARACTER_IMAGES_JUMP);
      }
    }, 300);

    //playAnimation for movement DEAD
    setInterval(() => {
      if (this.isDead() && this.isDeadFlag) {
        this.playAnimation(ImageHub.CHARACTER_IMAGES_DEAD);
        this.isDeadFlag = false; // turn off dead animation; issue with method hit(), need to be solved
      }
    }, 100);

    //playAnimation for movement hurt
    setInterval(() => {
      if (this.isHurt()) {
        this.playAnimation(ImageHub.CHARACTER_IMAGES_HURT);
      }
    }, 100);
  }
  moveRight() {
    this.x += this.speed;
  }
  //#endregion
}
