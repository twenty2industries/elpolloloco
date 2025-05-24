class Endboss extends MovableObject {
  //#region attributes

  endbossEnergy = 100;

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
      this.playAnimation(ImageHub.BOSS_IMAGES_WALKING);
    }, 150);
  }
  //#endregion
}
