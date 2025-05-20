class Endboss extends MovableObject {
//#region attributes
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

    offset = {
    top: 10,
    right: 70,
    bottom: 70,
    left: 10,
  };
//#endregion
//#region constructor
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 3000;
    this.height = 400;
    this.width = 300;
    this.y = 50;
    this.animate();
  }
//#endregion
//#region methods
    animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 150);
  }
//#endregion
}
