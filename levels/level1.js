const level1 = new Level(
  //#region attributes
  [new Chicken(), new Chicken(), new Chicken(), new Endboss()],

  [new Cloud()],

  [
    new GroundItems(ImageHub.salsabottle[1]),
    new GroundItems(ImageHub.salsabottle[0]),
    new GroundItems(ImageHub.salsabottle[1]),
    new GroundItems(ImageHub.salsabottle[1]),
    new GroundItems(ImageHub.salsabottle[0]),
  ],

  [
    new AirItems(ImageHub.coin[1]),
    new AirItems(ImageHub.coin[0]),
    new AirItems(ImageHub.coin[1]),
    new AirItems(ImageHub.coin[0]),
    new AirItems(ImageHub.coin[1]),
  ]
  //#endregion
);
