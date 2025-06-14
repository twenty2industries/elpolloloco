class ImageHub {
  //#region attributes IMAGES
  // grounditems
  static salsabottle = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];
  // air
  static coin = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  //character
  static CHARACTER_IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  static CHARACTER_IMAGES_JUMP = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  static CHARACTER_IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  static CHARACTER_IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  static CHARACTER_IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  static CHARACTER_IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
  ];

  //USER INTERFACE STATUS
  static IMAGES_STATUS_HEALTH = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
  ];

  static IMAGES_STATUS_COIN = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  static IMAGES_STATUS_BOTTLE = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  //background
  static IMAGES_BACKGROUND = [
    "img/5_background/layers/air.png",
    "img/5_background/layers/3_third_layer/1.png",
    "img/5_background/layers/2_second_layer/1.png",
    "img/5_background/layers/1_first_layer/1.png",
    "img/5_background/layers/air.png",
    "img/5_background/layers/3_third_layer/2.png",
    "img/5_background/layers/2_second_layer/2.png",
    "img/5_background/layers/1_first_layer/2.png",
  ];

  //chicken enemy
  static CHICKEN_IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  static CHICKEN_IMAGES_DEAD = [
    "img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
  ];

  //small chicken enemy
  static SMALL_CHICKEN_ENEMYS_WALK = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  static SMALL_CHICKEN_ENEMYS_DEAD = [
    "img/3_enemies_chicken/chicken_small/2_dead/dead.png",
  ];

  //endboss
  static BOSS_IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  static BOSS_IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  static BOSS_IMAGES_STATUS_HEALTH = [
    "img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
  ];

  static BOSS_IMAGES_WALK = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  static BOSS_IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  //bottle throw imgs
  static BOTTLE_IMAGE_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  static BOTTLE_IMAGE_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  //you-won-screen
  static YOUWON_IMAGE = ["img/You won, you lost/You won A.png"];

  //you-lose-screen
  static YOULOSE_IMAGE = ["img/You won, you lost/You lost.png"];
  //#endregion
}

/**
 * @class IntervalHub
 * @classdesc Utility class for managing multiple intervals across the application.
 * Provides methods to start and stop all intervals in a centralized way.
 */
class IntervalHub {
  /**
   * Stores all active interval IDs.
   * @type {number[]}
   */
  static allIntervals = [];

  /**
   * Starts a new interval with the given function and timer.
   * Saves the interval ID for later reference.
   * @param {Function} func - The function to be executed at each interval.
   * @param {number} timer - The time interval in milliseconds.
   */
  static startInterval(func, timer) {
    const newInterval = setInterval(func, timer);
    IntervalHub.allIntervals.push(newInterval);
  }

  /**
   * Stops all currently active intervals and clears the internal list.
   */
  static stoppAllIntervals() {
    IntervalHub.allIntervals.forEach(clearInterval);
    IntervalHub.allIntervals = [];
  }
}

/**
 * Manages all game audio: sounds, music, volume, and playback.
 */
class AudioHub {
  //#region attributes
  /** @type {HTMLAudioElement} Audio for coin collection */
  static coinCollect = new Audio("sounds/collectibles/collectSound.wav");
  static collectBottle = new Audio("sounds/collectibles/bottleCollectSound.wav");
  static bottleBreak = new Audio("sounds/throwable/bottleBreak.mp3");
  //character
  static characterJump = new Audio("sounds/character/characterJump.wav");
  static characterDead = new Audio("sounds/character/characterDead.wav");
  static characterRunning = new Audio("sounds/character/characterRun.mp3");
  static characterDamage = new Audio("sounds/character/characterDamage.mp3");
  static characterSnoring = new Audio("sounds/character/characterSnoring.mp3");
  //endboss
  static bossApproach = new Audio("sounds/endboss/endbossApproach.wav");
  //chicken
  static chickenDead = new Audio("sounds/chicken/chickenDead.mp3");
  static chickenDead2 = new Audio("sounds/chicken/chickenDead2.mp3");
  //game UI
  static gameStart = new Audio("sounds/game/gameStart.mp3");
  static gameStartscreen = new Audio("sounds/game/gameHomeScreen.mp3");
  /**
   * Array of all sound audio objects for easy management.
   * @type {HTMLAudioElement[]}
   */
  static allSounds = [
    AudioHub.coinCollect,
    AudioHub.collectBottle,
    AudioHub.bottleBreak,
    AudioHub.characterJump,
    AudioHub.characterDead,
    AudioHub.characterRunning,
    AudioHub.characterDamage,
    AudioHub.bossApproach,
    AudioHub.chickenDead,
    AudioHub.chickenDead2,
    AudioHub.gameStart,
    AudioHub.characterSnoring,
  ];

