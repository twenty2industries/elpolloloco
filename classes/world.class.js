class World {
  //#region attributes

  character = new Character();

  level = level1;

  backgroundObjects = [];

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

  //#endregion
  //#region constructor
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
    this.repeatMap();
    this.setWorld(); //why?
    this.level = createNewLevel()
    IntervalHub.startInterval(this.run, 150);
    this.startBottleRespawnLoop();
  }
  //#endregion
  //#region methods
  //#region collision methods
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.isDeadFlag) {
        this.character.hit(); //energy is the healthbar
        this.healtbar.setPercentage(
          this.character.energy,
          ImageHub.IMAGES_STATUS_HEALTH
        ); // energy
      }
    });
  }

  checkCollisionsEnemyBottle() {
    for (let i = 0; i < this.throwableBottle.length; i++) {
      const bottle = this.throwableBottle[i];
      for (let j = 0; j < this.level.enemies.length; j++) {
        if (
          bottle.isColliding(this.level.enemies[j]) &&
          this.level.enemies[j].energy > 0
        ) {
          this.level.enemies[j].hit();
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
  }

  checkCollectibleBottleCollision() {
    for (let i = 0; i < this.level.bottles.length; i++) {
      if (this.character.isColliding(this.level.bottles[i])) {
        // checks the exact collided object
        this.level.bottles.splice(i, 1); // removest the bottle from array level
        this.character.hitBottle();
        this.bottlebar.setPercentage(
          this.character.bottles,
          ImageHub.IMAGES_STATUS_BOTTLE
        );
        break; // is a better option to return for multiple execution than return
      }
    }
  }

  checkCollectibleCoinCollision() {
    for (let i = 0; i < this.level.coins.length; i++) {
      if (this.character.isColliding(this.level.coins[i])) {
        this.level.coins.splice(i, 1); // removest the coin from array level
        this.character.hitCoin();
        this.coinbar.setPercentage(
          this.character.coins,
          ImageHub.IMAGES_STATUS_COIN
        );
        break; // is a better option to return for multiple execution than return
      }
    }
  }

  //#endregion
  run = () => {
    // runs the methods in setInterval
    this.checkCollisions();
    this.checkThrowObjects();
    this.checkCollectibleBottleCollision();
    this.checkCollectibleCoinCollision();
    this.checkCollisionsEnemyBottle();
  };

  checkThrowObjects() {
    if (Keyboard.F && this.character.bottles < 100) {
      let bottle = new ThrowableObject(this.character.x, this.character.y);
      this.throwableBottle.push(bottle);
      this.character.bottles += 20;
      this.bottlebar.setPercentage(
        this.character.bottles,
        ImageHub.IMAGES_STATUS_BOTTLE
      );
    }
    Keyboard.F = false; //no fullauto
  }

  deleteSplashAnimation(bottle) {
    setTimeout(() => {
      // find current index of the bottle to avoid wrong removal due to array changes
      const index = this.throwableBottle.indexOf(bottle);
      if (index > -1) {
        this.throwableBottle.splice(index, 1); // delete bottle @ collision
      }
    }, 450);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // background camera offset
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableBottle);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.ctx.translate(-this.camera_x, 0);
    // fixed ui elements
    let endboss = this.level.enemies.find((enemy) => enemy instanceof Endboss); // check if any enemy is an instance of Endboss and has energy equal to 0 with the method find()
    if (endboss && endboss.energy === 0) {
      this.addToMap(this.youWonScreen);
      setTimeout(() => {
        IntervalHub.stoppAllIntervals();
      }, 1000);
      displayRestartButton();
    }
    if (this.character.energy <= 0) {
      this.addToMap(this.youLoseScreen);
      setTimeout(() => {
        IntervalHub.stoppAllIntervals();
      }, 1000);
      displayRestartButton();
    }
    this.addToMap(this.healtbar);
    this.addToMap(this.coinbar);
    this.addToMap(this.bottlebar);
    if (this.character.x > 2000) {
      // if close to enndboss then show endboss health
      this.addToMap(this.endbossHealthbar);
    }
    //draw() wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  setWorld() {
    this.character.world = this; //why? this is die instanz aus world?
  }

  addObjectsToMap(mo) {
    mo.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

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
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1; // flip the x-coordinate here
    this.ctx.restore();
  }

    startBottleRespawnLoop() {
    setInterval(() => {
      if (this.level.bottles.length === 0) {
      this.level.bottles = [
        new GroundItems(ImageHub.salsabottle[1]),
      ];      }
    }, 3000); // alle 3 Sekunden prüfen
  }

  //#endregion
}
