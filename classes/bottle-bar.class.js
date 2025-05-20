class Bottlebar extends DrawableObject {
//#region attributes
  y = 80;
  x = 20;
  height = 40;
  width = 130;
//#endregion
//#region constructor
  constructor() {
    super().loadImage(ImageHub.IMAGES_STATUS_BOTTLE[5]);
  }
  //#endregion
}
