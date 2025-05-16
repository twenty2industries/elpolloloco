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
  world;

  constructor() {
    //wird immer als aller erstes ausgeführt sobald new Character erstellt wird
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
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
  }

  jump() {}
}
