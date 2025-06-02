let canvas;
let world;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);
}

window.onload = function() {
  startScreenMusic();
};

function startScreenMusic() {
  setTimeout(() => {
        AudioHub.playMusic(AudioHub.gameStartscreen);
  }, 1000);
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

function startGame() {
  const startScreenRef = document.getElementById("startScreenContent");
  startScreenRef.classList.toggle("d_none");
  const canvasRef = document.getElementById("canvas");
  canvasRef.classList.toggle("d_none");
  const startGameButtonRef = document.getElementById("startGameButton");
  startGameButtonRef.classList.toggle("d_none");
  init();
  AudioHub.stopOne(AudioHub.gameStartscreen);
  AudioHub.playMusic(AudioHub.ingameSound);
}

function displayRestartButton() {
  const restartGameButtonRef = document.getElementById("restartGameButton");
  restartGameButtonRef.classList.toggle("d_none");
  console.log("Button anzeigen") 
}

function switchPlayButton() {
  AudioHub.stopAll();
  const pauseButtonRef = document.getElementById('pause');
  pauseButtonRef.classList.toggle('d_none');
  const resumeButtonRef = document.getElementById('continue');
  resumeButtonRef.classList.toggle('d_none');
}

function switchPauseButton() {
  AudioHub.playMusic(AudioHub.ingameSound);
  const pauseButtonRef = document.getElementById('pause');
  pauseButtonRef.classList.toggle('d_none');
  const resumeButtonRef = document.getElementById('continue');
  resumeButtonRef.classList.toggle('d_none');
}

function restartGame() {
  displayRestartButton();
  init();
}
