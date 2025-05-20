class ThrowableObject extends MovableObject{

  constructor(){
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.x = 100;
    this.height = 60;
    this.width = 50;
    this.y = 100;
    this.throw(100,150)
  }

  throw(x, y){
    this.x = x;
    this.y = y;
    this.speedY = 0.5;
  }
}