  /**
   * Array of sounds used for start screen music.
   * @type {HTMLAudioElement[]}
   */
  static startscreenMusic = [AudioHub.gameStartscreen];

  /**
   * Indicates whether sounds are enabled or muted.
   * @type {boolean}
   */
  static sounds = true;

  /**
   * Initializes AudioHub by loading sound settings from localStorage and setting volumes.
   */
  static init() {
    const storedSounds = localStorage.getItem("sounds");
    const storedVolume = localStorage.getItem("volume");
    this.sounds = storedSounds === null ? true : storedSounds === "true";
    const volume = storedVolume !== null ? parseFloat(storedVolume) : 0.015;
    AudioHub.allSounds.forEach((sound) => {
      sound.volume = this.sounds ? volume : 0;
    });
    const volumeInput = document.getElementById("volume");
    if (volumeInput) {
      volumeInput.value = volume;
    }
  };

  /**
   * Plays a single sound from the start.
   * @param {HTMLAudioElement} sound - The audio object to play.
   */
  static playOne(sound) {
    if (!sound) return;
    sound.currentTime = 0;
    sound.volume = AudioHub.sounds ? parseFloat(localStorage.getItem("volume") || 0.2) : 0;
    const playPromise = sound.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        if (err.name !== 'AbortError') {
          console.warn("Audio could not be played:", err);
        }
      });
    }
  };

  /**
   * Plays looping music with a preset volume.
   * @param {HTMLAudioElement} sound - The audio object to play as music.
   */
  static playMusic(sound) {
    sound.volume = 0.02;
    sound.loop = true;
    sound.play().catch(err => {
      if (err.name !== 'AbortError') {
        console.warn("Music could not start:", err);
      }
    });
  };

  /**
   * Stops playback of a single sound.
   * @param {HTMLAudioElement} sound - The audio object to stop.
   */
  static stopOne(sound) {
    if (!sound) return;
    sound.pause();
  };

  /**
   * Sets volume for an array of sounds based on volume slider input.
   * @param {HTMLAudioElement[]} volumeSlider - Array of audio objects to set volume on.
   */
  static objSetVolume(volumeSlider) {
    let volumeValue = document.getElementById("volume").value;
    localStorage.setItem("volume", volumeValue);
    volumeSlider.forEach((sound) => {
      sound.volume = AudioHub.sounds ? volumeValue : 0;
    });
  };

  /**
   * Toggles sound on/off and updates localStorage and all sounds' volume.
   */
  static toggleVolume() {
    this.sounds = !this.sounds;
    localStorage.setItem("sounds", this.sounds);
    const volume = parseFloat(localStorage.getItem("volume") || 0.2);
    AudioHub.allSounds.forEach((sound) => {
      sound.volume = this.sounds ? volume : 0;
    });
    switchSoundButton();
  };

  /**
   * Stops all currently playing sounds.
   */
  static stopAll() {
    AudioHub.allSounds.forEach((sound) => {
      sound.pause();
    });
  };

  /**
   * Plays all sounds with default volume and saves volume setting.
   */
  static playAll() {
    const volume = 0.015;
    AudioHub.allSounds.forEach((sound) => {
      sound.volume = AudioHub.sounds ? volume : 0;
      sound.play();
    });
    document.getElementById("volume").value = volume;
    localStorage.setItem("volume", volume);
  };
}
