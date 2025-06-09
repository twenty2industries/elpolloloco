let canvas;
let world;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);
  AudioHub.init();
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

function bindBtsPressEvents() {
  document.getElementById("btnLeft").addEventListener("touchstart", (e) => {
    e.preventDefault();
    Keyboard.LEFT = true;
  });
  document.getElementById("btnLeft").addEventListener("touchend", (e) => {
    e.preventDefault();
    Keyboard.LEFT = false;
  });
  document.getElementById("btnRight").addEventListener("touchstart", (e) => {
    e.preventDefault();
    Keyboard.RIGHT = true;
  });
  document.getElementById("btnRight").addEventListener("touchend", (e) => {
    e.preventDefault();
    Keyboard.RIGHT = false;
  });
  document.getElementById("btnJump").addEventListener("touchstart", (e) => {
    e.preventDefault();
    Keyboard.SPACE = true;
  });
  document.getElementById("btnJump").addEventListener("touchend", (e) => {
    e.preventDefault();
    Keyboard.SPACE = false;
  });
  document.getElementById("btnThrow").addEventListener("touchstart", (e) => {
    e.preventDefault();
    Keyboard.F = true;
  });
  document.getElementById("btnThrow").addEventListener("touchend", (e) => {
    e.preventDefault();
    Keyboard.F = false;
  });
}

function startGame() {
  restoreMusicState();
  toggleHomeScreen();
  init();
  bindBtsPressEvents();
}

function displayRestartButton() {
  const restartGameButtonRef = document.getElementById("restartGameButton");
  restartGameButtonRef.classList.toggle("d_none");
  const homeScreenButtonRef = document.getElementById("homeScreenButton");
  homeScreenButtonRef.classList.toggle("d_none");
}

function switchPlayButton() {
    localStorage.setItem('musicPlaying', 'false');
  AudioHub.stopOne(AudioHub.gameStartscreen);
  const pauseButtonRef = document.getElementById("pause");
  pauseButtonRef.classList.toggle("d_none");
  const resumeButtonRef = document.getElementById("continue");
  resumeButtonRef.classList.toggle("d_none");
}
function switchPauseButton() {
  switchPlayButton();
  AudioHub.playMusic(AudioHub.gameStartscreen);
  localStorage.setItem('musicPlaying', 'true');
}

function switchPauseButtonMobile() {
  switchPlayButtonMobile();
  AudioHub.playMusic(AudioHub.gameStartscreen);
  localStorage.setItem('musicPlaying', 'true');
}


function switchPlayButtonMobile() {
  AudioHub.stopOne(AudioHub.gameStartscreen);
  localStorage.setItem('musicPlaying', 'false');
  const pauseButtonRef = document.getElementById("pauseMobile");
  pauseButtonRef.classList.toggle("d_none");
  const resumeButtonRef = document.getElementById("continueMobile");
  resumeButtonRef.classList.toggle("d_none");
}

function restoreMusicState() {
  if (localStorage.getItem('musicPlaying') === 'true') {
    AudioHub.playMusic(AudioHub.gameStartscreen);
    document.getElementById("pauseMobile").classList.add("d_none");
  } else     document.getElementById("continueMobile").classList.toggle("d_none");

}

function restartGame() {
  restoreMusicState();
  displayRestartButton();
  init();
}

function toggleImpressum() {
  const displayRef = document.getElementById("displayImpressum");
  displayRef.classList.toggle("d_none");
}

function toggleHomeScreen(){
  const startScreenRef = document.getElementById("startScreenContent");
  startScreenRef.classList.toggle("d_none");
  const canvasRef = document.getElementById("canvas");
  canvasRef.classList.toggle("d_none");
  const startGameButtonRef = document.getElementById("startGameButton");
  startGameButtonRef.classList.toggle("d_none");
}

function homeScreen() {
  toggleHomeScreen();
  displayRestartButton();
}