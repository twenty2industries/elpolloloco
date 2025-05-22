class ThrowableObject extends MovableObject {
  //#region constructor
  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.height = 110;
    this.width = 100;
    this.throw();
  }
  //#endregion
  //#region methods
  throw() {
    this.speedY = 20;
    this.applyGravity(); // sobald activ verschwindet die flasche
    setInterval(() => {
      this.x += 20;
    }, 1000/60);
  }
  //#endregion
}
