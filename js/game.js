let canvas;
let world;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);
}

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
  const startScreenRef = document.getElementById("mainContent");
  startScreenRef.classList.toggle("d_none");

  const canvasRef = document.getElementById("canvas");
  canvasRef.classList.toggle("d_none");

  const startGameButtonRef = document.getElementById("startGameButton");
  startGameButtonRef.classList.toggle("d_none");
  init();
  AudioHub.stopOne(AudioHub.gameStartscreen);
  AudioHub.playOne(AudioHub.gameStart);
  AudioHub.playMusic(AudioHub.ingameSound);

}

function displayRestartButton() {
  const restartGameButtonRef = document.getElementById("restartGameButton");
  restartGameButtonRef.classList.remove("d_none");
}

function createNewLevel() {
  //why const level1 is not valueable here
  return new Level(
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new SmallChicken(),
      new SmallChicken(),
      new Endboss(),
    ],
    [new Cloud()],
    [
      new GroundItems(ImageHub.salsabottle[1]),
      new GroundItems(ImageHub.salsabottle[0]),
      new GroundItems(ImageHub.salsabottle[1]),
      new GroundItems(ImageHub.salsabottle[1]),
      new GroundItems(ImageHub.salsabottle[0]),
    ],
    [
      new AirItems(ImageHub.coin[1]),
      new AirItems(ImageHub.coin[0]),
      new AirItems(ImageHub.coin[1]),
      new AirItems(ImageHub.coin[0]),
      new AirItems(ImageHub.coin[1]),
    ]
  );
}

function restartGame() {
  init();
}
