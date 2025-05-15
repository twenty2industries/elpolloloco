class MovableObject {
  x = 120;
  y = 280;
  img;
  height = 150;
  width = 100;
  imageCache = {};
  speed = 0.15
  currentImage = 0;
  otherDirection = false; // to flip an image

  //loadImage('img/test.png') das wäre theoretisch das Argument
  loadImage(path) {
    this.img = new Image(); // this.img = document.getElemtById("image") <img id="image" src>
    this.img.src = path;
  }

  loadImages(arr) { //Array
    arr.forEach((path) => { //path is the argument from loadImages(arr)
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  moveRight() {
    //methode for moving the character right
    console.log("Moving right");
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60); // 60 FPS
  }
}