/**
 * Represents the main character in the game, extending MovableObject with
 * properties for movement, animations, sounds, and interactions with the game world.
 */
class Character extends MovableObject {
  /**
   * Height of the character in pixels.
   * @type {number}
   */
  height = 200;

  /**
   * Vertical position of the character.
   * @type {number}
   */
  y = 230;

  /**
   * Movement speed of the character.
   * @type {number}
   */
  speed = 10;

  /**
   * Flag indicating if the running sound is currently playing.
   * @type {boolean}
   */
  runningSoundIsPlaying = false;

  /**
   * Flag to ensure the damage sound plays only once.
   * @type {boolean}
   */
  hasPlayedDamageSound = false;

  /**
   * Flag to ensure the snoring sound plays only once during long idle.
   * @type {boolean}
   */
  hasPlayedSnoringSound = false;

  /**
   * Offset values for collision or rendering boundaries.
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = {
    top: 90,
    right: 30,
    bottom: 10,
    left: 30,
  };

  /**
   * Reference to the game world instance this character interacts with.
   * @type {object}
   */
  world;

  /**
   * Vertical speed for jumping and falling.
   * @type {number}
   */
  speedY = 0;

  /**
   * Gravity acceleration applied to the character.
   * @type {number}
   */
  acceleration = 0.5;

  /**
   * Instance of DrawableObject for managing visual rendering.
   * @type {DrawableObject}
   */
  drawableObjektInstance = new DrawableObject();

  /**
   * Instance of ThrowableObject used for bottle throwing mechanics.
   * @type {ThrowableObject}
   */
  throwableObjectBottle = new ThrowableObject();

  /**
   * Initializes the character, loads images and sets up repeated intervals for animation and movement.
   */
  constructor() {
    super();
    this.loadingImagesCharacter();
    IntervalHub.startInterval(this.applyGravity, 1000 / 60);
    IntervalHub.startInterval(this.characterMovement, 1000 / 60);
    IntervalHub.startInterval(this.animateCharacterWalking, 100);
    IntervalHub.startInterval(this.animateCharacterJump, 80);
    IntervalHub.startInterval(this.animateCharacterHurt, 100);
    IntervalHub.startInterval(this.animateIdleAnimations, 200);
    IntervalHub.startInterval(this.playDamageSoundOnce, 600);
  }

  /**
   * Loads all character related images for animations.
   */
  loadingImagesCharacter() {
    this.loadImage(ImageHub.CHARACTER_IMAGES_WALKING[0]);
    this.loadImages(ImageHub.CHARACTER_IMAGES_JUMP);
    this.loadImages(ImageHub.CHARACTER_IMAGES_WALKING);
    this.loadImages(ImageHub.CHARACTER_IMAGES_HURT);
    this.loadImages(ImageHub.CHARACTER_IMAGES_DEAD);
    this.loadImages(ImageHub.CHARACTER_IMAGES_IDLE);
    this.loadImages(ImageHub.CHARACTER_IMAGES_LONG_IDLE);
  }

  /**
   * Controls character movement, sounds and camera updating based on keyboard input.
   */
  characterMovement = () => {
    this.handleRunningSound();
    this.handleMovement();
    this.handleJump();
    this.updateCamera();
  };

  /**
   * Plays or stops running sound based on whether the character is moving and grounded.
   */
  handleRunningSound() {
    const isMoving = (Keyboard.RIGHT || Keyboard.LEFT) && !this.isAboveGround();
    if (isMoving && !this.runningSoundIsPlaying) {
      AudioHub.playOne(AudioHub.characterRunning);
      this.runningSoundIsPlaying = true;
    } else if ((!Keyboard.RIGHT && !Keyboard.LEFT) || this.isAboveGround()) {
      AudioHub.stopOne(AudioHub.characterRunning);
      this.runningSoundIsPlaying = false;
    }
  }

  /**
   * Moves the character left or right based on keyboard input within level boundaries.
   */
  handleMovement() {
    if (Keyboard.RIGHT && this.x < Level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
    }
    if (Keyboard.LEFT && this.x > 100) {
      this.moveLeft();
      this.otherDirection = true;
    }
  }

  /**
   * Initiates a jump if the jump key is pressed.
   */
  handleJump() {
    if (Keyboard.SPACE) {
      this.jump();
    }
  }

  /**
   * Updates the camera position to follow the character.
   */
  updateCamera() {
    this.world.camera_x = -this.x + 100;
  }

  /**
   * Plays the damage sound once and resets the flag.
   */
  playDamageSoundOnce = () => {
    if (this.hasPlayedDamageSound) {
      AudioHub.playOne(AudioHub.characterDamage);
      this.hasPlayedDamageSound = false;
    }
  };

  /**
   * Animates the walking animation when the character moves on the ground.
   */
  animateCharacterWalking = () => {
    if ((Keyboard.RIGHT || Keyboard.LEFT) && !this.isAboveGround()) {
      this.playAnimation(ImageHub.CHARACTER_IMAGES_WALKING);
    }
  };

  /**
   * Animates the jump animation when the character is in the air.
   */
  animateCharacterJump = () => {
    if (this.isAboveGround()) {
      this.playAnimation(ImageHub.CHARACTER_IMAGES_JUMP);
    }
  };

  /**
   * Plays the dead animation once when the character dies.
   */
  animateCharacterDead = () => {
    if (this.isDead() && this.isDeadFlag) {
      this.playAnimation(ImageHub.CHARACTER_IMAGES_DEAD);
      this.isDeadFlag = false;
    }
  };

  /**
   * Plays the hurt animation when the character is damaged.
   */
  animateCharacterHurt = () => {
    if (this.isHurt()) {
      this.playAnimation(ImageHub.CHARACTER_IMAGES_HURT);
    }
  };

  /**
   * Controls idle animations and related sounds based on user input and idle time.
   */
  animateIdleAnimations = () => {
    if (this.noKeyPressed() && !this.isDead()) {
      this.handleIdleTimer();
    } else {
      this.resetIdleState();
    }
  };

  /**
   * Checks if no movement or action keys are pressed.
   * @returns {boolean} True if no relevant keys are pressed.
   */
  noKeyPressed = () => {
    return (
      !Keyboard.RIGHT && !Keyboard.LEFT && !Keyboard.UP &&
      !Keyboard.DOWN && !Keyboard.SPACE && !Keyboard.F
    );
  };

  /**
   * Handles the idle timer and switches between short and long idle animations.
   */
  handleIdleTimer = () => {
    this.idleTimer += 200;
    if (this.idleTimer < 5000) {
      this.playIdleAnimation();
    } else {
      this.playLongIdleAnimation();
    }
  };

  /**
   * Plays the short idle animation and stops running sound.
   */
  playIdleAnimation = () => {
    this.playAnimation(ImageHub.CHARACTER_IMAGES_IDLE);
    AudioHub.stopOne(AudioHub.characterRunning);
    this.hasPlayedSnoringSound = false;
  };

  /**
   * Plays the long idle animation and snoring sound once.
   */
  playLongIdleAnimation = () => {
    this.playAnimation(ImageHub.CHARACTER_IMAGES_LONG_IDLE);
    if (!this.hasPlayedSnoringSound) {
      AudioHub.playOne(AudioHub.characterSnoring);
      this.hasPlayedSnoringSound = true;
    }
  };

  /**
   * Resets idle timer and snoring sound flags.
   */
  resetIdleState = () => {
    this.idleTimer = 0;
    this.hasPlayedSnoringSound = false;
  };
}
