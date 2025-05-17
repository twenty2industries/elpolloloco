class World {
  character = new Character();

  level = level1;

  backgroundObjects = [];

  canvas;

  ctx;

  keyboard;

  static camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.repeatMap();
    this.setWorld(); //why?
    this.checkCollisions();
  }

  setWorld() {
    this.character.world = this; //why?
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          console.log('colliding', enemy);
        }
      });
    }, 100);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.ctx.translate(-this.camera_x, 0);
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
        new BackgroundObject("img/5_background/layers/air.png", i)
      ); // i = layer 1 position i += 719 * 2 = start with 0, 1438, 2876
      this.backgroundObjects.push(
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png", i)
      );
      this.backgroundObjects.push(
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png", i)
      );
      this.backgroundObjects.push(
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", i)
      );
      let i2 = i + startPoint; // i2= layer 2 start position i2 += (value i = 0, 1438, 2876) + 719 = add at 719, 2157, 3595
      this.backgroundObjects.push(
        new BackgroundObject("img/5_background/layers/air.png", i2)
      );
      this.backgroundObjects.push(
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", i2)
      );
      this.backgroundObjects.push(
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", i2)
      );
      this.backgroundObjects.push(
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", i2)
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
}
