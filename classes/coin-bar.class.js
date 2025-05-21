class Coinbar extends DrawableObject {
//#region attributes
  y = 40;
  x = 20;
  height = 40;
  width = 130;
//#endregion

//#region methods
  constructor() {
    super().loadImage(ImageHub.IMAGES_STATUS_COIN[0]);
  }
//#endregion
}
