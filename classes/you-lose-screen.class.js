class YouLoseScreen extends DrawableObject {
  //#region attributes
  x = 80;
  y = 70;
  height= 320;
  width = 550;
  //#endregion
  constructor() {
    super().loadImage(ImageHub.YOULOSE_IMAGE);
  }
}
