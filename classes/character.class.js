class Character extends MovableObject {
  height = 200;
  y = 0;
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

  world;
  speedY = 0;
  acceleration = 0.5;

  constructor() {
    //wird immer als aller erstes ausgeführt sobald new Character erstellt wird
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_JUMP); // jump animation
    this.loadImages(this.IMAGES_WALKING); // walking animation
    this.applyGravity();
    this.animate();
  }

  
  isAboveGround() {
    return this.y < 230;
  }


  animate() {
    setInterval(() => {
      if (Keyboard.RIGHT && this.x < Level.level_end_x) {
        this.x += this.speed;
        this.otherDirection = false;
      }

      if (Keyboard.LEFT && this.x > 100) {
        this.x -= this.speed;
        this.otherDirection = true;
      }
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (Keyboard.RIGHT || Keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);

    setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMP);
      }
    }, 90);
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

  jump() {}
}
