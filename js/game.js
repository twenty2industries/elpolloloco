let canvas;
let world;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);
}

window.onload = function () {
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

function bindBtsPressEvents(){
  document.getElementById('btnLeft'). addEventListener('touchstart', (e) => {
    e.preventDefault();
    Keyboard.LEFT = true;
  });
    document.getElementById('btnLeft'). addEventListener('touchend', (e) => {
    e.preventDefault();
    Keyboard.LEFT = false;
  });
    document.getElementById('btnRight'). addEventListener('touchstart', (e) => {
    e.preventDefault();
    Keyboard.RIGHT = true;
  });
    document.getElementById('btnRight'). addEventListener('touchend', (e) => {
    e.preventDefault();
    Keyboard.RIGHT = false;
  });
    document.getElementById('btnJump'). addEventListener('touchstart', (e) => {
    e.preventDefault();
    Keyboard.SPACE = true;
  });
    document.getElementById('btnJump'). addEventListener('touchend', (e) => {
    e.preventDefault();
    Keyboard.SPACE = false;
  });
    document.getElementById('btnThrow'). addEventListener('touchstart', (e) => {
    e.preventDefault();
    Keyboard.F = true;
  });
    document.getElementById('btnThrow'). addEventListener('touchend', (e) => {
    e.preventDefault();
    Keyboard.F = false;
  });
};

function startGame() {
  const startScreenRef = document.getElementById("startScreenContent");
  startScreenRef.classList.toggle("d_none");
  const canvasRef = document.getElementById("canvas");
  canvasRef.classList.toggle("d_none");
  const startGameButtonRef = document.getElementById("startGameButton");
  startGameButtonRef.classList.toggle("d_none");
  switchOnOffButtonIngame();
  init();
  bindBtsPressEvents();
  AudioHub.stopOne(AudioHub.gameStartscreen);
  AudioHub.playMusic(AudioHub.ingameSound);
};

function displayRestartButton() {
  const restartGameButtonRef = document.getElementById("restartGameButton");
  restartGameButtonRef.classList.toggle("d_none");
  console.log("Button anzeigen");
};

function switchPlayButton() {
  AudioHub.stopAll(AudioHub.allSounds);
  const pauseButtonRef = document.getElementById("pause");
  pauseButtonRef.classList.toggle("d_none");
  const resumeButtonRef = document.getElementById("continue");
  resumeButtonRef.classList.toggle("d_none");
};

function switchPauseButton() {
    toggleMusicButton();
  AudioHub.playMusic(AudioHub.gameStartscreen);
};

function turnOffIngameMusic() {
toggleIngameMusicButton();
  AudioHub.stopAll(AudioHub.ingameSound);
};

function turnOnIngameMusic() {
  toggleIngameMusicButton();
  AudioHub.playMusic(AudioHub.ingameSound);
};

function toggleMusicButton() {
  const pauseButtonRef = document.getElementById("pause");
  pauseButtonRef.classList.toggle("d_none");
  const resumeButtonRef = document.getElementById("continue");
  resumeButtonRef.classList.toggle("d_none");
};

function toggleIngameMusicButton() {
  const pauseButtonIngameRef = document.getElementById("pauseIngame");
  pauseButtonIngameRef.classList.toggle("d_none");
  const continueButtonIngameRef = document.getElementById("continueIngame");
  continueButtonIngameRef.classList.toggle("d_none");
};

function removeMusicButton() {
  const pauseButtonRef = document.getElementById("pause");
  pauseButtonRef.classList.add("d_none");
  const resumeButtonRef = document.getElementById("continue");
  resumeButtonRef.classList.add("d_none");
};

function switchOnOffButtonIngame() {
  removeMusicButton();
  const resumeButtonIngameRef = document.getElementById("pauseIngame");
  resumeButtonIngameRef.classList.remove("d_none");
};

function restartGame() {
  displayRestartButton();
  init();
};
