class EndbossHealthBar extends DrawableObject {
//#region attributes
  y = 20;
  x = 465;
  height = 80;
  width = 230;
//#endregion

//#region methods
  constructor() {
    super().loadImage(ImageHub.BOSS_IMAGES_STATUS_HEALTH[5]);
  }
//#endregion
}
