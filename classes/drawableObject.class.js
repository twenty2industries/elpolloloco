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

  coinStatus;
  bottleStatus;

  //#endregion
  //#region constructor
  constructor() {
    this.getRealFrame();
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
  //new
  getRealFrame() {
    this.rX = this.x + this.offset.left;
    this.rY = this.y + this.offset.right + 70;
    this.rW = this.width - this.offset.left - this.offset.right;
    this.rH = this.height - this.offset.top - this.offset.bottom;
  }
  //#endregion
}
