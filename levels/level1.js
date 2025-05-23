const level1 = new Level(
  //#region attributes
  [new Chicken(), new Chicken(), new Chicken(), new Endboss()],

  [new Cloud()],

  [
    new GroundItems(ImageHub.salsabottle[1]),
    new GroundItems(ImageHub.salsabottle[0]),
    new GroundItems(ImageHub.salsabottle[1]),
    new GroundItems(ImageHub.salsabottle[1]),
  ],

  [
    new AirItems(ImageHub.coin[1]),
    new AirItems(ImageHub.coin[0]),
    new AirItems(ImageHub.coin[1]),
    new AirItems(ImageHub.coin[0]),
    new AirItems(ImageHub.coin[1]),
    new AirItems(ImageHub.coin[0]),
  ]
  //#endregion
);


/*   checkCollectibleCoinCollision() {
    setInterval(() => {
      if (this.character.isColliding(coin)) {
        for (let i = 0; i < this.level.coins.length; i++) {
          const element = this.level.coins[index];
          console.log(element);
          this.character.hitCoin();
                    this.coinbar.setPercentage(
            this.character.coins,
            ImageHub.IMAGES_STATUS_COIN
          );
        }
      }
    }, 100);
  }
 */
/* 
    checkCollectibleCoinCollision() {
    setInterval(() => {
      this.level.coins.forEach((coin) => {
        if (this.character.isColliding(coin)) {
          this.character.hitCoin();
          this.coinbar.setPercentage(
            this.character.coins,
            ImageHub.IMAGES_STATUS_COIN
          );
        }
      });
    }, 100);
  } */