class Statusbar extends DrawableObject {
  y = 0;
  x = 20;
  height = 40;
  width = 130;

  IMAGES_STATUS_HEALTH = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
  ];

  static IMAGES_STATUS_COIN = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
  ];

  static IMAGES_STATUS_BOTTLE = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_STATUS_HEALTH[0]);
  }

  setPercentage(percentage) {
      if (percentage > 100) {
        this.loadImage(this.IMAGES_STATUS_HEALTH[0]);
        return;
      } else if (percentage > 80) {
        this.loadImage(this.IMAGES_STATUS_HEALTH[1]);
        return;
      } else if (percentage > 60) {
        this.loadImage(this.IMAGES_STATUS_HEALTH[2]);
        return;
      } else if (percentage > 40) {
        this.loadImage(this.IMAGES_STATUS_HEALTH[3]);
        return;
      } else if (percentage > 20) {
        this.loadImage(this.IMAGES_STATUS_HEALTH[4]);
        return;
      } else if (percentage == 0) {
        this.loadImage(this.IMAGES_STATUS_HEALTH[5]);
        return;
      }
  }
}
