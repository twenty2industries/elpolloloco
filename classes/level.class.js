class Level {
  enemies = [
    new Chicken(), new Chicken(), new Chicken(), new SmallChicken(), new SmallChicken(), new Endboss()
  ];
  clouds = [
    new Cloud(),
  ];
  bottles = [
    new GroundItems(ImageHub.salsabottle[1]),
    new GroundItems(ImageHub.salsabottle[0]),
    new GroundItems(ImageHub.salsabottle[1]),
    new GroundItems(ImageHub.salsabottle[1]),
    new GroundItems(ImageHub.salsabottle[0]),
  ];
  coins =  [
    new AirItems(ImageHub.coin[1]),
    new AirItems(ImageHub.coin[0]),
    new AirItems(ImageHub.coin[1]),
    new AirItems(ImageHub.coin[0]),
    new AirItems(ImageHub.coin[1]),
  ];
  
  static level_end_x = 3595;

}