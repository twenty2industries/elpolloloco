class World {
  //#region attributes

  character = new Character();
  isRunning = true;

  level = new Level();

  backgroundObjects = [];
  youWonScreen = false;

  canvas;

  ctx;

  camera_x = 0;

  throwableBottle = [new ThrowableObject()];

  healtbar = new Healthbar();
  coinbar = new Coinbar();
  bottlebar = new Bottlebar();
  endbossHealthbar = new EndbossHealthBar();
  youWonScreen = new YouWonScreen();
  youLoseScreen = new YouLoseScreen();
  youLost = false;
  youWon = false; 

  //#endregion
  //#region constructor
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
    this.repeatMap();
    this.setWorld(); //why?
    IntervalHub.startInterval(this.run, 150);
    IntervalHub.startInterval(this.characterGotHitted, 500);
    this.startBottleRespawnLoop();
  };
  //#endregion
  //#region methods
  //#region collision methods
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.isDeadFlag) {
        if (
          (enemy instanceof Chicken || enemy instanceof SmallChicken) &&
          this.character.stomp(enemy)
        ) {
          AudioHub.playOne(AudioHub.chickenDead2);
          enemy.hit();
          this.character.speedY = 11;
        } else {
          this.character.hit();
          this.character.hasPlayedDamageSound = true;
          this.healtbar.setPercentage(
            this.character.energy,
            ImageHub.IMAGES_STATUS_HEALTH
          );
        }
      }
    });
  };

  checkCollisionsEnemyBottle() {
    for (let i = 0; i < this.throwableBottle.length; i++) {
      const bottle = this.throwableBottle[i];
      for (let j = 0; j < this.level.enemies.length; j++) {
        if (
          bottle.isColliding(this.level.enemies[j]) &&
          this.level.enemies[j].energy > 0
        ) {
          this.level.enemies[j].hit();
          AudioHub.playOne(AudioHub.chickenDead);
          bottle.collided = true; //flag for splash animation @throwableObject
          bottle.isThrown = false; // stop throw motion flag for throwable objects
          if (this.level.enemies[j] instanceof Endboss) {
            //instanceof fixed the bug displaying boss hp 0 until the first attack
            this.endbossHealthbar.setPercentage(
              this.level.enemies[j].energy,
              ImageHub.BOSS_IMAGES_STATUS_HEALTH
            );
          }
          this.deleteSplashAnimation(bottle);
          break;
        }
      }
    }
  };

  checkCollectibleBottleCollision() {
    for (let i = 0; i < this.level.bottles.length; i++) {
      if (this.character.isColliding(this.level.bottles[i])) {
        // checks the exact collided object
        AudioHub.playOne(AudioHub.collectBottle);
        this.level.bottles.splice(i, 1); // removest the bottle from array level
        this.character.hitBottle();
        this.bottlebar.setPercentage(
          this.character.bottles,
          ImageHub.IMAGES_STATUS_BOTTLE
        );
        break; // is a better option to return for multiple execution than return
      }
    }
  };

  checkCollectibleCoinCollision() {
    for (let i = 0; i < this.level.coins.length; i++) {
      if (this.character.isColliding(this.level.coins[i])) {
        AudioHub.playOne(AudioHub.coinCollect);
        this.level.coins.splice(i, 1); // removest the coin from array level
        this.character.hitCoin();
        this.coinbar.setPercentage(
          this.character.coins,
          ImageHub.IMAGES_STATUS_COIN
        );
        break; // is a better option to return for multiple execution than return
      }
    }
  };

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
  run = () => {
    // runs the methods in setInterval
    this.checkCollisions();
    this.checkThrowObjects();
    this.checkCollectibleBottleCollision();
    this.checkCollectibleCoinCollision();
    this.checkCollisionsEnemyBottle();
    this.checkBossProximity();
  };

  checkThrowObjects() {
    if (Keyboard.F /* && this.character.bottles < 100 */) {
      // new ThrowableObject with character's otherDirection
      let bottle = new ThrowableObject(
        this.character.x,
        this.character.y,
        this.character.otherDirection
      );
      this.throwableBottle.push(bottle);
      this.character.bottles += 20;
      this.bottlebar.setPercentage(
        this.character.bottles,
        ImageHub.IMAGES_STATUS_BOTTLE
      );
    }
    Keyboard.F = false; // no fullauto
  }

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

  draw() {
    if (!this.isRunning) return;
    this.ctxTranlase();
    let endboss = this.level.enemies.find((enemy) => enemy instanceof Endboss); // check if any enemy is an instance of Endboss and has energy equal to 0 with the method find()
    if (endboss && endboss.energy === 0) {
      this.youWonScreenWorld();
    }
    if (this.character.energy <= 0) {
      this.youLoseScreenWorld();
    }
    this.addUiStatusBar();
    if (this.character.x > 2000 || endboss.energy < 100) {
      // if close to enndboss then show endboss health
      this.addToMap(this.endbossHealthbar);
      AudioHub.playOne(AudioHub.bossApproach)
    }
    requestAnimationFrame(() => this.draw()); //draw() wird immer wieder aufgerufen
  };

  ctxTranlase() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addWorldToMap();
    this.ctx.translate(-this.camera_x, 0);
  };

  youWonScreenWorld() {
    this.addToMap(this.youWonScreen);
    IntervalHub.stoppAllIntervals();
    AudioHub.stopAll(AudioHub.allSounds);
    AudioHub.stopOne(AudioHub.gameStartscreen);
    AudioHub.playOne(AudioHub.gameStart);
    this.isRunning = false;
    this.youWon = true;
    displayRestartButton();
  };


  youLoseScreenWorld() {
    this.addToMap(this.youLoseScreen);
    IntervalHub.stoppAllIntervals();
    AudioHub.stopAll(AudioHub.allSounds);
    AudioHub.stopOne(AudioHub.gameStartscreen);
    AudioHub.stopOne(AudioHub.characterRunning); //bug with running sound, sometimes sound is not stopping
    AudioHub.playOne(AudioHub.characterDead);
    this.isRunning = false;
    this.youLost = true;
    displayRestartButton();
  };

  addUiStatusBar() {
    //ad User Interface statusbar
    this.addToMap(this.healtbar);
    this.addToMap(this.coinbar);
    this.addToMap(this.bottlebar);
  };

  addWorldToMap() {
    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableBottle);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
  };

  setWorld() {
    this.character.world = this; //why? this is die instanz aus world?
  };

  addObjectsToMap(mo) {
    mo.forEach((o) => {
      this.addToMap(o);
    });
  };

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    /*     mo.drawFrame(this.ctx);
     */ if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  };

  repeatMap() {
    const startPoint = 719; // value for second half of the background elements
    const mapLength = 3595; // endpoint so the map does not keep on loading
    for (let i = 0; i < mapLength; i += startPoint * 2) {
      this.backgroundObjects.push(
        new BackgroundObject(ImageHub.IMAGES_BACKGROUND[0], i)
      ); // i = layer 1 position i += 719 * 2 = start with 0, 1438, 2876
      this.backgroundObjects.push(
        new BackgroundObject(ImageHub.IMAGES_BACKGROUND[1], i)
      );
      this.backgroundObjects.push(
        new BackgroundObject(ImageHub.IMAGES_BACKGROUND[2], i)
      );
      this.backgroundObjects.push(
        new BackgroundObject(ImageHub.IMAGES_BACKGROUND[3], i)
      );
      let i2 = i + startPoint; // i2= layer 2 start position i2 += (value i = 0, 1438, 2876) + 719 = add at 719, 2157, 3595
      this.backgroundObjects.push(
        new BackgroundObject(ImageHub.IMAGES_BACKGROUND[4], i2)
      );
      this.backgroundObjects.push(
        new BackgroundObject(ImageHub.IMAGES_BACKGROUND[5], i2)
      );
      this.backgroundObjects.push(
        new BackgroundObject(ImageHub.IMAGES_BACKGROUND[6], i2)
      );
      this.backgroundObjects.push(
        new BackgroundObject(ImageHub.IMAGES_BACKGROUND[7], i2)
      );
    }
  };

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  };

  flipImageBack(mo) {
    mo.x = mo.x * -1; // flip the x-coordinate here
    this.ctx.restore();
  };

  startBottleRespawnLoop() {
    setInterval(() => {
      if (this.level.bottles.length === 0) {
        this.level.bottles = [new GroundItems(ImageHub.salsabottle[1])];
      }
    }, 3000); // alle 3 Sekunden prüfen
  };

  //#endregion
}
