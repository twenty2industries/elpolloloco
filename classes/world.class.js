/**
 * Represents the entire game world, handling characters, enemies, objects,
 * collisions, UI elements, and game state management.
 * 
 * @class World
 */
class World {
  //#region attributes
  /**
   * The main character controlled by the player.
   * @type {Character}
   */
  character = new Character();

  /**
   * Flag to indicate if the game loop is running.
   * @type {boolean}
   */
  isRunning = true;

  /**
   * The current level data, including enemies, collectibles, and environment.
   * @type {Level}
   */
  level = new Level();

  /**
   * Background objects array for parallax or decoration.
   * @type {Array<BackgroundObject>}
   */
  backgroundObjects = [];

  /**
   * Flag if the player won the game.
   * @type {boolean}
   */
  youWonScreen = false;

  /**
   * The HTML canvas element where the game is rendered.
   * @type {HTMLCanvasElement}
   */
  canvas;

  /**
   * The 2D drawing context of the canvas.
   * @type {CanvasRenderingContext2D}
   */
  ctx;

  /**
   * The horizontal camera offset for side-scrolling.
   * @type {number}
   */
  camera_x = 0;

  /**
   * Array of throwable bottle objects in the game.
   * @type {Array<ThrowableObject>}
   */
  throwableBottle = [new ThrowableObject()];

  /**
   * UI status bars for health, coins, bottles, and boss health.
   */
  healtbar = new Healthbar();
  coinbar = new Coinbar();
  bottlebar = new Bottlebar();
  endbossHealthbar = new EndbossHealthBar();

  /**
   * UI screens for game results.
   */
  youWonScreen = new YouWonScreen();
  youLoseScreen = new YouLoseScreen();

  /**
   * Flags for game outcome.
   */
  youLost = false;
  youWon = false;
  //#endregion

