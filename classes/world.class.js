class World {
  //#region attributes

  character = new Character();

  level = level1;

  backgroundObjects = [];

  canvas;

  ctx;

  keyboard;

  camera_x = 0;

  throwableBottle = new ThrowableObject();

  healtbar = new Healthbar();
  coinbar = new Coinbar();
  bottlebar = new Bottlebar();

  //#endregion
  //#region constructor
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.repeatMap();
    this.setWorld(); //why?
    this.checkCollisions();
    this.checkCollectibleBottleCollision();
    this.checkCollectibleCoinCollision();
  }
  //#endregion
  //#region methods
  setWorld() {
    this.character.world = this; //why? this is die instanz aus world?
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.hit(); //energy is the healthbar
          this.healtbar.setPercentage(this.character.energy);
        }
      });
    }, 100);
  }

  checkCollectibleBottleCollision() {
    setInterval(() => {
      this.level.bottles.forEach((bottle) => {
        if (this.character.isColliding(bottle)) {
          console.log("FLASCHE BERÜHRT");
        }
      });
    }, 100);
  }

  checkCollectibleCoinCollision() {
    setInterval(() => {
      this.level.coins.forEach((coin) => {
        if (this.character.isColliding(coin)) {
          console.log("COIN BERÜHRT");
        }
      });
    }, 100);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // background camera offset
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addToMap(this.character);
        this.addToMap(this.throwableBottle);

    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.ctx.translate(-this.camera_x, 0);

    // fixed ui elements
    this.addToMap(this.healtbar);
    this.addToMap(this.coinbar);
    this.addToMap(this.bottlebar);

    //draw() wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
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
  //#endregion
}
