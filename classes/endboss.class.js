class Endboss extends MovableObject {
  //#region attributes

  offset = {
    top: 10,
    right: 70,
    bottom: 70,
    left: 10,
  };

  //#endregion
  //#region constructor
  constructor() {
    super().loadImage(ImageHub.BOSS_IMAGES_WALKING[0]);
    this.loadImages(ImageHub.BOSS_IMAGES_WALKING);
    this.loadImages(ImageHub.BOSS_IMAGES_HURT);
    this.x = 3000;
    this.height = 400;
    this.width = 300;
    this.y = 50;
    this.animate();
  }
  //#endregion
  //#region methods
  animate() {
/*     setInterval(() => {
      this.playAnimation(ImageHub.BOSS_IMAGES_WALKING);
    }, 150);
 */
    //playAnimation for movement hurt
    setInterval(() => {
      if (this.isHurt()) {
        this.playAnimation(ImageHub.BOSS_IMAGES_HURT);
      }
    }, 150);
  }
  //#endregion
}
