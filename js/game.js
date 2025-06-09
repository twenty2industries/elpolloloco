/**
 * @fileoverview Main game controller handling canvas initialization, input events,
 * UI toggling, audio control, and game lifecycle functions.
 */

let canvas;
let world;

/**
 * Initializes the game by setting up the canvas, creating the game world, and initializing audio.
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);
  AudioHub.init();
}

/**
 * Listens to keydown events and sets the corresponding Keyboard flags to true.
 * @param {KeyboardEvent} event - The keydown event.
 */
document.addEventListener("keydown", (event) => {
  event.keyCode == 39 ? (Keyboard.RIGHT = true) : false;
  event.keyCode == 37 ? (Keyboard.LEFT = true) : false;
  event.keyCode == 38 ? (Keyboard.UP = true) : false;
  event.keyCode == 40 ? (Keyboard.DOWN = true) : false;
  event.keyCode == 32 ? (Keyboard.SPACE = true) : false;
  event.keyCode == 70 ? (Keyboard.F = true) : false;
});

/**
 * Listens to keyup events and sets the corresponding Keyboard flags to false.
 * @param {KeyboardEvent} event - The keyup event.
 */
document.addEventListener("keyup", (event) => {
  event.keyCode == 39 ? (Keyboard.RIGHT = false) : true;
  event.keyCode == 37 ? (Keyboard.LEFT = false) : true;
  event.keyCode == 38 ? (Keyboard.UP = false) : true;
  event.keyCode == 40 ? (Keyboard.DOWN = false) : true;
  event.keyCode == 32 ? (Keyboard.SPACE = false) : true;
  event.keyCode == 70 ? (Keyboard.F = false) : true;
});

/**
 * Binds touch events to on-screen buttons for mobile controls.
 * Prevents default behavior to avoid scrolling during touch.
 */
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

/**
 * Starts the game by restoring music state, toggling home screen UI,
 * initializing the game and binding mobile button events.
 */
function startGame() {
  restoreMusicState();
  toggleHomeScreen();
  init();
  bindBtsPressEvents();
}

/**
 * Toggles the visibility of restart and home screen buttons.
 */
function displayRestartButton() {
  const restartGameButtonRef = document.getElementById("restartGameButton");
  restartGameButtonRef.classList.toggle("d_none");
  const homeScreenButtonRef = document.getElementById("homeScreenButton");
  homeScreenButtonRef.classList.toggle("d_none");
}

/**
 * Switches the play/pause buttons for desktop UI and stops game start screen music.
 */
function switchPlayButton() {
  localStorage.setItem('musicPlaying', 'false');
  AudioHub.stopOne(AudioHub.gameStartscreen);
  const pauseButtonRef = document.getElementById("pause");
  pauseButtonRef.classList.toggle("d_none");
  const resumeButtonRef = document.getElementById("continue");
  resumeButtonRef.classList.toggle("d_none");
}

/**
 * Switches pause button, resumes game start screen music, and updates local storage.
 */
function switchPauseButton() {
  switchPlayButton();
  AudioHub.playMusic(AudioHub.gameStartscreen);
  localStorage.setItem('musicPlaying', 'true');
}

/**
 * Switches pause button for mobile UI, resumes game start screen music, and updates local storage.
 */
function switchPauseButtonMobile() {
  switchPlayButtonMobile();
  AudioHub.playMusic(AudioHub.gameStartscreen);
  localStorage.setItem('musicPlaying', 'true');
}

/**
 * Switches play button for mobile UI, stops game start screen music,
 * and updates local storage.
 */
function switchPlayButtonMobile() {
  AudioHub.stopOne(AudioHub.gameStartscreen);
  localStorage.setItem('musicPlaying', 'false');
  const pauseButtonRef = document.getElementById("pauseMobile");
  pauseButtonRef.classList.toggle("d_none");
  const resumeButtonRef = document.getElementById("continueMobile");
  resumeButtonRef.classList.toggle("d_none");
}

/**
 * Restores music playback state from local storage and updates mobile UI buttons accordingly.
 */
function restoreMusicState() {
  if (localStorage.getItem('musicPlaying') === 'true') {
    AudioHub.playMusic(AudioHub.gameStartscreen);
    document.getElementById("pauseMobile").classList.add("d_none");
  } else {
    document.getElementById("continueMobile").classList.toggle("d_none");
  }
}

/**
 * Restarts the game by restoring music state, toggling restart button, and initializing the game.
 */
function restartGame() {
  restoreMusicState();
  displayRestartButton();
  init();
}

/**
 * Toggles visibility of the Impressum (legal notice) section.
 */
function toggleImpressum() {
  const displayRef = document.getElementById("displayImpressum");
  displayRef.classList.toggle("d_none");
}

/**
 * Toggles the home screen UI elements (start screen, canvas, start button).
 */
function toggleHomeScreen(){
  const startScreenRef = document.getElementById("startScreenContent");
  startScreenRef.classList.toggle("d_none");
  const canvasRef = document.getElementById("canvas");
  canvasRef.classList.toggle("d_none");
  const startGameButtonRef = document.getElementById("startGameButton");
  startGameButtonRef.classList.toggle("d_none");
}

/**
 * Returns to the home screen by toggling the UI and displaying restart button.
 */
function homeScreen() {
  toggleHomeScreen();
  displayRestartButton();
}
