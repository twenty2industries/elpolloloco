class Healthbar extends DrawableObject {
//#region attributes
  y = 0;
  x = 20;
  height = 40;
  width = 130;
//#endregion
//#region constructor
  constructor() {
    super().loadImage(ImageHub.IMAGES_STATUS_HEALTH[0]);
  }
//#endregion
//#region methods
  setPercentage(percentage) {
      if (percentage > 100) {
        this.loadImage(ImageHub.IMAGES_STATUS_HEALTH[0]);
        return;
      } else if (percentage > 80) {
        this.loadImage(ImageHub.IMAGES_STATUS_HEALTH[1]);
        return;
      } else if (percentage > 60) {
        this.loadImage(ImageHub.IMAGES_STATUS_HEALTH[2]);
        return;
      } else if (percentage > 40) {
        this.loadImage(ImageHub.IMAGES_STATUS_HEALTH[3]);
        return;
      } else if (percentage > 20) {
        this.loadImage(ImageHub.IMAGES_STATUS_HEALTH[4]);
        return;
      } else if (percentage == 0) {
        this.loadImage(ImageHub.IMAGES_STATUS_HEALTH[5]);
        return;
      }
  }
  //#endregion
}
