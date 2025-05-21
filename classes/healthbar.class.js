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
//#endregion
}
