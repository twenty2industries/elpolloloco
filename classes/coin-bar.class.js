class Coinbar extends DrawableObject {
  //#region attributes
  y = 40;
  x = 20;
  height = 40;
  width = 130;
//#endregion

//#region methods
  constructor() {
    super().loadImage(Statusbar.IMAGES_STATUS_COIN[5]);
  }
//#endregion
}
