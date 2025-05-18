class MovableObject {
  x = 120;
  y = 280;
  img;
  height = 150;
  width = 100;
  imageCache = {};
  speed = 0.15;
  currentImage = 0;
  otherDirection = false; // to flip an image
  energy = 100; //healthbar property 

  //loadImage('img/test.png') das wäre theoretisch das Argument
  loadImage(path) {
    this.img = new Image(); // this.img = document.getElemtById("image") <img id="image" src>
    this.img.src = path;
  }

  loadImages(arr) {
    //Array
    arr.forEach((path) => {
      //path is the argument from loadImages(arr)
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.lineWidth = "4";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  moveLeft() {
    this.x -= this.speed;
  }

  playAnimation(imgs) {
    let i = this.currentImage % imgs.length;
    let path = imgs[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  jump() {
    if (!this.isAboveGround()) {
      this.speedY = 15;
      this.y -= this.speedY;
    }
  }

  //character.isColliding(chicken);
  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height
    );
  }

  hit(){
    this.energy -= 5;
    console.log(this.energy);
    
    if (this.energy <= 0) {
      this.energy = 0;
    }
  }

  isDead(){
    return this.energy == 0;
  }
}
