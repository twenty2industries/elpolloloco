class DrawableObject {
  //#region attributes
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 280;
  height = 150;
  width = 100;

  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  rX;
  rY;
  rW;
  rH;

  //#endregion
  //#region constructor
  constructor() {
  }
  //#endregion
  //#region methods
  loadImage(path) {
    this.img = new Image(); // this.img = document.getElemtById("image") <img id="image" src>
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof SmallChicken ||
      this instanceof AirItems ||
      this instanceof GroundItems
    ) {
      ctx.beginPath();
      ctx.lineWidth = "4";
      ctx.strokeStyle = "blue";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.right,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.top - this.offset.bottom
      );
      ctx.stroke();
    }
  }

  setPercentage(percentage, imgPath) {
    if (percentage == 100) {
      this.loadImage(imgPath[0]);
      return;
    } else if (percentage >= 80) {
      this.loadImage(imgPath[1]);
      return;
    } else if (percentage >= 60) {
      this.loadImage(imgPath[2]);
      return;
    } else if (percentage >= 40) {
      this.loadImage(imgPath[3]);
      return;
    } else if (percentage >= 20) {
      this.loadImage(imgPath[4]);
      return;
    } else if (percentage == 0) {
      this.loadImage(imgPath[5]);
      return;
    }
  }
  //#endregion
}
