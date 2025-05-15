let canvas;
let world;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);
  console.log("My Character is", world);
}

document.addEventListener("keydown", (event) => {
  if (event.keyCode == 39) {
    Keyboard.RIGHT = true;
  }
  if (event.keyCode == 37) {
    Keyboard.LEFT = true;
  }
  if (event.keyCode == 38) {
    Keyboard.UP = true;
  }
  if (event.keyCode == 40) {
    Keyboard.DOWN = true;
  }
  if (event.keyCode == 32) {
    Keyboard.SPACE = true;
  }
  console.log(Keyboard.RIGHT);
  
});

document.addEventListener("keyup", (event) => {
  if (event.keyCode == 39) {
    Keyboard.RIGHT = false;
  }
  if (event.keyCode == 37) {
    Keyboard.LEFT = false;
  }
  if (event.keyCode == 38) {
    Keyboard.UP = false;
  }
  if (event.keyCode == 40) {
    Keyboard.DOWN = false;
  }
  if (event.keyCode == 32) {
    Keyboard.SPACE = false;
  }
  console.log(Keyboard.RIGHT);
  
});