  //#region constructor
  /**
   * Creates an instance of the World.
   * @param {HTMLCanvasElement} canvas - The canvas element to render the game.
   */
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
    this.repeatMap();
    this.setWorld(); //why?
    IntervalHub.startInterval(this.run, 1000/60);
    IntervalHub.startInterval(this.characterGotHitted, 500);
    this.startBottleRespawnLoop();
  };
  //#endregion

  //#region methods
  //#region collision methods
  /**
   * Checks for collisions between the player character and all enemies.
   * Handles either stomping or taking damage depending on the enemy and collision type.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.isDeadFlag) {
        this.handleEnemyCollision(enemy);
      }
    });
  };

  /**
   * Handles the result of a collision between the player and a specific enemy.
   * Plays sound effects, applies damage or stomp logic.
   * @param {Object} enemy - The enemy that the player collided with.
   */
  handleEnemyCollision(enemy) {
    const isStompable = enemy instanceof Chicken || enemy instanceof SmallChicken;
    if (isStompable && this.character.stomp(enemy)) {
      AudioHub.playOne(AudioHub.chickenDead2);
      enemy.hit();
      this.character.speedY = 11;
    } else {
      this.character.hit();
      this.character.hasPlayedDamageSound = true;
      this.healtbar.setPercentage(this.character.energy, ImageHub.IMAGES_STATUS_HEALTH);
    }
  };

  
  /**
   * Checks for collisions between throwable bottles and enemies.
   */
  checkCollisionsEnemyBottle() {
    for (let i = 0; i < this.throwableBottle.length; i++) {
      const bottle = this.throwableBottle[i];
      for (let j = 0; j < this.level.enemies.length; j++) {
        const enemy = this.level.enemies[j];
        if (bottle.isColliding(enemy) && enemy.energy > 0) {
          this.handleCollisionEffects(bottle, enemy);
          break;
        }
      }
    }
  }

  /**
   * Handles the effects of a collision between a bottle and an enemy.
   * @param {Object} bottle - The thrown bottle object.
   * @param {Object} enemy - The enemy object that was hit.
   */
  handleCollisionEffects(bottle, enemy) {
    enemy.hit();
    AudioHub.playOne(AudioHub.chickenDead);
    bottle.collided = true;
    bottle.isThrown = false;
    if (enemy instanceof Endboss) {
      this.endbossHealthbar.setPercentage(
        enemy.energy,
        ImageHub.BOSS_IMAGES_STATUS_HEALTH
      );
    }
    this.deleteSplashAnimation(bottle);
  }

    /**
   * Checks if the character collects any bottles.
   * Updates the UI and removes collected bottles from the level.
   */
  checkCollectibleBottleCollision() {
    for (let i = 0; i < this.level.bottles.length; i++) {
      if (this.character.isColliding(this.level.bottles[i])) {
        AudioHub.playOne(AudioHub.collectBottle);
        this.level.bottles.splice(i, 1);
        this.character.hitBottle();
        this.bottlebar.setPercentage(
          this.character.bottles,
          ImageHub.IMAGES_STATUS_BOTTLE
        );
        break;
      }
    }
  };

    /**
   * Checks if the character collects any coins.
   * Updates the UI and removes collected coins from the level.
   */
  checkCollectibleCoinCollision() {
    for (let i = 0; i < this.level.coins.length; i++) {
      if (this.character.isColliding(this.level.coins[i])) {
        AudioHub.playOne(AudioHub.coinCollect);
        this.level.coins.splice(i, 1); 
        this.character.hitCoin();
        this.coinbar.setPercentage(
          this.character.coins,
          ImageHub.IMAGES_STATUS_COIN
        );
        break;
      }
    }
  };

    /**
   * Checks if the character is near the boss to trigger boss behaviors.
   */
  checkBossProximity() {
    let boss = this.level.enemies.find((enemy) => enemy instanceof Endboss);
    if (boss) {
      let character = this.character;
      let distance = boss.x - character.x;
      if (distance < 350 && distance > 70) {
        boss.bossProximity = true;
      } else {
        boss.bossProximity = false;
      }
    }
  };

  //#endregion

  /**
   * Main game loop executed regularly.
   * Checks collisions, collectibles, and enemy states.
   */
  run = () => {
    // runs the methods in setInterval
    this.checkCollisions();
    this.checkThrowObjects();
    this.checkCollectibleBottleCollision();
    this.checkCollectibleCoinCollision();
    this.checkCollisionsEnemyBottle();
    this.checkBossProximity();
  };

    /**
   * Handles throwing bottles when the player presses the throw key.
   */
  checkThrowObjects() {
    if (Keyboard.F && this.character.bottles < 100 ) {
      // new ThrowableObject with character's otherDirection
      let bottle = new ThrowableObject(this.character.x, this.character.y, this.character.otherDirection);
      this.throwableBottle.push(bottle);
      this.character.bottles += 20;
      this.bottlebar.setPercentage(this.character.bottles, ImageHub.IMAGES_STATUS_BOTTLE);
    }
    Keyboard.F = false; // no fullauto
  }

    /**
   * Removes bottles after splash animation ends.
   * @param {ThrowableObject} bottle - The bottle to delete.
   */
  deleteSplashAnimation(bottle) {
    setTimeout(() => {
      // find current index of the bottle to avoid wrong removal due to array changes
      const index = this.throwableBottle.indexOf(bottle);
      if (index > -1) {
        AudioHub.playOne(AudioHub.bottleBreak);
        this.throwableBottle.splice(index, 1); // delete bottle @ collision
      }
    }, 150);
  };

  /**
   * Draws the game world frame by frame.
   * Handles screen translation, status bars, and win/lose condition checks.
   */
  draw() {
    if (!this.isRunning) return;
    this.ctxTranlase();
    this.checkEndConditions();
    const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
    if (this.character.x > 2000 || (endboss && endboss.energy < 100)) {
      this.addToMap(this.endbossHealthbar);
      AudioHub.playOne(AudioHub.bossApproach);
    }
    this.addUiStatusBar();
    requestAnimationFrame(() => this.draw());
  }

  /**
   * Checks for win or lose conditions and triggers corresponding end screens.
   */
  checkEndConditions() {
    const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
    if (endboss && endboss.energy === 0) {
      this.youWonScreenWorld();
    } else if (this.character.energy <= 0) {
      this.youLoseScreenWorld();
    }
  }

    /**
   * Clears and translates the canvas context for camera movement.
   */
  ctxTranlase() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addWorldToMap();
    this.ctx.translate(-this.camera_x, 0);
  };

    /**
   * Displays the winning screen and stops the game.
   */
  youWonScreenWorld() {
    this.addToMap(this.youWonScreen);
    IntervalHub.stoppAllIntervals();
    AudioHub.stopAll(AudioHub.allSounds);
    AudioHub.playOne(AudioHub.gameStart);
    this.isRunning = false;
    this.youWon = true;
    displayRestartButton();
  };

  /**
   * Displays the losing screen and stops the game.
   */
  youLoseScreenWorld() {
    this.addToMap(this.youLoseScreen);
    IntervalHub.stoppAllIntervals();
    AudioHub.stopAll(AudioHub.allSounds);
/*     AudioHub.stopOne(AudioHub.gameStartscreen);
 */    AudioHub.stopOne(AudioHub.characterRunning); //bug with running sound, sometimes sound is not stopping
    AudioHub.playOne(AudioHub.characterDead);
    this.isRunning = false;
    this.youLost = true;
    displayRestartButton();
  };

    /**
   * Adds all UI status bars to the canvas.
   */
  addUiStatusBar() {
    //ad User Interface statusbar
    this.addToMap(this.healtbar);
    this.addToMap(this.coinbar);
    this.addToMap(this.bottlebar);
  };

    /**
   * Adds all visible world objects to the canvas.
   */
  addWorldToMap() {
    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableBottle);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.enemies);
  };

    /**
   * Links this world instance to the character.
   */
  setWorld() {
    this.character.world = this; //why? this is die instanz aus world?
  };

    /**
   * Adds an array of objects to the canvas.
   * @param {Array<MovableObject>} mo - Objects to add.
   */
  addObjectsToMap(mo) {
    mo.forEach((o) => {
      this.addToMap(o);
    });
  };

    /**
   * Adds a single object to the canvas, handling flipping if needed.
   * @param {MovableObject} mo - Object to add.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    } mo.draw(this.ctx);
    /*     mo.drawFrame(this.ctx);
     */ if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  };

  /**
   * Repeats background images to create a scrolling effect.
   */
  repeatMap() {
    const startPoint = 719; // value for second half of the background elements
    const mapLength = 3595; // endpoint so the map does not keep on loading
    for (let i = 0; i < mapLength; i += startPoint * 2) {
      this.backgroundObjects.push(new BackgroundObject(ImageHub.IMAGES_BACKGROUND[0], i)); // i = layer 1 position i += 719 * 2 = start with 0, 1438, 2876
      this.backgroundObjects.push(new BackgroundObject(ImageHub.IMAGES_BACKGROUND[1], i));
      this.backgroundObjects.push(new BackgroundObject(ImageHub.IMAGES_BACKGROUND[2], i));
      this.backgroundObjects.push(new BackgroundObject(ImageHub.IMAGES_BACKGROUND[3], i));
      let i2 = i + startPoint; // i2= layer 2 start position i2 += (value i = 0, 1438, 2876) + 719 = add at 719, 2157, 3595
      this.backgroundObjects.push(new BackgroundObject(ImageHub.IMAGES_BACKGROUND[4], i2));
      this.backgroundObjects.push(new BackgroundObject(ImageHub.IMAGES_BACKGROUND[5], i2));
      this.backgroundObjects.push(new BackgroundObject(ImageHub.IMAGES_BACKGROUND[6], i2));
      this.backgroundObjects.push(new BackgroundObject(ImageHub.IMAGES_BACKGROUND[7], i2));
    }
  };

    /**
   * Flips the image horizontally for mirrored objects.
   * @param {MovableObject} mo - Object to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  };

    /**
   * Restores the image flip transformation.
   * @param {MovableObject} mo - Object to restore.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1; // flip the x-coordinate here
    this.ctx.restore();
  };

    /**
   * Starts a loop to respawn bottles if none remain.
   */
  startBottleRespawnLoop() {
    setInterval(() => {
      if (this.level.bottles.length === 0) {
        this.level.bottles = [new GroundItems(ImageHub.salsabottle[1])];
      }
    }, 3000); // alle 3 Sekunden prüfen
  };

  //#endregion
}
