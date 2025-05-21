class ThrowableObject extends MovableObject{
//#region constructor
  constructor(){
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.x = 100;
    this.height = 110;
    this.width = 100;
    this.y = 100;
    this.throw(100,150)
  }
//#endregion
//#region methods
  throw(x, y){
    this.x = x;
    this.y = y;
    this.speedY = 0.5;
    this.applyGravity();
  }
  //#endregion
}