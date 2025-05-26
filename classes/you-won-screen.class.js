class YouWonScreen extends DrawableObject {
  //#region attributes
  x = 150;
  y = 50;
  height= 400;
  width = 400;
  //#endregion
  constructor() {
    super().loadImage(ImageHub.YOUWON_IMAGE);
  }
}
