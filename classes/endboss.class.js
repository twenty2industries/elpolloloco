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
    super().loadImage(ImageHub.BOSS_IMAGES_ALERT[0]);
    this.loadImages(ImageHub.BOSS_IMAGES_ALERT);
    this.loadImages(ImageHub.BOSS_IMAGES_HURT);
    this.loadImages(ImageHub.BOSS_IMAGES_DEAD);

    this.x = 3000;
    this.height = 400;
    this.width = 300;
    this.y = 50;
    this.animate();
  }
  //#endregion
  //#region methods
  animate() {
    //animation for alert
    setInterval(() => {
      if (!this.isHurt()) {
        this.playAnimation(ImageHub.BOSS_IMAGES_ALERT);
      }
    }, 150);

    //playAnimation for movement hurt
    setInterval(() => {
      if (this.isHurt()) {
        this.playAnimation(ImageHub.BOSS_IMAGES_HURT);
      }
    }, 150);

    //playAnimation for movement DEAD
    setInterval(() => {
      if (this.isDead() && this.isDeadFlag) {
        this.playAnimation(ImageHub.BOSS_IMAGES_DEAD);
        this.isDeadFlag = false; // turn off dead animation; issue with method hit(), need to be solved
      }
    }, 200);
  }
  //#endregion
}
