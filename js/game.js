let canvas;
let world;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);
}

document.addEventListener("keydown", (event) => {
  event.keyCode == 39 ? (Keyboard.RIGHT = true) : false;
  event.keyCode == 37 ? (Keyboard.LEFT = true) : false;
  event.keyCode == 38 ? (Keyboard.UP = true) : false;
  event.keyCode == 40 ? (Keyboard.DOWN = true) : false;
  event.keyCode == 32 ? (Keyboard.SPACE = true) : false;
  event.keyCode == 70 ? (Keyboard.F = true) : false;
});

document.addEventListener("keyup", (event) => {
  event.keyCode == 39 ? (Keyboard.RIGHT = false) : true;
  event.keyCode == 37 ? (Keyboard.LEFT = false) : true;
  event.keyCode == 38 ? (Keyboard.UP = false) : true;
  event.keyCode == 40 ? (Keyboard.DOWN = false) : true;
  event.keyCode == 32 ? (Keyboard.SPACE = false) : true;
  event.keyCode == 70 ? (Keyboard.F = false) : true;
});

function hideStartScreen() {
  const startScreenRef = document.getElementById("mainContent");
    startScreenRef.classList.toggle('d_none');

  const canvasRef = document.getElementById('canvas');
  canvasRef.classList.toggle('d_none');
  init();
}
