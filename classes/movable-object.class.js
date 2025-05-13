class MovableObject {
  x = 120;
  y = 250;
  img;
  height = 150;
  width = 100;

  //loadImage('img/test.png') das wäre theoretisch das Argument
loadImage(path){
  this.img = new Image();// this.img = document.getElemtById("image") <img id="image" src>
  this.img.src = path;
}

  moveRight() { //methode for moving the character right
    console.log('Moving right');
  }

  moveLeft() {

  }
  
}