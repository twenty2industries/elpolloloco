class MovableObject extends DrawableObject {
  //#region attributes
  /**
   * Speed of horizontal movement.
   * @type {number}
   */
  speed = 0.15;

  /**
   * Indicates if the object is facing the opposite direction (e.g., flipped image).
   * @type {boolean}
   */
  otherDirection = false;

  /**
   * Current health of the object.
   * @type {number}
   */
  energy = 100;

  /**
   * Number of bottles (used for bottle bar).
   * @type {number}
   */
  bottles = 100;

  /**
   * Number of coins (used for coin bar).
   * @type {number}
   */
  coins = 100;

  /**
   * Gravity acceleration value.
   * @type {number}
   */
  acceleration = 2;

  /**
   * Tracks time since last movement to detect idle state.
   * @type {number}
   */
  idleTimer = 0;

  /**
   * Timestamp of the last hit received.
   * @type {number}
   */
  lastHit = 0;

  /**
   * Indicates whether the object is idle.
   * @type {boolean}
   */
  idle = false;

  /**
   * True if the object is dead and death animation should stop.
   * @type {boolean}
   */
  isDeadFlag = false;

  /**
   * Minimum allowed distance between certain item spawns (e.g. bottles, coins).
   * @type {number}
   * @static
   */
  static minimumDistance = 100;

  //#endregion
  //#region methods
  /**
   * Loads and caches an array of image paths.
   * @param {string[]} arr - Array of image source paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      //path is the argument from loadImages(arr)
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Moves the object left by subtracting from its x-coordinate.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  
  /**
   * Moves the object right by adding to its x-coordinate.
   */
  moveRight() {
    this.x += this.speed;
  }

    /**
   * Plays a looping animation using a sequence of images.
   * @param {string[]} imgs - Array of image paths.
   */
  playAnimation(imgs) {
    let i = this.currentImage % imgs.length;
    let path = imgs[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

    /**
   * Makes the object jump if it is on the ground.
   */
  jump() {
    if (!this.isAboveGround()) {
      this.speedY = 11;
      this.y -= this.speedY;
      AudioHub.playOne(AudioHub.characterJump);
    }
  }

    /**
   * Checks collision with another movable object.
   * @param {MovableObject} mo - Another movable object to check collision against.
   * @returns {boolean} True if colliding.
   */
  isColliding(mo) {
    return (
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top
    );
  };

    /**
   * Reduces energy on hit and triggers damage animation and state.
   */
  hit() {
    if (this.hasDealtDamage) return; // prevent multiple damage hits
    this.hasDealtDamage = true; // mark that damage has been dealt
    this.energy -= 20;
    this.idleTimer = 0; // track idleTimer for long idle animation
    if (this.energy <= 0 && !this.isDeadFlag) {
      this.energy = 0;
      this.isDeadFlag = true;
    } else if (this.energy > 0) {
      this.lastHit = new Date().getTime(); // last collision contact getting saved to calculate time passed
    } setTimeout(() => {
      this.hasDealtDamage = false;
    }, 200);
  };

    /**
   * Reduces the bottle count (used for UI).
   */
  hitBottle() {
    if (this.bottle == 100) {
      return;
    }
    this.bottles -= 20;
    if (this.bottles <= 0) {
      this.bottles = 0;
    }
  };

    /**
   * Reduces the coin count (used for UI).
   */
  hitCoin() {
    if (this.coin == 100) {
      return;
    }
    this.coins -= 20;
    if (this.coins <= 0) {
      this.coins = 0;
    }
  };

    /**
   * Checks if a stomp (jump attack) on an enemy was successful.
   * @param {MovableObject} enemy - The enemy to check against.
   * @returns {boolean} True if stomp occurred.
   */
  stomp(enemy) {
    return (
      this.speedY < 0 &&
      this.y + this.height - this.offset.bottom >= enemy.y + enemy.offset.top &&
      this.x + this.offset.left < enemy.x + enemy.width - enemy.offset.right &&
      this.x + this.width - this.offset.right > enemy.x + enemy.offset.left
    );
  };

    /**
   * Checks if the object has zero energy.
   * @returns {boolean} True if dead.
   */
  isDead() {
    return this.energy == 0;
  };

    /**
   * Determines whether the object is currently hurt (e.g., flash effect).
   * @returns {boolean} True if hurt.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // difference in ms
    timePassed = timePassed / 1000; // difference in s
    return timePassed < 0.7; // if char got hit in the last 5 sec // isHurt true
  };

    /**
   * Checks if the object is above the ground.
   * @returns {boolean} True if above ground.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      //Throwable object should always fall
      return true;
    } else {
      return this.y < 230;
    }
  };

  /**
   * Applies gravity to the object by adjusting vertical speed and position.
   * Stops if the object is colliding with the ground.
   */
  applyGravity = () => {
    if (this.collided) {
      this.speedY = 0;
      this.acceleration = 0;
      return; // stop gravity
    } else if (this.isAboveGround() || this.speedY > 0) {
      this.y -= this.speedY;
      this.speedY -= this.acceleration;
    } else {
      this.speedY = 0;
    }
  };

  //#endregion
}
