class Character extends MovableObject {
  height = 200;
  y = 230;
  speed = 10;

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMP = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];


  world;
  speedY = 0;
  acceleration = 0.5;

  constructor() {
    //wird immer als aller erstes ausgeführt sobald new Character erstellt wird
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_JUMP); // jump animation
    this.loadImages(this.IMAGES_WALKING); // walking animation
    this.loadImages(this.IMAGES_HURT); // hurt animation
    this.loadImages(this.IMAGES_DEAD); // dead animation
    this.applyGravity();
    this.animate();
    
  }

  isAboveGround() {
    return this.y < 230;
  }

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
      //movement camera
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    //#region playAnimation
    //animation for movement right & left

    setInterval(() => {
      if (Keyboard.RIGHT || Keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);

    //playAnimation for movement up / jump
    setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMP);
      }
    }, 200);

    //playAnimation for movement DEAD
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      }
    }, 100);

    //playAnimation for movement hurt
    setInterval(() => {
      if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      }
    }, 100);
/*     //playAnimation for movement idle
    setInterval(() => {
      if (!Keyboard.RIGHT || Keyboard.LEFT || Keyboard.UP || Keyboard.SPACE || Keyboard.down) {
        console.log(this.idle);
        this.playAnimation(this.IMAGES_IDLE);
      }
    }, 100); */

    //#endregion
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround()) {
        // this.y smaller than 230
        this.y -= this.speedY; // attribute this.y from character -= speed for gravity
        this.speedY -= this.acceleration; // speed for gravity -= acceleration, the character will fall faster every interval
      }
    }, 1000 / 60);
  }

  moveRight() {
    this.x += this.speed;
  }
}
